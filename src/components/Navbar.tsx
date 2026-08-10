import React, { useState } from 'react';
import {
  Landmark,
  House,
  FileCheck,
  GraduationCap,
  Building2,
  Briefcase,
  PenSquare,
  Hourglass,
  UserCheck,
  Bot,
  Menu,
  X,
  MapPin,
  Sparkles,
  Newspaper,
  Layers,
  Download,
  AlertTriangle,
  ShieldCheck,
  Bell,
  Ticket,
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
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: House },
    { id: 'current-affairs', label: "Current Affairs", icon: Newspaper, highlight: true },
    { id: 'jobs-for-you', label: 'Jobs For You', icon: Sparkles },
    { id: 'jobs', label: 'Govt Jobs', icon: Briefcase },
    { id: 'deadlines', label: 'Closing Soon 🚨', icon: Hourglass },
    { id: 'admit-cards', label: 'Admit Cards 🎫', icon: Ticket },
    { id: 'exams', label: 'Exams', icon: PenSquare },
    { id: 'bharatseva-bihar', label: 'Bihar Hub', icon: Landmark },
    { id: 'services', label: 'Services', icon: FileCheck },
    { id: 'schemes', label: 'Schemes', icon: Building2 },
    { id: 'dashboard', label: 'Dashboard', icon: UserCheck },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Persistent Non-Government Portal Disclaimer Bar */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 text-amber-200 text-[11px] py-1.5 px-4 font-semibold border-b border-amber-800/60 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            <strong className="text-amber-300">INDIVIDUAL PLATFORM NOTICE:</strong> BharatSeva is an individual, independent citizen information portal and is <strong>NOT an official government portal</strong> or affiliated with any government agency.
          </span>
          <button
            onClick={onOpenLegalModal}
            className="text-amber-300 hover:text-white underline font-bold cursor-pointer ml-1"
          >
            Privacy Notice & Terms
          </button>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={onOpenInstallModal}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-2xs transition flex items-center space-x-1 cursor-pointer"
          >
            <Download className="w-3 h-3" />
            <span>Install App</span>
          </button>

          <button
            onClick={onOpenLegalModal}
            className="text-slate-300 hover:text-white text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 transition cursor-pointer flex items-center space-x-1"
          >
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Legal Notice</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleTabClick('home')}
          className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-900 to-teal-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Landmark className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-900 via-teal-800 to-teal-700 bg-clip-text text-transparent">
              BharatSeva
            </span>
            <span className="block text-[10px] sm:text-xs font-semibold text-slate-500 tracking-wider">
              CITIZEN SERVICES & JOBS HUB
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`px-3 py-2 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 ${
                  isActive
                    ? 'text-blue-900 bg-blue-50 border border-blue-200 shadow-2xs'
                    : item.highlight
                    ? 'text-teal-900 bg-teal-50 border border-teal-200 hover:bg-teal-100'
                    : 'text-slate-600 hover:text-blue-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${item.highlight ? 'text-teal-600 animate-pulse' : ''}`} />
                <span>{item.label}</span>
                {item.highlight && (
                  <span className="bg-teal-600 text-white text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider font-extrabold">
                    NEW
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Job Alerts Button */}
          {onOpenAlertModal && (
            <button
              onClick={onOpenAlertModal}
              className="inline-flex items-center space-x-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 px-3 py-2.5 rounded-xl font-black text-xs transition cursor-pointer shadow-xs"
              title="Job & Exam Alerts"
            >
              <Bell className="w-4 h-4 text-slate-950 animate-bounce" />
              <span className="hidden md:inline">Job Alerts</span>
            </button>
          )}

          {/* Install App Button on header */}
          <button
            onClick={onOpenInstallModal}
            className="hidden lg:inline-flex items-center space-x-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 px-3 py-2 rounded-xl font-black text-xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-700" />
            <span>Install App</span>
          </button>

          {/* Jurisdiction Selector */}
          <div className="relative hidden sm:flex items-center">
            <div className="relative">
              <select
                value={selectedJurisdiction}
                onChange={(e) => setSelectedJurisdiction(e.target.value as JurisdictionState)}
                className="bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold rounded-xl pl-8 pr-3 py-2.5 focus:ring-2 focus:ring-teal-500 focus:outline-hidden cursor-pointer shadow-2xs"
              >
                <option value="Bihar">📍 Bihar (Active)</option>
                <option value="All India">🇮🇳 All India</option>
                <option value="Delhi">📍 Delhi</option>
                <option value="Uttar Pradesh">📍 Uttar Pradesh</option>
                <option value="Maharashtra">📍 Maharashtra</option>
              </select>
              <MapPin className="w-3.5 h-3.5 text-teal-600 absolute left-2.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* AI Assistant Button */}
          <button
            onClick={onOpenAiModal}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-3 sm:px-3.5 py-2.5 rounded-xl font-bold text-xs shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Bot className="w-4 h-4 animate-bounce" />
            <span className="hidden sm:inline">AI Assistant</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 mb-2 flex items-center justify-between text-xs">
            <span className="font-extrabold text-amber-900">Install BharatSeva Web App</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInstallModal();
              }}
              className="px-3 py-1 bg-amber-700 text-white font-black rounded-xl text-[11px]"
            >
              Install
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`p-3 rounded-2xl font-bold text-xs text-left transition flex items-center space-x-2 cursor-pointer ${
                    isActive
                      ? 'bg-blue-900 text-white'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLegalModal();
              }}
              className="hover:text-slate-900 underline"
            >
              Privacy Policy & Terms
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLegalModal();
              }}
              className="hover:text-slate-900 underline"
            >
              Non-Gov Disclaimer
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
