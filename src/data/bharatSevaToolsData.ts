export interface PopularTool {
  id: string;
  name: string;
  shortName: string;
  category: 'Finance' | 'Academic' | 'Utility' | 'Govt & Career' | 'Health';
  description: string;
  icon: string;
  badge?: string;
  isPopular?: boolean;
}

export interface AiUtility {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: 'Career' | 'Academic' | 'Govt Schemes' | 'Business';
  icon: string;
  samplePrompt: string;
  systemInstruction: string;
  actionText: string;
  badge?: string;
}

export interface FeaturedArticle {
  id: string;
  title: string;
  category: 'Scheme' | 'Scholarship' | 'Exam' | 'Career' | 'Finance';
  categoryColor: string;
  readTime: string;
  date: string;
  imageUrl: string;
  summary: string;
  sourceUrl?: string;
}

export interface ExamPrepCategory {
  id: string;
  code: string;
  name: string;
  subTitle: string;
  category: 'Engineering' | 'Civil Services' | 'Staff Selection' | 'Banking' | 'Medical' | 'Railway' | 'State Exams' | 'University Exams';
  logoText: string;
  logoBg: string;
  logoBorder: string;
  logoTextColor: string;
  badge: string;
  syllabusOverview: string;
  importantDates: string;
  totalApplicants: string;
  pyqCount: string;
  mockTestCount: string;
  notesAvailable: string;
  officialPortal: string;
}

export interface TrendingSchemeItem {
  id: string;
  title: string;
  authority: string;
  category: 'Agriculture' | 'Housing' | 'Healthcare' | 'Women & Child' | 'Education' | 'Financial';
  shortDesc: string;
  benefitBadge: string;
  benefitBadgeColor: string;
  eligibilitySnippet: string;
  applicationMode: 'Online' | 'Offline' | 'CSC / Seva Kendra';
  portalUrl: string;
  iconType: string;
  accentColor: string;
}

export const POPULAR_TOOLS_DATA: PopularTool[] = [
  {
    id: 'emi-calc',
    name: 'EMI Calculator',
    shortName: 'EMI Calculator',
    category: 'Finance',
    description: 'Calculate monthly home, education, car, and personal loan EMIs with total interest split.',
    icon: '₹',
    isPopular: true,
  },
  {
    id: 'sip-calc',
    name: 'SIP Calculator',
    shortName: 'SIP Calculator',
    category: 'Finance',
    description: 'Calculate future returns on monthly mutual fund SIP investments and wealth growth.',
    icon: '📈',
    isPopular: true,
  },
  {
    id: 'income-tax-calc',
    name: 'Income Tax Calculator',
    shortName: 'Income Tax Calc',
    category: 'Finance',
    description: 'Compare Old vs New Tax Regime (FY 2025-26 / AY 2026-27) with Standard Deduction & 80C.',
    icon: '🏛️',
    isPopular: true,
  },
  {
    id: 'cgpa-calc',
    name: 'CGPA Calculator',
    shortName: 'CGPA Calculator',
    category: 'Academic',
    description: 'Convert 10-point CGPA into exact university percentage and division for CBSE, AICTE & State Boards.',
    icon: '🎓',
    isPopular: true,
  },
  {
    id: 'percentage-calc',
    name: 'Percentage Calculator',
    shortName: 'Percentage Calc',
    category: 'Academic',
    description: 'Calculate marks percentage, cutoff increases, discount percentages, and ratio changes instantly.',
    icon: '%',
    isPopular: true,
  },
  {
    id: 'age-calc',
    name: 'Age Calculator for Govt Exams',
    shortName: 'Age Calculator',
    category: 'Govt & Career',
    description: 'Check exact years, months, days and category-wise age relaxation for BPSC, SSC, UPSC, CSBC & RRB.',
    icon: '🕒',
    isPopular: true,
  },
  {
    id: 'bmi-calc',
    name: 'BMI & Physical Standards Calculator',
    shortName: 'BMI Calculator',
    category: 'Health',
    description: 'Calculate Body Mass Index and check height/weight physical standards for Police & Defence exams.',
    icon: '❤️',
    isPopular: true,
  },
  {
    id: 'photo-resizer',
    name: 'Photo & Signature Resizer (20KB - 50KB)',
    shortName: 'Photo Resizer',
    category: 'Govt & Career',
    description: 'Crop, resize, and compress application photos and signatures to strict government portal dimensions.',
    icon: '✂️',
    isPopular: true,
  },
  {
    id: 'fd-calc',
    name: 'Fixed Deposit (FD) Calculator',
    shortName: 'FD Calculator',
    category: 'Finance',
    description: 'Calculate Bank & Post Office Fixed Deposit maturity amount with quarterly compounding.',
    icon: '🏦',
  },
  {
    id: 'rd-calc',
    name: 'Recurring Deposit (RD) Calculator',
    shortName: 'RD Calculator',
    category: 'Finance',
    description: 'Calculate Post Office and Bank RD maturity value with monthly interest compounding.',
    icon: '💰',
  },
  {
    id: 'gst-calc',
    name: 'GST Calculator',
    shortName: 'GST Calculator',
    category: 'Finance',
    description: 'Add or remove 5%, 12%, 18%, and 28% GST for business invoices and invoices breakdown.',
    icon: '🧾',
  },
  {
    id: 'salary-ctc-calc',
    name: 'Salary & In-Hand CTC Calculator',
    shortName: 'Salary Calculator',
    category: 'Govt & Career',
    description: 'Compute in-hand monthly salary from Gross CTC after PF, ESI, Gratuity, and Professional Tax deductions.',
    icon: '💼',
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter (Land & Measurements)',
    shortName: 'Unit Converter',
    category: 'Utility',
    description: 'Convert Indian land units (Bigha, Katha, Dhur, Decimal, Acre, Sq. Feet) and metric measurements.',
    icon: '📏',
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter (INR Exchange)',
    shortName: 'Currency Converter',
    category: 'Finance',
    description: 'Live benchmark exchange rates for USD, EUR, GBP, AED, CAD, and AUD to Indian Rupee (INR).',
    icon: '💱',
  },
];

