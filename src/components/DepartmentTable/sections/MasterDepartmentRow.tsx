import React from 'react';
import { ChevronDown, ChevronRight, CheckCircle, TrendingUp } from 'lucide-react';
import PerformanceBar from '../../ui/PerformanceBar';
import DepartmentStatusBadge from './DepartmentStatusBadge';
import { DepartmentRowData } from '../types';

interface MasterDepartmentRowProps {
  row: DepartmentRowData;
  onRowClick: (dept: any) => void;
  toggleExpand: (deptId: string, event: React.MouseEvent) => void;
}

const MasterDepartmentRow: React.FC<MasterDepartmentRowProps> = ({ row, onRowClick, toggleExpand }) => {
  const { dept, isExpanded, isRank1 } = row;

  return (
    <tr
      className={`hover:bg-surface-container/40 cursor-pointer group transition-none ${
        isRank1 ? 'bg-primary-fixed/30' : ''
      }`}
      onClick={() => onRowClick(dept)}
    >
      {/* Expansion Trigger */}
      <td className="px-4 py-3 whitespace-nowrap text-center">
        <button
          onClick={(event) => toggleExpand(dept.deptId, event)}
          className="p-1 rounded-full hover:bg-surface-container border border-transparent hover:border-ink-black/20 text-secondary hover:text-ink-black transition-none"
          title="Expand teams"
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </td>

      {/* Department Name */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="font-bold text-base text-ink-black group-hover:text-primary-container transition-none flex items-center gap-2">
          {dept.deptName}
          {isRank1 && (
            <span className="text-[9px] uppercase tracking-widest bg-ink-black text-pure-white px-2 py-0.5 rounded-full border border-ink-black">
              🥇 Top
            </span>
          )}
        </div>
      </td>

      <td className="px-4 py-3 whitespace-nowrap text-center font-bold text-ink-black hidden md:table-cell tabular-nums">
        {dept.totalTeams}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-center text-secondary hidden md:table-cell tabular-nums">
        {dept.totalMembers}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-right font-mono font-black text-primary-container text-base tabular-nums">
        {dept.totalSolved.toLocaleString()}
      </td>

      {/* Scale Progress Visualizations */}
      <td className="px-4 py-3 whitespace-nowrap min-w-[140px]">
        <PerformanceBar value={dept.avgPerMember} maxValue={800} />
      </td>

      {/* Trend Metrics */}
      <td className="px-4 py-3 whitespace-nowrap text-center hidden lg:table-cell">
        <div
          className={`flex items-center justify-center gap-1 font-mono font-bold ${
            dept.trend > 0 ? 'text-primary-container' : 'text-secondary'
          }`}
        >
          {dept.trend > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : ''}
          {dept.trend > 0 ? `+${dept.trend}` : '—'}
        </div>
      </td>

      <td className="px-4 py-3 whitespace-nowrap text-center hidden sm:table-cell">
        <DepartmentStatusBadge status={dept.status} />
      </td>

      <td className="px-4 py-3 whitespace-nowrap hidden xl:table-cell">
        {dept.topTeam ? (
          <div
            className="text-xs font-bold text-ink-black truncate max-w-[140px] flex items-center gap-1.5"
            title={dept.topTeam.name}
          >
            <CheckCircle className="w-3.5 h-3.5 text-primary-container shrink-0" />
            {dept.topTeam.name}
          </div>
        ) : (
          <span className="text-secondary">—</span>
        )}
      </td>
    </tr>
  );
};

export default MasterDepartmentRow;
