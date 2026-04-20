import React, { useState, useEffect } from 'react';
import ErrorInput from './components/ErrorInput';
import ResultDisplay from './components/ResultDisplay';
import HistoryList from './components/HistoryList';

function App() {
  const [errorText, setErrorText] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [reqError, setReqError] = useState('');
  const [history, setHistory] = useState([]);
  const [sessionId, setSessionId] = useState('');
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    // Get or create session ID
    let currentSessionId = localStorage.getItem('debugSenseSessionId');
    if (!currentSessionId) {
      currentSessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('debugSenseSessionId', currentSessionId);
    }
    setSessionId(currentSessionId);
    
    // Load history from database
    loadHistory(currentSessionId);
  }, []);

  const loadHistory = async (sid) => {
    if (!sid) return;
    
    setLoadingHistory(true);
    try {
      const apiUrl = import.meta.env.DEV 
        ? `/api/history/${sid}` 
        : `${window.location.origin}/api/history/${sid}`;
      
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        setHistory(data.history || []);
      }
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleExplain = async () => {
    if (!errorText.trim()) {
      setReqError('Please provide an error message.');
      return;
    }

    setLoading(true);
    setReqError('');
    setResult('');

    try {
      const apiUrl = import.meta.env.DEV 
        ? '/api/explain' 
        : `${window.location.origin}/api/explain`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ errorText, language, sessionId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to fetch explanation from the server.');
      }

      setResult(data.explanation);

      // Reload history to get the latest entry
      await loadHistory(sessionId);

    } catch (err) {
      console.error('Error explaining:', err);
      setReqError(err.message || 'An unexpected error occurred. Please make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const loadHistoryItem = (item) => {
    setErrorText(item.errorText);
    setLanguage(item.language);
    setResult(item.explanation || '');
    setReqError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteHistoryItem = async (id) => {
    try {
      const apiUrl = import.meta.env.DEV 
        ? `/api/history/${id}` 
        : `${window.location.origin}/api/history/${id}`;
      
      const response = await fetch(apiUrl, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Reload history
        await loadHistory(sessionId);
      }
    } catch (error) {
      console.error('Error deleting history item:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-10 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
              D
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                DebugSense AI
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">Smart Error Explainer for Developers</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live</span>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pt-28 pb-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Understand Errors <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Instantly</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get beginner-friendly explanations for any programming error. Powered by AI, built for developers.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Instant Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Step-by-Step Solutions</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Code Examples</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column - Main Interaction */}
          <div className="w-full lg:w-2/3">
            <ErrorInput
              errorText={errorText}
              setErrorText={setErrorText}
              language={language}
              setLanguage={setLanguage}
              handleExplain={handleExplain}
              loading={loading}
              reqError={reqError}
            />

            {result && <ResultDisplay markdownContent={result} />}
          </div>

          {/* Right Column - Sidebar History */}
          <div className="w-full lg:w-1/3 sticky top-28">
            <HistoryList 
              history={history} 
              onLoadHistory={loadHistoryItem} 
              onDeleteHistory={deleteHistoryItem}
              loadingHistory={loadingHistory}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                D
              </div>
              <span className="text-sm font-medium text-slate-600">DebugSense AI</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span>Powered by AI</span>
              <span>•</span>
              <span>Made for Developers</span>
              <span>•</span>
              <span className="text-blue-600 hover:text-blue-700 cursor-pointer">GitHub</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
