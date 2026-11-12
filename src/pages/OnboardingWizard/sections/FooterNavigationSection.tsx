import React from 'react';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';

interface FooterNavigationSectionProps {
  step: number;
  isSubmitting: boolean;
  isEditMode: boolean;
  prevStep: () => void;
  nextStep: () => void;
  handleSubmit: (e: React.FormEvent) => void | Promise<void>;
}

const FooterNavigationSection: React.FC<FooterNavigationSectionProps> = ({
  step,
  isSubmitting,
  isEditMode,
  prevStep,
  nextStep,
  handleSubmit,
}) => (
  <>
    {/* Footer Navigation */}
    {step < 4 && (
      <div className="bg-subtle border-t border-border p-6 flex justify-between relative z-10">
        <button
          type="button"
          onClick={prevStep}
          disabled={step === 1}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${step === 1 ? 'opacity-0 cursor-default' : 'text-textMuted hover:text-textMain hover:bg-black/5 dark:hover:bg-white/5'}`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>

        {step < 3 ? (
          <button
            type="button"
            onClick={nextStep}
            className="flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
          >
            Next Step <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center px-8 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-indigo-500/30 disabled:opacity-50"
          >
            {isSubmitting ? 'Securing...' : (isEditMode ? 'Update Application' : 'Submit Application')}
            {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
          </button>
        )}
      </div>
    )}
  </>
);

export default FooterNavigationSection;
