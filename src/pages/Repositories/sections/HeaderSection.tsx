import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, FolderGit2 } from 'lucide-react';

interface HeaderSectionProps {
    summaryStats: {
        totalTeams: number;
        totalMembers: number;
        totalProblems: number;
    };
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ summaryStats }) => (
    <>
        <div className="absolute top-0 right-0 -m-8 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-textMuted bg-surface/50 w-fit px-4 py-2 rounded-full border border-border">
            <Link to="/" className="hover:text-brand-400 transition-colors">Dashboard</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold text-textMain flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div> Team Workspaces
            </span>
        </nav>

        {/* Hero Section */}
        <div className="glass-card rounded-2xl p-8 relative overflow-hidden group border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-brand-500/10 opacity-50"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-ink-black mb-2 tracking-tight flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-green-500/20 shadow-inner border border-green-500/30">
                            <FolderGit2 className="h-6 w-6 text-green-400" />
                        </div>
                        Team Workspaces
                    </h1>
                    <p className="text-textMuted max-w-xl">Browse all team workspaces with real performance data — problems solved, platform breakdowns, and top performers.</p>
                </div>

                {/* Summary stats */}
                <div className="flex gap-4 bg-surface/80 p-4 rounded-xl border border-border/50 backdrop-blur-sm shrink-0">
                    <div className="text-center px-4 border-r border-border/50">
                        <div className="text-2xl font-display font-bold text-ink-black">{summaryStats.totalTeams}</div>
                        <div className="text-xs text-green-400 font-medium uppercase tracking-wider mt-1">Teams</div>
                    </div>
                    <div className="text-center px-4 border-r border-border/50">
                        <div className="text-2xl font-display font-bold text-ink-black">{summaryStats.totalMembers}</div>
                        <div className="text-xs text-brand-400 font-medium uppercase tracking-wider mt-1">Members</div>
                    </div>
                    <div className="text-center px-4">
                        <div className="text-2xl font-display font-bold text-ink-black">{summaryStats.totalProblems.toLocaleString()}</div>
                        <div className="text-xs text-accent-purple font-medium uppercase tracking-wider mt-1">Problems</div>
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default HeaderSection;
