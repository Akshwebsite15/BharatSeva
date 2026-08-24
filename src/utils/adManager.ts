/**
 * BharatSeva High-CPM Dynamic Ad Refresh Manager
 * Handles dynamic ad slot registration, viewability-aware refreshes,
 * Google AdSense push cycle management, GPT pubads refresh, and high-CPM creative rotation
 * across seamless single-page navigation and tab switches without full page reloads.
 */

export type AdZoneCategory =
  | 'finance-insurance'
  | 'tech-saas'
  | 'real-estate'
  | 'automobiles'
  | 'health'
  | 'travel'
  | 'business-msme'
  | 'education-jobs'
  | 'general';

export interface DynamicAdCreative {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string; // Tailwind class
  ctaText: string;
  ctaLink: string;
  iconType: 'zap' | 'credit-card' | 'shield' | 'trending-up' | 'server' | 'sparkles' | 'award';
  rating?: string;
  cpmTier: 'High' | 'Ultra-High' | 'Premium';
  accentGradient: string;
}

export const HIGH_CPM_CREATIVES: Record<AdZoneCategory, DynamicAdCreative[]> = {
  'finance-insurance': [
    {
      id: 'fin-01',
      title: 'Pre-Approved Instant Personal Loan up to ₹15 Lakhs',
      subtitle: 'Zero foreclosure charges, 10.25% starting interest with 10-minute digital disbursal.',
      badge: 'High-RPM Partner',
      badgeColor: 'bg-emerald-500 text-slate-950',
      ctaText: 'Check Eligibility Instantly',
      ctaLink: 'https://omg10.com/4/11640571',
      iconType: 'trending-up',
      rating: '4.9 ★ (1.2M Disbursals)',
      cpmTier: 'Ultra-High',
      accentGradient: 'from-blue-950 via-indigo-950 to-slate-950 border-blue-600/40',
    },
    {
      id: 'fin-02',
      title: 'Lifetime Free RuPay Credit Card with 5% Fuel & UPI Cashback',
      subtitle: 'No joining fees, instant virtual card issuance & airport lounge access perks.',
      badge: 'Zero Annual Fee',
      badgeColor: 'bg-amber-400 text-slate-950',
      ctaText: 'Apply in 2 Minutes',
      ctaLink: 'https://omg10.com/4/11640571',
      iconType: 'credit-card',
      rating: '4.8 ★ (Top Choice)',
      cpmTier: 'High',
      accentGradient: 'from-slate-950 via-purple-950 to-indigo-950 border-purple-600/40',
    },
    {
      id: 'fin-03',
      title: '9.10% High-Yield Bank Fixed Deposit for Senior & General Citizens',
      subtitle: 'DICGC RBI-insured safety up to ₹5 Lakhs. Compare highest payout banks.',
      badge: 'RBI Insured',
      badgeColor: 'bg-teal-400 text-slate-950',
      ctaText: 'Compare Rates Free',
      ctaLink: 'https://omg10.com/4/11640571',
      iconType: 'shield',
      rating: '5.0 ★ (Safe Growth)',
      cpmTier: 'High',
      accentGradient: 'from-emerald-950 via-teal-950 to-slate-950 border-emerald-600/40',
    },
  ],
  'tech-saas': [
    {
      id: 'tech-01',
      title: 'Pro AI Workspace & Cloud Developer Compute — 85% Off',
      subtitle: 'Deploy full-stack apps with ultra-fast NVMe storage, free SSL & unlimited Indian bandwidth.',
      badge: 'Developer Exclusive',
      badgeColor: 'bg-purple-400 text-slate-950',
      ctaText: 'Claim 85% Discount',
      ctaLink: 'https://omg10.com/4/11640571',
      iconType: 'server',
      rating: '4.9 ★ (Cloud Native)',
      cpmTier: 'Ultra-High',
      accentGradient: 'from-purple-950 via-indigo-950 to-slate-950 border-purple-500/40',
    },
    {
      id: 'tech-02',
      title: 'Military-Grade Fast VPN & Cyber Privacy Shield',
      subtitle: 'Zero-log policy, bypass geo-blocks and secure public Wi-Fi on unlimited devices.',
      badge: 'Top Security',
      badgeColor: 'bg-cyan-400 text-slate-950',
      ctaText: 'Get 3 Months Free',
      ctaLink: 'https://omg10.com/4/11640571',
      iconType: 'zap',
      rating: '4.8 ★ (Fast Pings)',
      cpmTier: 'High',
      accentGradient: 'from-slate-950 via-cyan-950 to-blue-950 border-cyan-500/40',
    },
  ],
  'real-estate': [
    {
      id: 're-01',
      title: 'Lowest Home Loan Rates from 8.35% p.a. + PMAY Subsidy',
      subtitle: 'Calculate your exact EMI, check circle rates, and get pre-approved sanctions online.',
      badge: 'PMAY Eligible',
      badgeColor: 'bg-amber-400 text-slate-950',
      ctaText: 'Calculate EMI & Apply',
      ctaLink: 'https://omg10.com/4/11640571',
      iconType: 'trending-up',
      rating: '4.9 ★ (Govt Approved)',
      cpmTier: 'Ultra-High',
      accentGradient: 'from-amber-950 via-stone-900 to-slate-950 border-amber-600/40',
    },
    {
      id: 're-02',
      title: 'Verified Land & Flat Registration Stamp Duty Calculator',
      subtitle: 'Official circle rate valuation tool & instant legal verification assistance.',
      badge: 'Registry Helper',
      badgeColor: 'bg-emerald-400 text-slate-950',
      ctaText: 'Start Valuation',
      ctaLink: 'https://omg10.com/4/11640571',
      iconType: 'shield',
      rating: '4.8 ★ (Bihar/Pan-India)',
      cpmTier: 'High',
      accentGradient: 'from-slate-950 via-slate-900 to-emerald-950 border-emerald-500/40',
    },
  ],
  automobiles: [
    {
      id: 'auto-01',
      title: 'Instant Comprehensive Car & Bike Insurance starting ₹1.5/day',
      subtitle: 'Zero depreciation, cashless garage network across 7,500+ workshops & instant policy PDF.',
      badge: 'Zero Dep Cover',
      badgeColor: 'bg-amber-400 text-slate-950',
      ctaText: 'Get 80% Discount Quote',
      ctaLink: 'https://omg10.com/4/11640571',
      iconType: 'shield',
      rating: '4.9 ★ (Instant PDF)',
      cpmTier: 'High',
      accentGradient: 'from-rose-950 via-red-950 to-slate-950 border-rose-600/40',
    },
  ],
  health: [
    {
      id: 'hlth-01',
      title: 'Ayushman Bharat PM-JAY ₹5 Lakh Free Healthcare Card Search',
      subtitle: 'Locate empanelled network hospitals, check family eligibility & claim cashless treatments.',
      badge: 'PM-JAY Empanelled',
      badgeColor: 'bg-emerald-400 text-slate-950',
      ctaText: 'Check Empanelled Hospitals',
      ctaLink: 'https://omg10.com/4/11640571',
      iconType: 'award',
      rating: '5.0 ★ (Govt Free Care)',
      cpmTier: 'High',
      accentGradient: 'from-teal-950 via-emerald-950 to-slate-950 border-teal-500/40',
    },
  ],
  travel: [
    {
      id: 'trv-01',
      title: 'IRCTC Confirmed Train Ticket & Tatkal Automation Helper',
      subtitle: 'Live PNR status, seat prediction accuracy 98% & zero cancellation fee guarantees.',
      badge: 'IRCTC Verified',
      badgeColor: 'bg-blue-400 text-slate-950',
      ctaText: 'Check Tatkal Availability',
      ctaLink: 'https://omg10.com/4/11640571',
      iconType: 'zap',
      rating: '4.9 ★ (98% Accuracy)',
      cpmTier: 'High',
      accentGradient: 'from-blue-950 via-sky-950 to-slate-950 border-sky-500/40',
    },
  ],
  'business-msme': [
    {
      id: 'biz-01',
      title: 'PMEGP & Mudra Yojana 35% Govt Subsidy Loan Assistance',
      subtitle: 'No collateral up to ₹20 Lakhs for manufacturing & service startups. Download DPR projects.',
      badge: 'Govt 35% Subsidy',
      badgeColor: 'bg-amber-400 text-slate-950',
      ctaText: 'Apply for PMEGP Loan',
      ctaLink: 'https://omg10.com/4/11640571',
      iconType: 'sparkles',
      rating: '4.9 ★ (MSME Priority)',
      cpmTier: 'Ultra-High',
      accentGradient: 'from-amber-950 via-orange-950 to-slate-950 border-orange-500/40',
    },
  ],
  'education-jobs': [
    {
      id: 'edu-01',
      title: 'Direct Fast-Track Official Candidate Verification & Career Grant',
      subtitle: 'High-speed candidate alert server, priority notification PDF access & exam mock test hub.',
      badge: 'Fast-Track Server',
      badgeColor: 'bg-emerald-400 text-slate-950',
      ctaText: 'Open Candidate Server',
      ctaLink: 'https://omg10.com/4/11640571',
      iconType: 'zap',
      rating: '4.9 ★ (High Speed)',
      cpmTier: 'High',
      accentGradient: 'from-indigo-950 via-blue-950 to-slate-950 border-indigo-500/40',
    },
  ],
  general: [
    {
      id: 'gen-01',
      title: 'BharatSeva High-Speed Digital Service Server',
      subtitle: 'Instant one-click portal access for government schemes, career alerts, and citizen assistance.',
      badge: 'High-Speed Server',
      badgeColor: 'bg-amber-400 text-slate-950',
      ctaText: 'Access Fast Server',
      ctaLink: 'https://omg10.com/4/11640571',
      iconType: 'zap',
      rating: '4.9 ★ (Verified)',
      cpmTier: 'High',
      accentGradient: 'from-slate-950 via-indigo-950 to-slate-900 border-blue-500/40',
    },
  ],
};

