import { CourseDirectoryItem } from '../types';

export const initialCoursesData: CourseDirectoryItem[] = [
  {
    id: 'btech-cse',
    name: 'B.Tech in Computer Science & Engineering',
    shortName: 'B.Tech CSE',
    slug: 'btech-computer-science-engineering',
    degree: 'B.Tech',
    stream: 'Engineering & Tech',
    level: 'Undergraduate',
    durationYears: 4,
    durationText: '4 Years (8 Semesters)',
    specializations: [
      'Artificial Intelligence & Machine Learning',
      'Data Science & Big Data',
      'Cyber Security & Digital Forensics',
      'Cloud Computing & DevOps',
      'Full Stack Software Development'
    ],
    avgAnnualFeeGovt: '₹1.5 Lakh - ₹2.5 Lakh / year',
    avgAnnualFeePrivate: '₹2.5 Lakh - ₹5.0 Lakh / year',
    feeCategory: '₹1L - ₹2.5L/yr',
    avgStartingSalaryLpa: '₹8.5 LPA - ₹15.0 LPA',
    highestPackageLpa: '₹82.0 LPA',
    entranceExams: ['JEE Advanced', 'JEE Main', 'BCECE', 'WBJEE', 'CUET UG'],
    stateAvailability: ['Bihar', 'All India', 'Delhi', 'Uttar Pradesh', 'Maharashtra'],
    overview: 'B.Tech in Computer Science & Engineering is one of the most sought-after 4-year undergraduate professional degree programs in India. It focuses on algorithms, software development, data structures, cloud infrastructure, AI models, and computer architecture.',
    eligibility: '10+2 / Class 12th passed with Physics, Mathematics as compulsory subjects along with Chemistry/CS/Biotech. Minimum 75% marks in 12th for IITs/NITs (65% for SC/ST) or minimum 50% for state engineering colleges.',
    admissionProcessSteps: [
      'Appear for JEE Main / BCECE / National or State Entrance Examinations.',
      'Qualify cutoff rank and register for centralized counseling (JoSAA / BCECE Board).',
      'Fill college preferences and branch choices in online portal.',
      'Seat allocation based on rank, category quota, and choice matrix.',
      'Document verification and fee submission at assigned institute.'
    ],
    coreSubjects: [
      {
        semesterOrYear: 'Year 1 (Sem 1 & 2)',
        subjects: ['Engineering Mathematics I & II', 'Programming in C/C++', 'Basic Electrical & Electronics', 'Engineering Physics', 'Data Structures & Algorithms']
      },
      {
        semesterOrYear: 'Year 2 (Sem 3 & 4)',
        subjects: ['Object Oriented Programming (Java/Python)', 'Discrete Mathematics', 'Database Management Systems (DBMS)', 'Operating Systems', 'Computer Organization & Architecture']
      },
      {
        semesterOrYear: 'Year 3 (Sem 5 & 6)',
        subjects: ['Computer Networks', 'Design & Analysis of Algorithms', 'Software Engineering & Agile', 'Compiler Design', 'Web Technologies & Cloud']
      },
      {
        semesterOrYear: 'Year 4 (Sem 7 & 8)',
        subjects: ['Artificial Intelligence & Deep Learning', 'Cyber Security', 'Elective Specialization', 'Industrial Internship & Capstone Project']
      }
    ],
    careerOptions: [
      { title: 'Software Development Engineer (SDE)', avgSalary: '₹9.0 LPA - ₹24.0 LPA', topSectors: 'Tech Giants, Product FinTech, Startups' },
      { title: 'Data Scientist & ML Engineer', avgSalary: '₹10.5 LPA - ₹28.0 LPA', topSectors: 'Analytics, AI Labs, Banking' },
      { title: 'Cloud Architect / DevOps Engineer', avgSalary: '₹8.0 LPA - ₹18.0 LPA', topSectors: 'IT Services, SaaS, Enterprise Software' },
      { title: 'Cyber Security Analyst', avgSalary: '₹7.5 LPA - ₹16.0 LPA', topSectors: 'Defense, FinTech, E-Commerce' }
    ],
    higherStudiesOptions: ['M.Tech in AI / CSE / Data Science', 'MS in Computer Science (USA / Europe)', 'MBA (Technology Management / FinTech)', 'PhD in Quantum Computing / Robotics'],
    topCollegesList: [
      { collegeId: 'iit-patna', collegeName: 'IIT Patna', city: 'Patna', state: 'Bihar', feeText: '₹2.25 L/yr', rating: 4.9, nirfRank: 27 },
      { collegeId: 'nit-patna', collegeName: 'NIT Patna', city: 'Patna', state: 'Bihar', feeText: '₹1.45 L/yr', rating: 4.7, nirfRank: 56 },
      { collegeId: 'bit-mesra-patna', collegeName: 'BIT Mesra Patna Campus', city: 'Patna', state: 'Bihar', feeText: '₹3.20 L/yr', rating: 4.4 },
      { collegeId: 'dtu-delhi', collegeName: 'Delhi Technological University (DTU)', city: 'New Delhi', state: 'Delhi', feeText: '₹2.10 L/yr', rating: 4.8, nirfRank: 29 }
    ],
    scholarships: [
      { name: 'Merit-cum-Means (MCM) Scholarship', provider: 'Central Govt / IITs', benefit: '100% Tuition Fee Waiver + Monthly Pocket Allowance' },
      { name: 'Bihar Mukhyamantri Kanya Utthan Yojana', provider: 'Govt of Bihar', benefit: '₹50,000 one-time grant for female graduates' },
      { name: 'Bihar Post-Matric Scholarship (PMS)', provider: 'BC/EBC/SC/ST Welfare Dept', benefit: 'Full non-refundable fee refund' }
    ],
    faqs: [
      { question: 'Is B.Tech CSE harder than BCA or B.Sc CS?', answer: 'B.Tech CSE includes comprehensive engineering mathematics, hardware architecture, and compiler theory along with software coding, making it more intensive but highly valued in product companies.' },
      { question: 'What is the minimum percentile needed in JEE Main for B.Tech CSE in NITs?', answer: 'For General category in top NITs, a percentile above 98.5 (AIR under 15,000) is usually required for CSE.' }
    ]
  },
  {
    id: 'bca',
    name: 'Bachelor of Computer Applications (BCA)',
    shortName: 'BCA',
    slug: 'bca-bachelor-computer-applications',
    degree: 'BCA',
    stream: 'Computer Applications',
    level: 'Undergraduate',
    durationYears: 3,
    durationText: '3 Years (6 Semesters)',
    specializations: [
      'Full Stack Web Development',
      'Mobile Application Development (Android/iOS)',
      'Data Analytics & Python',
      'Database Administration',
      'Cyber Security & Ethical Hacking'
    ],
    avgAnnualFeeGovt: '₹15,000 - ₹45,000 / year',
    avgAnnualFeePrivate: '₹50,000 - ₹1.2 Lakh / year',
    feeCategory: '₹30k - ₹1L/yr',
    avgStartingSalaryLpa: '₹3.8 LPA - ₹7.2 LPA',
    highestPackageLpa: '₹21.0 LPA',
    entranceExams: ['CUET UG', 'Patna University CET', 'BCECE Lateral', 'Merit-Based 12th Marks'],
    stateAvailability: ['Bihar', 'All India', 'Delhi', 'Uttar Pradesh'],
    overview: 'Bachelor of Computer Applications (BCA) is a 3-year undergraduate degree in computer applications and software engineering. It prepares students for fast-track entry into software development, web engineering, system administration, and database management.',
    eligibility: '10+2 / Class 12th passed in any stream (Science/Commerce/Arts) with English and Mathematics or Computer Science as a subject with minimum 45% - 50% aggregate marks.',
    admissionProcessSteps: [
      'Check university eligibility criteria (Math in 12th required in some universities).',
      'Fill CUET UG or state university entrance application form (e.g. Patna University PUPET).',
      'Appear for entrance exam or merit selection based on 12th percentage.',
      'Attend online counseling and college document verification.'
    ],
    coreSubjects: [
      {
        semesterOrYear: 'Year 1 (Sem 1 & 2)',
        subjects: ['Programming Methodology using C', 'Computer Fundamentals & HTML/CSS', 'Digital Electronics', 'Data Structures using C++', 'Discrete Mathematics']
      },
      {
        semesterOrYear: 'Year 2 (Sem 3 & 4)',
        subjects: ['Java Programming & OOPs', 'Relational Database Management Systems (SQL)', 'Software Engineering', 'Python Programming', 'Operating Systems Concepts']
      },
      {
        semesterOrYear: 'Year 3 (Sem 5 & 6)',
        subjects: ['PHP / Node.js & Web Frameworks', 'Computer Networks & Security', 'Cloud Computing Basics', 'Major Live Project & Industrial Training']
      }
    ],
    careerOptions: [
      { title: 'Full Stack Web Developer', avgSalary: '₹4.5 LPA - ₹9.0 LPA', topSectors: 'IT Services, Digital Agencies, Tech Startups' },
      { title: 'Software Tester / QA Engineer', avgSalary: '₹3.5 LPA - ₹6.5 LPA', topSectors: 'Software Product Testing, Enterprise IT' },
      { title: 'System & Database Administrator', avgSalary: '₹4.0 LPA - ₹7.5 LPA', topSectors: 'Banks, Government Telecom, Healthcare' }
    ],
    higherStudiesOptions: ['MCA (Master of Computer Applications - 2 Yrs)', 'M.Sc Computer Science / IT', 'MBA in Information Technology / Systems', 'Post Graduate Diploma in Data Science'],
    topCollegesList: [
      { collegeId: 'patna-science-college', collegeName: 'Patna Science College', city: 'Patna', state: 'Bihar', feeText: '₹28,000 / yr', rating: 4.6 },
      { collegeId: 'cetan-college', collegeName: 'Anugrah Narayan College (A.N. College)', city: 'Patna', state: 'Bihar', feeText: '₹32,000 / yr', rating: 4.5, nirfRank: 85 },
      { collegeId: 'nalanda-college', collegeName: 'Nalanda College Bihar Sharif', city: 'Nalanda', state: 'Bihar', feeText: '₹22,000 / yr', rating: 4.3 }
    ],
    scholarships: [
      { name: 'Bihar Student Credit Card Scheme (DRCC)', provider: 'Education Dept, Bihar', benefit: 'Education loan up to ₹4 Lakhs at 1% interest for girls/disabled, 4% for boys' },
      { name: 'National Scholarship Portal (NSP) Post-Matric', provider: 'Govt of India', benefit: 'Full tuition reimbursement + monthly stipend' }
    ],
    faqs: [
      { question: 'Is Mathematics mandatory in Class 12th for BCA?', answer: 'In many universities (like Patna University, AKU, IPU Delhi), Mathematics or Computer Science in 12th is required, but several private universities accept students from Arts and Commerce as well.' },
      { question: 'Is BCA equal to B.Tech CSE in job opportunities?', answer: 'While B.Tech CSE opens higher initial package tier-1 campus drives, BCA graduates who complete an MCA or build strong GitHub project portfolios earn at par with B.Tech engineers.' }
    ]
  },
  {
    id: 'bba',
    name: 'Bachelor of Business Administration (BBA)',
    shortName: 'BBA',
    slug: 'bba-bachelor-business-administration',
    degree: 'BBA',
    stream: 'Management',
    level: 'Undergraduate',
    durationYears: 3,
    durationText: '3 Years (6 Semesters)',
    specializations: [
      'Financial Management & Banking',
      'Marketing & Digital Media',
      'Human Resource Management (HR)',
      'International Business',
      'Supply Chain & Logistics'
    ],
    avgAnnualFeeGovt: '₹20,000 - ₹50,000 / year',
    avgAnnualFeePrivate: '₹60,000 - ₹1.8 Lakh / year',
    feeCategory: '₹30k - ₹1L/yr',
    avgStartingSalaryLpa: '₹4.0 LPA - ₹8.0 LPA',
    highestPackageLpa: '₹18.0 LPA',
    entranceExams: ['CUET UG', 'IPMAT', 'NPAT', 'PU BBA Entrance', 'Merit 12th Marks'],
    stateAvailability: ['Bihar', 'All India', 'Delhi', 'Uttar Pradesh'],
    overview: 'BBA is a 3-year professional undergraduate degree that lays a solid foundation in core business concepts, corporate governance, financial accounting, marketing strategy, and managerial leadership.',
    eligibility: '10+2 / Class 12th passed in Science, Commerce, or Arts stream with minimum 50% marks (45% for reserved categories).',
    admissionProcessSteps: [
      'Register for university entrance test (CUET UG / IPMAT / College CET).',
      'Appear for Group Discussion (GD) and Personal Interview (PI) where applicable.',
      'Merit list publication and online seat allocation.'
    ],
    coreSubjects: [
      {
        semesterOrYear: 'Year 1 (Sem 1 & 2)',
        subjects: ['Principles of Management', 'Financial Accounting', 'Business Economics', 'Business Communication', 'Business Statistics']
      },
      {
        semesterOrYear: 'Year 2 (Sem 3 & 4)',
        subjects: ['Marketing Management', 'Human Resource Management', 'Corporate Finance', 'Cost & Management Accounting', 'Business Law & Ethics']
      },
      {
        semesterOrYear: 'Year 3 (Sem 5 & 6)',
        subjects: ['Strategic Management', 'Entrepreneurship Development', 'Digital Marketing', 'Specialization Electives & Summer Internship Project']
      }
    ],
    careerOptions: [
      { title: 'Business Analyst / Associate Consultant', avgSalary: '₹4.5 LPA - ₹9.0 LPA', topSectors: 'Management Consulting, FinTech, E-Commerce' },
      { title: 'Digital Marketing Executive', avgSalary: '₹3.8 LPA - ₹7.5 LPA', topSectors: 'Ad Agencies, Tech Companies, Retail' },
      { title: 'HR Manager / Talent Recruiter', avgSalary: '₹4.0 LPA - ₹8.0 LPA', topSectors: 'Corporate MNCs, Staffing Firms' }
    ],
    higherStudiesOptions: ['MBA (Master of Business Administration)', 'PGDM (Post Graduate Diploma in Management)', 'M.Com in Finance', 'Chartered Financial Analyst (CFA)'],
    topCollegesList: [
      { collegeId: 'cetan-college', collegeName: 'A.N. College Patna', city: 'Patna', state: 'Bihar', feeText: '₹35,000 / yr', rating: 4.5 },
      { collegeId: 'patna-college', collegeName: 'Patna College', city: 'Patna', state: 'Bihar', feeText: '₹24,000 / yr', rating: 4.4 },
      { collegeId: 'candid-college-2', collegeName: 'St. Xavier College Patna', city: 'Patna', state: 'Bihar', feeText: '₹65,000 / yr', rating: 4.6 }
    ],
    scholarships: [
      { name: 'Bihar Student Credit Card DRCC Scheme', provider: 'Govt of Bihar', benefit: 'Loan up to ₹4 Lakhs covering college fees & laptop hostel expenses' },
      { name: 'Post-Matric Scholarship Scheme', provider: 'Ministry of Social Justice', benefit: '100% tuition refund for SC/ST/OBC students' }
    ],
    faqs: [
      { question: 'Should I do BBA or B.Com before MBA?', answer: 'BBA covers managerial leadership, marketing, and case study problem solving, providing a direct head start for CAT and MBA admissions.' }
    ]
  },
  {
    id: 'bsc-cs',
    name: 'B.Sc in Computer Science / Physics / Chemistry',
    shortName: 'B.Sc (Hons)',
    slug: 'bsc-bachelor-of-science',
    degree: 'B.Sc',
    stream: 'Science',
    level: 'Undergraduate',
    durationYears: 3,
    durationText: '3 Years / 4 Years (NEP FYUGP 8 Semesters)',
    specializations: [
      'Computer Science & IT',
      'Physics & Astrophysics',
      'Chemistry & Material Science',
      'Mathematics & Statistics',
      'Biotechnology & Microbiology'
    ],
    avgAnnualFeeGovt: '₹5,000 - ₹18,000 / year',
    avgAnnualFeePrivate: '₹30,000 - ₹80,000 / year',
    feeCategory: 'Under ₹30k/yr',
    avgStartingSalaryLpa: '₹3.5 LPA - ₹6.5 LPA',
    highestPackageLpa: '₹14.0 LPA',
    entranceExams: ['CUET UG', 'Patna University Entrance', 'BCECE', '12th Merit'],
    stateAvailability: ['Bihar', 'All India', 'Delhi', 'Uttar Pradesh'],
    overview: 'B.Sc (Honours) is a traditional yet high-value undergraduate scientific degree aligned with National Education Policy (NEP 2020) 4-year undergraduate research framework. It develops deep subject mastery, laboratory experimentation, and research aptitude.',
    eligibility: '10+2 / Class 12th passed in Science stream (Physics, Chemistry, Math/Biology) with minimum 50% aggregate marks.',
    admissionProcessSteps: [
      'Apply online via state university portal (e.g. PU Online Portal, Samarth Portal).',
      'Appear for entrance test or wait for cutoff list release based on 12th PCB/PCM marks.',
      'Counseling and document verification at department office.'
    ],
    coreSubjects: [
      {
        semesterOrYear: 'Year 1 (Sem 1 & 2)',
        subjects: ['Core Major Subject (e.g. Quantum Physics / Organic Chemistry / Programming in C)', 'Minor Elective Subject', 'Ability Enhancement Course (AEC - Environmental Science)']
      },
      {
        semesterOrYear: 'Year 2 (Sem 3 & 4)',
        subjects: ['Advanced Theoretical Mechanics / Physical Chemistry / Data Structures', 'Skill Enhancement Course (SEC)', 'Practical Laboratory Work']
      },
      {
        semesterOrYear: 'Year 3 & 4 (Sem 5 to 8)',
        subjects: ['Specialized Electives', 'Research Methodology & Dissertation', 'Industrial / Scientific Project']
      }
    ],
    careerOptions: [
      { title: 'Research Assistant / Scientific Officer', avgSalary: '₹4.0 LPA - ₹8.0 LPA', topSectors: 'ISRO, DRDO, CSIR Labs, Pharma' },
      { title: 'Data Analyst & Statistician', avgSalary: '₹4.5 LPA - ₹8.5 LPA', topSectors: 'Analytics, Banking, Market Research' },
      { title: 'Government Secondary School Teacher', avgSalary: '₹5.0 LPA - ₹7.2 LPA', topSectors: 'Bihar Teacher TRE, Kendriya Vidyalaya (KVS)' }
    ],
    higherStudiesOptions: ['M.Sc in Applied Science / Physics / CS', 'Integrated M.Sc-PhD (IIT JAM / TIFR)', 'B.Ed for Teaching Career', 'MCA or MBA'],
    topCollegesList: [
      { collegeId: 'patna-science-college', collegeName: 'Patna Science College', city: 'Patna', state: 'Bihar', feeText: '₹6,500 / yr', rating: 4.8 },
      { collegeId: 'langat-singh-college', collegeName: 'Langat Singh College (L.S. College)', city: 'Muzaffarpur', state: 'Bihar', feeText: '₹5,200 / yr', rating: 4.5 },
      { collegeId: 'miranda-house-delhi', collegeName: 'Miranda House / Hindu College', city: 'New Delhi', state: 'Delhi', feeText: '₹18,000 / yr', rating: 4.9, nirfRank: 1 }
    ],
    scholarships: [
      { name: 'INSPIRE Scholarship (DST Govt of India)', provider: 'Department of Science & Tech', benefit: '₹80,000 per year scholarship for top 1% 12th board scorers' },
      { name: 'Mukhyamantri Kanya Utthan Yojana', provider: 'Govt of Bihar', benefit: '₹50,000 for unmarried female graduates' }
    ],
    faqs: [
      { question: 'Is B.Sc eligible for BPSC and UPSC civil services?', answer: 'Yes, B.Sc graduates are 100% eligible for BPSC, UPSC CSE, SSC CGL, Banking PO, and Bihar TRE teacher exams.' }
    ]
  },
  {
    id: 'bcom-hons',
    name: 'Bachelor of Commerce (B.Com Hons / Accounts)',
    shortName: 'B.Com (Hons)',
    slug: 'bcom-bachelor-of-commerce',
    degree: 'B.Com',
    stream: 'Commerce',
    level: 'Undergraduate',
    durationYears: 3,
    durationText: '3 Years (6 Semesters / NEP 4 Years)',
    specializations: [
      'Accounting & Auditing',
      'Corporate Taxation & GST',
      'Banking & Financial Services',
      'E-Commerce & Digital Banking',
      'Cost & Management Accounting'
    ],
    avgAnnualFeeGovt: '₹4,000 - ₹12,000 / year',
    avgAnnualFeePrivate: '₹25,000 - ₹70,000 / year',
    feeCategory: 'Under ₹30k/yr',
    avgStartingSalaryLpa: '₹3.5 LPA - ₹7.0 LPA',
    highestPackageLpa: '₹16.0 LPA',
    entranceExams: ['CUET UG', 'Patna University CET', '12th Merit Board Marks'],
    stateAvailability: ['Bihar', 'All India', 'Delhi', 'Uttar Pradesh'],
    overview: 'B.Com (Honours) is a premier commerce degree focused on financial accounting, taxation laws, auditing standards, corporate law, and banking operations. It is the ideal stepping stone for aspiring Chartered Accountants (CA) and Company Secretaries (CS).',
    eligibility: '10+2 / Class 12th passed in Commerce (or Science/Arts with Commerce subjects) with minimum 45% - 50% aggregate marks.',
    admissionProcessSteps: [
      'Submit application through centralized university portal (e.g. PU Samarth Portal).',
      'Publication of merit cutoff lists based on 12th marks or CUET score.',
      'Verification of marksheets and fee payment at college counter.'
    ],
    coreSubjects: [
      {
        semesterOrYear: 'Year 1 (Sem 1 & 2)',
        subjects: ['Financial Accounting', 'Business Law', 'Micro Economics', 'Corporate Laws', 'Business Statistics']
      },
      {
        semesterOrYear: 'Year 2 (Sem 3 & 4)',
        subjects: ['Corporate Accounting', 'Income Tax Law & Practice', 'Management Accounting', 'Cost Accounting', 'E-Commerce & Digital Payments']
      },
      {
        semesterOrYear: 'Year 3 (Sem 5 & 6)',
        subjects: ['Auditing & Corporate Governance', 'Goods & Services Tax (GST) Law', 'Financial Management', 'Banking & Insurance Principles']
      }
    ],
    careerOptions: [
      { title: 'Tax Consultant & Auditor', avgSalary: '₹4.0 LPA - ₹8.5 LPA', topSectors: 'Accounting Firms, CA Practices, Corporate Finance' },
      { title: 'Bank Probationary Officer (PO)', avgSalary: '₹6.5 LPA - ₹9.5 LPA', topSectors: 'SBI, PNB, Canara Bank, HDFC Bank' },
      { title: 'Financial Analyst', avgSalary: '₹4.5 LPA - ₹9.0 LPA', topSectors: 'Investment Banks, Stock Broking, Mutual Funds' }
    ],
    higherStudiesOptions: ['Chartered Accountancy (CA - ICAI)', 'Company Secretary (CS - ICSI)', 'Cost & Management Accountant (CMA)', 'M.Com', 'MBA in Finance'],
    topCollegesList: [
      { collegeId: 'vanijya-mahavidyalaya', collegeName: 'Vanijya Mahavidyalaya Patna', city: 'Patna', state: 'Bihar', feeText: '₹4,800 / yr', rating: 4.7 },
      { collegeId: 'patna-college', collegeName: 'Patna College', city: 'Patna', state: 'Bihar', feeText: '₹4,200 / yr', rating: 4.5 },
      { collegeId: 'srcc-delhi', collegeName: 'Shri Ram College of Commerce (SRCC)', city: 'New Delhi', state: 'Delhi', feeText: '₹16,000 / yr', rating: 5.0, nirfRank: 1 }
    ],
    scholarships: [
      { name: 'Bihar Post-Matric Scholarship', provider: 'Govt of Bihar', benefit: 'Full tuition fee reimbursement for BC/EBC/SC/ST' },
      { name: 'ICAI Merit Scholarship for CA Foundation', provider: 'ICAI', benefit: 'Stipend for top rankers in CA Foundation' }
    ],
    faqs: [
      { question: 'Can a Non-Commerce student do B.Com Hons?', answer: 'Yes, Science students with Mathematics in 12th are eligible for B.Com Hons in most state and central universities.' }
    ]
  },
  {
    id: 'ba-hons',
    name: 'Bachelor of Arts (BA Hons - History, Pol Sci, Economics)',
    shortName: 'BA (Hons)',
    slug: 'ba-bachelor-of-arts',
    degree: 'BA',
    stream: 'Arts & Humanities',
    level: 'Undergraduate',
    durationYears: 3,
    durationText: '3 Years / 4 Years (NEP FYUGP)',
    specializations: [
      'Political Science & Public Administration',
      'History & Archaeology',
      'Economics & Econometrics',
      'Geography & Disaster Management',
      'English Literature & Journalism'
    ],
    avgAnnualFeeGovt: '₹2,500 - ₹8,000 / year',
    avgAnnualFeePrivate: '₹18,000 - ₹45,000 / year',
    feeCategory: 'Under ₹30k/yr',
    avgStartingSalaryLpa: '₹3.2 LPA - ₹6.0 LPA',
    highestPackageLpa: '₹12.0 LPA',
    entranceExams: ['CUET UG', 'Patna University Entrance', '12th Merit Board Marks'],
    stateAvailability: ['Bihar', 'All India', 'Delhi', 'Uttar Pradesh'],
    overview: 'Bachelor of Arts (BA Honours) is the premier undergraduate program for humanities and social sciences. It provides deep analytical reasoning, historical awareness, political philosophy, and economic policy knowledge, making it the most popular degree among Civil Services (UPSC / BPSC) aspirants.',
    eligibility: '10+2 / Class 12th passed in any stream (Arts, Science, Commerce) with minimum 45% aggregate marks.',
    admissionProcessSteps: [
      'Apply online on university portal during admission window.',
      'Merit lists published based on 12th marks or CUET UG score.',
      'Verification of documents and seat confirmation.'
    ],
    coreSubjects: [
      {
        semesterOrYear: 'Year 1 (Sem 1 & 2)',
        subjects: ['Political Theory / Ancient Indian History / Micro Economics', 'Generic Elective Subject', 'Environmental Studies']
      },
      {
        semesterOrYear: 'Year 2 (Sem 3 & 4)',
        subjects: ['Indian Government & Politics / Medieval History / Macro Economics', 'Public Administration', 'Skill Enhancement (SEC)']
      },
      {
        semesterOrYear: 'Year 3 (Sem 5 & 6)',
        subjects: ['International Relations / Modern World History / Indian Economy', 'Comparative Politics & Research Paper']
      }
    ],
    careerOptions: [
      { title: 'Civil Servant / Administrative Officer', avgSalary: '₹7.0 LPA - ₹12.0 LPA', topSectors: 'UPSC CSE (IAS/IPS), BPSC (SDM/DSP), State Services' },
      { title: 'Content Strategist & Journalist', avgSalary: '₹3.5 LPA - ₹7.0 LPA', topSectors: 'Media Houses, Publishing, Digital Agencies' },
      { title: 'Policy Researcher & NGO Officer', avgSalary: '₹4.0 LPA - ₹8.0 LPA', topSectors: 'Think Tanks, UN Agencies, NGOs' }
    ],
    higherStudiesOptions: ['MA in Political Science / History / Economics', 'Master of Social Work (MSW)', 'LLB (3-Year Law Degree)', 'B.Ed for High School Teaching'],
    topCollegesList: [
      { collegeId: 'patna-college', collegeName: 'Patna College (Estd. 1863)', city: 'Patna', state: 'Bihar', feeText: '₹3,200 / yr', rating: 4.8 },
      { collegeId: 'magadh-mahila-college', collegeName: 'Magadh Mahila College Patna', city: 'Patna', state: 'Bihar', feeText: '₹3,500 / yr', rating: 4.7 },
      { collegeId: 'st-stephens-delhi', collegeName: 'St. Stephen College / Hindu College', city: 'New Delhi', state: 'Delhi', feeText: '₹14,000 / yr', rating: 5.0, nirfRank: 2 }
    ],
    scholarships: [
      { name: 'Bihar Mukhyamantri Kanya Utthan Yojana', provider: 'Govt of Bihar', benefit: '₹50,000 financial incentive for female graduates' },
      { name: 'Central Sector Scholarship Scheme', provider: 'MHRD Govt of India', benefit: '₹12,000/yr for top 80th percentile 12th board students' }
    ],
    faqs: [
      { question: 'Why is BA popular among BPSC & UPSC toppers?', answer: 'BA subjects (History, Polity, Geography, Economics) cover almost 70% of UPSC and BPSC General Studies prelims and mains syllabus directly.' }
    ]
  },
  {
    id: 'mba',
    name: 'Master of Business Administration (MBA / PGDM)',
    shortName: 'MBA',
    slug: 'mba-master-business-administration',
    degree: 'MBA',
    stream: 'Management',
    level: 'Postgraduate',
    durationYears: 2,
    durationText: '2 Years (4 Semesters / 6 Trimesters)',
    specializations: [
      'Finance & Corporate Valuation',
      'Marketing & Brand Management',
      'Human Resource Management (HR)',
      'Business Analytics & Big Data',
      'Operations & Supply Chain Management'
    ],
    avgAnnualFeeGovt: '₹1.2 Lakh - ₹3.5 Lakh / year',
    avgAnnualFeePrivate: '₹3.0 Lakh - ₹8.0 Lakh / year',
    feeCategory: 'Above ₹2.5L/yr',
    avgStartingSalaryLpa: '₹9.5 LPA - ₹18.0 LPA',
    highestPackageLpa: '₹48.0 LPA',
    entranceExams: ['CAT', 'XAT', 'MAT', 'CMAT', 'CUET PG', 'ATMA'],
    stateAvailability: ['Bihar', 'All India', 'Delhi', 'Uttar Pradesh'],
    overview: 'Master of Business Administration (MBA) is a flagship 2-year postgraduate management program that prepares graduates for corporate executive roles, consulting, corporate finance, and tech leadership.',
    eligibility: 'Bachelor degree (Graduation) in any discipline (B.Tech, B.Com, B.Sc, BA, BCA) with minimum 50% aggregate marks (45% for SC/ST).',
    admissionProcessSteps: [
      'Appear for CAT / XAT / CMAT / MAT entrance examination.',
      'Apply to individual B-schools or universities based on exam percentile cutoffs.',
      'Shortlisted candidates called for Written Ability Test (WAT), Group Discussion (GD), and Personal Interview (PI).',
      'Final selection based on Entrance Score + GD/PI + Past Academic Record + Work Experience.'
    ],
    coreSubjects: [
      {
        semesterOrYear: 'Year 1 (Sem 1 & 2)',
        subjects: ['Managerial Accounting', 'Organizational Behavior', 'Marketing Management', 'Corporate Finance', 'Quantitative Techniques', 'Operations Management']
      },
      {
        semesterOrYear: 'Year 2 (Sem 3 & 4)',
        subjects: ['Strategic Management', 'Elective Specialization Courses', 'Summer Internship Viva', 'Capstone Consulting Project']
      }
    ],
    careerOptions: [
      { title: 'Management Consultant / Strategy Lead', avgSalary: '₹14.0 LPA - ₹28.0 LPA', topSectors: 'McKinsey, BCG, Deloitte, PwC, EY' },
      { title: 'Investment Banking Analyst', avgSalary: '₹12.0 LPA - ₹25.0 LPA', topSectors: 'Goldman Sachs, Morgan Stanley, JP Morgan' },
      { title: 'Product Manager', avgSalary: '₹15.0 LPA - ₹30.0 LPA', topSectors: 'Amazon, Flipkart, Google, Swiggy' }
    ],
    higherStudiesOptions: ['PhD in Management / Fellow Programme in Management (FPM)', 'Executive MBA (for mid-career professionals)', 'CFA / FRM Global Certifications'],
    topCollegesList: [
      { collegeId: 'iim-bodhgaya', collegeName: 'IIM Bodh Gaya', city: 'Bodh Gaya', state: 'Bihar', feeText: '₹8.5 L/yr', rating: 4.8, nirfRank: 33 },
      { collegeId: 'cetan-college', collegeName: 'Department of Business Administration (Patna University)', city: 'Patna', state: 'Bihar', feeText: '₹65,000 / yr', rating: 4.4 },
      { collegeId: 'chandragupt-institute', collegeName: 'Chandragupt Institute of Management Patna (CIMP)', city: 'Patna', state: 'Bihar', feeText: '₹3.8 L/yr', rating: 4.7 }
    ],
    scholarships: [
      { name: 'IIM Merit-cum-Means Scholarship', provider: 'IIM Bodh Gaya', benefit: '100% tuition waiver for family income < ₹5 LPA' },
      { name: 'Bihar Post-Matric Scholarship', provider: 'Govt of Bihar', benefit: 'Reimbursement of tuition fees for reserved category candidates' }
    ],
    faqs: [
      { question: 'Is work experience mandatory for MBA admission?', answer: 'No, fresh graduates are eligible for CAT and MBA programs, though 1-3 years work experience gives extra points during shortlist evaluation.' }
    ]
  },
  {
    id: 'mca',
    name: 'Master of Computer Applications (MCA)',
    shortName: 'MCA',
    slug: 'mca-master-computer-applications',
    degree: 'MCA',
    stream: 'Computer Applications',
    level: 'Postgraduate',
    durationYears: 2,
    durationText: '2 Years (4 Semesters)',
    specializations: [
      'Cloud Architecture & DevOps',
      'Artificial Intelligence & Machine Learning',
      'Full Stack Software Engineering',
      'Mobile App Development',
      'Cyber Security & Cryptography'
    ],
    avgAnnualFeeGovt: '₹35,000 - ₹90,000 / year',
    avgAnnualFeePrivate: '₹80,000 - ₹2.0 Lakh / year',
    feeCategory: '₹30k - ₹1L/yr',
    avgStartingSalaryLpa: '₹6.5 LPA - ₹12.5 LPA',
    highestPackageLpa: '₹32.0 LPA',
    entranceExams: ['NIMCET', 'CUET PG', 'BCECE MCA', 'Mah MCA CET'],
    stateAvailability: ['Bihar', 'All India', 'Delhi', 'Uttar Pradesh'],
    overview: 'Master of Computer Applications (MCA) is a premier 2-year postgraduate degree designed to produce high-level software architects, system programmers, and tech leads. AICTE updated the course duration from 3 years to 2 years in 2020.',
    eligibility: 'Passed BCA / B.Sc Computer Science / B.Sc IT or passed B.Sc / B.Com / BA with Mathematics at 10+2 level or Graduation level with minimum 50% marks (45% for reserved category).',
    admissionProcessSteps: [
      'Appear for NIMCET (National Level NIT MCA Entrance) or CUET PG.',
      'Participate in NIMCET centralized seat allocation counseling.',
      'Document submission and reporting to allotted NIT or University Department.'
    ],
    coreSubjects: [
      {
        semesterOrYear: 'Year 1 (Sem 1 & 2)',
        subjects: ['Advanced Data Structures & Algorithms', 'Web Development Frameworks (React/Node)', 'Database Engineering & NoSQL', 'Advanced Operating System & Unix', 'Software Engineering & Design Patterns']
      },
      {
        semesterOrYear: 'Year 2 (Sem 3 & 4)',
        subjects: ['Cloud Computing & Kubernetes', 'Machine Learning Algorithms', 'Cyber Security Fundamentals', 'Industrial Internship & Project Viva']
      }
    ],
    careerOptions: [
      { title: 'Senior Software Engineer', avgSalary: '₹8.0 LPA - ₹18.0 LPA', topSectors: 'TCS, Infosys, Wipro, Cognizant, Tech Mahindra' },
      { title: 'Full Stack Java / Python Developer', avgSalary: '₹7.0 LPA - ₹15.0 LPA', topSectors: 'SaaS Startups, FinTech, E-Commerce' }
    ],
    higherStudiesOptions: ['M.Tech in CSE / Software Engineering', 'PhD in Computer Science', 'Global Cloud Certifications (AWS Certified Solutions Architect, CKA)'],
    topCollegesList: [
      { collegeId: 'nit-patna', collegeName: 'NIT Patna (NIMCET Seat)', city: 'Patna', state: 'Bihar', feeText: '₹72,000 / yr', rating: 4.8, nirfRank: 56 },
      { collegeId: 'patna-university-mca', collegeName: 'Patna University MCA Dept', city: 'Patna', state: 'Bihar', feeText: '₹38,000 / yr', rating: 4.4 },
      { collegeId: 'aku-patna', collegeName: 'Aryabhatta Knowledge University (AKU)', city: 'Patna', state: 'Bihar', feeText: '₹42,000 / yr', rating: 4.3 }
    ],
    scholarships: [
      { name: 'Bihar Student Credit Card DRCC Scheme', provider: 'Govt of Bihar', benefit: 'Loan up to ₹4 Lakhs for MCA' },
      { name: 'NSP Post-Matric Scholarship', provider: 'Govt of India', benefit: 'Full tuition refund for SC/ST/OBC' }
    ],
    faqs: [
      { question: 'Is MCA duration 2 years or 3 years now?', answer: 'As per AICTE guidelines, MCA is officially a 2-year (4 semesters) master degree course across all Indian universities.' }
    ]
  },
  {
    id: 'mtech-ai',
    name: 'M.Tech in AI / CSE / Structural Engineering',
    shortName: 'M.Tech',
    slug: 'mtech-master-of-technology',
    degree: 'M.Tech',
    stream: 'Engineering & Tech',
    level: 'Postgraduate',
    durationYears: 2,
    durationText: '2 Years (4 Semesters)',
    specializations: [
      'Artificial Intelligence & Data Science',
      'Structural & Earthquake Engineering',
      'VLSI Design & Embedded Systems',
      'Thermal & Manufacturing Engineering',
      'Power Systems & Renewable Energy'
    ],
    avgAnnualFeeGovt: '₹40,000 - ₹85,000 / year',
    avgAnnualFeePrivate: '₹90,000 - ₹2.2 Lakh / year',
    feeCategory: '₹30k - ₹1L/yr',
    avgStartingSalaryLpa: '₹9.0 LPA - ₹22.0 LPA',
    highestPackageLpa: '₹45.0 LPA',
    entranceExams: ['GATE', 'CUET PG', 'PGET'],
    stateAvailability: ['Bihar', 'All India', 'Delhi', 'Uttar Pradesh'],
    overview: 'M.Tech is a 2-year specialized postgraduate engineering degree designed for research, advanced technical specialization, and high-level R&D engineering roles. GATE qualified M.Tech scholars receive a monthly stipend of ₹12,400 from MHRD/AICTE.',
    eligibility: 'B.E. / B.Tech in relevant branch with minimum 60% marks or 6.5 CGPA along with a valid GATE score.',
    admissionProcessSteps: [
      'Appear and qualify GATE exam in respective discipline.',
      'Register on COAP (Common Offer Acceptance Portal) for IITs or CCMT for NITs.',
      'Accept offer and report for physical document verification.'
    ],
    coreSubjects: [
      {
        semesterOrYear: 'Year 1 (Sem 1 & 2)',
        subjects: ['Advanced Algorithms / Finite Element Analysis / Advanced VLSI', 'Specialized Program Electives', 'Research Methodology & Seminar']
      },
      {
        semesterOrYear: 'Year 2 (Sem 3 & 4)',
        subjects: ['M.Tech Thesis Dissertation Phase I & II', 'Journal Publication / Patent Filing', 'Thesis Viva Voice']
      }
    ],
    careerOptions: [
      { title: 'R&D Engineer / AI Researcher', avgSalary: '₹12.0 LPA - ₹26.0 LPA', topSectors: 'Intel, Qualcomm, Samsung R&D, Nvidia, ISRO' },
      { title: 'Assistant Professor / Academician', avgSalary: '₹7.5 LPA - ₹12.0 LPA', topSectors: 'Engineering Colleges, Universities, Coaching Institutes' }
    ],
    higherStudiesOptions: ['PhD in Engineering (IITs, IISc, International Universities)'],
    topCollegesList: [
      { collegeId: 'iit-patna', collegeName: 'IIT Patna', city: 'Patna', state: 'Bihar', feeText: '₹65,000 / yr', rating: 4.9, nirfRank: 27 },
      { collegeId: 'nit-patna', collegeName: 'NIT Patna', city: 'Patna', state: 'Bihar', feeText: '₹58,000 / yr', rating: 4.7, nirfRank: 56 }
    ],
    scholarships: [
      { name: 'AICTE / MHRD GATE Teaching Assistantship Stipend', provider: 'Govt of India', benefit: '₹12,400 per month stipend for 24 months' }
    ],
    faqs: [
      { question: 'Do all M.Tech students get the ₹12,400 GATE stipend?', answer: 'Yes, all GATE-qualified students admitted to AICTE approved government institutes receive ₹12,400/month stipend.' }
    ]
  },
  {
    id: 'diploma-polytechnic',
    name: 'Diploma in Polytechnic (Civil, Electrical, Mechanical, CSE)',
    shortName: 'Diploma / Polytechnic',
    slug: 'diploma-polytechnic-engineering',
    degree: 'Diploma/Polytechnic',
    stream: 'Engineering & Tech',
    level: 'Diploma',
    durationYears: 3,
    durationText: '3 Years (6 Semesters) / 2 Years (Lateral Entry)',
    specializations: [
      'Civil Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Computer Science & Engineering',
      'Electronics & Telecommunication'
    ],
    avgAnnualFeeGovt: '₹1,500 - ₹8,000 / year',
    avgAnnualFeePrivate: '₹25,000 - ₹50,000 / year',
    feeCategory: 'Under ₹30k/yr',
    avgStartingSalaryLpa: '₹3.0 LPA - ₹5.5 LPA',
    highestPackageLpa: '₹10.5 LPA',
    entranceExams: ['DCECE Bihar Polytechnic', 'JEECUP UP', 'Delhi CET'],
    stateAvailability: ['Bihar', 'All India', 'Delhi', 'Uttar Pradesh'],
    overview: 'Polytechnic Diploma is a 3-year skill-oriented technical diploma program pursued immediately after Class 10th or 12th. It offers fast-track employment in government Junior Engineer (JE) roles in Railway (RRB JE), Bihar PHED, Water Resources, and PWD.',
    eligibility: 'Class 10th (Matriculation) passed with minimum 35% marks with Science and Math. Class 12th Science / ITI holders can take direct 2nd-year Lateral Entry.',
    admissionProcessSteps: [
      'Appear for DCECE (Diploma Combined Entrance Competitive Examination) conducted by BCECE Board Bihar.',
      'Secure merit rank in DCECE PE (Polytechnic Engineering) category.',
      'Participate in BCECE Board online choice filling and seat allotment.'
    ],
    coreSubjects: [
      {
        semesterOrYear: 'Year 1 (Sem 1 & 2)',
        subjects: ['Engineering Physics & Chemistry', 'Engineering Mathematics I & II', 'Engineering Drawing / Graphics', 'Workshop Practice & Workshop Fitting']
      },
      {
        semesterOrYear: 'Year 2 (Sem 3 & 4)',
        subjects: ['Surveying & Hydraulics (Civil) / Basic Electrical / Thermodynamics', 'Strength of Materials', 'AutoCAD & Digital Drafting']
      },
      {
        semesterOrYear: 'Year 3 (Sem 5 & 6)',
        subjects: ['Estimating & Costing / Electrical Machines / Manufacturing Technology', 'Industrial Training & Field Survey Project']
      }
    ],
    careerOptions: [
      { title: 'Junior Engineer (JE) - Govt Sector', avgSalary: '₹4.5 LPA - ₹7.2 LPA', topSectors: 'RRB JE, Bihar PWD, PHED, Building Construction Dept, SSC JE' },
      { title: 'Technical Supervisor / Technician', avgSalary: '₹3.0 LPA - ₹5.0 LPA', topSectors: 'L&T, Tata Steel, NTPC, PowerGrid, Maruti Suzuki' }
    ],
    higherStudiesOptions: ['B.Tech Lateral Entry (Direct 2nd Year Admission via BTech LE exam)'],
    topCollegesList: [
      { collegeId: 'ngp-patna-13', collegeName: 'New Government Polytechnic (NGP) Patna 13', city: 'Patna', state: 'Bihar', feeText: '₹1,800 / yr', rating: 4.8 },
      { collegeId: 'gp-patna-7', collegeName: 'Government Polytechnic Patna 7', city: 'Patna', state: 'Bihar', feeText: '₹1,800 / yr', rating: 4.7 },
      { collegeId: 'gp-muzaffarpur', collegeName: 'Government Polytechnic Muzaffarpur', city: 'Muzaffarpur', state: 'Bihar', feeText: '₹1,800 / yr', rating: 4.6 }
    ],
    scholarships: [
      { name: 'Bihar Post-Matric Scholarship for Polytechnic', provider: 'Govt of Bihar', benefit: 'Full non-refundable fee refund + Maintenance stipend' },
      { name: 'AICTE Pragati Scholarship for Girl Students', provider: 'AICTE', benefit: '₹50,000 per year for female polytechnic students' }
    ],
    faqs: [
      { question: 'Can I do B.Tech after completing Diploma Polytechnic?', answer: 'Yes, diploma holders can get direct admission into the 2nd year (3rd semester) of B.Tech through B.Tech Lateral Entry exams like BCECE LE.' }
    ]
  },
  {
    id: 'mbbs',
    name: 'Bachelor of Medicine and Bachelor of Surgery (MBBS)',
    shortName: 'MBBS',
    slug: 'mbbs-bachelor-of-medicine-bachelor-of-surgery',
    degree: 'MBBS',
    stream: 'Medical',
    level: 'Undergraduate',
    durationYears: 5.5,
    durationText: '5.5 Years (4.5 Years Academic + 1 Year Mandatory Rotatory Internship)',
    specializations: [
      'General Medicine & Surgery',
      'Pediatrics & Child Health',
      'Obstetrics & Gynecology',
      'Orthopedics & Traumatology',
      'Anesthesiology & Critical Care'
    ],
    avgAnnualFeeGovt: '₹10,000 - ₹65,000 / year',
    avgAnnualFeePrivate: '₹8.0 Lakh - ₹18.0 Lakh / year',
    feeCategory: 'Under ₹30k/yr',
    avgStartingSalaryLpa: '₹9.0 LPA - ₹18.0 LPA',
    highestPackageLpa: '₹35.0 LPA',
    entranceExams: ['NEET UG'],
    stateAvailability: ['Bihar', 'All India', 'Delhi', 'Uttar Pradesh'],
    overview: 'MBBS is the premier professional medical degree required to practice as a licensed medical doctor in India. Regulated by National Medical Commission (NMC), it involves 4.5 years of intensive clinical classroom training followed by 1 year compulsory rotatory internship.',
    eligibility: '10+2 / Class 12th passed with Physics, Chemistry, and Biology (PCB) along with English. Minimum 50% marks in PCB for General category (40% for SC/ST/OBC) and mandatory NEET UG qualification score.',
    admissionProcessSteps: [
      'Appear for NEET UG national entrance examination conducted by NTA.',
      'Qualify NEET UG score cutoffs (All India Quota 15% / State Quota 85%).',
      'Register for MCC (Medical Counselling Committee) AIQ or UGMAC Bihar State NEET Counseling.',
      'Fill choice preferences of government medical colleges (AIIMS Patna, PMCH, NMCH, IGIMS).',
      'Seat allocation, medical fitness test, and document verification.'
    ],
    coreSubjects: [
      {
        semesterOrYear: 'Phase I (1 Year)',
        subjects: ['Human Anatomy', 'Physiology', 'Biochemistry']
      },
      {
        semesterOrYear: 'Phase II (1.5 Years)',
        subjects: ['Pathology', 'Microbiology', 'Pharmacology', 'Forensic Medicine & Toxicology']
      },
      {
        semesterOrYear: 'Phase III Part 1 & 2 (2 Years)',
        subjects: ['Ophthalmology (EYE)', 'ENT', 'Community Medicine (PSM)', 'General Medicine', 'General Surgery', 'Pediatrics', 'Obstetrics & Gynecology']
      },
      {
        semesterOrYear: 'Mandatory Internship (1 Year)',
        subjects: ['Rotatory posting across Rural Health, Surgery, Emergency Casualty, Medicine, Pediatrics']
      }
    ],
    careerOptions: [
      { title: 'Medical Officer (MO) - Govt Sector', avgSalary: '₹9.5 LPA - ₹15.0 LPA', topSectors: 'Bihar Health Dept, PHCs, AIIMS, Railway Hospitals, Armed Forces Medical Services' },
      { title: 'Resident Doctor / Clinical Practitioner', avgSalary: '₹8.5 LPA - ₹14.0 LPA', topSectors: 'Apollo, Fortis, Max, Medanta, Private Practice' }
    ],
    higherStudiesOptions: ['MD (Doctor of Medicine) / MS (Master of Surgery) via NEET PG / INI-CET', 'DNB Specialization', 'USMLE (USA Medical Licensing)', 'PLAB (UK NHS Doctor)'],
    topCollegesList: [
      { collegeId: 'aiims-patna', collegeName: 'AIIMS Patna', city: 'Patna', state: 'Bihar', feeText: '₹1,628 / yr', rating: 4.9, nirfRank: 26 },
      { collegeId: 'pmch-patna', collegeName: 'Patna Medical College and Hospital (PMCH)', city: 'Patna', state: 'Bihar', feeText: '₹12,500 / yr', rating: 4.8 },
      { collegeId: 'igims-patna', collegeName: 'Indira Gandhi Institute of Medical Sciences (IGIMS)', city: 'Patna', state: 'Bihar', feeText: '₹85,000 / yr', rating: 4.7 }
    ],
    scholarships: [
      { name: 'Bihar Post-Matric Scholarship for Medical Students', provider: 'Govt of Bihar', benefit: 'Full tuition & hostel fee reimbursement' },
      { name: 'Central Sector Scheme for Top Class Education', provider: 'Ministry of Social Justice', benefit: 'Full fee grant for SC/ST students in AIIMS' }
    ],
    faqs: [
      { question: 'What is the stipend during compulsory 1-year MBBS internship in Bihar?', answer: 'MBBS interns in Bihar Government medical colleges (PMCH, NMCH, etc.) receive a monthly stipend of approximately ₹20,000 - ₹26,300 per month.' }
    ]
  },
  {
    id: 'llb-law',
    name: 'Bachelor of Laws (LLB - 3 Year / 5 Year Integrated BA LLB)',
    shortName: 'LLB / BA LLB',
    slug: 'llb-bachelor-of-laws',
    degree: 'LLB',
    stream: 'Law',
    level: 'Undergraduate',
    durationYears: 5,
    durationText: '5 Years (BA LLB Integrated) / 3 Years (LLB after Graduation)',
    specializations: [
      'Constitutional & Administrative Law',
      'Criminal Law & Criminology',
      'Corporate & Intellectual Property Law (IPR)',
      'Cyber Law & Digital Rights',
      'Civil & Revenue Litigation'
    ],
    avgAnnualFeeGovt: '₹6,000 - ₹25,000 / year',
    avgAnnualFeePrivate: '₹60,000 - ₹2.5 Lakh / year',
    feeCategory: 'Under ₹30k/yr',
    avgStartingSalaryLpa: '₹5.5 LPA - ₹12.0 LPA',
    highestPackageLpa: '₹22.0 LPA',
    entranceExams: ['CLAT', 'AILET', 'Patna Law College Entrance', 'CUET UG'],
    stateAvailability: ['Bihar', 'All India', 'Delhi', 'Uttar Pradesh'],
    overview: 'LLB is a professional law degree certified by Bar Council of India (BCI). Graduates qualify to enroll as Advocates in High Courts and Supreme Court, or appear for Bihar Judicial Services (BJS) to become District Civil Judges.',
    eligibility: 'For 5-Year Integrated BA LLB: 10+2 passed with 45% marks. For 3-Year LLB: Graduation passed in any stream with 45% marks (40% for SC/ST).',
    admissionProcessSteps: [
      'Appear for CLAT (Common Law Admission Test) or University Law Entrance.',
      'Participate in counseling allotment.',
      'BCI verification and college enrollment.'
    ],
    coreSubjects: [
      {
        semesterOrYear: 'Year 1 & 2',
        subjects: ['Constitutional Law of India', 'Law of Crimes (IPC & BNS)', 'Law of Torts', 'Family Law I & II (Hindu & Muslim Law)', 'Contract Law']
      },
      {
        semesterOrYear: 'Year 3 & 4',
        subjects: ['Code of Civil Procedure (CPC)', 'Code of Criminal Procedure (CrPC / BNSS)', 'Law of Evidence', 'Jurisprudence & Legal Theory']
      },
      {
        semesterOrYear: 'Final Year',
        subjects: ['Property Law', 'Company Law', 'Moot Court Exercises & Internship at Courts']
      }
    ],
    careerOptions: [
      { title: 'Civil Judge / Judicial Magistrate', avgSalary: '₹9.0 LPA - ₹14.0 LPA', topSectors: 'Bihar Judicial Services (BJS), High Court Judiciary' },
      { title: 'Legal Advisor / Corporate Advocate', avgSalary: '₹6.5 LPA - ₹15.0 LPA', topSectors: 'Law Firms, Banks, Corporate Houses, Real Estate' }
    ],
    higherStudiesOptions: ['LLM (Master of Laws)', 'PhD in Law', 'Judicial Services Preparation'],
    topCollegesList: [
      { collegeId: 'cnlu-patna', collegeName: 'Chanakya National Law University (CNLU)', city: 'Patna', state: 'Bihar', feeText: '₹1.65 L/yr', rating: 4.8, nirfRank: 31 },
      { collegeId: 'patna-law-college', collegeName: 'Patna Law College (Estd. 1909)', city: 'Patna', state: 'Bihar', feeText: '₹4,500 / yr', rating: 4.7 }
    ],
    scholarships: [
      { name: 'Bihar Post-Matric Scholarship for Law Students', provider: 'Govt of Bihar', benefit: 'Reimbursement of tuition & hostel fees' }
    ],
    faqs: [
      { question: 'Am I eligible for Bihar Judicial Services (Civil Judge) immediately after LLB?', answer: 'Yes, fresh law graduates enrolled with Bar Council are eligible to appear for the Bihar Judicial Service Competitive Exam.' }
    ]
  },
  {
    id: 'bpharm',
    name: 'Bachelor of Pharmacy (B.Pharm)',
    shortName: 'B.Pharm',
    slug: 'bpharm-bachelor-of-pharmacy',
    degree: 'B.Pharm',
    stream: 'Pharmacy',
    level: 'Undergraduate',
    durationYears: 4,
    durationText: '4 Years (8 Semesters)',
    specializations: [
      'Pharmaceutics & Drug Formulation',
      'Pharmacology & Toxicology',
      'Pharmaceutical Chemistry',
      'Quality Assurance & Regulatory Affairs',
      'Clinical Pharmacy'
    ],
    avgAnnualFeeGovt: '₹12,000 - ₹35,000 / year',
    avgAnnualFeePrivate: '₹65,000 - ₹1.4 Lakh / year',
    feeCategory: '₹30k - ₹1L/yr',
    avgStartingSalaryLpa: '₹4.0 LPA - ₹7.5 LPA',
    highestPackageLpa: '₹15.0 LPA',
    entranceExams: ['BCECE Pharmacy', 'CUET UG', 'GPAT (for M.Pharm)'],
    stateAvailability: ['Bihar', 'All India', 'Delhi', 'Uttar Pradesh'],
    overview: 'B.Pharm is a 4-year professional pharmacy degree accredited by Pharmacy Council of India (PCI). Graduates become Registered Pharmacists, qualified to run retail pharma chains or work in pharmaceutical drug manufacturing, clinical research, and Drug Inspector government positions.',
    eligibility: '10+2 / Class 12th passed with Physics, Chemistry, and Mathematics/Biology (PCM/PCB) with minimum 50% aggregate marks.',
    admissionProcessSteps: [
      'Appear for BCECE Pharmacy Entrance exam in Bihar or CUET UG.',
      'Participate in BCECE Board online counseling for Government Pharmacy Colleges in Muzaffarpur, Banka, and Patna.',
      'Physical reporting and PCI registration.'
    ],
    coreSubjects: [
      {
        semesterOrYear: 'Year 1 (Sem 1 & 2)',
        subjects: ['Human Anatomy & Physiology', 'Pharmaceutical Analysis', 'Pharmaceutics I', 'Pharmaceutical Inorganic Chemistry']
      },
      {
        semesterOrYear: 'Year 2 & 3',
        subjects: ['Medicinal Chemistry', 'Pharmacognosy & Phytochemistry', 'Pharmacology I & II', 'Pharmaceutical Biotechnology']
      },
      {
        semesterOrYear: 'Year 4',
        subjects: ['Novel Drug Delivery Systems (NDDS)', 'Industrial Pharmacy', 'Hospital & Clinical Pharmacy', 'Industrial Internship Project']
      }
    ],
    careerOptions: [
      { title: 'Drug Inspector / Govt Analyst', avgSalary: '₹7.0 LPA - ₹11.0 LPA', topSectors: 'Bihar Food & Drugs Dept, CDSCO Govt of India' },
      { title: 'Pharmaceutical QA/QC Specialist', avgSalary: '₹4.2 LPA - ₹8.0 LPA', topSectors: 'Sun Pharma, Cipla, Dr. Reddy, Lupin, Mankind' }
    ],
    higherStudiesOptions: ['M.Pharm via GPAT Score', 'Pharm.D (Doctor of Pharmacy)', 'MBA in Pharmaceutical Management'],
    topCollegesList: [
      { collegeId: 'gpi-muzaffarpur', collegeName: 'Government Pharmacy Institute Muzaffarpur', city: 'Muzaffarpur', state: 'Bihar', feeText: '₹15,000 / yr', rating: 4.7 },
      { collegeId: 'gpi-patna', collegeName: 'Government Pharmacy Institute Patna', city: 'Patna', state: 'Bihar', feeText: '₹15,000 / yr', rating: 4.6 }
    ],
    scholarships: [
      { name: 'Bihar Student Credit Card Scheme (DRCC)', provider: 'Govt of Bihar', benefit: 'Loan up to ₹4 Lakhs for B.Pharm' }
    ],
    faqs: [
      { question: 'Is B.Pharm required to get a Drug License in Bihar?', answer: 'Yes, a B.Pharm or D.Pharm degree registered with Bihar State Pharmacy Council is mandatory to obtain a retail and wholesale drug license.' }
    ]
  }
];
