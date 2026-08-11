import React from 'react';
import { Map, FileCheck, Video, BookOpen, Briefcase, Users, Bot, Sparkles } from 'lucide-react';

export const Features = () => {
  const featureList = [
    {
      icon: Map,
      title: 'Adaptive Learning Roadmaps',
      desc: 'Interactive visual timelines dynamically updated as you complete modules, skill assessments, and coding projects.'
    },
    {
      icon: FileCheck,
      title: 'Smart ATS Resume Scoring',
      desc: 'Instant keyword matching, formatting check, and bullet point enhancer optimized for enterprise HR portals.'
    },
    {
      icon: Video,
      title: 'AI & Counselor Mock Interviews',
      desc: 'Voice & text interactive interview simulator evaluating technical correctness, system design depth, and communication skills.'
    },
    {
      icon: Bot,
      title: '24/7 AI Career Assistant',
      desc: 'Ask career questions, get salary benchmarks, inspect job posting requirements, and generate tailored cover letters instantly.'
    },
    {
      icon: BookOpen,
      title: 'Rich Course & Skill Library',
      desc: 'Over 120+ structured courses covering React 19, System Architecture, LangChain AI, Cloud Infrastructure, and UI/UX.'
    },
    {
      icon: Briefcase,
      title: 'Integrated Tech Job Portal',
      desc: 'Apply directly to verified hiring partner companies matching your active roadmap progress score.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Platform Capabilities
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Engineered For Production Career Acceleration
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300">
          Discover the complete suite of AI engines, mentorship tools, and learning catalog designed to give job seekers an unfair advantage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featureList.map((f, idx) => {
          const Icon = f.icon;
          return (
            <div key={idx} className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 space-y-4">
              <div className="p-3 rounded-2xl bg-emerald-600 text-white w-fit shadow-md shadow-emerald-600/20">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{f.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
