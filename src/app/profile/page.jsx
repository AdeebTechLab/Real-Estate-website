import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import PropertyCard from '../../components/property/PropertyCard.jsx';
import { User, Mail, Phone, MapPin, PlusCircle, Heart, LogOut, Clock, ShieldCheck } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logoutDemoUser, submittedProperties, favoriteProperties } = useFavorites();

  const handleLogout = () => {
    logoutDemoUser();
    router.push('/');
  };

  const currentUser = user || {
    name: 'Taimur Ali Khan',
    email: 'taimur.khan@example.com',
    phone: '+92 300 5551234',
    city: 'Lahore',
    role: 'Verified Investor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    joinedAt: 'January 2025'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-emerald-500/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{currentUser.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {currentUser.email} · {currentUser.phone}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Base City: {currentUser.city || 'Pakistan'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/submit-property"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Property</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Submitted Listings Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              My Submitted Listings ({submittedProperties.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Properties you have registered on this device awaiting deed verification.
            </p>
          </div>
        </div>

        {submittedProperties.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-8 text-center text-xs text-slate-500 space-y-3">
            <Clock className="w-8 h-8 text-slate-300 mx-auto" />
            <p>You have not submitted any property listings yet.</p>
            <Link
              href="/submit-property"
              className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-semibold"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Submit your first property now</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {submittedProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </div>

      {/* Saved Favorites Section */}
      <div className="space-y-6 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              My Saved Shortlist ({favoriteProperties.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Bookmarked properties stored locally in your browser.
            </p>
          </div>
          {favoriteProperties.length > 0 && (
            <Link href="/favorites" className="text-xs font-semibold text-emerald-700 hover:text-emerald-800">
              View all favorites →
            </Link>
          )}
        </div>

        {favoriteProperties.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-8 text-center text-xs text-slate-500 space-y-2">
            <Heart className="w-8 h-8 text-slate-300 mx-auto" />
            <p>You have no saved properties in your shortlist.</p>
            <Link href="/properties" className="text-emerald-700 font-semibold">
              Browse listings to save favorites
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProperties.slice(0, 3).map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
