import React from 'react';
import { Compass, Award, Users, Target, ShieldCheck, HeartHandshake } from 'lucide-react';

export const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          About VisionPath
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Democratizing Elite Career Guidance For Everyone
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          Founded by engineering leaders and university educators, VisionPath delivers AI-powered career assessment, personalized roadmaps, and direct 1-on-1 mentorship to students and job seekers globally.
        </p>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 space-y-4">
          <div className="p-3 rounded-2xl bg-emerald-600 text-white w-fit">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Data-Driven Alignment</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            Our career models are calibrated against real-time hiring metrics from tech companies to ensure your learning directly maps to in-demand skills.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 space-y-4">
          <div className="p-3 rounded-2xl bg-emerald-600 text-white w-fit">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Human + AI Mentorship</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            We pair instant AI feedback with certified human career strategists for optimal growth, resume auditing, and live interview prep.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 space-y-4">
          <div className="p-3 rounded-2xl bg-emerald-600 text-white w-fit">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Institutional Rigor</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            Partnered with top tier universities and tech learning networks to provide accredited certifications and job placement channels.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
