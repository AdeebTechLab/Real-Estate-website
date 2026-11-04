import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { Building2, User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { loginDemoUser } = useFavorites();
  const [formData, setFormData] = useState({
    name: 'Asad Malik',
    email: 'asad.malik@example.com',
    phone: '+92 300 1234567',
    city: 'Lahore',
    role: 'Verified Investor'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginDemoUser(formData);
    router.push('/profile');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
          <Building2 className="w-6 h-6 stroke-[2]" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Create EstatePro Account</h1>
        <p className="text-xs text-slate-500">
          Demo registration for buyers, sellers, and real estate professionals.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-800 leading-relaxed">
        <strong>Demo Authentication Notice:</strong> This prototype application stores profiles locally in your browser storage.
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <div>
          <label htmlFor="reg-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Full Name
          </label>
          <input
            id="reg-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div>
          <label htmlFor="reg-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Email Address
          </label>
          <input
            id="reg-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div>
          <label htmlFor="reg-phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Phone / WhatsApp
          </label>
          <input
            id="reg-phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div>
          <label htmlFor="reg-role" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Account Type
          </label>
          <select
            id="reg-role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
          >
            <option value="Verified Investor">Verified Investor / Buyer</option>
            <option value="Property Owner">Property Owner / Seller</option>
            <option value="Agency Broker">Accredited Agency Broker</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2"
        >
          <span>Create Demo Profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div className="text-center pt-2">
          <Link href="/login" className="text-xs text-slate-600 hover:text-slate-900 font-medium">
            Already have an account? Sign in →
          </Link>
        </div>
      </form>

    </div>
  );
}
