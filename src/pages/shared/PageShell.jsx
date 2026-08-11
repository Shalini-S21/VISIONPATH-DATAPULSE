import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, SlidersHorizontal, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import StatCard from '../../components/cards/StatCard';

const PageShell = ({
  title,
  description,
  breadcrumbs = ['VisionPath'],
  stats = [],
  searchPlaceholder = 'Search workspace',
  actionLabel = 'Open workspace',
  actionTo = '/student/dashboard',
  children,
}) => {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-[28px] border border-[var(--border-color)] bg-white/80 p-6 shadow-[0_20px_60px_rgba(22,163,74,0.08)] dark:bg-slate-900/80">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                {breadcrumbs.map((item, index) => (
                  <React.Fragment key={item}>
                    <span>{item}</span>
                    {index < breadcrumbs.length - 1 ? <span>/</span> : null}
                  </React.Fragment>
                ))}
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">{title}</h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
                <ShieldCheck className="h-4 w-4" />
                Production-ready experience
              </div>
              <Link to={actionTo}>
                <Button variant="primary" size="md" icon={ArrowRight} className="rounded-2xl">
                  {actionLabel}
                </Button>
              </Link>
            </div>
          </div>
        </motion.header>

        {stats.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>
        ) : null}

        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="glass-panel rounded-[28px] border border-[var(--border-color)] bg-white/70 p-4 shadow-sm dark:bg-slate-900/70 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-400">
              <Search className="h-4 w-4" />
              <span>{searchPlaceholder}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <Sparkles className="h-4 w-4" />
                Smart insights
              </div>
            </div>
          </div>
        </motion.section>

        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default PageShell;
