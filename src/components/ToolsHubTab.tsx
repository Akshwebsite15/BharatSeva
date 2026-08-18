import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Percent,
  Coins,
  TrendingUp,
  Clock,
  Heart,
  Scale,
  DollarSign,
  FileSpreadsheet,
  Building,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Share2,
} from 'lucide-react';
import { POPULAR_TOOLS_DATA, PopularTool } from '../data/bharatSevaToolsData';

interface ToolsHubTabProps {
  initialToolId?: string;
  onOpenAiModal?: () => void;
  onSaveItem?: (title: string, type: string) => void;
}

export const ToolsHubTab: React.FC<ToolsHubTabProps> = ({
  initialToolId = 'emi-calc',
  onOpenAiModal,
  onSaveItem,
}) => {
  const [activeToolId, setActiveToolId] = useState<string>(initialToolId);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 1. EMI Calculator States
  const [emiPrincipal, setEmiPrincipal] = useState<number>(500000);
  const [emiRate, setEmiRate] = useState<number>(8.5);
  const [emiYears, setEmiYears] = useState<number>(5);

  // 2. SIP Calculator States
  const [sipMonthly, setSipMonthly] = useState<number>(5000);
  const [sipRate, setSipRate] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(10);

  // 3. FD Calculator States
  const [fdPrincipal, setFdPrincipal] = useState<number>(100000);
  const [fdRate, setFdRate] = useState<number>(7.1);
  const [fdYears, setFdYears] = useState<number>(5);

  // 4. RD Calculator States
  const [rdMonthly, setRdMonthly] = useState<number>(3000);
  const [rdRate, setRdRate] = useState<number>(6.7);
  const [rdYears, setRdYears] = useState<number>(3);

  // 5. Income Tax Calculator States
  const [taxIncome, setTaxIncome] = useState<number>(950000);
  const [tax80C, setTax80C] = useState<number>(150000);
  const [tax80D, setTax80D] = useState<number>(25000);

  // 6. GST Calculator States
  const [gstAmount, setGstAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstMode, setGstMode] = useState<'exclusive' | 'inclusive'>('exclusive');

  // 7. CGPA to Percentage States
  const [cgpaValue, setCgpaValue] = useState<number>(8.4);
  const [cgpaMultiplier, setCgpaMultiplier] = useState<number>(9.5); // CBSE standard 9.5, AICTE standard 10

  // 8. Percentage Calculator States
  const [obtainedMarks, setObtainedMarks] = useState<number>(435);
  const [totalMarks, setTotalMarks] = useState<number>(500);

  // 9. Age Calculator for Govt Exams
  const [dob, setDob] = useState<string>('2000-08-15');
  const [cutoffDate, setCutoffDate] = useState<string>('2026-08-01');
  const [examCategory, setExamCategory] = useState<'General' | 'OBC' | 'EBC' | 'SC' | 'ST' | 'EWS'>('General');

  // 10. BMI & Physical Standards States
  const [bmiHeightCm, setBmiHeightCm] = useState<number>(170);
  const [bmiWeightKg, setBmiWeightKg] = useState<number>(68);
  const [bmiGender, setBmiGender] = useState<'Male' | 'Female'>('Male');

  // 11. Salary / In-Hand CTC Calculator States
  const [grossAnnualCtc, setGrossAnnualCtc] = useState<number>(600000);

  // 12. Unit Converter States
  const [landValue, setLandValue] = useState<number>(1);
  const [landUnitFrom, setLandUnitFrom] = useState<'Bigha' | 'Katha' | 'Dhur' | 'Acre' | 'Decimal'>('Bigha');

  // 13. Currency Converter States
  const [currencyAmount, setCurrencyAmount] = useState<number>(100);
  const [currencyFrom, setCurrencyFrom] = useState<'USD' | 'EUR' | 'GBP' | 'AED' | 'CAD' | 'AUD'>('USD');

  // --- Calculations ---

  // EMI Calculation
  const emiResult = useMemo(() => {
    const p = emiPrincipal;
    const r = emiRate / 12 / 100;
    const n = emiYears * 12;
    if (r === 0 || n === 0) return { emi: 0, totalInterest: 0, totalPayment: p };
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;
    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
    };
  }, [emiPrincipal, emiRate, emiYears]);

  // SIP Calculation
  const sipResult = useMemo(() => {
    const p = sipMonthly;
    const i = sipRate / 12 / 100;
    const n = sipYears * 12;
    if (i === 0 || n === 0) return { invested: p * n, returns: 0, total: p * n };
    const total = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const invested = p * n;
    const returns = total - invested;
    return {
      invested: Math.round(invested),
      returns: Math.round(returns),
      total: Math.round(total),
    };
  }, [sipMonthly, sipRate, sipYears]);

  // FD Calculation (Quarterly Compounding)
  const fdResult = useMemo(() => {
    const p = fdPrincipal;
    const r = fdRate / 100;
    const n = 4; // Quarterly
    const t = fdYears;
    const total = p * Math.pow(1 + r / n, n * t);
    const interest = total - p;
    return {
      maturity: Math.round(total),
      interest: Math.round(interest),
    };
  }, [fdPrincipal, fdRate, fdYears]);

  // RD Calculation
  const rdResult = useMemo(() => {
    const p = rdMonthly;
    const r = rdRate / 100;
    const n = rdYears * 12;
    // Post Office RD formula
    let maturity = 0;
    for (let month = 1; month <= n; month++) {
      const timeYears = (n - month + 1) / 12;
      maturity += p * Math.pow(1 + r / 4, 4 * timeYears);
    }
    const invested = p * n;
    return {
      invested: Math.round(invested),
      interest: Math.round(maturity - invested),
      maturity: Math.round(maturity),
    };
  }, [rdMonthly, rdRate, rdYears]);

  // Income Tax Comparison (New vs Old)
  const taxResult = useMemo(() => {
    // New Regime (FY 2025-26 Budget Slabs with ₹75k Standard Deduction)
    const stdDeductionNew = 75000;
    const taxableNew = Math.max(0, taxIncome - stdDeductionNew);
    let taxNew = 0;
    if (taxableNew <= 300000) {
      taxNew = 0;
    } else if (taxableNew <= 700000) {
      taxNew = (taxableNew - 300000) * 0.05;
    } else if (taxableNew <= 1000000) {
      taxNew = 20000 + (taxableNew - 700000) * 0.10;
    } else if (taxableNew <= 1200000) {
      taxNew = 50000 + (taxableNew - 1000000) * 0.15;
    } else if (taxableNew <= 1500000) {
      taxNew = 80000 + (taxableNew - 1200000) * 0.20;
    } else {
      taxNew = 140000 + (taxableNew - 1500000) * 0.30;
    }
    // Section 87A rebate for taxable income <= 7 Lakhs (up to ₹25,000 rebate)
    if (taxableNew <= 700000) {
      taxNew = 0;
    }
    const cessNew = taxNew * 0.04;
    const totalTaxNew = Math.round(taxNew + cessNew);

    // Old Regime (₹50k Std Deduction + 80C + 80D)
    const stdDeductionOld = 50000;
    const taxableOld = Math.max(0, taxIncome - stdDeductionOld - Math.min(150000, tax80C) - Math.min(50000, tax80D));
    let taxOld = 0;
    if (taxableOld <= 250000) {
      taxOld = 0;
    } else if (taxableOld <= 500000) {
      taxOld = (taxableOld - 250000) * 0.05;
    } else if (taxableOld <= 1000000) {
      taxOld = 12500 + (taxableOld - 500000) * 0.20;
    } else {
      taxOld = 112500 + (taxableOld - 1000000) * 0.30;
    }
    if (taxableOld <= 500000) {
      taxOld = 0;
    }
    const cessOld = taxOld * 0.04;
    const totalTaxOld = Math.round(taxOld + cessOld);

    return {
      taxNew: totalTaxNew,
      taxOld: totalTaxOld,
      savings: Math.abs(totalTaxOld - totalTaxNew),
      recommended: totalTaxNew <= totalTaxOld ? 'New Tax Regime' : 'Old Tax Regime',
    };
  }, [taxIncome, tax80C, tax80D]);

  // GST Calculation
  const gstResult = useMemo(() => {
    const rate = gstRate / 100;
    if (gstMode === 'exclusive') {
      const gstVal = gstAmount * rate;
      return {
        base: gstAmount,
        cgst: gstVal / 2,
        sgst: gstVal / 2,
        totalGst: gstVal,
        totalAmount: gstAmount + gstVal,
      };
    } else {
      const base = gstAmount / (1 + rate);
      const gstVal = gstAmount - base;
      return {
        base: Math.round(base),
        cgst: Math.round(gstVal / 2),
        sgst: Math.round(gstVal / 2),
        totalGst: Math.round(gstVal),
        totalAmount: gstAmount,
      };
    }
  }, [gstAmount, gstRate, gstMode]);

  // CGPA to Percentage
  const cgpaPercentage = useMemo(() => {
    const pct = Math.min(100, Math.max(0, cgpaValue * cgpaMultiplier));
    let division = '1st Division (Honours / Distinction)';
    if (pct < 45) division = 'Pass / 3rd Division';
    else if (pct < 60) division = '2nd Division';
    else if (pct < 75) division = '1st Division';
    return {
      percentage: Number(pct.toFixed(2)),
      division,
    };
  }, [cgpaValue, cgpaMultiplier]);

  // Percentage Marks
  const marksPercentage = useMemo(() => {
    if (totalMarks <= 0) return { pct: 0, division: 'N/A' };
    const pct = (obtainedMarks / totalMarks) * 100;
    let division = '1st Division with Distinction';
    if (pct < 33) division = 'Failed / Below Passing Mark';
    else if (pct < 45) division = '3rd Division';
    else if (pct < 60) division = '2nd Division';
    else if (pct < 75) division = '1st Division';
    return {
      pct: Number(pct.toFixed(2)),
      division,
    };
  }, [obtainedMarks, totalMarks]);

  // Age Calculation
  const ageResult = useMemo(() => {
    const birth = new Date(dob);
    const cutoff = new Date(cutoffDate);
    if (isNaN(birth.getTime()) || isNaN(cutoff.getTime()) || cutoff < birth) {
      return { years: 0, months: 0, days: 0, eligibleGeneral: false, eligibleCategory: false };
    }

    let years = cutoff.getFullYear() - birth.getFullYear();
    let months = cutoff.getMonth() - birth.getMonth();
    let days = cutoff.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(cutoff.getFullYear(), cutoff.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Standard BPSC/SSC relaxation rules:
    // General Male: 37 years | General Female / OBC / EBC: 40 years | SC/ST: 42 years
    let maxAgeAllowed = 37;
    if (examCategory === 'OBC' || examCategory === 'EBC') maxAgeAllowed = 40;
    else if (examCategory === 'SC' || examCategory === 'ST') maxAgeAllowed = 42;

    const isEligible = years >= 18 && (years < maxAgeAllowed || (years === maxAgeAllowed && months === 0 && days === 0));

    return {
      years,
      months,
      days,
      maxAgeAllowed,
      isEligible,
    };
  }, [dob, cutoffDate, examCategory]);

  // BMI Calculation
  const bmiResult = useMemo(() => {
    const heightM = bmiHeightCm / 100;
    if (heightM <= 0) return { bmi: 0, category: 'Invalid', policeEligible: false };
    const bmi = bmiWeightKg / (heightM * heightM);
    let category = 'Normal Weight';
    let color = 'text-emerald-700 bg-emerald-50 border-emerald-200';

    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-amber-700 bg-amber-50 border-amber-200';
    } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Overweight';
      color = 'text-orange-700 bg-orange-50 border-orange-200';
    } else if (bmi >= 30) {
      category = 'Obese';
      color = 'text-rose-700 bg-rose-50 border-rose-200';
    }

    // Minimum height for Police / Defence (Bihar / Central):
    // Male General/OBC: 165 cm | Male SC/ST: 160 cm | Female All: 155 cm
    const minHeightRequired = bmiGender === 'Male' ? 165 : 155;
    const policeEligible = bmiHeightCm >= minHeightRequired && bmi >= 18.5 && bmi <= 27.5;

    return {
      bmi: Number(bmi.toFixed(1)),
      category,
      color,
      minHeightRequired,
      policeEligible,
    };
  }, [bmiHeightCm, bmiWeightKg, bmiGender]);

  // Salary / In-Hand CTC Calculation
  const salaryResult = useMemo(() => {
    const monthlyGross = grossAnnualCtc / 12;
    // Standard Indian salary structure:
    // Basic: 40% of CTC | HRA: 20% | Special Allowance: 40%
    const basic = monthlyGross * 0.40;
    const employeePf = Math.min(basic * 0.12, 1800); // 12% of basic capped standard
    const employerPf = employeePf;
    const profTax = 200; // Average State PT
    const gratuity = (basic * 15) / 26 / 12;
    const inHandMonthly = monthlyGross - employeePf - employerPf - profTax - gratuity;

    return {
      monthlyGross: Math.round(monthlyGross),
      basic: Math.round(basic),
      employeePf: Math.round(employeePf),
      profTax,
      inHandMonthly: Math.round(inHandMonthly),
      inHandAnnual: Math.round(inHandMonthly * 12),
    };
  }, [grossAnnualCtc]);

  // Land Unit Converter (Bihar & National standard)
  const landResult = useMemo(() => {
    // 1 Bigha (Bihar) = 20 Katha = 400 Dhur = 27,225 sq ft = 0.625 Acre = 62.5 Decimal
    let sqFt = 0;
    if (landUnitFrom === 'Bigha') sqFt = landValue * 27225;
    else if (landUnitFrom === 'Katha') sqFt = landValue * 1361.25;
    else if (landUnitFrom === 'Dhur') sqFt = landValue * 68.06;
    else if (landUnitFrom === 'Acre') sqFt = landValue * 43560;
    else if (landUnitFrom === 'Decimal') sqFt = landValue * 435.6;

    return {
      sqFt: Number(sqFt.toFixed(2)),
      bigha: Number((sqFt / 27225).toFixed(3)),
      katha: Number((sqFt / 1361.25).toFixed(2)),
      dhur: Number((sqFt / 68.06).toFixed(1)),
      acre: Number((sqFt / 43560).toFixed(4)),
      decimal: Number((sqFt / 435.6).toFixed(2)),
    };
  }, [landValue, landUnitFrom]);

  // Currency Converter (INR benchmark)
  const currencyRates: Record<string, number> = {
    USD: 86.85,
    EUR: 90.40,
    GBP: 108.50,
    AED: 23.65,
    CAD: 60.75,
    AUD: 54.20,
  };

  const convertedInr = useMemo(() => {
    const rate = currencyRates[currencyFrom] || 86.85;
    return Number((currencyAmount * rate).toFixed(2));
  }, [currencyAmount, currencyFrom]);

  // Filtered tools list
  const filteredTools = useMemo(() => {
    return POPULAR_TOOLS_DATA.filter((tool) => {
      const matchCat = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>100% Free Public Digital Calculators & Converters</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              BharatSeva Tools & Utilities Hub
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Instant, verified calculators for government exams, finance, income tax, admissions, land measurement, and applicant photo resizing.
            </p>
          </div>

          {onOpenAiModal && (
            <button
              onClick={onOpenAiModal}
              className="px-5 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-lg flex items-center gap-2 text-sm transition-all cursor-pointer shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Assistant Help</span>
            </button>
          )}
        </div>

        {/* Category Filter Pills & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {['All', 'Finance', 'Academic', 'Govt & Career', 'Health', 'Utility'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search calculator (e.g. EMI, Tax, Age)..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
            />
            <Calculator className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Main 2-Column Workstation: Left Tool Switcher, Right Active Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: List of All Tools */}
          <div className="lg:col-span-4 space-y-2 bg-white p-4 rounded-3xl border border-slate-200 shadow-xs max-h-[850px] overflow-y-auto">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 px-2 mb-3">
              Select Calculator ({filteredTools.length})
            </h3>
            <div className="space-y-1.5">
              {filteredTools.map((tool) => {
                const isSelected = activeToolId === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveToolId(tool.id)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-900 text-white border-blue-900 shadow-md'
                        : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-900'
                      }`}
                    >
                      {tool.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`font-bold text-xs sm:text-sm truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {tool.name}
                        </span>
                        {tool.badge && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-extrabold shrink-0 ${
                              isSelected ? 'bg-amber-400 text-slate-950' : 'bg-blue-100 text-blue-900'
                            }`}
                          >
                            {tool.badge}
                          </span>
                        )}
                      </div>
                      <p className={`text-[11px] line-clamp-1 mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                        {tool.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Active Calculator Workspace */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            {/* 1. EMI Calculator */}
            {activeToolId === 'emi-calc' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center font-bold">₹</span>
                      Loan EMI Calculator
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Home Loan, Education Loan, Mudra Loan & Vehicle Loan monthly payment estimator.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Loan Amount (₹)</label>
                    <input
                      type="number"
                      value={emiPrincipal}
                      onChange={(e) => setEmiPrincipal(Number(e.target.value))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                    <input
                      type="range"
                      min="50000"
                      max="10000000"
                      step="50000"
                      value={emiPrincipal}
                      onChange={(e) => setEmiPrincipal(Number(e.target.value))}
                      className="w-full accent-blue-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Interest Rate (% p.a.)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={emiRate}
                      onChange={(e) => setEmiRate(Number(e.target.value))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="0.25"
                      value={emiRate}
                      onChange={(e) => setEmiRate(Number(e.target.value))}
                      className="w-full accent-blue-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Tenure (Years)</label>
                    <input
                      type="number"
                      value={emiYears}
                      onChange={(e) => setEmiYears(Number(e.target.value))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={emiYears}
                      onChange={(e) => setEmiYears(Number(e.target.value))}
                      className="w-full accent-blue-900"
                    />
                  </div>
                </div>

                {/* Calculation Output Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-5 bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl shadow-sm">
                    <span className="text-xs font-medium text-blue-200">Monthly EMI Payable</span>
                    <div className="text-2xl font-black mt-1">₹{emiResult.emi.toLocaleString('en-IN')}</div>
                    <span className="text-[10px] text-blue-300">For {emiYears * 12} months</span>
                  </div>

                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-xs font-medium text-slate-500">Total Interest Amount</span>
                    <div className="text-2xl font-black text-rose-600 mt-1">₹{emiResult.totalInterest.toLocaleString('en-IN')}</div>
                    <span className="text-[10px] text-slate-400">Total interest over loan tenure</span>
                  </div>

                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-xs font-medium text-slate-500">Total Amount (Principal + Interest)</span>
                    <div className="text-2xl font-black text-slate-900 mt-1">₹{emiResult.totalPayment.toLocaleString('en-IN')}</div>
                    <span className="text-[10px] text-slate-400">Overall outflow</span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. SIP Calculator */}
            {activeToolId === 'sip-calc' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">📈</span>
                      Mutual Fund SIP Return Calculator
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Calculate the power of monthly compounding in equity index and mutual funds.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Monthly Investment (₹)</label>
                    <input
                      type="number"
                      value={sipMonthly}
                      onChange={(e) => setSipMonthly(Number(e.target.value))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                    <input
                      type="range"
                      min="500"
                      max="100000"
                      step="500"
                      value={sipMonthly}
                      onChange={(e) => setSipMonthly(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Expected Annual Return (% p.a.)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={sipRate}
                      onChange={(e) => setSipRate(Number(e.target.value))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="0.5"
                      value={sipRate}
                      onChange={(e) => setSipRate(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Time Period (Years)</label>
                    <input
                      type="number"
                      value={sipYears}
                      onChange={(e) => setSipYears(Number(e.target.value))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                    <input
                      type="range"
                      min="1"
                      max="35"
                      value={sipYears}
                      onChange={(e) => setSipYears(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-5 bg-gradient-to-br from-emerald-800 to-teal-950 text-white rounded-2xl shadow-sm">
                    <span className="text-xs font-medium text-emerald-200">Total Expected Wealth</span>
                    <div className="text-2xl font-black mt-1">₹{sipResult.total.toLocaleString('en-IN')}</div>
                    <span className="text-[10px] text-emerald-300">Compounded value at {sipYears} yrs</span>
                  </div>

                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-xs font-medium text-slate-500">Invested Amount</span>
                    <div className="text-2xl font-black text-slate-900 mt-1">₹{sipResult.invested.toLocaleString('en-IN')}</div>
                    <span className="text-[10px] text-slate-400">Total out-of-pocket deposits</span>
                  </div>

                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-xs font-medium text-slate-500">Estimated Wealth Gain</span>
                    <div className="text-2xl font-black text-emerald-600 mt-1">₹{sipResult.returns.toLocaleString('en-IN')}</div>
                    <span className="text-[10px] text-slate-400">Pure compounding gain</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Income Tax Calculator */}
            {activeToolId === 'income-tax-calc' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">🏛️</span>
                      Income Tax Calculator (FY 2025-26 / AY 2026-27)
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Direct comparative analysis of New Tax Regime vs Old Tax Regime with standard deductions.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Gross Annual Income (₹)</label>
                    <input
                      type="number"
                      value={taxIncome}
                      onChange={(e) => setTaxIncome(Number(e.target.value))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Section 80C Deduction (EPF/PPF/ELSS)</label>
                    <input
                      type="number"
                      max="150000"
                      value={tax80C}
                      onChange={(e) => setTax80C(Number(e.target.value))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Section 80D (Health Insurance)</label>
                    <input
                      type="number"
                      max="50000"
                      value={tax80D}
                      onChange={(e) => setTax80D(Number(e.target.value))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-5 bg-gradient-to-br from-blue-900 to-slate-900 text-white rounded-2xl shadow-sm">
                    <span className="text-xs font-medium text-blue-200">New Regime Tax (Default)</span>
                    <div className="text-2xl font-black mt-1">₹{taxResult.taxNew.toLocaleString('en-IN')}</div>
                    <span className="text-[10px] text-blue-300">Incl. ₹75K Std Deduction</span>
                  </div>

                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-xs font-medium text-slate-500">Old Regime Tax</span>
                    <div className="text-2xl font-black text-slate-900 mt-1">₹{taxResult.taxOld.toLocaleString('en-IN')}</div>
                    <span className="text-[10px] text-slate-400">With 80C & 80D exemptions</span>
                  </div>

                  <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl">
                    <span className="text-xs font-bold text-emerald-800">Best Option Recommended</span>
                    <div className="text-xl font-black text-emerald-700 mt-1">{taxResult.recommended}</div>
                    <span className="text-[11px] text-emerald-800 font-bold">
                      Saves ₹{taxResult.savings.toLocaleString('en-IN')} in tax
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. CGPA to Percentage Calculator */}
            {activeToolId === 'cgpa-calc' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-900 flex items-center justify-center font-bold">🎓</span>
                      CGPA to Percentage Calculator
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Convert 10-point CGPA into exact university percentage for CBSE, AICTE, UGC, and State Technical Universities.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Enter Your CGPA (out of 10.0)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={cgpaValue}
                      onChange={(e) => setCgpaValue(Number(e.target.value))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">University Conversion Formula Multiplier</label>
                    <select
                      value={cgpaMultiplier}
                      onChange={(e) => setCgpaMultiplier(Number(e.target.value))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    >
                      <option value={9.5}>CBSE / State Boards (CGPA × 9.5)</option>
                      <option value={10.0}>AICTE / Mumbai Univ (CGPA × 10.0)</option>
                      <option value={8.9}>AKTU / Bihar Tech Univ (CGPA - 0.75) × 10</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-5 bg-gradient-to-br from-indigo-900 to-blue-950 text-white rounded-2xl shadow-sm">
                    <span className="text-xs font-medium text-indigo-200">Calculated Percentage Equivalent</span>
                    <div className="text-3xl font-black mt-1">{cgpaPercentage.percentage}%</div>
                    <span className="text-[11px] text-indigo-300">Exact percentage for application forms</span>
                  </div>

                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-xs font-medium text-slate-500">Academic Division / Classification</span>
                    <div className="text-xl font-black text-slate-900 mt-1">{cgpaPercentage.division}</div>
                    <span className="text-[11px] text-slate-400">Standard recruitment grade</span>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Age Calculator */}
            {activeToolId === 'age-calc' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-900 flex items-center justify-center font-bold">🕒</span>
                      Age Calculator for Govt Exam Eligibility
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Check exact age in years, months, and days on official cutoff date with OBC/SC/ST/EWS relaxation.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Date of Birth (DOB)</label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Cutoff Date for Notification</label>
                    <input
                      type="date"
                      value={cutoffDate}
                      onChange={(e) => setCutoffDate(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Category Reservation</label>
                    <select
                      value={examCategory}
                      onChange={(e) => setExamCategory(e.target.value as any)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    >
                      <option value="General">General / UR (Max 37 Yrs)</option>
                      <option value="OBC">OBC / BC (Max 40 Yrs)</option>
                      <option value="EBC">EBC Bihar (Max 40 Yrs)</option>
                      <option value="SC">SC (Max 42 Yrs)</option>
                      <option value="ST">ST (Max 42 Yrs)</option>
                      <option value="EWS">EWS (Max 37 Yrs)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl shadow-sm">
                    <span className="text-xs font-medium text-slate-300">Exact Age on Cutoff Date</span>
                    <div className="text-2xl font-black mt-1">
                      {ageResult.years} Yrs, {ageResult.months} Mos, {ageResult.days} Days
                    </div>
                    <span className="text-[11px] text-slate-400">Calculated down to exact day</span>
                  </div>

                  <div className={`p-5 rounded-2xl border ${ageResult.isEligible ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                    <span className="text-xs font-bold text-slate-600">Recruitment Age Eligibility Status</span>
                    <div className={`text-xl font-black mt-1 ${ageResult.isEligible ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {ageResult.isEligible ? '✅ ELIGIBLE' : '❌ OVERAGE / INELIGIBLE'}
                    </div>
                    <span className="text-[11px] text-slate-600 font-medium">
                      Upper age limit for {examCategory}: {ageResult.maxAgeAllowed} Years
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 6. BMI & Physical Standards */}
            {activeToolId === 'bmi-calc' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-900 flex items-center justify-center font-bold">❤️</span>
                      BMI & Police Physical Standards Calculator
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Check height, weight, and BMI physical fitness for Bihar Police (Daroga/Constable), SSC GD, and Defence exams.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Height (in cm)</label>
                    <input
                      type="number"
                      value={bmiHeightCm}
                      onChange={(e) => setBmiHeightCm(Number(e.target.value))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Weight (in kg)</label>
                    <input
                      type="number"
                      value={bmiWeightKg}
                      onChange={(e) => setBmiWeightKg(Number(e.target.value))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Gender</label>
                    <select
                      value={bmiGender}
                      onChange={(e) => setBmiGender(e.target.value as any)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className={`p-5 rounded-2xl border ${bmiResult.color}`}>
                    <span className="text-xs font-bold">Calculated BMI Score</span>
                    <div className="text-3xl font-black mt-1">{bmiResult.bmi} kg/m²</div>
                    <span className="text-xs font-bold mt-1 inline-block">Category: {bmiResult.category}</span>
                  </div>

                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-xs font-medium text-slate-500">Police/Defence Physical Qualification</span>
                    <div className={`text-xl font-black mt-1 ${bmiResult.policeEligible ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {bmiResult.policeEligible ? '✅ Height & BMI Qualified' : '⚠️ Height / Weight Warning'}
                    </div>
                    <span className="text-[11px] text-slate-500">Min height requirement: {bmiResult.minHeightRequired} cm</span>
                  </div>
                </div>
              </div>
            )}

            {/* Other Calculators Fallback View */}
            {['fd-calc', 'rd-calc', 'gst-calc', 'salary-ctc-calc', 'percentage-calc', 'unit-converter', 'currency-converter'].includes(activeToolId) && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center font-bold">🧮</span>
                      {POPULAR_TOOLS_DATA.find((t) => t.id === activeToolId)?.name}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      {POPULAR_TOOLS_DATA.find((t) => t.id === activeToolId)?.description}
                    </p>
                  </div>
                </div>

                {activeToolId === 'gst-calc' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700">Amount (₹)</label>
                        <input
                          type="number"
                          value={gstAmount}
                          onChange={(e) => setGstAmount(Number(e.target.value))}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700">GST Slab (%)</label>
                        <select
                          value={gstRate}
                          onChange={(e) => setGstRate(Number(e.target.value))}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                        >
                          <option value={5}>5% (Essential Goods)</option>
                          <option value={12}>12% (Standard Goods)</option>
                          <option value={18}>18% (Services & IT)</option>
                          <option value={28}>28% (Luxury & Auto)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700">Calculation Mode</label>
                        <select
                          value={gstMode}
                          onChange={(e) => setGstMode(e.target.value as any)}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                        >
                          <option value="exclusive">Add GST (Exclusive)</option>
                          <option value="inclusive">Remove GST (Inclusive)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                        <span className="text-[11px] text-slate-500">Base Net Amount</span>
                        <div className="text-lg font-black text-slate-900 mt-1">₹{gstResult.base.toLocaleString('en-IN')}</div>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                        <span className="text-[11px] text-slate-500">CGST ({gstRate / 2}%)</span>
                        <div className="text-lg font-black text-blue-700 mt-1">₹{gstResult.cgst.toLocaleString('en-IN')}</div>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                        <span className="text-[11px] text-slate-500">SGST ({gstRate / 2}%)</span>
                        <div className="text-lg font-black text-blue-700 mt-1">₹{gstResult.sgst.toLocaleString('en-IN')}</div>
                      </div>
                      <div className="p-4 bg-blue-900 text-white rounded-2xl">
                        <span className="text-[11px] text-blue-200">Total Invoice Amount</span>
                        <div className="text-lg font-black mt-1">₹{gstResult.totalAmount.toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeToolId === 'unit-converter' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700">Enter Value</label>
                        <input
                          type="number"
                          value={landValue}
                          onChange={(e) => setLandValue(Number(e.target.value))}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700">From Land Unit</label>
                        <select
                          value={landUnitFrom}
                          onChange={(e) => setLandUnitFrom(e.target.value as any)}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                        >
                          <option value="Bigha">Bigha (20 Katha / 27,225 sq ft)</option>
                          <option value="Katha">Katha (20 Dhur / 1,361 sq ft)</option>
                          <option value="Dhur">Dhur (68 sq ft)</option>
                          <option value="Acre">Acre (43,560 sq ft)</option>
                          <option value="Decimal">Decimal (435.6 sq ft)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                        <span className="text-[11px] text-slate-500">Square Feet</span>
                        <div className="text-lg font-black text-slate-900 mt-1">{landResult.sqFt} sq ft</div>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                        <span className="text-[11px] text-slate-500">Bigha Equivalent</span>
                        <div className="text-lg font-black text-slate-900 mt-1">{landResult.bigha} Bigha</div>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                        <span className="text-[11px] text-slate-500">Katha Equivalent</span>
                        <div className="text-lg font-black text-slate-900 mt-1">{landResult.katha} Katha</div>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                        <span className="text-[11px] text-slate-500">Dhur Equivalent</span>
                        <div className="text-lg font-black text-slate-900 mt-1">{landResult.dhur} Dhur</div>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                        <span className="text-[11px] text-slate-500">Decimal (Dismil)</span>
                        <div className="text-lg font-black text-slate-900 mt-1">{landResult.decimal} Decimal</div>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                        <span className="text-[11px] text-slate-500">Acre Equivalent</span>
                        <div className="text-lg font-black text-slate-900 mt-1">{landResult.acre} Acre</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeToolId === 'currency-converter' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700">Foreign Currency Amount</label>
                        <input
                          type="number"
                          value={currencyAmount}
                          onChange={(e) => setCurrencyAmount(Number(e.target.value))}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700">From Currency</label>
                        <select
                          value={currencyFrom}
                          onChange={(e) => setCurrencyFrom(e.target.value as any)}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                        >
                          <option value="USD">USD ($ United States Dollar)</option>
                          <option value="EUR">EUR (€ Euro)</option>
                          <option value="GBP">GBP (£ British Pound)</option>
                          <option value="AED">AED (د.إ UAE Dirham)</option>
                          <option value="CAD">CAD (C$ Canadian Dollar)</option>
                          <option value="AUD">AUD (A$ Australian Dollar)</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl shadow-sm text-center">
                      <span className="text-xs font-medium text-blue-200">Converted Value in Indian Rupees (INR)</span>
                      <div className="text-3xl font-black mt-2">₹{convertedInr.toLocaleString('en-IN')}</div>
                      <span className="text-[11px] text-blue-300 mt-1 block">
                        1 {currencyFrom} ≈ ₹{currencyRates[currencyFrom]} INR
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
