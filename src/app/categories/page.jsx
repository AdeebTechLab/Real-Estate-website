import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '../../data/categories.js';
import { Building2, ArrowRight } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
          Property Taxonomy
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-1">
          Explore Property Categories
        </h1>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          Whether you are looking for a turnkey luxury residence, an executive commercial floor, or agricultural country acreage, explore our categorized portfolios.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="group bg-white rounded-3xl border border-slate-200/90 hover:border-slate-300 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold">
                  {cat.count} Listings
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {cat.name}
                </h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {cat.description}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                    Prime Locations
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.popularLocations.map((loc, i) => (
                      <span key={i} className="text-[11px] px-2.5 py-1 rounded-md bg-slate-50 text-slate-700 border border-slate-200/60 font-medium">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href={`/properties?propertyType=${cat.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
              >
                <span>Browse {cat.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
