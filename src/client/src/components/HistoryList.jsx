import React from 'react';

function HistoryList({ history, onLoadHistory }) {
    if (!history || history.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 border border-slate-100 flex flex-col items-center justify-center text-center h-48">
                <svg className="w-10 h-10 text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-slate-500 font-medium">No history yet</h3>
                <p className="text-sm text-slate-400 mt-1">Your recent explanations will appear here.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-100">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-lg font-bold text-slate-800">Recent Explanations</h2>
            </div>

            <ul className="space-y-3">
                {history.map(item => (
                    <li
                        key={item.id}
                        onClick={() => onLoadHistory(item)}
                        className="p-4 rounded-xl border border-slate-100 hover:border-blue-300 hover:shadow-md hover:bg-blue-50/50 cursor-pointer transition-all group"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-md">
                                {item.language}
                            </span>
                            <span className="text-xs font-medium text-slate-400">
                                {new Date(item.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                        <p className="text-sm text-slate-600 font-mono truncate group-hover:text-slate-900">
                            {item.errorText}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HistoryList;
