import React from 'react';
import { Variants } from 'framer-motion';

export interface OnboardingFormData {
  full_name: string;
  roll_number: string;
  student_email_address: string;
  batch: string;
  department: string;
  section: string;
  mobile_number: string;
  team_name: string;
  team_role: string;
  leetcode_username: string;
  github_username: string;
  codechef_username: string;
  codeforces_username: string;
  hackerrank_username: string;
  skillrack_username: string;
}

export type FormChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
export type OnboardingSlideVariants = Variants;
