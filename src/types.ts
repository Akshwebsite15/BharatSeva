export type JurisdictionState = 'Bihar' | 'All India' | 'Delhi' | 'Uttar Pradesh' | 'Maharashtra';

export interface CitizenService {
  id: string;
  title: string;
  category: 'Certificate' | 'Welfare & Identity' | 'Revenue & Land' | 'Education & Skill' | 'Business & Tax';
  state: JurisdictionState | 'All';
  mode: 'Online' | 'Offline' | 'Hybrid';
  popularity: number;
  relevance: number;
  processingTime: string;
  overview: string;
  eligibility: string;
  documents: string[];
  fees: string;
  process: string[];
  officialUrl: string;
  lastVerifiedDate: string;
  warnings?: string;
}

export interface Scholarship {
  id: string;
  title: string;
  level: 'School' | 'Undergraduate' | 'Postgraduate' | 'Research / PhD';
  category: 'SC/ST/EBC' | 'General/EWS' | 'Minority' | 'Women & Children' | 'All';
  income: 'Below 1.5L' | 'Below 2.5L' | 'Below 8L' | 'Any Family Income';
  amount: string;
  deadline: string;
  source: string;
  eligibility: string;
  overview: string;
  verificationDate: string;
}

export interface WelfareScheme {
  id: string;
  title: string;
  category: 'Education' | 'Employment' | 'Agriculture' | 'Health' | 'Housing' | 'Finance' | 'Entrepreneurship';
  state: JurisdictionState | 'All India';
  department: string;
  overview: string;
  benefits: string;
  eligibility: string;
  beneficiaries: string;
  source: string;
  verificationDate: string;
}

export interface GovJob {
  id: string;
  title: string;
  organization: string;
  type: 'Bihar' | 'Central' | 'Delhi' | 'Uttar Pradesh';
  qualification: '10th' | '12th' | 'Graduate' | 'Diploma' | 'B.Tech' | 'Post Graduate';
  vacancy: string;
  age: string;
  dates: string;
  deadlineDate?: string; // YYYY-MM-DD for deadline tracking engine
  startDate?: string; // YYYY-MM-DD
  fee: string;
  salary: string;
  selection: string;
  documents: string[];
  notification: string;
  appLink: string;
  verificationStatus: string;
  // Matching Engine Parameters
  minAge?: number;
  maxAgeGen?: number;
  reqQualificationLevel?: '10th' | '12th' | 'Diploma' | 'ITI' | 'Graduate' | 'B.Tech' | 'Post Graduate';
  reqBranches?: string[]; // e.g. ['CSE', 'Civil', 'Electrical', 'Mechanical', 'Any']
  requiresPhysical?: boolean;
  minHeightMaleCm?: number;
  minHeightFemaleCm?: number;
  minTenthPercentage?: number;
  minTwelfthPercentage?: number;
  minGraduationPercentage?: number;
  reqExperienceYears?: number;
  specialConditions?: string;
}

export interface UserProfile {
  dob: string; // YYYY-MM-DD
  gender: 'Male' | 'Female' | 'Transgender' | 'Other';
  state: JurisdictionState;
  category: 'General' | 'EWS' | 'OBC' | 'BC' | 'EBC' | 'SC' | 'ST';
  tenthPercentage: number;
  twelfthPercentage: number;
  graduationPercentage: number;
  highestQualification: '10th' | '12th' | 'Diploma' | 'ITI' | 'Graduate' | 'B.Tech' | 'Post Graduate';
  degreeBranch: string; // e.g. 'CSE', 'Civil', 'Electrical', 'Mechanical', 'B.A.', 'B.Sc', 'B.Com', 'Fitter ITI'
  passingYear: number;
  postGraduation: string; // e.g. 'M.Tech', 'M.Sc', 'M.A.', 'None'
  diplomaIti: string; // e.g. 'Diploma Civil', 'ITI Fitter', 'None'
  experienceYears: number;
  heightCm: number;
  chestCm?: number;
  isPhysicalFit: boolean;
}

