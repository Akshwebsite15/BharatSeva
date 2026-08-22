import React, { useState } from 'react';
import {
  House,
  Compass,
  Calculator,
  Bot,
  User,
  Landmark,
  GraduationCap,
  Building2,
  PenSquare,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Building,
  Sparkles,
  X,
  Search,
  Download,
  AlertTriangle,
  Gift,
  Coins,
  Ticket,
  Hourglass,
  CalendarCheck,
  BookOpen,
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
  coins = 120,
  streakDays = 3,
}) => {
  const [exploreDrawerOpen, setExploreDrawerOpen] = useState(false);

  // 5 primary bottom navigation items as requested: Home | Explore | Tools | AI | Profile
  const bottomNavItems = [
    { id: 'home', label: 'Home', icon: House },
    { id: 'explore', label: 'Explore', icon: Compass, isDrawerTrigger: true },
    { id: 'tools', label: 'Tools', icon: Calculator },
    { id: 'ai-utilities', label: 'AI', icon: Bot, isSpecial: true },
    { id: 'dashboard', label: 'Profile', icon: User },
  ];

  const exploreCategories = [
    { id: 'schemes', label: 'Government Schemes', icon: Landmark, desc: 'Central & State DBT Welfare' },
    { id: 'scholarships', label: 'Scholarships', icon: GraduationCap, desc: 'NSP, Post-Matric & Private' },
    { id: 'colleges', label: 'Colleges & Institutes', icon: Building2, desc: 'Engineering, Medical, Arts' },
    { id: 'universities', label: 'Universities', icon: Building, desc: 'Central, State & Private' },
    { id: 'exams', label: 'Exams & Mock Tests', icon: PenSquare, desc: 'UPSC, SSC, BPSC, GATE, NEET' },
    { id: 'jobs', label: 'Career & Govt Jobs', icon: Briefcase, desc: 'Active Vacancies & Notifications' },
    { id: 'finance', label: 'Finance & Loans', icon: TrendingUp, desc: 'FD, RD, Mudra, Personal Loans' },
    { id: 'insurance', label: 'Insurance & Health', icon: ShieldCheck, desc: 'Ayushman, PMJJBY, PMSBY' },
    { id: 'business', label: 'Business & MSME', icon: Building, desc: 'Startups, Mudra, PMEGP' },
    { id: 'admissions', label: 'Admissions 2026', icon: CalendarCheck, desc: 'Central University UG/PG' },
    { id: 'courses', label: 'Courses & Degrees', icon: BookOpen, desc: 'Top In-demand Career Tracks' },
    { id: 'deadlines', label: 'Closing Soon 🚨', icon: Hourglass, desc: 'Expiring Application Deadlines' },
  ];

  const handleNavClick = (item: typeof bottomNavItems[0]) => {
    if (item.isDrawerTrigger) {
      setExploreDrawerOpen(true);
    } else {
      setActiveTab(item.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Fixed Bottom Navigation Bar for Mobile View */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-2xl py-1.5 px-2">
        <div className="grid grid-cols-5 items-center justify-around">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`flex flex-col items-center justify-center py-1 rounded-xl transition cursor-pointer select-none ${
                  isActive
                    ? 'text-blue-900 font-bold'
                    : 'text-slate-500 hover:text-slate-900 font-medium'
                }`}
              >
                <div
                  className={`relative p-1 rounded-full ${
                    isActive
                      ? 'bg-blue-100/70 text-blue-900 scale-110'
                      : item.isSpecial
                      ? 'text-indigo-600'
                      : 'text-slate-500'
                  } transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                  {item.isSpecial && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400"></span>
                  )}
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explore Full Drawer Modal */}
      {exploreDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-150">
          <div className="bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-5 space-y-4 shadow-2xl border-t border-slate-200 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Explore BharatSeva</h3>
                  <span className="text-[11px] text-slate-500">All Portals & Directories</span>
                </div>
              </div>

              <button
                onClick={() => setExploreDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Trigger */}
            <button
              onClick={() => {
                setExploreDrawerOpen(false);
                onOpenUnifiedSearch();
              }}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center space-x-2 text-xs text-slate-500 font-medium cursor-pointer"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search schemes, scholarships, exams...</span>
            </button>

            {/* Explore Grid */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {exploreCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveTab(cat.id);
                      setExploreDrawerOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-3 bg-slate-50 hover:bg-blue-50/60 border border-slate-200 rounded-2xl text-left flex items-start space-x-2.5 transition cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white text-blue-900 flex items-center justify-center shrink-0 shadow-2xs border border-slate-100">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">{cat.label}</div>
                      <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{cat.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Utilities in Drawer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
              <button
                onClick={() => {
                  setExploreDrawerOpen(false);
                  onOpenInstallModal();
                }}
                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-2xs font-extrabold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install App</span>
              </button>

              {onOpenDailyRewards && (
                <button
                  onClick={() => {
                    setExploreDrawerOpen(false);
                    onOpenDailyRewards();
                  }}
                  className="text-amber-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <Gift className="w-4 h-4" />
                  <span>🪙 {coins} Coins</span>
                </button>
              )}

              <button
                onClick={() => {
                  setExploreDrawerOpen(false);
                  onOpenLegalModal();
                }}
                className="text-slate-500 hover:underline cursor-pointer"
              >
                Disclaimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
