/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeTab } from './components/HomeTab';
import { ServicesTab } from './components/ServicesTab';
import { ScholarshipsTab } from './components/ScholarshipsTab';
import { SchemesTab } from './components/SchemesTab';
import { JobsTab } from './components/JobsTab';
import { JobsForYouSection } from './components/JobsForYouSection';
import { ExamsTab } from './components/ExamsTab';
import { DeadlinesTab } from './components/DeadlinesTab';
import { DashboardTab } from './components/DashboardTab';
import { CurrentAffairsTab } from './components/CurrentAffairsTab';
import { BharatSevaBiharTab } from './components/BharatSevaBiharTab';
import { SearchIntentHubTab } from './components/SearchIntentHubTab';
import { DetailModal } from './components/DetailModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { ExamLifecycleHub } from './components/ExamLifecycleHub';
import { PwaInstallModal } from './components/PwaInstallModal';
import { LegalNoticeModal } from './components/LegalNoticeModal';
import { AdmitCardsTab } from './components/AdmitCardsTab';
import { JobAlertModal } from './components/JobAlertModal';
import { DailyRewardsModal } from './components/DailyRewardsModal';

import {
  JurisdictionState,
  CitizenService,
  GovJob,
  SavedItem,
  ApplicationStatus,
} from './types';

import {
  initialServicesData,
  initialScholarshipsData,
  initialSchemesData,
  initialJobsData,
  initialExamsData,
  initialDeadlinesData,
  initialSavedItems,
  initialApplications,
} from './data/portalData';

import { examHubDataList } from './data/examHubData';

