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
} from 'lucide-react';
import { GovJob, UserProfile } from '../types';
import {
  getDeadlineBadgeInfo,
  calculateDaysRemaining,
  DeadlineCategory,
  getEligibleJobsClosingSoon,
} from '../utils/deadlineUtils';

interface DeadlineTrackerSectionProps {
  jobs: GovJob[];
  userProfile?: UserProfile;
  onViewJob: (job: GovJob) => void;
  onSaveJob?: (title: string) => void;
  onSetReminder?: (title: string, days: number) => void;
}

export const DeadlineTrackerSection: React.FC<DeadlineTrackerSectionProps> = ({
  jobs,
  userProfile,
  onViewJob,
  onSaveJob,
  onSetReminder,
}) => {
  const [activeCategory, setActiveCategory] = useState<DeadlineCategory>('All');
  const [reminders, setReminders] = useState<{ [key: string]: boolean }>({});

  const categories: DeadlineCategory[] = [
    'All',
    'Closing Today',
    'Closing Tomorrow',
    'Closing This Week',
    'Recently Opened',
  ];

  // Calculate user eligibility closing soon jobs for smart banner
  const eligibleClosingSoon = useMemo(() => {
    if (!userProfile) return [];
    return getEligibleJobsClosingSoon(jobs, userProfile);
  }, [jobs, userProfile]);

  // Filter jobs by selected category
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const daysLeft = calculateDaysRemaining(job.deadlineDate);
      if (activeCategory === 'Closing Today') return daysLeft === 0;
      if (activeCategory === 'Closing Tomorrow') return daysLeft === 1;
      if (activeCategory === 'Closing This Week') return daysLeft <= 7;
      if (activeCategory === 'Recently Opened') return daysLeft > 7;
      return true;
    });
  }, [jobs, activeCategory]);

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
                Based on your profile, these active government recruitments match your qualification and are closing within 10 days. Apply before the portal closes.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveCategory('Closing This Week')}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-xl transition cursor-pointer shadow-xs"
              >
                View Eligible Closing Jobs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deadline Category Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          let count = 0;

          if (cat === 'All') count = jobs.length;
          else if (cat === 'Closing Today') count = jobs.filter((j) => calculateDaysRemaining(j.deadlineDate) === 0).length;
          else if (cat === 'Closing Tomorrow') count = jobs.filter((j) => calculateDaysRemaining(j.deadlineDate) === 1).length;
          else if (cat === 'Closing This Week') count = jobs.filter((j) => calculateDaysRemaining(j.deadlineDate) <= 7).length;
          else if (cat === 'Recently Opened') count = jobs.filter((j) => calculateDaysRemaining(j.deadlineDate) > 7).length;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs whitespace-nowrap transition cursor-pointer flex items-center space-x-2 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  isActive ? 'bg-teal-500 text-slate-950' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Job Cards with Prominent Deadline Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sortedJobs.map((job) => {
          const badge = getDeadlineBadgeInfo(job.deadlineDate);
          const hasReminder = reminders[job.title];

          return (
            <div
              key={job.id}
              className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md ${badge.borderClass}`}
            >
              <div className="space-y-3">
                
                {/* Prominent Deadline Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-black uppercase tracking-wide ${badge.bgClass} ${badge.colorClass} ${badge.borderClass}`}
                  >
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>{badge.text}</span>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-700 uppercase">
                    {job.qualification}
                  </span>
                </div>

                <h3
                  onClick={() => onViewJob(job)}
                  className="text-base sm:text-lg font-extrabold text-slate-900 hover:text-teal-700 transition cursor-pointer leading-snug"
                >
                  {job.title}
                </h3>

                <p className="text-xs text-slate-600 font-medium">
                  {job.organization} • <strong className="text-slate-900">{job.vacancy}</strong>
                </p>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="text-slate-500 font-medium">Application Window:</span>
                    <span className="font-bold">{job.dates}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="text-slate-500 font-medium">Application Fee:</span>
                    <span className="font-bold text-teal-800">{job.fee}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="text-slate-500 font-medium">Salary / Scale:</span>
                    <span className="font-bold text-slate-900">{job.salary}</span>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onViewJob(job)}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs transition cursor-pointer text-center"
                >
                  View Eligibility & Details
                </button>

                <button
                  onClick={() => handleToggleReminder(job.title)}
                  className={`p-2.5 rounded-xl border transition cursor-pointer text-xs font-bold flex items-center space-x-1 ${
                    hasReminder
                      ? 'bg-amber-100 border-amber-300 text-amber-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                  title="Toggle 24-hour Deadline Reminder"
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
