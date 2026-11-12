import { useEffect, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { TeamsFilters } from './types';

export const useTeams = () => {
  const { data: allData, hierarchy, loading: globalLoading } = useData();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [showOnlyLeaderTeams, setShowOnlyLeaderTeams] = useState(false);

  useEffect(() => {
    if (globalLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [globalLoading]);

  const filters: TeamsFilters = {
    searchTerm,
    setSearchTerm,
    selectedDept,
    setSelectedDept,
    selectedSection,
    setSelectedSection,
    showOnlyLeaderTeams,
    setShowOnlyLeaderTeams,
  };

  return { allData, hierarchy, loading, filters };
};
