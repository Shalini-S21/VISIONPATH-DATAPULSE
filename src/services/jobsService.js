import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

export const jobsService = {
  getAllJobs: async () => {
    const response = await axiosInstance.get(ENDPOINTS.JOBS.BASE);
    return response;
  },

  getJobById: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.JOBS.BY_ID(id));
    return response;
  },

  createJob: async (jobData) => {
    const response = await axiosInstance.post(ENDPOINTS.JOBS.BASE, jobData);
    return response;
  },

  updateJob: async (id, jobData) => {
    const response = await axiosInstance.put(ENDPOINTS.JOBS.BY_ID(id), jobData);
    return response;
  },

  deleteJob: async (id) => {
    const response = await axiosInstance.delete(ENDPOINTS.JOBS.BY_ID(id));
    return response;
  },

  searchJobs: async (keyword) => {
    const response = await axiosInstance.get(`${ENDPOINTS.JOBS.SEARCH}?keyword=${encodeURIComponent(keyword)}`);
    return response;
  },

  getRecommendations: async (studentId, skills = '') => {
    const response = await axiosInstance.get(
      `${ENDPOINTS.JOBS.RECOMMENDATIONS(studentId)}${skills ? `?skills=${encodeURIComponent(skills)}` : ''}`
    );
    return response;
  },

  saveJob: async (jobId, userId) => {
    const response = await axiosInstance.post(`${ENDPOINTS.JOBS.SAVE(jobId)}?userId=${userId}`);
    return response;
  },

  unsaveJob: async (jobId, userId) => {
    const response = await axiosInstance.delete(`${ENDPOINTS.JOBS.SAVE(jobId)}?userId=${userId}`);
    return response;
  },

  getSavedJobs: async (userId) => {
    const response = await axiosInstance.get(`${ENDPOINTS.JOBS.SAVED}?userId=${userId}`);
    return response;
  },

  applyForJob: async (jobId, userId, coverLetter = '') => {
    const response = await axiosInstance.post(
      `${ENDPOINTS.JOBS.APPLY(jobId)}?userId=${userId}`,
      { coverLetter }
    );
    return response;
  },

  getApplications: async (userId) => {
    const response = await axiosInstance.get(`${ENDPOINTS.JOBS.APPLICATIONS}?userId=${userId}`);
    return response;
  },

  updateApplicationStatus: async (applicationId, status) => {
    const response = await axiosInstance.put(
      `${ENDPOINTS.JOBS.APPLICATIONS}/${applicationId}`,
      { status }
    );
    return response;
  },
};

export default jobsService;
