import React, { useEffect, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { createDepartmentComparison } from '../../utils/dataProcessing';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import DepartmentDrawer from '../../components/DepartmentDrawer';

import HeaderSection from './sections/HeaderSection';
import StatsOverviewSection from './sections/StatsOverviewSection';
import DepartmentGridSection from './sections/DepartmentGridSection';

const AllDepartments: React.FC = () => {
  const { data, loading: globalLoading, refreshData } = useData();
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Drawer State mapped to clicked Department from either the Table or Intelligence Grid
  const [selectedDepartment, setSelectedDepartment] = useState<any | null>(null);

  useEffect(() => {
    if (globalLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [globalLoading]);

  const handleSync = async () => {
    setSyncing(true);
    await refreshData();
    setSyncing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="flex flex-col items-center">
          <LoadingSpinner size="lg" />
          <span className="mt-4 text-secondary font-label-lg uppercase tracking-widest text-xs">
            Loading departments...
          </span>
        </div>
      </div>
    );
  }

  // Engine Level 1: Backend Parsing (Extract macro-level Departments)
  const fullComparison = createDepartmentComparison(data);

  // Engine Level 2: Frontend Data Filtration (Search limits)
  const filteredDepartments = fullComparison.filter((dept) => {
    if (!searchQuery) return true;
    const lowerQ = searchQuery.toLowerCase();
    // Search maps deeply tracking nested teams as well, allowing global search from Macro level
    const matchesNestedTeam = dept.nestedTeams?.some((t: any) =>
      t.teamName.toLowerCase().includes(lowerQ)
    );
    return dept.deptName.toLowerCase().includes(lowerQ) || matchesNestedTeam;
  });

  // Engine Level 3: Realtime Executive Metrics Calculation (GLOBAL ORG)
  const totalDepartments = filteredDepartments.length;
  const totalTeamsGlobally = filteredDepartments.reduce((acc, d) => acc + d.totalTeams, 0);
  const activeMembersAggregated = filteredDepartments.reduce((acc, d) => acc + d.totalMembers, 0);

  // Best department based on avg performance calculation strictly
  const topDepartmentString =
    [...filteredDepartments].sort((a, b) => b.avgPerMember - a.avgPerMember)[0]?.deptName ||
    '—';

  return (
    <div className="w-full space-y-6 sm:space-y-8 select-none">
      <HeaderSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        syncing={syncing}
        handleSync={handleSync}
      />

      <StatsOverviewSection
        totalDepartments={totalDepartments}
        totalTeamsGlobally={totalTeamsGlobally}
        activeMembersAggregated={activeMembersAggregated}
        topDepartmentString={topDepartmentString}
      />

      <DepartmentGridSection
        filteredDepartments={filteredDepartments}
        totalDepartments={totalDepartments}
        setSelectedDepartment={setSelectedDepartment}
      />

      {/* Deep Dive Drawer */}
      <DepartmentDrawer
        isOpen={!!selectedDepartment}
        onClose={() => setSelectedDepartment(null)}
        department={selectedDepartment}
      />
    </div>
  );
};

export default AllDepartments;

