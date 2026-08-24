export interface RealEstateCityPrice {
  city: string;
  state: string;
  avgPriceSqFt: string;
  priceRange: string;
  rentalYield: string;
  topLocalities: { name: string; rate: string; growth: string }[];
  circleRate: string;
}

export interface HomeLoanOffer {
  bank: string;
  interestRate: string;
  maxTenure: string;
  processingFee: string;
  maxLoanAmount: string;
  specialFeature: string;
  applyUrl: string;
  rating: number;
}

export interface RealEstateGuide {
  id: string;
  title: string;
  category: 'Registration & Registry' | 'Land Records & Mutation' | 'Home Loan Guide' | 'RERA & Legal' | 'Investment Strategy';
  readTime: string;
  summary: string;
  keySteps: string[];
  documentsRequired: string[];
  statePortals?: { name: string; url: string; state: string }[];
  faqs: { q: string; a: string }[];
}

export const TOP_CITIES_REAL_ESTATE: RealEstateCityPrice[] = [
  {
    city: 'Patna',
    state: 'Bihar',
    avgPriceSqFt: '₹5,800 / sq.ft',
    priceRange: '₹3,500 - ₹12,500 / sq.ft',
    rentalYield: '3.2% - 4.1%',
    topLocalities: [
      { name: 'Bailey Road / Saguna More', rate: '₹6,500 - ₹9,500 / sq.ft', growth: '+14% YoY' },
      { name: 'Boring Road / Patliputra', rate: '₹9,000 - ₹14,000 / sq.ft', growth: '+9% YoY' },
      { name: 'Bihta (IIT & Airport Hub)', rate: '₹3,200 - ₹5,500 / sq.ft', growth: '+22% YoY' },
      { name: 'Kankarbagh / Rajendra Nagar', rate: '₹7,000 - ₹11,000 / sq.ft', growth: '+8% YoY' },
      { name: 'Danapur Cantonment & Station Road', rate: '₹4,500 - ₹7,200 / sq.ft', growth: '+12% YoY' },
    ],
    circleRate: 'Minimum Valuation Register (MVR) updated yearly by Govt of Bihar Registration Dept.',
  },
  {
    city: 'Delhi NCR',
    state: 'Delhi / UP / Haryana',
    avgPriceSqFt: '₹8,900 / sq.ft',
    priceRange: '₹4,500 - ₹35,000 / sq.ft',
    rentalYield: '2.8% - 3.8%',
    topLocalities: [
      { name: 'Noida Expressway (Sector 137/143)', rate: '₹7,500 - ₹12,000 / sq.ft', growth: '+18% YoY' },
      { name: 'Dwarka Expressway, Gurugram', rate: '₹12,000 - ₹22,000 / sq.ft', growth: '+26% YoY' },
      { name: 'Greater Noida West (Noida Ext.)', rate: '₹5,000 - ₹8,200 / sq.ft', growth: '+15% YoY' },
      { name: 'South Delhi (Vasant Kunj/Saket)', rate: '₹18,000 - ₹40,000 / sq.ft', growth: '+7% YoY' },
    ],
    circleRate: 'Delhi Circle Rates categorized from Category A (₹7.74L/sq.m) to Category H (₹23,280/sq.m).',
  },
  {
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    avgPriceSqFt: '₹4,900 / sq.ft',
    priceRange: '₹3,000 - ₹9,500 / sq.ft',
    rentalYield: '3.5% - 4.5%',
    topLocalities: [
      { name: 'Gomti Nagar & Gomti Nagar Extension', rate: '₹6,000 - ₹10,500 / sq.ft', growth: '+16% YoY' },
      { name: 'Shaheed Path & Amar Shaheed Path', rate: '₹5,200 - ₹8,000 / sq.ft', growth: '+19% YoY' },
      { name: 'Sultanpur Road (IT City Hub)', rate: '₹3,800 - ₹6,500 / sq.ft', growth: '+21% YoY' },
      { name: 'Alambagh / Kanpur Road', rate: '₹4,500 - ₹7,000 / sq.ft', growth: '+10% YoY' },
    ],
    circleRate: 'Lucknow District DM Circle Rates revised based on road width and commercial status.',
  },
  {
    city: 'Mumbai MMR',
    state: 'Maharashtra',
    avgPriceSqFt: '₹21,500 / sq.ft',
    priceRange: '₹7,000 - ₹95,000 / sq.ft',
    rentalYield: '2.5% - 3.4%',
    topLocalities: [
      { name: 'Thane West (Ghodbunder Road)', rate: '₹11,000 - ₹17,000 / sq.ft', growth: '+11% YoY' },
      { name: 'Navi Mumbai (Kharghar/Panvel Airport)', rate: '₹8,500 - ₹14,500 / sq.ft', growth: '+15% YoY' },
      { name: 'Andheri West / Goregaon', rate: '₹22,000 - ₹38,000 / sq.ft', growth: '+8% YoY' },
      { name: 'Kalyan - Dombivli', rate: '₹5,500 - ₹8,500 / sq.ft', growth: '+10% YoY' },
    ],
    circleRate: 'Ready Reckoner (RR) rates managed by Inspector General of Registration Maharashtra.',
  },
  {
    city: 'Bengaluru',
    state: 'Karnataka',
    avgPriceSqFt: '₹7,800 / sq.ft',
    priceRange: '₹4,500 - ₹22,000 / sq.ft',
    rentalYield: '4.2% - 5.5%',
    topLocalities: [
      { name: 'Whitefield & ITPL', rate: '₹8,000 - ₹13,500 / sq.ft', growth: '+17% YoY' },
      { name: 'Sarjapur Road & Bellandur', rate: '₹8,500 - ₹15,000 / sq.ft', growth: '+20% YoY' },
      { name: 'Electronic City Phase 1 & 2', rate: '₹5,200 - ₹8,500 / sq.ft', growth: '+12% YoY' },
      { name: 'North Bengaluru / Hebbal & Airport', rate: '₹9,000 - ₹16,000 / sq.ft', growth: '+22% YoY' },
    ],
    circleRate: 'Guidance Value set by Dept of Stamps and Registration Karnataka.',
  },
];

