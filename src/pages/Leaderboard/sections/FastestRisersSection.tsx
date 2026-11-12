import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import { LeaderboardEntryList } from '../types';

interface FastestRisersSectionProps {
  fastestRisers: LeaderboardEntryList;
  fastestRiserCount: number;
}

const FastestRisersSection: React.FC<FastestRisersSectionProps> = ({ fastestRisers, fastestRiserCount }) => (
  <div className="space-y-6">
    <div className="border-2 border-ink-black rounded-3xl bg-pure-white p-6">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-ink-black/15">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary-container" />
          <h3 className="font-headline-sm text-xl uppercase tracking-tight text-ink-black m-0">
            Fastest Risers
          </h3>
        </div>
        <span className="rounded-full bg-ink-black text-pure-white px-2.5 py-0.5 font-label-sm text-[9px] uppercase tracking-wider">
          24h Velocity
        </span>
      </div>

      <div className="space-y-2.5">
        {fastestRisers.map((m) => (
          <div key={m.memberId} className="flex items-center justify-between p-3 bg-surface rounded-2xl border border-ink-black">
            <div className="flex items-center gap-3 min-w-0">
              <div className="font-headline-sm text-sm text-primary-container tabular-nums shrink-0">
                +{m.totalDailyIncrease}
              </div>
              <div className="min-w-0 truncate">
                <Link to={`/individual/${m.memberId}`} className="font-title-md text-xs uppercase font-bold text-ink-black hover:text-primary-container truncate block">
                  {m.memberName}
                </Link>
                <div className="font-label-sm text-[9px] text-secondary uppercase truncate">
                  {m.teamId} • {m.deptId}
                </div>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full bg-primary-fixed border border-ink-black flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-ink-black">↑</span>
            </div>
          </div>
        ))}
        {fastestRiserCount === 0 && (
          <div className="text-center py-8 text-secondary font-label-sm text-xs uppercase tracking-wider">
            Awaiting daily delta sync...
          </div>
        )}
      </div>
    </div>
  </div>
);

export default FastestRisersSection;
