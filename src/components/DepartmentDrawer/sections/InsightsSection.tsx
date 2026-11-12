import React from 'react';
import { Activity } from 'lucide-react';

interface InsightsSectionProps {
  insights: React.ReactNode[];
}

const InsightsSection: React.FC<InsightsSectionProps> = ({ insights }) => (
  <div className="bg-pure-white border-2 border-ink-black rounded-2xl p-6">
    <h3 className="text-xs font-black text-primary-container uppercase tracking-widest mb-4 flex items-center gap-2">
      <Activity className="w-4 h-4" /> Key insights
    </h3>
    <ul className="text-sm font-medium text-ink-black space-y-3 leading-relaxed">
      {insights.map((insight, idx) => (
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
);

export default InsightsSection;
