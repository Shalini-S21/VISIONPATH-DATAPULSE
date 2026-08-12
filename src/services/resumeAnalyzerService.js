import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

export const resumeAnalyzerService = {
  analyzeResume: async (file, jobDescription = '') => {
    const formData = new FormData();
    formData.append('file', file);
    if (jobDescription) {
      formData.append('jobDescription', jobDescription);
    }
    const response = await axiosInstance.post(ENDPOINTS.RESUMES.ANALYZE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },
};

export default resumeAnalyzerService;
