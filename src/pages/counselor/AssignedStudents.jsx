import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, ExternalLink, UserCheck } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import { EmptyState } from '../../components/loaders/PageSpinner';

export const AssignedStudents = () => {
  const { assignedStudents } = useSelector((s) => s.counselor);
  const [search, setSearch] = useState('');

  const filtered = assignedStudents.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.track.toLowerCase().includes(search.toLowerCase())
  );

  const getProgressColor = (p) => {
    if (p >= 80) return 'bg-emerald-500';
    if (p >= 50) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Assigned Students</h1>
          <p className="text-sm text-slate-500 mt-0.5">{assignedStudents.length} students currently under your guidance</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students…"
            className="h-9 pl-9 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 w-56"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">Student</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">Career Track</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">Progress</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">Last Session</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-sm">No students found</td>
                </tr>
              ) : filtered.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={student.avatar} alt={student.name} className="w-9 h-9 rounded-xl object-cover border border-slate-100 dark:border-slate-700" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{student.name}</p>
                        <p className="text-[11px] text-slate-400">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs text-slate-600 dark:text-slate-300">{student.track}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${getProgressColor(student.progress)}`} style={{ width: `${student.progress}%` }} />
                      </div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs text-slate-500">{student.lastSessionDate}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={student.status === 'Active' ? 'success' : 'secondary'} dot size="sm">{student.status}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <Link to={`/counselor/student/${student.id}`}>
                      <button className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 hover:underline">
                        <ExternalLink className="w-3 h-3" /> View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignedStudents;
