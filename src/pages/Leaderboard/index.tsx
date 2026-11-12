import React from 'react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { createLeaderboard } from '../../utils/dataProcessing';
import EmptyStateSection from './sections/EmptyStateSection';
import FastestRisersSection from './sections/FastestRisersSection';
import HeroSection from './sections/HeroSection';
import LeaderboardTableSection from './sections/LeaderboardTableSection';
import PodiumSection from './sections/PodiumSection';
import ScopeFilterSection from './sections/ScopeFilterSection';
import { useLeaderboard } from './useLeaderboard';

const Leaderboard: React.FC = () => {
  const {
    hierarchy,
    loading,
    data,
    filters,
  } = useLeaderboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-gray-600">Loading leaderboard...</span>
      </div>
    );
  }

  let leaderboard = createLeaderboard(data);
  if (filters.showOnlyLeaders) leaderboard = leaderboard.filter(e => e.isTeamLead);
  const topPerformers = leaderboard.slice(0, 3);
  const teamLeadsCount = leaderboard.filter(e => e.isTeamLead).length;
  const fastestRisers = leaderboard.filter(m => (m.totalDailyIncrease || 0) > 10).slice(0, 5);
  const fastestRiserCount = leaderboard.filter(m => (m.totalDailyIncrease || 0) > 10).length;

  const getLevelTitle = () => {
    switch (filters.viewLevel) {
      case 'team':
        return filters.selectedTeam ? `Team: ${filters.selectedTeam}` : 'Select Team';
      case 'section':
        return filters.selectedSection ? `Section: ${filters.selectedSection}` : 'Select Section';
      case 'department':
        return filters.selectedDept ? `Department: ${filters.selectedDept}` : 'Select Department';
      default:
        return filters.showOnlyLeaders ? 'Team Leaders Leaderboard' : 'Global Leaderboard';
    }
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8 select-none">
      <HeroSection participantCount={leaderboard.length} teamLeadsCount={teamLeadsCount} />
      <ScopeFilterSection hierarchy={hierarchy} filters={filters} />
      <PodiumSection topPerformers={topPerformers} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <LeaderboardTableSection
          leaderboard={leaderboard}
          viewLevel={filters.viewLevel}
          getLevelTitle={getLevelTitle}
        />
        <FastestRisersSection fastestRisers={fastestRisers} fastestRiserCount={fastestRiserCount} />
      </div>
      <EmptyStateSection isEmpty={leaderboard.length === 0} filters={filters} />
    </div>
  );
};

export default Leaderboard;
