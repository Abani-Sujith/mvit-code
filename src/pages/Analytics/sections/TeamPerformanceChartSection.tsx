import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card, { CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';

interface TeamPerformanceChartSectionProps {
  trendData: Array<{ name: string; total: number; average: number; members: number }>;
}

const TeamPerformanceChartSection: React.FC<TeamPerformanceChartSectionProps> = ({ trendData }) => (
  <Card hover className="border-border/50">
    <CardHeader className="border-b border-white/5 pb-4">
      <CardTitle className="text-lg">Team Performance Comparison</CardTitle>
    </CardHeader>
    <CardContent className="p-4 md:p-6">
      <div className="h-48 sm:h-64 md:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: '#334155' }} tickLine={false} />
            <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', color: '#fff' }} itemStyle={{ color: '#fff' }} />
            <Bar dataKey="total" fill="url(#colorTotal)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="average" fill="url(#colorAverage)" radius={[4, 4, 0, 0]} />
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorAverage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d946ef" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#d946ef" stopOpacity={0.2} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export default TeamPerformanceChartSection;
