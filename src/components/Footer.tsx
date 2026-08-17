import React from 'react';
import { Landmark, ShieldCheck, CheckCircle2, AlertTriangle, Download, Lock, FileText } from 'lucide-react';

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
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>IMPORTANT LEGAL NOTICE & NON-GOVERNMENT STATEMENT</span>
          </div>
          <p>
            <strong>BharatSeva is an INDIVIDUAL, INDEPENDENT citizen informational platform and is NOT an official government website or government agency.</strong> BharatSeva is not affiliated with, authorized by, endorsed by, or connected with the Government of Bihar, Government of India, or any state ministry, commission, or department.
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
              <span>Privacy Notice</span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-teal-700 flex items-center justify-center text-white">
              <Landmark className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold text-white">BharatSeva</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Unified individual digital platform bridging citizens with official government services, recruitment updates, competitive exam preparation, scholarships, and welfare schemes.
          </p>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>SSL Encrypted • Client-First Privacy</span>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-4">Portal Directory</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('finance-insurance')} className="hover:text-emerald-400 font-extrabold text-emerald-300 transition py-1 cursor-pointer flex items-center gap-1.5">
                <span>Finance & Insurance Hub 🛡️</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('services')} className="hover:text-white transition py-1 cursor-pointer">
                Services & Certificates (RTPS)
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('jobs')} className="hover:text-white transition py-1 cursor-pointer">
                Government Job Recruitment
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('exams')} className="hover:text-white transition py-1 cursor-pointer">
                BPSC & BSSC Exam Coverage
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('scholarships')} className="hover:text-white transition py-1 cursor-pointer">
                Post Matric & Girl Grants
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-4">Citizen Utilities</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('deadlines')} className="hover:text-white transition py-1 cursor-pointer">
                Application Deadline Tracker
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition py-1 cursor-pointer">
                My Personal Citizen Dashboard
              </button>
            </li>
            <li>
              <button onClick={onOpenInstallModal} className="hover:text-amber-300 text-amber-400 font-extrabold transition py-1 flex items-center space-x-1 cursor-pointer">
                <Download className="w-3.5 h-3.5" />
                <span>Install BharatSeva App</span>
              </button>
            </li>
            <li>
              <button onClick={onOpenAiModal} className="hover:text-white transition py-1 flex items-center cursor-pointer">
                <span>AI Government Assistant</span>
                <span className="ml-1.5 px-1.5 py-0.2 bg-teal-800 text-teal-200 text-[9px] rounded font-mono">24/7</span>
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-4">Verification & Authority</h4>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            All records cross-referenced daily with Bihar State Gazette notifications, ServiceOnline RTPS, BPSC Commission, and Central Govt Ministries.
          </p>
          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80 text-[11px] text-slate-300 space-y-1">
            <div className="flex items-center text-teal-300 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
              <span>Direct Link to Official Portals</span>
            </div>
            <p className="text-slate-400 text-[10px]">Zero fake links or unverified third-party redirections.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>© 2026 BharatSeva Initiative (Individual Platform). All rights reserved.</div>
        <div className="flex space-x-4">
          <button onClick={() => onOpenLegalModal('privacy')} className="hover:text-slate-300 cursor-pointer">
            Privacy Notice
          </button>
          <span>•</span>
          <button onClick={() => onOpenLegalModal('terms')} className="hover:text-slate-300 cursor-pointer">
            Terms of Service
          </button>
          <span>•</span>
          <button onClick={() => onOpenLegalModal('disclaimer')} className="hover:text-slate-300 cursor-pointer">
            Non-Gov Disclaimer
          </button>
        </div>
      </div>
    </footer>
  );
};
