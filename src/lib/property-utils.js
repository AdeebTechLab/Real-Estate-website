/**
 * Convert local Pakistani property units to normalized Square Feet
 * 1 Marla = 225 sq.ft
 * 1 Kanal = 20 Marla = 4500 sq.ft
 * @param {number} size
 * @param {string} unit
 * @returns {number}
 */
export function normalizeToSqFt(size, unit) {
  const num = Number(size) || 0;
  if (!unit) return num;

  const lower = unit.toLowerCase();
  if (lower.includes('kanal')) {
    return num * 4500;
  }
  if (lower.includes('marla')) {
    return num * 225;
  }
  return num;
}

/**
 * Filter and sort properties based on criteria
 * @param {Array} properties
 * @param {Object} filters
 * @returns {Array}
 */
export function filterAndSortProperties(properties = [], filters = {}) {
  const {
    searchQuery = '',
    city = 'all',
    neighborhood = 'all',
    listingType = 'all',
    propertyType = 'all',
    minPrice = '',
    maxPrice = '',
    bedrooms = 'all',
    bathrooms = 'all',
    furnishing = 'all',
    minSize = '',
    maxSize = '',
    sizeUnit = 'Marla',
    sortBy = 'newest'
  } = filters;

  const filtered = properties.filter((property) => {
    // Search query
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = property.title?.toLowerCase().includes(q);
      const matchCity = property.city?.toLowerCase().includes(q);
      const matchArea = property.area?.toLowerCase().includes(q);
      const matchDesc = property.description?.toLowerCase().includes(q);
      const matchType = property.propertyType?.toLowerCase().includes(q);

      if (!matchTitle && !matchCity && !matchArea && !matchDesc && !matchType) {
        return false;
      }
    }

    // City
    if (city && city !== 'all' && property.city?.toLowerCase() !== city.toLowerCase()) {
      return false;
    }

    // Neighborhood / Area
    if (neighborhood && neighborhood !== 'all' && property.area?.toLowerCase() !== neighborhood.toLowerCase()) {
      return false;
    }

    // Listing Type (sale or rent)
    if (listingType && listingType !== 'all' && property.listingType?.toLowerCase() !== listingType.toLowerCase()) {
      return false;
    }

    // Property Type
    if (propertyType && propertyType !== 'all' && property.propertyType?.toLowerCase() !== propertyType.toLowerCase()) {
      return false;
    }

    // Min Price
    if (minPrice !== '' && !isNaN(minPrice)) {
      if (property.price < Number(minPrice)) return false;
    }

    // Max Price
    if (maxPrice !== '' && !isNaN(maxPrice)) {
      if (property.price > Number(maxPrice)) return false;
    }

    // Bedrooms
    if (bedrooms && bedrooms !== 'all') {
      const bedNum = Number(bedrooms);
      if (bedrooms === '5+' ? (property.bedrooms || 0) < 5 : property.bedrooms !== bedNum) {
        return false;
      }
    }

    // Bathrooms are minimums ("1+", "2+", "3+", "4+"), matching the filter labels
    if (bathrooms && bathrooms !== 'all') {
      const minBaths = bathrooms === '4+' ? 4 : Number(bathrooms);
      if ((property.bathrooms || 0) < minBaths) return false;
    }

    // Furnishing
    if (furnishing && furnishing !== 'all' && property.furnishing !== furnishing) {
      return false;
    }

    // Size range
    const itemSqFt = normalizeToSqFt(property.size, property.sizeUnit);
    if (minSize !== '' && !isNaN(minSize)) {
      const minSqFt = normalizeToSqFt(Number(minSize), sizeUnit);
      if (itemSqFt < minSqFt) return false;
    }
    if (maxSize !== '' && !isNaN(maxSize)) {
      const maxSqFt = normalizeToSqFt(Number(maxSize), sizeUnit);
      if (itemSqFt > maxSqFt) return false;
    }

    return true;
  });

  // Sorting
  return filtered.sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'size_desc': {
        const sqftA = normalizeToSqFt(a.size, a.sizeUnit);
        const sqftB = normalizeToSqFt(b.size, b.sizeUnit);
        return sqftB - sqftA;
      }
      case 'newest':
      default:
        return new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime();
    }
  });
}

/**
 * Paginate an array
 * @param {Array} items
 * @param {number} page (1-indexed)
 * @param {number} pageSize
 * @returns {{ items: Array, totalPages: number, totalItems: number, currentPage: number }}
 */
export function paginate(items, page = 1, pageSize = 9) {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedItems = items.slice(startIndex, startIndex + pageSize);

  return {
    items: paginatedItems,
    totalPages,
    totalItems,
    currentPage
  };
}
