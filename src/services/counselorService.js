import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

export const counselorService = {
  getAllCounselors: async () => {
    const response = await axiosInstance.get(ENDPOINTS.COUNSELORS.BASE);
    return response;
  },

  getProfile: async (userId) => {
    const response = await axiosInstance.get(`${ENDPOINTS.COUNSELORS.PROFILE}?userId=${userId}`);
    return response;
  },

  updateProfile: async (userId, profileData) => {
    const response = await axiosInstance.put(`${ENDPOINTS.COUNSELORS.PROFILE}?userId=${userId}`, profileData);
    return response;
  },

  bookAppointment: async (appointmentData) => {
    const response = await axiosInstance.post(ENDPOINTS.COUNSELORS.APPOINTMENTS, appointmentData);
    return response;
  },

  getStudentAppointments: async (studentId) => {
    const response = await axiosInstance.get(ENDPOINTS.COUNSELORS.STUDENT_APPOINTMENTS(studentId));
    return response;
  },

  getCounselorAppointments: async (counselorId) => {
    const response = await axiosInstance.get(ENDPOINTS.COUNSELORS.COUNSELOR_APPOINTMENTS(counselorId));
    return response;
  },

  updateAppointmentStatus: async (id, status) => {
    const response = await axiosInstance.put(ENDPOINTS.COUNSELORS.APPOINTMENT_STATUS(id), { status });
    return response;
  },
};

export default counselorService;
