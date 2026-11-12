import React from 'react';
import DepartmentRowSection from './DepartmentRowSection';
import { DepartmentRowData } from '../types';

interface DepartmentRowsSectionProps {
  rows: DepartmentRowData[];
  onRowClick: (dept: any) => void;
  toggleExpand: (deptId: string, event: React.MouseEvent) => void;
  sortNestedTeams: (teams: any[]) => any[];
}

const DepartmentRowsSection: React.FC<DepartmentRowsSectionProps> = ({ rows, onRowClick, toggleExpand, sortNestedTeams }) => (
  <>
    {rows.map((row) => (
      <DepartmentRowSection
        key={row.dept.deptId}
        row={row}
        onRowClick={onRowClick}
        toggleExpand={toggleExpand}
        sortNestedTeams={sortNestedTeams}
      />
    ))}
  </>
);

export default DepartmentRowsSection;
