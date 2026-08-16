import React, { useState, useMemo } from 'react';
import {
  Building2,
  Search,
  MapPin,
  Award,
  Globe,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  BookOpen,
  Filter,
  GraduationCap,
} from 'lucide-react';
import { University, UniversityType } from '../types';
import { initialUniversitiesData } from '../data/collegesUniversitiesData';

interface UniversityDirectoryProps {
  universities?: University[];
  onSelectUniversity: (university: University) => void;
}

export const UniversityDirectory: React.FC<UniversityDirectoryProps> = ({
  universities = initialUniversitiesData,
  onSelectUniversity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTypeTab, setActiveTypeTab] = useState<'All' | UniversityType>('All');

  const filteredUniversities = useMemo(() => {
    return universities.filter((univ) => {
      // Search
      if (
        searchQuery &&
        !univ.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !univ.shortName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !univ.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Type
      if (activeTypeTab !== 'All' && univ.type !== activeTypeTab) {
        return false;
      }

      return true;
    });
  }, [universities, searchQuery, activeTypeTab]);

  const typeTabs: { id: 'All' | UniversityType; label: string; count: number }[] = [
    { id: 'All', label: 'All Universities', count: universities.length },
    { id: 'Central', label: 'Central Universities', count: universities.filter(u => u.type === 'Central').length },
    { id: 'State', label: 'State Universities', count: universities.filter(u => u.type === 'State').length },
    { id: 'Private', label: 'Private Universities', count: universities.filter(u => u.type === 'Private').length },
    { id: 'Deemed', label: 'Deemed Universities', count: universities.filter(u => u.type === 'Deemed').length },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -z-0" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-black text-indigo-300">
            <Building2 className="w-4 h-4 text-indigo-400" />
            <span>University Directory 2026</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            UGC Recognized Central, State & Deemed Universities
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Explore major Indian & Bihar universities governing constituent colleges, academic faculties, NIRF ranks, UGC accreditations, and official admission notices.
          </p>
        </div>
      </div>

      {/* Control & Tab Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-lg">
        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search university name, location (e.g. Patna University, BHU, DU, BITS Pilani, Nalanda)..."
            className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-1">
          {typeTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTypeTab(tab.id)}
              className={`px-4 py-2 text-xs font-black rounded-xl whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                activeTypeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${activeTypeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* University Grid */}
      {filteredUniversities.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <Building2 className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-black text-white">No Universities Found</h3>
          <p className="text-xs text-slate-400">Try adjusting your search keywords or switching category tabs.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredUniversities.map((univ) => (
            <div
              key={univ.id}
              onClick={() => onSelectUniversity(univ)}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-5 sm:p-6 shadow-xl transition-all duration-200 cursor-pointer group flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-xl p-2 border border-slate-700 shrink-0 flex items-center justify-center">
                      <Building2 className="w-7 h-7 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                        {univ.name}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                        {univ.location}
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 shrink-0">
                    {univ.type}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {univ.ugcRecognized && (
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-md font-bold">
                      UGC Approved
                    </span>
                  )}
                  {univ.nirfRank && (
                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-md font-bold">
                      NIRF Rank #{univ.nirfRank}
                    </span>
                  )}
                  <span className="text-slate-400 font-medium">
                    Estd. {univ.establishedYear}
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {univ.overview}
                </p>

                <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Affiliated Colleges:</span>
                  <span className="font-bold text-indigo-300">{univ.affiliatedCollegesCount}+ Constituent Colleges</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Govt Registry
                </span>

                <span className="text-indigo-400 font-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View University Details</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
