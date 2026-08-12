import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

export const notificationService = {
  getUserNotifications: async (userId, unreadOnly = false) => {
    const response = await axiosInstance.get(
      `${ENDPOINTS.NOTIFICATIONS.BASE}?userId=${userId}&unreadOnly=${unreadOnly}`
    );
    return response;
  },

  createNotification: async (notificationData) => {
    const response = await axiosInstance.post(ENDPOINTS.NOTIFICATIONS.BASE, notificationData);
    return response;
  },

  markAsRead: async (id) => {
    const response = await axiosInstance.put(ENDPOINTS.NOTIFICATIONS.MARK_READ(id));
    return response;
  },

  markAllAsRead: async (userId) => {
    const response = await axiosInstance.put(`${ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ}?userId=${userId}`);
    return response;
  },
};

export default notificationService;
