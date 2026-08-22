import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global PWA prompt handler to ensure install prompt is never missed
declare global {
  interface Window {
    deferredPwaPrompt?: any;
    isPwaInstalled?: boolean;
  }
}

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered whenever the user clicks any "Install App" button
  window.deferredPwaPrompt = e;
  window.dispatchEvent(new CustomEvent('bharatseva:pwa-prompt-available'));
  console.log('[BharatSeva PWA] beforeinstallprompt event captured and ready.');
});

window.addEventListener('appinstalled', () => {
  window.deferredPwaPrompt = null;
  window.isPwaInstalled = true;
  window.dispatchEvent(new CustomEvent('bharatseva:pwa-installed'));
  console.log('[BharatSeva PWA] Application successfully installed.');
});

// Register Service Worker for PWA installation & Offline fast-caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        console.log('[BharatSeva PWA] Service Worker registered with scope:', reg.scope);
      })
      .catch((err) => {
        console.warn('[BharatSeva PWA] Service Worker registration note:', err);
      });
  });
}

// Mount React Root
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