export const AI_UTILITIES_DATA: AiUtility[] = [
  {
    id: 'ai-career-advisor',
    name: 'AI Career Advisor',
    shortDescription: 'Get career suggestions based on your skills and interests.',
    fullDescription: 'Analyzes your academic background, stream, interests, and salary goals to suggest the most lucrative government & private career paths with step-by-step roadmaps.',
    category: 'Career',
    icon: '👤',
    samplePrompt: 'I have completed B.Sc Mathematics with 65% marks. What are the best career options between Govt Jobs (BPSC/SSC/Banking) and Data Analytics?',
    systemInstruction: 'You are an expert Indian Career Guidance Counselor. Provide clear, realistic, structured advice on exams, eligibility, salary ranges in INR, and 12-month study roadmaps.',
    actionText: 'Try Now',
    badge: 'Popular',
  },
  {
    id: 'ai-resume-builder',
    name: 'AI Resume Builder',
    shortDescription: 'Create ATS-friendly resumes in minutes with AI.',
    fullDescription: 'Generates high-impact, ATS-optimized bullet points, executive summaries, and skill sections tailored for freshers, engineers, government contractual posts, and private sector jobs.',
    category: 'Career',
    icon: '📄',
    samplePrompt: 'Generate 5 high-impact ATS resume bullet points for a Computer Science graduate applying for a Junior Software Engineer / IT Assistant role in India.',
    systemInstruction: 'You are an ATS Resume Strategist. Write action-verb-oriented, quantified achievement bullet points using the XYZ formula (Accomplished [X], measured by [Y], by doing [Z]).',
    actionText: 'Try Now',
    badge: 'ATS Ready',
  },
  {
    id: 'ai-interview-prep',
    name: 'AI Interview Prep',
    shortDescription: 'Practice interviews with AI & boost your confidence.',
    fullDescription: 'Conducts simulated mock interview rounds for UPSC Personality Test, BPSC Interviews, Bank PO, and Tech roles with instant feedback and Hindi/English sample answers.',
    category: 'Career',
    icon: '🎙️',
    samplePrompt: 'Conduct a mock interview for Bank PO / BPSC candidate. Ask me 3 challenging situational questions regarding public service and policy implementation.',
    systemInstruction: 'You are a Senior Panel Interviewer for Indian Public Services. Ask insightful situational questions and provide constructive feedback on clarity, ethics, and poise.',
    actionText: 'Try Now',
  },
  {
    id: 'ai-scheme-finder',
    name: 'AI Scheme Finder',
    shortDescription: 'Find government schemes you are eligible for.',
    fullDescription: 'Smart questionnaire that instantly matches your age, state, annual family income, caste category, and landholding with 250+ Central and State welfare schemes & subsidies.',
    category: 'Govt Schemes',
    icon: '🏛️',
    samplePrompt: 'My family lives in Bihar with annual income of ₹1.8 Lakhs. My sister is studying in 1st year college and father is a small farmer. What government schemes and scholarships are we eligible for?',
    systemInstruction: 'You are an Indian Government Welfare Schemes Expert. List exact eligible central & state schemes (e.g. PM Kisan, PMS Scholarship, Kanya Utthan, Ayushman Bharat) with links and documents needed.',
    actionText: 'Try Now',
    badge: 'High Impact',
  },
  {
    id: 'ai-doubt-solver',
    name: 'AI Doubt Solver',
    shortDescription: 'Get instant answers to your academic questions.',
    fullDescription: 'Solves complex quantitative aptitude, reasoning, general science, Indian polity, history, and current affairs doubts with step-by-step explanations and shortcut tricks.',
    category: 'Academic',
    icon: '❓',
    samplePrompt: 'Explain the difference between Article 32 and Article 226 of the Indian Constitution with key Supreme Court precedents for competitive exams.',
    systemInstruction: 'You are a master educator for competitive exams (UPSC/State PSC/SSC). Break down concepts logically with mnemonics, tables, and exam-relevant pointers.',
    actionText: 'Try Now',
  },
  {
    id: 'ai-study-planner',
    name: 'AI Study Planner',
    shortDescription: 'Personalized study plan to achieve your goals.',
    fullDescription: 'Builds customized 30-day, 60-day, or 180-day revision timetables with daily targets, mock test schedules, and Pomodoro break intervals tailored to your target exam.',
    category: 'Academic',
    icon: '📅',
    samplePrompt: 'Create a realistic 60-day daily study timetable for BSSC Inter Level / SSC CGL with 6 hours of daily study time covering Maths, Reasoning, and GK.',
    systemInstruction: 'You are a competitive exam mentor. Create structured, sustainable daily schedules with specific time blocks, revision slots, and weekly mock test cadence.',
    actionText: 'Try Now',
  },
  {
    id: 'ai-scholarship-finder',
    name: 'AI Scholarship Finder',
    shortDescription: 'Instant matching for school, UG, PG, and girl child scholarships.',
    fullDescription: 'Scans NSP, Post Matric, PMSS, and private corporate CSR scholarships based on your academic score and category to find grants up to ₹1,00,000/year.',
    category: 'Academic',
    icon: '🎓',
    samplePrompt: 'Find all open scholarships for a female student pursuing B.Tech CSE in a government college with 85% in 12th board and family income below ₹2.5 Lakh.',
    systemInstruction: 'You are a national scholarship advisor. Identify specific verified scholarships, portal deadlines, income limits, and required paperwork.',
    actionText: 'Try Now',
  },
  {
    id: 'ai-business-idea-gen',
    name: 'AI Business Idea Generator',
    shortDescription: 'Discover viable local business ideas & government subsidy schemes.',
    fullDescription: 'Generates profitable micro-enterprise, agro-processing, and retail business ideas eligible for Bihar Udyami Yojana (₹10 Lakh grant/loan) and PM Mudra Loan.',
    category: 'Business',
    icon: '💡',
    samplePrompt: 'Suggest 3 high-demand rural/semi-urban business ideas in Bihar with an initial budget of ₹5 Lakhs that are eligible for PM Mudra or State Udyami subsidies.',
    systemInstruction: 'You are an MSME and entrepreneurship consultant. Provide realistic profit margin estimates, capital breakdown, licensing requirements, and relevant government subsidy schemes.',
    actionText: 'Try Now',
  },
];

