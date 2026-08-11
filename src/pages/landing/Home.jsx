import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Award,
  Users,
  CheckCircle,
  Play,
  TrendingUp,
  Map,
  BookOpen,
  Briefcase,
  FileCheck,
  Video,
  Star
} from 'lucide-react';
import Button from '../../components/ui/Button';

export const Home = () => {
  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>VisionPath AI v2.4 Platform Release</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1]"
          >
            Your AI-Powered Career <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
              Roadmap & Learning Engine
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Seamlessly bridge academic learning and high-paying tech careers. Assess skills with AI, follow custom roadmaps, build ATS-optimized resumes, and practice live mock interviews.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Link to="/register">
              <Button variant="primary" size="lg" icon={ArrowRight} className="shadow-lg shadow-emerald-600/30">
                Start Free Assessment
              </Button>
            </Link>
            <Link to="/features">
              <Button variant="outline" size="lg" icon={Play}>
                Explore Interactive Demo
              </Button>
            </Link>
          </motion.div>

          {/* Social Proof */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['1534528741775-53994a69daeb', '1573496359142-b8d87734a5a2', '1507003211169-0a1dd7228f2d'].map((id, i) => (
                  <img
                    key={i}
                    src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=100&q=80`}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                  />
                ))}
              </div>
              <span className="font-semibold text-gray-800 dark:text-gray-200">14,000+ Active Students</span>
            </div>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="ml-1 text-gray-700 dark:text-gray-300 font-semibold">4.9/5 Rating</span>
            </div>
          </div>
        </div>

        {/* Dashboard Mockup Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 relative rounded-3xl bg-slate-900 border border-slate-800 p-4 sm:p-6 shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="ml-2 font-mono text-slate-400 hidden sm:inline">visionpath.edu/student/dashboard</span>
            </div>
            <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-semibold text-[10px]">
              LIVE SIMULATION
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between text-emerald-400">
                <Map className="w-5 h-5" />
                <span className="text-xs font-mono font-bold">68% Complete</span>
              </div>
              <h4 className="text-base font-bold text-white">Full Stack AI Developer</h4>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full w-[68%]" />
              </div>
              <p className="text-xs text-slate-400">Next Milestone: System Architecture & Vector DBs</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between text-sky-400">
                <FileCheck className="w-5 h-5" />
                <span className="text-xs font-mono font-bold">ATS Score: 88/100</span>
              </div>
              <h4 className="text-base font-bold text-white">Senior Frontend Resume Audit</h4>
              <p className="text-xs text-slate-400">High match rate for Vercel, Stripe, and Google roles.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between text-amber-400">
                <Video className="w-5 h-5" />
                <span className="text-xs font-mono font-bold">Session Tomorrow</span>
              </div>
              <h4 className="text-base font-bold text-white">Dr. Sarah Jenkins Call</h4>
              <p className="text-xs text-slate-400">System Design & FAANG Interview Strategy</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            End-To-End Career Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Everything you need to land top tech roles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Map,
              title: 'Dynamic AI Career Roadmaps',
              desc: 'Personalized step-by-step learning modules tailored to market demands and your unique skill gap results.'
            },
            {
              icon: FileCheck,
              title: 'AI Resume & ATS Optimizer',
              desc: 'Scan your resume against job postings to receive instant bullet point suggestions and keyword density fixes.'
            },
            {
              icon: Video,
              title: 'AI & Counselor Mock Interviews',
              desc: 'Practice technical & system design interview scenarios with real-time feedback and video session booking.'
            },
            {
              icon: BookOpen,
              title: 'Curated Course Library',
              desc: 'Access hands-on courses taught by top engineering architects from Google, Stanford, and OpenAI.'
            },
            {
              icon: Briefcase,
              title: 'Curated Tech Job Portal',
              desc: 'Direct applications to high-growth tech companies matching your active roadmap skill completion level.'
            },
            {
              icon: Users,
              title: '1-on-1 Certified Mentorship',
              desc: 'Book strategy sessions with verified industry experts, senior staff engineers, and hiring managers.'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-gray-200/80 dark:border-slate-700/60 hover:border-emerald-500/50 transition-all duration-300 space-y-4 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-[#14532D] via-emerald-800 to-slate-950 p-10 sm:p-16 text-white text-center space-y-6 relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
            Ready to chart your path to a high-paying tech career?
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 max-w-xl mx-auto">
            Join thousands of university students and engineers advancing their careers on VisionPath.
          </p>
          <div className="pt-2">
            <Link to="/register">
              <Button variant="primary" size="lg" icon={ArrowRight} className="bg-white text-emerald-950 hover:bg-emerald-50 font-bold px-8 py-3.5">
                Create Free Account Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
