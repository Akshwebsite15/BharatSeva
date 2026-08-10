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
  fee: string;
  salary: string;
  selection: string;
  documents: string[];
  notification: string;
  appLink: string;
  verificationStatus: string;
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
