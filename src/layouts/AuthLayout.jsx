import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Compass, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import ThemeToggle from '../components/common/ThemeToggle';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-slate-900 transition-colors">
      {/* Left Brand Showcase Banner */}
      <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#14532D] via-emerald-900 to-slate-950 p-12 text-white flex-col justify-between relative overflow-hidden">
        {/* Decorative blur elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500 text-white shadow-xl">
              <Compass className="w-7 h-7" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              Vision<span className="text-emerald-400">Path</span>
            </span>
          </Link>
        </div>

        <div className="relative z-10 space-y-6 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold backdrop-blur-sm border border-emerald-400/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Driven Career Ecosystem</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Accelerate your tech career with personalized AI roadmaps & elite mentorship.
          </h1>

          <div className="space-y-3 pt-2">
            {[
              'Personalized Skill Gap & Assessment Analytics',
              'Real-Time ATS Resume Analyzer & Scorecard',
              'Direct 1-on-1 Sessions with Fortune 500 Mentors',
              'AI Mock Interview Simulator with Live Feedback'
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs font-medium text-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between pt-6 border-t border-emerald-800/60 text-xs text-emerald-300">
          <span>Trusted by 14,000+ Students & Professionals</span>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" /> 256-Bit Encrypted
          </div>
        </div>
      </div>

      {/* Right Form Container */}
      <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <div className="p-1.5 rounded-xl bg-emerald-600 text-white">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-lg font-black text-gray-900 dark:text-white">
              Vision<span className="text-emerald-600">Path</span>
            </span>
          </Link>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        <div className="w-full max-w-md mx-auto my-auto py-8">
          <Outlet />
        </div>

        <div className="text-center text-xs text-gray-400 dark:text-gray-500">
          Protected by VisionPath Enterprise Security • © 2026 VisionPath Inc.
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
