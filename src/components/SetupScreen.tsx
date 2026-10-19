import React, { useState } from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { ScenarioId, DifficultyLevel, SessionMode } from '../types.js';

interface SetupScreenProps {
  scenarioId: ScenarioId;
  onBack: () => void;
  onStartSession: (config: {
    mode: SessionMode;
    level: DifficultyLevel;
    context: string;
  }) => void;
}

const SCENARIO_DETAILS: Record<
  ScenarioId,
  {
    title: string;
    description: string;
    placeholder: string;
  }
> = {
  job_interview: {
    title: 'Job Interview',
    description: 'Entry-level role with a Pakistani hiring manager. Covers background, teamwork, and technical problem-solving.',
    placeholder: 'Optional context: E.g., Fresh CS graduate from FAST applying for Associate Software Engineer. Final year project built with React and Node.js.',
  },
  internship_interview: {
    title: 'Internship Interview',
    description: 'Interview with a startup or team lead focusing on coursework, side projects, coachability, and summer availability.',
    placeholder: 'Optional context: E.g., 6th-semester Software Engineering student at NUST. Built a mobile expense tracker in React Native.',
  },
  salary_negotiation: {
    title: 'Salary/Offer Negotiation',
    description: 'Constructive counter-offer discussion with an HR manager using Pakistani market compensation benchmarks.',
    placeholder: 'Optional context: E.g., Offer: PKR 110,000. My target: PKR 135,000 based on hands-on project experience in Karachi.',
  },
  scholarship_interview: {
    title: 'Scholarship Interview',
    description: 'Interview with an academic panel regarding your research vision, leadership, and plans to contribute to Pakistan.',
    placeholder: 'Optional context: E.g., Applying for Master in Environmental Sciences to build affordable water filtration systems for rural Sindh.',
  },
  visa_interview: {
    title: 'Visa Interview',
    description: 'Formal, concise consular interview focusing on study plans, funding documentation, and definite ties to return to Pakistan.',
    placeholder: 'Optional context: E.g., F-1 visa for MS in Computer Science at Purdue. 50% assistantship + family savings in Lahore.',
  },
};

export const SetupScreen: React.FC<SetupScreenProps> = ({
  scenarioId,
  onBack,
  onStartSession,
}) => {
  const scenario = SCENARIO_DETAILS[scenarioId] || SCENARIO_DETAILS.job_interview;

  const [mode, setMode] = useState<SessionMode>(2);
  const [level, setLevel] = useState<DifficultyLevel>('friendly');
  const [context, setContext] = useState('');

  const maxChars = 500;
  const charCount = context.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartSession({
      mode,
      level,
      context: context.trim(),
    });
  };

  return (
    <div className="py-2 pb-24 space-y-6">
      {/* Top Header with Back Arrow and Scenario Title */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="min-h-[44px] min-w-[44px] -ml-2 text-[#475569] hover:text-[#0F172A] rounded-[12px] flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:outline-none cursor-pointer"
            aria-label="Back to scenario selection"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A]">
            {scenario.title} Setup
          </h1>
        </div>
        <p className="text-sm text-[#475569] pl-9">
          {scenario.description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Segmented Control 1: Session Length */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569]">
            Session Length
          </label>
          <div className="grid grid-cols-2 gap-1 p-1 bg-[#F1F5F9] rounded-[12px] border border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => setMode(2)}
              className={`min-h-[44px] px-3 py-2 text-sm font-semibold rounded-[8px] transition-colors cursor-pointer ${
                mode === 2
                  ? 'bg-white text-[#0F766E] shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              Quick Demo (2 Questions)
            </button>
            <button
              type="button"
              onClick={() => setMode(5)}
              className={`min-h-[44px] px-3 py-2 text-sm font-semibold rounded-[8px] transition-colors cursor-pointer ${
                mode === 5
                  ? 'bg-white text-[#0F766E] shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              Standard (5 Questions)
            </button>
          </div>
          <p className="text-xs text-[#475569] pl-1">
            {mode === 2
              ? 'Two questions, ideal for a fast 2-minute practice session.'
              : 'Five questions with multi-turn follow-ups for a complete interview simulation.'}
          </p>
        </div>

        {/* Segmented Control 2: Interviewer Style */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569]">
            Interviewer Style
          </label>
          <div className="grid grid-cols-2 gap-1 p-1 bg-[#F1F5F9] rounded-[12px] border border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => setLevel('friendly')}
              className={`min-h-[44px] px-3 py-2 text-sm font-semibold rounded-[8px] transition-colors cursor-pointer ${
                level === 'friendly'
                  ? 'bg-white text-[#0F766E] shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              Friendly
            </button>
            <button
              type="button"
              onClick={() => setLevel('strict')}
              className={`min-h-[44px] px-3 py-2 text-sm font-semibold rounded-[8px] transition-colors cursor-pointer ${
                level === 'strict'
                  ? 'bg-white text-[#0F766E] shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              Strict
            </button>
          </div>
          <p className="text-xs text-[#475569] pl-1">
            {level === 'friendly'
              ? 'Warm, encouraging, and patient with gentle follow-ups.'
              : 'Formal, direct, and probes vague answers for specifics and numbers.'}
          </p>
        </div>

        {/* Optional Context Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="setup-context" className="block text-xs font-semibold uppercase tracking-wider text-[#475569]">
              Your Background <span className="text-[#94A3B8] font-normal lowercase">(optional)</span>
            </label>
            <span className={`text-xs ${charCount > 450 ? 'text-[#B91C1C] font-semibold' : 'text-[#94A3B8]'}`}>
              {charCount} / {maxChars}
            </span>
          </div>
          <textarea
            id="setup-context"
            rows={3}
            maxLength={maxChars}
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder={scenario.placeholder}
            dir="auto"
            className="w-full text-base p-3.5 rounded-[12px] border border-[#E2E8F0] bg-white placeholder-[#94A3B8] text-[#0F172A] focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] transition-colors resize-none leading-relaxed"
          />
          <p className="text-xs text-[#475569]">
            Adding your specific role, university, or offer figures helps the interviewer ask tailored questions.
          </p>
        </div>

        {/* Large Start Button Fixed at Bottom */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-[#E2E8F0] z-20">
          <div className="max-w-[720px] mx-auto">
            <button
              type="submit"
              className="w-full min-h-[48px] py-3.5 px-6 rounded-[12px] bg-[#0F766E] hover:bg-[#115E59] active:bg-[#134E4A] text-white font-semibold text-base transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F766E] focus-visible:outline-none cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Practice Session</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
