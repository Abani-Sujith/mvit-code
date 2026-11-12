import React from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessSection: React.FC = () => (
  <>
    <div className="w-20 h-20 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
      <CheckCircle className="w-10 h-10" />
    </div>
    <h2 className="text-3xl font-bold text-textMain mb-4">Application Secured!</h2>
    <p className="text-textMuted max-w-md mx-auto mb-8">
      Your data has been securely saved to the pending queue. The AI tracking agent will process it during the next batch sync.
    </p>
    <button onClick={() => window.location.href = '/'} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20">
      Return to Dashboard
    </button>
  </>
);

export default SuccessSection;
