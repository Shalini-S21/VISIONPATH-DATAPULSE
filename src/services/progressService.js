import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

export const progressService = {
  getProgress: async (userId) => {
    const response = await axiosInstance.get(`${ENDPOINTS.PROGRESS.BASE}?userId=${userId}`);
    return response;
  },

  incrementAssessment: async (userId) => {
    const response = await axiosInstance.post(`${ENDPOINTS.PROGRESS.INCREMENT_ASSESSMENT}?userId=${userId}`);
    return response;
  },

  incrementJob: async (userId) => {
    const response = await axiosInstance.post(`${ENDPOINTS.PROGRESS.INCREMENT_JOB}?userId=${userId}`);
    return response;
  },

  incrementStudyPlan: async (userId) => {
    const response = await axiosInstance.post(`${ENDPOINTS.PROGRESS.INCREMENT_STUDY_PLAN}?userId=${userId}`);
    return response;
  },
};

export default progressService;
