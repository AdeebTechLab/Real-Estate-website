import React, { useState } from 'react';
import { CITIES, NEIGHBORHOODS_BY_CITY, PROPERTY_TYPES, LISTING_TYPES, FURNISHING_STATUSES, SORT_OPTIONS, SIZE_UNITS } from '../../lib/constants.js';
import { Search, SlidersHorizontal, RotateCcw, X } from 'lucide-react';

export default function PropertyFiltersBar({
  filters,
  updateFilter,
  resetFilters,
  hasActiveFilters,
  totalResults = 0
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const neighborhoods = filters.city && filters.city !== 'all' && NEIGHBORHOODS_BY_CITY[filters.city]
    ? NEIGHBORHOODS_BY_CITY[filters.city]
    : [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs mb-8">
      
      {/* Primary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Search Query */}
        <div className="relative">
          <label htmlFor="search-input" className="sr-only">Search properties</label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="search-input"
            type="text"
            value={filters.searchQuery || ''}
            onChange={(e) => updateFilter('searchQuery', e.target.value)}
            placeholder="Search city, sector, or keyword..."
            className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-600 transition-colors"
          />
        </div>

        {/* City Selector */}
        <div>
          <label htmlFor="city-select" className="sr-only">City</label>
          <select
            id="city-select"
            value={filters.city || 'all'}
            onChange={(e) => {
              updateFilter('city', e.target.value);
              updateFilter('neighborhood', 'all');
            }}
            className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600 transition-colors"
          >
            <option value="all">All Cities (Pakistan)</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label htmlFor="property-type-select" className="sr-only">Property Type</label>
          <select
            id="property-type-select"
            value={filters.propertyType || 'all'}
            onChange={(e) => updateFilter('propertyType', e.target.value)}
            className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600 transition-colors"
          >
            <option value="all">All Property Types</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* Listing Type / Action Group */}
        <div className="flex items-center gap-2">
          <select
            aria-label="Listing transaction type"
            value={filters.listingType || 'all'}
            onChange={(e) => updateFilter('listingType', e.target.value)}
            className="flex-1 px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600 transition-colors"
          >
            {LISTING_TYPES.map((l) => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`px-3 py-2.5 text-xs font-semibold rounded-xl border flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              showAdvanced || hasActiveFilters
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>

      </div>

      {/* Advanced Filters Expandable Drawer */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
          
          {/* Neighborhood (if city selected) */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Neighborhood / Area
            </label>
            <select
              value={filters.neighborhood || 'all'}
              onChange={(e) => updateFilter('neighborhood', e.target.value)}
              disabled={neighborhoods.length === 0}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 disabled:opacity-50"
            >
              <option value="all">
                {neighborhoods.length === 0 ? 'Select a city first' : 'All Neighborhoods'}
              </option>
              {neighborhoods.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Price Range (PKR)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min PKR"
                value={filters.minPrice || ''}
                onChange={(e) => updateFilter('minPrice', e.target.value)}
                className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              />
              <input
                type="number"
                placeholder="Max PKR"
                value={filters.maxPrice || ''}
                onChange={(e) => updateFilter('maxPrice', e.target.value)}
                className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Beds & Baths
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                aria-label="Bedrooms filter"
                value={filters.bedrooms || 'all'}
                onChange={(e) => updateFilter('bedrooms', e.target.value)}
                className="w-full px-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="all">Any Beds</option>
                <option value="1">1 Bed</option>
                <option value="2">2 Beds</option>
                <option value="3">3 Beds</option>
                <option value="4">4 Beds</option>
                <option value="5+">5+ Beds</option>
              </select>
              <select
                aria-label="Bathrooms filter"
                value={filters.bathrooms || 'all'}
                onChange={(e) => updateFilter('bathrooms', e.target.value)}
                className="w-full px-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="all">Any Baths</option>
                <option value="1">1+ Bath</option>
                <option value="2">2+ Baths</option>
                <option value="3">3+ Baths</option>
                <option value="4+">4+ Baths</option>
              </select>
            </div>
          </div>

          {/* Furnishing Status */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Furnishing
            </label>
            <select
              value={filters.furnishing || 'all'}
              onChange={(e) => updateFilter('furnishing', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
            >
              {FURNISHING_STATUSES.map((f) => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
          </div>

        </div>
      )}

      {/* Sub Bar: Result Count, Active Chips, Sort, Reset */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-900 tabular-nums">
            {totalResults} {totalResults === 1 ? 'Property' : 'Properties'} found
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 font-medium ml-2 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Sort by:</span>
          <select
            value={filters.sortBy || 'newest'}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

    </div>
  );
}
