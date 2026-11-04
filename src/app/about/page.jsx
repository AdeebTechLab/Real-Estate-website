import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, ShieldCheck, Award, Users, MapPin, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero section */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
          Our Heritage & Standard
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
          Pioneering Transparency in Pakistan’s Luxury Real Estate.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Founded to eliminate deed uncertainty and broker opacity, EstatePro pairs institutional legal due diligence with bespoke client concierge services for high-net-worth families, diaspora investors, and corporate institutions.
        </p>
      </div>

      {/* Grid of Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 stroke-[2]" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Zero Unverified Titles</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every residential villa, commercial floor, and plot listed on EstatePro has undergone complete ownership lineage checks, non-encumbrance certificate reviews, and transfer tax audits.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center">
            <Users className="w-6 h-6 stroke-[2]" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Diaspora Concierge</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Over 40% of our transaction volume serves overseas Pakistanis in the UK, UAE, USA, and Canada, providing live video tours, power of attorney facilitation, and banking compliance.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Award className="w-6 h-6 stroke-[2]" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">No Hidden Markups</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Direct seller-to-buyer transparent pricing denominated in PKR. Real market comparative analyses without artificial price escalations.
          </p>
        </div>
      </div>

      {/* Regional Office Hubs in Pakistan */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            National Footprint
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            EstatePro Flagship Advisory Offices
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Visit our private client advisory suites for confidential portfolio reviews and deed verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-2">
            <h3 className="text-base font-bold text-white">Lahore HQ</h3>
            <p className="text-xs text-slate-400">
              Floor 5, Tricon Corporate Centre, Main Boulevard, Gulberg III & DHA Phase 6 Commercial Hub.
            </p>
            <p className="text-xs text-emerald-400 pt-2 font-mono">+92 (042) 3571-8890</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-2">
            <h3 className="text-base font-bold text-white">Islamabad Capital Suite</h3>
            <p className="text-xs text-slate-400">
              ISE Towers, Jinnah Avenue, Blue Area & Sector F-7 Markaz.
            </p>
            <p className="text-xs text-emerald-400 pt-2 font-mono">+92 (051) 289-4412</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-2">
            <h3 className="text-base font-bold text-white">Karachi Waterfront Suite</h3>
            <p className="text-xs text-slate-400">
              The Forum, Khayaban-e-Jami, Block 9, Clifton & DHA Phase 8 Marine Drive.
            </p>
            <p className="text-xs text-emerald-400 pt-2 font-mono">+92 (021) 3587-1120</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center max-w-xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Ready to Discover Your Next Property?</h2>
        <p className="text-xs text-slate-500">
          Explore our complete portfolio or consult with an accredited senior broker today.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/properties"
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
          >
            Explore Properties
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold"
          >
            Contact Advisory
          </Link>
        </div>
      </div>

    </div>
  );
}
