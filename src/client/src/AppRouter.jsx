import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import App from './App';

// Import new pages (we'll create these next)
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PricingPage from './pages/PricingPage';
import DocsPage from './pages/DocsPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

const AppRouter = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        
        <Routes>
          <Route path="/" element={
            <PageWrapper>
              <HomePage />
            </PageWrapper>
          } />
          
          <Route path="/app" element={
            <PageWrapper>
              <App />
            </PageWrapper>
          } />
          
          <Route path="/about" element={
            <PageWrapper>
              <AboutPage />
            </PageWrapper>
          } />
          
          <Route path="/contact" element={
            <PageWrapper>
              <ContactPage />
            </PageWrapper>
          } />
          
          <Route path="/pricing" element={
            <PageWrapper>
              <PricingPage />
            </PageWrapper>
          } />
          
          <Route path="/docs" element={
            <PageWrapper>
              <DocsPage />
            </PageWrapper>
          } />
          
          <Route path="/privacy" element={
            <PageWrapper>
              <PrivacyPage />
            </PageWrapper>
          } />
          
          <Route path="/terms" element={
            <PageWrapper>
              <TermsPage />
            </PageWrapper>
          } />
          
          <Route path="*" element={
            <PageWrapper>
              <NotFoundPage />
            </PageWrapper>
          } />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
};

export default AppRouter;
