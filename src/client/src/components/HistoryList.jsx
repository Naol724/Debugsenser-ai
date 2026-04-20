import React from 'react';
import { Clock, Trash2, Terminal } from 'lucide-react';

const LANG_COLORS = {
  JavaScript: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  TypeScript: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  Python: 'text-green-400 bg-green-400/10 border-green-400/20',
  Java: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  'C++': 'text-pink-400 bg-pink-400/10 border-pink-400/20',
  default: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
};

function HistoryList({ history, onLoadHistory, onDeleteHistory, loadingHistory }) {
  if (loadingHistory) {
    return (
      <div className="card p-6 flex flex-col items-center justify-center h-48">
        <div className="w-7 h-7 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-3" />
        <p className="text-sm text-gray-600">Loading history...</p>
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="card p-6 flex flex-col items-center justify-center h-48 text-center">
        <Terminal className="w-8 h-8 text-gray-700 mb-3" />
        <p className="text-sm text-gray-600 font-medium">No history yet</p>
        <p className="text-xs text-gray-700 mt-1">Your recent analyses will appear here.</p>
      </div>
    );
  }

  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
        <Clock className="w-4 h-4 text-indigo-400" />
        <h2 className="text-sm font-semibold text-white">Recent Analyses</h2>
        <span className="ml-auto text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full">
          {history.length}
        </span>
      </div>
      <ul className="space-y-2">
        {history.map((item) => {
          const langClass = LANG_COLORS[item.language] || LANG_COLORS.default;
          return (
            <li key={item._id || item.id}
              className="group flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-indigo-500/20 transition-all cursor-pointer"
              onClick={() => onLoadHistory(item)}
            >
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border shrink-0 mt-0.5 ${langClass}`}>
                {item.language}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-600 font-mono truncate group-hover:text-gray-300 transition-colors">
                  {item.errorText}
                </p>
                <p className="text-xs text-gray-700 mt-1">
                  {new Date(item.createdAt || item.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onDeleteHistory(item._id || item.id); }}
                className="p-1 rounded text-gray-700 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all shrink-0"
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