export type MatchStatus = 'Eligible' | 'Possibly Eligible' | 'Not Eligible';

export interface JobEligibilityResult {
  job: GovJob;
  status: MatchStatus;
  score: number;
  reasons: string[];
  warnings: string[];
}

export interface GovExam {
  id: string;
  title: string;
  category: 'BPSC' | 'BSSC' | 'Bihar Police' | 'Bihar Teacher' | 'UPSC' | 'SSC' | 'Banking' | 'Railways';
  status: 'Upcoming Application' | 'Application Open' | 'Admit Card Released' | 'Result Awaited' | 'Exam Completed';
  examDate: string;
  admitCardDate: string;
  resultDate: string;
  eligibility: string;
  fees: string;
  notification: string;
  website: string;
  hubId?: string; // links to full ExamLifecycleHubData
}

// Complete Exam Lifecycle Interfaces
export interface SampleQuestion {
  questionNumber: number;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface PreviousPaper {
  year: number;
  tier: string;
  title: string;
  downloadUrl?: string;
  totalQuestions: number;
  durationMinutes: number;
  sampleQuestions: SampleQuestion[];
}

export interface CutoffData {
  year: number;
  tier: string;
  general: number | string;
  ews: number | string;
  obc: number | string;
  sc: number | string;
  st: number | string;
  maxMarks: number;
  notes?: string;
}

export interface ExamLifecycleHubData {
  id: string;
  title: string;
  shortTitle: string;
  conductingBody: string;
  category: 'BPSC' | 'BSSC' | 'Bihar Police' | 'Bihar Teacher' | 'UPSC' | 'SSC' | 'Banking' | 'Railways';
  currentStage:
    | 'Latest Notification'
    | 'Application Open'
    | 'Admit Card Out'
    | 'Exam Phase'
    | 'Answer Key Released'
    | 'Result Declared'
    | 'Final Selection / DV';
  lastUpdated: string;
  officialWebsite: string;
  bannerImage?: string;

  // 1. Latest Notification
  notification: {
    advtNo: string;
    releaseDate: string;
    summary: string;
    officialPdfUrl: string;
    keyHighlights: string[];
  };

  // 2. Eligibility & Age
  eligibility: {
    qualification: string;
    allowedStreams: string[];
    minAge: number;
    maxAgeGen: number;
    ageRelaxations: { category: string; years: number }[];
    physicalStandards?: { heightMale: string; heightFemale: string; chestMale?: string; endurance: string };
    extraConditions?: string[];
  };

  // 3. Vacancy Breakdown
  vacancy: {
    totalPosts: string;
    postList: { postTitle: string; payLevel: string; vacancies: string; dept: string }[];
    categoryQuota?: { category: string; count: string }[];
  };

  // 4. Salary & Perks
  salary: {
    payScale: string;
    basicPay: string;
    approxInHand: string;
    allowances: string[];
  };

  // 5. Syllabus
  syllabus: {
    tier: string;
    subjects: { name: string; totalMarks: number; topics: string[]; keyBooks: string }[];
  }[];

  // 6. Exam Pattern
  examPattern: {
    tier: string;
    mode: string;
    durationMinutes: number;
    totalQuestions: number;
    totalMarks: number;
    negativeMarking: string;
    sections: { sectionName: string; questions: number; marks: number }[];
  }[];

  // 7. Previous Year Papers (PYQ)
  previousPapers: PreviousPaper[];

  // 8. Cutoff Trends
  cutoffs: CutoffData[];

  // 9. Application
  application: {
    startDate: string;
    endDate: string;
    feeGeneral: string;
    feeReserved: string;
    applyUrl: string;
    requiredDocs: string[];
  };

  // 10. Admit Card
  admitCard: {
    status: string;
    releaseDate: string;
    downloadUrl: string;
    instructions: string[];
  };

