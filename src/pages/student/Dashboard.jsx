import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Compass,
  BookOpen,
  Award,
  Calendar,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Map,
  CheckCircle2,
  FileCheck,
  Video
} from 'lucide-react';
import StatCard from '../../components/cards/StatCard';
import { AreaChartWidget, BarChartWidget } from '../../components/charts/ChartWidgets';
import Button from '../../components/ui/Button';

export const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { activeRoadmap, enrolledCourses, assessments, resumeData } = useSelector((state) => state.student);

  const learningActivityData = [
    { name: 'Mon', value: 2.5 },
    { name: 'Tue', value: 4.0 },
    { name: 'Wed', value: 1.5 },
    { name: 'Thu', value: 5.0 },
    { name: 'Fri', value: 3.5 },
    { name: 'Sat', value: 6.0 },
    { name: 'Sun', value: 4.2 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#14532D] via-emerald-800 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold backdrop-blur-sm border border-emerald-400/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Target Role: {resumeData.targetRole}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100">
            You are on track! Complete your next module in <span className="font-bold underline">{activeRoadmap.title}</span> to reach 75% completion.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <Link to="/student/career-roadmap">
            <Button variant="primary" size="md" icon={Map} className="bg-white text-emerald-950 hover:bg-emerald-50 font-bold">
              View Roadmap
            </Button>
          </Link>
          <Link to="/student/ai-career-assistant">
            <Button variant="outline" size="md" icon={Sparkles} className="border-emerald-300 text-emerald-100 hover:bg-emerald-800/40">
              Ask AI Assistant
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Active Roadmap Progress"
          value={`${activeRoadmap.completionRate}%`}
          change="+12%"
          isIncrease={true}
          icon={Map}
          description={`${activeRoadmap.completedModules} of ${activeRoadmap.totalModules} modules finished`}
        />
        <StatCard
          title="Enrolled Courses"
          value={enrolledCourses.length}
          change="+2 new"
          isIncrease={true}
          icon={BookOpen}
          description="3 in-progress courses"
        />
        <StatCard
          title="ATS Resume Score"
          value={`${resumeData.atsScore}/100`}
          change="Strong"
          isIncrease={true}
          icon={FileCheck}
          description={`Targeting ${resumeData.targetRole}`}
        />
        <StatCard
          title="Assessments Passed"
          value={assessments.length}
          change="91% Avg"
          isIncrease={true}
          icon={Award}
          description="Top percentile in React Architecture"
        />
      </div>

      {/* Middle Section: Active Roadmap & Learning Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Roadmap Progress */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-600" />
                Active Learning Roadmap
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{activeRoadmap.title}</p>
            </div>
            <Link to="/student/career-roadmap" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              Full Roadmap &rarr;
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-gray-700 dark:text-gray-300">Overall Completion</span>
              <span className="text-emerald-600 dark:text-emerald-400">{activeRoadmap.completionRate}%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-3">
              <div
                className="bg-emerald-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${activeRoadmap.completionRate}%` }}
              />
            </div>
          </div>

          {/* Timeline Milestones list */}
          <div className="space-y-3 pt-2">
            {activeRoadmap.steps.slice(0, 4).map((step) => (
              <div
                key={step.id}
                className="p-3.5 rounded-2xl bg-gray-50/80 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      step.status === 'completed'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : step.status === 'in-progress'
                        ? 'text-amber-500 animate-pulse'
                        : 'text-gray-300 dark:text-slate-700'
                    }`}
                  />
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{step.title}</span>
                </div>
                <span className="text-[10px] font-semibold text-gray-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-lg border border-gray-100 dark:border-slate-800">
                  {step.duration}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Study Activity Chart */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Weekly Study Hours
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">26.7 hours completed this week</p>
          </div>

          <AreaChartWidget data={learningActivityData} height={240} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
