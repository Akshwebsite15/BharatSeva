export interface FinanceScheme {
  id: string;
  title: string;
  hindiTitle?: string;
  category: 'Insurance' | 'Pension & Savings' | 'Loans & Subsidies' | 'Tax & Investment';
  subCategory: string;
  shortDesc: string;
  overview: string;
  keyBenefit: string;
  eligibility: string;
  ageLimit: string;
  incomeLimit?: string;
  premiumOrDeposit?: string;
  maximumBenefit: string;
  interestRate?: string;
  lockInPeriod?: string;
  taxBenefit?: string;
  howToApply: string[];
  requiredDocuments: string[];
  officialPortalUrl: string;
  helplineNumber?: string;
  searchKeywords: string[];
  popularTag?: string;
  faqList: { question: string; answer: string }[];
}

export const FINANCE_INSURANCE_SCHEMES: FinanceScheme[] = [
  // 1. Ayushman Bharat PM-JAY
  {
    id: 'ayushman-bharat-pmjay',
    title: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    hindiTitle: 'आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना',
    category: 'Insurance',
    subCategory: 'Health & Medical Insurance',
    shortDesc: '₹5,00,000 free annual cashless health insurance cover per family for secondary & tertiary hospitalizations.',
    overview: 'Ayushman Bharat PM-JAY is the world\'s largest government-funded healthcare assurance scheme. It covers over 12 crore poor and vulnerable families (approx. 55 crore beneficiaries), providing up to ₹5 Lakhs per family per year for secondary and tertiary care hospitalization in empaneled private and public hospitals across India.',
    keyBenefit: '₹5 Lakh Cashless In-patient Medical & Surgical Treatment per family/year across 27,000+ empaneled hospitals.',
    eligibility: 'Listed in SECC 2011 database, Ration Card holder (NFSA/State priority card), or Ayushman Vay Vandana Card (all seniors aged 70+ irrespective of income).',
    ageLimit: 'No age limit (Senior Citizens 70+ get dedicated additional ₹5 Lakh top-up cover).',
    premiumOrDeposit: '100% Free (Zero Premium paid by citizen; funded by Central & State Govt).',
    maximumBenefit: '₹5,00,000 per family per year (₹10,00,000 for families with 70+ seniors).',
    howToApply: [
      'Check eligibility on beneficiary.nha.gov.in using Aadhaar / Ration Card.',
      'Visit nearest CSC (Common Service Centre) or Empaneled Govt/Private Hospital with Aadhaar Card and Ration Card.',
      'Complete Aadhaar e-KYC and photo verification.',
      'Download and print the Golden Ayushman Card instantly.'
    ],
    requiredDocuments: ['Aadhaar Card', 'Ration Card / NFSA Proof', 'Active Mobile Number for OTP'],
    officialPortalUrl: 'https://beneficiary.nha.gov.in',
    helplineNumber: '14555 / 1800-111-565',
    searchKeywords: ['ayushman bharat card', 'pm jay health insurance', 'ayushman card apply online', 'ayushman bharat 5 lakh hospital list', 'free health card bihar', 'ayushman card 70 years senior citizen'],
    popularTag: 'Most Popular Health Cover',
    faqList: [
      {
        question: 'How to check if my name is in Ayushman Bharat list?',
        answer: 'Visit beneficiary.nha.gov.in, select your State, Scheme (PMJAY), and search by Aadhaar Number, Ration Card Number, or Family ID. If eligible, your family member names will appear for instant e-KYC.'
      },
      {
        question: 'Are pre-existing diseases covered in Ayushman Bharat?',
        answer: 'Yes! All pre-existing medical conditions and chronic ailments are covered from Day 1 without any waiting period.'
      }
    ]
  },

  // 2. PMJJBY
  {
    id: 'pmjjby-life-insurance',
    title: 'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)',
    hindiTitle: 'प्रधानमंत्री जीवन ज्योति बीमा योजना',
    category: 'Insurance',
    subCategory: 'Life Insurance',
    shortDesc: '₹2,00,000 life insurance death cover for only ₹436/year auto-debited from bank/post office account.',
    overview: 'PMJJBY offers renewable one-year life insurance coverage of ₹2 Lakhs in case of death due to any cause (natural, illness, or accident) to savings bank or post office account holders aged 18 to 50 years.',
    keyBenefit: '₹2,00,000 death benefit paid to nominee upon demise of the insured person.',
    eligibility: 'Any individual with a savings bank account or IPPB post office account.',
    ageLimit: '18 to 50 years (Coverage continues up to age 55 provided annual renewal is active).',
    premiumOrDeposit: '₹436 per annum (Auto-debited between 25th May to 31st May).',
    maximumBenefit: '₹2,00,000 lump-sum payout to nominee.',
    taxBenefit: 'Premium eligible for tax deduction under Section 80C, proceeds tax-free under Section 10(10D).',
    howToApply: [
      'Visit your bank branch, Post Office, or net banking / mobile banking app (SBI YONO, PNB One, HDFC, BoB, etc.).',
      'Select Government Social Security Schemes -> PMJJBY Enrollment.',
      'Provide Nominee details and authorize auto-debit of ₹436/year.',
      'Receive Acknowledgement Slip & Policy Certificate within 24 hours.'
    ],
    requiredDocuments: ['Bank / Post Office Savings Account', 'Aadhaar Card', 'Nominee Aadhaar & Bank Details'],
    officialPortalUrl: 'https://jansuraksha.gov.in',
    helplineNumber: '1800-180-1111 / 1800-110-001',
    searchKeywords: ['pmjjby life insurance', 'pradhan mantri jeevan jyoti bima yojana 436', 'pmjjby claim form pdf', 'pmjjby sbi online apply', 'life insurance 2 lakh 436 rupees'],
    popularTag: 'Best Affordable Life Cover',
    faqList: [
      {
        question: 'Does PMJJBY cover death due to disease or Covid-19?',
        answer: 'Yes, PMJJBY covers death due to ANY reason including heart attack, illness, natural causes, accidents, and pandemic diseases.'
      },
      {
        question: 'How does the nominee claim PMJJBY ₹2 Lakhs?',
        answer: 'The nominee must submit the Death Certificate, Claim Form, deceased\'s Aadhaar, and nominee bank passbook copy to the bank branch where the policy was active. Settlement occurs within 30 days.'
      }
    ]
  },

  // 3. PMSBY
  {
    id: 'pmsby-accidental-insurance',
    title: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
    hindiTitle: 'प्रधानमंत्री सुरक्षा बीमा योजना',
    category: 'Insurance',
    subCategory: 'Accident & Disability Insurance',
    shortDesc: '₹2,00,000 accidental death & permanent disability insurance cover for just ₹20/year.',
    overview: 'PMSBY is India\'s lowest-cost accidental insurance scheme, providing ₹2 Lakhs in case of accidental death or permanent total disability, and ₹1 Lakh for permanent partial disability at an ultra-low premium of ₹20 per year.',
    keyBenefit: '₹2,00,000 on accidental death or total loss of both eyes/limbs; ₹1,00,000 on loss of one eye/limb.',
    eligibility: 'Any individual with a savings bank account or India Post Payments Bank (IPPB) account.',
    ageLimit: '18 to 70 years.',
    premiumOrDeposit: '₹20 per year (Auto-debited from bank account annually in May/June).',
    maximumBenefit: '₹2,00,000.',
    howToApply: [
      'Log into Net Banking / Mobile Banking app or visit your home bank / post office branch.',
      'Enable PMSBY under Social Security Insurance Tab.',
      'Provide Nominee details and agree to the auto-debit consent.',
      'Policy certificate is generated immediately.'
    ],
    requiredDocuments: ['Bank Savings Account', 'Aadhaar Card', 'Nominee Details'],
    officialPortalUrl: 'https://jansuraksha.gov.in',
    helplineNumber: '1800-180-1111',
    searchKeywords: ['pmsby accident insurance 20 rupees', 'pradhan mantri suraksha bima yojana apply', 'pmsby claim process', 'sbi pmsby apply online'],
    popularTag: 'Only ₹20 / Year',
    faqList: [
      {
        question: 'Does PMSBY cover road and railway accidents?',
        answer: 'Yes, PMSBY covers all accidental events including road crashes, train accidents, snake bites, drowning, electrocution, fall from height, and accidental injuries.'
      }
    ]
  },

  // 4. PM Fasal Bima Yojana (PMFBY)
  {
    id: 'pmfby-crop-insurance',
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    hindiTitle: 'प्रधानमंत्री फसल बीमा योजना',
    category: 'Insurance',
    subCategory: 'Agriculture & Crop Insurance',
    shortDesc: 'Comprehensive crop loss insurance against drought, floods, hail, unseasonal rain & pest attacks.',
    overview: 'PMFBY provides comprehensive risk insurance coverage to farmers from pre-sowing to post-harvest losses due to non-preventable natural risks like drought, dry spells, floods, inundation, pests, diseases, landslides, and hailstorms.',
    keyBenefit: 'Up to 100% sum insured compensation credited directly to farmer\'s bank account upon crop damage.',
    eligibility: 'All farmers growing notified Kharif, Rabi, and Commercial/Horticultural crops (Loanee & Non-Loanee).',
    ageLimit: '18+ years (All landholding and tenant farmers).',
    premiumOrDeposit: 'Only 2% for Kharif crops, 1.5% for Rabi crops, and 5% for Annual Commercial/Horticulture crops.',
    maximumBenefit: 'Full crop valuation sum insured per acre/hectare as notified by State Agriculture Dept.',
    howToApply: [
      'Visit the PMFBY official portal (pmfby.gov.in) or nearest CSC Centre / Bank branch.',
      'Select Farmer Corner -> Apply for Crop Insurance as Farmer.',
      'Upload Land LPC / RoR / Khasra Khatauni, Sowing Certificate, and Bank Passbook copy.',
      'Pay the subsidized farmer share (1.5% to 2%) online and download Insurance Policy Receipt.'
    ],
    requiredDocuments: ['Aadhaar Card', 'Land Record (LPC/Khata/Khesra)', 'Sowing Certificate / Patwari Report', 'Bank Account Passbook'],
    officialPortalUrl: 'https://pmfby.gov.in',
    helplineNumber: '14447 / 011-23382012',
    searchKeywords: ['pm fasal bima yojana apply', 'pmfby claim status online', 'bihar fasal sahayata yojana', 'crop insurance claim bihar kisan', 'pmfby helpline number'],
    popularTag: 'Farmer Crop Protection',
    faqList: [
      {
        question: 'How soon should crop damage be reported under PMFBY?',
        answer: 'Localized calamities (like hailstorm, localized waterlogging, landslide) must be reported within 72 hours via Crop Insurance App or toll-free number 14447.'
      }
    ]
  },

  // 5. Atal Pension Yojana (APY)
  {
    id: 'atal-pension-yojana-apy',
    title: 'Atal Pension Yojana (APY)',
    hindiTitle: 'अटल पेंशन योजना',
    category: 'Pension & Savings',
    subCategory: 'Guaranteed Govt Pension',
    shortDesc: 'Guaranteed lifelong monthly pension of ₹1,000 to ₹5,000 after age 60 with spouse pension & return of corpus to nominee.',
    overview: 'Administered by PFRDA under the Ministry of Finance, APY is India\'s premier guaranteed pension scheme for unorganized sector workers and citizens. Depending on your joining age (18 to 40 years) and chosen pension slab (₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000/month), you contribute a small monthly amount until age 60, after which guaranteed pension is paid for life.',
    keyBenefit: 'Guaranteed ₹1,000 to ₹5,000/month for lifetime to subscriber, then same pension to spouse, and entire corpus (up to ₹8.5 Lakhs) returned to nominee.',
    eligibility: 'All Indian citizens with a savings bank/post office account who are NOT income-tax payers.',
    ageLimit: '18 to 40 years.',
    premiumOrDeposit: '₹42/month (for ₹1k pension at age 18) up to ₹1,454/month (for ₹5k pension at age 40).',
    maximumBenefit: 'Lifelong monthly pension up to ₹5,000/month (₹60,000/year) + return of ₹8.5 Lakhs corpus to children.',
    taxBenefit: 'Additional tax deduction under Section 80CCD(1B) up to ₹50,000.',
    howToApply: [
      'Visit your Bank branch or Post Office with Aadhaar & Savings Passbook.',
      'Or open online via Internet Banking (SBI, HDFC, ICICI, PNB, Canara) under Pension/APY tab.',
      'Choose monthly pension amount (₹1,000 to ₹5,000) and contribution frequency (Monthly/Quarterly).',
      'Authorize auto-debit and receive PRAN (Permanent Retirement Account Number).'
    ],
    requiredDocuments: ['Aadhaar Card', 'Savings Bank Account with active Auto-Debit', 'Nominee Aadhaar'],
    officialPortalUrl: 'https://npscra.nsdl.co.in/nsdl-atal-pension-yojana.php',
    helplineNumber: '1800-110-069',
    searchKeywords: ['atal pension yojana chart 2026', 'apy chart age wise monthly contribution', 'atal pension yojana online apply', 'apy 5000 pension calculator', 'apy status check by pran'],
    popularTag: 'Guaranteed 60+ Pension',
    faqList: [
      {
        question: 'What happens to APY after the death of the pensioner?',
        answer: 'Upon the subscriber\'s demise, the exact same monthly pension is paid to the spouse for their entire lifetime. Upon spouse\'s demise, the entire accumulated corpus (up to ₹8.5 Lakhs) is transferred to the nominee.'
      }
    ]
  },

  // 6. Public Provident Fund (PPF)
  {
    id: 'public-provident-fund-ppf',
    title: 'Public Provident Fund (PPF)',
    hindiTitle: 'पब्लिक प्रॉविडेंट फंड (PPF)',
    category: 'Pension & Savings',
    subCategory: 'Long Term Safe Wealth & Tax Saver',
    shortDesc: '7.1% guaranteed sovereign interest rate with 100% EEE tax-free status and ₹1.5 Lakh Section 80C exemption.',
    overview: 'Public Provident Fund is one of India\'s most trusted 15-year government-backed savings instruments offering sovereign capital safety, compounding interest (currently 7.1% p.a.), loan facilities, and complete Exempt-Exempt-Exempt (EEE) tax benefits.',
    keyBenefit: '7.1% tax-free annual compounded interest with complete sovereign capital protection.',
    eligibility: 'All resident Indian individuals (can also be opened in the name of a minor by parent).',
    ageLimit: 'No age limit.',
    premiumOrDeposit: 'Min ₹500 to Max ₹1,50,000 per financial year.',
    maximumBenefit: 'Maturity amount in Crores over long term compounding with 5-year block extensions.',
    interestRate: '7.1% p.a. (Compounded Annually)',
    lockInPeriod: '15 Years (Partial withdrawal allowed from 7th year; loan facility from 3rd year).',
    taxBenefit: 'Triple EEE Tax Exemption: Investment is tax-exempt under 80C, interest earned is 100% tax-free, maturity amount is 100% tax-free.',
    howToApply: [
      'Open instantly via Net Banking (SBI, HDFC, ICICI, PNB, Axis, etc.) in under 2 minutes.',
      'Or visit nearest Head Post Office / Bank branch with PAN and Aadhaar Card.',
      'Deposit minimum ₹500 to activate the PPF account.',
      'Set up standing instructions for monthly/annual auto-deposit before the 5th of each month to maximize interest.'
    ],
    requiredDocuments: ['Aadhaar Card', 'PAN Card', 'Passport size photo', 'Savings Bank Account'],
    officialPortalUrl: 'https://www.indiapost.gov.in',
    helplineNumber: '1800-266-6868',
    searchKeywords: ['ppf calculator 15 years', 'ppf interest rate 2026', 'sbi ppf account opening online', 'post office ppf interest rate', 'ppf maturity calculator 1.5 lakh per year'],
    popularTag: '100% Tax Free EEE',
    faqList: [
      {
        question: 'Can PPF account be extended after 15 years?',
        answer: 'Yes! You can extend your PPF account in blocks of 5 years indefinitely, with or without fresh contributions, while continuing to earn tax-free interest.'
      }
    ]
  },

  // 7. Sukanya Samriddhi Yojana (SSY)
  {
    id: 'sukanya-samriddhi-yojana-ssy',
    title: 'Sukanya Samriddhi Yojana (SSY)',
    hindiTitle: 'सुकन्या समृद्धि योजना',
    category: 'Pension & Savings',
    subCategory: 'Girl Child Higher Education & Marriage',
    shortDesc: '8.2% highest government guaranteed interest rate for girl child up to age 10 with full EEE tax exemption.',
    overview: 'Launched under Beti Bachao Beti Padhao campaign, SSY offers the highest guaranteed interest rate (8.2% p.a.) among all fixed-income government savings schemes, created specifically to build a massive financial fund for girl child education and marriage.',
    keyBenefit: '8.2% annual compounded interest, full EEE tax exemption, and dedicated fund maturity upon girl turning 21.',
    eligibility: 'Parents or legal guardians of a girl child aged from birth up to 10 years (maximum 2 girls per family).',
    ageLimit: 'Girl child up to 10 years old.',
    premiumOrDeposit: 'Min ₹250 to Max ₹1,50,000 per financial year (Deposit for 15 years, matures in 21 years).',
    maximumBenefit: 'A deposit of ₹1.5 Lakh/year creates a maturity corpus of approx. ₹70 Lakhs+ tax-free.',
    interestRate: '8.2% p.a. (Highest Govt Savings Rate)',
    lockInPeriod: 'Matures 21 years from account opening (50% withdrawal allowed after girl reaches 18 or 10th pass for higher education).',
    taxBenefit: 'Complete EEE (Exempt-Exempt-Exempt) tax exemption under Section 80C.',
    howToApply: [
      'Visit any Post Office or authorized commercial bank (SBI, PNB, BoB, Canara, HDFC, Axis, ICICI).',
      'Submit SSY Account Opening Form along with Girl Child\'s Birth Certificate.',
      'Submit Parent/Guardian Aadhaar and PAN Card.',
      'Deposit initial amount (min ₹250) to receive SSY Passbook.'
    ],
    requiredDocuments: ['Girl Child Birth Certificate', 'Parent / Guardian Aadhaar & PAN Card', 'Address Proof', 'Passport Photos'],
    officialPortalUrl: 'https://www.indiapost.gov.in',
    helplineNumber: '1800-266-6868',
    searchKeywords: ['sukanya samriddhi yojana calculator', 'ssy interest rate 2026', 'sukanya yojana 250 deposit benefits', 'post office sukanya account opening', 'ssy maturity amount calculation'],
    popularTag: 'Highest 8.2% Interest',
    faqList: [
      {
        question: 'Can money be withdrawn from SSY for college admission?',
        answer: 'Yes! Once the girl turns 18 or passes Class 10, up to 50% of the balance can be withdrawn to pay confirmed college fees.'
      }
    ]
  },

  // 8. Bihar Student Credit Card (MNSSBY)
  {
    id: 'bihar-student-credit-card',
    title: 'Bihar Student Credit Card Scheme (MNSSBY)',
    hindiTitle: 'बिहार स्टूडेंट क्रेडिट कार्ड योजना (MNSSBY)',
    category: 'Loans & Subsidies',
    subCategory: 'Higher Education Loan',
    shortDesc: '₹4,00,000 subsidized education loan for B.Tech, MBBS, BCA, BBA, Polytechnic, Nursing & 40+ degree courses.',
    overview: 'Under the Bihar government\'s Seven Resolves (Saat Nischay), the Bihar Student Credit Card scheme provides up to ₹4 Lakhs education loan to 12th pass students for higher education tuition fees, hostel, laptop, and living expenses at an ultra-low simple interest rate (1% for girls/divyang/transgender, 4% for boys) with repayment starting only 1 year after course completion or getting a job.',
    keyBenefit: '₹4,00,000 education loan guarantee with no collateral, zero mortgage, and morotorium period.',
    eligibility: '12th pass students who are permanent residents of Bihar, enrolled in recognized colleges/universities.',
    ageLimit: 'Up to 25 years (Up to 30 years for Post-Graduate degrees).',
    interestRate: '1% for Girls, Divyang & Transgender; 4% for Male candidates (Simple Interest).',
    maximumBenefit: '₹4,00,000 covering Tuition Fees, Hostel, Books, Laptop, and Stationery.',
    howToApply: [
      'Register online at the official portal (7nishchay-yuvaupmission.bihar.gov.in) or mobile app.',
      'Fill Common Application Form (CAF) with college admission allotment letter.',
      'Book appointment and visit District Registration and Counseling Centre (DRCC) with original documents.',
      'DRCC verifies documents and Bihar State Education Finance Corporation (BSEFC) disburses funds directly to college.'
    ],
    requiredDocuments: ['10th & 12th Marksheet & Certificate', 'College Admission Offer Letter & Fee Structure', 'Aadhaar Card of Student & Co-Applicant Parent', 'Residential Certificate (Niwas Praman Patra)', 'Bank Account Passbook with IFSC'],
    officialPortalUrl: 'https://www.7nishchay-yuvaupmission.bihar.gov.in',
    helplineNumber: '1800-3456-444 (Toll-Free)',
    searchKeywords: ['bihar student credit card online apply 2026', 'drcc student credit card status', 'mnssby 4 lakh loan process', 'bihar education loan interest rate for girls', 'approved college list for bihar student credit card'],
    popularTag: 'Saat Nischay 1% - 4% Loan',
    faqList: [
      {
        question: 'When does the repayment of Bihar Student Credit Card loan start?',
        answer: 'Repayment starts 1 year after completing the course OR 6 months after securing employment, whichever is earlier. No EMI is charged during study duration.'
      }
    ]
  },

  // 9. PM Mudra Yojana
  {
    id: 'pm-mudra-loan-yojana',
    title: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    hindiTitle: 'प्रधानमंत्री मुद्रा ऋण योजना',
    category: 'Loans & Subsidies',
    subCategory: 'Business & Entrepreneurship Loan',
    shortDesc: 'Collateral-free business loans up to ₹20,00,000 under Shishu, Kishore, Tarun & Tarun Plus categories.',
    overview: 'PMMY enables micro and small business owners, shopkeepers, service providers, artisans, and youth entrepreneurs to secure collateral-free loans from public sector banks, RRBs, NBFCs, and MFIs without mortgaging property.',
    keyBenefit: 'Collateral-free business loan from ₹50,000 up to ₹20,00,000 with flexible repayment up to 5-7 years.',
    eligibility: 'Any Indian citizen involved in non-farm income generating micro enterprises (Manufacturing, Trading, Shopkeeping, Food Services, Agriculture allied activities).',
    ageLimit: '18 to 65 years.',
    interestRate: '8.5% to 12% p.a. (Bank linked competitive rates, zero processing fee for Shishu loans).',
    maximumBenefit: 'Shishu (Up to ₹50k), Kishore (₹50k - ₹5L), Tarun (₹5L - ₹10L), Tarun Plus (₹10L - ₹20L).',
    howToApply: [
      'Visit the JanSamarth Portal (jansamarth.in) or nearest public/private bank branch.',
      'Choose MUDRA Loan category based on requirement.',
      'Submit Business Plan / Project Report, Quotation of Machinery / Inventory, and KYC docs.',
      'Loan is sanctioned and credited into Mudra Debit Card / Current Account.'
    ],
    requiredDocuments: ['Aadhaar & PAN Card', 'Business Proof / Udyam Aadhaar Registration', 'Bank Statement of last 6 months', 'Machinery / Stock Quotation'],
    officialPortalUrl: 'https://www.mudra.org.in',
    helplineNumber: '1800-180-1111 / 1800-11-0001',
    searchKeywords: ['pm mudra loan online apply 50000', 'mudra loan interest rate 2026', 'jansamarth mudra loan sbi', 'mudra loan eligibility without security', 'shishu mudra loan 50000 apply online'],
    popularTag: 'Zero Collateral Loan',
    faqList: [
      {
        question: 'Is any property guarantee or guarantor required for Mudra Loan?',
        answer: 'No! Mudra loans are 100% collateral-free. You do not need to pledge land, gold, or property.'
      }
    ]
  },

  // 10. PM SVANidhi
  {
    id: 'pm-svanidhi-microcredit',
    title: 'PM Street Vendor\'s AtmaNirbhar Nidhi (PM SVANidhi)',
    hindiTitle: 'पीएम स्वनिधि योजना (स्ट्रीट वेंडर्स)',
    category: 'Loans & Subsidies',
    subCategory: 'Micro-Credit for Small Vendors',
    shortDesc: 'Collateral-free working capital loan of ₹10,000 -> ₹20,000 -> ₹50,000 with 7% interest subsidy & cashback.',
    overview: 'PM SVANidhi provides affordable working capital micro-loans to urban & peri-urban street vendors, fruit/vegetable sellers, tea stalls, and hawkers to rebuild livelihoods, with a 7% interest subsidy credited directly to bank accounts and up to ₹1,200/year cashback on digital payments.',
    keyBenefit: 'Step-by-step credit limit enhancement: 1st Tranche: ₹10,000 -> 2nd Tranche: ₹20,000 -> 3rd Tranche: ₹50,000 with 7% interest subsidy.',
    eligibility: 'Street vendors and hawkers with Certificate of Vending (CoV) / Identity Card issued by Urban Local Bodies (ULBs).',
    ageLimit: '18+ years.',
    premiumOrDeposit: 'Zero Security / Collateral Free.',
    maximumBenefit: 'Up to ₹50,000 working capital loan.',
    howToApply: [
      'Apply online on pmsvanidhi.mohua.gov.in or through nearest CSC / Nagar Nigam office.',
      'Enter Aadhaar linked mobile number and verify OTP.',
      'Select your Urban Local Body (ULB) and Vending Certificate details.',
      'Choose preferred bank for disbursement.'
    ],
    requiredDocuments: ['Aadhaar Card', 'Vending Certificate / Nagar Palika Survey Letter', 'Bank Passbook'],
    officialPortalUrl: 'https://pmsvanidhi.mohua.gov.in',
    helplineNumber: '1800-11-1979',
    searchKeywords: ['pm svanidhi loan 10000 apply online', 'pm svanidhi second tranche 20000', 'pm svanidhi interest subsidy status', 'vendor loan sbi online'],
    popularTag: '7% Interest Subsidy',
    faqList: [
      {
        question: 'How do vendors get 7% interest subsidy in PM SVANidhi?',
        answer: 'Upon timely monthly EMI repayment, the 7% per annum interest subsidy is calculated quarterly and directly credited into the vendor\'s bank account via DBT.'
      }
    ]
  },

  // 11. National Pension System (NPS)
  {
    id: 'national-pension-system-nps',
    title: 'National Pension System (NPS)',
    hindiTitle: 'राष्ट्रीय पेंशन प्रणाली (NPS)',
    category: 'Pension & Savings',
    subCategory: 'Market-Linked Pension & Wealth',
    shortDesc: 'Market-linked high return pension fund (9-12% CAGR) with exclusive ₹50,000 extra tax saving under 80CCD(1B).',
    overview: 'NPS is a voluntary, long-term retirement savings scheme designed to enable systematic savings during working life. Regulated by PFRDA, it offers low-cost fund management, choice of equity & debt allocation, and tax deductions up to ₹2 Lakhs per year.',
    keyBenefit: '60% lump sum corpus 100% tax-free at age 60 + 40% converted into guaranteed monthly pension annuity.',
    eligibility: 'All Indian citizens aged 18 to 70 years (Salaried, Self-Employed & NRI).',
    ageLimit: '18 to 70 years.',
    premiumOrDeposit: 'Minimum ₹500 for Tier-I account per contribution (Min ₹1,000 per financial year).',
    maximumBenefit: 'Substantial retirement corpus built through market compounding with low fund management cost (0.09%).',
    interestRate: '9.5% to 12.5% Historical Annual Returns (Market linked across Equity & Corporate Bonds).',
    taxBenefit: 'Up to ₹1.5 Lakh under 80CCD(1) + Additional ₹50,000 under 80CCD(1B) = Total ₹2,00,000 tax deduction.',
    howToApply: [
      'Visit enps.nsdl.com or your Net Banking portal.',
      'Complete Aadhaar e-KYC or PAN registration.',
      'Choose Pension Fund Manager (SBI, LIC, HDFC, ICICI, UTI) and Investment Choice (Auto Choice / Active Choice).',
      'Get instant Permanent Retirement Account Number (PRAN) Card.'
    ],
    requiredDocuments: ['Aadhaar Card', 'PAN Card', 'Bank Passbook / Cheque Leaf', 'Scanned Signature'],
    officialPortalUrl: 'https://enps.nsdl.com',
    helplineNumber: '1800-222-080',
    searchKeywords: ['nps calculator 2026', 'national pension system tax saving 80ccd 1b', 'enps nsdl login pran', 'nps tier 1 vs tier 2', 'nps annuity calculator'],
    popularTag: 'Extra ₹50k Tax Save',
    faqList: [
      {
        question: 'Is NPS withdrawal at age 60 taxable?',
        answer: 'No! 60% of your accumulated corpus can be withdrawn as a 100% tax-free lump sum. The remaining 40% is converted into regular monthly annuity pension.'
      }
    ]
  },

  // 12. Post Office Monthly Income Scheme (POMIS)
  {
    id: 'post-office-mis-scheme',
    title: 'Post Office Monthly Income Scheme (POMIS)',
    hindiTitle: 'डाकघर मासिक आय योजना (POMIS)',
    category: 'Pension & Savings',
    subCategory: 'Guaranteed Monthly Income',
    shortDesc: '7.4% sovereign interest rate paid as guaranteed monthly cash income directly to your bank account.',
    overview: 'POMIS is a 5-year fixed deposit scheme offered by India Post that provides fixed monthly interest income to investors, ideal for retirees, homemakers, and senior citizens seeking predictable regular cash flows with zero market risk.',
    keyBenefit: 'Guaranteed 7.4% annual interest credited every single month directly into savings account.',
    eligibility: 'All resident Indian adults (Single or Joint account up to 3 adults).',
    ageLimit: '18+ years (Can also be opened for minors aged 10+).',
    premiumOrDeposit: 'Single Account: Min ₹1,000 to Max ₹9,00,000. Joint Account: Max ₹15,00,000.',
    maximumBenefit: '₹9,250 guaranteed monthly pension income on maximum ₹15 Lakh joint deposit for 5 years.',
    interestRate: '7.4% p.a. (Paid Monthly)',
    lockInPeriod: '5 Years (Premature withdrawal allowed after 1 year with nominal 1-2% deduction).',
    howToApply: [
      'Visit any Post Office branch with savings account.',
      'Fill POMIS Application Form and attach Aadhaar and PAN.',
      'Deposit funds via Cheque / Cash.',
      'Receive POMIS Passbook with monthly payout schedule.'
    ],
    requiredDocuments: ['Aadhaar Card', 'PAN Card', 'Post Office Savings Passbook', '2 Passport Photos'],
    officialPortalUrl: 'https://www.indiapost.gov.in',
    helplineNumber: '1800-266-6868',
    searchKeywords: ['post office monthly income scheme calculator 2026', 'pomis 9 lakh monthly interest', 'pomis interest rate 7.4', 'post office mis joint account 15 lakh payout'],
    popularTag: 'Monthly Cash Payout',
    faqList: [
      {
        question: 'How much monthly income do I get on ₹9 Lakh deposit in POMIS?',
        answer: 'At 7.4% annual interest rate, a ₹9,00,000 single account deposit earns exactly ₹5,550 every month for 5 years (Total ₹3,33,000 interest payout).'
      }
    ]
  }
];

