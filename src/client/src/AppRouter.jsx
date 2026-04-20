import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import DebugPage from './pages/DebugPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

// Keep legacy /app route pointing to DebugPage
const PageWrap = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

const AppRouter = () => (
  <Router>
    <div className="min-h-screen bg-[#0f1117] flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<PageWrap><HomePage /></PageWrap>} />
          <Route path="/debug" element={<PageWrap><DebugPage /></PageWrap>} />
          <Route path="/app" element={<PageWrap><DebugPage /></PageWrap>} />
          <Route path="/dashboard" element={<PageWrap><DashboardPage /></PageWrap>} />
          <Route path="/about" element={<PageWrap><AboutPage /></PageWrap>} />
          <Route path="/privacy" element={<PageWrap><PrivacyPage /></PageWrap>} />
          <Route path="/terms" element={<PageWrap><TermsPage /></PageWrap>} />
          <Route path="*" element={<PageWrap><NotFoundPage /></PageWrap>} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);

export default AppRouter;
