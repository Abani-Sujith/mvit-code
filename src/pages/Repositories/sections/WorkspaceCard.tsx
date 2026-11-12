import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { ChevronRight, Eye, FolderGit2 } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { PlatformBar, TeamWorkspace } from '../types';
import WorkspaceDetailsSection from './WorkspaceDetailsSection';

interface WorkspaceCardProps {
    ws: TeamWorkspace;
    bar: PlatformBar;
    navigate: NavigateFunction;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ ws, bar, navigate }) => (
    <Card hover className="bg-gradient-to-br from-surface to-surface/90 border-t-green-500/30 group cursor-pointer" onClick={() => navigate(`/team/${ws.deptId}/${ws.sectionId}/${ws.id}`)}>
        <CardHeader className="border-b border-border/50 pb-4">
            <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg font-display flex items-center text-ink-black mb-1">
                        <div className="p-1.5 rounded-lg bg-green-500/10 mr-2.5 shrink-0">
                            <FolderGit2 className="h-4 w-4 text-green-400" />
                        </div>
                        <span className="truncate">{ws.name}</span>
                    </CardTitle>
                    <div className="flex items-center gap-2 ml-9 flex-wrap">
                        <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest">{ws.department}</span>
                        <span className="text-xs text-textMuted">•</span>
                        <span className="text-xs text-textMuted">{ws.section}</span>
                    </div>
                </div>
                <div className="text-right shrink-0 ml-4">
                    <div className="text-xl font-display font-bold text-ink-black">{ws.totalProblemsSolved.toLocaleString()}</div>
                    <div className="text-[10px] text-green-400 font-semibold uppercase tracking-wider">Problems</div>
                </div>
            </div>
        </CardHeader>
        <CardContent className="pt-5 space-y-4">
            <WorkspaceDetailsSection ws={ws} bar={bar} />

            {/* View Team Button */}
            <button
                onClick={(e) => { e.stopPropagation(); navigate(`/team/${ws.deptId}/${ws.sectionId}/${ws.id}`); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-green-500/10 to-brand-500/10 border border-green-500/20 text-green-400 text-sm font-semibold hover:from-green-500/20 hover:to-brand-500/20 hover:text-white transition-all group/btn"
            >
                <Eye className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                View Team Details
                <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
        </CardContent>
    </Card>
);

export default WorkspaceCard;
