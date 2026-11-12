import React from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { DailyTotal } from '../../../types';

interface ExpandedMemberRowProps {
  member: DailyTotal;
}

const ExpandedMemberRow: React.FC<ExpandedMemberRowProps> = ({ member }) => (
  <tr>
    <td colSpan={5} className="p-0 border-b border-ink-black bg-surface">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
          <div className="flex-1">
            <h4 className="font-label-lg text-xs font-bold uppercase tracking-wider text-ink-black mb-3">Daily Telemetry Insights</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-pure-white border border-ink-black p-3.5 rounded-2xl">
                <div className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mb-1">Today's Increase</div>
                <div className="font-headline-sm text-xl font-bold text-primary-container tabular-nums">
                  {member.totalDailyIncrease > 0 ? `+${member.totalDailyIncrease}` : member.totalDailyIncrease}
                </div>
              </div>
              <div className="bg-pure-white border border-ink-black p-3.5 rounded-2xl col-span-1 sm:col-span-2">
                <div className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mb-1">Team Leadership</div>
                <div className="font-body-md text-xs font-bold text-ink-black mt-1">
                  {member.isTeamLead ? 'Certified Organizational Team Lead' : `Lead: ${member.assignedTeamLead || 'Unassigned'}`}
                </div>
              </div>
            </div>
          </div>
          <Link
            to={`/individual/${member.memberId}`}
            className="rounded-full bg-ink-black text-pure-white px-5 py-2 font-label-lg text-xs uppercase tracking-wider border border-ink-black hover:bg-primary-container transition-none inline-flex items-center gap-1.5"
          >
            <span>Full Diagnostics</span>
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </td>
  </tr>
);

export default ExpandedMemberRow;
