import React from 'react';
import ContactForm from '../../components/forms/ContactForm.jsx';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
          Client Advisory Support
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-1">
          Connect with EstatePro Pakistan
        </h1>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          Whether you require confidential acquisitions advisory, legal title clearance, or assistance listing an asset, our senior client directors are at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Contact Form (2 cols) */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        {/* Office Details & Working Hours */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900">Direct Contact</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">National Inquiries</span>
                  <a href="tel:+923008472910" className="font-bold text-slate-900 hover:text-emerald-700 font-mono">
                    +92 300 8472910
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">Mon–Sat: 9:00 AM – 7:00 PM PKT</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Editorial & Legal Advisory</span>
                  <a href="mailto:concierge@estatepro.pk" className="font-bold text-slate-900 hover:text-emerald-700">
                    concierge@estatepro.pk
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Diaspora / Overseas Hours</span>
                  <p className="text-slate-700">Dedicated evening support for UK, GCC & US time zones.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Locations */}
          <div className="bg-slate-50 rounded-3xl border border-slate-200/80 p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Physical Offices
            </h3>
            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <span className="font-bold text-slate-900 block">Lahore:</span>
                <span className="text-slate-600">DHA Phase 6 Commercial Avenue & Gulberg III</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Islamabad:</span>
                <span className="text-slate-600">ISE Towers, Jinnah Avenue, Blue Area</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Karachi:</span>
                <span className="text-slate-600">The Forum, Block 9, Clifton</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
