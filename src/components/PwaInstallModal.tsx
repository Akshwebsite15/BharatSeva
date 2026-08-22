import React, { useState, useEffect } from 'react';
import {
  Download,
  X,
  Smartphone,
  Monitor,
  CheckCircle2,
  Share2,
  PlusSquare,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Apple,
  Chrome,
  Laptop,
} from 'lucide-react';

interface PwaInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PwaInstallModal: React.FC<PwaInstallModalProps> = ({ isOpen, onClose }) => {
  const [hasPrompt, setHasPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [activePlatformTab, setActivePlatformTab] = useState<'android' | 'ios' | 'desktop'>('android');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    // Detect iframe
    try {
      setIsInIframe(window.self !== window.top);
    } catch {
      setIsInIframe(true);
    }

    // Detect platform
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setActivePlatformTab('ios');
    } else if (/android/.test(userAgent)) {
      setActivePlatformTab('android');
    } else {
      setActivePlatformTab('desktop');
    }

    // Check existing prompt
    if (window.deferredPwaPrompt) {
      setHasPrompt(true);
    }

    // Listen for prompt ready event
    const handlePromptReady = () => {
      setHasPrompt(true);
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setHasPrompt(false);
    };

    window.addEventListener('bharatseva:pwa-prompt-available', handlePromptReady);
    window.addEventListener('bharatseva:pwa-installed', handleInstalled);

