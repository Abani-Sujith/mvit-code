import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Crown, Eye, User } from 'lucide-react';
import ExpandedMemberRow from './ExpandedMemberRow';
import { MemberTableRow } from '../types';

interface DesktopMemberTableSectionProps {
  currentMembers: MemberTableRow[];
  expandedRow: string | null;
  toggleExpand: (id: string) => void;
}

const DesktopMemberTableSection: React.FC<DesktopMemberTableSectionProps> = ({ currentMembers, expandedRow, toggleExpand }) => (
  <div className="hidden lg:block overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-ink-black bg-surface-tint font-label-sm text-xs uppercase tracking-wider text-ink-black">
          <th className="py-3.5 px-6 font-bold">Rank & Student</th>
          <th className="py-3.5 px-6 font-bold">Squad / Dept</th>
          <th className="py-3.5 px-4 font-bold text-center">Platforms (LC / SR / CC / HR)</th>
          <th className="py-3.5 px-6 font-bold text-right">Total Solved</th>
          <th className="py-3.5 px-6 font-bold text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-ink-black/15 font-body-md text-sm text-ink-black">
        {currentMembers.map(({ member, rank, level }) => {
          const isExpanded = expandedRow === member.memberId;

          return (
            <React.Fragment key={member.memberId}>
              <tr className="hover:bg-surface-tint transition-none">
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-3">
                    <span className="font-headline-sm text-base text-primary-container shrink-0 w-8">
                      #{rank < 10 ? `0${rank}` : rank}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-surface border border-ink-black flex items-center justify-center shrink-0">
                      {member.isTeamLead ? <Crown className="w-4 h-4 text-ink-black" /> : <User className="w-4 h-4 text-ink-black" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Link to={`/individual/${member.memberId}`} className="font-title-md font-bold text-sm text-ink-black uppercase truncate hover:text-primary transition-none">
                          {member.memberName}
                        </Link>
                        <span className="rounded-full bg-pure-white border border-ink-black px-2 py-0.2 font-label-sm text-[10px] uppercase font-bold text-ink-black">
                          {level}
                        </span>
                      </div>
                      <div className="font-label-sm text-[11px] text-secondary uppercase tracking-wider mt-0.5">
                        ID: {member.memberId || 'N/A'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-6">
                  <div className="font-label-lg text-xs uppercase font-bold text-ink-black truncate">{member.teamId || "No Team"}</div>
                  <div className="font-label-sm text-[11px] text-secondary uppercase mt-0.5">{member.sectionId} • {member.deptId}</div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex justify-center gap-1.5 font-mono text-xs">
                    {[
                      { label: 'LC', val: member.leetcodeTotal },
                      { label: 'SR', val: member.skillrackTotal },
                      { label: 'CC', val: member.codechefTotal },
                      { label: 'HR', val: member.hackerrankTotal },
                    ].map(p => (
                      <div key={p.label} className="bg-surface border border-ink-black rounded-lg px-2 py-1 min-w-[42px] text-center">
                        <div className="font-bold text-ink-black tabular-nums">{p.val || 0}</div>
                        <div className="font-label-sm text-[9px] uppercase tracking-tighter text-secondary">{p.label}</div>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="py-3.5 px-6 text-right">
                  <span className="font-headline-sm text-xl font-bold text-ink-black tabular-nums">
                    {member.totalSolved}
                  </span>
                </td>
                <td className="py-3.5 px-6 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      to={`/individual/${member.memberId}`}
                      className="p-1.5 text-ink-black hover:bg-surface border border-transparent hover:border-ink-black rounded-full transition-none"
                      title="View Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => toggleExpand(member.memberId)}
                      className="p-1.5 text-ink-black bg-pure-white border border-ink-black rounded-full hover:bg-surface transition-none"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </td>
              </tr>
              {isExpanded && <ExpandedMemberRow member={member} />}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default DesktopMemberTableSection;
