import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useDashboardStats } from './useDashboardStats';
import TabSwitcherSection from './sections/TabSwitcherSection';
import StatsRowSection from './sections/StatsRowSection';
import HeroBannerSection from './sections/HeroBannerSection';
import RiskCardsSection from './sections/RiskCardsSection';
import ActivityFeedSection from './sections/ActivityFeedSection';
import DataTabSection from './sections/DataTabSection';

const Dashboard: React.FC = () => {
  const { data, hierarchy, loading } = useData();
  const [selectedDept, setSelectedDept] = useState<string>('AIML');
  const [viewMode, setViewMode] = useState<'intelligence' | 'data'>('intelligence');
  const [intelligenceFilter, setIntelligenceFilter] = useState<string | null>(null);

  const {
    filtered,
    departments,
    baseLatest,
    activeCount,
    avgScore,
    inactiveCount,
    trialCount,
    rapidCount,
    topPerformers,
    dynamicInterventions,
  } = useDashboardStats({
    data,
    selectedDept,
    intelligenceFilter,
    hierarchy,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-textMuted text-lg font-medium">Booting intelligence core...</span>
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-6 sm:space-y-8 animate-fade-in relative px-2 sm:px-0">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      {/* Search/Filter Controls Overhaul */}
      <TabSwitcherSection
        viewMode={viewMode}
        setViewMode={setViewMode}
        setIntelligenceFilter={setIntelligenceFilter}
        selectedDept={selectedDept}
        setSelectedDept={setSelectedDept}
        departments={departments}
        hierarchy={hierarchy}
      />

      {/* 🎯 TOP SUMMARY STRIP */}
      <StatsRowSection
        activeCount={activeCount}
        baseLatestLength={baseLatest.length}
        avgScore={avgScore}
        selectedDept={selectedDept}
        defaultDept={departments[0]}
        inactiveCount={inactiveCount}
      />

      {viewMode === 'intelligence' ? (
        <div className="space-y-6 sm:space-y-8">
           {/* New Design Hero */}
           <HeroBannerSection />

           {/* Mobile Insights Grid */}
           <RiskCardsSection
             inactiveCount={inactiveCount}
             trialCount={trialCount}
             rapidCount={rapidCount}
             onSelectFilter={(filter) => {
               setViewMode('data');
               setIntelligenceFilter(filter);
             }}
           />

           <ActivityFeedSection
             topPerformers={topPerformers}
             dynamicInterventions={dynamicInterventions}
           />
        </div>
      ) : (
        <DataTabSection
          filtered={filtered}
          intelligenceFilter={intelligenceFilter}
          onResetFilter={() => setIntelligenceFilter(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
