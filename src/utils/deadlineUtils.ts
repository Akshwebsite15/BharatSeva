import { GovJob, UserProfile } from '../types';
import { evaluateJobEligibility } from './eligibilityEngine';

export type DeadlineCategory = 'All' | 'Closing Today' | 'Closing Tomorrow' | 'Closing This Week' | 'Recently Opened';

/**
 * Calculates days remaining from current date (2026-08-10) to target deadline date.
 */
export function calculateDaysRemaining(deadlineDateStr?: string): number {
  if (!deadlineDateStr) return 15; // default fallback
  const now = new Date('2026-08-10T00:00:00');
  const target = new Date(`${deadlineDateStr}T23:59:59`);
  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays < 0 ? 0 : diffDays;
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
