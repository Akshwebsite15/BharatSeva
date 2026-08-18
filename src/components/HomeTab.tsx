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
} from 'lucide-react';
import { JurisdictionState, GovJob, CurrentAffairsArticle, College, University } from '../types';
import {
  POPULAR_TOOLS_DATA,
  AI_UTILITIES_DATA,
  TRENDING_SCHEMES_DATA,
  EXAM_PREP_CATEGORIES_DATA,
  LATEST_ARTICLES_DATA,
  TrendingSchemeItem,
  ExamPrepCategory,
} from '../data/bharatSevaToolsData';
import { BharatSevaPlusModal } from './BharatSevaPlusModal';

interface HomeTabProps {
  setActiveTab: (tab: string) => void;
  selectedJurisdiction: JurisdictionState;
  onGlobalSearch: (query: string) => void;
  jobs?: GovJob[];
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

  // College Finder Quick Form State
  const [selectedState, setSelectedState] = useState('Bihar');
  const [selectedCity, setSelectedCity] = useState('Patna');
  const [selectedCourse, setSelectedCourse] = useState('B.Tech');
  const [selectedStream, setSelectedStream] = useState('Engineering');

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

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16 space-y-10 sm:space-y-14">
      {/* 👑 BharatSeva Plus Modal */}
      <BharatSevaPlusModal
        isOpen={isPlusModalOpen}
        onClose={() => setIsPlusModalOpen(false)}
        onUnlockSuccess={() => {
          // Callback when user activates simulation
        }}
      />

      {/* ──────────────────────────────────────────────────────────────────────────
          1. HERO SECTION (Exact layout matching the visual reference)
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 border-b border-slate-200/80 pt-8 pb-12 sm:pt-14 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                  India’s One-Stop Platform <br className="hidden sm:inline" />
                  for <span className="text-blue-900">Opportunities</span> & <span className="text-amber-600">Growth</span>
                </h1>
                <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-xl font-medium">
                  Government Schemes, Scholarships, Exam Preparation, Career Tools, Finance, Insurance & much more...
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
                    placeholder="Search for schemes, colleges, exams, tools..."
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
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
                <span className="font-semibold text-slate-600">Popular Searches:</span>
                {['PM Kisan', 'Scholarship 2026', 'NEET 2026', 'SBI PO', 'BPSC 71st', 'Mudra Loan'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleQuickTagClick(tag)}
                    className="px-3 py-1 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-200 hover:border-blue-300 rounded-full font-medium text-xs transition cursor-pointer shadow-2xs"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Hero Column: Landmark Montage & 4 Key Stat Badges */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              {/* Subtle Monument Silhouette Gradient Backdrop */}
              <div className="w-full h-48 sm:h-64 rounded-3xl bg-gradient-to-br from-amber-500/10 via-blue-900/10 to-emerald-500/10 border border-slate-200/80 p-4 flex flex-col justify-end relative overflow-hidden shadow-xs mb-4">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/40 via-transparent to-transparent"></div>
                <div className="relative z-10 text-center space-y-1">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Verified National & State Directory
                  </div>
                  <h3 className="text-lg font-extrabold text-blue-950">
                    Trusted by 10 Lakh+ Indian Citizens & Aspirants
                  </h3>
                </div>
              </div>

              {/* 4 Key Stat Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full">
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-black text-slate-900 leading-tight">25K+</div>
                    <div className="text-[10px] sm:text-xs font-semibold text-slate-500">Schemes</div>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-black text-slate-900 leading-tight">10K+</div>
                    <div className="text-[10px] sm:text-xs font-semibold text-slate-500">Scholarships</div>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-black text-slate-900 leading-tight">2K+</div>
                    <div className="text-[10px] sm:text-xs font-semibold text-slate-500">Colleges</div>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center shrink-0">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-black text-slate-900 leading-tight">500+</div>
                    <div className="text-[10px] sm:text-xs font-semibold text-slate-500">Tools</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          2. 10 CATEGORY CARDS (Grid matching the visual reference)
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
          3. TRENDING SCHEMES & BHARATSEVA PLUS (2-Column Layout)
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
          4. SPONSORED / AFFILIATE CARD (SBI Personal Loan - Clean & Compliant)
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-blue-800/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full md:w-auto">
            {/* SBI Logo / Emblem */}
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
          5. EXAMS PREPARATION & FIND YOUR COLLEGE (2-Column Layout)
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
          6. POPULAR TOOLS (Circular/Rounded Grid matching reference)
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
              onClick={() => setActiveTab('tools')}
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
          7. AI UTILITIES SECTION (6 AI Cards matching reference)
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
          8. LATEST UPDATES / ARTICLES
      ────────────────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-amber-500 rounded-full"></span>
            Latest Updates
          </h2>
          <button
            onClick={() => setActiveTab('current-affairs')}
            className="text-xs sm:text-sm font-bold text-blue-900 hover:text-blue-950 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {LATEST_ARTICLES_DATA.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-32 sm:h-36 overflow-hidden bg-slate-100">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <span
                    className={`absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-md ${art.categoryColor}`}
                  >
                    {art.category}
                  </span>
                  <span className="absolute bottom-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs">
                    {art.readTime}
                  </span>
                </div>

                <div className="p-3.5 space-y-1">
                  <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 line-clamp-2 leading-snug">
                    {art.title}
                  </h3>
                </div>
              </div>

              <div className="px-3.5 pb-3 pt-1 text-[11px] text-slate-400 font-medium border-t border-slate-50">
                {art.date}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────────────
          9. OUR PARTNERS & SUPPORTERS
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
          10. STAY UPDATED NEWSLETTER BAR
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
                Get the latest updates on schemes, scholarships, exams & more directly to your inbox.
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
    </div>
  );
};