export const HOME_LOAN_OFFERS: HomeLoanOffer[] = [
  {
    bank: 'State Bank of India (SBI)',
    interestRate: '8.40% - 9.15% p.a.',
    maxTenure: 'Up to 30 Years',
    processingFee: '0.17% - 0.35% (Max ₹10,000 + GST)',
    maxLoanAmount: 'Up to ₹10 Crore (Up to 90% of property cost)',
    specialFeature: 'SBI Maxgain Home Loan overdraft facility, zero prepayment charges, concessions for women borrowers.',
    applyUrl: 'https://sbi.co.in/web/personal-banking/loans/home-loans',
    rating: 4.8,
  },
  {
    bank: 'HDFC Bank',
    interestRate: '8.70% - 9.40% p.a.',
    maxTenure: 'Up to 30 Years',
    processingFee: 'Up to 0.50% or ₹3,000 (whichever is higher)',
    maxLoanAmount: 'Up to ₹10 Crore',
    specialFeature: 'Quick digital sanction in 30 minutes, customized EMI options (Step Up / Telescopic), Reach Home Loans for unorganized income.',
    applyUrl: 'https://www.hdfcbank.com/personal/borrow/popular-loans/home-loan',
    rating: 4.7,
  },
  {
    bank: 'ICICI Bank',
    interestRate: '8.75% - 9.50% p.a.',
    maxTenure: 'Up to 30 Years',
    processingFee: '0.50% - 1.00% + GST',
    maxLoanAmount: 'Up to ₹5 Crore',
    specialFeature: 'Instant digital approval for pre-approved customers, Extraa Home Loans with mortgage guarantee for extended loan tenure.',
    applyUrl: 'https://www.icicibank.com/personal-banking/loans/home-loan',
    rating: 4.6,
  },
  {
    bank: 'Bank of Baroda (BoB)',
    interestRate: '8.40% - 10.60% p.a.',
    maxTenure: 'Up to 30 Years',
    processingFee: 'Nil for festive offers (Standard: 0.25% - 0.50%)',
    maxLoanAmount: 'Up to ₹10 Crore',
    specialFeature: 'Baroda Home Loan Advantage linked to savings account, lowest interest rates for high CIBIL scores (750+).',
    applyUrl: 'https://www.bankofbaroda.in/personal-banking/loans/home-loan',
    rating: 4.7,
  },
  {
    bank: 'Punjab National Bank (PNB)',
    interestRate: '8.45% - 10.25% p.a.',
    maxTenure: 'Up to 30 Years',
    processingFee: '0.35% (Min ₹2,500, Max ₹15,000)',
    maxLoanAmount: 'Up to ₹5 Crore',
    specialFeature: 'PNB Max-Saver scheme, lower interest rates for rural and semi-urban properties under PMAY.',
    applyUrl: 'https://www.pnbindia.in/home-loan.html',
    rating: 4.5,
  },
];

