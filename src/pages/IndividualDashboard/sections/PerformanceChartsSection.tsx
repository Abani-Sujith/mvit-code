import React from 'react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card, { CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';

interface PerformanceChartsSectionProps {
  chartData: Array<{ date: string; total: number; leetcode: number; skillrack: number; codechef: number; hackerrank: number; daily: number }>;
  platformChartData: Array<{ name: string; leetcode: number; skillrack: number; codechef: number; hackerrank: number }>;
}

const PerformanceChartsSection: React.FC<PerformanceChartsSectionProps> = ({ chartData, platformChartData }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <Card hover className="border-border/50">
      <CardHeader className="border-b border-white/5 pb-4">
        <CardTitle className="text-lg">Progress Timeline</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="date" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(date) => new Date(date).toLocaleDateString()} axisLine={{ stroke: '#334155' }} tickLine={false} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', color: '#fff' }} itemStyle={{ color: '#fff' }} labelFormatter={(date) => new Date(date).toLocaleDateString()} />
              <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} name="Total Problems" dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#60a5fa', stroke: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>

    <Card hover className="border-border/50">
      <CardHeader className="border-b border-white/5 pb-4">
        <CardTitle className="text-lg">Platform Performance</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={platformChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: '#334155' }} tickLine={false} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', color: '#fff' }} itemStyle={{ color: '#fff' }} />
              <Bar dataKey="leetcode" fill="#FFA500" name="LeetCode" radius={[4, 4, 0, 0]} />
              <Bar dataKey="skillrack" fill="#00D4AA" name="SkillRack" radius={[4, 4, 0, 0]} />
              <Bar dataKey="codechef" fill="#D4957A" name="CodeChef" radius={[4, 4, 0, 0]} />
              <Bar dataKey="hackerrank" fill="#00EA64" name="HackerRank" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default PerformanceChartsSection;