export interface FinancialCalculatorInfo {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  iconName: string;
}

export const FINANCIAL_CALCULATORS_LIST: FinancialCalculatorInfo[] = [
  {
    id: 'loan-emi',
    name: 'Loan EMI Calculator',
    category: 'Loans',
    shortDesc: 'Calculate monthly EMI, total interest, and full repayment schedule for Home, Education, Car & Personal loans.',
    iconName: 'Landmark'
  },
  {
    id: 'sip-wealth',
    name: 'SIP Wealth Calculator',
    category: 'Investments',
    shortDesc: 'Project wealth creation, compounding returns, and maturity corpus of Systematic Investment Plans.',
    iconName: 'TrendingUp'
  },
  {
    id: 'ppf-ssy',
    name: 'PPF & Sukanya Calculator',
    category: 'Govt Savings',
    shortDesc: 'Calculate 15-21 year maturity value for Public Provident Fund (7.1%) and Sukanya Samriddhi (8.2%).',
    iconName: 'Sparkles'
  },
  {
    id: 'income-tax',
    name: 'Income Tax Calculator (FY 2024-26)',
    category: 'Tax Planning',
    shortDesc: 'Compare New Tax Regime vs Old Tax Regime, Section 87A rebate & 80C/80D tax deductions.',
    iconName: 'Calculator'
  },
  {
    id: 'apy-pension',
    name: 'Atal Pension (APY) Calculator',
    category: 'Pension',
    shortDesc: 'Find exact monthly contribution based on your current age for ₹1,000 to ₹5,000 guaranteed pension.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'fd-rd',
    name: 'FD & RD Interest Calculator',
    category: 'Banking',
    shortDesc: 'Compute maturity returns on Fixed and Recurring Deposits across Post Office & Public Banks.',
    iconName: 'Coins'
  }
];

