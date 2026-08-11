import { createSlice } from '@reduxjs/toolkit';

const initialUser = JSON.parse(localStorage.getItem('vp_user')) || {
  id: 'usr_001',
  name: 'Alex Rivera',
  email: 'alex.rivera@visionpath.edu',
  role: 'student', // 'student' | 'counselor' | 'admin'
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  title: 'Full Stack Development Student',
  institution: 'Stanford University',
  bio: 'Passionate about Web Development, Artificial Intelligence, and Cloud Architecture.',
  skills: ['React', 'Node.js', 'Tailwind CSS', 'Python', 'System Design'],
  createdAt: '2025-01-15'
};

const initialToken = localStorage.getItem('vp_token') || 'mock_jwt_token_visionpath_2026';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
    token: initialToken,
    isAuthenticated: true,
    loading: false,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token || 'mock_jwt_token_visionpath_2026';
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('vp_user', JSON.stringify(action.payload.user));
      localStorage.setItem('vp_token', state.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('vp_user');
      localStorage.removeItem('vp_token');
    },
    switchRole: (state, action) => {
      const role = action.payload; // 'student' | 'counselor' | 'admin'
      let updatedUser = { ...state.user, role };
      
      if (role === 'counselor') {
        updatedUser = {
          id: 'cnsl_001',
          name: 'Dr. Sarah Jenkins',
          email: 'sarah.jenkins@visionpath.edu',
          role: 'counselor',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
          title: 'Senior Career Advisor & Tech Industry Specialist',
          institution: 'VisionPath Career Institute',
          bio: '12+ years guiding engineering and product management professionals into Fortune 500 careers.',
          specialties: ['Tech Careers', 'Executive Coaching', 'Resume Strategy', 'System Architecture Interviews'],
          rating: 4.9,
          sessionsCount: 342
        };
      } else if (role === 'admin') {
        updatedUser = {
          id: 'adm_001',
          name: 'Marcus Vance',
          email: 'marcus.admin@visionpath.edu',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
          title: 'Principal Platform Director',
          institution: 'VisionPath HQ',
          bio: 'Platform Operations & System Architecture Administrator.'
        };
      } else {
        updatedUser = {
          id: 'usr_001',
          name: 'Alex Rivera',
          email: 'alex.rivera@visionpath.edu',
          role: 'student',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
          title: 'Full Stack Development Student',
          institution: 'Stanford University',
          bio: 'Passionate about Web Development, Artificial Intelligence, and Cloud Architecture.',
          skills: ['React', 'Node.js', 'Tailwind CSS', 'Python', 'System Design']
        };
      }
      
      state.user = updatedUser;
      localStorage.setItem('vp_user', JSON.stringify(updatedUser));
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('vp_user', JSON.stringify(state.user));
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { loginSuccess, logout, switchRole, updateProfile, setError } = authSlice.actions;
export default authSlice.reducer;
