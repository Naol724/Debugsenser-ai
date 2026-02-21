import React from 'react';
import ReactMarkdown from 'react-markdown';

function ResultDisplay({ markdownContent }) {
    return (
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Explanation Ready</h2>
            </div>

            <div className="prose prose-sm md:prose-base max-w-none prose-slate prose-headings:text-blue-600 prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-pre:shadow-inner prose-pre:rounded-xl">
                <ReactMarkdown
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            return !inline ? (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            ) : (
                                <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded-md font-mono text-sm" {...props}>
                                    {children}
                                </code>
                            );
                        }
                    }}
                >
                    {markdownContent}
                </ReactMarkdown>
            </div>
        </div>
    );
}

export default ResultDisplay;