import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  // Navigation & Jurisdiction
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedJurisdiction, setSelectedJurisdiction] =
    useState<JurisdictionState>('Bihar');

  // Datasets
  const [services] = useState<CitizenService[]>(initialServicesData);
  const [scholarships] = useState(initialScholarshipsData);
  const [schemes] = useState(initialSchemesData);
  const [jobs] = useState<GovJob[]>(initialJobsData);
  const [exams] = useState(initialExamsData);
  const [deadlines] = useState(initialDeadlinesData);

  // User Saved Items & Application Trackers
  const [savedItems, setSavedItems] = useState<SavedItem[]>(initialSavedItems);
  const [applications, setApplications] =
    useState<ApplicationStatus[]>(initialApplications);

  // Modal States
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [installModalOpen, setInstallModalOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [jobAlertModalOpen, setJobAlertModalOpen] = useState(false);
  const [dailyRewardsModalOpen, setDailyRewardsModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms' | 'disclaimer'>('disclaimer');
  const [detailService, setDetailService] = useState<CitizenService | null>(null);
  const [detailJob, setDetailJob] = useState<GovJob | null>(null);
  const [activeExamHubTitle, setActiveExamHubTitle] = useState<string | null>(null);

  // Daily Rewards & Unlocks State
  const [coins, setCoins] = React.useState<number>(120);
  const [aiCredits, setAiCredits] = React.useState<number>(5);
  const [streakDays, setStreakDays] = React.useState<number>(3);
  const [hasClaimedToday, setHasClaimedToday] = React.useState<boolean>(false);
  const [unlimitedPassUntil, setUnlimitedPassUntil] = React.useState<number | null>(null);

  // Sync Browser Back Button (popstate listener)
  React.useEffect(() => {
    // Set initial history state
    if (!window.history.state) {
      window.history.replaceState({ tab: 'home', modal: null }, '');
    }

    const handlePopState = (event: PopStateEvent) => {
      // Priority 1: If any modal is active, close the active modal first
      if (
        aiModalOpen ||
        dailyRewardsModalOpen ||
        jobAlertModalOpen ||
        legalModalOpen ||
        installModalOpen ||
        detailService ||
        detailJob ||
        activeExamHubTitle
      ) {
        setAiModalOpen(false);
        setDailyRewardsModalOpen(false);
        setJobAlertModalOpen(false);
        setLegalModalOpen(false);
        setInstallModalOpen(false);
        setDetailService(null);
        setDetailJob(null);
        setActiveExamHubTitle(null);
        return;
      }

      // Priority 2: Restore tab from history state or fallback to 'home'
      if (event.state && event.state.tab) {
        setActiveTab(event.state.tab);
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [
    aiModalOpen,
    dailyRewardsModalOpen,
    jobAlertModalOpen,
    legalModalOpen,
    installModalOpen,
    detailService,
    detailJob,
    activeExamHubTitle,
  ]);

  // History-aware navigation helper
  const changeTab = (tab: string) => {
    setActiveTab(tab);
    window.history.pushState({ tab, modal: null }, '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // History-aware modal triggers
  const handleOpenAiModal = () => {
    setAiModalOpen(true);
    window.history.pushState({ tab: activeTab, modal: 'ai' }, '');
  };

  const handleOpenDailyRewardsModal = () => {
    setDailyRewardsModalOpen(true);
    window.history.pushState({ tab: activeTab, modal: 'rewards' }, '');
  };

  const handleOpenJobAlertModal = () => {
    setJobAlertModalOpen(true);
    window.history.pushState({ tab: activeTab, modal: 'alerts' }, '');
  };

  const handleOpenInstallModal = () => {
    setInstallModalOpen(true);
    window.history.pushState({ tab: activeTab, modal: 'install' }, '');
  };

  const handleOpenLegalModal = (tab: 'privacy' | 'terms' | 'disclaimer' = 'disclaimer') => {
    setLegalModalTab(tab);
    setLegalModalOpen(true);
    window.history.pushState({ tab: activeTab, modal: 'legal' }, '');
  };

  const handleOpenDetailService = (service: CitizenService) => {
    setDetailService(service);
    window.history.pushState({ tab: activeTab, modal: 'service' }, '');
  };

  const handleOpenDetailJob = (job: GovJob) => {
    setDetailJob(job);
    window.history.pushState({ tab: activeTab, modal: 'job' }, '');
  };

  const handleOpenExamHub = (title: string) => {
    setActiveExamHubTitle(title);
    window.history.pushState({ tab: activeTab, modal: 'exam-hub' }, '');
  };

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Handlers
  const handleSaveItem = (title: string, type: SavedItem['type']) => {
    const exists = savedItems.some((item) => item.title === title);
    if (exists) {
      showToast(`"${title}" is already bookmarked in your Dashboard.`);
    } else {
      const newItem: SavedItem = {
        id: `save-${Date.now()}`,
        title,
        type,
        addedAt: new Date().toISOString().split('T')[0],
      };
      setSavedItems((prev) => [newItem, ...prev]);
      showToast(`Saved "${title}" to your Personal Dashboard.`);
    }
  };

  const handleRemoveSavedItem = (title: string) => {
    setSavedItems((prev) => prev.filter((item) => item.title !== title));
    showToast(`Removed "${title}" from saved bookmarks.`);
  };

  const handleAddApplication = (newApp: Omit<ApplicationStatus, 'id'>) => {
    const fullApp: ApplicationStatus = {
      ...newApp,
      id: `app-${Date.now()}`,
    };
    setApplications((prev) => [fullApp, ...prev]);
    showToast(`Now tracking application "${newApp.title}" (${newApp.applicationNo}).`);
  };

  const handleSetReminder = (title: string, days: number) => {
    showToast(`Reminder alert configured for ${days} days prior to deadline for "${title}".`);
  };

  const handleGlobalSearch = (query: string) => {
    const q = query.toLowerCase();
    if (
      q.includes('job') ||
      q.includes('police') ||
      q.includes('bpsc') ||
      q.includes('rrb') ||
      q.includes('teacher') ||
      q.includes('ssc')
    ) {
      setActiveTab('jobs');
    } else if (q.includes('exam') || q.includes('upsc') || q.includes('bssc')) {
      setActiveTab('exams');
    } else if (q.includes('scholarship') || q.includes('grant') || q.includes('pms')) {
      setActiveTab('scholarships');
    } else {
      setActiveTab('services');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-teal-500 selection:text-white font-sans antialiased">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={changeTab}
        selectedJurisdiction={selectedJurisdiction}
        setSelectedJurisdiction={setSelectedJurisdiction}
        onOpenAiModal={handleOpenAiModal}
        onOpenInstallModal={handleOpenInstallModal}
        onOpenLegalModal={handleOpenLegalModal}
        onOpenAlertModal={handleOpenJobAlertModal}
        coins={coins}
        streakDays={streakDays}
        onOpenDailyRewards={handleOpenDailyRewardsModal}
      />

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'home' && (
          <HomeTab
            setActiveTab={changeTab}
            selectedJurisdiction={selectedJurisdiction}
            onGlobalSearch={handleGlobalSearch}
          />
        )}

        {activeTab === 'current-affairs' && (
          <CurrentAffairsTab
            onSaveItem={(title, type) => handleSaveItem(title, type)}
          />
        )}

        {activeTab === 'bharatseva-bihar' && (
          <BharatSevaBiharTab
            onSaveItem={(title, type) => handleSaveItem(title, type)}
          />
        )}

        {activeTab === 'search-intent-hub' && (
          <SearchIntentHubTab
            onSaveItem={(title, type) => handleSaveItem(title, type)}
          />
        )}

        {activeTab === 'services' && (
          <ServicesTab
            services={services}
            selectedJurisdiction={selectedJurisdiction}
            onViewService={handleOpenDetailService}
            onSaveService={(title) => handleSaveItem(title, 'Service')}
          />
        )}

        {activeTab === 'scholarships' && (
          <ScholarshipsTab
            scholarships={scholarships}
            onSaveScholarship={(title) => handleSaveItem(title, 'Scholarship')}
          />
        )}

        {activeTab === 'schemes' && <SchemesTab schemes={schemes} />}

        {activeTab === 'jobs-for-you' && (
          <JobsForYouSection
            jobs={jobs}
            onViewJob={handleOpenDetailJob}
            onSaveJob={(title) => handleSaveItem(title, 'Job')}
          />
        )}

        {activeTab === 'jobs' && (
          <JobsTab
            jobs={jobs}
            selectedJurisdiction={selectedJurisdiction}
            onViewJob={handleOpenDetailJob}
            onSaveJob={(title) => handleSaveItem(title, 'Job')}
            onSwitchToJobsForYou={() => changeTab('jobs-for-you')}
          />
        )}

        {activeTab === 'exams' && (
          <ExamsTab
            exams={exams}
            onOpenExamHub={handleOpenExamHub}
          />
        )}

        {activeTab === 'deadlines' && (
          <DeadlinesTab
            jobs={jobs}
            onViewJob={handleOpenDetailJob}
            onSaveJob={(title) => handleSaveItem(title, 'Job')}
            onSetReminder={handleSetReminder}
            onOpenAlertModal={handleOpenJobAlertModal}
          />
        )}

        {activeTab === 'admit-cards' && (
          <AdmitCardsTab
            onOpenAlertModal={handleOpenJobAlertModal}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardTab
            savedItems={savedItems}
            applications={applications}
            onRemoveSavedItem={handleRemoveSavedItem}
            onAddApplication={handleAddApplication}
          />
        )}
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-3 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <DetailModal
        isOpen={Boolean(detailService || detailJob)}
        onClose={() => {
          setDetailService(null);
          setDetailJob(null);
        }}
        service={detailService}
        job={detailJob}
      />

      <AiAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        aiCredits={aiCredits}
        setAiCredits={setAiCredits}
        unlimitedPassUntil={unlimitedPassUntil}
        onOpenDailyRewards={handleOpenDailyRewardsModal}
      />

      <DailyRewardsModal
        isOpen={dailyRewardsModalOpen}
        onClose={() => setDailyRewardsModalOpen(false)}
        coins={coins}
        setCoins={setCoins}
        aiCredits={aiCredits}
        setAiCredits={setAiCredits}
        streakDays={streakDays}
        setStreakDays={setStreakDays}
        hasClaimedToday={hasClaimedToday}
        setHasClaimedToday={setHasClaimedToday}
        unlimitedPassUntil={unlimitedPassUntil}
        setUnlimitedPassUntil={setUnlimitedPassUntil}
        onOpenAiModal={handleOpenAiModal}
        showToast={showToast}
      />

      {/* Exam Lifecycle Hub Permanent Page Modal */}
      {activeExamHubTitle && (
        <ExamLifecycleHub
          examHub={
            examHubDataList.find(
              (h) => h.title.toLowerCase().includes(activeExamHubTitle.toLowerCase()) ||
                     activeExamHubTitle.toLowerCase().includes(h.title.toLowerCase())
            ) || examHubDataList[0]
          }
          onClose={() => setActiveExamHubTitle(null)}
          onSaveExam={(title) => handleSaveItem(title, 'Exam')}
        />
      )}

      <PwaInstallModal
        isOpen={installModalOpen}
        onClose={() => setInstallModalOpen(false)}
      />

      <LegalNoticeModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        defaultSubTab={legalModalTab}
      />

      <JobAlertModal
        isOpen={jobAlertModalOpen}
        onClose={() => setJobAlertModalOpen(false)}
        onSavePreferences={(msg) => showToast(msg)}
      />

      {/* Footer */}
      <Footer
        setActiveTab={changeTab}
        onOpenAiModal={handleOpenAiModal}
        onOpenInstallModal={handleOpenInstallModal}
        onOpenLegalModal={handleOpenLegalModal}
      />
    </div>
  );
}
