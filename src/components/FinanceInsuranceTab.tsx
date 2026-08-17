import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Landmark,
  PiggyBank,
  TrendingUp,
  Calculator,
  Coins,
  ArrowRight,
  ExternalLink,
  PhoneCall,
  FileText,
  CheckCircle2,
  HelpCircle,
  Search,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  HeartPulse,
  BadgePercent,
  Wallet,
  AlertCircle,
  Building,
  GraduationCap,
  Users,
  ChevronRight,
  Share2,
  Layers,
  X,
} from 'lucide-react';
import {
  FINANCE_INSURANCE_SCHEMES,
  FinanceScheme,
  FINANCIAL_CALCULATORS_LIST,
  GOOGLE_FINANCE_INSURANCE_FAQS,
} from '../data/financeInsuranceData';

interface FinanceInsuranceTabProps {
  onSaveItem?: (title: string, type: string) => void;
  onOpenPublicToolModal?: (toolId?: string) => void;
}

export const FinanceInsuranceTab: React.FC<FinanceInsuranceTabProps> = ({
  onSaveItem,
  onOpenPublicToolModal,
}) => {
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCalculator, setActiveCalculator] = useState<string>('loan-emi');
  const [selectedSchemeDetail, setSelectedSchemeDetail] = useState<FinanceScheme | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // EMI Calculator States
  const [loanAmount, setLoanAmount] = useState<number>(400000);
  const [loanInterestRate, setLoanInterestRate] = useState<number>(4.0);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(5);

  // SIP Calculator States
  const [sipMonthly, setSipMonthly] = useState<number>(5000);
  const [sipReturnRate, setSipReturnRate] = useState<number>(12);
  const [sipTenureYears, setSipTenureYears] = useState<number>(15);

  // PPF / SSY Calculator States
  const [ppfSsyAnnualDeposit, setPpfSsyAnnualDeposit] = useState<number>(100000);
  const [ppfSsySchemeType, setPpfSsySchemeType] = useState<'SSY' | 'PPF'>('SSY');

  // APY Calculator States
  const [apyAge, setApyAge] = useState<number>(25);
  const [apyDesiredPension, setApyDesiredPension] = useState<number>(5000);

  // Income Tax Calculator States
  const [taxIncome, setTaxIncome] = useState<number>(900000);
  const [tax80CDeduction, setTax80CDeduction] = useState<number>(150000);
  const [tax80DDeduction, setTax80DDeduction] = useState<number>(25000);

  // --- CALCULATION LOGIC ---

  // 1. EMI Calculation
  const emiCalculation = useMemo(() => {
    const p = loanAmount;
    const r = loanInterestRate / 12 / 100;
    const n = loanTenureYears * 12;

    if (r === 0) {
      const emi = p / n;
      return {
        monthlyEmi: Math.round(emi),
        totalInterest: 0,
        totalAmount: Math.round(p),
      };
    }

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - p;

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
    };
  }, [loanAmount, loanInterestRate, loanTenureYears]);

  // 2. SIP Calculation
  const sipCalculation = useMemo(() => {
    const p = sipMonthly;
    const i = sipReturnRate / 12 / 100;
    const n = sipTenureYears * 12;

    const totalInvested = p * n;
    const maturityValue = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const wealthGained = maturityValue - totalInvested;

    return {
      totalInvested: Math.round(totalInvested),
      wealthGained: Math.round(wealthGained),
      maturityValue: Math.round(maturityValue),
    };
  }, [sipMonthly, sipReturnRate, sipTenureYears]);

  // 3. PPF & SSY Calculation
  const ppfSsyCalculation = useMemo(() => {
    const annual = ppfSsyAnnualDeposit;
    const rate = ppfSsySchemeType === 'SSY' ? 0.082 : 0.071;
    const years = ppfSsySchemeType === 'SSY' ? 21 : 15;
    const depositYears = ppfSsySchemeType === 'SSY' ? 15 : 15;

    let balance = 0;
    let totalInvested = 0;

    for (let yr = 1; yr <= years; yr++) {
      if (yr <= depositYears) {
        balance += annual;
        totalInvested += annual;
      }
      balance += balance * rate;
    }

    const totalInterest = balance - totalInvested;

    return {
      ratePercent: ppfSsySchemeType === 'SSY' ? '8.2%' : '7.1%',
      years,
      depositYears,
      totalInvested: Math.round(totalInvested),
      totalInterest: Math.round(totalInterest),
      maturityValue: Math.round(balance),
    };
  }, [ppfSsyAnnualDeposit, ppfSsySchemeType]);

  // 4. APY Contribution Table calculation
  const apyCalculation = useMemo(() => {
    // Standard APY Contribution formula approximations per PFRDA table for age 18-40
    // Factor based on age: age 18: ~42/k, age 25: ~76/k, age 30: ~116/k, age 40: ~291/k
    const factorMap: Record<number, number> = {
      18: 42,
      19: 46,
      20: 50,
      21: 54,
      22: 59,
      23: 64,
      24: 70,
      25: 76,
      26: 82,
      27: 90,
      28: 99,
      29: 109,
      30: 116,
      31: 128,
      32: 144,
      33: 160,
      34: 177,
      35: 196,
      36: 218,
      37: 242,
      38: 268,
      39: 297,
      40: 291 * 5 / 5, // ~1454 for 5k
    };

    const multiplier = apyDesiredPension / 1000;
    const basePerThousand = factorMap[apyAge] || 76;
    const monthlyContribution = Math.round(basePerThousand * multiplier);
    const yearsRemaining = 60 - apyAge;
    const totalContribution = monthlyContribution * 12 * yearsRemaining;
    const corpusToNominee = apyDesiredPension === 5000 ? 850000 : apyDesiredPension * 170;

    return {
      monthlyContribution,
      yearsRemaining,
      totalContribution,
      corpusToNominee,
    };
  }, [apyAge, apyDesiredPension]);

  // 5. Income Tax Comparison (New vs Old Regime)
  const taxCalculation = useMemo(() => {
    const gross = taxIncome;
    const stdDeductionNew = 75000;
    const stdDeductionOld = 50000;

    // New Regime FY 2024-25 / 2025-26
    const taxableNew = Math.max(0, gross - stdDeductionNew);
    let taxNew = 0;
    if (taxableNew <= 300000) {
      taxNew = 0;
    } else if (taxableNew <= 700000) {
      taxNew = (taxableNew - 300000) * 0.05;
    } else if (taxableNew <= 1000000) {
      taxNew = 400000 * 0.05 + (taxableNew - 700000) * 0.10;
    } else if (taxableNew <= 1200000) {
      taxNew = 400000 * 0.05 + 300000 * 0.10 + (taxableNew - 1000000) * 0.15;
    } else if (taxableNew <= 1500000) {
      taxNew = 400000 * 0.05 + 300000 * 0.10 + 200000 * 0.15 + (taxableNew - 1200000) * 0.20;
    } else {
      taxNew = 400000 * 0.05 + 300000 * 0.10 + 200000 * 0.15 + 300000 * 0.20 + (taxableNew - 1500000) * 0.30;
    }

    // 87A rebate for New Regime (Zero tax up to 7.75L taxable)
    if (taxableNew <= 700000) {
      taxNew = 0;
    }
    const cessNew = taxNew * 0.04;
    const totalTaxNew = Math.round(taxNew + cessNew);

    // Old Regime
    const totalDeductionsOld = stdDeductionOld + Math.min(150000, tax80CDeduction) + Math.min(50000, tax80DDeduction);
    const taxableOld = Math.max(0, gross - totalDeductionsOld);
    let taxOld = 0;
    if (taxableOld <= 250000) {
      taxOld = 0;
    } else if (taxableOld <= 500000) {
      taxOld = (taxableOld - 250000) * 0.05;
    } else if (taxableOld <= 1000000) {
      taxOld = 250000 * 0.05 + (taxableOld - 500000) * 0.20;
    } else {
      taxOld = 250000 * 0.05 + 500000 * 0.20 + (taxableOld - 1000000) * 0.30;
    }

    // 87A rebate for Old Regime up to 5L taxable
    if (taxableOld <= 500000) {
      taxOld = 0;
    }
    const cessOld = taxOld * 0.04;
    const totalTaxOld = Math.round(taxOld + cessOld);

    const difference = Math.abs(totalTaxNew - totalTaxOld);
    const recommended = totalTaxNew <= totalTaxOld ? 'New Tax Regime' : 'Old Tax Regime';

    return {
      taxableNew,
      totalTaxNew,
      taxableOld,
      totalTaxOld,
      recommended,
      savings: difference,
    };
  }, [taxIncome, tax80CDeduction, tax80DDeduction]);

  // Filtered Schemes List
  const filteredSchemes = useMemo(() => {
    return FINANCE_INSURANCE_SCHEMES.filter((scheme) => {
      const matchCat =
        selectedCategory === 'All' || scheme.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchCat;

      const matchSearch =
        scheme.title.toLowerCase().includes(q) ||
        (scheme.hindiTitle && scheme.hindiTitle.toLowerCase().includes(q)) ||
        scheme.shortDesc.toLowerCase().includes(q) ||
        scheme.subCategory.toLowerCase().includes(q) ||
        scheme.searchKeywords.some((kw) => kw.toLowerCase().includes(q));

      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white p-6 sm:p-10 lg:p-12 border border-emerald-500/30 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black uppercase tracking-wider shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official Government Financial & Insurance Portal 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Government Insurance, Subsidized Loans & Financial Calculators
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Find verified information for <strong>Ayushman Bharat ₹5 Lakh Free Health Cover</strong>,{' '}
            <strong>Bihar Student Credit Card ₹4 Lakh @ 1%</strong>, <strong>PMJJBY Life Insurance</strong>,{' '}
            <strong>Mudra Loans</strong>, <strong>Atal Pension</strong>, and 100% free interactive loan & tax calculators.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 text-left">
            <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700/80">
              <span className="text-xl sm:text-2xl font-black text-emerald-400">₹5,00,000</span>
              <p className="text-[11px] text-slate-300 font-bold mt-0.5">Ayushman Free Health Cover</p>
            </div>
            <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700/80">
              <span className="text-xl sm:text-2xl font-black text-amber-400">₹4,00,000</span>
              <p className="text-[11px] text-slate-300 font-bold mt-0.5">Bihar Student Loan @ 1%</p>
            </div>
            <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700/80">
              <span className="text-xl sm:text-2xl font-black text-cyan-400">8.2% p.a.</span>
              <p className="text-[11px] text-slate-300 font-bold mt-0.5">Sukanya & Govt SSY Returns</p>
            </div>
            <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700/80">
              <span className="text-xl sm:text-2xl font-black text-purple-400">₹20 / Year</span>
              <p className="text-[11px] text-slate-300 font-bold mt-0.5">PMSBY ₹2 Lakh Accident Cover</p>
            </div>
          </div>

          {/* Search Box */}
          <div className="pt-2">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search insurance, loan schemes, PPF, Mudra, Ayushman card..."
                className="w-full pl-12 pr-10 py-3.5 bg-slate-900/90 text-white placeholder-slate-400 rounded-2xl border border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE FINANCIAL CALCULATORS SUITE */}
      <section id="calculators-suite" className="max-w-7xl mx-auto px-2 sm:px-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-2 text-emerald-700 font-black text-xs uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>100% Free Verified Calculators</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Interactive Financial & Loan Calculators
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-bold">
            Real-time Compound Interest & Tax Simulation
          </span>
        </div>

        {/* Calculator Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {FINANCIAL_CALCULATORS_LIST.map((calc) => (
            <button
              key={calc.id}
              onClick={() => setActiveCalculator(calc.id)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${
                activeCalculator === calc.id
                  ? 'bg-emerald-900 text-white border-2 border-emerald-600 shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{calc.name}</span>
            </button>
          ))}
        </div>

        {/* ACTIVE CALCULATOR PANEL */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          {/* CALCULATOR 1: LOAN EMI */}
          {activeCalculator === 'loan-emi' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-emerald-600" />
                    <span>Loan EMI & Interest Calculator</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Supports Bihar Student Credit Card (1%-4%), PM Mudra, Education & Home Loans.
                  </p>
                </div>

                {/* Presets */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-bold text-slate-400">Quick Presets:</span>
                  <button
                    onClick={() => {
                      setLoanAmount(400000);
                      setLoanInterestRate(1.0);
                      setLoanTenureYears(5);
                    }}
                    className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-900 rounded-lg text-xs font-black border border-purple-200"
                  >
                    Bihar Student (Girl/Divyang: 1%)
                  </button>
                  <button
                    onClick={() => {
                      setLoanAmount(400000);
                      setLoanInterestRate(4.0);
                      setLoanTenureYears(5);
                    }}
                    className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg text-xs font-black border border-blue-200"
                  >
                    Bihar Student (Boy: 4%)
                  </button>
                  <button
                    onClick={() => {
                      setLoanAmount(500000);
                      setLoanInterestRate(9.5);
                      setLoanTenureYears(5);
                    }}
                    className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-black border border-amber-200"
                  >
                    PM Mudra (9.5%)
                  </button>
                  <button
                    onClick={() => {
                      setLoanAmount(3000000);
                      setLoanInterestRate(8.5);
                      setLoanTenureYears(20);
                    }}
                    className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-lg text-xs font-black border border-emerald-200"
                  >
                    Home Loan (8.5%)
                  </button>
                </div>

                {/* Slider 1: Loan Amount */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-600">Loan Amount</span>
                    <span className="text-emerald-800 text-base font-black">
                      ₹{loanAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="10000000"
                    step="10000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>₹10,000</span>
                    <span>₹50 Lakhs</span>
                    <span>₹1 Crore</span>
                  </div>
                </div>

                {/* Slider 2: Interest Rate */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-600">Annual Interest Rate (% p.a.)</span>
                    <span className="text-emerald-800 text-base font-black">
                      {loanInterestRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="24"
                    step="0.1"
                    value={loanInterestRate}
                    onChange={(e) => setLoanInterestRate(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>0.5%</span>
                    <span>12%</span>
                    <span>24%</span>
                  </div>
                </div>

                {/* Slider 3: Loan Tenure */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-600">Loan Tenure</span>
                    <span className="text-emerald-800 text-base font-black">
                      {loanTenureYears} Years ({loanTenureYears * 12} Months)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={loanTenureYears}
                    onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>1 Year</span>
                    <span>15 Years</span>
                    <span>30 Years</span>
                  </div>
                </div>
              </div>

              {/* Calculation Summary Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl border border-emerald-500/30">
                <div className="space-y-4">
                  <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                    Monthly Repayment Summary
                  </span>
                  <div>
                    <span className="text-xs text-slate-300 font-bold block">Monthly EMI</span>
                    <span className="text-3xl sm:text-4xl font-black text-white">
                      ₹{emiCalculation.monthlyEmi.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Principal Amount:</span>
                      <span className="font-extrabold text-white">
                        ₹{loanAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Total Interest:</span>
                      <span className="font-extrabold text-amber-300">
                        ₹{emiCalculation.totalInterest.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-black pt-2 border-t border-slate-800">
                      <span className="text-emerald-300">Total Amount Payable:</span>
                      <span className="text-white">
                        ₹{emiCalculation.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 text-[11px] text-slate-300 space-y-1">
                  <p className="font-bold text-emerald-300">💡 Pro-Tip for Bihar Students:</p>
                  <p>
                    Under MNSSBY, no EMI is payable during your 3-4 years college study duration.
                    Repayment begins only after graduation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CALCULATOR 2: SIP WEALTH */}
          {activeCalculator === 'sip-wealth' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    <span>SIP & Mutual Fund Compounding Calculator</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    See how small monthly discipline compounds into wealth over time.
                  </p>
                </div>

                {/* Sliders */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-600">Monthly Investment</span>
                    <span className="text-emerald-800 text-base font-black">
                      ₹{sipMonthly.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={sipMonthly}
                    onChange={(e) => setSipMonthly(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>₹500</span>
                    <span>₹50,000</span>
                    <span>₹1,00,000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-600">Expected Annual Return (% p.a.)</span>
                    <span className="text-emerald-800 text-base font-black">
                      {sipReturnRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="0.5"
                    value={sipReturnRate}
                    onChange={(e) => setSipReturnRate(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>5% (Conservative)</span>
                    <span>12% (Nifty Index)</span>
                    <span>30%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-600">Time Horizon</span>
                    <span className="text-emerald-800 text-base font-black">
                      {sipTenureYears} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="35"
                    step="1"
                    value={sipTenureYears}
                    onChange={(e) => setSipTenureYears(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>1 Year</span>
                    <span>15 Years</span>
                    <span>35 Years</span>
                  </div>
                </div>
              </div>

              {/* SIP Summary */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl border border-blue-500/30">
                <div className="space-y-4">
                  <span className="text-xs font-black uppercase text-cyan-400 tracking-wider">
                    Maturity Wealth Projection
                  </span>
                  <div>
                    <span className="text-xs text-slate-300 font-bold block">Total Maturity Value</span>
                    <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                      ₹{sipCalculation.maturityValue.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Total Amount Invested:</span>
                      <span className="font-extrabold text-white">
                        ₹{sipCalculation.totalInvested.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Estimated Wealth Gained:</span>
                      <span className="font-extrabold text-cyan-300">
                        ₹{sipCalculation.wealthGained.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 text-[11px] text-slate-300 space-y-1">
                  <p className="font-bold text-cyan-300">📈 Power of Compounding:</p>
                  <p>
                    Your money makes ₹{sipCalculation.wealthGained.toLocaleString('en-IN')} solely through interest on interest over {sipTenureYears} years.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CALCULATOR 3: PPF & SUKANYA */}
          {activeCalculator === 'ppf-ssy' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>Public Provident Fund (PPF) & Sukanya (SSY) Calculator</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Guaranteed 100% Tax-Free Sovereign EEE Schemes backed by Government of India.
                  </p>
                </div>

                {/* Scheme Toggle */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPpfSsySchemeType('SSY')}
                    className={`flex-1 py-3 px-4 rounded-2xl text-xs font-black border transition cursor-pointer ${
                      ppfSsySchemeType === 'SSY'
                        ? 'bg-rose-900 text-white border-rose-600 shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                    }`}
                  >
                    👧 Sukanya Samriddhi (SSY - 8.2%)
                  </button>
                  <button
                    onClick={() => setPpfSsySchemeType('PPF')}
                    className={`flex-1 py-3 px-4 rounded-2xl text-xs font-black border transition cursor-pointer ${
                      ppfSsySchemeType === 'PPF'
                        ? 'bg-emerald-900 text-white border-emerald-600 shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                    }`}
                  >
                    🛡️ Public Provident Fund (PPF - 7.1%)
                  </button>
                </div>

                {/* Slider: Annual Deposit */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-600">Yearly Deposit Amount</span>
                    <span className="text-emerald-800 text-base font-black">
                      ₹{ppfSsyAnnualDeposit.toLocaleString('en-IN')} / Year
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="150000"
                    step="500"
                    value={ppfSsyAnnualDeposit}
                    onChange={(e) => setPpfSsyAnnualDeposit(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>₹500 (Min)</span>
                    <span>₹75,000</span>
                    <span>₹1,50,000 (Max 80C Cap)</span>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2 text-xs text-emerald-900">
                  <p className="font-extrabold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    Triple EEE Tax Exemption Status:
                  </p>
                  <p className="text-[11px] text-emerald-800">
                    1. Deposit is tax-exempt under Section 80C.<br />
                    2. Interest accrued every year is 100% tax-free.<br />
                    3. Final maturity payout is 100% tax-free in India.
                  </p>
                </div>
              </div>

              {/* SSY/PPF Summary */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-rose-950 text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl border border-rose-500/30">
                <div className="space-y-4">
                  <span className="text-xs font-black uppercase text-amber-300 tracking-wider">
                    {ppfSsySchemeType === 'SSY' ? 'Sukanya Samriddhi 21-Yr Corpus' : 'PPF 15-Yr Corpus'}
                  </span>
                  <div>
                    <span className="text-xs text-slate-300 font-bold block">100% Tax-Free Maturity Value</span>
                    <span className="text-3xl sm:text-4xl font-black text-amber-400">
                      ₹{ppfSsyCalculation.maturityValue.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Interest Rate:</span>
                      <span className="font-extrabold text-emerald-400">
                        {ppfSsyCalculation.ratePercent} p.a.
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Total Deposit ({ppfSsyCalculation.depositYears} yrs):</span>
                      <span className="font-extrabold text-white">
                        ₹{ppfSsyCalculation.totalInvested.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Total Guaranteed Interest:</span>
                      <span className="font-extrabold text-amber-300">
                        ₹{ppfSsyCalculation.totalInterest.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 text-[11px] text-slate-300 space-y-1">
                  <p className="font-bold text-amber-300">🎯 Zero Market Risk:</p>
                  <p>
                    Full sovereign guarantee backed directly by the Ministry of Finance, Government of India.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CALCULATOR 4: ATAL PENSION YOJANA (APY) */}
          {activeCalculator === 'apy-pension' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-indigo-600" />
                    <span>Atal Pension Yojana (APY) Contribution Calculator</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Find the exact monthly contribution for guaranteed lifetime pension after age 60.
                  </p>
                </div>

                {/* Age Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-600">Your Current Age (Entry Age)</span>
                    <span className="text-indigo-800 text-base font-black">
                      {apyAge} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="40"
                    step="1"
                    value={apyAge}
                    onChange={(e) => setApyAge(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>18 Years (Lowest Monthly Cost)</span>
                    <span>30 Years</span>
                    <span>40 Years (Max Entry)</span>
                  </div>
                </div>

                {/* Desired Pension Slabs */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-600">Select Desired Monthly Pension Slab:</span>
                  <div className="grid grid-cols-5 gap-2">
                    {[1000, 2000, 3000, 4000, 5000].map((p) => (
                      <button
                        key={p}
                        onClick={() => setApyDesiredPension(p)}
                        className={`py-2.5 px-2 rounded-xl text-xs font-black border transition cursor-pointer text-center ${
                          apyDesiredPension === p
                            ? 'bg-indigo-900 text-white border-indigo-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                        }`}
                      >
                        ₹{p.toLocaleString('en-IN')}/mo
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* APY Summary */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl border border-indigo-500/30">
                <div className="space-y-4">
                  <span className="text-xs font-black uppercase text-indigo-400 tracking-wider">
                    Guaranteed Lifetime Pension
                  </span>
                  <div>
                    <span className="text-xs text-slate-300 font-bold block">Monthly Auto-Debit Required</span>
                    <span className="text-3xl sm:text-4xl font-black text-amber-400">
                      ₹{apyCalculation.monthlyContribution} / month
                    </span>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Guaranteed Monthly Pension:</span>
                      <span className="font-extrabold text-emerald-400">
                        ₹{apyDesiredPension.toLocaleString('en-IN')} / mo for life
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Contribution Duration:</span>
                      <span className="font-extrabold text-white">
                        {apyCalculation.yearsRemaining} Years (till age 60)
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Total Contribution Paid:</span>
                      <span className="font-extrabold text-slate-300">
                        ₹{apyCalculation.totalContribution.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold pt-1 border-t border-slate-800">
                      <span className="text-indigo-300">Corpus Returned to Nominee:</span>
                      <span className="text-white">
                        ₹{apyCalculation.corpusToNominee.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 text-[11px] text-slate-300 space-y-1">
                  <p className="font-bold text-indigo-300">👨‍👩‍👧 Family Security:</p>
                  <p>
                    Subscriber gets pension for life. Afterward, spouse receives the same pension.
                    Upon demise of both, nominee receives the entire ₹8.5 Lakhs corpus.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CALCULATOR 5: INCOME TAX (NEW VS OLD) */}
          {activeCalculator === 'income-tax' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <BadgePercent className="w-5 h-5 text-emerald-600" />
                    <span>Income Tax Calculator & Regime Comparison (FY 2024-26)</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Find which regime saves you more money (Standard deduction ₹75,000 for New Regime).
                  </p>
                </div>

                {/* Gross Income Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-600">Annual Gross Salary / Income</span>
                    <span className="text-emerald-800 text-base font-black">
                      ₹{taxIncome.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="300000"
                    max="5000000"
                    step="25000"
                    value={taxIncome}
                    onChange={(e) => setTaxIncome(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>₹3 Lakhs</span>
                    <span>₹20 Lakhs</span>
                    <span>₹50 Lakhs</span>
                  </div>
                </div>

                {/* Section 80C Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-600">Section 80C Deductions (PPF, EPF, ELSS, LIC, Tuition)</span>
                    <span className="text-slate-800 text-sm font-black">
                      ₹{tax80CDeduction.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="150000"
                    step="5000"
                    value={tax80CDeduction}
                    onChange={(e) => setTax80CDeduction(Number(e.target.value))}
                    className="w-full accent-slate-600 cursor-pointer"
                  />
                </div>

                {/* Section 80D Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-600">Section 80D (Health Insurance Premium)</span>
                    <span className="text-slate-800 text-sm font-black">
                      ₹{tax80DDeduction.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="5000"
                    value={tax80DDeduction}
                    onChange={(e) => setTax80DDeduction(Number(e.target.value))}
                    className="w-full accent-slate-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Tax Comparison Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl border border-slate-700">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
                      Tax Comparison
                    </span>
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-[10px] font-black uppercase">
                      Recommended: {taxCalculation.recommended}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1">
                      <span className="text-[11px] text-slate-400 font-bold block">New Tax Regime</span>
                      <span className="text-xl font-black text-emerald-400">
                        ₹{taxCalculation.totalTaxNew.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-400 block">Std Ded: ₹75,000</span>
                    </div>

                    <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1">
                      <span className="text-[11px] text-slate-400 font-bold block">Old Tax Regime</span>
                      <span className="text-xl font-black text-amber-400">
                        ₹{taxCalculation.totalTaxOld.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-400 block">80C + 80D + Std Ded</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-emerald-950/60 rounded-2xl border border-emerald-500/40 text-xs text-emerald-200">
                    <p className="font-bold">
                      🎉 You save ₹{taxCalculation.savings.toLocaleString('en-IN')} by opting for the{' '}
                      <strong>{taxCalculation.recommended}</strong>!
                    </p>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 space-y-0.5">
                  <p>* Includes 4% Health and Education Cess.</p>
                  <p>* Under New Regime, income up to ₹7.75 Lakhs is 100% tax-free with Section 87A rebate & ₹75k std deduction.</p>
                </div>
              </div>
            </div>
          )}

          {/* CALCULATOR 6: FD & RD */}
          {activeCalculator === 'fd-rd' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Coins className="w-5 h-5 text-amber-500" />
                  <span>Fixed Deposit (FD) & Post Office Term Deposit Rates 2026</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Compare prevailing guaranteed interest rates across Public Sector Banks & India Post.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                  <span className="text-xs font-black text-amber-900 uppercase">Post Office Term Deposit (5 Yr)</span>
                  <p className="text-3xl font-black text-amber-900">7.5% p.a.</p>
                  <p className="text-xs text-slate-600">Eligible for Section 80C tax deduction up to ₹1.5 Lakh.</p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                  <span className="text-xs font-black text-emerald-900 uppercase">Senior Citizen Savings (SCSS)</span>
                  <p className="text-3xl font-black text-emerald-900">8.2% p.a.</p>
                  <p className="text-xs text-slate-600">Quarterly interest payout directly to savings account.</p>
                </div>

                <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                  <span className="text-xs font-black text-blue-900 uppercase">National Savings Cert. (NSC)</span>
                  <p className="text-3xl font-black text-blue-900">7.7% p.a.</p>
                  <p className="text-xs text-slate-600">5-year compounding with sovereign safety guarantee.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. SCHEME DIRECTORY WITH CATEGORY FILTER */}
      <section id="schemes-directory" className="max-w-7xl mx-auto px-2 sm:px-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-2 text-emerald-700 font-black text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Government Benefits Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Government Insurance, Savings & Loan Schemes
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-bold">
            Showing {filteredSchemes.length} Schemes
          </span>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['All', 'Insurance', 'Pension & Savings', 'Loans & Subsidies'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'All' ? '🌟 All Schemes' : cat}
            </button>
          ))}
        </div>

        {/* SCHEMES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              onClick={() => setSelectedSchemeDetail(scheme)}
              className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-wide ${
                      scheme.category === 'Insurance'
                        ? 'bg-emerald-100 text-emerald-900'
                        : scheme.category === 'Loans & Subsidies'
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {scheme.subCategory}
                  </span>
                  {scheme.popularTag && (
                    <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                      {scheme.popularTag}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-emerald-700 transition leading-snug">
                    {scheme.title}
                  </h3>
                  {scheme.hindiTitle && (
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">
                      {scheme.hindiTitle}
                    </p>
                  )}
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {scheme.shortDesc}
                </p>

                {/* Key Stat Box */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Max Benefit:</span>
                    <span className="font-black text-emerald-800">{scheme.maximumBenefit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Premium / Cost:</span>
                    <span className="font-bold text-slate-800">{scheme.premiumOrDeposit || scheme.interestRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Eligibility:</span>
                    <span className="font-bold text-slate-700">{scheme.ageLimit}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
                <span>View Full Details & Application Steps</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CLAIM ASSISTANCE & GRIEVANCE HELPLINE DIRECTORY */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-emerald-500/30 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-black uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4" /> Official Consumer Support
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Insurance Claim Assistance & Banking Grievance Redressal
              </h3>
            </div>
            <span className="text-xs text-slate-400">Toll-Free National Helplines</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-xs font-black text-emerald-300">Ayushman Bharat PM-JAY</span>
              <p className="text-lg font-black text-white">14555</p>
              <p className="text-[11px] text-slate-300">24x7 Hospital verification & Golden Card status.</p>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-xs font-black text-cyan-300">IRDAI Bima Bharosa (Insurance)</span>
              <p className="text-lg font-black text-white">155255 / 1800-4254-732</p>
              <p className="text-[11px] text-slate-300">File complaints for delayed or rejected insurance claims.</p>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-xs font-black text-amber-300">RBI Banking Ombudsman</span>
              <p className="text-lg font-black text-white">14448</p>
              <p className="text-[11px] text-slate-300">Bank fraud, loan disputes, unauthorized auto-debit.</p>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-xs font-black text-rose-300">Bihar MNSSBY Student Card</span>
              <p className="text-lg font-black text-white">1800-3456-444</p>
              <p className="text-[11px] text-slate-300">DRCC verification & student loan disbursement status.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GOOGLE HIGH-INTENT FAQS SECTION (FOR RICH SNIPPET SEO RANKING) */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4 space-y-6">
        <div className="flex items-center space-x-2 text-emerald-700 font-black text-xs uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Frequently Asked Questions & Search Answers</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Common Questions on Government Insurance, Loans & Pensions
        </h2>

        <div className="space-y-3">
          {GOOGLE_FINANCE_INSURANCE_FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition"
            >
              <button
                onClick={() => setExpandedFaqIndex(expandedFaqIndex === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-slate-900 text-sm sm:text-base cursor-pointer hover:text-emerald-700 transition"
              >
                <span>{faq.question}</span>
                {expandedFaqIndex === idx ? (
                  <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>
              {expandedFaqIndex === idx && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. DETAIL MODAL FOR SCHEMES */}
      {selectedSchemeDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl space-y-6 p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedSchemeDetail(null)}
              className="absolute right-5 top-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-2 pr-10">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-black rounded-lg uppercase">
                {selectedSchemeDetail.subCategory}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {selectedSchemeDetail.title}
              </h2>
              {selectedSchemeDetail.hindiTitle && (
                <p className="text-sm font-bold text-slate-600">
                  {selectedSchemeDetail.hindiTitle}
                </p>
              )}
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Overview</h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedSchemeDetail.overview}
              </p>
            </div>

            {/* Key Stats Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-1">
                <span className="text-[11px] font-black uppercase text-emerald-800">Key Benefit</span>
                <p className="text-xs sm:text-sm font-bold text-emerald-950">
                  {selectedSchemeDetail.keyBenefit}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[11px] font-black uppercase text-slate-500">Eligibility & Age Limit</span>
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  {selectedSchemeDetail.eligibility} (Age: {selectedSchemeDetail.ageLimit})
                </p>
              </div>
            </div>

            {/* Step-by-Step How to Apply */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                Step-by-Step Application Process
              </h4>
              <div className="space-y-2">
                {selectedSchemeDetail.howToApply.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                Required Documents
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedSchemeDetail.requiredDocuments.map((doc, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold border border-slate-200 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{doc}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              {selectedSchemeDetail.helplineNumber && (
                <div className="text-xs text-slate-500 font-bold flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <span>Helpline: {selectedSchemeDetail.helplineNumber}</span>
                </div>
              )}

              <a
                href={selectedSchemeDetail.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
              >
                <span>Visit Official Government Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
