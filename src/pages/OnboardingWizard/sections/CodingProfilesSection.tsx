import React from 'react';
import { AlertCircle } from 'lucide-react';
import { FormChangeHandler, OnboardingFormData } from '../types';

interface CodingProfilesSectionProps {
  formData: OnboardingFormData;
  handleChange: FormChangeHandler;
}

const CodingProfilesSection: React.FC<CodingProfilesSectionProps> = ({ formData, handleChange }) => (
  <>
    <h2 className="text-2xl font-bold text-textMain mb-2">Coding Profiles</h2>
    <p className="text-textMuted mb-8">Connect your platforms. The AI agent will parse your stats nightly.</p>

    <div className="space-y-4">
      <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-red-800 dark:text-red-200">LeetCode Username (Mandatory)</h4>
          <p className="text-xs text-red-700 dark:text-red-300/70 mt-1">Provide just the username, not the full URL. If this is incorrect, your ELO rank will not calculate.</p>
          <input type="text" name="leetcode_username" required value={formData.leetcode_username} onChange={handleChange} className="w-full mt-3 bg-background border border-red-500/50 text-textMain rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none" placeholder="e.g. agilesh_s" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <label className="block text-sm font-medium text-textMuted mb-1">GitHub Username</label>
          <input type="text" name="github_username" value={formData.github_username} onChange={handleChange} className="w-full bg-background border border-border text-textMain rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-textMuted mb-1">CodeChef Username</label>
          <input type="text" name="codechef_username" value={formData.codechef_username} onChange={handleChange} className="w-full bg-background border border-border text-textMain rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-textMuted mb-1">HackerRank Username</label>
          <input type="text" name="hackerrank_username" value={formData.hackerrank_username} onChange={handleChange} className="w-full bg-background border border-border text-textMain rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-textMuted mb-1">SkillRack Username</label>
          <input type="text" name="skillrack_username" value={formData.skillrack_username} onChange={handleChange} className="w-full bg-background border border-border text-textMain rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
      </div>
    </div>
  </>
);

export default CodingProfilesSection;
