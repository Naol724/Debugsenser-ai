import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, CheckCircle } from 'lucide-react';

const PWAInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showMessage, setShowMessage] = useState('');
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
      }
    };

    // Check if it's iOS device
    const checkIfIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };

    checkIfInstalled();
    setIsIOS(checkIfIOS());

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      showNotification('DebugSense AI has been installed successfully!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const showNotification = (message) => {
    setShowMessage(message);
    setTimeout(() => setShowMessage(''), 3000);
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        showNotification('Installing DebugSense AI...');
      } else {
        showNotification('Install cancelled');
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleIOSInstall = () => {
    setShowMessage('To install on iOS: Tap Share → Add to Home Screen');
    setTimeout(() => setShowMessage(''), 5000);
  };

  const dismissPrompt = () => {
    setShowInstallPrompt(false);
    setDeferredPrompt(null);
  };

  // Don't show if already installed
  if (isInstalled) {
    return null;
  }

  return (
    <>
      {/* Install Button */}
      {showInstallPrompt && !isIOS && (
        <motion.button
          id="pwa-install-button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleInstallClick}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-medium"
        >
          <Smartphone className="w-5 h-5" />
          <span>Install App</span>
          <Download className="w-4 h-4" />
        </motion.button>
      )}

      {/* iOS Install Guide */}
      {showInstallPrompt && isIOS && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 max-w-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Install on iOS</h3>
            </div>
            <button
              onClick={dismissPrompt}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            To install DebugSense AI on your iOS device:
          </p>
          <ol className="text-sm text-gray-600 dark:text-gray-300 space-y-1 mb-4">
            <li>1. Tap the Share button below</li>
            <li>2. Scroll down and tap "Add to Home Screen"</li>
            <li>3. Tap "Add" to confirm</li>
          </ol>
          <button
            onClick={handleIOSInstall}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Show Share Button
          </button>
        </motion.div>
      )}

      {/* Success/Error Messages */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>{showMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PWAInstallButton;
