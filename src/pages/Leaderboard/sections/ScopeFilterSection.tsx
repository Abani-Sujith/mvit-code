import React from 'react';
import { Crown } from 'lucide-react';
import HierarchySelector from '../../../components/Navigation/HierarchySelector';
import { ScopeFilterSectionProps } from '../types';

const ScopeFilterSection: React.FC<ScopeFilterSectionProps> = ({ hierarchy, filters }) => (
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
                onClick={() => filters.setViewLevel(level)}
                className={`px-4 py-1.5 rounded-full font-label-sm text-xs uppercase tracking-wider border border-ink-black transition-none ${
                  filters.viewLevel === level
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
              checked={filters.showOnlyLeaders}
              onChange={(e) => filters.setShowOnlyLeaders(e.target.checked)}
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
          selectedDept={filters.selectedDept}
          selectedSection={filters.selectedSection}
          selectedTeam={filters.selectedTeam}
          onDepartmentChange={(deptId) => { filters.setSelectedDept(deptId); filters.setSelectedSection(''); filters.setSelectedTeam(''); filters.setViewLevel('department'); }}
          onSectionChange={(sectionId) => { filters.setSelectedSection(sectionId); filters.setSelectedTeam(''); filters.setViewLevel('section'); }}
          onTeamChange={(teamId) => { filters.setSelectedTeam(teamId); filters.setViewLevel('team'); }}
        />
      </div>
    </div>
  </div>
);

export default ScopeFilterSection;
