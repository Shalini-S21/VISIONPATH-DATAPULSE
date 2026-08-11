import React from 'react';
import { Star, Calendar, MessageSquare } from 'lucide-react';
import Badge from '../ui/Badge';

const CounselorCard = ({ counselor, onBook }) => {
  const { name, title, institution, avatar, rating, reviewsCount, hourlyRate, specialties = [], bio } = counselor;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 flex flex-col gap-4 card-hover">
      <div className="flex items-start gap-3">
        <img
          src={avatar}
          alt={name}
          className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-200 dark:border-emerald-800 flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{name}</h3>
          <p className="text-xs text-emerald-600 font-semibold">{title}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">{institution}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{rating}</span>
            <span className="text-[11px] text-slate-400">({reviewsCount} reviews)</span>
          </div>
        </div>
        <span className="text-xs font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg whitespace-nowrap">
          {hourlyRate}
        </span>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{bio}</p>

      <div className="flex flex-wrap gap-1">
        {specialties.slice(0, 4).map((s) => (
          <Badge key={s} variant="secondary" size="xs">{s}</Badge>
        ))}
      </div>

      <div className="flex gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
        <button className="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center gap-1.5 transition-colors">
          <MessageSquare className="w-3.5 h-3.5" /> Message
        </button>
        <button
          onClick={() => onBook?.(counselor)}
          className="flex-1 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.97]"
        >
          <Calendar className="w-3.5 h-3.5" /> Book Session
        </button>
      </div>
    </div>
  );
};

export default CounselorCard;
