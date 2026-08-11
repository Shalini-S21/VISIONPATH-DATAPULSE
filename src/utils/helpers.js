/**
 * Generate a random ID
 */
export const genId = (prefix = 'id') =>
  `${prefix}_${Math.random().toString(36).slice(2, 9)}`;

/**
 * Debounce a function
 */
export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Clamp a number between min and max
 */
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/**
 * Get a random item from an array
 */
export const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Sleep for n milliseconds (used in mock APIs)
 */
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Group an array of objects by a key
 */
export const groupBy = (arr, key) =>
  arr.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});

/**
 * Sort array of objects by a key
 */
export const sortBy = (arr, key, direction = 'asc') =>
  [...arr].sort((a, b) => {
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

/**
 * Filter and search an array of objects by a query string
 */
export const filterBySearch = (arr, query, fields = []) => {
  if (!query) return arr;
  const q = query.toLowerCase();
  return arr.filter((item) =>
    fields.some((field) => String(item[field] || '').toLowerCase().includes(q))
  );
};

/**
 * Get color class based on a percentage value
 */
export const getPercentageColor = (pct) => {
  if (pct >= 80) return 'text-emerald-600';
  if (pct >= 60) return 'text-yellow-500';
  return 'text-red-500';
};

/**
 * Get status badge color variant
 */
export const getStatusVariant = (status) => {
  const map = {
    active: 'success',
    approved: 'success',
    completed: 'success',
    pending: 'warning',
    inactive: 'secondary',
    cancelled: 'danger',
    suspended: 'danger',
    rejected: 'danger',
  };
  return map[status?.toLowerCase()] || 'secondary';
};

/**
 * Validate email address
 */
export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Convert snake_case to Title Case
 */
export const snakeToTitle = (str) =>
  str ? str.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : '';
