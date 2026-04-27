import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Questionnaire from '../components/Questionnaire';
import Results from '../components/Results';
import { getCategoryColor } from '../utils/questions';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState('home'); // home | quiz | results | history
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingHistory, setFetchingHistory] = useState(true);

 // WITH this:
useEffect(() => {
  const token = localStorage.getItem('token');
  if (!user || !token) { 
    navigate('/auth'); 
    return; 
  }
  loadHistory();
}, [user, navigate]);

  const loadHistory = async () => {
    try {
      const { data } = await api.get('/responses/my');
      setHistory(data.responses || []);
    } catch {
      // ignore
    } finally {
      setFetchingHistory(false);
    }
  };

  const handleSubmit = async (formData) => {
  setLoading(true);
  try {
    const { data } = await api.post('/responses/submit', {
  ...formData,
  userId: user?.id || user?._id,
  userEmail: user?.email,
});
    setResult(data.response);
    setView('results');
    loadHistory();
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to submit. Please try again.');
  } finally {
    setLoading(false);
  }
};

  const viewHistoryResult = (r) => {
    setResult(r);
    setView('results');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50">Analyzing your responses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">
              {view === 'home' && `Welcome, ${user?.name?.split(' ')[0]} 👋`}
              {view === 'quiz' && 'Your Assessment'}
              {view === 'results' && 'Your Results'}
              {view === 'history' && 'Past Results'}
            </h1>
            <p className="text-white/40 text-sm mt-1">
              {view === 'home' && 'Track your social media health'}
              {view === 'quiz' && 'Answer honestly for accurate results'}
              {view === 'results' && 'Here\'s how social media is affecting you'}
              {view === 'history' && 'Your previous assessments'}
            </p>
          </div>
          {view !== 'home' && (
            <button onClick={() => setView('home')} className="btn-secondary text-sm py-2 px-4">
              ← Dashboard
            </button>
          )}
        </div>

        {/* Home View */}
        {view === 'home' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            {!fetchingHistory && history.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                <div className="card text-center">
                  <div className="font-display text-3xl font-bold text-brand-400">{history.length}</div>
                  <div className="text-white/40 text-xs mt-1">Assessments</div>
                </div>
                <div className="card text-center">
                  <div className="font-display text-3xl font-bold" style={{ color: getCategoryColor(history[0].category) }}>
                    {history[0].score}
                  </div>
                  <div className="text-white/40 text-xs mt-1">Latest Score</div>
                </div>
                <div className="card text-center">
                  <div className="font-display text-lg font-bold" style={{ color: getCategoryColor(history[0].category) }}>
                    {history[0].category}
                  </div>
                  <div className="text-white/40 text-xs mt-1">Category</div>
                </div>
              </div>
            )}

            {/* Main CTA */}
            <div className="card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-600/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
              <div className="relative">
                <h2 className="font-display text-2xl font-bold text-white mb-2">
                  {history.length === 0 ? 'Start Your First Assessment' : 'Take a New Assessment'}
                </h2>
                <p className="text-white/50 text-sm mb-6 leading-relaxed">
                  Answer 20 questions about your social media habits. Takes about 5 minutes.
                  Get your personalized impact score and advice.
                </p>
                <button onClick={() => setView('quiz')} className="btn-primary px-8 py-3.5">
                  {history.length === 0 ? 'Begin Assessment →' : 'Retake Assessment →'}
                </button>
              </div>
            </div>

            {/* History Preview */}
            {history.length > 0 && (
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Recent Assessments</h3>
                  {history.length > 2 && (
                    <button onClick={() => setView('history')} className="text-brand-400 text-sm hover:text-brand-300">
                      View all →
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {history.slice(0, 3).map((r, i) => (
                    <div
                      key={i}
                      onClick={() => viewHistoryResult(r)}
                      className="flex items-center justify-between p-3 bg-surface rounded-xl border border-white/5 hover:border-brand-500/30 cursor-pointer transition-colors"
                    >
                      <div>
                        <span className="font-medium text-white">{r.category}</span>
                        <span className="text-white/30 text-xs ml-2">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold" style={{ color: getCategoryColor(r.category) }}>
                          {r.score}
                        </span>
                        <span className="text-white/20 text-xs">pts</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quiz View */}
        {view === 'quiz' && <Questionnaire onSubmit={handleSubmit} />}

        {/* Results View */}
        {view === 'results' && result && (
          <Results result={result} onRetake={() => setView('quiz')} />
        )}

        {/* History View */}
        {view === 'history' && (
          <div className="space-y-4">
            {history.map((r, i) => (
              <div
                key={i}
                onClick={() => viewHistoryResult(r)}
                className="card hover:border-brand-500/30 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{r.category}</h3>
                    <p className="text-white/40 text-sm mt-0.5">{new Date(r.createdAt).toLocaleString()}</p>
                    <p className="text-white/30 text-xs mt-1">Self-rating: {r.selfRating}/10</p>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-3xl font-bold" style={{ color: getCategoryColor(r.category) }}>
                      {r.score}
                    </div>
                    <div className="text-white/30 text-xs">out of 80</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
