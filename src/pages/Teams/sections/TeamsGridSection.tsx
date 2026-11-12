import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import TeamCard from './TeamCard';
import { TeamCardData } from '../types';

interface TeamsGridSectionProps {
  teamCards: TeamCardData[];
  navigate: NavigateFunction;
}

const TeamsGridSection: React.FC<TeamsGridSectionProps> = ({ teamCards, navigate }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {teamCards.map((teamCard) => (
      <TeamCard key={`${teamCard.team.deptId}-${teamCard.team.sectionId}-${teamCard.team.id}`} teamCard={teamCard} navigate={navigate} />
    ))}
  </div>
);

export default TeamsGridSection;
