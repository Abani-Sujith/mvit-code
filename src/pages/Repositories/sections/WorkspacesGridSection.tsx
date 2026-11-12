import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { FolderGit2 } from 'lucide-react';
import { PlatformBar, TeamWorkspace } from '../types';
import WorkspaceCard from './WorkspaceCard';

interface WorkspacesGridSectionProps {
    filteredWorkspaces: TeamWorkspace[];
    getPlatformBar: (ws: TeamWorkspace) => PlatformBar;
    navigate: NavigateFunction;
}

const WorkspacesGridSection: React.FC<WorkspacesGridSectionProps> = ({
    filteredWorkspaces,
    getPlatformBar,
    navigate,
}) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredWorkspaces.map((ws) => {
            const bar = getPlatformBar(ws);
            return <WorkspaceCard key={ws.id} ws={ws} bar={bar} navigate={navigate} />;
        })}
        {filteredWorkspaces.length === 0 && (
            <div className="col-span-full text-center py-16 bg-surface/50 border border-border/50 border-dashed rounded-xl">
                <FolderGit2 className="h-12 w-12 text-textMuted mx-auto mb-4" />
                <h3 className="text-ink-black font-bold text-lg">No Workspaces Found</h3>
                <p className="text-textMuted">Try adjusting your search or filters.</p>
            </div>
        )}
    </div>
);

export default WorkspacesGridSection;
