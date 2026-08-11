import React, { useState } from 'react';
import { FileText, Search, Download, Eye, BarChart3 } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const REPORTS = [
  { id: 'r1', student: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80', track: 'Full Stack AI Engineer', score: 82, date: '2026-07-15', status: 'Reviewed', strengths: ['Problem Solving', 'System Design'], gaps: ['Cloud Architecture', 'ML Basics'] },
  { id: 'r2', student: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80', track: 'AI Engineering', score: 74, date: '2026-07-20', status: 'Pending Review', strengths: ['Python', 'Data Analysis'], gaps: ['MLOps', 'Distributed Systems'] },
  { id: 'r3', student: 'Marcus Vance Jr.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80', track: 'Cloud Architecture', score: 90, date: '2026-07-22', status: 'Reviewed', strengths: ['AWS', 'Terraform', 'CI/CD'], gaps: ['Security Architecture'] },
];

export const AssessmentReports = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = REPORTS.filter((r) =>
    r.student.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Assessment Reports</h1>
          <p className="text-sm text-slate-500 mt-0.5">Review and annotate student career assessments</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search reports…" className="h-9 pl-9 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 w-56" />
        </div>
      </div>

      <div className={`grid ${selected ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
        <div className="space-y-4">
          {filtered.map((r) => (
            <div
              key={r.id}
              onClick={() => setSelected(r)}
              className={`bg-white dark:bg-slate-900 rounded-2xl border p-5 cursor-pointer transition-all ${
                selected?.id === r.id ? 'border-emerald-500 shadow-md shadow-emerald-100 dark:shadow-emerald-900/20' : 'border-slate-100 dark:border-slate-800 hover:border-emerald-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <img src={r.avatar} alt={r.student} className="w-10 h-10 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{r.student}</p>
                  <p className="text-xs text-emerald-600 font-medium">{r.track}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-slate-900 dark:text-white">{r.score}<span className="text-xs font-medium text-slate-400">/100</span></p>
                  <Badge variant={r.status === 'Reviewed' ? 'success' : 'warning'} size="xs">{r.status}</Badge>
                </div>
              </div>
              <div className="mt-3">
                <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${r.score}%` }} />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">{r.date}</p>
            </div>
          ))}
        </div>

        {selected && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Report Details</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="xs" icon={Download}>Export</Button>
                <button onClick={() => setSelected(null)} className="text-xs text-slate-400 hover:text-slate-600">✕</button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <img src={selected.avatar} alt={selected.student} className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-300" />
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{selected.student}</p>
                <p className="text-xs text-emerald-600">{selected.track}</p>
              </div>
              <div className="ml-auto text-center">
                <p className="text-3xl font-black text-emerald-600">{selected.score}</p>
                <p className="text-[11px] text-slate-400">Overall Score</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">💪 Strengths</p>
              <div className="flex flex-wrap gap-2">
                {selected.strengths.map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-semibold">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">🎯 Skill Gaps</p>
              <div className="flex flex-wrap gap-2">
                {selected.gaps.map((g) => (
                  <span key={g} className="px-2.5 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg text-xs font-semibold">{g}</span>
                ))}
              </div>
            </div>

            <textarea className="w-full h-28 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" placeholder="Add counselor notes and recommendations…" />
            <Button variant="primary" size="sm" className="w-full">Save Counselor Notes</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentReports;
