import React from 'react';
import { Crown, Trophy, Users } from 'lucide-react';
import { PlatformBar, TeamWorkspace } from '../types';

interface WorkspaceDetailsSectionProps {
    ws: TeamWorkspace;
    bar: PlatformBar;
}

const WorkspaceDetailsSection: React.FC<WorkspaceDetailsSectionProps> = ({ ws, bar }) => (
    <>
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/5 rounded-lg p-3 text-center border border-border/30">
                <div className="text-sm font-bold text-ink-black">{ws.memberCount}</div>
                <div className="text-[10px] text-textMuted uppercase tracking-wider mt-0.5">Members</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center border border-border/30">
                <div className="text-sm font-bold text-ink-black">{ws.avgPerMember}</div>
                <div className="text-[10px] text-textMuted uppercase tracking-wider mt-0.5">Avg/Member</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center border border-border/30">
                <div className="text-sm font-bold text-ink-black truncate" title={ws.topPerformer}>{ws.topPerformer}</div>
                <div className="text-[10px] text-yellow-500 uppercase tracking-wider mt-0.5 flex items-center justify-center gap-0.5"><Trophy className="h-3 w-3" /> Top</div>
            </div>
        </div>

        {/* Platform Breakdown Bar */}
        <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-textMuted mb-2">Platform Breakdown</p>
            <div className="flex h-2.5 rounded-full overflow-hidden bg-white/5 border border-border/30">
                {bar.sr > 0 && <div className="bg-emerald-500 transition-all" style={{ width: `${bar.sr}%` }} title={`SkillRack: ${ws.skillrackTotal.toLocaleString()}`}></div>}
                {bar.lc > 0 && <div className="bg-yellow-500 transition-all" style={{ width: `${bar.lc}%` }} title={`LeetCode: ${ws.leetcodeTotal.toLocaleString()}`}></div>}
                {bar.cc > 0 && <div className="bg-orange-500 transition-all" style={{ width: `${bar.cc}%` }} title={`CodeChef: ${ws.codechefTotal.toLocaleString()}`}></div>}
                {bar.hr > 0 && <div className="bg-green-400 transition-all" style={{ width: `${bar.hr}%` }} title={`HackerRank: ${ws.hackerrankTotal.toLocaleString()}`}></div>}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[10px]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span><span className="text-textMuted">SR</span> <span className="text-ink-black font-medium">{ws.skillrackTotal.toLocaleString()}</span></span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span><span className="text-textMuted">LC</span> <span className="text-ink-black font-medium">{ws.leetcodeTotal.toLocaleString()}</span></span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span><span className="text-textMuted">CC</span> <span className="text-ink-black font-medium">{ws.codechefTotal.toLocaleString()}</span></span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400"></span><span className="text-textMuted">HR</span> <span className="text-ink-black font-medium">{ws.hackerrankTotal.toLocaleString()}</span></span>
            </div>
        </div>

        {/* Team Lead & Top Contributors */}
        <div className="flex items-center justify-between border border-border/50 rounded-xl p-3 bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
                {ws.teamLeadName ? (
                    <>
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 flex items-center justify-center shrink-0">
                            <Crown className="h-4 w-4 text-yellow-500" />
                        </div>
                        <div className="min-w-0">
                            <div className="text-xs font-bold text-ink-black truncate">{ws.teamLeadName}</div>
                            <div className="text-[10px] text-yellow-500 uppercase tracking-wider">Team Lead</div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-9 h-9 rounded-lg bg-white/5 border border-border/50 flex items-center justify-center shrink-0">
                            <Users className="h-4 w-4 text-textMuted" />
                        </div>
                        <div className="min-w-0">
                            <div className="text-xs font-medium text-textMuted">No lead assigned</div>
                        </div>
                    </>
                )}
            </div>
            <div className="flex -space-x-2 overflow-hidden shrink-0 ml-3">
                {ws.contributors.slice(0, 4).map((c: any, i: number) => (
                    <div key={i} className="inline-block h-7 w-7 rounded-full ring-2 ring-surface bg-gradient-to-br from-brand-400 to-accent-purple flex items-center justify-center text-[9px] font-bold text-white shadow-sm" title={`${c.memberName} — ${c.totalSolved} solved`}>
                        {(c.memberName || '??').substring(0, 2).toUpperCase()}
                    </div>
                ))}
                {ws.contributors.length > 4 && (
                    <div className="inline-block h-7 w-7 rounded-full ring-2 ring-surface bg-surface border border-border/50 flex items-center justify-center text-[9px] font-medium text-textMuted">
                        +{ws.contributors.length - 4}
                    </div>
                )}
            </div>
        </div>
    </>
);

export default WorkspaceDetailsSection;
