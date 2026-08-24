import React, { useState } from 'react';
import {
  Briefcase,
  Building,
  TrendingUp,
  Coins,
  FileSpreadsheet,
  CheckCircle2,
  ExternalLink,
  Zap,
  HelpCircle,
  Award,
  DollarSign,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import {
  TOP_BUSINESS_IDEAS,
  GOVT_BUSINESS_SCHEMES,
  ACCOUNTING_SOFTWARE_LIST,
  BusinessIdea,
  BusinessSchemeGuide,
} from '../data/businessData';
import { DynamicHighCpmAdSlot } from './DynamicHighCpmAdSlot';
import { useAdRefresh } from '../hooks/useAdRefresh';

interface BusinessHubTabProps {
  onSaveItem?: (title: string, type: string) => void;
}

export const BusinessHubTab: React.FC<BusinessHubTabProps> = ({ onSaveItem }) => {
  const [activeSection, setActiveSection] = useState<'ideas' | 'schemes' | 'gst' | 'software'>('ideas');

  // Dynamic High-CPM Ad Refresh on Subtab Switch
  useAdRefresh({
    activeTab: 'business-msme',
    subTab: activeSection,
    category: 'business-msme',
    dwellRefreshIntervalSeconds: 35,
    enabled: true,
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Building className="w-3.5 h-3.5" />
            <span>High-CPM MSME, GST & Startup Enterprise Hub 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            GST, MSME Subsidies & High-Profit Business Ideas
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Government PMEGP 35% subsidies, Bihar Mukhyamantri Udyami ₹10 Lakh grants, top-margin manufacturing/service business plans, and GST return filing guides.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="https://omg10.com/4/11640571"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-extrabold rounded-xl shadow-md transition hover:scale-105"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Direct MSME & Mudra Loan Application Server</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Subtab Selector */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'ideas', label: 'High-Margin Business Ideas', icon: TrendingUp },
          { id: 'schemes', label: 'Govt Subsidies (PMEGP & Udyami)', icon: Award },
          { id: 'gst', label: 'GST & MSME Registration Guide', icon: FileSpreadsheet },
          { id: 'software', label: 'Accounting & Invoicing Software', icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
                isActive
                  ? 'bg-emerald-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic High-CPM MSME & Startup Enterprise Slot */}
      <DynamicHighCpmAdSlot
        slotId="business-main-banner"
        category="business-msme"
        format="banner"
        showManualRefresh={true}
        className="shadow-md"
      />

      {/* 📈 SECTION 1: BUSINESS IDEAS */}
      {activeSection === 'ideas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TOP_BUSINESS_IDEAS.map((idea) => (
            <div
              key={idea.id}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200 flex flex-col justify-between space-y-5 hover:shadow-md transition"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                      {idea.category}
                    </span>
                    <h3 className="font-black text-slate-900 text-lg mt-0.5">{idea.title}</h3>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 font-extrabold text-xs px-2.5 py-1 rounded-xl border border-emerald-200 shrink-0">
                    {idea.profitMargin} Margin
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{idea.overview}</p>

                {/* Financial Summary Grid */}
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs">
                  <div>
                    <div className="text-slate-400 font-bold uppercase text-[10px]">Capital Required:</div>
                    <div className="font-extrabold text-slate-900">{idea.initialInvestment}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 font-bold uppercase text-[10px]">Payback Period:</div>
                    <div className="font-extrabold text-blue-900">{idea.paybackPeriod}</div>
                  </div>
                </div>

                {/* Subsidies */}
                <div className="space-y-1.5 text-xs">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>Eligible Government Grants / Subsidies:</span>
                  </div>
                  <ul className="space-y-1 text-slate-600">
                    {idea.subsidiesApplicable.map((sub, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Licenses */}
                <div className="space-y-1 text-[11px] text-slate-500">
                  <strong>Mandatory Licenses:</strong> {idea.licensesRequired.join(' • ')}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <a
                  href="https://omg10.com/4/11640571"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl text-center flex items-center justify-center gap-1.5 shadow-xs transition"
                >
                  <span>Download Project Report & Apply Subsidy</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🏆 SECTION 2: GOVT SUBSIDY SCHEMES */}
      {activeSection === 'schemes' && (
        <div className="space-y-6">
          {GOVT_BUSINESS_SCHEMES.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider">
                    {scheme.ministry}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">{scheme.name}</h3>
                </div>

                <div className="bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200 text-right">
                  <div className="text-[10px] text-emerald-800 font-bold uppercase">Subsidy / Benefit</div>
                  <div className="text-sm font-black text-emerald-900">{scheme.subsidyAmount}</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{scheme.summary}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/70 text-xs">
                <div className="space-y-2">
                  <div className="font-extrabold text-slate-900">Who is Eligible?</div>
                  <p className="text-slate-700 leading-relaxed">{scheme.eligibility}</p>
                </div>
                <div className="space-y-2">
                  <div className="font-extrabold text-slate-900">Required Documents:</div>
                  <ul className="space-y-1 text-slate-700">
                    {scheme.documents.map((doc, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://omg10.com/4/11640571"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Fast-Track Apply Server</span>
                </a>

                <a
                  href={scheme.officialPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition flex items-center gap-1"
                >
                  <span>Official Government Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 📄 SECTION 3: GST & MSME REGISTRATION */}
      {activeSection === 'gst' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
          <div>
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
              Legal Compliance & Tax Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              GST Registration & MSME Udyam Certificate Guide 2026
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                <span>GST Registration Thresholds (Zero Govt Fee):</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li>• <strong>Goods Turnover:</strong> Mandatory if annual turnover exceeds ₹40 Lakhs (₹20 Lakhs for Special Category States).</li>
                <li>• <strong>Services Turnover:</strong> Mandatory if annual services revenue exceeds ₹20 Lakhs.</li>
                <li>• <strong>Inter-State & E-Commerce:</strong> Mandatory for all sellers on Amazon, Flipkart, or interstate B2B trading.</li>
                <li>• <strong>Composition Scheme:</strong> Pay 1% flat tax on turnover up to ₹1.5 Crore without complex monthly input credit matching.</li>
              </ul>
              <a
                href="https://www.gst.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:underline pt-2"
              >
                <span>Official GST Portal (gst.gov.in)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Udyam MSME Registration (100% Free & Online):</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li>• <strong>No Paperwork:</strong> Paperless Aadhaar-linked OTP registration via udyamregistration.gov.in.</li>
                <li>• <strong>Collateral-Free Loans:</strong> Eligibility under CGTMSE credit guarantee scheme up to ₹5 Crore.</li>
                <li>• <strong>Subsidies:</strong> 50% discount on Trademark and Patent government filing fees.</li>
                <li>• <strong>Delayed Payment Protection:</strong> Buyers must settle dues within 45 days under MSME Samadhaan.</li>
              </ul>
              <a
                href="https://udyamregistration.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:underline pt-2"
              >
                <span>Official Udyam Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 💼 SECTION 4: ACCOUNTING SOFTWARE */}
      {activeSection === 'software' && (
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-5">
          <div>
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
              Top Billing & Invoicing Systems
            </span>
            <h2 className="text-xl font-black text-slate-900">
              GST Accounting Software for Indian MSMEs
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 border-collapse">
              <thead className="bg-slate-50 text-slate-800 text-[11px] font-black uppercase border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Software Name</th>
                  <th className="py-3 px-4">Best Suited For</th>
                  <th className="py-3 px-4">e-Way Bill / e-Invoice</th>
                  <th className="py-3 px-4">Mobile App</th>
                  <th className="py-3 px-4">Pricing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {ACCOUNTING_SOFTWARE_LIST.map((sw, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-black text-slate-900">{sw.name}</td>
                    <td className="py-3.5 px-4 text-slate-700">{sw.bestFor}</td>
                    <td className="py-3.5 px-4">
                      {sw.eWayBillEInvoice ? (
                        <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                          Yes, Automated
                        </span>
                      ) : (
                        <span className="text-slate-400">Manual</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">{sw.mobileApp ? 'Android / iOS' : 'Desktop only'}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{sw.pricing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
