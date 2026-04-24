import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Sparkles, Zap, Copy, Download,
  ChevronDown, Play, CheckCircle2, AlertCircle, X, History,
} from 'lucide-react';
import ResultDisplay from '../components/ResultDisplay';
import HistoryList from '../components/HistoryList';

const LANGUAGES = [
  'JavaScript','TypeScript','Python','Java','C++','C#',
  'PHP','Ruby','Go','Rust','Swift','Kotlin','Other',
];

const EXAMPLES = [
  { language: 'JavaScript', error: "TypeError: Cannot read properties of undefined (reading 'length')" },
  { language: 'Python',     error: "NameError: name 'x' is not defined" },
  { language: 'Java',       error: 'NullPointerException: Cannot invoke method on null object' },
  { language: 'C++',        error: 'Segmentation fault (core dumped)' },
  { language: 'React',      error: 'Warning: Each child in a list should have a unique "key" prop' },
];

function DebugPage() {
  const [errorText,      setErrorText]      = useState('');
  const [language,       setLanguage]       = useState('JavaScript');
  const [result,         setResult]         = useState('');
  const [loading,        setLoading]        = useState(false);
  const [reqError,       setReqError]       = useState('');
  const [history,        setHistory]        = useState([]);
  const [sessionId,      setSessionId]      = useState('');
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [showExamples,   setShowExamples]   = useState(false);
  const [copied,         setCopied]         = useState(false);

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
      const url = import.meta.env.DEV
        ? `/api/history/${sid}`
        : `${window.location.origin}/api/history/${sid}`;
      const res = await fetch(url);
      if (res.ok) { const d = await res.json(); setHistory(d.history || []); }
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteHistoryItem = async (id) => {
    try {
      const url = import.meta.env.DEV
        ? `/api/history/${id}`
        : `${window.location.origin}/api/history/${id}`;
      const res = await fetch(url, { method: 'DELETE' });
      if (res.ok) await loadHistory(sessionId);
    } catch (e) { console.error(e); }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) { console.error(e); }
  };

  const handleExport = () => {
    const blob = new Blob([result], { type: 'text/markdown' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `debugsense-${Date.now()}.md`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-root bg-grid">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} className="mb-6 sm:mb-8"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-heading truncate">Debug Test</h1>
              <p className="text-body text-xs sm:text-sm mt-0.5">
                Paste your error and get an AI-powered explanation instantly.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-muted text-xs sm:text-sm shrink-0">
              <History className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{history.length} saved</span>
            </div>
          </div>
        </motion.div>

        {/* ── Two-column layout: main + sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">

          {/* ── Main Panel ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Input Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card p-4 sm:p-6 glow-border"
            >
              {/* Card header — wraps on very small screens */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                    <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-semibold text-heading">Error Input</h2>
                    <p className="text-xs text-subtle hidden sm:block">Paste your error message or stack trace</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowExamples(!showExamples)}
                  className="btn-ghost flex items-center gap-1.5 text-xs px-3 py-1.5 shrink-0"
                >
                  <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Examples</span>
                  <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform ${showExamples ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Examples dropdown */}
              <AnimatePresence>
                {showExamples && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mb-5 overflow-hidden"
                  >
                    <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-xl p-3 sm:p-4 space-y-2">
                      <p className="text-xs text-muted font-medium mb-2">Click to load an example:</p>
                      {EXAMPLES.map((ex, i) => (
                        <button
                          key={i}
                          onClick={() => { setErrorText(ex.error); setLanguage(ex.language); setShowExamples(false); }}
                          className="w-full text-left flex items-start sm:items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg
                                     bg-white dark:bg-white/[0.02]
                                     hover:bg-indigo-50 dark:hover:bg-indigo-500/10
                                     border border-slate-200 dark:border-white/5
                                     hover:border-indigo-300 dark:hover:border-indigo-500/20
                                     transition-all group"
                        >
                          {/* Language badge — never shrinks */}
                          <span className="tag text-xs shrink-0 mt-0.5 sm:mt-0">{ex.language}</span>
                          {/* Error text — truncates cleanly */}
                          <span className="text-xs text-muted font-mono break-all sm:truncate group-hover:text-heading leading-relaxed">
                            {ex.error}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form fields */}
              <div className="space-y-4">
                {/* Textarea */}
                <div>
                  <textarea
                    className="input-field h-40 sm:h-44 resize-none font-mono text-xs sm:text-sm leading-relaxed"
                    placeholder={"Paste your error here...\n\nExample:\nUncaught TypeError: Cannot read properties of undefined\n  at main.js:45:12"}
                    value={errorText}
                    onChange={(e) => setErrorText(e.target.value)}
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-subtle">{errorText.length} chars</span>
                    {errorText && (
                      <button
                        onClick={() => { setErrorText(''); setResult(''); setReqError(''); }}
                        className="text-xs text-red-500 hover:text-red-600 dark:text-red-500/70 dark:hover:text-red-400 flex items-center gap-1 transition-colors"
                      >
                        <X className="w-3 h-3" /> Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Language + Analyze — stacked on mobile, side-by-side on sm+ */}
                <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                  <div className="flex-1 min-w-0">
                    <label className="block text-xs text-muted font-medium mb-1.5">Language</label>
                    <select
                      className="input-field text-sm cursor-pointer"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  {/* Button always full-width on mobile, auto on sm+ */}
                  <button
                    onClick={handleExplain}
                    disabled={loading || !errorText.trim()}
                    className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2
                               disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        <span>Analyze Error</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {reqError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-start gap-3 p-3 sm:p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl"
                    >
                      <AlertCircle className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-red-600 dark:text-red-400">{reqError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Result Card */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="card p-4 sm:p-6 border-emerald-200 dark:border-emerald-500/20"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-heading">Analysis Complete</h3>
                        <p className="text-xs text-subtle hidden sm:block">Here's what went wrong and how to fix it</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={handleCopy}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-muted hover:text-heading border border-slate-200 dark:border-white/10 transition-all"
                        title="Copy"
                      >
                        {copied
                          ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          : <Copy className="w-4 h-4" />
                        }
                      </button>
                      <button
                        onClick={handleExport}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-muted hover:text-heading border border-slate-200 dark:border-white/10 transition-all"
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

          {/* ── Sidebar (History) ── */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:sticky lg:top-24"
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
