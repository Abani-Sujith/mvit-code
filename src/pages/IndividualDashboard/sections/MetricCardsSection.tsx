import React from 'react';
import { Award, Calendar, Target, TrendingUp } from 'lucide-react';
import Card from '../../../components/ui/Card';
import { DailyTotal } from '../../../types';

interface MetricCardsSectionProps {
  latest: DailyTotal;
  totalGrowth: number;
  analysis: any;
}

const MetricCardsSection: React.FC<MetricCardsSectionProps> = ({ latest, totalGrowth, analysis }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
    <Card hover className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700 pointer-events-none"></div>
      <div className="flex items-center p-6 relative z-10">
        <div className="p-4 rounded-xl bg-blue-500/20 shadow-inner border border-blue-500/30">
          <Target className="h-7 w-7 text-blue-400" />
        </div>
        <div className="ml-5">
          <p className="text-xs font-semibold text-textMuted uppercase tracking-wider">Current Total</p>
          <p className="text-3xl font-display font-bold text-ink-black mt-1">{latest.totalSolved}</p>
        </div>
      </div>
    </Card>

    <Card hover className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700 pointer-events-none"></div>
      <div className="flex items-center p-6 relative z-10">
        <div className="p-4 rounded-xl bg-green-500/20 shadow-inner border border-green-500/30">
          <TrendingUp className="h-7 w-7 text-green-400" />
        </div>
        <div className="ml-5">
          <p className="text-xs font-semibold text-textMuted uppercase tracking-wider">Total Growth</p>
          <p className="text-3xl font-display font-bold text-ink-black mt-1">+{totalGrowth}</p>
        </div>
      </div>
    </Card>

    <Card hover className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700 pointer-events-none"></div>
      <div className="flex items-center p-6 relative z-10">
        <div className="p-4 rounded-xl bg-purple-500/20 shadow-inner border border-purple-500/30">
          <Calendar className="h-7 w-7 text-purple-400" />
        </div>
        <div className="ml-5">
          <p className="text-xs font-semibold text-textMuted uppercase tracking-wider">7-Day Consistency</p>
          <p className="text-xl font-display font-bold text-ink-black mt-1">{analysis?.consistency_label || "No Data"}</p>
        </div>
      </div>
    </Card>

    <Card hover className="bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700 pointer-events-none"></div>
      <div className="flex items-center p-6 relative z-10">
        <div className="p-4 rounded-xl bg-amber-500/20 shadow-inner border border-amber-500/30">
          <Award className="h-7 w-7 text-amber-500" />
        </div>
        <div className="ml-5">
          <p className="text-xs font-semibold text-textMuted uppercase tracking-wider">Behavioral Integrity</p>
          <p className="text-3xl font-display font-bold text-ink-black mt-1">{analysis?.integrity_score || 100}%</p>
        </div>
      </div>
    </Card>
  </div>
);

export default MetricCardsSection;
