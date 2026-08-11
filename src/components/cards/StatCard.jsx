import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, change, isIncrease, icon: Icon, color = 'emerald', className = '' }) => {
  const colorMap = {
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600',
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600',
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600',
    rose: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600',
  };
  const iconBg = colorMap[color] || colorMap.emerald;

  return (
    <div className={`glass-panel rounded-2xl p-5 flex items-start gap-4 card-hover ${className}`}>
      {Icon && (
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">{title}</p>
        <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5 leading-none">{value}</p>
        {change && (
          <div className={`flex items-center gap-1 mt-1.5 text-[11px] font-semibold ${
            isIncrease === undefined ? 'text-slate-400' : isIncrease ? 'text-emerald-600' : 'text-red-500'
          }`}>
            {isIncrease !== undefined && (
              isIncrease ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />
            )}
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
