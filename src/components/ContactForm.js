'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'f6933d83-1f43-4335-bb31-76c5b1951854',
          from_name: 'Culture Cocktails Website',
          subject: `New inquiry from ${form.name}${form.company ? ' at ' + form.company : ''}`,
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.message,
        }),
      });

      const data = await res.json();

      // Also save to our API for the admin dashboard
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      }).catch(() => {});

      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', company: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-10 px-5">
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-2xl font-bold mx-auto mb-5">
          ✓
        </div>
        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
        <p className="text-gray-text text-[0.92rem] leading-relaxed">
          Thanks for reaching out. We will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-outline mt-4"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-black mb-1.5 tracking-wide">
            Name *
          </label>
          <input
            id="name"
            type="text"
            className="form-input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-black mb-1.5 tracking-wide">
            Email *
          </label>
          <input
            id="email"
            type="email"
            className="form-input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="company" className="block text-xs font-semibold text-black mb-1.5 tracking-wide">
          Company
        </label>
        <input
          id="company"
          type="text"
          className="form-input"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          placeholder="Your company name"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-xs font-semibold text-black mb-1.5 tracking-wide">
          Project Details *
        </label>
        <textarea
          id="message"
          className="form-input resize-y"
          style={{ minHeight: '140px' }}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us about your beverage project — what are you looking to develop? What stage are you at?"
          required
          rows="6"
        />
      </div>

      {status === 'error' && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
          Something went wrong. Please try again or email us directly at{' '}
          <a href="mailto:shane@culturecocktails.co" className="font-semibold text-red-600">
            shane@culturecocktails.co
          </a>
        </div>
      )}

      <button
        type="submit"
        className="w-full py-4 bg-blue text-white rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-blue-dark hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
        style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.95rem', boxShadow: '0 4px 16px rgba(2,93,159,0.2)' }}
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>

      <p className="text-xs text-gray-light mt-3 text-center">
        We respond to every inquiry within 24 hours.
      </p>
    </form>
  );
}
