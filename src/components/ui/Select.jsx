import React from 'react';
import { ChevronDown } from 'lucide-react';

const Select = React.forwardRef(({
  label,
  error,
  hint,
  options = [],
  size = 'md',
  className = '',
  required = false,
  placeholder = 'Select an option',
  ...rest
}, ref) => {
  const sizeMap = {
    sm: 'h-8 px-3 text-xs rounded-lg',
    md: 'h-10 px-3.5 text-sm rounded-xl',
    lg: 'h-12 px-4 text-base rounded-xl',
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={`
            w-full appearance-none bg-white dark:bg-slate-900 border pr-8
            ${error ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500'}
            text-slate-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-150 cursor-pointer
            ${sizeMap[size] || sizeMap.md}
          `}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
