import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Map, CheckCircle2, TrendingUp } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import careerService from '../../services/careerService';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { MOCK_ROADMAPS } from '../../services/mockDataService';

export const CareerRecommendation = () => {
  const { user } = useAuth();
  const [roadmaps, setRoadmaps] = useState(MOCK_ROADMAPS);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = user?.id
          ? await careerService.getRecommendations(user.id)
          : await careerService.getAllCareers();
        const data = res.data || res;
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((c) => ({
            id: c.id,
            title: c.title || c.careerName || 'Software Engineer',
            role: c.category || c.role || 'Full-Stack Specialist',
            matchPercentage: c.matchScore || 94,
            difficulty: c.level || 'Advanced',
            duration: c.duration || '16 Weeks',
            modulesCount: c.modulesCount || 8,
            description: c.description || 'Custom tailored career roadmap.',
          }));
          setRoadmaps(mapped);
        }
      } catch (err) {
        console.warn('Backend careerService notice:', err?.message || err);
      }
    };
    fetchCareers();
  }, [user]);
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-600" />
            AI Career Recommendations
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Based on your 93% Assessment score in Full-Stack Competency and verified skill matrix
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {roadmaps.map((roadmap) => (
          <div
            key={roadmap.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  {roadmap.matchPercentage}% Match Score
                </span>
                <Badge variant="primary">{roadmap.difficulty}</Badge>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{roadmap.title}</h3>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">{roadmap.role}</p>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {roadmap.description}
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs font-medium text-gray-500">
                <span>Duration: {roadmap.duration}</span>
                <span>Modules: {roadmap.modulesCount}</span>
              </div>
            </div>

            <Link to="/student/career-roadmap">
              <Button variant="primary" size="md" className="w-full" icon={ArrowRight}>
                Adopt Active Roadmap
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerRecommendation;
