import React, { useState } from 'react';
import { QUESTIONS, PLATFORM_QUESTIONS } from '../utils/questions';

export default function Questionnaire({ onSubmit }) {

  const [userData, setUserData] = useState({
    age: "", gender: "", dailyScreenTime: "", sleepQuality: "",
    stressLevel: "", daysWithoutSocialMedia: "", exerciseFrequency: "",
    platform: "", happinessIndex: "",
    onlineShopping: "",
    shoppingReason: "",
  });

  const [answers, setAnswers] = useState({});
  const [platformUsage, setPlatformUsage] = useState({
    instagram: 0, youtube: 0, tiktok: 0, twitter: 0, facebook: 0, snapchat: 0,
  });
  const [selfRating, setSelfRating] = useState(5);
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState('userdata');
  const [error, setError] = useState('');

  const question = QUESTIONS?.[current];
  const totalQ = QUESTIONS.length;

  const validateUserData = () => {
    const requiredFields = ['age','gender','dailyScreenTime','sleepQuality','stressLevel',
      'daysWithoutSocialMedia','exerciseFrequency','platform','happinessIndex','onlineShopping'];
    const empty = requiredFields.find(k => userData[k] === '');
    if (empty) {
      setError('⚠️ Please fill all fields before continuing.');
      return false;
    }

    const rangeFields = {
      sleepQuality: 'Sleep Quality',
      stressLevel: 'Stress Level',
      happinessIndex: 'Happiness Index',
    };
    for (const [key, label] of Object.entries(rangeFields)) {
      const val = Number(userData[key]);
      if (val < 1 || val > 10) {
        setError(`⚠️ ${label} must be between 1 and 10.`);
        return false;
      }
    }

    if (Number(userData.age) < 1 || Number(userData.age) > 120) {
      setError('⚠️ Please enter a valid age.');
      return false;
    }
    if (Number(userData.dailyScreenTime) < 0 || Number(userData.dailyScreenTime) > 24) {
      setError('⚠️ Daily Screen Time must be between 0 and 24 hours.');
      return false;
    }
    if (Number(userData.exerciseFrequency) < 0 || Number(userData.exerciseFrequency) > 7) {
      setError('⚠️ Exercise Frequency must be between 0 and 7 days.');
      return false;
    }
    if (userData.onlineShopping === 'yes' && !userData.shoppingReason) {
      setError('⚠️ Please select why you shop online.');
      return false;
    }

    setError('');
    return true;
  };

  const selectAnswer = (qId, score) => {
    setAnswers(prev => ({ ...prev, [String(qId)]: score }));
    setError('');
  };

  const nextQuestion = () => {
    if (!answers[String(question.id)]) {
      setError('⚠️ Please select an answer to continue.');
      return;
    }
    setError('');
    if (current < totalQ - 1) setCurrent(current + 1);
    else setPhase('platform');
  };

  const prevQuestion = () => {
    setError('');
    if (current > 0) setCurrent(current - 1);
  };

  const handleSubmit = () => {
    onSubmit({ ...userData, answers, platformUsage, selfRating });
  };

  return (
    <div className="max-w-2xl mx-auto">

      {/* ===== USER DATA ===== */}
      {phase === 'userdata' && (
        <div className="card">
          <h2 className="text-white text-xl font-bold mb-5">User Details</h2>

          <div className="space-y-4">

            <div>
              <label className="text-white/60 text-sm mb-1 block">Age</label>
              <input type="number" className="input-field" placeholder="e.g. 21"
                value={userData.age}
                onChange={(e) => setUserData({ ...userData, age: e.target.value })} />
            </div>

            <div>
              <label className="text-white/60 text-sm mb-1 block">Gender</label>
              <select className="input-field" value={userData.gender}
                onChange={(e) => setUserData({ ...userData, gender: e.target.value })}>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="text-white/60 text-sm mb-1 block">Daily Screen Time (hrs)</label>
              <input type="number" className="input-field" placeholder="e.g. 3"
                value={userData.dailyScreenTime}
                onChange={(e) => setUserData({ ...userData, dailyScreenTime: e.target.value })} />
            </div>

            <div>
              <label className="text-white/60 text-sm mb-1 block">Sleep Quality (1-10)</label>
              <input type="number" className="input-field" placeholder="e.g. 7"
                value={userData.sleepQuality}
                onChange={(e) => setUserData({ ...userData, sleepQuality: e.target.value })} />
            </div>

            <div>
              <label className="text-white/60 text-sm mb-1 block">Stress Level (1-10)</label>
              <input type="number" className="input-field" placeholder="e.g. 5"
                value={userData.stressLevel}
                onChange={(e) => setUserData({ ...userData, stressLevel: e.target.value })} />
            </div>

            <div>
              <label className="text-white/60 text-sm mb-1 block">Days Without Social Media</label>
              <input type="number" className="input-field" placeholder="e.g. 2"
                value={userData.daysWithoutSocialMedia}
                onChange={(e) => setUserData({ ...userData, daysWithoutSocialMedia: e.target.value })} />
            </div>

            <div>
              <label className="text-white/60 text-sm mb-1 block">Exercise Frequency (per week, 0-7)</label>
              <input type="number" className="input-field" placeholder="e.g. 3"
                value={userData.exerciseFrequency}
                onChange={(e) => setUserData({ ...userData, exerciseFrequency: e.target.value })} />
            </div>

            <div>
              <label className="text-white/60 text-sm mb-1 block">Select Platform</label>
              <select className="input-field" value={userData.platform}
                onChange={(e) => setUserData({ ...userData, platform: e.target.value })}>
                <option value="">Select Platform</option>
                <option>Facebook</option>
                <option>Instagram</option>
                <option>YouTube</option>
                <option>LinkedIn</option>
                <option>X (Twitter)</option>
              </select>
            </div>

            <div>
              <label className="text-white/60 text-sm mb-1 block">Happiness Index (1-10)</label>
              <input type="number" className="input-field" placeholder="e.g. 8"
                value={userData.happinessIndex}
                onChange={(e) => setUserData({ ...userData, happinessIndex: e.target.value })} />
            </div>

            {/* ===== ONLINE SHOPPING ===== */}
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <p className="text-white/80 text-sm mb-3">Do you shop online?</p>
              <div className="flex gap-3">
                {['yes', 'no'].map((opt) => (
                  <button key={opt} type="button"
                    onClick={() => setUserData({ ...userData, onlineShopping: opt, shoppingReason: '' })}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all capitalize ${
                      userData.onlineShopping === opt
                        ? 'bg-blue-500 text-white border-blue-400'
                        : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                    }`}>
                    {opt === 'yes' ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>

              {userData.onlineShopping === 'yes' && (
                <div className="mt-3 space-y-2">
                  <p className="text-white/50 text-xs mb-2">Why do you shop online?</p>
                  {[
                    { value: 'own_decision', label: '🧠 My own decision — no outside influence' },
                    { value: 'friend_influence', label: '👥 Friend recommended it' },
                    { value: 'review_influence', label: '⭐ Influenced by reviews' },
                    { value: 'ads_influence', label: '📢 Influenced by ads' },
                  ].map((opt) => (
                    <button key={opt.value} type="button"
                      onClick={() => setUserData({ ...userData, shoppingReason: opt.value })}
                      className={`w-full p-2.5 rounded-lg text-left text-sm border transition-all ${
                        userData.shoppingReason === opt.value
                          ? 'bg-blue-500 text-white border-blue-400'
                          : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                      }`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {error && (
            <div className="mt-4 bg-red-500/20 border border-red-500/40 rounded-lg px-4 py-2">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={() => { if (validateUserData()) setPhase('questions'); }}
            className="btn-primary w-full mt-5"
          >
            Next →
          </button>
        </div>
      )}

      {/* ===== QUESTIONS ===== */}
      {phase === 'questions' && question && (
        <div className="card">
          <div className="mb-5">
            <div className="flex justify-between text-white/40 text-xs mb-2">
              <span>Question {current + 1} of {totalQ}</span>
              <span>{Math.round(((current + 1) / totalQ) * 100)}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full">
              <div className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${((current + 1) / totalQ) * 100}%` }} />
            </div>
          </div>

          <h2 className="text-white text-lg font-semibold mb-5">
            Q{current + 1}. {question.text}
          </h2>

          <div className="space-y-2">
            {question.options.map((opt, i) => {
              const selected = answers[String(question.id)] === opt.score;
              return (
                <button key={i}
                  onClick={() => selectAnswer(question.id, opt.score)}
                  className={`w-full p-3 rounded-lg text-left text-sm transition-all border ${
                    selected
                      ? 'bg-blue-500 text-white border-blue-400'
                      : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                  }`}>
                  {opt.label}
                </button>
              );
            })}
          </div>

          {error && (
            <div className="mt-4 bg-red-500/20 border border-red-500/40 rounded-lg px-4 py-2">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button onClick={prevQuestion} disabled={current === 0}
              className="btn-secondary flex-1 disabled:opacity-30">
              ← Back
            </button>
            <button onClick={nextQuestion} className="btn-primary flex-1">
              {current === totalQ - 1 ? 'Finish →' : 'Next →'}
            </button>
          </div>
        </div>
      )}

      {/* ===== PLATFORM ===== */}
      {phase === 'platform' && (
        <div className="card">
          <h2 className="text-white text-xl font-bold mb-2">Platform Usage</h2>
          <p className="text-white/40 text-sm mb-5">Rate your daily usage (0 = none, 10 = heavy)</p>

          <div className="space-y-4">
            {PLATFORM_QUESTIONS.map((p) => (
              <div key={p.id}>
                <div className="flex justify-between mb-1">
                  <label className="text-white/80 text-sm">{p.label}</label>
                  <span className="text-blue-400 text-sm font-bold">{platformUsage[p.id]}/10</span>
                </div>
                <input type="range" min="0" max="10"
                  value={platformUsage[p.id]}
                  onChange={(e) => setPlatformUsage({ ...platformUsage, [p.id]: Number(e.target.value) })}
                  className="w-full accent-blue-500" />
              </div>
            ))}
          </div>

          <button onClick={() => setPhase('selfrating')} className="btn-primary w-full mt-6">
            Next →
          </button>
        </div>
      )}

      {/* ===== SELF RATING ===== */}
      {phase === 'selfrating' && (
        <div className="card text-center">
          <h2 className="text-white text-xl font-bold mb-2">Self Rating</h2>
          <p className="text-white/40 text-sm mb-6">How much do you think social media affects you?</p>

          <div className="text-6xl font-bold text-blue-400 mb-1">{selfRating}</div>
          <div className="text-white/40 text-sm mb-6">out of 10</div>

          <input type="range" min="1" max="10" value={selfRating}
            onChange={(e) => setSelfRating(Number(e.target.value))}
            className="w-full accent-blue-500 mb-6" />

          <button onClick={() => setPhase('review')} className="btn-primary w-full">
            Next →
          </button>
        </div>
      )}

      {/* ===== REVIEW ===== */}
      {phase === 'review' && (
        <div className="card text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-white text-xl font-bold mb-2">All Done!</h2>
          <p className="text-white/40 text-sm mb-6">
            Submit your responses to get your personalized impact score.
          </p>
          <button onClick={handleSubmit} className="btn-primary w-full py-4 text-lg">
            Submit & See Results →
          </button>
        </div>
      )}

    </div>
  );
}