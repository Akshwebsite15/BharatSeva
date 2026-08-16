import React, { useState, useMemo } from 'react';
import {
  Search,
  ShieldCheck,
  FileCheck,
  Briefcase,
  PenSquare,
  GraduationCap,
  Building2,
  Hourglass,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Award,
  Users,
  CheckCircle2,
  Bell,
  Newspaper,
  Landmark,
  Layers,
  AlertTriangle,
  Calculator,
  Calendar,
  Clock,
  ExternalLink,
  ChevronRight,
  Download,
  FileText,
  X,
  Percent,
  Keyboard,
  Filter,
  Check,
  MapPin,
  BookOpen,
} from 'lucide-react';
import { JurisdictionState, GovJob, CurrentAffairsArticle, College, University } from '../types';
import { LiveSyncBanner } from './LiveSyncBanner';
import { StudentPowerHubSection } from './StudentPowerHubSection';
import { PublicServicesTrendingSection } from './PublicServicesTrendingSection';
import { calculateDaysRemaining, getDeadlineBadgeInfo } from '../utils/deadlineUtils';
import { formatFriendlyDate } from '../utils/dateUtils';
import {
  initialJobsData,
  initialServicesData,
  initialSchemesData,
  initialExamsData,
  initialDeadlinesData,
} from '../data/portalData';
import { initialCurrentAffairsArticles } from '../data/currentAffairsData';
import { initialCollegesData, initialUniversitiesData } from '../data/collegesUniversitiesData';

