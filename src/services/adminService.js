import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

export const adminService = {
  getAnalytics: async () => {
    const response = await axiosInstance.get(ENDPOINTS.ADMIN.ANALYTICS);
    return response;
  },
};

export default adminService;
