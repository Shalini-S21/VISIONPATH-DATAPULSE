import React, { useState } from 'react';
import { Settings as SettingsIcon, Lock, Bell, Moon, Save } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import ThemeToggle from '../../components/common/ThemeToggle';
import toast from 'react-hot-toast';

export const Settings = () => {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [sessionReminders, setSessionReminders] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Account preferences saved successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-emerald-600" />
          Account & Portal Settings
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Manage security options, notification channels, and dark theme defaults
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Moon className="w-5 h-5 text-emerald-600" /> Appearance Theme
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">Toggle Dark / Light Mode</span>
            <ThemeToggle />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-600" /> Notifications
          </h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
              <span>Email alerts for roadmap milestones</span>
              <input type="checkbox" checked={emailNotifs} onChange={(e) => setEmailNotifs(e.target.checked)} className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4" />
            </label>
            <label className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
              <span>Counselor booking session reminders</span>
              <input type="checkbox" checked={sessionReminders} onChange={(e) => setSessionReminders(e.target.checked)} className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4" />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="md" icon={Save}>
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
