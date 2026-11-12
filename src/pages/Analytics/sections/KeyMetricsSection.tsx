import React from 'react';
import { Target, TrendingUp, Trophy, Users } from 'lucide-react';
import Card from '../../../components/ui/Card';
import { getTeamStats } from '../../../utils/dataProcessing';

interface KeyMetricsSectionProps {
  stats: ReturnType<typeof getTeamStats>;
}

const KeyMetricsSection: React.FC<KeyMetricsSectionProps> = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
    <Card hover className="bg-gradient-to-br from-brand-600/10 to-transparent border-brand-500/20 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/10 rounded-full blur-xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700 pointer-events-none"></div>
      <div className="flex items-center p-4 md:p-6 relative z-10">
        <div className="p-3 md:p-4 rounded-xl bg-brand-500/20 shadow-inner border border-brand-500/30">
          <Users className="h-6 w-6 md:h-7 md:w-7 text-brand-400" />
        </div>
        <div className="ml-5">
          <p className="text-xs font-semibold text-textMuted uppercase tracking-wider">Active Members</p>
          <p className="text-3xl font-display font-bold text-ink-black mt-1">{stats.totalMembers}</p>
        </div>
      </div>
    </Card>

    <Card hover className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700 pointer-events-none"></div>
      <div className="flex items-center p-4 md:p-6 relative z-10">
        <div className="p-3 md:p-4 rounded-xl bg-green-500/20 shadow-inner border border-green-500/30">
          <Target className="h-6 w-6 md:h-7 md:w-7 text-green-400" />
        </div>
        <div className="ml-5">
          <p className="text-xs font-semibold text-textMuted uppercase tracking-wider">Total Problems</p>
          <p className="text-3xl font-display font-bold text-ink-black mt-1">{stats.totalProblems.toLocaleString()}</p>
        </div>
      </div>
    </Card>

    <Card hover className="bg-gradient-to-br from-accent-purple/10 to-transparent border-accent-purple/20 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent-purple/10 rounded-full blur-xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700 pointer-events-none"></div>
      <div className="flex items-center p-4 md:p-6 relative z-10">
        <div className="p-3 md:p-4 rounded-xl bg-accent-purple/20 shadow-inner border border-accent-purple/30">
          <TrendingUp className="h-6 w-6 md:h-7 md:w-7 text-accent-purple" />
        </div>
        <div className="ml-5">
          <p className="text-xs font-semibold text-textMuted uppercase tracking-wider">Average Score</p>
          <p className="text-3xl font-display font-bold text-ink-black mt-1">{stats.avgPerMember}</p>
        </div>
      </div>
    </Card>

    <Card hover className="bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/20 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700 pointer-events-none"></div>
      <div className="flex items-center p-4 md:p-6 relative z-10">
        <div className="p-3 md:p-4 rounded-xl bg-yellow-500/20 shadow-inner border border-yellow-500/30">
          <Trophy className="h-6 w-6 md:h-7 md:w-7 text-yellow-500" />
        </div>
        <div className="ml-5">
          <p className="text-xs font-semibold text-textMuted uppercase tracking-wider">Top Score</p>
          <div className="flex items-end gap-2 mt-1">
            <p className="text-3xl font-display font-bold text-ink-black leading-none">{stats.topPerformerScore}</p>
          </div>
          <p className="text-xs text-yellow-500/80 font-medium truncate max-w-[120px] mt-1 pr-2">{stats.topPerformer}</p>
        </div>
      </div>
    </Card>
  </div>
);

export default KeyMetricsSection;
