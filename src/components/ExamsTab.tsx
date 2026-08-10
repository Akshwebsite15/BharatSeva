import React, { useState, useMemo } from 'react';
import { PenSquare, Calendar, ExternalLink, ShieldCheck, Clock } from 'lucide-react';
import { GovExam } from '../types';

interface ExamsTabProps {
  exams: GovExam[];
}

export const ExamsTab: React.FC<ExamsTabProps> = ({ exams }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'BPSC', 'BSSC', 'Bihar Police', 'Bihar Teacher', 'UPSC', 'Banking'];

  const filteredExams = useMemo(() => {
    if (selectedCategory === 'All') return exams;
    return exams.filter(
      (e) => e.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [exams, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-teal-600 font-extrabold uppercase tracking-wider text-xs">
          COMPETITIVE EXAMINATIONS
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Government Exams Milestones & Timeline
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Track official exam schedules, admit card release dates, answer keys, and result announcements for BPSC, BSSC, UPSC & State Commissions.
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

            <a
              href={exam.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-slate-100 hover:bg-blue-900 hover:text-white text-slate-800 font-bold py-3 rounded-xl text-xs transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Commission Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
