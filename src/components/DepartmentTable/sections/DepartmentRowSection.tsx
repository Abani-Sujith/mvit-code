import React from 'react';
import ExpandedTeamsPanel from './ExpandedTeamsPanel';
import MasterDepartmentRow from './MasterDepartmentRow';
import { DepartmentRowData } from '../types';

interface DepartmentRowSectionProps {
  row: DepartmentRowData;
  onRowClick: (dept: any) => void;
  toggleExpand: (deptId: string, event: React.MouseEvent) => void;
  sortNestedTeams: (teams: any[]) => any[];
}

const DepartmentRowSection: React.FC<DepartmentRowSectionProps> = ({ row, onRowClick, toggleExpand, sortNestedTeams }) => (
  <>
    <MasterDepartmentRow row={row} onRowClick={onRowClick} toggleExpand={toggleExpand} />
    {row.isExpanded && row.dept.nestedTeams?.length > 0 && <ExpandedTeamsPanel dept={row.dept} sortNestedTeams={sortNestedTeams} />}
  </>
);

export default DepartmentRowSection;
