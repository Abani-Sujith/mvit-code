import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LeaderboardEntry } from '../../types';
import { Crown, Trophy, Medal, Award, ChevronDown, ChevronUp, ChevronRight, ExternalLink } from 'lucide-react';

interface LeaderboardTableProps {
  data: LeaderboardEntry[];
  showTeamColumn?: boolean;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data, showTeamColumn = true }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getRankIcon = (rank: number, isTeamLead: boolean) => {
    if (rank === 1) return <Trophy className="h-4 w-4 text-primary-container" />;
    if (rank === 2) return <Medal className="h-4 w-4 text-secondary" />;
    if (rank === 3) return <Award className="h-4 w-4 text-primary" />;
    if (isTeamLead) return <Crown className="h-3.5 w-3.5 text-primary-container" />;
    return null;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-ink-black text-pure-white border-ink-black';
    if (rank === 2) return 'bg-surface-container text-ink-black border-ink-black';
    if (rank === 3) return 'bg-primary-fixed text-ink-black border-ink-black';
    return 'bg-pure-white text-secondary border-ink-black/30';
  };

  return (
    <div className="w-full select-none">
      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto rounded-2xl border border-ink-black bg-pure-white">
        <table className="min-w-full text-sm">
          <thead className="bg-surface-tint border-b border-ink-black">
            <tr>
              <th className="px-6 py-4 text-center font-label-sm uppercase tracking-wider text-xs text-ink-black w-20">Rank</th>
              <th className="px-6 py-4 text-left font-label-sm uppercase tracking-wider text-xs text-ink-black">Student</th>
              {showTeamColumn && (
                <th className="px-6 py-4 text-left font-label-sm uppercase tracking-wider text-xs text-ink-black">Squad / Dept</th>
              )}
              <th className="px-6 py-4 text-center font-label-sm uppercase tracking-wider text-xs text-ink-black">Level</th>
              <th className="px-6 py-4 text-right font-label-sm uppercase tracking-wider text-xs text-ink-black">Problems Solved</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-black/10">
            {data.map((entry, idx) => (
              <React.Fragment key={`${entry.memberId}-${entry.rank}`}>
                <tr 
                  className={`group transition-none hover:bg-surface-container cursor-pointer ${idx % 2 === 1 ? 'bg-surface/50' : 'bg-pure-white'} ${expandedId === entry.memberId ? 'bg-surface-tint/40' : ''}`}
                  onClick={() => setExpandedId(expandedId === entry.memberId ? null : entry.memberId)}
                >
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold border ${getRankBadge(entry.rank)}`}>
                        {entry.rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-ink-black text-pure-white flex items-center justify-center text-xs font-bold border border-ink-black shrink-0">
                        {entry.memberName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                           <Link to={`/individual/${entry.memberId}`} className="font-title-md text-sm font-bold text-ink-black hover:text-primary-container" onClick={(e) => e.stopPropagation()}>
                             {entry.memberName}
                           </Link>
                           {getRankIcon(entry.rank, Boolean(entry.isTeamLead))}
                        </div>
                        {entry.isTeamLead && (
                          <span className="font-label-sm text-[9px] uppercase tracking-wider text-primary-container">
                            Team Lead
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  {showTeamColumn && (
                    <td className="px-6 py-3.5 whitespace-nowrap">
                      <div className="font-bold text-ink-black text-xs uppercase">{entry.teamId}</div>
                      <div className="font-label-sm text-[10px] text-secondary uppercase">{entry.deptId}</div>
                    </td>
                  )}
                  <td className="px-6 py-3.5 whitespace-nowrap text-center">
                    <span className="font-label-sm text-[10px] uppercase px-2.5 py-0.5 rounded-full border border-ink-black bg-pure-white text-ink-black">
                      {entry.benchmarkLevel}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 whitespace-nowrap text-right font-headline-sm text-lg text-primary-container tabular-nums">
                    {entry.totalSolved.toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    {expandedId === entry.memberId ? <ChevronUp className="w-4 h-4 text-ink-black" /> : <ChevronDown className="w-4 h-4 text-secondary group-hover:text-ink-black" />}
                  </td>
                </tr>
                {expandedId === entry.memberId && (
                  <tr className="bg-surface">
                    <td colSpan={showTeamColumn ? 6 : 5} className="px-8 py-5 border-l-4 border-primary-container border-b border-ink-black/20">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in">
                        <div className="bg-pure-white p-3 rounded-2xl border border-ink-black">
                          <div className="font-label-sm text-[10px] text-secondary uppercase mb-1 flex justify-between items-center">
                            <span>LeetCode</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                          </div>
                          <div className="font-headline-sm text-lg text-ink-black">{entry.leetcodeTotal}</div>
                        </div>
                        <div className="bg-pure-white p-3 rounded-2xl border border-ink-black">
                          <div className="font-label-sm text-[10px] text-secondary uppercase mb-1 flex justify-between items-center">
                            <span>SkillRack</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                          </div>
                          <div className="font-headline-sm text-lg text-ink-black">{entry.skillrackTotal}</div>
                        </div>
                        <div className="bg-pure-white p-3 rounded-2xl border border-ink-black">
                          <div className="font-label-sm text-[10px] text-secondary uppercase mb-1 flex justify-between items-center">
                            <span>CodeChef</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                          </div>
                          <div className="font-headline-sm text-lg text-ink-black">{entry.codechefTotal}</div>
                        </div>
                        <div className="bg-pure-white p-3 rounded-2xl border border-ink-black">
                          <div className="font-label-sm text-[10px] text-secondary uppercase mb-1 flex justify-between items-center">
                            <span>Others</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                          </div>
                          <div className="font-headline-sm text-lg text-ink-black">{entry.hackerrankTotal}</div>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                         <Link 
                           to={`/individual/${entry.memberId}`} 
                           className="rounded-full bg-ink-black text-pure-white px-3 py-1 font-label-sm text-[10px] uppercase tracking-wider border border-ink-black hover:bg-primary-container inline-flex items-center gap-1" 
                           onClick={(e) => e.stopPropagation()}
                         >
                           <span>Full Profile</span>
                           <ChevronRight className="w-3 h-3" />
                         </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-3">
        {data.map((entry) => (
          <div key={`${entry.memberId}-${entry.rank}`} className="bg-pure-white border border-ink-black rounded-2xl p-4 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
               <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${getRankBadge(entry.rank)}`}>
                    {entry.rank}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                       <Link to={`/individual/${entry.memberId}`} className="font-title-md font-bold text-ink-black text-sm">
                         {entry.memberName}
                       </Link>
                       {getRankIcon(entry.rank, Boolean(entry.isTeamLead))}
                    </div>
                    {showTeamColumn && (
                      <div className="font-label-sm text-[9px] text-secondary uppercase mt-0.5">
                        {entry.teamId} • {entry.deptId}
                      </div>
                    )}
                  </div>
               </div>
               <div className="text-right">
                  <div className="font-headline-sm text-xl text-primary-container leading-none tabular-nums">
                    {entry.totalSolved.toLocaleString()}
                  </div>
               </div>
            </div>
            
            <div className="grid grid-cols-4 gap-1.5 pt-3 border-t border-ink-black/10">
                <div className="text-center bg-surface p-1.5 rounded-lg border border-ink-black/10">
                   <div className="font-label-sm text-[8px] uppercase text-secondary">LC</div>
                   <div className="font-bold text-xs text-ink-black">{entry.leetcodeTotal}</div>
                </div>
                <div className="text-center bg-surface p-1.5 rounded-lg border border-ink-black/10">
                   <div className="font-label-sm text-[8px] uppercase text-secondary">SR</div>
                   <div className="font-bold text-xs text-ink-black">{entry.skillrackTotal}</div>
                </div>
                <div className="text-center bg-surface p-1.5 rounded-lg border border-ink-black/10">
                   <div className="font-label-sm text-[8px] uppercase text-secondary">CC</div>
                   <div className="font-bold text-xs text-ink-black">{entry.codechefTotal}</div>
                </div>
                <div className="text-center bg-surface p-1.5 rounded-lg border border-ink-black/10">
                   <div className="font-label-sm text-[8px] uppercase text-secondary">HR</div>
                   <div className="font-bold text-xs text-ink-black">{entry.hackerrankTotal}</div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardTable;

