import React, { useEffect } from 'react';
import HeaderSection from './sections/HeaderSection';
import SummarySection from './sections/SummarySection';
import InsightsSection from './sections/InsightsSection';
import PerformanceRangeSection from './sections/PerformanceRangeSection';
import ContributionMatrixSection from './sections/ContributionMatrixSection';
import { DepartmentDrawerProps } from './types';

const DepartmentDrawer: React.FC<DepartmentDrawerProps> = ({ isOpen, onClose, department }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !department) return null;

  // Insight Generation Pipeline
  const generateInsights = () => {
    const alerts: React.ReactNode[] = [];
    const contribSorted = [...department.contributionDistribution].sort(
      (a, b) => b.contribution - a.contribution
    );

    // Insight 1: Dominance Detection (e.g. 70% from top 2)
    if (contribSorted.length >= 2) {
      const top2Contrib = contribSorted[0].contribution + contribSorted[1].contribution;
      if (top2Contrib > 60) {
        alerts.push(
          <span key="1">
            <strong>{Math.round(top2Contrib)}%</strong> of output comes from the top 2 squads.
          </span>
        );
      }
    }

    // Insight 2: Spread Awareness
    if (department.isImbalanced) {
      alerts.push(
        <span key="2" className="text-error">
          High internal variance: <strong>{department.performanceSpread} pt</strong> gap between
          top and bottom squads.
        </span>
      );
    }

    // Insight 3: Velocity Status
    if (department.trend > 100) {
      alerts.push(
        <span key="3" className="text-primary-container">
          Strong momentum — <strong>+{department.trend}</strong> problems solved today.
        </span>
      );
    } else if (department.trend < 0) {
      alerts.push(
        <span key="4" className="text-error">
          Negative trend detected. Follow up recommended.
        </span>
      );
    }

    if (alerts.length === 0) {
      alerts.push(<span key="5">Department is performing within expected range.</span>);
    }
    return alerts;
  };

  const insights = generateInsights();
  const contributionDistribution = [...department.contributionDistribution].sort(
    (a, b) => b.contribution - a.contribution
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-black/50 z-40"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[600px] bg-pure-white border-l-2 border-ink-black z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-y-auto flex flex-col`}
      >
        {/* Header */}
        <HeaderSection department={department} onClose={onClose} />

        {/* Content Body */}
        <div className="p-6 flex-1 space-y-8 pb-12">
          <SummarySection department={department} />
          <InsightsSection insights={insights} />
          <PerformanceRangeSection department={department} />
          <ContributionMatrixSection contributionDistribution={contributionDistribution} />
        </div>
      </div>
    </>
  );
};

export default DepartmentDrawer;
