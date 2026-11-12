import React, { useState } from 'react';
import { useToast } from '../../components/ui/Toaster';
import { OnboardingFormData } from './types';

const GOOGLE_SHEETS_API_URL = import.meta.env.VITE_GOOGLE_SHEETS_API_URL || '';

export const useOnboardingWizard = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { addToast } = useToast();

  const [formData, setFormData] = useState<OnboardingFormData>({
    full_name: '',
    roll_number: '',
    student_email_address: '',
    batch: '',
    department: '',
    section: '',
    mobile_number: '',
    team_name: '',
    team_role: 'member',
    leetcode_username: '',
    github_username: '',
    codechef_username: '',
    codeforces_username: '',
    hackerrank_username: '',
    skillrack_username: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchExistingData = async () => {
    if (!formData.roll_number || !formData.student_email_address) {
      addToast({ title: 'Please enter both Roll Number and Email to fetch your application.', type: 'error' });
      return;
    }

    setIsFetching(true);
    try {
      const response = await fetch(`${GOOGLE_SHEETS_API_URL}?roll_no=${formData.roll_number}&email=${formData.student_email_address}`);
      const result = await response.json();

      if (result.success && result.data) {
        setFormData(result.data);
        setIsEditMode(true);
        addToast({ title: 'Application loaded successfully! You can now edit your details.', type: 'success' });
      } else {
        addToast({ title: result.error || 'No existing application found with these credentials.', type: 'error' });
      }
    } catch (error) {
      console.error(error);
      addToast({ title: 'Failed to connect to the server.', type: 'error' });
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!GOOGLE_SHEETS_API_URL) {
      addToast({ title: 'System Error: Google Sheets API URL is not configured.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(GOOGLE_SHEETS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();

      if (result.success) {
        addToast({ title: 'Welcome to MVIT Coding Team! Your application is in review.', type: 'success' });
        setStep(4); // Success screen
      } else {
        addToast({ title: result.error || 'Failed to submit application.', type: 'error' });
      }
    } catch (error) {
      console.error(error);
      addToast({ title: 'Network error while submitting. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
  };

  return {
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
  };
};
