import React, { useState } from 'react';
import { FileCheck, Upload, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

export const AIResumeAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState({
    atsScore: 88,
    parsedSkills: ['React 19', 'Redux Toolkit', 'Tailwind CSS', 'Node.js', 'System Architecture'],
    criticalFixes: [
      'Quantify project metric impacts (e.g. Improved API rendering speed by 35%)',
      'Include Docker & Kubernetes deployment keywords for senior backend roles'
    ]
  });

  const handleUpload = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      toast.success('Resume Analysis complete! Updated score: 91/100');
      setReport({
        atsScore: 91,
        parsedSkills: ['React 19', 'Redux Toolkit', 'Tailwind CSS', 'Node.js', 'System Architecture', 'Python LangChain'],
        criticalFixes: [
          'Add Docker & CI/CD deployment pipelines under Cloud Infrastructure'
        ]
      });
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <FileCheck className="w-6 h-6 text-emerald-600" />
          AI Resume & ATS Analyzer
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Scan your resume PDF against modern enterprise applicant tracking systems (Greenhouse, Lever)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Upload Box */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-dashed border-emerald-500/40 text-center space-y-4 flex flex-col items-center justify-center">
          <div className="p-4 rounded-3xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
            <Upload className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Upload Resume PDF</h3>
            <p className="text-xs text-gray-400 mt-1">Drag and drop your PDF or click to browse</p>
          </div>
          <Button variant="primary" size="md" isLoading={isAnalyzing} onClick={handleUpload}>
            Analyze Resume PDF
          </Button>
        </div>

        {/* Audit Scorecard */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">ATS Audit Scorecard</h3>
            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{report.atsScore}/100</span>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Detected Key Skills</h4>
            <div className="flex flex-wrap gap-2">
              {report.parsedSkills.map((s, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 text-amber-600">
              <AlertTriangle className="w-4 h-4" /> Recommended Bullet Fixes
            </h4>
            <ul className="space-y-2">
              {report.criticalFixes.map((fix, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{fix}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResumeAnalyzer;
