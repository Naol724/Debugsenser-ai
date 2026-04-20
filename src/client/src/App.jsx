import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Sparkles, 
  Zap, 
  History, 
  Copy, 
  Download, 
  Trash2,
  ChevronDown,
  Play,
  Rocket,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
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
  const [showExamples, setShowExamples] = useState(false);
  const [copied, setCopied] = useState(false);

  const exampleErrors = [
    { language: 'JavaScript', error: 'TypeError: Cannot read properties of undefined (reading \'length\')' },
    { language: 'Python', error: 'NameError: name \'x\' is not defined' },
    { language: 'Java', error: 'NullPointerException: Cannot invoke method on null object' },
    { language: 'C++', error: 'Segmentation fault (core dumped)' },
    { language: 'React', error: 'Warning: Each child in a list should have a unique "key" prop' }
  ];

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

  const handleCopyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleExportResult = () => {
    const blob = new Blob([result], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `debugsense-explanation-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearAll = () => {
    setErrorText('');
    setResult('');
    setReqError('');
  };

  const loadExample = (example) => {
    setErrorText(example.error);
    setLanguage(example.language);
    setReqError('');
    setShowExamples(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 backdrop-blur-3xl" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Error Analysis
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Debug Errors with <span className="text-gradient-primary">AI Precision</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Paste your error messages and get instant, accurate explanations. 
              Powered by advanced AI to help you code faster and learn more.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Instant Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>13+ Languages</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Privacy First</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main App */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Input Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Error Analysis
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Paste your error message below
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowExamples(!showExamples)}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Examples
                      <ChevronDown className={`w-4 h-4 transition-transform ${showExamples ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {showExamples && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-6"
                    >
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Try these example errors:
                        </p>
                        <div className="space-y-2">
                          {exampleErrors.map((example, index) => (
                            <button
                              key={index}
                              onClick={() => loadExample(example)}
                              className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors group"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                                    {example.language}
                                  </span>
                                  <span className="text-sm text-gray-600 dark:text-gray-400 font-mono truncate group-hover:text-gray-900 dark:hover:text-gray-200">
                                    {example.error}
                                  </span>
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Error Message
                    </label>
                    <textarea
                      className="w-full h-40 p-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none font-mono text-sm text-gray-900 dark:text-white placeholder-gray-400"
                      placeholder="Paste your error message here...&#10;&#10;Example:&#10;Uncaught TypeError: Cannot read properties of undefined (reading 'length')&#10;  at main.js:45:12"
                      value={errorText}
                      onChange={(e) => setErrorText(e.target.value)}
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {errorText.length} characters
                      </span>
                      {errorText && (
                        <button
                          onClick={handleClearAll}
                          className="text-xs text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
                        >
                          <X className="w-3 h-3" />
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Programming Language
                      </label>
                      <select
                        className="w-full bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                      >
                        <option value="JavaScript">JavaScript</option>
                        <option value="TypeScript">TypeScript</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                        <option value="C++">C++</option>
                        <option value="C#">C#</option>
                        <option value="PHP">PHP</option>
                        <option value="Ruby">Ruby</option>
                        <option value="Go">Go</option>
                        <option value="Rust">Rust</option>
                        <option value="Swift">Swift</option>
                        <option value="Kotlin">Kotlin</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="flex items-end">
                      <button
                        onClick={handleExplain}
                        disabled={loading || !errorText.trim()}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Analyzing...</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-5 h-5" />
                            <span>Analyze Error</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {reqError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-red-700 dark:text-red-300 font-medium">{reqError}</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Result Section */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Analysis Complete
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Here's what went wrong and how to fix it
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyResult}
                        className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        title="Copy explanation"
                      >
                        {copied ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={handleExportResult}
                        className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        title="Export explanation"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <ResultDisplay markdownContent={result} />
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="sticky top-24"
              >
                <HistoryList 
                  history={history} 
                  onLoadHistory={loadHistoryItem} 
                  onDeleteHistory={deleteHistoryItem}
                  loadingHistory={loadingHistory}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
