import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  BarChart3,
  Trash2,
  Sparkles,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { SavedSessionRecord, ScenarioId } from '../types.js';
import { getSavedSessions, clearSessionHistory } from '../utils/historyStorage.js';

interface DashboardViewProps {
  onBack: () => void;
  onSelectScenario: (scenarioId: ScenarioId) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onBack,
  onSelectScenario,
}) => {
  const [sessions, setSessions] = useState<SavedSessionRecord[]>([]);

  useEffect(() => {
    setSessions(getSavedSessions());
  }, []);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your practice history?')) {
      clearSessionHistory();
      setSessions([]);
    }
  };

  const totalSessions = sessions.length;
  const avgClarity = totalSessions > 0 ? (sessions.reduce((acc, s) => acc + s.scores.clarity, 0) / totalSessions).toFixed(1) : '0';
  const avgTone = totalSessions > 0 ? (sessions.reduce((acc, s) => acc + s.scores.tone, 0) / totalSessions).toFixed(1) : '0';
  const avgConfidence = totalSessions > 0 ? (sessions.reduce((acc, s) => acc + s.scores.confidence, 0) / totalSessions).toFixed(1) : '0';
  const avgStructure = totalSessions > 0 ? (sessions.reduce((acc, s) => acc + s.scores.structure, 0) / totalSessions).toFixed(1) : '0';

  const chartSessions = [...sessions].reverse().slice(-10);

  return (
    <div className="py-2 pb-16 space-y-6">
      {/* Top Header Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="min-h-[44px] -ml-2 px-2 text-[#475569] hover:text-[#0F172A] rounded-[12px] flex items-center gap-1.5 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:outline-none cursor-pointer"
            aria-label="Back to home screen"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          {totalSessions > 0 && (
            <button
              type="button"
              onClick={handleClearHistory}
              className="min-h-[44px] px-3 text-xs font-medium text-[#B91C1C] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#0F766E]" />
            Practice Progress Dashboard
          </h1>
          <p className="text-sm text-[#475569] mt-0.5">
            Track communication scores and feedback trends across your practice sessions.
          </p>
        </div>
      </div>

      {totalSessions === 0 ? (
        /* Empty State */
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-[12px] bg-[#F1F5F9] flex items-center justify-center mx-auto text-[#0F766E]">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-[#0F172A]">No practice sessions recorded yet</h2>
            <p className="text-sm text-[#475569] max-w-sm mx-auto">
              Complete your first interview session to begin logging Clarity, Tone, Confidence, and Structure scores.
            </p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-[#0F766E] hover:bg-[#115E59] active:bg-[#134E4A] text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Start First Session
          </button>
        </div>
      ) : (
        <>
          {/* Average Score Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 space-y-1">
              <span className="text-xs font-semibold text-[#475569] block">
                Avg Clarity
              </span>
              <div className="text-xl sm:text-2xl font-bold text-[#0F172A] font-mono">
                {avgClarity}<span className="text-xs text-[#94A3B8] font-normal">/10</span>
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 space-y-1">
              <span className="text-xs font-semibold text-[#475569] block">
                Avg Tone
              </span>
              <div className="text-xl sm:text-2xl font-bold text-[#0F172A] font-mono">
                {avgTone}<span className="text-xs text-[#94A3B8] font-normal">/10</span>
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 space-y-1">
              <span className="text-xs font-semibold text-[#475569] block">
                Avg Confidence
              </span>
              <div className="text-xl sm:text-2xl font-bold text-[#0F172A] font-mono">
                {avgConfidence}<span className="text-xs text-[#94A3B8] font-normal">/10</span>
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 space-y-1">
              <span className="text-xs font-semibold text-[#475569] block">
                Avg Structure
              </span>
              <div className="text-xl sm:text-2xl font-bold text-[#0F172A] font-mono">
                {avgStructure}<span className="text-xs text-[#94A3B8] font-normal">/10</span>
              </div>
            </div>
          </div>

          {/* Score Trend Chart */}
          <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 space-y-3">
            <div className="space-y-0.5">
              <h2 className="text-base font-bold text-[#0F172A]">
                Recent Sessions Progression
              </h2>
              <p className="text-xs text-[#475569]">
                Scores out of 10 for your last {chartSessions.length} sessions
              </p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#475569] pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0F766E]" />
                Clarity
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" />
                Tone
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" />
                Confidence
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
                Structure
              </span>
            </div>

            {/* SVG Graph with horizontal scroll safety */}
            <div className="pt-2 overflow-x-auto">
              <div className="min-w-[440px] h-48 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-4 flex flex-col justify-between">
                <div className="relative flex-1 flex flex-col justify-between text-[10px] text-[#94A3B8] border-b border-l border-[#CBD5E1]">
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[10, 8, 6, 4, 2].map((val) => (
                      <div key={val} className="w-full border-t border-[#E2E8F0] flex items-center">
                        <span className="absolute -left-5 text-[10px] text-[#94A3B8]">{val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="h-full flex items-end justify-around px-2 z-10 pt-2">
                    {chartSessions.map((s, idx) => (
                      <div key={s.id || idx} className="flex flex-col items-center gap-1">
                        <div className="flex items-end gap-1 h-32">
                          <div
                            title={`Clarity: ${s.scores.clarity}/10`}
                            className="w-2 bg-[#0F766E] rounded-t"
                            style={{ height: `${(s.scores.clarity / 10) * 100}%` }}
                          />
                          <div
                            title={`Tone: ${s.scores.tone}/10`}
                            className="w-2 bg-[#0284C7] rounded-t"
                            style={{ height: `${(s.scores.tone / 10) * 100}%` }}
                          />
                          <div
                            title={`Confidence: ${s.scores.confidence}/10`}
                            className="w-2 bg-[#7C3AED] rounded-t"
                            style={{ height: `${(s.scores.confidence / 10) * 100}%` }}
                          />
                          <div
                            title={`Structure: ${s.scores.structure}/10`}
                            className="w-2 bg-[#D97706] rounded-t"
                            style={{ height: `${(s.scores.structure / 10) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-[#475569] mt-1">
                          #{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between text-[11px] text-[#94A3B8] pt-2">
                  <span>Earliest</span>
                  <span>Session Timeline</span>
                  <span>Latest</span>
                </div>
              </div>
            </div>
          </div>

          {/* Session History List */}
          <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5 space-y-4">
            <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0F766E]" />
              Session History ({totalSessions})
            </h2>

            <div className="divide-y divide-[#E2E8F0]">
              {sessions.map((record) => (
                <div key={record.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1 flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="font-bold text-[#0F172A]">
                        {record.scenarioTitle}
                      </span>
                      <span className="text-[#94A3B8]">·</span>
                      <span className="text-[#475569]">
                        {record.mode === 2 ? 'Quick Demo' : 'Standard'}
                      </span>
                      <span className="text-[#94A3B8]">·</span>
                      <span className="text-[#475569] capitalize">
                        {record.level} Style
                      </span>
                      <span className="text-[#94A3B8]">·</span>
                      <span className="text-[#94A3B8]">
                        {record.dateStr}
                      </span>
                    </div>
                    <p className="text-xs text-[#475569] line-clamp-1 italic">
                      &ldquo;{record.overall_summary}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#0F172A]">
                      <span>C:{record.scores.clarity}</span>
                      <span>T:{record.scores.tone}</span>
                      <span>Cf:{record.scores.confidence}</span>
                      <span>S:{record.scores.structure}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectScenario(record.scenarioId)}
                      className="min-h-[44px] px-3 rounded-[12px] border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#0F766E] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Practice</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
