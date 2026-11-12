import React, { useEffect } from 'react';
import {
  X,
  TrendingUp,
  Users,
  AlertTriangle,
  BookOpen,
  Activity,
  LayoutDashboard,
  Crown,
  Target,
} from 'lucide-react';

interface DepartmentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  department: any | null; // DepartmentComparison structure
}

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
        <div className="p-6 border-b-2 border-ink-black bg-surface-tint sticky top-0 z-10 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-black text-ink-black tracking-tight mb-1 [font-synthesis:none] font-display uppercase">
              {department.deptName}
            </h2>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-secondary mt-2">
              <span className="px-2 py-0.5 border border-ink-black rounded-full flex items-center gap-1 bg-pure-white">
                <LayoutDashboard className="w-3 h-3" /> Department overview
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-pure-white hover:bg-surface-container text-ink-black rounded-full transition-none border border-ink-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 space-y-8 pb-12">

          {/* Executive Overview Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface border-2 border-ink-black rounded-2xl p-4 flex flex-col items-center text-center">
              <p className="text-[10px] text-secondary uppercase font-bold tracking-widest mb-2 flex items-center justify-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-primary-container" /> Total students
              </p>
              <p className="text-3xl font-mono font-black text-ink-black tabular-nums">
                {department.totalMembers}
              </p>
            </div>
            <div className="bg-surface border-2 border-ink-black rounded-2xl p-4 flex flex-col items-center text-center">
              <p className="text-[10px] text-secondary uppercase font-bold tracking-widest mb-2 flex items-center justify-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-primary-container" /> Today's activity
              </p>
              <p
                className={`text-3xl font-mono font-black tabular-nums ${
                  department.trend > 0 ? 'text-primary-container' : 'text-secondary'
                }`}
              >
                {department.trend > 0 ? `+${department.trend}` : '0'}
              </p>
            </div>
          </div>

          {/* Total Solved Hero */}
          <div className="bg-surface-tint border-2 border-ink-black rounded-2xl py-5 px-6 flex justify-between items-center">
            <div>
              <p className="text-[10px] text-secondary uppercase font-black tracking-widest mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3 h-3" /> Total problems solved
              </p>
              <p className="text-5xl font-mono font-black text-primary-container mt-2 tabular-nums">
                {department.totalSolved.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-secondary uppercase font-bold tracking-widest mb-1">
                Avg per student
              </p>
              <p className="text-3xl font-mono font-black text-ink-black mt-1 tabular-nums">
                {department.avgPerMember.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-pure-white border-2 border-ink-black rounded-2xl p-6">
            <h3 className="text-xs font-black text-primary-container uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Key insights
            </h3>
            <ul className="text-sm font-medium text-ink-black space-y-3 leading-relaxed">
              {generateInsights().map((insight, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 bg-surface border border-ink-black p-3 rounded-xl"
                >
                  <span className="w-1.5 h-1.5 bg-primary-container rounded-full mt-1.5 shrink-0 block" />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Performance Spread */}
          <div className="space-y-4 pt-4 border-t-2 border-ink-black">
            <h3 className="text-sm border-b border-ink-black/15 pb-2 font-black text-ink-black tracking-widest flex items-center gap-2 [font-synthesis:none]">
              <Target className="w-4 h-4 text-primary-container" /> Squad performance range
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-pure-white border-2 border-ink-black rounded-2xl p-4">
                <p className="text-[10px] uppercase font-black text-primary-container tracking-widest mb-2 flex items-center gap-1.5">
                  <Crown className="w-3 h-3" /> Top squad
                </p>
                <p className="font-bold text-sm text-ink-black truncate leading-none mb-1">
                  {department.topTeam ? department.topTeam.name : '—'}
                </p>
                <p className="text-xl font-mono font-black text-primary-container mt-2 tabular-nums">
                  {department.topTeam ? department.topTeam.avg : 0}{' '}
                  <span className="text-[10px] text-secondary">avg</span>
                </p>
              </div>
              <div className="bg-surface border-2 border-ink-black rounded-2xl p-4">
                <p className="text-[10px] uppercase font-black text-error tracking-widest mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3 h-3" /> Needs support
                </p>
                <p className="font-bold text-sm text-ink-black truncate leading-none mb-1">
                  {department.weakestTeam ? department.weakestTeam.name : '—'}
                </p>
                <p className="text-xl font-mono font-black text-error mt-2 tabular-nums">
                  {department.weakestTeam ? department.weakestTeam.avg : 0}{' '}
                  <span className="text-[10px] text-secondary">avg</span>
                </p>
              </div>
            </div>
            {department.isImbalanced && (
              <div className="w-full h-1 bg-ink-black rounded-full mt-2" />
            )}
          </div>

          {/* Contribution Matrix */}
          <div className="space-y-4 pt-6">
            <h3 className="text-sm font-black text-ink-black tracking-widest flex justify-between items-center mb-4 [font-synthesis:none]">
              <span className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-primary-container" /> Squad contribution
              </span>
              <span className="text-[10px] text-secondary bg-surface px-2 py-0.5 rounded-full border border-ink-black font-normal">
                % of total solved
              </span>
            </h3>
            <div className="space-y-3">
              {[...department.contributionDistribution]
                .sort((a, b) => b.contribution - a.contribution)
                .map((t, index) => (
                  <div
                    key={t.teamId}
                    className="flex justify-between items-center bg-pure-white border border-ink-black rounded-2xl p-4 relative overflow-hidden hover:bg-surface transition-none"
                  >
                    {/* Background fill bar */}
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-primary-fixed/40 pointer-events-none"
                      style={{
                        width: `${t.contribution}%`,
                      }}
                    />

                    <div className="relative z-10 flex items-center gap-4 flex-1 min-w-0 pr-4">
                      <span
                        className={`font-mono text-xs font-bold w-6 text-center tabular-nums ${
                          index === 0 ? 'text-primary-container' : 'text-secondary'
                        }`}
                      >
                        {index + 1}.
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-ink-black truncate">{t.teamName}</p>
                        <p className="text-[10px] font-mono text-secondary tabular-nums">
                          {t.totalSolved.toLocaleString()} solved
                        </p>
                      </div>
                    </div>

                    <div className="relative z-10 text-right shrink-0">
                      <p className="text-base font-black font-mono text-primary-container leading-none mb-1 tabular-nums">
                        {Math.round(t.contribution)}%
                      </p>
                      <p className="text-[10px] font-bold text-secondary uppercase tabular-nums">
                        {t.avgPerMember} avg
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentDrawer;
