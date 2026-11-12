import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import Card, { CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { getTeamStats } from '../../../utils/dataProcessing';

interface PlatformDistributionChartSectionProps {
  platformData: Array<{ name: string; value: number; color: string }>;
  stats: ReturnType<typeof getTeamStats>;
}

const PlatformDistributionChartSection: React.FC<PlatformDistributionChartSectionProps> = ({ platformData, stats }) => (
  <Card hover className="border-border/50">
    <CardHeader className="border-b border-white/5 pb-4">
      <CardTitle className="text-lg">Platform Distribution</CardTitle>
    </CardHeader>
    <CardContent className="p-4 md:p-6">
      <div className="h-48 sm:h-64 md:h-80 w-full flex justify-center items-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={platformData}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="rgba(255,255,255,0.05)"
            >
              {platformData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }} itemStyle={{ color: '#fff' }} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center metric */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-display font-bold text-ink-black">{stats.totalProblems.toLocaleString()}</span>
          <span className="text-xs text-textMuted uppercase tracking-wider font-semibold">Total</span>
        </div>
      </div>

      {/* Custom Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        {platformData.map(platform => (
          <div key={platform.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }}></div>
            <span className="text-sm font-medium text-textMuted">{platform.name}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default PlatformDistributionChartSection;
