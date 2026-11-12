import React, { useState } from 'react';
import TableHeaderSection from './sections/TableHeaderSection';
import DepartmentRowsSection from './sections/DepartmentRowsSection';
import { DepartmentRowData, DepartmentTableProps } from './types';

const DepartmentTable: React.FC<DepartmentTableProps> = ({ data, onRowClick }) => {
  const [sortField, setSortField] = useState<string>('avgPerMember');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Track explicitly which departments are expanded to show internal squad hierarchies
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection(
        field === 'totalSolved' || field === 'avgPerMember' || field === 'trend' ? 'desc' : 'asc'
      );
    }
  };

  const toggleExpand = (deptId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Avoid triggering the drawer click event natively
    setExpandedRows((prev) => ({ ...prev, [deptId]: !prev[deptId] }));
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField] as any;
    const bValue = b[sortField] as any;
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  const sortNestedTeams = (teams: any[]) =>
    teams.sort((a: any, b: any) => b.totalSolved - a.totalSolved);

  const rows: DepartmentRowData[] = sortedData.map((dept, index) => ({
    dept,
    isExpanded: expandedRows[dept.deptId],
    isRank1: index === 0 && sortField === 'avgPerMember' && sortDirection === 'desc',
  }));

  const thClass =
    'px-4 py-3 text-left font-label-lg text-xs text-secondary uppercase tracking-wider font-bold bg-surface-tint border-b border-ink-black';
  const thCenterClass =
    'px-4 py-3 text-center font-label-lg text-xs text-secondary uppercase tracking-wider font-bold bg-surface-tint border-b border-ink-black cursor-pointer group';

  return (
    <div className="overflow-x-auto rounded-2xl border border-ink-black">
      <table className="min-w-full divide-y divide-ink-black/10 text-sm">
        <TableHeaderSection
          thClass={thClass}
          thCenterClass={thCenterClass}
          handleSort={handleSort}
        />
        {/* Render Rows */}
        <tbody className="divide-y divide-ink-black/10 bg-pure-white">
          <DepartmentRowsSection
            rows={rows}
            onRowClick={onRowClick}
            toggleExpand={toggleExpand}
            sortNestedTeams={sortNestedTeams}
          />
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
