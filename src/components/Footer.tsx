import React from 'react';
import { Landmark, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenAiModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenAiModal }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 sm:py-14 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-teal-700 flex items-center justify-center text-white">
              <Landmark className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold text-white">BharatSeva</span>
          </div>
          <p class="text-xs text-slate-400 leading-relaxed mb-4">
            Unified Digital Public Infrastructure bridging citizens with verified government services, jobs, competitive exams, scholarships, and welfare schemes across Bihar and India.
          </p>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>SSL Encrypted • Verified Daily</span>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-4">Portal Directory</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('services')} className="hover:text-white transition py-1">
                Services & Certificates (RTPS)
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('jobs')} className="hover:text-white transition py-1">
                Government Job Recruitment
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('exams')} className="hover:text-white transition py-1">
                BPSC & BSSC Exam Coverage
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('scholarships')} className="hover:text-white transition py-1">
                Post Matric & Girl Grants
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-4">Citizen Utilities</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('deadlines')} className="hover:text-white transition py-1">
                Application Deadline Tracker
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition py-1">
                My Personal Citizen Dashboard
              </button>
            </li>
            <li>
              <button onClick={onOpenAiModal} className="hover:text-white transition py-1 flex items-center">
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
        <div>© 2026 BharatSeva Initiative. Digital Public Infrastructure for Transparent Governance.</div>
        <div className="flex space-x-4">
          <span className="hover:text-slate-300 cursor-pointer">Privacy Notice</span>
          <span>•</span>
          <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
          <span>•</span>
          <span className="hover:text-slate-300 cursor-pointer">Accessibility Statement</span>
        </div>
      </div>
    </footer>
  );
};