export const REAL_ESTATE_GUIDES: RealEstateGuide[] = [
  {
    id: 'bihar-land-registry-mutation',
    title: 'Complete Guide to Property Registry & Dakhil Kharij (Mutation) in Bihar 2026',
    category: 'Land Records & Mutation',
    readTime: '6 min read',
    summary: 'Step-by-step procedure to check Bhumi Jankari / Jamabandi, verify Khatiyan, calculate stamp duty (MVR), complete online registry slot booking, and apply for automated Dakhil-Kharij on the Bihar Bhumi portal.',
    keySteps: [
      '1. Check Land Title & Jamabandi on BiharBhumi (biharbhumi.bihar.gov.in) using District, Anchal, and Halka.',
      '2. Verify Minimum Valuation Rate (MVR) for the plot from the Registration Department.',
      '3. Draft the Sale Deed (Kewala) through a licensed deed writer or legal advocate.',
      '4. Book an appointment slot on the OGRAS / e-Registration portal for physical verification.',
      '5. Pay Stamp Duty (6% for Male, 5.7% for Female) & Registration Fee (2%).',
      '6. Biometric verification & photograph at Sub-Registrar Office (Registry Office).',
      '7. Automatic / Online application for Dakhil Kharij (Mutation) with CO (Circle Officer) approval within 35 days.',
    ],
    documentsRequired: [
      'Previous Sale Deed / Original Kewala & Land Khatiyan',
      'Recent Land Revenue Receipt (LPC / Lagan Rasid)',
      'Aadhaar Card and PAN Card of both Buyer and Seller',
      'Passport size photographs and 2 identification witnesses with Aadhaar',
      'No-Objection Certificate (NOC) if agricultural land or joint ancestral property',
    ],
    statePortals: [
      { name: 'Bihar Bhumi (Land Records & Mutation)', url: 'http://biharbhumi.bihar.gov.in', state: 'Bihar' },
      { name: 'Bhumi Jankari (Deed & MVR Verification)', url: 'http://bhumijankari.bihar.gov.in', state: 'Bihar' },
      { name: 'UP Bhulekh (Uttar Pradesh Land Records)', url: 'https://upbhulekh.gov.in', state: 'Uttar Pradesh' },
      { name: 'Delhi Land Records (Bhulekh Delhi)', url: 'https://dlrc.delhigovt.nic.in', state: 'Delhi' },
    ],
    faqs: [
      {
        q: 'What is Dakhil Kharij and why is it mandatory?',
        a: 'Dakhil Kharij (Mutation) transfers the title of property in the government revenue records from seller to buyer. Without mutation, you cannot pay government land revenue taxes (Lagan) or get an official LPC (Land Possession Certificate) for bank loans.',
      },
      {
        q: 'How much is Stamp Duty on property in Bihar?',
        a: 'In Bihar, Stamp Duty is 6% of the circle rate value for male buyers and 5.7% for female buyers (with a 0.3% government concession). Registration fee is an additional 2%.',
      },
    ],
  },
  {
    id: 'rera-property-verification',
    title: 'How to Check RERA Registered Projects & Avoid Real Estate Frauds',
    category: 'RERA & Legal',
    readTime: '5 min read',
    summary: 'Learn how to verify builder credentials, project approval numbers, sanctioned layout plans, escrow bank accounts, and delivery timelines on state RERA portals before booking an under-construction flat.',
    keySteps: [
      '1. Ask the builder/promoter for the official RERA Registration Number.',
      '2. Visit your State RERA Portal (e.g., rera.bihar.gov.in, maharera.mahaonline.gov.in, up-rera.in).',
      '3. Search by Project Name or RERA ID to verify sanctioned building height and number of towers.',
      '4. Check the declared Possession Date and quarterly construction update photos.',
      '5. Verify that 70% of buyer payments go into the designated RERA Escrow Bank Account.',
      '6. Verify Title Deed & Encumbrance Certificate (EC) to ensure no bank mortgage disputes.',
    ],
    documentsRequired: [
      'RERA Project Registration Certificate',
      'Sanctioned Building & Architectural Plan from Municipal Authority',
      'Title Search Report (past 30 years) from a banking empanelled lawyer',
      'Encumbrance Certificate (Form 15 & Form 16)',
      'Commencement Certificate (CC) and Occupancy Certificate (OC) for ready homes',
    ],
    faqs: [
      {
        q: 'Can a builder advertise a project without RERA registration?',
        a: 'No. Under Section 3 of RERA Act 2016, no promoter or builder can advertise, market, book, sell, or invite public investments without prior RERA registration.',
      },
    ],
  },
  {
    id: 'buy-vs-rent-calculator-guide',
    title: 'Buying vs Renting a Home: The Complete 2026 Financial Framework',
    category: 'Investment Strategy',
    readTime: '7 min read',
    summary: 'Detailed financial comparison between paying 30 years of Home Loan EMI vs Renting + Investing the difference in SIP/Mutual Funds based on price-to-rent ratio and tax exemptions under Section 24(b) and 80C.',
    keySteps: [
      '1. Calculate Price-to-Rent Ratio: Property Price / (Annual Rent). If > 20, Renting is mathematically superior.',
      '2. Factor in Upfront Costs: 20% down payment, 7-8% stamp duty & registration, 2-3% interior and brokerage.',
      '3. Analyze EMI vs Opportunity Cost: Compare 8.5% loan interest vs historical 12-14% equity mutual fund returns.',
      '4. Factor in Tax Benefits: Up to ₹2 Lakh deduction on home loan interest under Sec 24(b).',
      '5. Maintenance & Liquidity: Account for property tax, society maintenance, and illiquid capital locked in real estate.',
    ],
    documentsRequired: ['Salary slips (last 6 months)', 'Form 16 & ITR (last 3 years)', 'Bank account statements (last 1 year)'],
    faqs: [
      {
        q: 'What is the 3-20-30-40 rule of buying a home?',
        a: 'The rule recommends: (1) Total EMI should not exceed 30% of monthly take-home salary; (2) Loan tenure should be capped at 20 years; (3) Down payment should be at least 20-30%; and (4) Home price should ideally not exceed 4-5x of annual household income.',
      },
    ],
  },
];
