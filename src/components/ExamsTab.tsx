import React, { useState, useMemo } from 'react';
import {
  PenSquare,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Clock,
  BookOpen,
  Sparkles,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { GovExam } from '../types';

interface ExamsTabProps {
  exams: GovExam[];
  onOpenExamHub?: (examTitle: string) => void;
}

export const ExamsTab: React.FC<ExamsTabProps> = ({ exams, onOpenExamHub }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'SSC', 'BPSC', 'Bihar Police', 'Railway / RRB', 'UPSC'];

  const filteredExams = useMemo(() => {
    if (selectedCategory === 'All') return exams;
    return exams.filter(
      (e) => e.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
             e.title.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }, [exams, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Permanent Exam Lifecycle Hub Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-800/40 relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Permanent Exam Lifecycle Hubs</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Single Hub for Every Government Examination
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Stop visiting 10 broken websites! Access the complete 14-stage exam lifecycle for every major government recruitment: 
            <strong> Notification • Eligibility • Vacancies • Salary & Perks • Syllabus • Exam Pattern • PYQs • Category Cutoffs • Application • Admit Card • Exam Schedule • Answer Keys • Results • Document Verification</strong>.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 bg-white/10 rounded-lg text-teal-300 font-bold">✓ Live 3-Year Cutoff Trends</span>
            <span className="px-3 py-1 bg-white/10 rounded-lg text-amber-300 font-bold">✓ Interactive PYQ & Solutions</span>
            <span className="px-3 py-1 bg-white/10 rounded-lg text-emerald-300 font-bold">✓ Post-Wise Vacancy Quota</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div>
        <span className="text-teal-600 font-extrabold uppercase tracking-wider text-xs">
          COMPETITIVE EXAMINATIONS
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
          Government Exam Hubs & Schedules
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Track official exam timelines, syllabus patterns, cutoff history, and admit card release status.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat} Exams
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-teal-500 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-800 border border-purple-100">
                  {exam.category}
                </span>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                  {exam.status}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                {exam.title}
              </h3>

              <div className="space-y-2 text-xs text-slate-700 mb-6 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1 text-teal-600" /> Exam Date:
                  </span>
                  <strong className="text-slate-900 font-extrabold">{exam.examDate}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1 text-amber-600" /> Admit Card:
                  </span>
                  <strong className="text-teal-700 font-bold">{exam.admitCardDate}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Eligibility:</span>
                  <span className="text-slate-800 font-medium truncate max-w-[170px]">{exam.eligibility}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => onOpenExamHub && onOpenExamHub(exam.title)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
              >
                <Layers className="w-4 h-4 text-teal-400" />
                <span>Open Exam Lifecycle Hub</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={exam.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Commission Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
