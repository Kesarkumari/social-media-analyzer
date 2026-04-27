import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  const stats = [
    { value: '4.9B', label: 'Social Media Users Worldwide' },
    { value: '2.5h', label: 'Average Daily Usage' },
    { value: '40%', label: 'Report Negative Mental Health Impact' },
    { value: '1 in 3', label: 'Feel Addicted to Social Media' },
  ];

  const features = [
    { icon: '📊', title: '20-Question Analysis', desc: 'Science-backed questionnaire to assess your social media habits accurately.' },
    { icon: '📈', title: 'Visual Insights', desc: 'Interactive charts showing your usage patterns, platform breakdown and productivity impact.' },
    { icon: '🧠', title: 'Personalized Advice', desc: 'Get tailored recommendations based on your unique usage profile and score.' },
    { icon: '⚡', title: 'Instant Results', desc: 'Get your impact score and category classification in seconds.' },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/40 via-dark to-dark pointer-events-none" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-900/50 border border-brand-500/30 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
            <span className="text-brand-300 text-sm font-medium">Free Digital Wellness Assessment</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            How Much Is{' '}
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
  Social Media{' '}
</span>
            Affecting You?
          </h1>

          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Take our 20-question assessment to discover your social media impact score, visualize your habits,
            and receive personalized advice for a healthier digital life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={user ? '/dashboard' : '/auth'} className="btn-primary text-base px-8 py-4">
              Start Free Analysis →
            </Link>
            <Link to="/about" className="btn-secondary text-base px-8 py-4">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-brand-400 mb-1">{s.value}</div>
              <div className="text-white/50 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-white mb-12">
            What You'll Discover
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card hover:border-brand-500/30 transition-colors">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center card border-brand-500/20">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Ready to Find Out?</h2>
          <p className="text-white/50 mb-8">Takes only 5 minutes. No email verification required.</p>
          <Link to={user ? '/dashboard' : '/auth'} className="btn-primary inline-block px-10 py-4">
            Take the Assessment
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-white/30 text-sm">
        © 2024 Social Media Impact Analyzer · Built with MERN Stack
      </footer>
    </div>
  );
}
