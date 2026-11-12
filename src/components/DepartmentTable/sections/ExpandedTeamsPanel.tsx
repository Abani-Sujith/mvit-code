import React from 'react';

interface ExpandedTeamsPanelProps {
  dept: any;
  sortNestedTeams: (teams: any[]) => any[];
}

const ExpandedTeamsPanel: React.FC<ExpandedTeamsPanelProps> = ({ dept, sortNestedTeams }) => (
  <tr>
    <td colSpan={9} className="px-0 py-0">
      <div className="bg-surface-tint border-y border-ink-black/10 px-8 lg:px-16 py-5 relative">
        <div className="absolute top-0 bottom-0 left-[3rem] lg:left-[4rem] border-l-2 border-ink-black/20 z-0" />

        <h4 className="text-[10px] text-secondary font-bold uppercase tracking-widest flex items-center gap-2 mb-4 relative z-10 pl-4">
          <div className="w-2 h-[2px] bg-ink-black/20 -ml-6" />
          Teams ({dept.totalTeams})
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 ml-2 relative z-10">
          {sortNestedTeams(dept.nestedTeams)
            .map((team: any) => (
              <div
                key={team.teamName}
                className="flex justify-between items-center p-3 rounded-2xl border border-ink-black bg-pure-white hover:bg-surface transition-none"
              >
                <div className="min-w-0 flex-1 pr-3">
                  <div className="text-sm font-bold text-ink-black truncate mb-0.5">
                    {team.teamName}
                  </div>
                  <div className="text-[10px] text-secondary font-bold uppercase tracking-wider">
                    {team.sectionName} squad
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-mono font-black text-primary-container tabular-nums">
                    {team.totalSolved}
                  </div>
                  <div className="text-[10px] font-mono text-secondary tabular-nums">
                    {team.avgPerMember} avg
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </td>
  </tr>
);

export default ExpandedTeamsPanel;
