import React, { useMemo } from 'react';
import { AlertTriangle, Rocket, Activity, CheckCircle } from 'lucide-react';

interface AttentionPanelProps {
  departments: any[]; // Expects DepartmentComparison structure
}

const AttentionPanel: React.FC<AttentionPanelProps> = ({ departments }) => {
  // Logic strictly mapped to Department executive view
  const insights = useMemo(() => {
    // 1. RISK: Highest Priority - Avg < 300
    const risk = [...departments]
      .filter((d) => d.avgPerMember < 300)
      .sort((a, b) => a.avgPerMember - b.avgPerMember)
      .slice(0, 3);

    // 2. IMBALANCE: Strategic Issue - high internal variance
    const imbalance = [...departments]
      .filter((d) => d.isImbalanced === true)
      .sort((a, b) => b.performanceSpread - a.performanceSpread) // Largest gap first
      .slice(0, 3);

    // 3. GROWTH: Positive Insight
    const growth = [...departments]
      .filter((d) => d.trend > 0)
      .sort((a, b) => b.trend - a.trend) // Highest trend first
      .slice(0, 3);

    return { risk, imbalance, growth };
  }, [departments]);

  if (insights.risk.length === 0 && insights.imbalance.length === 0 && insights.growth.length === 0) {
    return (
      <div className="bg-pure-white border-2 border-ink-black rounded-3xl p-8 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-4 border-2 border-ink-black">
          <CheckCircle className="w-8 h-8 text-primary-container" />
        </div>
        <h3 className="text-xl font-black text-ink-black tracking-tight mb-1 [font-synthesis:none] font-display uppercase">All clear</h3>
        <p className="text-sm font-bold text-secondary uppercase tracking-widest">No issues detected across departments</p>
      </div>
    );
  }

  const panelClass = 'border-2 border-ink-black rounded-3xl p-6 bg-pure-white h-full';
  const emptyClass = 'text-xs font-medium italic text-secondary border border-dashed border-ink-black/30 p-3 text-center rounded-2xl';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

      {/* Priority 1: Risk */}
      <div className={panelClass}>
        <h3 className="text-xs font-black text-error uppercase tracking-widest flex items-center gap-2 mb-4">
          <AlertTriangle className="w-4 h-4" /> Low average (below 300)
        </h3>
        <div className="space-y-3">
          {insights.risk.length > 0 ? insights.risk.map((d) => (
            <div
              key={d.deptId}
              className="flex justify-between items-center bg-error-container border border-ink-black px-4 py-3 rounded-2xl"
            >
              <div>
                <p className="font-bold text-sm text-ink-black mb-0.5">{d.deptName}</p>
                <p className="text-[10px] uppercase font-bold text-error tracking-widest">Needs attention</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-mono font-black text-error tabular-nums">{d.avgPerMember} avg</p>
              </div>
            </div>
          )) : (
            <p className={emptyClass}>No low-average departments.</p>
          )}
        </div>
      </div>

      {/* Priority 2: Imbalance */}
      <div className={panelClass}>
        <h3 className="text-xs font-black text-primary-container uppercase tracking-widest flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4" /> Internal imbalance
        </h3>
        <div className="space-y-3">
          {insights.imbalance.length > 0 ? insights.imbalance.map((d) => (
            <div
              key={d.deptId}
              className="flex justify-between items-center bg-surface-tint border border-ink-black px-4 py-3 rounded-2xl"
            >
              <div>
                <p className="font-bold text-sm text-ink-black mb-0.5">{d.deptName}</p>
                <p className="text-[10px] uppercase font-bold text-secondary tracking-widest">Large squad gap</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-mono font-black text-ink-black tabular-nums">Δ {d.performanceSpread} pts</p>
              </div>
            </div>
          )) : (
            <p className={emptyClass}>No imbalanced departments.</p>
          )}
        </div>
      </div>

      {/* Priority 3: Growth */}
      <div className={panelClass}>
        <h3 className="text-xs font-black text-ink-black uppercase tracking-widest flex items-center gap-2 mb-4">
          <Rocket className="w-4 h-4" /> Trending today
        </h3>
        <div className="space-y-3">
          {insights.growth.length > 0 ? insights.growth.map((d) => (
            <div
              key={d.deptId}
              className="flex justify-between items-center bg-primary-fixed border border-ink-black px-4 py-3 rounded-2xl"
            >
              <div>
                <p className="font-bold text-sm text-ink-black mb-0.5">{d.deptName}</p>
                <p className="text-[10px] uppercase font-bold text-primary tracking-widest">Active today</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-mono font-black text-primary-container tabular-nums">+{d.trend} today</p>
              </div>
            </div>
          )) : (
            <p className={emptyClass}>No upward trends today.</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default AttentionPanel;
