import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import notificationService from '../../services/notificationService';
import { Bell, CheckCheck, Compass, Calendar, BookOpen, ShieldAlert } from 'lucide-react';
import Button from '../../components/ui/Button';

export const Notifications = () => {
  const { user } = useAuth();
  const { notifications: reduxNotifications, markAsRead: reduxMarkAsRead, markAllAsRead: reduxMarkAllAsRead } = useNotification();
  const [notifications, setNotifications] = useState(reduxNotifications);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.id) return;
      try {
        const res = await notificationService.getUserNotifications(user.id);
        const data = res.data || res;
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((n) => ({
            id: n.id,
            title: n.title || 'System Notification',
            message: n.message || n.content || 'You have a new update.',
            timestamp: n.createdAt ? n.createdAt.split('T')[0] : 'Recent',
            read: n.read || n.isRead || false,
          }));
          setNotifications(mapped);
        }
      } catch (err) {
        console.warn('Backend getUserNotifications notice:', err?.message || err);
      }
    };
    fetchNotifications();
  }, [user]);

  const handleMarkAsRead = async (id) => {
    reduxMarkAsRead(id);
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    try {
      await notificationService.markAsRead(id);
    } catch (err) {
      console.warn('Backend markAsRead notice:', err?.message || err);
    }
  };

  const handleMarkAllAsRead = async () => {
    reduxMarkAllAsRead();
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    try {
      if (user?.id) {
        await notificationService.markAllAsRead(user.id);
      }
    } catch (err) {
      console.warn('Backend markAllAsRead notice:', err?.message || err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-emerald-600" />
            Notification Center
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            System updates, session alerts, roadmap milestones, and ATS score reports
          </p>
        </div>
        <Button variant="outline" size="sm" icon={CheckCheck} onClick={handleMarkAllAsRead}>
          Mark All As Read
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => handleMarkAsRead(item.id)}
            className={`p-4 rounded-2xl border transition-colors flex items-start gap-4 cursor-pointer ${
              item.read
                ? 'bg-white dark:bg-slate-900 border-gray-200/80 dark:border-slate-800'
                : 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/30'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-emerald-600">
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <span className="text-[10px] text-gray-400">{item.timestamp}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">{item.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
