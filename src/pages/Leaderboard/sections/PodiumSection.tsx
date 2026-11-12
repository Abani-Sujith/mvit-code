import React from 'react';
import { Link } from 'react-router-dom';
import { LeaderboardEntryList } from '../types';

interface PodiumSectionProps {
  topPerformers: LeaderboardEntryList;
}

const PodiumSection: React.FC<PodiumSectionProps> = ({ topPerformers }) => (
  <>
    {topPerformers.length >= 3 && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        {/* Rank 2 - Silver */}
        <div className="order-2 md:order-1 border-2 border-ink-black rounded-3xl bg-pure-white p-6 text-center relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-4 right-4 transform rotate-2">
            <span className="rounded-full bg-surface-container text-ink-black px-3 py-1 font-label-sm text-[10px] tracking-wider uppercase border border-ink-black">
              Rank 02
            </span>
          </div>
          <div className="w-16 h-16 rounded-full bg-surface-tint border border-ink-black flex items-center justify-center mx-auto mb-4 font-headline-sm text-2xl text-ink-black">
            🥈
          </div>
          <div>
            <Link to={`/individual/${topPerformers[1].memberId}`} className="font-title-md text-lg font-bold text-ink-black hover:text-primary-container block uppercase tracking-tight">
              {topPerformers[1].memberName}
            </Link>
            <div className="font-label-sm text-xs text-secondary uppercase tracking-wider mt-1">
              {topPerformers[1].teamId} • {topPerformers[1].deptId}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-ink-black/15">
            <div className="font-headline-lg text-4xl text-ink-black tabular-nums">
              {topPerformers[1].totalSolved.toLocaleString()}
            </div>
            <div className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mt-1">
              Problems Solved
            </div>
          </div>
        </div>

        {/* Rank 1 - Champion Flame */}
        <div className="order-1 md:order-2 border-2 border-ink-black rounded-3xl bg-surface-tint p-8 text-center relative overflow-hidden shadow-md flex flex-col justify-between">
          <div className="absolute top-4 right-4 transform -rotate-3">
            <span className="rounded-full bg-ink-black text-pure-white px-3.5 py-1 font-label-sm text-[11px] tracking-wider uppercase border border-ink-black">
              Champion 01
            </span>
          </div>
          <div className="w-20 h-20 rounded-full bg-primary-container text-pure-white border-2 border-ink-black flex items-center justify-center mx-auto mb-4 font-headline-sm text-3xl">
            👑
          </div>
          <div>
            <Link to={`/individual/${topPerformers[0].memberId}`} className="font-headline-sm text-2xl text-ink-black hover:text-primary-container block uppercase tracking-tight">
              {topPerformers[0].memberName}
            </Link>
            <div className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider mt-1">
              {topPerformers[0].teamId} • {topPerformers[0].deptId}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-ink-black/20">
            <div className="font-headline-lg text-5xl sm:text-6xl text-primary-container tabular-nums">
              {topPerformers[0].totalSolved.toLocaleString()}
            </div>
            <div className="font-label-sm text-xs text-ink-black font-bold uppercase tracking-wider mt-1">
              Master Score
            </div>
          </div>
        </div>

        {/* Rank 3 - Bronze */}
        <div className="order-3 border-2 border-ink-black rounded-3xl bg-pure-white p-6 text-center relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-4 right-4 transform -rotate-2">
            <span className="rounded-full bg-primary-fixed text-ink-black px-3 py-1 font-label-sm text-[10px] tracking-wider uppercase border border-ink-black">
              Rank 03
            </span>
          </div>
          <div className="w-16 h-16 rounded-full bg-surface-container border border-ink-black flex items-center justify-center mx-auto mb-4 font-headline-sm text-2xl text-ink-black">
            🥉
          </div>
          <div>
            <Link to={`/individual/${topPerformers[2].memberId}`} className="font-title-md text-lg font-bold text-ink-black hover:text-primary-container block uppercase tracking-tight">
              {topPerformers[2].memberName}
            </Link>
            <div className="font-label-sm text-xs text-secondary uppercase tracking-wider mt-1">
              {topPerformers[2].teamId} • {topPerformers[2].deptId}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-ink-black/15">
            <div className="font-headline-lg text-4xl text-ink-black tabular-nums">
              {topPerformers[2].totalSolved.toLocaleString()}
            </div>
            <div className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mt-1">
              Problems Solved
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);

export default PodiumSection;
