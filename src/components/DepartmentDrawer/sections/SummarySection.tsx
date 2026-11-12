import React from 'react';
import { BookOpen, TrendingUp, Users } from 'lucide-react';

interface SummarySectionProps {
  department: any;
}

const SummarySection: React.FC<SummarySectionProps> = ({ department }) => (
  <>
    {/* Executive Overview Row */}
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-surface border-2 border-ink-black rounded-2xl p-4 flex flex-col items-center text-center">
        <p className="text-[10px] text-secondary uppercase font-bold tracking-widest mb-2 flex items-center justify-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-primary-container" /> Total students
        </p>
        <p className="text-3xl font-mono font-black text-ink-black tabular-nums">
          {department.totalMembers}
        </p>
      </div>
      <div className="bg-surface border-2 border-ink-black rounded-2xl p-4 flex flex-col items-center text-center">
        <p className="text-[10px] text-secondary uppercase font-bold tracking-widest mb-2 flex items-center justify-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-primary-container" /> Today's activity
        </p>
        <p
          className={`text-3xl font-mono font-black tabular-nums ${
            department.trend > 0 ? 'text-primary-container' : 'text-secondary'
          }`}
        >
          {department.trend > 0 ? `+${department.trend}` : '0'}
        </p>
      </div>
    </div>

    {/* Total Solved Hero */}
    <div className="bg-surface-tint border-2 border-ink-black rounded-2xl py-5 px-6 flex justify-between items-center">
      <div>
        <p className="text-[10px] text-secondary uppercase font-black tracking-widest mb-1 flex items-center gap-1.5">
          <BookOpen className="w-3 h-3" /> Total problems solved
        </p>
        <p className="text-5xl font-mono font-black text-primary-container mt-2 tabular-nums">
          {department.totalSolved.toLocaleString()}
        </p>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-secondary uppercase font-bold tracking-widest mb-1">
          Avg per student
        </p>
        <p className="text-3xl font-mono font-black text-ink-black mt-1 tabular-nums">
          {department.avgPerMember.toLocaleString()}
        </p>
      </div>
    </div>
  </>
);

export default SummarySection;
