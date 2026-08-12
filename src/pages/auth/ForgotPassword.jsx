import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

import authService from '../../services/authService';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await authService.forgotPassword({ email });
      const msg = res?.data?.message || 'If an account with that email exists, a password reset link has been sent.';
      toast.success(msg);
      navigate('/reset-password', { state: { email } });
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Password reset request failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Forgot Password?</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Enter your registered email address to receive a password reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Registered Email Address"
          type="email"
          icon={Mail}
          placeholder="alex@visionpath.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={isLoading}
          icon={Send}
        >
          Send Reset Instructions
        </Button>
      </form>

      <div className="text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-emerald-600"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
