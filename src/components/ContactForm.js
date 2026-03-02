'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
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
      <div className="form-success">
        <div className="form-success-icon">✓</div>
        <h3>Message Sent!</h3>
        <p>Thanks for reaching out. We will get back to you within 24 hours.</p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-outline"
          style={{ marginTop: '1rem' }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
            required
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          placeholder="Your company name"
        />
      </div>

      <div className="form-field">
        <label htmlFor="message">Project Details *</label>
        <textarea
          id="message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us about your beverage project — what are you looking to develop? What stage are you at?"
          required
          rows="6"
        ></textarea>
      </div>

      {status === 'error' && (
        <div className="form-error-msg">
          Something went wrong. Please try again or email us directly at{' '}
          <a href="mailto:shane@culturecocktails.co">shane@culturecocktails.co</a>
        </div>
      )}

      <button type="submit" className="btn-submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>

      <p className="form-note">
        We respond to every inquiry within 24 hours.
      </p>
    </form>
  );
}
