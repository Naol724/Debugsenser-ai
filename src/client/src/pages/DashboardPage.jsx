import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart3, Clock, Code2, Trash2, Search, Filter,
  Zap, TrendingUp, Database, RefreshCw, Terminal,
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const LANG_COLORS = {
  JavaScript: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-400/10 border-yellow-300 dark:border-yellow-400/20',
  TypeScript: 'text-blue-600   dark:text-blue-400   bg-blue-100   dark:bg-blue-400/10   border-blue-300   dark:border-blue-400/20',
  Python:     'text-green-600  dark:text-green-400  bg-green-100  dark:bg-green-400/10  border-green-300  dark:border-green-400/20',
  Java:       'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-400/10 border-orange-300 dark:border-orange-400/20',
  'C++':      'text-pink-600   dark:text-pink-400   bg-pink-100   dark:bg-pink-400/10   border-pink-300   dark:border-pink-400/20',
  default:    'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-400/10 border-indigo-300 dark:border-indigo-400/20',
};
const langClass = (lang) => LANG_COLORS[lang] || LANG_COLORS.default;

const STAT_COLORS = {
  indigo:  'text-indigo-600  dark:text-indigo-400  bg-indigo-100  dark:bg-indigo-500/10  border-indigo-200  dark:border-indigo-500/20',
  violet:  'text-violet-600  dark:text-violet-400  bg-violet-100  dark:bg-violet-500/10  border-violet-200  dark:border-violet-500/20',
  cyan:    'text-cyan-600    dark:text-cyan-400    bg-cyan-100    dark:bg-cyan-500/10    border-cyan-200    dark:border-cyan-500/20',
  emerald: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20',
};

function DashboardPage() {
  const [history,    setHistory]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState('');
  const [filterLang, setFilterLang] = useState('All');
  const [sessionId,  setSessionId]  = useState('');

  useEffect(() => {
    const sid = localStorage.getItem('debugSenseSessionId') || '';
    setSessionId(sid);
    if (sid) fetchHistory(sid);
    else setLoading(false);
  }, []);

  const fetchHistory = async (sid) => {
    setLoading(true);
    try {
      const url = import.meta.env.DEV
        ? `/api/history/${sid}?limit=100`
        : `${window.location.origin}/api/history/${sid}?limit=100`;
      const res = await fetch(url);
      if (res.ok) { const d = await res.json(); setHistory(d.history || []); }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const deleteItem = async (id) => {
    try {
      const url = import.meta.env.DEV
        ? `/api/history/${id}`
        : `${window.location.origin}/api/history/${id}`;
      const res = await fetch(url, { method: 'DELETE' });
      if (res.ok) setHistory((h) => h.filter((i) => (i._id || i.id) !== id));
    } catch (e) { console.error(e); }
  };

  const languages = ['All', ...new Set(history.map((h) => h.language))];
  const filtered  = history.filter((item) => {
    const matchLang   = filterLang === 'All' || item.language === filterLang;
    const matchSearch = !search || item.errorText?.toLowerCase().includes(search.toLowerCase());
    return matchLang && matchSearch;
  });

  const stats = [
    { label: 'Total Analyses', value: history.length,                                                                                    icon: <BarChart3 className="w-5 h-5" />,   color: 'indigo'  },
    { label: 'Languages Used', value: new Set(history.map((h) => h.language)).size,                                                      icon: <Code2 className="w-5 h-5" />,       color: 'violet'  },
    { label: 'This Week',      value: history.filter((h) => new Date(h.createdAt) > new Date(Date.now() - 7 * 86400000)).length,          icon: <TrendingUp className="w-5 h-5" />,  color: 'cyan'    },
    { label: 'Saved Fixes',    value: history.length,                                                                                     icon: <Database className="w-5 h-5" />,    color: 'emerald' },
  ];

  return (
    <div className="page-root bg-grid">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* ── Header ── */}
        <motion.div {...fadeUp()} className="mb-6 sm:mb-8">
          {/* Stack on mobile, row on sm+ */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-heading">Dashboard</h1>
              <p className="text-body text-xs sm:text-sm mt-0.5">Your error analysis history and statistics.</p>
            </div>
            {/* Buttons: full-width row on mobile, auto on sm+ */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => fetchHistory(sessionId)}
                className="btn-ghost flex items-center justify-center gap-2 text-xs sm:text-sm flex-1 sm:flex-none"
              >
                <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Refresh</span>
              </button>
              <Link
                to="/debug"
                className="btn-primary flex items-center justify-center gap-2 text-xs sm:text-sm flex-1 sm:flex-none"
              >
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>New Analysis</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {stats.map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.07)} className="stat-card">
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border shrink-0 ${STAT_COLORS[s.color]}`}>
                {s.icon}
              </div>
              <div className="text-xl sm:text-2xl font-bold text-heading">{loading ? '—' : s.value}</div>
              <div className="text-xs text-muted leading-tight">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* ── History Panel ── */}
        <motion.div {...fadeUp(0.2)} className="card p-4 sm:p-6">

          {/* Panel header + search/filter */}
          <div className="flex flex-col gap-3 mb-5 sm:mb-6">
            <h2 className="text-sm sm:text-base font-semibold text-heading flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
              Recent Tests
              {filtered.length > 0 && (
                <span className="ml-auto text-xs text-muted font-normal">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
              )}
            </h2>

            {/* Search + filter — always stacked on mobile, row on sm+ */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search errors..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field pl-9 text-sm py-2 w-full"
                />
              </div>
              <div className="relative sm:w-44">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted pointer-events-none" />
                <select
                  value={filterLang}
                  onChange={(e) => setFilterLang(e.target.value)}
                  className="input-field pl-9 text-sm py-2 cursor-pointer w-full"
                >
                  {languages.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center py-14">
              <div className="w-8 h-8 border-2 border-indigo-300 dark:border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-14">
              <Terminal className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-muted font-medium text-sm">
                {history.length === 0 ? 'No analyses yet' : 'No results match your filter'}
              </p>
              <p className="text-subtle text-xs mt-1">
                {history.length === 0
                  ? 'Run your first error analysis to see it here.'
                  : 'Try a different search or filter.'}
              </p>
              {history.length === 0 && (
                <Link to="/debug" className="btn-primary inline-flex items-center gap-2 text-sm mt-5">
                  <Zap className="w-4 h-4" /> Analyze an Error
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((item, i) => (
                <motion.div
                  key={item._id || item.id || i}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl
                             bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.04]
                             border border-slate-200 dark:border-white/5
                             hover:border-indigo-300 dark:hover:border-indigo-500/20
                             transition-all group"
                >
                  {/* Language badge — fixed width, never shrinks */}
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border shrink-0 whitespace-nowrap ${langClass(item.language)}`}>
                    {item.language}
                  </span>

                  {/* Error text — takes remaining space, truncates */}
                  <p className="flex-1 text-xs sm:text-sm text-muted font-mono truncate group-hover:text-heading transition-colors min-w-0">
                    {item.errorText}
                  </p>

                  {/* Date — hidden on mobile */}
                  <span className="text-xs text-subtle shrink-0 hidden md:block">
                    {new Date(item.createdAt).toLocaleDateString(undefined, {
                      month: 'short', day: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </span>

                  {/* Delete button */}
                  <button
                    onClick={() => deleteItem(item._id || item.id)}
                    className="p-1.5 rounded-lg text-subtle hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10
                               opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all shrink-0"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}

export default DashboardPage;
