import React, { useState, useMemo } from 'react';
import {
  Download,
  Search,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Building2,
  FileCheck,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Filter,
  Layers,
  ChevronRight,
  Info,
  Clock,
} from 'lucide-react';
import { AdmitCardItem, initialAdmitCardsData } from '../data/admitCardsData';
import { LiveSyncBanner } from './LiveSyncBanner';

interface AdmitCardsTabProps {
  onOpenAlertModal?: () => void;
  admitCards?: AdmitCardItem[];
  onFetchLiveUpdates?: () => void;
  isSyncingLive?: boolean;
  lastSyncedTime?: string | null;
}

export const AdmitCardsTab: React.FC<AdmitCardsTabProps> = ({
  onOpenAlertModal,
  admitCards,
  onFetchLiveUpdates,
  isSyncingLive = false,
  lastSyncedTime,
}) => {
  const admitCardsList = admitCards || initialAdmitCardsData;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'SSC',
    'Railway',
    'Banking',
    'UPSC',
    'BPSC',
    'Bihar Police',
    'Teaching',
    'Defence',
    'State exams',
  ];

  const filteredAdmitCards = useMemo(() => {
    return admitCardsList.filter((card) => {
      const matchesCategory =
        selectedCategory === 'All' || card.category === selectedCategory;
      const matchesSearch =
        card.examName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.admitCardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.organization.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [admitCardsList, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Dynamic Live Sync Banner */}
      {onFetchLiveUpdates && (
        <LiveSyncBanner
          onFetchLiveUpdates={onFetchLiveUpdates}
          isSyncingLive={isSyncingLive}
          lastSyncedTime={lastSyncedTime}
        />
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-500/30 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30 text-xs font-black uppercase tracking-wider">
            <span>🎫 DIRECT HALL TICKET PORTAL</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Government Exam Admit Cards & Call Letters
          </h1>

          <p className="text-xs sm:text-sm text-purple-200/90 max-w-2xl leading-relaxed font-medium">
            Verified download links for E-Admit Cards, CBT Hall Tickets, Physical Test Call Letters, and Exam City Intimation Slips across BPSC, Bihar Police, SSC, Railways, Banking, UPSC, and State Commissions.
          </p>

          {/* Quick Alert Banner trigger */}
          {onOpenAlertModal && (
            <div className="pt-2">
              <button
                onClick={onOpenAlertModal}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition cursor-pointer flex items-center space-x-2 shadow-md"
              >
                <span>🔔 Get Instant Admit Card Alerts on WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search admit card by exam name (e.g. BPSC 71st, CSBC Police, SSC CGL...)"
            className="w-full bg-white border border-slate-300 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm font-medium text-slate-800 focus:ring-2 focus:ring-purple-500 focus:outline-hidden shadow-2xs"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const count =
              cat === 'All'
                ? initialAdmitCardsData.length
                : initialAdmitCardsData.filter((c) => c.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition cursor-pointer flex items-center space-x-2 ${
                  isActive
                    ? 'bg-purple-900 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] ${
                    isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards List showing the explicit flow: Exam -> Admit Card -> Download Link */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h2 className="text-lg font-black text-slate-900 flex items-center space-x-2">
            <span>Active E-Admit Cards ({filteredAdmitCards.length})</span>
          </h2>
          <span className="text-xs text-slate-500 font-bold">
            Flow: Exam → Admit Card → Download Official Link
          </span>
        </div>

        {filteredAdmitCards.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-3">
            <Info className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-extrabold text-slate-800 text-sm">
              No admit cards found for '{selectedCategory}'
            </h3>
            <p className="text-xs text-slate-500">
              Try switching category or resetting search query.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredAdmitCards.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs hover:shadow-md transition space-y-4 flex flex-col justify-between"
              >
                {/* Flow Display Header */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-1 bg-purple-100 text-purple-950 font-black text-[10px] rounded-lg uppercase tracking-wider">
                      {item.category} • {item.organization}
                    </span>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                        item.status === 'Live Download'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 animate-pulse'
                          : 'bg-blue-100 text-blue-900'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Explicit Exam -> Admit Card Step Flow Banner */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                    {/* Step 1: Exam */}
                    <div className="flex items-start space-x-2">
                      <span className="px-2 py-0.5 bg-slate-200 text-slate-800 text-[9px] font-black rounded shrink-0">
                        EXAM
                      </span>
                      <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                        {item.examName}
                      </h3>
                    </div>

                    <div className="flex items-center justify-center text-slate-300 py-0.5">
                      <ArrowRight className="w-4 h-4 text-purple-600 rotate-90 sm:rotate-0" />
                    </div>

                    {/* Step 2: Admit Card */}
                    <div className="flex items-start space-x-2">
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-900 text-[9px] font-black rounded shrink-0">
                        ADMIT CARD
                      </span>
                      <h4 className="text-xs font-extrabold text-purple-950 leading-snug">
                        {item.admitCardName}
                      </h4>
                    </div>
                  </div>

                  {/* Dates & Instructions */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-purple-50/60 p-2.5 rounded-xl border border-purple-100 space-y-0.5">
                      <span className="text-[10px] text-purple-800 font-bold uppercase block">
                        Release Date
                      </span>
                      <strong className="text-purple-950 text-xs block">{item.releaseDate}</strong>
                    </div>

                    <div className="bg-blue-50/60 p-2.5 rounded-xl border border-blue-100 space-y-0.5">
                      <span className="text-[10px] text-blue-800 font-bold uppercase block">
                        Exam Date
                      </span>
                      <strong className="text-blue-950 text-xs block">{item.examDate}</strong>
                    </div>
                  </div>

                  {/* Instructions Bullet points */}
                  {item.instructions.length > 0 && (
                    <div className="text-[11px] text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl">
                      <span className="font-extrabold text-slate-800 block text-[10px] uppercase">
                        Important Hall Ticket Instructions:
                      </span>
                      {item.instructions.map((inst, idx) => (
                        <p key={idx} className="flex items-start space-x-1.5">
                          <span className="text-teal-600 font-bold">•</span>
                          <span>{inst}</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Step 3: Download Official Link Button */}
                <div className="pt-3 border-t border-slate-100">
                  <a
                    href={item.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-purple-900 to-indigo-900 hover:from-purple-800 hover:to-indigo-800 text-white font-black py-3 px-4 rounded-xl text-xs transition cursor-pointer flex items-center justify-center space-x-2 shadow-md"
                  >
                    <Download className="w-4 h-4 text-amber-300" />
                    <span>Download Official Admit Card</span>
                    <ExternalLink className="w-3.5 h-3.5 text-purple-200" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
