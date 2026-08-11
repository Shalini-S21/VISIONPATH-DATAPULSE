import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumb = ({ items }) => {
  const location = useLocation();

  // Generate automatically from URL path if items not explicitly passed
  const pathSnippets = location.pathname.split('/').filter((x) => x);
  
  const defaultItems = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const label = snippet.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    return { label, url };
  });

  const listItems = items || defaultItems;

  return (
    <nav className="flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-4" aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
      >
        <Home className="w-3.5 h-3.5 mr-1" />
        <span>Home</span>
      </Link>
      {listItems.map((item, idx) => {
        const isLast = idx === listItems.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-gray-400 flex-shrink-0" />
            {isLast ? (
              <span className="text-gray-900 dark:text-gray-100 font-semibold">{item.label}</span>
            ) : (
              <Link
                to={item.url}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
