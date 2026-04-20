import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Sparkles, Zap, Copy, Download, Trash2,
  ChevronDown, Play, CheckCircle2, AlertCircle, X, History
} from 'lucide-react';
import ResultDisplay from '../components/ResultDisplay';
import HistoryList from '../components/HistoryList';

const LANGUAGES = [
  'JavaScript','TypeScript','Python','Java','C++','C#',
  'PHP','Ruby','Go','Rust','Swift','Kotlin','Other'
];

const EXAMPLES = [
  { language: 'JavaScript', error: "TypeError: Cannot read properties of undefined (reading 'length')" },
  { language: 'Python', error: "NameError: name 'x' is not defined" },
  { language: 'Java', error: 'NullPointerException: Cannot invoke method on null object' },
  { language: 'C++', error: 'Segmentation fault (core dumped)' },
  { language: 'React', error: 'Warning: Each child in a list should have a unique "key" prop' },
];

function DebugPage() {
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
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    let sid = localStorage.getItem('debugSenseSessionId');
    if (!sid) {
      sid = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('debugSenseSessionId', sid);
    }
    setSessionId(sid);
    loadHistory(sid);
  }, []);

  const loadHistory = async (sid) => {
    if (!sid) return;
    setLoadingHistory(true);
    try {
      const url = import.meta.env.DEV ? `/api/history/${sid}` : `${window.location.origin}/api/history/${sid}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history || []);
      }
    } catch (e) { console.error(e); }
    finally { setLoadingHistory(false); }
  };

  const handleExplain = async () => {
    if (!errorText.trim()) { setReqError('Please provide an error message.'); return; }
    setLoading(true); setReqError(''); setResult('');
    try {
      const url = import.meta.env.DEV ? '/api/explain' : `${window.location.origin}/api/explain`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ errorText, language, sessionId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.details || 'Failed to fetch explanation.');
      setResult(data.explanation);
      await loadHistory(sessionId);
    } catch (err) {
      setReqError(err.message || 'An unexpected error occurred.');
    } finally { setLoading(false); }
  };

  const loadHistoryItem = (item) => {
    setErrorText(item.errorText);
    setLanguage(item.language);
    setResult(item.explanation || '');
    setReqError('');
    setShowHistory(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteHistoryItem = async (id) => {
    try {
      const url = import.meta.env.DEV ? `/api/history/${id}` : `${window.location.origin}/api/history/${id}`;
      const res = await fetch(url, { method: 'DELETE' });
      if (res.ok) await loadHistory(sessionId);
    } catch (e) { console.error(e); }
  };

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch (e) { console.error(e); }
  };

  const handleExport = () => {
    const blob = new Blob([result], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `debugsense-${Date.now()}.md`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0f1117] bg-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Debug Test</h1>
              <p className="text-gray-500 text-sm">Paste your error and get an AI-powered explanation instantly.</p>
            </div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                showHistory ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30' : 'btn-ghost'
              }`}
            >
              <History className="w-4 h-4" />
              History {history.length > 0 && <span className="bg-indigo-500/20 text-indigo-400 text-xs px-1.5 py-0.5 rounded-full">{history.length}</span>}
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-5">
            {/* Input Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="card p-6 glow-border"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-white">Error Input</h2>
                    <p className="text-xs text-gray-600">Paste your error message or stack trace</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowExamples(!showExamples)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-200 text-xs font-medium border border-white/10 transition-all"
                >
                  <Play className="w-3.5 h-3.5" />
                  Examples
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showExamples ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <AnimatePresence>
                {showExamples && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="mb-5 overflow-hidden"
                  >
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-2">
                      <p className="text-xs text-gray-600 font-medium mb-3">Click to load an example:</p>
                      {EXAMPLES.map((ex, i) => (
                        <button key={i} onClick={() => { setErrorText(ex.error); setLanguage(ex.language); setShowExamples(false); }}
                          className="w-full text-left flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] hover:bg-indigo-500/10 border border-white/5 hover:border-indigo-500/20 transition-all group"
                        >
                          <span className="tag text-xs shrink-0">{ex.language}</span>
                          <span className="text-xs text-gray-500 font-mono truncate group-hover:text-gray-300">{ex.error}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                <div>
                  <textarea
                    className="input-dark h-44 resize-none font-mono text-sm leading-relaxed"
                    placeholder={"Paste your error here...\n\nExample:\nUncaught TypeError: Cannot read properties of undefined\n  at main.js:45:12"}
                    value={errorText}
                    onChange={(e) => setErrorText(e.target.value)}
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-gray-700">{errorText.length} chars</span>
                    {errorText && (
                      <button onClick={() => { setErrorText(''); setResult(''); setReqError(''); }}
                        className="text-xs text-red-500/70 hover:text-red-400 flex items-center gap-1 transition-colors"
                      >
                        <X className="w-3 h-3" /> Clear
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-600 font-medium mb-1.5">Language</label>
                    <select
                      className="input-dark text-sm cursor-pointer"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={handleExplain}
                      disabled={loading || !errorText.trim()}
                      className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-indigo-600 disabled:hover:to-violet-600 w-full sm:w-auto justify-center"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          Analyze Error
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {reqError && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                    >
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-red-400">{reqError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Result Card */}
            <AnimatePresence>
              {result && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }} className="card p-6"
                  style={{ borderColor: 'rgba(16,185,129,0.2)' }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white">Analysis Complete</h3>
                        <p className="text-xs text-gray-600">Here's what went wrong and how to fix it</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={handleCopy}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-500 hover:text-gray-200 border border-white/10 transition-all"
                        title="Copy"
                      >
                        {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button onClick={handleExport}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-500 hover:text-gray-200 border border-white/10 transition-all"
                        title="Export"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <ResultDisplay markdownContent={result} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar History */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
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
    </div>
  );
}

export default DebugPage;
