import React, { useState, useMemo } from 'react';
import {
  Clock,
  AlertTriangle,
  Calendar,
  ExternalLink,
  Bell,
  Sparkles,
  ChevronRight,
  Bookmark,
  CheckCircle2,
  Hourglass,
  Filter,
  Check,
  Briefcase,
  ArrowRight,
} from 'lucide-react';
import { GovJob, UserProfile } from '../types';
import {
  getDeadlineBadgeInfo,
  calculateDaysRemaining,
  getEligibleJobsClosingSoon,
} from '../utils/deadlineUtils';
import { LiveSyncBanner } from './LiveSyncBanner';

export type ClosingSoonFilter = 'All' | 'Today' | 'Tomorrow' | '3 days' | '7 days' | '15 days';

interface DeadlineTrackerSectionProps {
  jobs: GovJob[];
  userProfile?: UserProfile;
  onViewJob: (job: GovJob) => void;
  onSaveJob?: (title: string) => void;
  onSetReminder?: (title: string, days: number) => void;
  onOpenAlertModal?: () => void;
  onFetchLiveUpdates?: () => void;
  isSyncingLive?: boolean;
  lastSyncedTime?: string | null;
}

export const DeadlineTrackerSection: React.FC<DeadlineTrackerSectionProps> = ({
  jobs,
  userProfile,
  onViewJob,
  onSaveJob,
  onSetReminder,
  onOpenAlertModal,
  onFetchLiveUpdates,
  isSyncingLive = false,
  lastSyncedTime,
}) => {
  const [activeFilter, setActiveFilter] = useState<ClosingSoonFilter>('All');
  const [reminders, setReminders] = useState<{ [key: string]: boolean }>({});

  const filterOptions: ClosingSoonFilter[] = [
    'All',
    'Today',
    'Tomorrow',
    '3 days',
    '7 days',
    '15 days',
  ];

  // Calculate user eligibility closing soon jobs for smart banner
  const eligibleClosingSoon = useMemo(() => {
    if (!userProfile) return [];
    return getEligibleJobsClosingSoon(jobs, userProfile);
  }, [jobs, userProfile]);

  // Filter jobs by selected closing soon filter
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const daysLeft = calculateDaysRemaining(job.deadlineDate);
      if (activeFilter === 'Today') return daysLeft === 0;
      if (activeFilter === 'Tomorrow') return daysLeft === 1;
      if (activeFilter === '3 days') return daysLeft <= 3 && daysLeft >= 0;
      if (activeFilter === '7 days') return daysLeft <= 7 && daysLeft >= 0;
      if (activeFilter === '15 days') return daysLeft <= 15 && daysLeft >= 0;
      return daysLeft >= 0;
    });
  }, [jobs, activeFilter]);

  // Sort by urgency (fewer days left first)
  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      const daysA = calculateDaysRemaining(a.deadlineDate);
      const daysB = calculateDaysRemaining(b.deadlineDate);
      return daysA - daysB;
    });
  }, [filteredJobs]);

  const handleToggleReminder = (jobTitle: string) => {
    const nextState = !reminders[jobTitle];
    setReminders((prev) => ({ ...prev, [jobTitle]: nextState }));
    if (onSetReminder && nextState) {
      onSetReminder(jobTitle, 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Live Sync Banner */}
      {onFetchLiveUpdates && (
        <LiveSyncBanner
          onFetchLiveUpdates={onFetchLiveUpdates}
          isSyncingLive={isSyncingLive}
          lastSyncedTime={lastSyncedTime}
        />
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-500/30 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/30 text-xs font-black uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>CLOSING SOON RECRUITMENT TRACKER</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Government Jobs Closing Soon
            </h1>

            <p className="text-xs sm:text-sm text-rose-100/90 max-w-2xl font-medium leading-relaxed">
              Never miss an active application deadline. Filter vacancies closing Today, Tomorrow, in 3 Days, 7 Days, or 15 Days with direct application portal links.
            </p>
          </div>

          {onOpenAlertModal && (
            <button
              onClick={onOpenAlertModal}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-5 py-3 rounded-2xl text-xs transition cursor-pointer flex items-center space-x-2 shadow-lg shrink-0"
            >
              <Bell className="w-4 h-4 text-slate-950 animate-bounce" />
              <span>🔔 Subscribe to Deadline Alerts</span>
            </button>
          )}
        </div>
      </div>

      {/* Smart Alert Banner for Eligible Closing Soon Jobs */}
      {eligibleClosingSoon.length > 0 && (
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-amber-900 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-rose-700/60 relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/30 text-[11px] font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Smart Eligibility Alert</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold">
                Don't miss these {eligibleClosingSoon.length} job{eligibleClosingSoon.length > 1 ? 's' : ''} you're eligible for!
              </h2>
              <p className="text-xs text-rose-100/90 max-w-2xl">
                Based on your profile, these active government recruitments match your qualification and are closing soon.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveFilter('7 days')}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-xl transition cursor-pointer shadow-xs"
              >
                View Eligible Closing Jobs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Explicit Filter Tabs: Today, Tomorrow, 3 days, 7 days, 15 days */}
      <div className="space-y-2">
        <label className="block text-xs font-black uppercase text-slate-500 tracking-wider">
          Filter By Deadline Urgency:
        </label>
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {filterOptions.map((opt) => {
            const isActive = activeFilter === opt;
            let count = 0;

            if (opt === 'All') count = jobs.length;
            else if (opt === 'Today') count = jobs.filter((j) => calculateDaysRemaining(j.deadlineDate) === 0).length;
            else if (opt === 'Tomorrow') count = jobs.filter((j) => calculateDaysRemaining(j.deadlineDate) === 1).length;
            else if (opt === '3 days') count = jobs.filter((j) => { const d = calculateDaysRemaining(j.deadlineDate); return d <= 3 && d >= 0; }).length;
            else if (opt === '7 days') count = jobs.filter((j) => { const d = calculateDaysRemaining(j.deadlineDate); return d <= 7 && d >= 0; }).length;
            else if (opt === '15 days') count = jobs.filter((j) => { const d = calculateDaysRemaining(j.deadlineDate); return d <= 15 && d >= 0; }).length;

            return (
              <button
                key={opt}
                onClick={() => setActiveFilter(opt)}
                className={`px-4 py-2.5 rounded-2xl font-black text-xs whitespace-nowrap transition cursor-pointer flex items-center space-x-2 ${
                  isActive
                    ? 'bg-rose-950 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{opt === 'All' ? 'All Closing Jobs' : `Closing in ${opt}`}</span>
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

      {/* Job Cards with Prominent "⏰ Last date" Badge on EVERY card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sortedJobs.map((job) => {
          const badge = getDeadlineBadgeInfo(job.deadlineDate);
          const daysLeft = calculateDaysRemaining(job.deadlineDate);
          const hasReminder = reminders[job.title];

          return (
            <div
              key={job.id}
              className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md ${badge.borderClass}`}
            >
              <div className="space-y-3">
                
                {/* REQUIRED: Every card clearly shows ⏰ Last date */}
                <div className="bg-rose-50 border border-rose-200 p-3 rounded-2xl flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2 font-black text-xs text-rose-950">
                    <Clock className="w-4 h-4 text-rose-700 animate-pulse shrink-0" />
                    <span>⏰ Last Date: {job.deadlineDate}</span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${badge.bgClass} ${badge.colorClass}`}
                  >
                    {badge.text}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-slate-100 text-slate-800 text-[10px] font-black rounded uppercase">
                    {job.type} • {job.qualification}
                  </span>
                  <span className="text-[10px] font-extrabold text-teal-800">{job.vacancy}</span>
                </div>

                <h3
                  onClick={() => onViewJob(job)}
                  className="text-base sm:text-lg font-extrabold text-slate-900 hover:text-rose-700 transition cursor-pointer leading-snug"
                >
                  {job.title}
                </h3>

                <p className="text-xs text-slate-600 font-medium">
                  {job.organization}
                </p>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1 text-xs">
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="text-slate-500 font-medium">Application Window:</span>
                    <span className="font-bold">{job.dates}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="text-slate-500 font-medium">Application Fee:</span>
                    <span className="font-bold text-teal-800">{job.fee}</span>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onViewJob(job)}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs transition cursor-pointer text-center"
                >
                  View Eligibility Details
                </button>

                <button
                  onClick={() => handleToggleReminder(job.title)}
                  className={`p-2.5 rounded-xl border transition cursor-pointer text-xs font-bold flex items-center space-x-1 ${
                    hasReminder
                      ? 'bg-amber-100 border-amber-300 text-amber-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                  title="Toggle Deadline Reminder"
                >
                  <Bell className="w-4 h-4" />
                  {hasReminder && <Check className="w-3 h-3 text-amber-800" />}
                </button>

                {onSaveJob && (
                  <button
                    onClick={() => onSaveJob(job.title)}
                    className="p-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl transition cursor-pointer"
                    title="Bookmark Job"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                )}

                <a
                  href={job.appLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-teal-50 border border-teal-200 hover:bg-teal-600 hover:text-white text-teal-800 rounded-xl transition cursor-pointer"
                  title="Apply Online"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
