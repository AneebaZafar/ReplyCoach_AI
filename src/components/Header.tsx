import React from 'react';
import { ArrowLeft, MessageSquareQuote, BarChart3 } from 'lucide-react';

interface HeaderProps {
  onBack?: () => void;
  showBack?: boolean;
  onOpenDashboard?: () => void;
  isDashboard?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onBack,
  showBack,
  onOpenDashboard,
  isDashboard,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E2E8F0] px-4 py-2.5 no-print">
      <div className="max-w-[720px] mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {showBack && onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="min-h-[44px] min-w-[44px] -ml-2 text-[#475569] hover:text-[#0F172A] rounded-[12px] hover:bg-[#F1F5F9] transition-colors flex items-center justify-center gap-1.5 text-sm font-medium focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:outline-none cursor-pointer"
              aria-label="Go back to previous screen"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>
          ) : (
            <div className="w-9 h-9 rounded-[12px] bg-[#0F766E] flex items-center justify-center text-white shrink-0">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
          )}

          <div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-[#0F172A] block leading-tight">
              ReplyCoach
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenDashboard && !isDashboard && (
            <button
              type="button"
              onClick={onOpenDashboard}
              className="min-h-[44px] px-3.5 rounded-[12px] border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] text-sm font-medium transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:outline-none cursor-pointer"
              aria-label="Open communication progress dashboard"
            >
              <BarChart3 className="w-4 h-4 text-[#0F766E]" />
              <span className="hidden sm:inline">Progress</span> Dashboard
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
