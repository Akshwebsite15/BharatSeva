import { College, University } from '../types';

export const initialCollegesData: College[] = [
  {
    id: 'iit-patna',
    name: 'Indian Institute of Technology Patna',
    shortName: 'IIT Patna',
    slug: 'iit-patna',
    establishedYear: 2008,
    type: 'Government',
    nirfRank: 27,
    naacGrade: 'A++',
    universityAffiliation: 'Autonomous (Institute of National Importance)',
    state: 'Bihar',
    city: 'Patna',
    address: 'Bihta, Patna, Bihar - 801106',
    nearestConnectivity: '30 km from Jay Prakash Narayan Airport Patna, 35 km from Patna Junction Railway Station',
    overview: 'IIT Patna is an Institute of National Importance created by an Act of the Indian Parliament in 2008. Situated across a lush 501-acre campus in Bihta, it features world-class laboratories, supercomputing facilities, and active research collaborations with international universities.',
    logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=200',
    bannerUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200',
    coursesOffered: ['B.Tech Computer Science & Engineering', 'B.Tech Electrical & Electronics', 'B.Tech Mechanical Engineering', 'B.Tech Civil Engineering', 'B.Tech Chemical Engineering', 'M.Tech CSE', 'M.Tech AI & Data Science', 'PhD'],
    degreesOffered: ['B.Tech', 'M.Tech', 'PhD'],
    entranceExamsAccepted: ['JEE Advanced', 'JEE Main', 'GATE'],
    feeRangeCategory: '₹1.5L - ₹3L/yr',
    avgAnnualFeeInr: 220000,
    eligibilityOverview: 'Class 12th Passed with Physics, Chemistry, and Mathematics with minimum 75% aggregate marks (65% for SC/ST) and a valid JEE Advanced rank.',
    admissionProcessSteps: [
      'Appear and qualify JEE Main examination with cutoffs for JEE Advanced.',
      'Register for JEE Advanced and secure a rank in the top percentile.',
      'Participate in JoSAA (Joint Seat Allocation Authority) online counseling.',
      'Fill IIT Patna as top preference in JoSAA choice filling.',
      'Seat acceptance, document verification, and fee payment upon seat allotment.',
      'Physical reporting at Bihta Campus for orientation and hostel allotment.'
    ],
    officialWebsiteUrl: 'https://www.iitp.ac.in',
    applicationLink: 'https://josaa.nic.in',
    verifiedSource: 'Ministry of Education (MoE) NIRF 2025 & JoSAA Gazette',
    lastVerifiedDate: '2026-08-01',
    courses: [
      {
        name: 'B.Tech Computer Science & Engineering',
        level: 'Undergraduate',
        duration: '4 Years',
        annualFee: 225000,
        feeText: '₹2.25 Lakh / year (100% Tuition fee waiver for SC/ST/PH & EWS < 1 Lakh income)',
        seats: 86,
        eligibility: '12th Pass with PCM (75% marks) + JEE Advanced Rank',
        entranceExam: 'JEE Advanced',
      },
      {
        name: 'B.Tech Electrical and Electronics Engineering',
        level: 'Undergraduate',
        duration: '4 Years',
        annualFee: 225000,
        feeText: '₹2.25 Lakh / year',
        seats: 60,
        eligibility: '12th Pass with PCM (75% marks) + JEE Advanced Rank',
        entranceExam: 'JEE Advanced',
      },
      {
        name: 'M.Tech Artificial Intelligence & Data Science',
        level: 'Postgraduate',
        duration: '2 Years',
        annualFee: 65000,
        feeText: '₹65,000 / year + Monthly Teaching Assistantship Stipend of ₹12,400',
        seats: 30,
        eligibility: 'B.E./B.Tech in CSE/IT/ECE with 6.5 CGPA + Valid GATE Score',
        entranceExam: 'GATE / COAP',
      }
    ],
    cutoffs: [
      {
        examName: 'JEE Advanced 2025',
        year: 2025,
        category: 'General (Gender-Neutral)',
        openingRank: 1650,
        closingRank: 2820,
        scoreOrPercentile: 'Rank 2820 (CSE)',
        round: 'Round 6 JoSAA',
      },
      {
        examName: 'JEE Advanced 2025',
        year: 2025,
        category: 'OBC-NCL',
        openingRank: 620,
        closingRank: 1140,
        scoreOrPercentile: 'Rank 1140 (CSE)',
        round: 'Round 6 JoSAA',
      },
      {
        examName: 'JEE Advanced 2025',
        year: 2025,
        category: 'SC Category',
        openingRank: 310,
        closingRank: 590,
        scoreOrPercentile: 'Rank 590 (CSE)',
        round: 'Round 6 JoSAA',
      }
    ],
    placement: {
      academicYear: '2024-2025',
      highestPackageLpa: 82.0,
      averagePackageLpa: 23.9,
      medianPackageLpa: 19.5,
      placementRatePercent: 96,
      topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Atlassian', 'De Shaw', 'Goldman Sachs', 'Oracle', 'Samsung R&D', 'Texas Instruments'],
    },
    facilities: [
      { name: 'Supercomputing Center', description: 'PARAM Ananta Supercomputer for AI, Quantum Computing, and High-Performance Simulation.' },
      { name: 'Central Library', description: '5-story digital library with access to IEEE, Springer, ACM digital archives and 60,000+ print volumes.' },
      { name: 'Sports Complex', description: 'Synthetic Athletics Track, Indoor Badminton Courts, Olympic-size Swimming Pool, Basketball Courts.' },
      { name: 'Incubation Center (IC IITP)', description: 'Government funded startup incubator supporting student startups with seed grants up to ₹25 Lakhs.' }
    ],
    hostel: {
      availableFor: 'Boys & Girls',
      annualFee: '₹36,000 / year (Hostel Maintenance) + Mess Charges ₹18,000 / semester',
      roomTypes: ['Single Seater (Final Year)', 'Double Sharing (1st to 3rd Year)'],
      messDetails: 'Student-managed Mess Committee serving North Indian, South Indian, and Bihari cuisine meals 4 times daily.',
      facilities: ['High-speed Wi-Fi (1 Gbps)', '24x7 Gymnasium', 'Solar Water Heaters', 'Common Reading Room & TV Lounge']
    },
    scholarships: [
      {
        name: 'Merit-cum-Means (MCM) Scholarship',
        provider: 'IIT Patna',
        amountOrWaiver: '100% Tuition Fee Refund + ₹1,000/month pocket allowance',
        eligibility: 'General & OBC B.Tech students with parental income below ₹5.0 Lakhs/yr and CGPA >= 6.5.'
      },
      {
        name: 'Bihar Post-Matric Scholarship (PMS)',
        provider: 'Government of Bihar',
        amountOrWaiver: 'Full Maintenance Allowance + Non-refundable fees reimbursement',
        eligibility: 'Bihar Domicile SC/ST/EBC students enrolled in IIT Patna.'
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        reviewerName: 'Aayush Kumar',
        batch: "B.Tech CSE '25",
        rating: 5,
        title: 'Outstanding placement records and peaceful green Bihta campus',
        pros: 'Superb coding culture, world-class labs, brilliant faculty, top product companies visit every season.',
        cons: 'Bihta campus is 30 km from Patna main city, though shuttle buses operate frequently.',
        date: '2026-03-12',
      },
      {
        id: 'rev-2',
        reviewerName: 'Priya Singh',
        batch: "B.Tech EEE '24",
        rating: 4,
        title: 'Rigorous academics with great research exposure',
        pros: 'Very strong research labs, student innovation club (NJACK) is extremely active.',
        cons: 'Academic workload can get heavy during mid-sem and end-sem exams.',
        date: '2026-01-20',
      }
    ],
    qaList: [
      {
        id: 'qa-1',
        question: 'Is 100% tuition fee waiver available at IIT Patna for EWS candidates?',
        askedBy: 'Rohan Sharma',
        answer: 'Yes, candidates belonging to General/OBC/EWS with annual family income below ₹1 Lakh get a 100% tuition fee waiver. Those with family income between ₹1 Lakh to ₹5 Lakh get a 2/3rd tuition fee waiver.',
        answeredBy: 'IIT Patna Admission Cell',
        date: '2026-04-10',
      },
      {
        id: 'qa-2',
        question: 'How are the hostel facilities at Bihta campus?',
        askedBy: 'Sneha Kumari',
        answer: 'All undergraduate students are guaranteed hostel accommodation inside the 501-acre secured campus with 24x7 power backup, high-speed fiber internet, night canteen, and medical center.',
        answeredBy: 'IIT Patna Chief Warden',
        date: '2026-05-18',
      }
    ],
    latestUpdates: [
      {
        id: 'up-1',
        title: 'JoSAA 2026 Counseling Schedule Announced for IIT Patna Admissions',
        date: '2026-07-28',
        category: 'Counseling',
        summary: 'JoSAA registration and choice filling for IIT Patna B.Tech seats begins in July 2026 following JEE Advanced results.'
      },
      {
        id: 'up-2',
        title: 'IIT Patna Records Average Package of ₹23.9 LPA in 2025-26 Placement Drive',
        date: '2026-06-15',
        category: 'General',
        summary: 'Over 400 offers made with highest domestic package touching ₹82 LPA for CSE graduates.'
      }
    ]
  },
  {
    id: 'aiims-patna',
    name: 'All India Institute of Medical Sciences Patna',
    shortName: 'AIIMS Patna',
    slug: 'aiims-patna',
    establishedYear: 2012,
    type: 'Government',
    nirfRank: 27,
    naacGrade: 'A++',
    universityAffiliation: 'Autonomous Medical Institute of National Importance',
    state: 'Bihar',
    city: 'Patna',
    address: 'Phulwarisharif, Patna, Bihar - 801507',
    nearestConnectivity: '12 km from Jay Prakash Narayan Airport Patna, 15 km from Patna Junction',
    overview: 'AIIMS Patna is a premier apex healthcare institute established under the Pradhan Mantri Swasthya Suraksha Yojana (PMSSY). Featuring a 960-bed super-specialty hospital, state-of-the-art trauma center, and advanced medical research wings, it provides top-tier MBBS, MD, MS, M.Ch, and Nursing education.',
    logoUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=200',
    bannerUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=1200',
    coursesOffered: ['MBBS (Bachelor of Medicine and Bachelor of Surgery)', 'MD Anesthesiology', 'MS General Surgery', 'MD General Medicine', 'MD Pediatrics', 'B.Sc (Hons) Nursing'],
    degreesOffered: ['MBBS', 'MD', 'MS'],
    entranceExamsAccepted: ['NEET UG', 'INI CET'],
    feeRangeCategory: 'Under ₹50k/yr',
    avgAnnualFeeInr: 1628,
    eligibilityOverview: 'Candidate must have completed 10+2 with Physics, Chemistry, Biology/Biotechnology, and English securing at least 60% aggregate (50% for SC/ST/EBC) and a valid NEET UG rank.',
    admissionProcessSteps: [
      'Appear for NEET UG national entrance examination conducted by NTA.',
      'Register on the Medical Counseling Committee (MCC) portal for All India Quota counseling.',
      'Select AIIMS Patna MBBS as top choice during choice filling.',
      'Seat allotment based on NEET UG rank and category merit.',
      'Document verification and medical fitness examination at AIIMS Patna campus.',
      'Hostel allotment and commencement of academic session.'
    ],
    officialWebsiteUrl: 'https://www.aiimspatna.edu.in',
    applicationLink: 'https://mcc.nic.in',
    verifiedSource: 'NTA NEET UG Bulletin & MCC All India Counseling Gazette',
    lastVerifiedDate: '2026-07-25',
    courses: [
      {
        name: 'MBBS (Bachelor of Medicine & Bachelor of Surgery)',
        level: 'Undergraduate',
        duration: '5.5 Years (4.5 Yrs Academic + 1 Yr Rotating Internship)',
        annualFee: 1628,
        feeText: '₹5,856 total course fee (Includes Registration, Caution Money & Hostel Fee)',
        seats: 125,
        eligibility: '12th Pass with PCB (60% marks) + NEET UG Rank',
        entranceExam: 'NEET UG',
      },
      {
        name: 'B.Sc (Hons) Nursing',
        level: 'Undergraduate',
        duration: '4 Years',
        annualFee: 1200,
        feeText: '₹1,200 / year + Monthly stipend during clinical training',
        seats: 75,
        eligibility: '12th Pass with PCB (50% marks) + AIIMS B.Sc Nursing Entrance',
        entranceExam: 'AIIMS Nursing Entrance Test',
      }
    ],
    cutoffs: [
      {
        examName: 'NEET UG 2025',
        year: 2025,
        category: 'General (UR)',
        openingRank: 420,
        closingRank: 1420,
        scoreOrPercentile: 'Marks 682/720',
        round: 'Round 1 MCC',
      },
      {
        examName: 'NEET UG 2025',
        year: 2025,
        category: 'OBC Category',
        openingRank: 1200,
        closingRank: 2350,
        scoreOrPercentile: 'Marks 671/720',
        round: 'Round 1 MCC',
      },
      {
        examName: 'NEET UG 2025',
        year: 2025,
        category: 'EWS Category',
        openingRank: 1350,
        closingRank: 2600,
        scoreOrPercentile: 'Marks 668/720',
        round: 'Round 1 MCC',
      }
    ],
    placement: {
      academicYear: '2024-2025',
      highestPackageLpa: 30.0,
      averagePackageLpa: 18.0,
      medianPackageLpa: 16.5,
      placementRatePercent: 100,
      topRecruiters: ['Mandatory Paid Rotational Internship at AIIMS Super Specialty Hospital', 'Selection into INI-CET MD/MS', 'USMLE / PLAB Overseas Post-Graduation'],
    },
    facilities: [
      { name: '960-Bed Hospital & OPD', description: 'Advanced diagnostic labs, 28 modular operation theaters, CT/MRI, Radiotherapy, and ICUs.' },
      { name: 'Central Medical Library', description: '24x7 air-conditioned library subscribed to PubMed, BMJ, Lancet, ClinicalKey, and UpToDate database.' },
      { name: 'Trauma & Disaster Center', description: 'Dedicated level-1 trauma care center equipped with helipad and emergency resuscitation bays.' },
      { name: 'Simulation Lab', description: 'High-fidelity anatomical mannequins and virtual surgical simulators for clinical skill training.' }
    ],
    hostel: {
      availableFor: 'Boys & Girls',
      annualFee: '₹1,000 / year (Hostel Rent) + Mess Charges ₹3,200 / month',
      roomTypes: ['Single Room with Attached Balcony & Study Desk'],
      messDetails: 'Hygienic multi-cuisine mess managed by hospital dietary experts.',
      facilities: ['Air-conditioned Study Hall', '24x7 Security & CCTV', 'Indoor Badminton Court', 'Solar Hot Water']
    },
    scholarships: [
      {
        name: 'Government of India Central Sector Scholarship',
        provider: 'Ministry of Health & Family Welfare',
        amountOrWaiver: 'Full Fee Reimbursement + ₹12,000 annual book stipend',
        eligibility: 'Meritorious medical students admitted via All India Quota NEET UG.'
      },
      {
        name: 'Bihar Medhavi Chhatra Yojna',
        provider: 'Government of Bihar',
        amountOrWaiver: 'Financial support for Bihar domicile SC/ST MBBS students',
        eligibility: 'Bihar domicile students pursuing MBBS at AIIMS Patna.'
      }
    ],
    reviews: [
      {
        id: 'rev-3',
        reviewerName: 'Dr. Vivek Kumar',
        batch: "MBBS '24",
        rating: 5,
        title: 'Unmatched clinical patient load and premier medical infrastructure',
        pros: 'Extremely high OPD patient footfall allows immense practical exposure during clinical postings.',
        cons: 'Demanding hospital shifts during internship year, but builds incredible doctor stamina.',
        date: '2026-02-18',
      }
    ],
    qaList: [
      {
        id: 'qa-3',
        question: 'Is hostel mandatory for MBBS students at AIIMS Patna?',
        askedBy: 'Ananya Roy',
        answer: 'Yes, MBBS is a compulsory residential medical course at AIIMS Patna. Single room accommodation is allotted to every admitted student.',
        answeredBy: 'AIIMS Patna Dean Academics',
        date: '2026-03-02',
      }
    ],
    latestUpdates: [
      {
        id: 'up-3',
        title: 'AIIMS Patna MBBS 2026 Counseling Notification Issued by MCC',
        date: '2026-08-02',
        category: 'Counseling',
        summary: 'NEET UG qualified candidates can opt for AIIMS Patna All India Quota seats in MCC Round 1.'
      }
    ]
  },
  {
    id: 'patna-university',
    name: 'Patna University',
    shortName: 'PU Patna',
    slug: 'patna-university',
    establishedYear: 1917,
    type: 'Government',
    nirfRank: 101,
    naacGrade: 'B+',
    universityAffiliation: 'State University (7th Oldest University in Indian Subcontinent)',
    state: 'Bihar',
    city: 'Patna',
    address: 'Ashok Rajpath, Near Gandhi Ghat, Patna, Bihar - 800005',
    nearestConnectivity: '4 km from Patna Junction Railway Station, 10 km from Jay Prakash Narayan Airport',
    overview: 'Patna University is the premier historic university of Bihar, established in 1917. Known as the "Oxford of the East" historically, it comprises iconic constituent colleges including Patna College, Science College, Magadh Mahila College, B.N. College, Patna Law College, and Patna Training College along the banks of River Ganga.',
    logoUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=200',
    bannerUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
    coursesOffered: ['B.A. (Hons) History', 'B.Sc (Hons) Physics', 'B.Com (Hons)', 'BCA', 'BBA', 'LL.B (3 Years)', 'M.A. Political Science', 'M.Sc Chemistry'],
    degreesOffered: ['B.A.', 'B.Sc', 'B.Com', 'BBA', 'LL.B', 'M.A.', 'M.Sc'],
    entranceExamsAccepted: ['CUET UG', 'PUCET (Patna University Entrance Test)'],
    feeRangeCategory: 'Under ₹50k/yr',
    avgAnnualFeeInr: 4500,
    eligibilityOverview: 'Passed 10+2 (Intermediate) from Bihar School Examination Board (BSEB), CBSE, or ICSE with 45% aggregate marks.',
    admissionProcessSteps: [
      'Fill online application form on Patna University official admission portal (pup.ac.in).',
      'Appear for PUCET / CUET UG examination.',
      'Check category-wise merit list published on university website.',
      'Attend physical counseling at allotted college (Science College, Patna College, etc.).',
      'Verification of 10th & 12th original marksheets and caste certificates.',
      'Pay nominal admission fee online to confirm registration.'
    ],
    officialWebsiteUrl: 'https://www.pup.ac.in',
    applicationLink: 'https://pup.ac.in/admission',
    verifiedSource: 'Patna University Gazette & Bihar State Higher Education Council',
    lastVerifiedDate: '2026-07-10',
    courses: [
      {
        name: 'B.Sc (Hons) Physics / Mathematics / Computer Science',
        level: 'Undergraduate',
        duration: '4 Years (FYUGP NEP 2020)',
        annualFee: 3200,
        feeText: '₹3,200 / year (Free education for Girl students under Bihar Govt scheme)',
        seats: 450,
        eligibility: '12th Science pass with 45% aggregate',
        entranceExam: 'PUCET / Merit List',
      },
      {
        name: 'B.A. (Hons) History / Economics / Political Science',
        level: 'Undergraduate',
        duration: '4 Years (FYUGP NEP 2020)',
        annualFee: 2800,
        feeText: '₹2,800 / year',
        seats: 800,
        eligibility: '12th pass in any stream with 45% aggregate',
        entranceExam: 'PUCET / Merit List',
      },
      {
        name: 'LL.B (3 Years Law)',
        level: 'Undergraduate',
        duration: '3 Years',
        annualFee: 6500,
        feeText: '₹6,500 / year (Patna Law College)',
        seats: 120,
        eligibility: 'Bachelor Degree in any discipline with 45% marks',
        entranceExam: 'Patna Law College Entrance Test',
      }
    ],
    cutoffs: [
      {
        examName: 'PUCET 2025 (Patna Science College)',
        year: 2025,
        category: 'General Category',
        openingRank: 1,
        closingRank: 180,
        scoreOrPercentile: 'Marks 78/100',
        round: '1st Merit List',
      },
      {
        examName: 'PUCET 2025 (Magadh Mahila College)',
        year: 2025,
        category: 'EBC / BC Category',
        openingRank: 40,
        closingRank: 320,
        scoreOrPercentile: 'Marks 68/100',
        round: '1st Merit List',
      }
    ],
    placement: {
      academicYear: '2024-2025',
      highestPackageLpa: 12.0,
      averagePackageLpa: 4.5,
      medianPackageLpa: 3.8,
      placementRatePercent: 68,
      topRecruiters: ['TCS', 'ICICI Bank', 'Wipro', 'Pratham NGO', 'PWC', 'Bihar State Civil Services'],
    },
    facilities: [
      { name: 'Wheeler Senate House', description: 'Heritage auditorium for university convocations and cultural fests.' },
      { name: 'Patna University Central Library', description: 'Over 2,50,000 rare historical books, manuscripts, and e-journal subscriptions.' },
      { name: 'Ganga Ghat Athletic Ground', description: 'Sports grounds facing River Ganga for football, cricket, and annual athletics meet.' }
    ],
    hostel: {
      availableFor: 'Boys & Girls',
      annualFee: '₹4,500 / year',
      roomTypes: ['Double Sharing Hostel Rooms (Jackson Hostel, Cavendish Hostel, MML Hostel)'],
      messDetails: 'Cooperative student mess providing wholesome Indian food.',
      facilities: ['Study Common Room', '24x7 Security Guard', 'Solar Lights']
    },
    scholarships: [
      {
        name: 'Mukhyamantri Kanya Utthan Yojana',
        provider: 'Bihar State Government',
        amountOrWaiver: '₹50,000 cash reward upon graduation for female students',
        eligibility: 'Unmarried female students passing graduation from Patna University.'
      },
      {
        name: 'Post-Matric Scholarship Bihar',
        provider: 'Social Welfare Dept Bihar',
        amountOrWaiver: '100% Fee refund for SC/ST/EBC/BC students',
        eligibility: 'Bihar resident students with annual family income <= ₹2.5 Lakhs.'
      }
    ],
    reviews: [
      {
        id: 'rev-4',
        reviewerName: 'Ranjeet Prasad',
        batch: "B.Sc Physics '25",
        rating: 4,
        title: 'Great historical heritage with very affordable education',
        pros: 'Top class faculty at Science College, historic library, practically zero tuition fees for girls.',
        cons: 'Administrative processes can be slightly slow during exam form submissions.',
        date: '2026-04-05',
      }
    ],
    qaList: [
      {
        id: 'qa-4',
        question: 'Are girl students exempt from tuition fees at Patna University?',
        askedBy: 'Pooja Kumari',
        answer: 'Yes! As per the Bihar Government policy, all female candidates pursuing undergraduate programs at state universities like Patna University enjoy 100% tuition fee exemption.',
        answeredBy: 'Patna University Dean Student Welfare',
        date: '2026-05-11',
      }
    ],
    latestUpdates: [
      {
        id: 'up-4',
        title: 'Patna University UG Admission 2026 FYUGP Merit List Published',
        date: '2026-07-20',
        category: 'Admission',
        summary: 'Candidates can check their allotted constituent college and complete physical document submission by August 10.'
      }
    ]
  },
  {
    id: 'nit-patna',
    name: 'National Institute of Technology Patna',
    shortName: 'NIT Patna',
    slug: 'nit-patna',
    establishedYear: 1886,
    type: 'Government',
    nirfRank: 56,
    naacGrade: 'A',
    universityAffiliation: 'Autonomous Institute of National Importance',
    state: 'Bihar',
    city: 'Patna',
    address: 'Ashok Rajpath & Bihta Satellite Campus, Patna, Bihar - 800005',
    nearestConnectivity: '4 km from Patna Junction Railway Station, 11 km from Patna Airport',
    overview: 'NIT Patna is the 18th National Institute of Technology created by the Ministry of Education, Government of India. Formerly Bihar College of Engineering (established 1886), it is renowned for strong technical education in CSE, ECE, Civil, Mechanical, Architecture, and dual-degree programs.',
    logoUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=200',
    bannerUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200',
    coursesOffered: ['B.Tech CSE', 'B.Tech ECE', 'B.Tech Electrical Engineering', 'B.Tech Mechanical', 'B.Tech Civil', 'B.Arch', 'M.Tech', 'Integrated M.Sc'],
    degreesOffered: ['B.Tech', 'B.Arch', 'M.Tech', 'PhD'],
    entranceExamsAccepted: ['JEE Main', 'GATE', 'NATA'],
    feeRangeCategory: '₹1.5L - ₹3L/yr',
    avgAnnualFeeInr: 165000,
    eligibilityOverview: 'Passed 10+2 with Physics, Chemistry, and Mathematics (75% aggregate marks) and a valid rank in JEE Main.',
    admissionProcessSteps: [
      'Appear for JEE Main National Level Test conducted by NTA.',
      'Register for JoSAA / CSAB counseling online.',
      'Fill choice preferences selecting Home State (Bihar) or Other State Quota for NIT Patna.',
      'Seat allocation based on JEE Main CRL / Category rank.',
      'Document submission and admission fee confirmation.'
    ],
    officialWebsiteUrl: 'https://www.nitp.ac.in',
    applicationLink: 'https://josaa.nic.in',
    verifiedSource: 'JoSAA Seat Matrix & MoE National Portal',
    lastVerifiedDate: '2026-07-28',
    courses: [
      {
        name: 'B.Tech Computer Science & Engineering',
        level: 'Undergraduate',
        duration: '4 Years',
        annualFee: 165000,
        feeText: '₹1.65 Lakh / year (Full waiver for SC/ST & income < 1 Lakh)',
        seats: 120,
        eligibility: '12th Pass with PCM (75% marks) + JEE Main Rank',
        entranceExam: 'JEE Main',
      },
      {
        name: 'B.Arch (Bachelor of Architecture)',
        level: 'Undergraduate',
        duration: '5 Years',
        annualFee: 165000,
        feeText: '₹1.65 Lakh / year',
        seats: 40,
        eligibility: '12th Pass with PCM + NATA / JEE Main Paper 2',
        entranceExam: 'JEE Main Paper 2 / NATA',
      }
    ],
    cutoffs: [
      {
        examName: 'JEE Main 2025 (Home State - General)',
        year: 2025,
        category: 'General (Home State Bihar)',
        openingRank: 8200,
        closingRank: 14200,
        scoreOrPercentile: 'Percentile 98.8',
        round: 'Round 6 JoSAA',
      },
      {
        examName: 'JEE Main 2025 (Other State - General)',
        year: 2025,
        category: 'General (Other State)',
        openingRank: 6500,
        closingRank: 12100,
        scoreOrPercentile: 'Percentile 99.1',
        round: 'Round 6 JoSAA',
      }
    ],
    placement: {
      academicYear: '2024-2025',
      highestPackageLpa: 52.0,
      averagePackageLpa: 14.2,
      medianPackageLpa: 11.5,
      placementRatePercent: 91,
      topRecruiters: ['Amazon', 'Adobe', 'L&T', 'Samsung', 'Paytm', 'Deloitte', 'Bharat Petroleum', 'Maruti Suzuki'],
    },
    facilities: [
      { name: 'Incubation & Startup Cell', description: 'Provides seed funding and mentoring to tech entrepreneurs.' },
      { name: 'High-Performance Computing Center', description: 'Advanced workstations with Nvidia GPU clusters for Machine Learning.' },
      { name: 'Riverfront Campus & Sports Complex', description: 'Scenic campus right beside the River Ganges.' }
    ],
    hostel: {
      availableFor: 'Boys & Girls',
      annualFee: '₹28,000 / year + Mess ₹16,000 / semester',
      roomTypes: ['Double Sharing & Triple Sharing Rooms'],
      messDetails: 'High quality vegetarian and non-vegetarian meals.',
      facilities: ['High Speed Wi-Fi', 'GYM', 'Reading Room', 'Sports Area']
    },
    scholarships: [
      {
        name: 'OP Jindal Engineering Scholarship (OPJEMS)',
        provider: 'Jindal Foundation',
        amountOrWaiver: '₹80,000 per year for top rankers',
        eligibility: 'Top academic rank holders in engineering streams.'
      }
    ],
    reviews: [
      {
        id: 'rev-5',
        reviewerName: 'Subhashish Das',
        batch: "B.Tech CSE '25",
        rating: 5,
        title: 'Terrific coding atmosphere and steady year-on-year placement growth',
        pros: 'Top MNCs visit for campus placement, alumni network is spread across global tech firms.',
        cons: 'Ashok Rajpath campus is in a crowded location, though new Bihta mega campus is expanding fast.',
        date: '2026-03-30',
      }
    ],
    qaList: [
      {
        id: 'qa-5',
        question: 'What is the Home State reservation for Bihar students at NIT Patna?',
        askedBy: 'Alok Ranjan',
        answer: 'Under NIT seat allocation rules, 50% of the total seats are strictly reserved for candidates whose Home State of eligibility is Bihar.',
        answeredBy: 'NIT Patna Admissions Committee',
        date: '2026-04-18',
      }
    ],
    latestUpdates: [
      {
        id: 'up-5',
        title: 'NIT Patna CSAB Special Round Counseling Vacant Seat Matrix Out',
        date: '2026-08-05',
        category: 'Counseling',
        summary: 'Candidates who missed JoSAA seats can apply for vacant B.Tech seats in CSAB Special Rounds.'
      }
    ]
  },
  {
    id: 'bau-sabour',
    name: 'Bihar Agricultural University, Sabour',
    shortName: 'BAU Sabour',
    slug: 'bau-sabour',
    establishedYear: 2010,
    type: 'Government',
    nirfRank: 15,
    naacGrade: 'A',
    universityAffiliation: 'State Agricultural University (ICAR Accredited)',
    state: 'Bihar',
    city: 'Bhagalpur',
    address: 'Sabour, Bhagalpur, Bihar - 813210',
    nearestConnectivity: '9 km from Bhagalpur Junction Railway Station, 220 km from Patna Airport',
    overview: 'Bihar Agricultural University (BAU) Sabour is the premier agricultural education and research university of Bihar. Spread across a sprawling green campus in Bhagalpur, it administers 6 constituent agricultural colleges, research stations, and Krishi Vigyan Kendras across the state.',
    logoUrl: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=200',
    bannerUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200',
    coursesOffered: ['B.Sc (Hons) Agriculture', 'B.Sc (Hons) Horticulture', 'M.Sc Agronomy', 'M.Sc Plant Breeding', 'M.Sc Entomology', 'PhD Agriculture'],
    degreesOffered: ['B.Sc', 'M.Sc', 'PhD'],
    entranceExamsAccepted: ['BCECE (Agriculture Stream)', 'ICAR AIEEA UG / PG'],
    feeRangeCategory: 'Under ₹50k/yr',
    avgAnnualFeeInr: 12500,
    eligibilityOverview: 'Passed 10+2 Intermediate Science with PCB (Physics, Chemistry, Biology) or Agriculture stream securing at least 50% aggregate marks.',
    admissionProcessSteps: [
      'Appear for BCECE (Bihar Combined Entrance Competitive Examination) Agriculture group test.',
      'Check rank in BCECE Bihar Agriculture Merit List.',
      'Participate in BCECE Board online seat allotment counseling.',
      'Document verification and admission at Sabour main campus.'
    ],
    officialWebsiteUrl: 'https://www.bausabour.ac.in',
    applicationLink: 'https://bceceboard.bihar.gov.in',
    verifiedSource: 'ICAR Accreditation Board & BCECE Board Official Gazette',
    lastVerifiedDate: '2026-06-20',
    courses: [
      {
        name: 'B.Sc (Hons) Agriculture',
        level: 'Undergraduate',
        duration: '4 Years',
        annualFee: 12500,
        feeText: '₹12,500 / year (Includes ICAR practical field grant)',
        seats: 320,
        eligibility: '12th Science pass with PCB/PCM/PCMB (50% marks) + BCECE Rank',
        entranceExam: 'BCECE / ICAR AIEEA',
      },
      {
        name: 'B.Sc (Hons) Horticulture',
        level: 'Undergraduate',
        duration: '4 Years',
        annualFee: 11000,
        feeText: '₹11,000 / year',
        seats: 60,
        eligibility: '12th Science pass with PCB (50% marks) + BCECE Rank',
        entranceExam: 'BCECE / ICAR AIEEA',
      }
    ],
    cutoffs: [
      {
        examName: 'BCECE Agriculture 2025',
        year: 2025,
        category: 'General (UR)',
        openingRank: 1,
        closingRank: 140,
        scoreOrPercentile: 'Rank 140 in CBA/PCA Group',
        round: 'Round 1 BCECE',
      },
      {
        examName: 'BCECE Agriculture 2025',
        year: 2025,
        category: 'EBC / BC Category',
        openingRank: 25,
        closingRank: 280,
        scoreOrPercentile: 'Rank 280',
        round: 'Round 1 BCECE',
      }
    ],
    placement: {
      academicYear: '2024-2025',
      highestPackageLpa: 14.5,
      averagePackageLpa: 6.2,
      medianPackageLpa: 5.5,
      placementRatePercent: 88,
      topRecruiters: ['NABARD', 'IFFCO', 'KRIBHCO', 'ITC Agri Business', 'Syngenta', 'Bihar State Seed Corporation', 'Bank of Baroda Agri Officer'],
    },
    facilities: [
      { name: 'Tissue Culture & Biotechnology Labs', description: 'Modern genetic research labs developing drought and flood resilient crops.' },
      { name: 'Instructional Farm', description: 'Over 300 acres of experimental agricultural research fields.' },
      { name: 'Krishi Radio Station', description: 'Community radio station broadcasting agricultural advisory to farmers.' }
    ],
    hostel: {
      availableFor: 'Boys & Girls',
      annualFee: '₹6,000 / year',
      roomTypes: ['Single Seater & Double Seater Rooms'],
      messDetails: 'Nutritious farm-fresh produce mess.',
      facilities: ['Wi-Fi', 'Sports Grounds', 'Library Annex']
    },
    scholarships: [
      {
        name: 'ICAR National Talent Scholarship (NTS)',
        provider: 'Indian Council of Agricultural Research',
        amountOrWaiver: '₹3,000 per month stipend for ICAR quota students',
        eligibility: 'Students admitted through ICAR All India Competitive Exam.'
      },
      {
        name: 'Bihar Mukhyamantri Krishi Medha Yojna',
        provider: 'Agriculture Department Govt of Bihar',
        amountOrWaiver: '₹2,000 per month scholarship to all domicile B.Sc Agriculture students',
        eligibility: 'Bihar domicile students enrolled in BAU Sabour.'
      }
    ],
    reviews: [
      {
        id: 'rev-6',
        reviewerName: 'Manish Raj',
        batch: "B.Sc Agriculture '24",
        rating: 5,
        title: 'Top notch agricultural exposure and high government job selection rate',
        pros: 'High selection rate in Bihar Agriculture Officer (BAO) & Bank AFOMS exams.',
        cons: 'Located in Sabour, Bhagalpur (outside Patna main district).',
        date: '2026-02-14',
      }
    ],
    qaList: [
      {
        id: 'qa-6',
        question: 'Do B.Sc Agriculture students get monthly stipend at BAU Sabour?',
        askedBy: 'Suraj Kumar',
        answer: 'Yes! The Bihar Government provides a monthly stipend of ₹2,000 and ₹6,000 annual book grant to all Bihar domicile students pursuing B.Sc Agriculture at BAU Sabour.',
        answeredBy: 'BAU Sabour Student Advisory Cell',
        date: '2026-03-25',
      }
    ],
    latestUpdates: [
      {
        id: 'up-6',
        title: 'BCECE 2026 Agriculture Seat Allotment Merit List Released',
        date: '2026-07-15',
        category: 'Counseling',
        summary: 'Selected candidates are instructed to report to Sabour campus for document verification.'
      }
    ]
  },
  {
    id: 'cnlu-patna',
    name: 'Chanakya National Law University',
    shortName: 'CNLU Patna',
    slug: 'cnlu-patna',
    establishedYear: 2006,
    type: 'Government',
    nirfRank: 18,
    naacGrade: 'A',
    universityAffiliation: 'Autonomous National Law University (BCI Recognized)',
    state: 'Bihar',
    city: 'Patna',
    address: 'Nyaya Nagar, Mithapur, Patna, Bihar - 800001',
    nearestConnectivity: '1.5 km from Patna Junction Railway Station, 6 km from Patna Airport',
    overview: 'Chanakya National Law University (CNLU) Patna is an autonomous National Law University established by the Government of Bihar under the CNLU Act 2006. Spread over 18 acres in heart of Patna at Mithapur, it is renowned for producing top judges, corporate legal counsel, advocate generals, and civil servants.',
    logoUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=200',
    bannerUrl: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&q=80&w=1200',
    coursesOffered: ['B.A. LL.B (Hons) 5 Years', 'B.B.A. LL.B (Hons) 5 Years', 'LL.M (1 Year)', 'Ph.D. in Law'],
    degreesOffered: ['LL.B', 'LL.M', 'PhD'],
    entranceExamsAccepted: ['CLAT (Common Law Admission Test)', 'CLAT PG'],
    feeRangeCategory: '₹1.5L - ₹3L/yr',
    avgAnnualFeeInr: 210000,
    eligibilityOverview: 'Passed 10+2 with 45% aggregate (40% for SC/ST) and a valid rank in CLAT UG.',
    admissionProcessSteps: [
      'Appear for CLAT (Common Law Admission Test) national entrance exam.',
      'Register for CLAT Consortium Counseling online.',
      'Fill preference order putting CNLU Patna among top preferences.',
      'Seat allocation, fee submission, and document check.'
    ],
    officialWebsiteUrl: 'https://www.cnlu.ac.in',
    applicationLink: 'https://consortiumofnlus.ac.in',
    verifiedSource: 'Consortium of NLUs Official Gazette & Bar Council of India',
    lastVerifiedDate: '2026-07-01',
    courses: [
      {
        name: 'B.A. LL.B (Hons) 5 Years Integrated',
        level: 'Undergraduate',
        duration: '5 Years',
        annualFee: 210000,
        feeText: '₹2.10 Lakh / year (Includes Moot Court & Library fees)',
        seats: 70,
        eligibility: '12th Pass (45% marks) + CLAT UG Rank',
        entranceExam: 'CLAT UG',
      },
      {
        name: 'B.B.A. LL.B (Hons) 5 Years Integrated',
        level: 'Undergraduate',
        duration: '5 Years',
        annualFee: 210000,
        feeText: '₹2.10 Lakh / year',
        seats: 70,
        eligibility: '12th Pass (45% marks) + CLAT UG Rank',
        entranceExam: 'CLAT UG',
      }
    ],
    cutoffs: [
      {
        examName: 'CLAT UG 2025',
        year: 2025,
        category: 'General (All India)',
        openingRank: 620,
        closingRank: 1380,
        scoreOrPercentile: 'Rank 1380',
        round: 'Round 4 CLAT',
      },
      {
        examName: 'CLAT UG 2025',
        year: 2025,
        category: 'Bihar Domicile Reserved',
        openingRank: 1400,
        closingRank: 2850,
        scoreOrPercentile: 'Rank 2850',
        round: 'Round 4 CLAT',
      }
    ],
    placement: {
      academicYear: '2024-2025',
      highestPackageLpa: 22.0,
      averagePackageLpa: 11.8,
      medianPackageLpa: 10.0,
      placementRatePercent: 89,
      topRecruiters: ['Khaitan & Co', 'Trilegal', 'Cyril Amarchand Mangaldas', 'Luthra & Luthra', 'ICICI Bank Legal', 'Tata Sons Legal'],
    },
    facilities: [
      { name: 'Moot Court Complex', description: 'State-of-the-art replica courtroom for national moot court competitions.' },
      { name: 'Chanakya Law Library', description: 'Extensive repository with SCC Online, Manupatra, HeinOnline, and Westlaw access.' }
    ],
    hostel: {
      availableFor: 'Boys & Girls',
      annualFee: '₹32,000 / year + Mess Fee',
      roomTypes: ['Single Occupancy Rooms for All Students'],
      messDetails: 'Student mess committee providing fresh food.',
      facilities: ['24x7 Wi-Fi', 'Air-Conditioned Reading Hall']
    },
    scholarships: [
      {
        name: 'Bihar Credit Card Scheme for CNLU',
        provider: 'Government of Bihar',
        amountOrWaiver: 'Up to ₹4 Lakh loan at 1% simple interest rate for girls & 4% for boys',
        eligibility: 'Bihar resident students enrolled at CNLU Patna.'
      }
    ],
    reviews: [
      {
        id: 'rev-7',
        reviewerName: 'Kriti Vardhan',
        batch: "B.A. LL.B '25",
        rating: 5,
        title: 'Excellent corporate law placements and supreme court judge mentorship',
        pros: 'Located right in central Patna next to Patna Junction, fantastic mooting culture.',
        cons: 'Curriculum is very demanding with mandatory internships after every semester.',
        date: '2026-01-15',
      }
    ],
    qaList: [
      {
        id: 'qa-7',
        question: 'Does CNLU Patna have Bihar State Domicile reservation in CLAT?',
        askedBy: 'Vikram Singh',
        answer: 'Yes, 50% of seats in CNLU Patna are allocated under Bihar Domicile Reservation quota.',
        answeredBy: 'CNLU Registrar',
        date: '2026-02-10',
      }
    ],
    latestUpdates: [
      {
        id: 'up-7',
        title: 'CLAT 2026 Seat Allotment List for CNLU Patna Live',
        date: '2026-06-28',
        category: 'Counseling',
        summary: 'Admitted candidates can pay seat acceptance fee and upload documents on CLAT Consortium portal.'
      }
    ]
  },
  {
    id: 'bhu-varanasi',
    name: 'Banaras Hindu University',
    shortName: 'BHU Varanasi',
    slug: 'bhu-varanasi',
    establishedYear: 1916,
    type: 'Central',
    nirfRank: 5,
    naacGrade: 'A++',
    universityAffiliation: 'Central University (Institute of Eminence)',
    state: 'Uttar Pradesh',
    city: 'Varanasi',
    address: 'Varanasi, Uttar Pradesh - 221005',
    nearestConnectivity: '7 km from Varanasi Junction Railway Station, 25 km from Lal Bahadur Shastri Airport',
    overview: 'Banaras Hindu University (BHU) is an iconic Central University founded by Mahamana Pandit Madan Mohan Malaviya in 1916. Spanning over 1,300 acres in Varanasi with over 30,000 residential students, BHU houses IIT BHU, Institute of Medical Sciences (IMS BHU), Institute of Agricultural Sciences, and faculties of Law, Arts, Commerce, and Science.',
    logoUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=200',
    bannerUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
    coursesOffered: ['B.A. (Hons) Arts / Social Sciences', 'B.Sc (Hons) Maths / Bio', 'B.Com (Hons)', 'B.Sc Agriculture', 'MBBS (IMS BHU)', 'B.Tech (IIT BHU)', 'LL.B', 'M.A.'],
    degreesOffered: ['B.A.', 'B.Sc', 'B.Com', 'MBBS', 'B.Tech', 'LL.B', 'M.A.', 'M.Sc'],
    entranceExamsAccepted: ['CUET UG', 'CUET PG', 'NEET UG', 'JEE Advanced'],
    feeRangeCategory: 'Under ₹50k/yr',
    avgAnnualFeeInr: 3800,
    eligibilityOverview: 'Passed 10+2 with minimum 50% aggregate marks and a valid CUET UG percentile score.',
    admissionProcessSteps: [
      'Appear for CUET UG / CUET PG exam selecting BHU as target Central University.',
      'Register on BHU Online Counseling Portal (bhuonline.in).',
      'Fill choice preference of course and faculty.',
      'Check BHU Merit Cutoff List.',
      'Document check and nominal fee payment.'
    ],
    officialWebsiteUrl: 'https://www.bhu.ac.in',
    applicationLink: 'https://bhuonline.in',
    verifiedSource: 'UGC Central University Portal & NTA CUET Gazette',
    lastVerifiedDate: '2026-07-20',
    courses: [
      {
        name: 'B.A. (Hons) Social Sciences / Arts',
        level: 'Undergraduate',
        duration: '3 Years / 4 Years FYUGP',
        annualFee: 2800,
        feeText: '₹2,800 / year',
        seats: 1200,
        eligibility: '12th Pass (50% marks) + CUET UG Score',
        entranceExam: 'CUET UG',
      },
      {
        name: 'B.Sc (Hons) Agriculture',
        level: 'Undergraduate',
        duration: '4 Years',
        annualFee: 8500,
        feeText: '₹8,500 / year (IMS Agricultural Science)',
        seats: 154,
        eligibility: '12th Science (PCB/PCM) + CUET UG Agriculture Test',
        entranceExam: 'CUET UG',
      }
    ],
    cutoffs: [
      {
        examName: 'CUET UG 2025',
        year: 2025,
        category: 'General (UR)',
        openingRank: 1,
        closingRank: 500,
        scoreOrPercentile: 'Score 340/400 in CUET',
        round: 'Round 1 BHU',
      }
    ],
    placement: {
      academicYear: '2024-2025',
      highestPackageLpa: 38.0,
      averagePackageLpa: 9.5,
      medianPackageLpa: 7.2,
      placementRatePercent: 86,
      topRecruiters: ['TCS', 'Infosys', 'ICICI Prudential', 'HDFC Bank', 'Byjus', 'Wipro', 'Azim Premji Foundation'],
    },
    facilities: [
      { name: 'Sayaji Rao Gaekwad Library', description: 'One of the largest university libraries in Asia with over 1.5 million books.' },
      { name: 'Sir Sunderlal Hospital (IMS BHU)', description: '1,500-bed super specialty hospital catering to Eastern UP and Bihar.' },
      { name: 'VT (Vishwanath Temple Complex)', description: 'Iconic temple and cultural hub inside campus.' }
    ],
    hostel: {
      availableFor: 'Boys & Girls',
      annualFee: '₹3,500 / year',
      roomTypes: ['Single & Double Occupancy Rooms in 70+ Hostels'],
      messDetails: 'Traditional nutritious North & South Indian food.',
      facilities: ['Wi-Fi', 'Sports Complex', '24x7 Security']
    },
    scholarships: [
      {
        name: 'BHU Student Welfare Financial Aid',
        provider: 'Banaras Hindu University',
        amountOrWaiver: '₹5,000 annual grant + free meal vouchers for needy students',
        eligibility: 'Students with annual family income below ₹1.5 Lakhs.'
      }
    ],
    reviews: [
      {
        id: 'rev-8',
        reviewerName: 'Saurabh Pandey',
        batch: "B.A. Political Science '25",
        rating: 5,
        title: 'Unrivaled cultural environment and world class Central University exposure',
        pros: 'Extremely affordable, majestic green campus, top faculty.',
        cons: 'Huge student strength means administrative lines can be long.',
        date: '2026-03-05',
      }
    ],
    qaList: [
      {
        id: 'qa-8',
        question: 'Does BHU accept CUET UG scores for all undergraduate admissions?',
        askedBy: 'Anand Roy',
        answer: 'Yes, admission to all BA, B.Sc, B.Com, B.Sc Ag courses at BHU is done strictly through NTA CUET UG percentile scores.',
        answeredBy: 'BHU Admission Cell',
        date: '2026-04-12',
      }
    ],
    latestUpdates: [
      {
        id: 'up-8',
        title: 'BHU UG Admission 2026 CUET Counseling Portal Open',
        date: '2026-07-29',
        category: 'Counseling',
        summary: 'Candidates can complete registration on bhuonline.in.'
      }
    ]
  }
];

