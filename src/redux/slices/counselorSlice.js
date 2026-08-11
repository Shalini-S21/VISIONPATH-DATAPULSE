import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pendingRequests: [
    {
      id: 'req_101',
      studentName: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      track: 'Full Stack Development',
      topic: 'FAANG Technical Interview Preparation & System Design Review',
      requestedDate: '2026-08-08',
      requestedTime: '02:00 PM',
      status: 'pending'
    },
    {
      id: 'req_102',
      studentName: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
      track: 'AI Engineering & Machine Learning',
      topic: 'Career Transition Strategy from Data Analyst to ML Ops Engineer',
      requestedDate: '2026-08-09',
      requestedTime: '11:00 AM',
      status: 'pending'
    }
  ],
  assignedStudents: [
    {
      id: 'usr_001',
      name: 'Alex Rivera',
      email: 'alex.rivera@visionpath.edu',
      track: 'Full Stack AI Engineer',
      progress: 68,
      lastSessionDate: '2026-07-20',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      status: 'Active'
    },
    {
      id: 'usr_002',
      name: 'Marcus Vance Jr.',
      email: 'marcus.vance@stanford.edu',
      track: 'Cloud Architecture & DevOps',
      progress: 84,
      lastSessionDate: '2026-07-26',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      status: 'Active'
    },
    {
      id: 'usr_003',
      name: 'Sophia Patel',
      email: 'sophia.p@berkeley.edu',
      track: 'Cybersecurity Analytics',
      progress: 42,
      lastSessionDate: '2026-07-14',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
      status: 'Active'
    }
  ],
  sessions: [
    {
      id: 'sess_1',
      studentName: 'Alex Rivera',
      topic: 'System Design Mock Interview',
      date: '2026-08-07',
      time: '03:00 PM',
      duration: '45 mins',
      status: 'Upcoming',
      meetingUrl: 'https://meet.visionpath.edu/room-alex-sarah'
    },
    {
      id: 'sess_2',
      studentName: 'Elena Rostova',
      topic: 'Resume ATS & Cover Letter Audit',
      date: '2026-08-07',
      time: '05:00 PM',
      duration: '30 mins',
      status: 'Upcoming',
      meetingUrl: 'https://meet.visionpath.edu/room-elena-sarah'
    }
  ],
  earnings: {
    totalEarned: 14850,
    thisMonth: 3200,
    pendingPayout: 1150,
    sessionsCompleted: 142,
    hourlyRate: 85
  }
};

const counselorSlice = createSlice({
  name: 'counselor',
  initialState,
  reducers: {
    approveRequest: (state, action) => {
      const reqId = action.payload;
      const reqIndex = state.pendingRequests.findIndex(r => r.id === reqId);
      if (reqIndex !== -1) {
        const req = state.pendingRequests[reqIndex];
        req.status = 'approved';
        state.sessions.unshift({
          id: `sess_${Date.now()}`,
          studentName: req.studentName,
          topic: req.topic,
          date: req.requestedDate,
          time: req.requestedTime,
          duration: '45 mins',
          status: 'Upcoming',
          meetingUrl: `https://meet.visionpath.edu/room-${req.id}`
        });
        state.pendingRequests.splice(reqIndex, 1);
      }
    },
    rejectRequest: (state, action) => {
      state.pendingRequests = state.pendingRequests.filter(r => r.id !== action.payload);
    }
  }
});

export const { approveRequest, rejectRequest } = counselorSlice.actions;
export default counselorSlice.reducer;
