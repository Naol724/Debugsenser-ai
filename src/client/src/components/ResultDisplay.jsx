import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, CheckCircle2 } from 'lucide-react';

function ResultDisplay({ markdownContent }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) { console.error(e); }
  };

  return (
    <div className="prose prose-invert prose-sm max-w-none
      prose-headings:text-indigo-400 prose-headings:font-semibold
      prose-h2:text-base prose-h3:text-sm
      prose-p:text-gray-400 prose-p:leading-relaxed
      prose-strong:text-gray-200
      prose-code:text-indigo-300 prose-code:bg-indigo-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono prose-code:border prose-code:border-indigo-500/20
      prose-pre:bg-[#0a0d16] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:text-sm
      prose-blockquote:border-l-indigo-500 prose-blockquote:bg-indigo-500/5 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-400
      prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
      prose-li:text-gray-400
      prose-hr:border-white/10"
    >
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            if (inline) {
              return (
                <code className="text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded text-xs font-mono border border-indigo-500/20" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <div className="relative group my-4">
                <pre className="bg-[#0a0d16] border border-white/10 rounded-xl p-4 overflow-x-auto text-sm">
                  <code className="text-gray-300 font-mono">{children}</code>
                </pre>
                <button
                  onClick={() => copyCode(String(children))}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-600 hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-all border border-white/10"
                  title="Copy code"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          }
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}

export default ResultDisplay;
