/**
 * Format a number with commas (e.g., 12450 → "12,450")
 */
export const formatNumber = (n) =>
  new Intl.NumberFormat('en-US').format(n);

/**
 * Format currency (e.g., 1234.5 → "$1,234.50")
 */
export const formatCurrency = (amount, symbol = '$') =>
  `${symbol}${new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(amount)}`;

/**
 * Format a date string to readable form
 */
export const formatDate = (dateStr, opts = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!dateStr) return '—';
  try {
    return new Intl.DateTimeFormat('en-US', opts).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (dateStr) => {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(dateStr, { month: 'short', day: 'numeric' });
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (text, maxLen = 100) => {
  if (!text) return '';
  return text.length <= maxLen ? text : `${text.slice(0, maxLen)}…`;
};

/**
 * Convert a string to title case
 */
export const toTitleCase = (str) =>
  str ? str.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()) : '';

/**
 * Generate initials from full name
 */
export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

/**
 * Format a rating (e.g., 4.9 → "4.9 ★")
 */
export const formatRating = (rating) =>
  rating ? `${Number(rating).toFixed(1)} ★` : '—';

/**
 * Pluralize a word based on count
 */
export const pluralize = (count, singular, plural) =>
  count === 1 ? `${count} ${singular}` : `${count} ${plural || singular + 's'}`;

/**
 * Format bytes to human-readable size
 */
export const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};
