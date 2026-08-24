import React, { useState, useMemo } from 'react';
import {
  Search,
  Sparkles,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Bell,
  Landmark,
  GraduationCap,
  Building2,
  PenSquare,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Building,
  Calculator,
  Bot,
  Crown,
  HeartPulse,
  ExternalLink,
  Shield,
  FileCheck,
  Check,
  Zap,
  Mail,
  Coins,
  Percent,
  Clock,
  Ticket,
  Trophy,
  Flame,
  Download,
  RotateCw,
  AlertCircle,
  FileSpreadsheet,
  Calendar,
  Layers,
  Car,
  Compass,
  Cpu,
  Home as HomeIcon,
} from 'lucide-react';
import {
  JurisdictionState,
  GovJob,
  CurrentAffairsArticle,
  College,
  University,
  CMSResultItem,
  CMSAdmitCardItem,
} from '../types';
import {
  FeaturedArticle,
  POPULAR_TOOLS_DATA,
  AI_UTILITIES_DATA,
  TRENDING_SCHEMES_DATA,
  EXAM_PREP_CATEGORIES_DATA,
  LATEST_ARTICLES_DATA,
  TrendingSchemeItem,
  ExamPrepCategory,
} from '../data/bharatSevaToolsData';
import { initialCMSResults, initialCMSAdmitCards, initialCMSJobs } from '../data/cmsInitialData';
import { BharatSevaPlusModal } from './BharatSevaPlusModal';
import { ArticleReaderModal } from './ArticleReaderModal';
import { DynamicHighCpmAdSlot } from './DynamicHighCpmAdSlot';