export const TRENDING_SCHEMES_DATA: TrendingSchemeItem[] = [
  {
    id: 'pm-kisan',
    title: 'PM Kisan Samman Nidhi',
    authority: 'Ministry of Agriculture & Farmers Welfare',
    category: 'Agriculture',
    shortDesc: 'Financial assistance to small and marginal farmers across India.',
    benefitBadge: '₹6,000 / Year',
    benefitBadgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    eligibilitySnippet: 'Landholding farmer families with cultivable land up to 2 hectares.',
    applicationMode: 'Online',
    portalUrl: 'https://pmkisan.gov.in',
    iconType: '🌾',
    accentColor: 'from-amber-500 to-emerald-600',
  },
  {
    id: 'pm-awas-gramin',
    title: 'PM Awas Yojana (Gramin)',
    authority: 'Ministry of Rural Development',
    category: 'Housing',
    shortDesc: 'Financial grant for construction of pucca house with basic amenities for rural families.',
    benefitBadge: '₹1,20,000',
    benefitBadgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    eligibilitySnippet: 'Houseless families or living in kutcha/dilapidated houses as per SECC 2011.',
    applicationMode: 'CSC / Seva Kendra',
    portalUrl: 'https://pmayg.nic.in',
    iconType: '🏠',
    accentColor: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'ayushman-bharat',
    title: 'Ayushman Bharat Yojana',
    authority: 'National Health Authority (NHA)',
    category: 'Healthcare',
    shortDesc: 'Cashless hospitalisation coverage for secondary and tertiary care in empaneled hospitals.',
    benefitBadge: '₹5 Lakh Cover',
    benefitBadgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    eligibilitySnippet: 'Families identified under SECC socio-economic deprivation criteria and senior citizens 70+.',
    applicationMode: 'Online',
    portalUrl: 'https://beneficiary.nha.gov.in',
    iconType: '🛡️',
    accentColor: 'from-teal-600 to-cyan-600',
  },
  {
    id: 'beti-bachao',
    title: 'Beti Bachao Beti Padhao',
    authority: 'Ministry of Women & Child Development',
    category: 'Women & Child',
    shortDesc: 'Empowering girl child, ensuring survival, protection, and complete higher education.',
    benefitBadge: 'Various Benefits',
    benefitBadgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    eligibilitySnippet: 'Indian girl children from birth through completion of graduation and skill training.',
    applicationMode: 'Online',
    portalUrl: 'https://wcd.nic.in',
    iconType: '👧',
    accentColor: 'from-rose-500 to-pink-600',
  },
  {
    id: 'mudra-yojana',
    title: 'Pradhan Mantri Mudra Yojana',
    authority: 'Ministry of Finance / SIDBI',
    category: 'Financial',
    shortDesc: 'Collateral-free business loans for micro and small enterprises under Shishu, Kishore & Tarun.',
    benefitBadge: 'Up to ₹20 Lakh',
    benefitBadgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    eligibilitySnippet: 'Non-corporate, non-farm small/micro enterprises and self-employed individuals.',
    applicationMode: 'Online',
    portalUrl: 'https://www.mudra.org.in',
    iconType: '💼',
    accentColor: 'from-amber-600 to-orange-600',
  },
  {
    id: 'kanya-utthan',
    title: 'Mukhyamantri Kanya Utthan Yojana (Bihar)',
    authority: 'Education & Social Welfare Dept, Bihar',
    category: 'Education',
    shortDesc: 'Direct cash grant of ₹50,000 upon graduation and ₹25,000 for 12th pass girl students.',
    benefitBadge: '₹50,000 Direct',
    benefitBadgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    eligibilitySnippet: 'Unmarried/Graduate female students permanent residents of Bihar.',
    applicationMode: 'Online',
    portalUrl: 'https://medhasoft.bih.nic.in',
    iconType: '🎓',
    accentColor: 'from-purple-600 to-indigo-600',
  },
];

