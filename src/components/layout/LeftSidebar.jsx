import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  Compass,
  LayoutDashboard,
  User,
  GraduationCap,
  Award,
  TrendingUp,
  Map,
  BookOpen,
  Briefcase,
  FileText,
  Bot,
  Sparkles,
  Video,
  Calendar,
  MessageSquare,
  Bell,
  BarChart3,
  Settings,
  Users,
  UserCheck,
  Shield,
  Layers,
  FileCheck,
  FolderOpen,
  ScrollText,
  LogOut,
  HelpCircle,
  Clock,
  DollarSign
} from 'lucide-react';

export const LeftSidebar = ({ isMobileOpen, onCloseMobile }) => {
  const { role, logout } = useAuth();

  const studentNavItems = [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/student/profile', icon: User },
    { label: 'Education', path: '/student/education', icon: GraduationCap },
    { label: 'Skills', path: '/student/skills', icon: Award },
    { label: 'Career Assessment', path: '/student/career-assessment', icon: Sparkles },
    { label: 'Assessment History', path: '/student/assessment-history', icon: Clock },
    { label: 'Recommendations', path: '/student/career-recommendation', icon: TrendingUp },
    { label: 'Career Roadmap', path: '/student/career-roadmap', icon: Map },
    { label: 'Learning Dashboard', path: '/student/learning-dashboard', icon: BookOpen },
    { label: 'Courses Catalog', path: '/student/courses', icon: Layers },
    { label: 'Job Portal', path: '/student/job-portal', icon: Briefcase },
    { label: 'Resume Builder', path: '/student/resume-builder', icon: FileText },
    { label: 'AI Career Assistant', path: '/student/ai-career-assistant', icon: Bot },
    { label: 'AI Resume Analyzer', path: '/student/ai-resume-analyzer', icon: FileCheck },
    { label: 'AI Interview Prep', path: '/student/ai-interview-prep', icon: Video },
    { label: 'Book Counselor', path: '/student/counselor-booking', icon: Calendar },
    { label: 'Messages', path: '/student/messages', icon: MessageSquare },
    { label: 'Notifications', path: '/student/notifications', icon: Bell },
    { label: 'Analytics', path: '/student/analytics', icon: BarChart3 },
    { label: 'Settings', path: '/student/settings', icon: Settings },
  ];

  const counselorNavItems = [
    { label: 'Dashboard', path: '/counselor/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/counselor/profile', icon: User },
    { label: 'Student Requests', path: '/counselor/student-requests', icon: Users },
    { label: 'Assigned Students', path: '/counselor/assigned-students', icon: UserCheck },
    { label: 'Assessment Reports', path: '/counselor/assessment-reports', icon: ScrollText },
    { label: 'Career Suggestions', path: '/counselor/career-suggestions', icon: Sparkles },
    { label: 'Session Calendar', path: '/counselor/session-calendar', icon: Calendar },
    { label: 'Video Sessions', path: '/counselor/video-sessions', icon: Video },
    { label: 'Messages', path: '/counselor/messages', icon: MessageSquare },
    { label: 'Learning Resources', path: '/counselor/learning-resources', icon: BookOpen },
    { label: 'Upload Materials', path: '/counselor/upload-materials', icon: FolderOpen },
    { label: 'Notifications', path: '/counselor/notifications', icon: Bell },
    { label: 'Analytics', path: '/counselor/analytics', icon: BarChart3 },
    { label: 'Earnings', path: '/counselor/earnings', icon: DollarSign },
    { label: 'Settings', path: '/counselor/settings', icon: Settings },
  ];

  const adminNavItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'User Management', path: '/admin/user-management', icon: Users },
    { label: 'Student Directory', path: '/admin/student-management', icon: GraduationCap },
    { label: 'Counselor Roster', path: '/admin/counselor-management', icon: UserCheck },
    { label: 'Career Catalogs', path: '/admin/career-management', icon: Compass },
    { label: 'Assessments Studio', path: '/admin/assessment-management', icon: Sparkles },
    { label: 'Course Studio', path: '/admin/course-management', icon: BookOpen },
    { label: 'Roadmap Builder', path: '/admin/roadmap-management', icon: Map },
    { label: 'Job Listings', path: '/admin/job-management', icon: Briefcase },
    { label: 'AI Models Config', path: '/admin/ai-management', icon: Bot },
    { label: 'File Library', path: '/admin/file-management', icon: FolderOpen },
    { label: 'Notification Center', path: '/admin/notification-center', icon: Bell },
    { label: 'System Reports', path: '/admin/reports', icon: ScrollText },
    { label: 'Platform Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Audit Logs', path: '/admin/audit-logs', icon: Shield },
    { label: 'System Settings', path: '/admin/system-settings', icon: Settings },
  ];

  const items = role === 'counselor' ? counselorNavItems : role === 'admin' ? adminNavItems : studentNavItems;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#14532D] text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-emerald-800/60">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-emerald-900/50 shadow-lg">
              <Compass className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-white leading-none">
                Vision<span className="text-emerald-400">Path</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-emerald-300 uppercase mt-0.5">
                {role} Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items Scroll Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={idx}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 font-bold'
                      : 'text-emerald-100 hover:bg-emerald-800/50 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-emerald-800/60 bg-emerald-950/40">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-emerald-200 hover:bg-emerald-800/60 hover:text-white rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4 text-emerald-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default LeftSidebar;
