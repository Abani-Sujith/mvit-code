import React from 'react';
import { Calendar } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { DailyTotal } from '../../../types';

interface RecentActivitySectionProps {
  recentActivityData: DailyTotal[];
}

const RecentActivitySection: React.FC<RecentActivitySectionProps> = ({ recentActivityData }) => (
  <Card hover className="border-border/50">
    <CardHeader className="border-b border-white/5 pb-4">
      <CardTitle className="text-lg">Recent Activity</CardTitle>
    </CardHeader>
    <CardContent className="pt-6">
      <div className="space-y-4">
        {recentActivityData.map((record, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface/50 border border-border/50 rounded-xl hover:bg-white/5 transition-colors gap-4">
            <div className="flex items-center">
              <div className="p-3 bg-brand-500/10 rounded-lg mr-4 border border-brand-500/20 text-brand-400">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-ink-black">{record.date}</div>
                <div className="text-sm font-medium text-textMuted mt-0.5 flex items-center gap-1">
                  Total: <span className="text-ink-black">{record.totalSolved}</span>
                  {record.totalDailyIncrease > 0 && <span className="text-green-400 ml-1">(+{record.totalDailyIncrease})</span>}
                </div>
              </div>
            </div>
            <div className="sm:text-right flex flex-wrap gap-2 sm:gap-0 sm:block">
              <div className="flex items-center gap-3 text-xs font-medium text-textMuted">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#FFA500]"></span>
                  {record.leetcodeUrl ? (
                     <a href={record.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 hover:underline">LC: {record.leetcodeTotal}</a>
                  ) : (
                     `LC: ${record.leetcodeTotal}`
                  )}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#00D4AA]"></span>
                  {record.skillrackUrl ? (
                     <a href={record.skillrackUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 hover:underline">SR: {record.skillrackTotal}</a>
                  ) : (
                     `SR: ${record.skillrackTotal}`
                  )}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#D4957A]"></span>
                  {record.codechefUrl ? (
                     <a href={record.codechefUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 hover:underline">CC: {record.codechefTotal}</a>
                  ) : (
                     `CC: ${record.codechefTotal}`
                  )}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#00EA64]"></span>
                  {record.hackerrankUrl ? (
                     <a href={record.hackerrankUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 hover:underline">HR: {record.hackerrankTotal}</a>
                  ) : (
                     `HR: ${record.hackerrankTotal}`
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default RecentActivitySection;
