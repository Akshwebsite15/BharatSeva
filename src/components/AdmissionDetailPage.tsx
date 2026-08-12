import React, { useState } from 'react';
import {
  X,
  Calendar,
  CheckCircle2,
  FileText,
  DollarSign,
  Award,
  Users,
  Building2,
  HelpCircle,
  ExternalLink,
  Download,
  AlertCircle,
  Clock,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Layers,
  MapPin,
  ChevronRight,
  Code,
} from 'lucide-react';
import { AdmissionItem, College } from '../types';

interface AdmissionDetailPageProps {
  admission: AdmissionItem;
  onClose: () => void;
  collegesList?: College[];
  onSelectCollege?: (college: College) => void;
}

export const AdmissionDetailPage: React.FC<AdmissionDetailPageProps> = ({
  admission,
  onClose,
  collegesList = [],
  onSelectCollege,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'dates' | 'eligibility' | 'documents' | 'process' | 'fee' | 'selection' | 'counselling' | 'seats' | 'faqs' | 'schema'
  >('overview');

  const matchingCollege = collegesList.find(
    (c) => c.id === admission.collegeId || c.name.toLowerCase().includes(admission.collegeName.toLowerCase())
  );

  const getStatusBadge = (status: AdmissionItem['status']) => {
    switch (status) {
      case 'Open':
        return <span className="bg-emerald-500 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-white"></span> Application Open</span>;
      case 'Closing Soon':
        return <span className="bg-amber-500 text-amber-950 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Closing Soon</span>;
      case 'Upcoming':
        return <span className="bg-blue-500 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">Upcoming Drive</span>;
      case 'Closed':
        return <span className="bg-slate-600 text-slate-200 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">Closed</span>;
      default:
        return null;
    }
  };

  // Structured Data Schema Object
  const admissionSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: admission.title,
    description: admission.overview,
    educationalProgramMode: 'Full-Time',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    provider: {
      '@type': 'CollegeOrUniversity',
      name: admission.collegeName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: admission.city,
        addressRegion: admission.state,
        addressCountry: 'IN',
      },
      url: admission.officialAppUrl,
    },
    offers: {
      '@type': 'Offer',
      price: admission.appFeeText,
      priceCurrency: 'INR',
    },
    applicationDeadline: admission.deadlineDate,
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md overflow-y-auto flex justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-auto flex flex-col max-h-[94vh]">
        
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-950 text-white p-6 sm:p-8 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors cursor-pointer"
            title="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Breadcrumb Bar */}
          <nav className="flex items-center gap-1.5 text-xs text-indigo-200 mb-3 font-medium overflow-x-auto scrollbar-none">
            <span>Home</span>
            <ChevronRight className="w-3 h-3 text-indigo-400 shrink-0" />
            <span>Admissions 2026</span>
            <ChevronRight className="w-3 h-3 text-indigo-400 shrink-0" />
            <span className="text-amber-300 font-bold truncate">{admission.degree}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            {getStatusBadge(admission.status)}
            <span className="bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-xs font-bold px-3 py-1 rounded-full">
              {admission.degree} • {admission.stream}
            </span>
            <span className="bg-slate-800 text-slate-200 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              {admission.city}, {admission.state}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            {admission.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-2">
            <div>College / Authority: <strong className="text-white font-bold">{admission.collegeName}</strong></div>
            <div>Exam Required: <strong className="text-amber-300 font-bold">{admission.entranceExam}</strong></div>
            {admission.daysLeft > 0 && (
              <div className="bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2.5 py-0.5 rounded font-extrabold">
                ⏳ {admission.daysLeft} Days Left to Apply!
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href={admission.officialAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Apply Online Now (Official Portal)</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {admission.officialNotificationPdf && (
              <a
                href={admission.officialNotificationPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Official PDF Notification</span>
              </a>
            )}

            {matchingCollege && onSelectCollege && (
              <button
                onClick={() => {
                  onClose();
                  onSelectCollege(matchingCollege);
                }}
                className="bg-indigo-600/80 hover:bg-indigo-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-indigo-400/40 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Full College Details ({matchingCollege.shortName})</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 overflow-x-auto shrink-0 scrollbar-none">
          {[
            { id: 'overview', label: '1. Overview', icon: GraduationCap },
            { id: 'dates', label: '2. Important Dates', icon: Calendar },
            { id: 'eligibility', label: '3. Eligibility Criteria', icon: CheckCircle2 },
            { id: 'documents', label: '4. Documents Required', icon: FileText },
            { id: 'process', label: '5. Application Process', icon: ArrowRight },
            { id: 'fee', label: '6. Fee Structure', icon: DollarSign },
            { id: 'selection', label: '7. Selection Process', icon: Award },
            { id: 'counselling', label: '8. Counselling Guide', icon: Users },
            { id: 'seats', label: '9. Seats & Quota', icon: Layers },
            { id: 'faqs', label: '10. FAQs', icon: HelpCircle },
            { id: 'schema', label: '11. Schema & SEO', icon: Code },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3.5 font-semibold text-xs sm:text-sm flex items-center gap-1.5 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600 bg-white shadow-2xs font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
                <h2 className="text-lg font-bold text-slate-900 mb-2">Admission Overview</h2>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">{admission.overview}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
                  <div className="text-[10px] text-indigo-700 font-bold uppercase">Course Name</div>
                  <div className="text-sm font-bold text-indigo-950 mt-1">{admission.courseName}</div>
                </div>
                <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl">
                  <div className="text-[10px] text-purple-700 font-bold uppercase">Qualifying Exam</div>
                  <div className="text-sm font-bold text-purple-950 mt-1">{admission.entranceExam}</div>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                  <div className="text-[10px] text-emerald-700 font-bold uppercase">Application Fee</div>
                  <div className="text-sm font-bold text-emerald-950 mt-1">{admission.appFeeText}</div>
                </div>
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
                  <div className="text-[10px] text-amber-700 font-bold uppercase">Deadline</div>
                  <div className="text-sm font-bold text-amber-950 mt-1">{admission.deadlineDate}</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Important Dates */}
          {activeTab === 'dates' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                Admission Schedule & Key Deadlines
              </h3>
              <div className="space-y-3">
                {admission.importantDates.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-wrap items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50 text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 font-extrabold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-slate-900">{item.event}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 sm:mt-0">
                      <span className="font-mono text-xs font-bold bg-white px-3 py-1 rounded border border-slate-200">
                        {item.date}
                      </span>
                      {item.status === 'Passed' && <span className="bg-slate-200 text-slate-700 text-xs px-2.5 py-0.5 rounded font-bold">Completed</span>}
                      {item.status === 'Active' && <span className="bg-emerald-500 text-white text-xs px-2.5 py-0.5 rounded font-bold animate-pulse">Active Now</span>}
                      {item.status === 'Upcoming' && <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded font-bold">Upcoming</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Eligibility Criteria */}
          {activeTab === 'eligibility' && (
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl">
                <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Eligibility Summary
                </h3>
                <p className="text-sm text-emerald-900 font-medium">{admission.eligibilitySummary}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-white border border-slate-200 p-4 rounded-xl">
                  <span className="text-xs text-slate-500 font-bold block">Minimum Qualification:</span>
                  <strong className="text-slate-900 font-bold">{admission.eligibilityDetails.minQualification}</strong>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-xl">
                  <span className="text-xs text-slate-500 font-bold block">Minimum Percentage Required:</span>
                  <strong className="text-slate-900 font-bold">{admission.eligibilityDetails.minPercentage}</strong>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-xl">
                  <span className="text-xs text-slate-500 font-bold block">Subject Prerequisites:</span>
                  <strong className="text-slate-900 font-bold">{admission.eligibilityDetails.subjectRequirements}</strong>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-xl">
                  <span className="text-xs text-slate-500 font-bold block">Age Limit Rules:</span>
                  <strong className="text-slate-900 font-bold">{admission.eligibilityDetails.ageLimit}</strong>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Documents Required */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                Documents Required for Online Application & Physical Verification
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {admission.requiredDocuments.map((doc, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-center gap-3 text-sm font-medium text-slate-800">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: Application Process */}
          {activeTab === 'process' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-indigo-600" />
                Step-by-Step Online Registration & Form Filling Guide
              </h3>
              <div className="space-y-3">
                {admission.applicationProcessSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                    <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-slate-800 leading-relaxed font-medium">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 6: Fee Structure */}
          {activeTab === 'fee' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-indigo-600" />
                Application Fee & Course Tuition Structure
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {admission.feeBreakdown.map((fee, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs">
                    <div className="text-xs font-bold text-slate-500 uppercase">{fee.category}</div>
                    <div className="text-xl font-black text-indigo-900 mt-1">{fee.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 7: Selection Process */}
          {activeTab === 'selection' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                Merit List & Selection Criteria Stages
              </h3>
              <div className="space-y-3">
                {admission.selectionProcess.map((stage, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-1">
                      <strong className="text-slate-900 text-sm">{stage.stage}</strong>
                      {stage.weightage && (
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-0.5 rounded">
                          {stage.weightage}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600">{stage.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 8: Counselling Guide */}
          {activeTab === 'counselling' && (
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 p-5 rounded-2xl">
                <h3 className="text-base font-bold text-purple-950 mb-2">Counseling Conducting Authority</h3>
                <div className="text-sm text-purple-900 font-bold mb-1">{admission.counsellingInfo.conductingBody}</div>
                <div className="text-xs text-purple-800">
                  Total Counseling Rounds: <strong>{admission.counsellingInfo.roundsCount} Rounds</strong> | Fee: <strong>{admission.counsellingInfo.registrationFee}</strong>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-4 rounded-xl">
                <h4 className="font-bold text-slate-900 text-sm mb-1">Choice Filling & Priority Strategy</h4>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">{admission.counsellingInfo.choiceFillingGuide}</p>
              </div>
            </div>
          )}

          {/* Tab 9: Seats & Quota */}
          {activeTab === 'seats' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-blue-950">Total Intake Seat Capacity</h3>
                  <p className="text-xs text-blue-800">{admission.seatAllotmentAndQuota.reservationPolicy}</p>
                </div>
                <div className="text-3xl font-black text-blue-900">{admission.seatAllotmentAndQuota.totalSeats}</div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {admission.seatAllotmentAndQuota.categoryQuota.map((q, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 p-3 rounded-xl">
                    <span className="text-slate-500 font-medium block">{q.category}:</span>
                    <strong className="text-slate-900 text-sm block mt-0.5">{q.percentageOrSeats}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 10: FAQs */}
          {activeTab === 'faqs' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                Frequently Asked Questions
              </h3>
              {admission.faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="font-bold text-slate-900 text-sm mb-1">Q: {faq.question}</div>
                  <div className="text-xs text-slate-700 leading-relaxed font-medium">A: {faq.answer}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 11: Schema & SEO */}
          {activeTab === 'schema' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-600" />
                JSON-LD Structured Data for Search Engine Indexing
              </h3>
              <p className="text-xs text-slate-600">
                This EducationalOccupationalProgram schema is dynamically generated and injected into the document head for google rich snippet verification.
              </p>
              <pre className="bg-slate-900 text-emerald-400 p-4 rounded-xl text-xs overflow-x-auto font-mono">
                {JSON.stringify(admissionSchema, null, 2)}
              </pre>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex items-center justify-between shrink-0">
          <a
            href={admission.officialAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
          >
            <span>Proceed to Official Registration Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Close Admission Page
          </button>
        </div>

      </div>
    </div>
  );
};
