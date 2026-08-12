import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  AlertTriangle,
  GraduationCap,
  ExternalLink,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Building2,
  BookOpen,
  DollarSign,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { AdmissionItem, College } from '../types';
import { AdmissionDetailPage } from './AdmissionDetailPage';

interface AdmissionDirectoryProps {
  admissions: AdmissionItem[];
  colleges?: College[];
  onSelectCollege?: (college: College) => void;
}

export const AdmissionDirectory: React.FC<AdmissionDirectoryProps> = ({
  admissions,
  colleges = [],
  onSelectCollege,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'current' | 'upcoming' | 'open' | 'alerts'>('all');
  const [selectedDegree, setSelectedDegree] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedExam, setSelectedExam] = useState<string>('All');

  // Detail Modal State
  const [selectedAdmission, setSelectedAdmission] = useState<AdmissionItem | null>(null);

  const degreeOptions = ['All', 'B.Tech', 'BCA', 'BBA', 'B.Sc', 'BA', 'MBA', 'MCA', 'M.Tech', 'MBBS', 'Diploma/Polytechnic'];
  const stateOptions = ['All', 'Bihar', 'All India', 'Delhi', 'Uttar Pradesh'];
  const examOptions = ['All', 'JEE Advanced', 'JEE Main', 'NEET UG', 'CAT', 'GATE', 'CUET UG', 'DCECE', 'PUCET'];

  const filteredAdmissions = useMemo(() => {
    return admissions.filter((adm) => {
      // Tab Filter
      if (activeTab === 'current' && adm.status !== 'Open') return false;
      if (activeTab === 'upcoming' && adm.status !== 'Upcoming') return false;
      if (activeTab === 'open' && adm.status !== 'Open') return false;
      if (activeTab === 'alerts' && adm.status !== 'Closing Soon' && adm.daysLeft > 10) return false;

      // Search Query
      const matchesSearch =
        searchTerm === '' ||
        adm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adm.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adm.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adm.entranceExam.toLowerCase().includes(searchTerm.toLowerCase());

      // Degree Filter
      const matchesDegree = selectedDegree === 'All' || adm.degree === selectedDegree;

      // State Filter
      const matchesState = selectedState === 'All' || adm.state === selectedState;

      // Exam Filter
      const matchesExam =
        selectedExam === 'All' || adm.entranceExam.toLowerCase().includes(selectedExam.toLowerCase());

      return matchesSearch && matchesDegree && matchesState && matchesExam;
    });
  }, [admissions, activeTab, searchTerm, selectedDegree, selectedState, selectedExam]);

  const getStatusBadge = (status: AdmissionItem['status']) => {
    switch (status) {
      case 'Open':
        return <span className="bg-emerald-500 text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 animate-pulse"><span className="w-1.5 h-1.5 rounded-full bg-white"></span> Open</span>;
      case 'Closing Soon':
        return <span className="bg-amber-500 text-amber-950 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1"><Clock className="w-3 h-3" /> Closing Soon</span>;
      case 'Upcoming':
        return <span className="bg-blue-500 text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">Upcoming</span>;
      case 'Closed':
        return <span className="bg-slate-600 text-slate-200 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">Closed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Directory Hero Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-950 text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-indigo-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="bg-amber-400 text-amber-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Live Admission Directory 2026 ⭐⭐⭐⭐⭐
            </span>
            <span className="text-xs text-slate-300 font-medium">
              Verified University & College Application Windows, Cutoffs & Links
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
            Central & State Admission Notices Directory
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed mb-6">
            Track current admissions, upcoming drives, open application forms, and last-date alerts for B.Tech, BCA, BBA, B.Sc, MBA, MCA, MBBS, and Diploma courses across Bihar & India.
          </p>

          {/* Search Input */}
          <div className="relative max-w-3xl">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search admission drive (e.g., IIT Patna B.Tech, BCECE Engineering, Patna University BCA, AIIMS MBBS)..."
              className="w-full bg-white text-slate-900 placeholder-slate-400 font-medium text-sm sm:text-base pl-12 pr-4 py-3.5 rounded-2xl shadow-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </section>

      {/* Directory Tab Bar */}
      <div className="bg-white border-b border-slate-200 shadow-2xs sticky top-14 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto scrollbar-none py-2.5">
          {[
            { id: 'all', label: 'All Admissions', count: admissions.length },
            { id: 'current', label: 'Current Admissions', count: admissions.filter(a => a.status === 'Open').length },
            { id: 'upcoming', label: 'Upcoming Drives', count: admissions.filter(a => a.status === 'Upcoming').length },
            { id: 'open', label: 'Open Applications', count: admissions.filter(a => a.status === 'Open').length },
            { id: 'alerts', label: '🚨 Last-Date Alerts', count: admissions.filter(a => a.status === 'Closing Soon' || a.daysLeft <= 10).length },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-indigo-800 text-white' : 'bg-slate-200 text-slate-800'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Filters Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Degree Level</label>
              <select
                value={selectedDegree}
                onChange={(e) => setSelectedDegree(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {degreeOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">State / Domicile</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {stateOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Entrance Exam</label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {examOptions.map((ex) => (
                  <option key={ex} value={ex}>
                    {ex}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm font-bold text-slate-800">
            Showing <span className="text-indigo-600 font-extrabold">{filteredAdmissions.length}</span> Active Admission Drives
          </div>
          {(selectedDegree !== 'All' || selectedState !== 'All' || selectedExam !== 'All' || searchTerm !== '') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDegree('All');
                setSelectedState('All');
                setSelectedExam('All');
              }}
              className="text-xs font-bold text-indigo-600 underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Admission Cards List */}
        <div className="space-y-4">
          {filteredAdmissions.map((adm) => (
            <div
              key={adm.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Left Info Column */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {getStatusBadge(adm.status)}
                    <span className="bg-indigo-50 text-indigo-800 font-extrabold text-[11px] px-2.5 py-0.5 rounded border border-indigo-100">
                      {adm.degree} • {adm.stream}
                    </span>
                    <span className="bg-slate-100 text-slate-700 font-semibold text-[11px] px-2.5 py-0.5 rounded flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-500" />
                      {adm.collegeName}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                    {adm.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {adm.overview}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-2">
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-slate-500 font-bold block text-[10px] uppercase">Eligibility</span>
                      <span className="text-slate-800 font-medium truncate block">{adm.eligibilitySummary}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-slate-500 font-bold block text-[10px] uppercase">Application Fee</span>
                      <span className="text-slate-800 font-bold block">{adm.appFeeText}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-slate-500 font-bold block text-[10px] uppercase">Qualifying Exam</span>
                      <span className="text-indigo-700 font-bold block">{adm.entranceExam}</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Column */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 justify-center min-w-[200px]">
                  {adm.daysLeft > 0 && (
                    <div className="bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold p-2 rounded-xl text-center flex items-center justify-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{adm.daysLeft} Days Remaining</span>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedAdmission(adm)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span>Full Admission Guide</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <a
                    href={adm.officialAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2 px-3 rounded-xl transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Official Application Link</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Admission Detail Page Modal */}
      {selectedAdmission && (
        <AdmissionDetailPage
          admission={selectedAdmission}
          onClose={() => setSelectedAdmission(null)}
          collegesList={colleges}
          onSelectCollege={onSelectCollege}
        />
      )}
    </div>
  );
};
