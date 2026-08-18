import React, { useState } from 'react';
import {
  Crown,
  CheckCircle2,
  Sparkles,
  Shield,
  X,
  Zap,
  BookOpen,
  FileCheck,
  Bot,
  Ban,
  ArrowRight,
} from 'lucide-react';

interface BharatSevaPlusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockSuccess?: () => void;
}

export const BharatSevaPlusModal: React.FC<BharatSevaPlusModalProps> = ({
  isOpen,
  onClose,
  onUnlockSuccess,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSimulateUpgrade = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsUnlocked(true);
      if (onUnlockSuccess) onUnlockSuccess();
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-amber-500/40 text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg">
            <Crown className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">BharatSeva Plus</h2>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                👑 PRO
              </span>
            </div>
            <p className="text-xs text-amber-200">
              Unlock Premium Resources, High-Yield Notes & Exclusive Benefits
            </p>
          </div>
        </div>

        {/* Benefits Checklist */}
        <div className="bg-slate-950/60 rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-3">
          <div className="flex items-center space-x-3 text-xs sm:text-sm">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-slate-200 font-semibold">
              <strong>Premium Notes & Study Material:</strong> Topper handwritten notes & solved PYQs.
            </span>
          </div>
          <div className="flex items-center space-x-3 text-xs sm:text-sm">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-slate-200 font-semibold">
              <strong>Advanced Tools & Calculators:</strong> Unlimited salary, tax & land conversions.
            </span>
          </div>
          <div className="flex items-center space-x-3 text-xs sm:text-sm">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-slate-200 font-semibold">
              <strong>Unlimited AI Credits & Reports:</strong> 24/7 priority Gemini 3.6 Flash assistance.
            </span>
          </div>
          <div className="flex items-center space-x-3 text-xs sm:text-sm">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-slate-200 font-semibold">
              <strong>100% Ad-Free Experience:</strong> Clean, fast distraction-free navigation.
            </span>
          </div>
        </div>

        {/* Plan Selector */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setSelectedPlan('annual')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedPlan === 'annual'
                ? 'bg-amber-500/20 border-amber-400 text-white shadow-sm'
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300">Annual Pass</span>
              <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded">
                BEST VALUE
              </span>
            </div>
            <div className="text-xl font-extrabold text-white mt-1">₹499 <span className="text-xs font-normal text-slate-400">/ year</span></div>
            <span className="text-[10px] text-slate-400">Just ₹41 / month</span>
          </button>

          <button
            onClick={() => setSelectedPlan('monthly')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedPlan === 'monthly'
                ? 'bg-amber-500/20 border-amber-400 text-white shadow-sm'
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <span className="text-xs font-bold text-slate-300">Monthly Pass</span>
            <div className="text-xl font-extrabold text-white mt-1">₹99 <span className="text-xs font-normal text-slate-400">/ month</span></div>
            <span className="text-[10px] text-slate-400">Flexible monthly plan</span>
          </button>
        </div>

        {/* Action Button */}
        {isUnlocked ? (
          <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl text-center text-emerald-300 text-sm font-bold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>BharatSeva Plus Pass Activated Successfully!</span>
          </div>
        ) : (
          <button
            onClick={handleSimulateUpgrade}
            disabled={isProcessing}
            className="w-full py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black rounded-2xl shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base transition-all cursor-pointer"
          >
            {isProcessing ? (
              <span>Activating BharatSeva Plus...</span>
            ) : (
              <>
                <span>Go Premium Now (Instant Simulation)</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
