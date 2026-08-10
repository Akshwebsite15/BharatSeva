import { BiharModuleItem, BiharModuleType } from '../types';

export const biharModuleMeta: { id: BiharModuleType; label: string; iconName: string; count: number; tagColor: string }[] = [
  { id: 'jobs', label: '1. Bihar Govt Jobs', iconName: 'Briefcase', count: 18, tagColor: 'bg-emerald-100 text-emerald-900' },
  { id: 'bpsc', label: '2. BPSC Portal', iconName: 'Landmark', count: 12, tagColor: 'bg-blue-100 text-blue-900' },
  { id: 'bssc', label: '3. BSSC Exams', iconName: 'FileText', count: 8, tagColor: 'bg-purple-100 text-purple-900' },
  { id: 'btsc', label: '4. BTSC Tech Jobs', iconName: 'Microscope', count: 6, tagColor: 'bg-amber-100 text-amber-900' },
  { id: 'police', label: '5. Bihar Police', iconName: 'ShieldCheck', count: 10, tagColor: 'bg-rose-100 text-rose-900' },
  { id: 'teacher', label: '6. Teacher (TRE)', iconName: 'GraduationCap', count: 9, tagColor: 'bg-teal-100 text-teal-900' },
  { id: 'board', label: '7. Bihar Board (BSEB)', iconName: 'BookOpen', count: 7, tagColor: 'bg-indigo-100 text-indigo-900' },
  { id: 'scholarships', label: '8. Bihar Scholarships', iconName: 'Award', count: 14, tagColor: 'bg-teal-100 text-teal-900' },
  { id: 'schemes', label: '9. Bihar Govt Schemes', iconName: 'Building2', count: 16, tagColor: 'bg-sky-100 text-sky-900' },
  { id: 'rtps', label: '10. Bihar RTPS Portal', iconName: 'ExternalLink', count: 15, tagColor: 'bg-orange-100 text-orange-900' },
  { id: 'certificates', label: '11. Bihar Certificates', iconName: 'FileCheck', count: 5, tagColor: 'bg-emerald-100 text-emerald-900' },
  { id: 'results', label: '12. Bihar Results', iconName: 'Sparkles', count: 11, tagColor: 'bg-yellow-100 text-yellow-900' },
  { id: 'admitcards', label: '13. Bihar Admit Cards', iconName: 'Clock', count: 9, tagColor: 'bg-amber-100 text-amber-900' },
  { id: 'currentaffairs', label: '14. Bihar Current Affairs', iconName: 'BookMarked', count: 25, tagColor: 'bg-rose-100 text-rose-900' },
  { id: 'pyqs', label: '15. Bihar PYQs & Papers', iconName: 'Download', count: 30, tagColor: 'bg-blue-100 text-blue-900' },
];

