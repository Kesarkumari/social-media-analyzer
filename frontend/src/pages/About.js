import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const categories = [
    { range: '0–30', label: 'Healthy', color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20', desc: 'You have a balanced relationship with social media.' },
    { range: '31–60', label: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20', desc: 'Some habits may need attention and improvement.' },
    { range: '61–90', label: 'High Impact', color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/20', desc: 'Social media is significantly affecting your life.' },
    { range: '91+', label: 'Addicted', color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20', desc: 'Digital detox and professional guidance recommended.' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl font-bold text-white mb-4">About This Tool</h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Understanding the science and methodology behind your Social Media Impact Score.
          </p>
        </div>

        <div className="space-y-8">
          <div className="card">
            <h2 className="font-display text-2xl font-bold text-white mb-4">What is the Social Media Impact Analyzer?</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              The Social Media Impact Analyzer is a free, self-assessment tool designed to help individuals
              understand how their social media habits are affecting their mental health, productivity, sleep,
              and overall well-being.
            </p>
            <p className="text-white/60 leading-relaxed">
              Using a 20-question questionnaire, the tool calculates an impact score and places you into one
              of four categories, providing personalized advice and detailed visualizations of your usage patterns.
            </p>
          </div>

          <div className="card">
            <h2 className="font-display text-2xl font-bold text-white mb-6">Score Categories</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {categories.map((c, i) => (
                <div key={i} className={`rounded-xl border p-4 ${c.bg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-display text-lg font-bold ${c.color}`}>{c.label}</span>
                    <span className="text-white/40 text-sm font-mono">{c.range} pts</span>
                  </div>
                  <p className="text-white/60 text-sm">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="font-display text-2xl font-bold text-white mb-4">How Scoring Works</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Each of the 20 questions has 4 answer choices, scored from 1 to 4:
            </p>
            <ul className="space-y-2 text-white/60">
              <li className="flex items-center gap-3"><span className="w-6 h-6 bg-green-400/20 text-green-400 rounded flex items-center justify-center text-xs font-bold">1</span> Healthy behavior — minimal impact</li>
              <li className="flex items-center gap-3"><span className="w-6 h-6 bg-yellow-400/20 text-yellow-400 rounded flex items-center justify-center text-xs font-bold">2</span> Mild concern — worth monitoring</li>
              <li className="flex items-center gap-3"><span className="w-6 h-6 bg-orange-400/20 text-orange-400 rounded flex items-center justify-center text-xs font-bold">3</span> Moderate issue — action needed</li>
              <li className="flex items-center gap-3"><span className="w-6 h-6 bg-red-400/20 text-red-400 rounded flex items-center justify-center text-xs font-bold">4</span> High concern — significant impact</li>
            </ul>
            <p className="text-white/40 text-sm mt-4">Maximum possible score: 80 points (20 questions × 4)</p>
          </div>

          <div className="card">
            <h2 className="font-display text-2xl font-bold text-white mb-4">Data & Privacy</h2>
            <p className="text-white/60 leading-relaxed">
              Your responses are stored securely and linked only to your account. We do not share your data
              with third parties. Results are stored so you can track your progress over time.
              This tool is for educational and self-improvement purposes only and is not a medical diagnosis.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/auth" className="btn-primary px-10 py-4 inline-block">
            Take the Assessment →
          </Link>
        </div>
      </div>
    </div>
  );
}
