import React, { useEffect, useState } from 'react';
import { useData } from '../contexts/DataContext';
import { createDepartmentComparison } from '../utils/dataProcessing';

import LoadingSpinner from '../components/ui/LoadingSpinner';
import StatCard from '../components/ui/StatCard';
import AttentionPanel from '../components/AttentionPanel';
import DepartmentTable from '../components/DepartmentTable';
import DepartmentDrawer from '../components/DepartmentDrawer';
import DepartmentCard from '../components/DepartmentCard';

import { Building2, Users, Trophy, RefreshCcw, Search, LayoutGrid } from 'lucide-react';

const AllDepartments: React.FC = () => {
  const { data, loading: globalLoading, refreshData } = useData();
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Drawer State mapped to clicked Department from either the Table or Intelligence Grid
  const [selectedDepartment, setSelectedDepartment] = useState<any | null>(null);

  useEffect(() => {
    if (globalLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [globalLoading]);

  const handleSync = async () => {
    setSyncing(true);
    await refreshData();
    setSyncing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="flex flex-col items-center">
            <LoadingSpinner size="lg" />
            <span className="mt-4 text-textMuted font-bold uppercase tracking-widest text-xs">Aggregating Organizational Telemetrics...</span>
        </div>
      </div>
    );
  }

  // Engine Level 1: Backend Parsing (Extract macro-level Departments)
  const fullComparison = createDepartmentComparison(data);
  
  // Engine Level 2: Frontend Data Filtration (Search limits)
  const filteredDepartments = fullComparison.filter(dept => {
      if (!searchQuery) return true;
      const lowerQ = searchQuery.toLowerCase();
      // Search maps deeply tracking nested teams as well, allowing global search from Macro level
      const matchesNestedTeam = dept.nestedTeams?.some((t: any) => t.teamName.toLowerCase().includes(lowerQ));
      return (
         dept.deptName.toLowerCase().includes(lowerQ) || matchesNestedTeam
      );
  });

  // Engine Level 3: Realtime Executive Metrics Calculation (GLOBAL ORG)
  const totalDepartments = filteredDepartments.length;
  const totalTeamsGlobally = filteredDepartments.reduce((acc, d) => acc + d.totalTeams, 0);
  const activeMembersAggregated = filteredDepartments.reduce((acc, d) => acc + d.totalMembers, 0);
  
  // Best department based on avg performance calculation strictly
  const topDepartmentString = [...filteredDepartments].sort((a,b) => b.avgPerMember - a.avgPerMember)[0]?.deptName || 'Loading Pipeline';

  return (
    <div className="w-full space-y-6 sm:space-y-8 select-none">
      {/* Neo-brutalist Header Banner */}
      <div className="border-2 border-ink-black rounded-3xl bg-pure-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-ink-black text-pure-white px-3.5 py-1 rounded-full border border-ink-black font-label-sm text-[11px] tracking-wider uppercase mb-3">
            <Building2 className="w-3.5 h-3.5 text-primary-fixed" />
            <span>Campus Intelligence Matrix</span>
          </div>
          <h1 className="font-headline-md text-3xl sm:text-5xl uppercase tracking-tight text-ink-black m-0 leading-tight">
            Department Performance
          </h1>
          <p className="font-body-md text-on-surface-variant text-sm sm:text-base mt-2 max-w-xl">
            Real-time organizational performance metrics, placement eligibility tracking, and department-wise growth analytics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
            <input 
              type="text" 
              placeholder="Search departments..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full border border-ink-black bg-surface font-body-md text-xs text-ink-black placeholder:text-secondary focus:outline-none focus:border-primary-container" 
            />
          </div>
          
          <button 
            onClick={handleSync}
            disabled={syncing}
            className="rounded-full bg-ink-black text-pure-white px-5 py-2 font-label-lg text-xs uppercase tracking-wider border border-ink-black hover:bg-primary-container transition-none disabled:opacity-40 flex items-center gap-2"
          >
            <RefreshCcw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Syncing...' : 'Sync Data'}</span>
          </button>
        </div>
      </div>

      {/* EXECUTIVE OVERVIEW ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Training Departments" 
            value={totalDepartments} 
            icon={Building2} 
        />
        <StatCard 
            title="Total Student Squads" 
            value={totalTeamsGlobally} 
            icon={LayoutGrid} 
        />
        <StatCard 
            title="Placement Ready" 
            value={activeMembersAggregated} 
            icon={Users} 
        />
        <StatCard 
            title="Top Department" 
            value={topDepartmentString} 
            icon={Trophy} 
        />
      </div>

      {/* DEPARTMENT INTELLIGENCE GRID */}
      <div className="space-y-10">
        {['Elite', 'Good', 'Risk'].map(status => {
          const depts = filteredDepartments.filter(d => d.status === status);
          if (depts.length === 0) return null;

          const sectionTitle = status === 'Elite' ? 'Elite Readiness' : status === 'Good' ? 'Growth Track' : 'Attention Required';

          return (
            <div key={status} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-ink-black/20">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${status === 'Elite' ? 'bg-primary-container' : status === 'Good' ? 'bg-ink-black' : 'bg-error'}`}></span>
                  <h2 className="font-headline-sm text-xl uppercase tracking-tight text-ink-black m-0">
                    {sectionTitle}
                  </h2>
                </div>
                <span className="rounded-full bg-pure-white text-ink-black border border-ink-black px-3 py-0.5 font-label-sm text-[10px] uppercase tracking-wider">
                  {depts.length} {depts.length === 1 ? 'Department' : 'Departments'}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {depts.map(dept => (
                  <DepartmentCard key={dept.deptId} department={dept} onClick={() => setSelectedDepartment(dept)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ATTENTION ZONE */}
      <AttentionPanel departments={filteredDepartments} />

      {/* SMART DEPARTMENT TABLE */}
      <div className="border-2 border-ink-black rounded-3xl bg-pure-white p-6 hidden md:block">
         <div className="flex justify-between items-center mb-4 pb-3 border-b border-ink-black/15">
            <h2 className="font-headline-sm text-xl uppercase tracking-tight text-ink-black m-0 flex items-center gap-2">
                <span>Organizational Matrix</span>
                <span className="rounded-full bg-ink-black text-pure-white px-2.5 py-0.5 font-label-sm text-[10px] uppercase">{totalDepartments} Nodes</span>
            </h2>
         </div>
         <DepartmentTable data={filteredDepartments} onRowClick={(dept) => setSelectedDepartment(dept)} />
      </div>

      {/* DEEP DIVE MODAL/DRAWER */}
      <DepartmentDrawer isOpen={!!selectedDepartment} onClose={() => setSelectedDepartment(null)} department={selectedDepartment} />
    </div>
  );
};

export default AllDepartments;
