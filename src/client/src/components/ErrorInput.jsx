import React from 'react';

function ErrorInput({ errorText, setErrorText, language, setLanguage, handleExplain, loading, reqError }) {
    const languages = [
        'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 
        'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'Other'
    ];

    return (
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 md:p-8 mb-8 border border-slate-100 transition-all hover:shadow-2xl hover:shadow-blue-200/20">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <span className="text-3xl">🔍</span>
                    What went wrong?
                </h2>
                <p className="text-slate-500 text-sm">Paste your error stack trace or compiler error below and get instant, beginner-friendly explanations.</p>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Error Message
                    </label>
                    <textarea
                        className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none font-mono text-sm text-slate-700 placeholder-slate-400"
                        placeholder="Paste your error message here...\n\nExample:\nUncaught TypeError: Cannot read properties of undefined (reading 'length')\n  at main.js:45:12"
                        value={errorText}
                        onChange={(e) => setErrorText(e.target.value)}
                    />
                    <div className="mt-2 text-xs text-slate-400">
                        {errorText.length} characters
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="w-full sm:w-64">
                        <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Programming Language
                        </label>
                        <select
                            className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-all cursor-pointer appearance-none hover:bg-slate-100"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            {languages.map((lang) => (
                                <option key={lang} value={lang}>{lang}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleExplain}
                        disabled={loading || !errorText.trim()}
                        className="w-full sm:w-auto mt-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 h-[46px] disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Analyzing...</span>
                            </>
                        ) : (
                            <>
                                <span>Explain Error</span>
                                <span className="text-lg">✨</span>
                            </>
                        )}
                    </button>
                </div>

                {reqError && (
                    <div className="px-4 py-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 flex items-start animate-pulse">
                        <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">{reqError}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ErrorInput;
