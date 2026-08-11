import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import StudentDashboardLayout from '../layouts/StudentDashboardLayout';
import CounselorDashboardLayout from '../layouts/CounselorDashboardLayout';
import AdminDashboardLayout from '../layouts/AdminDashboardLayout';

// Middleware
import ProtectedRoute from '../middleware/ProtectedRoute';
import RoleBasedRoute from '../middleware/RoleBasedRoute';

// Page spinner for lazy-loaded chunks
const PageSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Loading…</p>
    </div>
  </div>
);

// ── Landing Pages ──────────────────────────────────
const Home = lazy(() => import('../pages/landing/Home'));
const About = lazy(() => import('../pages/landing/About'));
const Features = lazy(() => import('../pages/landing/Features'));
const Pricing = lazy(() => import('../pages/landing/Pricing'));
const Contact = lazy(() => import('../pages/landing/Contact'));
const FAQ = lazy(() => import('../pages/landing/FAQ'));

// ── Auth Pages ─────────────────────────────────────
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const OTPVerification = lazy(() => import('../pages/auth/OTPVerification'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));

// ── Student Pages ──────────────────────────────────
const StudentDashboard = lazy(() => import('../pages/student/Dashboard'));
const StudentProfile = lazy(() => import('../pages/student/MyProfile'));
const EditProfile = lazy(() => import('../pages/student/EditProfile'));
const Education = lazy(() => import('../pages/student/Education'));
const Skills = lazy(() => import('../pages/student/Skills'));
const CareerAssessment = lazy(() => import('../pages/student/CareerAssessment'));
const AssessmentHistory = lazy(() => import('../pages/student/AssessmentHistory'));
const CareerRecommendation = lazy(() => import('../pages/student/CareerRecommendation'));
const CareerRoadmap = lazy(() => import('../pages/student/CareerRoadmap'));
const LearningDashboard = lazy(() => import('../pages/student/LearningDashboard'));
const Courses = lazy(() => import('../pages/student/Courses'));
const JobPortal = lazy(() => import('../pages/student/JobPortal'));
const ResumeBuilder = lazy(() => import('../pages/student/ResumeBuilder'));
const AICareerAssistant = lazy(() => import('../pages/student/AICareerAssistant'));
const AIResumeAnalyzer = lazy(() => import('../pages/student/AIResumeAnalyzer'));
const AIInterviewPrep = lazy(() => import('../pages/student/AIInterviewPrep'));
const CounselorBooking = lazy(() => import('../pages/student/CounselorBooking'));
const StudentMessages = lazy(() => import('../pages/student/Messages'));
const StudentNotifications = lazy(() => import('../pages/student/Notifications'));
const StudentAnalytics = lazy(() => import('../pages/student/Analytics'));
const StudentSettings = lazy(() => import('../pages/student/Settings'));

// ── Counselor Pages ────────────────────────────────
const CounselorDashboard = lazy(() => import('../pages/counselor/Dashboard'));
const CounselorProfile = lazy(() => import('../pages/counselor/Profile'));
const StudentRequests = lazy(() => import('../pages/counselor/StudentRequests'));
const AssignedStudents = lazy(() => import('../pages/counselor/AssignedStudents'));
const StudentDetails = lazy(() => import('../pages/counselor/StudentDetails'));
const AssessmentReports = lazy(() => import('../pages/counselor/AssessmentReports'));
const CareerSuggestions = lazy(() => import('../pages/counselor/CareerSuggestions'));
const SessionCalendar = lazy(() => import('../pages/counselor/SessionCalendar'));
const VideoSessions = lazy(() => import('../pages/counselor/VideoSessions'));
const CounselorMessages = lazy(() => import('../pages/counselor/Messages'));
const LearningResources = lazy(() => import('../pages/counselor/LearningResources'));
const UploadMaterials = lazy(() => import('../pages/counselor/UploadMaterials'));
const CounselorNotifications = lazy(() => import('../pages/counselor/Notifications'));
const CounselorAnalytics = lazy(() => import('../pages/counselor/Analytics'));
const CounselorEarnings = lazy(() => import('../pages/counselor/Earnings'));
const CounselorSettings = lazy(() => import('../pages/counselor/Settings'));

// ── Admin Pages ────────────────────────────────────
const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));
const UserMgmt = lazy(() => import('../pages/admin/UserMgmt'));
const StudentMgmt = lazy(() => import('../pages/admin/StudentMgmt'));
const CounselorMgmt = lazy(() => import('../pages/admin/CounselorMgmt'));
const CareerMgmt = lazy(() => import('../pages/admin/CareerMgmt'));
const AssessmentMgmt = lazy(() => import('../pages/admin/AssessmentMgmt'));
const CourseMgmt = lazy(() => import('../pages/admin/CourseMgmt'));
const RoadmapMgmt = lazy(() => import('../pages/admin/RoadmapMgmt'));
const JobMgmt = lazy(() => import('../pages/admin/JobMgmt'));
const AIMgmt = lazy(() => import('../pages/admin/AIMgmt'));
const FileMgmt = lazy(() => import('../pages/admin/FileMgmt'));
const NotificationCenter = lazy(() => import('../pages/admin/NotificationCenter'));
const Reports = lazy(() => import('../pages/admin/Reports'));
const AdminAnalytics = lazy(() => import('../pages/admin/Analytics'));
const AuditLogs = lazy(() => import('../pages/admin/AuditLogs'));
const SystemSettings = lazy(() => import('../pages/admin/SystemSettings'));

