import { useEffect, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { DailyTotal } from '../../types';

export type AnalyticsViewLevel = 'organization' | 'department' | 'section' | 'team';

export const useAnalytics = () => {
  const { data: globalData, hierarchy, loading: globalLoading } = useData();
  const [data, setData] = useState<DailyTotal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [viewLevel, setViewLevel] = useState<AnalyticsViewLevel>('organization');

  useEffect(() => {
    if (globalLoading) {
      setLoading(true);
      return;
    }

    let filteredData = globalData;

    if (viewLevel === 'department' && selectedDept) {
      filteredData = globalData.filter((d: any) => d.deptId === selectedDept);
    } else if (viewLevel === 'section' && selectedDept && selectedSection) {
      filteredData = globalData.filter((d: any) => d.deptId === selectedDept && d.sectionId === selectedSection);
    } else if (viewLevel === 'team' && selectedDept && selectedSection && selectedTeam) {
      filteredData = globalData.filter((d: any) => d.deptId === selectedDept && d.sectionId === selectedSection && d.teamId === selectedTeam);
    }

    setData(filteredData);
    setLoading(false);
  }, [globalData, globalLoading, viewLevel, selectedDept, selectedSection, selectedTeam]);

  return {
    data,
    hierarchy,
    loading,
    selectedDept,
    selectedSection,
    selectedTeam,
    viewLevel,
    setSelectedDept,
    setSelectedSection,
    setSelectedTeam,
    setViewLevel,
  };
};
