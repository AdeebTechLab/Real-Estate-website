import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PropertyCard from '../components/property/PropertyCard.jsx';
import { PROPERTIES } from '../data/properties.js';
import { CATEGORIES } from '../data/categories.js';
import { CITIES, PROPERTY_TYPES } from '../lib/constants.js';
import {
  Search,
  Building2,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  MapPin,
  Award,
  Sparkles
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all'); // all, sale, rent
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (activeTab !== 'all') params.set('type', activeTab);
    if (selectedCity !== 'all') params.set('city', selectedCity);
    if (selectedType !== 'all') params.set('propertyType', selectedType);
    if (searchKeyword.trim()) params.set('q', searchKeyword.trim());

    router.push(`/properties?${params.toString()}`);
  };

  const featuredProperties = PROPERTIES.filter((p) => p.featured).slice(0, 6);

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden pt-12 pb-24 sm:pt-16 sm:pb-32">
        {/* Subtle background ambient image */}
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
            alt="EstatePro Luxury Real Estate"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/90 to-slate-900" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Pakistani Property Marketplace</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Exquisite Residences & Prime Portfolios Across Pakistan.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed">
              Explore bespoke architect-designed villas in DHA Lahore, seafront duplex penthouses in Clifton Karachi, and diplomatic mansions facing the Margalla Hills.
            </p>
          </div>

          {/* Search Engine Card */}
          <div className="mt-10 max-w-4xl bg-white rounded-3xl p-4 sm:p-6 shadow-2xl text-slate-900">
            {/* Tabs for Buy / Rent / All */}
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  activeTab === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                All Listings
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('sale')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  activeTab === 'sale'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                For Sale
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('rent')}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  activeTab === 'rent'
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                For Rent
              </button>
            </div>

            {/* Filter Inputs Grid */}
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Location / Keyword
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="e.g. DHA Phase 6, F-7"
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600 transition-colors"
                >
                  <option value="all">All Pakistan Metros</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Property Category
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600 transition-colors"
                >
                  <option value="all">Any Category</option>
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Properties</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* 2. Key Trust Metrics Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              PKR 45B+
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Transacted Asset Volume</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              1,200+
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Verified Local Listings</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">
              99.6%
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Deed & Title Due Diligence</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              6
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Key Pakistani Metros</div>
          </div>
        </div>
      </section>

      {/* 3. Featured Residences */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Curated Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Featured Luxury Listings
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Hand-selected contemporary villas, penthouses, and executive suites across Lahore, Islamabad, and Karachi.
            </p>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-emerald-700 transition-colors"
          >
            <span>View All {PROPERTIES.length} Listings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {featuredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* 4. Property Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Asset Classes
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Explore by Property Type
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            From ready-to-build residential plots to grand Margalla country farmhouses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/properties?propertyType=${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 flex flex-col justify-end p-5 text-white shadow-xs hover:shadow-md transition-all"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

              <div className="relative z-10">
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                  {cat.count} Available Listings
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5 group-hover:text-emerald-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-1 mt-1 font-light">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Featured Pakistani Metros */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Regional Presence
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Top Metropolitan Markets
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              Browse listings concentrated in Pakistan’s highest yielding real estate corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                city: 'Lahore',
                areas: 'DHA Phase 5 & 6, Gulberg III, Model Town',
                count: '11 Listings',
                img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
              },
              {
                city: 'Islamabad',
                areas: 'Sectors F-6, F-7, F-8, Bahria Enclave',
                count: '8 Listings',
                img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80'
              },
              {
                city: 'Karachi',
                areas: 'Clifton Seafront, DHA Phase 8 & 6',
                count: '5 Listings',
                img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
              },
              {
                city: 'Rawalpindi',
                areas: 'Bahria Town Phase 8, Chaklala Scheme 3',
                count: '3 Listings',
                img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80'
              }
            ].map((loc) => (
              <Link
                key={loc.city}
                href={`/properties?city=${loc.city}`}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <Image
                    src={loc.img}
                    alt={loc.city}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-semibold">
                    {loc.count}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {loc.city}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {loc.areas}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Company Benefits & Trust Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Integrity First
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Why Discerning Clients Choose EstatePro
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            Eliminating opacity in Pakistan's property sector through legal verification and institutional advisory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 stroke-[2]" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Deed & Title Due Diligence</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every property published on our platform undergoes verified ownership deed cross-checks with LDA, CDA, and DHA registries before listing.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center">
              <Award className="w-5 h-5 stroke-[2]" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Dedicated Senior Brokers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Deal directly with accredited senior advisors who understand high-value negotiations, tax bylaws, and discreet closing formalities.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 stroke-[2]" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Transparent Valuations in PKR</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real transaction benchmarks and neighborhood historical comps with zero hidden listing markups or artificial demand inflating.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              List With EstatePro
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Are You Selling or Renting High-Value Property in Pakistan?
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Reach pre-qualified overseas Pakistani investors and qualified institutional buyers with bespoke marketing and legal deed clearance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/submit-property"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-sm whitespace-nowrap"
            >
              Submit Property Listing
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs transition-colors whitespace-nowrap"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
