import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, Mail, Award, TrendingUp, Calendar, MessageSquare } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import StatCard from '../../components/cards/StatCard';

const SKILLS_MOCK = ['React.js', 'Node.js', 'Python', 'System Design', 'AWS'];
const SESSIONS_MOCK = [
  { date: '2026-07-20', topic: 'Resume Review & ATS Optimization', duration: '45m', status: 'Completed' },
  { date: '2026-07-05', topic: 'FAANG Interview Strategy Session', duration: '60m', status: 'Completed' },
  { date: '2026-06-18', topic: 'Career Track Selection & Roadmap Planning', duration: '30m', status: 'Completed' },
];

export const StudentDetails = () => {
  const { id } = useParams();
  const { assignedStudents } = useSelector((s) => s.counselor);
  const student = assignedStudents.find((s) => s.id === id) || {
    id,
    name: 'Alex Rivera',
    email: 'alex.rivera@visionpath.edu',
    track: 'Full Stack AI Engineer',
    progress: 68,
    lastSessionDate: '2026-07-20',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    status: 'Active',
  };

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link to="/counselor/assigned-students" className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-semibold">
        <ArrowLeft className="w-4 h-4" /> Back to Students
      </Link>

      {/* Profile header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 flex flex-col sm:flex-row gap-6 items-start">
        <img src={student.avatar} alt={student.name} className="w-24 h-24 rounded-2xl object-cover border-4 border-emerald-200 dark:border-emerald-800" />
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">{student.name}</h1>
            <Badge variant={student.status === 'Active' ? 'success' : 'secondary'} dot>{student.status}</Badge>
          </div>
          <p className="text-emerald-600 font-semibold text-sm mt-1">{student.track}</p>
          <p className="text-slate-500 text-xs mt-0.5 flex items-center gap-1"><Mail className="w-3 h-3" />{student.email}</p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex-1 max-w-xs">
              <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                <span>Career Progress</span>
                <span className="text-emerald-600">{student.progress}%</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full animate-fill-bar" style={{ width: `${student.progress}%` }} />
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-4 flex-wrap">
            <Button variant="primary" size="sm" icon={Calendar}>Schedule Session</Button>
            <Button variant="ghost" size="sm" icon={MessageSquare}>Send Message</Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Sessions Completed" value="3" change="Good pace" icon={Calendar} color="emerald" />
        <StatCard title="Skills Validated" value={SKILLS_MOCK.length} icon={Award} color="purple" />
        <StatCard title="Roadmap Progress" value={`${student.progress}%`} isIncrease change="+12% this month" icon={TrendingUp} color="blue" />
        <StatCard title="Assignments Done" value="8/10" icon={Award} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Validated Skills</h2>
          <div className="flex flex-wrap gap-2">
            {SKILLS_MOCK.map((s) => (
              <span key={s} className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-xl text-xs font-semibold">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Session history */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Session History</h2>
          <div className="space-y-3">
            {SESSIONS_MOCK.map((sess, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-50 dark:border-slate-800 last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-white">{sess.topic}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{sess.date} · {sess.duration}</p>
                </div>
                <Badge variant="success" size="xs" className="ml-auto flex-shrink-0">{sess.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
