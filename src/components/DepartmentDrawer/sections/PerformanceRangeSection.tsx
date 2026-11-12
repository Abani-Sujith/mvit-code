import React from 'react';
import { AlertTriangle, Crown, Target } from 'lucide-react';

interface PerformanceRangeSectionProps {
  department: any;
}

const PerformanceRangeSection: React.FC<PerformanceRangeSectionProps> = ({ department }) => (
  <div className="space-y-4 pt-4 border-t-2 border-ink-black">
    <h3 className="text-sm border-b border-ink-black/15 pb-2 font-black text-ink-black tracking-widest flex items-center gap-2 [font-synthesis:none]">
      <Target className="w-4 h-4 text-primary-container" /> Squad performance range
    </h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-pure-white border-2 border-ink-black rounded-2xl p-4">
        <p className="text-[10px] uppercase font-black text-primary-container tracking-widest mb-2 flex items-center gap-1.5">
          <Crown className="w-3 h-3" /> Top squad
        </p>
        <p className="font-bold text-sm text-ink-black truncate leading-none mb-1">
          {department.topTeam ? department.topTeam.name : '—'}
        </p>
        <p className="text-xl font-mono font-black text-primary-container mt-2 tabular-nums">
          {department.topTeam ? department.topTeam.avg : 0}{' '}
          <span className="text-[10px] text-secondary">avg</span>
        </p>
      </div>
      <div className="bg-surface border-2 border-ink-black rounded-2xl p-4">
        <p className="text-[10px] uppercase font-black text-error tracking-widest mb-2 flex items-center gap-1.5">
          <AlertTriangle className="w-3 h-3" /> Needs support
        </p>
        <p className="font-bold text-sm text-ink-black truncate leading-none mb-1">
          {department.weakestTeam ? department.weakestTeam.name : '—'}
        </p>
        <p className="text-xl font-mono font-black text-error mt-2 tabular-nums">
          {department.weakestTeam ? department.weakestTeam.avg : 0}{' '}
          <span className="text-[10px] text-secondary">avg</span>
        </p>
      </div>
    </div>
    {department.isImbalanced && (
      <div className="w-full h-1 bg-ink-black rounded-full mt-2" />
    )}
  </div>
);

export default PerformanceRangeSection;
