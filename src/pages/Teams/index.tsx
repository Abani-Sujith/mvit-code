import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { getTeamStats } from '../../utils/dataProcessing';
import EmptyStateSection from './sections/EmptyStateSection';
import FiltersSection from './sections/FiltersSection';
import HeaderSection from './sections/HeaderSection';
import TeamsGridSection from './sections/TeamsGridSection';
import { useTeams } from './useTeams';
import { TeamCardData, TeamDirectoryItem, TeamPerformanceStyle } from './types';

const Teams: React.FC = () => {
  const navigate = useNavigate();
  const { allData, hierarchy, loading, filters } = useTeams();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-gray-600">Loading teams data...</span>
      </div>
    );
  }

  const allTeams: TeamDirectoryItem[] = [];

  Object.entries(hierarchy).forEach(([deptId, dept]) => {
    Object.entries(dept.sections).forEach(([sectionId, section]) => {
      Object.entries(section.teams).forEach(([teamId, team]) => {
        const teamData = allData.filter(d => d.deptId === deptId && d.sectionId === sectionId && d.teamId === teamId);
        const stats = getTeamStats(teamData);
        allTeams.push({
          id: teamId,
          name: team.name,
          deptId,
          deptName: dept.name,
          sectionId,
          sectionName: section.name,
          description: team.description,
          stats,
          teamLeadName: team.teamLeadName,
          baseTeamName: team.baseTeamName
        });
      });
    });
  });

  const filteredTeams = allTeams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      team.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      team.deptName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      team.sectionName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      (team.teamLeadName && team.teamLeadName.toLowerCase().includes(filters.searchTerm.toLowerCase()));
    const matchesDept = !filters.selectedDept || team.deptId === filters.selectedDept;
    const matchesSection = !filters.selectedSection || team.sectionId === filters.selectedSection;
    const matchesLeaderFilter = !filters.showOnlyLeaderTeams || team.teamLeadName;
    return matchesSearch && matchesDept && matchesSection && matchesLeaderFilter;
  });

  const sortedTeams = filteredTeams.sort((a, b) => b.stats.totalProblems - a.stats.totalProblems);
  const sectionCount = Object.values(hierarchy).reduce((sum, dept) => sum + Object.keys(dept.sections).length, 0);
  const teamsWithLeaders = allTeams.filter(t => t.teamLeadName).length;
  const teamCards: TeamCardData[] = sortedTeams.map((team, index) => {
    const performanceLevel = team.stats.totalProblems >= 1000 ? 'high' : team.stats.totalProblems >= 500 ? 'medium' : team.stats.totalProblems >= 100 ? 'low' : 'minimal';

    const performanceConfig = {
      high: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', badge: 'bg-green-500/20 text-green-400 border-green-500/30' },
      medium: { bg: 'bg-brand-500/10', border: 'border-brand-500/30', text: 'text-brand-400', badge: 'bg-brand-500/20 text-brand-400 border-brand-500/30' },
      low: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', badge: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' },
      minimal: { bg: 'bg-white/5', border: 'border-border/60', text: 'text-textMuted', badge: 'bg-white/10 text-textMuted border-white/20' }
    } as const;

    const perf: TeamPerformanceStyle = performanceConfig[performanceLevel];
    return { team, index, perf };
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <HeaderSection
        totalTeams={allTeams.length}
        departmentCount={Object.keys(hierarchy).length}
        sectionCount={sectionCount}
        teamsWithLeaders={teamsWithLeaders}
      />
      <FiltersSection hierarchy={hierarchy} filters={filters} />
      <TeamsGridSection teamCards={teamCards} navigate={navigate} />
      <EmptyStateSection isEmpty={filteredTeams.length === 0} filters={filters} />
    </div>
  );
};

export default Teams;
