import React from 'react';
import { ShieldAlert, Activity, TrendingUp, ArrowRight } from 'lucide-react';

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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
       <button 
         onClick={() => onSelectFilter('inactive')}
         className="bg-surface border border-border rounded-3xl p-6 hover:border-red-500/50 hover:shadow-2xl transition-all group relative text-left"
       >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <ShieldAlert className="w-12 h-12 text-red-500" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-red-500 mb-1">{inactiveCount}</h3>
          <p className="text-[11px] text-textMuted uppercase font-extrabold tracking-widest">Inactive Students</p>
          <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-red-500/80 group-hover:translate-x-1 transition-transform">
             VIEW AT-RISK <ArrowRight className="w-3 h-3" />
          </div>
       </button>
       
       <button 
         onClick={() => onSelectFilter('trial')}
         className="bg-surface border border-border rounded-3xl p-6 hover:border-yellow-500/50 hover:shadow-2xl transition-all group relative text-left"
       >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <Activity className="w-12 h-12 text-yellow-500" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-yellow-500 mb-1">{trialCount}</h3>
          <p className="text-[11px] text-textMuted uppercase font-extrabold tracking-widest">Performance Risk</p>
          <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-yellow-500/80 group-hover:translate-x-1 transition-transform">
             DIAGNOSE ISSUES <ArrowRight className="w-3 h-3" />
          </div>
       </button>

       <button 
         onClick={() => onSelectFilter('rapid')}
         className="bg-surface border border-border rounded-3xl p-6 hover:border-green-500/50 hover:shadow-2xl transition-all group relative text-left"
       >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <TrendingUp className="w-12 h-12 text-green-500" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-green-500 mb-1">{rapidCount}</h3>
          <p className="text-[11px] text-textMuted uppercase font-extrabold tracking-widest">Growth Stars</p>
          <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-green-500/80 group-hover:translate-x-1 transition-transform">
             VIEW HIGH PERFORMERS <ArrowRight className="w-3 h-3" />
          </div>
       </button>
    </div>
  );
};

export default RiskCardsSection;
