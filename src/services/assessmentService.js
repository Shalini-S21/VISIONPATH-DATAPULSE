import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

export const assessmentService = {
  getAllAssessments: async () => {
    const response = await axiosInstance.get(ENDPOINTS.ASSESSMENTS.BASE);
    return response;
  },

  getAssessmentById: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.ASSESSMENTS.BY_ID(id));
    return response;
  },

  createAssessment: async (assessmentData) => {
    const response = await axiosInstance.post(ENDPOINTS.ASSESSMENTS.BASE, assessmentData);
    return response;
  },

  updateAssessment: async (id, assessmentData) => {
    const response = await axiosInstance.put(ENDPOINTS.ASSESSMENTS.BY_ID(id), assessmentData);
    return response;
  },

  getQuestions: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.ASSESSMENTS.QUESTIONS(id));
    return response;
  },

  startAssessment: async (id) => {
    const response = await axiosInstance.post(ENDPOINTS.ASSESSMENTS.START(id));
    return response;
  },

  submitAssessment: async (id, userId, answers) => {
    const response = await axiosInstance.post(
      `${ENDPOINTS.ASSESSMENTS.SUBMIT(id)}?userId=${userId}`,
      answers
    );
    return response;
  },

  getResults: async (userId) => {
    const response = await axiosInstance.get(`${ENDPOINTS.ASSESSMENTS.RESULTS}?userId=${userId}`);
    return response;
  },
};

export default assessmentService;
