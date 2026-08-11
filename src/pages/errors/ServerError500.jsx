import React from 'react';
import { Link } from 'react-router-dom';
import { ServerCrash, RefreshCw } from 'lucide-react';
import Button from '../../components/ui/Button';

export const ServerError500 = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-6">
        <ServerCrash className="w-16 h-16" />
      </div>
      <h1 className="text-7xl font-black tracking-tight text-amber-400 mb-2">500</h1>
      <h2 className="text-2xl font-bold text-white mb-3">Internal System Exception</h2>
      <p className="text-sm text-slate-400 max-w-md mb-8">
        Our platform services encountered an unexpected exception. Our reliability engineers have automatically been notified.
      </p>
      <button onClick={() => window.location.reload()}>
        <Button variant="primary" size="lg" icon={RefreshCw}>
          Reload Application
        </Button>
      </button>
    </div>
  );
};

export default ServerError500;
