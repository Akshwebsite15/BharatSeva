import React, { useState } from 'react';
import {
  Bot,
  Cloud,
  Shield,
  Layers,
  Star,
  ExternalLink,
  Zap,
  CheckCircle2,
  Filter,
  Sparkles,
  Award,
  Terminal,
  Cpu,
} from 'lucide-react';
import {
  TECH_SAAS_TOOLS,
  TECH_GUIDES,
  TechToolItem,
  TechBuyingGuide,
} from '../data/techSaasData';

interface TechSaasTabProps {
  onSaveItem?: (title: string, type: string) => void;
}

export const TechSaasTab: React.FC<TechSaasTabProps> = ({ onSaveItem }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [pricingFilter, setPricingFilter] = useState<string>('All');

  const categories = [
    'All',
    'AI Tools & LLMs',
    'Cloud & Web Hosting',
    'VPN & Cybersecurity',
    'Productivity & Office',
    'Developer & Design',
  ];

  const filteredTools = TECH_SAAS_TOOLS.filter((tool) => {
    const matchCat = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchPrice =
      pricingFilter === 'All' ||
      (pricingFilter === 'Free' &&
        (tool.pricingType === 'Free Tier Available' || tool.pricingType === 'Freemium')) ||
      (pricingFilter === 'Paid' && tool.pricingType === 'Paid');
    return matchCat && matchPrice;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-purple-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-purple-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>High-CPM Technology, SaaS & AI Tool Directory 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Top AI Models, Web Hosting, VPNs & SaaS Software
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Curated software intelligence: Compare ChatGPT vs Claude vs Gemini, verified high-speed Indian web hosting with free domains, military-grade VPNs, and essential developer stacks.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="https://omg10.com/4/11640571"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-extrabold rounded-xl shadow-md transition hover:scale-105"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Direct Fast-Track AI & Software Trial Server</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Category Pills & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-purple-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-slate-500">Pricing:</span>
          <select
            value={pricingFilter}
            onChange={(e) => setPricingFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-900"
          >
            <option value="All">All Tiers</option>
            <option value="Free">Free / Freemium</option>
            <option value="Paid">Paid Only</option>
          </select>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 flex flex-col justify-between space-y-4 hover:shadow-md hover:border-purple-200 transition group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-600">
                    {tool.category}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-purple-900 transition">
                    {tool.name}
                  </h3>
                </div>
                {tool.badge && (
                  <span className="bg-purple-50 text-purple-700 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-purple-200 shrink-0">
                    {tool.badge}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{tool.description}</p>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Pricing:</span>
                  <span className="font-extrabold text-slate-900">{tool.startingPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">Best For:</span>
                  <span className="font-bold text-slate-700 line-clamp-1">{tool.bestFor}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Core Highlights:</div>
                <ul className="space-y-1 text-xs text-slate-700">
                  {tool.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="line-clamp-1">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <a
                href="https://omg10.com/4/11640571"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-purple-900 hover:bg-purple-800 text-white font-extrabold text-xs rounded-xl text-center flex items-center justify-center gap-1.5 shadow-xs transition"
              >
                <span>Try Instant Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={tool.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                Website
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Tech Guides Section */}
      <div className="space-y-4 pt-4">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span>Expert SaaS & Cloud Architecture Guides</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TECH_GUIDES.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-4"
            >
              <div>
                <span className="text-[11px] font-extrabold text-purple-600 uppercase tracking-wider">
                  {guide.category} • {guide.readTime}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">{guide.title}</h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{guide.summary}</p>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs text-slate-700">
                <div className="font-bold text-slate-900">Key Takeaways:</div>
                <ul className="space-y-1.5 list-disc list-inside">
                  {guide.keyPoints.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 text-xs text-purple-900">
                <strong>Verdict:</strong> {guide.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
