import React, { useState } from 'react';
import {
  House,
  CalendarCheck,
  GraduationCap,
  Hourglass,
  Search,
  Menu,
  X,
  Sparkles,
  Briefcase,
  Ticket,
  PenSquare,
  Landmark,
  FileCheck,
  Building2,
  UserCheck,
  Bot,
  Gift,
  Download,
  BookOpen,
  Newspaper,
  ShieldCheck,
  Layers,
  Calculator,
  Scissors,
  Clock,
  Trophy,
} from 'lucide-react';
import { JurisdictionState } from '../types';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAiModal: () => void;
  onOpenUnifiedSearch: () => void;
  onOpenInstallModal: () => void;
  onOpenDailyRewards?: () => void;
  onOpenAdmin?: () => void;
  onOpenLegalModal: () => void;
  selectedJurisdiction: JurisdictionState;
  setSelectedJurisdiction: (j: JurisdictionState) => void;
  coins?: number;
  streakDays?: number;
  onOpenSpeedQuiz?: () => void;
  onOpenAgeCalculator?: () => void;
  onOpenPhotoTool?: () => void;
  onOpenStudyPlanner?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenAiModal,
  onOpenUnifiedSearch,
  onOpenInstallModal,
  onOpenDailyRewards,
  onOpenAdmin,
  onOpenLegalModal,
  selectedJurisdiction,
  setSelectedJurisdiction,
  coins = 120,
  streakDays = 3,
  onOpenSpeedQuiz,
  onOpenAgeCalculator,
  onOpenPhotoTool,
  onOpenStudyPlanner,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mainBottomTabs = [
    { id: 'home', label: 'Home', icon: House },
    { id: 'admissions', label: 'Admissions', icon: CalendarCheck, badge: '⭐' },
    { id: 'colleges', label: 'Colleges', icon: GraduationCap },
    { id: 'deadlines', label: 'Deadlines', icon: Hourglass, badge: '🚨' },
  ];

  const allDirectoryLinks = [
    { id: 'admissions', label: 'Admissions 2026', icon: CalendarCheck, category: 'Education', badge: 'Hot' },
    { id: 'courses', label: 'Course Directory', icon: BookOpen, category: 'Education' },
    { id: 'colleges', label: 'Colleges & Institutes', icon: GraduationCap, category: 'Education' },
    { id: 'universities', label: 'Central & State Universities', icon: Building2, category: 'Education' },
    
    { id: 'jobs-for-you', label: 'Jobs For You (Matched)', icon: Sparkles, category: 'Careers & Exams', badge: 'AI' },
    { id: 'jobs', label: 'Govt Job Notifications', icon: Briefcase, category: 'Careers & Exams' },
    { id: 'deadlines', label: 'Application Tracker (Closing Soon)', icon: Hourglass, category: 'Careers & Exams', badge: '🚨' },
    { id: 'admit-cards', label: 'Admit Cards & Hall Tickets', icon: Ticket, category: 'Careers & Exams' },
    { id: 'exams', label: 'Competitive Exams & Hub', icon: PenSquare, category: 'Careers & Exams' },
    { id: 'current-affairs', label: 'Current Affairs & Daily GK', icon: Newspaper, category: 'Careers & Exams' },

    { id: 'bharatseva-bihar', label: 'Bihar Citizen Hub (BPSC, RTPS)', icon: Landmark, category: 'Citizen Hubs' },
    { id: 'services', label: 'Government Citizen Services', icon: FileCheck, category: 'Citizen Hubs' },
    { id: 'schemes', label: 'Welfare Schemes & DBT', icon: Layers, category: 'Citizen Hubs' },
    { id: 'dashboard', label: 'My Saved & Bookmarks', icon: UserCheck, category: 'Personal' },
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 📱 Full-Screen Mobile Drawer Sheet */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col justify-end xl:hidden animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border-t border-slate-200">
            {/* Drawer Header */}
            <div className="p-4 bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-950 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                  <Landmark className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">All Portal Directories</h3>
                  <p className="text-[10px] text-indigo-200 font-medium">Single-Window Citizen & Education Hub</p>
                </div>
              </div>
              
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Action Pills in Drawer */}
            <div className="p-3 bg-slate-50 border-b border-slate-200 grid grid-cols-3 gap-2 text-xs shrink-0">
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenUnifiedSearch();
                }}
                className="p-2 bg-white rounded-xl border border-slate-200 font-bold text-slate-800 flex flex-col items-center justify-center gap-1 shadow-2xs cursor-pointer active:scale-95"
              >
                <Search className="w-4 h-4 text-indigo-600" />
                <span className="text-[10px]">Universal Search</span>
              </button>

              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenAiModal();
                }}
                className="p-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-bold flex flex-col items-center justify-center gap-1 shadow-2xs cursor-pointer active:scale-95"
              >
                <Bot className="w-4 h-4 text-white" />
                <span className="text-[10px]">AI Assistant</span>
              </button>

              <button
                onClick={() => {
                  setDrawerOpen(false);
                  if (onOpenDailyRewards) onOpenDailyRewards();
                }}
                className="p-2 bg-amber-400 text-slate-950 rounded-xl font-black flex flex-col items-center justify-center gap-1 shadow-2xs cursor-pointer active:scale-95"
              >
                <Gift className="w-4 h-4 text-slate-950" />
                <span className="text-[10px]">🪙 {coins} Coins</span>
              </button>
            </div>

            {/* Scrollable Directory Grid */}
            <div className="p-4 overflow-y-auto space-y-4">
              {/* Daily Aspirant Power Tools Section */}
              <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-purple-500/10 p-3 rounded-2xl border border-orange-200/60 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-orange-950 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                    Daily Aspirant & Student Tools
                  </h4>
                  <span className="text-[10px] bg-orange-200 text-orange-950 px-1.5 py-0.2 rounded-full font-extrabold">
                    FREE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      if (onOpenSpeedQuiz) onOpenSpeedQuiz();
                    }}
                    className="p-2.5 bg-white border border-orange-200 rounded-xl text-left font-black text-xs text-orange-950 flex items-center gap-2 shadow-2xs cursor-pointer active:scale-95"
                  >
                    <Trophy className="w-4 h-4 text-orange-600 shrink-0" />
                    <div>
                      <span className="block text-[11px] leading-tight">Daily GK Quiz</span>
                      <span className="text-[9px] text-orange-700 font-bold">+50 Coins</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      if (onOpenAgeCalculator) onOpenAgeCalculator();
                    }}
                    className="p-2.5 bg-white border border-blue-200 rounded-xl text-left font-black text-xs text-blue-950 flex items-center gap-2 shadow-2xs cursor-pointer active:scale-95"
                  >
                    <Calculator className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <span className="block text-[11px] leading-tight">Age Calculator</span>
                      <span className="text-[9px] text-blue-700 font-bold">35+ Exams</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      if (onOpenPhotoTool) onOpenPhotoTool();
                    }}
                    className="p-2.5 bg-white border border-indigo-200 rounded-xl text-left font-black text-xs text-indigo-950 flex items-center gap-2 shadow-2xs cursor-pointer active:scale-95"
                  >
                    <Scissors className="w-4 h-4 text-indigo-600 shrink-0" />
                    <div>
                      <span className="block text-[11px] leading-tight">Photo Resizer</span>
                      <span className="text-[9px] text-indigo-700 font-bold">20-50 KB Limit</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      if (onOpenStudyPlanner) onOpenStudyPlanner();
                    }}
                    className="p-2.5 bg-white border border-purple-200 rounded-xl text-left font-black text-xs text-purple-950 flex items-center gap-2 shadow-2xs cursor-pointer active:scale-95"
                  >
                    <Clock className="w-4 h-4 text-purple-600 shrink-0" />
                    <div>
                      <span className="block text-[11px] leading-tight">Study Planner</span>
                      <span className="text-[9px] text-purple-700 font-bold">Pomodoro 25m</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Higher Education Section */}
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-wider text-indigo-900 mb-2 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                  Higher Education Directories
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {allDirectoryLinks.filter(i => i.category === 'Education').map((item) => {
                    const Icon = item.icon;
                    const isSelected = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectTab(item.id)}
                        className={`p-3 rounded-2xl border text-left font-bold text-xs flex items-center justify-between gap-1.5 transition cursor-pointer ${
                          isSelected
                            ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                            : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-indigo-600'}`} />
                          <span className="truncate text-[11px]">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="bg-amber-400 text-slate-950 text-[9px] px-1.5 py-0.5 rounded font-black shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Careers & Exams Section */}
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-wider text-teal-900 mb-2 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-teal-600" />
                  Careers, Exams & Updates
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {allDirectoryLinks.filter(i => i.category === 'Careers & Exams').map((item) => {
                    const Icon = item.icon;
                    const isSelected = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectTab(item.id)}
                        className={`p-3 rounded-2xl border text-left font-bold text-xs flex items-center justify-between gap-1.5 transition cursor-pointer ${
                          isSelected
                            ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                            : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-teal-600'}`} />
                          <span className="truncate text-[11px]">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="bg-rose-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Citizen Hubs & Personal */}
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1">
                  <Landmark className="w-3.5 h-3.5 text-slate-600" />
                  Citizen Services & Personal
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {allDirectoryLinks.filter(i => i.category === 'Citizen Hubs' || i.category === 'Personal').map((item) => {
                    const Icon = item.icon;
                    const isSelected = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectTab(item.id)}
                        className={`p-3 rounded-2xl border text-left font-bold text-xs flex items-center justify-between gap-1.5 transition cursor-pointer ${
                          isSelected
                            ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                            : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-600'}`} />
                          <span className="truncate text-[11px]">{item.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* App Options & Legal */}
              <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenInstallModal();
                  }}
                  className="bg-amber-100 text-amber-950 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-amber-700" />
                  <span>Install Web App</span>
                </button>

                {onOpenAdmin && (
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      onOpenAdmin();
                    }}
                    className="text-slate-700 font-bold hover:underline flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span>Admin CMS</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenLegalModal();
                  }}
                  className="text-slate-500 font-bold hover:underline"
                >
                  Legal Notice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 📱 FIXED DOCKED MOBILE BOTTOM NAVIGATION (Optimized for Mobile Install / PWA / Phones) */}
      <nav
        aria-label="Mobile Navigation Dock"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] xl:hidden pb-[max(0.6rem,env(safe-area-inset-bottom))]"
      >
        <div className="max-w-md mx-auto px-2 pt-1.5 flex items-center justify-around">
          {mainBottomTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleSelectTab(tab.id)}
                className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl min-w-[58px] transition-all cursor-pointer select-none active:scale-95 ${
                  isActive ? 'text-blue-900 font-extrabold' : 'text-slate-500 hover:text-slate-800 font-semibold'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-blue-900 stroke-[2.5]' : 'stroke-[1.75]'}`} />
                  {tab.badge && (
                    <span className="absolute -top-1.5 -right-2 text-[9px] leading-none">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-900 mt-0.5"></span>
                )}
              </button>
            );
          })}

          {/* Quick Universal Search Trigger on Mobile Dock */}
          <button
            onClick={onOpenUnifiedSearch}
            className="flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl min-w-[58px] text-indigo-700 hover:text-indigo-900 font-semibold transition-all cursor-pointer active:scale-95"
            title="Search"
          >
            <div className="w-7 h-7 rounded-xl bg-indigo-50 border border-indigo-200/80 flex items-center justify-center">
              <Search className="w-4 h-4 text-indigo-700 stroke-[2.5]" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight font-bold">Search</span>
          </button>

          {/* Drawer Menu Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl min-w-[58px] transition-all cursor-pointer active:scale-95 ${
              drawerOpen ? 'text-blue-900 font-extrabold' : 'text-slate-500 hover:text-slate-800 font-semibold'
            }`}
            title="All Services & Categories"
          >
            <div className="relative">
              <Menu className="w-5 h-5 stroke-[2]" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400"></span>
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">More</span>
          </button>
        </div>
      </nav>
    </>
  );
};
