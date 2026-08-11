import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Map, CheckCircle2, Clock, PlayCircle, Sparkles, BookOpen } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import toast from 'react-hot-toast';

export const CareerRoadmap = () => {
  const { activeRoadmap } = useSelector((state) => state.student);
  const [roadmapSteps, setRoadmapSteps] = useState(activeRoadmap.steps);

  const toggleStep = (id) => {
    setRoadmapSteps(roadmapSteps.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'completed' ? 'in-progress' : s.status === 'in-progress' ? 'pending' : 'completed';
        toast.success(`Milestone '${s.title}' set to ${nextStatus.toUpperCase()}`);
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  return (
    <div className="space-y-8">
      {/* Roadmap Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Active Learning Path
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">{activeRoadmap.title}</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Estimated Duration: {activeRoadmap.estimatedWeeks} Weeks • {activeRoadmap.completedModules} of {activeRoadmap.totalModules} Modules Finished
          </p>
        </div>

        <div className="w-full md:w-64 space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-gray-700 dark:text-gray-300">Completion</span>
            <span className="text-emerald-600 dark:text-emerald-400">{activeRoadmap.completionRate}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-3">
            <div className="bg-emerald-600 h-3 rounded-full" style={{ width: `${activeRoadmap.completionRate}%` }} />
          </div>
        </div>
      </div>

      {/* Interactive Vertical Timeline */}
      <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-emerald-200 dark:before:bg-slate-800">
        {roadmapSteps.map((step, idx) => (
          <div key={step.id} className="relative group">
            {/* Dot Indicator */}
            <div
              onClick={() => toggleStep(step.id)}
              className={`absolute -left-6 sm:-left-10 top-4 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-transform group-hover:scale-110 ${
                step.status === 'completed'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : step.status === 'in-progress'
                  ? 'bg-amber-500 text-white ring-4 ring-amber-100 dark:ring-amber-950 animate-pulse'
                  : 'bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-700 text-gray-400'
              }`}
            >
              {step.status === 'completed' ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <span className="text-[10px] font-bold">{idx + 1}</span>
              )}
            </div>

            {/* Content Box */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs hover:border-emerald-500/40 transition-colors space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Module {idx + 1} • {step.duration}
                </span>
                <Badge
                  variant={step.status === 'completed' ? 'success' : step.status === 'in-progress' ? 'warning' : 'gray'}
                >
                  {step.status}
                </Badge>
              </div>

              <h3 className="text-base font-bold text-gray-900 dark:text-white">{step.title}</h3>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => toggleStep(step.id)}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {step.status === 'completed' ? 'Mark In Progress' : 'Toggle Milestone Status'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerRoadmap;
