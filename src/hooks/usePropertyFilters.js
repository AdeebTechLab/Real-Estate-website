import { useState, useMemo, useCallback } from 'react';
import { filterAndSortProperties, paginate } from '../lib/property-utils.js';

const INITIAL_FILTERS = {
  searchQuery: '',
  city: 'all',
  neighborhood: 'all',
  listingType: 'all',
  propertyType: 'all',
  minPrice: '',
  maxPrice: '',
  bedrooms: 'all',
  bathrooms: 'all',
  furnishing: 'all',
  minSize: '',
  maxSize: '',
  sizeUnit: 'Marla',
  sortBy: 'newest'
};

export function usePropertyFilters(properties = [], initialOverrides = {}) {
  const [filters, setFilters] = useState(() => ({
    ...INITIAL_FILTERS,
    ...initialOverrides
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1); // Reset page on filter change
  }, []);

  const setMultipleFilters = useCallback((newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters
    }));
    setCurrentPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      ...INITIAL_FILTERS,
      ...initialOverrides
    });
    setCurrentPage(1);
  }, [initialOverrides]);

  const filteredProperties = useMemo(() => {
    return filterAndSortProperties(properties, filters);
  }, [properties, filters]);

  const paginationData = useMemo(() => {
    return paginate(filteredProperties, currentPage, pageSize);
  }, [filteredProperties, currentPage, pageSize]);

  const hasActiveFilters = useMemo(() => {
    return (
      (filters.searchQuery && filters.searchQuery.trim() !== '') ||
      (filters.city && filters.city !== 'all') ||
      (filters.neighborhood && filters.neighborhood !== 'all') ||
      (filters.propertyType && filters.propertyType !== 'all') ||
      (filters.listingType && filters.listingType !== 'all' && (!initialOverrides.listingType || filters.listingType !== initialOverrides.listingType)) ||
      filters.minPrice !== '' ||
      filters.maxPrice !== '' ||
      filters.bedrooms !== 'all' ||
      filters.bathrooms !== 'all' ||
      filters.furnishing !== 'all' ||
      filters.minSize !== '' ||
      filters.maxSize !== ''
    );
  }, [filters, initialOverrides]);

  return {
    filters,
    updateFilter,
    setMultipleFilters,
    resetFilters,
    filteredProperties,
    paginatedListings: paginationData.items,
    currentPage: paginationData.currentPage,
    totalPages: paginationData.totalPages,
    totalItems: paginationData.totalItems,
    setCurrentPage,
    hasActiveFilters
  };
}
