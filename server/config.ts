/**
 * Central LLM and Application Configuration
 * Follows PRD Section 19: Model Settings
 */

export const LLM_CONFIG = {
  provider: 'gemini',
  model: 'gemini-3.1-flash-lite',
  fallbackModel: 'gemini-3.8-flash',
  chat: {
    temperature: 0.7,
    maxOutputTokens: 300,
    timeoutMs: 15000,
    maxCalls: 2,
  },
  feedback: {
    temperature: 0.3,
    maxOutputTokens: 1500,
    timeoutMs: 20000,
    maxCalls: 2,
  },
} as const;

export const SCENARIOS = {
  job_interview: {
    id: 'job_interview',
    name: 'Job Interview',
    roleDescription:
      'A hiring manager at a mid-sized Pakistani company interviewing for an entry-level role. Topics: introduction, strengths and weaknesses, project or internship experience, pressure, teamwork, motivation, career goals, expected salary.',
    openingInstruction: 'Introduce yourself briefly, then ask the first interview question.',
  },
  internship_interview: {
    id: 'internship_interview',
    name: 'Internship Interview',
    roleDescription:
      'A team lead at a company or startup in Pakistan interviewing for an internship. Topics: motivation, coursework, projects, willingness to learn, availability, and learning goals.',
    openingInstruction: 'Introduce yourself briefly, then ask why the candidate is interested in the internship.',
  },
  salary_negotiation: {
    id: 'salary_negotiation',
    name: 'Salary/Offer Negotiation',
    roleDescription:
      'An HR manager who has made a job offer. The candidate wants to negotiate. Push back realistically about budget while remaining open to reasonable arguments about skills, market rates, and benefits.',
    openingInstruction:
      'If the candidate context includes an offer figure, state that figure as the offer. If not, say the offer is "in line with our entry-level band." Then ask how the candidate feels about the offer and whether they would like to discuss it. Do not invent a precise salary figure.',
  },
  scholarship_interview: {
    id: 'scholarship_interview',
    name: 'Scholarship Interview',
    roleDescription:
      'A scholarship selection panel member. Topics: academic background, leadership, community impact, program fit, study plan, and plans to contribute to Pakistan.',
    openingInstruction: "Introduce yourself briefly, then ask about the candidate's academic background and motivation.",
  },
  visa_interview: {
    id: 'visa_interview',
    name: 'Visa Interview',
    roleDescription:
      'A consular officer conducting a short, formal interview. Topics: travel purpose, study/work plans, funding, ties to Pakistan, and plans after the stay. Keep a neutral tone. Never promise or hint at an outcome.',
    openingInstruction: "Introduce yourself briefly, then ask the purpose of the candidate's travel.",
  },
} as const;

export type ScenarioKey = keyof typeof SCENARIOS;

export const DIFFICULTY_LEVELS = {
  friendly: {
    id: 'friendly',
    name: 'Friendly',
    description: 'Warm, encouraging, and patient. Uses gentle follow-ups.',
  },
  strict: {
    id: 'strict',
    name: 'Strict',
    description: 'Formal, direct, and time-conscious. Probes vague answers and asks for specifics or numbers. Not rude.',
  },
} as const;

export type DifficultyKey = keyof typeof DIFFICULTY_LEVELS;
