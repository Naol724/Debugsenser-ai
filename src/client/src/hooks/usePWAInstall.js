import { useState, useEffect, useCallback } from 'react';

export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallUI, setShowInstallUI] = useState(false);
  const [installStatus, setInstallStatus] = useState('idle'); // idle, installing, installed, dismissed

  // Check if app is already installed
  useEffect(() => {
    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isInWebAppiOS = window.navigator.standalone === true;
      const isInstalled = isStandalone || isInWebAppiOS;
      
      setIsInstalled(isInstalled);
      setIsInstallable(!isInstalled);
      
      // Show install UI if not installed and in browser
      if (!isInstalled && !deferredPrompt) {
        // Delay showing UI to prevent immediate popup
        setTimeout(() => {
          setShowInstallUI(true);
        }, 3000);
      }
    };

    // Check immediately
    checkInstalled();

    // Also check when visibility changes (user returns to tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkInstalled();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [deferredPrompt]);

  // Listen for beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent default Chrome install banner
      e.preventDefault();
      
      // Store the event for later use
      setDeferredPrompt(e);
      setIsInstallable(true);
      
      console.log('PWA install prompt captured', e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Listen for appinstalled event
  useEffect(() => {
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      setShowInstallUI(false);
      setInstallStatus('installed');
      
      console.log('PWA installed successfully');
      
      // Hide any install UI immediately
      setTimeout(() => {
        setShowInstallUI(false);
      }, 1000);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Install the PWA
  const installPWA = useCallback(async () => {
    if (!deferredPrompt) {
      console.log('Install prompt not available');
      return false;
    }

    try {
      setInstallStatus('installing');
      
      // Show the install prompt
      const result = await deferredPrompt.prompt();
      
      if (result.outcome === 'accepted') {
        setInstallStatus('installed');
        setShowInstallUI(false);
        
        // Show success notification
        showInstallNotification('DebugSense AI installed successfully!');
        
        console.log('PWA installation accepted');
      } else {
        setInstallStatus('dismissed');
        
        // Hide UI for a while when dismissed
        setTimeout(() => {
          setShowInstallUI(false);
        }, 3000);
        
        console.log('PWA installation dismissed');
      }
      
      // Clear the deferred prompt
      setDeferredPrompt(null);
      
      return true;
    } catch (error) {
      console.error('Error during PWA installation:', error);
      setInstallStatus('error');
      return false;
    }
  }, [deferredPrompt]);

  // Dismiss install UI
  const dismissInstall = useCallback(() => {
    setShowInstallUI(false);
    setInstallStatus('dismissed');
    
    // Don't show again for a while
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  }, []);

  // Check if user previously dismissed
  useEffect(() => {
    const dismissedTime = localStorage.getItem('pwa-install-dismissed');
    if (dismissedTime) {
      const timeDiff = Date.now() - parseInt(dismissedTime);
      const oneWeek = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
      
      // Don't show if dismissed within last week
      if (timeDiff < oneWeek) {
        setShowInstallUI(false);
      }
    }
  }, []);

  // Show install notification
  const showInstallNotification = (message) => {
    // Create a simple notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('DebugSense AI', {
        body: message,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-192x192.png',
        tag: 'pwa-install'
      });
    }
  };

  // Force check installability for debugging
  useEffect(() => {
    // Check if PWA criteria are met
    const checkPWASupport = () => {
      const isHttps = location.protocol === 'https:' || location.hostname === 'localhost';
      const isSupported = 'serviceWorker' in navigator && 'beforeinstallprompt' in window;
      const isNotInstalled = !window.matchMedia('(display-mode: standalone)').matches;
      
      const shouldBeInstallable = isHttps && isSupported && isNotInstalled;
      
      setIsInstallable(shouldBeInstallable);
      
      if (shouldBeInstallable && !showInstallUI) {
        setTimeout(() => {
          setShowInstallUI(true);
        }, 2000);
      }
    };

    // Check immediately and periodically
    checkPWASupport();
    
    const interval = setInterval(checkPWASupport, 5000);
    
    return () => {
      clearInterval(interval);
    };
  }, [showInstallUI]);

  return {
    deferredPrompt,
    isInstallable,
    isInstalled,
    showInstallUI,
    installStatus,
    installPWA,
    dismissInstall
  };
};
