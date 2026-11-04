import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, MapPin, Mail, Phone, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setIsSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 text-white">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Building2 className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Estate<span className="text-emerald-400">Pro</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Pakistan’s premier technology-driven luxury real estate marketplace. Curated villas, seafront penthouses, and prime commercial portfolios across Lahore, Islamabad, and Karachi.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Listings & Registered Legal Due Diligence</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Marketplace
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/properties" className="hover:text-emerald-400 transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link href="/buy" className="hover:text-emerald-400 transition-colors">
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link href="/rent" className="hover:text-emerald-400 transition-colors">
                  Properties for Rent
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-emerald-400 transition-colors">
                  Property Types
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-emerald-400 transition-colors">
                  Saved Favorites
                </Link>
              </li>
              <li>
                <Link href="/submit-property" className="hover:text-emerald-400 transition-colors">
                  List Your Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Key Cities */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Key Locations
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/properties?city=Lahore" className="hover:text-emerald-400 transition-colors">
                  DHA & Gulberg, Lahore
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Islamabad" className="hover:text-emerald-400 transition-colors">
                  Sectors F-6 & F-7, Islamabad
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Karachi" className="hover:text-emerald-400 transition-colors">
                  Clifton & DHA, Karachi
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Rawalpindi" className="hover:text-emerald-400 transition-colors">
                  Bahria Town, Rawalpindi
                </Link>
              </li>
              <li>
                <Link href="/agents" className="hover:text-emerald-400 transition-colors">
                  Agent Directory
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About EstatePro
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Market Intelligence
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive monthly Pakistani property valuation trends and off-market investment briefings.
            </p>
            {isSubscribed ? (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Demo subscribed! You will receive sample market updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full px-3 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Disclaimers & Offices */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Offices: DHA Lahore · Blue Area Islamabad · Clifton Karachi
            </span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              +92 (042) 3571-0000
            </span>
          </div>
          <div className="text-center md:text-right">
            <span>© {new Date().getFullYear()} EstatePro Pakistan. Demo prototype application for portfolio showcase.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
