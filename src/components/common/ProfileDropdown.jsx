import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { User, LogOut, Settings, Shield, GraduationCap, UserCheck, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

export const ProfileDropdown = () => {
  const { user, logout, changeRole, role } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSwitch = (newRole) => {
    changeRole(newRole);
    setIsOpen(false);
    toast.success(`Switched active role to ${newRole.toUpperCase()}`);
    if (newRole === 'student') navigate('/student/dashboard');
    else if (newRole === 'counselor') navigate('/counselor/dashboard');
    else if (newRole === 'admin') navigate('/admin/dashboard');
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const profilePath = role === 'student' ? '/student/profile' : role === 'counselor' ? '/counselor/profile' : '/admin/dashboard';
  const settingsPath = role === 'student' ? '/student/settings' : role === 'counselor' ? '/counselor/settings' : '/admin/settings';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
      >
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
          alt={user?.name || 'User Avatar'}
          className="w-9 h-9 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
        />
        <div className="hidden md:block text-left">
          <p className="text-xs font-semibold text-gray-900 dark:text-white leading-tight">{user?.name}</p>
          <span className="text-[10px] font-medium capitalize px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
            {role}
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
          </div>

          {/* Quick Role Switcher Banner */}
          <div className="px-3 py-2 bg-gray-50 dark:bg-slate-800/60 my-1 mx-2 rounded-xl border border-gray-100 dark:border-slate-800">
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-1.5">
              Role Switcher (Demo)
            </p>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => handleRoleSwitch('student')}
                className={`py-1 text-[11px] font-medium rounded-lg transition-colors flex items-center justify-center gap-1 ${
                  role === 'student'
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                }`}
              >
                <GraduationCap className="w-3 h-3" /> Student
              </button>
              <button
                onClick={() => handleRoleSwitch('counselor')}
                className={`py-1 text-[11px] font-medium rounded-lg transition-colors flex items-center justify-center gap-1 ${
                  role === 'counselor'
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                }`}
              >
                <UserCheck className="w-3 h-3" /> Counselor
              </button>
              <button
                onClick={() => handleRoleSwitch('admin')}
                className={`py-1 text-[11px] font-medium rounded-lg transition-colors flex items-center justify-center gap-1 ${
                  role === 'admin'
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                }`}
              >
                <Shield className="w-3 h-3" /> Admin
              </button>
            </div>
          </div>

          <div className="py-1">
            <Link
              to={profilePath}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              <User className="w-4 h-4 text-emerald-600" />
              <span>My Profile</span>
            </Link>
            <Link
              to={settingsPath}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Settings className="w-4 h-4 text-emerald-600" />
              <span>Settings</span>
            </Link>
          </div>

          <div className="border-t border-gray-100 dark:border-slate-800 pt-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
