export interface FinanceScheme {
  id: string;
  title: string;
  hindiTitle?: string;
  category: 'Insurance' | 'Pension & Savings' | 'Loans & Subsidies' | 'Tax & Investment' | 'Credit Cards & Banking' | 'Solar & Green Energy';
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

export interface CreditCardItem {
  id: string;
  cardName: string;
  issuer: string;
  joiningFee: string;
  annualFee: string;
  feeWaiverCondition: string;
  cardType: 'Cashback & Rewards' | 'Lifetime Free (LTF)' | 'RuPay UPI' | 'Shopping & Travel' | 'Fuel & Utility';
  rating: number;
  bestFor: string;
  keyPerks: string[];
  welcomeBenefit: string;
  rewardRate: string;
  applyUrl: string;
  popularBadge?: string;
}

export interface LoanComparisonItem {
  id: string;
  bankName: string;
  loanType: 'Personal Loan' | 'Home Loan' | 'Education Loan' | 'Business & Mudra' | 'Gold Loan';
  interestRateRange: string;
  maxAmount: string;
  tenureRange: string;
  processingFee: string;
  minIncome: string;
  cibilRequirement: string;
  features: string[];
  applyUrl: string;
  badge?: string;
}

export interface InsuranceComparisonItem {
  id: string;
  companyName: string;
  planName: string;
  insuranceType: 'Term Life Insurance' | 'Health & Medical Insurance' | 'Vehicle & Car Insurance';
  sumInsuredRange: string;
  startingPremiumMonthly: string;
  claimSettlementRatio: string;
  networkHospitalsOrGarages: string;
  keyHighlights: string[];
  taxExemption: string;
  applyUrl: string;
  recommendedTag?: string;
}

export interface BankFdRateItem {
  bankName: string;
  type: 'Public Bank' | 'Private Bank' | 'Small Finance Bank' | 'Post Office';
  generalRateMax: string;
  seniorCitizenRateMax: string;
  specialTenure: string;
  dicgcInsured: boolean;
  applyUrl: string;
}

export interface HighRpmGuideArticle {
  id: string;
  title: string;
  hindiTitle?: string;
  readTime: string;
  category: string;
  highCpcKeywords: string[];
  summary: string;
  sections: {
    heading: string;
    body: string;
    tableData?: { headers: string[]; rows: string[][] };
    bulletPoints?: string[];
  }[];
}

export const FINANCE_INSURANCE_SCHEMES: FinanceScheme[] = [
  // 1. Ayushman Bharat PM-JAY
  {
    id: 'ayushman-bharat-pmjay',
    title: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    hindiTitle: 'आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना',
    category: 'Insurance',
    subCategory: 'Health & Medical Insurance',
    shortDesc: '₹5,00,000 free annual cashless health insurance cover per family (Dedicated ₹10 Lakh for families with seniors 70+).',
    overview: 'Ayushman Bharat PM-JAY is the world\'s largest government-funded healthcare assurance scheme. It covers over 12 crore poor and vulnerable families (approx. 55 crore beneficiaries), providing up to ₹5 Lakhs per family per year for secondary and tertiary care hospitalization in empaneled private and public hospitals across India. With the new Vay Vandana expansion, all senior citizens aged 70+ get an exclusive additional ₹5 Lakh cover regardless of income.',
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

  // 2. PM Surya Ghar Muft Bijli Yojana (High Commercial Solar Subsidy)
  {
    id: 'pm-surya-ghar-muft-bijli',
    title: 'PM Surya Ghar: Muft Bijli Yojana (Rooftop Solar Subsidy)',
    hindiTitle: 'पीएम सूर्य घर: मुफ्त बिजली योजना (सोलर सब्सिडी)',
    category: 'Solar & Green Energy',
    subCategory: 'Rooftop Solar Direct DBT Subsidy',
    shortDesc: 'Get up to ₹78,000 direct bank subsidy to install rooftop solar panels and get 300 units of 100% free electricity monthly.',
    overview: 'Launched with a budget of ₹75,000 Crores, PM Surya Ghar Muft Bijli Yojana provides households across India with up to ₹78,000 direct bank transfer (DBT) subsidy to install residential rooftop solar plants. It reduces electricity bills to zero, allows selling surplus power back to the grid (Net Metering), and offers collateral-free solar loans at an ultra-low 7% interest rate.',
    keyBenefit: 'Direct Govt Subsidy: ₹30,000 for 1 kW, ₹60,000 for 2 kW, and ₹78,000 for 3 kW+ solar setups, saving up to ₹25,000+ yearly on electricity bills.',
    eligibility: 'Any Indian residential homeowner with suitable unshaded roof space and an active domestic electricity connection.',
    ageLimit: '18+ years (Homeowner).',
    premiumOrDeposit: 'Subsidized Solar Loan available from SBI/Canara/PNB at just 7% repo-linked interest with zero collateral.',
    maximumBenefit: '₹78,000 Cash Subsidy credited to Bank within 30 days of inspection + Lifetime 25-year free solar power.',
    howToApply: [
      'Register on pmsuryaghar.gov.in by selecting your State, Electricity Distribution Company (DISCOM), and Consumer Account Number.',
      'Apply for Rooftop Solar installation and choose registered local solar vendor/installer.',
      'Vendor installs solar panels, DISCOM installs Bi-directional Net Meter.',
      'Commissioning certificate is issued; submit bank account details on the portal to receive ₹78,000 subsidy within 30 days.'
    ],
    requiredDocuments: ['Electricity Bill (Latest Copy)', 'Aadhaar Card', 'Cancelled Cheque / Bank Passbook for DBT', 'Rooftop Ownership Proof / Tax Receipt'],
    officialPortalUrl: 'https://pmsuryaghar.gov.in',
    helplineNumber: '15555 / 1800-180-3333',
    searchKeywords: ['pm surya ghar muft bijli yojana apply online', 'solar rooftop subsidy 78000', 'pmsuryaghar gov in registration', 'solar panel subsidy bihar sbpdcl nbpdcl', 'free electricity solar loan 7 percent'],
    popularTag: '₹78,000 Direct Subsidy',
    faqList: [
      {
        question: 'How much roof area is required for a 3kW solar system?',
        answer: 'A 3kW rooftop solar setup requires approximately 300 sq.ft. of shadow-free rooftop area and generates about 12 to 15 units of electricity every day (360-450 units/month).'
      },
      {
        question: 'Can I get a loan to cover the remaining cost of rooftop solar?',
        answer: 'Yes! Major public sector banks like SBI, PNB, Bank of Baroda, and Canara Bank provide special collateral-free PM Surya Ghar Solar Loans up to ₹2,00,000 at a low 7% interest rate with up to 10-year repayment tenure.'
      }
    ]
  },

  // 3. PMJJBY
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

  // 4. PMSBY
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

  // 5. Bihar Student Credit Card (MNSSBY)
  {
    id: 'bihar-student-credit-card',
    title: 'Bihar Student Credit Card Scheme (MNSSBY)',
    hindiTitle: 'बिहार स्टूडेंट क्रेडिट कार्ड योजना (MNSSBY)',
    category: 'Loans & Subsidies',
    subCategory: 'Higher Education Loan @ 1%',
    shortDesc: '₹4,00,000 education loan for B.Tech, MBBS, BCA, BBA, Polytechnic, Nursing & 40+ degree courses at 1% for girls/divyang and 4% for boys.',
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

  // 6. PM Mudra Yojana
  {
    id: 'pm-mudra-loan-yojana',
    title: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    hindiTitle: 'प्रधानमंत्री मुद्रा ऋण योजना',
    category: 'Loans & Subsidies',
    subCategory: 'Business & Entrepreneurship Loan',
    shortDesc: 'Collateral-free business loans up to ₹20,00,000 under Shishu, Kishore, Tarun & Tarun Plus categories.',
    overview: 'PMMY enables micro and small business owners, shopkeepers, service providers, artisans, and youth entrepreneurs to secure collateral-free loans from public sector banks, RRBs, NBFCs, and MFIs without mortgaging property. The budget 2024-2026 enhanced the maximum limit to ₹20 Lakhs under the Tarun Plus category.',
    keyBenefit: 'Collateral-free business loan from ₹50,000 up to ₹20,00,000 with flexible repayment up to 5-7 years.',
    eligibility: 'Any Indian citizen involved in non-farm income generating micro enterprises (Manufacturing, Trading, Shopkeeping, Food Services, Agriculture allied activities).',
    ageLimit: '18 to 65 years.',
    interestRate: '8.5% to 11.5% p.a. (Bank linked competitive rates, zero processing fee for Shishu loans).',
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

  // 8. Public Provident Fund (PPF)
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

  // 9. Senior Citizen Savings Scheme (SCSS)
  {
    id: 'senior-citizen-savings-scheme-scss',
    title: 'Senior Citizen Savings Scheme (SCSS)',
    hindiTitle: 'वरिष्ठ नागरिक बचत योजना (SCSS)',
    category: 'Pension & Savings',
    subCategory: 'High Yield Guaranteed Retirement Income',
    shortDesc: '8.2% highest sovereign quarterly interest payout for seniors aged 60+ on deposits up to ₹30 Lakhs.',
    overview: 'SCSS is a premier government-backed fixed income scheme for citizens aged 60 and above, offering an unbeatable 8.2% annual interest paid quarterly directly into the retiree\'s savings account. Account holders can deposit up to ₹30 Lakhs with 100% sovereign guarantee by the Government of India.',
    keyBenefit: 'Guaranteed ₹61,500 quarterly income (₹2,46,000/year) on ₹30 Lakh maximum deposit at 8.2% p.a.',
    eligibility: 'Individuals aged 60+ years (or 55+ for superannuated/VRS retirees).',
    ageLimit: '60+ years.',
    premiumOrDeposit: 'Min ₹1,000 to Max ₹30,00,000.',
    maximumBenefit: '₹30,00,000 deposit yields ₹2.46 Lakhs guaranteed annual income for 5 years.',
    interestRate: '8.2% p.a. (Paid Quarterly on 1st April, July, Oct, Jan)',
    lockInPeriod: '5 Years (Extendable by 3 years).',
    taxBenefit: 'Tax deduction under Section 80C up to ₹1.5 Lakhs.',
    howToApply: [
      'Visit Post Office or any Public/Private Sector Bank branch (SBI, PNB, HDFC, ICICI, etc.).',
      'Submit Form-A with Aadhaar, PAN, and Age/Retirement proof.',
      'Deposit funds via Cheque / Demand Draft.',
      'Link savings account for automatic quarterly interest credits.'
    ],
    requiredDocuments: ['Aadhaar Card', 'PAN Card', 'Retirement / Age Proof', 'Passport Photos'],
    officialPortalUrl: 'https://www.indiapost.gov.in',
    helplineNumber: '1800-266-6868',
    searchKeywords: ['scss interest rate 2026', 'senior citizen savings scheme 30 lakh interest payout', 'post office scss calculator', 'sbi senior citizen scheme 8.2 percent'],
    popularTag: '8.2% Quarterly Payout',
    faqList: [
      {
        question: 'Can a husband and wife both open separate SCSS accounts up to ₹30 Lakhs?',
        answer: 'Yes! Both spouses (if aged 60+) can open individual accounts or joint accounts, allowing a family to invest up to ₹60 Lakhs and earn ₹4.92 Lakhs guaranteed annual income.'
      }
    ]
  },

  // 10. Atal Pension Yojana (APY)
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

  // 11. PM Awas Yojana 2.0 (PMAY Urban/Gramin ₹2.5L Subsidy)
  {
    id: 'pm-awas-yojana-credit-subsidy',
    title: 'Pradhan Mantri Awas Yojana 2.0 (PMAY Urban & Gramin)',
    hindiTitle: 'प्रधानमंत्री आवास योजना 2.0 (होम लोन सब्सिडी)',
    category: 'Loans & Subsidies',
    subCategory: 'Home Loan Interest Subsidy & Pucca House Grant',
    shortDesc: 'Get up to ₹2,50,000 interest subsidy on Home Loans for first-time home buyers + ₹1.2 Lakh cash grant for rural pucca house.',
    overview: 'PMAY 2.0 aims to build 3 Crore additional houses across urban and rural India. Under the Credit Linked Subsidy Scheme (CLSS) component, middle-class (MIG) and lower-income (EWS/LIG) families purchasing or constructing their first pucca house receive up to ₹2.5 Lakhs interest subsidy on home loans with a tenure up to 20 years.',
    keyBenefit: 'Up to ₹2.5 Lakhs direct interest subsidy credited upfront to your home loan account, reducing monthly EMI.',
    eligibility: 'Families not owning a pucca house anywhere in India. Annual household income up to ₹3 Lakhs (EWS), ₹6 Lakhs (LIG), or ₹18 Lakhs (MIG).',
    ageLimit: '21 to 65 years.',
    interestRate: 'Home Loan interest subsidized by up to 6.5% under CLSS.',
    maximumBenefit: '₹2,50,000 Upfront Loan Subsidy + PMAY Gramin ₹1,20,000 direct assistance.',
    howToApply: [
      'Apply directly through your Home Loan lending bank (SBI, HDFC, PNB, ICICI, LIC Housing Finance).',
      'Select PMAY CLSS Subsidy option in the home loan application.',
      'Bank submits claim to Central Nodal Agencies (HUDCO / NHB).',
      'Approved subsidy amount is directly credited to reduce the outstanding loan principal.'
    ],
    requiredDocuments: ['Aadhaar Card of all family members', 'PAN Card', 'Income Certificate / ITR', 'Property Title Deed / Builder Agreement', 'Affidavit of No Pucca House'],
    officialPortalUrl: 'https://pmaymis.gov.in',
    helplineNumber: '011-23060484 / 1800-11-3377',
    searchKeywords: ['pm awas yojana 2.0 online apply', 'pmay home loan subsidy calculator 2026', 'pmay urban 2.5 lakh subsidy status', 'pmay list bihar check online', 'first home buyer subsidy sbi'],
    popularTag: '₹2.5L Home Loan Subsidy',
    faqList: [
      {
        question: 'How is the PMAY home loan subsidy credited?',
        answer: 'The Central Government credits the discounted subsidy amount directly into your loan account upfront, reducing the principal loan balance and lowering your monthly EMI permanently.'
      }
    ]
  },

  // 12. National Pension System (NPS)
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
  }
];

// --- HIGH RPM COMPARISON DATASETS ---

export const TOP_CREDIT_CARDS_DATA: CreditCardItem[] = [
  {
    id: 'sbi-cashback',
    cardName: 'SBI Cashback Credit Card',
    issuer: 'State Bank of India (SBI Card)',
    joiningFee: '₹999 + GST',
    annualFee: '₹999 + GST (Waived on ₹2 Lakh annual spends)',
    feeWaiverCondition: '₹2,00,000 yearly spends',
    cardType: 'Cashback & Rewards',
    rating: 4.9,
    bestFor: 'Universal 5% Online Shopping (Amazon, Flipkart, Swiggy, Zomato, Myntra, etc.)',
    keyPerks: [
      '5% Unlimited Cashback on ALL online purchases without merchant restrictions',
      '1% Cashback on offline retail spends',
      'Auto-credited directly to monthly credit card statement',
      '1% Fuel surcharge waiver across all petrol pumps'
    ],
    welcomeBenefit: '₹500 Gift Voucher on first transaction within 30 days',
    rewardRate: '5% Flat Online Cashback',
    applyUrl: 'https://www.sbicard.com',
    popularBadge: 'Highest 5% Online Cashback'
  },
  {
    id: 'amazon-pay-icici',
    cardName: 'Amazon Pay ICICI Credit Card',
    issuer: 'ICICI Bank',
    joiningFee: '₹0 (Lifetime Free - LTF)',
    annualFee: '₹0 (Lifetime Free - LTF)',
    feeWaiverCondition: '100% Free for Lifetime with Zero Conditions',
    cardType: 'Lifetime Free (LTF)',
    rating: 4.8,
    bestFor: 'Lifetime Free Card with 5% Cashback on Amazon & 2% on Utility Bills',
    keyPerks: [
      '5% Unlimited Cashback on Amazon India for Prime members (3% for non-prime)',
      '2% Cashback on 100+ Amazon Pay partner merchants (Flight, Recharges, Bill payments)',
      '1% Unlimited Cashback on all other dining and offline spends',
      'Zero joining fee & zero annual renewal fee forever'
    ],
    welcomeBenefit: 'Up to ₹2,500 Amazon Pay rewards upon approval',
    rewardRate: '5% Amazon + 2% Bill Pay',
    applyUrl: 'https://www.icicibank.com',
    popularBadge: 'Top Lifetime Free Card'
  },
  {
    id: 'hdfc-millennia',
    cardName: 'HDFC Millennia Credit Card',
    issuer: 'HDFC Bank',
    joiningFee: '₹1,000 + GST',
    annualFee: '₹1,000 + GST (Waived on ₹1 Lakh spends)',
    feeWaiverCondition: '₹1,00,000 annual spends',
    cardType: 'Shopping & Travel',
    rating: 4.7,
    bestFor: '5% Cashback on Amazon, Flipkart, Swiggy, Zomato, Uber, BookMyShow + Airport Lounge',
    keyPerks: [
      '5% Cashback on 10+ popular partner apps (Swiggy, Zomato, Uber, Flipkart, Tata Neu)',
      '1% Cashback on all other retail transactions and EMI spends',
      '4 Free Domestic Airport Lounge Access per calendar year (1 per quarter)',
      '₹1,000 Gift Voucher every quarter on ₹1 Lakh spends'
    ],
    welcomeBenefit: '1,000 CashPoints on fee payment',
    rewardRate: '5% Partner Apps + Lounge',
    applyUrl: 'https://www.hdfcbank.com',
    popularBadge: 'Best All-Rounder'
  },
  {
    id: 'axis-airtel',
    cardName: 'Airtel Axis Bank Credit Card',
    issuer: 'Axis Bank',
    joiningFee: '₹500 + GST',
    annualFee: '₹500 + GST (Waived on ₹2 Lakh spends)',
    feeWaiverCondition: '₹2,00,000 annual spends',
    cardType: 'Fuel & Utility',
    rating: 4.8,
    bestFor: '25% Cashback on Airtel Recharges & 10% on Electricity/Water/Gas Bills via Airtel Thanks',
    keyPerks: [
      '25% Cashback on Airtel Mobile, DTH, and Fiber broadband recharges',
      '10% Cashback on Electricity, Gas, and Water utility bill payments',
      '10% Cashback on Swiggy, Zomato, and BigBasket food/grocery delivery',
      'Complimentary Domestic Airport Lounge Access'
    ],
    welcomeBenefit: '₹500 Amazon Voucher on first 30 days active card swipe',
    rewardRate: '25% Airtel + 10% Utility',
    applyUrl: 'https://www.axisbank.com',
    popularBadge: '25% Utility Bills King'
  },
  {
    id: 'rupay-upi-card',
    cardName: 'PNB / HDFC RuPay Select UPI Credit Card',
    issuer: 'NPCI / RuPay Commercial Banks',
    joiningFee: '₹0 to ₹500',
    annualFee: '₹0 to ₹500 (Waived on minimal spend threshold)',
    feeWaiverCondition: '₹50,000 annual spends',
    cardType: 'RuPay UPI',
    rating: 4.7,
    bestFor: 'Linking with Google Pay, PhonePe, Paytm for direct UPI merchant QR payments',
    keyPerks: [
      'Scan and pay any merchant QR code using Credit Line via PhonePe/GPay',
      'Up to 3% Reward Points on every small and large UPI purchase',
      'Enjoy up to 50 days interest-free credit period on daily chai, groceries & shopping',
      'Comprehensive ₹10 Lakh Accidental Death & Permanent Disability cover'
    ],
    welcomeBenefit: '500 Bonus Reward Points on first 3 UPI QR transactions',
    rewardRate: 'UPI QR Credit + 3% Rewards',
    applyUrl: 'https://www.npci.org.in/what-we-do/rupay/rupay-credit-cards',
    popularBadge: 'Scan Any UPI QR'
  }
];

export const TOP_LOANS_DATA: LoanComparisonItem[] = [
  {
    id: 'sbi-personal-loan',
    bankName: 'State Bank of India (SBI)',
    loanType: 'Personal Loan',
    interestRateRange: '10.30% - 14.50% p.a.',
    maxAmount: 'Up to ₹20,00,000',
    tenureRange: '6 Months to 7 Years',
    processingFee: '0.50% - 1.00% (Special Zero Fee campaigns)',
    minIncome: '₹15,000/month',
    cibilRequirement: '700+ Score',
    features: [
      'Instant digital sanction on YONO SBI in 4 clicks for pre-approved salary holders',
      'Zero prepayment / foreclosure penalty after 6 months',
      'Lowest interest rates for Govt and PSU employees'
    ],
    applyUrl: 'https://sbi.co.in/web/personal-banking/loans/personal-loans',
    badge: 'Lowest Govt Rates'
  },
  {
    id: 'hdfc-quick-loan',
    bankName: 'HDFC Bank',
    loanType: 'Personal Loan',
    interestRateRange: '10.50% - 16.00% p.a.',
    maxAmount: 'Up to ₹40,00,000',
    tenureRange: '12 Months to 5 Years',
    processingFee: 'Up to ₹4,999 + GST',
    minIncome: '₹25,000/month',
    cibilRequirement: '720+ Score',
    features: [
      'Disbursal in 10 seconds for existing HDFC Bank customers',
      'Pocket-friendly EMI starting at ₹2,149 per Lakh',
      'Top-up loan facility available with simplified documentation'
    ],
    applyUrl: 'https://www.hdfcbank.com/personal/borrow/popular-loans/personal-loan',
    badge: '10-Second Disbursal'
  },
  {
    id: 'sbi-home-loan',
    bankName: 'SBI Regular Home Loan',
    loanType: 'Home Loan',
    interestRateRange: '8.40% - 9.15% p.a.',
    maxAmount: 'Up to ₹10 Crores',
    tenureRange: 'Up to 30 Years',
    processingFee: '0.35% (Max ₹10,000 + GST)',
    minIncome: '₹25,000/month',
    cibilRequirement: '750+ for lowest rate',
    features: [
      'Cheapest Home Loan interest rate linked to RBI Repo Rate',
      '0.05% special interest concession for women borrowers',
      'PMAY 2.0 Interest Subsidy integration up to ₹2.5 Lakhs'
    ],
    applyUrl: 'https://homeloans.sbi',
    badge: 'Best Home Loan'
  },
  {
    id: 'drcc-mnssby-education',
    bankName: 'Bihar Student Credit Card (BSEFC)',
    loanType: 'Education Loan',
    interestRateRange: '1.00% (Girls/Divyang) | 4.00% (Boys)',
    maxAmount: 'Up to ₹4,00,000',
    tenureRange: 'Up to 84 Monthly EMIs',
    processingFee: '₹0 (100% Free Government Guarantee)',
    minIncome: 'Zero Income Proof Required',
    cibilRequirement: 'No CIBIL Check Needed',
    features: [
      'No collateral or third-party guarantee required',
      'Moratorium period: Repayment starts 1 year after course completion',
      'Covers 40+ technical, professional, and general degree courses'
    ],
    applyUrl: 'https://www.7nishchay-yuvaupmission.bihar.gov.in',
    badge: '1% Interest Rate'
  },
  {
    id: 'sbi-gold-loan',
    bankName: 'SBI Personal Gold Loan',
    loanType: 'Gold Loan',
    interestRateRange: '8.75% - 9.60% p.a.',
    maxAmount: '₹20,000 to ₹50,00,000',
    tenureRange: 'Up to 36 Months',
    processingFee: '0.25% - 0.50%',
    minIncome: 'Any Adult Owning Gold Ornaments',
    cibilRequirement: 'No minimum CIBIL score constraint',
    features: [
      'Instant disbursement against 18K to 24K gold jewelry within 30 minutes',
      'High per-gram loan valuation with bullet repayment option (Pay interest monthly, principal at end)',
      'Lowest gold loan interest rate in India compared to NBFCs'
    ],
    applyUrl: 'https://sbi.co.in/web/personal-banking/loans/gold-loans',
    badge: 'Instant 30-Min Cash'
  }
];

export const TOP_INSURANCE_DATA: InsuranceComparisonItem[] = [
  {
    id: 'max-life-term',
    companyName: 'Max Life Insurance',
    planName: 'Smart Secure Plus Plan (₹1 Crore Cover)',
    insuranceType: 'Term Life Insurance',
    sumInsuredRange: '₹50 Lakhs to ₹10 Crores',
    startingPremiumMonthly: '₹580 / Month (Age 25, Non-Smoker)',
    claimSettlementRatio: '99.65% (Fast Track 1-Day Claim)',
    networkHospitalsOrGarages: 'Pan-India Cashless Claim Settlement',
    keyHighlights: [
      'Special 100% Return of Premium (ROP) option upon surviving policy tenure',
      'Early Zero-Cost Exit option at age 60 to withdraw all paid premiums',
      'Comprehensive 64 Critical Illness rider and Terminal Illness benefit'
    ],
    taxExemption: 'Tax saving up to ₹1.5 Lakh under 80C + 100% Tax-Free death payout under 10(10D)',
    applyUrl: 'https://www.maxlifeinsurance.com',
    recommendedTag: '99.65% CSR (Highest)'
  },
  {
    id: 'hdfc-life-term',
    companyName: 'HDFC Life',
    planName: 'Click 2 Protect Super (₹1 Crore Cover)',
    insuranceType: 'Term Life Insurance',
    sumInsuredRange: '₹50 Lakhs to ₹20 Crores',
    startingPremiumMonthly: '₹620 / Month (Age 25, Non-Smoker)',
    claimSettlementRatio: '99.50%',
    networkHospitalsOrGarages: 'Express Claim Settlement within 24 Hours',
    keyHighlights: [
      'Smart Exit benefit allowing policy surrender with complete premium refund',
      'Life Stage Protection to increase cover automatically on Marriage & Childbirth',
      'Additional Accidental Death cover multiplier'
    ],
    taxExemption: 'Section 80C & Section 10(10D)',
    applyUrl: 'https://www.hdfclife.com',
    recommendedTag: 'Most Trusted Brand'
  },
  {
    id: 'hdfc-ergo-health',
    companyName: 'HDFC ERGO General Insurance',
    planName: 'Optima Secure (₹10 Lakh - ₹2 Crore Base + 4X Cover)',
    insuranceType: 'Health & Medical Insurance',
    sumInsuredRange: '₹5 Lakhs to ₹2 Crores',
    startingPremiumMonthly: '₹850 / Month',
    claimSettlementRatio: '98.80%',
    networkHospitalsOrGarages: '13,000+ Cashless Empaneled Hospitals',
    keyHighlights: [
      '2X Instant Coverage: ₹10 Lakh sum insured becomes ₹20 Lakhs automatically from Day 1',
      '4X Cover within 2 years with Zero-Claim Bonus multiplier (No Co-payment)',
      '100% Unlimited Restores for unrelated illness hospitalization in the same year'
    ],
    taxExemption: 'Up to ₹75,000 tax deduction under Section 80D (Self, Family & Parents)',
    applyUrl: 'https://www.hdfcergo.com',
    recommendedTag: 'Best 4X Health Plan'
  },
  {
    id: 'star-health-care',
    companyName: 'Star Health & Allied Insurance',
    planName: 'Star Comprehensive Insurance Policy',
    insuranceType: 'Health & Medical Insurance',
    sumInsuredRange: '₹5 Lakhs to ₹1 Crore',
    startingPremiumMonthly: '₹790 / Month',
    claimSettlementRatio: '99.10%',
    networkHospitalsOrGarages: '14,000+ Network Hospitals',
    keyHighlights: [
      'Zero Room Rent Capping - Choose any private single AC room without deduction',
      'Free Annual Health Check-ups for all insured family members',
      'Comprehensive Maternity and Newborn Baby hospitalization cover'
    ],
    taxExemption: 'Section 80D Exemption',
    applyUrl: 'https://www.starhealth.in',
    recommendedTag: 'Zero Room Rent Limit'
  }
];

export const TOP_FD_RATES_DATA: BankFdRateItem[] = [
  {
    bankName: 'Unity Small Finance Bank',
    type: 'Small Finance Bank',
    generalRateMax: '9.00% p.a.',
    seniorCitizenRateMax: '9.50% p.a.',
    specialTenure: '1001 Days Special Deposit',
    dicgcInsured: true,
    applyUrl: 'https://theunitybank.com'
  },
  {
    bankName: 'Suryoday Small Finance Bank',
    type: 'Small Finance Bank',
    generalRateMax: '8.65% p.a.',
    seniorCitizenRateMax: '9.15% p.a.',
    specialTenure: '2 Years 2 Months (26 Months)',
    dicgcInsured: true,
    applyUrl: 'https://www.suryodaybank.com'
  },
  {
    bankName: 'Senior Citizen Savings Scheme (SCSS - Post Office)',
    type: 'Post Office',
    generalRateMax: '8.20% p.a.',
    seniorCitizenRateMax: '8.20% p.a.',
    specialTenure: '5 Years (Sovereign 100% Govt Guarantee)',
    dicgcInsured: true,
    applyUrl: 'https://www.indiapost.gov.in'
  },
  {
    bankName: 'State Bank of India (SBI - Amrit Vrishti)',
    type: 'Public Bank',
    generalRateMax: '7.25% p.a.',
    seniorCitizenRateMax: '7.75% p.a.',
    specialTenure: '444 Days Special Scheme',
    dicgcInsured: true,
    applyUrl: 'https://sbi.co.in'
  },
  {
    bankName: 'HDFC Bank',
    type: 'Private Bank',
    generalRateMax: '7.25% p.a.',
    seniorCitizenRateMax: '7.75% p.a.',
    specialTenure: '18 Months to 21 Months',
    dicgcInsured: true,
    applyUrl: 'https://www.hdfcbank.com'
  },
  {
    bankName: 'Post Office Time Deposit (POTD)',
    type: 'Post Office',
    generalRateMax: '7.50% p.a.',
    seniorCitizenRateMax: '7.50% p.a.',
    specialTenure: '5 Year Term (Section 80C Tax Saver)',
    dicgcInsured: true,
    applyUrl: 'https://www.indiapost.gov.in'
  }
];

export const HIGH_RPM_ARTICLES_GUIDES: HighRpmGuideArticle[] = [
  {
    id: 'cibil-score-boost-guide',
    title: 'How to Boost CIBIL Score from 600 to 750+ in 60 Days: Complete Step-by-Step Guide',
    hindiTitle: 'सिबिल स्कोर 600 से 750+ कैसे करें (60 दिनों में फास्ट इम्प्रूवमेंट)',
    readTime: '6 min read',
    category: 'Credit Score & Loans',
    highCpcKeywords: ['how to improve cibil score fast', 'check free cibil score online', 'best personal loan for 650 cibil score', 'remove cibil default remark', 'credit card utilization ratio 30 percent'],
    summary: 'A high CIBIL score (750+) unlocks lowest home loan interest rates (8.4%), instant personal loan sanctions, and high-limit credit cards. Learn the exact 5 strategies used by credit experts to fix past delays and elevate your score.',
    sections: [
      {
        heading: '1. Maintain Credit Utilization Ratio (CUR) Below 30%',
        body: 'Your Credit Utilization Ratio accounts for 30% of your total CIBIL score calculation. If your combined credit card limit is ₹1,00,000, keep your total monthly billing statement balance below ₹30,000. If you need to spend more, make interim mid-month payments before the bill generation date so that a low balance is reported to the credit bureaus.'
      },
      {
        heading: '2. CIBIL Score Slab vs Loan Interest Rate Impact',
        body: 'Banks like SBI, HDFC, and ICICI price home loans and personal loans dynamically based on your credit tier:',
        tableData: {
          headers: ['CIBIL Score Range', 'Approval Chance', 'Typical Home Loan Rate', 'Loan Terms'],
          rows: [
            ['750 - 900', 'Guaranteed & Instant', '8.40% - 8.65%', 'Lowest Processing Fee, Max Amount'],
            ['700 - 749', 'High', '8.75% - 9.15%', 'Standard Terms, Fast Processing'],
            ['650 - 699', 'Moderate / Conditional', '9.50% - 11.50%', 'Higher Interest, Co-applicant needed'],
            ['Below 650', 'High Rejection Risk', '14.00%+ (NBFCs only)', 'Collateral or Gold Loan required']
          ]
        }
      },
      {
        heading: '3. Build Healthy Credit Mix & Dispute Errors on CIBIL Portal',
        body: 'Having only personal loans hurts your profile. Maintain a healthy blend of secured loans (like gold loan, FD-backed credit card, or two-wheeler loan) and unsecured credit lines. Regularly download your free CIBIL report once every 3 months on cibil.com to verify that closed loans are marked "Closed / NOC Issued" and not mistakenly tagged as "Settled" or "Written Off".'
      }
    ]
  },
  {
    id: 'pm-surya-ghar-complete-guide',
    title: 'PM Surya Ghar Muft Bijli Yojana 2026: Get ₹78,000 Direct Subsidy on Rooftop Solar',
    hindiTitle: 'पीएम सूर्य घर मुफ्त बिजली योजना: छत पर सोलर लगाएं और ₹78,000 सब्सिडी पाएं',
    readTime: '7 min read',
    category: 'Solar Subsidy & Green Energy',
    highCpcKeywords: ['pm surya ghar subsidy calculator', 'rooftop solar panel subsidy 78000', 'pmsuryaghar gov in registration login', 'solar panel installation cost in bihar', 'best solar panel for home in india'],
    summary: 'Everything you need to know about the Prime Minister\'s flagship Rooftop Solar Scheme: detailed capacity sizing, state subsidy breakdowns, collateral-free bank loans @ 7%, and step-by-step registration on pmsuryaghar.gov.in.',
    sections: [
      {
        heading: '1. Capacity Wise Subsidy & Monthly Savings Breakdown',
        body: 'Under PM Surya Ghar, the Government of India provides a direct Bank Transfer (DBT) subsidy based on connected load capacity:',
        tableData: {
          headers: ['System Capacity', 'Rooftop Space Required', 'Total Installation Cost (Approx)', 'Direct Govt Subsidy', 'Net Effective Cost to Citizen', 'Monthly Electricity Units'],
          rows: [
            ['1 kW Solar', '100 Sq. Ft.', '₹60,000 - ₹65,000', '₹30,000', '₹30,000 - ₹35,000', '120 - 150 Units'],
            ['2 kW Solar', '200 Sq. Ft.', '₹1,20,000 - ₹1,30,000', '₹60,000', '₹60,000 - ₹70,000', '240 - 300 Units'],
            ['3 kW Solar', '300 Sq. Ft.', '₹1,80,000 - ₹1,95,000', '₹78,000', '₹1,02,000 - ₹1,17,000', '360 - 450 Units (100% Free Power)'],
            ['5 kW Solar', '500 Sq. Ft.', '₹2,90,000 - ₹3,20,000', '₹78,000', '₹2,12,000 - ₹2,42,000', '600 - 750 Units']
          ]
        }
      },
      {
        heading: '2. Collateral-Free Solar Loan @ 7% Interest',
        body: 'Do not have upfront capital? Public sector banks (SBI, PNB, Canara Bank, Union Bank) offer special PM Surya Ghar Rooftop Solar Loans with only a 10% margin down payment. For a 3kW plant, you only need to pay approx. ₹10,000 from pocket, while the bank finances the remaining amount at 7% repo-linked interest for up to 120 months. The monthly electricity bill savings easily cover the loan EMI!'
      }
    ]
  },
  {
    id: 'term-insurance-1-crore-guide',
    title: 'How to Choose the Best 1 Crore Term Life Insurance Plan (2026 Buying Checklist)',
    hindiTitle: '1 करोड़ का टर्म इंश्योरेंस कैसे चुनें (प्रीमियम, क्लेम रेशियो व राइडर्स)',
    readTime: '5 min read',
    category: 'Life & Health Insurance',
    highCpcKeywords: ['1 crore term insurance premium per month', 'best term insurance plan in india 2026', 'max life vs hdfc life term insurance', 'claim settlement ratio irda report', 'zero cost term insurance exit at 60'],
    summary: 'A ₹1 Crore term life insurance plan is essential for every earning family member. Learn how to verify IRDAI Claim Settlement Ratio (CSR), Amount Settlement Ratio (ASR), Zero-Cost Term Plans, and avoid costly insurance mistakes.',
    sections: [
      {
        heading: '1. What to Look For Before Buying Term Life Cover',
        body: 'Always check these 4 metrics on the official IRDAI Annual Report:',
        bulletPoints: [
          'Claim Settlement Ratio (CSR): Look for insurance providers with consistently 98.5%+ CSR over the last 5 consecutive years (e.g. Max Life 99.65%, HDFC Life 99.50%, Tata AIA 99.10%).',
          'Amount Settlement Ratio (ASR): Ensures the insurer does not settle only small claims while rejecting big ₹1 Cr+ claims.',
          'Zero-Cost Exit Feature: Allows you to surrender the policy at age 60 or retirement and receive a 100% refund of all premiums paid.',
          'Critical Illness Rider: Provides immediate lump-sum payout upon diagnosis of Cancer, Heart Attack, Stroke, or Kidney failure.'
        ]
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
    name: 'Loan EMI & Balance Transfer Calculator',
    category: 'Loans',
    shortDesc: 'Calculate monthly EMI, total interest, and prepayment interest savings for Home, Personal, Education & Car loans.',
    iconName: 'Landmark'
  },
  {
    id: 'sip-wealth',
    name: 'SIP Wealth & Compounding Multiplier',
    category: 'Investments',
    shortDesc: 'Project mutual fund returns, inflation-adjusted maturity corpus, and wealth creation over 5 to 30 years.',
    iconName: 'TrendingUp'
  },
  {
    id: 'solar-calc',
    name: 'PM Surya Ghar Solar Subsidy & Bill Calculator',
    category: 'Solar Energy',
    shortDesc: 'Calculate your roof capacity (1kW-5kW), ₹30k-₹78k central subsidy, net installation cost & monthly electricity savings.',
    iconName: 'Sparkles'
  },
  {
    id: 'term-insurance-calc',
    name: '₹1 Crore Term Insurance Premium Estimator',
    category: 'Insurance',
    shortDesc: 'Estimate monthly and annual premiums based on your current age, smoking status, and sum assured.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'cibil-estimator',
    name: 'Free CIBIL Eligibility & Loan Affordability Checker',
    category: 'Credit Score',
    shortDesc: 'Check your debt-to-income ratio, maximum loan borrowing eligibility, and interest rate tier.',
    iconName: 'Coins'
  },
  {
    id: 'ppf-ssy',
    name: 'PPF & Sukanya Samriddhi Calculator',
    category: 'Govt Savings',
    shortDesc: 'Calculate 15-21 year guaranteed tax-free maturity returns for Sukanya (8.2%) and PPF (7.1%).',
    iconName: 'PiggyBank'
  },
  {
    id: 'income-tax',
    name: 'Income Tax Calculator (FY 2024-26)',
    category: 'Tax Planning',
    shortDesc: 'Compare New Tax Regime vs Old Tax Regime, Section 87A rebate & 80C/80D deductions.',
    iconName: 'Calculator'
  },
  {
    id: 'apy-pension',
    name: 'Atal Pension (APY) Calculator',
    category: 'Pension',
    shortDesc: 'Find exact monthly contribution based on your current age for ₹1,000 to ₹5,000 guaranteed pension.',
    iconName: 'ShieldCheck'
  }
];

export const GOOGLE_FINANCE_INSURANCE_FAQS = [
  {
    question: 'Which government health insurance provides ₹5 Lakhs free hospitalization in India?',
    answer: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY) provides up to ₹5,00,000 per family per year for secondary and tertiary care hospitalization in 27,000+ empaneled private and public hospitals completely cashless. For senior citizens aged 70+, a dedicated additional ₹5 Lakh cover is provided under Ayushman Vay Vandana.'
  },
  {
    question: 'How can I get ₹78,000 subsidy under PM Surya Ghar Muft Bijli Yojana?',
    answer: 'Register on pmsuryaghar.gov.in with your consumer electricity account number, select an empaneled solar installer to install a 3kW+ rooftop solar plant, have DISCOM install the Net Meter, and receive ₹78,000 direct bank transfer (DBT) subsidy into your account within 30 days.'
  },
  {
    question: 'How can Bihar students get up to ₹4 Lakhs education loan at 1% interest?',
    answer: 'Under the Bihar Student Credit Card Scheme (MNSSBY / Saat Nischay), students can apply online on the MNSSBY portal to get up to ₹4,00,000 education loan for technical, medical, and professional courses at 1% simple interest for girls/divyang and 4% for boys with zero collateral and repayment starting only 1 year after graduation.'
  },
  {
    question: 'Which is the best credit card for 5% online shopping cashback in India?',
    answer: 'The SBI Cashback Credit Card offers flat 5% cashback on virtually all online shopping portals (Amazon, Flipkart, Swiggy, Zomato, Myntra) auto-credited to the card statement. For a 100% Lifetime Free card, the Amazon Pay ICICI Card offers unlimited 5% cashback for Amazon Prime members.'
  },
  {
    question: 'What is the minimum CIBIL score required for lowest home loan interest rates?',
    answer: 'A CIBIL score of 750 and above qualifies you for the lowest home loan interest rates (starting at 8.40% p.a. with SBI, HDFC, and ICICI) and fastest instant processing with minimal documentation.'
  },
  {
    question: 'Which government savings scheme offers the highest interest rate in 2026?',
    answer: 'Sukanya Samriddhi Yojana (SSY) and Senior Citizen Savings Scheme (SCSS) offer the highest guaranteed sovereign interest rate of 8.2% per annum, followed by Post Office Monthly Income Scheme (POMIS) at 7.4% and PPF at 7.1%.'
  }
];
