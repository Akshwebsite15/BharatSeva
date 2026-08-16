import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  FileText,
  ShieldCheck,
  Bookmark,
  ExternalLink,
  Clock,
  IndianRupee,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { CitizenService, JurisdictionState } from '../types';
import { PublicServicesTrendingSection } from './PublicServicesTrendingSection';

interface ServicesTabProps {
  services: CitizenService[];
  selectedJurisdiction: JurisdictionState;
  onViewService: (service: CitizenService) => void;
  onSaveService: (title: string, type: 'Service') => void;
  onOpenPublicToolModal?: (toolId?: string) => void;
}

export const ServicesTab: React.FC<ServicesTabProps> = ({
  services,
  selectedJurisdiction,
  onViewService,
  onSaveService,
  onOpenPublicToolModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [modeFilter, setModeFilter] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'popularity' | 'relevance'>('popularity');

  const filteredServices = useMemo(() => {
    return services
      .filter((s) => {
        const matchesSearch =
          s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.overview.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || s.category === categoryFilter;
        const matchesMode = modeFilter === 'All' || s.mode === modeFilter;
        const matchesState =
          selectedJurisdiction === 'All India' ||
          s.state === selectedJurisdiction ||
          s.state === 'All';

        return matchesSearch && matchesCategory && matchesMode && matchesState;
      })
      .sort((a, b) => {
        if (sortOrder === 'popularity') return b.popularity - a.popularity;
        return b.relevance - a.relevance;
      });
  }, [services, searchTerm, categoryFilter, modeFilter, selectedJurisdiction, sortOrder]);

  return (
    <div className="space-y-8">
      {/* 🇮🇳 TRENDING CITIZEN SERVICES & PUBLIC STATUS UTILITIES HUB */}
      <PublicServicesTrendingSection
        onOpenPublicToolModal={onOpenPublicToolModal || (() => {})}
      />

      {/* Header */}
      <div>
        <span className="text-teal-600 font-extrabold uppercase tracking-wider text-xs">
          OFFICIAL DIRECTORY
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          State & Central Government Services (RTPS / Certificates)
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Explore step-by-step guides, required documents, fees, processing SLAs, and direct links to RTPS Bihar & National portals.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-xs border border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Search Services</label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Caste, Income, EWS, LPC..."
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Certificate">Certificates (Caste/Income/EWS)</option>
            <option value="Revenue & Land">Revenue & Land Records (LPC)</option>
            <option value="Welfare & Identity">Welfare & Identity (UDID/Police)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Processing Mode</label>
          <select
            value={modeFilter}
            onChange={(e) => setModeFilter(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Modes (Online & Hybrid)</option>
            <option value="Online">Online Only (RTPS)</option>
            <option value="Hybrid">Hybrid / Physical Verification</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Sort Order</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'popularity' | 'relevance')}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden cursor-pointer"
          >
            <option value="popularity">Most Popular First</option>
            <option value="relevance">Highest Relevance</option>
          </select>
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200">
          <FileText className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No matching services found</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search query or reset the category filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('All');
              setModeFilter('All');
            }}
            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold hover:bg-teal-700 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-teal-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                    {service.category}
                  </span>
                  <span className="text-xs font-bold text-teal-700 flex items-center bg-teal-50 px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" /> {service.state}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                  {service.overview}
                </p>

                <div className="space-y-2 text-xs text-slate-600 mb-6 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-amber-600" /> Processing Time:
                    </span>
                    <strong className="text-slate-900 font-bold">{service.processingTime}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 flex items-center">
                      <IndianRupee className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Official Fee:
                    </span>
                    <strong className="text-emerald-700 font-bold">{service.fees}</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onViewService(service)}
                  className="flex-grow bg-slate-100 hover:bg-blue-900 hover:text-white text-slate-800 font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>View Step Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onSaveService(service.title, 'Service')}
                  aria-label="Save service"
                  title="Bookmark to Dashboard"
                  className="p-3 bg-slate-100 hover:bg-teal-50 text-slate-600 hover:text-teal-700 rounded-xl transition cursor-pointer shrink-0"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
