import React, { useState } from 'react';
import api from '../utils/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/contact', form);
      setSubmitted(true);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="text-center card max-w-md w-full">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="font-display text-2xl font-bold text-white mb-2">Message Sent!</h2>
          <p className="text-white/50 mb-2">Thank you for reaching out!</p>
          <p className="text-white/30 text-sm">We'll get back to you within 24-48 hours.</p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
            className="btn-secondary mt-6 w-full">
            Send Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-white/50 text-lg">Have questions or feedback? We'd love to hear from you.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">


                  {/* Form */}
          <div className="card">
            <h2 className="font-display text-xl font-bold text-white mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white/60 text-sm mb-1 block">Name</label>
                <input type="text" className="input-field" placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-1 block">Email</label>
                <input type="email" className="input-field" placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-1 block">Subject</label>
                <input type="text" className="input-field" placeholder="What's this about?"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })} required />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-1 block">Message</label>
                <textarea className="input-field resize-none h-32" placeholder="Your message..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })} required />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/40 rounded-lg px-4 py-2">
                  <p className="text-red-400 text-sm">⚠️ {error}</p>
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                {loading ? '⏳ Sending...' : 'Send Message'}
              </button>
            </form>
          </div>





          {/* Info */}
          <div className="space-y-6">

  <div className="card">
    <div className="text-3xl mb-3">❓</div>
    <h3 className="font-semibold text-white mb-1">General Queries</h3>
    <p className="text-white/50 text-sm">
      Need help understanding how the analyzer works or how to use it effectively.
    </p>
  </div>

  <div className="card">
    <div className="text-3xl mb-3">🐞</div>
    <h3 className="font-semibold text-white mb-1">Report Issues</h3>
    <p className="text-white/50 text-sm">
      Facing any technical problem or unexpected behavior while using the platform.
    </p>
  </div>

  <div className="card">
    <div className="text-3xl mb-3">💡</div>
    <h3 className="font-semibold text-white mb-1">Suggestions</h3>
    <p className="text-white/50 text-sm">
      Share ideas or improvements that can make this tool more useful.
    </p>
  </div>

  <div className="card bg-brand-900/20 border-brand-500/20">
    <h3 className="font-semibold text-brand-300 mb-2">⚠️ Disclaimer</h3>
    <p className="text-white/40 text-sm leading-relaxed">
      This tool is for educational purposes only. It is not a substitute for
      professional advice or medical guidance.
    </p>
  </div>

</div>


        </div>
      </div>
    </div>
  );
}