import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFavorites } from '../../hooks/useFavorites.js';
import { validatePropertyForm } from '../../lib/validation.js';
import { CITIES, PROPERTY_TYPES, SIZE_UNITS, FURNISHING_STATUSES, AMENITIES_LIST } from '../../lib/constants.js';
import { Building2, CheckCircle2, AlertCircle, Plus, Trash2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function PropertySubmissionForm() {
  const router = useRouter();
  const { addSubmittedProperty } = useFavorites();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    listingType: 'sale',
    propertyType: 'house',
    city: 'Lahore',
    area: '',
    bedrooms: '4',
    bathrooms: '4',
    size: '1',
    sizeUnit: 'Kanal',
    furnishing: 'Semi-Furnished',
    description: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    amenities: ['Central Air Conditioning', 'Modern Fitted Kitchen', '24/7 Gated Security & CCTV']
  });

  const [errors, setErrors] = useState({});
  const [createdProperty, setCreatedProperty] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validatePropertyForm(formData);

    if (!result.isValid) {
      setErrors(result.errors);
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newListing = addSubmittedProperty({
        title: formData.title.trim(),
        price: Number(formData.price),
        listingType: formData.listingType,
        propertyType: formData.propertyType,
        city: formData.city,
        area: formData.area.trim(),
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        size: Number(formData.size) || 1,
        sizeUnit: formData.sizeUnit,
        furnishing: formData.furnishing,
        description: formData.description.trim(),
        amenities: formData.amenities,
        images: [
          formData.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
        ],
        agentId: 'agent-1'
      });

      setIsSubmitting(false);
      setCreatedProperty(newListing);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  if (createdProperty) {
    return (
      <div className="bg-white rounded-3xl border border-emerald-200 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-9 h-9 stroke-[2]" />
        </div>
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
            Status: Pending Editorial Review
          </span>
          <h2 className="text-2xl font-bold text-slate-900 pt-2">Listing Successfully Submitted!</h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Your property <span className="font-semibold text-slate-900">"{createdProperty.title}"</span> has been registered in the demo marketplace. It is currently marked with a <span className="font-semibold text-amber-700">Pending Review</span> badge.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-xs text-slate-700 space-y-2 max-w-md mx-auto">
          <div className="flex justify-between">
            <span className="text-slate-500">Listing ID:</span>
            <span className="font-mono font-medium">{createdProperty.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Location:</span>
            <span className="font-medium">{createdProperty.area}, {createdProperty.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Asking Price:</span>
            <span className="font-semibold text-emerald-700 font-mono">PKR {Number(createdProperty.price).toLocaleString('en-PK')}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href={`/properties/${createdProperty.id}`}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold tracking-wide transition-colors"
          >
            Preview Listing Details
          </Link>
          <Link
            href="/properties"
            className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors"
          >
            Browse Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-8">
      
      {/* Section 1: Basic Information */}
      <div className="space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900">1. Property Essentials</h2>
          <p className="text-xs text-slate-500">Basic identification, transaction category, and pricing.</p>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="submit-title" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Property Title *
          </label>
          <input
            id="submit-title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. 1 Kanal Modern Spanish Villa with Swimming Pool"
            className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
              errors.title ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 focus:border-emerald-600'
            }`}
          />
          {errors.title && <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.title}</p>}
        </div>

        {/* Transaction Type & Property Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="submit-listingType" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Listing Purpose *
            </label>
            <select
              id="submit-listingType"
              name="listingType"
              value={formData.listingType}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
            >
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>

          <div>
            <label htmlFor="submit-propertyType" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Property Category *
            </label>
            <select
              id="submit-propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
            >
              {PROPERTY_TYPES.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Asking Price */}
        <div>
          <label htmlFor="submit-price" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Asking Price (PKR) *
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs font-bold text-slate-400 pointer-events-none">
              PKR
            </span>
            <input
              id="submit-price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 85000000"
              className={`w-full pl-12 pr-3.5 py-2.5 text-xs font-mono bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
                errors.price ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 focus:border-emerald-600'
              }`}
            />
          </div>
          {errors.price && <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.price}</p>}
        </div>
      </div>

      {/* Section 2: Location */}
      <div className="space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900">2. Geographic Location</h2>
          <p className="text-xs text-slate-500">Major city and local sector / phase in Pakistan.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="submit-city" className="block text-xs font-semibold text-slate-700 mb-1.5">
              City *
            </label>
            <select
              id="submit-city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="submit-area" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Neighborhood / Sector *
            </label>
            <input
              id="submit-area"
              name="area"
              type="text"
              value={formData.area}
              onChange={handleChange}
              placeholder="e.g. DHA Phase 5 Sector C"
              className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
                errors.area ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 focus:border-emerald-600'
              }`}
            />
            {errors.area && <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.area}</p>}
          </div>
        </div>
      </div>

      {/* Section 3: Physical Specifications */}
      <div className="space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900">3. Specifications & Dimensions</h2>
          <p className="text-xs text-slate-500">Dimensions in local Pakistani units (Marla/Kanal) and room counts.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label htmlFor="submit-size" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Size *
            </label>
            <input
              id="submit-size"
              name="size"
              type="number"
              step="0.5"
              value={formData.size}
              onChange={handleChange}
              placeholder="1"
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label htmlFor="submit-sizeUnit" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Unit *
            </label>
            <select
              id="submit-sizeUnit"
              name="sizeUnit"
              value={formData.sizeUnit}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
            >
              {SIZE_UNITS.map((u) => (
                <option key={u.id} value={u.id}>{u.id}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="submit-bedrooms" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Bedrooms
            </label>
            <input
              id="submit-bedrooms"
              name="bedrooms"
              type="number"
              min="0"
              value={formData.bedrooms}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label htmlFor="submit-bathrooms" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Bathrooms
            </label>
            <input
              id="submit-bathrooms"
              name="bathrooms"
              type="number"
              min="0"
              value={formData.bathrooms}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
        </div>

        <div>
          <label htmlFor="submit-furnishing" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Furnishing Condition
          </label>
          <select
            id="submit-furnishing"
            name="furnishing"
            value={formData.furnishing}
            onChange={handleChange}
            className="w-full sm:w-1/2 px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
          >
            {FURNISHING_STATUSES.filter(f => f.id !== 'all').map((f) => (
              <option key={f.id} value={f.id}>{f.label}</option>
            ))}
          </select>
        </div>

        {/* Amenities Checkboxes */}
        <div>
          <span className="block text-xs font-semibold text-slate-700 mb-2">
            Key Amenities
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {AMENITIES_LIST.map((amenity) => {
              const checked = formData.amenities.includes(amenity);
              return (
                <label
                  key={amenity}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                    checked
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-medium'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>{amenity}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="submit-imageUrl" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Featured Photograph URL
          </label>
          <input
            id="submit-imageUrl"
            name="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/..."
            className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="submit-description" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Property Description *
          </label>
          <textarea
            id="submit-description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the architectural layout, interior specifications, view, and vicinity highlights..."
            className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
              errors.description ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 focus:border-emerald-600'
            }`}
          />
          {errors.description && <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.description}</p>}
        </div>
      </div>

      {/* Section 4: Owner / Agent Contact */}
      <div className="space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900">4. Submitter Contact Details</h2>
          <p className="text-xs text-slate-500">Contact information for prospective buyer / tenant inquiries.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="submit-contactName" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Full Name *
            </label>
            <input
              id="submit-contactName"
              name="contactName"
              type="text"
              value={formData.contactName}
              onChange={handleChange}
              placeholder="e.g. Asad Rehman"
              className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
                errors.contactName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 focus:border-emerald-600'
              }`}
            />
            {errors.contactName && <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.contactName}</p>}
          </div>

          <div>
            <label htmlFor="submit-contactEmail" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email *
            </label>
            <input
              id="submit-contactEmail"
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="asad@example.com"
              className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
                errors.contactEmail ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 focus:border-emerald-600'
              }`}
            />
            {errors.contactEmail && <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.contactEmail}</p>}
          </div>

          <div>
            <label htmlFor="submit-contactPhone" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Phone / WhatsApp *
            </label>
            <input
              id="submit-contactPhone"
              name="contactPhone"
              type="tel"
              value={formData.contactPhone}
              onChange={handleChange}
              placeholder="0300 9876543"
              className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
                errors.contactPhone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 focus:border-emerald-600'
              }`}
            />
            {errors.contactPhone && <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.contactPhone}</p>}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500">
          * Demo listings are saved locally to your browser with pending editorial moderation status.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold tracking-wide transition-all duration-200 disabled:opacity-50 whitespace-nowrap shadow-sm"
        >
          {isSubmitting ? 'Submitting Listing...' : 'Publish Listing for Review'}
        </button>
      </div>

    </form>
  );
}
