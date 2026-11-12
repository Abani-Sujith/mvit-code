import React, { useEffect, useState } from 'react';
import { useToast } from '../../components/ui/Toaster';
import { useTheme } from '../../contexts/ThemeContext';

export const SETTINGS_KEY = 'coding-tracker-settings';

export interface AppSettings {
  notifications: {
    dailyUpdates: boolean;
    weeklyReports: boolean;
    achievementAlerts: boolean;
    systemNotifications: boolean;
  };
  refreshInterval: string;
}

export const DEFAULT_SETTINGS: AppSettings = {
  notifications: {
    dailyUpdates: true,
    weeklyReports: true,
    achievementAlerts: false,
    systemNotifications: true
  },
  refreshInterval: '30'
};

function loadSettings(): AppSettings {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch { /* fallback */ }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: Partial<AppSettings>) {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    const existing = stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...existing, ...settings }));
  } catch {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...DEFAULT_SETTINGS, ...settings }));
  }
}

export function useSettings() {
  const { addToast } = useToast();
  const { theme: appTheme, setTheme: setAppTheme } = useTheme();
  const [settings, setSettings] = useState<AppSettings>(loadSettings);
  const [hasChanges, setHasChanges] = useState(false);

  // Track changes
  useEffect(() => {
    const saved = loadSettings();
    const changed = JSON.stringify(saved) !== JSON.stringify(settings);
    setHasChanges(changed);
  }, [settings]);

  const handleNotificationChange = (key: keyof AppSettings['notifications']) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: !prev.notifications[key] }
    }));
  };

  const handleRefreshIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings(prev => ({ ...prev, refreshInterval: e.target.value }));
  };

  // ── Save All Settings ──
  const handleSaveSettings = () => {
    saveSettings(settings);
    setHasChanges(false);
    addToast({ type: 'success', title: 'Settings Saved', message: 'All your preferences have been saved successfully.' });
  };

  // ── Reset to Defaults ──
  const handleResetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    saveSettings(DEFAULT_SETTINGS);
    setHasChanges(false);
    addToast({ type: 'info', title: 'Settings Reset', message: 'All preferences have been reset to their default values.' });
  };

  return {
    settings,
    setSettings,
    appTheme,
    setAppTheme,
    hasChanges,
    handleNotificationChange,
    handleRefreshIntervalChange,
    handleSaveSettings,
    handleResetDefaults,
  };
}
