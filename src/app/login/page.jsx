import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { Building2, User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { loginDemoUser, user } = useFavorites();
  const [email, setEmail] = useState('taimur.khan@example.com');
  const [password, setPassword] = useState('••••••••');
  const [role, setRole] = useState('Verified Investor');

  const handleLogin = (e) => {
    e.preventDefault();
    loginDemoUser({
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email,
      role
    });
    router.push('/profile');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
          <Building2 className="w-6 h-6 stroke-[2]" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Sign in to EstatePro</h1>
        <p className="text-xs text-slate-500">
          Demo portal access for buyers, sellers, and accredited brokers.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-800 leading-relaxed">
        <strong>Demo Authentication Notice:</strong> This prototype simulates user sessions locally in your browser. Any email and password will sign you into a demo profile.
      </div>

      <form onSubmit={handleLogin} className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <div>
          <label htmlFor="login-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
            />
          </div>
        </div>

        <div>
          <label htmlFor="login-pass" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              id="login-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
            />
          </div>
        </div>

        <div>
          <label htmlFor="login-role" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Account Type
          </label>
          <select
            id="login-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
          >
            <option value="Verified Investor">Verified Investor / Buyer</option>
            <option value="Property Owner">Property Owner / Seller</option>
            <option value="Agency Broker">Accredited Agency Broker</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2"
        >
          <span>Sign In to Demo Account</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div className="text-center pt-2">
          <Link href="/register" className="text-xs text-emerald-700 hover:text-emerald-800 font-medium">
            Don't have an account? Create demo profile →
          </Link>
        </div>
      </form>

    </div>
  );
}