export const EXAM_PREP_CATEGORIES_DATA: ExamPrepCategory[] = [
  {
    id: 'gate-2025',
    code: 'GATE 2025',
    name: 'Graduate Aptitude Test in Engineering',
    subTitle: 'Syllabus, PYQ, Mock Tests',
    category: 'Engineering',
    logoText: 'GATE',
    logoBg: 'bg-emerald-50',
    logoBorder: 'border-emerald-200',
    logoTextColor: 'text-emerald-700',
    badge: 'National Level',
    syllabusOverview: 'General Aptitude (15 Marks) + Engineering Mathematics & Subject Paper (85 Marks). 65 Questions, 3 Hours, CBT mode.',
    importantDates: 'Exam Dates: Feb 2026 | Result: March 2026',
    totalApplicants: '8.2 Lakhs',
    pyqCount: '15 Years (2010 - 2025)',
    mockTestCount: '45 Full Tests',
    notesAvailable: 'Handwritten Formula Sheets & Short Notes',
    officialPortal: 'https://gate2025.iitr.ac.in',
  },
  {
    id: 'upsc-cce',
    code: 'UPSC',
    name: 'Civil Services Examination (IAS/IPS/IFS)',
    subTitle: 'Prelims, Mains, Interview',
    category: 'Civil Services',
    logoText: 'UPSC',
    logoBg: 'bg-amber-50',
    logoBorder: 'border-amber-200',
    logoTextColor: 'text-amber-700',
    badge: 'Premier Apex',
    syllabusOverview: 'Prelims (GS-1 & CSAT) + Mains (9 Descriptive Papers) + Personality Test / Interview. Total 2025 Marks.',
    importantDates: 'Prelims: May 2026 | Mains: September 2026',
    totalApplicants: '11.5 Lakhs',
    pyqCount: '25 Years Prelims & Mains',
    mockTestCount: '60 GS & CSAT Mocks',
    notesAvailable: 'Topper Notes, Ethics Cases & NCERT Summaries',
    officialPortal: 'https://upsc.gov.in',
  },
  {
    id: 'ssc-cgl-chsl',
    code: 'SSC',
    name: 'Staff Selection Commission (CGL, CHSL, MTS)',
    subTitle: 'CGL, CHSL, MTS & more',
    category: 'Staff Selection',
    logoText: 'SSC',
    logoBg: 'bg-rose-50',
    logoBorder: 'border-rose-200',
    logoTextColor: 'text-rose-700',
    badge: '15,000+ Posts',
    syllabusOverview: 'Tier-1 (Reasoning, GA, Quantitative Aptitude, English Comprehension - 200 Marks) + Tier-2 Computer & Typing Test.',
    importantDates: 'CGL Tier-1: Sept 2026 | CHSL: July 2026',
    totalApplicants: '28+ Lakhs',
    pyqCount: '120 Shift Papers Solved',
    mockTestCount: '100 Speed Tests',
    notesAvailable: 'Formula Books, English Vocab & Static GK Compendiums',
    officialPortal: 'https://ssc.gov.in',
  },
  {
    id: 'banking-ibps-sbi',
    code: 'Banking',
    name: 'Banking Recruitment (IBPS, SBI, RBI)',
    subTitle: 'IBPS, SBI, RBI & more',
    category: 'Banking',
    logoText: 'IBPS',
    logoBg: 'bg-blue-50',
    logoBorder: 'border-blue-200',
    logoTextColor: 'text-blue-700',
    badge: 'High Frequency',
    syllabusOverview: 'Prelims (Quant, Reasoning, English - 100 Marks, 60 Mins) + Mains (Data Interpretation, Banking Awareness, Descriptive).',
    importantDates: 'SBI PO: Nov 2026 | IBPS PO: Oct 2026',
    totalApplicants: '22+ Lakhs',
    pyqCount: '10 Years Memory Based',
    mockTestCount: '80 Timed Tests',
    notesAvailable: 'Banking Financial Awareness & Speed Math Tricks',
    officialPortal: 'https://ibps.in',
  },
  {
    id: 'jee-main-adv',
    code: 'JEE',
    name: 'Joint Entrance Examination (Main & Advanced)',
    subTitle: 'Main & Advanced Preparation',
    category: 'Engineering',
    logoText: 'JEE',
    logoBg: 'bg-orange-50',
    logoBorder: 'border-orange-200',
    logoTextColor: 'text-orange-700',
    badge: 'IIT / NIT Entrance',
    syllabusOverview: 'Physics, Chemistry, and Mathematics (300 Marks). NTA CBT mode with section-wise numerical value questions.',
    importantDates: 'Session 1: Jan 2026 | Session 2: April 2026',
    totalApplicants: '14+ Lakhs',
    pyqCount: '2019-2025 All Shifts (700+ Qs)',
    mockTestCount: '50 Chapterwise & Full Tests',
    notesAvailable: 'Physics Formula Maps & Organic Reaction Mechanisms',
    officialPortal: 'https://jeemain.nta.nic.in',
  },
  {
    id: 'neet-ug-med',
    code: 'NEET',
    name: 'National Eligibility cum Entrance Test (UG)',
    subTitle: 'UG Medical Entrance',
    category: 'Medical',
    logoText: 'NEET',
    logoBg: 'bg-teal-50',
    logoBorder: 'border-teal-200',
    logoTextColor: 'text-teal-700',
    badge: 'MBBS / BDS / AYUSH',
    syllabusOverview: 'Biology (Botany + Zoology, 360 Marks), Physics (180 Marks), Chemistry (180 Marks). Total 720 Marks, OMR Pen-Paper.',
    importantDates: 'Exam: 1st Sunday May 2026 | Result: June 2026',
    totalApplicants: '24+ Lakhs',
    pyqCount: '15 Years NCERT Solved',
    mockTestCount: '40 Full Length OMR Mocks',
    notesAvailable: 'NCERT High-Yield Biology Diagrams & Mind Maps',
    officialPortal: 'https://exams.nta.ac.in/NEET',
  },
];

