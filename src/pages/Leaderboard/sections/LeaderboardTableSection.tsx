import React from 'react';
import { Trophy } from 'lucide-react';
import LeaderboardTable from '../../../components/Tables/LeaderboardTable';
import { LeaderboardEntryList, LeaderboardViewLevel } from '../types';

interface LeaderboardTableSectionProps {
  leaderboard: LeaderboardEntryList;
  viewLevel: LeaderboardViewLevel;
  getLevelTitle: () => string;
}

const LeaderboardTableSection: React.FC<LeaderboardTableSectionProps> = ({ leaderboard, viewLevel, getLevelTitle }) => (
  <div className="lg:col-span-2">
    <div className="border-2 border-ink-black rounded-3xl bg-pure-white p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-ink-black/15">
        <Trophy className="w-5 h-5 text-primary-container" />
        <h3 className="font-headline-sm text-xl uppercase tracking-tight text-ink-black m-0">
          {getLevelTitle()}
        </h3>
      </div>
      <LeaderboardTable data={leaderboard} showTeamColumn={viewLevel !== 'team'} />
    </div>
  </div>
);

export default LeaderboardTableSection;