export const biharModuleItemsList: BiharModuleItem[] = [
  // 1. BIHAR GOVT JOBS
  {
    id: 'bh-job-1',
    title: 'BPSC 70th Integrated Combined Competitive Examination (CCE) 2026',
    module: 'jobs',
    categoryTag: 'Administrative Services',
    updateDate: '2026-08-10',
    description: 'Recruitment for Sub-Divisional Officer (SDO), Deputy Superintendent of Police (DSP), Commercial Tax Officer, and Rural Development Officer.',
    officialPortalName: 'BPSC Official Portal',
    officialUrl: 'https://bpsc.bih.nic.in',
    badgeText: 'APPLICATION OPEN',
    keyDetails: [
      { label: 'Total Posts', value: '1,957 Vacancies' },
      { label: 'Pay Level', value: 'Level 7 to Level 9 (₹53,100 - ₹1,67,800)' },
      { label: 'Qualification', value: 'Graduate in Any Discipline' },
      { label: 'Age Limit', value: '20 to 37 Years (Gen Male) / 40 Years (BC/EBC/Female)' },
      { label: 'Last Date', value: '31 August 2026' },
    ],
    actionLabel: 'Apply Online on BPSC Portal',
  },
  {
    id: 'bh-job-2',
    title: 'Bihar Police Sub-Inspector (Daroga) & Excise Inspector Recruitment 2026',
    module: 'jobs',
    categoryTag: 'Police & Defense',
    updateDate: '2026-08-09',
    description: 'Bihar Police Subordinate Services Commission (BPSSC) notice for 1,275 SI posts in Bihar Police and Prohibition Department.',
    officialPortalName: 'BPSSC Official Portal',
    officialUrl: 'https://bpssc.bih.nic.in',
    badgeText: 'EXAM DATE ANNOUNCED',
    keyDetails: [
      { label: 'Total Posts', value: '1,275 Posts' },
      { label: 'Pay Level', value: 'Level 6 (₹35,400 - ₹1,12,400)' },
      { label: 'Height Req.', value: 'Male: 165cm (Gen/BC) / 160cm (EBC/SC/ST); Female: 155cm' },
      { label: 'Exam Date', value: '25 October 2026' },
    ],
    actionLabel: 'Download Syllabus & Apply',
  },

  // 2. BPSC
  {
    id: 'bh-bpsc-1',
    title: 'BPSC Assistant Engineer (Civil, Mechanical, Electrical) Recruitment 2026',
    module: 'bpsc',
    categoryTag: 'Engineering',
    updateDate: '2026-08-10',
    description: 'Water Resources Dept, Road Construction Dept, and Building Construction Dept recruitment for B.Tech/B.E. Engineers.',
    officialPortalName: 'BPSC Engineering Portal',
    officialUrl: 'https://bpsc.bih.nic.in',
    badgeText: 'ADMIT CARD OUT',
    keyDetails: [
      { label: 'Total Posts', value: '1,024 Posts' },
      { label: 'Qualification', value: 'B.Tech / B.E. in Civil / Mech / Electrical' },
      { label: 'Pay Scale', value: 'Pay Level 9 (Grade Pay 5400)' },
      { label: 'Admit Card Status', value: 'Available for Download' },
    ],
    actionLabel: 'Download AE Admit Card',
  },

  // 3. BSSC
  {
    id: 'bh-bssc-1',
    title: 'BSSC 2nd Inter Level Combined Competitive Exam 2026 (12th Pass)',
    module: 'bssc',
    categoryTag: 'Clerical & Revenue',
    updateDate: '2026-08-10',
    description: 'Bihar Staff Selection Commission notification for Panchayat Sachiv, Revenue Karamchari, LDC, and Panchayat Secretary.',
    officialPortalName: 'BSSC Online Portal',
    officialUrl: 'https://bssc.bihar.gov.in',
    badgeText: '12,199 VACANCIES',
    keyDetails: [
      { label: 'Total Posts', value: '12,199 Posts' },
      { label: 'Qualification', value: '12th Pass (Intermediate)' },
      { label: 'Age Limit', value: '18 to 37 Years (Gen) / 40 Years (BC/EBC)' },
      { label: 'Selection', value: 'Prelims MCQs + Mains MCQs' },
    ],
    actionLabel: 'View BSSC Post Wise Breakdown',
  },

  // 4. BTSC
  {
    id: 'bh-btsc-1',
    title: 'BTSC Auxiliary Nurse Midwife (ANM) & Staff Nurse Grade A Recruitment',
    module: 'btsc',
    categoryTag: 'Medical & Healthcare',
    updateDate: '2026-08-08',
    description: 'Bihar Technical Service Commission hiring for 10,709 ANM nurse posts in Bihar State Health Society hospitals.',
    officialPortalName: 'BTSC Portal',
    officialUrl: 'https://btsc.bih.nic.in',
    badgeText: 'DOCUMENT VERIFICATION',
    keyDetails: [
      { label: 'Total Posts', value: '10,709 Posts' },
      { label: 'Qualification', value: 'ANM Diploma / GNM / B.Sc Nursing' },
      { label: 'Registration', value: 'Must be registered with Bihar Nursing Council' },
      { label: 'DV Date', value: '18 August - 28 August 2026' },
    ],
    actionLabel: 'Check DV Schedule List',
  },

  // 5. BIHAR POLICE
  {
    id: 'bh-police-1',
    title: 'CSBC Bihar Police Constable Recruitment 2026 (21,391 Posts)',
    module: 'police',
    categoryTag: 'Police Constable',
    updateDate: '2026-08-10',
    description: 'Central Selection Board of Constable (CSBC) recruitment for District Police, Special Armed Police (BSAP), and Industrial Security Battalion.',
    officialPortalName: 'CSBC Bihar Police Portal',
    officialUrl: 'https://csbc.bih.nic.in',
    badgeText: 'PHYSICAL TEST (PET) SCHEDULE',
    keyDetails: [
      { label: 'Total Vacancies', value: '21,391 Posts' },
      { label: 'Qualification', value: '10+2 Intermediate Pass' },
      { label: 'PET Standard', value: '1.6km Run (Male) / 1km Run (Female) + Shot Put + High Jump' },
      { label: 'PET Venue', value: 'Patna High School Grounds' },
    ],
    actionLabel: 'Download PET Admit Card',
  },

  // 6. BIHAR TEACHER RECRUITMENT
  {
    id: 'bh-teacher-1',
    title: 'BPSC Bihar Teacher Recruitment Examination (TRE 4.0) 2026',
    module: 'teacher',
    categoryTag: 'Education & Teaching',
    updateDate: '2026-08-10',
    description: 'Massive recruitment for Primary Teacher (Class 1-5), Middle School (6-8), Secondary (9-10), and Higher Secondary (11-12) teachers across Bihar schools.',
    officialPortalName: 'BPSC Teacher Portal',
    officialUrl: 'https://bpsc.bih.nic.in',
    badgeText: '84,000 TEACHER VACANCIES',
    keyDetails: [
      { label: 'Total Vacancies', value: '84,000+ Posts' },
      { label: 'Eligibility', value: 'CTET / STET + D.El.Ed / B.Ed' },
      { label: 'Negative Marking', value: 'NO Negative Marking' },
      { label: 'Application Window', value: '15 August to 15 September 2026' },
    ],
    actionLabel: 'Download Subject Syllabus & Model Papers',
  },

  // 7. BIHAR BOARD (BSEB)
  {
    id: 'bh-board-1',
    title: 'BSEB Bihar Board 10th (Matric) & 12th (Inter) Exam Schedule & Registration 2027',
    module: 'board',
    categoryTag: 'School Board',
    updateDate: '2026-08-09',
    description: 'Bihar School Examination Board (BSEB) dummy registration cards, Board exam form filing, and STET 2026 guidelines.',
    officialPortalName: 'BSEB Official Website',
    officialUrl: 'https://biharboardonline.bihar.gov.in',
    badgeText: 'REGISTRATION ACTIVE',
    keyDetails: [
      { label: 'Board', value: 'BSEB Patna' },
      { label: 'Services', value: 'Dummy Registration, Marks Verification, Duplicate Certificate' },
      { label: 'Helpdesk', value: '0612-2232074' },
    ],
    actionLabel: 'Download BSEB Model Question Papers',
  },

  // 8. BIHAR SCHOLARSHIPS
  {
    id: 'bh-schol-1',
    title: 'Bihar Post-Matric Scholarship (PMS) Portal 2026-27 (SC/ST/BC/EBC)',
    module: 'scholarships',
    categoryTag: 'State Scholarship',
    updateDate: '2026-08-10',
    description: 'Direct Benefit Transfer (DBT) financial assistance up to ₹1,20,000/year for Bihar post-matric students studying in ITI, Polytechnic, B.Tech, B.Sc, B.A., M.Tech.',
    officialPortalName: 'PMS Bihar Portal',
    officialUrl: 'https://pmsonline.bih.nic.in',
    badgeText: 'FRESH & RENEWAL OPEN',
    keyDetails: [
      { label: 'Max Amount', value: 'Up to ₹1.2 Lakhs/Year' },
      { label: 'Category', value: 'SC, ST, BC, EBC Bihar Domicile' },
      { label: 'Income Ceiling', value: 'Family Income Below ₹3.00 Lakhs' },
      { label: 'Deadline', value: '30 October 2026' },
    ],
    actionLabel: 'Apply Online via PMS Portal',
  },
  {
    id: 'bh-schol-2',
    title: 'Mukhyamantri Kanya Utthan Yojana 2026 (Graduate Girls ₹50,000 DBT)',
    module: 'scholarships',
    categoryTag: 'Women Welfare',
    updateDate: '2026-08-10',
    description: 'One-time incentive of ₹50,000 for all unmarried/married female graduates passing from recognized Bihar universities.',
    officialPortalName: 'Medhasoft Portal Bihar',
    officialUrl: 'http://medhasoft.bih.nic.in',
    badgeText: 'PORTAL OPEN FOR 2026 PASS OUTS',
    keyDetails: [
      { label: 'Incentive Amount', value: '₹50,000 Direct Bank Transfer' },
      { label: 'Eligibility', value: 'Girls passing BA / B.Sc / B.Com / B.Tech from Bihar Govt Universities' },
      { label: 'Mandatory Doc', value: 'Aadhaar-seeded Bank Account + Graduation Marksheet' },
    ],
    actionLabel: 'Check Medhasoft Student Name List',
  },

  // 9. BIHAR SCHEMES
  {
    id: 'bh-scheme-1',
    title: 'Mukhyamantri Udyami Yojana 2026 (₹10 Lakh Loan & ₹5 Lakh Subsidy)',
    module: 'schemes',
    categoryTag: 'Business & Startup',
    updateDate: '2026-08-10',
    description: 'Under Saat Nischay Part-2, Department of Industries provides ₹10 Lakhs financial assistance (50% grant + 50% interest-free loan) to setup small factories & businesses in Bihar.',
    officialPortalName: 'Bihar Udyami Portal',
    officialUrl: 'https://udyami.bihar.gov.in',
    badgeText: 'NEW SELECTION LIST OUT',
    keyDetails: [
      { label: 'Total Aid', value: '₹10,000,000 per Beneficiary' },
      { label: 'Subsidy Component', value: '50% Non-refundable Subsidy (₹5 Lakhs)' },
      { label: 'Repayment', value: '7 Years in 84 monthly installments' },
      { label: 'Target Categories', value: 'SC / ST / EBC / Women / Youth' },
    ],
    actionLabel: 'View Selected Candidates List 2026',
  },

  // 10. BIHAR RTPS PORTAL
  {
    id: 'bh-rtps-1',
    title: 'RTPS Bihar Online Portal (e-Services Access Center)',
    module: 'rtps',
    categoryTag: 'E-Governance',
    updateDate: '2026-08-10',
    description: 'Right to Public Services portal (RTPS 1 to RTPS 9) for fast-track digital issuance of certificates, revenue records, and welfare cards without agent involvement.',
    officialPortalName: 'RTPS Official Service Portal',
    officialUrl: 'https://serviceonline.bihar.gov.in',
    badgeText: 'DIGITAL SIGNED CERTIFICATES',
    keyDetails: [
      { label: 'Average SLA', value: '10 to 14 Working Days' },
      { label: 'Verification', value: 'QR-Code Authenticated PDF Certificates' },
      { label: 'Tracking', value: 'Track Status via Application Reference No. / SMS' },
    ],
    actionLabel: 'Track RTPS Application Status',
  },

  // 11. BIHAR CERTIFICATES
  {
    id: 'bh-cert-1',
    title: 'Bihar Caste (Jati), Income (Aaya) & Residence (Niwas) Online Certificates',
    module: 'certificates',
    categoryTag: 'Public Certificates',
    updateDate: '2026-08-10',
    description: 'Apply CO level, SDO level, and DM level online certificates mandatory for BPSC, BSSC, Bihar Police, and Post-Matric Scholarships.',
    officialPortalName: 'ServiceOnline Bihar',
    officialUrl: 'https://serviceonline.bihar.gov.in',
    badgeText: 'INSTANT QR DOWNLOAD',
    keyDetails: [
      { label: 'Caste Certificate', value: 'CO / Revenue Officer Level (Free)' },
      { label: 'Income Certificate', value: 'Valid for 1 Financial Year' },
      { label: 'NCL Certificate', value: 'Non-Creamy Layer for BC/EBC Reservations' },
    ],
    actionLabel: 'Apply Fresh Certificate Online',
  },

  // 12. BIHAR RESULTS
  {
    id: 'bh-result-1',
    title: 'BPSC 69th CCE Final Merit List & Cutoff Marks Declared',
    module: 'results',
    categoryTag: 'Exam Results',
    updateDate: '2026-08-10',
    description: 'BPSC has released the final roll-wise merit list and category cutoffs for 69th Combined Competitive Examination.',
    officialPortalName: 'BPSC Results Portal',
    officialUrl: 'https://bpsc.bih.nic.in',
    badgeText: 'FINAL MERIT PDF OUT',
    keyDetails: [
      { label: 'Exam Name', value: 'BPSC 69th CCE' },
      { label: 'UR Cutoff', value: '475 / 900 Marks' },
      { label: 'Selected Candidates', value: '475 Candidates Selected' },
    ],
    actionLabel: 'Download Result PDF & Marksheet',
  },

  // 13. BIHAR ADMIT CARDS
  {
    id: 'bh-admit-1',
    title: 'Bihar Police Constable PET Admit Card 2026 Download',
    module: 'admitcards',
    categoryTag: 'Hall Ticket',
    updateDate: '2026-08-10',
    description: 'CSBC has uploaded physical efficiency test (PET) e-admit cards for candidates qualifying written examination.',
    officialPortalName: 'CSBC Portal',
    officialUrl: 'https://csbc.bih.nic.in',
    badgeText: 'LINK ACTIVE',
    keyDetails: [
      { label: 'Credentials', value: 'Registration No. + Date of Birth' },
      { label: 'Documents Needed', value: 'Printed Admit Card + Aadhaar Card + Original Marksheets' },
    ],
    actionLabel: 'Download PET Hall Ticket',
  },

  // 14. BIHAR CURRENT AFFAIRS
  {
    id: 'bh-ca-1',
    title: 'Bihar State Budget 2026-27 Highlights & Key Economic Development Allocations',
    module: 'currentaffairs',
    categoryTag: 'State Economy',
    updateDate: '2026-08-10',
    description: 'Complete analysis of Bihar Budget presented in Assembly: ₹2.78 Lakh Crore total budget size with maximum allocation for Education (22%) and Rural Infrastructure (15%).',
    officialPortalName: 'Finance Department Bihar',
    officialUrl: 'https://state.bihar.gov.in/finance',
    badgeText: 'IMPORTANT FOR BPSC & BSSC',
    keyDetails: [
      { label: 'Budget Size', value: '₹2,78,420 Crore' },
      { label: 'Top Allocation', value: 'Education Department (₹52,000 Crore)' },
      { label: 'Economic Growth', value: 'Bihar GDP Growth Rate estimated at 10.6%' },
    ],
    actionLabel: 'Download Bihar Budget Summary PDF',
  },

  // 15. BIHAR PYQS
  {
    id: 'bh-pyq-1',
    title: 'BPSC Prelims Previous 10 Years Question Papers with Detailed Explanations',
    module: 'pyqs',
    categoryTag: 'Question Papers',
    updateDate: '2026-08-10',
    description: 'Download year-wise question paper PDFs for BPSC 69th, 68th, 67th, 66th, 65th Prelims General Studies (GS) with official answer keys.',
    officialPortalName: 'BharatSeva Exam Archive',
    officialUrl: 'https://bpsc.bih.nic.in',
    badgeText: 'SOLVED PDF ARCHIVE',
    keyDetails: [
      { label: 'Total Papers', value: '10 Full Prelims Papers (1,500 Questions)' },
      { label: 'Languages', value: 'Hindi & English Medium' },
      { label: 'Solutions', value: 'Verified Step-by-Step Explanations' },
    ],
    actionLabel: 'Download Free BPSC PYQ PDFs',
  },
];
