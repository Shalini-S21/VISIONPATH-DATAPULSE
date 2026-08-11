import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Users, Calendar, Video, DollarSign, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import StatCard from '../../components/cards/StatCard';
import Button from '../../components/ui/Button';
import { approveRequest, rejectRequest } from '../../redux/slices/counselorSlice';
import toast from 'react-hot-toast';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { pendingRequests, assignedStudents, sessions, earnings } = useSelector((state) => state.counselor);

  const handleApprove = (id, name) => {
    dispatch(approveRequest(id));
    toast.success(`Session approved for ${name}`);
  };

  const handleReject = (id) => {
    dispatch(rejectRequest(id));
    toast.error('Session request declined');
  };

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#14532D] via-emerald-800 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold backdrop-blur-sm border border-emerald-400/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Senior Career Advisor Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Counselor Control Hub 👋
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100">
            You have <span className="font-bold underline">{pendingRequests.length} pending student session requests</span> waiting for confirmation.
          </p>
        </div>

        <Link to="/counselor/session-calendar">
          <Button variant="primary" size="md" icon={Calendar} className="bg-white text-emerald-950 hover:bg-emerald-50 font-bold">
            View Schedule Calendar
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Assigned Students" value={assignedStudents.length} change="+3 this week" isIncrease={true} icon={Users} />
        <StatCard title="Upcoming Sessions" value={sessions.length} change="2 today" isIncrease={true} icon={Video} />
        <StatCard title="Total Earnings" value={`$${earnings.totalEarned}`} change={`+$${earnings.thisMonth} this mo`} isIncrease={true} icon={DollarSign} />
        <StatCard title="Sessions Completed" value={earnings.sessionsCompleted} change="99.4% Rating" isIncrease={true} icon={CheckCircle2} />
      </div>

      {/* Requests Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-gray-900 dark:text-white">Pending Student Session Requests</h3>
        
        {pendingRequests.length === 0 ? (
          <p className="text-xs text-gray-400 py-4">No pending requests right now.</p>
        ) : (
          <div className="space-y-3">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img src={req.avatar} alt={req.studentName} className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{req.studentName}</h4>
                    <p className="text-xs text-emerald-600 font-semibold">{req.track}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{req.topic} • {req.requestedDate} at {req.requestedTime}</p>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <Button variant="danger" size="sm" icon={XCircle} onClick={() => handleReject(req.id)}>
                    Decline
                  </Button>
                  <Button variant="primary" size="sm" icon={CheckCircle2} onClick={() => handleApprove(req.id, req.studentName)}>
                    Approve Session
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
