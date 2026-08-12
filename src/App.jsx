import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppRoutes from './routes/AppRoutes';

function App() {
  const isDark = useSelector((s) => s.theme?.darkMode ?? s.theme?.isDark ?? false);

  // Sync dark mode class and data attribute to <html> and <body>
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      if (body) body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      if (body) body.classList.remove('dark');
    }
  }, [isDark]);

  return <AppRoutes />;
}

export default App;
