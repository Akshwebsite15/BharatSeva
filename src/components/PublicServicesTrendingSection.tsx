import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  IndianRupee,
  Wallet,
  MapPin,
  ShieldCheck,
  Flame,
  Car,
  HeartPulse,
  ExternalLink,
  ArrowRight,
  Search,
  CheckCircle2,
  PhoneCall,
} from 'lucide-react';
import { TRENDING_PUBLIC_TOOLS, PublicToolItem } from '../data/publicToolsData';

interface PublicServicesTrendingSectionProps {
  onOpenPublicToolModal: (toolId?: string) => void;
}

export const PublicServicesTrendingSection: React.FC<PublicServicesTrendingSectionProps> = ({
  onOpenPublicToolModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Welfare', 'Finance', 'Land', 'Identity', 'Transport', 'Health'];

  const filteredTools = TRENDING_PUBLIC_TOOLS.filter((tool) => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
                Trending Public Utilities (दैनिक सरकारी सेवाएं)
              </span>
              <span className="bg-white/10 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                Over 15 Crore+ Monthly Searches
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
              Daily Citizen Services & Status Verification Hub
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              Direct access to Ration Card search, PM-Kisan ₹2000 installment tracker, EPFO PF balance, Bihar Bhumi Jamabandi, Aadhaar-PAN linking, LPG ₹300 subsidy & Ayushman Card.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            <button
              onClick={() => onOpenPublicToolModal('ration-card')}
              className="py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition active:scale-95 cursor-pointer"
            >
              <span>Explore All 8 Utilities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Category Chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-900 shadow-sm font-black'
                    : 'bg-white/10 hover:bg-white/20 text-emerald-100'
                }`}
              >
                {cat === 'All' ? 'All Portals' : cat}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-emerald-300/70" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Ration, Kisan, PF, Bhulekh..."
              className="w-full pl-8 pr-3 py-1.5 bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 rounded-xl text-xs text-white placeholder-emerald-200/60 focus:outline-hidden transition"
            />
          </div>
        </div>
      </div>

      {/* Grid of Public Utility Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTools.map((tool) => {
          return (
            <div
              key={tool.id}
              onClick={() => onOpenPublicToolModal(tool.id)}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs hover:shadow-lg hover:border-emerald-500 transition-all group cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden"
            >
              {/* Header pill & icon */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${tool.colorGradient} shadow-xs`}
                  >
                    {tool.id === 'ration-card' && <ShoppingBag className="w-5 h-5 text-white" />}
                    {tool.id === 'pm-kisan' && <IndianRupee className="w-5 h-5 text-white" />}
                    {tool.id === 'epfo-passbook' && <Wallet className="w-5 h-5 text-white" />}
                    {tool.id === 'bhulekh-land' && <MapPin className="w-5 h-5 text-white" />}
                    {tool.id === 'aadhaar-pan' && <ShieldCheck className="w-5 h-5 text-white" />}
                    {tool.id === 'lpg-subsidy' && <Flame className="w-5 h-5 text-white" />}
                    {tool.id === 'echallan-parivahan' && <Car className="w-5 h-5 text-white" />}
                    {tool.id === 'ayushman-card' && <HeartPulse className="w-5 h-5 text-white" />}
                  </div>

                  <span className="text-[10px] bg-slate-100 group-hover:bg-emerald-50 text-slate-700 group-hover:text-emerald-900 font-extrabold px-2 py-0.5 rounded-full transition">
                    {tool.searchesPerMonth}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                    {tool.title}
                  </h3>
                  <p className="text-[11px] font-bold text-slate-500 mt-0.5 line-clamp-1">
                    {tool.hindiTitle}
                  </p>
                </div>

                <p className="text-xs text-slate-600 font-normal leading-relaxed line-clamp-2">
                  {tool.shortDesc}
                </p>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1 group-hover:translate-x-0.5 transition">
                  <span>Open Interactive Tool</span>
                  <ArrowRight className="w-3 h-3" />
                </span>

                <span className="text-[10px] bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded font-black">
                  FREE
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
