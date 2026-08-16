import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  GraduationCap,
  MapPin,
  Building2,
  DollarSign,
  Award,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  SlidersHorizontal,
  X,
  CheckCircle2,
  Sparkles,
  Star,
  ShieldCheck,
} from 'lucide-react';
import { College } from '../types';
import { initialCollegesData } from '../data/collegesUniversitiesData';

interface CollegeDirectoryProps {
  colleges?: College[];
  onSelectCollege: (college: College) => void;
}

export const CollegeDirectory: React.FC<CollegeDirectoryProps> = ({
  colleges = initialCollegesData,
  onSelectCollege,
}) => {
  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedDegree, setSelectedDegree] = useState<string>('All');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('All');
  const [selectedExam, setSelectedExam] = useState<string>('All');
  const [selectedFeeRange, setSelectedFeeRange] = useState<string>('All');

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Derived Filter Lists
  const stateOptions = useMemo(() => {
    const set = new Set(colleges.map((c) => c.state));
    return ['All', ...Array.from(set)];
  }, [colleges]);

  const typeOptions = ['All', 'Government', 'Central', 'Private', 'Deemed'];

  const degreeOptions = [
    'All',
    'B.Tech',
    'MBBS',
    'B.Sc',
    'B.A.',
    'B.Com',
    'LL.B',
    'M.Tech',
    'M.Sc',
    'PhD',
  ];

  const universityOptions = useMemo(() => {
    const set = new Set(colleges.map((c) => c.universityAffiliation));
    return ['All', ...Array.from(set)];
  }, [colleges]);

  const examOptions = useMemo(() => {
    const set = new Set<string>();
    colleges.forEach((c) => c.entranceExamsAccepted.forEach((e) => set.add(e)));
    return ['All', ...Array.from(set)];
  }, [colleges]);

  const feeRangeOptions = [
    'All',
    'Under ₹50k/yr',
    '₹50k - ₹1.5L/yr',
    '₹1.5L - ₹3L/yr',
    'Above ₹3L/yr',
  ];

  // Filtering Logic
  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      // Search Query
      if (
        searchQuery &&
        !college.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !college.shortName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !college.city.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !college.state.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // State Filter
      if (selectedState !== 'All' && college.state !== selectedState) {
        return false;
      }

      // Type Filter
      if (selectedType !== 'All') {
        if (selectedType === 'Government' && college.type !== 'Government' && college.type !== 'Central') return false;
        if (selectedType === 'Central' && college.type !== 'Central') return false;
        if (selectedType === 'Private' && college.type !== 'Private') return false;
        if (selectedType === 'Deemed' && college.type !== 'Deemed') return false;
      }

      // Degree Filter
      if (
        selectedDegree !== 'All' &&
        !college.degreesOffered.includes(selectedDegree)
      ) {
        return false;
      }

      // University Filter
      if (
        selectedUniversity !== 'All' &&
        college.universityAffiliation !== selectedUniversity
      ) {
        return false;
      }

      // Exam Filter
      if (
        selectedExam !== 'All' &&
        !college.entranceExamsAccepted.includes(selectedExam)
      ) {
        return false;
      }

      // Fee Range Filter
      if (
        selectedFeeRange !== 'All' &&
        college.feeRangeCategory !== selectedFeeRange
      ) {
        return false;
      }

      return true;
    });
  }, [
    colleges,
    searchQuery,
    selectedState,
    selectedType,
    selectedDegree,
    selectedUniversity,
    selectedExam,
    selectedFeeRange,
  ]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredColleges.length / itemsPerPage) || 1;
  const paginatedColleges = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredColleges.slice(start, start + itemsPerPage);
  }, [filteredColleges, currentPage, itemsPerPage]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedState('All');
    setSelectedType('All');
    setSelectedDegree('All');
    setSelectedUniversity('All');
    setSelectedExam('All');
    setSelectedFeeRange('All');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl -z-0" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-black text-teal-300">
            <GraduationCap className="w-4 h-4 text-teal-400" />
            <span>Colleges & Institutes Directory 2026</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Find Top Government & Private Colleges
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Search verified engineering, medical, law, agricultural, and central colleges with real-time NIRF rankings, fee structures, cutoff ranks, and placement reports.
          </p>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-lg">
        {/* Search Bar Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search college name, city (e.g. IIT Patna, AIIMS, BHU, Patna Science College)..."
            className="w-full pl-11 pr-10 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-medium text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Multi-Select Filters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
          {/* 1. State / City Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">State / City</label>
            <select
              value={selectedState}
              onChange={(e) => { setSelectedState(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-teal-500"
            >
              {stateOptions.map((st) => (
                <option key={st} value={st}>{st === 'All' ? 'All States' : st}</option>
              ))}
            </select>
          </div>

          {/* 2. Govt / Private Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Type</label>
            <select
              value={selectedType}
              onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-teal-500"
            >
              {typeOptions.map((t) => (
                <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>
              ))}
            </select>
          </div>

          {/* 3. Course / Degree Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Degree / Stream</label>
            <select
              value={selectedDegree}
              onChange={(e) => { setSelectedDegree(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-teal-500"
            >
              {degreeOptions.map((d) => (
                <option key={d} value={d}>{d === 'All' ? 'All Degrees' : d}</option>
              ))}
            </select>
          </div>

          {/* 4. University Affiliation Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">University</label>
            <select
              value={selectedUniversity}
              onChange={(e) => { setSelectedUniversity(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-teal-500"
            >
              {universityOptions.map((u) => (
                <option key={u} value={u}>{u === 'All' ? 'All Universities' : u}</option>
              ))}
            </select>
          </div>

          {/* 5. Entrance Exam Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Entrance Exam</label>
            <select
              value={selectedExam}
              onChange={(e) => { setSelectedExam(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-teal-500"
            >
              {examOptions.map((ex) => (
                <option key={ex} value={ex}>{ex === 'All' ? 'All Exams' : ex}</option>
              ))}
            </select>
          </div>

          {/* 6. Fees Filter Range */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Fees Range</label>
            <select
              value={selectedFeeRange}
              onChange={(e) => { setSelectedFeeRange(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-teal-500"
            >
              {feeRangeOptions.map((fr) => (
                <option key={fr} value={fr}>{fr === 'All' ? 'All Fees' : fr}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Info & Reset */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
          <span className="text-slate-400 font-medium">
            Showing <strong className="text-teal-400 font-bold">{filteredColleges.length}</strong> verified colleges
          </span>
          {(searchQuery || selectedState !== 'All' || selectedType !== 'All' || selectedDegree !== 'All' || selectedUniversity !== 'All' || selectedExam !== 'All' || selectedFeeRange !== 'All') && (
            <button
              onClick={resetFilters}
              className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
            >
              Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* College Cards Grid */}
      {paginatedColleges.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <GraduationCap className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-black text-white">No Colleges Found</h3>
          <p className="text-xs text-slate-400">Try loosening your search filters or resetting selected parameters.</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-teal-500 text-slate-950 font-bold text-xs rounded-xl shadow-md"
          >
            Clear Search & Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedColleges.map((college) => (
            <div
              key={college.id}
              onClick={() => onSelectCollege(college)}
              className="bg-slate-900 border border-slate-800 hover:border-teal-500/50 rounded-3xl p-5 sm:p-6 shadow-xl transition-all duration-200 cursor-pointer group flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              <div className="space-y-3">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-xl p-1.5 border border-slate-700 shrink-0 flex items-center justify-center overflow-hidden">
                      {college.logoUrl ? (
                        <img src={college.logoUrl} alt={college.name} className="w-full h-full object-contain" />
                      ) : (
                        <GraduationCap className="w-6 h-6 text-teal-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-white group-hover:text-teal-300 transition-colors line-clamp-1">
                        {college.name}
                      </h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-teal-400" />
                        {college.city}, {college.state}
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-teal-500/10 text-teal-300 border border-teal-500/30 shrink-0">
                    {college.type}
                  </span>
                </div>

                {/* Badge Rankings */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {college.nirfRank && (
                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-md font-bold">
                      NIRF #{college.nirfRank}
                    </span>
                  )}
                  {college.naacGrade && (
                    <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded-md font-bold">
                      NAAC {college.naacGrade}
                    </span>
                  )}
                  <span className="text-slate-400 font-medium truncate">
                    {college.universityAffiliation}
                  </span>
                </div>

                {/* Key Metrics Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-950/60 p-3 rounded-2xl border border-slate-800 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Avg Fee</span>
                    <span className="font-black text-amber-400">₹{(college.avgAnnualFeeInr / 100000).toFixed(2)}L / yr</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Highest CTC</span>
                    <span className="font-black text-emerald-400">₹{college.placement.highestPackageLpa} LPA</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Placement Rate</span>
                    <span className="font-black text-teal-400">{college.placement.placementRatePercent}%</span>
                  </div>
                </div>

                {/* Entrance Exam Badges */}
                <div className="flex items-center space-x-1.5 overflow-x-auto text-xs no-scrollbar">
                  <span className="text-slate-500 font-bold shrink-0">Exams:</span>
                  {college.entranceExamsAccepted.map((exam, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 rounded-md text-[11px] font-semibold shrink-0"
                    >
                      {exam}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Info
                </span>

                <span className="text-teal-400 font-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Full SEO College Page</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl text-xs">
          <span className="text-slate-400 font-medium">
            Page <strong className="text-white font-bold">{currentPage}</strong> of <strong className="text-white font-bold">{totalPages}</strong>
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-xl transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-xl font-black text-xs transition cursor-pointer ${
                  currentPage === i + 1
                    ? 'bg-teal-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-xl transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
