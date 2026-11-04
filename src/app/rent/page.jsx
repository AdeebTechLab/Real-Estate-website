import React from 'react';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { usePropertyFilters } from '../../hooks/usePropertyFilters.js';
import PropertyFiltersBar from '../../components/property/PropertyFiltersBar.jsx';
import PropertyGrid from '../../components/property/PropertyGrid.jsx';

export default function RentPage() {
  const { allProperties } = useFavorites();

  const {
    filters,
    updateFilter,
    resetFilters,
    paginatedListings,
    currentPage,
    totalPages,
    totalItems,
    setCurrentPage,
    hasActiveFilters
  } = usePropertyFilters(allProperties, {
    listingType: 'rent'
  }, 'rent');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
          Executive Leases & Tenancies
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-1">
          Properties for Rent in Pakistan
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Furnished executive suites, corporate office floors, and modern villas for rent across Lahore, Islamabad, and Karachi.
        </p>
      </div>

      <PropertyFiltersBar
        filters={filters}
        updateFilter={updateFilter}
        resetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
        totalResults={totalItems}
        listingTypeLocked
      />

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
