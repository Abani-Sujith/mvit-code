import React from 'react';
import { Activity, Trophy, Building2, ShieldAlert } from 'lucide-react';
import StatCard from '../../../components/ui/StatCard';

interface StatsRowSectionProps {
  activeCount: number;
  baseLatestLength: number;
  avgScore: number;
  selectedDept: string;
  defaultDept: string;
  inactiveCount: number;
}

export const StatsRowSection: React.FC<StatsRowSectionProps> = ({
  activeCount,
  baseLatestLength,
  avgScore,
  selectedDept,
  defaultDept,
  inactiveCount,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
      <StatCard title="Active Today" value={activeCount} icon={Activity} trend={Math.round((activeCount / (baseLatestLength || 1)) * 100)} trendLabel="%" colorTheme="brand" />
      <StatCard title="Avg Score" value={avgScore} icon={Trophy} colorTheme="purple" />
      <StatCard title="Top Dept" value={selectedDept || defaultDept || 'N/A'} icon={Building2} colorTheme="amber" highlight />
      <StatCard title="At Risk" value={inactiveCount} icon={ShieldAlert} colorTheme="blue" />
    </div>
  );
};

export default StatsRowSection;
