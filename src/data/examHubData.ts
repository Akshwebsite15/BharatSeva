import { ExamLifecycleHubData } from '../types';

export const examHubDataList: ExamLifecycleHubData[] = [
  {
    id: 'hub-ssc-cgl',
    title: 'SSC Combined Graduate Level (CGL 2026)',
    shortTitle: 'SSC CGL 2026',
    conductingBody: 'Staff Selection Commission (SSC, Govt of India)',
    category: 'SSC',
    currentStage: 'Application Open',
    lastUpdated: 'August 10, 2026',
    officialWebsite: 'https://ssc.gov.in',
    bannerImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',

    notification: {
      advtNo: 'SSC CGL Notice No. 3/1/2026-P&P-I',
      releaseDate: 'July 5, 2026',
      summary:
        'Official notification released for 15,000+ Group-B and Group-C Gazetted and Non-Gazetted posts in central ministries, Income Tax, Central Excise GST Inspector, ASO in MEA / AFHQ, CAG Auditor, and Assistant Enforcement Officer.',
      officialPdfUrl: 'https://ssc.gov.in/api/attachment/open/cgl_2026_notice.pdf',
      keyHighlights: [
        '15,000+ confirmed vacancies across 34 central cadres.',
        'Two-Tier selection process (Tier-1 Screening CBT + Tier-2 Merit CBT).',
        'Mandatory Data Entry Speed Test (DEST) & Computer Knowledge module in Tier-2.',
      ],
    },

    eligibility: {
      qualification: 'Bachelor\'s Degree in any discipline from a recognized University.',
      allowedStreams: ['BA', 'BSc', 'BCom', 'B.Tech', 'BBA', 'BCA', 'MBBS', 'Any Graduate'],
      minAge: 18,
      maxAgeGen: 32,
      ageRelaxations: [
        { category: 'OBC', years: 3 },
        { category: 'SC / ST', years: 5 },
        { category: 'PwD (Unreserved)', years: 10 },
        { category: 'Ex-Servicemen (ESM)', years: 3 },
      ],
      extraConditions: [
        'Final year students can apply provided degree result is declared before cutoff date.',
        'Assistant Audit/Accounts Officer requires Graduation with Economics/Commerce preferred.',
      ],
    },

    vacancy: {
      totalPosts: '15,000+ Vacancies',
      postList: [
        { postTitle: 'Assistant Section Officer (ASO in MEA)', payLevel: 'Pay Level 7 (₹44,900 - ₹1,42,400)', vacancies: '650', dept: 'Ministry of External Affairs' },
        { postTitle: 'Inspector of Income Tax', payLevel: 'Pay Level 7 (₹44,900 - ₹1,42,400)', vacancies: '1,120', dept: 'CBDT, Ministry of Finance' },
        { postTitle: 'Central Excise & GST Inspector', payLevel: 'Pay Level 7 (₹44,900 - ₹1,42,400)', vacancies: '2,800', dept: 'CBIC, Dept of Revenue' },
        { postTitle: 'Assistant Enforcement Officer (AEO)', payLevel: 'Pay Level 7 (₹44,900 - ₹1,42,400)', vacancies: '340', dept: 'Enforcement Directorate (ED)' },
        { postTitle: 'Auditor & Accountant', payLevel: 'Pay Level 5 (₹29,200 - ₹92,300)', vacancies: '4,500', dept: 'CAG & CGDA' },
        { postTitle: 'Tax Assistant (TA)', payLevel: 'Pay Level 4 (₹25,500 - ₹81,100)', vacancies: '3,200', dept: 'CBDT / CBIC' },
      ],
      categoryQuota: [
        { category: 'Unreserved (UR)', count: '6,100' },
        { category: 'OBC', count: '4,050' },
        { category: 'EWS', count: '1,500' },
        { category: 'SC', count: '2,250' },
        { category: 'ST', count: '1,100' },
      ],
    },

    salary: {
      payScale: 'Pay Level-4 to Pay Level-8 (7th CPC)',
      basicPay: '₹25,500 - ₹47,600 Basic',
      approxInHand: '₹42,000 to ₹85,000 / month (X-City Posting including 50% DA, HRA, TA)',
      allowances: [
        'Dearness Allowance (DA) @ 50%',
        'House Rent Allowance (HRA) @ 30% (X City)',
        'Transport Allowance (TA) + DA on TA',
        'CGHS Medical Coverage & Govt Quarters Eligibility',
      ],
    },

    syllabus: [
      {
        tier: 'Tier-1 CBT (Screening)',
        subjects: [
          { name: 'General Intelligence & Reasoning', totalMarks: 50, topics: ['Analogies', 'Coding-Decoding', 'Venn Diagrams', 'Blood Relations', 'Syllogism', 'Non-verbal Series'], keyBooks: 'RS Aggarwal / Kiran Reasoning' },
          { name: 'General Awareness (GK/GS)', totalMarks: 50, topics: ['Indian History', 'Polity & Constitution', 'Geography', 'Economy', 'Science & Tech', 'Current Affairs (6 Months)'], keyBooks: 'Lucent GK & Monthly Magazines' },
          { name: 'Quantitative Aptitude (Maths)', totalMarks: 50, topics: ['Percentage', 'Profit & Loss', 'SI & CI', 'Time & Work', 'Algebra', 'Geometry', 'Trigonometry', 'Mensuration'], keyBooks: 'Rakesh Yadav 7300 / RD Sharma' },
          { name: 'English Comprehension', totalMarks: 50, topics: ['Error Spotting', 'Fill in Blanks', 'Synonyms/Antonyms', 'Idioms & Phrases', 'Reading Comprehension', 'Cloze Test'], keyBooks: 'SP Bakshi / Neetu Singh Vol 1' },
        ],
      },
      {
        tier: 'Tier-2 CBT (Mains Merit)',
        subjects: [
          { name: 'Paper-1 Session 1: Mathematical Abilities', totalMarks: 90, topics: ['Advanced Maths', 'Statistics', 'Probability', 'Coordinate Geometry'], keyBooks: 'Abhinay Sharma / Gagan Pratap' },
          { name: 'Paper-1 Session 1: Reasoning & General Intelligence', totalMarks: 90, topics: ['Critical Reasoning', 'Statement & Assumptions', 'Data Sufficiency', 'Puzzles'], keyBooks: 'Piyush Varshney Reasoning' },
          { name: 'Paper-1 Session 2: English Language & Comprehension', totalMarks: 135, topics: ['Para Jumbles', 'Active/Passive Voice', 'Direct/Indirect Speech', 'Passage Analysis'], keyBooks: 'MB Publication Past Papers' },
          { name: 'Paper-1 Session 2: General Awareness', totalMarks: 75, topics: ['Static GK', 'Govt Schemes', 'Budget & Survey', 'Environment'], keyBooks: 'Pinnacle CGL GK' },
          { name: 'Computer Knowledge Module (Qualifying)', totalMarks: 60, topics: ['Basics of Computer', 'MS Office (Word, Excel, PPT)', 'Internet & Cyber Security', 'Networking'], keyBooks: 'Arihant Computer Awareness' },
        ],
      },
    ],

    examPattern: [
      {
        tier: 'Tier-I Objective CBT',
        mode: 'Online Computer Based Test',
        durationMinutes: 60,
        totalQuestions: 100,
        totalMarks: 200,
        negativeMarking: '0.50 marks per wrong answer',
        sections: [
          { sectionName: 'General Intelligence & Reasoning', questions: 25, marks: 50 },
          { sectionName: 'General Awareness', questions: 25, marks: 50 },
          { sectionName: 'Quantitative Aptitude', questions: 25, marks: 50 },
          { sectionName: 'English Comprehension', questions: 25, marks: 50 },
        ],
      },
      {
        tier: 'Tier-II Objective CBT (Mains)',
        mode: 'Online CBT + DEST Typing Test',
        durationMinutes: 150,
        totalQuestions: 150,
        totalMarks: 390,
        negativeMarking: '1.00 mark per wrong answer',
        sections: [
          { sectionName: 'Section 1: Maths (30 Qs) + Reasoning (30 Qs)', questions: 60, marks: 180 },
          { sectionName: 'Section 2: English (45 Qs) + GA (25 Qs)', questions: 70, marks: 210 },
          { sectionName: 'Section 3: Computer Knowledge (20 Qs - Qualifying)', questions: 20, marks: 60 },
          { sectionName: 'Session 2: DEST Typing Test (2000 Key Depressions in 15 mins)', questions: 1, marks: 0 },
        ],
      },
    ],

    previousPapers: [
      {
        year: 2025,
        tier: 'Tier-1',
        title: 'SSC CGL 2025 Tier-1 Official Question Paper (Shift 1 All Subjects)',
        totalQuestions: 100,
        durationMinutes: 60,
        sampleQuestions: [
          {
            questionNumber: 1,
            subject: 'Quantitative Aptitude',
            question: 'If x + 1/x = 5, find the value of x³ + 1/x³.',
            options: ['110', '125', '140', '115'],
            correctAnswer: '110',
            explanation: 'Formula: x³ + 1/x³ = (x + 1/x)³ - 3(x + 1/x) = 5³ - 3(5) = 125 - 15 = 110.',
          },
          {
            questionNumber: 2,
            subject: 'General Awareness',
            question: 'Which Article of the Indian Constitution empowers the President to promulgate Ordinances during recess of Parliament?',
            options: ['Article 110', 'Article 123', 'Article 213', 'Article 352'],
            correctAnswer: 'Article 123',
            explanation: 'Article 123 deals with ordinance-making power of the President. Article 213 applies to State Governors.',
          },
          {
            questionNumber: 3,
            subject: 'English Comprehension',
            question: 'Choose the correct synonym for "OBSTINATE".',
            options: ['Docile', 'Stubborn', 'Flexible', 'Compliant'],
            correctAnswer: 'Stubborn',
            explanation: 'Obstinate means refusing to change one\'s opinion; synonym is Stubborn.',
          },
        ],
      },
      {
        year: 2024,
        tier: 'Tier-2',
        title: 'SSC CGL 2024 Tier-2 Mains Paper (Maths & English Section)',
        totalQuestions: 130,
        durationMinutes: 135,
        sampleQuestions: [
          {
            questionNumber: 1,
            subject: 'Reasoning',
            question: 'All fruits are sweet. Some apples are fruits. Conclusion 1: Some apples are sweet. Conclusion 2: All sweet things are apples.',
            options: ['Only Conclusion 1 follows', 'Only Conclusion 2 follows', 'Both follow', 'Neither follows'],
            correctAnswer: 'Only Conclusion 1 follows',
            explanation: 'Since apples are a subset of fruits, and all fruits are sweet, some apples must be sweet.',
          },
        ],
      },
    ],

    cutoffs: [
      { year: 2025, tier: 'Tier-1 (Out of 200)', general: 142.5, ews: 135.0, obc: 138.2, sc: 118.0, st: 109.5, maxMarks: 200, notes: 'Normalized scores cutoff for post group other than AAO/JSO' },
      { year: 2024, tier: 'Tier-1 (Out of 200)', general: 137.8, ews: 129.5, obc: 133.0, sc: 112.5, st: 104.0, maxMarks: 200 },
      { year: 2023, tier: 'Tier-1 (Out of 200)', general: 150.0, ews: 143.2, obc: 145.8, sc: 126.2, st: 118.0, maxMarks: 200 },
      { year: 2025, tier: 'Final Tier-2 (Out of 390)', general: 308.0, ews: 298.5, obc: 302.0, sc: 275.0, st: 262.0, maxMarks: 390, notes: 'Cutoff for Tax Assistant & Auditor Posts' },
    ],

    application: {
      startDate: 'July 5, 2026',
      endDate: 'August 12, 2026',
      feeGeneral: '₹100',
      feeReserved: '₹0 (SC/ST/Women/PwD/Ex-Servicemen exempted)',
      applyUrl: 'https://ssc.gov.in',
      requiredDocs: [
        '10th Class Certificate for DOB proof',
        'Graduation Degree or Final Year Provisional Certificate',
        'Scanned Photograph (Live Webcam capture on new SSC portal)',
        'Scanned Signature (10 to 20 KB in JPEG)',
        'Caste Certificate (Central format) if claiming reservation',
      ],
    },

    admitCard: {
      status: 'To be released 4 days prior to exam',
      releaseDate: 'September 20, 2026',
      downloadUrl: 'https://ssc.gov.in/portal/admitcard',
      instructions: [
        'Print colorful copy of Hall Ticket.',
        'Carry 2 original passport photos matching the online application.',
        'Carry original photo ID (Aadhaar / PAN / Driving License / Voter ID).',
        'Electronic gadgets, smartwatches, and bluetooth devices strictly prohibited.',
      ],
    },

    examSchedule: {
      tier1Date: 'September 24 to October 8, 2026',
      tier2Date: 'December 18 to 20, 2026',
      shifts: ['Shift 1: 09:00 AM - 10:00 AM', 'Shift 2: 12:30 PM - 01:30 PM', 'Shift 3: 04:00 PM - 05:00 PM'],
      examCenterCities: ['Patna', 'Muzaffarpur', 'Gaya', 'Bhagalpur', 'Delhi NCR', 'Varanasi', 'Kolkata', 'Mumbai', 'Bangalore'],
    },

    answerKey: {
      status: 'Provisional Key Released Post Exam',
      releaseDate: 'October 14, 2026',
      objectionDeadline: 'October 18, 2026 (5:00 PM)',
      objectionFee: '₹100 per question challenged',
      portalUrl: 'https://ssc.gov.in/answerkey',
    },

    result: {
      status: 'Tier-1 Result Expected Nov 2026',
      declarationDate: 'November 10, 2026',
      meritListPdfUrl: 'https://ssc.gov.in/results/cgl2026_tier1_result.pdf',
      cutOffPdfUrl: 'https://ssc.gov.in/results/cgl2026_tier1_writeup.pdf',
    },

    finalSelection: {
      dvProcess: [
        'Document Verification conducted by User Departments after Tier-2 final merit list.',
        'Verification of original certificates (10th, Graduation, Category, EWS, PwD).',
        'Verification of NOC for serving Govt employees.',
      ],
      medicalStandard: 'Color vision test & physical endurance required only for Inspector (Central Excise / Examiner / Preventive Officer / AEO). Standard medical fitness for administrative posts.',
      meritFormula: 'Final merit strictly based on Total Marks in Tier-2 (Out of 390) subject to clearing Computer Module & DEST Typing Test cutoffs.',
    },
  },

  {
    id: 'hub-bpsc-71',
    title: 'BPSC 71st Combined Competitive Examination (CCE)',
    shortTitle: 'BPSC 71st CCE',
    conductingBody: 'Bihar Public Service Commission (BPSC, Patna)',
    category: 'BPSC',
    currentStage: 'Application Open',
    lastUpdated: 'August 10, 2026',
    officialWebsite: 'https://bpsc.bih.nic.in',
    bannerImage: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',

    notification: {
      advtNo: 'BPSC Advt. No. 12/2026',
      releaseDate: 'July 1, 2026',
      summary:
        'Official recruitment notification for 1,245 Gazetted Administrative posts in Bihar Government including Sub-Divisional Officer (SDO / SDM), Deputy Superintendent of Police (DSP), Bihar Finance Service Revenue Officer, Block Development Officer (BDO), and District Audit Officer.',
      officialPdfUrl: 'https://bpsc.bih.nic.in/Advt/NB-2026-07-01-01.pdf',
      keyHighlights: [
        '1,245 confirmed posts in State Executive Cadres.',
        'Negative marking of 1/3rd (0.33) in 150-mark Prelims.',
        'State Domicile reservation (75% total reservation under new Bihar Act).',
      ],
    },

    eligibility: {
      qualification: 'Graduation Degree (BA/BSc/BCom/B.Tech/BBA) from a UGC recognized university.',
      allowedStreams: ['Any Graduate Stream'],
      minAge: 20,
      maxAgeGen: 37,
      ageRelaxations: [
        { category: 'General Female', years: 3 },
        { category: 'BC / EBC (Male & Female)', years: 3 },
        { category: 'SC / ST (Male & Female)', years: 5 },
      ],
      physicalStandards: {
        heightMale: '165 cm (162 cm for SC/ST)',
        heightFemale: '155 cm',
        chestMale: '81 cm unexpanded',
        endurance: 'Physical fitness test mandatory for DSP post only.',
      },
      extraConditions: ['Bihar Domicile candidates get reservation under EWS, EBC, BC, SC, ST, and Female 35% horizontal quota.'],
    },

    vacancy: {
      totalPosts: '1,245 Posts',
      postList: [
        { postTitle: 'Sub-Divisional Officer (SDO) / Bihar Administrative Service', payLevel: 'Level 9 (₹53,100 basic)', vacancies: '120', dept: 'General Administration Dept' },
        { postTitle: 'Deputy Superintendent of Police (DSP)', payLevel: 'Level 9 (₹53,100 basic)', vacancies: '85', dept: 'Home Dept (Police)' },
        { postTitle: 'State Tax Assistant Commissioner / Revenue Officer', payLevel: 'Level 9 (₹53,100 basic)', vacancies: '210', dept: 'Commercial Tax & Revenue Dept' },
        { postTitle: 'Block Development Officer (BDO)', payLevel: 'Level 7 (₹44,900 basic)', vacancies: '340', dept: 'Rural Development Dept' },
        { postTitle: 'Block Panchayat Raj Officer (BPRO)', payLevel: 'Level 7 (₹44,900 basic)', vacancies: '290', dept: 'Panchayati Raj Dept' },
      ],
      categoryQuota: [
        { category: 'Unreserved (UR)', count: '311' },
        { category: 'EBC (Extremely Backward)', count: '310' },
        { category: 'BC (Backward Class)', count: '224' },
        { category: 'SC (Scheduled Caste)', count: '249' },
        { category: 'EWS', count: '125' },
        { category: 'ST', count: '26' },
      ],
    },

    salary: {
      payScale: 'Level 9 & Level 7 Gazetted Pay Scale',
      basicPay: '₹44,900 to ₹53,100 Basic',
      approxInHand: '₹68,000 to ₹88,000 / month (with Bihar Govt DA @ 50%, HRA @ 16/8%, TA)',
      allowances: ['DA @ 50%', 'HRA 16% (Patna) / 8% (Districts)', 'Medical Allowance ₹1,000', 'Government Vehicle for SDO/DSP'],
    },

    syllabus: [
      {
        tier: 'Prelims (GS Objective - 150 Marks)',
        subjects: [
          { name: 'History of India & Bihar History', totalMarks: 35, topics: ['Ancient & Medieval India', 'Modern History & Freedom Movement', 'Role of Bihar in 1857 & Freedom Movement', 'Babu Kunwar Singh & JP Movement'], keyBooks: 'Imtiaz Ahmad Bihar History / Spectrum Modern History' },
          { name: 'General Science & Tech', totalMarks: 30, topics: ['Physics Concepts', 'Chemistry in Daily Life', 'Biology & Diseases', 'ISRO & Space Tech'], keyBooks: 'Lucent Science' },
          { name: 'Current Affairs (National & Bihar)', totalMarks: 30, topics: ['National Events', 'Bihar State Budget & Economic Survey', 'Awards, Schemes & Cabinet Decisions'], keyBooks: 'Eduteria / BPSC Special Current Affairs' },
          { name: 'Bihar Special Geography & Economy', totalMarks: 20, topics: ['Rivers of Bihar', 'Soil & Climate', 'Agriculture & Industry', 'Census 2011 Bihar'], keyBooks: 'KBC Nano Bihar Special' },
          { name: 'Indian Polity & Mental Ability', totalMarks: 35, topics: ['Preamble, Fundamental Rights', 'Panchayati Raj in Bihar', 'Maths & Mental Aptitude (10 Qs)'], keyBooks: 'M Laxmikanth Indian Polity' },
        ],
      },
      {
        tier: 'Mains (Descriptive Papers - 900 Marks)',
        subjects: [
          { name: 'General Hindi (Qualifying 30% Marks)', totalMarks: 100, topics: ['Essay Writing', 'Grammar', 'Syntax', 'Precis Writing'], keyBooks: 'Subodh Bihar Hindi' },
          { name: 'General Studies Paper-1', totalMarks: 300, topics: ['Modern Indian History & Culture', 'National & Int Affairs', 'Statistical Analysis & Graphs'], keyBooks: 'Spectrum & RS Aggarwal Stats' },
          { name: 'General Studies Paper-2', totalMarks: 300, topics: ['Indian Polity & Bihar Politics', 'Indian & Bihar Economy', 'Role of Science & Technology'], keyBooks: 'M Laxmikanth & Bihar Economic Survey' },
          { name: 'Optional Subject (Objective Qualifying)', totalMarks: 100, topics: ['Selected Optional Subject (History/Geography/PubAd/PSIR)'], keyBooks: 'Standard Graduate Textbooks' },
        ],
      },
    ],

    examPattern: [
      {
        tier: 'Prelims Examination',
        mode: 'Offline OMR Sheet',
        durationMinutes: 120,
        totalQuestions: 150,
        totalMarks: 150,
        negativeMarking: '0.33 marks per wrong answer (1/3rd penalty)',
        sections: [
          { sectionName: 'General Studies (Objective 150 Qs)', questions: 150, marks: 150 },
        ],
      },
      {
        tier: 'Mains & Interview',
        mode: 'Offline Written Pen-Paper + Personal Interview',
        durationMinutes: 540,
        totalQuestions: 30,
        totalMarks: 1020,
        negativeMarking: 'N/A (Descriptive)',
        sections: [
          { sectionName: 'GS Paper 1 (Descriptive)', questions: 8, marks: 300 },
          { sectionName: 'GS Paper 2 (Descriptive)', questions: 8, marks: 300 },
          { sectionName: 'Essay Paper (Descriptive)', questions: 3, marks: 300 },
          { sectionName: 'Personal Interview', questions: 1, marks: 120 },
        ],
      },
    ],

    previousPapers: [
      {
        year: 2025,
        tier: 'Prelims',
        title: 'BPSC 70th CCE Prelims Official Question Paper with Answer Key',
        totalQuestions: 150,
        durationMinutes: 120,
        sampleQuestions: [
          {
            questionNumber: 1,
            subject: 'Bihar History',
            question: 'Who among the following led the 1857 Revolt in Jagdishpur, Bihar?',
            options: ['Babu Kunwar Singh', 'Nana Sahib', 'Tantia Tope', 'Maulvi Ahmadullah'],
            correctAnswer: 'Babu Kunwar Singh',
            explanation: 'Babu Kunwar Singh of Jagdishpur, Arrah led the 1857 armed resistance in Bihar against the British.',
          },
          {
            questionNumber: 2,
            subject: 'Bihar Geography',
            question: 'Which district of Bihar records the highest forest cover percentage according to ISFR 2021?',
            options: ['Kaimur', 'Jamui', 'Nawada', 'West Champaran'],
            correctAnswer: 'Kaimur',
            explanation: 'Kaimur has the highest forest cover area and percentage (~31.56%) in Bihar.',
          },
        ],
      },
    ],

    cutoffs: [
      { year: 2025, tier: '70th Prelims (Out of 150)', general: 91.67, ews: 86.33, obc: 88.0, sc: 79.33, st: 74.0, maxMarks: 150 },
      { year: 2024, tier: '69th Prelims (Out of 150)', general: 91.0, ews: 86.67, obc: 88.33, sc: 75.0, st: 69.33, maxMarks: 150 },
      { year: 2023, tier: '68th Prelims (Out of 150)', general: 91.0, ews: 87.25, obc: 87.75, sc: 79.25, st: 74.0, maxMarks: 150 },
    ],

    application: {
      startDate: 'July 1, 2026',
      endDate: 'August 11, 2026',
      feeGeneral: '₹600',
      feeReserved: '₹150 (Bihar SC/ST/EBC/Female/PwD)',
      applyUrl: 'https://onlinebpsc.bihar.gov.in',
      requiredDocs: [
        'Aadhaar Card',
        'Graduation Marksheet & Degree',
        'Bihar Residential / Domicile Certificate',
        'Non-Creamy Layer (NCL) / Caste Certificate for EBC/BC',
        'EWS Certificate issued by RO level',
      ],
    },

    admitCard: {
      status: 'To be issued 10 days before exam',
      releaseDate: 'December 10, 2026',
      downloadUrl: 'https://onlinebpsc.bihar.gov.in',
      instructions: [
        'Download e-Admit Card with QR Code.',
        'Upload clear photograph in dashboard if photo missing on admit card.',
        'Report at exam center 2 hours before start time.',
      ],
    },

    examSchedule: {
      tier1Date: 'December 20, 2026',
      tier2Date: 'March 25-28, 2027',
      shifts: ['Single Shift: 12:00 PM - 02:00 PM'],
      examCenterCities: ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Purnea', 'Ara', 'Chapra'],
    },

    answerKey: {
      status: 'Provisional Key Released 3 Days After Exam',
      releaseDate: 'December 23, 2026',
      objectionDeadline: 'December 28, 2026',
      objectionFee: 'Free online submission via candidate dashboard',
      portalUrl: 'https://bpsc.bih.nic.in',
    },

    result: {
      status: 'Prelims Result Expected Feb 2027',
      declarationDate: 'February 15, 2027',
      meritListPdfUrl: 'https://bpsc.bih.nic.in/results/71_prelims_result.pdf',
      cutOffPdfUrl: 'https://bpsc.bih.nic.in/results/71_prelims_cutoff.pdf',
    },

    finalSelection: {
      dvProcess: ['Verification of original degree, caste, domicile, and character certificates at BPSC office Patna before interview.'],
      medicalStandard: 'Standard medical fitness test by Medical Board at PMCH Patna for DSP candidates.',
      meritFormula: 'Final Merit List calculated out of 1020 Marks (GS 1 300 + GS 2 300 + Essay 300 + Interview 120).',
    },
  },

  {
    id: 'hub-bihar-police',
    title: 'Bihar Police Constable Recruitment 2026 (CSBC)',
    shortTitle: 'Bihar Police Constable',
    conductingBody: 'Central Selection Board of Constable (CSBC), Patna',
    category: 'Bihar Police',
    currentStage: 'Admit Card Out',
    lastUpdated: 'August 10, 2026',
    officialWebsite: 'https://csbc.bih.nic.in',
    bannerImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',

    notification: {
      advtNo: 'CSBC Advt No. 01/2026',
      releaseDate: 'June 10, 2026',
      summary:
        'Massive recruitment notification for 21,391 Constable vacancies in Bihar Police, Bihar Special Armed Police (BSAP), and District Executive Police.',
      officialPdfUrl: 'https://csbc.bih.nic.in/Advt/Advt-01-2026.pdf',
      keyHighlights: [
        '21,391 Total Vacancies across all districts.',
        '100 Marks Written Exam (Qualifying min 30% marks).',
        'Final Selection strictly based on Physical Efficiency Test (PET) Marks (100 Marks: Running + Shot Put + High Jump).',
      ],
    },

    eligibility: {
      qualification: '10+2 Intermediate Pass from recognized Bihar Board / CBSE / ICSE or Maulvi/Shastri equivalent.',
      allowedStreams: ['12th Any Stream'],
      minAge: 18,
      maxAgeGen: 25,
      ageRelaxations: [
        { category: 'OBC / BC / EBC Male', years: 2 },
        { category: 'BC / EBC Female', years: 3 },
        { category: 'SC / ST (Male & Female)', years: 5 },
      ],
      physicalStandards: {
        heightMale: '165 cm (160 cm for EBC/SC/ST)',
        heightFemale: '155 cm (All categories)',
        chestMale: '81 cm unexpanded / 86 cm expanded',
        endurance: 'Male: 1.6 km run in 6 mins | Female: 1 km run in 5 mins.',
      },
    },

    vacancy: {
      totalPosts: '21,391 Vacancies',
      postList: [
        { postTitle: 'District Executive Police Constable', payLevel: 'Level 3 (₹21,700 - ₹69,100)', vacancies: '15,200', dept: 'Bihar Police' },
        { postTitle: 'Bihar Special Armed Police (BSAP)', payLevel: 'Level 3 (₹21,700 - ₹69,100)', vacancies: '4,100', dept: 'BSAP Battalions' },
        { postTitle: 'Specialized Industrial Security Force (BSISF)', payLevel: 'Level 3 (₹21,700 - ₹69,100)', vacancies: '2,091', dept: 'Home Dept' },
      ],
      categoryQuota: [
        { category: 'General / Unreserved', count: '8,556' },
        { category: 'EBC', count: '3,840' },
        { category: 'BC', count: '2,570' },
        { category: 'SC', count: '3,400' },
        { category: 'EWS', count: '2,140' },
        { category: 'ST', count: '220' },
        { category: 'BC Female (3%)', count: '665' },
      ],
    },

    salary: {
      payScale: 'Pay Level 3 (7th Pay Commission)',
      basicPay: '₹21,700 Basic',
      approxInHand: '₹34,500 / month (Basic + DA + Ration Allowance ₹3,000 + HRA + Uniform Allowance)',
      allowances: ['Ration Money Allowance ₹3,000/mo', 'Uniform Maintenance ₹10,000/year', 'DA @ 50%', 'HRA @ 8-16%'],
    },

    syllabus: [
      {
        tier: 'Written Exam (10th Standard Level)',
        subjects: [
          { name: 'Hindi & English Language', totalMarks: 15, topics: ['Hindi Vyakaran', 'Antonyms/Synonyms', 'Grammar', 'Translation'], keyBooks: 'Lucent Hindi' },
          { name: 'Mathematics', totalMarks: 10, topics: ['Number System', 'Percentage', 'Average', 'Profit Loss', 'Ratio'], keyBooks: 'RS Aggarwal Class 10' },
          { name: 'Social Studies (History, Geography, Civics, Economics)', totalMarks: 35, topics: ['Indian Freedom Movement', 'Geography of Bihar & India', 'Indian Constitution', 'Basic Economics'], keyBooks: 'NCERT Class 9-10 / Lucent GK' },
          { name: 'Science (Physics, Chemistry, Biology)', totalMarks: 30, topics: ['Light & Motion', 'Chemical Reactions', 'Human Body & Health', 'Ecology'], keyBooks: 'Lucent General Science' },
          { name: 'Current Affairs & General Knowledge', totalMarks: 10, topics: ['Bihar Current News', 'Sports', 'Important Dates'], keyBooks: 'Eduteria Bihar Special' },
        ],
      },
    ],

    examPattern: [
      {
        tier: 'Written Screening Exam',
        mode: 'Offline OMR Sheet (2 Hours)',
        durationMinutes: 120,
        totalQuestions: 100,
        totalMarks: 100,
        negativeMarking: 'No Negative Marking (1 Mark per correct answer)',
        sections: [
          { sectionName: 'All 100 Questions (Hindi, Eng, Math, GS, Science)', questions: 100, marks: 100 },
        ],
      },
      {
        tier: 'Physical Efficiency Test (PET - Final Merit)',
        mode: 'Ground Field Physical Test',
        durationMinutes: 60,
        totalQuestions: 3,
        totalMarks: 100,
        negativeMarking: 'N/A',
        sections: [
          { sectionName: '1.6 Km Running (Male) / 1 Km (Female)', questions: 1, marks: 50 },
          { sectionName: 'Shot Put Throw (Gola Fenk)', questions: 1, marks: 25 },
          { sectionName: 'High Jump (Oonchi Kood)', questions: 1, marks: 25 },
        ],
      },
    ],

    previousPapers: [
      {
        year: 2024,
        tier: 'Written Exam',
        title: 'Bihar Police Constable Official Written Exam Shift 1 Question Paper',
        totalQuestions: 100,
        durationMinutes: 120,
        sampleQuestions: [
          {
            questionNumber: 1,
            subject: 'Science',
            question: 'What is the chemical name of Vitamin C?',
            options: ['Ascorbic Acid', 'Citric Acid', 'Retinol', 'Tocopherol'],
            correctAnswer: 'Ascorbic Acid',
            explanation: 'Vitamin C is scientifically known as Ascorbic Acid.',
          },
        ],
      },
    ],

    cutoffs: [
      { year: 2025, tier: 'Written Screening (Min 30% Pass)', general: 68.0, ews: 62.0, obc: 65.0, sc: 58.0, st: 54.0, maxMarks: 100 },
      { year: 2024, tier: 'Final PET Merit Marks (Out of 100)', general: 76.0, ews: 68.0, obc: 72.0, sc: 62.0, st: 60.0, maxMarks: 100 },
    ],

    application: {
      startDate: 'July 1, 2026',
      endDate: 'August 10, 2026',
      feeGeneral: '₹675',
      feeReserved: '₹180 (Bihar SC/ST/Female)',
      applyUrl: 'https://csbc.bih.nic.in',
      requiredDocs: ['10th/12th Certificates', 'Aadhaar Card', 'Bihar Domicile', 'Caste/NCL Certificate'],
    },

    admitCard: {
      status: 'Admit Card Released',
      releaseDate: 'October 28, 2026',
      downloadUrl: 'https://csbc.bih.nic.in/admitcard',
      instructions: [
        'Download Admit Card using Registration ID and DOB.',
        'Carry original photo ID and two printed copies of hall ticket.',
      ],
    },

    examSchedule: {
      tier1Date: 'November 18, 2026',
      shifts: ['Shift 1: 10:00 AM - 12:00 PM', 'Shift 2: 03:00 PM - 05:00 PM'],
      examCenterCities: ['All 38 Districts of Bihar'],
    },

    answerKey: {
      status: 'To be released post exam',
      releaseDate: 'November 25, 2026',
      objectionDeadline: 'November 30, 2026',
      objectionFee: 'Free',
      portalUrl: 'https://csbc.bih.nic.in',
    },

    result: {
      status: 'Awaited',
      declarationDate: 'December 20, 2026',
      meritListPdfUrl: 'https://csbc.bih.nic.in/results/constable_written_result.pdf',
      cutOffPdfUrl: 'https://csbc.bih.nic.in/results/constable_cutoff.pdf',
    },

    finalSelection: {
      dvProcess: ['Document verification on the day of PET at Sanjay Gandhi Stadium Patna.'],
      medicalStandard: 'Eye test 6/6, flat foot, knock knees, hearing test at District Civil Hospital.',
      meritFormula: 'Strictly based on total score obtained in PET (Running + High Jump + Shot Put).',
    },
  },

  {
    id: 'hub-rrb-je',
    title: 'RRB Junior Engineer (JE) & IT Cadre 2026',
    shortTitle: 'RRB JE 2026',
    conductingBody: 'Railway Recruitment Boards (RRCB, Ministry of Railways)',
    category: 'Railways',
    currentStage: 'Application Open',
    lastUpdated: 'August 10, 2026',
    officialWebsite: 'https://rrbcdg.gov.in',
    bannerImage: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80',

    notification: {
      advtNo: 'RRB CEN 04/2026 (JE)',
      releaseDate: 'July 15, 2026',
      summary:
        'Official recruitment notice for 7,911 Junior Engineer (JE Civil, Electrical, Mechanical, Electronics, CSE/IT), Chemical & Metallurgical Assistant (CMA), and Depot Material Superintendent (DMS) posts in Indian Railways.',
      officialPdfUrl: 'https://rrbcdg.gov.in/pdf/CEN_04_2026_JE.pdf',
      keyHighlights: ['7,911 Technical Posts.', 'Two-Stage Computer Based Test (CBT-1 Non-Tech + CBT-2 Technical Domain).', 'Pay Level 6 with Railway Passes.'],
    },

    eligibility: {
      qualification: '3-Year Polytechnic Diploma or B.Tech/B.E. Degree in Civil, Mechanical, Electrical, Electronics, CS, IT Engineering.',
      allowedStreams: ['Civil', 'Mechanical', 'Electrical', 'Electronics', 'CSE', 'IT', 'Instrumentation'],
      minAge: 18,
      maxAgeGen: 33,
      ageRelaxations: [
        { category: 'OBC', years: 3 },
        { category: 'SC / ST', years: 5 },
      ],
    },

    vacancy: {
      totalPosts: '7,911 Posts',
      postList: [
        { postTitle: 'Junior Engineer (Civil)', payLevel: 'Level 6 (₹35,400 basic)', vacancies: '3,200', dept: 'Engineering' },
        { postTitle: 'Junior Engineer (Electrical)', payLevel: 'Level 6 (₹35,400 basic)', vacancies: '1,850', dept: 'Electrical' },
        { postTitle: 'Junior Engineer (Mechanical)', payLevel: 'Level 6 (₹35,400 basic)', vacancies: '1,600', dept: 'Mechanical / Workshops' },
        { postTitle: 'JE (S&T / Electronics)', payLevel: 'Level 6 (₹35,400 basic)', vacancies: '800', dept: 'Signal & Telecom' },
        { postTitle: 'DMS & CMA Posts', payLevel: 'Level 6 (₹35,400 basic)', vacancies: '461', dept: 'Stores & Medical' },
      ],
    },

    salary: {
      payScale: 'Level 6 (7th CPC)',
      basicPay: '₹35,400 Basic',
      approxInHand: '₹58,000 / month + Railway Duty Passes + Night Duty Allowance',
      allowances: ['DA @ 50%', 'HRA @ 30/20/10%', 'Transport Allowance', 'Free Railway Travel Pass'],
    },

    syllabus: [
      {
        tier: 'CBT-1 (Non-Technical Screening)',
        subjects: [
          { name: 'Mathematics', totalMarks: 30, topics: ['BODMAS', 'Decimals', 'P&L', 'Algebra', 'Trigonometry', 'Statistics'], keyBooks: 'Fast Track Objective Arithmetic' },
          { name: 'General Intelligence & Reasoning', totalMarks: 25, topics: ['Analogies', 'Coding', 'Venn Diagram', 'Data Sufficiency'], keyBooks: 'Lucent Reasoning' },
          { name: 'General Awareness', totalMarks: 15, topics: ['Indian History', 'Polity', 'Railways History & Current Events'], keyBooks: 'Railway GK Book' },
          { name: 'General Science', totalMarks: 30, topics: ['Physics, Chemistry & Life Sciences up to 10th CBSE'], keyBooks: 'NCERT Class 10 Science' },
        ],
      },
      {
        tier: 'CBT-2 (Technical Domain Merit)',
        subjects: [
          { name: 'Technical Abilities (Engineering Discipline)', totalMarks: 100, topics: ['Civil / Mech / Elec / CS Discipline Core Subjects'], keyBooks: 'Made Easy / RK Rajput / JB Gupta' },
          { name: 'General Awareness', totalMarks: 15, topics: ['Current Affairs & Economics'], keyBooks: 'Monthly Current Affairs' },
          { name: 'Physics & Chemistry', totalMarks: 15, topics: ['10+2 Standard Concepts'], keyBooks: 'NCERT 11-12' },
          { name: 'Basics of Computer & Applications', totalMarks: 10, topics: ['Networking, Algorithms, MS Office, Operating Systems'], keyBooks: 'Arihant Computer' },
          { name: 'Basics of Environment & Pollution Control', totalMarks: 10, topics: ['Ecology, Waste Management, Air/Water Pollution Acts'], keyBooks: 'Environment Notes' },
        ],
      },
    ],

    examPattern: [
      {
        tier: 'CBT-1 Screening',
        mode: 'Online CBT',
        durationMinutes: 90,
        totalQuestions: 100,
        totalMarks: 100,
        negativeMarking: '0.33 marks per wrong answer',
        sections: [
          { sectionName: 'Maths (30 Qs), Reasoning (25 Qs), GA (15 Qs), Science (30 Qs)', questions: 100, marks: 100 },
        ],
      },
      {
        tier: 'CBT-2 Technical Merit',
        mode: 'Online CBT',
        durationMinutes: 120,
        totalQuestions: 150,
        totalMarks: 150,
        negativeMarking: '0.33 marks per wrong answer',
        sections: [
          { sectionName: 'Technical Domain (100 Qs) + General / Computer / Environment (50 Qs)', questions: 150, marks: 150 },
        ],
      },
    ],

    previousPapers: [
      {
        year: 2024,
        tier: 'CBT-1',
        title: 'RRB JE Official CBT-1 Question Paper (Civil Engineering Stream)',
        totalQuestions: 100,
        durationMinutes: 90,
        sampleQuestions: [
          {
            questionNumber: 1,
            subject: 'General Science',
            question: 'What is the SI unit of Electrical Resistance?',
            options: ['Ohm', 'Volt', 'Ampere', 'Watt'],
            correctAnswer: 'Ohm',
            explanation: 'The SI unit of electrical resistance is Ohm (Ω).',
          },
        ],
      },
    ],

    cutoffs: [
      { year: 2025, tier: 'CBT-1 Civil Zone Patna (Out of 100)', general: 64.2, ews: 58.5, obc: 61.0, sc: 51.2, st: 46.0, maxMarks: 100 },
    ],

    application: {
      startDate: 'July 15, 2026',
      endDate: 'August 15, 2026',
      feeGeneral: '₹500 (₹400 refunded on appearing in CBT-1)',
      feeReserved: '₹250 (Full ₹250 refunded on CBT-1)',
      applyUrl: 'https://rrbcdg.gov.in',
      requiredDocs: ['Diploma/Degree Certificate', 'Cast Certificate', 'Aadhaar'],
    },

    admitCard: {
      status: 'Expected Nov 2026',
      releaseDate: 'November 10, 2026',
      downloadUrl: 'https://rrbcdg.gov.in',
      instructions: ['City Intimation Slip 10 days before exam.', 'Admit Card 4 days before exam.'],
    },

    examSchedule: {
      tier1Date: 'November 20-25, 2026',
      shifts: ['Shift 1', 'Shift 2', 'Shift 3'],
      examCenterCities: ['Patna', 'Muzaffarpur', 'Delhi', 'Kolkata'],
    },

    answerKey: {
      status: 'Awaited',
      releaseDate: 'December 5, 2026',
      objectionDeadline: 'December 10, 2026',
      objectionFee: '₹50 per question',
      portalUrl: 'https://rrbcdg.gov.in',
    },

    result: {
      status: 'Awaited',
      declarationDate: 'January 2027',
      meritListPdfUrl: 'https://rrbcdg.gov.in/results/je_cbt1_result.pdf',
      cutOffPdfUrl: 'https://rrbcdg.gov.in/results/je_cbt1_cutoff.pdf',
    },

    finalSelection: {
      dvProcess: ['Biometric authentication & verification of engineering marksheets.'],
      medicalStandard: 'A-3 Medical Standard with strict vision testing for Railway Engineers.',
      meritFormula: 'Final merit calculated 100% on CBT-2 Marks.',
    },
  },
];