  // 11. Exam Date & Schedule
  examSchedule: {
    tier1Date: string;
    tier2Date?: string;
    shifts: string[];
    examCenterCities: string[];
  };

  // 12. Answer Key
  answerKey: {
    status: string;
    releaseDate: string;
    objectionDeadline: string;
    objectionFee: string;
    portalUrl: string;
  };

  // 13. Result & Merit List
  result: {
    status: string;
    declarationDate: string;
    meritListPdfUrl: string;
    cutOffPdfUrl: string;
  };

  // 14. Document Verification & Final Selection
  finalSelection: {
    dvProcess: string[];
    medicalStandard: string;
    meritFormula: string;
  };
}

export interface DeadlineItem {
  id: string;
  title: string;
  type: 'Scholarship' | 'Job' | 'Exam' | 'Certificate';
  date: string; // YYYY-MM-DD
  daysLeft: number;
  urgency: 'Normal' | 'Urgent' | 'Critical';
  targetUrl?: string;
}

export interface SavedItem {
  id: string;
  title: string;
  type: 'Service' | 'Scholarship' | 'Scheme' | 'Job' | 'Exam';
  addedAt: string;
  extraInfo?: string;
}

export interface ApplicationStatus {
  id: string;
  title: string;
  type: 'Certificate' | 'Job Application' | 'Scholarship' | 'Scheme';
  applicationNo: string;
  status: 'Draft' | 'Applied' | 'Under Review' | 'Document Verified' | 'Approved' | 'Action Required';
  dateApplied: string;
  lastNote: string;
  portalUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

// Today's Current Affairs & Daily Quiz Types
export type CurrentAffairsCategory =
  | 'National'
  | 'International'
  | 'Economy'
  | 'Science & Technology'
  | 'Defence'
  | 'Government Schemes'
  | 'Bihar'
  | 'Sports'
  | 'Awards'
  | 'Important Appointments';

export interface CurrentAffairsArticle {
  id: string;
  title: string;
  category: CurrentAffairsCategory;
  date: string; // YYYY-MM-DD
  summary: string;
  keyPoints: string[];
  impactAnalysis: string;
  source: string;
  readTimeMinutes: number;
  isTrending?: boolean;
}

export interface CurrentAffairsQuizQuestion {
  id: string;
  articleId?: string;
  category: CurrentAffairsCategory;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface CurrentAffairsQuiz {
  id: string;
  date: string;
  title: string;
  totalQuestions: number;
  questions: CurrentAffairsQuizQuestion[];
}

// BharatSeva Bihar Types
export type BiharModuleType =
  | 'jobs'
  | 'bpsc'
  | 'bssc'
  | 'btsc'
  | 'police'
  | 'teacher'
  | 'board'
  | 'scholarships'
  | 'schemes'
  | 'rtps'
  | 'certificates'
  | 'results'
  | 'admitcards'
  | 'currentaffairs'
  | 'pyqs';

export interface BiharModuleItem {
  id: string;
  title: string;
  module: BiharModuleType;
  categoryTag: string;
  updateDate: string;
  description: string;
  officialPortalName: string;
  officialUrl: string;
  badgeText?: string;
  keyDetails: { label: string; value: string }[];
  actionLabel?: string;
  downloadPdfUrl?: string;
}

// Search Intent Hub Types
export interface IntentPageData {
  slug: string;
  category: 'Jobs' | 'Exam' | 'Results' | 'Services';
  queryTitle: string; // e.g. "10th pass government jobs 2026"
  headline: string;
  lastUpdated: string;
  summary: string;
  eligibilityOrOverview: string;
  stepByStepGuide?: string[];
  tableData?: { label: string; value: string; details?: string }[];
  officialPortalUrl: string;
  officialPortalName: string;
  faqs: { question: string; answer: string }[];
  relatedSearchQueries: string[];
}
