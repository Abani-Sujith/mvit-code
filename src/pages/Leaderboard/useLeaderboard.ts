import { useEffect, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { DailyTotal } from '../../types';
import { LeaderboardFilters, LeaderboardViewLevel } from './types';

export const useLeaderboard = () => {
  const { data: globalData, hierarchy, loading: globalLoading } = useData();
  const [data, setData] = useState<DailyTotal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [viewLevel, setViewLevel] = useState<LeaderboardViewLevel>('global');
  const [showOnlyLeaders, setShowOnlyLeaders] = useState(false);

  useEffect(() => {
    if (globalLoading) {
      setLoading(true);
      return;
    }

    // Client-side filtering instead of refetching from Firebase
    let filteredData = globalData;

    try {
      if (viewLevel === 'department' && selectedDept) {
        filteredData = globalData.filter((d: any) =>
          String(d.deptId || '').toLowerCase() === selectedDept.toLowerCase()
        );
      } else if (viewLevel === 'section' && selectedDept && selectedSection) {
        filteredData = globalData.filter((d: any) =>
          String(d.deptId || '').toLowerCase() === selectedDept.toLowerCase() &&
          String(d.sectionId || '').toLowerCase() === selectedSection.toLowerCase()
        );
      } else if (viewLevel === 'team' && selectedDept && selectedSection && selectedTeam) {
        filteredData = globalData.filter((d: any) =>
          String(d.deptId || '').toLowerCase() === selectedDept.toLowerCase() &&
          String(d.sectionId || '').toLowerCase() === selectedSection.toLowerCase() &&
          String(d.teamId || '').toLowerCase() === selectedTeam.toLowerCase()
        );
      }
    } catch (err) {
      console.error("Filter failed", err);
      filteredData = [];
    }

    setData(filteredData);
    setLoading(false);
  }, [globalData, globalLoading, viewLevel, selectedDept, selectedSection, selectedTeam]);

  const filters: LeaderboardFilters = {
    selectedDept,
    selectedSection,
    selectedTeam,
    viewLevel,
    showOnlyLeaders,
    setSelectedDept,
    setSelectedSection,
    setSelectedTeam,
    setViewLevel,
    setShowOnlyLeaders,
  };

  return {
    hierarchy,
    loading,
    data,
    filters,
  };
};
