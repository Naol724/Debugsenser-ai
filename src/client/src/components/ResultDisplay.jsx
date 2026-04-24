import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy } from 'lucide-react';

function ResultDisplay({ markdownContent }) {
  const copyCode = async (text) => {
    try { await navigator.clipboard.writeText(text); } catch (e) { console.error(e); }
  };

  return (
    <div className="
      prose prose-sm max-w-none
      prose-headings:font-semibold
      prose-headings:text-indigo-600 dark:prose-headings:text-indigo-400
      prose-h2:text-base prose-h3:text-sm
      prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed
      prose-strong:text-gray-800 dark:prose-strong:text-gray-200
      prose-li:text-gray-600 dark:prose-li:text-gray-400
      prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
      prose-blockquote:border-l-indigo-400 prose-blockquote:bg-indigo-50 dark:prose-blockquote:bg-indigo-500/5 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
      prose-hr:border-slate-200 dark:prose-hr:border-white/10
      prose-code:text-indigo-600 dark:prose-code:text-indigo-300
      prose-code:bg-indigo-50 dark:prose-code:bg-indigo-500/10
      prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono
      prose-code:border prose-code:border-indigo-200 dark:prose-code:border-indigo-500/20
      prose-pre:bg-slate-900 dark:prose-pre:bg-[#0a0d16]
      prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-white/10
      prose-pre:rounded-xl prose-pre:text-sm
    ">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            if (inline) {
              return (
                <code
                  className="text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded text-xs font-mono border border-indigo-200 dark:border-indigo-500/20"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <div className="relative group my-4">
                <pre className="bg-slate-900 dark:bg-[#0a0d16] border border-slate-700 dark:border-white/10 rounded-xl p-4 overflow-x-auto text-sm">
                  <code className="text-slate-100 font-mono">{children}</code>
                </pre>
                <button
                  onClick={() => copyCode(String(children))}
                  className="absolute top-3 right-3 p-1.5 rounded-lg
                             bg-slate-700 hover:bg-slate-600
                             text-slate-400 hover:text-white
                             opacity-0 group-hover:opacity-100 transition-all
                             border border-slate-600"
                  title="Copy code"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          },
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}

export default ResultDisplay;
