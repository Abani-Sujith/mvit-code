import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { DailyTotal } from '../../../types';

interface MemberHeaderSectionProps {
  memberInfo: DailyTotal;
  latest: DailyTotal;
  totalGrowth: number;
}

const MemberHeaderSection: React.FC<MemberHeaderSectionProps> = ({ memberInfo, latest, totalGrowth }) => (
  <>
    <nav className="flex items-center space-x-2 text-sm text-textMuted bg-surface/50 w-fit px-4 py-2 rounded-full border border-border">
      <Link to="/" className="hover:text-brand-400 transition-colors">Dashboard</Link>
      <ChevronRight className="h-4 w-4" />
      <span className="font-semibold text-textMain flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-brand-500"></div> {memberInfo.memberName}
      </span>
    </nav>

    <div className="glass-card rounded-2xl p-8 relative overflow-hidden group border border-white/5 mb-8">
      <div className="absolute inset-0 bg-gradient-to-r gap-6 from-brand-500/10 to-accent-purple/10 opacity-50"></div>
      <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-ink-black mb-2 tracking-tight">
            👤 {memberInfo.memberName}
          </h1>
          <p className="text-textMuted text-lg max-w-xl">Individual Performance Dashboard</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-surface border border-border rounded-lg text-sm font-semibold text-ink-black">{memberInfo.teamId}</span>
            <span className="px-3 py-1 bg-surface border border-border rounded-lg text-sm font-semibold text-ink-black">{memberInfo.sectionId}</span>
            <span className="px-3 py-1 bg-surface border border-border rounded-lg text-sm font-semibold text-ink-black">{memberInfo.deptId}</span>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {latest.leetcodeUrl && (
              <a href={latest.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFA500]/10 border border-[#FFA500]/20 rounded-lg text-sm font-medium text-[#FFA500] hover:bg-[#FFA500]/20 transition-colors">
                <span className="w-2 h-2 rounded-full bg-[#FFA500]"></span> LeetCode
              </a>
            )}
            {latest.skillrackUrl && (
              <a href={latest.skillrackUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00D4AA]/10 border border-[#00D4AA]/20 rounded-lg text-sm font-medium text-[#00D4AA] hover:bg-[#00D4AA]/20 transition-colors">
                <span className="w-2 h-2 rounded-full bg-[#00D4AA]"></span> SkillRack
              </a>
            )}
            {latest.codechefUrl && (
              <a href={latest.codechefUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4957A]/10 border border-[#D4957A]/20 rounded-lg text-sm font-medium text-[#D4957A] hover:bg-[#D4957A]/20 transition-colors">
                <span className="w-2 h-2 rounded-full bg-[#D4957A]"></span> CodeChef
              </a>
            )}
            {latest.hackerrankUrl && (
              <a href={latest.hackerrankUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00EA64]/10 border border-[#00EA64]/20 rounded-lg text-sm font-medium text-[#00EA64] hover:bg-[#00EA64]/20 transition-colors">
                <span className="w-2 h-2 rounded-full bg-[#00EA64]"></span> HackerRank
              </a>
            )}
            {latest.githubUrl && (
              <a href={latest.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-400/10 border border-gray-400/20 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-400/20 transition-colors">
                <span className="w-2 h-2 rounded-full bg-gray-400"></span> GitHub
              </a>
            )}
          </div>
        </div>
        <div className="glass-card p-6 rounded-xl border-white/5 text-right flex flex-col items-end shrink-0 min-w-[200px]">
          <div className="text-xs font-semibold uppercase tracking-wider text-textMuted mb-2">Total Problems Solved</div>
          <div className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-hero drop-shadow-sm">{latest.totalSolved}</div>
          {totalGrowth > 0 && (<div className="text-green-400 text-sm font-semibold mt-2 flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded border border-green-500/20"><TrendingUp className="w-4 h-4" /> +{totalGrowth} growth</div>)}
        </div>
      </div>
    </div>
  </>
);

export default MemberHeaderSection;
