import React from 'react';
import { GovJob, UserProfile } from '../types';
import { DeadlineTrackerSection } from './DeadlineTrackerSection';

interface DeadlinesTabProps {
  jobs: GovJob[];
  userProfile?: UserProfile;
  onViewJob: (job: GovJob) => void;
  onSaveJob?: (title: string) => void;
  onSetReminder: (title: string, days: number) => void;
}

export const DeadlinesTab: React.FC<DeadlinesTabProps> = ({
  jobs,
  userProfile,
  onViewJob,
  onSaveJob,
  onSetReminder,
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-teal-600 font-extrabold uppercase tracking-wider text-xs">
          DEADLINE TRACKER 🚨
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Active Recruitment Deadline Tracker
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Deadline-driven navigation for active government job applications. Filter by urgency and set custom alert notifications.
        </p>
      </div>

      {/* Main Deadline Tracker Section */}
      <DeadlineTrackerSection
        jobs={jobs}
        userProfile={userProfile}
        onViewJob={onViewJob}
        onSaveJob={onSaveJob}
        onSetReminder={onSetReminder}
      />
    </div>
  );
};
