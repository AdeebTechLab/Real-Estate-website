import React from 'react';
import PropertySubmissionForm from '../../components/forms/PropertySubmissionForm.jsx';
import { ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export default function SubmitPropertyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
          Seller & Landlord Portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          List Your Property on EstatePro
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Reach high-net-worth local and overseas Pakistani buyers. Every listing is reviewed for legal deed authenticity before publication.
        </p>
      </div>

      {/* Process Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4">
          <span className="text-xs font-bold text-slate-900 block mb-1">1. Fill Property Specs</span>
          <span className="text-[11px] text-slate-500">Provide dimensions, photographs, and accurate asking price in PKR.</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4">
          <span className="text-xs font-bold text-slate-900 block mb-1">2. Editorial & Deed Review</span>
          <span className="text-[11px] text-slate-500">Listings are verified against DHA, LDA, and CDA registry records.</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4">
          <span className="text-xs font-bold text-slate-900 block mb-1">3. Live Marketplace Access</span>
          <span className="text-[11px] text-slate-500">Your property is showcased to verified prospective investors.</span>
        </div>
      </div>

      {/* Main Submission Form */}
      <PropertySubmissionForm />

    </div>
  );
}
