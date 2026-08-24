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
  CreditCard,
  Sun,
  Zap,
  Award,
  Clock,
  BookOpen,
  Sliders,
  DollarSign,
  TrendingDown,
  Star,
  Check,
} from 'lucide-react';
import {
  FINANCE_INSURANCE_SCHEMES,
  FinanceScheme,
  TOP_CREDIT_CARDS_DATA,
  TOP_LOANS_DATA,
  TOP_INSURANCE_DATA,
  TOP_FD_RATES_DATA,
  HIGH_RPM_ARTICLES_GUIDES,
  FINANCIAL_CALCULATORS_LIST,
  GOOGLE_FINANCE_INSURANCE_FAQS,
  CreditCardItem,
  LoanComparisonItem,
  InsuranceComparisonItem,
  BankFdRateItem,
  HighRpmGuideArticle,
} from '../data/financeInsuranceData';
import { DynamicHighCpmAdSlot } from './DynamicHighCpmAdSlot';
import { useAdRefresh } from '../hooks/useAdRefresh';

interface FinanceInsuranceTabProps {
  onSaveItem?: (title: string, type: string) => void;
  onOpenPublicToolModal?: (toolId?: string) => void;
}

export const FinanceInsuranceTab: React.FC<FinanceInsuranceTabProps> = ({
  onSaveItem,
  onOpenPublicToolModal,
}) => {
  // Main Navigation / View Subtabs
  const [activeMainTab, setActiveMainTab] = useState<
    'schemes' | 'credit-cards' | 'loans' | 'insurance' | 'fd-rates' | 'solar' | 'calculators' | 'guides'
  >('schemes');

  // Dynamic High-CPM Ad Refresh on Subtab Navigation
  useAdRefresh({
    activeTab: 'finance-insurance',
    subTab: activeMainTab,
    category: 'finance-insurance',
    dwellRefreshIntervalSeconds: 35,
    enabled: true,
  });

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchemeCategory, setSelectedSchemeCategory] = useState<string>('All');
  const [selectedCreditCardFilter, setSelectedCreditCardFilter] = useState<string>('All');
  const [selectedLoanTypeFilter, setSelectedLoanTypeFilter] = useState<string>('All');
  const [selectedInsuranceFilter, setSelectedInsuranceFilter] = useState<string>('All');

  // Modal / Detail States
  const [selectedSchemeDetail, setSelectedSchemeDetail] = useState<FinanceScheme | null>(null);
  const [selectedGuideDetail, setSelectedGuideDetail] = useState<HighRpmGuideArticle | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [copiedToast, setCopiedToast] = useState<string | null>(null);

  // Active Calculator
  const [activeCalculator, setActiveCalculator] = useState<string>('loan-emi');

  // --- CALCULATOR STATES ---
  // 1. EMI Calculator
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [loanInterestRate, setLoanInterestRate] = useState<number>(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(5);

  // 2. SIP Calculator
  const [sipMonthly, setSipMonthly] = useState<number>(5000);
  const [sipReturnRate, setSipReturnRate] = useState<number>(12);
  const [sipTenureYears, setSipTenureYears] = useState<number>(15);

  // 3. Solar Rooftop Calculator
  const [solarCapacityKw, setSolarCapacityKw] = useState<number>(3);

  // 4. Term Insurance Estimator
  const [termAge, setTermAge] = useState<number>(28);
  const [termGender, setTermGender] = useState<'Male' | 'Female'>('Male');
  const [termIsSmoker, setTermIsSmoker] = useState<boolean>(false);
  const [termSumInsured, setTermSumInsured] = useState<number>(10000000); // 1 Crore

  // 5. CIBIL & Loan Affordability
  const [monthlySalary, setMonthlySalary] = useState<number>(45000);
  const [existingMonthlyEmi, setExistingMonthlyEmi] = useState<number>(5000);
  const [desiredLoanTenure, setDesiredLoanTenure] = useState<number>(5);
  const [expectedRate, setExpectedRate] = useState<number>(10.5);

  // 6. PPF / SSY
  const [ppfSsyAnnualDeposit, setPpfSsyAnnualDeposit] = useState<number>(100000);
  const [ppfSsySchemeType, setPpfSsySchemeType] = useState<'SSY' | 'PPF'>('SSY');

  // 7. APY Pension
  const [apyAge, setApyAge] = useState<number>(25);
  const [apyDesiredPension, setApyDesiredPension] = useState<number>(5000);

  // 8. Income Tax
  const [taxIncome, setTaxIncome] = useState<number>(900000);
  const [tax80CDeduction, setTax80CDeduction] = useState<number>(150000);
  const [tax80DDeduction, setTax80DDeduction] = useState<number>(25000);

  // --- CALCULATION HOOKS ---

  // 1. EMI
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

  // 2. SIP
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

  // 3. Solar Rooftop
  const solarCalculation = useMemo(() => {
    let subsidy = 0;
    if (solarCapacityKw === 1) subsidy = 30000;
    else if (solarCapacityKw === 2) subsidy = 60000;
    else subsidy = 78000;

    const estimatedTotalCost = solarCapacityKw * 62000;
    const netCostToUser = Math.max(0, estimatedTotalCost - subsidy);
    const roofAreaSqFt = solarCapacityKw * 100;
    const monthlyUnitsGenerated = solarCapacityKw * 125;
    const monthlySavingsRupees = monthlyUnitsGenerated * 7.5; // average ₹7.5/unit in domestic tiers
    const annualSavings = monthlySavingsRupees * 12;
    const paybackPeriodYears = (netCostToUser / annualSavings).toFixed(1);

    return {
      subsidy,
      estimatedTotalCost,
      netCostToUser,
      roofAreaSqFt,
      monthlyUnitsGenerated,
      monthlySavingsRupees: Math.round(monthlySavingsRupees),
      annualSavings: Math.round(annualSavings),
      paybackPeriodYears,
    };
  }, [solarCapacityKw]);

  // 4. Term Insurance Estimator
  const termInsuranceCalculation = useMemo(() => {
    // Base rate for 1 Cr at age 25 non-smoker is approx ₹550/mo
    let baseMonthly = 550;
    const ageDiff = Math.max(0, termAge - 25);
    baseMonthly += ageDiff * 35;
    if (termGender === 'Female') baseMonthly *= 0.88; // 12% discount for women
    if (termIsSmoker) baseMonthly *= 1.65; // smoker surcharge
    const multiplier = termSumInsured / 10000000; // factor for sum insured
    const finalMonthly = Math.round(baseMonthly * multiplier);
    const finalYearly = Math.round(finalMonthly * 11.2); // slight discount on yearly

    return {
      monthlyPremium: finalMonthly,
      yearlyPremium: finalYearly,
      sumInsuredFormatted: termSumInsured >= 10000000 ? `₹${termSumInsured / 10000000} Crore` : `₹${termSumInsured / 100000} Lakh`,
      taxSaving80C: Math.min(finalYearly, 150000),
    };
  }, [termAge, termGender, termIsSmoker, termSumInsured]);

  // 5. CIBIL & Loan Affordability
  const loanAffordabilityCalc = useMemo(() => {
    // Banks allow max 50% FOIR (Fixed Obligation to Income Ratio)
    const maxAllowedEmiTotal = monthlySalary * 0.50;
    const availableEmiForNewLoan = Math.max(0, maxAllowedEmiTotal - existingMonthlyEmi);
    const dtiRatio = Math.round(((existingMonthlyEmi) / monthlySalary) * 100);

    // Reverse EMI formula: P = EMI * ((1+r)^n - 1) / (r * (1+r)^n)
    const r = expectedRate / 12 / 100;
    const n = desiredLoanTenure * 12;
    let maxLoanAmount = 0;
    if (r > 0 && availableEmiForNewLoan > 0) {
      maxLoanAmount = (availableEmiForNewLoan * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
    }

    let cibilHealthStatus = 'Excellent (750+)';
    let cibilBadgeColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (dtiRatio > 40) {
      cibilHealthStatus = 'High Debt Burden (Need 700+ Score)';
      cibilBadgeColor = 'text-amber-700 bg-amber-50 border-amber-200';
    } else if (dtiRatio > 50) {
      cibilHealthStatus = 'Overleveraged (Risk of Rejection)';
      cibilBadgeColor = 'text-rose-700 bg-rose-50 border-rose-200';
    }

    return {
      maxAllowedEmiTotal: Math.round(maxAllowedEmiTotal),
      availableEmiForNewLoan: Math.round(availableEmiForNewLoan),
      dtiRatio,
      maxLoanAmount: Math.round(maxLoanAmount),
      cibilHealthStatus,
      cibilBadgeColor,
    };
  }, [monthlySalary, existingMonthlyEmi, desiredLoanTenure, expectedRate]);

  // 6. PPF & SSY
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

  // 7. APY
  const apyCalculation = useMemo(() => {
    const factorMap: Record<number, number> = {
      18: 42, 19: 46, 20: 50, 21: 54, 22: 59, 23: 64, 24: 70,
      25: 76, 26: 82, 27: 90, 28: 99, 29: 109, 30: 116, 31: 128,
      32: 144, 33: 160, 34: 177, 35: 196, 36: 218, 37: 242,
      38: 268, 39: 297, 40: 291,
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

  // 8. Income Tax
  const taxCalculation = useMemo(() => {
    const gross = taxIncome;
    const stdDeductionNew = 75000;
    const stdDeductionOld = 50000;

    // New Regime
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
        selectedSchemeCategory === 'All' || scheme.category === selectedSchemeCategory;
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
  }, [selectedSchemeCategory, searchQuery]);

  // Filtered Credit Cards
  const filteredCreditCards = useMemo(() => {
    return TOP_CREDIT_CARDS_DATA.filter((card) => {
      if (selectedCreditCardFilter === 'All') return true;
      return card.cardType === selectedCreditCardFilter;
    });
  }, [selectedCreditCardFilter]);

  // Filtered Loans
  const filteredLoans = useMemo(() => {
    return TOP_LOANS_DATA.filter((loan) => {
      if (selectedLoanTypeFilter === 'All') return true;
      return loan.loanType === selectedLoanTypeFilter;
    });
  }, [selectedLoanTypeFilter]);

  // Filtered Insurance
  const filteredInsurance = useMemo(() => {
    return TOP_INSURANCE_DATA.filter((item) => {
      if (selectedInsuranceFilter === 'All') return true;
      return item.insuranceType === selectedInsuranceFilter;
    });
  }, [selectedInsuranceFilter]);

  const handleCopyLink = (title: string, url: string) => {
    navigator.clipboard.writeText(url || window.location.href);
    setCopiedToast(`Copied link for "${title}"`);
    setTimeout(() => setCopiedToast(null), 3000);
  };

  return (
    <div className="min-h-screen pb-16 space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center space-x-2 border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{copiedToast}</span>
        </div>
      )}

      {/* 🚀 High RPM Live Ticker Header */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-blue-900/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <div className="relative z-10 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>High Value Citizen Finance & Insurance Hub 2026</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-300 font-medium bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Govt Rates, Bank FDs & Credit Cards</span>
            </div>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Finance, Insurance, Subsidized Loans & High-Yield Wealth Hub
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore verified guides for <strong>₹5 Lakh Free Ayushman Card</strong>, <strong>₹78,000 PM Surya Ghar Solar Subsidy</strong>, <strong>₹4 Lakh Bihar Student Loan @ 1%</strong>, <strong>Top 5% Cashback Credit Cards</strong>, and interactive financial calculators.
            </p>
          </div>

          {/* Quick Rate Badges Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2">
            <div className="bg-white/10 hover:bg-white/15 transition p-2.5 rounded-2xl border border-white/10 text-center">
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Home Loan Rate</p>
              <p className="text-sm font-bold text-amber-300">SBI @ 8.40%</p>
            </div>
            <div className="bg-white/10 hover:bg-white/15 transition p-2.5 rounded-2xl border border-white/10 text-center">
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Free Health Cover</p>
              <p className="text-sm font-bold text-emerald-300">₹5 - ₹10 Lakhs</p>
            </div>
            <div className="bg-white/10 hover:bg-white/15 transition p-2.5 rounded-2xl border border-white/10 text-center">
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Solar Subsidy</p>
              <p className="text-sm font-bold text-yellow-300">₹78,000 Direct</p>
            </div>
            <div className="bg-white/10 hover:bg-white/15 transition p-2.5 rounded-2xl border border-white/10 text-center">
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Post Office FD / SCSS</p>
              <p className="text-sm font-bold text-blue-300">8.2% Guaranteed</p>
            </div>
            <div className="bg-white/10 hover:bg-white/15 transition p-2.5 rounded-2xl border border-white/10 text-center">
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Online Cashback</p>
              <p className="text-sm font-bold text-purple-300">5% Unlimited</p>
            </div>
            <div className="bg-white/10 hover:bg-white/15 transition p-2.5 rounded-2xl border border-white/10 text-center">
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Bihar Student Loan</p>
              <p className="text-sm font-bold text-rose-300">1% Simple Int.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🧭 Master Navigation Subtabs */}
      <div className="bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center overflow-x-auto scrollbar-none gap-1.5 sm:gap-2">
          <button
            onClick={() => setActiveMainTab('schemes')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center space-x-2 ${
              activeMainTab === 'schemes'
                ? 'bg-blue-950 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Govt Schemes & Subsidies</span>
          </button>

          <button
            onClick={() => setActiveMainTab('credit-cards')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center space-x-2 ${
              activeMainTab === 'credit-cards'
                ? 'bg-blue-950 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4 text-amber-500" />
            <span>Best Credit Cards (5% Cashback)</span>
          </button>

          <button
            onClick={() => setActiveMainTab('loans')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center space-x-2 ${
              activeMainTab === 'loans'
                ? 'bg-blue-950 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Wallet className="w-4 h-4 text-emerald-500" />
            <span>Personal & Home Loans</span>
          </button>

          <button
            onClick={() => setActiveMainTab('insurance')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center space-x-2 ${
              activeMainTab === 'insurance'
                ? 'bg-blue-950 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            <span>1 Cr Term & Health Insurance</span>
          </button>

          <button
            onClick={() => setActiveMainTab('solar')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center space-x-2 ${
              activeMainTab === 'solar'
                ? 'bg-blue-950 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-500" />
            <span>PM Surya Ghar Solar (₹78k)</span>
          </button>

          <button
            onClick={() => setActiveMainTab('fd-rates')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center space-x-2 ${
              activeMainTab === 'fd-rates'
                ? 'bg-blue-950 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <PiggyBank className="w-4 h-4 text-purple-500" />
            <span>Top Bank FD Rates (9.0%)</span>
          </button>

          <button
            onClick={() => setActiveMainTab('calculators')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center space-x-2 ${
              activeMainTab === 'calculators'
                ? 'bg-blue-950 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-4 h-4 text-rose-500" />
            <span>Financial Calculators Suite</span>
          </button>

          <button
            onClick={() => setActiveMainTab('guides')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center space-x-2 ${
              activeMainTab === 'guides'
                ? 'bg-blue-950 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>CIBIL & Wealth Guides</span>
          </button>
        </div>
      </div>

      {/* Dynamic High-CPM Sponsored Banner (Refreshes on Subtab Switch without Page Reload) */}
      <DynamicHighCpmAdSlot
        slotId="finance-main-banner"
        category="finance-insurance"
        format="banner"
        showManualRefresh={true}
        className="shadow-md"
      />

      {/* ========================================================================= */}
      {/* 1. GOVERNMENT & COMMERCIAL SCHEMES TAB */}
      {/* ========================================================================= */}
      {activeMainTab === 'schemes' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search Ayushman, Mudra, Solar, PPF, SSY..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center overflow-x-auto scrollbar-none gap-1.5 w-full sm:w-auto">
              {['All', 'Insurance', 'Loans & Subsidies', 'Pension & Savings', 'Solar & Green Energy'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedSchemeCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedSchemeCategory === cat
                      ? 'bg-blue-950 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Schemes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-900/40 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-5 space-y-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-50 text-blue-950 border border-blue-200">
                      <span>{scheme.subCategory}</span>
                    </span>
                    {scheme.popularTag && (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>{scheme.popularTag}</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-950 transition line-clamp-2">
                      {scheme.title}
                    </h3>
                    {scheme.hindiTitle && (
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{scheme.hindiTitle}</p>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {scheme.shortDesc}
                  </p>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-slate-500 font-medium">Max Benefit:</span>
                      <span className="font-bold text-emerald-700">{scheme.maximumBenefit}</span>
                    </div>
                    {scheme.interestRate && (
                      <div className="flex items-center justify-between text-slate-700">
                        <span className="text-slate-500 font-medium">Interest / Rate:</span>
                        <span className="font-bold text-blue-950">{scheme.interestRate}</span>
                      </div>
                    )}
                    {scheme.ageLimit && (
                      <div className="flex items-center justify-between text-slate-700">
                        <span className="text-slate-500 font-medium">Age Limit:</span>
                        <span className="font-semibold text-slate-800">{scheme.ageLimit}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedSchemeDetail(scheme)}
                    className="flex-1 py-2 px-3 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Full Details & How to Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={scheme.officialPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-600 hover:text-blue-950 hover:bg-slate-200/70 rounded-xl transition"
                    title="Open Official Govt Portal"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TOP CREDIT CARDS (5% CASHBACK & LIFETIME FREE) TAB */}
      {/* ========================================================================= */}
      {activeMainTab === 'credit-cards' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 p-5 rounded-2xl border border-amber-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-amber-600" />
                <span>Top 5 Best Credit Cards in India (2026 Highest Rewards & Cashback)</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Save ₹25,000 to ₹50,000+ annually on shopping, grocery, fuel, and utility bills. Compare flat 5% cashback, Lifetime Free (LTF), and RuPay UPI scan-and-pay credit cards.
              </p>
            </div>
            <div className="flex items-center overflow-x-auto scrollbar-none gap-1.5 w-full md:w-auto">
              {['All', 'Cashback & Rewards', 'Lifetime Free (LTF)', 'RuPay UPI', 'Shopping & Travel', 'Fuel & Utility'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedCreditCardFilter(type)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedCreditCardFilter === type
                      ? 'bg-amber-900 text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCreditCards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 space-y-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-950 border border-amber-200">
                      <span>{card.cardType}</span>
                    </span>
                    {card.popularBadge && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>{card.popularBadge}</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">{card.cardName}</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">{card.issuer}</p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-slate-500 font-medium">Annual Fee:</span>
                      <span className="font-bold text-slate-900">{card.annualFee}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-slate-500 font-medium">Reward Rate:</span>
                      <span className="font-bold text-emerald-700">{card.rewardRate}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-slate-500 font-medium">Best For:</span>
                      <span className="font-semibold text-slate-800 line-clamp-1">{card.bestFor}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Key Perks & Benefits:</p>
                    <ul className="space-y-1">
                      {card.keyPerks.map((perk, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start space-x-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={card.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-amber-950 hover:bg-amber-900 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Check Eligibility on Bank Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. PERSONAL, HOME & EDUCATION LOANS TAB */}
      {/* ========================================================================= */}
      {activeMainTab === 'loans' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 p-5 rounded-2xl border border-emerald-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
                <Landmark className="w-5 h-5 text-emerald-600" />
                <span>Lowest Interest Personal, Home & Education Loans 2026</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Compare official bank interest rates, processing fee waivers, and special low-interest government loan guarantees (including Bihar Student Credit Card at 1%).
              </p>
            </div>
            <div className="flex items-center overflow-x-auto scrollbar-none gap-1.5 w-full md:w-auto">
              {['All', 'Personal Loan', 'Home Loan', 'Education Loan', 'Gold Loan'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedLoanTypeFilter(type)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedLoanTypeFilter === type
                      ? 'bg-emerald-950 text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredLoans.map((loan) => (
              <div
                key={loan.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 space-y-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-950 border border-emerald-200">
                      <span>{loan.loanType}</span>
                    </span>
                    {loan.badge && (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-900 border border-blue-300">
                        <span>{loan.badge}</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">{loan.bankName}</h3>
                    <p className="text-sm font-extrabold text-emerald-700 mt-1">Interest: {loan.interestRateRange}</p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-slate-500 font-medium">Max Loan:</span>
                      <span className="font-bold text-slate-900">{loan.maxAmount}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-slate-500 font-medium">Tenure:</span>
                      <span className="font-semibold text-slate-800">{loan.tenureRange}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-slate-500 font-medium">CIBIL Needed:</span>
                      <span className="font-bold text-blue-950">{loan.cibilRequirement}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-slate-500 font-medium">Processing Fee:</span>
                      <span className="font-medium text-slate-600">{loan.processingFee}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Key Features:</p>
                    <ul className="space-y-1">
                      {loan.features.map((feat, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={loan.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Apply on Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. TERM LIFE & HEALTH INSURANCE TAB */}
      {/* ========================================================================= */}
      {activeMainTab === 'insurance' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10 p-5 rounded-2xl border border-blue-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span>₹1 Crore Term Life & Comprehensive Health Insurance Plans (2026)</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Compare verified IRDAI Claim Settlement Ratios (CSR 99%+), zero room-rent capping, cashless hospital networks, and 100% tax benefits under Section 80C & 80D.
              </p>
            </div>
            <div className="flex items-center overflow-x-auto scrollbar-none gap-1.5 w-full md:w-auto">
              {['All', 'Term Life Insurance', 'Health & Medical Insurance'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedInsuranceFilter(type)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedInsuranceFilter === type
                      ? 'bg-blue-950 text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-blue-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredInsurance.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 space-y-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-50 text-blue-950 border border-blue-200">
                      <span>{item.insuranceType}</span>
                    </span>
                    {item.recommendedTag && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">
                        <Award className="w-3 h-3 text-emerald-600" />
                        <span>{item.recommendedTag}</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">{item.companyName}</h3>
                    <p className="text-xs text-blue-950 font-semibold mt-0.5">{item.planName}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-500 font-medium block">Starting Premium:</span>
                      <span className="font-bold text-emerald-700">{item.startingPremiumMonthly}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium block">Claim Ratio (CSR):</span>
                      <span className="font-bold text-blue-950">{item.claimSettlementRatio}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium block">Sum Insured:</span>
                      <span className="font-semibold text-slate-800">{item.sumInsuredRange}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium block">Network:</span>
                      <span className="font-semibold text-slate-800 line-clamp-1">{item.networkHospitalsOrGarages}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Plan Highlights:</p>
                    <ul className="space-y-1">
                      {item.keyHighlights.map((hl, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-[11px] text-slate-500 bg-amber-50/80 p-2 rounded-lg border border-amber-200/60 font-medium">
                    🏛️ <strong>Tax Saving:</strong> {item.taxExemption}
                  </p>
                </div>

                <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={item.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Get Instant Quote on Insurer Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. PM SURYA GHAR ROOFTOP SOLAR (₹78,000 SUBSIDY) TAB */}
      {/* ========================================================================= */}
      {activeMainTab === 'solar' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-yellow-950 text-white p-6 rounded-3xl border border-amber-500/30 shadow-xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase">
              <Sun className="w-3.5 h-3.5 text-yellow-400" />
              <span>₹75,000 Crore Central Government Mission</span>
            </div>
            <div className="max-w-2xl space-y-1.5">
              <h2 className="text-xl sm:text-3xl font-extrabold">PM Surya Ghar: Muft Bijli Yojana (Rooftop Solar)</h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Get up to <strong>₹78,000 direct bank cash subsidy</strong> to install solar panels on your house roof and reduce electricity bills to zero forever.
              </p>
            </div>
          </div>

          {/* Interactive Solar Calculator */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-6">
            <div className="border-b border-slate-200 pb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Interactive Rooftop Solar Sizing & Subsidy Calculator</h3>
                <p className="text-xs text-slate-500">Slide to select your home system size and see instant government subsidy and savings.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-extrabold">
                100% Free Solar Electricity
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Controls */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700 uppercase">Solar Capacity (kW):</label>
                    <span className="text-sm font-extrabold text-blue-950 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                      {solarCapacityKw} kW System
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={solarCapacityKw}
                    onChange={(e) => setSolarCapacityKw(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-950"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-semibold">
                    <span>1 kW (₹30k Subsidy)</span>
                    <span>2 kW (₹60k Subsidy)</span>
                    <span>3 kW+ (₹78k Max Subsidy)</span>
                    <span>5 kW</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="text-slate-500 font-medium">Estimated Gross Total Cost:</span>
                    <span className="font-bold text-slate-900">₹{solarCalculation.estimatedTotalCost.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-700 bg-emerald-50/80 p-2 rounded-xl border border-emerald-200 font-semibold">
                    <span>Direct Central DBT Subsidy:</span>
                    <span className="font-extrabold text-sm">₹{solarCalculation.subsidy.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="text-slate-500 font-medium">Net Cost to Citizen:</span>
                    <span className="font-bold text-blue-950 text-sm">₹{solarCalculation.netCostToUser.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="text-slate-500 font-medium">Unshaded Roof Space Needed:</span>
                    <span className="font-bold text-slate-800">{solarCalculation.roofAreaSqFt} Sq. Ft.</span>
                  </div>
                </div>
              </div>

              {/* Results Display */}
              <div className="lg:col-span-6 bg-gradient-to-br from-blue-950 to-slate-900 text-white p-6 rounded-2xl space-y-4 shadow-inner">
                <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">Your Financial Savings & ROI</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                    <p className="text-[11px] text-slate-300">Monthly Free Units:</p>
                    <p className="text-xl font-extrabold text-white mt-1">{solarCalculation.monthlyUnitsGenerated} Units</p>
                  </div>
                  <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                    <p className="text-[11px] text-slate-300">Monthly Bill Saved:</p>
                    <p className="text-xl font-extrabold text-emerald-400 mt-1">₹{solarCalculation.monthlySavingsRupees.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                    <p className="text-[11px] text-slate-300">Annual Net Savings:</p>
                    <p className="text-xl font-extrabold text-amber-300 mt-1">₹{solarCalculation.annualSavings.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                    <p className="text-[11px] text-slate-300">Payback Period:</p>
                    <p className="text-xl font-extrabold text-purple-300 mt-1">{solarCalculation.paybackPeriodYears} Years</p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  💡 <em>After {solarCalculation.paybackPeriodYears} years payback, you enjoy 100% free electricity for the remaining 20+ years of solar panel life!</em>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <a
                href="https://pmsuryaghar.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center space-x-2 shadow-md cursor-pointer"
              >
                <span>Apply for Solar Subsidy on pmsuryaghar.gov.in</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <span className="text-xs text-slate-500 font-medium">
                Helpline: <strong>15555 / 1800-180-3333</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. TOP BANK FD & SAVINGS RATES TAB */}
      {/* ========================================================================= */}
      {activeMainTab === 'fd-rates' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 p-5 rounded-2xl border border-purple-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
                <PiggyBank className="w-5 h-5 text-purple-600" />
                <span>Highest Fixed Deposit (FD) & Post Office Rates in India (2026)</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Earn up to 9.50% guaranteed interest on Fixed Deposits. 100% protected up to ₹5 Lakhs per bank under RBI\'s DICGC Insurance Guarantee.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Bank / Institution</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">General Citizen Rate</th>
                    <th className="py-3.5 px-4">Senior Citizen Rate</th>
                    <th className="py-3.5 px-4">Special Tenure</th>
                    <th className="py-3.5 px-4 text-right">Apply Online</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                  {TOP_FD_RATES_DATA.map((fd, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {fd.bankName}
                        {fd.dicgcInsured && (
                          <span className="block text-[10px] text-emerald-600 font-semibold">✓ DICGC ₹5 Lakh Insured</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                          {fd.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-blue-950">{fd.generalRateMax}</td>
                      <td className="py-3.5 px-4 font-extrabold text-emerald-700">{fd.seniorCitizenRateMax}</td>
                      <td className="py-3.5 px-4 text-slate-600">{fd.specialTenure}</td>
                      <td className="py-3.5 px-4 text-right">
                        <a
                          href={fd.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-950 text-white hover:bg-purple-900 transition cursor-pointer"
                        >
                          <span>Open FD</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. FINANCIAL CALCULATORS SUITE */}
      {/* ========================================================================= */}
      {activeMainTab === 'calculators' && (
        <div className="space-y-6">
          {/* Calculator Selector Tabs */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center overflow-x-auto scrollbar-none gap-2">
              {FINANCIAL_CALCULATORS_LIST.map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => setActiveCalculator(calc.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center space-x-2 ${
                    activeCalculator === calc.id
                      ? 'bg-blue-950 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>{calc.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 1. Loan EMI Calculator */}
          {activeCalculator === 'loan-emi' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Loan EMI & Repayment Calculator</h3>
                <p className="text-xs text-slate-500">Calculate exact monthly EMI and total interest for Home, Education, Car or Personal loans.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700 uppercase">Loan Amount (₹):</label>
                      <span className="text-sm font-extrabold text-blue-950">₹{loanAmount.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={50000}
                      max={10000000}
                      step={50000}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-950"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700 uppercase">Interest Rate (% p.a.):</label>
                      <span className="text-sm font-extrabold text-blue-950">{loanInterestRate}%</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      step={0.1}
                      value={loanInterestRate}
                      onChange={(e) => setLoanInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-950"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700 uppercase">Loan Tenure (Years):</label>
                      <span className="text-sm font-extrabold text-blue-950">{loanTenureYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={30}
                      step={1}
                      value={loanTenureYears}
                      onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-950"
                    />
                  </div>
                </div>

                <div className="lg:col-span-6 bg-gradient-to-br from-blue-950 to-slate-900 text-white p-6 rounded-2xl space-y-4 shadow-inner">
                  <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Loan EMI Breakdown</h4>
                  <div className="space-y-3">
                    <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                      <p className="text-xs text-slate-300">Monthly EMI Payout:</p>
                      <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
                        ₹{emiCalculation.monthlyEmi.toLocaleString()}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <p className="text-[11px] text-slate-400">Total Interest:</p>
                        <p className="text-base font-bold text-amber-300 mt-0.5">₹{emiCalculation.totalInterest.toLocaleString()}</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <p className="text-[11px] text-slate-400">Total Payment:</p>
                        <p className="text-base font-bold text-white mt-0.5">₹{emiCalculation.totalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. SIP Wealth Calculator */}
          {activeCalculator === 'sip-wealth' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-lg font-bold text-slate-900">SIP Mutual Fund Wealth & Compounding Multiplier</h3>
                <p className="text-xs text-slate-500">Estimate how small monthly investments grow exponentially into Crores through market compounding.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700 uppercase">Monthly SIP Amount (₹):</label>
                      <span className="text-sm font-extrabold text-blue-950">₹{sipMonthly.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={100000}
                      step={500}
                      value={sipMonthly}
                      onChange={(e) => setSipMonthly(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-950"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700 uppercase">Expected Return Rate (% p.a.):</label>
                      <span className="text-sm font-extrabold text-blue-950">{sipReturnRate}%</span>
                    </div>
                    <input
                      type="range"
                      min={6}
                      max={25}
                      step={0.5}
                      value={sipReturnRate}
                      onChange={(e) => setSipReturnRate(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-950"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700 uppercase">Investment Duration (Years):</label>
                      <span className="text-sm font-extrabold text-blue-950">{sipTenureYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={35}
                      step={1}
                      value={sipTenureYears}
                      onChange={(e) => setSipTenureYears(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-950"
                    />
                  </div>
                </div>

                <div className="lg:col-span-6 bg-gradient-to-br from-indigo-950 to-slate-900 text-white p-6 rounded-2xl space-y-4 shadow-inner">
                  <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Maturity Corpus Projection</h4>
                  <div className="space-y-3">
                    <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                      <p className="text-xs text-slate-300">Expected Total Maturity Value:</p>
                      <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
                        ₹{sipCalculation.maturityValue.toLocaleString()}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <p className="text-[11px] text-slate-400">Total Invested:</p>
                        <p className="text-base font-bold text-white mt-0.5">₹{sipCalculation.totalInvested.toLocaleString()}</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <p className="text-[11px] text-slate-400">Wealth Gained (Returns):</p>
                        <p className="text-base font-bold text-amber-300 mt-0.5">₹{sipCalculation.wealthGained.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. ₹1 Crore Term Insurance Estimator */}
          {activeCalculator === 'term-insurance-calc' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-lg font-bold text-slate-900">₹1 Crore Term Life Insurance Premium Estimator</h3>
                <p className="text-xs text-slate-500">Estimate your monthly and yearly premium for 1 Crore life cover based on age, gender and habits.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700 uppercase">Your Current Age:</label>
                      <span className="text-sm font-extrabold text-blue-950">{termAge} Years</span>
                    </div>
                    <input
                      type="range"
                      min={18}
                      max={60}
                      step={1}
                      value={termAge}
                      onChange={(e) => setTermAge(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-950"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">Gender:</label>
                      <div className="flex gap-2">
                        {(['Male', 'Female'] as const).map((g) => (
                          <button
                            key={g}
                            onClick={() => setTermGender(g)}
                            className={`flex-1 py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                              termGender === g
                                ? 'bg-blue-950 text-white border-blue-950'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">Tobacco / Smoking:</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setTermIsSmoker(false)}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                            !termIsSmoker
                              ? 'bg-emerald-700 text-white border-emerald-700'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          Non-Smoker
                        </button>
                        <button
                          onClick={() => setTermIsSmoker(true)}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                            termIsSmoker
                              ? 'bg-rose-700 text-white border-rose-700'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          Smoker
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">Sum Insured Life Cover:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[5000000, 10000000, 20000000].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setTermSumInsured(amt)}
                          className={`py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                            termSumInsured === amt
                              ? 'bg-blue-950 text-white border-blue-950'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {amt === 10000000 ? '₹1 Crore' : amt === 20000000 ? '₹2 Crore' : '₹50 Lakh'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-blue-950 text-white p-6 rounded-2xl space-y-4 shadow-inner">
                  <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Estimated Premium ({termInsuranceCalculation.sumInsuredFormatted})</h4>
                  <div className="space-y-3">
                    <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                      <p className="text-xs text-slate-300">Starting Monthly Premium:</p>
                      <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
                        ₹{termInsuranceCalculation.monthlyPremium.toLocaleString()} / Month
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <p className="text-[11px] text-slate-400">Yearly Premium:</p>
                        <p className="text-base font-bold text-amber-300 mt-0.5">₹{termInsuranceCalculation.yearlyPremium.toLocaleString()}</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <p className="text-[11px] text-slate-400">Section 80C Tax Save:</p>
                        <p className="text-base font-bold text-white mt-0.5">100% Tax Deductible</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. CIBIL & Loan Affordability Checker */}
          {activeCalculator === 'cibil-estimator' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Free CIBIL Eligibility & Loan Borrowing Affordability</h3>
                <p className="text-xs text-slate-500">Calculate your Debt-to-Income (DTI) ratio and maximum borrowing power across banks.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700 uppercase">Monthly Net Salary (₹):</label>
                      <span className="text-sm font-extrabold text-blue-950">₹{monthlySalary.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={15000}
                      max={300000}
                      step={5000}
                      value={monthlySalary}
                      onChange={(e) => setMonthlySalary(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-950"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700 uppercase">Existing Monthly EMIs (₹):</label>
                      <span className="text-sm font-extrabold text-blue-950">₹{existingMonthlyEmi.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={150000}
                      step={2000}
                      value={existingMonthlyEmi}
                      onChange={(e) => setExistingMonthlyEmi(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-950"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Tenure (Years):</label>
                      <input
                        type="number"
                        value={desiredLoanTenure}
                        onChange={(e) => setDesiredLoanTenure(Number(e.target.value))}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Interest Rate (%):</label>
                      <input
                        type="number"
                        step={0.1}
                        value={expectedRate}
                        onChange={(e) => setExpectedRate(Number(e.target.value))}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-blue-950 text-white p-6 rounded-2xl space-y-4 shadow-inner">
                  <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Your Borrowing Capacity</h4>
                  <div className="space-y-3">
                    <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                      <p className="text-xs text-slate-300">Max Eligible Loan Sanction:</p>
                      <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
                        ₹{loanAffordabilityCalc.maxLoanAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <p className="text-[11px] text-slate-400">Debt-to-Income (DTI):</p>
                        <p className="text-base font-bold text-amber-300 mt-0.5">{loanAffordabilityCalc.dtiRatio}%</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <p className="text-[11px] text-slate-400">Available New EMI:</p>
                        <p className="text-base font-bold text-white mt-0.5">₹{loanAffordabilityCalc.availableEmiForNewLoan.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="bg-white/10 p-2.5 rounded-xl text-xs text-slate-200 font-medium">
                      Status: <strong className="text-emerald-300">{loanAffordabilityCalc.cibilHealthStatus}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. Income Tax Comparison (New vs Old Regime) */}
          {activeCalculator === 'income-tax' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Income Tax Calculator (New vs Old Tax Regime FY 2024-26)</h3>
                <p className="text-xs text-slate-500">Compare tax payable under both regimes, ₹75,000 standard deduction, and Section 87A rebate.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Annual Gross Income (₹):</label>
                    <input
                      type="number"
                      step={50000}
                      value={taxIncome}
                      onChange={(e) => setTaxIncome(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-extrabold text-blue-950"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">80C Investments (PPF, EPF, ELSS, LIC, Home Principal):</label>
                    <input
                      type="number"
                      step={10000}
                      value={tax80CDeduction}
                      onChange={(e) => setTax80CDeduction(Number(e.target.value))}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">80D Health Insurance Premium (Self & Parents):</label>
                    <input
                      type="number"
                      step={5000}
                      value={tax80DDeduction}
                      onChange={(e) => setTax80DDeduction(Number(e.target.value))}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                    />
                  </div>
                </div>

                <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-blue-950 text-white p-6 rounded-2xl space-y-4 shadow-inner">
                  <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Regime Comparison</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                      <p className="text-[11px] text-slate-400 font-bold uppercase">New Regime Tax</p>
                      <p className="text-xl font-extrabold text-emerald-400 mt-1">₹{taxCalculation.totalTaxNew.toLocaleString()}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">Std Ded: ₹75,000</span>
                    </div>
                    <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                      <p className="text-[11px] text-slate-400 font-bold uppercase">Old Regime Tax</p>
                      <p className="text-xl font-extrabold text-amber-300 mt-1">₹{taxCalculation.totalTaxOld.toLocaleString()}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">With 80C + 80D</span>
                    </div>
                  </div>

                  <div className="bg-emerald-500/20 border border-emerald-400/40 p-3 rounded-xl text-xs text-emerald-200 font-semibold">
                    ⭐ <strong>Recommended:</strong> {taxCalculation.recommended} (Saves ₹{taxCalculation.savings.toLocaleString()})
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. PPF & SSY Calculator */}
          {activeCalculator === 'ppf-ssy' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-lg font-bold text-slate-900">PPF & Sukanya Samriddhi (SSY) Tax-Free Calculator</h3>
                <p className="text-xs text-slate-500">Calculate guaranteed 15-21 year returns on highest sovereign rate schemes with 100% EEE tax exemption.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">Select Scheme:</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPpfSsySchemeType('SSY')}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                          ppfSsySchemeType === 'SSY'
                            ? 'bg-blue-950 text-white border-blue-950'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Sukanya Samriddhi (8.2%)
                      </button>
                      <button
                        onClick={() => setPpfSsySchemeType('PPF')}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                          ppfSsySchemeType === 'PPF'
                            ? 'bg-blue-950 text-white border-blue-950'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Public Provident Fund (7.1%)
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700 uppercase">Annual Deposit (₹):</label>
                      <span className="text-sm font-extrabold text-blue-950">₹{ppfSsyAnnualDeposit.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={1000}
                      max={150000}
                      step={5000}
                      value={ppfSsyAnnualDeposit}
                      onChange={(e) => setPpfSsyAnnualDeposit(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-950"
                    />
                  </div>
                </div>

                <div className="lg:col-span-6 bg-gradient-to-br from-blue-950 to-slate-900 text-white p-6 rounded-2xl space-y-4 shadow-inner">
                  <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Maturity Amount (100% Tax Free)</h4>
                  <div className="space-y-3">
                    <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                      <p className="text-xs text-slate-300">Total Tax-Free Maturity Corpus:</p>
                      <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
                        ₹{ppfSsyCalculation.maturityValue.toLocaleString()}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <p className="text-[11px] text-slate-400">Total Invested:</p>
                        <p className="text-base font-bold text-white mt-0.5">₹{ppfSsyCalculation.totalInvested.toLocaleString()}</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <p className="text-[11px] text-slate-400">Total Interest Earned:</p>
                        <p className="text-base font-bold text-amber-300 mt-0.5">₹{ppfSsyCalculation.totalInterest.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. APY Pension Calculator */}
          {activeCalculator === 'apy-pension' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Atal Pension Yojana (APY) Monthly Contribution Calculator</h3>
                <p className="text-xs text-slate-500">Calculate exact monthly auto-debit contribution required from your bank account for ₹1,000 to ₹5,000 guaranteed pension.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700 uppercase">Your Entry Age (18 to 40 Years):</label>
                      <span className="text-sm font-extrabold text-blue-950">{apyAge} Years Old</span>
                    </div>
                    <input
                      type="range"
                      min={18}
                      max={40}
                      step={1}
                      value={apyAge}
                      onChange={(e) => setApyAge(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-950"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1.5">Desired Guaranteed Monthly Pension (After Age 60):</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {[1000, 2000, 3000, 4000, 5000].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setApyDesiredPension(amt)}
                          className={`py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                            apyDesiredPension === amt
                              ? 'bg-blue-950 text-white border-blue-950'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          ₹{amt}/mo
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-gradient-to-br from-blue-950 to-slate-900 text-white p-6 rounded-2xl space-y-4 shadow-inner">
                  <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Required Contribution</h4>
                  <div className="space-y-3">
                    <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                      <p className="text-xs text-slate-300">Monthly Bank Auto-Debit:</p>
                      <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
                        ₹{apyCalculation.monthlyContribution} / Month
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <p className="text-[11px] text-slate-400">Total Contribution (till 60):</p>
                        <p className="text-base font-bold text-white mt-0.5">₹{apyCalculation.totalContribution.toLocaleString()}</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <p className="text-[11px] text-slate-400">Nominee Corpus Return:</p>
                        <p className="text-base font-bold text-amber-300 mt-0.5">₹{apyCalculation.corpusToNominee.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. HIGH VALUE FINANCIAL & WEALTH GUIDES */}
      {/* ========================================================================= */}
      {activeMainTab === 'guides' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-indigo-500/10 p-5 rounded-2xl border border-indigo-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <span>Expert Financial Guides & Wealth Strategies</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Step-by-step verified tutorials to build a 750+ CIBIL score, claim maximum solar subsidies, and pick the right insurance without middlemen.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {HIGH_RPM_ARTICLES_GUIDES.map((guide) => (
              <div
                key={guide.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-bold text-indigo-900">
                    <span className="bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">{guide.category}</span>
                    <span className="text-slate-400">{guide.readTime}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug hover:text-indigo-950 transition">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{guide.summary}</p>
                </div>

                <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedGuideDetail(guide)}
                    className="w-full py-2 px-3 bg-indigo-950 hover:bg-indigo-900 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>Read Complete Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* HIGH COMMERCIAL INTENT FREQUENTLY ASKED QUESTIONS */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex items-center space-x-2.5">
          <HelpCircle className="w-6 h-6 text-blue-950" />
          <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions (High Intent Finance & Insurance)</h2>
        </div>

        <div className="divide-y divide-slate-200 space-y-2">
          {GOOGLE_FINANCE_INSURANCE_FAQS.map((faq, index) => {
            const isExpanded = expandedFaqIndex === index;
            return (
              <div key={index} className="pt-3">
                <button
                  onClick={() => setExpandedFaqIndex(isExpanded ? null : index)}
                  className="w-full flex items-center justify-between py-2 text-left font-bold text-sm text-slate-900 hover:text-blue-950 transition cursor-pointer"
                >
                  <span className="pr-4">{faq.question}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 shrink-0 text-blue-950" /> : <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />}
                </button>
                {isExpanded && (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pb-3 pt-1 animate-fadeIn">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DETAIL MODAL: SCHEME APPLICATION GUIDE */}
      {/* ========================================================================= */}
      {selectedSchemeDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
          <div className="bg-white w-full max-w-3xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-950 to-slate-900 text-white flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/30 text-blue-200 border border-blue-400/30 uppercase">
                  {selectedSchemeDetail.category} • {selectedSchemeDetail.subCategory}
                </span>
                <h2 className="text-lg sm:text-2xl font-bold leading-tight">{selectedSchemeDetail.title}</h2>
                {selectedSchemeDetail.hindiTitle && (
                  <p className="text-xs text-slate-300 font-medium">{selectedSchemeDetail.hindiTitle}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedSchemeDetail(null)}
                className="p-2 text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Scheme Overview:</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedSchemeDetail.overview}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 font-medium block">Key Benefit:</span>
                  <span className="font-bold text-slate-900">{selectedSchemeDetail.keyBenefit}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Eligibility:</span>
                  <span className="font-bold text-slate-900">{selectedSchemeDetail.eligibility}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Age Limit:</span>
                  <span className="font-semibold text-slate-800">{selectedSchemeDetail.ageLimit}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Premium / Deposit:</span>
                  <span className="font-bold text-emerald-700">{selectedSchemeDetail.premiumOrDeposit || 'Free / As Applicable'}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Step-by-Step How to Apply:</h3>
                <ol className="space-y-2">
                  {selectedSchemeDetail.howToApply.map((step, index) => (
                    <li key={index} className="text-xs sm:text-sm text-slate-700 flex items-start space-x-2.5">
                      <span className="w-5 h-5 rounded-full bg-blue-950 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Required Documents Checklist:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSchemeDetail.requiredDocuments.map((doc, index) => (
                    <span key={index} className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-950 border border-blue-200 text-xs font-medium">
                      <FileText className="w-3.5 h-3.5 text-blue-700" />
                      <span>{doc}</span>
                    </span>
                  ))}
                </div>
              </div>

              {selectedSchemeDetail.helplineNumber && (
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs flex items-center justify-between text-amber-900 font-medium">
                  <div className="flex items-center space-x-2">
                    <PhoneCall className="w-4 h-4 text-amber-700" />
                    <span>Official Citizen Helpline:</span>
                  </div>
                  <strong className="font-bold text-amber-950">{selectedSchemeDetail.helplineNumber}</strong>
                </div>
              )}
            </div>

            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => handleCopyLink(selectedSchemeDetail.title, selectedSchemeDetail.officialPortalUrl)}
                className="py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Link</span>
              </button>

              <a
                href={selectedSchemeDetail.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-6 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 cursor-pointer shadow-md"
              >
                <span>Go to Official Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DETAIL MODAL: GUIDE ARTICLE READER */}
      {/* ========================================================================= */}
      {selectedGuideDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
          <div className="bg-white w-full max-w-3xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 sm:p-6 bg-gradient-to-r from-indigo-950 to-slate-900 text-white flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 uppercase">
                  {selectedGuideDetail.category} • {selectedGuideDetail.readTime}
                </span>
                <h2 className="text-lg sm:text-xl font-bold leading-tight">{selectedGuideDetail.title}</h2>
              </div>
              <button
                onClick={() => setSelectedGuideDetail(null)}
                className="p-2 text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
              <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200 leading-relaxed font-medium">
                {selectedGuideDetail.summary}
              </p>

              {selectedGuideDetail.sections.map((sec, i) => (
                <div key={i} className="space-y-3">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">{sec.heading}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{sec.body}</p>

                  {sec.tableData && (
                    <div className="overflow-x-auto rounded-xl border border-slate-200 mt-2">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 font-bold text-slate-700 border-b border-slate-200">
                          <tr>
                            {sec.tableData.headers.map((h, hi) => (
                              <th key={hi} className="p-2.5">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {sec.tableData.rows.map((row, ri) => (
                            <tr key={ri} className="hover:bg-slate-50">
                              {row.map((cell, ci) => (
                                <td key={ci} className="p-2.5 font-medium text-slate-800">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {sec.bulletPoints && (
                    <ul className="space-y-1.5 pl-2">
                      {sec.bulletPoints.map((bp, bpi) => (
                        <li key={bpi} className="text-xs sm:text-sm text-slate-700 flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedGuideDetail(null)}
                className="py-2 px-6 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
