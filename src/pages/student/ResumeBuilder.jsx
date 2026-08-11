import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FileText, Download, Save, Sparkles, CheckCircle2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import toast from 'react-hot-toast';

export const ResumeBuilder = () => {
  const { user } = useSelector((state) => state.auth);
  
  const [fullName, setFullName] = useState(user?.name || '');
  const [targetRole, setTargetRole] = useState('Senior Full Stack Architect');
  const [summary, setSummary] = useState(
    'Experienced Full Stack Engineer with 4+ years expertise in React 19, Redux Toolkit, Node.js microservices, and AI LangChain integration.'
  );
  const [bullet1, setBullet1] = useState('Architected high-throughput React 19 web app reducing LCP latency by 42%.');
  const [bullet2, setBullet2] = useState('Engineered Python LangChain RAG pipeline processing 100k+ vector embedding queries daily.');

  const handleSave = () => {
    toast.success('Resume template saved & ATS optimized!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Structured Resume Builder</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            ATS-friendly template designed for modern tech recruiting algorithms
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" icon={Download} onClick={() => toast.success('Exported ATS Resume PDF')}>
            Export PDF
          </Button>
          <Button variant="primary" size="sm" icon={Save} onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Form */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Resume Information Editor</h3>
          
          <Input label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <Input label="Target Role" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Professional Summary</label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-xs"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Achievement Bullet 1</label>
            <input
              type="text"
              value={bullet1}
              onChange={(e) => setBullet1(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Achievement Bullet 2</label>
            <input
              type="text"
              value={bullet2}
              onChange={(e) => setBullet2(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-xs"
            />
          </div>
        </div>

        {/* Live Preview Paper */}
        <div className="lg:col-span-6 p-8 rounded-3xl bg-white text-slate-900 border border-gray-300 shadow-xl space-y-4 font-sans text-xs">
          <div className="border-b border-gray-300 pb-3 text-center">
            <h2 className="text-xl font-bold uppercase tracking-wide">{fullName}</h2>
            <p className="text-emerald-700 font-semibold text-xs mt-0.5">{targetRole}</p>
            <p className="text-[10px] text-gray-500">{user?.email} • Stanford University</p>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase border-b border-gray-200 pb-1 mb-1 text-slate-800">Professional Summary</h4>
            <p className="text-[11px] leading-relaxed text-slate-700">{summary}</p>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase border-b border-gray-200 pb-1 mb-1 text-slate-800">Key Achievements</h4>
            <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-700">
              <li>{bullet1}</li>
              <li>{bullet2}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
