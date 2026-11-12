import { AnimatePresence, motion } from 'framer-motion';
import FooterNavigationSection from './sections/FooterNavigationSection';
import ProgressHeaderSection from './sections/ProgressHeaderSection';
import PersonalInformationSection from './sections/PersonalInformationSection';
import TeamConfigurationSection from './sections/TeamConfigurationSection';
import CodingProfilesSection from './sections/CodingProfilesSection';
import SuccessSection from './sections/SuccessSection';
import { useOnboardingWizard } from './useOnboardingWizard';

export default function OnboardingWizard() {
  const {
    step,
    isSubmitting,
    isFetching,
    isEditMode,
    formData,
    handleChange,
    fetchExistingData,
    handleSubmit,
    nextStep,
    prevStep,
    slideVariants,
  } = useOnboardingWizard();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Progress Header */}
      <ProgressHeaderSection step={step} />

      {/* Main Form Area */}
      <div className="bg-surface rounded-2xl shadow-xl border border-border overflow-hidden backdrop-blur-sm relative min-h-[400px]">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-50"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full filter blur-[100px] opacity-10"></div>

        <div className="p-8 relative z-10">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="hidden" animate="visible" exit="exit">
                <PersonalInformationSection
                  formData={formData}
                  handleChange={handleChange}
                  fetchExistingData={fetchExistingData}
                  isFetching={isFetching}
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit">
                <TeamConfigurationSection formData={formData} handleChange={handleChange} />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={slideVariants} initial="hidden" animate="visible" exit="exit">
                <CodingProfilesSection formData={formData} handleChange={handleChange} />
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="text-center py-12">
                <SuccessSection />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <FooterNavigationSection
          step={step}
          isSubmitting={isSubmitting}
          isEditMode={isEditMode}
          prevStep={prevStep}
          nextStep={nextStep}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
