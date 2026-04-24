// Custom PWA registration for DebugSense AI
// Ensures proper service worker control and fixes white screen issues

let swRegistration = null;
let isRefreshing = false;

export const registerSW = async () => {
  if ('serviceWorker' in navigator) {
    try {
      // Register the service worker
      swRegistration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('Service Worker registered:', swRegistration);

      // Ensure the service worker takes control immediately
      if (swRegistration.active && !navigator.serviceWorker.controller) {
        // Force the service worker to control the page
        window.location.reload();
      }

      // Listen for updates
      swRegistration.addEventListener('updatefound', () => {
        const newWorker = swRegistration.installing;
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New version available
            if (confirm('New version available! Reload to update?')) {
              newWorker.postMessage({ type: 'SKIP_WAITING' });
            }
          }
        });
      });

      // Listen for controlling changes
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!isRefreshing) {
          isRefreshing = true;
          window.location.reload();
        }
      });

      // Check if service worker is controlling the page
      if (!navigator.serviceWorker.controller) {
        console.log('Service Worker not controlling page, reloading...');
        window.location.reload();
      }

    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

export const unregisterSW = async () => {
  if (swRegistration) {
    await swRegistration.unregister();
    swRegistration = null;
    console.log('Service Worker unregistered');
  }
};

// Force service worker to take control
export const forceSWControl = () => {
  if (navigator.serviceWorker.controller) {
    console.log('Service Worker is already controlling the page');
    return;
  }

  // If not controlled, try to claim the page
  navigator.serviceWorker.ready.then(registration => {
    if (registration.active) {
      registration.active.postMessage({ type: 'CLAIM_CLIENTS' });
    }
  });
};

// Clear all caches to fix white screen issues
export const clearAllCaches = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('All caches cleared');
  }
};

// Check PWA status
export const checkPWAStatus = () => {
  const status = {
    isServiceWorkerSupported: 'serviceWorker' in navigator,
    isControllerActive: !!navigator.serviceWorker.controller,
    isStandalone: window.matchMedia('(display-mode: standalone)').matches,
    isIOSStandalone: window.navigator.standalone === true,
    isHTTPS: location.protocol === 'https:' || location.hostname === 'localhost'
  };

  console.log('PWA Status:', status);
  return status;
};
