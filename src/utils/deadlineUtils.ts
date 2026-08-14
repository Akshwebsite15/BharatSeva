import { GovJob, UserProfile } from '../types';
import { evaluateJobEligibility } from './eligibilityEngine';
import { formatFriendlyDate } from './dateUtils';

export type DeadlineCategory = 'All' | 'Closing Today' | 'Closing Tomorrow' | 'Closing This Week' | 'Recently Opened';

/**
 * Safely parse various date string representations into a Date object at end-of-day.
 */
export function parseDeadlineDate(dateStr?: string): Date | null {
  if (!dateStr) return null;
  const clean = dateStr.trim();
  
  // Format: YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
    const [year, month, day] = clean.split('-').map(Number);
    return new Date(year, month - 1, day, 23, 59, 59, 999);
  }

  // Format: DD-MM-YYYY or DD/MM/YYYY
  if (/^\d{1,2}[-/]\d{1,2}[-/]\d{4}$/.test(clean)) {
    const parts = clean.split(/[-/]/).map(Number);
    return new Date(parts[2], parts[1] - 1, parts[0], 23, 59, 59, 999);
  }

  const d = new Date(clean);
  if (!isNaN(d.getTime())) {
    d.setHours(23, 59, 59, 999);
    return d;
  }

  return null;
}

/**
 * Calculates days remaining from current dynamic date (today) to target deadline date.
 * Returns:
 *  0 -> Deadline is today
 *  1 -> Deadline is tomorrow
 *  N -> N days remaining
 * <0 -> Deadline has passed
 */
export function calculateDaysRemaining(deadlineDateStr?: string): number {
  if (!deadlineDateStr) return 15; // default fallback

  const target = parseDeadlineDate(deadlineDateStr);
  if (!target) return 15;

  const now = new Date();
  now.setHours(0, 0, 0, 0); // start of today

  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export interface DeadlineBadgeInfo {
  text: string;
  category: DeadlineCategory;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  daysLeft: number;
}

/**
 * Returns badge styling and urgency info for a given deadline date string.
 */
export function getDeadlineBadgeInfo(deadlineDateStr?: string): DeadlineBadgeInfo {
  const daysLeft = calculateDaysRemaining(deadlineDateStr);

  if (daysLeft < 0) {
    return {
      text: '⚪ DEADLINE PASSED',
      category: 'All',
      colorClass: 'text-slate-500 font-bold',
      bgClass: 'bg-slate-100',
      borderClass: 'border-slate-300',
      daysLeft,
    };
  }

  if (daysLeft === 0) {
    return {
      text: '🔴 LAST DATE: CLOSING TODAY',
      category: 'Closing Today',
      colorClass: 'text-rose-700 font-black animate-pulse',
      bgClass: 'bg-rose-100',
      borderClass: 'border-rose-400',
      daysLeft: 0,
    };
  }

  if (daysLeft === 1) {
    return {
      text: '🔴 LAST DATE: CLOSING TOMORROW (1 DAY LEFT)',
      category: 'Closing Tomorrow',
      colorClass: 'text-rose-700 font-extrabold',
      bgClass: 'bg-rose-50',
      borderClass: 'border-rose-300',
      daysLeft: 1,
    };
  }

  if (daysLeft <= 3) {
    return {
      text: `🔴 LAST DATE: ${daysLeft} DAYS LEFT`,
      category: 'Closing This Week',
      colorClass: 'text-rose-700 font-extrabold animate-pulse',
      bgClass: 'bg-rose-50',
      borderClass: 'border-rose-300',
      daysLeft,
    };
  }

  if (daysLeft <= 7) {
    return {
      text: `🔴 LAST DATE: ${daysLeft} DAYS LEFT`,
      category: 'Closing This Week',
      colorClass: 'text-rose-700 font-extrabold',
      bgClass: 'bg-rose-50/80',
      borderClass: 'border-rose-200',
      daysLeft,
    };
  }

  if (daysLeft <= 14) {
    return {
      text: `🟡 LAST DATE: ${daysLeft} DAYS LEFT`,
      category: 'Closing This Week',
      colorClass: 'text-amber-800 font-bold',
      bgClass: 'bg-amber-50',
      borderClass: 'border-amber-300',
      daysLeft,
    };
  }

  return {
    text: `🟢 RECENTLY OPENED: ${daysLeft} DAYS LEFT`,
    category: 'Recently Opened',
    colorClass: 'text-emerald-800 font-bold',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    daysLeft,
  };
}

/**
 * Filters list of jobs by deadline category tab
 */
export function filterJobsByDeadlineCategory(jobs: GovJob[], category: DeadlineCategory): GovJob[] {
  if (category === 'All') return jobs;

  return jobs.filter((job) => {
    const badge = getDeadlineBadgeInfo(job.deadlineDate);
    if (category === 'Closing Today') return badge.daysLeft === 0;
    if (category === 'Closing Tomorrow') return badge.daysLeft === 1;
    if (category === 'Closing This Week') return badge.daysLeft <= 7;
    if (category === 'Recently Opened') return badge.daysLeft > 7;
    return true;
  });
}

/**
 * Finds all jobs closing soon (within 10 days) that the current user profile is 100% Eligible for.
 */
export function getEligibleJobsClosingSoon(jobs: GovJob[], profile: UserProfile) {
  const eligibleJobs: { job: GovJob; daysLeft: number; badgeText: string }[] = [];

  for (const job of jobs) {
    const evalResult = evaluateJobEligibility(job, profile);
    if (evalResult.status === 'Eligible' || evalResult.status === 'Possibly Eligible') {
      const daysLeft = calculateDaysRemaining(job.deadlineDate);
      if (daysLeft <= 10) {
        const badge = getDeadlineBadgeInfo(job.deadlineDate);
        eligibleJobs.push({
          job,
          daysLeft,
          badgeText: badge.text,
        });
      }
    }
  }

  eligibleJobs.sort((a, b) => a.daysLeft - b.daysLeft);
  return eligibleJobs;
}
