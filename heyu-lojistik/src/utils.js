// ============================================
// KONSTRUKT — Utility Functions
// ============================================

/**
 * Format a number as Turkish Lira
 * @param {number} amount
 * @returns {string}
 */
export function formatPrice(amount) {
  return '₺' + amount.toLocaleString('tr-TR');
}

/**
 * Convert minutes ago to readable label
 * @param {number} minutes
 * @returns {string}
 */
export function minutesAgoLabel(minutes) {
  if (minutes < 1)  return 'Az önce';
  if (minutes < 60) return `${minutes} dk önce`;
  const h = Math.floor(minutes / 60);
  return `${h} saat önce`;
}

/**
 * Clamp a value between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Render a badge span
 */
export function renderBadge(text, type = 'navy') {
  return `<span class="badge badge--${type}">${text}</span>`;
}

/**
 * Debounce a function call
 */
export function debounce(fn, delay = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Get current time string HH:MM
 */
export function currentTime() {
  return new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Format date to Turkish locale string
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}
