import React from 'react';
import { AlertTriangle, ServerCrash, RefreshCcw } from 'lucide-react';

export const PageSpinner = ({ text = 'Loading…' }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
    <div className="w-12 h-12 border-4 border-emerald-200 dark:border-emerald-900 border-t-emerald-600 rounded-full animate-spin" />
    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{text}</p>
  </div>
);

export const CardSkeleton = ({ lines = 3, className = '' }) => (
  <div className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 animate-pulse ${className}`}>
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-2/3 mb-4" />
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className={`h-3 bg-slate-100 dark:bg-slate-800 rounded-lg mb-2 ${i % 2 === 0 ? 'w-full' : 'w-4/5'}`} />
    ))}
  </div>
);

export const SkeletonLoader = ({ count = 3, className = '' }) => (
  <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

export const EmptyState = ({
  icon: Icon,
  title = 'Nothing here yet',
  description = 'There is no data to display right now.',
  action,
  className = '',
}) => (
  <div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
    {Icon && (
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-5">
        <Icon className="w-8 h-8 text-emerald-500" />
      </div>
    )}
    <h3 className="text-base font-bold text-slate-700 dark:text-slate-200 mb-1">{title}</h3>
    <p className="text-sm text-slate-400 max-w-xs">{description}</p>
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export const ErrorState = ({
  title = 'Something went wrong',
  description = 'An error occurred while loading data. Please try again.',
  onRetry,
}) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
    <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-5">
      <AlertTriangle className="w-8 h-8 text-red-500" />
    </div>
    <h3 className="text-base font-bold text-slate-700 dark:text-slate-200 mb-1">{title}</h3>
    <p className="text-sm text-slate-400 max-w-xs">{description}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors"
      >
        <RefreshCcw className="w-4 h-4" />
        Try Again
      </button>
    )}
  </div>
);

export default PageSpinner;
