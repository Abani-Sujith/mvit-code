import { Dispatch, SetStateAction } from 'react';
import { getTeamStats } from '../../utils/dataProcessing';

export interface TeamDirectoryItem {
  id: string;
  name: string;
  deptId: string;
  deptName: string;
  sectionId: string;
  sectionName: string;
  description: string;
  stats: ReturnType<typeof getTeamStats>;
  teamLeadName?: string;
  baseTeamName?: string;
}

export interface TeamsFilters {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedDept: string;
  setSelectedDept: Dispatch<SetStateAction<string>>;
  selectedSection: string;
  setSelectedSection: Dispatch<SetStateAction<string>>;
  showOnlyLeaderTeams: boolean;
  setShowOnlyLeaderTeams: Dispatch<SetStateAction<boolean>>;
}

export interface TeamPerformanceStyle {
  bg: string;
  border: string;
  text: string;
  badge: string;
}

export interface TeamCardData {
  team: TeamDirectoryItem;
  index: number;
  perf: TeamPerformanceStyle;
}
