import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Code2, 
  Zap, 
  Shield, 
  ChevronRight,
  Search,
  FileText,
  Terminal,
  Users,
  Settings,
  HelpCircle,
  Copy,
  CheckCircle2
} from 'lucide-react';

const DocsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState('');

  const docSections = [
    {
      title: 'Getting Started',
      icon: <Rocket className="w-6 h-6" />,
      articles: [
        { title: 'Quick Start Guide', description: 'Get up and running in 5 minutes', href: '#quickstart' },
        { title: 'Installation', description: 'How to install and setup DebugSense AI', href: '#installation' },
        { title: 'First Error Analysis', description: 'Learn to analyze your first error', href: '#first-analysis' },
        { title: 'Basic Concepts', description: 'Understanding the core concepts', href: '#concepts' }
      ]
    },
    {
      title: 'API Reference',
      icon: <Code2 className="w-6 h-6" />,
      articles: [
        { title: 'REST API', description: 'Complete API documentation', href: '#api' },
        { title: 'Authentication', description: 'How to authenticate API requests', href: '#auth' },
        { title: 'Error Analysis Endpoint', description: 'Main API endpoint details', href: '#analyze-endpoint' },
        { title: 'Rate Limits', description: 'API rate limiting information', href: '#rate-limits' }
      ]
    },
    {
      title: 'Guides',
      icon: <BookOpen className="w-6 h-6" />,
      articles: [
        { title: 'Best Practices', description: 'Tips for effective error debugging', href: '#best-practices' },
        { title: 'Common Error Patterns', description: 'Frequent error types and solutions', href: '#patterns' },
        { title: 'Integration Examples', description: 'Code examples for different languages', href: '#examples' },
        { title: 'Troubleshooting', description: 'Common issues and solutions', href: '#troubleshooting' }
      ]
    },
    {
      title: 'Advanced Topics',
      icon: <Settings className="w-6 h-6" />,
      articles: [
        { title: 'Custom Models', description: 'Using custom AI models', href: '#custom-models' },
        { title: 'Batch Processing', description: 'Processing multiple errors', href: '#batch' },
        { title: 'Webhooks', description: 'Setting up webhook integrations', href: '#webhooks' },
        { title: 'Performance Optimization', description: 'Optimizing for speed and accuracy', href: '#performance' }
      ]
    }
  ];

  const codeExamples = [
    {
      language: 'JavaScript',
      code: `const response = await fetch('/api/explain', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    errorText: 'TypeError: Cannot read property of undefined',
    language: 'JavaScript'
  })
});

const data = await response.json();
console.log(data.explanation);`,
      description: 'Basic API usage in JavaScript'
    },
    {
      language: 'Python',
      code: `import requests

response = requests.post(
    'https://api.debugsense.ai/explain',
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
    },
    json={
        'errorText': 'NameError: name x is not defined',
        'language': 'Python'
    }
)

data = response.json()
print(data['explanation'])`,
      description: 'Python API integration example'
    },
    {
      language: 'cURL',
      code: `curl -X POST https://api.debugsense.ai/explain \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "errorText": "NullPointerException in Java",
    "language": "Java"
  }'`,
      description: 'cURL command for testing API'
    }
  ];

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const filteredSections = docSections.map(section => ({
    ...section,
    articles: section.articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.articles.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-3xl" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Documentation</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Everything you need to integrate DebugSense AI into your workflow. 
              From quick start guides to advanced API references.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: <Zap className="w-5 h-5" />, title: 'Quick Start', href: '#quickstart' },
              { icon: <Code2 className="w-5 h-5" />, title: 'API Reference', href: '#api' },
              { icon: <BookOpen className="w-5 h-5" />, title: 'Guides', href: '#guides' },
              { icon: <HelpCircle className="w-5 h-5" />, title: 'Support', href: '#support' }
            ].map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  {link.icon}
                </div>
                <span className="font-medium text-gray-900">{link.title}</span>
                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {filteredSections.map((section, sectionIndex) => (
                  <motion.div
                    key={sectionIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  >
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-5 h-5 text-blue-600">
                        {section.icon}
                      </div>
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <a
                            href={article.href}
                            className="block p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          >
                            {article.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              {/* Quick Start Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Rocket className="w-8 h-8 text-blue-600" />
                  Quick Start Guide
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 1: Get Your API Key</h3>
                    <p className="text-gray-600 mb-4">
                      Sign up for a free account to get your API key. You'll get 10 free analyses per month.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <code className="text-sm text-gray-700">YOUR_API_KEY = "sk-debugsense-1234567890"</code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 2: Make Your First Request</h3>
                    <p className="text-gray-600 mb-4">
                      Use the API to analyze your first error. Here's a simple example:
                    </p>
                    <div className="space-y-4">
                      {codeExamples.slice(0, 1).map((example, index) => (
                        <div key={index} className="relative">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">{example.language}</span>
                            <button
                              onClick={() => handleCopyCode(example.code)}
                              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
                            >
                              {copiedCode === example.code ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                              {copiedCode === example.code ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                            <code>{example.code}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 3: Parse the Response</h3>
                    <p className="text-gray-600 mb-4">
                      The API returns a structured response with the explanation and metadata:
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                      <code>{`{
  "explanation": "## What the error means\\nThis error occurs when...",
  "sessionId": "session_123456",
  "id": "explanation_789",
  "timestamp": "2024-01-01T12:00:00Z"
}`}</code>
                    </pre>
                  </div>
                </div>
              </motion.div>

              {/* API Reference Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Code2 className="w-8 h-8 text-purple-600" />
                  API Reference
                </h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">POST /api/explain</h3>
                    <p className="text-gray-600 mb-4">
                      Analyze a programming error and get a detailed explanation.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Request Body</h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <pre className="text-sm"><code>{`{
  "errorText": "string (required)",
  "language": "string (required)",
  "sessionId": "string (optional)"
}`}</code></pre>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <pre className="text-sm"><code>{`{
  "explanation": "string",
  "sessionId": "string",
  "id": "string"
}`}</code></pre>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Example</h4>
                        {codeExamples.map((example, index) => (
                          <div key={index} className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">{example.language}</span>
                              <button
                                onClick={() => handleCopyCode(example.code)}
                                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
                              >
                                {copiedCode === example.code ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                                {copiedCode === example.code ? 'Copied!' : 'Copy'}
                              </button>
                            </div>
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                              <code>{example.code}</code>
                            </pre>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentication</h3>
                    <p className="text-gray-600 mb-4">
                      Include your API key in the Authorization header:
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                      <code>Authorization: Bearer YOUR_API_KEY</code>
                    </pre>
                  </div>
                </div>
              </motion.div>

              {/* Rate Limits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Shield className="w-8 h-8 text-green-600" />
                  Rate Limits
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Plan</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Requests/Minute</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Requests/Month</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-700">Free</td>
                        <td className="py-3 px-4 text-gray-700">10</td>
                        <td className="py-3 px-4 text-gray-700">10</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-700">Pro</td>
                        <td className="py-3 px-4 text-gray-700">100</td>
                        <td className="py-3 px-4 text-gray-700">Unlimited</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-700">Team</td>
                        <td className="py-3 px-4 text-gray-700">500</td>
                        <td className="py-3 px-4 text-gray-700">Unlimited</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-gray-700">Enterprise</td>
                        <td className="py-3 px-4 text-gray-700">Custom</td>
                        <td className="py-3 px-4 text-gray-700">Unlimited</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Our support team is here to help you succeed with DebugSense AI
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <HelpCircle className="w-5 h-5" />
                Contact Support
              </motion.a>
              
              <motion.a
                href="https://github.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                View Examples
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DocsPage;
