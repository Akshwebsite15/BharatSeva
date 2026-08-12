import React, { useState } from 'react';
import {
  X,
  BookOpen,
  GraduationCap,
  Award,
  DollarSign,
  CheckCircle,
  FileText,
  Briefcase,
  Users,
  Building2,
  HelpCircle,
  Clock,
  Layers,
  ArrowRight,
  TrendingUp,
  ExternalLink,
  ShieldCheck,
  Star,
  MapPin,
} from 'lucide-react';
import { CourseDirectoryItem, College } from '../types';

interface CourseDetailPageProps {
  course: CourseDirectoryItem;
  onClose: () => void;
  collegesList?: College[];
  onOpenCollegeCoursePage?: (college: College, courseName: string) => void;
  onSelectCollege?: (college: College) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  course,
  onClose,
  collegesList = [],
  onOpenCollegeCoursePage,
  onSelectCollege,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'eligibility' | 'fees' | 'process' | 'syllabus' | 'careers' | 'colleges' | 'scholarships' | 'faqs'
  >('overview');

  // Filter actual colleges in memory matching this course
  const matchingColleges = collegesList.filter((col) =>
    col.coursesOffered?.some((c) => c.toLowerCase().includes(course.degree.toLowerCase()) || c.toLowerCase().includes(course.name.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md overflow-y-auto flex justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-auto flex flex-col max-h-[94vh]">
        
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-6 sm:p-8 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors cursor-pointer"
            title="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {course.degree}
            </span>
            <span className="bg-blue-500/30 text-blue-200 border border-blue-400/30 text-xs font-medium px-3 py-1 rounded-full">
              {course.stream}
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.durationText}
            </span>
            <span className="bg-purple-500/20 text-purple-200 border border-purple-400/30 text-xs font-medium px-3 py-1 rounded-full">
              {course.level}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            {course.name} ({course.shortName})
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div>Average Starting Salary: <strong className="text-amber-300 font-bold">{course.avgStartingSalaryLpa}</strong></div>
            <div>Highest Package: <strong className="text-emerald-300 font-bold">{course.highestPackageLpa}</strong></div>
            <div>Entrance Exams: <strong className="text-white">{course.entranceExams.join(', ')}</strong></div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 overflow-x-auto shrink-0 scrollbar-none">
          {[
            { id: 'overview', label: '1. Overview', icon: BookOpen },
            { id: 'eligibility', label: '2. Eligibility & Duration', icon: CheckCircle },
            { id: 'fees', label: '3. Fees & Govt Concession', icon: DollarSign },
            { id: 'process', label: '4. Admission & Exams', icon: Award },
            { id: 'syllabus', label: '5. Semester Syllabus', icon: Layers },
            { id: 'careers', label: '6. Career Options & CTC', icon: Briefcase },
            { id: 'colleges', label: '7. Top Colleges Offering Course', icon: Building2 },
            { id: 'scholarships', label: '8. Scholarships', icon: GraduationCap },
            { id: 'faqs', label: '9. FAQs & Answers', icon: HelpCircle },
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

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">

          {/* Section 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
                <h2 className="text-lg font-bold text-slate-900 mb-2">Course Summary</h2>
                <p className="text-sm text-slate-700 leading-relaxed">{course.overview}</p>
              </div>

              {/* Specializations */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-600" />
                  Popular Specializations & Major Electives
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {course.specializations.map((spec, i) => (
                    <div key={i} className="bg-white border border-slate-200 p-3 rounded-xl flex items-center gap-2.5 shadow-2xs text-sm font-medium text-slate-800">
                      <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                      {spec}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
                  <div className="text-xs text-indigo-700 font-bold uppercase">Govt Fee Range</div>
                  <div className="text-base font-bold text-indigo-950 mt-1">{course.avgAnnualFeeGovt}</div>
                </div>
                <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl">
                  <div className="text-xs text-purple-700 font-bold uppercase">Private Fee Range</div>
                  <div className="text-base font-bold text-purple-950 mt-1">{course.avgAnnualFeePrivate}</div>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                  <div className="text-xs text-emerald-700 font-bold uppercase">Avg Starting CTC</div>
                  <div className="text-base font-bold text-emerald-950 mt-1">{course.avgStartingSalaryLpa}</div>
                </div>
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
                  <div className="text-xs text-amber-700 font-bold uppercase">Highest Package</div>
                  <div className="text-base font-bold text-amber-950 mt-1">{course.highestPackageLpa}</div>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Eligibility & Duration */}
          {activeTab === 'eligibility' && (
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl">
                <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  Academic Eligibility Prerequisites
                </h3>
                <p className="text-sm text-emerald-900 leading-relaxed font-medium">{course.eligibility}</p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">Course Level & Duration Breakdown</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <span className="text-slate-500 font-medium">Academic Level:</span>
                    <strong className="block text-slate-900 text-sm mt-0.5">{course.level} Degree</strong>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <span className="text-slate-500 font-medium">Standard Duration:</span>
                    <strong className="block text-slate-900 text-sm mt-0.5">{course.durationText}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Fees */}
          {activeTab === 'fees' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl">
                  <h4 className="font-bold text-blue-950 text-sm mb-1">Government College Fee Structure</h4>
                  <div className="text-2xl font-black text-blue-900 my-2">{course.avgAnnualFeeGovt}</div>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    Subsidized tuition fees regulated by state & central ministries. Substantial waivers for SC/ST/EBC and female students.
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 p-5 rounded-2xl">
                  <h4 className="font-bold text-purple-950 text-sm mb-1">Private Institute Fee Structure</h4>
                  <div className="text-2xl font-black text-purple-900 my-2">{course.avgAnnualFeePrivate}</div>
                  <p className="text-xs text-purple-800 leading-relaxed">
                    Includes tuition, laboratory infrastructure, and development fees. Bihar Student Credit Card (DRCC) loan up to ₹4 Lakhs applicable.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Admission & Exams */}
          {activeTab === 'process' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-600" />
                  Key Entrance Exams Accepted for {course.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {course.entranceExams.map((exam, i) => (
                    <span key={i} className="bg-indigo-50 text-indigo-800 border border-indigo-200 font-bold text-xs px-3.5 py-2 rounded-xl shadow-2xs">
                      {exam}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  Step-by-Step Admission Process
                </h3>
                <div className="space-y-2.5">
                  {course.admissionProcessSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                      <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-slate-800 leading-relaxed font-medium">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Syllabus */}
          {activeTab === 'syllabus' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                Core Subjects & Semester Syllabus Outline
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.coreSubjects.map((sem, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                    <div className="font-bold text-indigo-900 text-sm mb-3 pb-2 border-b border-slate-200">
                      {sem.semesterOrYear}
                    </div>
                    <ul className="space-y-2">
                      {sem.subjects.map((sub, j) => (
                        <li key={j} className="text-xs text-slate-700 flex items-center gap-2 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 6: Careers */}
          {activeTab === 'careers' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  Career Options, Job Profiles & CTC Salaries
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.careerOptions.map((job, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:border-indigo-300 transition-colors">
                      <div className="font-bold text-slate-900 text-base">{job.title}</div>
                      <div className="text-emerald-700 font-extrabold text-sm my-1.5">
                        Est. Salary: {job.avgSalary}
                      </div>
                      <div className="text-xs text-slate-600">
                        Top Sectors: <strong className="text-slate-800">{job.topSectors}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">Higher Studies Pathways</h4>
                <div className="flex flex-wrap gap-2">
                  {course.higherStudiesOptions.map((hs, i) => (
                    <span key={i} className="bg-slate-100 text-slate-800 border border-slate-200 font-medium text-xs px-3 py-1.5 rounded-lg">
                      {hs}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 7: Top Colleges */}
          {activeTab === 'colleges' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600" />
                Top Colleges & Institutes Offering {course.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.topCollegesList.map((col, i) => {
                  const actualCol = collegesList.find((c) => c.id === col.collegeId || c.name.toLowerCase().includes(col.collegeName.toLowerCase()));
                  return (
                    <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between hover:shadow-md transition-all">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-slate-900 text-base">{col.collegeName}</h4>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3.5 h-3.5 text-amber-500" />
                              {col.city}, {col.state}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded text-xs font-bold">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            {col.rating}
                          </div>
                        </div>

                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-700 my-3 font-semibold">
                          Annual Fee: <span className="text-indigo-700 font-extrabold">{col.feeText}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-2">
                        {actualCol && onOpenCollegeCoursePage && (
                          <button
                            onClick={() => onOpenCollegeCoursePage(actualCol, course.name)}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            College + Course Page <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {actualCol && onSelectCollege && (
                          <button
                            onClick={() => onSelectCollege(actualCol)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2 px-3 rounded-xl transition-colors cursor-pointer shrink-0"
                          >
                            Full College Info
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 8: Scholarships */}
          {activeTab === 'scholarships' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                Government & State Scholarships for {course.degree}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.scholarships.map((sch, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                    <div className="font-bold text-slate-900 text-sm">{sch.name}</div>
                    <div className="text-xs text-indigo-600 font-medium my-1">Provider: {sch.provider}</div>
                    <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 font-semibold mt-2">
                      Benefit: {sch.benefit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 9: FAQs */}
          {activeTab === 'faqs' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                Frequently Asked Questions about {course.name}
              </h3>
              {course.faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <div className="font-bold text-slate-900 text-sm mb-1.5">Q: {faq.question}</div>
                  <div className="text-xs text-slate-700 leading-relaxed font-medium">A: {faq.answer}</div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            Course Directory Category: <strong className="text-slate-800">{course.stream}</strong>
          </div>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Close Course Guide
          </button>
        </div>

      </div>
    </div>
  );
};
