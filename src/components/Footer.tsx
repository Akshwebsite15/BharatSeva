import React from 'react';
import {
  Landmark,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Download,
  Lock,
  FileText,
  Heart,
  Bot,
  Calculator,
  GraduationCap,
  Briefcase,
  TrendingUp,
  ExternalLink,
  Zap,
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenAiModal: () => void;
  onOpenInstallModal: () => void;
  onOpenLegalModal: (tab?: 'privacy' | 'terms' | 'disclaimer') => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenAiModal,
  onOpenInstallModal,
  onOpenLegalModal,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 sm:py-14 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        {/* Prominent Non-Government Portal Disclaimer Banner */}
        <div className="bg-amber-950/60 border border-amber-500/30 rounded-2xl p-4 sm:p-5 text-amber-200 text-xs leading-relaxed space-y-2">
          <div className="flex items-center space-x-2 font-black text-amber-400 uppercase tracking-wider text-[11px]">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>IMPORTANT LEGAL NOTICE & NON-GOVERNMENT CITIZEN DIRECTORY STATEMENT</span>
          </div>
          <p>
            <strong>BharatSeva is an INDIVIDUAL, INDEPENDENT citizen informational platform and is NOT an official government website or government agency.</strong> BharatSeva is not affiliated with, authorized by, endorsed by, or connected with the Government of Bihar, Government of India, or any state ministry, commission, or recruitment board. Official direct links to primary portals (.gov.in / .nic.in) are provided for applicant verification.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px]">
            <button
              onClick={() => onOpenLegalModal('disclaimer')}
              className="text-amber-300 hover:text-white underline font-bold cursor-pointer flex items-center space-x-1"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Read Full Non-Gov Disclaimer</span>
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegalModal('privacy')}
              className="text-amber-300 hover:text-white underline font-bold cursor-pointer flex items-center space-x-1"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegalModal('terms')}
              className="text-amber-300 hover:text-white underline font-bold cursor-pointer flex items-center space-x-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms of Service</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-10">
        {/* Col 1: Brand & Tagline */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center text-white shadow-md border border-blue-800">
              <Landmark className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-xl font-black text-white tracking-tight">
                Bharat<span className="text-amber-400">Seva</span>
              </span>
              <span className="block text-[11px] text-amber-300/90 font-bold">
                Sahi Jankari, Sahi Faisla
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            India’s dedicated citizen intelligence directory covering finance & loans, govt jobs, education, real estate, technology & SaaS, business & MSME, automobiles, healthcare, and pilgrimage travel.
          </p>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold pt-1">
            <ShieldCheck className="w-4 h-4" />
            <span>SSL Encrypted • 100% Free Public Access</span>
          </div>
        </div>

        {/* Col 2: Education & Jobs */}
        <div>
          <h4 className="font-bold text-white text-sm mb-3">Education & Jobs</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('jobs')} className="hover:text-white transition cursor-pointer">
                Govt Jobs & Careers
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('colleges')} className="hover:text-white transition cursor-pointer">
                Colleges & Admissions
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('exams')} className="hover:text-white transition cursor-pointer">
                Competitive Exams & Admit Cards
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('scholarships')} className="hover:text-white transition cursor-pointer">
                Scholarships Directory
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('tech-saas')} className="hover:text-white transition cursor-pointer">
                Tech & AI Tools
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Finance, Real Estate & Business */}
        <div>
          <h4 className="font-bold text-white text-sm mb-3">Finance & Industry</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('finance-insurance')} className="hover:text-white transition cursor-pointer">
                Finance, Loans & Insurance
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('real-estate')} className="hover:text-white transition cursor-pointer">
                Real Estate & Land Records
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('business-hub')} className="hover:text-white transition cursor-pointer">
                Business & MSME Subsidy
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('automobiles')} className="hover:text-white transition cursor-pointer">
                Cars, EVs & Parivahan
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('health')} className="hover:text-white transition cursor-pointer">
                Health & Ayushman Bharat
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('travel')} className="hover:text-white transition cursor-pointer">
                Travel & IRCTC Tatkal
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Tools & AI */}
        <div>
          <h4 className="font-bold text-white text-sm mb-3">Tools & AI Utilities</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('tools')} className="hover:text-amber-400 font-bold text-slate-300 transition cursor-pointer flex items-center gap-1">
                <Calculator className="w-3.5 h-3.5" />
                <span>EMI & Tax Calculators</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('ai-utilities')} className="hover:text-amber-400 font-bold text-slate-300 transition cursor-pointer flex items-center gap-1">
                <Bot className="w-3.5 h-3.5 text-indigo-400" />
                <span>AI Career Advisor</span>
              </button>
            </li>
            <li>
              <button onClick={() => onOpenInstallModal()} className="hover:text-amber-400 font-bold text-amber-300 transition cursor-pointer flex items-center gap-1">
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Install Mobile / Desktop App</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition cursor-pointer">
                My Bookmarks & Applications
              </button>
            </li>
            <li className="pt-1">
              <a
                href="https://omg10.com/4/11640571"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 font-bold transition flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg text-[11px]"
              >
                <Zap className="w-3 h-3 fill-amber-400" />
                <span>Direct Opportunity Portal</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <p>© {new Date().getFullYear()} BharatSeva. All rights reserved. Sahi Jankari, Sahi Faisla.</p>
        <div className="flex items-center space-x-4">
          <button onClick={() => onOpenLegalModal('terms')} className="hover:text-slate-300 cursor-pointer">
            Terms of Use
          </button>
          <button onClick={() => onOpenLegalModal('privacy')} className="hover:text-slate-300 cursor-pointer">
            Privacy Policy
          </button>
          <button onClick={() => onOpenLegalModal('disclaimer')} className="hover:text-slate-300 cursor-pointer">
            Disclaimer
          </button>
        </div>
      </div>
    </footer>
  );
};
