import React, { useState } from 'react';

const Tabs = ({
  tabs = [],
  defaultTab,
  onChange,
  variant = 'underline',
  className = '',
}) => {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.key ?? tabs[0]);

  const handleClick = (key) => {
    setActive(key);
    onChange?.(key);
  };

  const getKey = (t) => (typeof t === 'string' ? t : t.key);
  const getLabel = (t) => (typeof t === 'string' ? t : t.label);

  if (variant === 'pill') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {tabs.map((t) => {
          const key = getKey(t);
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => handleClick(key)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600'
              }`}
            >
              {getLabel(t)}
            </button>
          );
        })}
      </div>
    );
  }

  // underline variant (default)
  return (
    <div className={`flex border-b border-slate-200 dark:border-slate-700 gap-0 overflow-x-auto ${className}`}>
      {tabs.map((t) => {
        const key = getKey(t);
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => handleClick(key)}
            className={`relative px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all duration-150 border-b-2 -mb-px ${
              isActive
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white'
            }`}
          >
            {getLabel(t)}
          </button>
        );
      })}
    </div>
  );
};

export { Tabs };
export default Tabs;
