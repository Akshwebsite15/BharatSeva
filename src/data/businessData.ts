export interface BusinessIdea {
  id: string;
  title: string;
  category: 'Agri & Food Processing' | 'Service & Digital' | 'Retail & Trading' | 'Manufacturing & Local Craft';
  initialInvestment: string;
  profitMargin: string;
  paybackPeriod: string;
  subsidiesApplicable: string[];
  rawMaterials: string;
  licensesRequired: string[];
  overview: string;
}

export interface BusinessSchemeGuide {
  id: string;
  title?: string;
  name: string;
  ministry: string;
  subsidyAmount: string;
  interestRate: string;
  eligibility: string;
  documents: string[];
  officialPortal: string;
  summary: string;
}

export interface AccountingSoftwareItem {
  name: string;
  bestFor: string;
  gstCompliant: boolean;
  pricing: string;
  eWayBillEInvoice: boolean;
  mobileApp: boolean;
  rating: number;
}

export const TOP_BUSINESS_IDEAS: BusinessIdea[] = [
  {
    id: 'makhana-processing-packaging',
    title: 'Makhana (Foxnut) Processing & Value-Added Snacking Unit',
    category: 'Agri & Food Processing',
    initialInvestment: '₹4 Lakh - ₹15 Lakh',
    profitMargin: '30% - 45%',
    paybackPeriod: '6 - 12 Months',
    subsidiesApplicable: ['PMFME Scheme (35% capital subsidy up to ₹10 Lakh)', 'Bihar Agri Business Promotion Scheme', 'PMEGP Subsidy'],
    rawMaterials: 'Raw Makhana Lava from Mithilanchal / Darbhanga / Purnea, seasoning spices, nitrogen-flush packaging pouches.',
    licensesRequired: ['FSSAI Central / State License', 'GST Registration', 'Udyam MSME Certificate', 'Trade License'],
    overview: 'High-export demand health superfood with global consumption growing at 22% CAGR. Flavored roasted makhana (Peri Peri, Himalayan Pink Salt, Cheese) offers 3x value addition.',
  },
  {
    id: 'solar-rooftop-installation-agency',
    title: 'Solar EPC & Rooftop Installation Agency (PM Surya Ghar Hub)',
    category: 'Service & Digital',
    initialInvestment: '₹2 Lakh - ₹5 Lakh (Working Capital)',
    profitMargin: '18% - 28%',
    paybackPeriod: '3 - 6 Months',
    subsidiesApplicable: ['PM Surya Ghar Muft Bijli Yojana Vendor Channel', 'Mudra Kishore Loan'],
    rawMaterials: 'Tier-1 Mono PERC Solar Panels, Inverters, ACDB/DCDB boxes, mounting structures, net meters.',
    licensesRequired: ['DISCOM Registered Vendor Empanelment', 'GST Registration', 'Electrical Contractor License', 'Udyam Registration'],
    overview: 'Government target of 1 Crore rooftop solar installations by 2027 with direct consumer subsidies up to ₹78,000 creates unprecedented demand for local certified installers.',
  },
  {
    id: 'cold-pressed-oil-manufacturing',
    title: 'Wood-Pressed / Cold-Pressed Mustard & Sesame Oil Mill (Kacchi Ghani)',
    category: 'Manufacturing & Local Craft',
    initialInvestment: '₹3.5 Lakh - ₹8 Lakh',
    profitMargin: '25% - 40%',
    paybackPeriod: '6 - 9 Months',
    subsidiesApplicable: ['PMEGP (Up to 35% Govt Subsidy)', 'PMFME Scheme', 'Mudra Tarun Loan'],
    rawMaterials: 'Pure local mustard seeds, groundnut, sesame seeds, glass bottles, food-grade tins.',
    licensesRequired: ['FSSAI Food License', 'GST Number', 'Udyam Registration', 'Pollution NOC (Green Category)'],
    overview: 'Massive consumer shift from refined hydrogenated oils to pure chemical-free wood-pressed oils. Selling at ₹240-₹350/litre delivers high gross profit per pressing batch.',
  },
  {
    id: 'custom-packaging-printing-unit',
    title: 'Eco-Friendly Paper Bag & Corrugated Box Manufacturing',
    category: 'Manufacturing & Local Craft',
    initialInvestment: '₹5 Lakh - ₹18 Lakh',
    profitMargin: '20% - 32%',
    paybackPeriod: '9 - 15 Months',
    subsidiesApplicable: ['PMEGP Capital Subsidy', 'Stand-Up India Scheme', 'MSME Technology Upgradation (CLCSS)'],
    rawMaterials: 'Kraft paper reels, water-based non-toxic inks, cotton rope handles, food-grade adhesive.',
    licensesRequired: ['Factory License (if >10 workers)', 'Pollution Control Board Green NOC', 'GST & MSME'],
    overview: 'Strict bans on single-use plastics across Indian states have created an everlasting multi-crore B2B market for local retail stores, bakeries, pharmacies, and garment brands.',
  },
];

