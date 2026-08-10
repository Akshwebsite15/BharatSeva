import React, { useState, useMemo } from 'react';
import { Building2, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { WelfareScheme } from '../types';

interface SchemesTabProps {
  schemes: WelfareScheme[];
}

export const SchemesTab: React.FC<SchemesTabProps> = ({ schemes }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Agriculture', 'Health', 'Entrepreneurship', 'Housing', 'Education'];

  const filteredSchemes = useMemo(() => {
    if (selectedCategory === 'All') return schemes;
    return schemes.filter(
      (s) => s.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [schemes, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-teal-600 font-extrabold uppercase tracking-wider text-xs">
          WELFARE DIRECTORY
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Central & State Welfare Schemes
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Browse verified government initiatives for agriculture DBT, health cards, enterprise capital grants, and housing.
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
            {cat} Schemes
          </button>
        ))}
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-teal-500 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-100">
                  {scheme.category}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {scheme.state}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                {scheme.title}
              </h3>

              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                {scheme.overview}
              </p>

              <div className="space-y-2 text-xs text-slate-700 mb-6 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-slate-500 block font-semibold mb-0.5">Key Benefit:</span>
                  <strong className="text-slate-900 leading-snug block">{scheme.benefits}</strong>
                </div>
                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-slate-500">Department: </span>
                  <span className="text-slate-800 font-medium">{scheme.department}</span>
                </div>
              </div>
            </div>

            <a
              href={`https://${scheme.source}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-slate-100 hover:bg-blue-900 hover:text-white text-slate-800 font-bold py-3 rounded-xl text-xs transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Official Scheme Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
