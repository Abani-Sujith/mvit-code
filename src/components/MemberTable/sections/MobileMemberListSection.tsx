import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { MemberTableRow } from '../types';

interface MobileMemberListSectionProps {
  currentMembers: MemberTableRow[];
  expandedRow: string | null;
  toggleExpand: (id: string) => void;
}

const MobileMemberListSection: React.FC<MobileMemberListSectionProps> = ({ currentMembers, expandedRow, toggleExpand }) => (
  <div className="lg:hidden divide-y divide-ink-black/15">
    {currentMembers.map(({ member, rank, level }) => {
      const isExpanded = expandedRow === member.memberId;

      return (
        <div key={member.memberId} className="p-4 hover:bg-surface-tint transition-none">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <span className="font-headline-sm text-sm text-primary-container">#{rank}</span>
              <div>
                <Link to={`/individual/${member.memberId}`} className="font-title-md text-sm uppercase font-bold text-ink-black block leading-none">{member.memberName}</Link>
                <span className="font-label-sm text-[10px] text-secondary uppercase">{member.teamId || "No Team"}</span>
              </div>
            </div>
            <button onClick={() => toggleExpand(member.memberId)} className="p-1.5 text-ink-black bg-pure-white border border-ink-black rounded-full">
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="rounded-full bg-surface border border-ink-black px-2 py-0.5 font-label-sm text-[9px] uppercase font-bold text-ink-black">{level}</span>
            <span className="font-headline-sm text-lg font-bold text-ink-black tabular-nums">{member.totalSolved} solved</span>
          </div>

          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-ink-black/15">
              <div className="grid grid-cols-4 gap-1.5 mb-3">
                {[
                  { label: 'LC', val: member.leetcodeTotal },
                  { label: 'SR', val: member.skillrackTotal },
                  { label: 'CC', val: member.codechefTotal },
                  { label: 'HR', val: member.hackerrankTotal },
                ].map(p => (
                  <div key={p.label} className="bg-surface border border-ink-black rounded-xl p-2 text-center">
                    <div className="font-bold text-ink-black text-xs tabular-nums">{p.val || 0}</div>
                    <div className="font-label-sm text-[8px] uppercase text-secondary">{p.label}</div>
                  </div>
                ))}
              </div>
              <Link to={`/individual/${member.memberId}`} className="w-full flex items-center justify-center gap-1.5 rounded-full bg-ink-black text-pure-white py-2 font-label-lg text-xs uppercase tracking-wider border border-ink-black">
                <Eye className="w-3.5 h-3.5" /> View Individual Profile
              </Link>
            </div>
          )}
        </div>
      );
    })}
  </div>
);

export default MobileMemberListSection;
