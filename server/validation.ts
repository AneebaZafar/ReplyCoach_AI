import { SCENARIOS, DIFFICULTY_LEVELS, ScenarioKey, DifficultyKey } from './config.js';
import { sanitizeUserInput, ChatMessage } from './prompts.js';

export interface ValidatedChatPayload {
  scenario: ScenarioKey;
  level: DifficultyKey;
  maxTurns: 2 | 5;
  context: string;
  messages: ChatMessage[];
  realUserMessageCount: number;
}

export interface ValidatedFeedbackPayload {
  scenario: ScenarioKey;
  level: DifficultyKey;
  context: string;
  messages: ChatMessage[];
  realUserAnswers: string[];
}

export interface FeedbackReport {
  scores: {
    clarity: number;
    tone: number;
    confidence: number;
    structure: number;
  };
  overall_summary: string;
  strengths: Array<{
    point: string;
    evidence: string;
  }>;
  improvements: Array<{
    point: string;
    evidence: string;
    fix: string;
  }>;
  flagged_phrases: Array<{
    phrase: string;
    suggestion: string;
  }>;
  weakest_answer_index: number;
  weakest_answer: string;
  rewrite: string;
  next_step: string;
}

/**
 * Validates chat request body (PRD Section 10)
 */
export function validateChatRequest(body: unknown): { error?: string; data?: ValidatedChatPayload } {
  if (!body || typeof body !== 'object') {
    return { error: 'Invalid request body.' };
  }

  const { scenario, level, maxTurns, context, messages } = body as Record<string, unknown>;

  // Scenario validation
  if (!scenario || typeof scenario !== 'string' || !(scenario in SCENARIOS)) {
    return { error: `Invalid scenario. Allowed: ${Object.keys(SCENARIOS).join(', ')}` };
  }

  // Level validation
  if (!level || typeof level !== 'string' || !(level in DIFFICULTY_LEVELS)) {
    return { error: 'Level must be "friendly" or "strict".' };
  }

  // maxTurns validation
  if (maxTurns !== 2 && maxTurns !== 5) {
    return { error: 'maxTurns must be 2 or 5.' };
  }

  // Context validation (optional, max 500 chars)
  const trimmedContext = typeof context === 'string' ? context.trim() : '';
  if (trimmedContext.length > 500) {
    return { error: 'Context cannot exceed 500 characters.' };
  }

  // Messages array validation
  if (!Array.isArray(messages)) {
    return { error: 'Messages must be an array.' };
  }

  if (messages.length > 20) {
    return { error: 'Message history exceeds maximum limit of 20 messages.' };
  }

  const cleanMessages: ChatMessage[] = [];
  let userCount = 0;

  // Empty messages array is valid for initial conversation kick-off
  if (messages.length > 0) {
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      if (!msg || typeof msg !== 'object') {
        return { error: 'Malformed message in history.' };
      }

      const role = (msg as Record<string, unknown>).role;
      const content = (msg as Record<string, unknown>).content;

      if (role !== 'assistant' && role !== 'user') {
        return { error: `Invalid message role "${role}".` };
      }

      if (typeof content !== 'string') {
        return { error: 'Message content must be a string.' };
      }

      const trimmedContent = content.trim();

      // Check empty or whitespace message
      if (trimmedContent.length === 0) {
        return { error: 'Please type your answer first.' };
      }

      // Check user message length
      if (role === 'user') {
        if (trimmedContent.length > 1200) {
          return { error: 'Message exceeds 1,200 character limit.' };
        }
        userCount++;
      }

      cleanMessages.push({
        role,
        content: sanitizeUserInput(trimmedContent),
      });
    }

    // Message ordering check
    // 1. First message from client must be 'assistant' (since starter was hidden)
    if (cleanMessages[0].role !== 'assistant') {
      return { error: 'Invalid message sequence: first message must be from interviewer.' };
    }

    // 2. Last message must be from user
    if (cleanMessages[cleanMessages.length - 1].role !== 'user') {
      return { error: 'Invalid message sequence: last message must be from user.' };
    }

    // 3. Must alternate
    for (let i = 1; i < cleanMessages.length; i++) {
      if (cleanMessages[i].role === cleanMessages[i - 1].role) {
        return { error: 'Invalid message order: roles must strictly alternate.' };
      }
    }

    // 4. User messages must not exceed maxTurns
    if (userCount > maxTurns) {
      return { error: `User message count (${userCount}) exceeds maximum turns (${maxTurns}).` };
    }
  }

  return {
    data: {
      scenario: scenario as ScenarioKey,
      level: level as DifficultyKey,
      maxTurns,
      context: sanitizeUserInput(trimmedContext),
      messages: cleanMessages,
      realUserMessageCount: userCount,
    },
  };
}

