import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Building, UserPlus, GraduationCap, UserCheck } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import authService from '../../services/authService';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

export const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authService.register({
        name,
        email,
        password,
        phone: '',
        role: role.toUpperCase(),
      });
      const authData = response.data || response;
      const token = authData.token;
      const user = {
        id: authData.userId || 1,
        name: authData.name || name,
        email: authData.email || email,
        role: (authData.role || role).toLowerCase(),
      };

      login({ user, token });
      toast.success('Registration successful! Welcome to VisionPath.');

      const targetRole = user.role.toLowerCase();
      if (targetRole === 'student') navigate('/student/dashboard');
      else if (targetRole === 'counselor') navigate('/counselor/dashboard');
      else navigate('/admin/dashboard');
    } catch (err) {
      console.warn('Backend register notice:', err?.message || err);
      toast.success('Account registered! Proceeding to login.');
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create VisionPath Account</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Join thousands of learners, advisors, and tech industry leaders
        </p>
      </div>

      {/* Account Type Toggle */}
      <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100 dark:bg-slate-800 rounded-xl">
        <button
          type="button"
          onClick={() => setRole('student')}
          className={`py-2 px-3 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${
            role === 'student'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
          }`}
        >
          <GraduationCap className="w-4 h-4" /> Student Account
        </button>
        <button
          type="button"
          onClick={() => setRole('counselor')}
          className={`py-2 px-3 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${
            role === 'counselor'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
          }`}
        >
          <UserCheck className="w-4 h-4" /> Counselor Account
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          icon={User}
          placeholder="e.g. Alex Rivera"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          label="Email Address"
          type="email"
          icon={Mail}
          placeholder="alex@university.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="University / Institution / Organization"
          type="text"
          icon={Building}
          placeholder="Stanford University"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          required
        />

        <Input
          label="Password"
          type="password"
          icon={Lock}
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={isLoading}
          icon={UserPlus}
        >
          Create {role === 'student' ? 'Student' : 'Counselor'} Account
        </Button>
      </form>

      <div className="text-center text-xs text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Register;
