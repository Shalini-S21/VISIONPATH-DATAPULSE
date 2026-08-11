import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BookOpen, PlayCircle, Clock, Award, Star } from 'lucide-react';
import Button from '../../components/ui/Button';

export const LearningDashboard = () => {
  const { enrolledCourses } = useSelector((state) => state.student);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Learning Dashboard</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Track active course completion, certificates, and continue learning where you left off
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {enrolledCourses.map((course) => (
          <div
            key={course.id}
            className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 overflow-hidden shadow-xs flex flex-col justify-between"
          >
            <div className="relative h-40">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-bold backdrop-blur-sm">
                {course.level}
              </span>
            </div>

            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {course.category}
                </span>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2">{course.title}</h3>
                <p className="text-[11px] text-gray-500">{course.instructor}</p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-emerald-600 font-bold">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>

                <Link to="/student/courses">
                  <Button variant="primary" size="sm" className="w-full" icon={PlayCircle}>
                    Continue Lesson
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningDashboard;
