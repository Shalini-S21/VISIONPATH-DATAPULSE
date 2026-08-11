import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Users, CheckCircle2, XCircle, Clock, Search, Filter } from 'lucide-react';
import { approveRequest, rejectRequest } from '../../redux/slices/counselorSlice';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';
import { EmptyState } from '../../components/loaders/PageSpinner';

export const StudentRequests = () => {
  const dispatch = useDispatch();
  const { pendingRequests } = useSelector((s) => s.counselor);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = pendingRequests.filter((r) =>
    r.studentName.toLowerCase().includes(search.toLowerCase()) ||
    r.topic.toLowerCase().includes(search.toLowerCase())
  );

  const handleApprove = (id, name) => {
    dispatch(approveRequest(id));
    toast.success(`✅ Session approved for ${name}`);
  };

  const handleReject = (id) => {
    dispatch(rejectRequest(id));
    toast.error('Session request declined');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Student Session Requests</h1>
          <p className="text-sm text-slate-500 mt-0.5">{pendingRequests.length} pending request{pendingRequests.length !== 1 ? 's' : ''} awaiting your response</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search requests…"
              className="h-9 pl-9 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 w-56"
            />
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending', value: pendingRequests.length, color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' },
          { label: 'Approved Today', value: 2, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Avg Response', value: '< 2h', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
        ].map((s) => (
          <div key={s.label} className={`${s.color} rounded-2xl p-4 text-center`}>
            <p className="text-2xl font-black">{s.value}</p>
            <p className="text-xs font-semibold mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Requests list */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="No pending requests"
          description="All student requests have been reviewed. New requests will appear here."
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((req) => (
            <div key={req.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <img src={req.avatar} alt={req.studentName} className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-300 dark:border-emerald-700 flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{req.studentName}</h3>
                      <Badge variant="warning" size="xs" dot>Pending</Badge>
                    </div>
                    <p className="text-xs text-emerald-600 font-semibold mt-0.5">{req.track}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-lg line-clamp-2">{req.topic}</p>
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{req.requestedDate} at {req.requestedTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 sm:flex-col lg:flex-row">
                  <Button variant="ghost" size="sm" icon={XCircle} onClick={() => handleReject(req.id)} className="border-red-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                    Decline
                  </Button>
                  <Button variant="primary" size="sm" icon={CheckCircle2} onClick={() => handleApprove(req.id, req.studentName)}>
                    Approve
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentRequests;
