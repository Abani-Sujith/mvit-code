import React from 'react';
import { Link } from 'react-router-dom';
import Card, { CardContent } from '../../components/ui/Card';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { User } from 'lucide-react';
import AssignedTasksSection from './sections/AssignedTasksSection';
import MemberHeaderSection from './sections/MemberHeaderSection';
import MentorAssessmentSection from './sections/MentorAssessmentSection';
import MetricCardsSection from './sections/MetricCardsSection';
import PerformanceChartsSection from './sections/PerformanceChartsSection';
import RecentActivitySection from './sections/RecentActivitySection';
import { useIndividualDashboard } from './useIndividualDashboard';

const IndividualDashboard: React.FC = () => {
  const { memberId, memberData, loading, memberInfo, agentTasks, analysis } = useIndividualDashboard();

  if (loading) {
    return (<div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /><span className="ml-3 text-gray-600">Loading individual dashboard...</span></div>);
  }

  if (!memberInfo || memberData.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card><CardContent className="text-center py-12"><User className="mx-auto h-12 w-12 text-gray-400 mb-4" /><h3 className="text-lg font-medium text-gray-900 mb-2">Member not found</h3><p className="text-gray-600">No data available for member ID: {memberId}</p><Link to="/" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">Return to Dashboard</Link></CardContent></Card>
      </div>
    );
  }

  const sortedData = memberData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const chartData = sortedData.slice().reverse().map(record => ({ date: record.date, total: record.totalSolved, leetcode: record.leetcodeTotal, skillrack: record.skillrackTotal, codechef: record.codechefTotal, hackerrank: record.hackerrankTotal, daily: record.totalDailyIncrease }));

  const latest = sortedData[0];
  const oldest = sortedData[sortedData.length - 1];
  const totalGrowth = latest.totalSolved - (oldest?.totalSolved || 0);
  const platformChartData = [{ name: 'Platforms', leetcode: latest.leetcodeTotal, skillrack: latest.skillrackTotal, codechef: latest.codechefTotal, hackerrank: latest.hackerrankTotal }];
  const recentActivityData = memberData.slice().reverse().slice(0, 10);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in relative">
      <div className="absolute top-0 right-0 -m-8 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <MemberHeaderSection memberInfo={memberInfo} latest={latest} totalGrowth={totalGrowth} />
      <MentorAssessmentSection analysis={analysis} />
      <MetricCardsSection latest={latest} totalGrowth={totalGrowth} analysis={analysis} />
      <PerformanceChartsSection chartData={chartData} platformChartData={platformChartData} />
      <RecentActivitySection recentActivityData={recentActivityData} />
      <AssignedTasksSection agentTasks={agentTasks} />
    </div>
  );
};

export default IndividualDashboard;
