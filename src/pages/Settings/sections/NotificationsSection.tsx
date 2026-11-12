import React from 'react';
import { Bell } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { AppSettings } from '../useSettings';

interface NotificationsSectionProps {
  settings: AppSettings;
  onNotificationChange: (key: keyof AppSettings['notifications']) => void;
}

const NotificationsSection: React.FC<NotificationsSectionProps> = ({ settings, onNotificationChange }) => (
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
          onClick={() => onNotificationChange(key as keyof AppSettings['notifications'])}
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
              onNotificationChange(key as keyof AppSettings['notifications']);
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
);

export default NotificationsSection;