/**
 * Validates feedback request body (PRD Section 10 & 9.2)
 */
export function validateFeedbackRequest(body: unknown): { error?: string; data?: ValidatedFeedbackPayload } {
  if (!body || typeof body !== 'object') {
    return { error: 'Invalid request body.' };
  }

  const { scenario, level, context, messages } = body as Record<string, unknown>;

  if (!scenario || typeof scenario !== 'string' || !(scenario in SCENARIOS)) {
    return { error: `Invalid scenario. Allowed: ${Object.keys(SCENARIOS).join(', ')}` };
  }

  if (!level || typeof level !== 'string' || !(level in DIFFICULTY_LEVELS)) {
    return { error: 'Level must be "friendly" or "strict".' };
  }

  const trimmedContext = typeof context === 'string' ? context.trim() : '';
  if (trimmedContext.length > 500) {
    return { error: 'Context cannot exceed 500 characters.' };
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return { error: 'Feedback request must contain conversation messages.' };
  }

  const cleanMessages: ChatMessage[] = [];
  const realUserAnswers: string[] = [];

  for (const msg of messages) {
    if (!msg || typeof msg !== 'object') {
      return { error: 'Malformed message in history.' };
    }
    const role = (msg as Record<string, unknown>).role;
    const content = (msg as Record<string, unknown>).content;

    if (role !== 'assistant' && role !== 'user') {
      return { error: 'Invalid message role.' };
    }
    if (typeof content !== 'string' || !content.trim()) {
      return { error: 'Invalid message content.' };
    }

    const clean = sanitizeUserInput(content.trim());
    cleanMessages.push({ role, content: clean });
    if (role === 'user') {
      realUserAnswers.push(clean);
    }
  }

  if (realUserAnswers.length === 0) {
    return { error: 'Feedback request must contain at least one real user message.' };
  }

  return {
    data: {
      scenario: scenario as ScenarioKey,
      level: level as DifficultyKey,
      context: sanitizeUserInput(trimmedContext),
      messages: cleanMessages,
      realUserAnswers,
    },
  };
}

/**
 * Parses and strictly validates evaluator model JSON output, and grounds weakest_answer
 * (PRD Section 13, 14, 15)
 */
