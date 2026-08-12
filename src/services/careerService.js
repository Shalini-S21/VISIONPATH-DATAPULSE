import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

export const careerService = {
  getAllCareers: async () => {
    const response = await axiosInstance.get(ENDPOINTS.CAREERS.BASE);
    return response;
  },

  getCareerById: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.CAREERS.BY_ID(id));
    return response;
  },

  createCareer: async (careerData) => {
    const response = await axiosInstance.post(ENDPOINTS.CAREERS.BASE, careerData);
    return response;
  },

  updateCareer: async (id, careerData) => {
    const response = await axiosInstance.put(ENDPOINTS.CAREERS.BY_ID(id), careerData);
    return response;
  },

  deleteCareer: async (id) => {
    const response = await axiosInstance.delete(ENDPOINTS.CAREERS.BY_ID(id));
    return response;
  },

  searchCareers: async (keyword) => {
    const response = await axiosInstance.get(`${ENDPOINTS.CAREERS.SEARCH}?keyword=${encodeURIComponent(keyword)}`);
    return response;
  },

  getCategories: async () => {
    const response = await axiosInstance.get(ENDPOINTS.CAREERS.CATEGORIES);
    return response;
  },

  getRecommendations: async (studentId, skills = '') => {
    const response = await axiosInstance.get(
      `${ENDPOINTS.CAREERS.RECOMMENDATIONS(studentId)}${skills ? `?skills=${encodeURIComponent(skills)}` : ''}`
    );
    return response;
  },

  compareCareers: async (id1, id2) => {
    const response = await axiosInstance.get(`${ENDPOINTS.CAREERS.COMPARE}?id1=${id1}&id2=${id2}`);
    return response;
  },
};

export default careerService;
