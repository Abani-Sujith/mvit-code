import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Activity, ArrowRight } from 'lucide-react';
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 select-none">
       {/* Leaderboard Excerpt */}
       <div className="lg:col-span-2 bg-pure-white border-2 border-ink-black rounded-3xl p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-ink-black/15">
             <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                <h3 className="font-headline-sm text-2xl uppercase tracking-tight text-ink-black m-0">Top Performers</h3>
             </div>
             <Link 
               to="/leaderboard" 
               className="rounded-full bg-pure-white text-ink-black border border-ink-black px-4 py-1.5 font-label-lg text-xs uppercase tracking-wider hover:bg-ink-black hover:text-pure-white transition-none inline-flex items-center gap-1.5"
             >
               <span>Full View</span>
               <ArrowRight className="w-3 h-3" />
             </Link>
          </div>
          
          <div className="space-y-3">
             {topPerformers.map((p, i) => (
                <Link key={p.memberId} to={`/individual/${p.memberId}`} className="block group">
                   <div className="bg-surface hover:bg-surface-tint border border-ink-black rounded-2xl p-4 flex items-center justify-between transition-none">
                      <div className="flex items-center gap-4 min-w-0">
                         <div className="w-10 h-10 rounded-full bg-pure-white border border-ink-black flex items-center justify-center font-headline-sm text-lg text-primary-container shrink-0">
                            0{i + 1}
                         </div>
                         <div className="min-w-0">
                            <div className="font-title-md text-base uppercase font-bold text-ink-black truncate">{p.memberName}</div>
                            <div className="font-label-sm text-xs text-secondary uppercase tracking-wider truncate">{p.teamId} • {p.sectionId}</div>
                         </div>
                      </div>
                      <div className="text-right shrink-0">
                         <span className="font-headline-sm text-2xl font-bold text-ink-black tabular-numbers">{p.totalSolved}</span>
                         <span className="block font-label-sm text-[10px] uppercase text-secondary">solved</span>
                      </div>
                   </div>
                </Link>
             ))}
          </div>
       </div>

       {/* Feed & Quick Insights */}
       <div className="space-y-6 sm:space-y-8">
          {/* Live Activity Feed */}
          <div className="bg-pure-white border-2 border-ink-black rounded-3xl p-6 sm:p-8">
             <div className="flex items-center gap-2 text-ink-black font-label-lg uppercase tracking-wider text-xs font-bold mb-6 pb-3 border-b border-ink-black/15">
                <Activity className="w-4 h-4 text-primary-container" /> 
                <span>Recent Activity</span>
             </div>
             <div className="space-y-5">
                {dynamicInterventions.map((action, i) => {
                   // Clean action text of emojis
                   const cleanAction = action.action.replace(/[🏆📈⚠️🔥]/g, '').trim();
                   // Remove hardcoded "Just Now" timestamps unless a real timestamp exists
                   const displayTime = action.time && action.time !== 'Just Now' ? action.time : null;

                   return (
                      <div key={i} className="pl-4 border-l-2 border-ink-black relative py-0.5">
                         <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-primary-container border border-ink-black"></div>
                         {displayTime && (
                           <div className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mb-1">
                             {displayTime}
                           </div>
                         )}
                         <Link 
                           to={action.id ? `/individual/${action.id}` : '#'} 
                           className="font-body-md text-xs font-medium text-ink-black hover:text-primary transition-none leading-relaxed block"
                         >
                            {cleanAction}
                         </Link>
                      </div>
                   );
                })}
             </div>
          </div>

          {/* Quick Insights */}
          <div className="bg-pure-white border-2 border-ink-black rounded-3xl p-6 sm:p-8">
             <div className="flex items-center gap-2 text-ink-black font-label-lg uppercase tracking-wider text-xs font-bold mb-6 pb-3 border-b border-ink-black/15">
                <Trophy className="w-4 h-4 text-primary-container" /> 
                <span>Quick Insights</span>
             </div>
             <div className="space-y-3">
                <div className="p-3.5 bg-surface rounded-2xl border border-ink-black">
                   <div className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mb-1">Peak Activity Window</div>
                   <div className="font-title-md text-sm font-bold text-ink-black">8:00 PM — 10:00 PM</div>
                </div>
                <div className="p-3.5 bg-surface rounded-2xl border border-ink-black">
                   <div className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mb-1">Top Performer</div>
                   <div className="font-title-md text-sm font-bold text-ink-black">{topPerformers[0]?.memberName || 'Pending'}</div>
                </div>
                <div className="p-3.5 bg-surface rounded-2xl border border-ink-black">
                   <div className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mb-1">Growth Leader</div>
                   <div className="font-title-md text-sm font-bold text-ink-black">AIML Department</div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default ActivityFeedSection;
