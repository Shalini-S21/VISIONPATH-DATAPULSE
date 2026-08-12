import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

export const studyPlanService = {
  getPlansByUser: async (userId) => {
    const response = await axiosInstance.get(`${ENDPOINTS.STUDY_PLANS.BASE}?userId=${userId}`);
    return response;
  },

  getPlanById: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.STUDY_PLANS.BY_ID(id));
    return response;
  },

  createPlan: async (planData) => {
    const response = await axiosInstance.post(ENDPOINTS.STUDY_PLANS.BASE, planData);
    return response;
  },

  updatePlan: async (id, planData) => {
    const response = await axiosInstance.put(ENDPOINTS.STUDY_PLANS.BY_ID(id), planData);
    return response;
  },

  deletePlan: async (id) => {
    const response = await axiosInstance.delete(ENDPOINTS.STUDY_PLANS.BY_ID(id));
    return response;
  },

  addTask: async (planId, taskData) => {
    const response = await axiosInstance.post(ENDPOINTS.STUDY_PLANS.TASKS(planId), taskData);
    return response;
  },

  updateTask: async (taskId, taskData) => {
    const response = await axiosInstance.put(ENDPOINTS.STUDY_PLANS.TASK_BY_ID(taskId), taskData);
    return response;
  },

  deleteTask: async (taskId) => {
    const response = await axiosInstance.delete(ENDPOINTS.STUDY_PLANS.TASK_BY_ID(taskId));
    return response;
  },
};

export default studyPlanService;
