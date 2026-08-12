import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, CheckCircle } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

import { useSearchParams } from 'react-router-dom';
import authService from '../../services/authService';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(searchParams.get('token') || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!token) {
      toast.error('Reset token is required');
      return;
    }
    setIsLoading(true);

    try {
      const res = await authService.resetPassword({ token, newPassword: password });
      const msg = res?.data?.message || 'Password updated successfully! Please log in.';
      toast.success(msg);
      navigate('/login');
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Reset password failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reset Account Password</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Create a new secure password for your VisionPath account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Reset Token"
          type="text"
          placeholder="Paste security reset token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />

        <Input
          label="New Password"
          type="password"
          icon={Lock}
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Input
          label="Confirm New Password"
          type="password"
          icon={Lock}
          placeholder="Repeat new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={isLoading}
          icon={CheckCircle}
        >
          Update Password & Sign In
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
