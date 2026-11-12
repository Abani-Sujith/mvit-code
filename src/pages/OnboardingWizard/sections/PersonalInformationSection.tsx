import React from 'react';
import { Search } from 'lucide-react';
import { FormChangeHandler, OnboardingFormData } from '../types';

interface PersonalInformationSectionProps {
  formData: OnboardingFormData;
  handleChange: FormChangeHandler;
  fetchExistingData: () => Promise<void>;
  isFetching: boolean;
}

const PersonalInformationSection: React.FC<PersonalInformationSectionProps> = ({
  formData,
  handleChange,
  fetchExistingData,
  isFetching,
}) => (
  <>
    <h2 className="text-2xl font-bold text-textMain mb-2">Personal Information</h2>
    <p className="text-textMuted mb-8">Let's start with your academic details.</p>

    {/* Editing fetcher */}
    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-8 flex flex-col md:flex-row items-center gap-4">
      <div className="flex-1">
        <p className="text-sm text-blue-800 dark:text-blue-200 mb-1 font-medium">Already applied? Enter Roll No & Email to edit your response.</p>
      </div>
      <button type="button" onClick={fetchExistingData} disabled={isFetching} className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors disabled:opacity-50">
        {isFetching ? 'Searching...' : <><Search className="w-4 h-4 mr-2" /> Load Application</>}
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-textMuted mb-1">Full Name *</label>
        <input type="text" name="full_name" required value={formData.full_name} onChange={handleChange} className="w-full bg-background border border-border text-textMain rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" />
      </div>
      <div>
        <label className="block text-sm font-medium text-textMuted mb-1">Roll Number *</label>
        <input type="text" name="roll_number" required value={formData.roll_number} onChange={handleChange} className="w-full bg-background border border-border text-textMain rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="23TN0027" />
      </div>
      <div>
        <label className="block text-sm font-medium text-textMuted mb-1">Student Email Address *</label>
        <input type="email" name="student_email_address" required value={formData.student_email_address} onChange={handleChange} className="w-full bg-background border border-border text-textMain rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@mvit.edu.in" />
      </div>
      <div>
        <label className="block text-sm font-medium text-textMuted mb-1">Mobile Number</label>
        <input type="text" name="mobile_number" value={formData.mobile_number} onChange={handleChange} className="w-full bg-background border border-border text-textMain rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="10-digit number" />
      </div>
      <div>
        <label className="block text-sm font-medium text-textMuted mb-1">Batch *</label>
        <input type="text" name="batch" required value={formData.batch} onChange={handleChange} className="w-full bg-background border border-border text-textMain rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="2023-2027" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-textMuted mb-1">Department *</label>
          <input type="text" name="department" required value={formData.department} onChange={handleChange} className="w-full bg-background border border-border text-textMain rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="CSE" />
        </div>
        <div>
          <label className="block text-sm font-medium text-textMuted mb-1">Section *</label>
          <input type="text" name="section" required value={formData.section} onChange={handleChange} className="w-full bg-background border border-border text-textMain rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="A" />
        </div>
      </div>
    </div>
  </>
);

export default PersonalInformationSection;
