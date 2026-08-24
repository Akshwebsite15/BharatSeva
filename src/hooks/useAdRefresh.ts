import { useEffect, useState, useRef, useCallback } from 'react';
import { adManager, AdZoneCategory, DynamicAdCreative, AdRefreshStats } from '../utils/adManager';

export interface UseAdRefreshOptions {
  activeTab?: string;
  subTab?: string;
  category?: AdZoneCategory;
  dwellRefreshIntervalSeconds?: number; // Optional background dwell interval e.g. 45s
  enabled?: boolean;
}

/**
 * Hook to manage ad refreshing across top-level tab switches, sub-navigation, and dwell intervals.
 */
export function useAdRefresh(options: UseAdRefreshOptions = {}) {
  const {
    activeTab,
    subTab,
    category,
    dwellRefreshIntervalSeconds,
    enabled = true,
  } = options;

  const [stats, setStats] = useState<AdRefreshStats>(() => adManager.getStats());
  const prevTabRef = useRef<string | undefined>(activeTab);
  const prevSubTabRef = useRef<string | undefined>(subTab);

  // Subscribe to ad stats updates
  useEffect(() => {
    const unsubscribe = adManager.subscribe(newStats => {
      setStats(newStats);
    });
    return unsubscribe;
  }, []);

  // Trigger non-reloading ad refresh on activeTab switch
  useEffect(() => {
    if (!enabled) return;

    const tabChanged = activeTab !== prevTabRef.current;
    const subTabChanged = subTab !== prevSubTabRef.current;

    if (tabChanged || subTabChanged) {
      prevTabRef.current = activeTab;
      prevSubTabRef.current = subTab;

      // Small tick delay to let the DOM settle before measuring viewability & refreshing
      const timer = setTimeout(() => {
        adManager.refreshOnNavigation(category);
      }, 80);

      return () => clearTimeout(timer);
    }
  }, [activeTab, subTab, category, enabled]);

  // Optional dwell timer refresh (e.g. every 45s on high-value tabs)
  useEffect(() => {
    if (!enabled || !dwellRefreshIntervalSeconds || dwellRefreshIntervalSeconds <= 0) return;

    const intervalMs = Math.max(dwellRefreshIntervalSeconds, 20) * 1000;
    const interval = setInterval(() => {
      adManager.refreshVisibleSlots('dwell_timer');
    }, intervalMs);

    return () => clearInterval(interval);
  }, [dwellRefreshIntervalSeconds, enabled]);

  const refreshAll = useCallback(() => {
    return adManager.refreshVisibleSlots('manual_all');
  }, []);

  const refreshSlot = useCallback((slotId: string, force: boolean = true) => {
    return adManager.refreshSlot(slotId, force);
  }, []);

  return {
    stats,
    refreshAll,
    refreshSlot,
  };
}

/**
 * Hook for individual dynamic ad slot components to manage lifecycle,
 * IntersectionObserver visibility, and creative rotation without full page reload.
 */
export function useAdSlot(
  slotId: string,
  category: AdZoneCategory | string = 'general',
  adSenseSlot?: string
) {
  const safeCategory = (category as AdZoneCategory) || 'general';
  const [creative, setCreative] = useState<DynamicAdCreative>(() =>
    adManager.getCreativeForCategory(safeCategory)
  );
  const [refreshNonce, setRefreshNonce] = useState<number>(1);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  // Register slot with manager and bind update callback
  useEffect(() => {
    const unregister = adManager.registerSlot(
      slotId,
      safeCategory,
      adSenseSlot,
      (newCreative, nonce) => {
        setIsRefreshing(true);
        setTimeout(() => {
          setCreative(newCreative);
          setRefreshNonce(nonce);
          setIsRefreshing(false);
        }, 150); // smooth micro-transition
      }
    );

    return () => {
      unregister();
    };
  }, [slotId, category, adSenseSlot]);

  // IntersectionObserver for viewability tracking
  useEffect(() => {
    if (!elementRef.current || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          adManager.setSlotVisibility(slotId, entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: '100px', // Pre-load shortly before entering viewport
        threshold: 0.15,
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [slotId]);

  const triggerRefresh = useCallback(() => {
    return adManager.refreshSlot(slotId, true);
  }, [slotId]);

  return {
    elementRef,
    creative,
    refreshNonce,
    isRefreshing,
    triggerRefresh,
  };
}
