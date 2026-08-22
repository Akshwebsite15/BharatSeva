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
  author?: string;
  tags?: string[];
  keyHighlights?: string[];
  sections?: {
    heading: string;
    content: string;
    points?: string[];
    callout?: string;
  }[];
  actionChecklist?: string[];
  faqs?: { question: string; answer: string }[];
  relatedToolId?: string;
  relatedToolName?: string;
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
    id: 'finance-management-complete-guide',
    title: 'Complete Personal Finance Management Guide for Indian Citizens & Families (2026)',
    category: 'Finance',
    categoryColor: 'bg-emerald-700 text-white',
    readTime: '6 min read',
    date: '19 August 2026',
    author: 'BharatSeva Financial Literacy Cell',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
    summary: 'A step-by-step master guide to mastering income budgeting, creating a 6-month safety net, managing loans, and achieving long-term financial independence in India.',
    tags: ['Personal Finance', 'Budgeting', '50/30/20 Rule', 'Emergency Fund', 'Wealth Building'],
    relatedToolId: 'emi-calc',
    relatedToolName: 'Loan EMI & Financial Calculators',
    keyHighlights: [
      '50/30/20 Budgeting framework customized for Indian household costs and inflation.',
      'Emergency Fund blueprint: How to park 6 months of expenses in liquid, risk-free instruments.',
      'Debt-reduction strategies: Eliminating credit card debt (36-42% APR) vs low-cost home loans.',
      'The 15-15-15 Rule of Compounding: How ₹15,000 monthly turns into ₹1 Crore in 15 years.',
    ],
    sections: [
      {
        heading: '1. The 50/30/20 Budgeting Rule for Indian Households',
        content: 'Budgeting is the foundational pillar of personal finance. For middle-class Indian families and salaried workers, the 50/30/20 framework divides after-tax take-home pay into three strict buckets:',
        points: [
          '50% Needs: Rent/Home EMI, groceries, electricity, school fees, essential medicines, and basic transport.',
          '30% Wants: Dining out, OTT subscriptions, gadgets, weekend trips, and lifestyle upgrades.',
          '20% Investments: Mutual Fund SIPs, PPF/EPF, Emergency Fund contribution, and NPS.',
        ],
        callout: 'Golden Rule: If your rent + EMIs exceed 50% of your take-home pay, downsize or restructure high-interest liabilities immediately.',
      },
      {
        heading: '2. Setting Up an Unbreakable 6-Month Emergency Fund',
        content: 'Never invest in equities or lock money in illiquid assets before your emergency fund is active. If your family monthly expense is ₹40,000, your emergency target is ₹2,40,000.',
        points: [
          '40% in Savings Account with Auto Sweep-in FD facility (Instant ATM access with 6.5-7% FD interest).',
          '40% in Over-Night or Liquid Mutual Funds (T+1 day withdrawal without exit load).',
          '20% in Cash / Short Term Post Office Time Deposit.',
        ],
      },
      {
        heading: '3. Debt Management: Snowball vs. Avalanche Method',
        content: 'Prioritize paying off unsecured debt like personal loans (12-18%) and credit card balances (36-42% APR). Use the Avalanche method (paying highest interest rate debt first) to save maximum interest, or Snowball (paying smallest balance first) for psychological momentum.',
      },
      {
        heading: '4. Essential Insurance Protection Before Investing',
        content: 'Investment without adequate insurance is a ticking financial disaster. Secure these two mandatory covers:',
        points: [
          'Pure Term Life Insurance: 15 to 20 times your annual income (e.g. ₹1 Crore cover costs approx ₹700-1000/month for a 25-30 year old non-smoker).',
          'Family Floater Health Insurance: At least ₹10 Lakhs base + Super Top-up to protect hard-earned savings from medical hospitalization inflation.',
        ],
      },
    ],
    actionChecklist: [
      'Calculate your exact net monthly take-home salary and track fixed monthly outflows.',
      'Check CIBIL score for free (aim for 750+ to qualify for lowest loan interest rates).',
      'Open a dedicated emergency savings sub-account with auto-sweep facility.',
      'Start an automated SIP on the 1st or 5th of every month right after salary credit.',
    ],
    faqs: [
      {
        question: 'How much should a 25-year-old beginner save each month?',
        answer: 'Aim to save and invest at least 25% to 30% of your net income if you live with parents, and at least 15-20% if paying rent. Increasing your savings by 10% annually with every increment creates massive compounding over 20 years.',
      },
      {
        question: 'Should I buy gold or Mutual Funds for long-term wealth?',
        answer: 'Equities (Mutual Funds) have delivered 12-14% CAGR over 10+ year horizons, beating inflation. Sovereign Gold Bonds (SGB) or digital gold is ideal for hedging (keep 5-10% of portfolio in gold).',
      },
    ],
  },
  {
    id: 'how-to-start-sip-500',
    title: 'How to Start Mutual Fund SIP with Just ₹500 Monthly (Compounding Power)',
    category: 'Finance',
    categoryColor: 'bg-teal-700 text-white',
    readTime: '5 min read',
    date: '18 August 2026',
    author: 'Wealth & Investment Research Team',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=80',
    summary: 'A beginner-friendly guide to Systematic Investment Plans (SIP), index funds vs active funds, KYC requirements, and achieving ₹10 Lakhs to ₹1 Crore through micro-investing.',
    tags: ['SIP', 'Mutual Funds', 'Compounding', 'Nifty 50', 'Index Funds'],
    relatedToolId: 'sip-calc',
    relatedToolName: 'SIP Growth Calculator',
    keyHighlights: [
      'Start with as little as ₹500 per month via digital Aadhaar/PAN Paperless e-KYC in under 5 minutes.',
      'Understanding Direct Plan vs Regular Plan (Direct saves 1% to 1.5% in distributor commissions every single year).',
      'The Magic of Compounding: ₹3,000 monthly SIP for 20 years at 13% CAGR yields ₹34.5 Lakhs on an investment of just ₹7.2 Lakhs.',
      'Step-up SIP: Increasing SIP by 10% every year multiplies your final corpus by 2.2x.',
    ],
    sections: [
      {
        heading: '1. What is a Systematic Investment Plan (SIP)?',
        content: 'SIP is not an asset itself, but a disciplined method of investing a fixed amount of money into a Mutual Fund scheme at regular intervals (monthly or weekly). It averages out market fluctuations through Rupee Cost Averaging (buying more units when the market drops, and fewer when it rises).',
      },
      {
        heading: '2. Choosing the Right Fund Category by Age & Horizon',
        content: 'For beginners with a 5+ year investment horizon, keep it simple:',
        points: [
          'Nifty 50 Index Fund (50% allocation): Invests in top 50 bluechip Indian companies with minimal expense ratios (0.1% - 0.2%).',
          'Flexi-Cap / Parag Parikh Flexi Cap (30% allocation): Experienced fund managers allocate between large, mid, and international tech stocks.',
          'Mid-Cap / Small-Cap Index (20% allocation): Higher volatility but higher potential growth for 10+ year goals.',
        ],
        callout: 'Always select "Direct Growth" plan. Never select "Regular" or "Dividend IDCW" plan for long-term wealth compounding.',
      },
      {
        heading: '3. Step-by-Step Guide to Start in 2026',
        content: 'To start your first ₹500 SIP today:',
        points: [
          'Prepare PAN Card, Aadhaar Card (linked with mobile for OTP), and a Bank Account.',
          'Use SEBI-registered direct platforms (CAMS/KFintech portals, Groww, Zerodha Coin, or AMC websites).',
          'Complete DigiLocker Aadhaar KYC and video verification in under 3 minutes.',
          'Set up Auto-Debit (e-Mandate / UPI Autopay) for seamless automated monthly deduction.',
        ],
      },
    ],
    actionChecklist: [
      'Check that your Aadhaar and PAN are linked.',
      'Calculate your target retirement or home corpus using our SIP Calculator tool.',
      'Set SIP date within 2 days of salary credit date.',
    ],
    faqs: [
      {
        question: 'Can I stop or pause my SIP anytime without penalty?',
        answer: 'Yes! Mutual Fund SIPs have zero lock-in (except tax-saving ELSS which has a 3-year lock-in). You can pause, modify the amount, or withdraw funds anytime without penalty.',
      },
      {
        question: 'Is Mutual Fund investment safe for beginners?',
        answer: 'Mutual funds in India are strictly regulated by SEBI and held by independent custodian trusts. While equity values fluctuate daily with market trends, broad market index funds historically recover and grow over long horizons.',
      },
    ],
  },
  {
    id: 'new-vs-old-tax-regime-guide',
    title: 'New vs Old Tax Regime FY 2025-26: Which Saves More Tax for You?',
    category: 'Finance',
    categoryColor: 'bg-blue-700 text-white',
    readTime: '5 min read',
    date: '17 August 2026',
    author: 'Tax & Compliance Editorial',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
    summary: 'A detailed comparative breakdown of tax slabs, deductions under Section 80C, 80D, HRA, home loan interest, and standard deduction of ₹75,000 under the New Tax Regime.',
    tags: ['Income Tax', 'Tax Slabs', '80C', 'HRA', 'New Regime'],
    relatedToolId: 'tax-calc',
    relatedToolName: 'Income Tax Calculator (New vs Old)',
    keyHighlights: [
      'Standard Deduction for salaried employees increased to ₹75,000 under the New Tax Regime.',
      'Zero tax up to ₹7.75 Lakhs taxable income under the New Regime thanks to Section 87A rebate.',
      'Break-even deduction threshold: If your total deductions (80C, HRA, 80D, Home Loan interest) are less than ₹3.75 Lakhs, New Regime is usually better.',
      'Revised New Regime Slabs: 0-3L (Nil), 3-7L (5%), 7-10L (10%), 10-12L (15%), 12-15L (20%), Above 15L (30%).',
    ],
    sections: [
      {
        heading: '1. New Tax Regime Overview (Default Option)',
        content: 'The New Tax Regime provides significantly lower slab tax rates and higher rebate limits without requiring you to lock money into tax-saving schemes like insurance or 5-year FDs. Salaried employees also receive a standard deduction of ₹75,000.',
      },
      {
        heading: '2. Old Tax Regime Overview (Deduction-Heavy)',
        content: 'The Old Regime is beneficial only if you claim substantial deductions:',
        points: [
          'Section 80C: Up to ₹1,50,000 (EPF, PPF, ELSS, Life Insurance premium, tuition fees).',
          'Section 80D: Up to ₹25,000 (Self/Family) + ₹50,000 (Senior Citizen Parents) for Health Insurance.',
          'Section 24(b): Up to ₹2,00,000 on Home Loan Interest for self-occupied property.',
          'Section 10(13A) HRA: Exemption on house rent paid.',
          'Section 80CCD(1B): Additional ₹50,000 for National Pension System (NPS).',
        ],
      },
      {
        heading: '3. Quick Rule of Thumb for Salaried Employees',
        content: 'If your annual salary is ₹10 Lakhs, your tax under the New Regime is around ₹25,000-30,000. Under the Old Regime, you would need more than ₹2.5 Lakhs in exemptions to match this. For most young earners without large home loans, New Regime is the clear winner.',
      },
    ],
    actionChecklist: [
      'Calculate your total available exemptions (HRA receipts, 80C investments, 80D medical).',
      'Use the BharatSeva Tax Calculator to run an exact side-by-side comparison.',
      'Submit Form 12BB to your employer HR to choose the regime that minimizes monthly TDS deduction.',
    ],
    faqs: [
      {
        question: 'Can I switch between New and Old regime every year?',
        answer: 'Salaried individuals (without business income) can switch between New and Old regimes every year while filing their ITR on the Income Tax portal.',
      },
    ],
  },
  {
    id: 'smart-debt-payoff-strategies',
    title: 'Smart Debt Payoff Strategy: How to Become Debt-Free in India',
    category: 'Finance',
    categoryColor: 'bg-rose-700 text-white',
    readTime: '4 min read',
    date: '16 August 2026',
    author: 'Credit & Debt Counseling Bureau',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    summary: 'Proven tactical strategies to eliminate high-interest credit card debt, personal loans, home loan prepayments, and protect your credit score from defaults.',
    tags: ['Debt Free', 'Credit Cards', 'Home Loan Prepayment', 'CIBIL Score'],
    relatedToolId: 'emi-calc',
    relatedToolName: 'Loan EMI & Prepayment Calculator',
    keyHighlights: [
      'Prepaying just 1 extra EMI every year reduces a 20-year home loan duration by over 4.5 years and saves 30% of total interest.',
      'Understanding Credit Card Rollover traps: Paying only the "Minimum Amount Due" incurs 42% annual compounding interest.',
      'How to consolidate fragmented personal loans into a single lower-interest secured loan or balance transfer.',
      'Protecting against illegal Chinese instant loan apps and harassment by verifying RBI NBFC registration.',
    ],
    sections: [
      {
        heading: '1. Categorizing Your Debt: Toxic vs Manageable Debt',
        content: 'Not all loans are equal. Sort debts into priority urgency:',
        points: [
          'Tier 1 (Toxic / Extreme Urgency): Credit Card Revolving Debt (36-44% APR), BNPL fines, Instant Loan Apps (30-60%). Pay these off immediately using any emergency cash or gold loan.',
          'Tier 2 (High Interest): Unsecured Personal Loans (12-18%), Two-Wheeler / Car Loans (9-12%).',
          'Tier 3 (Productive / Low Interest): Education Loans (8-9.5% with 80E tax deduction), Home Loans (8.3-9%).',
        ],
      },
      {
        heading: '2. The 1-Extra-EMI Home Loan Prepayment Hack',
        content: 'On a ₹40 Lakhs home loan at 8.5% interest for 20 years (EMI: ₹34,713):',
        points: [
          'Total interest payable without prepayments: ₹43.3 Lakhs (more than the loan amount itself!).',
          'By paying just 1 extra EMI per year: Loan closes in 15.5 years, saving ₹11.2 Lakhs in interest.',
          'By increasing EMI by 5% each year with your salary increment: Loan closes in just 11 years!',
        ],
      },
    ],
    actionChecklist: [
      'List all outstanding loan balances, interest rates, and monthly EMI dates in a spreadsheet.',
      'Stop using credit cards until outstanding rollover balances are cleared to zero.',
      'Call your bank to check for zero prepayment penalty on floating rate home loans.',
    ],
    faqs: [
      {
        question: 'Is there a penalty for prepaying a home loan in India?',
        answer: 'As per RBI guidelines, banks cannot charge any prepayment or foreclosure penalty on floating rate home loans taken by individuals.',
      },
    ],
  },
  {
    id: 'emergency-fund-101-guide',
    title: 'Emergency Fund 101: Where & How to Park 6 Months of Living Expenses',
    category: 'Finance',
    categoryColor: 'bg-amber-700 text-white',
    readTime: '4 min read',
    date: '15 August 2026',
    author: 'Financial Safety Research Desk',
    imageUrl: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&auto=format&fit=crop&q=80',
    summary: 'Why keeping emergency money in regular savings accounts is losing you money to inflation, and the best 3-tier liquid allocation strategy for family security.',
    tags: ['Emergency Fund', 'Liquid Funds', 'Auto Sweep FD', 'Financial Safety'],
    relatedToolId: 'fd-calc',
    relatedToolName: 'Fixed Deposit (FD) Calculator',
    keyHighlights: [
      'Calculate your bare-minimum survival burn rate (Rent + Groceries + Utilities + EMIs + Basic Medicine).',
      'The 3-Tier Parking Strategy: Instant Cash, Bank Sweep FD, and Liquid Mutual Funds.',
      'Strict rules: What qualifies as an emergency (job loss, major illness, urgent repairs) vs what does not (vacations, wedding gifts, Diwali sales).',
    ],
    sections: [
      {
        heading: '1. Why You Need a Liquid Emergency Fund',
        content: 'Life is unpredictable. Medical emergencies, sudden job layoffs, family crises, or vehicle breakdowns require immediate liquid cash. Selling equity mutual funds or stocks in a down market destroys wealth.',
      },
      {
        heading: '2. The 3-Tier Parking Strategy',
        content: 'Do not keep all emergency cash in one place:',
        points: [
          'Tier 1 (Instant 24/7): ₹20,000 - ₹30,000 in your primary savings account and cash at home.',
          'Tier 2 (High Interest Liquid): 50% in an Auto-Sweep Fixed Deposit earning 6.5% - 7.5% per annum.',
          'Tier 3 (Safe Yield): Remaining 50% in a Top-Rated Liquid Mutual Fund (T+1 day redemption with Insta-Redemption up to ₹50,000 per day).',
        ],
      },
    ],
    actionChecklist: [
      'Calculate 6 times your total household monthly essential expenses.',
      'Enable Auto-Sweep Facility on your bank account via net banking.',
      'Automate monthly transfers until the emergency fund milestone is achieved.',
    ],
    faqs: [
      {
        question: 'Should I invest my emergency fund in crypto, stocks, or real estate?',
        answer: 'Never! Emergency funds must prioritize 100% capital safety and immediate liquidity over high returns. Equity and volatile assets can drop 30-40% right when you need the money most.',
      },
    ],
  },
  {
    id: 'term-health-insurance-essentials',
    title: 'Comprehensive Insurance Guide: Term Life Insurance & Health Cover Essentials',
    category: 'Finance',
    categoryColor: 'bg-indigo-700 text-white',
    readTime: '5 min read',
    date: '14 August 2026',
    author: 'Insurance Advisory Panel',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
    summary: 'Why Pure Term Insurance is 10x superior to endowment policies, and the smart Super Top-up health insurance strategy to secure ₹25 Lakhs coverage at low cost.',
    tags: ['Term Insurance', 'Health Insurance', 'Super Top-up', 'Claim Settlement Ratio'],
    relatedToolId: 'salary-ctc-calc',
    relatedToolName: 'Salary & Insurance Budget Calculator',
    keyHighlights: [
      'Never mix Investment and Insurance: Avoid ULIPs and Endowment plans that offer poor 5% returns and inadequate ₹5-10L life cover.',
      'Pure Term Plan: Buy 15x-20x your annual income till age 60/65 with Claim Settlement Ratio (CSR) > 98%.',
      'Health Insurance Super Top-up Strategy: A ₹5L base policy + ₹20L Super Top-up gives ₹25L coverage at 50% lower premium than a standalone ₹25L base policy.',
      'Critical checks: 0% Co-payment, No Room Rent Capping, Restoration Benefit, and checking Day-Care procedures list.',
    ],
    sections: [
      {
        heading: '1. Why Pure Term Insurance is Non-Negotiable',
        content: 'If you have financial dependents (parents, spouse, children), you need term insurance. A 28-year-old can get a ₹1 Crore pure term cover for as little as ₹750/month. The payout ensures your family can pay off existing home loans and fund children’s education in case of your unfortunate demise.',
      },
      {
        heading: '2. Super Top-Up Health Insurance: The Smartest Strategy',
        content: 'Medical treatment inflation in India is rising at 14% annually. A standard ₹5 Lakh policy is easily exhausted by a major surgery:',
        points: [
          'Strategy: Buy a Base Health Insurance of ₹5 Lakhs with No Room Rent Capping.',
          'Add a Super Top-up policy of ₹20 Lakhs with a ₹5 Lakh deductible.',
          'Result: Total ₹25 Lakhs hospital coverage for a family of three at approx ₹14,000/year instead of ₹28,000/year.',
        ],
      },
      {
        heading: '3. Crucial Health Policy Clauses to Verify Before Buying',
        content: 'Always ensure these clauses:',
        points: [
          'Room Rent Capping: Choose "Single Private Room / No Room Rent Limit" (room rent limits trigger proportionate deductions on total hospital bills).',
          'Pre-existing Disease (PED) Waiting Period: Prefer policies with 2 or 3 year waiting periods rather than 4 years.',
          'Co-payment: Ensure 0% co-payment (otherwise you have to pay 10-20% of every bill from your own pocket).',
        ],
      },
    ],
    actionChecklist: [
      'Calculate 15x your annual salary for term insurance requirement.',
      'Check your current health policy for room rent limits and co-pay clauses.',
      'Declare all health conditions truthfully to guarantee hassle-free claim settlement.',
    ],
    faqs: [
      {
        question: 'Does term insurance return money if I survive the policy term?',
        answer: 'Standard Pure Term Insurance does not return premium (like car insurance), which is why it is extremely affordable. "Return of Premium" (TROP) plans charge 2-3x higher premiums and are financially sub-optimal compared to investing the difference in an equity SIP.',
      },
    ],
  },
  {
    id: 'top-10-schemes-students-2025',
    title: 'Top 10 Government Schemes for Students & Youth in 2026',
    category: 'Scheme',
    categoryColor: 'bg-amber-600 text-white',
    readTime: '4 min read',
    date: '10 August 2026',
    author: 'BharatSeva Scheme Portal',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
    summary: 'Comprehensive breakdown of central and state direct subsidy programs including free laptops, post-matric fee reimbursements, student credit cards, and skill grants.',
    tags: ['Student Schemes', 'DBT', 'Kanya Utthan', 'Student Credit Card'],
    keyHighlights: [
      'Bihar Student Credit Card scheme provides up to ₹4 Lakhs education loan at 1% interest for girls/PwD and 4% for boys.',
      'PM YASASVI and Post-Matric scholarships provide 100% course fee waivers for eligible OBC/EBC/SC/ST students.',
      'Mukhyamantri Kanya Utthan Yojana grants ₹50,000 direct DBT upon graduation for girls.',
    ],
    sections: [
      {
        heading: '1. Bihar Student Credit Card (MNSSBY)',
        content: 'Covers higher education fees, laptop purchases, hostel and living costs up to ₹4 Lakhs with no collateral required.',
      },
      {
        heading: '2. PM Vidyalaxmi & National Fellowship Schemes',
        content: 'Provides unified loan and scholarship access for admissions into top NIRF-ranked institutions across India.',
      },
    ],
    actionChecklist: [
      'Register on 7 Nischay portal for Bihar student credit card.',
      'Keep Aadhaar, 10th/12th marksheets, and college admission offer letter ready.',
    ],
    faqs: [
      {
        question: 'Who is eligible for Kanya Utthan Yojana graduation grant?',
        answer: 'All unmarried or married girl students passing graduation from recognized universities in Bihar are eligible for ₹50,000 direct bank transfer.',
      },
    ],
  },
  {
    id: 'top-scholarships-after-12th',
    title: 'Top Scholarships After 12th for 2026-27 Academic Year',
    category: 'Scholarship',
    categoryColor: 'bg-blue-600 text-white',
    readTime: '5 min read',
    date: '08 August 2026',
    author: 'Scholarship Desk',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    summary: 'Step-by-step application walkthrough for NSP Central Sector, PM Yashasvi, INSPIRE Fellowship, and Kanya Utthan with cutoff percentages and income limits.',
    tags: ['Scholarships', 'NSP', 'INSPIRE', 'College Grants'],
    keyHighlights: [
      'NSP Central Sector Scheme awards ₹12,000/year for undergraduate study to top 20th percentile 12th board scorers.',
      'DST INSPIRE Fellowship awards ₹80,000/year for natural science and research degrees.',
    ],
    sections: [
      {
        heading: '1. National Scholarship Portal (NSP 2.0) Verification',
        content: 'Ensure your Aadhaar is linked to your bank account (Aadhaar Seeding / NPCI mapping) to avoid DBT transaction failures.',
      },
    ],
  },
];

