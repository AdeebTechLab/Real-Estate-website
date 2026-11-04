import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFavorites } from '../../hooks/useFavorites.js';
import { formatPKR, formatSize } from '../../lib/formatters.js';
import { Heart, MapPin, Bed, Bath, Maximize2, ShieldCheck, Clock } from 'lucide-react';

export default function PropertyCard({ property }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(property.id);

  const mainImage = property.images && property.images.length > 0
    ? property.images[0]
    : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

  const isRent = property.listingType === 'rent';
  const isPending = property.status === 'Pending Review';

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Visual Header / Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Link href={`/properties/${property.id}`} className="block w-full h-full">
          <Image
            src={mainImage}
            alt={property.title}
            fill
            className="group-hover:scale-105 transition-transform duration-500 ease-out object-cover"
          />
        </Link>

        {/* Transaction Badges (Sale / Rent / Pending) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {isPending ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-500 text-slate-950 shadow-xs uppercase tracking-wider">
              <Clock className="w-3 h-3" />
              Pending Review
            </span>
          ) : (
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider shadow-xs ${
                isRent
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 text-white'
              }`}
            >
              {isRent ? 'For Rent' : 'For Sale'}
            </span>
          )}

          {property.featured && !isPending && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold bg-white/90 backdrop-blur-xs text-slate-800 shadow-xs">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Featured
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          aria-label={favorited ? `Remove ${property.title} from saved favorites` : `Save ${property.title} to favorites`}
          className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-rose-500 backdrop-blur-xs shadow-sm transition-transform active:scale-95 focus-visible:outline-none"
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : 'text-slate-700'}`} />
        </button>

        {/* Price Scrim Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-3.5 pt-8 pointer-events-none">
          <div className="flex items-baseline gap-1 text-white">
            <span className="text-xl font-bold tracking-tight tabular-nums font-mono">
              {formatPKR(property.price, false)}
            </span>
            {isRent && <span className="text-xs text-slate-300 font-sans">/ month</span>}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location Line */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{property.area}, {property.city}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 mb-2">
            <Link href={`/properties/${property.id}`} className="focus-visible:outline-none">
              {property.title}
            </Link>
          </h3>

          {/* Specs Bar */}
          <div className="flex items-center gap-4 py-2 border-y border-slate-100 text-xs text-slate-600">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1.5" title={`${property.bedrooms} Bedrooms`}>
                <Bed className="w-4 h-4 text-slate-400" />
                <span className="font-semibold tabular-nums text-slate-800">{property.bedrooms}</span> Beds
              </span>
            )}
            {property.bathrooms > 0 && (
              <span className="flex items-center gap-1.5" title={`${property.bathrooms} Bathrooms`}>
                <Bath className="w-4 h-4 text-slate-400" />
                <span className="font-semibold tabular-nums text-slate-800">{property.bathrooms}</span> Baths
              </span>
            )}
            <span className="flex items-center gap-1.5" title={`Size: ${formatSize(property.size, property.sizeUnit)}`}>
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold tabular-nums text-slate-800">{formatSize(property.size, property.sizeUnit)}</span>
            </span>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="mt-3 pt-2 flex items-center justify-between text-xs text-slate-500">
          <span className="capitalize">{property.furnishing || 'Standard'}</span>
          <Link
            href={`/properties/${property.id}`}
            className="font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
          >
            Details →
          </Link>
        </div>

      </div>

    </article>
  );
}
