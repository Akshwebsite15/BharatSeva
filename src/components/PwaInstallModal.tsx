import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Monitor, CheckCircle2, Share2, PlusSquare, Sparkles, ShieldCheck } from 'lucide-react';

interface PwaInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PwaInstallModal: React.FC<PwaInstallModalProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIos(/iphone|ipad|ipod/.test(userAgent));

    // Listen for PWA prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        console.log('BharatSeva Service Worker registered:', reg.scope);
      }).catch((err) => {
        console.log('SW registration skipped:', err);
      });
    }

    // Check standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // Show fallback guide if native prompt isn't fired
      alert('To install BharatSeva:\n\n1. Tap your browser menu (⋮ or share icon)\n2. Tap "Add to Home Screen" or "Install App"\n3. BharatSeva will launch as an app on your device!');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-900 to-teal-600 text-white flex items-center justify-center font-black shadow-md">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-extrabold text-[10px] uppercase tracking-wider">
              OFFLINE-READY PWA APP
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">Install BharatSeva App</h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          Install the official BharatSeva Web Application on your Android, iPhone, tablet, or desktop computer for 1-tap instant access, push notifications for exam results, offline reading, and fast loading.
        </p>

        {/* Benefits Grid */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5 mb-6 text-xs text-slate-800">
          <div className="flex items-center space-x-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>1-Tap Instant Access from your Phone’s Home Screen</span>
          </div>
          <div className="flex items-center space-x-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Works Offline & Fast Data Saving Mode</span>
          </div>
          <div className="flex items-center space-x-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Zero Storage Space Needed (&lt; 2 MB footprint)</span>
          </div>
          <div className="flex items-center space-x-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Instant Daily Current Affairs & Job Deadline Alerts</span>
          </div>
        </div>

        {/* OS Specific Instructions */}
        {isIos ? (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-950 space-y-2 mb-6">
            <div className="font-extrabold flex items-center space-x-1">
              <Share2 className="w-4 h-4 text-amber-800" />
              <span>Instructions for iPhone / iPad (Safari):</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 font-medium text-[11px] text-amber-900">
              <li>Tap the <strong>Share button</strong> (square with arrow) in Safari bottom bar</li>
              <li>Scroll down and tap <strong>"Add to Home Screen"</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-0.5" /></li>
              <li>Tap <strong>Add</strong> in the top right corner to complete installation</li>
            </ol>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl text-xs text-blue-950 space-y-2 mb-6">
            <div className="font-extrabold flex items-center space-x-1">
              <Smartphone className="w-4 h-4 text-blue-800" />
              <span>Instructions for Android & Chrome Desktop:</span>
            </div>
            <p className="font-medium text-[11px] text-blue-900 leading-relaxed">
              Click the button below to launch the automatic installation prompt, or open Chrome options (⋮) and choose <strong>"Add to Home Screen"</strong> or <strong>"Install App"</strong>.
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleInstallClick}
            className="flex-1 py-3 px-5 bg-gradient-to-r from-blue-900 to-teal-800 hover:from-blue-800 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl transition shadow-md flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isInstalled ? 'App Already Installed' : 'Install BharatSeva Now'}</span>
          </button>

          <button
            onClick={onClose}
            className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-2xl transition cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
