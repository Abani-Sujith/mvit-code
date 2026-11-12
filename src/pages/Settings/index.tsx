import React from 'react';
import AppearanceSection from './sections/AppearanceSection';
import DataManagementSection from './sections/DataManagementSection';
import NotificationsSection from './sections/NotificationsSection';
import SettingsFooterSection from './sections/SettingsFooterSection';
import SettingsHeaderSection from './sections/SettingsHeaderSection';
import SystemInfoSection from './sections/SystemInfoSection';
import { useSettings } from './useSettings';
import { useSettingsData } from './useSettingsData';

const Settings: React.FC = () => {
  const {
    settings,
    setSettings,
    appTheme,
    setAppTheme,
    hasChanges,
    handleNotificationChange,
    handleRefreshIntervalChange,
    handleSaveSettings,
    handleResetDefaults,
  } = useSettings();
  const {
    data,
    hierarchy,
    fileInputRef,
    handleFileSelected,
    handleExportData,
    handleImportData,
    handleClearCache,
    handleRefreshData,
  } = useSettingsData({ settings, setSettings, setAppTheme });

  return (
    <div className="w-full space-y-6 sm:space-y-8 select-none">
      {/* Hidden file input for import */}
      <input type="file" ref={fileInputRef} onChange={handleFileSelected} accept=".json" className="hidden" />

      <SettingsHeaderSection />
      <NotificationsSection settings={settings} onNotificationChange={handleNotificationChange} />
      <AppearanceSection appTheme={appTheme} setAppTheme={setAppTheme} />
      <DataManagementSection
        settings={settings}
        onRefreshIntervalChange={handleRefreshIntervalChange}
        onExportData={handleExportData}
        onImportData={handleImportData}
        onRefreshData={handleRefreshData}
        onClearCache={handleClearCache}
        data={data}
        hierarchy={hierarchy}
      />
      <SystemInfoSection />
      <SettingsFooterSection
        hasChanges={hasChanges}
        onResetDefaults={handleResetDefaults}
        onSaveSettings={handleSaveSettings}
      />
    </div>
  );
};

export default Settings;