// ── Error Pages ────────────────────────────────────
const NotFound404 = lazy(() => import('../pages/errors/NotFound404'));
const Forbidden403 = lazy(() => import('../pages/errors/Forbidden403'));
const ServerError500 = lazy(() => import('../pages/errors/ServerError500'));

const AppRoutes = () => {
  const { user } = useSelector((s) => s.auth);
  const role = user?.role;

  // Default redirect based on role
  const defaultRedirect = () => {
    if (role === 'counselor') return '/counselor/dashboard';
    if (role === 'admin') return '/admin/dashboard';
    return '/student/dashboard';
  };

  return (
    <Suspense fallback={<PageSpinner />}>
      <Routes>

        {/* ── Public Landing ── */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
        </Route>

        {/* ── Auth ── */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* ── Root redirect ── */}
        <Route path="/dashboard" element={<Navigate to={defaultRedirect()} replace />} />

        {/* ── Student Portal ── */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleBasedRoute allowedRoles={['student']} />}>
            <Route element={<StudentDashboardLayout />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/profile" element={<StudentProfile />} />
              <Route path="/student/edit-profile" element={<EditProfile />} />
              <Route path="/student/education" element={<Education />} />
              <Route path="/student/skills" element={<Skills />} />
              <Route path="/student/career-assessment" element={<CareerAssessment />} />
              <Route path="/student/assessment-history" element={<AssessmentHistory />} />
              <Route path="/student/career-recommendation" element={<CareerRecommendation />} />
              <Route path="/student/career-roadmap" element={<CareerRoadmap />} />
              <Route path="/student/learning-dashboard" element={<LearningDashboard />} />
              <Route path="/student/courses" element={<Courses />} />
              <Route path="/student/job-portal" element={<JobPortal />} />
              <Route path="/student/resume-builder" element={<ResumeBuilder />} />
              <Route path="/student/ai-career-assistant" element={<AICareerAssistant />} />
              <Route path="/student/ai-resume-analyzer" element={<AIResumeAnalyzer />} />
              <Route path="/student/ai-interview-prep" element={<AIInterviewPrep />} />
              <Route path="/student/counselor-booking" element={<CounselorBooking />} />
              <Route path="/student/messages" element={<StudentMessages />} />
              <Route path="/student/notifications" element={<StudentNotifications />} />
              <Route path="/student/analytics" element={<StudentAnalytics />} />
              <Route path="/student/settings" element={<StudentSettings />} />
            </Route>
          </Route>
        </Route>

        {/* ── Counselor Portal ── */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleBasedRoute allowedRoles={['counselor']} />}>
            <Route element={<CounselorDashboardLayout />}>
              <Route path="/counselor/dashboard" element={<CounselorDashboard />} />
              <Route path="/counselor/profile" element={<CounselorProfile />} />
              <Route path="/counselor/student-requests" element={<StudentRequests />} />
              <Route path="/counselor/assigned-students" element={<AssignedStudents />} />
              <Route path="/counselor/student/:id" element={<StudentDetails />} />
              <Route path="/counselor/assessment-reports" element={<AssessmentReports />} />
              <Route path="/counselor/career-suggestions" element={<CareerSuggestions />} />
              <Route path="/counselor/session-calendar" element={<SessionCalendar />} />
              <Route path="/counselor/video-sessions" element={<VideoSessions />} />
              <Route path="/counselor/messages" element={<CounselorMessages />} />
              <Route path="/counselor/learning-resources" element={<LearningResources />} />
              <Route path="/counselor/upload-materials" element={<UploadMaterials />} />
              <Route path="/counselor/notifications" element={<CounselorNotifications />} />
              <Route path="/counselor/analytics" element={<CounselorAnalytics />} />
              <Route path="/counselor/earnings" element={<CounselorEarnings />} />
              <Route path="/counselor/settings" element={<CounselorSettings />} />
            </Route>
          </Route>
        </Route>

        {/* ── Admin Portal ── */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleBasedRoute allowedRoles={['admin']} />}>
            <Route element={<AdminDashboardLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/user-management" element={<UserMgmt />} />
              <Route path="/admin/student-management" element={<StudentMgmt />} />
              <Route path="/admin/counselor-management" element={<CounselorMgmt />} />
              <Route path="/admin/career-management" element={<CareerMgmt />} />
              <Route path="/admin/assessment-management" element={<AssessmentMgmt />} />
              <Route path="/admin/course-management" element={<CourseMgmt />} />
              <Route path="/admin/roadmap-management" element={<RoadmapMgmt />} />
              <Route path="/admin/job-management" element={<JobMgmt />} />
              <Route path="/admin/ai-management" element={<AIMgmt />} />
              <Route path="/admin/file-management" element={<FileMgmt />} />
              <Route path="/admin/notification-center" element={<NotificationCenter />} />
              <Route path="/admin/reports" element={<Reports />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/audit-logs" element={<AuditLogs />} />
              <Route path="/admin/system-settings" element={<SystemSettings />} />
            </Route>
          </Route>
        </Route>

        {/* ── Error Pages ── */}
        <Route path="/403" element={<Forbidden403 />} />
        <Route path="/500" element={<ServerError500 />} />
        <Route path="*" element={<NotFound404 />} />

      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
