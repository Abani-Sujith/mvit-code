import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { DailyTotal } from '../types';
import { createLeaderboard } from '../utils/dataProcessing';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import LeaderboardTable from '../components/Tables/LeaderboardTable';
import HierarchySelector from '../components/Navigation/HierarchySelector';
import { Trophy, Crown, TrendingUp } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const { data: globalData, hierarchy, loading: globalLoading } = useData();
  const [data, setData] = useState<DailyTotal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [viewLevel, setViewLevel] = useState<'global' | 'department' | 'section' | 'team'>('global');
  const [showOnlyLeaders, setShowOnlyLeaders] = useState(false);

  useEffect(() => {
    if (globalLoading) {
      setLoading(true);
      return;
    }

    // Client-side filtering instead of refetching from Firebase
    let filteredData = globalData;

    try {
      if (viewLevel === 'department' && selectedDept) {
        filteredData = globalData.filter((d: any) => 
          String(d.deptId || '').toLowerCase() === selectedDept.toLowerCase()
        );
      } else if (viewLevel === 'section' && selectedDept && selectedSection) {
        filteredData = globalData.filter((d: any) => 
          String(d.deptId || '').toLowerCase() === selectedDept.toLowerCase() && 
          String(d.sectionId || '').toLowerCase() === selectedSection.toLowerCase()
        );
      } else if (viewLevel === 'team' && selectedDept && selectedSection && selectedTeam) {
        filteredData = globalData.filter((d: any) => 
          String(d.deptId || '').toLowerCase() === selectedDept.toLowerCase() && 
          String(d.sectionId || '').toLowerCase() === selectedSection.toLowerCase() && 
          String(d.teamId || '').toLowerCase() === selectedTeam.toLowerCase()
        );
      }
    } catch (err) {
      console.error("Filter failed", err);
      filteredData = [];
    }

    setData(filteredData);
    setLoading(false);
  }, [globalData, globalLoading, viewLevel, selectedDept, selectedSection, selectedTeam]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-gray-600">Loading leaderboard...</span>
      </div>
    );
  }

  let leaderboard = createLeaderboard(data);
  if (showOnlyLeaders) leaderboard = leaderboard.filter(e => e.isTeamLead);
  const topPerformers = leaderboard.slice(0, 3);

  const getLevelTitle = () => {
    switch (viewLevel) {
      case 'team':
        return selectedTeam ? `Team: ${selectedTeam}` : 'Select Team';
      case 'section':
        return selectedSection ? `Section: ${selectedSection}` : 'Select Section';
      case 'department':
        return selectedDept ? `Department: ${selectedDept}` : 'Select Department';
      default:
        return showOnlyLeaders ? 'Team Leaders Leaderboard' : 'Global Leaderboard';
    }
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8 select-none">
      {/* Neo-brutalist Hero Section */}
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
              {leaderboard.length}
            </span>
            <span className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mt-1">
              Participants
            </span>
          </div>
          <div className="border border-ink-black bg-surface rounded-2xl px-5 py-3 flex flex-col items-center min-w-[120px]">
            <span className="font-headline-sm text-3xl text-ink-black leading-none tabular-nums">
              {leaderboard.filter(e => e.isTeamLead).length}
            </span>
            <span className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mt-1">
              Team Leads
            </span>
          </div>
        </div>
      </div>

      {/* Leaderboard Scope / Filter Bar */}
      <div className="border-2 border-ink-black rounded-3xl bg-pure-white p-5 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div>
              <label className="block font-label-sm text-xs uppercase tracking-wider text-secondary mb-2">
                Scope Filter
              </label>
              <div className="flex flex-wrap gap-2">
                {(['global', 'department', 'section', 'team'] as const).map((level) => (
                  <button 
                    key={level} 
                    onClick={() => setViewLevel(level)} 
                    className={`px-4 py-1.5 rounded-full font-label-sm text-xs uppercase tracking-wider border border-ink-black transition-none ${
                      viewLevel === level 
                        ? 'bg-ink-black text-pure-white' 
                        : 'bg-pure-white text-ink-black hover:bg-surface-container'
                    }`}
                  >
                    {level === 'global' ? 'All System' : level}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <label className="inline-flex items-center gap-2 cursor-pointer font-label-sm text-xs uppercase tracking-wider text-ink-black">
                <input 
                  type="checkbox" 
                  checked={showOnlyLeaders} 
                  onChange={(e) => setShowOnlyLeaders(e.target.checked)} 
                  className="rounded border-ink-black text-primary-container focus:ring-0 w-4 h-4 cursor-pointer" 
                />
                <Crown className="w-3.5 h-3.5 text-primary-container" />
                <span>Show Team Leads Only</span>
              </label>
            </div>
          </div>

          <div className="bg-surface p-4 rounded-2xl border border-ink-black">
            <HierarchySelector 
              hierarchy={hierarchy} 
              selectedDept={selectedDept} 
              selectedSection={selectedSection} 
              selectedTeam={selectedTeam} 
              onDepartmentChange={(deptId) => { setSelectedDept(deptId); setSelectedSection(''); setSelectedTeam(''); setViewLevel('department'); }} 
              onSectionChange={(sectionId) => { setSelectedSection(sectionId); setSelectedTeam(''); setViewLevel('section'); }} 
              onTeamChange={(teamId) => { setSelectedTeam(teamId); setViewLevel('team'); }} 
            />
          </div>
        </div>
      </div>

      {/* Podium for Top 3 */}
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

      {/* Main Standings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
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

        {/* Fastest Risers Column */}
        <div className="space-y-6">
           <div className="border-2 border-ink-black rounded-3xl bg-pure-white p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-ink-black/15">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-container" />
                  <h3 className="font-headline-sm text-xl uppercase tracking-tight text-ink-black m-0">
                    Fastest Risers
                  </h3>
                </div>
                <span className="rounded-full bg-ink-black text-pure-white px-2.5 py-0.5 font-label-sm text-[9px] uppercase tracking-wider">
                  24h Velocity
                </span>
              </div>

              <div className="space-y-2.5">
                 {leaderboard.filter(m => (m.totalDailyIncrease || 0) > 10).slice(0, 5).map((m) => (
                    <div key={m.memberId} className="flex items-center justify-between p-3 bg-surface rounded-2xl border border-ink-black">
                       <div className="flex items-center gap-3 min-w-0">
                          <div className="font-headline-sm text-sm text-primary-container tabular-nums shrink-0">
                            +{m.totalDailyIncrease}
                          </div>
                          <div className="min-w-0 truncate">
                             <Link to={`/individual/${m.memberId}`} className="font-title-md text-xs uppercase font-bold text-ink-black hover:text-primary-container truncate block">
                               {m.memberName}
                             </Link>
                             <div className="font-label-sm text-[9px] text-secondary uppercase truncate">
                               {m.teamId} • {m.deptId}
                             </div>
                          </div>
                       </div>
                       <div className="w-6 h-6 rounded-full bg-primary-fixed border border-ink-black flex items-center justify-center shrink-0">
                         <span className="text-[10px] font-bold text-ink-black">↑</span>
                       </div>
                    </div>
                 ))}
                 {leaderboard.filter(m => (m.totalDailyIncrease || 0) > 10).length === 0 && (
                    <div className="text-center py-8 text-secondary font-label-sm text-xs uppercase tracking-wider">
                      Awaiting daily delta sync...
                    </div>
                 )}
              </div>
           </div>
        </div>
      </div>

      {leaderboard.length === 0 && (
        <div className="border-2 border-dashed border-ink-black rounded-3xl p-12 text-center bg-pure-white">
          <div className="w-16 h-16 bg-surface-container rounded-full border border-ink-black flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-8 w-8 text-secondary" />
          </div>
          <h3 className="font-headline-sm text-2xl uppercase tracking-tight text-ink-black mb-2">
            No records for this scope
          </h3>
          <p className="font-body-md text-secondary max-w-sm mx-auto mb-6 text-sm">
            No student performance records matched the selected filters.
          </p>
          <button 
            onClick={() => {
              setViewLevel('global');
              setSelectedDept('');
              setSelectedSection('');
              setSelectedTeam('');
            }}
            className="rounded-full bg-ink-black text-pure-white px-6 py-2 font-label-lg text-xs uppercase tracking-wider border border-ink-black hover:bg-primary-container transition-none"
          >
            Reset to Global View
          </button>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
