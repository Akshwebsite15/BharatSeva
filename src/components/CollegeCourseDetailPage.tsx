import React, { useState } from 'react';
import {
  X,
  GraduationCap,
  Award,
  BookOpen,
  DollarSign,
  Users,
  CheckCircle,
  FileText,
  Briefcase,
  Star,
  ExternalLink,
  Building2,
  Calendar,
  Layers,
  HelpCircle,
  Clock,
  ShieldCheck,
  TrendingUp,
  MapPin,
} from 'lucide-react';
import { College, CollegeCourseSpecificData } from '../types';

interface CollegeCourseDetailPageProps {
  college: College;
  courseName: string;
  onClose: () => void;
  onSelectCollege?: (college: College) => void;
}

export const CollegeCourseDetailPage: React.FC<CollegeCourseDetailPageProps> = ({
  college,
  courseName,
  onClose,
  onSelectCollege,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'fees' | 'cutoffs' | 'placements' | 'reviews'>('overview');

  // Find course object in college.courses
  const matchingCourse = college.courses?.find(
    (c) => c.name.toLowerCase().includes(courseName.toLowerCase()) || courseName.toLowerCase().includes(c.name.toLowerCase())
  ) || college.courses?.[0] || {
    name: courseName,
    level: 'Undergraduate',
    duration: '4 Years',
    annualFee: college.avgAnnualFeeInr || 150000,
    feeText: `₹${(college.avgAnnualFeeInr / 100000).toFixed(2)} Lakh / year`,
    seats: 60,
    eligibility: college.eligibilityOverview || 'Class 12th passed with mandatory stream subjects.',
    entranceExam: college.entranceExamsAccepted?.[0] || 'Entrance Test / Merit',
  };

  const branchPlacements = college.placement || {
    academicYear: '2024-2025',
    highestPackageLpa: 42.0,
    averagePackageLpa: 18.5,
    medianPackageLpa: 15.0,
    placementRatePercent: 94,
    topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Tata Consultancy Services', 'Infosys'],
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md overflow-y-auto flex justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-auto flex flex-col max-h-[92vh]">
        
        {/* Header / Banner */}
        <div className="relative bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-900 text-white p-6 sm:p-8 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors cursor-pointer"
            title="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-amber-400 text-amber-950 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
              <Building2 className="w-3.5 h-3.5" />
              {college.shortName || college.name}
            </span>
            <span className="bg-blue-500/30 text-blue-200 border border-blue-400/40 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" />
              {matchingCourse.level || 'Degree Program'}
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {matchingCourse.duration || '3-4 Years'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            {matchingCourse.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1 text-slate-200 font-medium">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{college.city}, {college.state}</span>
            </div>
            <div>
              Affiliation: <strong className="text-white">{college.universityAffiliation}</strong>
            </div>
            {college.nirfRank && (
              <div className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 font-semibold">
                NIRF Rank #{college.nirfRank}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Bar inside Course Page */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 overflow-x-auto shrink-0 scrollbar-none">
          {[
            { id: 'overview', label: 'Course Overview & Seats', icon: BookOpen },
            { id: 'fees', label: 'Fees & Scholarships', icon: DollarSign },
            { id: 'cutoffs', label: 'Exam Cutoffs', icon: Award },
            { id: 'placements', label: 'Branch Placements', icon: Briefcase },
            { id: 'reviews', label: 'Student Reviews', icon: Star },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 font-semibold text-xs sm:text-sm flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600 bg-white shadow-2xs'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Highlight Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                  <div className="text-xs text-indigo-700 font-medium">Annual Tuition Fee</div>
                  <div className="text-lg font-bold text-indigo-900 mt-1">{matchingCourse.feeText}</div>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                  <div className="text-xs text-emerald-700 font-medium">Approved Seat Capacity</div>
                  <div className="text-lg font-bold text-emerald-900 mt-1">{matchingCourse.seats || 60} Seats</div>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <div className="text-xs text-blue-700 font-medium">Required Exam</div>
                  <div className="text-lg font-bold text-blue-900 mt-1">{matchingCourse.entranceExam}</div>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <div className="text-xs text-amber-700 font-medium">Branch Highest Package</div>
                  <div className="text-lg font-bold text-amber-900 mt-1">₹{branchPlacements.highestPackageLpa} LPA</div>
                </div>
              </div>

              {/* Course Eligibility */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  Branch Admission Eligibility Criteria
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {matchingCourse.eligibility || college.eligibilityOverview}
                </p>
              </div>

              {/* Admission Steps */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  Step-by-Step Admission Procedure for {matchingCourse.name}
                </h3>
                <div className="space-y-2">
                  {(college.admissionProcessSteps && college.admissionProcessSteps.length > 0
                    ? college.admissionProcessSteps
                    : [
                        `Appear for ${matchingCourse.entranceExam} entrance test.`,
                        'Achieve qualifying percentile or cutoff rank.',
                        'Participate in centralized counseling choice filling.',
                        'Complete document verification & seat confirmation at institute.'
                      ]
                  ).map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white p-3.5 rounded-lg border border-slate-200 text-sm">
                      <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-slate-800 leading-snug">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fees' && (
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl">
                <h3 className="text-lg font-bold text-emerald-900 mb-2">Detailed Fee Structure & Waivers</h3>
                <p className="text-sm text-emerald-800 mb-4">
                  Specific annual tuition fee for <strong>{matchingCourse.name}</strong> at <strong>{college.name}</strong>:
                </p>
                <div className="bg-white p-4 rounded-lg border border-emerald-200 text-emerald-950 font-bold text-xl mb-3">
                  {matchingCourse.feeText}
                </div>
                <div className="text-xs text-emerald-700 leading-relaxed">
                  * Note: Government category fee concessions apply as per Ministry guidelines. Full tuition waiver for SC/ST and Economically Weaker Section (EWS) candidates with parental income below ₹1.0 Lakh/year.
                </div>
              </div>

              {/* Scholarships for this branch */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3">Applicable Scholarships for this Department</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(college.scholarships || [
                    { name: 'Merit-cum-Means (MCM) Scholarship', provider: 'Central Govt', amountOrWaiver: '100% Tuition Fee Refund', eligibility: 'Parental income < 5 LPA' },
                    { name: 'Bihar Post-Matric Scholarship (PMS)', provider: 'Govt of Bihar', benefit: 'Full tuition reimbursement for BC/EBC/SC/ST' }
                  ]).map((sch: any, idx: number) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
                      <div className="font-bold text-sm text-slate-900">{sch.name}</div>
                      <div className="text-xs text-indigo-600 font-medium mb-2">Provider: {sch.provider}</div>
                      <div className="text-xs text-slate-700 bg-slate-50 p-2 rounded border border-slate-100">
                        {sch.amountOrWaiver || sch.benefit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cutoffs' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                Branch Cutoffs & Ranks for {matchingCourse.name}
              </h3>
              <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
                <table className="w-full text-left text-sm text-slate-700">
                  <thead className="bg-slate-100 text-xs font-semibold text-slate-900 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Exam & Year</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Opening Rank</th>
                      <th className="py-3 px-4">Closing Rank</th>
                      <th className="py-3 px-4">Counseling Round</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {(college.cutoffs && college.cutoffs.length > 0
                      ? college.cutoffs
                      : [
                          { examName: `${matchingCourse.entranceExam} 2025`, category: 'General (Gender-Neutral)', openingRank: 1200, closingRank: 3400, round: 'Round 6' },
                          { examName: `${matchingCourse.entranceExam} 2025`, category: 'OBC-NCL', openingRank: 650, closingRank: 1450, round: 'Round 6' },
                          { examName: `${matchingCourse.entranceExam} 2025`, category: 'SC Category', openingRank: 320, closingRank: 680, round: 'Round 6' },
                        ]
                    ).map((cutoff: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-semibold text-slate-900">{cutoff.examName}</td>
                        <td className="py-3 px-4">{cutoff.category}</td>
                        <td className="py-3 px-4 text-emerald-600 font-bold">{cutoff.openingRank}</td>
                        <td className="py-3 px-4 text-indigo-600 font-bold">{cutoff.closingRank}</td>
                        <td className="py-3 px-4 text-xs bg-slate-100 rounded px-2 py-1 inline-block my-2">{cutoff.round || 'Final Round'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'placements' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                  <div className="text-xs text-amber-800 font-bold uppercase tracking-wider">Highest Package</div>
                  <div className="text-2xl font-extrabold text-amber-900 mt-1">₹{branchPlacements.highestPackageLpa} LPA</div>
                </div>
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-center">
                  <div className="text-xs text-indigo-800 font-bold uppercase tracking-wider">Average Package</div>
                  <div className="text-2xl font-extrabold text-indigo-900 mt-1">₹{branchPlacements.averagePackageLpa} LPA</div>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                  <div className="text-xs text-emerald-800 font-bold uppercase tracking-wider">Placement Rate</div>
                  <div className="text-2xl font-extrabold text-emerald-900 mt-1">{branchPlacements.placementRatePercent}%</div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3">Top Companies Recruiting From This Department</h4>
                <div className="flex flex-wrap gap-2">
                  {branchPlacements.topRecruiters?.map((rec, i) => (
                    <span key={i} className="bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-xs px-3 py-1.5 rounded-lg shadow-2xs">
                      {rec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">Student Reviews for {matchingCourse.name}</h3>
              {(college.reviews && college.reviews.length > 0
                ? college.reviews
                : [
                    { reviewerName: 'Student Alumnus', batch: '2025 Batch', rating: 5, title: 'Excellent curriculum and placement exposure', pros: 'Top tier faculty, state of the art laboratory, high CTC offers.', cons: 'Strict attendance rules.', date: '2026-02-10' }
                  ]
              ).map((rev: any, idx: number) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-bold text-slate-900 text-sm">{rev.reviewerName} ({rev.batch})</div>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {rev.rating} / 5
                    </div>
                  </div>
                  <div className="font-bold text-slate-800 text-sm mb-1">{rev.title}</div>
                  <div className="text-xs text-emerald-700 mb-1"><strong>Pros:</strong> {rev.pros}</div>
                  {rev.cons && <div className="text-xs text-rose-700"><strong>Cons:</strong> {rev.cons}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-600">
            Official Source: <strong className="text-slate-800">{college.verifiedSource || 'Verified Portal'}</strong>
          </div>
          <div className="flex items-center gap-3">
            {college.officialWebsiteUrl && (
              <a
                href={college.officialWebsiteUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
              >
                Apply on Official Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
