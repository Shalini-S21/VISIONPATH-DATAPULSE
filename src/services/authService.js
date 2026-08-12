import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

export const authService = {
  login: async (credentials) => {
    const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, credentials);
    return response;
  },

  register: async (userData) => {
    const response = await axiosInstance.post(ENDPOINTS.AUTH.REGISTER, userData);
    return response;
  },

  getMe: async () => {
    const response = await axiosInstance.get(ENDPOINTS.AUTH.ME);
    return response;
  },

  changePassword: async (passwordData) => {
    const response = await axiosInstance.post(ENDPOINTS.AUTH.CHANGE_PASSWORD, passwordData);
    return response;
  },

  forgotPassword: async (emailData) => {
    const response = await axiosInstance.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, emailData);
    return response;
  },

  resetPassword: async (resetData) => {
    const response = await axiosInstance.post(ENDPOINTS.AUTH.RESET_PASSWORD, resetData);
    return response;
  },
};

export default authService;
