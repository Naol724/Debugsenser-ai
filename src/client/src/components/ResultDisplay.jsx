import React from 'react';
import ReactMarkdown from 'react-markdown';

function ResultDisplay({ markdownContent }) {
    const [copied, setCopied] = React.useState(false);
    
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(markdownContent);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };
    
    return (
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center text-green-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Explanation Ready</h2>
                        <p className="text-sm text-slate-500">Here's what went wrong and how to fix it</p>
                    </div>
                </div>
                <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2 group"
                >
                    {copied ? (
                        <>
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-green-600">Copied!</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4 group-hover:text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            <div className="prose prose-sm md:prose-base max-w-none prose-slate prose-headings:text-blue-600 prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-pre:shadow-inner prose-pre:rounded-xl prose-code:bg-slate-100 prose-code:text-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-800">
                <ReactMarkdown
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            return !inline ? (
                                <div className="relative group">
                                    <pre className={className} {...props}>
                                        <code>{children}</code>
                                    </pre>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(String(children))}
                                        className="absolute top-2 right-2 p-2 bg-slate-700 hover:bg-slate-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Copy code"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded-md font-mono text-sm hover:bg-slate-200 transition-colors" {...props}>
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
