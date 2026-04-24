import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './AppRouter.jsx'
import './index.css'

// Import service worker registration
import * as serviceWorkerRegistration from './utils/serviceWorkerRegistration.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppRouter />
    </React.StrictMode>,
)

// Register service worker for PWA functionality
serviceWorkerRegistration.register({
  onSuccess: (registration) => {
    console.log('Service worker registration successful:', registration);
  },
  onUpdate: (registration) => {
    console.log('Service worker updated:', registration);
    
    // Show update notification to user
    if (window.confirm('New version available! Would you like to update?')) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  }
});

// Setup PWA install prompt
serviceWorkerRegistration.setupInstallPrompt();