export const GOVT_BUSINESS_SCHEMES: BusinessSchemeGuide[] = [
  {
    id: 'pmegp-subsidy-scheme',
    title: 'PMEGP (Prime Minister Employment Generation Programme)',
    name: 'PMEGP Capital Subsidy Scheme',
    ministry: 'Ministry of MSME & KVIC',
    subsidyAmount: 'Up to 35% Govt Grant (Max ₹50 Lakh for Mfg, ₹20 Lakh for Services)',
    interestRate: 'Standard Bank MCLR + 1-2% (Term Loan)',
    eligibility: 'Any individual aged 18+ with min 8th pass for manufacturing > ₹10L. SC/ST/OBC/Women/Minority get 35% subsidy in rural areas.',
    documents: ['Project Report (DPR) prepared by CA/Chartered Engineer', 'Aadhaar, PAN & Domicile', 'Caste/Category certificate', 'EDP Training Certificate (online via KVIC)'],
    officialPortal: 'https://www.kviconline.gov.in/pmegp',
    summary: 'India’s flagship credit-linked subsidy scheme where government deposits 15% to 35% of total project cost directly into the bank as margin money subsidy after 3 years of successful operation.',
  },
  {
    id: 'bihar-mukhyamantri-udyami-yojana',
    title: 'Bihar Mukhyamantri Udyami Yojana (SC/ST/EBC/Women/Yuva)',
    name: 'Mukhyamantri Udyami Yojana (MMUY)',
    ministry: 'Industries Department, Govt of Bihar',
    subsidyAmount: '₹10 Lakh (₹5 Lakh 100% Free Grant + ₹5 Lakh Interest-Free / 1% Loan)',
    interestRate: '0% Interest (Women/SC/ST) | 1% Nominal (Yuva/General/OBC)',
    eligibility: 'Permanent residents of Bihar, 10+2 / Intermediate / ITI / Polytechnic / Diploma / Graduate pass, age 18-50.',
    documents: ['10th & 12th / ITI Marksheet', 'Bihar Domicile (Niwash Praman Patra)', 'Caste Certificate', 'PAN & Cancelled Cheque', 'Current Bank Account in the name of Firm'],
    officialPortal: 'https://udyami.bihar.gov.in',
    summary: 'One of the most generous state startup schemes in India providing ₹10 Lakhs capital assistance in 3 installments to establish local manufacturing and service enterprises.',
  },
  {
    id: 'pm-mudra-yojana-credit',
    title: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    name: 'PMMY Micro Units Development Loan',
    ministry: 'Ministry of Finance & SIDBI',
    subsidyAmount: 'Collateral-Free Loan up to ₹10 Lakh (Shishu: ₹50k, Kishore: ₹5L, Tarun: ₹10L)',
    interestRate: '8.5% - 12.0% p.a. (No collateral or third-party guarantee needed)',
    eligibility: 'Small traders, artisans, shopkeepers, micro-manufacturers, transport vehicle operators.',
    documents: ['Mudra Application Form', 'Proof of Business identity & address', 'Quotation of machinery/goods to be purchased', 'Past 6 months bank statement'],
    officialPortal: 'https://www.mudra.org.in',
    summary: 'Instant collateral-free bank loans categorized under Shishu (up to ₹50k), Kishore (₹50k to ₹5 Lakh), and Tarun (₹5 Lakh to ₹10 Lakh) available at all nationalized and private banks.',
  },
];

export const ACCOUNTING_SOFTWARE_LIST: AccountingSoftwareItem[] = [
  {
    name: 'TallyPrime (Gold / Silver)',
    bestFor: 'Medium-to-large businesses, CAs, manufacturing units, complex inventory.',
    gstCompliant: true,
    pricing: '₹18,000 (Silver Single User) / ₹54,000 (Gold Multi-User)',
    eWayBillEInvoice: true,
    mobileApp: false,
    rating: 4.8,
  },
  {
    name: 'Zoho Books',
    bestFor: 'Cloud-first startups, digital agencies, multi-currency invoicing, automated bank feeds.',
    gstCompliant: true,
    pricing: 'Free for turnover < ₹25 Lakh / ₹749 per month (Standard)',
    eWayBillEInvoice: true,
    mobileApp: true,
    rating: 4.9,
  },
  {
    name: 'Vyapar App',
    bestFor: 'Retailers, wholesalers, distributors, shopkeepers needing simple billing on mobile/PC.',
    gstCompliant: true,
    pricing: '₹2,399 / year (Desktop) / ₹699 / year (Mobile)',
    eWayBillEInvoice: true,
    mobileApp: true,
    rating: 4.7,
  },
  {
    name: 'myBillBook',
    bestFor: 'Small shop owners, mobile billing, barcode scanning, thermal printing.',
    gstCompliant: true,
    pricing: 'Free trial / ₹1,499 per year',
    eWayBillEInvoice: true,
    mobileApp: true,
    rating: 4.6,
  },
];
