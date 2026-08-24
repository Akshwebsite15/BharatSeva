import React, { useState } from 'react';
import {
  Building,
  Home,
  Calculator,
  Search,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  MapPin,
  FileText,
  BadgePercent,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Zap,
  ArrowRight,
} from 'lucide-react';
import {
  TOP_CITIES_REAL_ESTATE,
  HOME_LOAN_OFFERS,
  REAL_ESTATE_GUIDES,
  RealEstateCityPrice,
  HomeLoanOffer,
  RealEstateGuide,
} from '../data/realEstateData';

interface RealEstateTabProps {
  onSaveItem?: (title: string, type: string) => void;
  onOpenPublicToolModal?: (toolId?: string) => void;
}

export const RealEstateTab: React.FC<RealEstateTabProps> = ({
  onSaveItem,
  onOpenPublicToolModal,
}) => {
  const [subTab, setSubTab] = useState<'prices' | 'loans' | 'guides' | 'calculator'>('prices');
  const [selectedCity, setSelectedCity] = useState<string>('Patna');
  const [guideCategoryFilter, setGuideCategoryFilter] = useState<string>('All');

  // Interactive Home Loan EMI Calculator state
  const [loanAmount, setLoanAmount] = useState<number>(4000000); // 40 Lakhs
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5%
  const [loanTenureYears, setLoanTenureYears] = useState<number>(20); // 20 years

  // EMI Math
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = loanTenureYears * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const currentCityData = TOP_CITIES_REAL_ESTATE.find((c) => c.city === selectedCity) || TOP_CITIES_REAL_ESTATE[0];

  const filteredGuides =
    guideCategoryFilter === 'All'
      ? REAL_ESTATE_GUIDES
      : REAL_ESTATE_GUIDES.filter((g) => g.category === guideCategoryFilter);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 border border-amber-400/30 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Building className="w-3.5 h-3.5" />
            <span>High-Yield Real Estate & Property Intelligence 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Real Estate Rates, Home Loans & Land Registry
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Verified city-wise property circle rates, Lowest 8.40% Home Loan interest comparisons, step-by-step Dakhil-Kharij (Mutation) guides, and official RERA project checkers.
          </p>

          {/* Quick Partner CTA Ribbon */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="https://omg10.com/4/11640571"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-extrabold rounded-xl shadow-md transition hover:scale-105"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Direct Pre-Approved Home Loan Eligibility Server</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => setSubTab('calculator')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <span>Live EMI Calculator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subtab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'prices', label: 'Property Prices & Circle Rates', icon: MapPin },
          { id: 'loans', label: 'Home Loan Comparison', icon: BadgePercent },
          { id: 'calculator', label: 'Home Loan EMI Calculator', icon: Calculator },
          { id: 'guides', label: 'Land Registry & Mutation Guides', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 🏙️ SUBTAB 1: PROPERTY PRICES & CIRCLE RATES */}
      {subTab === 'prices' && (
        <div className="space-y-6">
          {/* City Selection Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {TOP_CITIES_REAL_ESTATE.map((cityObj) => (
              <button
                key={cityObj.city}
                onClick={() => setSelectedCity(cityObj.city)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedCity === cityObj.city
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cityObj.city} ({cityObj.state})
              </button>
            ))}
          </div>

          {/* Selected City Overview Card */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">
                  Verified Local Benchmark
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {currentCityData.city} Property Market & Valuation
                </h2>
                <p className="text-xs text-slate-500">{currentCityData.state}</p>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Average Price</div>
                  <div className="text-base font-black text-slate-900">{currentCityData.avgPriceSqFt}</div>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Rental Yield</div>
                  <div className="text-base font-black text-emerald-600">{currentCityData.rentalYield}</div>
                </div>
              </div>
            </div>

            {/* Top Localities Table */}
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>Top High-Growth Localities & Micro-Markets</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600 border-collapse">
                  <thead className="bg-slate-50 text-slate-800 text-[11px] font-black uppercase border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Locality / Corridor</th>
                      <th className="py-3 px-4">Current Price Range</th>
                      <th className="py-3 px-4">Annual Appreciation</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {currentCityData.topLocalities.map((loc, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition">
                        <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span>{loc.name}</span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-700">{loc.rate}</td>
                        <td className="py-3.5 px-4">
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-bold text-[11px]">
                            {loc.growth}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <a
                            href="https://omg10.com/4/11640571"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            <span>Check Rates</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Circle Rate Notice */}
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Official Government Circle Rate Policy:</strong> {currentCityData.circleRate}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 💰 SUBTAB 2: HOME LOAN COMPARISON */}
      {subTab === 'loans' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOME_LOAN_OFFERS.map((loan, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 flex flex-col justify-between space-y-4 hover:shadow-md transition"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-extrabold text-slate-900 text-base">{loan.bank}</h3>
                    <span className="bg-emerald-50 text-emerald-700 font-black text-xs px-2 py-0.5 rounded-lg border border-emerald-200">
                      ★ {loan.rating}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-semibold">Interest Rate:</span>
                      <span className="font-black text-blue-900">{loan.interestRate}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-semibold">Max Tenure:</span>
                      <span className="font-bold text-slate-800">{loan.maxTenure}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-semibold">Processing Fee:</span>
                      <span className="font-medium text-slate-700">{loan.processingFee}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{loan.specialFeature}</p>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <a
                    href="https://omg10.com/4/11640571"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-xs rounded-xl text-center flex items-center justify-center gap-1.5 shadow-xs transition"
                  >
                    <span>Check Eligibility</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={loan.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                    title="Official Bank Portal"
                  >
                    Portal
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🧮 SUBTAB 3: HOME LOAN EMI CALCULATOR */}
      {subTab === 'calculator' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">
                Instant Interactive Math
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Home Loan EMI & Total Interest Calculator
              </h2>
              <p className="text-xs text-slate-500">
                Accurate mathematical monthly EMI calculation with interest break-up.
              </p>
            </div>

            {/* Slider 1: Loan Amount */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-extrabold">
                <span className="text-slate-700">Home Loan Amount:</span>
                <span className="text-blue-900 text-sm font-black">
                  ₹{(loanAmount / 100000).toFixed(1)} Lakhs (₹{loanAmount.toLocaleString('en-IN')})
                </span>
              </div>
              <input
                type="range"
                min={500000}
                max={20000000}
                step={100000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-blue-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>₹5 Lakhs</span>
                <span>₹1 Crore</span>
                <span>₹2 Crore</span>
              </div>
            </div>

            {/* Slider 2: Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-extrabold">
                <span className="text-slate-700">Annual Interest Rate (% p.a.):</span>
                <span className="text-blue-900 text-sm font-black">{interestRate}%</span>
              </div>
              <input
                type="range"
                min={7.5}
                max={14.0}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-blue-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>7.5% (Best Prime Rate)</span>
                <span>10.5%</span>
                <span>14% (NBFCs)</span>
              </div>
            </div>

            {/* Slider 3: Loan Tenure */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-extrabold">
                <span className="text-slate-700">Loan Tenure (Years):</span>
                <span className="text-blue-900 text-sm font-black">{loanTenureYears} Years</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={loanTenureYears}
                onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                className="w-full accent-blue-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>5 Years</span>
                <span>15 Years</span>
                <span>30 Years</span>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Monthly Repayment Estimate
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-black text-white">
                  ₹{emi.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-300">Monthly EMI Payment</div>
              </div>

              <div className="h-px bg-white/15" />

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-300">Principal Amount:</span>
                  <span className="font-extrabold text-white">₹{loanAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Total Interest Payable:</span>
                  <span className="font-extrabold text-amber-300">₹{totalInterest.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-black text-sm pt-2 border-t border-white/10">
                  <span>Total Amount Payable:</span>
                  <span className="text-emerald-400">₹{totalPayment.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <a
              href="https://omg10.com/4/11640571"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs text-center flex items-center justify-center gap-2 shadow-lg transition"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Apply for Lowest 8.40% Interest Rate</span>
            </a>
          </div>
        </div>
      )}

      {/* 📚 SUBTAB 4: GUIDES */}
      {subTab === 'guides' && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {['All', 'Land Records & Mutation', 'RERA & Legal', 'Investment Strategy'].map((cat) => (
              <button
                key={cat}
                onClick={() => setGuideCategoryFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  guideCategoryFilter === cat
                    ? 'bg-blue-900 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {filteredGuides.map((guide) => (
              <div
                key={guide.id}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[11px] font-extrabold text-blue-600 uppercase tracking-wider">
                      {guide.category} • {guide.readTime}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      {guide.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => onSaveItem && onSaveItem(guide.title, 'Real Estate Guide')}
                    className="text-xs font-bold text-slate-500 hover:text-blue-900 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                  >
                    Bookmark Guide
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{guide.summary}</p>

                {/* Key Steps */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/70 space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Official Step-by-Step Procedure:</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 font-medium">
                    {guide.keySteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold shrink-0">•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* State Portals if any */}
                {guide.statePortals && guide.statePortals.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Direct Official Portals:</span>
                    {guide.statePortals.map((p, idx) => (
                      <a
                        key={idx}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold rounded-lg border border-blue-200 transition"
                      >
                        <span>{p.name}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
