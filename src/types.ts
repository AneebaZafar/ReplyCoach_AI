export type ScenarioId =
  | 'job_interview'
  | 'internship_interview'
  | 'salary_negotiation'
  | 'scholarship_interview'
  | 'visa_interview';

export type DifficultyLevel = 'friendly' | 'strict';
export type SessionMode = 2 | 5; // 2: Quick Demo, 5: Standard

export interface ChatMessage {
  role: 'assistant' | 'user';
  content: string;
}

export interface FeedbackScore {
  clarity: number;
  tone: number;
  confidence: number;
  structure: number;
}

export interface FeedbackStrength {
  point: string;
  evidence: string;
}

export interface FeedbackImprovement {
  point: string;
  evidence: string;
  fix: string;
}

export interface FlaggedPhrase {
  phrase: string;
  suggestion: string;
}

export interface FeedbackData {
  scores: FeedbackScore;
  overall_summary: string;
  strengths: FeedbackStrength[];
  improvements: FeedbackImprovement[];
  flagged_phrases: FlaggedPhrase[];
  weakest_answer_index: number;
  weakest_answer: string;
  rewrite: string;
  next_step: string;
}

export interface SavedSessionRecord {
  id: string;
  timestamp: number;
  dateStr: string;
  scenarioId: ScenarioId;
  scenarioTitle: string;
  mode: SessionMode;
  level: DifficultyLevel;
  scores: FeedbackScore;
  overall_summary: string;
}
