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

  useEffect(() => {
    const saved = localStorage.getItem('debugSenseHistory');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse history from localStorage');
      }
    }
  }, []);

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
        body: JSON.stringify({ errorText, language }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to fetch explanation from the server.');
      }

      setResult(data.explanation);

      // Save to history
      const newEntry = {
        id: Date.now(),
        errorText,
        language,
        explanation: data.explanation,
        timestamp: new Date().toISOString()
      };

      setHistory(prev => {
        const updated = [newEntry, ...prev];
        localStorage.setItem('debugSenseHistory', JSON.stringify(updated));
        return updated;
      });

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
    setResult(item.explanation);
    setReqError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white shadow-sm z-10 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              D
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              DebugSense AI
            </h1>
          </div>
          <span className="text-sm font-medium text-slate-500 hidden sm:inline-block">
            Understand Errors Instantly
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pt-28 pb-12">
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
            <HistoryList history={history} onLoadHistory={loadHistoryItem} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
