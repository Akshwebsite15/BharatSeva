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
} from 'lucide-react';
import { JurisdictionState } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedJurisdiction: JurisdictionState;
  setSelectedJurisdiction: (j: JurisdictionState) => void;
  onOpenAiModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedJurisdiction,
  setSelectedJurisdiction,
  onOpenAiModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: House },
    { id: 'services', label: 'Services', icon: FileCheck },
    { id: 'scholarships', label: 'Scholarships', icon: GraduationCap },
    { id: 'schemes', label: 'Schemes', icon: Building2 },
    { id: 'jobs', label: 'Govt Jobs', icon: Briefcase },
    { id: 'exams', label: 'Exams', icon: PenSquare },
    { id: 'deadlines', label: 'Deadlines', icon: Hourglass },
    { id: 'dashboard', label: 'Dashboard', icon: UserCheck },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
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
              UNIFIED CITIZEN PORTAL
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
                className={`px-3 py-2 rounded-xl font-semibold text-xs transition-all flex items-center space-x-1.5 ${
                  isActive
                    ? 'text-blue-900 bg-blue-50 border border-blue-200 shadow-2xs'
                    : 'text-slate-600 hover:text-blue-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Jurisdiction Dropdown + AI Assistant */}
        <div className="flex items-center space-x-2 sm:space-x-3">
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
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-3 sm:px-3.5 py-2.5 rounded-xl font-bold text-xs shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <Bot className="w-4 h-4 animate-bounce" />
            <span className="hidden sm:inline">AI Assistant</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-teal-400/30 text-teal-100 border border-teal-300/40">
              PRO
            </span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="xl:hidden p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 max-h-[85vh] overflow-y-auto shadow-xl animate-in fade-in slide-in-from-top-2">
          <div className="py-2.5 mb-2 border-b border-slate-100">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center">
              <MapPin className="w-3 h-3 mr-1 text-teal-600" />
              Select Jurisdiction
            </label>
            <select
              value={selectedJurisdiction}
              onChange={(e) => {
                setSelectedJurisdiction(e.target.value as JurisdictionState);
                setMobileMenuOpen(false);
              }}
              className="w-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
            >
              <option value="Bihar">📍 Bihar (Active)</option>
              <option value="All India">🇮🇳 All India</option>
              <option value="Delhi">📍 Delhi</option>
              <option value="Uttar Pradesh">📍 Uttar Pradesh</option>
              <option value="Maharashtra">📍 Maharashtra</option>
            </select>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm flex items-center space-x-3 transition ${
                  isActive
                    ? 'text-blue-900 bg-blue-50 border border-blue-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-5 h-5 text-teal-700" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => {
              onOpenAiModal();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-600 to-emerald-600 flex items-center justify-between shadow-md mt-2"
          >
            <div className="flex items-center space-x-3">
              <Bot className="w-5 h-5" />
              <span>AI Government Assistant</span>
            </div>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </button>
        </div>
      )}
    </header>
  );
};
