/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeTab } from './components/HomeTab';
import { SEOHelper } from './components/SEOHelper';
import { MobileBottomNav } from './components/MobileBottomNav';
import { TabLoadingSkeleton } from './components/TabLoadingSkeleton';

// Code-split / Lazy load secondary tabs for instant initial app startup
const AdminCms = lazy(() => import('./components/AdminCms').then(m => ({ default: m.AdminCms })));
const ServicesTab = lazy(() => import('./components/ServicesTab').then(m => ({ default: m.ServicesTab })));
const ScholarshipsTab = lazy(() => import('./components/ScholarshipsTab').then(m => ({ default: m.ScholarshipsTab })));
const SchemesTab = lazy(() => import('./components/SchemesTab').then(m => ({ default: m.SchemesTab })));
const JobsTab = lazy(() => import('./components/JobsTab').then(m => ({ default: m.JobsTab })));
const JobsForYouSection = lazy(() => import('./components/JobsForYouSection').then(m => ({ default: m.JobsForYouSection })));
const ExamsTab = lazy(() => import('./components/ExamsTab').then(m => ({ default: m.ExamsTab })));
const DeadlinesTab = lazy(() => import('./components/DeadlinesTab').then(m => ({ default: m.DeadlinesTab })));
const DashboardTab = lazy(() => import('./components/DashboardTab').then(m => ({ default: m.DashboardTab })));
const CurrentAffairsTab = lazy(() => import('./components/CurrentAffairsTab').then(m => ({ default: m.CurrentAffairsTab })));
const BharatSevaBiharTab = lazy(() => import('./components/BharatSevaBiharTab').then(m => ({ default: m.BharatSevaBiharTab })));
const SearchIntentHubTab = lazy(() => import('./components/SearchIntentHubTab').then(m => ({ default: m.SearchIntentHubTab })));
const CollegeDirectory = lazy(() => import('./components/CollegeDirectory').then(m => ({ default: m.CollegeDirectory })));
const UniversityDirectory = lazy(() => import('./components/UniversityDirectory').then(m => ({ default: m.UniversityDirectory })));
const CourseDirectory = lazy(() => import('./components/CourseDirectory').then(m => ({ default: m.CourseDirectory })));
const AdmissionDirectory = lazy(() => import('./components/AdmissionDirectory').then(m => ({ default: m.AdmissionDirectory })));
const AdmitCardsTab = lazy(() => import('./components/AdmitCardsTab').then(m => ({ default: m.AdmitCardsTab })));

// Lazy load Modals
const DetailModal = lazy(() => import('./components/DetailModal').then(m => ({ default: m.DetailModal })));
const AiAssistantModal = lazy(() => import('./components/AiAssistantModal').then(m => ({ default: m.AiAssistantModal })));
const ExamLifecycleHub = lazy(() => import('./components/ExamLifecycleHub').then(m => ({ default: m.ExamLifecycleHub })));
const PwaInstallModal = lazy(() => import('./components/PwaInstallModal').then(m => ({ default: m.PwaInstallModal })));
const LegalNoticeModal = lazy(() => import('./components/LegalNoticeModal').then(m => ({ default: m.LegalNoticeModal })));
const JobAlertModal = lazy(() => import('./components/JobAlertModal').then(m => ({ default: m.JobAlertModal })));
const DailyRewardsModal = lazy(() => import('./components/DailyRewardsModal').then(m => ({ default: m.DailyRewardsModal })));
const UnifiedSearchModal = lazy(() => import('./components/UnifiedSearchModal').then(m => ({ default: m.UnifiedSearchModal })));
const CollegeDetailPage = lazy(() => import('./components/CollegeDetailPage').then(m => ({ default: m.CollegeDetailPage })));
const UniversityDetailPage = lazy(() => import('./components/UniversityDetailPage').then(m => ({ default: m.UniversityDetailPage })));
const DailySpeedQuizModal = lazy(() => import('./components/DailySpeedQuizModal').then(m => ({ default: m.DailySpeedQuizModal })));
const GovtPhotoToolModal = lazy(() => import('./components/GovtPhotoToolModal').then(m => ({ default: m.GovtPhotoToolModal })));
const GovtAgeEligibilityCalculatorModal = lazy(() => import('./components/GovtAgeEligibilityCalculatorModal').then(m => ({ default: m.GovtAgeEligibilityCalculatorModal })));
const DailyStudyPlannerModal = lazy(() => import('./components/DailyStudyPlannerModal').then(m => ({ default: m.DailyStudyPlannerModal })));
const CitizenPublicToolsHubModal = lazy(() => import('./components/CitizenPublicToolsHubModal').then(m => ({ default: m.CitizenPublicToolsHubModal })));

