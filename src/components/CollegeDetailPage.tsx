import React, { useState } from 'react';
import {
  X,
  GraduationCap,
  MapPin,
  Building2,
  Calendar,
  Award,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  DollarSign,
  Users,
  Briefcase,
  Star,
  HelpCircle,
  Bell,
  Home,
  ShieldCheck,
  FileText,
  Clock,
  Sparkles,
  Search,
  Check,
  ChevronRight,
  Share2,
  Printer,
  Download,
} from 'lucide-react';
import { College } from '../types';

interface CollegeDetailPageProps {
  college: College;
  onClose: () => void;
}

export const CollegeDetailPage: React.FC<CollegeDetailPageProps> = ({
  college,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'courses'
    | 'fees'
    | 'admission'
    | 'cutoffs'
    | 'placements'
    | 'facilities'
    | 'hostel'
    | 'scholarships'
    | 'reviews'
    | 'qa'
    | 'updates'
  >('overview');

  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${college.name} - Admission, Fees, Cutoffs & Courses 2026`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sectionTabs = [
    { id: 'overview', label: '1. Overview & Location' },
    { id: 'courses', label: '2. Courses & Degrees' },
    { id: 'fees', label: '3. Fees Structure' },
    { id: 'admission', label: '4. Admission & Eligibility' },
    { id: 'cutoffs', label: '5. Cutoffs' },
    { id: 'placements', label: '6. Placements' },
    { id: 'facilities', label: '7. Facilities' },
    { id: 'hostel', label: '8. Hostel' },
    { id: 'scholarships', label: '9. Scholarships' },
    { id: 'reviews', label: '10. Student Reviews' },
    { id: 'qa', label: '11. Q&A' },
    { id: 'updates', label: '12. Updates' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 text-slate-100 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Sticky Header Banner */}
        <div className="relative bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border-b border-slate-800 p-4 sm:p-6 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl p-2 border border-slate-700 shadow-md shrink-0 flex items-center justify-center overflow-hidden">
                {college.logoUrl ? (
                  <img
                    src={college.logoUrl}
                    alt={college.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <GraduationCap className="w-10 h-10 text-teal-600" />
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    {college.type} Institute
                  </span>
                  {college.nirfRank && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      NIRF Rank #{college.nirfRank}
                    </span>
                  )}
                  {college.naacGrade && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      NAAC Grade {college.naacGrade}
                    </span>
                  )}
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {college.name} ({college.shortName})
                </h1>

                <p className="text-xs sm:text-sm text-slate-400 mt-1 flex items-center gap-2 flex-wrap">
                  <span className="flex items-center text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-teal-400 mr-1" />
                    {college.city}, {college.state}
                  </span>
                  <span>•</span>
                  <span className="text-slate-400">Estd. {college.establishedYear}</span>
                  <span>•</span>
                  <span className="text-teal-400 font-semibold">{college.universityAffiliation}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={handleShare}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition cursor-pointer"
                title="Share College Page"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                className="p-2 bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 rounded-xl transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick CTA Row */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Source: <strong className="text-slate-200">{college.verifiedSource}</strong></span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline text-slate-400">Verified: {college.lastVerifiedDate}</span>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href={college.officialWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl border border-slate-700 transition flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
                <span>Official Website</span>
              </a>

              <a
                href={college.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black rounded-xl shadow-lg transition flex items-center gap-1.5"
              >
                <span>Apply Now 2026</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 pt-2 overflow-x-auto no-scrollbar shrink-0 flex items-center space-x-1">
          {sectionTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 text-xs font-extrabold whitespace-nowrap rounded-t-xl transition border-b-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-800/80 text-teal-400 border-teal-400'
                  : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-8 flex-grow text-sm">
          
          {/* TAB 1: OVERVIEW & LOCATION */}
          {(activeTab === 'overview' || activeTab === 'overview') && (
            <section className="space-y-6">
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-4">
                <h3 className="text-base font-black text-teal-400 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-teal-400" />
                  Institute Overview
                </h3>
                <p className="text-slate-300 leading-relaxed font-medium">
                  {college.overview}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Average Fee</span>
                    <span className="text-sm font-black text-amber-400">₹{(college.avgAnnualFeeInr / 100000).toFixed(2)} Lakh / yr</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Highest Package</span>
                    <span className="text-sm font-black text-emerald-400">₹{college.placement.highestPackageLpa} LPA</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Placement Rate</span>
                    <span className="text-sm font-black text-teal-400">{college.placement.placementRatePercent}%</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Accepted Exams</span>
                    <span className="text-xs font-bold text-slate-200 truncate block">{college.entranceExamsAccepted.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Location & Connectivity */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-base font-black text-teal-400 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-teal-400" />
                  Campus Location & Nearest Connectivity
                </h3>
                <div className="space-y-2 text-slate-300">
                  <p><strong>Address:</strong> {college.address}</p>
                  <p><strong>Nearest Airport / Railway Connectivity:</strong> {college.nearestConnectivity}</p>
                </div>
              </div>
            </section>
          )}

          {/* TAB 2: COURSES & DEGREES */}
          {activeTab === 'courses' && (
            <section className="space-y-4">
              <h3 className="text-base font-black text-teal-400 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-teal-400" />
                Courses & Degrees Offered ({college.courses.length})
              </h3>
              
              <div className="overflow-x-auto border border-slate-800 rounded-2xl">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-800/80 text-teal-300 font-extrabold border-b border-slate-700">
                      <th className="p-3">Course Name</th>
                      <th className="p-3">Level & Duration</th>
                      <th className="p-3">Annual Fees</th>
                      <th className="p-3">Seats</th>
                      <th className="p-3">Entrance Exam</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {college.courses.map((course, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition">
                        <td className="p-3 font-bold text-white">{course.name}</td>
                        <td className="p-3 text-slate-300">{course.level} • {course.duration}</td>
                        <td className="p-3 text-amber-400 font-extrabold">{course.feeText}</td>
                        <td className="p-3 text-slate-300">{course.seats} Seats</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 bg-teal-500/10 text-teal-300 border border-teal-500/30 rounded-md font-bold text-xs">
                            {course.entranceExam}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* TAB 3: FEES STRUCTURE */}
          {activeTab === 'fees' && (
            <section className="space-y-4">
              <h3 className="text-base font-black text-amber-400 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-amber-400" />
                Detailed Fee Structure & Waivers
              </h3>
              
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl text-amber-200">
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400">Average Annual Tuition Fee Category</span>
                    <h4 className="text-lg font-black">{college.feeRangeCategory}</h4>
                  </div>
                  <span className="text-2xl font-black text-amber-300">
                    ₹{(college.avgAnnualFeeInr).toLocaleString('en-IN')} / yr
                  </span>
                </div>

                <h4 className="font-bold text-slate-200 pt-2">Course-wise Fee Breakdown:</h4>
                <div className="space-y-3">
                  {college.courses.map((c, i) => (
                    <div key={i} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="font-bold text-white text-xs sm:text-sm">{c.name}</p>
                        <p className="text-xs text-slate-400">{c.duration}</p>
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-amber-400">{c.feeText}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* TAB 4: ADMISSION & ELIGIBILITY */}
          {activeTab === 'admission' && (
            <section className="space-y-6">
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-base font-black text-teal-400 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-400" />
                  Eligibility Criteria Overview
                </h3>
                <p className="text-slate-300 leading-relaxed">{college.eligibilityOverview}</p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-4">
                <h3 className="text-base font-black text-teal-400 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-400" />
                  Step-by-Step Admission Process 2026
                </h3>

                <ol className="space-y-3 relative border-l-2 border-teal-500/40 ml-3 pl-4">
                  {college.admissionProcessSteps.map((step, idx) => (
                    <li key={idx} className="space-y-1">
                      <span className="text-xs font-black text-teal-400 uppercase tracking-wider">Step {idx + 1}</span>
                      <p className="text-slate-200 font-medium">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          )}

          {/* TAB 5: CUTOFFS */}
          {activeTab === 'cutoffs' && (
            <section className="space-y-4">
              <h3 className="text-base font-black text-indigo-400 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-400" />
                Category-wise & Round-wise Cutoffs
              </h3>

              <div className="overflow-x-auto border border-slate-800 rounded-2xl">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-800/80 text-indigo-300 font-extrabold border-b border-slate-700">
                      <th className="p-3">Exam Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Opening Rank</th>
                      <th className="p-3">Closing Rank</th>
                      <th className="p-3">Score / Percentile</th>
                      <th className="p-3">Round</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {college.cutoffs.map((cutoff, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition">
                        <td className="p-3 font-bold text-white">{cutoff.examName}</td>
                        <td className="p-3 text-slate-300">{cutoff.category}</td>
                        <td className="p-3 text-emerald-400 font-bold">{cutoff.openingRank}</td>
                        <td className="p-3 text-amber-400 font-bold">{cutoff.closingRank}</td>
                        <td className="p-3 text-indigo-300">{cutoff.scoreOrPercentile || 'N/A'}</td>
                        <td className="p-3 text-slate-400">{cutoff.round}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* TAB 6: PLACEMENTS */}
          {activeTab === 'placements' && (
            <section className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-center">
                  <span className="text-xs text-emerald-400 font-bold uppercase block">Highest CTC</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-300">₹{college.placement.highestPackageLpa} LPA</span>
                </div>
                <div className="bg-teal-500/10 border border-teal-500/30 p-4 rounded-2xl text-center">
                  <span className="text-xs text-teal-400 font-bold uppercase block">Average CTC</span>
                  <span className="text-xl sm:text-2xl font-black text-teal-300">₹{college.placement.averagePackageLpa} LPA</span>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-center">
                  <span className="text-xs text-amber-400 font-bold uppercase block">Median CTC</span>
                  <span className="text-xl sm:text-2xl font-black text-amber-300">₹{college.placement.medianPackageLpa} LPA</span>
                </div>
                <div className="bg-indigo-500/10 border border-indigo-500/30 p-4 rounded-2xl text-center">
                  <span className="text-xs text-indigo-400 font-bold uppercase block">Placement %</span>
                  <span className="text-xl sm:text-2xl font-black text-indigo-300">{college.placement.placementRatePercent}%</span>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="font-bold text-white text-sm">Top Recruiting Companies ({college.placement.academicYear}):</h4>
                <div className="flex flex-wrap gap-2">
                  {college.placement.topRecruiters.map((recruiter, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl">
                      {recruiter}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* TAB 7: FACILITIES */}
          {activeTab === 'facilities' && (
            <section className="space-y-4">
              <h3 className="text-base font-black text-teal-400 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-400" />
                Campus Infrastructure & Facilities
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {college.facilities.map((fac, idx) => (
                  <div key={idx} className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-1">
                    <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-400" />
                      {fac.name}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{fac.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TAB 8: HOSTEL */}
          {activeTab === 'hostel' && (
            <section className="space-y-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-4">
                <h3 className="text-base font-black text-teal-400 flex items-center gap-2">
                  <Home className="w-5 h-5 text-teal-400" />
                  Hostel & Accommodation Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
                    <span className="text-slate-400 font-bold block">Availability:</span>
                    <span className="font-extrabold text-white">{college.hostel.availableFor}</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
                    <span className="text-slate-400 font-bold block">Hostel Annual Fee:</span>
                    <span className="font-extrabold text-amber-400">{college.hostel.annualFee}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-200 text-xs mb-1">Room Options:</h4>
                  <div className="flex flex-wrap gap-2">
                    {college.hostel.roomTypes.map((rt, i) => (
                      <span key={i} className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs rounded-lg font-medium">
                        {rt}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-200 text-xs mb-1">Mess & Food Quality:</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">{college.hostel.messDetails}</p>
                </div>
              </div>
            </section>
          )}

          {/* TAB 9: SCHOLARSHIPS */}
          {activeTab === 'scholarships' && (
            <section className="space-y-4">
              <h3 className="text-base font-black text-amber-400 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Scholarships & Financial Aid
              </h3>

              <div className="space-y-3">
                {college.scholarships.map((sch, idx) => (
                  <div key={idx} className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-white text-sm">{sch.name}</h4>
                      <span className="px-2 py-0.5 bg-amber-500/10 text-amber-300 text-xs font-bold rounded-md border border-amber-500/20">
                        {sch.provider}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-400 font-bold">Waiver / Amount: {sch.amountOrWaiver}</p>
                    <p className="text-xs text-slate-400">Eligibility: {sch.eligibility}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TAB 10: REVIEWS */}
          {activeTab === 'reviews' && (
            <section className="space-y-4">
              <h3 className="text-base font-black text-teal-400 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                Student Reviews & Ratings
              </h3>

              <div className="space-y-4">
                {college.reviews.map((rev) => (
                  <div key={rev.id} className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white text-sm">{rev.reviewerName}</span>
                        <span className="text-xs text-slate-400 ml-2">({rev.batch})</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-amber-300">{rev.rating}.0 / 5</span>
                      </div>
                    </div>

                    <p className="font-bold text-slate-200 text-xs">{rev.title}</p>
                    <p className="text-xs text-emerald-400"><strong>Pros:</strong> {rev.pros}</p>
                    <p className="text-xs text-rose-400"><strong>Cons:</strong> {rev.cons}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TAB 11: Q&A */}
          {activeTab === 'qa' && (
            <section className="space-y-4">
              <h3 className="text-base font-black text-teal-400 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-teal-400" />
                Frequently Asked Student Questions (Q&A)
              </h3>

              <div className="space-y-4">
                {college.qaList.map((qa) => (
                  <div key={qa.id} className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-2">
                    <p className="font-bold text-white text-sm">Q: {qa.question}</p>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <strong className="text-teal-400 block mb-0.5">Answer by {qa.answeredBy}:</strong>
                      {qa.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TAB 12: UPDATES */}
          {activeTab === 'updates' && (
            <section className="space-y-4">
              <h3 className="text-base font-black text-teal-400 flex items-center gap-2">
                <Bell className="w-5 h-5 text-teal-400" />
                Latest Updates & Admission Notices 2026
              </h3>

              <div className="space-y-3">
                {college.latestUpdates.map((up) => (
                  <div key={up.id} className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-teal-500/10 text-teal-300 text-xs font-bold rounded-md">
                        {up.category}
                      </span>
                      <span className="text-xs text-slate-400">{up.date}</span>
                    </div>
                    <h4 className="font-bold text-white text-sm">{up.title}</h4>
                    <p className="text-xs text-slate-300">{up.summary}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-900 border-t border-slate-800 p-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400">
            Official Application Portal: <strong className="text-white">{college.name}</strong>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
            >
              Close
            </button>
            <a
              href={college.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition flex items-center gap-1.5"
            >
              <span>Visit Official Application Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
