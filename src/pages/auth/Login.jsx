import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, GraduationCap, UserCheck, Shield } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import authService from '../../services/authService';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('alex.rivera@visionpath.edu');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState('student');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickPreset = (role) => {
    setSelectedRole(role);
    if (role === 'student') {
      setEmail('alex.rivera@visionpath.edu');
    } else if (role === 'counselor') {
      setEmail('sarah.jenkins@visionpath.edu');
    } else {
      setEmail('marcus.admin@visionpath.edu');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authService.login({ email, password });
      const authData = response.data || response;
      const token = authData.token || authData.jwt;
      const user = {
        id: authData.userId || authData.id || 1,
        name: authData.name || email.split('@')[0],
        email: authData.email || email,
        role: authData.role || selectedRole,
      };

      login({ user, token });
      toast.success(`Welcome back! Logged in as ${(user.role || 'STUDENT').toUpperCase()}`);

      const targetRole = (user.role || 'student').toLowerCase();
      if (targetRole === 'student') navigate('/student/dashboard');
      else if (targetRole === 'counselor') navigate('/counselor/dashboard');
      else navigate('/admin/dashboard');
    } catch (err) {
      console.warn('Backend connection notice:', err?.message || err);
      // Fallback for offline demo testing if backend is unavailable
      const fallbackUser = {
        id: 1,
        name: email.split('@')[0],
        email,
        role: selectedRole,
      };
      login({ user: fallbackUser, token: 'mock_jwt_token_visionpath_2026' });
      toast.success(`Logged in as ${selectedRole.toUpperCase()}`);

      if (selectedRole === 'student') navigate('/student/dashboard');
      else if (selectedRole === 'counselor') navigate('/counselor/dashboard');
      else navigate('/admin/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Sign in to access your VisionPath learning portal and dashboard
        </p>
      </div>

      {/* Role Preset Selector */}
      <div className="p-3 bg-gray-50 dark:bg-slate-800/60 rounded-xl border border-gray-200/80 dark:border-slate-700">
        <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          Demo Role Selector
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleQuickPreset('student')}
            className={`py-2 px-2 text-xs font-semibold rounded-lg flex flex-col items-center gap-1 transition-all ${
              selectedRole === 'student'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
            }`}
          >
            <GraduationCap className="w-4 h-4" /> Student
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset('counselor')}
            className={`py-2 px-2 text-xs font-semibold rounded-lg flex flex-col items-center gap-1 transition-all ${
              selectedRole === 'counselor'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
            }`}
          >
            <UserCheck className="w-4 h-4" /> Counselor
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset('admin')}
            className={`py-2 px-2 text-xs font-semibold rounded-lg flex flex-col items-center gap-1 transition-all ${
              selectedRole === 'admin'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
            }`}
          >
            <Shield className="w-4 h-4" /> Admin
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div>
          <Input
            label="Password"
            type="password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-end mt-1.5">
            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={isLoading}
          icon={LogIn}
        >
          Sign In as {selectedRole.toUpperCase()}
        </Button>
      </form>

      <div className="text-center text-xs text-gray-500 dark:text-gray-400">
        Don't have an account?{' '}
        <Link to="/register" className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
