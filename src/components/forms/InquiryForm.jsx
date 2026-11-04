import React, { useState } from 'react';
import { validateInquiryForm } from '../../lib/validation.js';
import { Mail, Phone, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

export default function InquiryForm({ propertyTitle = 'Property', agentName = 'EstatePro Advisor' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    message: `Hello, I am interested in "${propertyTitle}". Please share more details and available private viewing slots.`
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validateInquiryForm(formData);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  if (isSubmitted) {
    return (
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6 stroke-[2]" />
        </div>
        <h4 className="text-base font-bold text-slate-900">Inquiry Received</h4>
        <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
          Thank you, <span className="font-semibold">{formData.name}</span>! Your demo viewing request for <span className="font-semibold">{propertyTitle}</span> has been logged.
        </p>
        <div className="text-[11px] text-slate-500 bg-white/80 p-2.5 rounded-lg border border-emerald-100 max-w-xs mx-auto">
          (Demo Note: In production, this notifies {agentName} via SMS and email dispatch.)
        </div>
        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setFormData((prev) => ({ ...prev, name: '', email: '', phone: '' }));
          }}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline pt-1"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-900">Schedule a Private Viewing</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Direct liaison with {agentName}.
        </p>
      </div>

      {/* Name Input */}
      <div>
        <label htmlFor="inquiry-name" className="block text-xs font-medium text-slate-700 mb-1">
          Full Name *
        </label>
        <input
          id="inquiry-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Taimur Khan"
          className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
            errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-emerald-600'
          }`}
        />
        {errors.name && <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
      </div>

      {/* Email & Phone Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="inquiry-email" className="block text-xs font-medium text-slate-700 mb-1">
            Email Address *
          </label>
          <input
            id="inquiry-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
              errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-emerald-600'
            }`}
          />
          {errors.email && <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="inquiry-phone" className="block text-xs font-medium text-slate-700 mb-1">
            Phone / WhatsApp *
          </label>
          <input
            id="inquiry-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0300 1234567"
            className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
              errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-emerald-600'
            }`}
          />
          {errors.phone && <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
        </div>
      </div>

      {/* Preferred Date */}
      <div>
        <label htmlFor="inquiry-date" className="block text-xs font-medium text-slate-700 mb-1">
          Preferred Tour Date (Optional)
        </label>
        <div className="relative">
          <input
            id="inquiry-date"
            name="preferredDate"
            type="date"
            value={formData.preferredDate}
            onChange={handleChange}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600 transition-colors"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="inquiry-message" className="block text-xs font-medium text-slate-700 mb-1">
          Message / Specific Questions *
        </label>
        <textarea
          id="inquiry-message"
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-3 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
            errors.message ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-emerald-600'
          }`}
        />
        {errors.message && <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 disabled:opacity-50"
      >
        {isSubmitting ? 'Transmitting Request...' : 'Request Private Tour'}
      </button>

      <p className="text-[11px] text-slate-400 text-center">
        Honest demo notice: All inquiries on this demo applet are simulated client-side.
      </p>
    </form>
  );
}
