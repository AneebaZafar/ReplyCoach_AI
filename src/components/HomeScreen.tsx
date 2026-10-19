import React from 'react';
import {
  Briefcase,
  GraduationCap,
  Banknote,
  Award,
  Plane,
  ChevronRight,
  ShieldCheck,
  MessageSquareQuote,
} from 'lucide-react';
import { ScenarioId } from '../types.js';

interface HomeScreenProps {
  onSelectScenario: (id: ScenarioId) => void;
  onOpenDashboard?: () => void;
}

interface ScenarioCardItem {
  id: ScenarioId;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectScenario }) => {
  const scenarios: ScenarioCardItem[] = [
    {
      id: 'job_interview',
      name: 'Job Interview',
      description: 'Interview with a Pakistani hiring manager covering background, teamwork, and technical problem-solving.',
      icon: <Briefcase className="w-5 h-5 text-[#0F766E]" />,
    },
    {
      id: 'internship_interview',
      name: 'Internship Interview',
      description: 'Discuss coursework, side projects, learning agility, and summer availability with a team lead.',
      icon: <GraduationCap className="w-5 h-5 text-[#0F766E]" />,
    },
    {
      id: 'salary_negotiation',
      name: 'Salary/Offer Negotiation',
      description: 'Rehearse counter-offers with an HR manager constructively using Pakistani market compensation benchmarks.',
      icon: <Banknote className="w-5 h-5 text-[#0F766E]" />,
    },
    {
      id: 'scholarship_interview',
      name: 'Scholarship Interview',
      description: 'Present your academic achievements, leadership, and long-term plans to contribute to Pakistan.',
      icon: <Award className="w-5 h-5 text-[#0F766E]" />,
    },
    {
      id: 'visa_interview',
      name: 'Visa Interview',
      description: 'Practice concise and factual answers on study plans, funding, and ties to Pakistan with a consular officer.',
      icon: <Plane className="w-5 h-5 text-[#0F766E]" />,
    },
  ];

  return (
    <div className="space-y-8 py-2">
      {/* Intro Header */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-[#0F766E]">
          <div className="w-8 h-8 rounded-[12px] bg-[#0F766E]/10 flex items-center justify-center">
            <MessageSquareQuote className="w-4 h-4 text-[#0F766E]" />
          </div>
          <span className="text-sm font-semibold tracking-wide">ReplyCoach</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] leading-tight">
          Practice the conversations that shape your future.
        </h1>

        <p className="text-base text-[#475569] leading-relaxed max-w-xl">
          Rehearse high-stakes interviews and negotiations with an AI coach and receive structured, evidence-based feedback on your answers.
        </p>
      </section>

      {/* Five Scenario Cards */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#475569]">
          Choose a Scenario
        </h2>

        <div className="space-y-3">
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => onSelectScenario(sc.id)}
              className="w-full text-left p-4 sm:p-5 rounded-[12px] bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] transition-colors flex items-center justify-between gap-4 group focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:outline-none cursor-pointer min-h-[44px]"
              aria-label={`Start practice for ${sc.name}`}
            >
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-[#F1F5F9] flex items-center justify-center shrink-0 mt-0.5">
                  {sc.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-[#0F172A] group-hover:text-[#0F766E] transition-colors">
                    {sc.name}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {sc.description}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-[#94A3B8] group-hover:text-[#0F766E] transition-colors shrink-0" />
            </button>
          ))}
        </div>
      </section>

      {/* Small Privacy Note */}
      <section className="rounded-[12px] bg-white border border-[#E2E8F0] p-4 text-xs sm:text-sm text-[#475569] leading-relaxed flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold text-[#0F172A] block mb-0.5">Privacy Notice</strong>
          Your conversation text is processed by a third-party AI provider only to generate practice feedback. Do not enter sensitive personal information such as your CNIC, phone number, address, financial details, or passwords.
        </div>
      </section>
    </div>
  );
};
