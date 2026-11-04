import React from 'react';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import { FavoritesProvider } from '../context/FavoritesContext.jsx';
import '../index.css';

export default function RootLayout({ children }) {
  return (
    <FavoritesProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500/20 selection:text-emerald-950">
        <Header />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </div>
    </FavoritesProvider>
  );
}
