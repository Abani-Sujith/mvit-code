import React from 'react';
import { BrainCircuit } from 'lucide-react';

export const HeroBannerSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-brand-600/20 via-surface to-background border border-brand-500/20 rounded-[2rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
       <div className="absolute top-0 right-0 p-8 opacity-5">
          <BrainCircuit className="w-64 h-64 text-brand-500" />
       </div>
       <div className="relative z-10 text-center sm:text-left sm:max-w-2xl">
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
             <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,1)]"></div>
             <span className="text-[10px] font-black tracking-[0.2em] text-brand-500 uppercase">System Live</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-textMain tracking-tight leading-none mb-4">Placement Intelligence</h1>
          <p className="text-sm sm:text-base text-textMuted font-medium leading-relaxed">Guiding students toward placement readiness through real-time performance tracking and behavioral insights.</p>
       </div>
    </div>
  );
};

export default HeroBannerSection;
