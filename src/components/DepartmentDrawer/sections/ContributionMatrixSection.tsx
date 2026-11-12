import React from 'react';
import { LayoutDashboard } from 'lucide-react';

interface ContributionMatrixSectionProps {
  contributionDistribution: any[];
}

const ContributionMatrixSection: React.FC<ContributionMatrixSectionProps> = ({
  contributionDistribution,
}) => (
  <div className="space-y-4 pt-6">
    <h3 className="text-sm font-black text-ink-black tracking-widest flex justify-between items-center mb-4 [font-synthesis:none]">
      <span className="flex items-center gap-2">
        <LayoutDashboard className="w-4 h-4 text-primary-container" /> Squad contribution
      </span>
      <span className="text-[10px] text-secondary bg-surface px-2 py-0.5 rounded-full border border-ink-black font-normal">
        % of total solved
      </span>
    </h3>
    <div className="space-y-3">
      {contributionDistribution.map((t, index) => (
        <div
          key={t.teamId}
          className="flex justify-between items-center bg-pure-white border border-ink-black rounded-2xl p-4 relative overflow-hidden hover:bg-surface transition-none"
        >
          {/* Background fill bar */}
          <div
            className="absolute left-0 top-0 bottom-0 bg-primary-fixed/40 pointer-events-none"
            style={{
              width: `${t.contribution}%`,
            }}
          />

          <div className="relative z-10 flex items-center gap-4 flex-1 min-w-0 pr-4">
            <span
              className={`font-mono text-xs font-bold w-6 text-center tabular-nums ${
                index === 0 ? 'text-primary-container' : 'text-secondary'
              }`}
            >
              {index + 1}.
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-ink-black truncate">{t.teamName}</p>
              <p className="text-[10px] font-mono text-secondary tabular-nums">
                {t.totalSolved.toLocaleString()} solved
              </p>
            </div>
          </div>

          <div className="relative z-10 text-right shrink-0">
            <p className="text-base font-black font-mono text-primary-container leading-none mb-1 tabular-nums">
              {Math.round(t.contribution)}%
            </p>
            <p className="text-[10px] font-bold text-secondary uppercase tabular-nums">
              {t.avgPerMember} avg
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ContributionMatrixSection;
