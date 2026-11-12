import React from 'react';
import { Crown, Filter, Search } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Hierarchy } from '../../../types';
import { TeamsFilters } from '../types';

interface FiltersSectionProps {
  hierarchy: Hierarchy;
  filters: TeamsFilters;
}

const FiltersSection: React.FC<FiltersSectionProps> = ({ hierarchy, filters }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center"><Search className="mr-2 h-5 w-5" />Search & Filters</CardTitle>
    </CardHeader>
    <CardContent className="p-4 md:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="group">
          <label className="block text-xs font-semibold uppercase tracking-wider text-textMuted mb-2 flex items-center transition-colors group-focus-within:text-brand-400">Search Teams</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-textMuted" />
            <input type="text" placeholder="Search by team, department, leader..." value={filters.searchTerm} onChange={(e) => filters.setSearchTerm(e.target.value)} className="pl-10 w-full px-3 py-2 bg-white/5 border border-border rounded-lg focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/30 text-ink-black placeholder-textMuted transition-all font-medium" />
          </div>
        </div>
        <div className="group">
          <label className="block text-xs font-semibold uppercase tracking-wider text-textMuted mb-2 flex items-center transition-colors group-focus-within:text-brand-400"><Filter className="h-3.5 w-3.5 mr-2" />Department</label>
          <select value={filters.selectedDept} onChange={(e) => { filters.setSelectedDept(e.target.value); filters.setSelectedSection(''); }} className="w-full px-3 py-2 bg-white/5 border border-border rounded-lg focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/30 text-ink-black transition-all cursor-pointer">
            <option value="" className="bg-surface text-ink-black">All Departments</option>
            {Object.entries(hierarchy).map(([deptId, dept]) => (<option key={deptId} value={deptId} className="bg-surface text-ink-black">{dept.name}</option>))}
          </select>
        </div>
        <div className="group">
          <label className="block text-xs font-semibold uppercase tracking-wider text-textMuted mb-2 flex items-center transition-colors group-focus-within:text-brand-400"><Filter className="h-3.5 w-3.5 mr-2" />Section</label>
          <select value={filters.selectedSection} onChange={(e) => filters.setSelectedSection(e.target.value)} className="w-full px-3 py-2 bg-white/5 border border-border rounded-lg focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/30 text-ink-black transition-all cursor-pointer" disabled={!filters.selectedDept}>
            <option value="" className="bg-surface text-ink-black">All Sections</option>
            {filters.selectedDept && Object.entries(hierarchy[filters.selectedDept]?.sections || {}).map(([sectionId, section]) => (<option key={sectionId} value={sectionId} className="bg-surface text-ink-black">{section.name}</option>))}
          </select>
        </div>
        <div className="group">
          <label className="block text-xs font-semibold uppercase tracking-wider text-textMuted mb-2 flex items-center transition-colors group-focus-within:text-brand-400"><Crown className="h-3.5 w-3.5 mr-2" />Filter</label>
          <label className="flex items-center mt-2 cursor-pointer group-hover:text-brand-400 transition-colors">
            <input type="checkbox" checked={filters.showOnlyLeaderTeams} onChange={(e) => filters.setShowOnlyLeaderTeams(e.target.checked)} className="mr-2 rounded border-border bg-white/5 text-brand-500 focus:ring-brand-500/50" />
            <span className="text-sm font-medium text-textMuted group-hover:text-ink-black transition-colors">Teams with Leaders only</span>
          </label>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default FiltersSection;
