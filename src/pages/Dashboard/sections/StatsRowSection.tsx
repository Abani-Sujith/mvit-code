import React from 'react';
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
  const activePct = Math.round((activeCount / (baseLatestLength || 1)) * 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <StatCard 
        title="Active today" 
        value={activeCount} 
        trend={activePct} 
        trendLabel="% active" 
      />
      <StatCard 
        title="Average problems solved" 
        value={avgScore} 
      />
      <StatCard 
        title="Department in view" 
        value={selectedDept || defaultDept || 'All'} 
      />
      <StatCard 
        title="Inactive students" 
        value={inactiveCount} 
        trend={inactiveCount}
        trendLabel="attn req"
      />
    </div>
  );
};

export default StatsRowSection;
