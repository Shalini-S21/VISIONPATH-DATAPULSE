import React from 'react';
import { MapPin, Briefcase, Clock, DollarSign, ExternalLink, BookmarkPlus } from 'lucide-react';
import Badge from '../ui/Badge';

const typeVariant = { 'Full-Time': 'success', 'Part-Time': 'info', 'Contract': 'warning', 'Internship': 'purple', 'Remote': 'secondary' };

const JobCard = ({ job, onApply, onSave, applied = false }) => {
  const { title, company, logo, location, type, salary, experience, postedDate, skills = [], description } = job;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 flex flex-col gap-4 card-hover">
      <div className="flex items-start gap-3">
        <img
          src={logo}
          alt={company}
          className="w-12 h-12 rounded-xl object-cover border border-slate-100 dark:border-slate-700 flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">{title}</h3>
          <p className="text-xs font-semibold text-emerald-600">{company}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-slate-400">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{location}</span>
            <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{experience}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{postedDate}</span>
          </div>
        </div>
        <Badge variant={typeVariant[type] || 'secondary'} size="sm">{type}</Badge>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{description}</p>

      <div className="flex flex-wrap gap-1">
        {skills.slice(0, 4).map((s) => (
          <span key={s} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md text-[10px] font-medium">
            {s}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
          <DollarSign className="w-3.5 h-3.5" />{salary}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onSave?.(job)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
            title="Save job"
          >
            <BookmarkPlus className="w-4 h-4" />
          </button>
          <button
            onClick={() => onApply?.(job)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-150 active:scale-[0.97] ${
              applied
                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
            }`}
          >
            <ExternalLink className="w-3 h-3" />
            {applied ? 'Applied' : 'Apply Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
