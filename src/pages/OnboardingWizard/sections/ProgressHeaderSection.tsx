import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ProgressHeaderSectionProps {
  step: number;
}

const ProgressHeaderSection: React.FC<ProgressHeaderSectionProps> = ({ step }) => (
  <div className="mb-12">
    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 text-center mb-6">
      MVIT Coding Team Portal
    </h1>
    {step < 4 && (
      <div className="flex items-center justify-center space-x-4">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg transition-all ${
              step >= num ? 'bg-blue-600 text-white shadow-blue-500/30' : 'bg-surface border border-border text-textMuted'
            }`}>
              {step > num ? <CheckCircle className="w-6 h-6" /> : num}
            </div>
            {num < 3 && (
              <div className={`w-16 h-1 rounded-full mx-2 ${step > num ? 'bg-blue-600' : 'bg-border'}`} />
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default ProgressHeaderSection;
