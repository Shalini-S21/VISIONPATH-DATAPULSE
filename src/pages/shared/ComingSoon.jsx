import React from 'react';

const ComingSoon = ({
  title = 'Coming Soon',
  description = 'This experience is being built for the next milestone of VisionPath.',
  badge = 'Core UI',
}) => {
  return (
    <div className="min-h-[60vh] rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-2xl flex-col items-start gap-4">
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
          {badge}
        </span>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">{title}</h1>
        <p className="text-base leading-7 text-slate-600 dark:text-slate-300">{description}</p>
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-400">
          This page is now wired into the app so the dashboard experience stays fully navigable.
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
