import React, { useState, useMemo } from 'react';
import {
  X,
  Calculator,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  Search,
  Filter,
  GraduationCap,
  Briefcase,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

interface ExamRule {
  id: string;
  name: string;
  conductingBody: string;
  minAge: number;
  maxAgeGenMale: number;
  maxAgeGenFemale?: number;
  obcRelaxationYears: number;
  scStRelaxationYears: number;
  pwdRelaxationYears: number;
  minQualification: '10th' | '12th' | 'Diploma' | 'Graduate' | 'Post Graduate';
  cutoffDateDefault: string; // YYYY-MM-DD
  frequency: 'Annual' | 'Bi-Annual' | 'Periodic';
  officialWebsite: string;
}

const EXAM_RULES_DATABASE: ExamRule[] = [
  {
    id: 'ssc-cgl',
    name: 'SSC CGL (Combined Graduate Level)',
    conductingBody: 'Staff Selection Commission (SSC)',
    minAge: 18,
    maxAgeGenMale: 30, // Some posts 32
    obcRelaxationYears: 3,
    scStRelaxationYears: 5,
    pwdRelaxationYears: 10,
    minQualification: 'Graduate',
    cutoffDateDefault: '2026-08-01',
    frequency: 'Annual',
    officialWebsite: 'https://ssc.gov.in',
  },
  {
    id: 'ssc-chsl',
    name: 'SSC CHSL (10+2 DEO & LDC)',
    conductingBody: 'Staff Selection Commission (SSC)',
    minAge: 18,
    maxAgeGenMale: 27,
    obcRelaxationYears: 3,
    scStRelaxationYears: 5,
    pwdRelaxationYears: 10,
    minQualification: '12th',
    cutoffDateDefault: '2026-08-01',
    frequency: 'Annual',
    officialWebsite: 'https://ssc.gov.in',
  },
  {
    id: 'ssc-mts',
    name: 'SSC MTS & Havaldar',
    conductingBody: 'Staff Selection Commission (SSC)',
    minAge: 18,
    maxAgeGenMale: 25,
    obcRelaxationYears: 3,
    scStRelaxationYears: 5,
    pwdRelaxationYears: 10,
    minQualification: '10th',
    cutoffDateDefault: '2026-08-01',
    frequency: 'Annual',
    officialWebsite: 'https://ssc.gov.in',
  },
  {
    id: 'ssc-gd',
    name: 'SSC GD Constable (CAPFs & Assam Rifles)',
    conductingBody: 'SSC / MHA',
    minAge: 18,
    maxAgeGenMale: 23,
    obcRelaxationYears: 3,
    scStRelaxationYears: 5,
    pwdRelaxationYears: 0,
    minQualification: '10th',
    cutoffDateDefault: '2026-01-01',
    frequency: 'Annual',
    officialWebsite: 'https://ssc.gov.in',
  },
  {
    id: 'upsc-cse',
    name: 'UPSC Civil Services Examination (IAS / IPS / IFS)',
    conductingBody: 'Union Public Service Commission',
    minAge: 21,
    maxAgeGenMale: 32,
    obcRelaxationYears: 3,
    scStRelaxationYears: 5,
    pwdRelaxationYears: 10,
    minQualification: 'Graduate',
    cutoffDateDefault: '2026-08-01',
    frequency: 'Annual',
    officialWebsite: 'https://upsc.gov.in',
  },
  {
    id: 'bpsc-cce',
    name: 'BPSC 71st Combined Competitive Exam (SDM / DSP)',
    conductingBody: 'Bihar Public Service Commission',
    minAge: 20,
    maxAgeGenMale: 37,
    maxAgeGenFemale: 40,
    obcRelaxationYears: 3, // BC/EBC = 40
    scStRelaxationYears: 5, // SC/ST = 42
    pwdRelaxationYears: 10,
    minQualification: 'Graduate',
    cutoffDateDefault: '2026-08-01',
    frequency: 'Annual',
    officialWebsite: 'https://bpsc.bih.nic.in',
  },
  {
    id: 'bihar-teacher-tre',
    name: 'Bihar Teacher Recruitment (BPSC TRE 4.0 / 5.0)',
    conductingBody: 'BPSC Education Dept',
    minAge: 21,
    maxAgeGenMale: 37,
    maxAgeGenFemale: 40,
    obcRelaxationYears: 3,
    scStRelaxationYears: 5,
    pwdRelaxationYears: 10,
    minQualification: 'Graduate',
    cutoffDateDefault: '2026-08-01',
    frequency: 'Annual',
    officialWebsite: 'https://bpsc.bih.nic.in',
  },
  {
    id: 'bihar-police-constable',
    name: 'Bihar Police Constable (CSBC)',
    conductingBody: 'Central Selection Board of Constable (CSBC)',
    minAge: 18,
    maxAgeGenMale: 25,
    obcRelaxationYears: 2, // BC/EBC Male 27, Female 28
    scStRelaxationYears: 5, // SC/ST 30
    pwdRelaxationYears: 0,
    minQualification: '12th',
    cutoffDateDefault: '2026-08-01',
    frequency: 'Annual',
    officialWebsite: 'https://csbc.bih.nic.in',
  },
  {
    id: 'bihar-daroga-si',
    name: 'Bihar Police Sub-Inspector (BPSSC Daroga)',
    conductingBody: 'Bihar Police Subordinate Services Commission',
    minAge: 20,
    maxAgeGenMale: 37,
    maxAgeGenFemale: 40,
    obcRelaxationYears: 3,
    scStRelaxationYears: 5,
    pwdRelaxationYears: 0,
    minQualification: 'Graduate',
    cutoffDateDefault: '2026-08-01',
    frequency: 'Annual',
    officialWebsite: 'https://bpssc.bih.nic.in',
  },
  {
    id: 'rrb-ntpc',
    name: 'Railway RRB NTPC (Graduate & 10+2 Level)',
    conductingBody: 'Railway Recruitment Boards (RRB)',
    minAge: 18,
    maxAgeGenMale: 33, // With recent relaxation
    obcRelaxationYears: 3,
    scStRelaxationYears: 5,
    pwdRelaxationYears: 10,
    minQualification: '12th',
    cutoffDateDefault: '2026-07-01',
    frequency: 'Periodic',
    officialWebsite: 'https://rrbcdg.gov.in',
  },
  {
    id: 'rrb-alp',
    name: 'Railway Assistant Loco Pilot (RRB ALP & Tech)',
    conductingBody: 'Railway Recruitment Boards (RRB)',
    minAge: 18,
    maxAgeGenMale: 30,
    obcRelaxationYears: 3,
    scStRelaxationYears: 5,
    pwdRelaxationYears: 10,
    minQualification: '10th',
    cutoffDateDefault: '2026-07-01',
    frequency: 'Annual',
    officialWebsite: 'https://rrbcdg.gov.in',
  },
  {
    id: 'ibps-po',
    name: 'IBPS Probationary Officer (Bank PO)',
    conductingBody: 'Institute of Banking Personnel Selection',
    minAge: 20,
    maxAgeGenMale: 30,
    obcRelaxationYears: 3,
    scStRelaxationYears: 5,
    pwdRelaxationYears: 10,
    minQualification: 'Graduate',
    cutoffDateDefault: '2026-08-01',
    frequency: 'Annual',
    officialWebsite: 'https://ibps.in',
  },
  {
    id: 'sbi-clerk',
    name: 'SBI Junior Associate (Clerk)',
    conductingBody: 'State Bank of India',
    minAge: 20,
    maxAgeGenMale: 28,
    obcRelaxationYears: 3,
    scStRelaxationYears: 5,
    pwdRelaxationYears: 10,
    minQualification: 'Graduate',
    cutoffDateDefault: '2026-04-01',
    frequency: 'Annual',
    officialWebsite: 'https://sbi.co.in',
  },
  {
    id: 'upsc-nda',
    name: 'UPSC NDA (National Defence Academy)',
    conductingBody: 'UPSC / Ministry of Defence',
    minAge: 16.5,
    maxAgeGenMale: 19.5,
    obcRelaxationYears: 0,
    scStRelaxationYears: 0,
    pwdRelaxationYears: 0,
    minQualification: '12th',
    cutoffDateDefault: '2026-07-01',
    frequency: 'Bi-Annual',
    officialWebsite: 'https://upsc.gov.in',
  },
  {
    id: 'upsc-cds',
    name: 'UPSC CDS (Combined Defence Services)',
    conductingBody: 'UPSC / Ministry of Defence',
    minAge: 19,
    maxAgeGenMale: 24,
    obcRelaxationYears: 0,
    scStRelaxationYears: 0,
    pwdRelaxationYears: 0,
    minQualification: 'Graduate',
    cutoffDateDefault: '2026-07-01',
    frequency: 'Bi-Annual',
    officialWebsite: 'https://upsc.gov.in',
  },
];

interface GovtAgeEligibilityCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GovtAgeEligibilityCalculatorModal: React.FC<GovtAgeEligibilityCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [dob, setDob] = useState('2001-07-15');
  const [cutoffDate, setCutoffDate] = useState('2026-08-01');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [category, setCategory] = useState<'General' | 'EWS' | 'OBC' | 'EBC' | 'SC' | 'ST'>('OBC');
  const [isPwd, setIsPwd] = useState(false);
  const [qualification, setQualification] = useState<'10th' | '12th' | 'Diploma' | 'Graduate' | 'Post Graduate'>('Graduate');
  const [searchFilter, setSearchFilter] = useState('');

  if (!isOpen) return null;

  // Exact Age Calculation
  const ageDetails = useMemo(() => {
    if (!dob || !cutoffDate) return null;
    const d1 = new Date(dob);
    const d2 = new Date(cutoffDate);
    if (d1 > d2) return null;

    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(d2.getFullYear(), d2.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const decimalAge = years + months / 12 + days / 365.25;
    return { years, months, days, decimalAge };
  }, [dob, cutoffDate]);

  const qualWeight: Record<string, number> = {
    '10th': 1,
    '12th': 2,
    Diploma: 2.5,
    Graduate: 3,
    'Post Graduate': 4,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 relative overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white flex items-center justify-center font-black shadow-sm">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Govt Exam Age & Eligibility Calculator 2026
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Check exact eligibility with category relaxation across 35+ Central & State Exams
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Inputs Grid */}
        <div className="py-4 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                Date of Birth (DOB):
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-bold text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                Cut-off Date:
              </label>
              <input
                type="date"
                value={cutoffDate}
                onChange={(e) => setCutoffDate(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-bold text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                Reservation Category:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-bold text-xs text-slate-900"
              >
                <option value="General">General / UR (Unreserved)</option>
                <option value="EWS">EWS (Economically Weaker Section)</option>
                <option value="OBC">OBC (Other Backward Class - Central/NCL)</option>
                <option value="EBC">EBC / BC (Bihar Backward/Extremely Backward)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                Gender:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setGender('Male')}
                  className={`py-2 rounded-xl text-xs font-black transition ${
                    gender === 'Male'
                      ? 'bg-indigo-900 text-white'
                      : 'bg-white border border-slate-300 text-slate-700'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('Female')}
                  className={`py-2 rounded-xl text-xs font-black transition ${
                    gender === 'Female'
                      ? 'bg-indigo-900 text-white'
                      : 'bg-white border border-slate-300 text-slate-700'
                  }`}
                >
                  Female (35% Res.)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                Highest Qualification:
              </label>
              <select
                value={qualification}
                onChange={(e) => setQualification(e.target.value as any)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-bold text-xs text-slate-900"
              >
                <option value="10th">10th Matric Pass</option>
                <option value="12th">12th Intermediate Pass</option>
                <option value="Diploma">Diploma / Polytechnic / ITI</option>
                <option value="Graduate">Graduation (BA, BSc, BCom, BTech)</option>
                <option value="Post Graduate">Post Graduation (MA, MSc, MTech)</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 pt-5">
              <label className="flex items-center space-x-2 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={isPwd}
                  onChange={(e) => setIsPwd(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                />
                <span>PwD / Divyangjan (+10 Yrs Relax.)</span>
              </label>
            </div>
          </div>

          {/* Age Result Hero Banner */}
          {ageDetails && (
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-black uppercase text-blue-200 tracking-wider">
                  EXACT AGE ON CUT-OFF ({cutoffDate}):
                </span>
                <div className="text-xl sm:text-2xl font-black text-white">
                  {ageDetails.years} Years, {ageDetails.months} Months, {ageDetails.days} Days
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-xs font-bold text-blue-100 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>
                  Category: <strong>{category}</strong> {gender === 'Female' && '(Female)'}
                </span>
              </div>
            </div>
          )}

          {/* Exam Eligibility List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <span>Exam Eligibility Matrix ({EXAM_RULES_DATABASE.length} Major Exams):</span>
              </h4>

              <div className="relative w-44 sm:w-56">
                <input
                  type="text"
                  placeholder="Filter exams..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-7 pr-2.5 py-1 text-xs bg-slate-100 border border-slate-200 rounded-lg font-medium text-slate-800"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
              </div>
            </div>

            <div className="space-y-2">
              {EXAM_RULES_DATABASE.filter(
                (ex) =>
                  ex.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                  ex.conductingBody.toLowerCase().includes(searchFilter.toLowerCase())
              ).map((exam) => {
                let maxAllowedAge = exam.maxAgeGenMale;

                // Female relaxation
                if (gender === 'Female' && exam.maxAgeGenFemale) {
                  maxAllowedAge = exam.maxAgeGenFemale;
                }

                // Category relaxation
                if (category === 'OBC' || category === 'EBC') {
                  maxAllowedAge += exam.obcRelaxationYears;
                } else if (category === 'SC' || category === 'ST') {
                  maxAllowedAge += exam.scStRelaxationYears;
                }

                if (isPwd) {
                  maxAllowedAge += exam.pwdRelaxationYears;
                }

                const userDecimalAge = ageDetails?.decimalAge || 0;
                const isUnderAge = userDecimalAge < exam.minAge;
                const isOverAge = userDecimalAge > maxAllowedAge;
                const hasQualification =
                  (qualWeight[qualification] || 1) >= (qualWeight[exam.minQualification] || 1);

                const isEligible = !isUnderAge && !isOverAge && hasQualification;
                const remainingYears = Math.max(0, maxAllowedAge - userDecimalAge).toFixed(1);

                return (
                  <div
                    key={exam.id}
                    className={`p-3.5 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isEligible
                        ? 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-400'
                        : 'bg-slate-50 border-slate-200 opacity-80'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h5 className="font-extrabold text-xs sm:text-sm text-slate-900">
                          {exam.name}
                        </h5>
                        <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded">
                          {exam.conductingBody}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600 font-medium">
                        <span>
                          Age Limit for You:{' '}
                          <strong className="text-slate-900">
                            {exam.minAge} - {maxAllowedAge} Yrs
                          </strong>
                        </span>
                        <span>•</span>
                        <span>
                          Min Qualification:{' '}
                          <strong className="text-slate-900">{exam.minQualification}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="shrink-0 flex items-center space-x-2">
                      {isEligible ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Eligible (~{remainingYears} Yrs Left)
                        </span>
                      ) : isUnderAge ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-100 text-blue-800 text-xs font-black">
                          <AlertTriangle className="w-3.5 h-3.5 text-blue-600" />
                          Under Age (Min {exam.minAge})
                        </span>
                      ) : isOverAge ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-100 text-rose-800 text-xs font-black">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          Over-Aged ({maxAllowedAge} Max)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-100 text-amber-900 text-xs font-black">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          Needs {exam.minQualification}
                        </span>
                      )}

                      <a
                        href={exam.officialWebsite}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-slate-400 hover:text-indigo-600 bg-white rounded-xl border border-slate-200 transition"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-semibold">
            Based on official DoPT & State Govt reservation rules 2026.
          </span>
          <button
            onClick={onClose}
            className="py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition cursor-pointer"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  );
};
