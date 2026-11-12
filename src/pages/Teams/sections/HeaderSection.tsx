import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface HeaderSectionProps {
  totalTeams: number;
  departmentCount: number;
  sectionCount: number;
  teamsWithLeaders: number;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  totalTeams,
  departmentCount,
  sectionCount,
  teamsWithLeaders,
}) => (
  <>
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      <Link to="/" className="hover:text-gray-900">Dashboard</Link>
      <ChevronRight className="h-4 w-4" />
      <span className="font-medium text-gray-900">Teams</span>
    </nav>

    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-8 border border-white/20 text-center md:text-left">
      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">👥 Team Directory</h1>
      <p className="text-sm md:text-base text-gray-400">Browse and manage all teams across your organization</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {totalTeams} Total Teams
        </span>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          {departmentCount} Departments
        </span>
        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
          {sectionCount} Sections
        </span>
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
          {teamsWithLeaders} Teams with Leaders
        </span>
      </div>
    </div>
  </>
);

export default HeaderSection;
