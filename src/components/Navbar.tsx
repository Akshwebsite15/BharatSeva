import React, { useState } from 'react';
import {
  Landmark,
  House,
  GraduationCap,
  Building2,
  Briefcase,
  PenSquare,
  ShieldCheck,
  TrendingUp,
  Building,
  Calculator,
  Bot,
  Search,
  Bell,
  User,
  ChevronDown,
  AlertTriangle,
  Download,
  Menu,
  X,
  Sparkles,
  Layers,
  CalendarCheck,
  BookOpen,
  Hourglass,
  Ticket,
  Coins,
  ExternalLink,
  Zap,
  Car,
  HeartPulse,
  Compass,
  Cpu,
  Home,
} from 'lucide-react';
import { JurisdictionState } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedJurisdiction: JurisdictionState;
  setSelectedJurisdiction: (j: JurisdictionState) => void;
  onOpenAiModal: () => void;
  onOpenInstallModal: () => void;
  onOpenLegalModal: () => void;
  onOpenAlertModal?: () => void;
  coins?: number;
  streakDays?: number;
  onOpenDailyRewards?: () => void;
  onOpenAdmin?: () => void;
  onOpenUnifiedSearch?: () => void;
  onOpenSpeedQuiz?: () => void;
  onOpenAgeCalculator?: () => void;
  onOpenPhotoTool?: () => void;
  onOpenStudyPlanner?: () => void;
  onOpenPublicToolModal?: (toolId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedJurisdiction,
  setSelectedJurisdiction,
  onOpenAiModal,
  onOpenInstallModal,
  onOpenLegalModal,
  onOpenAlertModal,
  coins = 120,
  streakDays = 3,
  onOpenDailyRewards,
  onOpenAdmin,
  onOpenUnifiedSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');

  // Primary High-Value Hub Navigation items
  const navItems = [
    { id: 'home', label: 'Home', icon: House },
    { id: 'finance-insurance', label: '🥇 Finance & Insurance', icon: TrendingUp },
    { id: 'jobs', label: '🥈 Jobs & Careers', icon: Briefcase },
    { id: 'colleges', label: '🥉 Education & Admissions', icon: GraduationCap },
    { id: 'real-estate', label: 'Real Estate & Land', icon: Home },
    { id: 'tech-saas', label: 'Tech, AI & SaaS', icon: Cpu },
    { id: 'business-hub', label: 'Business & MSME', icon: Building },
    { id: 'automobiles', label: 'Automobiles & EVs', icon: Car },
    { id: 'health', label: 'Health & Ayushman', icon: HeartPulse },
    { id: 'travel', label: 'Travel & IRCTC', icon: Compass },
    { id: 'schemes', label: 'Govt Schemes', icon: Landmark },
    { id: 'exams', label: 'Exams & Admit Cards', icon: PenSquare },
    { id: 'tools', label: 'Calculators', icon: Calculator },
    { id: 'ai-utilities', label: 'AI Utilities', icon: Bot, isSpecial: true },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeaderSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenUnifiedSearch) {
      onOpenUnifiedSearch();
    } else if (headerSearchQuery.trim()) {
      const q = headerSearchQuery.toLowerCase();
      if (q.includes('property') || q.includes('flat') || q.includes('land') || q.includes('registry') || q.includes('dakhil') || q.includes('rera')) setActiveTab('real-estate');
      else if (q.includes('saas') || q.includes('chatgpt') || q.includes('hosting') || q.includes('vpn') || q.includes('software')) setActiveTab('tech-saas');
      else if (q.includes('business') || q.includes('gst') || q.includes('msme') || q.includes('udyam') || q.includes('pmegp') || q.includes('startup')) setActiveTab('business-hub');
      else if (q.includes('car') || q.includes('bike') || q.includes('vehicle') || q.includes('ev') || q.includes('parivahan') || q.includes('challan') || q.includes('licence') || q.includes('dl')) setActiveTab('automobiles');
      else if (q.includes('health') || q.includes('hospital') || q.includes('ayushman') || q.includes('medicine') || q.includes('abha') || q.includes('doctor') || q.includes('bmi')) setActiveTab('health');
      else if (q.includes('travel') || q.includes('irctc') || q.includes('tatkal') || q.includes('train') || q.includes('flight') || q.includes('hotel') || q.includes('passport') || q.includes('digiyatra')) setActiveTab('travel');
      else if (q.includes('finance') || q.includes('loan') || q.includes('credit') || q.includes('insurance') || q.includes('fd') || q.includes('mutual')) setActiveTab('finance-insurance');
      else if (q.includes('scheme') || q.includes('kisan') || q.includes('yojana')) setActiveTab('schemes');
      else if (q.includes('scholarship')) setActiveTab('scholarships');
      else if (q.includes('college') || q.includes('university') || q.includes('admission') || q.includes('course')) setActiveTab('colleges');
      else if (q.includes('exam') || q.includes('gate') || q.includes('upsc') || q.includes('neet') || q.includes('bpsc')) setActiveTab('exams');
      else if (q.includes('calc') || q.includes('emi') || q.includes('tax')) setActiveTab('tools');
      else if (q.includes('ai') || q.includes('resume')) setActiveTab('ai-utilities');
      else setActiveTab('jobs');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* ⚠️ Non-Government Independent Portal Legal Statement */}
      <div className="bg-slate-900 text-amber-200 text-[10px] sm:text-[11px] py-1 px-3 sm:px-6 font-medium border-b border-slate-800 flex flex-wrap items-center justify-between gap-1.5">
        <div className="flex items-center space-x-1.5 flex-1 min-w-[240px]">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="line-clamp-1 sm:line-clamp-none">
            <strong className="text-amber-300">BharatSeva:</strong> Independent citizen information & public utility directory. <strong>Not an official government portal.</strong>
          </span>
          <button
            onClick={onOpenLegalModal}
            className="text-amber-300 hover:text-white underline font-bold cursor-pointer shrink-0 ml-1"
          >
            Terms & Disclaimer
          </button>
        </div>

        <div className="flex items-center space-x-2 shrink-0 ml-auto text-[10px]">
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-slate-200 font-bold hover:underline cursor-pointer"
            >
              CMS Login
            </button>
          )}
          <span>•</span>
          <button
            onClick={onOpenInstallModal}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-2 py-0.5 rounded-full flex items-center gap-1 cursor-pointer shadow-2xs"
          >
            <Download className="w-3 h-3" />
            <span>Install App</span>
          </button>
        </div>
      </div>

      {/* 🚀 High-CPM Direct Monetization Opportunity Ribbon */}
      <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 shadow-xs font-semibold flex items-center justify-between gap-2">
        <a
          href="https://omg10.com/4/11640571"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline w-full justify-center sm:justify-start"
        >
          <span className="bg-white text-rose-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shrink-0 animate-pulse shadow-xs">
            <Zap className="w-3 h-3 fill-rose-600" />
            Special Alert
          </span>
          <span className="truncate">
            ⚡ <strong>Candidate Career & Educational Grant 2026:</strong> Direct Fast-Track Server & Verified Opportunities Portal
          </span>
          <ExternalLink className="w-3.5 h-3.5 shrink-0 hidden sm:inline opacity-90" />
        </a>
        <a
          href="https://omg10.com/4/11640571"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/20 hover:bg-white/30 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-lg shrink-0 hidden md:flex items-center gap-1 transition"
        >
          <span>Open Portal</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Main Top Header Bar: Logo + Global Search + Language + Bell + Login/Signup */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo with Saffron & Green Indian Motifs */}
        <div
          onClick={() => handleTabClick('home')}
          className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group shrink-0 select-none"
        >
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform border border-blue-800/40">
            {/* Indian Flag Tricolor Mini Accent Dots */}
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white shadow-xs"></span>
            <Landmark className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-blue-950 block leading-tight">
                Bharat<span className="text-amber-600">Seva</span>
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 tracking-wide block leading-none mt-0.5">
              Sahi Jankari, Sahi Faisla
            </span>
          </div>
        </div>

        {/* Global Search Bar in Header */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <form onSubmit={handleHeaderSearchSubmit} className="relative">
            <input
              type="text"
              value={headerSearchQuery}
              onChange={(e) => setHeaderSearchQuery(e.target.value)}
              onClick={() => onOpenUnifiedSearch && onOpenUnifiedSearch()}
              placeholder="Search schemes, scholarships, colleges, exams, tools..."
              className="w-full pl-4 pr-10 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs sm:text-sm text-slate-900 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="absolute right-3 top-2.5 text-slate-400 hover:text-blue-900 cursor-pointer transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Controls: Language + Notifications + Login/Signup */}
        <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center space-x-1 transition cursor-pointer"
            >
              <span>{selectedLanguage}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                {['English', 'हिंदी (Hindi)', 'বাংলা (Bengali)', 'मराठी (Marathi)'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLanguage(lang.split(' ')[0]);
                      setLangDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-900 font-medium cursor-pointer"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bell Notification Icon */}
          <button
            onClick={() => onOpenAlertModal && onOpenAlertModal()}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center relative transition cursor-pointer"
            title="Job & Scheme Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          </button>

          {/* Login / Sign Up Button (Navy Pill) */}
          <button
            onClick={() => handleTabClick('dashboard')}
            className="px-3.5 sm:px-5 py-2 bg-gradient-to-r from-blue-900 to-indigo-950 hover:from-blue-950 hover:to-slate-950 text-white text-xs sm:text-sm font-bold rounded-full shadow-sm flex items-center space-x-1.5 sm:space-x-2 transition-all cursor-pointer hover:shadow-md"
          >
            <User className="w-4 h-4 text-blue-200" />
            <span>Login / Sign Up</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Secondary Main Navigation Bar (Clean horizontal pill row matching the design reference) */}
      <div className="hidden md:block bg-slate-50/90 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-1 py-1.5 overflow-x-auto scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                activeTab === item.id ||
                (item.id === 'finance' && activeTab === 'finance-insurance') ||
                (item.id === 'insurance' && activeTab === 'finance-insurance') ||
                (item.id === 'business' && activeTab === 'bharatseva-bihar');

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1.5 cursor-pointer select-none ${
                    isActive
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-slate-700 hover:text-blue-900 hover:bg-slate-200/70'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isActive ? 'text-white' : item.isSpecial ? 'text-indigo-600' : 'text-slate-500'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Dropdown for Small Screens */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 p-4 space-y-3 animate-in slide-in-from-top-2 duration-150 shadow-xl max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleHeaderSearchSubmit} className="relative mb-3">
            <input
              type="text"
              value={headerSearchQuery}
              onChange={(e) => setHeaderSearchQuery(e.target.value)}
              placeholder="Search schemes, exams, colleges..."
              className="w-full pl-4 pr-10 py-2.5 bg-slate-50 text-xs text-slate-900 border border-slate-200 rounded-full"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-slate-400">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`p-3 rounded-2xl border text-left font-bold text-xs flex items-center space-x-2 transition cursor-pointer ${
                    isActive
                      ? 'bg-blue-900 text-white border-blue-900'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-900'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenDailyRewards) onOpenDailyRewards();
              }}
              className="text-amber-700 flex items-center gap-1"
            >
              <span>🪙 {coins} Coins Rewards</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLegalModal();
              }}
              className="text-slate-500 hover:underline"
            >
              Legal & Terms
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
