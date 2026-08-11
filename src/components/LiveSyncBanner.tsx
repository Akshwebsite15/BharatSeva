import React from 'react';
import { RefreshCw, Radio, Sparkles, CheckCircle2 } from 'lucide-react';

interface LiveSyncBannerProps {
  onFetchLiveUpdates: () => void;
  isSyncingLive: boolean;
  lastSyncedTime?: string | null;
  compact?: boolean;
}

export const LiveSyncBanner: React.FC<LiveSyncBannerProps> = ({
  onFetchLiveUpdates,
  isSyncingLive,
  lastSyncedTime,
  compact = false,
}) => {
  const todayFormatted = new Date().toLocaleDateString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  if (compact) {
    return (
      <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-xs border border-emerald-500/30 flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5 overflow-hidden">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div className="truncate">
            <span className="text-xs font-bold text-emerald-300">Live Updates Engine ({todayFormatted})</span>
            {lastSyncedTime && (
              <span className="text-[10px] text-slate-400 ml-2">Synced: {lastSyncedTime}</span>
            )}
          </div>
        </div>

        <button
          onClick={onFetchLiveUpdates}
          disabled={isSyncingLive}
          className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 text-xs font-black rounded-xl transition flex items-center space-x-1.5 shrink-0 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncingLive ? 'animate-spin' : ''}`} />
          <span>{isSyncingLive ? 'Syncing...' : 'Fetch Today'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-4 sm:p-5 rounded-3xl shadow-sm border border-emerald-500/30 space-y-3 my-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="relative flex h-4 w-4 shrink-0 mt-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500"></span>
          </div>

          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <h3 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-emerald-400" />
                <span>Today's Real-Time Portal Stream</span>
              </h3>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-500/40 uppercase">
                Dynamic AI & RSS Live Feeds
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Fetching active notifications for <strong className="text-amber-300">{todayFormatted}</strong> from official recruitment boards (BPSC, CSBC, SSC, RRB, UPSC) and Bihar RTPS services.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-auto flex flex-col items-stretch sm:items-end gap-1.5 shrink-0">
          <button
            onClick={onFetchLiveUpdates}
            disabled={isSyncingLive}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black text-xs sm:text-sm rounded-2xl transition-all shadow-md hover:shadow-emerald-500/20 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncingLive ? 'animate-spin' : ''}`} />
            <span>{isSyncingLive ? "Syncing Today's Updates..." : "⚡ Sync Today's Live Updates"}</span>
          </button>

          {lastSyncedTime ? (
            <span className="text-[10px] text-emerald-300 flex items-center justify-center sm:justify-end space-x-1 font-bold">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Last Refreshed: Today at {lastSyncedTime}</span>
            </span>
          ) : (
            <span className="text-[10px] text-slate-400 text-center sm:text-right font-medium">
              Click to fetch today's latest job posts & current affairs
            </span>
          )}
        </div>
      </div>

      <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span><b>How Websites Stay Dynamic:</b> Portals like SarkariResult use human CMS entries + automated web feeds. BharatSeva combines automated RSS parsing and AI live updates to bring you real-time releases every single day!</span>
        </span>
      </div>
    </div>
  );
};
