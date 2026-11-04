import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { usePropertyFilters } from '../../hooks/usePropertyFilters.js';
import PropertyFiltersBar from '../../components/property/PropertyFiltersBar.jsx';
import PropertyGrid from '../../components/property/PropertyGrid.jsx';

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const { allProperties } = useFavorites();

  const initialCity = searchParams.get('city') || 'all';
  const initialType = searchParams.get('type') || 'all'; // sale or rent
  const initialPropertyType = searchParams.get('propertyType') || 'all';
  const initialQ = searchParams.get('q') || '';

  const {
    filters,
    updateFilter,
    setMultipleFilters,
    resetFilters,
    filteredProperties,
    paginatedListings,
    currentPage,
    totalPages,
    totalItems,
    setCurrentPage,
    hasActiveFilters
  } = usePropertyFilters(allProperties, {
    city: initialCity,
    listingType: initialType,
    propertyType: initialPropertyType,
    searchQuery: initialQ
  });

  // Sync when query params change in the URL
  useEffect(() => {
    const city = searchParams.get('city');
    const type = searchParams.get('type');
    const propType = searchParams.get('propertyType');
    const q = searchParams.get('q');

    const overrides = {};
    if (city) overrides.city = city;
    if (type) overrides.listingType = type;
    if (propType) overrides.propertyType = propType;
    if (q) overrides.searchQuery = q;

    if (Object.keys(overrides).length > 0) {
      setMultipleFilters(overrides);
    }
  }, [searchParams, setMultipleFilters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
          Pakistan Real Estate Catalog
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-1">
          Explore All Properties
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Filter and sort through verified houses, penthouses, commercial suites, plots, and farmhouses in Lahore, Karachi, Islamabad, and beyond.
        </p>
      </div>

      {/* Filter System */}
      <PropertyFiltersBar
        filters={filters}
        updateFilter={updateFilter}
        resetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
        totalResults={totalItems}
      />

      {/* Property Results Grid */}
      <PropertyGrid
        properties={paginatedListings}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onResetFilters={resetFilters}
      />

    </div>
  );
}
