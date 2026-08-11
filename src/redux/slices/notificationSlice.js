import { createSlice } from '@reduxjs/toolkit';

const initialNotifications = [
  {
    id: 'notif_1',
    title: 'Career Roadmap Updated',
    message: 'Your Full Stack Developer roadmap has 2 new recommended AI modules.',
    timestamp: '10 minutes ago',
    read: false,
    type: 'roadmap', // roadmap | session | course | system
  },
  {
    id: 'notif_2',
    title: 'Counseling Session Confirmed',
    message: 'Dr. Sarah Jenkins confirmed your 1-on-1 strategy call for tomorrow at 3:00 PM.',
    timestamp: '1 hour ago',
    read: false,
    type: 'session',
  },
  {
    id: 'notif_3',
    title: 'Resume Analysis Complete',
    message: 'Your ATS Score report for Senior Frontend Engineer role is ready (Score: 88/100).',
    timestamp: '3 hours ago',
    read: true,
    type: 'system',
  },
  {
    id: 'notif_4',
    title: 'New Course Recommended',
    message: 'Next.js 15 & System Architecture Patterns recommended based on your recent skill test.',
    timestamp: '1 day ago',
    read: true,
    type: 'course',
  }
];

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: initialNotifications,
  },
  reducers: {
    markAsRead: (state, action) => {
      const notif = state.items.find(n => n.id === action.payload);
      if (notif) notif.read = true;
    },
    markAllAsRead: (state) => {
      state.items.forEach(n => { n.read = true; });
    },
    addNotification: (state, action) => {
      state.items.unshift({
        id: `notif_${Date.now()}`,
        timestamp: 'Just now',
        read: false,
        type: 'system',
        ...action.payload
      });
    },
    clearNotifications: (state) => {
      state.items = [];
    }
  }
});

export const { markAsRead, markAllAsRead, addNotification, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
