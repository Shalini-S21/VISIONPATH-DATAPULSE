import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { KeyRound, ShieldCheck } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { changeRole } = useAuth();
  
  const targetEmail = location.state?.email || 'alex.rivera@visionpath.edu';
  const role = location.state?.role || 'student';
  const [otp, setOtp] = useState(['5', '8', '2', '9', '4', '1']);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      changeRole(role);
      toast.success('Security OTP Verified successfully!');

      if (role === 'counselor') navigate('/counselor/dashboard');
      else if (role === 'admin') navigate('/admin/dashboard');
      else navigate('/student/dashboard');
    }, 800);
  };

  return (
    <div className="space-y-6 text-center">
      <div className="inline-flex p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
        <KeyRound className="w-8 h-8" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Verify Security OTP</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          We sent a 6-digit verification code to <span className="font-semibold text-gray-800 dark:text-gray-200">{targetEmail}</span>
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        <div className="flex justify-center gap-2 sm:gap-3">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              className="w-11 h-12 text-center text-lg font-bold rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          ))}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isLoading}
          icon={ShieldCheck}
        >
          Verify Code & Access Portal
        </Button>
      </form>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Didn't receive the code?{' '}
        <button
          onClick={() => toast.success('New OTP re-sent to your inbox!')}
          className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          Resend Code
        </button>
      </p>
    </div>
  );
};

export default OTPVerification;
