import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('visionpath-theme') || localStorage.getItem('vp_dark_mode');
  if (saved !== null) {
    try {
      const parsed = JSON.parse(saved);
      if (typeof parsed === 'boolean') return parsed;
      if (parsed === 'dark') return true;
      if (parsed === 'light') return false;
    } catch {
      return saved === 'dark' || saved === 'true';
    }
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const initialDarkMode = getInitialTheme();

const applyThemeToDOM = (isDark) => {
  if (typeof document === 'undefined') return;
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
};

applyThemeToDOM(initialDarkMode);

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: initialDarkMode,
    isDark: initialDarkMode,
  },
  reducers: {
    toggleTheme: (state) => {
      const next = !state.darkMode;
      state.darkMode = next;
      state.isDark = next;
      localStorage.setItem('visionpath-theme', next ? 'dark' : 'light');
      localStorage.setItem('vp_dark_mode', JSON.stringify(next));
      applyThemeToDOM(next);
    },
    setDarkMode: (state, action) => {
      const next = Boolean(action.payload);
      state.darkMode = next;
      state.isDark = next;
      localStorage.setItem('visionpath-theme', next ? 'dark' : 'light');
      localStorage.setItem('vp_dark_mode', JSON.stringify(next));
      applyThemeToDOM(next);
    },
  },
});

export const { toggleTheme, setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