    if (window.matchMedia('(display-mode: standalone)').matches || window.isPwaInstalled) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('bharatseva:pwa-prompt-available', handlePromptReady);
      window.removeEventListener('bharatseva:pwa-installed', handleInstalled);
    };
  }, []);

  const handleNativeInstall = async () => {
    if (window.deferredPwaPrompt) {
      try {
        const promptEvent = window.deferredPwaPrompt;
        promptEvent.prompt();
        const { outcome } = await promptEvent.userChoice;
        if (outcome === 'accepted') {
          setIsInstalled(true);
          window.deferredPwaPrompt = null;
          setHasPrompt(false);
        }
      } catch (err) {
        console.warn('Install prompt error:', err);
      }
    } else if (isInIframe) {
      // In iframe preview, open in new tab so browser allows PWA installation
      window.open(window.location.href, '_blank');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleOpenInNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-900 to-teal-600 text-white flex items-center justify-center font-black shadow-md shrink-0">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-extrabold text-[10px] uppercase tracking-wider">
              OFFICIAL PWA APP
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">Install BharatSeva App</h2>
          </div>
        </div>

        {/* Iframe Notice if previewing inside container */}
        {isInIframe && (
          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-xs text-amber-950 mb-4 space-y-2">
            <div className="flex items-center gap-1.5 font-extrabold text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Preview Mode Notice:</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-900">
              Web browsers require opening the website directly in a browser tab (outside iframe) to trigger the native 1-click <strong>"Install / Add to Home Screen"</strong> popup.
            </p>
            <button
              onClick={handleOpenInNewTab}
              className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in Full Browser Tab to Install</span>
            </button>
          </div>
        )}

        {/* Primary 1-Click Install Button if Prompt Ready */}
        {hasPrompt && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-2xl text-center space-y-3">
            <p className="text-xs font-bold text-blue-900">
              ⚡ Browser is ready! Click below to add BharatSeva to your device home screen instantly.
            </p>
            <button
              onClick={handleNativeInstall}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-900 to-teal-800 hover:from-blue-800 hover:to-teal-700 text-white font-extrabold text-sm rounded-2xl transition shadow-lg flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
            >
              <Download className="w-5 h-5" />
              <span>{isInstalled ? 'App Already Installed' : '1-Click Install BharatSeva'}</span>
            </button>
          </div>
        )}

        {/* Benefits List */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 mb-5 text-xs text-slate-800">
          <div className="flex items-center space-x-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>1-Tap Instant Launch from Home Screen (No Browser URL bar)</span>
          </div>
          <div className="flex items-center space-x-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Works Offline with Fast Cached Sarkari Database</span>
          </div>
          <div className="flex items-center space-x-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Lightweight &lt; 2 MB (No Play Store download required)</span>
          </div>
        </div>

        {/* Platform Selection Tabs */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-900">Installation Instructions:</span>
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActivePlatformTab('android')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  activePlatformTab === 'android' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Android</span>
              </button>
              <button
                onClick={() => setActivePlatformTab('ios')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  activePlatformTab === 'ios' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                <Apple className="w-3.5 h-3.5" />
                <span>iPhone / iOS</span>
              </button>
              <button
                onClick={() => setActivePlatformTab('desktop')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  activePlatformTab === 'desktop' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>PC / Laptop</span>
              </button>
            </div>
          </div>

          {/* Android Steps */}
          {activePlatformTab === 'android' && (
            <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-950 space-y-2.5">
              <div className="font-extrabold flex items-center gap-1.5 text-emerald-900">
                <Chrome className="w-4 h-4 text-emerald-700" />
                <span>Android Chrome / Samsung Internet:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-emerald-900 font-medium">
                <li>Open BharatSeva website in Google Chrome on your phone.</li>
                <li>Tap the <strong>three vertical dots (⋮)</strong> at the top-right corner.</li>
                <li>Tap <strong>"Install app"</strong> or <strong>"Add to Home Screen"</strong>.</li>
                <li>Tap <strong>Install</strong>. BharatSeva app icon will appear on your phone screen!</li>
              </ol>
            </div>
          )}

          {/* iOS Steps */}
          {activePlatformTab === 'ios' && (
            <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl text-xs text-amber-950 space-y-2.5">
              <div className="font-extrabold flex items-center gap-1.5 text-amber-900">
                <Share2 className="w-4 h-4 text-amber-700" />
                <span>iPhone & iPad (Safari Browser):</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-amber-900 font-medium">
                <li>Open BharatSeva link in <strong>Safari</strong> browser.</li>
                <li>Tap the <strong>Share button</strong> (square icon with upward arrow <Share2 className="w-3 h-3 inline mx-0.5" />) in the bottom bar.</li>
                <li>Scroll down and tap <strong>"Add to Home Screen"</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-0.5 text-amber-700" />.</li>
                <li>Tap <strong>Add</strong> at top-right. The app will install instantly!</li>
              </ol>
            </div>
          )}

          {/* Desktop Steps */}
          {activePlatformTab === 'desktop' && (
            <div className="bg-blue-50/80 border border-blue-200 p-4 rounded-2xl text-xs text-blue-950 space-y-2.5">
              <div className="font-extrabold flex items-center gap-1.5 text-blue-900">
                <Laptop className="w-4 h-4 text-blue-700" />
                <span>Windows PC / Mac (Chrome & Edge):</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-blue-900 font-medium">
                <li>Look at the top URL address bar in Chrome or Microsoft Edge.</li>
                <li>Click the <strong>Install icon (⊕ or computer icon)</strong> on the right side of the address bar.</li>
                <li>Click <strong>Install</strong> to add BharatSeva as a standalone Desktop App.</li>
              </ol>
            </div>
          )}
        </div>

        {/* Copy App Link Helper */}
        <div className="flex items-center gap-2 p-2.5 bg-slate-100 rounded-2xl mb-6">
          <input
            type="text"
            readOnly
            value={window.location.href}
            className="flex-1 bg-transparent text-[11px] text-slate-600 font-mono px-2 outline-none truncate"
          />
          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1 transition cursor-pointer shrink-0 shadow-2xs"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleNativeInstall}
            className="flex-1 py-3 px-5 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white font-extrabold text-xs sm:text-sm rounded-2xl transition shadow-md flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>{hasPrompt ? 'Trigger Direct Install' : isInIframe ? 'Open in Browser & Install' : 'Install BharatSeva App'}</span>
          </button>

          <button
            onClick={onClose}
            className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-2xl transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
