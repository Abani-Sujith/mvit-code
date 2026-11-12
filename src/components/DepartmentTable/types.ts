export interface DepartmentTableProps {
  data: any[];
  onRowClick: (dept: any) => void;
}

export interface DepartmentRowData {
  dept: any;
  isExpanded: boolean;
  isRank1: boolean;
}
