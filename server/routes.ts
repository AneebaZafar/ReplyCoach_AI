import { Router, Request, Response } from 'express';
import { Type } from '@google/genai';
import { LLM_CONFIG } from './config.js';
import {
  buildInterviewerSystemPrompt,
  buildEvaluatorSystemPrompt,
  buildEvaluatorUserMessage,
} from './prompts.js';
import { callLLM } from './llm.js';
import {
  validateChatRequest,
  validateFeedbackRequest,
  validateAndGroundFeedback,
} from './validation.js';

export const apiRouter = Router();

const feedbackSchema = {
  type: Type.OBJECT,
  properties: {
    scores: {
      type: Type.OBJECT,
      properties: {
        clarity: { type: Type.INTEGER },
        tone: { type: Type.INTEGER },
        confidence: { type: Type.INTEGER },
        structure: { type: Type.INTEGER },
      },
      required: ['clarity', 'tone', 'confidence', 'structure'],
    },
    overall_summary: { type: Type.STRING },
    strengths: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          point: { type: Type.STRING },
          evidence: { type: Type.STRING },
        },
        required: ['point', 'evidence'],
      },
    },
    improvements: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          point: { type: Type.STRING },
          evidence: { type: Type.STRING },
          fix: { type: Type.STRING },
        },
        required: ['point', 'evidence', 'fix'],
      },
    },
    flagged_phrases: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          phrase: { type: Type.STRING },
          suggestion: { type: Type.STRING },
        },
        required: ['phrase', 'suggestion'],
      },
    },
    weakest_answer_index: { type: Type.INTEGER },
    rewrite: { type: Type.STRING },
    next_step: { type: Type.STRING },
  },
  required: [
    'scores',
    'overall_summary',
    'strengths',
    'improvements',
    'flagged_phrases',
    'weakest_answer_index',
    'rewrite',
    'next_step',
  ],
};

/**
 * Checks if the model output breaks character by referencing being an AI
 */
function breaksCharacter(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes('as an ai') ||
    lower.includes('i am an ai') ||
    lower.includes('language model') ||
    lower.includes('as a large language') ||
    lower.includes('i am a large language')
  );
}

/**
 * POST /api/chat
 * Runs the interviewer roleplay.
 */
apiRouter.post('/chat', async (req: Request, res: Response) => {
  const validation = validateChatRequest(req.body);
  if (validation.error || !validation.data) {
    res.status(400).json({ error: validation.error || 'Invalid chat request' });
    return;
  }

  const { scenario, level, maxTurns, context, messages, realUserMessageCount } = validation.data;

  const isFirstTurn = realUserMessageCount === 0;
  const isFinalTurn = realUserMessageCount >= maxTurns;

  const systemInstruction = buildInterviewerSystemPrompt({
    scenarioKey: scenario,
    levelKey: level,
    context,
    isFirstTurn,
    isFinalTurn,
  });

  // Always prepend hidden starter message "Begin the interview."
  // Note: the model contents must alternate user / model
  const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [
    {
      role: 'user',
      parts: [{ text: 'Begin the interview.' }],
    },
  ];

  for (const msg of messages) {
    contents.push({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    });
  }

  // Model call with max 2 attempts (PRD Section 17, 19, 20)
  let attempt = 0;
  let lastError: Error | null = null;
  let replyText = '';

  while (attempt < LLM_CONFIG.chat.maxCalls) {
    attempt++;
    try {
      const result = await callLLM({
        systemInstruction,
        contents,
        temperature: LLM_CONFIG.chat.temperature,
        maxOutputTokens: LLM_CONFIG.chat.maxOutputTokens,
        timeoutMs: LLM_CONFIG.chat.timeoutMs,
      });

      replyText = result.text;

      // If the model broke character and we have a call left, retry once
      if (breaksCharacter(replyText) && attempt < LLM_CONFIG.chat.maxCalls) {
        continue;
      }

      break;
    } catch (err: unknown) {
      lastError = err as Error;
      const errStr = String(err);
      if (errStr.includes('429') || errStr.includes('quota') || errStr.includes('RESOURCE_EXHAUSTED')) {
        res.status(429).json({ error: 'We are busy, please try again in a moment.' });
        return;
      }

      if (attempt < LLM_CONFIG.chat.maxCalls) {
        continue;
      }
    }
  }

  if (!replyText) {
    console.error('[ReplyCoach Chat Error]', lastError?.message || 'Chat generation failed');
    res.status(500).json({ error: 'The interviewer is having trouble. Please try again.' });
    return;
  }

  const isDone = realUserMessageCount >= maxTurns;

  res.json({
    reply: replyText,
    done: isDone,
  });
});

/**
 * POST /api/feedback
 * Evaluates the completed conversation and returns structured, evidence-based feedback.
 * (PRD Section 14 & 15)
 */
apiRouter.post('/feedback', async (req: Request, res: Response) => {
  const validation = validateFeedbackRequest(req.body);
  if (validation.error || !validation.data) {
    res.status(400).json({ error: validation.error || 'Invalid feedback request' });
    return;
  }

  const { scenario, level, context, messages, realUserAnswers } = validation.data;

  const systemInstruction = buildEvaluatorSystemPrompt({
    scenarioKey: scenario,
    levelKey: level,
  });

  const { userMessage, userAnswers } = buildEvaluatorUserMessage({
    context,
    messages,
  });

  let attempt = 0;
  let lastError: Error | null = null;
  let finalFeedback = null;

  while (attempt < LLM_CONFIG.feedback.maxCalls) {
    attempt++;
    try {
      const result = await callLLM({
        systemInstruction,
        contents: [
          {
            role: 'user',
            parts: [{ text: userMessage }],
          },
        ],
        temperature: LLM_CONFIG.feedback.temperature,
        maxOutputTokens: LLM_CONFIG.feedback.maxOutputTokens,
        timeoutMs: LLM_CONFIG.feedback.timeoutMs,
        responseMimeType: 'application/json',
        responseSchema: feedbackSchema,
      });

      // Try initial parsing & grounding
      let groundResult = validateAndGroundFeedback(result.text, userAnswers);

      // On parse/schema failure, strip backticks and retry parsing before using the second call
      if (!groundResult.valid && result.text) {
        let stripped = result.text.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
        const jsonMatch = stripped.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          stripped = jsonMatch[0];
        }
        groundResult = validateAndGroundFeedback(stripped, userAnswers);
      }

      if (groundResult.valid && groundResult.feedback) {
        finalFeedback = groundResult.feedback;
        break;
      } else {
        lastError = new Error(groundResult.reason || 'Feedback validation failed');
      }
    } catch (err: unknown) {
      lastError = err as Error;
      const errStr = String(err);
      if (errStr.includes('429') || errStr.includes('quota') || errStr.includes('RESOURCE_EXHAUSTED')) {
        res.status(429).json({ error: 'We are busy, please try again in a moment.' });
        return;
      }
    }
  }

  if (!finalFeedback) {
    console.error('[ReplyCoach Feedback Error]', lastError?.message || 'Feedback generation failed');
    res.status(500).json({ error: 'Feedback is taking too long. Please try again.' });
    return;
  }

  res.json({ feedback: finalFeedback });
});
