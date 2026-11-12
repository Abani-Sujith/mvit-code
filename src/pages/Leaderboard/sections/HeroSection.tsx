import React from 'react';
import { Trophy } from 'lucide-react';

interface HeroSectionProps {
  participantCount: number;
  teamLeadsCount: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ participantCount, teamLeadsCount }) => (
  <div className="border-2 border-ink-black rounded-3xl bg-pure-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
    <div className="text-left max-w-2xl">
      <div className="inline-flex items-center gap-2 bg-ink-black text-pure-white px-3.5 py-1 rounded-full border border-ink-black font-label-sm text-[11px] tracking-wider uppercase mb-3">
        <Trophy className="w-3.5 h-3.5 text-primary-fixed" />
        <span>Campus Leaderboard</span>
      </div>
      <h1 className="font-headline-md text-3xl sm:text-5xl uppercase tracking-tight text-ink-black m-0 leading-tight">
        Coding Leaderboard
      </h1>
      <p className="font-body-md text-on-surface-variant text-sm sm:text-base mt-2 max-w-xl">
        Celebrating excellence across competitive programming platforms. Real-time standings, verified submissions, and fast risers.
      </p>
    </div>

    <div className="flex flex-wrap items-center gap-3">
      <div className="border border-ink-black bg-surface rounded-2xl px-5 py-3 flex flex-col items-center min-w-[120px]">
        <span className="font-headline-sm text-3xl text-primary-container leading-none tabular-nums">
          {participantCount}
        </span>
        <span className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mt-1">
          Participants
        </span>
      </div>
      <div className="border border-ink-black bg-surface rounded-2xl px-5 py-3 flex flex-col items-center min-w-[120px]">
        <span className="font-headline-sm text-3xl text-ink-black leading-none tabular-nums">
          {teamLeadsCount}
        </span>
        <span className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mt-1">
          Team Leads
        </span>
      </div>
    </div>
  </div>
);

export default HeroSection;
