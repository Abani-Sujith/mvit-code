import React from 'react';
import { FormChangeHandler, OnboardingFormData } from '../types';

interface TeamConfigurationSectionProps {
  formData: OnboardingFormData;
  handleChange: FormChangeHandler;
}

const TeamConfigurationSection: React.FC<TeamConfigurationSectionProps> = ({ formData, handleChange }) => (
  <>
    <h2 className="text-2xl font-bold text-textMain mb-2">Team Configuration</h2>
    <p className="text-textMuted mb-8">Are you joining a coding squad? Fill this out.</p>

    <div className="space-y-6 max-w-lg">
      <div>
        <label className="block text-sm font-medium text-textMuted mb-1">Team Name (Optional)</label>
        <input type="text" name="team_name" value={formData.team_name} onChange={handleChange} className="w-full bg-background border border-border text-textMain rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Leave blank if unassigned" />
      </div>

      {formData.team_name && (
        <div>
          <label className="block text-sm font-medium text-textMuted mb-2">Your Role</label>
          <div className="flex gap-4">
            <label className={`flex-1 flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer transition-colors ${formData.team_role === 'leader' ? 'bg-blue-600/10 border-blue-500 text-blue-600 dark:text-blue-400' : 'bg-background border-border text-textMuted hover:border-gray-400 dark:hover:border-white/30'}`}>
              <input type="radio" name="team_role" value="leader" checked={formData.team_role === 'leader'} onChange={handleChange} className="sr-only" />
              <span className="font-medium">Team Leader</span>
            </label>
            <label className={`flex-1 flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer transition-colors ${formData.team_role === 'member' ? 'bg-blue-600/10 border-blue-500 text-blue-600 dark:text-blue-400' : 'bg-background border-border text-textMuted hover:border-gray-400 dark:hover:border-white/30'}`}>
              <input type="radio" name="team_role" value="member" checked={formData.team_role === 'member'} onChange={handleChange} className="sr-only" />
              <span className="font-medium">Team Member</span>
            </label>
          </div>
        </div>
      )}
    </div>
  </>
);

export default TeamConfigurationSection;
