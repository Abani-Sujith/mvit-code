import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DailyTotal } from '../types';
import { getLatestByMember } from '../utils/dataProcessing';
import { User, Eye, ChevronDown, ChevronUp, Search, Crown, Activity } from 'lucide-react';

interface MemberTableProps {
  data: DailyTotal[];
}

const MemberTable: React.FC<MemberTableProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'performance' | 'name'>('performance');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 15;

  const latestData = getLatestByMember(data || []);

  const filteredMembers = (latestData || [])
    .filter(m => {
      if (!m) return false;
      return (m.memberName || '').toLowerCase().includes(searchTerm.toLowerCase()) || (m.teamId || '').toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (!a || !b) return 0;
      return sortBy === 'name' ? (a.memberName || '').localeCompare(b.memberName || '') : (b.totalSolved || 0) - (a.totalSolved || 0);
    });

  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
  const currentMembers = filteredMembers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const toggleExpand = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const getLevel = (score: number) => {
    if (score >= 500) return 'Advanced';
    if (score >= 200) return 'Intermediate';
    if (score >= 50) return 'Beginner';
    return 'Novice';
  };

  return (
    <div className="bg-pure-white overflow-hidden select-none">
      {/* Table Controls Bar */}
      <div className="p-4 sm:p-5 border-b border-ink-black flex flex-col md:flex-row justify-between items-center gap-4 bg-pure-white">
        <div className="flex items-center gap-2">
           <Activity className="w-5 h-5 text-primary-container" />
           <h2 className="font-headline-sm text-xl uppercase tracking-tight text-ink-black m-0">Student Coding Matrix</h2>
           <span className="rounded-full bg-ink-black text-pure-white px-3 py-0.5 font-label-sm text-[10px] uppercase tracking-wider border border-ink-black">
             {filteredMembers.length} records
           </span>
        </div>
        
        <div className="flex w-full md:w-auto items-center gap-2 sm:gap-3 flex-wrap">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-secondary" />
            <input 
              type="text" 
              placeholder="Search student or team..." 
              value={searchTerm} 
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} 
              className="pl-8 w-full pr-4 py-1.5 rounded-full border border-ink-black font-body-md text-xs bg-pure-white text-ink-black placeholder:text-secondary focus:outline-none focus:border-primary-container" 
            />
          </div>
          <div className="relative">
            <select 
              value={sortBy} 
              onChange={(e) => { setSortBy(e.target.value as 'name' | 'performance'); setCurrentPage(1); }} 
              className="appearance-none rounded-full border border-ink-black px-4 py-1.5 bg-pure-white text-ink-black font-label-sm text-xs uppercase tracking-wider pr-8 cursor-pointer focus:outline-none"
            >
              <option value="performance">By Performance</option>
              <option value="name">By Name</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-black pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-ink-black bg-surface-tint font-label-sm text-xs uppercase tracking-wider text-ink-black">
                <th className="py-3.5 px-6 font-bold">Rank & Student</th>
                <th className="py-3.5 px-6 font-bold">Squad / Dept</th>
                <th className="py-3.5 px-4 font-bold text-center">Platforms (LC / SR / CC / HR)</th>
                <th className="py-3.5 px-6 font-bold text-right">Total Solved</th>
                <th className="py-3.5 px-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-black/15 font-body-md text-sm text-ink-black">
              {currentMembers.map((member, index) => {
                const rank = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                const isExpanded = expandedRow === member.memberId;
                const level = getLevel(member.totalSolved);
                
                return (
                  <React.Fragment key={member.memberId}>
                    <tr className="hover:bg-surface-tint transition-none">
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <span className="font-headline-sm text-base text-primary-container shrink-0 w-8">
                            #{rank < 10 ? `0${rank}` : rank}
                          </span>
                          <div className="w-8 h-8 rounded-full bg-surface border border-ink-black flex items-center justify-center shrink-0">
                             {member.isTeamLead ? <Crown className="w-4 h-4 text-ink-black" /> : <User className="w-4 h-4 text-ink-black" />}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                               <Link to={`/individual/${member.memberId}`} className="font-title-md font-bold text-sm text-ink-black uppercase truncate hover:text-primary transition-none">
                                  {member.memberName}
                                </Link>
                               <span className="rounded-full bg-pure-white border border-ink-black px-2 py-0.2 font-label-sm text-[10px] uppercase font-bold text-ink-black">
                                 {level}
                               </span>
                            </div>
                            <div className="font-label-sm text-[11px] text-secondary uppercase tracking-wider mt-0.5">
                              ID: {member.memberId || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-6">
                        <div className="font-label-lg text-xs uppercase font-bold text-ink-black truncate">{member.teamId || "No Team"}</div>
                        <div className="font-label-sm text-[11px] text-secondary uppercase mt-0.5">{member.sectionId} • {member.deptId}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex justify-center gap-1.5 font-mono text-xs">
                          {[
                            { label: 'LC', val: member.leetcodeTotal },
                            { label: 'SR', val: member.skillrackTotal },
                            { label: 'CC', val: member.codechefTotal },
                            { label: 'HR', val: member.hackerrankTotal },
                          ].map(p => (
                            <div key={p.label} className="bg-surface border border-ink-black rounded-lg px-2 py-1 min-w-[42px] text-center">
                               <div className="font-bold text-ink-black tabular-nums">{p.val || 0}</div>
                               <div className="font-label-sm text-[9px] uppercase tracking-tighter text-secondary">{p.label}</div>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <span className="font-headline-sm text-xl font-bold text-ink-black tabular-nums">
                          {member.totalSolved}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                           <Link 
                             to={`/individual/${member.memberId}`} 
                             className="p-1.5 text-ink-black hover:bg-surface border border-transparent hover:border-ink-black rounded-full transition-none" 
                             title="View Profile"
                           >
                              <Eye className="w-4 h-4" />
                           </Link>
                           <button 
                             onClick={() => toggleExpand(member.memberId)} 
                             className="p-1.5 text-ink-black bg-pure-white border border-ink-black rounded-full hover:bg-surface transition-none"
                           >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                           </button>
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td colSpan={5} className="p-0 border-b border-ink-black bg-surface">
                           <div className="p-6">
                              <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                                  <div className="flex-1">
                                     <h4 className="font-label-lg text-xs font-bold uppercase tracking-wider text-ink-black mb-3">Daily Telemetry Insights</h4>
                                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        <div className="bg-pure-white border border-ink-black p-3.5 rounded-2xl">
                                           <div className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mb-1">Today's Increase</div>
                                           <div className="font-headline-sm text-xl font-bold text-primary-container tabular-nums">
                                              {member.totalDailyIncrease > 0 ? `+${member.totalDailyIncrease}` : member.totalDailyIncrease}
                                           </div>
                                        </div>
                                        <div className="bg-pure-white border border-ink-black p-3.5 rounded-2xl col-span-1 sm:col-span-2">
                                           <div className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mb-1">Team Leadership</div>
                                           <div className="font-body-md text-xs font-bold text-ink-black mt-1">
                                              {member.isTeamLead ? 'Certified Organizational Team Lead' : `Lead: ${member.assignedTeamLead || 'Unassigned'}`}
                                           </div>
                                        </div>
                                     </div>
                                  </div>
                                  <Link 
                                    to={`/individual/${member.memberId}`} 
                                    className="rounded-full bg-ink-black text-pure-white px-5 py-2 font-label-lg text-xs uppercase tracking-wider border border-ink-black hover:bg-primary-container transition-none inline-flex items-center gap-1.5"
                                  >
                                     <span>Full Diagnostics</span>
                                     <Eye className="w-3.5 h-3.5" />
                                  </Link>
                              </div>
                           </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden divide-y divide-ink-black/15">
          {currentMembers.map((member, index) => {
            const rank = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
            const isExpanded = expandedRow === member.memberId;
            const level = getLevel(member.totalSolved);
            
            return (
              <div key={member.memberId} className="p-4 hover:bg-surface-tint transition-none">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-headline-sm text-sm text-primary-container">#{rank}</span>
                    <div>
                      <Link to={`/individual/${member.memberId}`} className="font-title-md text-sm uppercase font-bold text-ink-black block leading-none">{member.memberName}</Link>
                      <span className="font-label-sm text-[10px] text-secondary uppercase">{member.teamId || "No Team"}</span>
                    </div>
                  </div>
                  <button onClick={() => toggleExpand(member.memberId)} className="p-1.5 text-ink-black bg-pure-white border border-ink-black rounded-full">
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="rounded-full bg-surface border border-ink-black px-2 py-0.5 font-label-sm text-[9px] uppercase font-bold text-ink-black">{level}</span>
                  <span className="font-headline-sm text-lg font-bold text-ink-black tabular-nums">{member.totalSolved} solved</span>
                </div>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-ink-black/15">
                    <div className="grid grid-cols-4 gap-1.5 mb-3">
                      {[
                        { label: 'LC', val: member.leetcodeTotal },
                        { label: 'SR', val: member.skillrackTotal },
                        { label: 'CC', val: member.codechefTotal },
                        { label: 'HR', val: member.hackerrankTotal },
                      ].map(p => (
                        <div key={p.label} className="bg-surface border border-ink-black rounded-xl p-2 text-center">
                           <div className="font-bold text-ink-black text-xs tabular-nums">{p.val || 0}</div>
                           <div className="font-label-sm text-[8px] uppercase text-secondary">{p.label}</div>
                        </div>
                      ))}
                    </div>
                    <Link to={`/individual/${member.memberId}`} className="w-full flex items-center justify-center gap-1.5 rounded-full bg-ink-black text-pure-white py-2 font-label-lg text-xs uppercase tracking-wider border border-ink-black">
                      <Eye className="w-3.5 h-3.5" /> View Individual Profile
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {currentMembers.length === 0 && (
          <div className="p-16 text-center text-secondary">
             <Search className="w-10 h-10 mx-auto mb-3 opacity-30 text-ink-black" />
             <p className="font-label-lg uppercase tracking-wider text-xs">No records found matching query</p>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-ink-black bg-pure-white flex items-center justify-between flex-wrap gap-2 font-label-sm text-xs uppercase">
           <div className="text-secondary">
             Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredMembers.length)} of {filteredMembers.length}
           </div>
           <div className="flex items-center gap-2">
              <button 
                 disabled={currentPage === 1} 
                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                 className="rounded-full border border-ink-black px-4 py-1.5 bg-pure-white text-ink-black hover:bg-surface disabled:opacity-40 transition-none"
              >
                Prev
              </button>
              <span className="font-bold text-ink-black px-2">
                Page {currentPage} / {totalPages}
              </span>
              <button 
                 disabled={currentPage === totalPages} 
                 onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                 className="rounded-full border border-ink-black px-4 py-1.5 bg-ink-black text-pure-white hover:bg-primary-container disabled:opacity-40 transition-none"
              >
                Next
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default MemberTable;