interface AdSlotRegistration {
  slotId: string;
  category: AdZoneCategory;
  lastRefreshed: number;
  refreshCount: number;
  adSenseSlot?: string;
  isVisible: boolean;
  callback?: (newCreative: DynamicAdCreative, refreshNonce: number) => void;
}

class AdRefreshManager {
  private slots: Map<string, AdSlotRegistration> = new Map();
  private globalRefreshNonce: number = 1;
  private minRefreshIntervalMs: number = 15000; // 15s throttle per slot to respect policies
  private totalImpressions: number = 0;
  private listeners: Set<(stats: AdRefreshStats) => void> = new Set();
  private backgroundPaused: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this.backgroundPaused = true;
        } else {
          this.backgroundPaused = false;
          // Refresh visible slots when user returns to tab
          this.refreshVisibleSlots('tab_focus');
        }
      });
    }
  }

  /**
   * Register an ad slot with the manager
   */
  public registerSlot(
    slotId: string,
    category: AdZoneCategory,
    adSenseSlot?: string,
    callback?: (newCreative: DynamicAdCreative, refreshNonce: number) => void
  ): () => void {
    const existing = this.slots.get(slotId);
    const registration: AdSlotRegistration = {
      slotId,
      category,
      lastRefreshed: existing ? existing.lastRefreshed : Date.now(),
      refreshCount: existing ? existing.refreshCount : 0,
      adSenseSlot,
      isVisible: true,
      callback,
    };

    this.slots.set(slotId, registration);
    this.notifyStats();

    // Return unregister function
    return () => {
      this.slots.delete(slotId);
      this.notifyStats();
    };
  }

  /**
   * Update visibility state of a slot (via IntersectionObserver)
   */
  public setSlotVisibility(slotId: string, isVisible: boolean): void {
    const slot = this.slots.get(slotId);
    if (slot) {
      slot.isVisible = isVisible;
    }
  }

  /**
   * Select next creative for a category with rotational variation
   */
  public getCreativeForCategory(category: AdZoneCategory, seedOffset: number = 0): DynamicAdCreative {
    const pool = HIGH_CPM_CREATIVES[category] || HIGH_CPM_CREATIVES['general'];
    const index = Math.abs((this.globalRefreshNonce + seedOffset) % pool.length);
    return pool[index];
  }

  /**
   * Dynamically refresh a single specific ad slot
   */
  public refreshSlot(slotId: string, force: boolean = false): boolean {
    const slot = this.slots.get(slotId);
    if (!slot) return false;

    const now = Date.now();
    if (!force && now - slot.lastRefreshed < this.minRefreshIntervalMs) {
      // Throttle too frequent calls on the same slot
      return false;
    }

    slot.lastRefreshed = now;
    slot.refreshCount += 1;
    this.totalImpressions += 1;
    this.globalRefreshNonce += 1;

    // 1. Refresh native creative via callback
    if (slot.callback) {
      const newCreative = this.getCreativeForCategory(slot.category, slot.refreshCount);
      slot.callback(newCreative, this.globalRefreshNonce);
    }

    // 2. Trigger Google AdSense push if AdSense is present in window
    if (typeof window !== 'undefined') {
      try {
        const win = window as any;
        if (win.adsbygoogle && Array.isArray(win.adsbygoogle)) {
          win.adsbygoogle.push({});
        }
      } catch (e) {
        // Silently ignore already filled AdSense slot warnings
      }

      // 3. Trigger Google Publisher Tag refresh if available
      try {
        const win = window as any;
        if (win.googletag && win.googletag.pubads) {
          win.googletag.cmd = win.googletag.cmd || [];
          win.googletag.cmd.push(() => {
            win.googletag.pubads().refresh();
          });
        }
      } catch {}
    }

    this.notifyStats();
    return true;
  }

  /**
   * Refresh all registered slots in a category or all visible slots on navigation/tab switch
   */
  public refreshOnNavigation(category?: AdZoneCategory | string): number {
    if (this.backgroundPaused) return 0;

    let refreshedCount = 0;
    const now = Date.now();

    this.slots.forEach((slot, slotId) => {
      // If category specified, match or refresh if slot is visible
      const matchesCategory = !category || slot.category === category;
      if (matchesCategory || slot.isVisible) {
        if (now - slot.lastRefreshed >= this.minRefreshIntervalMs) {
          if (this.refreshSlot(slotId, false)) {
            refreshedCount++;
          }
        }
      }
    });

    return refreshedCount;
  }

  /**
   * Refresh all slots that are currently visible on screen
   */
  public refreshVisibleSlots(reason: string = 'manual'): number {
    if (this.backgroundPaused) return 0;
    let count = 0;
    this.slots.forEach((slot, slotId) => {
      if (slot.isVisible) {
        if (this.refreshSlot(slotId, false)) {
          count++;
        }
      }
    });
    return count;
  }

  public getStats(): AdRefreshStats {
    return {
      activeSlotsCount: this.slots.size,
      totalImpressions: this.totalImpressions,
      globalNonce: this.globalRefreshNonce,
      slots: Array.from(this.slots.values()).map(s => ({
        slotId: s.slotId,
        category: s.category,
        refreshCount: s.refreshCount,
        lastRefreshed: s.lastRefreshed,
        isVisible: s.isVisible,
      })),
    };
  }

  public subscribe(listener: (stats: AdRefreshStats) => void): () => void {
    this.listeners.add(listener);
    listener(this.getStats());
    return () => this.listeners.delete(listener);
  }

  private notifyStats() {
    const stats = this.getStats();
    this.listeners.forEach(fn => {
      try {
        fn(stats);
      } catch {}
    });
  }
}

export interface AdRefreshStats {
  activeSlotsCount: number;
  totalImpressions: number;
  globalNonce: number;
  slots: {
    slotId: string;
    category: AdZoneCategory;
    refreshCount: number;
    lastRefreshed: number;
    isVisible: boolean;
  }[];
}

// Global Singleton Instance
export const adManager = new AdRefreshManager();
