import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Building2, Crown, Eye, Target, Trophy, Users } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { TeamCardData } from '../types';

interface TeamCardProps {
  teamCard: TeamCardData;
  navigate: NavigateFunction;
}

const TeamCard: React.FC<TeamCardProps> = ({ teamCard, navigate }) => {
  const { team, index, perf } = teamCard;

  return (
    <Card key={`${team.deptId}-${team.sectionId}-${team.id}`} hover className={`border bg-surface ${perf.border} transition-all duration-300 group`}>
      <div className="relative">
        {/* Team lead golden glow/highlight */}
        {team.teamLeadName && (
          <div className="absolute inset-x-0 -top-3 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
        )}
        <div className="p-4 md:p-6">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center w-full">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 shadow-inner border border-white/10 shrink-0 ${team.teamLeadName ? 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 text-yellow-500' : 'bg-white/5 text-textMuted group-hover:bg-brand-500/10 group-hover:text-brand-400 transition-colors'
                }`}>
                {team.teamLeadName ? <Crown className="h-6 w-6" /> : <Users className="h-6 w-6" />}
              </div>
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="text-lg font-bold text-ink-black truncate transition-colors group-hover:text-brand-400">{team.baseTeamName || team.name}</h3>
                <div className="flex items-center mt-1 w-full flex-wrap gap-2 text-xs">
                  <span className={`px-2 py-0.5 rounded border inline-block ${perf.badge} font-bold uppercase tracking-wider`}>
                    #{index + 1}
                  </span>
                  {team.teamLeadName && (
                    <div className="flex items-center px-2 py-0.5 rounded border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 max-w-[150px] shrink flex-1">
                      <Crown className="h-3.5 w-3.5 mr-1 shrink-0" />
                      <span className="font-semibold truncate">Lead: {team.teamLeadName}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 space-y-2">
            <div className="flex items-center text-xs text-textMuted"><Building2 className="h-3.5 w-3.5 mr-2 text-brand-400" /> <span className="truncate">{team.deptName} › {team.sectionName}</span></div>
            {team.description && (<p className="text-sm text-textMuted line-clamp-2 leading-relaxed bg-white/5 p-2.5 rounded-lg border border-border/50">{team.description}</p>)}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-surface/50 border border-border rounded-xl p-3 text-center transition-colors group-hover:border-brand-500/20">
              <div className="text-xl font-display font-bold text-ink-black">{team.stats.totalProblems.toLocaleString()}</div>
              <div className="text-[10px] font-semibold text-textMuted uppercase tracking-wider mt-1">Total Problems</div>
            </div>
            <div className="bg-surface/50 border border-border rounded-xl p-3 text-center transition-colors group-hover:border-brand-500/20">
              <div className="text-xl font-display font-bold text-ink-black">{team.stats.avgPerMember}</div>
              <div className="text-[10px] font-semibold text-textMuted uppercase tracking-wider mt-1">Avg / Member</div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6 pt-5 border-t border-border/60">
            <div>
              <div className="text-xs font-semibold text-textMuted uppercase tracking-wider mb-1 flex items-center gap-1">
                <Target className="w-3.5 h-3.5" /> Top Dev
              </div>
              <div className="text-sm font-bold text-brand-400 truncate max-w-[180px]">{team.stats.topPerformer || "None"}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold text-textMuted uppercase tracking-wider mb-1 flex items-center justify-end gap-1">
                Score <Trophy className="w-3.5 h-3.5 text-yellow-500" />
              </div>
              <div className="text-sm font-bold text-ink-black">{team.stats.topPerformerScore}</div>
            </div>
          </div>

          <Button onClick={() => navigate(`/team/${team.deptId}/${team.sectionId}/${team.id}`)} className="w-full flex items-center justify-center p-3 md:p-2" size="sm" variant="secondary">
            <Eye className="mr-2 h-4 w-4" /> View Full Team Info
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TeamCard;
