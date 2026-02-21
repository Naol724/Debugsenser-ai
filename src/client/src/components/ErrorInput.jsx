import React from 'react';

function ErrorInput({ errorText, setErrorText, language, setLanguage, handleExplain, loading, reqError }) {
    const languages = ['JavaScript', 'Python', 'Java', 'C++', 'Other'];

    return (
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 md:p-8 mb-8 border border-slate-100 transition-all">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">What went wrong?</h2>
                <p className="text-slate-500 text-sm">Paste your error stack trace or compiler error below.</p>
            </div>

            <div className="space-y-5">
                <div>
                    <textarea
                        className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none font-mono text-sm text-slate-700"
                        placeholder="Paste your error message here... e.g., Uncaught TypeError: Cannot read properties of undefined"
                        value={errorText}
                        onChange={(e) => setErrorText(e.target.value)}
                    />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="w-full sm:w-64">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Language / Context</label>
                        <select
                            className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors cursor-pointer appearance-none"
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
                        disabled={loading}
                        className="w-full sm:w-auto mt-auto px-8 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 h-[46px]"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Analyzing...</span>
                            </>
                        ) : (
                            <span>Explain Error ✨</span>
                        )}
                    </button>
                </div>

                {reqError && (
                    <div className="px-4 py-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 flex items-start">
                        <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{reqError}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ErrorInput;
