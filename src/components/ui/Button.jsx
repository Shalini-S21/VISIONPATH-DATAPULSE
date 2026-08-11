import React from 'react';

const variants = {
  solid: {
    base: 'border-0 text-white',
    primary: 'bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-200 dark:shadow-emerald-900/40',
    secondary: 'bg-slate-600 hover:bg-slate-700',
    danger: 'bg-red-500 hover:bg-red-600',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-slate-900',
    ghost: 'bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700',
    outline: 'bg-transparent border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20',
    white: 'bg-white text-emerald-900 hover:bg-emerald-50 shadow-sm',
  },
  sizes: {
    xs: 'px-2.5 py-1 text-[11px] gap-1.5 rounded-lg',
    sm: 'px-3 py-1.5 text-xs gap-2 rounded-xl',
    md: 'px-4 py-2 text-sm gap-2 rounded-xl',
    lg: 'px-5 py-2.5 text-sm gap-2.5 rounded-2xl',
    xl: 'px-7 py-3.5 text-base gap-3 rounded-2xl',
  },
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight,
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  onClick,
  ...rest
}) => {
  const base = 'inline-flex items-center justify-center font-semibold transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.97]';
  const variantCls = variants.solid[variant] || variants.solid.primary;
  const sizeCls = variants.sizes[size] || variants.sizes.md;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${base} ${variantCls} ${sizeCls} ${className}`}
      {...rest}
    >
      {loading ? (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      ) : Icon && !iconRight ? (
        <Icon className="w-4 h-4 flex-shrink-0" />
      ) : null}
      {children}
      {Icon && iconRight ? <Icon className="w-4 h-4 flex-shrink-0" /> : null}
    </button>
  );
};

export default Button;
