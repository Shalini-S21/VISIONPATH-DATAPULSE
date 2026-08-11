import React from 'react';
import { BarChart3, TrendingUp, BookOpen, Award } from 'lucide-react';
import StatCard from '../../components/cards/StatCard';
import { AreaChartWidget, BarChartWidget, PieChartWidget } from '../../components/charts/ChartWidgets';

export const Analytics = () => {
  const weeklyHours = [
    { name: 'Week 1', value: 14 },
    { name: 'Week 2', value: 19 },
    { name: 'Week 3', value: 24 },
    { name: 'Week 4', value: 28 },
  ];

  const skillDistribution = [
    { name: 'React 19', value: 35 },
    { name: 'System Design', value: 25 },
    { name: 'LangChain AI', value: 20 },
    { name: 'Node.js', value: 20 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-emerald-600" />
          Learning Analytics & Skill Growth
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Quantitative tracking of study hours, quiz scores, and roadmap velocity
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard title="Total Study Hours" value="85.4 hrs" change="+18%" isIncrease={true} icon={BarChart3} />
        <StatCard title="Avg Test Competency" value="91%" change="+5%" isIncrease={true} icon={Award} />
        <StatCard title="Course Completion Rate" value="78%" change="+12%" isIncrease={true} icon={BookOpen} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Monthly Study Velocity (Hours)</h3>
          <BarChartWidget data={weeklyHours} height={260} />
        </div>

        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Skill Focus Breakdown</h3>
          <PieChartWidget data={skillDistribution} height={260} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
