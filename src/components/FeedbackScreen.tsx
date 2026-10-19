import React, { useEffect } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Printer,
  Sparkles,
} from 'lucide-react';
import { ScenarioId, FeedbackData, SessionMode, DifficultyLevel } from '../types.js';
import { saveSessionToHistory } from '../utils/historyStorage.js';

interface FeedbackScreenProps {
  scenarioId: ScenarioId;
  scenarioTitle: string;
  feedback: FeedbackData;
  isShortSession: boolean;
  mode?: SessionMode;
  level?: DifficultyLevel;
  onRestartSameScenario: () => void;
  onChooseAnotherScenario: () => void;
}

/**
 * Calibrated Score Bands per PRD:
 * 1–3: Needs work
 * 4–5: Developing
 * 6–7: Solid
 * 8–9: Strong
 * 10: Exceptional
 * Never rely on color alone.
 */
function getScoreBandLabel(score: number): string {
  if (score >= 10) return 'Exceptional';
  if (score >= 8) return 'Strong';
  if (score >= 6) return 'Solid';
  if (score >= 4) return 'Developing';
  return 'Needs work';
}

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
  scenarioId,
  scenarioTitle,
  feedback,
  isShortSession,
  mode = 2,
  level = 'friendly',
  onRestartSameScenario,
  onChooseAnotherScenario,
}) => {
  const {
    scores,
    overall_summary,
    strengths,
    improvements,
    flagged_phrases,
    weakest_answer,
    rewrite,
    next_step,
  } = feedback;

  // Persist session to local storage for the Progress Dashboard
  useEffect(() => {
    saveSessionToHistory({
      scenarioId,
      scenarioTitle,
      mode,
      level,
      scores,
      overall_summary,
    });
  }, [scenarioId, scenarioTitle, mode, level, scores, overall_summary]);

  // Handle Save as PDF using window.print() with dynamic title
  const handleSaveAsPdf = () => {
    const originalTitle = document.title;
    const cleanDate = new Date().toISOString().slice(0, 10);
    document.title = `ReplyCoach Feedback - ${scenarioTitle} - ${cleanDate}`;

    const restoreTitle = () => {
      document.title = originalTitle;
      window.removeEventListener('afterprint', restoreTitle);
    };
    window.addEventListener('afterprint', restoreTitle);

    window.print();
  };

  const currentDateFormatted = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const isVisaScenario = scenarioId === 'visa_interview';

  const scoreDimensions = [
    { key: 'clarity', label: 'Clarity', score: scores.clarity },
    { key: 'tone', label: 'Tone', score: scores.tone },
    { key: 'confidence', label: 'Confidence', score: scores.confidence },
    { key: 'structure', label: 'Structure', score: scores.structure },
  ];

  return (
    <div className="py-2 pb-16 space-y-6">
      {/* PRINT-ONLY OFFICIAL HEADER */}
      <div className="print-only mb-6 border-b border-slate-900 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">ReplyCoach</h1>
            <p className="text-xs text-slate-600 font-medium">Practice Feedback Report · {currentDateFormatted}</p>
          </div>
          <div className="text-right text-xs text-slate-700 space-y-0.5">
            <div><strong>Scenario:</strong> {scenarioTitle}</div>
            <div><strong>Mode:</strong> {mode === 2 ? 'Quick Demo (2 Questions)' : 'Standard (5 Questions)'}</div>
            <div><strong>Style:</strong> {level === 'friendly' ? 'Friendly' : 'Strict'}</div>
          </div>
        </div>
      </div>

      {/* Neutral banner for short sessions */}
      {isShortSession && (
        <div className="p-4 rounded-[12px] bg-[#F1F5F9] border border-[#CBD5E1] text-sm text-[#334155] leading-relaxed flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#475569] shrink-0 mt-0.5 no-print" />
          <div>
            <strong className="block font-semibold text-[#0F172A] mb-0.5">
              Short practice session: feedback is based on limited answers.
            </strong>
            Complete a full Quick Demo or Standard session for a more comprehensive multi-turn assessment.
          </div>
        </div>
      )}

      {/* Top Header & Summary Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 sm:p-6 space-y-3 print-card">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0F766E]">
            {scenarioTitle} Evaluation
          </span>
          <button
            type="button"
            onClick={handleSaveAsPdf}
            className="no-print min-h-[44px] px-3.5 py-1.5 rounded-[12px] border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-xs font-medium transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:outline-none cursor-pointer"
            aria-label="Save feedback report as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-[#0F766E]" />
            Save as PDF
          </button>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
          Performance Feedback
        </h1>

        <p className="text-sm text-[#475569] leading-relaxed">
          {overall_summary}
        </p>
      </div>

      {/* 2x2 Score Cards */}
      <div className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#475569]">
          Dimension Scores (1–10)
        </h2>
        <div className="grid grid-cols-2 gap-3.5">
          {scoreDimensions.map((dim) => {
            const bandLabel = getScoreBandLabel(dim.score);
            return (
              <div
                key={dim.key}
                className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 flex flex-col justify-between space-y-2 print-card"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-semibold text-[#0F172A]">
                    {dim.label}
                  </span>
                  <span className="text-base font-bold text-[#0F172A] font-mono">
                    {dim.score}<span className="text-xs text-[#94A3B8] font-normal">/10</span>
                  </span>
                </div>

                <div className="text-xs font-medium text-[#475569]">
                  {bandLabel}
                </div>

                {/* Thin progress bar */}
                <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-[#0F766E] rounded-full"
                    style={{ width: `${Math.min(100, (dim.score / 10) * 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prominent Before/After Card (Your answer vs Stronger version) */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 sm:p-6 space-y-4 print-card">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#0F766E]" />
            Before & After Answer Analysis
          </span>
          <h2 className="text-base sm:text-lg font-bold text-[#0F172A]">
            Polishing Your Weakest Answer
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Your Answer */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-4 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#475569] block">
              Your Answer
            </span>
            <p dir="auto" className="text-sm text-[#0F172A] leading-relaxed italic">
              &ldquo;{weakest_answer}&rdquo;
            </p>
          </div>

          {/* Stronger Version */}
          <div className="bg-[#F0FDFA] border border-[#99F6E4] rounded-[12px] p-4 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] block">
              Stronger Version
            </span>
            <p dir="auto" className="text-sm text-[#0F172A] font-medium leading-relaxed">
              {rewrite}
            </p>
          </div>
        </div>
      </div>

      {/* Key Strengths Observed */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 sm:p-6 space-y-4 print-card">
        <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#0F766E] no-print" />
          Key Strengths Observed
        </h2>
        <div className="space-y-3">
          {strengths.map((s, idx) => (
            <div key={idx} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-3.5 text-sm space-y-1.5">
              <div className="font-semibold text-[#0F172A]">
                {s.point}
              </div>
              {s.evidence && (
                <div dir="auto" className="text-[#475569] pl-3 italic border-l-2 border-[#0F766E] text-xs leading-relaxed">
                  &ldquo;{s.evidence}&rdquo;
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actionable Improvements */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 sm:p-6 space-y-4 print-card">
        <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#0F766E] no-print" />
          Actionable Improvements
        </h2>
        <div className="space-y-3.5">
          {improvements.map((imp, idx) => (
            <div key={idx} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-3.5 text-sm space-y-2">
              <div className="font-semibold text-[#0F172A]">
                {imp.point}
              </div>
              {imp.evidence && (
                <div dir="auto" className="text-[#475569] pl-3 italic border-l-2 border-[#CBD5E1] text-xs leading-relaxed">
                  Observed: &ldquo;{imp.evidence}&rdquo;
                </div>
              )}
              {imp.fix && (
                <div dir="auto" className="bg-white border border-[#E2E8F0] rounded-[8px] p-3 text-sm text-[#0F172A]">
                  <span className="text-xs font-semibold text-[#0F766E] uppercase tracking-wider block mb-1">
                    What to say instead:
                  </span>
                  {imp.fix}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Flagged Phrase Chips */}
      {flagged_phrases && flagged_phrases.length > 0 && (
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 sm:p-6 space-y-3 print-card">
          <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[#0F766E] no-print" />
            Phrasing Adjustments
          </h2>
          <div className="flex flex-wrap gap-2">
            {flagged_phrases.map((phraseItem, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-[#F1F5F9] border border-[#E2E8F0] text-xs text-[#0F172A]"
              >
                <span dir="auto" className="line-through text-[#64748B] font-mono">
                  &ldquo;{phraseItem.phrase}&rdquo;
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
                <span dir="auto" className="font-semibold text-[#0F766E] font-mono">
                  &ldquo;{phraseItem.suggestion}&rdquo;
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Highlighted Next Step Box */}
      <div className="bg-[#F0FDFA] border border-[#0F766E]/30 rounded-[12px] p-5 sm:p-6 space-y-2 print-card">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] block">
          Your Next Practice Action
        </span>
        <p className="text-sm sm:text-base text-[#0F172A] leading-relaxed">
          {next_step}
        </p>
      </div>

      {/* PRINT-ONLY OFFICIAL DISCLAIMERS */}
      <div className="print-only mt-6 pt-4 border-t border-slate-300 text-center text-xs text-slate-600 space-y-1">
        <p>ReplyCoach provides practice feedback and is not a replacement for professional career counseling.</p>
        {isVisaScenario && (
          <p className="font-semibold text-slate-800">
            This is practice only. It does not predict visa outcomes or provide immigration advice.
          </p>
        )}
      </div>

      {/* Action Buttons: Try again (primary) & Choose another scenario (secondary) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 no-print">
        <button
          type="button"
          onClick={onRestartSameScenario}
          className="min-h-[48px] py-3 px-5 rounded-[12px] bg-[#0F766E] hover:bg-[#115E59] active:bg-[#134E4A] text-white font-semibold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:outline-none cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <button
          type="button"
          onClick={onChooseAnotherScenario}
          className="min-h-[48px] py-3 px-5 rounded-[12px] bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] font-semibold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:outline-none cursor-pointer"
        >
          <span>Choose Another Scenario</span>
        </button>
      </div>
    </div>
  );
};
