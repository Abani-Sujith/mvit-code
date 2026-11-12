import React from 'react';
import { Building2, LayoutGrid, Users, Trophy } from 'lucide-react';
import StatCard from '../../../components/ui/StatCard';

interface StatsOverviewSectionProps {
  totalDepartments: number;
  totalTeamsGlobally: number;
  activeMembersAggregated: number;
  topDepartmentString: string;
}

const StatsOverviewSection: React.FC<StatsOverviewSectionProps> = ({
  totalDepartments,
  totalTeamsGlobally,
  activeMembersAggregated,
  topDepartmentString,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatCard
      title="Departments"
      value={totalDepartments}
      icon={Building2}
    />
    <StatCard
      title="Total teams"
      value={totalTeamsGlobally}
      icon={LayoutGrid}
    />
    <StatCard
      title="Total students"
      value={activeMembersAggregated}
      icon={Users}
    />
    <StatCard
      title="Top department"
      value={topDepartmentString}
      icon={Trophy}
    />
  </div>
);

export default StatsOverviewSection;

