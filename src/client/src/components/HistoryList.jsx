import React from 'react';
import { Clock, Trash2, Terminal } from 'lucide-react';

const LANG_COLORS = {
  JavaScript: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-400/10 border-yellow-300 dark:border-yellow-400/20',
  TypeScript: 'text-blue-600   dark:text-blue-400   bg-blue-100   dark:bg-blue-400/10   border-blue-300   dark:border-blue-400/20',
  Python:     'text-green-600  dark:text-green-400  bg-green-100  dark:bg-green-400/10  border-green-300  dark:border-green-400/20',
  Java:       'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-400/10 border-orange-300 dark:border-orange-400/20',
  'C++':      'text-pink-600   dark:text-pink-400   bg-pink-100   dark:bg-pink-400/10   border-pink-300   dark:border-pink-400/20',
  default:    'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-400/10 border-indigo-300 dark:border-indigo-400/20',
};

function HistoryList({ history, onLoadHistory, onDeleteHistory, loadingHistory }) {
  if (loadingHistory) {
    return (
      <div className="card p-6 flex flex-col items-center justify-center h-44">
        <div className="w-7 h-7 border-2 border-indigo-300 dark:border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-3" />
        <p className="text-sm text-muted">Loading history...</p>
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="card p-6 flex flex-col items-center justify-center h-44 text-center">
        <Terminal className="w-8 h-8 text-slate-300 dark:text-gray-700 mb-3" />
        <p className="text-sm text-muted font-medium">No history yet</p>
        <p className="text-xs text-subtle mt-1">Your recent analyses will appear here.</p>
      </div>
    );
  }

  return (
    <div className="card p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-white/5">
        <Clock className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
        <h2 className="text-sm font-semibold text-heading">Recent Analyses</h2>
        <span className="ml-auto text-xs bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 px-2 py-0.5 rounded-full shrink-0">
          {history.length}
        </span>
      </div>

      <ul className="space-y-2">
        {history.map((item) => {
          const lc = LANG_COLORS[item.language] || LANG_COLORS.default;
          return (
            <li
              key={item._id || item.id}
              className="group flex items-start gap-2 p-2.5 sm:p-3 rounded-xl
                         bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.04]
                         border border-slate-200 dark:border-white/5
                         hover:border-indigo-300 dark:hover:border-indigo-500/20
                         transition-all cursor-pointer"
              onClick={() => onLoadHistory(item)}
            >
              {/* Language badge */}
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border shrink-0 mt-0.5 whitespace-nowrap ${lc}`}>
                {item.language}
              </span>

              {/* Error text + date */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted font-mono truncate group-hover:text-heading transition-colors">
                  {item.errorText}
                </p>
                <p className="text-xs text-subtle mt-0.5">
                  {new Date(item.createdAt || item.timestamp).toLocaleDateString(undefined, {
                    month: 'short', day: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                  })}
                </p>
              </div>

              {/* Delete — always visible on mobile, hover-only on desktop */}
              <button
                onClick={(e) => { e.stopPropagation(); onDeleteHistory(item._id || item.id); }}
                className="p-1 rounded text-subtle hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10
                           opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all shrink-0 mt-0.5"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HistoryList;
