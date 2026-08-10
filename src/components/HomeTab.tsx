import React, { useState } from 'react';
import {
  Search,
  ShieldCheck,
  FileCheck,
  Briefcase,
  PenSquare,
  GraduationCap,
  Building2,
  Hourglass,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Award,
  Users,
  CheckCircle2,
  Bell,
  Newspaper,
  Landmark,
  Layers,
} from 'lucide-react';
import { JurisdictionState } from '../types';

interface HomeTabProps {
  setActiveTab: (tab: string) => void;
  selectedJurisdiction: JurisdictionState;
  onGlobalSearch: (query: string) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  setActiveTab,
  selectedJurisdiction,
  onGlobalSearch,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchInput.trim()) {
      onGlobalSearch(searchInput.trim());
    }
  };

  const handleChipClick = (query: string) => {
    setSearchInput(query);
    onGlobalSearch(query);
  };

  const serviceCards = [
    {
      id: 'current-affairs',
      title: "Today's Current Affairs",
      subtitle: 'Read → Quiz → Save → Share',
      icon: Newspaper,
      color: 'bg-teal-50 text-teal-800 hover:bg-teal-700 hover:text-white',
      badge: '🇮🇳 10 Categories',
    },
    {
      id: 'bharatseva-bihar',
      title: 'BharatSeva Bihar',
      subtitle: 'BPSC, BSSC, Police, RTPS, Board',
      icon: Landmark,
      color: 'bg-amber-50 text-amber-900 hover:bg-amber-700 hover:text-white',
      badge: '15 Modules',
    },
    {
      id: 'search-intent-hub',
      title: 'Search Intent Hub',
      subtitle: '10th/12th Jobs, CGL Syllabus',
      icon: Layers,
      color: 'bg-indigo-50 text-indigo-800 hover:bg-indigo-700 hover:text-white',
      badge: 'High SEO Query',
    },
    {
      id: 'services',
      title: 'Certificates & RTPS',
      subtitle: 'Caste, Income, Domicile, EWS',
      icon: FileCheck,
      color: 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white',
      badge: 'RTPS Bihar',
    },
    {
      id: 'jobs',
      title: 'Government Jobs',
      subtitle: 'Bihar Police, RRB, SSC, BPSC',
      icon: Briefcase,
      color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white',
      badge: '21k+ Active',
    },
    {
      id: 'exams',
      title: 'Government Exams',
      subtitle: 'BPSC 71st, BSSC, UPSC, Banking',
      icon: PenSquare,
      color: 'bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white',
      badge: 'Live Dates',
    },
    {
      id: 'scholarships',
      title: 'Scholarships & Grants',
      subtitle: 'Post Matric, Girl Education',
      icon: GraduationCap,
      color: 'bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white',
      badge: 'Up to ₹50k',
    },
    {
      id: 'schemes',
      title: 'Welfare Schemes',
      subtitle: 'PM Kisan, Ayushman, Udyami',
      icon: Building2,
      color: 'bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white',
      badge: 'DBT Subsidies',
    },
    {
      id: 'deadlines',
      title: 'Deadline Tracker',
      subtitle: 'Countdowns & Reminders',
      icon: Hourglass,
      color: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white',
      badge: 'Real-time',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Live Government Notification Ticker */}
      <div className="bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-blue-500/10 border-y border-amber-500/20 py-2.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-3 text-xs sm:text-sm font-medium text-slate-800 overflow-x-auto whitespace-nowrap scrollbar-none">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-amber-500 text-slate-900 shrink-0 uppercase tracking-wide">
            <Bell className="w-3 h-3 mr-1 animate-pulse" /> Live Alert
          </span>
          <span className="text-slate-700 font-semibold">
            • BPSC 71st CCE Notification releasing Oct 2026
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-700 font-semibold">
            • Bihar Police Constable Exam Admit Cards Released for Nov 18, 2026
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-700 font-semibold">
            • Bihar Post Matric Scholarship (PMS 2026-27) portal open for SC/ST/EBC
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-teal-900 text-white py-12 sm:py-20 px-4 sm:px-8 overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Verified Digital Public Infrastructure • {selectedJurisdiction} & All India</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            What government service or job do you need today?
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Access verified RTPS certificates, BPSC/BSSC exams, government job vacancies, scholarships, and welfare schemes instantly with official guidance.
          </p>

          {/* Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white p-2.5 rounded-2xl shadow-2xl max-w-2xl mx-auto flex flex-col sm:flex-row items-center border border-slate-200 gap-2 text-slate-800 mt-8"
          >
            <div className="flex items-center w-full px-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search caste certificate, BPSC 71st, Bihar police job..."
                className="w-full px-3 py-3 text-slate-800 placeholder-slate-400 text-sm sm:text-base focus:outline-hidden bg-transparent font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-teal-600 hover:from-blue-800 hover:to-teal-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-md transition-all shrink-0 cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>Search Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Popular Search Chips */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
            <span className="text-slate-400 font-semibold flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-1 text-teal-400" /> Popular:
            </span>
            {[
              'Caste Certificate',
              'BPSC 71st CCE',
              'Bihar Police Constable',
              'Post Matric Scholarship',
              'EWS Certificate',
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleChipClick(chip)}
                className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-slate-200 border border-white/10 transition cursor-pointer font-medium"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Category Cards */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-teal-600 font-extrabold uppercase tracking-wider text-xs">
              EXPLORE DIRECTORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Unified Citizen Service Categories
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 md:mt-0">
            Select a portal category to view verified guides, eligibility, and official links.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
          {serviceCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => setActiveTab(card.id)}
                className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-teal-500 transition-all cursor-pointer text-center group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-center mb-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 group-hover:bg-teal-100 group-hover:text-teal-800 transition">
                      {card.badge}
                    </span>
                  </div>
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl mx-auto flex items-center justify-center text-xl transition-all mb-3 shadow-2xs ${card.color}`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm group-hover:text-teal-700 transition">
                    {card.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{card.subtitle}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-center text-[11px] font-bold text-teal-600 opacity-0 group-hover:opacity-100 transition">
                  <span>Open</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Feature Spotlight: Jobs For You */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="bg-gradient-to-r from-teal-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-teal-500/30 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-4 max-w-2xl relative z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-teal-400 text-slate-950 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> Killer Feature • Match Engine
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Personalised "Jobs For You" Eligibility Engine
            </h2>

            <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
              Never waste hours reading complex PDF recruitment rules. Enter your Age, State, Category, Degree (B.Tech CSE, BA, ITI), Percentages, and Physical Height. BharatSeva automatically tags every vacancy as:
            </p>

            <div className="flex flex-wrap gap-2 text-xs font-extrabold pt-1">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1.5 rounded-xl">
                🟢 100% Eligible
              </span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-xl">
                🟡 Possibly Eligible (Check Notice)
              </span>
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 px-3 py-1.5 rounded-xl">
                🔴 Not Eligible
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full lg:w-auto relative z-10">
            <button
              onClick={() => setActiveTab('jobs-for-you')}
              className="w-full lg:w-auto bg-teal-400 hover:bg-teal-300 text-slate-950 font-black px-8 py-5 rounded-2xl shadow-xl transition-all transform hover:scale-105 cursor-pointer flex items-center justify-center space-x-3 text-sm sm:text-base"
            >
              <span>Test My Eligibility Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Verified Portal Metrics Banner */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="pt-4 md:pt-0">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-3">
              <FileCheck className="w-5 h-5" />
            </div>
            <h4 className="text-2xl font-extrabold text-slate-900">100% Verified</h4>
            <p className="text-xs text-slate-500 mt-1">Official RTPS & Government Portals</p>
          </div>

          <div className="pt-4 md:pt-0">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-3">
              <Briefcase className="w-5 h-5" />
            </div>
            <h4 className="text-2xl font-extrabold text-slate-900">1.2 Lakh+ Jobs</h4>
            <p className="text-xs text-slate-500 mt-1">Active Bihar & Central Vacancies</p>
          </div>

          <div className="pt-4 md:pt-0">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mx-auto mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-2xl font-extrabold text-slate-900">BPSC & BSSC</h4>
            <p className="text-xs text-slate-500 mt-1">Full Exam Syllabus & Milestones</p>
          </div>

          <div className="pt-4 md:pt-0">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-2xl font-extrabold text-slate-900">Zero Fee Portal</h4>
            <p className="text-xs text-slate-500 mt-1">Free Public Infrastructure</p>
          </div>
        </div>
      </section>
    </div>
  );
};
