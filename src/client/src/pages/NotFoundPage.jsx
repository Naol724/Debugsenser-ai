import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Code2, ArrowLeft, Zap } from 'lucide-react';

const NotFoundPage = () => (
  <div className="min-h-screen bg-[#0f1117] bg-grid flex items-center justify-center px-4">
    <div className="text-center max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <div className="text-8xl font-extrabold gradient-text mb-4">404</div>
        <h1 className="text-3xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Looks like you've hit a dead end. Even the best developers encounter 404s — let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary flex items-center justify-center gap-2">
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link to="/debug" className="btn-ghost flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" /> Try DebugSense
          </Link>
          <button onClick={() => window.history.back()} className="btn-ghost flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  </div>
);

export default NotFoundPage;
