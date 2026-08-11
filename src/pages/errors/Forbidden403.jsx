import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

export const Forbidden403 = () => {
  const { role } = useAuth();
  const dashboardPath = role === 'counselor' ? '/counselor/dashboard' : role === 'admin' ? '/admin/dashboard' : '/student/dashboard';

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="p-4 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-6">
        <ShieldAlert className="w-16 h-16" />
      </div>
      <h1 className="text-7xl font-black tracking-tight text-rose-400 mb-2">403</h1>
      <h2 className="text-2xl font-bold text-white mb-3">Access Restricted</h2>
      <p className="text-sm text-slate-400 max-w-md mb-8">
        Your active role (<span className="capitalize text-emerald-400 font-bold">{role}</span>) does not have authorization permissions to view this module.
      </p>
      <Link to={dashboardPath}>
        <Button variant="primary" size="lg" icon={Home}>
          Return to Authorized Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default Forbidden403;
