import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Sparkles,
  Calendar,
  IndianRupee,
  Bookmark,
  CheckCircle2,
  Building,
  Filter,
} from 'lucide-react';
import { Scholarship } from '../types';

interface ScholarshipsTabProps {
  scholarships: Scholarship[];
  onSaveScholarship: (title: string, type: 'Scholarship') => void;
}

export const ScholarshipsTab: React.FC<ScholarshipsTabProps> = ({
  scholarships,
  onSaveScholarship,
}) => {
  const [levelFilter, setLevelFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [incomeFilter, setIncomeFilter] = useState<string>('All');

  const filteredScholarships = useMemo(() => {
    return scholarships.filter((s) => {
      const matchLevel = levelFilter === 'All' || s.level === levelFilter;
      const matchCategory =
        categoryFilter === 'All' ||
        s.category.toLowerCase().includes(categoryFilter.toLowerCase()) ||
        s.category === 'All';
      const matchIncome = incomeFilter === 'All' || s.income === incomeFilter;
      return matchLevel && matchCategory && matchIncome;
    });
  }, [scholarships, levelFilter, categoryFilter, incomeFilter]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-teal-600 font-extrabold uppercase tracking-wider text-xs">
          EDUCATION & GRANTS
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Scholarships & Financial Assistance Portal
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Find verified state and central scholarships, girl student graduation grants, and low-interest student credit loans.
        </p>
      </div>

      {/* Interactive Matcher Tool Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-teal-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2.5">
          <Sparkles className="w-5 h-5 text-teal-400" />
          <h2 className="text-base sm:text-lg font-bold">Instant Scholarship Matcher Tool</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300">
          Select your course level, category, and family income to instantly filter eligible grant amounts.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Education Level</label>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-teal-400 cursor-pointer"
            >
              <option value="All" className="text-slate-900">All Education Levels</option>
              <option value="School" className="text-slate-900">School (Class 9-12)</option>
              <option value="Undergraduate" className="text-slate-900">Undergraduate (BA/BSc/BTech/MBBS)</option>
              <option value="Postgraduate" className="text-slate-900">Postgraduate / Master's</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Social Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-teal-400 cursor-pointer"
            >
              <option value="All" className="text-slate-900">All Categories</option>
              <option value="SC/ST/EBC" className="text-slate-900">SC / ST / EBC / BC</option>
              <option value="General/EWS" className="text-slate-900">General / EWS</option>
              <option value="Women" className="text-slate-900">Women & Girls</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Annual Family Income</label>
            <select
              value={incomeFilter}
              onChange={(e) => setIncomeFilter(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-teal-400 cursor-pointer"
            >
              <option value="All" className="text-slate-900">Any Family Income</option>
              <option value="Below 2.5L" className="text-slate-900">Below ₹2.5 Lakhs</option>
              <option value="Below 8L" className="text-slate-900">Below ₹8 Lakhs</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setLevelFilter('All');
                setCategoryFilter('All');
                setIncomeFilter('All');
              }}
              className="w-full bg-teal-500 hover:bg-teal-600 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl text-xs transition shadow-md cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Reset Selection</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScholarships.map((sch) => (
          <div
            key={sch.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-teal-500 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-100">
                  {sch.level}
                </span>
                <span className="text-xs font-semibold text-slate-500 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" /> Deadline: {sch.deadline}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                {sch.title}
              </h3>

              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                {sch.overview}
              </p>

              <div className="space-y-2 text-xs text-slate-700 mb-6 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Financial Support:</span>
                  <strong className="text-emerald-700 font-extrabold">{sch.amount}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Authority:</span>
                  <span className="text-slate-800 font-medium truncate max-w-[170px]">{sch.source}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSaveScholarship(sch.title, 'Scholarship')}
              className="w-full bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-800 font-bold py-3 rounded-xl text-xs transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Bookmark className="w-4 h-4" />
              <span>Bookmark Scholarship</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
