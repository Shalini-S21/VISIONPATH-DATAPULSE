import React, { useState } from 'react';
import { Sparkles, Target, CheckCircle, Send } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { useSelector } from 'react-redux';

const SUGGESTIONS_MOCK = [
  { id: 1, student: 'Alex Rivera', track: 'Full Stack AI Engineer', score: 82, suggestions: ['Enroll in Advanced System Design course', 'Start contributing to open-source React projects', 'Apply for a cloud internship at AWS or GCP', 'Build a portfolio project using LangChain + Next.js'] },
  { id: 2, student: 'Elena Rostova', track: 'AI Engineering', score: 74, suggestions: ['Complete MLOps Fundamentals on Coursera', 'Set up personal MLflow + DVC pipeline project', 'Attend local data science meetups', 'Reach out to 3 ML engineers for informational interviews'] },
  { id: 3, student: 'Marcus Vance Jr.', track: 'Cloud Architecture', score: 90, suggestions: ['Pursue AWS Solutions Architect Pro certification', 'Study Zero Trust Security architecture patterns', 'Lead a cloud migration project case study', 'Apply to DevOps lead positions at tech companies'] },
];

export const CareerSuggestions = () => {
  const [expandedId, setExpandedId] = useState(1);
  const [sentIds, setSentIds] = useState([]);

  const handleSend = (id) => {
    setSentIds((prev) => [...prev, id]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">AI Career Suggestions Engine</h1>
        <p className="text-sm text-slate-500 mt-0.5">AI-generated, personalized career action plans for each student</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {SUGGESTIONS_MOCK.map((item) => {
          const isOpen = expandedId === item.id;
          const isSent = sentIds.includes(item.id);
          return (
            <div
              key={item.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 ${isOpen ? 'border-emerald-400 shadow-lg shadow-emerald-50 dark:shadow-emerald-900/20' : 'border-slate-100 dark:border-slate-800'}`}
            >
              <div
                className="p-5 cursor-pointer"
                onClick={() => setExpandedId(isOpen ? null : item.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{item.student}</p>
                    <p className="text-xs text-emerald-600 font-semibold mt-0.5">{item.track}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-emerald-600">{item.score}</p>
                    <p className="text-[10px] text-slate-400">Assessment</p>
                  </div>
                </div>
              </div>

              {isOpen && (
                <div className="px-5 pb-5 space-y-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    <Sparkles className="w-4 h-4" />
                    AI-Generated Action Plan
                  </div>
                  <ul className="space-y-2">
                    {item.suggestions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        {s}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={isSent ? 'ghost' : 'primary'}
                    size="sm"
                    icon={isSent ? CheckCircle : Send}
                    onClick={() => handleSend(item.id)}
                    className="w-full"
                    disabled={isSent}
                  >
                    {isSent ? 'Plan Sent to Student' : 'Send to Student'}
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CareerSuggestions;
