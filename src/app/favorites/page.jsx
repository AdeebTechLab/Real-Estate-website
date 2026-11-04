import React from 'react';
import Link from 'next/link';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import PropertyCard from '../../components/property/PropertyCard.jsx';
import { Heart, ArrowLeft, Search, Trash2 } from 'lucide-react';

export default function FavoritesPage() {
  const { favoriteProperties, favoriteIds } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Personal Shortlist
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-1">
            Saved Properties ({favoriteProperties.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Residences and commercial spaces you have bookmarked for comparison and private viewings.
          </p>
        </div>

        <Link
          href="/properties"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Discover More Properties</span>
        </Link>
      </div>

      {/* Content */}
      {favoriteProperties.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center max-w-lg mx-auto my-12 space-y-4">
          <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7 stroke-[1.5]" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Your Shortlist is Empty</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Click the heart icon on any property card to save homes, penthouses, or plots for quick access and price tracking.
          </p>
          <div className="pt-2">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Browse All Listings</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {favoriteProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      )}

    </div>
  );
}
