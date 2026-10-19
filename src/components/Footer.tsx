import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  isVisaScenario?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isVisaScenario }) => {
  return (
    <footer className="mt-auto py-6 px-4 border-t border-[#E2E8F0] bg-[#F8FAFC] no-print">
      <div className="max-w-[720px] mx-auto space-y-2 text-center text-xs text-[#475569]">
        <p className="flex items-center justify-center gap-1.5 leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-[#0F766E] shrink-0" />
          ReplyCoach provides practice feedback and is not a replacement for professional career counseling.
        </p>
        {isVisaScenario && (
          <p className="text-xs text-[#475569] font-medium bg-white border border-[#E2E8F0] rounded-[8px] py-1 px-3 max-w-md mx-auto">
            This is practice only. It does not predict visa outcomes or provide immigration advice.
          </p>
        )}
      </div>
    </footer>
  );
};