interface HomeTabProps {
  setActiveTab: (tab: string) => void;
  selectedJurisdiction: JurisdictionState;
  onGlobalSearch: (query: string) => void;
  jobs?: GovJob[];
  results?: CMSResultItem[];
  admitCards?: CMSAdmitCardItem[];
  currentAffairsArticles?: CurrentAffairsArticle[];
  onSelectCollege?: (college: College) => void;
  onSelectUniversity?: (university: University) => void;
  onViewJob?: (job: GovJob) => void;
  onFetchLiveUpdates?: () => void;
  isSyncingLive?: boolean;
  lastSyncedTime?: string | null;
  onOpenSpeedQuiz?: () => void;
  onOpenAgeCalculator?: () => void;
  onOpenPhotoTool?: () => void;
  onOpenStudyPlanner?: () => void;
  onOpenPublicToolModal?: (toolId?: string) => void;
  coins?: number;
  streakDays?: number;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  setActiveTab,
  selectedJurisdiction,
  onGlobalSearch,
  jobs = [],
  results = [],
  admitCards = [],
  currentAffairsArticles = [],
  onSelectCollege,
  onSelectUniversity,
  onViewJob,
  onFetchLiveUpdates,
  isSyncingLive,
  lastSyncedTime,
  onOpenSpeedQuiz,
  onOpenAgeCalculator,
  onOpenPhotoTool,
  onOpenStudyPlanner,
  onOpenPublicToolModal,
  coins = 120,
  streakDays = 3,
}) => {
  const [heroSearchInput, setHeroSearchInput] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [isPlusModalOpen, setIsPlusModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<FeaturedArticle | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [articleCategory, setArticleCategory] = useState<string>('All');

  // Sarkari Top Hub Tab Selection: 'all' | 'jobs' | 'results' | 'admit-cards'
  const [sarkariActiveFilter, setSarkariActiveFilter] = useState<'all' | 'jobs' | 'results' | 'admit-cards'>('all');
  const [sarkariSearchTerm, setSarkariSearchTerm] = useState('');

  // Fallback to initialCMS data if props empty
  const activeJobs = useMemo(() => {
    return jobs.length > 0 ? jobs : (initialCMSJobs as any);
  }, [jobs]);

  const activeResults = useMemo(() => {
    return results.length > 0 ? results : initialCMSResults;
  }, [results]);

  const activeAdmitCards = useMemo(() => {
    return admitCards.length > 0 ? admitCards : initialCMSAdmitCards;
  }, [admitCards]);

  // College Finder Quick Form State
  const [selectedState, setSelectedState] = useState('Bihar');
  const [selectedCity, setSelectedCity] = useState('Patna');
  const [selectedCourse, setSelectedCourse] = useState('B.Tech');
  const [selectedStream, setSelectedStream] = useState('Engineering');
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [showAllAdmitCards, setShowAllAdmitCards] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchInput.trim()) {
      onGlobalSearch(heroSearchInput.trim());
    }
  };

  const handleQuickTagClick = (tag: string) => {
    setHeroSearchInput(tag);
    onGlobalSearch(tag);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  const handleCollegeFinderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('colleges');
  };

  // Filtered Sarkari updates based on search & view toggles
  const filteredJobs = useMemo(() => {
    let list = activeJobs;
    if (sarkariSearchTerm.trim()) {
      const q = sarkariSearchTerm.toLowerCase();
      list = activeJobs.filter(
        (j: any) =>
          j.title?.toLowerCase().includes(q) ||
          j.organization?.toLowerCase().includes(q) ||
          j.qualification?.toLowerCase().includes(q)
      );
    }
    if (showAllJobs || sarkariActiveFilter === 'jobs' || sarkariSearchTerm.trim()) {
      return list;
    }
    return list.slice(0, 6);
  }, [activeJobs, sarkariSearchTerm, showAllJobs, sarkariActiveFilter]);

  const filteredAdmitCards = useMemo(() => {
    let list = activeAdmitCards;
    if (sarkariSearchTerm.trim()) {
      const q = sarkariSearchTerm.toLowerCase();
      list = activeAdmitCards.filter(
        (ac: any) =>
          ac.admitCardName?.toLowerCase().includes(q) ||
          ac.examName?.toLowerCase().includes(q) ||
          ac.organization?.toLowerCase().includes(q) ||
          ac.category?.toLowerCase().includes(q)
      );
    }
    if (showAllAdmitCards || sarkariActiveFilter === 'admit-cards' || sarkariSearchTerm.trim()) {
      return list;
    }
    return list.slice(0, 6);
  }, [activeAdmitCards, sarkariSearchTerm, showAllAdmitCards, sarkariActiveFilter]);

  const filteredResults = useMemo(() => {
    let list = activeResults;
    if (sarkariSearchTerm.trim()) {
      const q = sarkariSearchTerm.toLowerCase();
      list = activeResults.filter(
        (r: any) =>
          r.title?.toLowerCase().includes(q) ||
          r.examName?.toLowerCase().includes(q) ||
          r.conductingBody?.toLowerCase().includes(q) ||
          r.category?.toLowerCase().includes(q)
      );
    }
    if (showAllResults || sarkariActiveFilter === 'results' || sarkariSearchTerm.trim()) {
      return list;
    }
    return list.slice(0, 6);
  }, [activeResults, sarkariSearchTerm, showAllResults, sarkariActiveFilter]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16 space-y-8 sm:space-y-12">
      {/* 👑 BharatSeva Plus Modal */}
      <BharatSevaPlusModal
        isOpen={isPlusModalOpen}
        onClose={() => setIsPlusModalOpen(false)}
        onUnlockSuccess={() => {
          // Simulation unlock callback
        }}
      />

      {/* ──────────────────────────────────────────────────────────────────────────
          1. HERO SECTION
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 border-b border-slate-200/80 pt-6 pb-10 sm:pt-12 sm:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-900 rounded-full text-xs font-bold shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>BharatSeva: Sahi Jankari, Sahi Faisla</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                  India’s One-Stop Platform <br className="hidden sm:inline" />
                  for <span className="text-blue-900">Opportunities</span> & <span className="text-amber-600">Growth</span>
                </h1>
                <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-xl font-medium">
                  Latest Government Jobs, Results, Admit Cards, Scholarships, Exam Prep, Career Tools & Digital Utilities.
                </p>
              </div>

              {/* Main Large Hero Search Input */}
              <form onSubmit={handleHeroSearchSubmit} className="relative max-w-xl">
                <div className="relative flex items-center shadow-lg rounded-2xl bg-white border border-slate-200 p-1.5 focus-within:ring-2 focus-within:ring-blue-900/20 focus-within:border-blue-900 transition-all">
                  <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    value={heroSearchInput}
                    onChange={(e) => setHeroSearchInput(e.target.value)}
                    placeholder="Search jobs, results, admit cards, schemes, tools..."
                    className="w-full px-3 py-2.5 text-xs sm:text-base text-slate-900 bg-transparent focus:outline-none placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    className="px-5 sm:px-7 py-2.5 sm:py-3 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center space-x-1.5 shrink-0 transition-all cursor-pointer shadow-xs"
                  >
                    <Search className="w-4 h-4 sm:hidden" />
                    <span>Search</span>
                  </button>
                </div>
              </form>

              {/* Popular Search Pills */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 text-xs text-slate-500">
                <span className="font-semibold text-slate-600">Trending:</span>
                {['BPSC 71st', 'Bihar Police', 'SSC CGL', 'Admit Card 2026', 'PM Kisan', 'Mudra Loan'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleQuickTagClick(tag)}
                    className="px-2.5 sm:px-3 py-1 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-200 hover:border-blue-300 rounded-full font-medium text-xs transition cursor-pointer shadow-2xs"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Hero Column: Key Stat Badges & Quick Live Sync Indicator */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              <div className="w-full rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 border border-slate-800 p-5 sm:p-6 text-white shadow-xl space-y-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                      Live Notification Desk
                    </span>
                  </div>
                  {onFetchLiveUpdates && (
                    <button
                      onClick={onFetchLiveUpdates}
                      disabled={isSyncingLive}
                      className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <RotateCw className={`w-3.5 h-3.5 ${isSyncingLive ? 'animate-spin' : ''}`} />
                      <span>{isSyncingLive ? 'Syncing...' : 'Sync Live'}</span>
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    Verified Sarkari Jobs, Results & Hall Tickets
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Direct real-time feeds from BPSC, CSBC, SSC, UPSC, NTA, BSEB & Central Ministries.
                  </p>
                </div>

                {lastSyncedTime && (
                  <div className="text-[11px] text-blue-200/80 font-medium">
                    ⚡ Last Synced: Today at {lastSyncedTime}
                  </div>
                )}
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full">
                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-black text-slate-900 leading-tight">50K+</div>
                    <div className="text-[10px] font-semibold text-slate-500">Govt Jobs</div>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                    <Ticket className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-black text-slate-900 leading-tight">Live</div>
                    <div className="text-[10px] font-semibold text-slate-500">Admit Cards</div>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-black text-slate-900 leading-tight">100%</div>
                    <div className="text-[10px] font-semibold text-slate-500">Results</div>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center shrink-0">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-black text-slate-900 leading-tight">500+</div>
                    <div className="text-[10px] font-semibold text-slate-500">Tools</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          ⭐ 9 CORE HIGH-VALUE CATEGORY HUBS (Direct Navigation & Yield Overview)
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-blue-900 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>India’s Primary Intelligence Verticals</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                9 High-Impact Knowledge & Public Utility Hubs
              </h2>
            </div>
            <div className="text-xs text-slate-500 font-semibold bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              Verified 2026 Portals & Calculators
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {[
              {
                id: 'finance-insurance',
                title: '🥇 Finance & Insurance',
                subtitle: 'Personal & Home Loans, Credit Cards, Tax & FD Rates',
                icon: TrendingUp,
                cpmTag: 'Highest Yield',
                bgColor: 'from-blue-50 to-indigo-50/50',
                borderColor: 'border-blue-200',
                iconColor: 'text-blue-900 bg-blue-100',
                buttonLabel: 'Explore Finance & Loans',
              },
              {
                id: 'jobs',
                title: '🥈 Jobs & Careers',
                subtitle: 'Sarkari Recruitments, BPSC/CSBC/SSC, Salary & Syllabus',
                icon: Briefcase,
                cpmTag: 'High Traffic',
                bgColor: 'from-amber-50 to-orange-50/50',
                borderColor: 'border-amber-200',
                iconColor: 'text-amber-900 bg-amber-100',
                buttonLabel: 'Explore Govt Jobs',
              },
              {
                id: 'colleges',
                title: '🥉 Education & Admissions',
                subtitle: 'NIRF Colleges, Cutoffs, JEE/NEET & Free Courses',
                icon: GraduationCap,
                cpmTag: 'High Demand',
                bgColor: 'from-emerald-50 to-teal-50/50',
                borderColor: 'border-emerald-200',
                iconColor: 'text-emerald-900 bg-emerald-100',
                buttonLabel: 'Explore Colleges & Courses',
              },
              {
                id: 'real-estate',
                title: '4. Real Estate & Land',
                subtitle: 'BhuNaksha, Dakhil Kharij, RERA Prices & Home Loan Calculator',
                icon: HomeIcon,
                cpmTag: 'High Value',
                bgColor: 'from-purple-50 to-indigo-50/50',
                borderColor: 'border-purple-200',
                iconColor: 'text-purple-900 bg-purple-100',
                buttonLabel: 'Explore Land & Property',
              },
              {
                id: 'tech-saas',
                title: '5. Technology & SaaS',
                subtitle: 'AI Tools, Cloud Hosting, VPNs & Dev Benchmarks',
                icon: Cpu,
                cpmTag: 'Tech Vertical',
                bgColor: 'from-cyan-50 to-blue-50/50',
                borderColor: 'border-cyan-200',
                iconColor: 'text-cyan-900 bg-cyan-100',
                buttonLabel: 'Explore Tech & AI Tools',
              },
              {
                id: 'business-hub',
                title: '6. Business & MSME Hub',
                subtitle: 'Udyam Registration, PMEGP ₹50L Subsidy, GST Rates',
                icon: Building,
                cpmTag: 'Enterprise',
                bgColor: 'from-amber-50 to-yellow-50/50',
                borderColor: 'border-amber-200',
                iconColor: 'text-amber-900 bg-amber-100',
                buttonLabel: 'Explore Business & GST',
              },
              {
                id: 'automobiles',
                title: '7. Automobiles & Mobility',
                subtitle: 'Cars, Bikes, EV Savings Calculator, Parivahan & IDV Insurance',
                icon: Car,
                cpmTag: 'Automotive',
                bgColor: 'from-rose-50 to-red-50/50',
                borderColor: 'border-rose-200',
                iconColor: 'text-rose-900 bg-rose-100',
                buttonLabel: 'Explore Cars & EVs',
              },
              {
                id: 'health',
                title: '8. Health & Ayushman',
                subtitle: 'Ayushman ₹5L Card, Jan Aushadhi 90% Off Drugs, Hospitals',
                icon: HeartPulse,
                cpmTag: 'Healthcare',
                bgColor: 'from-teal-50 to-emerald-50/50',
                borderColor: 'border-teal-200',
                iconColor: 'text-teal-900 bg-teal-100',
                buttonLabel: 'Explore Health & ABHA',
              },
              {
                id: 'travel',
                title: '9. Travel & Pilgrimage',
                subtitle: 'IRCTC Tatkal Booking Hacks, Flights, DigiYatra, Passport',
                icon: Compass,
                cpmTag: 'Tourism',
                bgColor: 'from-sky-50 to-blue-50/50',
                borderColor: 'border-sky-200',
                iconColor: 'text-sky-900 bg-sky-100',
                buttonLabel: 'Explore Travel & Tatkal',
              },
            ].map((hub) => {
              const HubIcon = hub.icon;
              return (
                <div
                  key={hub.id}
                  onClick={() => {
                    setActiveTab(hub.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`bg-gradient-to-br ${hub.bgColor} p-5 rounded-2xl border ${hub.borderColor} shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3 group`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={`w-9 h-9 rounded-xl ${hub.iconColor} flex items-center justify-center font-bold shrink-0`}>
                        <HubIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 border border-slate-200/80 text-slate-700">
                        {hub.cpmTag}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-900 transition-colors">
                        {hub.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                        {hub.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center text-xs font-bold text-blue-900 group-hover:translate-x-1 transition-transform">
                    <span>{hub.buttonLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic High-CPM Sponsored Banner (Refreshes on Navigation & Visibility Change) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DynamicHighCpmAdSlot
          slotId="home-mid-banner"
          category="education-jobs"
          format="banner"
          showManualRefresh={true}
          className="shadow-md"
        />
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          2. TOP PROMINENT SARKARI LIVE UPDATES HUB (Latest Govt Jobs, Results, Admit Cards)
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Section Header with Quick Tabs & Search */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 text-white flex items-center justify-center font-black shadow-xs">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Top Sarkari Updates & Live Feeds</span>
                  <span className="bg-rose-100 text-rose-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    LIVE
                  </span>
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Direct verified alerts for new recruitments, scorecards, merit lists, and hall tickets.
                </p>
              </div>
            </div>

            {/* Quick Filter Tabs for Sarkari Hub */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
              {[
                { id: 'all', label: 'All 3 Columns' },
                { id: 'jobs', label: 'Latest Jobs 💼' },
                { id: 'admit-cards', label: 'Admit Cards 🎫' },
                { id: 'results', label: 'Results 🏆' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSarkariActiveFilter(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    sarkariActiveFilter === tab.id
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Filter Search inside Sarkari Updates */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={sarkariSearchTerm}
                onChange={(e) => setSarkariSearchTerm(e.target.value)}
                placeholder="Filter by exam / board (e.g. BPSC, CSBC, SSC, Police)..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900"
              />
            </div>
            <div className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Updated daily with official notifications
            </div>
          </div>
        </div>



        {/* 3-Column Sarkari Updates Grid (The Sarkari Classic Triad) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {/* 💼 COLUMN 1: LATEST GOVT JOBS */}
          {(sarkariActiveFilter === 'all' || sarkariActiveFilter === 'jobs') && (
            <div className="bg-white rounded-3xl border border-blue-200/80 shadow-xs p-4 sm:p-5 flex flex-col justify-between space-y-4 hover:border-blue-400 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-blue-50 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-blue-950">Latest Govt Jobs</h3>
                      <span className="text-[10px] text-slate-400 font-semibold block">सरकारी नौकरी भर्तियां</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className="text-xs font-bold text-blue-900 hover:text-blue-950 hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Job Cards List */}
                <div className="space-y-2.5">
                  {filteredJobs.map((job: any) => (
                    <div
                      key={job.id}
                      onClick={() => {
                        if (onViewJob) onViewJob(job);
                        else setActiveTab('jobs');
                      }}
                      className="p-3 bg-slate-50/80 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-300 rounded-2xl transition cursor-pointer space-y-1.5 group"
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 truncate max-w-[170px]">
                          {job.organization || 'Govt Board'}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 shrink-0">
                          {job.vacancy ? job.vacancy.split('(')[0].trim() : 'Active'}
                        </span>
                      </div>

                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-900 leading-snug line-clamp-2">
                        {job.title}
                      </h4>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                        <span className="truncate max-w-[140px] text-slate-600 font-medium">
                          🎓 {job.qualification || 'Graduate / 12th'}
                        </span>
                        <span className="text-blue-900 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          <span>Apply</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {activeJobs.length > 6 && !sarkariSearchTerm && (
                  <button
                    onClick={() => setShowAllJobs(!showAllJobs)}
                    className="w-full py-1.5 text-xs font-bold text-blue-900 hover:text-blue-950 bg-blue-50 hover:bg-blue-100 rounded-xl transition cursor-pointer"
                  >
                    {showAllJobs ? 'Show Top 6 Only' : `Show All ${activeJobs.length} Live Jobs`}
                  </button>
                )}
              </div>

              <button
                onClick={() => setActiveTab('jobs')}
                className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
              >
                <span>Browse All Govt Jobs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* 🎫 COLUMN 2: ADMIT CARDS & HALL TICKETS */}
          {(sarkariActiveFilter === 'all' || sarkariActiveFilter === 'admit-cards') && (
            <div className="bg-white rounded-3xl border border-amber-200/80 shadow-xs p-4 sm:p-5 flex flex-col justify-between space-y-4 hover:border-amber-400 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-amber-50 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                      <Ticket className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-amber-950">Admit Cards</h3>
                      <span className="text-[10px] text-slate-400 font-semibold block">एडमिट कार्ड व हॉल टिकट</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('admit-cards')}
                    className="text-xs font-bold text-amber-900 hover:text-amber-950 hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Admit Card List */}
                <div className="space-y-2.5">
                  {filteredAdmitCards.map((ac: any) => (
                    <div
                      key={ac.id}
                      onClick={() => {
                        if (ac.downloadUrl) {
                          window.open(ac.downloadUrl, '_blank', 'noopener,noreferrer');
                        } else {
                          setActiveTab('admit-cards');
                        }
                      }}
                      className="p-3 bg-slate-50/80 hover:bg-amber-50/70 border border-slate-200/80 hover:border-amber-300 rounded-2xl transition cursor-pointer space-y-1.5 group"
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 truncate max-w-[170px]">
                          {ac.category || ac.organization || 'Exam Board'}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 shrink-0">
                          {ac.status || 'Live Out'}
                        </span>
                      </div>

                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-900 leading-snug line-clamp-2">
                        {ac.admitCardName || ac.examName}
                      </h4>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                        <span className="truncate max-w-[140px] text-slate-600 font-medium">
                          📅 {ac.examDate ? ac.examDate.split('(')[0].trim() : 'Exam Soon'}
                        </span>
                        <span className="text-amber-900 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          <span>Download</span>
                          <Download className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {activeAdmitCards.length > 6 && !sarkariSearchTerm && (
                  <button
                    onClick={() => setShowAllAdmitCards(!showAllAdmitCards)}
                    className="w-full py-1.5 text-xs font-bold text-amber-900 hover:text-amber-950 bg-amber-50 hover:bg-amber-100 rounded-xl transition cursor-pointer"
                  >
                    {showAllAdmitCards ? 'Show Top 6 Only' : `Show All ${activeAdmitCards.length} Admit Cards`}
                  </button>
                )}
              </div>

              <button
                onClick={() => setActiveTab('admit-cards')}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
              >
                <span>Browse All Admit Cards</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* 🏆 COLUMN 3: RESULTS & MERIT LISTS */}
          {(sarkariActiveFilter === 'all' || sarkariActiveFilter === 'results') && (
            <div className="bg-white rounded-3xl border border-emerald-200/80 shadow-xs p-4 sm:p-5 flex flex-col justify-between space-y-4 hover:border-emerald-400 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-50 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-emerald-950">Results & Merit</h3>
                      <span className="text-[10px] text-slate-400 font-semibold block">सरकारी रिजल्ट व कटऑफ</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('exams')}
                    className="text-xs font-bold text-emerald-900 hover:text-emerald-950 hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Results List */}
                <div className="space-y-2.5">
                  {filteredResults.map((res: any) => (
                    <div
                      key={res.id}
                      onClick={() => {
                        if (res.officialPortalUrl) {
                          window.open(res.officialPortalUrl, '_blank', 'noopener,noreferrer');
                        } else {
                          setActiveTab('exams');
                        }
                      }}
                      className="p-3 bg-slate-50/80 hover:bg-emerald-50/70 border border-slate-200/80 hover:border-emerald-300 rounded-2xl transition cursor-pointer space-y-1.5 group"
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 truncate max-w-[170px]">
                          {res.category || res.conductingBody || 'Commission'}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-900 shrink-0">
                          Declared
                        </span>
                      </div>

                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-900 leading-snug line-clamp-2">
                        {res.title || res.examName}
                      </h4>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                        <span className="truncate max-w-[140px] text-slate-600 font-medium">
                          📜 {res.releaseDate || 'August 2026'}
                        </span>
                        <span className="text-emerald-900 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          <span>Check Cutoff</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {activeResults.length > 6 && !sarkariSearchTerm && (
                  <button
                    onClick={() => setShowAllResults(!showAllResults)}
                    className="w-full py-1.5 text-xs font-bold text-emerald-900 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition cursor-pointer"
                  >
                    {showAllResults ? 'Show Top 6 Only' : `Show All ${activeResults.length} Declared Results`}
                  </button>
                )}
              </div>

              <button
                onClick={() => setActiveTab('exams')}
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
              >
                <span>Browse All Exam Results</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          3. 10 CATEGORY CARDS (Grid matching the visual reference)
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {[
            {
              id: 'schemes',
              name: 'Government Schemes',
              sub: 'Central & State Schemes',
              icon: Landmark,
              color: 'text-blue-900',
              bg: 'bg-blue-50',
            },
            {
              id: 'scholarships',
              name: 'Scholarships',
              sub: 'Find scholarships for you',
              icon: GraduationCap,
              color: 'text-indigo-900',
              bg: 'bg-indigo-50',
            },
            {
              id: 'colleges',
              name: 'Colleges',
              sub: 'Search & Compare Colleges',
              icon: Building2,
              color: 'text-slate-800',
              bg: 'bg-slate-100',
            },
            {
              id: 'exams',
              name: 'Exams',
              sub: 'Preparation, PYQ, Mock Tests',
              icon: PenSquare,
              color: 'text-blue-900',
              bg: 'bg-blue-50',
            },
            {
              id: 'jobs',
              name: 'Career Tools',
              sub: 'Resume, Salary, Skill Test & more',
              icon: Briefcase,
              color: 'text-amber-800',
              bg: 'bg-amber-50',
            },
            {
              id: 'finance',
              name: 'Finance',
              sub: 'Calculators, Loans, Investments',
              icon: TrendingUp,
              color: 'text-emerald-800',
              bg: 'bg-emerald-50',
            },
            {
              id: 'insurance',
              name: 'Insurance',
              sub: 'Compare & Buy Insurance',
              icon: ShieldCheck,
              color: 'text-blue-900',
              bg: 'bg-blue-50',
            },
            {
              id: 'business',
              name: 'Business',
              sub: 'Start, Grow & Manage Your Business',
              icon: Building,
              color: 'text-teal-900',
              bg: 'bg-teal-50',
            },
            {
              id: 'tools',
              name: 'Tools',
              sub: 'Free Online Calculators',
              icon: Calculator,
              color: 'text-indigo-900',
              bg: 'bg-indigo-50',
            },
            {
              id: 'ai-utilities',
              name: 'AI Utilities',
              sub: 'AI Assistant & Smart Tools',
              icon: Bot,
              color: 'text-teal-900',
              bg: 'bg-teal-50',
              isSpecial: true,
            },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveTab(cat.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-900/40 p-4 sm:p-5 rounded-2xl sm:rounded-3xl text-center flex flex-col items-center justify-center space-y-2.5 transition-all shadow-xs hover:shadow-md cursor-pointer group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-blue-900 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                    {cat.sub}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          4. TRENDING SCHEMES & BHARATSEVA PLUS (2-Column Layout)
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Trending Schemes */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-amber-500 rounded-full"></span>
                Trending Schemes
              </h2>
              <button
                onClick={() => setActiveTab('schemes')}
                className="text-xs sm:text-sm font-bold text-blue-900 hover:text-blue-950 flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TRENDING_SCHEMES_DATA.slice(0, 4).map((scheme) => (
                <div
                  key={scheme.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-300 transition-all"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
                        {scheme.iconType}
                      </div>
                      <span
                        className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full border ${scheme.benefitBadgeColor}`}
                      >
                        {scheme.benefitBadge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                        {scheme.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                        {scheme.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">
                      Mode: {scheme.applicationMode}
                    </span>
                    <a
                      href={scheme.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-blue-900 hover:text-blue-950 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: BharatSeva Plus Promo Banner */}
          <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-800 flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center space-x-2">
                <Crown className="w-6 h-6 text-amber-400" />
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                  BharatSeva <span className="text-amber-400">Plus</span>
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-blue-200 font-medium">
                Unlock Premium Resources & Exclusive Benefits
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  'Premium Notes & Study Material',
                  'Advanced Tools & Calculators',
                  'AI Credits & Reports',
                  'Ad-free Experience',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 relative z-10">
              <button
                onClick={() => setIsPlusModalOpen(true)}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black rounded-2xl shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm transition-all cursor-pointer"
              >
                <span>Go Premium Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          5. SPONSORED / AFFILIATE CARD (SBI Personal Loan)
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-blue-800/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full md:w-auto">
            <div className="flex items-center space-x-2 shrink-0">
              <div className="w-10 h-10 rounded-full bg-white text-blue-900 flex items-center justify-center font-black text-xs">
                SBI
              </div>
              <div>
                <span className="text-xs text-blue-200 font-bold uppercase tracking-wider block">
                  Sponsored Partner
                </span>
                <h4 className="text-base sm:text-lg font-extrabold">Personal Loan</h4>
              </div>
            </div>

            <div className="border-l border-white/20 pl-4 hidden sm:block">
              <span className="text-xs text-blue-200">Interest Rate</span>
              <div className="text-base font-black text-amber-400">Starting @ 10.50% p.a.</div>
            </div>

            <div className="flex items-center space-x-4 text-xs text-blue-100">
              <span>⚡ Quick Process</span>
              <span>•</span>
              <span>💰 Low Interest Rate</span>
              <span>•</span>
              <span>📄 Minimal Documents</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0 w-full sm:w-auto justify-end">
            <button
              onClick={() => setActiveTab('finance')}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-xl text-xs transition cursor-pointer shadow-xs"
            >
              Check Eligibility
            </button>
            <span className="text-[9px] text-blue-300">*T&C Apply</span>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          6. EXAMS PREPARATION & FIND YOUR COLLEGE (2-Column Layout)
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Exams Preparation */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-blue-900 rounded-full"></span>
                Exams Preparation
              </h2>
              <button
                onClick={() => setActiveTab('exams')}
                className="text-xs sm:text-sm font-bold text-blue-900 hover:text-blue-950 flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {EXAM_PREP_CATEGORIES_DATA.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 text-center space-y-3 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div
                      className={`w-12 h-12 mx-auto rounded-2xl ${exam.logoBg} ${exam.logoTextColor} border ${exam.logoBorder} flex items-center justify-center font-black text-xs shadow-2xs`}
                    >
                      {exam.code}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-xs sm:text-sm text-slate-900">{exam.code}</h3>
                      <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{exam.subTitle}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('exams')}
                    className="w-full py-1.5 bg-slate-50 hover:bg-blue-50 text-blue-900 hover:text-blue-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition cursor-pointer"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Find Your College Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">Find Your College</h2>
              <button
                onClick={() => setActiveTab('colleges')}
                className="text-xs font-bold text-blue-900 hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <form onSubmit={handleCollegeFinderSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">Select State</label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                  >
                    <option value="Bihar">Bihar</option>
                    <option value="All India">All India</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">Select City</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                  >
                    <option value="Patna">Patna</option>
                    <option value="Gaya">Gaya</option>
                    <option value="Muzaffarpur">Muzaffarpur</option>
                    <option value="Bhagalpur">Bhagalpur</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">Select Course</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                  >
                    <option value="B.Tech">B.Tech / B.E.</option>
                    <option value="MBBS">MBBS / BDS</option>
                    <option value="BCA">BCA / MCA</option>
                    <option value="B.Sc">B.Sc / M.Sc</option>
                    <option value="BA">B.A. / M.A.</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600">Select Stream</label>
                  <select
                    value={selectedStream}
                    onChange={(e) => setSelectedStream(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Medical">Medical</option>
                    <option value="Science">Science & Tech</option>
                    <option value="Management">Management</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-900 hover:bg-blue-950 text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search Colleges</span>
              </button>
            </form>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <p className="text-xs text-slate-500 font-medium">
                Find, Compare & Choose the best college for you across NIRF & NAAC ratings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          7. POPULAR TOOLS (Circular/Rounded Grid)
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-indigo-900 rounded-full"></span>
            Popular Tools
          </h2>
          <button
            onClick={() => setActiveTab('tools')}
            className="text-xs sm:text-sm font-bold text-blue-900 hover:text-blue-950 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>View All Tools</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4">
          {POPULAR_TOOLS_DATA.slice(0, 8).map((tool) => (
            <button
              key={tool.id}
              onClick={() => {
                if (tool.id === 'photo-resizer' || tool.id === 'signature-resizer') {
                  if (onOpenPhotoTool) onOpenPhotoTool();
                  else setActiveTab('tools');
                } else if (tool.id === 'age-calc') {
                  if (onOpenAgeCalculator) onOpenAgeCalculator();
                  else setActiveTab('tools');
                } else {
                  if (onOpenPublicToolModal) onOpenPublicToolModal(tool.id);
                  setActiveTab('tools');
                }
              }}
              className="bg-white hover:bg-blue-50/60 border border-slate-200 hover:border-blue-900/30 p-3.5 rounded-2xl text-center flex flex-col items-center justify-center space-y-2 transition-all shadow-xs cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-blue-100 text-blue-950 flex items-center justify-center text-xl font-bold transition-transform group-hover:scale-110 shadow-2xs">
                {tool.icon}
              </div>
              <span className="font-bold text-xs text-slate-800 group-hover:text-blue-900 line-clamp-1">
                {tool.shortName}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          8. AI UTILITIES SECTION
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-teal-600 rounded-full"></span>
            AI Utilities
          </h2>
          <button
            onClick={() => setActiveTab('ai-utilities')}
            className="text-xs sm:text-sm font-bold text-blue-900 hover:text-blue-950 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {AI_UTILITIES_DATA.slice(0, 6).map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs hover:border-teal-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-900 flex items-center justify-center text-xl shadow-2xs">
                  {tool.icon}
                </div>
                <div>
                  <h3 className="font-extrabold text-xs sm:text-sm text-slate-900">{tool.name}</h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {tool.shortDescription}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('ai-utilities')}
                className="w-full py-1.5 bg-slate-50 hover:bg-teal-50 text-teal-900 hover:text-teal-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition cursor-pointer"
              >
                <span>Try Now</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          9. LATEST UPDATES / ARTICLES & FINANCE GUIDES
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-6 bg-amber-500 rounded-full"></span>
              Featured Guides & Knowledge Hub
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              In-depth articles on Finance Management, Government Schemes, Scholarships & Career
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('current-affairs')}
              className="text-xs sm:text-sm font-bold text-blue-900 hover:text-blue-950 flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Current Affairs Hub</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filters for Articles */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { key: 'All', label: `All Guides (${LATEST_ARTICLES_DATA.length})` },
            { key: 'Finance', label: 'Finance & Wealth 💰 (6)' },
            { key: 'Scheme', label: 'Govt Schemes 🏛️' },
            { key: 'Scholarship', label: 'Scholarships 🎓' },
          ].map((cat) => {
            const isSelected = articleCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setArticleCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {LATEST_ARTICLES_DATA.filter(
            (art) => articleCategory === 'All' || art.category === articleCategory
          ).map((art) => (
            <div
              key={art.id}
              onClick={() => {
                setSelectedArticle(art);
                setIsArticleModalOpen(true);
              }}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-blue-900/30 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="relative h-40 overflow-hidden bg-slate-100">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className={`absolute top-2.5 left-2.5 text-[10px] font-black px-2.5 py-0.5 rounded-md shadow-xs ${art.categoryColor}`}
                  >
                    {art.category}
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 text-[9px] font-bold px-2 py-0.5 rounded bg-black/70 text-white backdrop-blur-xs">
                    {art.readTime}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-black text-sm sm:text-base text-slate-900 group-hover:text-blue-900 line-clamp-2 leading-snug transition-colors">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-medium">
                  {art.date}
                </span>
                <span className="text-blue-900 font-extrabold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          10. OUR PARTNERS & SUPPORTERS
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
          Our Partners & Supporters
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
          {[
            'MyGov',
            'Digital India',
            'india.gov.in',
            'NPCI',
            'GeM',
            'SIDBI',
            'NSDC',
          ].map((partner, idx) => (
            <div
              key={idx}
              className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs sm:text-sm font-extrabold text-slate-700 shadow-2xs"
            >
              {partner}
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          11. STAY UPDATED NEWSLETTER BAR
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black">Stay Updated with BharatSeva</h3>
              <p className="text-xs text-slate-300">
                Get the latest updates on government jobs, results, admit cards, schemes & exams directly.
              </p>
            </div>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 w-full md:w-auto">
            {newsletterSubscribed ? (
              <div className="px-5 py-3 bg-emerald-600/30 border border-emerald-400 text-emerald-300 text-xs font-bold rounded-2xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="px-4 py-2.5 bg-white/10 border border-white/20 rounded-2xl text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 min-w-[220px]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-2xl text-xs transition cursor-pointer shadow-md"
                >
                  Subscribe
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          ARTICLE READER MODAL
      ────────────────────────────────────────────────────────────────────────── */}
      <ArticleReaderModal
        article={selectedArticle}
        allArticles={LATEST_ARTICLES_DATA}
        isOpen={isArticleModalOpen}
        onClose={() => setIsArticleModalOpen(false)}
        onSelectArticle={(art) => setSelectedArticle(art)}
        onOpenTool={(toolId) => {
          if (onOpenPublicToolModal) {
            onOpenPublicToolModal(toolId);
          } else {
            setActiveTab('tools');
          }
        }}
      />

      {/* ──────────────────────────────────────────────────────────────────────────
          BHARATSEVA PLUS MODAL
      ────────────────────────────────────────────────────────────────────────── */}
      <BharatSevaPlusModal
        isOpen={isPlusModalOpen}
        onClose={() => setIsPlusModalOpen(false)}
        onSelectPlan={(plan) => {
          setIsPlusModalOpen(false);
        }}
      />
    </div>
  );
};