export const initialUniversitiesData: University[] = [
  {
    id: 'patna-univ',
    name: 'Patna University',
    shortName: 'PU Patna',
    slug: 'patna-university',
    type: 'State',
    establishedYear: 1917,
    location: 'Patna, Bihar',
    state: 'Bihar',
    city: 'Patna',
    ugcRecognized: true,
    nirfRank: 101,
    naacGrade: 'B+',
    campusSizeAcres: 120,
    affiliatedCollegesCount: 10,
    overview: 'Patna University is the premier historic university of Bihar. It administers prestigious constituent colleges like Patna Science College, Patna College, Magadh Mahila College, B.N. College, Patna Law College, and Patna Fine Arts College.',
    chancellorOrVc: 'Prof. Ajay Kumar Singh (Vice Chancellor)',
    keyFaculties: ['Faculty of Science', 'Faculty of Humanities', 'Faculty of Commerce', 'Faculty of Law', 'Faculty of Education'],
    popularCourses: ['B.A. (Hons)', 'B.Sc (Hons)', 'B.Com (Hons)', 'LL.B', 'M.A.', 'M.Sc', 'MCA'],
    entranceExams: ['PUCET', 'CUET UG', 'Patna Law Entrance'],
    officialWebsiteUrl: 'https://www.pup.ac.in',
    admissionNotice: 'Patna University UG Admissions 2026 applications open online on pup.ac.in.',
    verifiedSource: 'UGC University Directory & Bihar Raj Bhavan Gazette',
    lastVerifiedDate: '2026-08-01',
  },
  {
    id: 'aku-patna',
    name: 'Aryabhatta Knowledge University',
    shortName: 'AKU Patna',
    slug: 'aryabhatta-knowledge-university',
    type: 'State',
    establishedYear: 2010,
    location: 'Mithapur, Patna, Bihar',
    state: 'Bihar',
    city: 'Patna',
    ugcRecognized: true,
    naacGrade: 'A',
    campusSizeAcres: 25,
    affiliatedCollegesCount: 110,
    overview: 'Aryabhatta Knowledge University (AKU) Patna was established by the Government of Bihar to conduct and standardize technical, medical, management, and professional education across Bihar. It governs all government engineering colleges (GECs) and medical colleges in the state.',
    chancellorOrVc: 'Prof. S.M. Karim (Vice Chancellor)',
    keyFaculties: ['School of Engineering & Technology', 'School of Health & Allied Sciences', 'School of Educational Training', 'School of Nano Science'],
    popularCourses: ['B.Tech (Civil/CSE/EE/ME)', 'MBBS', 'B.Pharm', 'B.Ed', 'M.Tech'],
    entranceExams: ['JEE Main', 'NEET UG', 'BCECE'],
    officialWebsiteUrl: 'https://akubihar.ac.in',
    admissionNotice: 'AKU B.Tech 1st Year Semester Exam Schedule & BCECE Allotment Guidelines 2026.',
    verifiedSource: 'Government of Bihar Higher Education Department',
    lastVerifiedDate: '2026-07-20',
  },
  {
    id: 'nalanda-univ',
    name: 'Nalanda University',
    shortName: 'Nalanda International',
    slug: 'nalanda-university',
    type: 'Central',
    establishedYear: 2010,
    location: 'Rajgir, Nalanda, Bihar',
    state: 'Bihar',
    city: 'Rajgir',
    ugcRecognized: true,
    campusSizeAcres: 455,
    affiliatedCollegesCount: 1,
    overview: 'Nalanda University is a pioneering Central International University established by an Act of Indian Parliament and supported by 18 East Asia Summit member countries. Re-imagining the ancient seat of learning, its Net-Zero Eco Campus in Rajgir offers Master degrees and PhDs.',
    chancellorOrVc: 'Prof. Abhay Kumar Singh (Vice Chancellor)',
    keyFaculties: ['School of Historical Studies', 'School of Buddhist Studies & Philosophy', 'School of Ecology & Environment', 'School of Languages'],
    popularCourses: ['M.A. Historical Studies', 'M.A. World Literature', 'M.Sc Ecology & Environment', 'Ph.D.'],
    entranceExams: ['Nalanda Global Entrance Test & Interview'],
    officialWebsiteUrl: 'https://nalandauniv.edu.in',
    admissionNotice: 'Nalanda International PG Applications 2026 for Global Students Open.',
    verifiedSource: 'Ministry of External Affairs (MEA) India & UGC',
    lastVerifiedDate: '2026-07-15',
  },
  {
    id: 'bhu-varanasi-univ',
    name: 'Banaras Hindu University',
    shortName: 'BHU',
    slug: 'banaras-hindu-university',
    type: 'Central',
    establishedYear: 1916,
    location: 'Varanasi, Uttar Pradesh',
    state: 'Uttar Pradesh',
    city: 'Varanasi',
    ugcRecognized: true,
    nirfRank: 5,
    naacGrade: 'A++',
    campusSizeAcres: 1300,
    affiliatedCollegesCount: 5,
    overview: 'BHU is one of the largest residential Central Universities in Asia. Housing over 140 departments, IIT BHU, IMS BHU, and Institute of Agricultural Sciences, it provides education from Sanskrit to Space Science.',
    chancellorOrVc: 'Prof. Sudhir K. Jain (Vice Chancellor)',
    keyFaculties: ['Institute of Science', 'Institute of Medical Sciences', 'IIT BHU', 'Faculty of Law', 'Faculty of Performing Arts'],
    popularCourses: ['B.A.', 'B.Sc', 'B.Tech', 'MBBS', 'LL.B', 'M.Sc', 'MBA'],
    entranceExams: ['CUET UG', 'CUET PG', 'JEE Advanced', 'NEET UG'],
    officialWebsiteUrl: 'https://www.bhu.ac.in',
    admissionNotice: 'BHU CUET UG 2026 Registration & Choice Filling Portal active at bhuonline.in.',
    verifiedSource: 'UGC & Ministry of Education India',
    lastVerifiedDate: '2026-08-01',
  },
  {
    id: 'du-delhi-univ',
    name: 'University of Delhi',
    shortName: 'DU Delhi',
    slug: 'university-of-delhi',
    type: 'Central',
    establishedYear: 1922,
    location: 'New Delhi, Delhi NCR',
    state: 'Delhi',
    city: 'New Delhi',
    ugcRecognized: true,
    nirfRank: 11,
    naacGrade: 'A++',
    campusSizeAcres: 300,
    affiliatedCollegesCount: 91,
    overview: 'University of Delhi (DU) is a premier Central University acclaimed globally for academic excellence. Comprising 91 affiliated colleges including St. Stephen’s, SRCC, Hindu College, Miranda House, and Lady Shri Ram, it enrolls over 7 Lakh students.',
    chancellorOrVc: 'Prof. Yogesh Singh (Vice Chancellor)',
    keyFaculties: ['Faculty of Arts', 'Faculty of Commerce & Business', 'Faculty of Mathematical Sciences', 'Faculty of Law', 'Faculty of Medical Sciences'],
    popularCourses: ['B.A. (Hons)', 'B.Com (Hons)', 'B.Sc (Hons)', 'LL.B', 'MBA (FMS Delhi)'],
    entranceExams: ['CUET UG', 'CUET PG', 'CAT (for FMS)'],
    officialWebsiteUrl: 'https://www.du.ac.in',
    admissionNotice: 'DU CSAS (Common Seat Allocation System) 2026 Phase 1 & Phase 2 live.',
    verifiedSource: 'NTA CUET & University of Delhi CSAS Portal',
    lastVerifiedDate: '2026-08-04',
  },
  {
    id: 'bits-pilani-univ',
    name: 'BITS Pilani (Birla Institute of Technology and Science)',
    shortName: 'BITS Pilani',
    slug: 'bits-pilani',
    type: 'Deemed',
    establishedYear: 1964,
    location: 'Pilani, Rajasthan & Hyderabad, Goa, Dubai',
    state: 'Rajasthan',
    city: 'Pilani',
    ugcRecognized: true,
    nirfRank: 20,
    naacGrade: 'A',
    campusSizeAcres: 328,
    affiliatedCollegesCount: 4,
    overview: 'BITS Pilani is an Institute of Eminence Deemed University. World renowned for its zero-attendance policy, Practice School industry internship program, and top engineering alumni network globally.',
    chancellorOrVc: 'Prof. V. Ramgopal Rao (Vice Chancellor)',
    keyFaculties: ['Engineering', 'Sciences', 'Pharmacy', 'Management'],
    popularCourses: ['B.E. Computer Science', 'B.E. Electronics', 'M.Sc Dual Degree', 'MBA', 'PhD'],
    entranceExams: ['BITSAT'],
    officialWebsiteUrl: 'https://www.bits-pilani.ac.in',
    admissionNotice: 'BITSAT 2026 Iteration Results and Hostel Fee Payment Portal active.',
    verifiedSource: 'UGC Institute of Eminence Gazette',
    lastVerifiedDate: '2026-07-22',
  }
];
