import React from 'react';
import { GovJob, UserProfile } from '../types';
import { DeadlineTrackerSection } from './DeadlineTrackerSection';

interface DeadlinesTabProps {
  jobs: GovJob[];
  userProfile?: UserProfile;
  onViewJob: (job: GovJob) => void;
  onSaveJob?: (title: string) => void;
  onSetReminder: (title: string, days: number) => void;
  onOpenAlertModal?: () => void;
}

export const DeadlinesTab: React.FC<DeadlinesTabProps> = ({
  jobs,
  userProfile,
  onViewJob,
  onSaveJob,
  onSetReminder,
  onOpenAlertModal,
}) => {
  return (
    <div className="space-y-8">
      {/* Main Deadline Tracker Section */}
      <DeadlineTrackerSection
        jobs={jobs}
        userProfile={userProfile}
        onViewJob={onViewJob}
        onSaveJob={onSaveJob}
        onSetReminder={onSetReminder}
        onOpenAlertModal={onOpenAlertModal}
      />
    </div>
  );
};
