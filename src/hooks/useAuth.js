import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout, switchRole, updateProfile } from '../redux/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const login = (userData) => {
    dispatch(loginSuccess(userData));
  };

  const signout = () => {
    dispatch(logout());
  };

  const changeRole = (newRole) => {
    dispatch(switchRole(newRole));
  };

  const editProfile = (data) => {
    dispatch(updateProfile(data));
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    role: user?.role || 'student',
    isStudent: user?.role === 'student',
    isCounselor: user?.role === 'counselor',
    isAdmin: user?.role === 'admin',
    login,
    logout: signout,
    changeRole,
    editProfile,
  };
};
