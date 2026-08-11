import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  ShieldCheck,
  Bookmark,
  ExternalLink,
  ArrowRight,
  IndianRupee,
  Users,
  Award,
  Sparkles,
  Clock,
} from 'lucide-react';
import { GovJob, JurisdictionState } from '../types';
import { LiveSyncBanner } from './LiveSyncBanner';
import {
  getDeadlineBadgeInfo,
  calculateDaysRemaining,
  DeadlineCategory,
} from '../utils/deadlineUtils';

interface JobsTabProps {
  jobs: GovJob[];
  selectedJurisdiction: JurisdictionState;
  onViewJob: (job: GovJob) => void;
  onSaveJob: (title: string, type: 'Job') => void;
  onSwitchToJobsForYou?: () => void;
  onFetchLiveUpdates?: () => void;
  isSyncingLive?: boolean;
  lastSyncedTime?: string | null;
}

export const JobsTab: React.FC<JobsTabProps> = ({
  jobs,
  selectedJurisdiction,
  onViewJob,
  onSaveJob,
  onSwitchToJobsForYou,
  onFetchLiveUpdates,
  isSyncingLive = false,
  lastSyncedTime,
}) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [qualFilter, setQualFilter] = useState<string>('All');
  const [deadlineFilter, setDeadlineFilter] = useState<DeadlineCategory>('All');

  const deadlineCategories: DeadlineCategory[] = [
    'All',
    'Closing Today',
    'Closing Tomorrow',
    'Closing This Week',
    'Recently Opened',
  ];

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const matchSearch =
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.organization.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === 'All' || j.type === typeFilter;
      const matchQual = qualFilter === 'All' || j.qualification.includes(qualFilter);

      const daysLeft = calculateDaysRemaining(j.deadlineDate);
      let matchDeadline = true;
      if (deadlineFilter === 'Closing Today') matchDeadline = daysLeft === 0;
      else if (deadlineFilter === 'Closing Tomorrow') matchDeadline = daysLeft === 1;
      else if (deadlineFilter === 'Closing This Week') matchDeadline = daysLeft <= 7;
      else if (deadlineFilter === 'Recently Opened') matchDeadline = daysLeft > 7;

      return matchSearch && matchType && matchQual && matchDeadline;
    });
  }, [jobs, search, typeFilter, qualFilter, deadlineFilter]);

  return (
    <div className="space-y-8">
      {/* Top Banner to switch to Jobs For You */}
      {onSwitchToJobsForYou && (
        <div className="bg-gradient-to-r from-teal-900 to-blue-950 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-teal-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-400 text-slate-950 flex items-center justify-center font-black shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white">
                Want automatic 🟢 Eligible / 🔴 Not Eligible matching?
              </h3>
              <p className="text-xs text-slate-300">
                Use our Smart Match Engine to filter jobs based on your DOB, Category, Branch, and Physical height.
              </p>
            </div>
          </div>
          <button
            onClick={onSwitchToJobsForYou}
            className="w-full sm:w-auto bg-teal-400 hover:bg-teal-300 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs transition cursor-pointer shrink-0 flex items-center justify-center space-x-1.5"
          >
            <span>Open "Jobs For You"</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Dynamic Live Sync Banner */}
      {onFetchLiveUpdates && (
        <LiveSyncBanner
          onFetchLiveUpdates={onFetchLiveUpdates}
          isSyncingLive={isSyncingLive}
          lastSyncedTime={lastSyncedTime}
        />
      )}

      {/* Header */}
      <div>
        <span className="text-teal-600 font-extrabold uppercase tracking-wider text-xs">
          CAREERS & VACANCIES
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Government Job Recruitment Portal
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Browse verified Central and Bihar state government vacancies filtered by qualification, age limit, pay scale, and exam pattern.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-xs border border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Search Jobs</label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Police, Teacher, BPSC, RRB..."
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Jurisdiction</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Recruitment (Bihar & Central)</option>
            <option value="Bihar">Bihar State Govt Jobs</option>
            <option value="Central">Central Govt Jobs (SSC/RRB/ISRO)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Qualification</label>
          <select
            value={qualFilter}
            onChange={(e) => setQualFilter(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Qualifications</option>
            <option value="10th">10th Pass</option>
            <option value="12th">12th Pass / Intermediate</option>
            <option value="Graduate">Graduate (BA/BSc/BCom)</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => {
              setSearch('');
              setTypeFilter('All');
              setQualFilter('All');
              setDeadlineFilter('All');
            }}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Quick Deadline Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider shrink-0 mr-1 flex items-center">
          <Clock className="w-3.5 h-3.5 mr-1 text-rose-600" /> Deadline Filter:
        </span>
        {deadlineCategories.map((cat) => {
          const isActive = deadlineFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setDeadlineFilter(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-rose-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => {
          const badge = getDeadlineBadgeInfo(job.deadlineDate);

          return (
            <div
              key={job.id}
              className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between hover:shadow-md ${badge.borderClass}`}
            >
              <div>
                {/* Prominent Deadline Badge */}
                <div className="mb-3">
                  <div
                    className={`inline-flex items-center space-x-1 px-3 py-1 rounded-xl text-[11px] font-black uppercase tracking-wide border ${badge.bgClass} ${badge.colorClass} ${badge.borderClass}`}
                  >
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{badge.text}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-100">
                    {job.type} Job
                  </span>
                  <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                    {job.qualification}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1 leading-snug">
                  {job.title}
                </h3>
                <p className="text-xs text-slate-500 mb-4 font-semibold">{job.organization}</p>

                <div className="space-y-2 text-xs text-slate-600 mb-6 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 flex items-center">
                      <Users className="w-3.5 h-3.5 mr-1 text-blue-600" /> Total Vacancies:
                    </span>
                    <strong className="text-slate-900 font-extrabold">{job.vacancy}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 flex items-center">
                      <Award className="w-3.5 h-3.5 mr-1 text-purple-600" /> Age Limit:
                    </span>
                    <strong className="text-slate-900 font-bold">{job.age}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 flex items-center">
                      <IndianRupee className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Pay Scale:
                    </span>
                    <strong className="text-emerald-700 font-bold">{job.salary}</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onViewJob(job)}
                  className="flex-grow bg-slate-100 hover:bg-blue-900 hover:text-white text-slate-800 font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Job Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onSaveJob(job.title, 'Job')}
                  aria-label="Bookmark Job"
                  title="Bookmark Job"
                  className="p-3 bg-slate-100 hover:bg-teal-50 text-slate-600 hover:text-teal-700 rounded-xl transition cursor-pointer shrink-0"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
