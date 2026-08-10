import React, { useState, useMemo } from 'react';
import {
  Landmark,
  Briefcase,
  FileText,
  Microscope,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  Award,
  Building2,
  ExternalLink,
  FileCheck,
  Sparkles,
  Clock,
  BookMarked,
  Download,
  Search,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { BiharModuleType, BiharModuleItem } from '../types';
import { biharModuleMeta, biharModuleItemsList } from '../data/bharatSevaBiharData';

interface BharatSevaBiharTabProps {
  onSaveItem: (title: string, type: 'Service' | 'Scholarship' | 'Scheme' | 'Job' | 'Exam') => void;
  onNavigateToIntentPage?: (slug: string) => void;
}

export const BharatSevaBiharTab: React.FC<BharatSevaBiharTabProps> = ({
  onSaveItem,
  onNavigateToIntentPage,
}) => {
  const [activeModule, setActiveModule] = useState<BiharModuleType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return biharModuleItemsList.filter((item) => {
      const matchModule = activeModule === 'all' || item.module === activeModule;
      const matchQuery =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryTag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchModule && matchQuery;
    });
  }, [activeModule, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-red-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-500/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>BHARATSEVA BIHAR CITIZEN SERVICE HUB</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              BharatSeva Bihar (भारतसेवा बिहार)
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Unified state gateway for 15 essential Bihar government modules: BPSC, BSSC, BTSC, Bihar Police, Teacher TRE 4.0, BSEB Board, RTPS Certificates, Medhasoft Scholarships, and Land Records.
            </p>
          </div>

          {/* Expansion Roadmap Indicator */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-2 text-xs shrink-0 max-w-xs">
            <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider block">
              🌐 STATE-BY-STATE EXPANSION:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 rounded-lg text-[10px] font-black">
                📍 Bihar (Active)
              </span>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded-lg text-[10px] font-bold border border-slate-700">
                Delhi (Next)
              </span>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded-lg text-[10px] font-bold border border-slate-700">
                UP (Next)
              </span>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded-lg text-[10px] font-bold border border-slate-700">
                Jharkhand
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Module Navigation */}
      <div className="space-y-4">
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-grow w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Bihar jobs, BPSC, BSSC, RTPS, Caste Certificate, Medhasoft..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            />
          </div>

          <button
            onClick={() => {
              setActiveModule('all');
              setSearchQuery('');
            }}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition cursor-pointer shrink-0"
          >
            Reset Filters
          </button>
        </div>

        {/* 15 Module Filter Buttons Grid */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveModule('all')}
            className={`px-4 py-2 rounded-2xl text-xs font-black shrink-0 transition cursor-pointer ${
              activeModule === 'all'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All 15 Bihar Modules ({biharModuleItemsList.length})
          </button>

          {biharModuleMeta.map((mod) => {
            const isSel = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold shrink-0 transition cursor-pointer border ${
                  isSel
                    ? 'bg-amber-800 text-white border-amber-800 shadow-md'
                    : 'bg-white text-slate-800 border-slate-200 hover:bg-amber-50'
                }`}
              >
                <span>{mod.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Module Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-black bg-amber-50 text-amber-900 border border-amber-200 uppercase tracking-wide">
                  {item.categoryTag}
                </span>
                {item.badgeText && (
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                    {item.badgeText}
                  </span>
                )}
              </div>

              <h3 className="text-base font-black text-slate-900 mb-2 leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                {item.description}
              </p>

              {/* Key Details Breakdown */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 mb-5 space-y-2 text-xs">
                {item.keyDetails.map((detail, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">{detail.label}:</span>
                    <strong className="text-slate-900 font-extrabold text-right">{detail.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-slate-400">
                Portal: {item.officialPortalName}
              </span>

              <a
                href={item.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-amber-900 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition shadow-2xs"
              >
                <span>{item.actionLabel || 'Open Official Link'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
