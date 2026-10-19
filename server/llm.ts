import { GoogleGenAI } from '@google/genai';
import { LLM_CONFIG } from './config.js';

let genAIClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('[ReplyCoach] Missing GEMINI_API_KEY in environment variables.');
    }
    genAIClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

export interface LLMCallParams {
  systemInstruction?: string;
  contents: Array<{
    role: 'user' | 'model';
    parts: Array<{ text: string }>;
  }>;
  temperature?: number;
  maxOutputTokens?: number;
  responseMimeType?: string;
  responseSchema?: unknown;
  timeoutMs?: number;
}

export interface LLMCallResult {
  text: string;
}

/**
 * Universal wrapper for LLM calls so alternative providers can be plugged in easily.
 * PRD & User requirement: wrap model call in one function callLLM().
 */
export async function callLLM(params: LLMCallParams): Promise<LLMCallResult> {
  const ai = getAIClient();
  const timeoutMs = params.timeoutMs ?? LLM_CONFIG.chat.timeoutMs;

  const controller = new AbortController();
  const timer = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const config: Record<string, unknown> = {
      temperature: params.temperature ?? LLM_CONFIG.chat.temperature,
      maxOutputTokens: params.maxOutputTokens ?? LLM_CONFIG.chat.maxOutputTokens,
    };

    if (params.systemInstruction) {
      config.systemInstruction = params.systemInstruction;
    }

    if (params.responseMimeType) {
      config.responseMimeType = params.responseMimeType;
    }

    if (params.responseSchema) {
      config.responseSchema = params.responseSchema;
    }

    // Attempt call with primary model, then fallback model if quota exhausted
    const tryModels = [LLM_CONFIG.model, LLM_CONFIG.fallbackModel];
    let lastErr: Error | null = null;

    for (const modelName of tryModels) {
      try {
        const generatePromise = ai.models.generateContent({
          model: modelName,
          contents: params.contents,
          config,
        });

        const timeoutPromise = new Promise<never>((_, reject) => {
          controller.signal.addEventListener('abort', () => {
            const err = new Error('LLM call timed out');
            err.name = 'TimeoutError';
            reject(err);
          });
        });

        const response = await Promise.race([generatePromise, timeoutPromise]);
        const text = response.text || '';
        return { text: text.trim() };
      } catch (err: unknown) {
        lastErr = err as Error;
        const errStr = String(err);
        // Only try next model if 429 / quota failure occurred
        if (errStr.includes('429') || errStr.includes('quota') || errStr.includes('RESOURCE_EXHAUSTED')) {
          continue;
        }
        throw err;
      }
    }

    throw lastErr || new Error('All model attempts failed');
  } finally {
    clearTimeout(timer);
  }
}
