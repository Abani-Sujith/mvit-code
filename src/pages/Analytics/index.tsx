import React from 'react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { getTeamStats, createTeamComparison } from '../../utils/dataProcessing';
import { getLatestByMember } from '../../utils/dataProcessing';
import DetailedStatisticsSection from './sections/DetailedStatisticsSection';
import HeaderSection from './sections/HeaderSection';
import KeyMetricsSection from './sections/KeyMetricsSection';
import PerformanceTrendSection from './sections/PerformanceTrendSection';
import PlatformDistributionChartSection from './sections/PlatformDistributionChartSection';
import ScopeSelectorSection from './sections/ScopeSelectorSection';
import TeamPerformanceChartSection from './sections/TeamPerformanceChartSection';
import { useAnalytics } from './useAnalytics';

const Analytics: React.FC = () => {
  const {
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
  } = useAnalytics();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-gray-600">Loading analytics data...</span>
      </div>
    );
  }

  // Prepare chart data
  const latest = getLatestByMember(data);
  const teamComparison = createTeamComparison(data);
  const stats = getTeamStats(data);

  // Platform distribution data
  const platformData = [
    { name: 'LeetCode', value: latest.reduce((sum, m) => sum + m.leetcodeTotal, 0), color: '#FFA500' },
    { name: 'SkillRack', value: latest.reduce((sum, m) => sum + m.skillrackTotal, 0), color: '#00D4AA' },
    { name: 'CodeChef', value: latest.reduce((sum, m) => sum + m.codechefTotal, 0), color: '#D4957A' },
    { name: 'HackerRank', value: latest.reduce((sum, m) => sum + m.hackerrankTotal, 0), color: '#00EA64' },
  ];

  // Performance trends (mock data - you can implement actual trend calculation)
  const trendData = teamComparison.slice(0, 10).map(team => ({
    name: team.teamName,
    total: team.totalSolved,
    average: team.avgPerMember,
    members: team.members
  }));
  const problemsPerMember = Math.round(stats.totalProblems / Math.max(stats.totalMembers, 1));
  const topPlatform = platformData.reduce((max, p) => p.value > max.value ? p : max).name;
  const contributingMembers = latest.filter(m => m.totalSolved > 0).length;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in relative">
      <HeaderSection />
      <ScopeSelectorSection
        hierarchy={hierarchy}
        selectedDept={selectedDept}
        selectedSection={selectedSection}
        selectedTeam={selectedTeam}
        viewLevel={viewLevel}
        setSelectedDept={setSelectedDept}
        setSelectedSection={setSelectedSection}
        setSelectedTeam={setSelectedTeam}
        setViewLevel={setViewLevel}
      />
      <KeyMetricsSection stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TeamPerformanceChartSection trendData={trendData} />
        <PlatformDistributionChartSection platformData={platformData} stats={stats} />
      </div>
      <PerformanceTrendSection trendData={trendData} />
      <DetailedStatisticsSection
        problemsPerMember={problemsPerMember}
        topPlatform={topPlatform}
        activeTeams={teamComparison.length}
        contributingMembers={contributingMembers}
      />
    </div>
  );
};

export default Analytics;
