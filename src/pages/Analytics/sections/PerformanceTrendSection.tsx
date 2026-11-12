import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card, { CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';

interface PerformanceTrendSectionProps {
  trendData: Array<{ name: string; total: number; average: number; members: number }>;
}

const PerformanceTrendSection: React.FC<PerformanceTrendSectionProps> = ({ trendData }) => (
  <Card hover className="border-border/50">
    <CardHeader className="border-b border-white/5 pb-4">
      <CardTitle className="text-lg">Performance Trends Overview</CardTitle>
    </CardHeader>
    <CardContent className="p-4 md:p-6">
      <div className="h-48 sm:h-64 md:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: '#334155' }} tickLine={false} />
            <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', color: '#fff' }} itemStyle={{ color: '#fff' }} />
            <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#60a5fa', stroke: '#fff' }} />
            <Line type="monotone" dataKey="average" stroke="#ec4899" strokeWidth={3} dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#f472b6', stroke: '#fff' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export default PerformanceTrendSection;
