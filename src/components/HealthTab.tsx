import React, { useState } from 'react';
import {
  HeartPulse,
  Hospital,
  Pill,
  ShieldCheck,
  Search,
  ExternalLink,
  Zap,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  Activity,
  Calculator,
} from 'lucide-react';
import {
  TOP_HOSPITALS_DATA,
  GENERIC_MEDICINES_DATA,
  SURGERY_COSTS_DATA,
  HospitalItem,
  GenericMedicineComparison,
} from '../data/healthData';
import { DynamicHighCpmAdSlot } from './DynamicHighCpmAdSlot';
import { useAdRefresh } from '../hooks/useAdRefresh';

interface HealthTabProps {
  onSaveItem?: (title: string, type: string) => void;
}

export const HealthTab: React.FC<HealthTabProps> = ({ onSaveItem }) => {
  const [activeSubTab, setActiveSubTab] = useState<'ayushman' | 'medicines' | 'hospitals' | 'surgeries' | 'bmi'>('ayushman');
  const [searchMedicine, setSearchMedicine] = useState<string>('');

  // Dynamic High-CPM Ad Refresh on Subtab Switch
  useAdRefresh({
    activeTab: 'health',
    subTab: activeSubTab,
    category: 'health',
    dwellRefreshIntervalSeconds: 35,
    enabled: true,
  });

  // Interactive BMI Calculator state
  const [weightKg, setWeightKg] = useState<number>(68);
  const [heightCm, setHeightCm] = useState<number>(170);

  const heightM = heightCm / 100;
  const bmiValue = Number((weightKg / (heightM * heightM)).toFixed(1));

  let bmiCategory = 'Normal Weight';
  let bmiColor = 'text-emerald-600';
  if (bmiValue < 18.5) {
    bmiCategory = 'Underweight';
    bmiColor = 'text-amber-500';
  } else if (bmiValue >= 25 && bmiValue < 29.9) {
    bmiCategory = 'Overweight';
    bmiColor = 'text-amber-600';
  } else if (bmiValue >= 30) {
    bmiCategory = 'Obese';
    bmiColor = 'text-red-600';
  }

  const filteredMedicines = GENERIC_MEDICINES_DATA.filter((med) => {
    const q = searchMedicine.toLowerCase();
    return (
      med.genericName.toLowerCase().includes(q) ||
      med.brandedMarketName.toLowerCase().includes(q) ||
      med.usedFor.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-teal-950 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-teal-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 border border-teal-400/30 rounded-full text-teal-300 text-xs font-bold uppercase tracking-wider">
            <HeartPulse className="w-3.5 h-3.5" />
            <span>High-CPM Healthcare, Ayushman PM-JAY & Jan Aushadhi Hub 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Ayushman Bharat ₹5L Card, Jan Aushadhi & Top Hospitals
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Free ₹5,00,000 yearly family cashless medical treatment guide, 90% discount Jan Aushadhi generic medicines lookup, AIIMS hospital directory, and transparent surgery cost estimators.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="https://omg10.com/4/11640571"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-extrabold rounded-xl shadow-md transition hover:scale-105"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Direct Health Insurance & Hospital Network Server</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Subtab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'ayushman', label: 'Ayushman Card & ABHA ID', icon: ShieldCheck },
          { id: 'medicines', label: 'Jan Aushadhi Medicine Savings', icon: Pill },
          { id: 'hospitals', label: 'Top Hospitals Directory', icon: Hospital },
          { id: 'surgeries', label: 'Surgery & Treatment Costs', icon: Activity },
          { id: 'bmi', label: 'BMI & Wellness Calculator', icon: Calculator },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
                isActive
                  ? 'bg-teal-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic High-CPM Healthcare & Ayushman Slot */}
      <DynamicHighCpmAdSlot
        slotId="health-main-banner"
        category="health"
        format="banner"
        showManualRefresh={true}
        className="shadow-md"
      />

      {/* 🏥 SUBTAB 1: AYUSHMAN BHARAT & ABHA */}
      {activeSubTab === 'ayushman' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-extrabold text-teal-700 uppercase tracking-wider">
                National Health Authority (NHA)
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Ayushman Bharat PM-JAY (₹5,00,000 Free Treatment)
              </h2>
            </div>

            <div className="bg-teal-50 px-4 py-2 rounded-2xl border border-teal-200 text-teal-900 font-extrabold text-xs">
              Cover: ₹5 Lakh / Family / Year
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Eligibility & Benefits:</span>
              </h3>
              <ul className="space-y-2">
                <li>• Covers 27,000+ empanelled government and private super-specialty hospitals across India.</li>
                <li>• Includes 1,949 medical procedures including heart surgery, joint replacement, cancer radiotherapy, and ICU stays.</li>
                <li>• No restriction on family size, age, or gender. Pre-existing conditions covered from day one.</li>
                <li>• Senior Citizens (Aged 70+) get universal Ayushman coverage under PM-JAY irrespective of income.</li>
              </ul>
              <a
                href="https://beneficiary.nha.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-teal-800 font-bold hover:underline pt-2"
              >
                <span>Check Eligibility & Download Ayushman Card (beneficiary.nha.gov.in)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <span>ABHA (Ayushman Bharat Health Account) 14-Digit ID:</span>
              </h3>
              <p className="text-slate-600 leading-relaxed">
                ABHA is India’s unified digital health account that stores all your doctor prescriptions, lab test reports, and hospital discharge summaries securely linked to your Aadhaar.
              </p>
              <ul className="space-y-1.5 font-medium">
                <li>• 1-Click OPD registration at AIIMS & government hospitals via QR code scan.</li>
                <li>• Lifetime digital medical history accessible across any state.</li>
                <li>• 100% free digital registration in under 60 seconds with Aadhaar OTP.</li>
              </ul>
              <a
                href="https://abha.abdm.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-teal-800 font-bold hover:underline pt-2"
              >
                <span>Create Free ABHA ID (abha.abdm.gov.in)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 💊 SUBTAB 2: JAN AUSHADHI MEDICINE SAVINGS */}
      {activeSubTab === 'medicines' && (
        <div className="space-y-5">
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold text-teal-700 uppercase tracking-wider">
                  Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)
                </span>
                <h2 className="text-xl font-black text-slate-900">
                  Generic Medicine vs Branded Price Comparison
                </h2>
                <p className="text-xs text-slate-500">
                  WHO-GMP certified generic medicines with the exact same chemical formulation at 50% to 90% lower cost.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search medicine (e.g. Paracetamol, BP, Diabetes)..."
                  value={searchMedicine}
                  onChange={(e) => setSearchMedicine(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>
            </div>

            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs text-slate-600 border-collapse">
                <thead className="bg-slate-50 text-slate-800 text-[11px] font-black uppercase border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Generic Salt Formulation</th>
                    <th className="py-3 px-4">Branded Market Name</th>
                    <th className="py-3 px-4">Primary Use</th>
                    <th className="py-3 px-4">Branded Price</th>
                    <th className="py-3 px-4 text-emerald-700">Jan Aushadhi Price</th>
                    <th className="py-3 px-4 text-right">Net Savings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredMedicines.map((med, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-black text-slate-900">{med.genericName}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">{med.brandedMarketName}</td>
                      <td className="py-3.5 px-4 text-slate-600">{med.usedFor}</td>
                      <td className="py-3.5 px-4 text-rose-600 line-through font-bold">{med.brandedPrice}</td>
                      <td className="py-3.5 px-4 text-emerald-700 font-black text-sm">{med.janAushadhiPrice}</td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-black text-[11px]">
                          {med.savingsPercentage}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 🏥 SUBTAB 3: TOP HOSPITALS */}
      {activeSubTab === 'hospitals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TOP_HOSPITALS_DATA.map((hosp) => (
            <div
              key={hosp.id}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200 flex flex-col justify-between space-y-4 hover:shadow-md transition"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-teal-700">
                      {hosp.city}, {hosp.state} • {hosp.bedCount}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-lg mt-0.5">{hosp.name}</h3>
                    <div className="text-xs text-slate-500 font-semibold">{hosp.type}</div>
                  </div>
                  {hosp.ayushmanEmpanelled && (
                    <span className="bg-emerald-50 text-emerald-700 font-extrabold text-[10px] px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                      PM-JAY Cashless
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{hosp.highlights}</p>

                <div className="space-y-1 text-xs">
                  <div className="font-bold text-slate-800">Specialties:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {hosp.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[11px] font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-teal-700" />
                  <span><strong>Helpline:</strong> {hosp.emergencyHelpline}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <a
                  href={hosp.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-teal-900 hover:bg-teal-800 text-white font-extrabold text-xs rounded-xl text-center flex items-center justify-center gap-1.5 shadow-xs transition"
                >
                  <span>Book OPD Slot & Hospital Info</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ⚕️ SUBTAB 4: SURGERY COSTS */}
      {activeSubTab === 'surgeries' && (
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-5">
          <div>
            <span className="text-xs font-extrabold text-teal-700 uppercase tracking-wider">
              Healthcare Cost Transparency Guide
            </span>
            <h2 className="text-xl font-black text-slate-900">
              Surgery Cost Estimates: Government vs Private Hospitals
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 border-collapse">
              <thead className="bg-slate-50 text-slate-800 text-[11px] font-black uppercase border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Procedure Name</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Govt / AIIMS Cost</th>
                  <th className="py-3 px-4">Private Hospital Cost</th>
                  <th className="py-3 px-4">Ayushman PM-JAY</th>
                  <th className="py-3 px-4">Recovery Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {SURGERY_COSTS_DATA.map((surg, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-black text-slate-900">{surg.procedureName}</td>
                    <td className="py-3.5 px-4 text-slate-600">{surg.category}</td>
                    <td className="py-3.5 px-4 text-emerald-700 font-bold">{surg.govtHospitalCost}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{surg.privateHospitalCost}</td>
                    <td className="py-3.5 px-4">
                      {surg.ayushmanCovered ? (
                        <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                          100% Free
                        </span>
                      ) : (
                        <span className="text-slate-400">Co-Pay</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">{surg.recoveryTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 🧮 SUBTAB 5: BMI CALCULATOR */}
      {activeSubTab === 'bmi' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-extrabold text-teal-700 uppercase tracking-wider">
                Clinical Health Metric
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Body Mass Index (BMI) & Ideal Health Calculator
              </h2>
              <p className="text-xs text-slate-500">
                Standard WHO Asian BMI criteria for healthy lifestyle evaluation.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-extrabold">
                <span className="text-slate-700">Body Weight (kg):</span>
                <span className="text-teal-900 text-sm font-black">{weightKg} kg</span>
              </div>
              <input
                type="range"
                min={30}
                max={150}
                step={1}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-teal-900 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-extrabold">
                <span className="text-slate-700">Height (cm):</span>
                <span className="text-teal-900 text-sm font-black">
                  {heightCm} cm ({(heightCm / 30.48).toFixed(1)} ft)
                </span>
              </div>
              <input
                type="range"
                min={120}
                max={220}
                step={1}
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full accent-teal-900 cursor-pointer"
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-teal-950 text-white rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Your Health Status
              </div>

              <div>
                <div className="text-4xl font-black text-white">{bmiValue}</div>
                <div className={`text-sm font-extrabold mt-1 ${bmiColor}`}>
                  Category: {bmiCategory}
                </div>
              </div>

              <div className="h-px bg-white/15" />

              <div className="space-y-1.5 text-xs text-slate-300">
                <div>• Underweight: &lt; 18.5</div>
                <div>• Normal Healthy: 18.5 – 24.9</div>
                <div>• Overweight: 25.0 – 29.9</div>
                <div>• Obese: &ge; 30.0</div>
              </div>
            </div>

            <a
              href="https://omg10.com/4/11640571"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs text-center flex items-center justify-center gap-2 shadow-lg transition"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Book Comprehensive Health Checkup</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
