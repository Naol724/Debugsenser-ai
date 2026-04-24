import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  X, 
  Smartphone, 
  CheckCircle2, 
  Zap,
  Monitor,
  Wifi,
  Rocket
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

const PWAInstallPrompt = () => {
  const {
    deferredPrompt,
    isInstallable,
    isInstalled,
    showInstallUI,
    installStatus,
    installPWA,
    dismissInstall
  } = usePWAInstall();

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Debug logging
  useEffect(() => {
    console.log('PWA Install Debug:', {
      deferredPrompt: !!deferredPrompt,
      isInstallable,
      isInstalled,
      showInstallUI,
      installStatus
    });
  }, [deferredPrompt, isInstallable, isInstalled, showInstallUI, installStatus]);

  useEffect(() => {
    // Request notification permission on mount
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const handleInstall = async () => {
    console.log('Install button clicked', { deferredPrompt, isInstallable });
    
    if (!deferredPrompt) {
      console.log('No deferred prompt available');
      setNotificationMessage('Install prompt not available. Try refreshing the page.');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }

    try {
      const success = await installPWA();
      if (success) {
        setNotificationMessage('DebugSense AI installed successfully!');
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    } catch (error) {
      console.error('Install failed:', error);
      setNotificationMessage('Installation failed. Please try again.');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const handleDismiss = () => {
    dismissInstall();
  };

  const getStatusIcon = () => {
    switch (installStatus) {
      case 'installing':
        return <Monitor className="w-5 h-5 animate-spin text-blue-600" />;
      case 'installed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'dismissed':
        return <X className="w-5 h-5 text-gray-600" />;
      default:
        return <Download className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusText = () => {
    switch (installStatus) {
      case 'installing':
        return 'Installing...';
      case 'installed':
        return 'Installed';
      case 'dismissed':
        return 'Dismissed';
      default:
        return 'Install App';
    }
  };

  const getStatusColor = () => {
    switch (installStatus) {
      case 'installing':
        return 'from-blue-600 to-blue-700';
      case 'installed':
        return 'from-green-600 to-green-700';
      case 'dismissed':
        return 'from-gray-600 to-gray-700';
      default:
        return 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800';
    }
  };

  if (isInstalled) {
    return null; // Don't show anything if already installed
  }

  return (
    <>
      {/* Install Button */}
      <AnimatePresence>
        {showInstallUI && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            {/* Glassmorphism Card */}
            <div className="relative">
              {/* Backdrop blur */}
              <div className="absolute inset-0 bg-black/20 backdrop-blur-xl rounded-2xl" />
              
              {/* Main card */}
              <div className="relative bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-6 min-w-80 shadow-2xl">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      Install DebugSense AI
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Get instant error analysis on your device
                    </p>
                  </div>
                  <button
                    onClick={handleDismiss}
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <Wifi className="w-4 h-4 text-blue-600" />
                    <span>Works offline</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <Zap className="w-4 h-4 text-green-600" />
                    <span>Lightning fast</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <Monitor className="w-4 h-4 text-purple-600" />
                    <span>No browser tabs</span>
                  </div>
                </div>

                {/* Install Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleInstall}
                  disabled={!isInstallable || installStatus === 'installing'}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${getStatusColor()}`}
                >
                  {getStatusIcon()}
                  <span>{getStatusText()}</span>
                </motion.button>

                {/* Status indicator */}
                {installStatus === 'installing' && (
                  <div className="mt-3 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            className="fixed top-6 right-6 z-50"
          >
            <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-80">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
              <div>
                <p className="font-semibold">{notificationMessage}</p>
                <p className="text-sm opacity-90">App is ready to use</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PWAInstallPrompt;
