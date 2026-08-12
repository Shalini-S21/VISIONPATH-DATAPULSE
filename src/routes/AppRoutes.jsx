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

// ── Auth Pages (Service 01 Auth Service) ───────────
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));

// ── Student Pages (Services 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 13) ──
const StudentDashboard = lazy(() => import('../pages/student/Dashboard'));
const StudentProfile = lazy(() => import('../pages/student/MyProfile'));
const EditProfile = lazy(() => import('../pages/student/EditProfile'));
const Education = lazy(() => import('../pages/student/Education'));
const Skills = lazy(() => import('../pages/student/Skills'));
const CareerAssessment = lazy(() => import('../pages/student/CareerAssessment'));
const AssessmentHistory = lazy(() => import('../pages/student/AssessmentHistory'));
const CareerRecommendation = lazy(() => import('../pages/student/CareerRecommendation'));
const CareerRoadmap = lazy(() => import('../pages/student/CareerRoadmap'));
const Courses = lazy(() => import('../pages/student/Courses'));
const JobPortal = lazy(() => import('../pages/student/JobPortal'));
const AICareerAssistant = lazy(() => import('../pages/student/AICareerAssistant'));
const AIResumeAnalyzer = lazy(() => import('../pages/student/AIResumeAnalyzer'));
const CounselorBooking = lazy(() => import('../pages/student/CounselorBooking'));
const StudentNotifications = lazy(() => import('../pages/student/Notifications'));
const StudentSettings = lazy(() => import('../pages/student/Settings'));

// ── Counselor Pages (Services 01, 10, 11) ──────────
const CounselorDashboard = lazy(() => import('../pages/counselor/Dashboard'));
const CounselorProfile = lazy(() => import('../pages/counselor/Profile'));
const StudentRequests = lazy(() => import('../pages/counselor/StudentRequests'));
const AssignedStudents = lazy(() => import('../pages/counselor/AssignedStudents'));
const StudentDetails = lazy(() => import('../pages/counselor/StudentDetails'));
const CounselorNotifications = lazy(() => import('../pages/counselor/Notifications'));

// ── Admin Pages (Services 01, 02, 03, 04, 05, 06, 10, 11, 12) ──
const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));
const UserMgmt = lazy(() => import('../pages/admin/UserMgmt'));
const StudentMgmt = lazy(() => import('../pages/admin/StudentMgmt'));
const CounselorMgmt = lazy(() => import('../pages/admin/CounselorMgmt'));
const CareerMgmt = lazy(() => import('../pages/admin/CareerMgmt'));
const AssessmentMgmt = lazy(() => import('../pages/admin/AssessmentMgmt'));
const CourseMgmt = lazy(() => import('../pages/admin/CourseMgmt'));
const JobMgmt = lazy(() => import('../pages/admin/JobMgmt'));
const NotificationCenter = lazy(() => import('../pages/admin/NotificationCenter'));

// ── Error Pages ────────────────────────────────────
const NotFound404 = lazy(() => import('../pages/errors/NotFound404'));
const Forbidden403 = lazy(() => import('../pages/errors/Forbidden403'));
const ServerError500 = lazy(() => import('../pages/errors/ServerError500'));

const AppRoutes = () => {
  const { user } = useSelector((s) => s.auth);
  const role = user?.role;

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

        {/* ── Auth Service (01) ── */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* ── Root redirect ── */}
        <Route path="/dashboard" element={<Navigate to={defaultRedirect()} replace />} />

        {/* ── Student Portal (Microservices 01-13) ── */}
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
              <Route path="/student/courses" element={<Courses />} />
              <Route path="/student/job-portal" element={<JobPortal />} />
              <Route path="/student/ai-career-assistant" element={<AICareerAssistant />} />
              <Route path="/student/ai-resume-analyzer" element={<AIResumeAnalyzer />} />
              <Route path="/student/counselor-booking" element={<CounselorBooking />} />
              <Route path="/student/notifications" element={<StudentNotifications />} />
              <Route path="/student/settings" element={<StudentSettings />} />
            </Route>
          </Route>
        </Route>

        {/* ── Counselor Portal (Microservices 01, 10, 11) ── */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleBasedRoute allowedRoles={['counselor']} />}>
            <Route element={<CounselorDashboardLayout />}>
              <Route path="/counselor/dashboard" element={<CounselorDashboard />} />
              <Route path="/counselor/profile" element={<CounselorProfile />} />
              <Route path="/counselor/student-requests" element={<StudentRequests />} />
              <Route path="/counselor/assigned-students" element={<AssignedStudents />} />
              <Route path="/counselor/student/:id" element={<StudentDetails />} />
              <Route path="/counselor/notifications" element={<CounselorNotifications />} />
            </Route>
          </Route>
        </Route>

        {/* ── Admin Portal (Microservices 01, 02, 03, 04, 05, 06, 10, 11, 12) ── */}
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
              <Route path="/admin/job-management" element={<JobMgmt />} />
              <Route path="/admin/notification-center" element={<NotificationCenter />} />
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
