import React from 'react';

const variantMap = {
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  danger:  'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  info:    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  secondary: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  primary: 'bg-emerald-600 text-white',
  purple:  'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  orange:  'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
};

const sizeMap = {
  xs: 'px-1.5 py-0.5 text-[10px] rounded-md',
  sm: 'px-2 py-0.5 text-[11px] rounded-lg',
  md: 'px-2.5 py-1 text-xs rounded-lg',
  lg: 'px-3 py-1 text-sm rounded-xl',
};

const Badge = ({
  children,
  variant = 'secondary',
  size = 'md',
  dot = false,
  className = '',
}) => {
  const cls = variantMap[variant] || variantMap.secondary;
  const sz = sizeMap[size] || sizeMap.md;
  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold ${cls} ${sz} ${className}`}>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
      )}
      {children}
    </span>
  );
};

export default Badge;
