import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { QUESTIONS, getCategoryColor, getAdvice } from '../utils/questions';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const MAX_SCORE = 80;

function GaugeMeter({ score }) {
  const pct = Math.min(score / MAX_SCORE, 1);
  const circumference = 2 * Math.PI * 50;
  const rotation = -135;
  const color = score <= 30 ? '#22c55e' : score <= 60 ? '#eab308' : score <= 90 ? '#f97316' : '#ef4444';

  return (
    <div className="relative flex items-center justify-center">
      <svg width="180" height="120" viewBox="0 0 180 120">
        <circle cx="90" cy="100" r="70" fill="none" stroke="#ffffff10" strokeWidth="12"
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          strokeLinecap="round" transform={`rotate(${rotation} 90 100)`} />
        <circle cx="90" cy="100" r="70" fill="none" stroke={color} strokeWidth="12"
          strokeDasharray={`${circumference * 0.75 * pct} ${circumference}`}
          strokeLinecap="round" transform={`rotate(${rotation} 90 100)`}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
      </svg>
      <div className="absolute bottom-2 text-center">
        <div className="font-display text-4xl font-bold text-white">{score}</div>
        <div className="text-white/40 text-xs">out of {MAX_SCORE}</div>
      </div>
    </div>
  );
}

export default function Results({ result, onRetake }) {
  const { score, category, selfRating, answers, platformUsage } = result;
  const catColor = getCategoryColor(category);
  const advice = getAdvice(category);

  const barData = {
    labels: QUESTIONS.map((_, i) => `Q${i + 1}`),
    datasets: [{
      label: 'Your Score',
      data: QUESTIONS.map(q => answers[q.id] || 0),
      backgroundColor: QUESTIONS.map(q => {
        const s = answers[q.id] || 0;
        if (s <= 1) return 'rgba(34,197,94,0.7)';
        if (s <= 2) return 'rgba(234,179,8,0.7)';
        if (s <= 3) return 'rgba(249,115,22,0.7)';
        return 'rgba(239,68,68,0.7)';
      }),
      borderRadius: 6,
    }],
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 10 } } },
      y: { min: 0, max: 4, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.4)', stepSize: 1 } },
    },
  };

  const platforms = platformUsage || {};
  const platLabels = ['Instagram', 'YouTube', 'TikTok', 'Twitter/X', 'Facebook', 'Snapchat'];
  const platColors = ['#E1306C', '#FF0000', '#69C9D0', '#1DA1F2', '#1877F2', '#FFFC00'];
  const platValues = [
    platforms.instagram || 0, platforms.youtube || 0, platforms.tiktok || 0,
    platforms.twitter || 0, platforms.facebook || 0, platforms.snapchat || 0,
  ];
  const hasAnyPlatform = platValues.some(v => v > 0);
  const pieData = {
    labels: platLabels,
    datasets: [{
      data: hasAnyPlatform ? platValues : [1, 1, 1, 1, 1, 1],
      backgroundColor: platColors.map(c => c + 'cc'),
      borderColor: platColors,
      borderWidth: 1,
    }],
  };

  return (
    <div className="space-y-8">

      {/* Score Card */}
      <div className="card text-center">
        <h2 className="font-display text-2xl font-bold text-white mb-2">Your Impact Score</h2>
        <GaugeMeter score={score} />
        <div className="inline-block mt-4 px-6 py-2 rounded-full font-bold text-lg border"
          style={{ color: catColor, backgroundColor: catColor + '20', borderColor: catColor + '40' }}>
          {category}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 max-w-sm mx-auto">
          <div className="bg-surface rounded-xl p-3 border border-white/5">
            <p className="text-white/40 text-xs mb-1">Your Estimate</p>
            <p className="font-bold text-white text-xl">{selfRating}/10</p>
          </div>
          <div className="bg-surface rounded-xl p-3 border border-white/5">
            <p className="text-white/40 text-xs mb-1">Actual Score</p>
            <p className="font-bold text-xl" style={{ color: catColor }}>{score}/{MAX_SCORE}</p>
          </div>
        </div>
        {selfRating * 8 < score && (
          <p className="text-orange-400 text-sm mt-3">⚠️ Your actual impact is higher than you estimated.</p>
        )}
        {selfRating * 8 > score && (
          <p className="text-green-400 text-sm mt-3">✅ Great news — you're doing better than you thought!</p>
        )}
      </div>

      {/* Progress Bar */}
      <div className="card">
        <h3 className="font-semibold text-white mb-4">Score Breakdown</h3>
        <div className="space-y-3">
          {[
            { label: 'Healthy', range: [0, 30], color: '#22c55e' },
            { label: 'Moderate', range: [31, 60], color: '#eab308' },
            { label: 'High Impact', range: [61, 90], color: '#f97316' },
            { label: 'Addicted', range: [91, MAX_SCORE], color: '#ef4444' },
          ].map(tier => {
            const inTier = score >= tier.range[0] && score <= tier.range[1];
            return (
              <div key={tier.label} className="flex items-center gap-3">
                <span className="text-white/50 text-xs w-20">{tier.label}</span>
                <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: inTier ? `${((score - tier.range[0]) / (tier.range[1] - tier.range[0])) * 100}%` : score > tier.range[1] ? '100%' : '0%',
                      backgroundColor: tier.color,
                    }} />
                </div>
                <span className="text-white/30 text-xs w-16 text-right">{tier.range[0]}–{tier.range[1]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Advice */}
      <div className="card border-brand-500/20">
        <h3 className="font-display text-xl font-bold text-white mb-4">{advice.title}</h3>
        <ul className="space-y-3">
          {advice.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
              <span className="text-brand-400 mt-0.5 flex-shrink-0">→</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Bar Chart */}
      <div className="card">
        <h3 className="font-semibold text-white mb-2">Question-by-Question Score</h3>
        <p className="text-white/40 text-xs mb-4">Higher bars indicate more problematic behavior in that area.</p>
        <Bar data={barData} options={barOptions} />
      </div>

      {/* Pie Chart */}
      <div className="card">
        <h3 className="font-semibold text-white mb-2">Platform Usage Distribution</h3>
        <p className="text-white/40 text-xs mb-4">{hasAnyPlatform ? 'Based on your self-reported platform usage.' : 'You rated all platforms equally (or zero).'}</p>
        <div className="max-w-xs mx-auto">
          <Pie data={pieData} options={{ plugins: { legend: { labels: { color: 'rgba(255,255,255,0.6)', font: { size: 11 } } } } }} />
        </div>
      </div>

      {/* Sleep vs Screen Time */}
      <div className="card">
        <h3 className="font-semibold text-white mb-2">Sleep vs Screen Time Analysis</h3>
        <p className="text-white/40 text-xs mb-6">How your screen time is affecting your sleep quality.</p>
        <div className="space-y-5">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-white/70 text-sm">📱 Daily Screen Time</span>
              <span className="text-white font-bold text-sm">{result.dailyScreenTime} hrs</span>
            </div>
            <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${Math.min((result.dailyScreenTime / 12) * 100, 100)}%`,
                  backgroundColor: result.dailyScreenTime <= 2 ? '#22c55e' :
                                   result.dailyScreenTime <= 5 ? '#eab308' :
                                   result.dailyScreenTime <= 8 ? '#f97316' : '#ef4444',
                }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-white/20 text-xs">0 hrs</span>
              <span className="text-white/20 text-xs">12+ hrs</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-white/70 text-sm">😴 Sleep Quality</span>
              <span className="text-white font-bold text-sm">{result.sleepQuality}/10</span>
            </div>
            <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${(result.sleepQuality / 10) * 100}%`,
                  backgroundColor: result.sleepQuality >= 7 ? '#22c55e' :
                                   result.sleepQuality >= 5 ? '#eab308' :
                                   result.sleepQuality >= 3 ? '#f97316' : '#ef4444',
                }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-white/20 text-xs">Poor</span>
              <span className="text-white/20 text-xs">Excellent</span>
            </div>
          </div>

          <div className={`rounded-xl p-4 border mt-2 ${
            result.dailyScreenTime > 5 && result.sleepQuality < 6
              ? 'bg-red-500/10 border-red-500/30'
              : result.dailyScreenTime > 3 && result.sleepQuality < 8
              ? 'bg-yellow-500/10 border-yellow-500/30'
              : 'bg-green-500/10 border-green-500/30'
          }`}>
            <p className="text-sm font-medium text-white mb-1">
              {result.dailyScreenTime > 5 && result.sleepQuality < 6
                ? '🚨 High screen time is seriously hurting your sleep!'
                : result.dailyScreenTime > 3 && result.sleepQuality < 8
                ? '⚠️ Reducing screen time may improve your sleep quality.'
                : '✅ Your screen time and sleep are fairly balanced.'}
            </p>
            <p className="text-white/50 text-xs">
              {result.dailyScreenTime > 5
                ? `You spend ${result.dailyScreenTime} hrs on screen daily — try reducing by 1-2 hrs before bedtime.`
                : `Your ${result.dailyScreenTime} hrs daily usage is manageable. Keep it up!`}
            </p>
          </div>
        </div>
      </div>

      <button onClick={onRetake} className="btn-secondary w-full py-4">
        🔄 Retake Assessment
      </button>

    </div>
  );
}