interface HomeTabProps {
  setActiveTab: (tab: string) => void;
  selectedJurisdiction: JurisdictionState;
  onGlobalSearch: (query: string) => void;
  jobs?: GovJob[];
  currentAffairsArticles?: CurrentAffairsArticle[];
  colleges?: College[];
  universities?: University[];
  onSelectCollege?: (college: College) => void;
  onSelectUniversity?: (university: University) => void;
  onViewJob?: (job: GovJob) => void;
  onFetchLiveUpdates?: () => void;
  isSyncingLive?: boolean;
  lastSyncedTime?: string | null;
  onOpenSpeedQuiz?: () => void;
  onOpenAgeCalculator?: () => void;
  onOpenPhotoTool?: () => void;
  onOpenStudyPlanner?: () => void;
  onOpenPublicToolModal?: (toolId?: string) => void;
  coins?: number;
  streakDays?: number;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  setActiveTab,
  selectedJurisdiction,
  onGlobalSearch,
  jobs,
  currentAffairsArticles,
  colleges,
  universities,
  onSelectCollege,
  onSelectUniversity,
  onViewJob,
  onFetchLiveUpdates,
  isSyncingLive = false,
  lastSyncedTime,
  onOpenSpeedQuiz,
  onOpenAgeCalculator,
  onOpenPhotoTool,
  onOpenStudyPlanner,
  onOpenPublicToolModal,
  coins = 100,
  streakDays = 3,
}) => {
  const jobsList = jobs || initialJobsData;
  const articlesList = currentAffairsArticles || initialCurrentAffairsArticles;
  const collegesList = colleges || initialCollegesData;
  const universitiesList = universities || initialUniversitiesData;
  const [searchInput, setSearchInput] = useState('');

  // Primary CTA Job Finder Quick State
  const [quickQual, setQuickQual] = useState('Graduate');
  const [quickState, setQuickState] = useState('Bihar');
  const [quickCategory, setQuickCategory] = useState('EBC');

  // Active Tool Modal
  const [activeToolModal, setActiveToolModal] = useState<
    'age-calc' | 'cgpa-calc' | 'typing-guide' | 'photo-guide' | null
  >(null);

  // Age Calculator State
  const [dob, setDob] = useState('2000-01-15');
  const [cutoffDate, setCutoffDate] = useState('2026-08-01');
  const [calcResult, setCalcResult] = useState<{ years: number; months: number; days: number } | null>(null);

  // CGPA Calculator State
  const [cgpaInput, setCgpaInput] = useState('8.4');

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchInput.trim()) {
      onGlobalSearch(searchInput.trim());
    }
  };

  const handleChipClick = (query: string) => {
    setSearchInput(query);
    onGlobalSearch(query);
  };

  const handleCalculateAge = () => {
    if (!dob || !cutoffDate) return;
    const d1 = new Date(dob);
    const d2 = new Date(cutoffDate);
    if (d1 > d2) return;

    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(d2.getFullYear(), d2.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setCalcResult({ years, months, days });
  };

  // Mock Admit Cards
  const admitCardsList = [
    {
      id: 'ac-1',
      title: 'Bihar Police Constable (CSBC) Written Exam Admit Card 2026',
      organization: 'CSBC Bihar',
      releaseDate: 'August 8, 2026',
      examDate: 'November 18, 2026',
      link: 'https://csbc.bih.nic.in',
      badge: 'LIVE DOWNLOAD',
    },
    {
      id: 'ac-2',
      title: 'SSC CGL Tier-1 Computer Based Test Hall Ticket',
      organization: 'Staff Selection Commission',
      releaseDate: 'August 5, 2026',
      examDate: 'September 2026',
      link: 'https://ssc.gov.in',
      badge: 'NEW RELEASE',
    },
    {
      id: 'ac-3',
      title: 'RRB Junior Engineer (JE) CBT-1 City Intimation & Admit Card',
      organization: 'Railway Recruitment Board',
      releaseDate: 'August 2, 2026',
      examDate: 'October 2026',
      link: 'https://rrbcdg.gov.in',
      badge: 'ACTIVE',
    },
    {
      id: 'ac-4',
      title: 'BSSC 2nd Inter Level Combined Exam Admit Card',
      organization: 'BSSC Bihar',
      releaseDate: 'July 28, 2026',
      examDate: 'December 2026',
      link: 'https://bssc.bihar.gov.in',
      badge: 'UPDATED',
    },
  ];

  // Mock Results
  const resultsList = [
    {
      id: 'res-1',
      title: 'BPSC 70th CCE Final Merit List & Cutoff Marks Declared',
      organization: 'Bihar Public Service Commission',
      declaredDate: 'August 9, 2026',
      cutoff: 'General: 91.5 | EBC: 84.0 | SC: 76.5',
      link: 'https://bpsc.bih.nic.in',
      status: 'Final Selection List Out',
    },
    {
      id: 'res-2',
      title: 'Bihar Police Sub-Inspector (SI / Daroga 2025) Final Result',
      organization: 'BPSSC Bihar',
      declaredDate: 'August 7, 2026',
      cutoff: 'Male: 142.4 | Female: 122.8',
      link: 'https://bpssc.bih.nic.in',
      status: 'Cutoff Released',
    },
    {
      id: 'res-3',
      title: 'SSC GD Constable Written Examination Scorecard & Physical Date',
      organization: 'SSC New Delhi',
      declaredDate: 'August 4, 2026',
      cutoff: 'State Wise Cutoff Uploaded',
      link: 'https://ssc.gov.in',
      status: 'Scorecard Active',
    },
    {
      id: 'res-4',
      title: 'BSEB Class 10th & 12th Special / Compartmental Result 2026',
      organization: 'Bihar School Examination Board',
      declaredDate: 'July 30, 2026',
      cutoff: 'Pass Percentage: 82.4%',
      link: 'https://results.biharboardonline.com',
      status: 'Marksheet Available',
    },
  ];

  // Dynamic Closing Soon calculation from live jobs data
  const dynamicClosingSoon = useMemo(() => {
    return [...jobsList]
      .map((job) => {
        const daysLeft = calculateDaysRemaining(job.deadlineDate);
        let badgeText = `${daysLeft} Days Left`;
        if (daysLeft === 0) badgeText = 'CLOSING TODAY';
        else if (daysLeft === 1) badgeText = 'CLOSING TOMORROW';

        return {
          job,
          title: job.title,
          daysLeft,
          badgeText,
          formattedDate: formatFriendlyDate(job.deadlineDate || ''),
          urgent: daysLeft <= 3,
        };
      })
      .filter((item) => item.daysLeft >= 0)
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 5);
  }, [jobsList]);

  const mostUrgentJob = dynamicClosingSoon[0];

  return (
    <div className="space-y-12">
      {/* 4. 🆕 TODAY'S UPDATES (Live Government Notification Ticker) */}
      <div className="bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-blue-500/10 border-y border-amber-500/20 py-2.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-3 text-xs sm:text-sm font-medium text-slate-800 overflow-x-auto whitespace-nowrap scrollbar-none">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-amber-500 text-slate-900 shrink-0 uppercase tracking-wide shadow-2xs">
            <Bell className="w-3 h-3 mr-1 animate-pulse" /> 🆕 TODAY'S UPDATES
          </span>
          <span className="text-slate-800 font-extrabold">
            • {mostUrgentJob ? `${mostUrgentJob.title}: Deadline ${mostUrgentJob.badgeText} (${mostUrgentJob.formattedDate})` : 'BPSC 71st CCE Notification: 1,245 Posts Application Active'}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-800 font-extrabold">
            • Bihar Police Constable CSBC Admit Cards Download Active for Nov 18 Exam
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-800 font-extrabold">
            • Bihar Post Matric Scholarship (PMS 2026-27) Portal Open for SC/ST/EBC
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-800 font-extrabold">
            • SSC CGL 2026 CBT Tier-1 Dates Announced (Sept 2026)
          </span>
        </div>
      </div>

      {/* 1. 🔎 FIND GOVERNMENT JOBS FOR ME (PRIMARY CTA HERO) */}
      <section className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-teal-950 text-white py-10 sm:py-14 px-4 sm:px-8 overflow-hidden shadow-2xl border border-teal-500/30">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-teal-400 text-slate-950 uppercase tracking-wider shadow-md">
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>PRIMARY JOB MATCH ENGINE • {selectedJurisdiction} & ALL INDIA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
            🔎 Find Government Jobs For Me
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Select your qualification, state, and category to instantly filter 1.2 Lakh+ active government vacancies with 100% accurate eligibility tagging.
          </p>

          {/* Quick Match Selectors Bar */}
          <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-white/20 max-w-3xl mx-auto text-left space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-black uppercase text-teal-300 mb-1">
                  🎓 Qualification
                </label>
                <select
                  value={quickQual}
                  onChange={(e) => setQuickQual(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-bold rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-teal-400 focus:outline-hidden"
                >
                  <option value="10th">10th Pass</option>
                  <option value="12th">12th Pass</option>
                  <option value="Graduate">Graduate (BA, B.Sc, B.Com)</option>
                  <option value="B.Tech">B.Tech / Engineering</option>
                  <option value="Diploma">Diploma / ITI</option>
                  <option value="Post Graduate">Post Graduate</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-teal-300 mb-1">
                  📍 State Quota
                </label>
                <select
                  value={quickState}
                  onChange={(e) => setQuickState(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-bold rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-teal-400 focus:outline-hidden"
                >
                  <option value="Bihar">Bihar Domicile</option>
                  <option value="All India">All India (Central Jobs)</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Delhi">Delhi / NCR</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-teal-300 mb-1">
                  🏷️ Category Quota
                </label>
                <select
                  value={quickCategory}
                  onChange={(e) => setQuickCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-bold rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-teal-400 focus:outline-hidden"
                >
                  <option value="UR">General / Unreserved</option>
                  <option value="EBC">EBC (Bihar)</option>
                  <option value="BC">BC / OBC</option>
                  <option value="SC">SC / ST</option>
                  <option value="EWS">EWS</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('jobs-for-you')}
              className="w-full bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black py-3.5 px-6 rounded-2xl text-sm transition shadow-lg flex items-center justify-center space-x-2 cursor-pointer transform hover:scale-[1.01]"
            >
              <Briefcase className="w-5 h-5" />
              <span>Find My 100% Eligible Jobs Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Global Keyword Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white p-2.5 rounded-2xl shadow-xl max-w-2xl mx-auto flex flex-col sm:flex-row items-center border border-slate-200 gap-2 text-slate-800 mt-4"
          >
            <div className="flex items-center w-full px-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Or search by title: BPSC 71st, Bihar police, Caste Certificate..."
                className="w-full px-3 py-2 text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-hidden bg-transparent font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-5 py-2.5 rounded-xl transition shrink-0 cursor-pointer text-xs"
            >
              Search
            </button>
          </form>

          {/* Popular Search Chips */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-300">
            <span className="text-slate-400 font-bold flex items-center text-[11px]">
              <TrendingUp className="w-3.5 h-3.5 mr-1 text-teal-400" /> Hot Searches:
            </span>
            {[
              'BPSC 71st CCE',
              'Bihar Police Constable',
              'Caste Certificate',
              'Post Matric Scholarship',
              'SSC CGL 2026',
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleChipClick(chip)}
                className="bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg text-slate-200 border border-white/10 transition cursor-pointer font-bold text-[11px]"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 DAILY STUDENT & ASPIRANT POWER HUB */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <StudentPowerHubSection
          onOpenSpeedQuiz={onOpenSpeedQuiz || (() => {})}
          onOpenAgeCalculator={onOpenAgeCalculator || (() => {})}
          onOpenPhotoTool={onOpenPhotoTool || (() => {})}
          onOpenStudyPlanner={onOpenStudyPlanner || (() => {})}
          coins={coins}
          streakDays={streakDays}
        />
      </div>

      {/* 🇮🇳 TRENDING CITIZEN SERVICES & PUBLIC STATUS UTILITIES HUB */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <PublicServicesTrendingSection
          onOpenPublicToolModal={onOpenPublicToolModal || (() => {})}
        />
      </div>

      {/* Dynamic Live Sync Banner */}
      {onFetchLiveUpdates && (
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <LiveSyncBanner
            onFetchLiveUpdates={onFetchLiveUpdates}
            isSyncingLive={isSyncingLive}
            lastSyncedTime={lastSyncedTime}
          />
        </div>
      )}

      {/* 🎓 HIGHER EDUCATION DIRECTORY (COLLEGES & UNIVERSITIES) */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4 space-y-4">
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-black text-teal-300">
                <GraduationCap className="w-4 h-4 text-teal-400" />
                <span>Higher Education Portal 2026</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Colleges & Universities Directory
              </h2>
              <p className="text-xs text-slate-300">
                Search government & private colleges, fees, cutoff ranks, entrance exams, and UGC universities.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('admissions')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>Admissions ⭐</span>
              </button>

              <button
                onClick={() => setActiveTab('courses')}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4 text-amber-950" />
                <span>Course Directory ⭐</span>
              </button>

              <button
                onClick={() => setActiveTab('colleges')}
                className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Colleges ({collegesList.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('universities')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
              >
                <Building2 className="w-4 h-4 text-indigo-400" />
                <span>Universities ({universitiesList.length})</span>
              </button>
            </div>
          </div>

          {/* Featured Top Colleges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {collegesList.slice(0, 3).map((college) => (
              <div
                key={college.id}
                onClick={() => {
                  if (onSelectCollege) onSelectCollege(college);
                  else setActiveTab('colleges');
                }}
                className="bg-slate-900/90 border border-slate-800 hover:border-teal-500/50 p-4 rounded-2xl shadow-md transition cursor-pointer group flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-teal-500/10 text-teal-300 border border-teal-500/30 text-[10px] font-black rounded uppercase">
                      {college.type}
                    </span>
                    <span className="text-[10px] text-amber-300 font-extrabold">NIRF #{college.nirfRank}</span>
                  </div>

                  <h3 className="text-sm font-extrabold text-white group-hover:text-teal-300 transition-colors line-clamp-1">
                    {college.name}
                  </h3>

                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    {college.city}, {college.state}
                  </p>

                  <div className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                    <span>Avg Fee: <strong className="text-amber-400">₹{(college.avgAnnualFeeInr / 100000).toFixed(1)}L/yr</strong></span>
                    <span>Highest CTC: <strong className="text-emerald-400">₹{college.placement.highestPackageLpa} LPA</strong></span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-teal-400">
                  <span>View 16-Section SEO Page</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 🔥 LATEST GOVERNMENT JOBS & 3. 🚨 CLOSING SOON (TWO COLUMN GRID) */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: 🔥 Latest Government Jobs (2 Cols wide on desktop) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
                🔥
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">Latest Government Jobs</h2>
            </div>
            <button
              onClick={() => setActiveTab('jobs')}
              className="text-xs font-extrabold text-blue-900 hover:underline flex items-center"
            >
              <span>View All 21k+ Jobs</span>
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {jobsList.slice(0, 4).map((job) => (
              <div
                key={job.id}
                onClick={() => setActiveTab('jobs')}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-400 transition cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-blue-900 text-[10px] font-black rounded-md uppercase">
                      {job.type} • {job.qualification}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{job.deadlineDate}</span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2">
                    {job.title}
                  </h3>

                  <p className="text-[11px] text-teal-800 font-bold">{job.vacancy}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-900">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 🚨 Closing Soon (1 Col wide) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-black">
                🚨
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">Closing Soon</h2>
            </div>
            <button
              onClick={() => setActiveTab('deadlines')}
              className="text-xs font-extrabold text-rose-700 hover:underline flex items-center"
            >
              <span>Tracker</span>
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </button>
          </div>

          <div className="space-y-3">
            {dynamicClosingSoon.length === 0 ? (
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                No immediate recruitment deadlines closing this week.
              </div>
            ) : (
              dynamicClosingSoon.map((dl, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (onViewJob) {
                      onViewJob(dl.job);
                    } else {
                      setActiveTab('deadlines');
                    }
                  }}
                  className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs hover:border-rose-400 hover:shadow-sm transition cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <h4 className="text-xs font-extrabold text-slate-900 line-clamp-1 hover:text-rose-700">
                      {dl.title}
                    </h4>
                    <p className="text-[10px] text-slate-500">Last Date: {dl.formattedDate}</p>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-black shrink-0 ${
                      dl.urgent
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}
                  >
                    {dl.badgeText}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 5. 🎫 LATEST ADMIT CARDS & 6. 🏆 LATEST RESULTS (TWO EQUAL COLS) */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 5. 🎫 Latest Admit Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-black">
                🎫
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">Latest Admit Cards</h2>
            </div>
            <button
              onClick={() => setActiveTab('admit-cards')}
              className="text-xs font-extrabold text-purple-900 hover:underline flex items-center"
            >
              <span>View All Admit Cards</span>
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </button>
          </div>

          <div className="space-y-3">
            {admitCardsList.map((card) => (
              <div
                key={card.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-900 text-[9px] font-black rounded uppercase">
                      {card.badge}
                    </span>
                    <span className="text-[10px] text-slate-400">{card.organization}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-[11px] text-slate-500">Exam Date: {card.examDate}</p>
                </div>

                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-purple-900 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition shrink-0 flex items-center space-x-1.5 w-full sm:w-auto justify-center"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* 6. 🏆 Latest Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                🏆
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">Latest Results & Cutoffs</h2>
            </div>
            <span className="text-xs text-slate-400 font-bold">Official Releases</span>
          </div>

          <div className="space-y-3">
            {resultsList.map((res) => (
              <div
                key={res.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 text-[9px] font-black rounded uppercase">
                      {res.status}
                    </span>
                    <span className="text-[10px] text-slate-400">{res.declaredDate}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                    {res.title}
                  </h3>
                  <p className="text-[11px] text-slate-600 font-bold">{res.cutoff}</p>
                </div>

                <a
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shrink-0 flex items-center space-x-1.5 w-full sm:w-auto justify-center"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Check Result</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. 📚 POPULAR EXAMS */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-black">
              📚
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">Popular Competitive Exams</h2>
          </div>
          <button
            onClick={() => setActiveTab('exams')}
            className="text-xs font-extrabold text-blue-900 hover:underline flex items-center"
          >
            <span>All Exams</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {initialExamsData.slice(0, 6).map((exam) => (
            <div
              key={exam.id}
              onClick={() => setActiveTab('exams')}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-teal-500 hover:shadow-md transition cursor-pointer text-center space-y-2 flex flex-col justify-between"
            >
              <div>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[9px] font-black rounded uppercase block mx-auto mb-2 w-fit">
                  {exam.category}
                </span>
                <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm line-clamp-2 leading-snug">
                  {exam.title}
                </h3>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1">
                <span className="text-[10px] text-teal-800 font-extrabold block">
                  {exam.examDate}
                </span>
                <span className="text-[9px] text-slate-400 block font-medium">
                  {exam.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. 📰 CURRENT AFFAIRS */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center font-black">
              📰
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">Today's Current Affairs & Daily Quiz</h2>
          </div>
          <button
            onClick={() => setActiveTab('current-affairs')}
            className="text-xs font-extrabold text-teal-800 hover:underline flex items-center"
          >
            <span>Read All & Quiz</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {articlesList.slice(0, 3).map((art) => (
            <div
              key={art.id}
              onClick={() => setActiveTab('current-affairs')}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition cursor-pointer flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="px-2.5 py-0.5 bg-teal-50 text-teal-900 border border-teal-200 rounded-full font-black uppercase">
                    {art.category}
                  </span>
                  <span className="text-slate-400">{art.date}</span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2">
                  {art.title}
                </h3>

                <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-800">
                <span>Read Key Analysis & Take Quiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. 🏛️ GOVERNMENT SERVICES & 10. 💰 GOVERNMENT SCHEMES */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 9. 🏛️ Government Services */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-black">
                🏛️
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">Government Services & RTPS</h2>
            </div>
            <button
              onClick={() => setActiveTab('services')}
              className="text-xs font-extrabold text-blue-900 hover:underline flex items-center"
            >
              <span>View Services</span>
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </button>
          </div>

          <div className="space-y-3">
            {initialServicesData.slice(0, 3).map((srv) => (
              <div
                key={srv.id}
                onClick={() => setActiveTab('services')}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition cursor-pointer flex items-center justify-between"
              >
                <div className="space-y-1">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-900 text-[9px] font-black rounded uppercase">
                    {srv.category} • {srv.processingTime}
                  </span>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                    {srv.title}
                  </h3>
                  <p className="text-[11px] text-slate-500">Official Portal Fee: {srv.fees}</p>
                </div>

                <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 10. 💰 Government Schemes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-black">
                💰
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">Welfare Schemes & Subsidies</h2>
            </div>
            <button
              onClick={() => setActiveTab('schemes')}
              className="text-xs font-extrabold text-emerald-800 hover:underline flex items-center"
            >
              <span>View Schemes</span>
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </button>
          </div>

          <div className="space-y-3">
            {initialSchemesData.slice(0, 3).map((schm) => (
              <div
                key={schm.id}
                onClick={() => setActiveTab('schemes')}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition cursor-pointer flex items-center justify-between"
              >
                <div className="space-y-1">
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-900 text-[9px] font-black rounded uppercase">
                    {schm.category} • DBT Direct Transfer
                  </span>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                    {schm.title}
                  </h3>
                  <p className="text-[11px] text-emerald-800 font-bold">{schm.benefits}</p>
                </div>

                <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 11. 🧮 TOOLS (CITIZEN & APPLICANT UTILITY CALCULATORS) */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black">
              🧮
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">
              Applicant Tools & Utility Calculators
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-bold">100% Free Tools</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tool 1: Age Calculator */}
          <div
            onClick={() => (onOpenAgeCalculator ? onOpenAgeCalculator() : setActiveToolModal('age-calc'))}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-indigo-500 hover:shadow-md transition cursor-pointer space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Govt Exam Age & Eligibility Calculator
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Calculate exact age and check OBC, SC/ST & PwD relaxation across 35+ SSC, UPSC & BPSC exams.
              </p>
            </div>
            <button className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-extrabold text-xs rounded-xl transition">
              Open Live Age Calculator
            </button>
          </div>

          {/* Tool 2: CGPA to Percentage */}
          <div
            onClick={() => setActiveToolModal('cgpa-calc')}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-teal-500 hover:shadow-md transition cursor-pointer space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <Percent className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                CGPA to Percentage Converter
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Convert CBSE 10th / University CGPA (10 point scale) to exact percentage for online forms.
              </p>
            </div>
            <button className="w-full py-2 bg-teal-50 hover:bg-teal-100 text-teal-900 font-extrabold text-xs rounded-xl transition">
              Open Converter
            </button>
          </div>

          {/* Tool 3: Typing Speed Standards */}
          <div
            onClick={() => setActiveToolModal('typing-guide')}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-purple-500 hover:shadow-md transition cursor-pointer space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <Keyboard className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Typing Speed & Font Checker
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Check required WPM & font (KrutiDev / Mangal Remix) for BSSC Clerk, High Court, and SSC Exams.
              </p>
            </div>
            <button className="w-full py-2 bg-purple-50 hover:bg-purple-100 text-purple-900 font-extrabold text-xs rounded-xl transition">
              Check Font Rules
            </button>
          </div>

          {/* Tool 4: Photo & Signature Resizer */}
          <div
            onClick={() => (onOpenPhotoTool ? onOpenPhotoTool() : setActiveToolModal('photo-guide'))}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-amber-500 hover:shadow-md transition cursor-pointer space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Photo & Sign Resizer & Spec Tool
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Resize, crop & compress JPG to exact 20-50 KB limits for SSC, CSBC, BPSC and NTA uploads.
              </p>
            </div>
            <button className="w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 font-extrabold text-xs rounded-xl transition">
              Open Image Resizer & Compressor
            </button>
          </div>
        </div>
      </section>

      {/* TOOL MODALS */}
      {activeToolModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden">
            <button
              onClick={() => setActiveToolModal(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Age Calculator Modal */}
            {activeToolModal === 'age-calc' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Government Exam Age Calculator
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Your Date of Birth:
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Exam Cut-off Date (as specified in notification):
                    </label>
                    <input
                      type="date"
                      value={cutoffDate}
                      onChange={(e) => setCutoffDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800"
                    />
                  </div>

                  <button
                    onClick={handleCalculateAge}
                    className="w-full py-3 bg-indigo-900 hover:bg-indigo-800 text-white font-extrabold rounded-xl transition cursor-pointer"
                  >
                    Calculate Age
                  </button>

                  {calcResult && (
                    <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl text-center space-y-1 animate-in zoom-in-95 duration-150">
                      <span className="text-[10px] font-black uppercase text-indigo-800">
                        EXACT AGE ON CUT-OFF DATE:
                      </span>
                      <div className="text-2xl font-black text-indigo-950">
                        {calcResult.years} Years, {calcResult.months} Months, {calcResult.days} Days
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CGPA Calculator Modal */}
            {activeToolModal === 'cgpa-calc' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-900 flex items-center justify-center font-black">
                    <Percent className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    CGPA to Percentage Converter
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Enter CGPA (10 Point Scale):
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={cgpaInput}
                      onChange={(e) => setCgpaInput(e.target.value)}
                      placeholder="e.g. 8.4"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 text-base"
                    />
                  </div>

                  <div className="bg-teal-50 border border-teal-200 p-4 rounded-2xl text-center space-y-1">
                    <span className="text-[10px] font-black uppercase text-teal-800">
                      EQUIVALENT PERCENTAGE (CGPA × 9.5):
                    </span>
                    <div className="text-3xl font-black text-teal-950">
                      {(parseFloat(cgpaInput || '0') * 9.5).toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Typing Guide Modal */}
            {activeToolModal === 'typing-guide' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center font-black">
                    <Keyboard className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Govt Exam Typing Test Requirements
                  </h3>
                </div>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block">BSSC Clerk & Panchayat Sachiv:</strong>
                    <span>Hindi Typing: 30 WPM (Mangal Font - Inscript Layout) | English: 35 WPM</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block">Patna High Court Assistant / Clerk:</strong>
                    <span>Hindi Typing: 30 WPM (KrutiDev 010) | English: 40 WPM</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block">SSC CHSL / CGL DEO:</strong>
                    <span>English Typing: 35 WPM (10,500 KDPH) | Hindi: 30 WPM (9,000 KDPH)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Photo Spec Guide Modal */}
            {activeToolModal === 'photo-guide' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-black">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Photo & Signature Upload Limits
                  </h3>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block">BPSC (Pre & Mains Forms):</strong>
                    <span>Photo: 25 KB - 50 KB (JPG) | Signature: 10 KB - 20 KB (Hindi & English separate)</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block">CSBC Bihar Police:</strong>
                    <span>Passport Photo: White/Light background, 20 KB - 50 KB | Signature: 10 KB - 20 KB</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block">SSC (Live Webcam Photo):</strong>
                    <span>SSC portal uses live webcam capture + digital signature upload (10 KB to 20 KB).</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
