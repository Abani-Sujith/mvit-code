import { Dispatch, SetStateAction } from 'react';
import { DailyTotal } from '../../types';

export interface MemberTableProps {
  data: DailyTotal[];
}

export type MemberSort = 'performance' | 'name';

export interface MemberTableRow {
  member: DailyTotal;
  rank: number;
  level: string;
}

export interface TableControlsSectionProps {
  filteredMemberCount: number;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  sortBy: MemberSort;
  setSortBy: Dispatch<SetStateAction<MemberSort>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}
