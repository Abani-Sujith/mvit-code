import React, { useRef } from 'react';
import { useToast } from '../../components/ui/Toaster';
import { useData } from '../../contexts/DataContext';
import { AppSettings, DEFAULT_SETTINGS, saveSettings, SETTINGS_KEY } from './useSettings';

interface UseSettingsDataProps {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  setAppTheme: (theme: 'light' | 'dark' | 'auto') => void;
}

export function useSettingsData({ settings, setSettings, setAppTheme }: UseSettingsDataProps) {
  const { addToast } = useToast();
  const { data, hierarchy, refreshData } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return {
    data,
    hierarchy,
    fileInputRef,
    handleFileSelected,
    handleExportData,
    handleImportData,
    handleClearCache,
    handleRefreshData,
  };
}
