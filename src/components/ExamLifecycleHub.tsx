import React, { useState } from 'react';
import {
  X,
  FileText,
  UserCheck,
  Briefcase,
  IndianRupee,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Download,
  Calendar,
  ExternalLink,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  GraduationCap,
  Bell,
  Search,
} from 'lucide-react';
import { ExamLifecycleHubData, SampleQuestion } from '../types';
import { examHubDataList } from '../data/examHubData';

interface ExamLifecycleHubProps {
  examHub?: ExamLifecycleHubData;
  examHubTitle?: string | null;
  onClose: () => void;
  onSaveExam?: (title: string) => void;
}

export const ExamLifecycleHub: React.FC<ExamLifecycleHubProps> = ({
  examHub,
  examHubTitle,
  onClose,
  onSaveExam,
}) => {
  const hub = examHub || (examHubTitle ? (
    examHubDataList.find(
      (h) => h.title.toLowerCase().includes(examHubTitle.toLowerCase()) ||
             examHubTitle.toLowerCase().includes(h.title.toLowerCase())
    ) || examHubDataList[0]
  ) : examHubDataList[0]);
  const [activeTab, setActiveTab] = useState<
    | 'notification'
    | 'eligibility'
    | 'vacancy'
    | 'salary'
    | 'syllabus'
    | 'pattern'
    | 'pyq'
    | 'cutoffs'
    | 'application'
    | 'admitcard'
    | 'schedule'
    | 'answerkey'
    | 'result'
    | 'selection'
  >('notification');

  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [selectedPyqYear, setSelectedPyqYear] = useState<number>(
    hub.previousPapers[0]?.year || 2025
  );

  const tabs = [
    { id: 'notification', label: '1. Notification', icon: FileText },
    { id: 'eligibility', label: '2. Eligibility & Age', icon: UserCheck },
    { id: 'vacancy', label: '3. Vacancies', icon: Briefcase },
    { id: 'salary', label: '4. Salary & Perks', icon: IndianRupee },
    { id: 'syllabus', label: '5. Syllabus', icon: BookOpen },
    { id: 'pattern', label: '6. Exam Pattern', icon: HelpCircle },
    { id: 'pyq', label: '7. Previous Papers (PYQ)', icon: Download },
    { id: 'cutoffs', label: '8. Cutoff Trends', icon: TrendingUp },
    { id: 'application', label: '9. Apply Online', icon: ExternalLink },
    { id: 'admitcard', label: '10. Admit Card', icon: Award },
    { id: 'schedule', label: '11. Exam Schedule', icon: Calendar },
    { id: 'answerkey', label: '12. Answer Key', icon: Clock },
    { id: 'result', label: '13. Result & Merit', icon: Sparkles },
    { id: 'selection', label: '14. Final Selection / DV', icon: ShieldAlert },
  ];

  const currentPyq = hub.previousPapers.find((p) => p.year === selectedPyqYear) || hub.previousPapers[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-200">
        
        {/* Top Header Banner */}
        <div className="relative bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition cursor-pointer"
            title="Close Exam Hub"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-teal-500 text-slate-950 uppercase tracking-wider">
              PERMANENT EXAM HUB
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
              STAGE: {hub.currentStage}
            </span>
            <span className="text-xs text-slate-300 ml-auto">
              Updated: {hub.lastUpdated}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            {hub.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-slate-200">
            <div>
              <span className="text-slate-400">Conducting Body:</span>{' '}
              <strong className="text-white font-bold">{hub.conductingBody}</strong>
            </div>

            <div className="flex items-center space-x-3">
              {onSaveExam && (
                <button
                  onClick={() => onSaveExam(hub.title)}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs transition cursor-pointer flex items-center space-x-1"
                >
                  <Bell className="w-3.5 h-3.5 mr-1" />
                  <span>Bookmark Exam Hub</span>
                </button>
              )}

              <a
                href={hub.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold text-xs transition flex items-center space-x-1"
              >
                <span>Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Main Content Area with Navigation */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          
          {/* Sidebar Tabs */}
          <div className="w-full md:w-72 bg-slate-50 border-r border-slate-200 p-3 overflow-y-auto shrink-0 space-y-1">
            <p className="text-[10px] uppercase font-extrabold text-slate-400 px-3 py-2 tracking-wider">
              EXAM LIFECYCLE STEPS
            </p>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold text-left transition cursor-pointer ${
                    isActive
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-teal-400' : 'text-slate-500'}`} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panel */}
          <div className="flex-1 p-5 sm:p-8 overflow-y-auto bg-white">
            
            {/* 1. NOTIFICATION */}
            {activeTab === 'notification' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
                  <FileText className="w-6 h-6 text-blue-900" />
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Latest Official Notification</h2>
                    <p className="text-xs text-slate-500">Official advertisement details & key recruitment highlights</p>
                  </div>
                </div>

                <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-blue-900">Advt No: {hub.notification.advtNo}</span>
                    <span className="text-slate-600">Released: {hub.notification.releaseDate}</span>
                  </div>
                  <p className="text-sm text-slate-800 font-medium leading-relaxed">
                    {hub.notification.summary}
                  </p>
                  <div className="pt-2">
                    <a
                      href={hub.notification.officialPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Official Notification PDF</span>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm mb-3">Key Highlights</h3>
                  <div className="space-y-2">
                    {hub.notification.keyHighlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. ELIGIBILITY & AGE */}
            {activeTab === 'eligibility' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
                  <UserCheck className="w-6 h-6 text-blue-900" />
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Eligibility & Age Limit</h2>
                    <p className="text-xs text-slate-500">Educational criteria, stream rules, and upper age relaxations</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                    <span className="text-[10px] uppercase font-extrabold text-teal-600">ACADEMIC QUALIFICATION</span>
                    <p className="text-sm font-extrabold text-slate-900 mt-1">{hub.eligibility.qualification}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {hub.eligibility.allowedStreams.map((s, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-white text-slate-700 border border-slate-200 text-xs font-bold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                    <span className="text-[10px] uppercase font-extrabold text-amber-600">AGE LIMIT (GENERAL)</span>
                    <p className="text-xl font-extrabold text-slate-900 mt-1">
                      {hub.eligibility.minAge} to {hub.eligibility.maxAgeGen} Years
                    </p>
                    <p className="text-xs text-slate-500 mt-1">As on cutoff date specified in notification</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm mb-3">Category-Wise Upper Age Relaxation</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {hub.eligibility.ageRelaxations.map((rel, idx) => (
                      <div key={idx} className="bg-purple-50/70 p-3 rounded-xl border border-purple-100 text-center">
                        <span className="text-xs font-extrabold text-purple-900 block">{rel.category}</span>
                        <strong className="text-sm text-purple-700 font-black">+{rel.years} Years</strong>
                      </div>
                    ))}
                  </div>
                </div>

                {hub.eligibility.physicalStandards && (
                  <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200">
                    <h3 className="font-extrabold text-emerald-900 text-sm mb-2">Physical Standards (Mandatory)</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-800">
                      <div>Male Height: <strong>{hub.eligibility.physicalStandards.heightMale}</strong></div>
                      <div>Female Height: <strong>{hub.eligibility.physicalStandards.heightFemale}</strong></div>
                      <div>Chest (Male): <strong>{hub.eligibility.physicalStandards.chestMale || 'N/A'}</strong></div>
                      <div className="col-span-2 sm:col-span-3 text-slate-600 mt-1">{hub.eligibility.physicalStandards.endurance}</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. VACANCIES */}
            {activeTab === 'vacancy' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
                  <Briefcase className="w-6 h-6 text-blue-900" />
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Post-Wise Vacancies ({hub.vacancy.totalPosts})</h2>
                    <p className="text-xs text-slate-500">Breakdown of posts, department allocation, and reservation quota</p>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs text-slate-800">
                    <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-extrabold tracking-wider">
                      <tr>
                        <th className="p-3.5">Post Title</th>
                        <th className="p-3.5">Department</th>
                        <th className="p-3.5">Pay Level</th>
                        <th className="p-3.5 text-right">Vacancies</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {hub.vacancy.postList.map((post, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition">
                          <td className="p-3.5 font-extrabold text-slate-900">{post.postTitle}</td>
                          <td className="p-3.5 text-slate-600">{post.dept}</td>
                          <td className="p-3.5 text-teal-700 font-bold">{post.payLevel}</td>
                          <td className="p-3.5 text-right font-black text-slate-900">{post.vacancies}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {hub.vacancy.categoryQuota && (
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm mb-3">Category-Wise Reservation Distribution</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {hub.vacancy.categoryQuota.map((q, idx) => (
                        <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                          <span className="text-[10px] font-bold text-slate-500 uppercase block">{q.category}</span>
                          <strong className="text-sm font-extrabold text-slate-900">{q.count} Posts</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. SALARY */}
            {activeTab === 'salary' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
                  <IndianRupee className="w-6 h-6 text-emerald-700" />
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Salary & Pay Level Breakdown</h2>
                    <p className="text-xs text-slate-500">7th CPC Basic Pay, In-Hand Monthly Salary, and Government Perquisites</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200">
                    <span className="text-[10px] uppercase font-extrabold text-emerald-800">PAY SCALE</span>
                    <p className="text-lg font-extrabold text-emerald-950 mt-1">{hub.salary.payScale}</p>
                  </div>
                  <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200">
                    <span className="text-[10px] uppercase font-extrabold text-emerald-800">BASIC PAY</span>
                    <p className="text-lg font-extrabold text-emerald-950 mt-1">{hub.salary.basicPay}</p>
                  </div>
                  <div className="bg-emerald-600 text-white p-5 rounded-2xl shadow-md">
                    <span className="text-[10px] uppercase font-extrabold text-emerald-100 block">ESTIMATED IN-HAND SALARY</span>
                    <p className="text-xl font-black mt-1">{hub.salary.approxInHand}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm mb-3">Allowances & Key Benefits</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {hub.salary.allowances.map((allw, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{allw}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. SYLLABUS */}
            {activeTab === 'syllabus' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
                  <BookOpen className="w-6 h-6 text-blue-900" />
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Detailed Subject-Wise Syllabus</h2>
                    <p className="text-xs text-slate-500">Tier-wise topic breakdown, weightage, and recommended reference books</p>
                  </div>
                </div>

                {hub.syllabus.map((syl, sIdx) => (
                  <div key={sIdx} className="space-y-3">
                    <h3 className="text-base font-extrabold text-blue-900 bg-blue-50 px-4 py-2.5 rounded-xl border border-blue-100">
                      {syl.tier}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {syl.subjects.map((sub, subIdx) => (
                        <div key={subIdx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="font-extrabold text-slate-900 text-sm">{sub.name}</h4>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-purple-100 text-purple-900">
                              {sub.totalMarks} Marks
                            </span>
                          </div>

                          <div className="text-xs text-slate-600 space-y-1">
                            <strong>Topics covered:</strong>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {sub.topics.map((t, tIdx) => (
                                <span key={tIdx} className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 text-[11px] font-medium rounded-md">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>

                          <p className="text-[11px] text-teal-800 font-bold pt-1">
                            📖 Key Book: {sub.keyBooks}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 6. EXAM PATTERN */}
            {activeTab === 'pattern' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
                  <HelpCircle className="w-6 h-6 text-blue-900" />
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Exam Pattern & Marking Scheme</h2>
                    <p className="text-xs text-slate-500">Tier structure, negative marking rules, question distribution, and duration</p>
                  </div>
                </div>

                {hub.examPattern.map((pat, pIdx) => (
                  <div key={pIdx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900">{pat.tier}</h3>
                        <span className="text-xs font-bold text-teal-700">{pat.mode}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs">
                        <span className="px-3 py-1 bg-white border border-slate-200 rounded-xl font-extrabold">
                          ⏳ {pat.durationMinutes} Mins
                        </span>
                        <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-xl font-extrabold">
                          ⚠️ Penalty: {pat.negativeMarking}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">SECTIONAL BREAKDOWN</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {pat.sections.map((sec, sIdx) => (
                          <div key={sIdx} className="bg-white p-3 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                            <span className="font-bold text-slate-800">{sec.sectionName}</span>
                            <span className="font-extrabold text-blue-900">{sec.questions} Qs | {sec.marks} Marks</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 7. PREVIOUS YEAR PAPERS (PYQ) */}
            {activeTab === 'pyq' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
                  <Download className="w-6 h-6 text-blue-900" />
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Previous Year Question Papers (PYQ)</h2>
                    <p className="text-xs text-slate-500">Solve real exam paper questions with verified step-by-step solutions</p>
                  </div>
                </div>

                {/* Year Selectors */}
                <div className="flex space-x-2">
                  {hub.previousPapers.map((paper) => (
                    <button
                      key={paper.year}
                      onClick={() => setSelectedPyqYear(paper.year)}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                        selectedPyqYear === paper.year
                          ? 'bg-blue-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {paper.year} {paper.tier} Paper
                    </button>
                  ))}
                </div>

                {currentPyq && (
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-sm">{currentPyq.title}</h3>
                        <p className="text-xs text-slate-500">{currentPyq.totalQuestions} Questions | {currentPyq.durationMinutes} Minutes</p>
                      </div>
                      <button className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs transition flex items-center space-x-1 cursor-pointer">
                        <Download className="w-3.5 h-3.5 mr-1" />
                        <span>PDF Download</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">SAMPLE QUESTIONS & SOLUTIONS</h4>
                      {currentPyq.sampleQuestions.map((q) => {
                        const isExpanded = expandedQuestion === q.questionNumber;
                        return (
                          <div key={q.questionNumber} className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
                            <div className="flex justify-between items-start">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-900 border border-blue-100">
                                Q{q.questionNumber} • {q.subject}
                              </span>
                            </div>

                            <p className="text-sm font-bold text-slate-900">{q.question}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              {q.options.map((opt, oIdx) => (
                                <div
                                  key={oIdx}
                                  className={`p-2.5 rounded-xl border font-medium ${
                                    isExpanded && opt === q.correctAnswer
                                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-extrabold'
                                      : 'bg-slate-50 border-slate-200 text-slate-800'
                                  }`}
                                >
                                  {opt}
                                </div>
                              ))}
                            </div>

                            <button
                              onClick={() => setExpandedQuestion(isExpanded ? null : q.questionNumber)}
                              className="text-xs font-extrabold text-teal-700 hover:text-teal-900 cursor-pointer flex items-center pt-1"
                            >
                              <span>{isExpanded ? 'Hide Answer & Explanation' : 'View Correct Answer & Explanation'}</span>
                              <ChevronRight className={`w-3.5 h-3.5 ml-1 transition ${isExpanded ? 'rotate-90' : ''}`} />
                            </button>

                            {isExpanded && (
                              <div className="bg-teal-50/70 p-3.5 rounded-xl border border-teal-200 text-xs text-slate-800 space-y-1 animate-fadeIn">
                                <p className="font-extrabold text-teal-900">Correct Answer: {q.correctAnswer}</p>
                                <p className="text-slate-700">{q.explanation}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 8. CUTOFF TRENDS */}
            {activeTab === 'cutoffs' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
                  <TrendingUp className="w-6 h-6 text-purple-700" />
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Historical Cutoff Trends (Last 3 Years)</h2>
                    <p className="text-xs text-slate-500">Official category-wise cutoff analysis for General, EWS, OBC, SC, ST</p>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs text-slate-800">
                    <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-extrabold tracking-wider">
                      <tr>
                        <th className="p-3.5">Year & Tier</th>
                        <th className="p-3.5">UR (Gen)</th>
                        <th className="p-3.5">EWS</th>
                        <th className="p-3.5">OBC / BC</th>
                        <th className="p-3.5">SC</th>
                        <th className="p-3.5">ST</th>
                        <th className="p-3.5 text-right">Max Marks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-bold">
                      {hub.cutoffs.map((co, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition">
                          <td className="p-3.5 font-black text-slate-900">{co.year} - {co.tier}</td>
                          <td className="p-3.5 text-blue-900 font-extrabold">{co.general}</td>
                          <td className="p-3.5 text-slate-700">{co.ews}</td>
                          <td className="p-3.5 text-slate-700">{co.obc}</td>
                          <td className="p-3.5 text-slate-700">{co.sc}</td>
                          <td className="p-3.5 text-slate-700">{co.st}</td>
                          <td className="p-3.5 text-right font-black text-slate-900">{co.maxMarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 9. APPLICATION */}
            {activeTab === 'application' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
                  <ExternalLink className="w-6 h-6 text-teal-700" />
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Online Application Portal & Fee Details</h2>
                    <p className="text-xs text-slate-500">Direct portal links, registration window, and mandatory document checklist</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>Application Start Date: <strong className="text-slate-900 font-extrabold">{hub.application.startDate}</strong></div>
                    <div>Application Deadline: <strong className="text-rose-700 font-black">{hub.application.endDate}</strong></div>
                    <div>General / OBC Fee: <strong className="text-slate-900">{hub.application.feeGeneral}</strong></div>
                    <div>Reserved / Female Fee: <strong className="text-teal-700">{hub.application.feeReserved}</strong></div>
                  </div>

                  <a
                    href={hub.application.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-extrabold rounded-xl text-xs transition cursor-pointer shadow-sm"
                  >
                    <span>Open Official Application Form</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm mb-3">Required Upload Documents</h3>
                  <div className="space-y-2">
                    {hub.application.requiredDocs.map((doc, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 10. ADMIT CARD */}
            {activeTab === 'admitcard' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
                  <Award className="w-6 h-6 text-amber-700" />
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Admit Card & Hall Ticket Release</h2>
                    <p className="text-xs text-slate-500">Release timeline, direct hall ticket login, and exam center rules</p>
                  </div>
                </div>

                <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-amber-900">STATUS: {hub.admitCard.status}</span>
                    <span className="text-slate-700 font-bold">Release Date: {hub.admitCard.releaseDate}</span>
                  </div>

                  <a
                    href={hub.admitCard.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-extrabold text-xs transition cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Admit Card / Hall Ticket</span>
                  </a>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm mb-3">Exam Center Instructions</h3>
                  <div className="space-y-2">
                    {hub.admitCard.instructions.map((inst, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{inst}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 11. EXAM SCHEDULE */}
            {activeTab === 'schedule' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
                  <Calendar className="w-6 h-6 text-blue-900" />
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Exam Schedule & Shift Timings</h2>
                    <p className="text-xs text-slate-500">Tier-wise dates, exam shift timings, and allocated exam cities</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <span className="text-[10px] uppercase font-extrabold text-blue-900">TIER-1 EXAM DATES</span>
                    <p className="text-lg font-extrabold text-slate-900 mt-1">{hub.examSchedule.tier1Date}</p>
                  </div>

                  {hub.examSchedule.tier2Date && (
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                      <span className="text-[10px] uppercase font-extrabold text-purple-900">TIER-2 / MAINS DATES</span>
                      <p className="text-lg font-extrabold text-slate-900 mt-1">{hub.examSchedule.tier2Date}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm mb-2">Shift Timings</h3>
                  <div className="flex flex-wrap gap-2">
                    {hub.examSchedule.shifts.map((s, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-950 font-extrabold text-xs rounded-xl border border-blue-100">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm mb-2">Exam Center Cities</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {hub.examSchedule.examCenterCities.map((city, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-800 font-bold text-xs rounded-lg border border-slate-200">
                        📍 {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 12. ANSWER KEY */}
            {activeTab === 'answerkey' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
                  <Clock className="w-6 h-6 text-purple-800" />
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Answer Key & Objection Portal</h2>
                    <p className="text-xs text-slate-500">Provisional answer key download & objection fee filing window</p>
                  </div>
                </div>

                <div className="bg-purple-50/70 p-5 rounded-2xl border border-purple-200 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-purple-900">STATUS: {hub.answerKey.status}</span>
                    <span className="text-slate-700 font-bold">Expected: {hub.answerKey.releaseDate}</span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium">
                    Objection Fee: <strong>{hub.answerKey.objectionFee}</strong> | Deadline: <strong>{hub.answerKey.objectionDeadline}</strong>
                  </p>

                  <a
                    href={hub.answerKey.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-5 py-3 bg-purple-900 hover:bg-purple-800 text-white rounded-xl font-extrabold text-xs transition cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Official Answer Key & Objection Portal</span>
                  </a>
                </div>
              </div>
            )}

            {/* 13. RESULT */}
            {activeTab === 'result' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
                  <Sparkles className="w-6 h-6 text-amber-600" />
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Result & Official Merit List</h2>
                    <p className="text-xs text-slate-500">Result declaration dates, roll-number merit list PDF, and writeup write-ups</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-slate-900">RESULT STATUS: {hub.result.status}</span>
                    <span className="text-slate-600">Declaration Date: {hub.result.declarationDate}</span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={hub.result.meritListPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2.5 bg-blue-900 text-white rounded-xl font-bold text-xs hover:bg-blue-800 transition"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Roll-wise Merit List PDF</span>
                    </a>
                    <a
                      href={hub.result.cutOffPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2.5 bg-slate-200 text-slate-800 rounded-xl font-bold text-xs hover:bg-slate-300 transition"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Official Cutoff Writeup PDF</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* 14. FINAL SELECTION & DV */}
            {activeTab === 'selection' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
                  <ShieldAlert className="w-6 h-6 text-teal-700" />
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Document Verification & Final Selection</h2>
                    <p className="text-xs text-slate-500">Document verification checklist, medical standards, and final appointment criteria</p>
                  </div>
                </div>

                <div className="bg-teal-50/70 p-5 rounded-2xl border border-teal-200 space-y-3">
                  <h3 className="font-extrabold text-teal-900 text-sm">Merit Formula & Weightage</h3>
                  <p className="text-xs font-bold text-slate-800">{hub.finalSelection.meritFormula}</p>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm mb-3">Document Verification (DV) Checklist</h3>
                  <div className="space-y-2">
                    {hub.finalSelection.dvProcess.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800">
                  <strong>Medical Fitness Standard:</strong> {hub.finalSelection.medicalStandard}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