export const LATEST_ARTICLES_DATA: FeaturedArticle[] = [
  {
    id: 'top-10-schemes-students-2025',
    title: 'Top 10 Government Schemes for Students in 2025',
    category: 'Scheme',
    categoryColor: 'bg-amber-600 text-white',
    readTime: '4 min read',
    date: '15 May 2025',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80',
    summary: 'Comprehensive breakdown of central and state direct subsidy programs including free laptops, post-matric fee reimbursements, and student credit card loans at 1% interest.',
  },
  {
    id: 'top-scholarships-after-12th',
    title: 'Top Scholarships After 12th for 2025-26',
    category: 'Scholarship',
    categoryColor: 'bg-blue-600 text-white',
    readTime: '5 min read',
    date: '14 May 2025',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
    summary: 'Step-by-step application walkthrough for NSP Central Sector, PM Yashasvi, INSPIRE Fellowship, and Kanya Utthan with cutoff percentages and income limits.',
  },
  {
    id: 'gate-2025-exam-pattern',
    title: 'GATE 2025 Exam Pattern and Syllabus',
    category: 'Exam',
    categoryColor: 'bg-indigo-600 text-white',
    readTime: '6 min read',
    date: '13 May 2025',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80',
    summary: 'Official changes in paper codes, two-paper combination allowances, MSQ negative marking rules, and weightage distribution for CSE, Civil, Mechanical, and EE.',
  },
  {
    id: 'highest-paying-jobs-engineers',
    title: 'Highest Paying Jobs for Engineers in India',
    category: 'Career',
    categoryColor: 'bg-emerald-600 text-white',
    readTime: '5 min read',
    date: '12 May 2025',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
    summary: 'Comparative analysis of PSU Maharatna salaries (IOCL, NTPC, ONGC via GATE) vs Tier-1 Software Product & AI engineering compensation packages in India.',
  },
  {
    id: 'how-to-start-sip-500',
    title: 'How to Start SIP with Just ₹500 Monthly',
    category: 'Finance',
    categoryColor: 'bg-teal-600 text-white',
    readTime: '3 min read',
    date: '11 May 2025',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&auto=format&fit=crop&q=80',
    summary: 'A beginner-friendly guide to compounding, index funds vs active funds, KYC requirements, and achieving ₹10 Lakhs corpus through disciplined micro-investing.',
  },
];
