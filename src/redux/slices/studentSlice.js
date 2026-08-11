import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeRoadmap: {
    id: 'rd_fullstack',
    title: 'Senior Full-Stack AI Engineer',
    category: 'Software Engineering',
    completionRate: 68,
    estimatedWeeks: 16,
    completedModules: 12,
    totalModules: 18,
    nextMilestone: 'Advanced System Architecture & Microfrontends',
    steps: [
      { id: 1, title: 'Modern React 19 & Redux Toolkit Architecture', status: 'completed', duration: '2 Weeks' },
      { id: 2, title: 'State Management & Async Middleware', status: 'completed', duration: '2 Weeks' },
      { id: 3, title: 'Node.js, Express & Microservice Design', status: 'completed', duration: '3 Weeks' },
      { id: 4, title: 'PostgreSQL, Prisma ORM & Database Tuning', status: 'completed', duration: '2 Weeks' },
      { id: 5, title: 'GraphQL & REST API Interceptors', status: 'in-progress', duration: '2 Weeks' },
      { id: 6, title: 'AI Integration with LLM APIs & Vector DBs', status: 'pending', duration: '3 Weeks' },
      { id: 7, title: 'Cloud Deployment (Vercel, AWS ECS, Docker)', status: 'pending', duration: '2 Weeks' }
    ]
  },
  enrolledCourses: [
    {
      id: 'crs_101',
      title: 'Enterprise React 19 Architecture & Performance Optimization',
      instructor: 'Sarah Drasner & Dan Abramov',
      progress: 82,
      totalDuration: '18h 45m',
      completedLessons: 24,
      totalLessons: 30,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
      category: 'Frontend Engineering',
      level: 'Advanced',
      rating: 4.9
    },
    {
      id: 'crs_102',
      title: 'Building Production AI Assistants with LangChain & OpenAI',
      instructor: 'Dr. Andrew Ng',
      progress: 45,
      totalDuration: '14h 20m',
      completedLessons: 11,
      totalLessons: 24,
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80',
      category: 'Artificial Intelligence',
      level: 'Intermediate',
      rating: 4.85
    },
    {
      id: 'crs_103',
      title: 'Full Stack System Design & Distributed Microservices',
      instructor: 'Gaurav Sen',
      progress: 30,
      totalDuration: '22h 10m',
      completedLessons: 8,
      totalLessons: 28,
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
      category: 'Backend Engineering',
      level: 'Expert',
      rating: 4.95
    }
  ],
  assessments: [
    {
      id: 'ast_2026_1',
      title: 'Full Stack Competency & Architectural Aptitude Test',
      date: '2026-07-28',
      score: 91,
      maxScore: 100,
      status: 'Passed',
      topSkills: ['React State Machines', 'RESTful Design', 'Tailwind Layouts'],
      areasToImprove: ['GraphQL Caching', 'Kubernetes Deployment']
    },
    {
      id: 'ast_2026_2',
      title: 'Data Structures, Algorithms & Problem Solving',
      date: '2026-06-15',
      score: 84,
      maxScore: 100,
      status: 'Passed',
      topSkills: ['Dynamic Programming', 'Trees & Graphs'],
      areasToImprove: ['System Scalability Math']
    }
  ],
  aiChatHistory: [
    { id: 1, sender: 'ai', text: 'Hello Alex! I am VisionPath AI. Based on your 91% score in Full Stack Competency, I recommend focusing on AI Integration and GraphQL caching next. How can I help your career journey today?', time: '10:00 AM' }
  ],
  resumeData: {
    atsScore: 88,
    targetRole: 'Senior Frontend Architect',
    lastAnalyzed: '2026-08-01',
    suggestions: [
      'Quantify achievements in project bullet points (e.g. Improved LCP by 42%)',
      'Add Docker and CI/CD Pipeline experience under Cloud Skills',
      'Ensure standard headings are parsed without column breaks'
    ]
  }
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    addAiMessage: (state, action) => {
      state.aiChatHistory.push(action.payload);
    },
    updateCourseProgress: (state, action) => {
      const { courseId, progress } = action.payload;
      const crs = state.enrolledCourses.find(c => c.id === courseId);
      if (crs) crs.progress = progress;
    },
    addEnrolledCourse: (state, action) => {
      if (!state.enrolledCourses.some(c => c.id === action.payload.id)) {
        state.enrolledCourses.push(action.payload);
      }
    },
    submitAssessment: (state, action) => {
      state.assessments.unshift(action.payload);
    }
  }
});

export const { addAiMessage, updateCourseProgress, addEnrolledCourse, submitAssessment } = studentSlice.actions;
export default studentSlice.reducer;
