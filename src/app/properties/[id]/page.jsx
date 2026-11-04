import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useFavorites } from '../../../context/FavoritesContext.jsx';
import { AGENTS } from '../../../data/agents.js';
import { formatPKR, formatSize, formatDate } from '../../../lib/formatters.js';
import ImageGallery from '../../../components/property/ImageGallery.jsx';
import PropertyCard from '../../../components/property/PropertyCard.jsx';
import InquiryForm from '../../../components/forms/InquiryForm.jsx';
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  ShieldCheck,
  Check,
  ArrowLeft,
  Building2,
  Share2,
  Car,
  Clock,
  Sparkles
} from 'lucide-react';

export default function PropertyDetailPage({ params: propParams }) {
  const hookParams = useParams();
  const params = propParams || hookParams;
  const router = useRouter();
  const { allProperties, isFavorite, toggleFavorite } = useFavorites();

  const propertyId = params?.id;
  const property = allProperties.find((p) => p.id === propertyId || p.slug === propertyId);

  // If not found, render proper not-found UI
  if (!property) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <Building2 className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Property Not Found</h1>
        <p className="text-xs text-slate-500 mb-6">
          The property identifier "{propertyId}" does not exist in our active or archived registries.
        </p>
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Properties</span>
        </Link>
      </div>
    );
  }

  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const agent = AGENTS.find((a) => a.id === property.agentId) || AGENTS[0];
  const favorited = isFavorite(property.id);
  const isRent = property.listingType === 'rent';
  const isPending = property.status === 'Pending Review';

  // Similar properties: same city or same property type, excluding current property
  const similarProperties = allProperties
    .filter((p) => p.id !== property.id && (p.city === property.city || p.propertyType === property.propertyType))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/properties"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Listings</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Share button with feedback */}
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>{copied ? 'Link Copied!' : 'Share'}</span>
          </button>

          {/* Favorite button */}
          <button
            type="button"
            onClick={() => toggleFavorite(property.id)}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              favorited
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{favorited ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Left Column (Gallery + Details) & Right Column (Sticky Inquiry + Agent) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column (2 Cols on lg) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Image Gallery */}
          <ImageGallery images={property.images} title={property.title} />

          {/* Heading & Price Summary */}
          <div className="space-y-4 border-b border-slate-200 pb-6">
            <div className="flex flex-wrap items-center gap-2">
              {isPending ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold bg-amber-500 text-slate-950 uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  Pending Editorial Review
                </span>
              ) : (
                <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                  isRent ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white'
                }`}>
                  {isRent ? 'For Rent' : 'For Sale'}
                </span>
              )}
              <span className="text-xs text-slate-500">
                {property.city} · {property.area}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">
                {formatDate(property.listedAt)}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
              {property.title}
            </h1>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-emerald-800 font-mono tabular-nums">
                {formatPKR(property.price, false)}
              </span>
              {isRent && <span className="text-sm text-slate-500 font-medium">/ month</span>}
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Property Specifications
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left">
              <div>
                <span className="text-xs text-slate-500 block mb-1">Total Area</span>
                <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                  {formatSize(property.size, property.sizeUnit)}
                </span>
              </div>
              {property.bedrooms > 0 && (
                <div>
                  <span className="text-xs text-slate-500 block mb-1">Bedrooms</span>
                  <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                    {property.bedrooms} Bed{property.bedrooms > 1 ? 's' : ''}
                  </span>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div>
                  <span className="text-xs text-slate-500 block mb-1">Bathrooms</span>
                  <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                    {property.bathrooms} Bath{property.bathrooms > 1 ? 's' : ''}
                  </span>
                </div>
              )}
              <div>
                <span className="text-xs text-slate-500 block mb-1">Furnishing</span>
                <span className="text-base font-bold text-slate-900 capitalize">
                  {property.furnishing || 'Standard'}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">About this Residence</h2>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities & Highlights */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">Amenities & Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-3 rounded-xl bg-white border border-slate-200/80 text-xs font-medium text-slate-800"
                  >
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Location Vicinity Notice */}
          <div className="bg-slate-100 rounded-2xl p-5 border border-slate-200 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700">
              <h3 className="font-bold text-slate-900">Exact Vicinity & Registry Record</h3>
              <p className="mt-0.5 leading-relaxed">
                Located in <span className="font-semibold">{property.area}, {property.city}</span>. Full allotment deed, verified NOC, and transfer tax calculations are available upon verified private appointment.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Agent Profile & Inquiry Module (Sticky) */}
        <div className="space-y-6">
          
          {/* Agent Brief Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Listing Advisor
            </span>
            <div className="flex items-center gap-3.5 mb-4">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shrink-0"
              />
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-slate-900 truncate">
                  <Link href={`/agents/${agent.id}`} className="hover:text-emerald-700 transition-colors">
                    {agent.name}
                  </Link>
                </h3>
                <p className="text-[11px] text-slate-500 truncate">{agent.title}</p>
                <p className="text-[11px] font-semibold text-emerald-700 mt-0.5 truncate">{agent.agency}</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-500">Direct Phone:</span>
                <a href={`tel:${agent.phone}`} className="font-semibold text-slate-900 hover:text-emerald-700">
                  {agent.phone}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email:</span>
                <a href={`mailto:${agent.email}`} className="font-semibold text-slate-900 hover:text-emerald-700 truncate max-w-[170px]">
                  {agent.email}
                </a>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <InquiryForm
            propertyTitle={property.title}
            agentName={agent.name}
          />

        </div>

      </div>

      {/* Similar Properties Section */}
      {similarProperties.length > 0 && (
        <div className="pt-12 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Similar Properties in {property.city}
            </h2>
            <Link
              href={`/properties?city=${property.city}`}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Browse all in {property.city} →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProperties.map((simProp) => (
              <PropertyCard key={simProp.id} property={simProp} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
