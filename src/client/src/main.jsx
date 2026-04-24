import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './AppRouter.jsx'
import './index.css'

// Enhanced PWA registration for DebugSense AI
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      // Unregister any existing service workers first
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log('Unregistered existing service worker:', registration.scope);
      }

      // Register new service worker
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('Service Worker registered:', registration);

      // Wait for service worker to be activated
      if (registration.installing) {
        registration.installing.addEventListener('statechange', () => {
          if (registration.installing.state === 'activated') {
            console.log('Service Worker activated');
            // Force page reload to ensure service worker takes control
            if (!navigator.serviceWorker.controller) {
              window.location.reload();
            }
          }
        });
      }

      // Check if service worker is already active
      if (registration.active) {
        console.log('Service Worker is already active');
        if (!navigator.serviceWorker.controller) {
          // Force service worker to take control
          registration.active.postMessage({ type: 'CLAIM_CLIENTS' });
        }
      }

      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log('New service worker found');
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            if (confirm('New version available! Reload to update?')) {
              newWorker.postMessage({ type: 'SKIP_WAITING' });
              window.location.reload();
            }
          }
        });
      });

      // Listen for controlling changes
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service Worker is now controlling the page');
      });

      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  } else {
    console.log('Service Worker is not supported');
    return null;
  }
};

// Check PWA status
const checkPWAStatus = () => {
  const status = {
    isServiceWorkerSupported: 'serviceWorker' in navigator,
    isControllerActive: !!navigator.serviceWorker.controller,
    isStandalone: window.matchMedia('(display-mode: standalone)').matches,
    isIOSStandalone: window.navigator.standalone === true,
    isHTTPS: location.protocol === 'https:' || location.hostname === 'localhost',
    isOnline: navigator.onLine
  };

  console.log('PWA Status:', status);
  return status;
};

// Initialize PWA
const initializePWA = async () => {
  // Check PWA status
  const status = checkPWAStatus();
  
  // Only register service worker if conditions are met
  if (status.isServiceWorkerSupported && status.isHTTPS) {
    await registerServiceWorker();
  }

  // Add online/offline event listeners
  window.addEventListener('online', () => {
    console.log('App is online');
    document.body.classList.remove('offline');
  });

  window.addEventListener('offline', () => {
    console.log('App is offline');
    document.body.classList.add('offline');
  });
};

// Initialize on page load
initializePWA();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppRouter />
    </React.StrictMode>,
)
