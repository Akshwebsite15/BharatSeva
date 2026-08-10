import React, { useState, useMemo } from 'react';
import {
  Search,
  CheckCircle2,
  ExternalLink,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Briefcase,
  Award,
  FileCheck,
  Globe,
  Share2,
  Bookmark,
  ArrowLeft,
  Calendar,
  Layers,
} from 'lucide-react';
import { IntentPageData } from '../types';
import { intentPagesList } from '../data/searchIntentData';

interface SearchIntentHubTabProps {
  initialSlug?: string | null;
  onSaveItem: (title: string, type: 'Service' | 'Scholarship' | 'Scheme' | 'Job' | 'Exam') => void;
}

export const SearchIntentHubTab: React.FC<SearchIntentHubTabProps> = ({
  initialSlug,
  onSaveItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Jobs' | 'Exam' | 'Results' | 'Services'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlug, setActiveSlug] = useState<string | null>(initialSlug || null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Filter list
  const filteredPages = useMemo(() => {
    return intentPagesList.filter((page) => {
      const matchCat = selectedCategory === 'All' || page.category === selectedCategory;
      const matchQuery =
        page.queryTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const activePage = useMemo(() => {
    if (!activeSlug) return null;
    return intentPagesList.find((p) => p.slug === activeSlug) || null;
  }, [activeSlug]);

  return (
    <div className="space-y-8">
      {/* LANDING PAGE DETAIL VIEW */}
      {activePage ? (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Back Button */}
          <button
            onClick={() => setActiveSlug(null)}
            className="inline-flex items-center space-x-2 text-xs font-black text-slate-600 hover:text-blue-900 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Search Intent Hub Queries</span>
          </button>

          {/* Hero Header */}
          <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-500/20 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-teal-400 text-slate-950 font-black text-[11px] rounded-full uppercase tracking-wider">
                {activePage.category} HUB
              </span>
              <span className="px-3 py-1 bg-white/10 text-slate-200 font-bold text-[11px] rounded-full flex items-center border border-white/10">
                <Calendar className="w-3.5 h-3.5 mr-1 text-teal-300" />
                Last Updated: {activePage.lastUpdated}
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-bold text-[11px] rounded-full border border-emerald-400/30 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                Official Govt Information Verified
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {activePage.headline}
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
              {activePage.summary}
            </p>
          </div>

          {/* Key Eligibility / Overview Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-black text-slate-900">
                Essential Overview & Eligibility Standard
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {activePage.eligibilityOrOverview}
            </p>

            {/* Structured Table Breakdown */}
            {activePage.tableData && activePage.tableData.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  📊 Key Information Summary Table:
                </h3>
                <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-2xs">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 font-black uppercase text-[10px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="p-3.5">Post / Subject Title</th>
                        <th className="p-3.5">Vacancy / Cutoff / SLA</th>
                        <th className="p-3.5">Details & Official Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                      {activePage.tableData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition">
                          <td className="p-3.5 font-bold text-slate-900">{row.label}</td>
                          <td className="p-3.5 font-black text-teal-800">{row.value}</td>
                          <td className="p-3.5 text-slate-600">{row.details || 'Verified Standard'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Step-by-Step Direct Guide */}
            {activePage.stepByStepGuide && activePage.stepByStepGuide.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  📝 Official Step-by-Step Procedure Guide:
                </h3>
                <div className="space-y-2.5">
                  {activePage.stepByStepGuide.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-800 font-medium flex items-start space-x-3"
                    >
                      <span className="w-6 h-6 rounded-xl bg-blue-900 text-white font-black text-[11px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="mt-0.5">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Official Portal Action Box */}
            <div className="bg-gradient-to-r from-teal-900 to-blue-900 text-white rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-300">
                  OFFICIAL GOVERNMENT PORTAL DIRECT ACCESS
                </span>
                <h4 className="text-base font-extrabold text-white">
                  {activePage.officialPortalName}
                </h4>
                <p className="text-xs text-slate-300">
                  Access direct application forms, syllabus PDFs, and official notifications without third-party redirects.
                </p>
              </div>

              <a
                href={activePage.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-teal-400 hover:bg-teal-300 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition cursor-pointer shrink-0 flex items-center justify-center space-x-2"
              >
                <span>Open {activePage.officialPortalName}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* FAQs Accordion */}
            {activePage.faqs && activePage.faqs.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  ❓ Frequently Asked Questions (FAQs):
                </h3>
                <div className="space-y-3">
                  {activePage.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;

                    return (
                      <div
                        key={idx}
                        className="border border-slate-200 rounded-2xl overflow-hidden transition"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full p-4 bg-slate-50 hover:bg-slate-100 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                        </button>
                        {isOpen && (
                          <div className="p-4 bg-white text-xs text-slate-700 border-t border-slate-100 leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Related Search Query Chips */}
            {activePage.relatedSearchQueries && activePage.relatedSearchQueries.length > 0 && (
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">
                  🔍 Related Popular Search Intent Queries:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activePage.relatedSearchQueries.map((query, idx) => {
                    const matchedItem = intentPagesList.find(
                      (p) => p.queryTitle.toLowerCase() === query.toLowerCase()
                    );

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (matchedItem) setActiveSlug(matchedItem.slug);
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-900 border border-slate-200 rounded-xl text-xs font-extrabold transition cursor-pointer flex items-center space-x-1"
                      >
                        <span>{query}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* MAIN INTENT HUB DIRECTORY VIEW */
        <div className="space-y-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-500/20">
            <div className="space-y-2 max-w-3xl">
              <span className="px-3 py-1 bg-teal-400 text-slate-950 text-[10px] font-black rounded-full uppercase tracking-wider">
                SEARCH-INTENT PORTAL LANDING HUB
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                High Search-Intent Government Pages Engine
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Direct access to official information, eligibility tables, syllabus PDFs, cutoff trends, online service application steps, and verified government portal links.
              </p>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search queries: 10th pass jobs, SSC CGL syllabus, BPSC result, Bihar caste certificate, land record..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
              {(['All', 'Jobs', 'Exam', 'Results', 'Services'] as const).map((cat) => {
                const isSel = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-2xl text-xs font-black shrink-0 transition cursor-pointer ${
                      isSel
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat === 'All' ? 'All Intent Pages' : `${cat} Hub`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid of Intent Landing Page Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPages.map((page) => (
              <div
                key={page.slug}
                onClick={() => setActiveSlug(page.slug)}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-teal-400 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black bg-blue-50 text-blue-900 border border-blue-200 uppercase tracking-wide">
                      {page.category}
                    </span>
                    <span className="text-[10px] font-extrabold text-slate-400 flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> {page.lastUpdated}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-900 transition mb-2 leading-snug">
                    {page.queryTitle}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {page.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700 group-hover:text-blue-900">
                  <span>View Full Details & Official Link</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