export const GOOGLE_FINANCE_INSURANCE_FAQS = [
  {
    question: 'Which government health insurance provides ₹5 Lakhs free hospitalization in India?',
    answer: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY) provides up to ₹5,00,000 per family per year for secondary and tertiary care hospitalization in 27,000+ empaneled private and public hospitals completely cashless.'
  },
  {
    question: 'How can Bihar students get up to ₹4 Lakhs education loan at 1% interest?',
    answer: 'Under the Bihar Student Credit Card Scheme (MNSSBY / Saat Nischay), students can apply online on the MNSSBY portal to get up to ₹4,00,000 education loan for technical and professional courses at 1% interest for girls/divyang and 4% for boys with morotorium period.'
  },
  {
    question: 'What is the difference between PMJJBY and PMSBY?',
    answer: 'PMJJBY (Pradhan Mantri Jeevan Jyoti Bima Yojana) is a ₹2 Lakh life insurance policy covering death due to any reason at ₹436/year. PMSBY (Pradhan Mantri Suraksha Bima Yojana) is an accidental death & disability insurance policy covering accidents at ₹20/year.'
  },
  {
    question: 'Which government savings scheme offers the highest interest rate in 2026?',
    answer: 'Sukanya Samriddhi Yojana (SSY) offers the highest guaranteed interest rate of 8.2% per annum for a girl child with 100% tax-free EEE status, followed by Senior Citizen Savings Scheme (SCSS) at 8.2% and PPF at 7.1%.'
  },
  {
    question: 'How do small business owners and shopkeepers get collateral-free Mudra Loans?',
    answer: 'Entrepreneurs can apply under Pradhan Mantri MUDRA Yojana (PMMY) on the JanSamarth portal or nearest bank branch to get collateral-free business loans up to ₹50,000 (Shishu), up to ₹5 Lakh (Kishore), and up to ₹20 Lakh (Tarun).'
  }
];
