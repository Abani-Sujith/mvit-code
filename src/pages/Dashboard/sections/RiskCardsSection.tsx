import React from 'react';
import { ArrowRight } from 'lucide-react';

interface RiskCardsSectionProps {
  inactiveCount: number;
  trialCount: number;
  rapidCount: number;
  onSelectFilter: (filter: 'inactive' | 'trial' | 'rapid') => void;
}

export const RiskCardsSection: React.FC<RiskCardsSectionProps> = ({
  inactiveCount,
  trialCount,
  rapidCount,
  onSelectFilter,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 select-none">
       {/* Card 1: Inactive */}
       <button 
         type="button"
         onClick={() => onSelectFilter('inactive')}
         className="bg-pure-white border-2 border-ink-black rounded-3xl p-6 hover:bg-surface-tint transition-none text-left flex flex-col justify-between min-h-[170px]"
       >
          <div>
            <div className="font-label-lg text-xs text-ink-black font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-error"></span>
              Inactive Students
            </div>
            <div className="font-headline-lg text-4xl sm:text-5xl font-black text-error leading-none tracking-tight">
              {inactiveCount}
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-black text-pure-white px-3.5 py-1 font-label-sm text-[11px] uppercase tracking-wider border border-ink-black">
              View at-risk <ArrowRight className="w-3 h-3 text-primary-container" />
            </span>
          </div>
       </button>
       
       {/* Card 2: Performance Risk */}
       <button 
         type="button"
         onClick={() => onSelectFilter('trial')}
         className="bg-pure-white border-2 border-ink-black rounded-3xl p-6 hover:bg-surface-tint transition-none text-left flex flex-col justify-between min-h-[170px]"
       >
          <div>
            <div className="font-label-lg text-xs text-ink-black font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              Performance Risk
            </div>
            <div className="font-headline-lg text-4xl sm:text-5xl font-black text-primary-container leading-none tracking-tight">
              {trialCount}
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-black text-pure-white px-3.5 py-1 font-label-sm text-[11px] uppercase tracking-wider border border-ink-black">
              Diagnose <ArrowRight className="w-3 h-3 text-primary-container" />
            </span>
          </div>
       </button>

       {/* Card 3: Growth Stars */}
       <button 
         type="button"
         onClick={() => onSelectFilter('rapid')}
         className="bg-pure-white border-2 border-ink-black rounded-3xl p-6 hover:bg-surface-tint transition-none text-left flex flex-col justify-between min-h-[170px]"
       >
          <div>
            <div className="font-label-lg text-xs text-ink-black font-bold uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-ink-black"></span>
              Growth Stars
            </div>
            <div className="font-headline-lg text-4xl sm:text-5xl font-black text-ink-black leading-none tracking-tight">
              {rapidCount}
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-black text-pure-white px-3.5 py-1 font-label-sm text-[11px] uppercase tracking-wider border border-ink-black">
              View performers <ArrowRight className="w-3 h-3 text-primary-container" />
            </span>
          </div>
       </button>
    </div>
  );
};

export default RiskCardsSection;