export function validateAndGroundFeedback(
  rawText: string,
  userAnswers: string[]
): { valid: boolean; feedback?: FeedbackReport; reason?: string } {
  try {
    // Strip markdown code fences if model returned ```json ... ```
    let cleanJson = rawText.trim();
    if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
    }

    const parsed = JSON.parse(cleanJson);
    if (!parsed || typeof parsed !== 'object') {
      return { valid: false, reason: 'Feedback root is not an object.' };
    }

    // Extract feedback wrapper if nested as { feedback: { ... } } or raw
    const obj = parsed.feedback && typeof parsed.feedback === 'object' ? parsed.feedback : parsed;

    // Validate scores
    const scores = obj.scores;
    if (!scores || typeof scores !== 'object') {
      return { valid: false, reason: 'Scores object is missing.' };
    }

    const clarity = Math.round(Number(scores.clarity));
    const tone = Math.round(Number(scores.tone));
    const confidence = Math.round(Number(scores.confidence));
    const structure = Math.round(Number(scores.structure));

    for (const [name, val] of Object.entries({ clarity, tone, confidence, structure })) {
      if (isNaN(val) || val < 1 || val > 10) {
        return { valid: false, reason: `Score ${name} must be an integer between 1 and 10 (got ${val}).` };
      }
    }

    // Validate overall summary (normalize if missing)
    let overallSummary = typeof obj.overall_summary === 'string' ? obj.overall_summary.trim() : '';
    if (!overallSummary) {
      overallSummary = `The candidate demonstrated a respectful and relevant approach to the conversation. With additional focus on structured examples and direct answers, communication impact will increase significantly.`;
    }

    // Validate strengths & improvements counts
    const isShortSession = userAnswers.length < 2;
    const minItems = isShortSession ? 1 : 2;

    const rawStrengths = Array.isArray(obj.strengths) ? obj.strengths : [];
    if (rawStrengths.length < minItems) {
      return { valid: false, reason: `strengths must contain at least ${minItems} items.` };
    }

    const normalizedStrengths: Array<{ point: string; evidence: string }> = [];
    for (const s of rawStrengths) {
      if (typeof s === 'string') {
        normalizedStrengths.push({ point: s.trim(), evidence: '' });
      } else if (s && typeof s === 'object' && typeof (s as Record<string, unknown>).point === 'string') {
        const point = String((s as Record<string, unknown>).point).trim();
        const evidence = typeof (s as Record<string, unknown>).evidence === 'string' ? String((s as Record<string, unknown>).evidence).trim() : '';
        if (point) normalizedStrengths.push({ point, evidence });
      }
    }

    if (normalizedStrengths.length < minItems) {
      return { valid: false, reason: `Valid strengths must contain at least ${minItems} items.` };
    }

    const rawImprovements = Array.isArray(obj.improvements) ? obj.improvements : [];
    if (rawImprovements.length < minItems) {
      return { valid: false, reason: `improvements must contain at least ${minItems} items.` };
    }

    const normalizedImprovements: Array<{ point: string; evidence: string; fix: string }> = [];
    for (const imp of rawImprovements) {
      if (typeof imp === 'string') {
        normalizedImprovements.push({ point: imp.trim(), evidence: '', fix: '' });
      } else if (imp && typeof imp === 'object' && typeof (imp as Record<string, unknown>).point === 'string') {
        const point = String((imp as Record<string, unknown>).point).trim();
        const evidence = typeof (imp as Record<string, unknown>).evidence === 'string' ? String((imp as Record<string, unknown>).evidence).trim() : '';
        const fix = typeof (imp as Record<string, unknown>).fix === 'string' ? String((imp as Record<string, unknown>).fix).trim() : '';
        if (point) normalizedImprovements.push({ point, evidence, fix });
      }
    }

    if (normalizedImprovements.length < minItems) {
      return { valid: false, reason: `Valid improvements must contain at least ${minItems} items.` };
    }

    // Flagged phrases (optional array)
    const flaggedPhrases: Array<{ phrase: string; suggestion: string }> = [];
    if (Array.isArray(obj.flagged_phrases)) {
      for (const item of obj.flagged_phrases) {
        if (item && typeof item === 'object') {
          const phrase = typeof (item as Record<string, unknown>).phrase === 'string' ? String((item as Record<string, unknown>).phrase).trim() : '';
          const suggestion = typeof (item as Record<string, unknown>).suggestion === 'string' ? String((item as Record<string, unknown>).suggestion).trim() : '';
          if (phrase && suggestion) {
            flaggedPhrases.push({ phrase, suggestion });
          }
        }
      }
    }

    // Rewrite and next step
    if (typeof obj.rewrite !== 'string' || !obj.rewrite.trim()) {
      return { valid: false, reason: 'rewrite must be a non-empty string.' };
    }

    if (typeof obj.next_step !== 'string' || !obj.next_step.trim()) {
      return { valid: false, reason: 'next_step must be a non-empty string.' };
    }

    // Validate weakest_answer_index
    let weakestIndex = Math.round(Number(obj.weakest_answer_index));
    if (isNaN(weakestIndex) || weakestIndex < 1 || weakestIndex > userAnswers.length) {
      weakestIndex = 1;
    }

    // Ground weakest_answer: Server fills weakest_answer using the exact user message from transcript!
    const exactWeakestAnswer = userAnswers[weakestIndex - 1] || userAnswers[0] || '';

    const feedbackReport: FeedbackReport = {
      scores: {
        clarity,
        tone,
        confidence,
        structure,
      },
      overall_summary: overallSummary,
      strengths: normalizedStrengths,
      improvements: normalizedImprovements,
      flagged_phrases: flaggedPhrases,
      weakest_answer_index: weakestIndex,
      weakest_answer: exactWeakestAnswer,
      rewrite: obj.rewrite.trim(),
      next_step: obj.next_step.trim(),
    };

    return { valid: true, feedback: feedbackReport };
  } catch (err) {
    return { valid: false, reason: (err as Error).message };
  }
}
