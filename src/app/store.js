import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import themeReducer from '../redux/slices/themeSlice';
import notificationReducer from '../redux/slices/notificationSlice';
import studentReducer from '../redux/slices/studentSlice';
import counselorReducer from '../redux/slices/counselorSlice';
import adminReducer from '../redux/slices/adminSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    notifications: notificationReducer,
    student: studentReducer,
    counselor: counselorReducer,
    admin: adminReducer,
  },
});
