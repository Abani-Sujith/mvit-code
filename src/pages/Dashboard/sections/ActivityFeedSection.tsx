import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Activity } from 'lucide-react';
import { DailyTotal } from '../../../types';
import { DynamicIntervention } from '../useDashboardStats';

interface ActivityFeedSectionProps {
  topPerformers: DailyTotal[];
  dynamicInterventions: DynamicIntervention[];
}

export const ActivityFeedSection: React.FC<ActivityFeedSectionProps> = ({
  topPerformers,
  dynamicInterventions,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       {/* Leaderboard Excerpt */}
       <div className="lg:col-span-2 bg-surface border border-border rounded-[2rem] p-6 sm:p-8 shadow-soft">
          <div className="flex justify-between items-center mb-8">
             <h3 className="text-xl font-black text-textMain flex items-center gap-3"><Trophy className="w-6 h-6 text-yellow-500" /> Top Performers</h3>
             <Link to="/leaderboard" className="p-2 px-4 rounded-full bg-brand-500/10 text-brand-500 text-[10px] font-black uppercase tracking-widest hover:bg-brand-500 hover:text-white transition-all">Full View</Link>
          </div>
          
          <div className="space-y-4">
             {topPerformers.map((p, i) => (
                <Link key={p.memberId} to={`/individual/${p.memberId}`} className="block group">
                   <div className="bg-background/50 hover:bg-white dark:hover:bg-brand-900/10 border border-transparent hover:border-brand-500/30 rounded-2xl p-4 flex items-center justify-between transition-all">
                      <div className="flex items-center gap-4 min-w-0">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black shrink-0 ${i === 0 ? 'bg-yellow-500/20 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.2)]' : 'bg-surface text-textMuted'}`}>
                            0{i + 1}
                         </div>
                         <div className="min-w-0">
                            <div className="font-bold text-textMain group-hover:text-brand-500 transition-colors truncate text-base sm:text-lg">{p.memberName}</div>
                            <div className="text-[10px] text-textMuted font-bold uppercase tracking-widest truncate">{p.teamId} • {p.sectionId}</div>
                         </div>
                      </div>
                      <div className="text-right shrink-0">
                         <span className="font-mono text-xl sm:text-2xl font-black text-textMain tracking-tighter">{p.totalSolved}</span>
                      </div>
                   </div>
                </Link>
             ))}
          </div>
       </div>

       {/* Feed & Insights */}
       <div className="space-y-6 sm:space-y-8">
          <div className="bg-surface border border-border rounded-[2rem] p-6 sm:p-8 shadow-soft">
             <div className="flex items-center gap-2 text-brand-500 font-black uppercase tracking-[0.15em] text-[10px] mb-6"><Activity className="w-4 h-4" /> Live Activity</div>
             <div className="space-y-6">
                {dynamicInterventions.map((action, i) => (
                   <div key={i} className="pl-4 border-l-2 border-brand-500/20 relative py-0.5">
                      <div className={`absolute -left-1 top-2 w-2 h-2 rounded-full shadow-[0_0_8px_rgba(14,165,233,0.8)] ${action.type === 'alert' ? 'bg-red-500 shadow-red-500' : 'bg-brand-500 shadow-brand-500'}`}></div>
                      <div className="text-[9px] text-textMuted uppercase font-extrabold tracking-widest mb-1">{action.time}</div>
                      <Link to={action.id ? `/individual/${action.id}` : '#'} className="text-xs font-semibold text-textMain hover:text-brand-500 transition-colors leading-relaxed block">
                         {action.action}
                      </Link>
                   </div>
                ))}
             </div>
          </div>

          <div className="bg-surface border border-border rounded-[2rem] p-6 sm:p-8 shadow-soft relative overflow-hidden">
             <div className="flex items-center gap-2 text-amber-500 font-black uppercase tracking-[0.15em] text-[10px] mb-6"><Trophy className="w-4 h-4" /> Quick Insights</div>
             <div className="space-y-4">
                <div className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10">
                   <div className="text-[10px] text-textMuted uppercase font-bold mb-1">Peak Activity</div>
                   <div className="text-sm font-bold text-textMain">8:00 PM — 10:00 PM</div>
                </div>
                <div className="p-4 bg-brand-500/5 rounded-2xl border border-brand-500/10">
                   <div className="text-[10px] text-textMuted uppercase font-bold mb-1">Top Performer</div>
                   <div className="text-sm font-bold text-textMain">{topPerformers[0]?.memberName || 'Calc...'}</div>
                </div>
                <div className="p-4 bg-green-500/5 rounded-2xl border border-green-500/10">
                   <div className="text-[10px] text-textMuted uppercase font-bold mb-1">Growth Leader</div>
                   <div className="text-sm font-bold text-textMain">AIML Dept 🔥</div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default ActivityFeedSection;
