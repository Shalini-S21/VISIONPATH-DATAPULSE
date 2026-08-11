import React from 'react';
import { Star, Users, Clock, Play, BookOpen } from 'lucide-react';
import Badge from '../ui/Badge';

const levelVariant = {
  Beginner: 'success',
  Intermediate: 'info',
  Advanced: 'warning',
  Expert: 'danger',
};

const CourseCard = ({ course, onEnroll, enrolled = false }) => {
  const {
    title, instructor, category, level, rating, reviewsCount,
    studentsCount, price, duration, lessonsCount, thumbnail, description, tags = []
  } = course;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden card-hover flex flex-col">
      <div className="relative">
        <img src={thumbnail} alt={title} className="w-full h-44 object-cover" />
        <div className="absolute top-3 left-3">
          <Badge variant={levelVariant[level] || 'secondary'} size="sm">{level}</Badge>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow">{price}</span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">{category}</p>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1 line-clamp-2 leading-snug">{title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">by {instructor}</p>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{description}</p>

        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1 text-yellow-500 font-bold">
            <Star className="w-3 h-3 fill-current" />
            {rating} ({reviewsCount?.toLocaleString()})
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />{studentsCount?.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />{duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />{lessonsCount} lessons
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mt-auto">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md text-[10px] font-medium">
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => onEnroll?.(course)}
          className={`w-full py-2 rounded-xl text-xs font-bold transition-all duration-150 flex items-center justify-center gap-2 ${
            enrolled
              ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 hover:bg-emerald-100'
              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm active:scale-[0.98]'
          }`}
        >
          <Play className="w-3 h-3" />
          {enrolled ? 'Continue Learning' : 'Enroll Now'}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
