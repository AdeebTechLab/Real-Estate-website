import React, { useState } from 'react';
import { validateInquiryForm } from '../../lib/validation.js';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
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
    }, 500);
  };

  if (isSubmitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7 stroke-[2]" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Message Delivered</h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
          Thank you, <span className="font-semibold">{formData.name}</span>. Your inquiry has been received by our client advisory team.
        </p>
        <p className="text-[11px] text-slate-500 bg-white/80 p-2.5 rounded-xl border border-emerald-100 max-w-sm mx-auto">
          (Demo Note: In a production environment, this dispatches to support@estatepro.pk.)
        </p>
        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
          }}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Full Name *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Hamza Tariq"
            className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
              errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 focus:border-emerald-600'
            }`}
          />
          {errors.name && <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Email Address *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="hamza@example.com"
            className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
              errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 focus:border-emerald-600'
            }`}
          />
          {errors.email && <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Phone Number *
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0300 1234567"
            className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
              errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 focus:border-emerald-600'
            }`}
          />
          {errors.phone && <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Department / Subject
          </label>
          <select
            id="contact-subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
          >
            <option value="General Inquiry">General Marketplace Inquiry</option>
            <option value="Listing Support">Listing Verification & Onboarding</option>
            <option value="Institutional Sales">Commercial & Institutional Portfolios</option>
            <option value="Legal Due Diligence">Property Verification & Deeds</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1.5">
          Your Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="How can our real estate team assist you?"
          className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl focus:bg-white focus:outline-none transition-colors ${
            errors.message ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 focus:border-emerald-600'
          }`}
        />
        {errors.message && <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Send className="w-3.5 h-3.5" />
        <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
      </button>

      <p className="text-[11px] text-slate-400">
        Note: Submissions are handled client-side for this demo.
      </p>
    </form>
  );
}