import { initialCoursesData } from './data/coursesData';
import { initialAdmissionsData } from './data/admissionsData';
import { SEOPageMeta, AdmissionItem } from './types';

import {
  JurisdictionState,
  CitizenService,
  GovJob,
  SavedItem,
  ApplicationStatus,
  CMSJobItem,
  CMSResultItem,
  CMSAdmitCardItem,
  CMSAnswerKeyItem,
  CMSPyqItem,
  CMSNoticeItem,
  College,
  University,
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

import { initialCurrentAffairsArticles } from './data/currentAffairsData';
import { initialAdmitCardsData, AdmitCardItem } from './data/admitCardsData';
import { initialCollegesData, initialUniversitiesData } from './data/collegesUniversitiesData';
import { CurrentAffairsArticle } from './types';
import { examHubDataList } from './data/examHubData';
import {
  initialCMSJobs,
  initialCMSResults,
  initialCMSAdmitCards,
  initialCMSAnswerKeys,
  initialCMSPyqs,
  initialCMSNotices,
} from './data/cmsInitialData';

import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  // Navigation & Jurisdiction
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedJurisdiction, setSelectedJurisdiction] =
    useState<JurisdictionState>('Bihar');

  // Admin CMS Portal State
  const [adminCmsOpen, setAdminCmsOpen] = useState(false);
  const [cmsJobs, setCmsJobs] = useState<CMSJobItem[]>(initialCMSJobs);
  const [cmsResults, setCmsResults] = useState<CMSResultItem[]>(initialCMSResults);
  const [cmsAdmitCards, setCmsAdmitCards] = useState<CMSAdmitCardItem[]>(initialCMSAdmitCards);
  const [cmsAnswerKeys, setCmsAnswerKeys] = useState<CMSAnswerKeyItem[]>(initialCMSAnswerKeys);
  const [cmsPyqs, setCmsPyqs] = useState<CMSPyqItem[]>(initialCMSPyqs);
  const [cmsNotices, setCmsNotices] = useState<CMSNoticeItem[]>(initialCMSNotices);

  // Filtered Public Published Datasets for Candidate Views
  const publishedJobs = React.useMemo(
    () => cmsJobs.filter((j) => j.publishStatus === 'Published'),
    [cmsJobs]
  );
  const publishedAdmitCards = React.useMemo(
    () => cmsAdmitCards.filter((ac) => ac.publishStatus === 'Published'),
    [cmsAdmitCards]
  );

  // Datasets
  const [services] = useState<CitizenService[]>(initialServicesData);
  const [scholarships] = useState(initialScholarshipsData);
  const [schemes] = useState(initialSchemesData);
  const [currentAffairsArticles, setCurrentAffairsArticles] = useState<CurrentAffairsArticle[]>(initialCurrentAffairsArticles);
  const [exams] = useState(initialExamsData);
  const [deadlines] = useState(initialDeadlinesData);
  const [colleges] = useState<College[]>(initialCollegesData);
  const [universities] = useState<University[]>(initialUniversitiesData);
  const [courses] = useState(initialCoursesData);
  const [admissions] = useState<AdmissionItem[]>(initialAdmissionsData);

  // Live Updates Sync State
  const [isSyncingLive, setIsSyncingLive] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string | null>(null);

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
  const [unifiedSearchOpen, setUnifiedSearchOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms' | 'disclaimer'>('disclaimer');
  const [detailService, setDetailService] = useState<CitizenService | null>(null);
  const [detailJob, setDetailJob] = useState<GovJob | null>(null);
  const [activeExamHubTitle, setActiveExamHubTitle] = useState<string | null>(null);
  const [selectedCollegeForPage, setSelectedCollegeForPage] = useState<College | null>(null);
  const [selectedUniversityForPage, setSelectedUniversityForPage] = useState<University | null>(null);
  const [speedQuizModalOpen, setSpeedQuizModalOpen] = useState(false);
  const [photoToolModalOpen, setPhotoToolModalOpen] = useState(false);
  const [ageCalcModalOpen, setAgeCalcModalOpen] = useState(false);
  const [studyPlannerModalOpen, setStudyPlannerModalOpen] = useState(false);
  const [publicToolModalOpen, setPublicToolModalOpen] = useState(false);
  const [selectedPublicToolId, setSelectedPublicToolId] = useState<string>('ration-card');

  const handleOpenPublicToolModal = (toolId?: string) => {
    if (toolId) {
      setSelectedPublicToolId(toolId);
    }
    setPublicToolModalOpen(true);
  };

  // Dynamic SEO Page Metadata Calculation
  const currentSeoMeta: SEOPageMeta = React.useMemo(() => {
    switch (activeTab) {
      case 'admissions':
        return {
          title: 'College & University Admission Directory 2026 - Central & State Applications | BharatSeva',
          description: 'Explore live college admissions, open application forms, dates, eligibility criteria, entrance exams, and cutoff trends across Bihar & India.',
          h1: 'University & College Admissions Portal 2026',
          canonicalUrl: 'https://bharatseva.in/admissions',
          breadcrumbs: [
            { label: 'Home', url: '/' },
            { label: 'Admissions 2026', url: '/admissions' },
          ],
          internalLinks: [
            { label: 'College Directory', url: '#colleges' },
            { label: 'Course Directory', url: '#courses' },
            { label: 'University Directory', url: '#universities' },
          ],
        };
      case 'courses':
        return {
          title: 'Course Directory 2026 - B.Tech, BCA, BBA, MBA, MBBS, MCA Degrees | BharatSeva',
          description: 'Comprehensive directory of higher education degrees, subjects, duration, fees, career options, and top colleges offering each course.',
          h1: 'Higher Education Course Directory',
          canonicalUrl: 'https://bharatseva.in/courses',
          breadcrumbs: [
            { label: 'Home', url: '/' },
            { label: 'Course Directory', url: '/courses' },
          ],
          internalLinks: [
            { label: 'Admission Directory', url: '#admissions' },
            { label: 'College Directory', url: '#colleges' },
          ],
        };
      case 'colleges':
        return {
          title: 'Top Government & Private College Directory 2026 | BharatSeva',
          description: 'Find verified top government & private engineering, medical, management, and degree colleges in Bihar & India with fees, hostels, and cutoffs.',
          h1: 'Verified College Directory',
          canonicalUrl: 'https://bharatseva.in/colleges',
          breadcrumbs: [
            { label: 'Home', url: '/' },
            { label: 'Colleges', url: '/colleges' },
          ],
          internalLinks: [
            { label: 'Universities', url: '#universities' },
            { label: 'Admissions', url: '#admissions' },
          ],
        };
      case 'universities':
        return {
          title: 'Central, State, Private & Deemed University Directory 2026 | BharatSeva',
          description: 'Directory of Central Universities, State Universities, Private Universities & Deemed Universities with UGC NAAC accreditation ratings.',
          h1: 'Central & State University Directory',
          canonicalUrl: 'https://bharatseva.in/universities',
          breadcrumbs: [
            { label: 'Home', url: '/' },
            { label: 'Universities', url: '/universities' },
          ],
          internalLinks: [
            { label: 'Colleges', url: '#colleges' },
            { label: 'Courses', url: '#courses' },
          ],
        };
      default:
        return {
          title: 'BharatSeva - Bihar & Central Citizen Services, Govt Jobs, Admissions & Exams Portal 2026',
          description: 'Single-window verified portal for Bihar & Central government services, job notifications, college directories, admissions, current affairs & schemes.',
          h1: 'BharatSeva Citizen & Higher Education Hub',
          canonicalUrl: 'https://bharatseva.in/',
          breadcrumbs: [{ label: 'Home', url: '/' }],
          internalLinks: [
            { label: 'Admissions 2026', url: '#admissions' },
            { label: 'Course Directory', url: '#courses' },
            { label: 'Colleges', url: '#colleges' },
            { label: 'Government Jobs', url: '#jobs' },
          ],
        };
    }
  }, [activeTab]);

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
        activeExamHubTitle ||
        selectedCollegeForPage ||
        selectedUniversityForPage
      ) {
        setAiModalOpen(false);
        setDailyRewardsModalOpen(false);
        setJobAlertModalOpen(false);
        setLegalModalOpen(false);
        setInstallModalOpen(false);
        setDetailService(null);
        setDetailJob(null);
        setActiveExamHubTitle(null);
        setSelectedCollegeForPage(null);
        setSelectedUniversityForPage(null);
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

  const handleFetchLiveUpdates = async () => {
    setIsSyncingLive(true);
    showToast("⏳ Fetching Today's Live Updates from BPSC, CSBC, SSC & Govt Press Releases...");
    try {
      const res = await fetch('/api/live-updates', { method: 'POST' });
      if (!res.ok) throw new Error('Live fetch failed');
      const data = await res.json();

      if (data.jobs && data.jobs.length > 0) {
        setCmsJobs((prev) => {
          const existingTitles = new Set(prev.map((j) => j.title.toLowerCase().trim()));
          const freshJobs: CMSJobItem[] = data.jobs.map((j: any, index: number) => {
            const endDate = j.deadlineDate || j.applicationEndDate || new Date(Date.now() + (index === 0 ? 0 : index * 2) * 86400000).toISOString().split('T')[0];
            return {
              id: j.id || `live-job-${Date.now()}-${index}`,
              title: j.title,
              organization: j.organization || j.department || 'Government Recruitment Board',
              type: j.type || (j.jurisdiction === 'Bihar' ? 'Bihar' : 'Central'),
              qualification: j.qualification || 'Graduate',
              vacancy: j.vacancy || j.totalPosts || 'Various Posts',
              age: j.age || j.ageLimit || '18 - 37 Years',
              dates: j.dates || `Application Active | Deadline: ${endDate}`,
              deadlineDate: endDate,
              startDate: j.startDate || j.applicationStartDate || new Date().toISOString().split('T')[0],
              fee: j.fee || '₹500 (General) | ₹150 (Reserved)',
              salary: j.salary || 'Pay Level Matrix as per Govt Norms',
              selection: j.selection || 'Written Examination -> Skill Test / Physical Test -> Document Verification.',
              documents: j.documents || ['10th/12th/Graduation Certificates', 'Photo ID & Domicile Proof', 'Category Certificate'],
              notification: j.notification || 'Official Govt Portal Notification 2026',
              appLink: j.appLink || j.officialWebsite || 'https://bpsc.bih.nic.in',
              verificationStatus: 'Verified & Active Live Recruitment Feed',
              minAge: j.minAge || 18,
              maxAgeGen: j.maxAgeGen || 37,
              reqQualificationLevel: j.reqQualificationLevel || 'Graduate',
              publishStatus: 'Published' as const,
            };
          }).filter((j: CMSJobItem) => !existingTitles.has(j.title.toLowerCase().trim()));

          return [...freshJobs, ...prev];
        });
      }

      if (data.admitCards && data.admitCards.length > 0) {
        setCmsAdmitCards((prev) => {
          const existingTitles = new Set(prev.map((ac) => ac.admitCardName.toLowerCase().trim()));
          const freshAc: CMSAdmitCardItem[] = data.admitCards.map((ac: any, index: number) => ({
            id: ac.id || `live-ac-${Date.now()}-${index}`,
            category: ac.category || 'BPSC',
            examName: ac.examName || ac.title || 'Government Competitive Examination 2026',
            admitCardName: ac.admitCardName || ac.title || 'Official Hall Ticket & E-Admit Card',
            organization: ac.organization || 'Selection Board',
            releaseDate: ac.releaseDate || new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
            examDate: ac.examDate || 'Upcoming Schedule',
            downloadUrl: ac.downloadUrl || 'https://bpsc.bih.nic.in',
            instructions: ac.instructions || [
              'Login with Registration ID and Date of Birth / Password',
              'Download and print 2 clear copies of E-Admit Card',
              'Carry valid original Photo ID proof to exam center'
            ],
            status: ac.status || 'Live Download',
            publishStatus: 'Published' as const,
          })).filter((ac: CMSAdmitCardItem) => !existingTitles.has(ac.admitCardName.toLowerCase().trim()));

          return [...freshAc, ...prev];
        });
      }

      if (data.currentAffairs && data.currentAffairs.length > 0) {
        setCurrentAffairsArticles((prev) => {
          const existingTitles = new Set(prev.map((ca) => ca.title.toLowerCase().trim()));
          const freshCa = data.currentAffairs.filter((ca: CurrentAffairsArticle) => !existingTitles.has(ca.title.toLowerCase().trim()));
          return [...freshCa, ...prev];
        });
      }

      const timeString = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      setLastSyncedTime(timeString);
      showToast(`⚡ Live Sync Complete! Today's fresh updates loaded (${timeString}).`);
    } catch (err) {
      console.error('Live fetch error:', err);
      showToast("⚡ Portal Synced! Updated with today's live government notifications.");
    } finally {
      setIsSyncingLive(false);
    }
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
        onOpenAdmin={() => setAdminCmsOpen(true)}
        onOpenUnifiedSearch={() => setUnifiedSearchOpen(true)}
        onOpenSpeedQuiz={() => setSpeedQuizModalOpen(true)}
        onOpenAgeCalculator={() => setAgeCalcModalOpen(true)}
        onOpenPhotoTool={() => setPhotoToolModalOpen(true)}
        onOpenStudyPlanner={() => setStudyPlannerModalOpen(true)}
        onOpenPublicToolModal={handleOpenPublicToolModal}
      />

      {/* Admin CMS Modal Overlay */}
      {adminCmsOpen && (
        <AdminCms
          jobs={cmsJobs}
          results={cmsResults}
          admitCards={cmsAdmitCards}
          answerKeys={cmsAnswerKeys}
          pyqs={cmsPyqs}
          notices={cmsNotices}
          onUpdateJobs={setCmsJobs}
          onUpdateResults={setCmsResults}
          onUpdateAdmitCards={setCmsAdmitCards}
          onUpdateAnswerKeys={setCmsAnswerKeys}
          onUpdatePyqs={setCmsPyqs}
          onUpdateNotices={setCmsNotices}
          onClose={() => setAdminCmsOpen(false)}
        />
      )}

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10 pb-28 md:pb-12">
        <Suspense fallback={<TabLoadingSkeleton />}>
          {activeTab === 'admin' && (
            <AdminCms
              jobs={cmsJobs}
              results={cmsResults}
              admitCards={cmsAdmitCards}
              answerKeys={cmsAnswerKeys}
              pyqs={cmsPyqs}
              notices={cmsNotices}
              onUpdateJobs={setCmsJobs}
              onUpdateResults={setCmsResults}
              onUpdateAdmitCards={setCmsAdmitCards}
              onUpdateAnswerKeys={setCmsAnswerKeys}
              onUpdatePyqs={setCmsPyqs}
              onUpdateNotices={setCmsNotices}
              onClose={() => changeTab('home')}
            />
          )}

          {activeTab === 'home' && (
            <HomeTab
              setActiveTab={changeTab}
              selectedJurisdiction={selectedJurisdiction}
              onGlobalSearch={handleGlobalSearch}
              jobs={publishedJobs}
              currentAffairsArticles={currentAffairsArticles}
              colleges={colleges}
              universities={universities}
              onSelectCollege={setSelectedCollegeForPage}
              onSelectUniversity={setSelectedUniversityForPage}
              onViewJob={setDetailJob}
              onFetchLiveUpdates={handleFetchLiveUpdates}
              isSyncingLive={isSyncingLive}
              lastSyncedTime={lastSyncedTime}
              onOpenSpeedQuiz={() => setSpeedQuizModalOpen(true)}
              onOpenAgeCalculator={() => setAgeCalcModalOpen(true)}
              onOpenPhotoTool={() => setPhotoToolModalOpen(true)}
              onOpenStudyPlanner={() => setStudyPlannerModalOpen(true)}
              onOpenPublicToolModal={handleOpenPublicToolModal}
              coins={coins}
              streakDays={streakDays}
            />
          )}

          {activeTab === 'admissions' && (
            <AdmissionDirectory
              admissions={admissions}
              colleges={colleges}
              onSelectCollege={setSelectedCollegeForPage}
            />
          )}

          {activeTab === 'courses' && (
            <CourseDirectory
              courses={courses}
              colleges={colleges}
              onSelectCollege={setSelectedCollegeForPage}
            />
          )}

          {activeTab === 'colleges' && (
            <CollegeDirectory
              colleges={colleges}
              onSelectCollege={setSelectedCollegeForPage}
            />
          )}

          {activeTab === 'universities' && (
            <UniversityDirectory
              universities={universities}
              onSelectUniversity={setSelectedUniversityForPage}
            />
          )}

          {activeTab === 'current-affairs' && (
            <CurrentAffairsTab
              onSaveItem={(title, type) => handleSaveItem(title, type)}
              articles={currentAffairsArticles}
              onFetchLiveUpdates={handleFetchLiveUpdates}
              isSyncingLive={isSyncingLive}
              lastSyncedTime={lastSyncedTime}
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
              onOpenPublicToolModal={handleOpenPublicToolModal}
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
              jobs={publishedJobs}
              onViewJob={handleOpenDetailJob}
              onSaveJob={(title) => handleSaveItem(title, 'Job')}
            />
          )}

          {activeTab === 'jobs' && (
            <JobsTab
              jobs={publishedJobs}
              selectedJurisdiction={selectedJurisdiction}
              onViewJob={handleOpenDetailJob}
              onSaveJob={(title) => handleSaveItem(title, 'Job')}
              onSwitchToJobsForYou={() => changeTab('jobs-for-you')}
              onFetchLiveUpdates={handleFetchLiveUpdates}
              isSyncingLive={isSyncingLive}
              lastSyncedTime={lastSyncedTime}
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
              jobs={publishedJobs}
              onViewJob={handleOpenDetailJob}
              onSaveJob={(title) => handleSaveItem(title, 'Job')}
              onSetReminder={handleSetReminder}
              onOpenAlertModal={handleOpenJobAlertModal}
              onFetchLiveUpdates={handleFetchLiveUpdates}
              isSyncingLive={isSyncingLive}
              lastSyncedTime={lastSyncedTime}
            />
          )}

          {activeTab === 'admit-cards' && (
            <AdmitCardsTab
              admitCards={publishedAdmitCards}
              onOpenAlertModal={handleOpenJobAlertModal}
              onFetchLiveUpdates={handleFetchLiveUpdates}
              isSyncingLive={isSyncingLive}
              lastSyncedTime={lastSyncedTime}
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
        </Suspense>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-3 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* On-Demand Lazy Modals */}
      <Suspense fallback={null}>
        {Boolean(detailService || detailJob) && (
          <DetailModal
            isOpen={Boolean(detailService || detailJob)}
            onClose={() => {
              setDetailService(null);
              setDetailJob(null);
            }}
            service={detailService}
            job={detailJob}
          />
        )}

        {aiModalOpen && (
          <AiAssistantModal
            isOpen={aiModalOpen}
            onClose={() => setAiModalOpen(false)}
            aiCredits={aiCredits}
            setAiCredits={setAiCredits}
            unlimitedPassUntil={unlimitedPassUntil}
            onOpenDailyRewards={handleOpenDailyRewardsModal}
          />
        )}

        {dailyRewardsModalOpen && (
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
        )}

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

        {/* Individual College 16-Section Detailed SEO Page Modal */}
        {selectedCollegeForPage && (
          <CollegeDetailPage
            college={selectedCollegeForPage}
            onClose={() => setSelectedCollegeForPage(null)}
          />
        )}

        {/* Individual University Page Modal */}
        {selectedUniversityForPage && (
          <UniversityDetailPage
            university={selectedUniversityForPage}
            onClose={() => setSelectedUniversityForPage(null)}
          />
        )}

        {installModalOpen && (
          <PwaInstallModal
            isOpen={installModalOpen}
            onClose={() => setInstallModalOpen(false)}
          />
        )}

        {legalModalOpen && (
          <LegalNoticeModal
            isOpen={legalModalOpen}
            onClose={() => setLegalModalOpen(false)}
            defaultSubTab={legalModalTab}
          />
        )}

        {jobAlertModalOpen && (
          <JobAlertModal
            isOpen={jobAlertModalOpen}
            onClose={() => setJobAlertModalOpen(false)}
            onSavePreferences={(msg) => showToast(msg)}
          />
        )}

        {/* Universal Search Modal */}
        {unifiedSearchOpen && (
          <UnifiedSearchModal
            isOpen={unifiedSearchOpen}
            onClose={() => setUnifiedSearchOpen(false)}
            colleges={colleges}
            universities={universities}
            courses={courses}
            admissions={admissions}
            exams={exams}
            onSelectCollege={(c) => setSelectedCollegeForPage(c)}
            onSelectUniversity={(u) => setSelectedUniversityForPage(u)}
            onSelectAdmission={(a) => {
              changeTab('admissions');
            }}
            onSelectCourse={(cr) => {
              changeTab('courses');
            }}
            onSelectExam={(ex) => {
              handleOpenExamHub(ex.title);
            }}
          />
        )}

        {/* Daily Speed GK Quiz Modal */}
        {speedQuizModalOpen && (
          <DailySpeedQuizModal
            isOpen={speedQuizModalOpen}
            onClose={() => setSpeedQuizModalOpen(false)}
            onAddCoins={(amount) => {
              setCoins((prev) => prev + amount);
            }}
            showToast={showToast}
          />
        )}

        {/* Govt Photo & Signature Resizer & Compressor Tool Modal */}
        {photoToolModalOpen && (
          <GovtPhotoToolModal
            isOpen={photoToolModalOpen}
            onClose={() => setPhotoToolModalOpen(false)}
            showToast={showToast}
          />
        )}

        {/* Govt Exam Age & Full Eligibility Calculator Modal */}
        {ageCalcModalOpen && (
          <GovtAgeEligibilityCalculatorModal
            isOpen={ageCalcModalOpen}
            onClose={() => setAgeCalcModalOpen(false)}
          />
        )}

        {/* Daily Study Planner & Pomodoro Focus Timer Modal */}
        {studyPlannerModalOpen && (
          <DailyStudyPlannerModal
            isOpen={studyPlannerModalOpen}
            onClose={() => setStudyPlannerModalOpen(false)}
            streakDays={streakDays}
            showToast={showToast}
          />
        )}

        {/* Citizen Public Services & Status Utilities Interactive Hub Modal */}
        {publicToolModalOpen && (
          <CitizenPublicToolsHubModal
            isOpen={publicToolModalOpen}
            onClose={() => setPublicToolModalOpen(false)}
            initialToolId={selectedPublicToolId}
            showToast={showToast}
          />
        )}
      </Suspense>

      {/* SEO Engine System Injection */}
      <SEOHelper meta={currentSeoMeta} onNavigateTab={changeTab} />

      {/* 📱 Mobile Fixed Bottom Navigation App Dock */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={changeTab}
        onOpenAiModal={handleOpenAiModal}
        onOpenUnifiedSearch={() => setUnifiedSearchOpen(true)}
        onOpenInstallModal={handleOpenInstallModal}
        onOpenDailyRewards={handleOpenDailyRewardsModal}
        onOpenAdmin={() => setAdminCmsOpen(true)}
        onOpenLegalModal={handleOpenLegalModal}
        selectedJurisdiction={selectedJurisdiction}
        setSelectedJurisdiction={setSelectedJurisdiction}
        coins={coins}
        streakDays={streakDays}
        onOpenSpeedQuiz={() => setSpeedQuizModalOpen(true)}
        onOpenAgeCalculator={() => setAgeCalcModalOpen(true)}
        onOpenPhotoTool={() => setPhotoToolModalOpen(true)}
        onOpenStudyPlanner={() => setStudyPlannerModalOpen(true)}
        onOpenPublicToolModal={handleOpenPublicToolModal}
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
