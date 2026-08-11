import React, { useState, useRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = React.forwardRef(({
  label,
  error,
  hint,
  icon: Icon,
  iconRight,
  type = 'text',
  size = 'md',
  className = '',
  inputClassName = '',
  disabled = false,
  required = false,
  ...rest
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

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
      <div className="relative flex items-center">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
        )}
        <input
          ref={ref}
          type={inputType}
          disabled={disabled}
          className={`
            w-full bg-white dark:bg-slate-900 border
            ${error ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500'}
            text-slate-900 dark:text-white placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-150
            ${Icon ? 'pl-10' : ''}
            ${isPassword || iconRight ? 'pr-10' : ''}
            ${sizeMap[size] || sizeMap.md}
            ${inputClassName}
          `}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
        {iconRight && !isPassword && (
          <iconRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
