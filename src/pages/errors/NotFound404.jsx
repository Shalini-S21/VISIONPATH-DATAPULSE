import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';

export const NotFound404 = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6">
        <Compass className="w-16 h-16 animate-spin-slow" />
      </div>
      <h1 className="text-7xl font-black tracking-tight text-emerald-400 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-white mb-3">Page Off The VisionPath</h2>
      <p className="text-sm text-slate-400 max-w-md mb-8">
        The destination module or resource you are looking for has been moved, archived, or does not exist on this route.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link to="/">
          <Button variant="primary" size="lg" icon={Home}>
            Back to Home
          </Button>
        </Link>
        <button onClick={() => window.history.back()}>
          <Button variant="outline" size="lg" icon={ArrowLeft}>
            Go Back
          </Button>
        </button>
      </div>
    </div>
  );
};

export default NotFound404;
