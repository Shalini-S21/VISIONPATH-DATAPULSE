import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

export const educationService = {
  getAllColleges: async () => {
    const response = await axiosInstance.get(ENDPOINTS.EDUCATION.COLLEGES);
    return response;
  },

  getCollegeById: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.EDUCATION.COLLEGE_BY_ID(id));
    return response;
  },

  createCollege: async (collegeData) => {
    const response = await axiosInstance.post(ENDPOINTS.EDUCATION.COLLEGES, collegeData);
    return response;
  },

  updateCollege: async (id, collegeData) => {
    const response = await axiosInstance.put(ENDPOINTS.EDUCATION.COLLEGE_BY_ID(id), collegeData);
    return response;
  },

  deleteCollege: async (id) => {
    const response = await axiosInstance.delete(ENDPOINTS.EDUCATION.COLLEGE_BY_ID(id));
    return response;
  },

  getAllCourses: async () => {
    const response = await axiosInstance.get(ENDPOINTS.EDUCATION.COURSES);
    return response;
  },

  getCourseById: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.EDUCATION.COURSE_BY_ID(id));
    return response;
  },

  createCourse: async (courseData) => {
    const response = await axiosInstance.post(ENDPOINTS.EDUCATION.COURSES, courseData);
    return response;
  },

  deleteCourse: async (id) => {
    const response = await axiosInstance.delete(ENDPOINTS.EDUCATION.COURSE_BY_ID(id));
    return response;
  },

  search: async (keyword) => {
    const response = await axiosInstance.get(`${ENDPOINTS.EDUCATION.SEARCH}?keyword=${encodeURIComponent(keyword)}`);
    return response;
  },

  getRecommendations: async (studentId) => {
    const response = await axiosInstance.get(ENDPOINTS.EDUCATION.RECOMMENDATIONS(studentId));
    return response;
  },
};

export default educationService;
