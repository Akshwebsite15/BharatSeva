import React from 'react';
import {
  Zap,
  CreditCard,
  Shield,
  TrendingUp,
  Server,
  Sparkles,
  Award,
  ExternalLink,
  RotateCw,
  CheckCircle2,
} from 'lucide-react';
import { AdZoneCategory } from '../utils/adManager';
import { useAdSlot } from '../hooks/useAdRefresh';

export interface DynamicHighCpmAdSlotProps {
  slotId: string;
  category?: AdZoneCategory | string;
  format?: 'banner' | 'card' | 'inline-strip' | 'sidebar';
  adSenseSlot?: string;
  className?: string;
  showManualRefresh?: boolean;
}

export const DynamicHighCpmAdSlot: React.FC<DynamicHighCpmAdSlotProps> = ({
  slotId,
  category = 'finance-insurance',
  format = 'banner',
  adSenseSlot,
  className = '',
  showManualRefresh = false,
}) => {
  const { elementRef, creative, refreshNonce, isRefreshing, triggerRefresh } = useAdSlot(
    slotId,
    category as AdZoneCategory,
    adSenseSlot
  );

  const renderIcon = () => {
    const iconClass = 'w-5 h-5';
    switch (creative.iconType) {
      case 'credit-card':
        return <CreditCard className={iconClass} />;
      case 'shield':
        return <Shield className={iconClass} />;
      case 'server':
        return <Server className={iconClass} />;
      case 'sparkles':
        return <Sparkles className={iconClass} />;
      case 'award':
        return <Award className={iconClass} />;
      case 'trending-up':
        return <TrendingUp className={iconClass} />;
      case 'zap':
      default:
        return <Zap className={iconClass} />;
    }
  };

  // Format: Inline Strip
  if (format === 'inline-strip') {
    return (
      <div
        ref={elementRef}
        id={`ad-slot-${slotId}`}
        className={`w-full relative overflow-hidden rounded-xl border bg-gradient-to-r ${creative.accentGradient} p-3 text-white transition-all duration-300 ${
          isRefreshing ? 'opacity-50 scale-[0.99]' : 'opacity-100 scale-100'
        } ${className}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 rounded-lg bg-white/10 shrink-0 text-amber-300">
              {renderIcon()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black text-white truncate">{creative.title}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${creative.badgeColor}`}>
                  {creative.badge}
                </span>
                {creative.rating && (
                  <span className="text-[11px] text-amber-300/90 font-semibold hidden md:inline">
                    {creative.rating}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-300 line-clamp-1">{creative.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
              Sponsored
            </span>
            <a
              href={creative.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-extrabold rounded-lg shadow-sm transition hover:scale-105"
            >
              <span>{creative.ctaText}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Format: Card / Sidebar (Compact 300x250 style)
  if (format === 'card' || format === 'sidebar') {
    return (
      <div
        ref={elementRef}
        id={`ad-slot-${slotId}`}
        className={`relative overflow-hidden rounded-2xl border bg-gradient-to-b ${creative.accentGradient} p-4 text-white shadow-md transition-all duration-300 ${
          isRefreshing ? 'opacity-50 scale-[0.98]' : 'opacity-100 scale-100'
        } ${className}`}
      >
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${creative.badgeColor}`}>
              {creative.badge}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white/10 text-slate-300 text-[9px] font-bold">
              {creative.cpmTier} RPM
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
              Sponsored
            </span>
            {showManualRefresh && (
              <button
                onClick={triggerRefresh}
                title="Refresh offer"
                aria-label="Refresh ad creative"
                className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-slate-300 transition"
              >
                <RotateCw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-white/10 text-amber-300 shrink-0 mt-0.5">
            {renderIcon()}
          </div>
          <div>
            <h4 className="text-sm font-black text-white leading-tight mb-1">{creative.title}</h4>
            <p className="text-xs text-slate-300 leading-snug">{creative.subtitle}</p>
          </div>
        </div>

        {creative.rating && (
          <div className="flex items-center gap-1 text-xs text-amber-300 font-medium mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{creative.rating}</span>
          </div>
        )}

        <a
          href={creative.ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-black rounded-xl shadow-md transition hover:scale-[1.02]"
        >
          <span>{creative.ctaText}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  // Default Format: Full-Width Premium High-CPM Banner
  return (
    <div
      ref={elementRef}
      id={`ad-slot-${slotId}`}
      className={`w-full relative overflow-hidden rounded-2xl border bg-gradient-to-r ${creative.accentGradient} p-4 sm:p-5 text-white shadow-lg transition-all duration-300 ${
        isRefreshing ? 'opacity-60 scale-[0.99]' : 'opacity-100 scale-100'
      } ${className}`}
    >
      {/* Subtle background glow */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md text-amber-300 shrink-0 border border-white/10 shadow-inner">
            {renderIcon()}
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${creative.badgeColor}`}>
                {creative.badge}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white/10 text-slate-300 text-[10px] font-medium border border-white/10">
                Verified Fast-Track Partner
              </span>
              {creative.rating && (
                <span className="text-xs text-amber-300 font-semibold hidden sm:inline">
                  {creative.rating}
                </span>
              )}
            </div>

            <h3 className="text-sm sm:text-base font-black tracking-tight text-white line-clamp-1">
              {creative.title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 max-w-2xl">
              {creative.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
              Sponsored
            </span>
            {showManualRefresh && (
              <button
                onClick={triggerRefresh}
                title="Rotate offer"
                aria-label="Refresh ad slot"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition hover:text-white"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <a
            href={creative.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs sm:text-sm font-black rounded-xl shadow-lg transition hover:scale-105 active:scale-95"
          >
            <span>{creative.ctaText}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
