import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertCircle, 
  Home, 
  ArrowLeft, 
  Search, 
  Code2, 
  Zap,
  Rocket,
  HelpCircle,
  FileText
} from 'lucide-react';

const NotFoundPage = () => {
  const suggestions = [
    { icon: <Home className="w-5 h-5" />, title: 'Home Page', href: '/' },
    { icon: <Code2 className="w-5 h-5" />, title: 'DebugSense AI App', href: '/app' },
    { icon: <FileText className="w-5 h-5" />, title: 'Documentation', href: '/docs' },
    { icon: <HelpCircle className="w-5 h-5" />, title: 'Contact Support', href: '/contact' }
  ];

  const errorCodes = [
    { code: '404', meaning: 'Page Not Found' },
    { code: '500', meaning: 'Server Error' },
    { code: '403', meaning: 'Access Forbidden' },
    { code: '418', meaning: "I'm a teapot" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-32 h-32 mx-auto mb-8"
            >
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
                4
              </div>
            </motion.div>
            
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                0
              </div>
            </motion.div>
            
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute top-16 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                4
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
            Oops! Page <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Not Found</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Looks like you've stumbled upon a page that doesn't exist. 
            Don't worry, even the best developers encounter 404 errors!
          </p>

          {/* Error Code Reference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8 max-w-2xl mx-auto"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              Common Error Codes
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {errorCodes.map((error, index) => (
                <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-mono font-semibold text-gray-700">{error.code}</span>
                  <span className="text-gray-600">{error.meaning}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Go Home
            </motion.a>
            
            <motion.a
              href="/app"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 border border-gray-200"
            >
              <Code2 className="w-5 h-5" />
              Try DebugSense AI
            </motion.a>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </motion.button>
          </div>

          {/* Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Were you looking for?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {suggestions.map((suggestion, index) => (
                <motion.a
                  key={index}
                  href={suggestion.href}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                    {suggestion.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{suggestion.title}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Fun Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-6 h-6 text-blue-600" />
              <h4 className="font-semibold text-gray-900">DebugSense AI Tip</h4>
            </div>
            <p className="text-gray-600 max-w-md mx-auto">
              If you're encountering this error while trying to debug code, why not try our AI-powered 
              error analysis? We can help you understand and fix your programming errors in seconds!
            </p>
            
            <motion.a
              href="/app"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              <Rocket className="w-4 h-4" />
              Start Debugging
            </motion.a>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8"
          >
            <p className="text-gray-600 mb-4">Or search for what you need:</p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search DebugSense AI..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    window.location.href = `/docs?search=${encodeURIComponent(e.target.value)}`;
                  }
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
