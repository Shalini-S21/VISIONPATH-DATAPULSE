import { createSlice } from '@reduxjs/toolkit';

const getInitialUser = () => {
  try {
    const savedUser = localStorage.getItem('vp_user');
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (e) {
    return null;
  }
};

const savedToken = localStorage.getItem('vp_token');
const initialUser = getInitialUser();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
    token: savedToken,
    isAuthenticated: Boolean(savedToken && initialUser),
    loading: false,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      const normalizedRole = (user?.role || 'student').toLowerCase();
      const userObj = {
        ...user,
        role: normalizedRole,
      };

      state.user = userObj;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null;

      localStorage.setItem('vp_user', JSON.stringify(userObj));
      if (token) {
        localStorage.setItem('vp_token', token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('vp_user');
      localStorage.removeItem('vp_token');
    },
    switchRole: (state, action) => {
      const role = action.payload;
      let updatedUser = { ...state.user, role };
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
