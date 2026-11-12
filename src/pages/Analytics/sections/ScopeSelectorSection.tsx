import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import HierarchySelector from '../../../components/Navigation/HierarchySelector';
import { Hierarchy } from '../../../types';
import { AnalyticsViewLevel } from '../useAnalytics';

interface ScopeSelectorSectionProps {
  hierarchy: Hierarchy;
  selectedDept: string;
  selectedSection: string;
  selectedTeam: string;
  viewLevel: AnalyticsViewLevel;
  setSelectedDept: Dispatch<SetStateAction<string>>;
  setSelectedSection: Dispatch<SetStateAction<string>>;
  setSelectedTeam: Dispatch<SetStateAction<string>>;
  setViewLevel: Dispatch<SetStateAction<AnalyticsViewLevel>>;
}

const ScopeSelectorSection: React.FC<ScopeSelectorSectionProps> = ({
  hierarchy,
  selectedDept,
  selectedSection,
  selectedTeam,
  viewLevel,
  setSelectedDept,
  setSelectedSection,
  setSelectedTeam,
  setViewLevel,
}) => (
  <Card hover className="bg-gradient-to-br from-surface to-surface/90 border-t-accent-pink/30">
    <CardHeader className="border-b border-border/50">
      <CardTitle className="text-xl font-display flex items-center">
        <div className="p-2 rounded-lg bg-accent-pink/10 mr-3">
          <svg className="w-5 h-5 text-accent-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </div>
        Analysis Scope
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-textMuted mb-3">View Level</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border border-border/50 p-1 rounded-xl bg-surface/30">
              {(['organization', 'department', 'section', 'team'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setViewLevel(level)}
                  className={`px-3 py-2 text-sm rounded-lg transition-all capitalize font-medium ${viewLevel === level
                    ? 'bg-gradient-hero text-white shadow-lg shadow-brand-500/20'
                    : 'text-textMuted hover:text-white hover:bg-white/5'
                    }`}
                >
                  {level === 'organization' ? 'All' : level}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <HierarchySelector
            hierarchy={hierarchy}
            selectedDept={selectedDept}
            selectedSection={selectedSection}
            selectedTeam={selectedTeam}
            onDepartmentChange={(deptId) => {
              setSelectedDept(deptId);
              setSelectedSection('');
              setSelectedTeam('');
              setViewLevel('department');
            }}
            onSectionChange={(sectionId) => {
              setSelectedSection(sectionId);
              setSelectedTeam('');
              setViewLevel('section');
            }}
            onTeamChange={(teamId) => {
              setSelectedTeam(teamId);
              setViewLevel('team');
            }}
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ScopeSelectorSection;
