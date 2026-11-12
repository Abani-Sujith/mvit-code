import { Dispatch, SetStateAction } from 'react';
import { Hierarchy } from '../../types';
import { createLeaderboard } from '../../utils/dataProcessing';

export type LeaderboardViewLevel = 'global' | 'department' | 'section' | 'team';

export interface LeaderboardFilters {
  selectedDept: string;
  selectedSection: string;
  selectedTeam: string;
  viewLevel: LeaderboardViewLevel;
  showOnlyLeaders: boolean;
  setSelectedDept: Dispatch<SetStateAction<string>>;
  setSelectedSection: Dispatch<SetStateAction<string>>;
  setSelectedTeam: Dispatch<SetStateAction<string>>;
  setViewLevel: Dispatch<SetStateAction<LeaderboardViewLevel>>;
  setShowOnlyLeaders: Dispatch<SetStateAction<boolean>>;
}

export interface ScopeFilterSectionProps {
  hierarchy: Hierarchy;
  filters: LeaderboardFilters;
}

export type LeaderboardEntryList = ReturnType<typeof createLeaderboard>;
