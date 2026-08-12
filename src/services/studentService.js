import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

export const studentService = {
  getProfile: async (userId) => {
    const response = await axiosInstance.get(`${ENDPOINTS.STUDENTS.PROFILE}?userId=${userId}`);
    return response;
  },

  updateProfile: async (userId, profileData) => {
    const response = await axiosInstance.put(`${ENDPOINTS.STUDENTS.PROFILE}?userId=${userId}`, profileData);
    return response;
  },

  getSkills: async (userId) => {
    const response = await axiosInstance.get(`${ENDPOINTS.STUDENTS.SKILLS}?userId=${userId}`);
    return response;
  },

  addSkill: async (userId, skillName, proficiency) => {
    const response = await axiosInstance.post(`${ENDPOINTS.STUDENTS.SKILLS}?userId=${userId}`, {
      skillName,
      proficiency,
    });
    return response;
  },

  deleteSkill: async (skillId, userId) => {
    const response = await axiosInstance.delete(`${ENDPOINTS.STUDENTS.SKILLS}/${skillId}?userId=${userId}`);
    return response;
  },

  getInterests: async (userId) => {
    const response = await axiosInstance.get(`${ENDPOINTS.STUDENTS.INTERESTS}?userId=${userId}`);
    return response;
  },

  addInterest: async (userId, interest) => {
    const response = await axiosInstance.post(`${ENDPOINTS.STUDENTS.INTERESTS}?userId=${userId}`, { interest });
    return response;
  },

  deleteInterest: async (interestId, userId) => {
    const response = await axiosInstance.delete(`${ENDPOINTS.STUDENTS.INTERESTS}/${interestId}?userId=${userId}`);
    return response;
  },
};

export default studentService;
