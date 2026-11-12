import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronRight, Database, Palette, Download, Upload, RefreshCw, Settings as SettingsIcon, Save, RotateCcw, FileJson, CheckCircle2, Trash2 } from 'lucide-react';
import { useToast } from '../components/ui/Toaster';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../utils/cn';

const SETTINGS_KEY = 'coding-tracker-settings';

interface AppSettings {
  notifications: {
    dailyUpdates: boolean;
    weeklyReports: boolean;
    achievementAlerts: boolean;
    systemNotifications: boolean;
  };
  refreshInterval: string;
}

const DEFAULT_SETTINGS: AppSettings = {
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

function saveSettings(settings: Partial<AppSettings>) {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    const existing = stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...existing, ...settings }));
  } catch {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...DEFAULT_SETTINGS, ...settings }));
  }
}

const Settings: React.FC = () => {
  const { addToast } = useToast();
  const { data, hierarchy, refreshData } = useData();
  const { theme: appTheme, setTheme: setAppTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // ── Export: download all app data as JSON ──
  const handleExportData = () => {
    try {
      const exportPayload = {
        exportedAt: new Date().toISOString(),
        version: 'v1.2.0',
        memberCount: data.length,
        hierarchyKeys: hierarchy ? Object.keys(hierarchy) : [],
        data,
        hierarchy,
        settings
      };
      const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mvit-code-export-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      addToast({ type: 'success', title: 'Export Complete', message: `Exported ${data.length} records and hierarchy data as JSON.` });
    } catch (err) {
      addToast({ type: 'error', title: 'Export Failed', message: 'Could not export data. Check console for details.' });
      console.error(err);
    }
  };

  // ── Import: read a JSON file and show summary ──
  const handleImportData = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        const recordCount = imported.data?.length || 0;
        const deptCount = imported.hierarchyKeys?.length || (imported.hierarchy ? Object.keys(imported.hierarchy).length : 0);

        // If the import contains settings, apply them
        if (imported.settings) {
          const { theme, ...restSettings } = imported.settings;
          setSettings({ ...DEFAULT_SETTINGS, ...restSettings });
          saveSettings({ ...DEFAULT_SETTINGS, ...restSettings });
          if (theme) setAppTheme(theme);
        }

        addToast({
          type: 'success',
          title: 'Import Successful',
          message: `Imported file contains ${recordCount} member records across ${deptCount} departments. Settings applied.`
        });
      } catch {
        addToast({ type: 'error', title: 'Import Failed', message: 'The selected file is not a valid JSON export.' });
      }
    };
    reader.readAsText(file);

    // Reset file input so the same file can be re-selected
    e.target.value = '';
  };

  // ── Clear Cache ──
  const handleClearCache = () => {
    const settingsBackup = localStorage.getItem(SETTINGS_KEY);
    localStorage.clear();
    sessionStorage.clear();
    // Preserve settings
    if (settingsBackup) localStorage.setItem(SETTINGS_KEY, settingsBackup);
    addToast({ type: 'success', title: 'Cache Cleared', message: 'Browser cache cleared. Settings preserved. Refreshing data...' });
    refreshData();
  };

  // ── Refresh Data ──
  const handleRefreshData = () => {
    addToast({ type: 'info', title: 'Refreshing', message: 'Fetching latest data from Firebase...' });
    refreshData();
    setTimeout(() => {
      addToast({ type: 'success', title: 'Data Refreshed', message: 'All data has been re-fetched from the database.' });
    }, 2000);
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

  return (
    <div className="w-full space-y-6 sm:space-y-8 select-none">
      {/* Hidden file input for import */}
      <input type="file" ref={fileInputRef} onChange={handleFileSelected} accept=".json" className="hidden" />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs font-label-sm uppercase tracking-wider text-secondary bg-pure-white w-fit px-4 py-1.5 rounded-full border border-ink-black">
        <Link to="/" className="hover:text-primary-container transition-none">Dashboard</Link>
        <ChevronRight className="h-3.5 w-3.5 text-secondary" />
        <span className="font-bold text-ink-black flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary-container"></span>
          Settings
        </span>
      </nav>

      {/* Header Banner */}
      <div className="border-2 border-ink-black rounded-3xl bg-pure-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-ink-black text-pure-white px-3.5 py-1 rounded-full border border-ink-black font-label-sm text-[11px] tracking-wider uppercase mb-3">
            <SettingsIcon className="w-3.5 h-3.5 text-primary-fixed" />
            <span>System Configuration</span>
          </div>
          <h1 className="font-headline-md font-normal [font-synthesis:none] text-3xl sm:text-5xl uppercase tracking-tight text-ink-black m-0 leading-tight">
            Application Settings
          </h1>
          <p className="font-body-md text-ink-black text-sm sm:text-base mt-2 max-w-xl">
            Configure your MVIT Code preferences, appearance, and data management options.
          </p>
        </div>
      </div>

      {/* ── Notifications Card ── */}
      <div className="border-2 border-ink-black rounded-3xl bg-pure-white p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-ink-black">
          <Bell className="h-5 w-5 text-ink-black" />
          <h2 className="font-headline-sm font-normal [font-synthesis:none] text-2xl uppercase tracking-tight text-ink-black m-0">
            Notification Preferences
          </h2>
        </div>

        <div className="space-y-3">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div
              key={key}
              onClick={() => handleNotificationChange(key as keyof AppSettings['notifications'])}
              className="flex items-center justify-between p-4 bg-surface border border-ink-black rounded-2xl hover:bg-surface-container transition-none cursor-pointer"
            >
              <div>
                <h3 className="font-title-md text-base uppercase font-bold text-ink-black m-0">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </h3>
                <p className="font-body-md text-xs text-ink-black mt-1">
                  {key === 'dailyUpdates' && 'Receive daily performance summaries'}
                  {key === 'weeklyReports' && 'Get weekly team performance reports'}
                  {key === 'achievementAlerts' && 'Notifications for new achievements'}
                  {key === 'systemNotifications' && 'System maintenance and updates'}
                </p>
              </div>

              {/* Pill Toggle with black border and accent color */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNotificationChange(key as keyof AppSettings['notifications']);
                }}
                className={cn(
                  'relative inline-flex h-6 w-11 items-center rounded-full border border-ink-black transition-none focus:outline-none shrink-0',
                  value ? 'bg-primary-container' : 'bg-surface-container'
                )}
                aria-label={`Toggle ${key}`}
              >
                <span
                  className={cn(
                    'inline-block h-4 w-4 transform rounded-full border border-ink-black bg-pure-white transition-transform',
                    value ? 'translate-x-6' : 'translate-x-0.5'
                  )}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Appearance Card ── */}
      <div className="border-2 border-ink-black rounded-3xl bg-pure-white p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-ink-black">
          <Palette className="h-5 w-5 text-ink-black" />
          <h2 className="font-headline-sm font-normal [font-synthesis:none] text-2xl uppercase tracking-tight text-ink-black m-0">
            Appearance
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-label-sm text-xs uppercase tracking-wider text-secondary mb-3">
              Theme Preference
            </label>
            <div className="grid grid-cols-3 gap-3 max-w-md">
              {(['light', 'dark', 'auto'] as const).map((themeOption) => {
                const active = appTheme === themeOption;
                return (
                  <button
                    key={themeOption}
                    type="button"
                    onClick={() => setAppTheme(themeOption)}
                    className={cn(
                      'py-2.5 px-4 rounded-full border border-ink-black font-label-lg text-xs uppercase tracking-wider transition-none flex items-center justify-center gap-2',
                      active
                        ? 'bg-ink-black text-pure-white'
                        : 'bg-surface text-ink-black hover:bg-surface-container'
                    )}
                  >
                    <span
                      className={cn(
                        'w-2 h-2 rounded-full border border-ink-black',
                        active ? 'bg-primary-container' : 'bg-transparent'
                      )}
                    />
                    <span>{themeOption}</span>
                  </button>
                );
              })}
            </div>
            <p className="font-body-md text-xs text-ink-black mt-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              Currently using <span className="font-bold uppercase">{appTheme}</span> theme
            </p>
          </div>
        </div>
      </div>

      {/* ── Data Management Card ── */}
      <div className="border-2 border-ink-black rounded-3xl bg-pure-white p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-ink-black">
          <Database className="h-5 w-5 text-ink-black" />
          <h2 className="font-headline-sm font-normal [font-synthesis:none] text-2xl uppercase tracking-tight text-ink-black m-0">
            Data Management
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block font-label-sm text-xs uppercase tracking-wider text-secondary mb-2">
              Auto-Refresh Interval
            </label>
            <div className="relative max-w-xs">
              <select
                value={settings.refreshInterval}
                onChange={(e) => setSettings(prev => ({ ...prev, refreshInterval: e.target.value }))}
                className="w-full appearance-none rounded-full border border-ink-black px-4 py-2 bg-surface text-ink-black font-label-sm text-xs uppercase tracking-wider focus:outline-none focus:border-primary-container cursor-pointer"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="180">3 hours</option>
                <option value="0">Disabled</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-ink-black">
                <ChevronRight className="h-3.5 w-3.5 rotate-90" />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-label-sm text-xs uppercase tracking-wider text-secondary mb-3">
              Data Operations
            </label>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={handleExportData}
                className="rounded-full border border-ink-black px-4 py-2 bg-pure-white text-ink-black hover:bg-surface-container font-label-lg text-xs uppercase tracking-wider transition-none flex items-center gap-2"
              >
                <Download className="h-3.5 w-3.5 text-primary-container" />
                <span>Export Data</span>
              </button>
              <button
                type="button"
                onClick={handleImportData}
                className="rounded-full border border-ink-black px-4 py-2 bg-pure-white text-ink-black hover:bg-surface-container font-label-lg text-xs uppercase tracking-wider transition-none flex items-center gap-2"
              >
                <Upload className="h-3.5 w-3.5 text-ink-black" />
                <span>Import Data</span>
              </button>
              <button
                type="button"
                onClick={handleRefreshData}
                className="rounded-full border border-ink-black px-4 py-2 bg-pure-white text-ink-black hover:bg-surface-container font-label-lg text-xs uppercase tracking-wider transition-none flex items-center gap-2"
              >
                <RefreshCw className="h-3.5 w-3.5 text-primary-container" />
                <span>Refresh Data</span>
              </button>
              <button
                type="button"
                onClick={handleClearCache}
                className="rounded-full border border-ink-black px-4 py-2 bg-pure-white text-ink-black hover:bg-surface-container font-label-lg text-xs uppercase tracking-wider transition-none flex items-center gap-2"
              >
                <Trash2 className="h-3.5 w-3.5 text-error" />
                <span>Clear Cache</span>
              </button>
            </div>
          </div>

          {/* Data Stats */}
          <div className="bg-surface border border-ink-black rounded-2xl p-4">
            <p className="font-label-sm text-xs uppercase tracking-wider text-secondary mb-3 flex items-center gap-2">
              <FileJson className="h-3.5 w-3.5 text-primary-container" />
              <span>Current Data Summary</span>
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="font-headline-sm text-2xl text-primary-container tabular-nums">
                  {data?.length?.toLocaleString() || 0}
                </div>
                <div className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mt-1">
                  Total Records
                </div>
              </div>
              <div className="text-center">
                <div className="font-headline-sm text-2xl text-ink-black tabular-nums">
                  {hierarchy ? Object.keys(hierarchy).length : 0}
                </div>
                <div className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mt-1">
                  Departments
                </div>
              </div>
              <div className="text-center">
                <div className="font-headline-sm text-2xl text-ink-black tabular-nums">
                  {new Set((data || []).map(d => d?.memberId).filter(Boolean)).size}
                </div>
                <div className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mt-1">
                  Unique Members
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── System Information Card ── */}
      <div className="border-2 border-ink-black rounded-3xl bg-pure-white p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-ink-black">
          <CheckCircle2 className="h-5 w-5 text-ink-black" />
          <h2 className="font-headline-sm font-normal [font-synthesis:none] text-2xl uppercase tracking-tight text-ink-black m-0">
            System Information
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface border border-ink-black rounded-2xl p-5">
            <h3 className="font-title-md text-sm uppercase font-bold text-ink-black mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              Application
            </h3>
            <div className="space-y-3 font-body-md text-xs text-ink-black">
              <div className="flex justify-between items-center">
                <span className="font-label-sm uppercase tracking-wider text-secondary">Version</span>
                <span className="font-bold px-2 py-0.5 rounded-full border border-ink-black bg-pure-white">v1.2.0</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-ink-black/15">
                <span className="font-label-sm uppercase tracking-wider text-secondary">Build</span>
                <span className="font-bold">React + TypeScript</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-ink-black/15">
                <span className="font-label-sm uppercase tracking-wider text-secondary">Last Updated</span>
                <span className="font-bold">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-ink-black rounded-2xl p-5">
            <h3 className="font-title-md text-sm uppercase font-bold text-ink-black mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ink-black"></span>
              Backend
            </h3>
            <div className="space-y-3 font-body-md text-xs text-ink-black">
              <div className="flex justify-between items-center">
                <span className="font-label-sm uppercase tracking-wider text-secondary">Database</span>
                <span className="font-bold">Firebase Firestore</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-ink-black/15">
                <span className="font-label-sm uppercase tracking-wider text-secondary">Hosting</span>
                <span className="font-bold">Vercel</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-ink-black/15">
                <span className="font-label-sm uppercase tracking-wider text-secondary">Status</span>
                <span className="font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                  Connected
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Save / Reset Footer ── */}
      <div className="border-t border-ink-black pt-5 pb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          {hasChanges ? (
            <span className="font-label-sm text-xs uppercase tracking-wider text-primary-container font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              You have unsaved changes
            </span>
          ) : (
            <span className="font-label-sm text-xs uppercase tracking-wider text-secondary">
              All settings are saved
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="rounded-full border border-ink-black px-5 py-2 font-label-lg text-xs uppercase tracking-wider bg-pure-white text-ink-black hover:bg-surface-container transition-none flex items-center gap-2"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            type="button"
            onClick={handleSaveSettings}
            className={cn(
              'rounded-full border border-ink-black px-6 py-2 font-label-lg text-xs uppercase tracking-wider transition-none flex items-center gap-2',
              hasChanges
                ? 'bg-ink-black text-pure-white hover:bg-primary-container'
                : 'bg-surface-container text-secondary cursor-not-allowed'
            )}
            disabled={!hasChanges}
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
