/**
 * Format currency numbers into Pakistani Lakh and Crore or standard notation
 * @param {number} amount
 * @param {boolean} [compact=true]
 * @returns {string}
 */
export function formatPKR(amount, compact = true) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return 'PKR 0';
  }

  const num = Number(amount);

  if (!compact) {
    return `PKR ${num.toLocaleString('en-PK')}`;
  }

  if (num >= 10000000) {
    const crore = (num / 10000000).toFixed(2).replace(/\.00$/, '');
    return `PKR ${crore} Crore`;
  } else if (num >= 100000) {
    const lakh = (num / 100000).toFixed(2).replace(/\.00$/, '');
    return `PKR ${lakh} Lakh`;
  } else if (num >= 1000) {
    return `PKR ${num.toLocaleString('en-PK')}`;
  }

  return `PKR ${num}`;
}

/**
 * Format property size with local units (Marla, Kanal, Sq.Ft)
 * @param {number} size
 * @param {string} unit
 * @returns {string}
 */
export function formatSize(size, unit = 'Marla') {
  if (!size) return 'N/A';
  return `${size} ${unit}`;
}

/**
 * Format relative or standard date
 * @param {string|Date} dateStr
 * @returns {string}
 */
export function formatDate(dateStr) {
  if (!dateStr) return 'Recently listed';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 'Recently listed';

  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays <= 0) return 'Listed today';
  if (diffInDays === 1) return 'Listed yesterday';
  if (diffInDays < 7) return `Listed ${diffInDays} days ago`;
  if (diffInDays < 30) return `Listed ${Math.floor(diffInDays / 7)} weeks ago`;

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

/**
 * Generate clean URL slug from title and id
 * @param {string} title
 * @param {string|number} id
 * @returns {string}
 */
export function generateSlug(title, id) {
  const cleanTitle = (title || '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${cleanTitle}-${id}`;
}
