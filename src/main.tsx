import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Mount React Root
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register Service Worker for Instant Subsequent Page Loads & Offline PWA support
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        console.log('[BharatSeva PWA] Service worker registered:', reg.scope);
      })
      .catch((err) => {
        console.warn('[BharatSeva PWA] Service worker registration failed:', err);
      });
  });
}
