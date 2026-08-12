import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

export const aiMentorService = {
  ask: async (question, context = 'General user') => {
    const response = await axiosInstance.post(ENDPOINTS.AI.ASK, {
      question,
      context,
    });
    return response;
  },
};

export default aiMentorService;
