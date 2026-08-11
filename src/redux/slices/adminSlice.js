import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stats: {
    totalUsers: 14280,
    totalStudents: 11840,
    totalCounselors: 320,
    activeRoadmaps: 84,
    monthlyRevenue: 124500,
    systemHealth: 99.98
  },
  users: [
    { id: 'usr_1', name: 'Alex Rivera', email: 'alex.rivera@visionpath.edu', role: 'student', status: 'Active', joinedDate: '2025-01-15' },
    { id: 'usr_2', name: 'Dr. Sarah Jenkins', email: 'sarah.jenkins@visionpath.edu', role: 'counselor', status: 'Active', joinedDate: '2024-11-10' },
    { id: 'usr_3', name: 'Elena Rostova', email: 'elena.rostova@gmail.com', role: 'student', status: 'Active', joinedDate: '2025-03-02' },
    { id: 'usr_4', name: 'Michael Chang', email: 'm.chang@stanford.edu', role: 'counselor', status: 'Pending Review', joinedDate: '2026-07-29' },
    { id: 'usr_5', name: 'David Miller', email: 'david.m@mit.edu', role: 'admin', status: 'Active', joinedDate: '2024-06-01' }
  ],
  auditLogs: [
    { id: 'log_1', action: 'USER_ROLE_UPDATED', performedBy: 'Marcus Vance (Admin)', target: 'Dr. Sarah Jenkins', timestamp: '2026-08-06 14:22:05', status: 'SUCCESS' },
    { id: 'log_2', action: 'COURSE_APPROVED', performedBy: 'Marcus Vance (Admin)', target: 'Next.js 15 Enterprise Architecture', timestamp: '2026-08-06 11:10:40', status: 'SUCCESS' },
    { id: 'log_3', action: 'SYSTEM_BACKUP_COMPLETED', performedBy: 'SYSTEM_CRON', target: 'PostgreSQL Database Cluster', timestamp: '2026-08-06 04:00:00', status: 'SUCCESS' },
    { id: 'log_4', action: 'API_RATE_LIMIT_TRIGGERED', performedBy: 'External Webhook', target: 'OpenAI GPT-4o Gateway', timestamp: '2026-08-05 22:14:18', status: 'WARNING' }
  ],
  systemSettings: {
    siteName: 'VisionPath Platform',
    supportEmail: 'support@visionpath.edu',
    maintenanceMode: false,
    aiModelDefault: 'gpt-4o-vision-path-v2',
    maxTokensPerRequest: 4096,
    requireOtpAuth: true
  }
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    toggleUserStatus: (state, action) => {
      const u = state.users.find(usr => usr.id === action.payload);
      if (u) {
        u.status = u.status === 'Active' ? 'Suspended' : 'Active';
      }
    },
    updateSettings: (state, action) => {
      state.systemSettings = { ...state.systemSettings, ...action.payload };
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(u => u.id !== action.payload);
    }
  }
});

export const { toggleUserStatus, updateSettings, deleteUser } = adminSlice.actions;
export default adminSlice.reducer;
