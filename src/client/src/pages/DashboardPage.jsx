import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart3, Clock, Code2, Trash2, Search, Filter,
  Zap, TrendingUp, Database, ArrowRight, RefreshCw, Terminal
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const LANG_COLORS = {
  JavaScript: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  TypeScript: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  Python: 'text-green-400 bg-green-400/10 border-green-400/20',
  Java: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  'C++': 'text-pink-400 bg-pink-400/10 border-pink-400/20',
  default: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
};

const langClass = (lang) => LANG_COLORS[lang] || LANG_COLORS.default;

function DashboardPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterLang, setFilterLang] = useState('All');
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const sid = localStorage.getItem('debugSenseSessionId') || '';
    setSessionId(sid);
    if (sid) fetchHistory(sid);
    else setLoading(false);
  }, []);

  const fetchHistory = async (sid) => {
    setLoading(true);
    try {
      const url = import.meta.env.DEV ? `/api/history/${sid}?limit=100` : `${window.location.origin}/api/history/${sid}?limit=100`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history || []);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const deleteItem = async (id) => {
    try {
      const url = import.meta.env.DEV ? `/api/history/${id}` : `${window.location.origin}/api/history/${id}`;
      const res = await fetch(url, { method: 'DELETE' });
      if (res.ok) setHistory((h) => h.filter((i) => (i._id || i.id) !== id));
    } catch (e) { console.error(e); }
  };

  const languages = ['All', ...new Set(history.map((h) => h.language))];

  const filtered = history.filter((item) => {
    const matchLang = filterLang === 'All' || item.language === filterLang;
    const matchSearch = !search || item.errorText?.toLowerCase().includes(search.toLowerCase());
    return matchLang && matchSearch;
  });

  const stats = [
    { label: 'Total Analyses', value: history.length, icon: <BarChart3 className="w-5 h-5" />, color: 'indigo' },
    { label: 'Languages Used', value: new Set(history.map((h) => h.language)).size, icon: <Code2 className="w-5 h-5" />, color: 'violet' },
    { label: 'This Week', value: history.filter((h) => new Date(h.createdAt) > new Date(Date.now() - 7 * 86400000)).length, icon: <TrendingUp className="w-5 h-5" />, color: 'cyan' },
    { label: 'Saved Fixes', value: history.length, icon: <Database className="w-5 h-5" />, color: 'emerald' },
  ];

  const colorMap = {
    indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    violet: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  };

  return (
    <div className="min-h-screen bg-[#0f1117] bg-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <motion.div {...fadeUp()} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
            <p className="text-gray-500 text-sm">Your error analysis history and statistics.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => fetchHistory(sessionId)}
              className="btn-ghost flex items-center gap-2 text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <Link to="/debug" className="btn-primary flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4" />
              New Analysis
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.07)} className="stat-card">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${colorMap[s.color]}`}>
                {s.icon}
              </div>
              <div className="text-2xl font-bold text-white">{loading ? '—' : s.value}</div>
              <div className="text-xs text-gray-600">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* History Panel */}
        <motion.div {...fadeUp(0.2)} className="card p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              Recent Tests
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type="text"
                  placeholder="Search errors..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-dark pl-9 text-sm py-2 w-full sm:w-56"
                />
              </div>
              {/* Language Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <select
                  value={filterLang}
                  onChange={(e) => setFilterLang(e.target.value)}
                  className="input-dark pl-9 text-sm py-2 cursor-pointer"
                >
                  {languages.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <Terminal className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">
                {history.length === 0 ? 'No analyses yet' : 'No results match your filter'}
              </p>
              <p className="text-gray-700 text-sm mt-1">
                {history.length === 0 ? 'Run your first error analysis to see it here.' : 'Try a different search or filter.'}
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
                <motion.div key={item._id || item.id || i}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-indigo-500/20 transition-all group"
                >
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border shrink-0 ${langClass(item.language)}`}>
                    {item.language}
                  </span>
                  <p className="flex-1 text-sm text-gray-500 font-mono truncate group-hover:text-gray-300 transition-colors">
                    {item.errorText}
                  </p>
                  <span className="text-xs text-gray-700 shrink-0 hidden sm:block">
                    {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <button
                    onClick={() => deleteItem(item._id || item.id)}
                    className="p-1.5 rounded-lg text-gray-700 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
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
