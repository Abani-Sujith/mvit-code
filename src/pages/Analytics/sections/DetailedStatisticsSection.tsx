import React from 'react';
import { Award, Target, TrendingUp, Users } from 'lucide-react';

interface DetailedStatisticsSectionProps {
  problemsPerMember: number;
  topPlatform: string;
  activeTeams: number;
  contributingMembers: number;
}

const DetailedStatisticsSection: React.FC<DetailedStatisticsSectionProps> = ({
  problemsPerMember,
  topPlatform,
  activeTeams,
  contributingMembers,
}) => (
  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
    <div className="glass-card rounded-xl border border-white/5 p-6 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors">
      <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center mb-4 text-brand-400 group-hover:scale-110 group-hover:bg-brand-500/20 transition-all">
        <Target className="w-6 h-6" />
      </div>
      <div className="text-3xl font-display font-bold text-ink-black mb-1">
        {problemsPerMember}
      </div>
      <div className="text-xs font-semibold text-textMuted uppercase tracking-wider">Problems / Member</div>
    </div>

    <div className="glass-card rounded-xl border border-white/5 p-6 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors">
      <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4 text-green-400 group-hover:scale-110 group-hover:bg-green-500/20 transition-all">
        <TrendingUp className="w-6 h-6" />
      </div>
      <div className="text-xl font-display font-bold text-ink-black mb-1 truncate max-w-full px-2 mt-2 h-8 flex items-center">
        {topPlatform}
      </div>
      <div className="text-xs font-semibold text-textMuted uppercase tracking-wider">Top Platform</div>
    </div>

    <div className="glass-card rounded-xl border border-white/5 p-6 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors">
      <div className="w-12 h-12 rounded-full bg-accent-purple/10 flex items-center justify-center mb-4 text-accent-purple group-hover:scale-110 group-hover:bg-accent-purple/20 transition-all">
        <Users className="w-6 h-6" />
      </div>
      <div className="text-3xl font-display font-bold text-ink-black mb-1">
        {activeTeams}
      </div>
      <div className="text-xs font-semibold text-textMuted uppercase tracking-wider">Active Teams</div>
    </div>

    <div className="glass-card rounded-xl border border-white/5 p-6 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors">
      <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4 text-amber-500 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all">
        <Award className="w-6 h-6" />
      </div>
      <div className="text-3xl font-display font-bold text-ink-black mb-1">
        {contributingMembers}
      </div>
      <div className="text-xs font-semibold text-textMuted uppercase tracking-wider">Contributing Members</div>
    </div>
  </div>
);

export default DetailedStatisticsSection;
