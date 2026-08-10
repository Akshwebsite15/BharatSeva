import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, FileText, Lock, Building2, CheckCircle2, ExternalLink, X, Info } from 'lucide-react';

interface LegalNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubTab?: 'privacy' | 'terms' | 'disclaimer';
}

export const LegalNoticeModal: React.FC<LegalNoticeModalProps> = ({
  isOpen,
  onClose,
  defaultSubTab = 'disclaimer',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'disclaimer' | 'privacy' | 'terms'>(
    defaultSubTab
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                IMPORTANT LEGAL DECLARATION
              </span>
              <h2 className="text-lg font-extrabold text-white">
                Privacy Notice, Non-Gov Disclaimer & Terms
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub Navigation Bar */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 space-x-2">
          <button
            onClick={() => setActiveSubTab('disclaimer')}
            className={`px-4 py-2.5 font-black text-xs rounded-t-xl transition cursor-pointer flex items-center space-x-1.5 ${
              activeSubTab === 'disclaimer'
                ? 'bg-white text-amber-900 border-t-2 border-amber-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Non-Gov Disclaimer</span>
          </button>

          <button
            onClick={() => setActiveSubTab('privacy')}
            className={`px-4 py-2.5 font-black text-xs rounded-t-xl transition cursor-pointer flex items-center space-x-1.5 ${
              activeSubTab === 'privacy'
                ? 'bg-white text-blue-900 border-t-2 border-blue-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock className="w-4 h-4 text-blue-600" />
            <span>Privacy Notice</span>
          </button>

          <button
            onClick={() => setActiveSubTab('terms')}
            className={`px-4 py-2.5 font-black text-xs rounded-t-xl transition cursor-pointer flex items-center space-x-1.5 ${
              activeSubTab === 'terms'
                ? 'bg-white text-slate-900 border-t-2 border-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-slate-700" />
            <span>Terms of Service</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 leading-relaxed max-h-[60vh]">
          {/* 1. NON-GOVERNMENT DISCLAIMER */}
          {activeSubTab === 'disclaimer' && (
            <div className="space-y-5">
              <div className="bg-amber-50 border-2 border-amber-300 p-5 rounded-2xl text-amber-950 space-y-3">
                <div className="flex items-center space-x-2 font-black text-sm text-amber-900">
                  <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                  <span>CRITICAL CITIZEN NOTICE: INDIVIDUAL & INDEPENDENT PLATFORM</span>
                </div>
                <p className="font-semibold text-xs leading-relaxed text-amber-900">
                  <strong>BharatSeva is NOT an official government website or government portal.</strong> This platform is an individual, independent digital initiative designed solely for public information aggregation, exam career assistance, and citizen guidance.
                </p>
                <p className="text-[11px] text-amber-900/90 leading-relaxed">
                  BharatSeva is not affiliated with, associated with, authorized by, endorsed by, or in any way officially connected to the Government of Bihar, Government of India, or any state government, ministry, commission, or official department.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-extrabold text-sm text-slate-900">1. Official Sources of Information</h3>
                <p>
                  All job updates, exam schedules, RTPS service guides, scholarship rules, and welfare scheme summaries provided on BharatSeva are curated from authentic public domain sources, including:
                </p>
                <ul className="list-disc list-inside space-y-1 font-medium text-slate-800 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <li><strong>ServiceOnline Bihar (RTPS):</strong> serviceonline.bihar.gov.in</li>
                  <li><strong>BPSC Official Portal:</strong> bpsc.bih.nic.in</li>
                  <li><strong>BSSC Official Portal:</strong> bssc.bihar.gov.in</li>
                  <li><strong>National Portal of India:</strong> india.gov.in</li>
                  <li><strong>Medhasoft Scholarship Portal:</strong> medhasoft.bih.nic.in</li>
                  <li><strong>SSC & UPSC Portals:</strong> ssc.gov.in, upsc.gov.in</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-extrabold text-sm text-slate-900">2. Verification Requirement</h3>
                <p>
                  Users and job applicants are strictly advised to always double-check eligibility criteria, vacancy details, syllabus PDFs, fee requirements, and application submission links directly on the respective official government portal before making payments or submitting personal documents.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-extrabold text-sm text-slate-900">3. Direct Link Policy</h3>
                <p>
                  BharatSeva provides direct external links to official government websites for the convenience of citizens. BharatSeva does not host application forms or charge fees for government forms.
                </p>
              </div>
            </div>
          )}

          {/* 2. PRIVACY NOTICE */}
          {activeSubTab === 'privacy' && (
            <div className="space-y-5">
              <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl text-blue-950 space-y-2">
                <div className="flex items-center space-x-2 font-black text-sm text-blue-900">
                  <Lock className="w-5 h-5 text-blue-700 shrink-0" />
                  <span>PRIVACY NOTICE & TRANSPARENT DATA POLICY</span>
                </div>
                <p className="text-xs text-blue-900 leading-relaxed font-medium">
                  Your privacy and data autonomy are paramount. BharatSeva operates on a client-first privacy architecture.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-extrabold text-sm text-slate-900">1. Data Storage & Local Persistence</h3>
                <p>
                  Your saved jobs, bookmarked services, deadline trackers, and custom preferences are stored locally in your browser’s storage (LocalStorage). We do not store your passwords or financial credentials on server databases.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-extrabold text-sm text-slate-900">2. Analytics & Usage Logs</h3>
                <p>
                  We do not collect or sell personal identification data to third-party marketing companies or brokers. Standard anonymous web traffic telemetry may be used solely for maintaining app speed and uptime.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-extrabold text-sm text-slate-900">3. Third-Party Links</h3>
                <p>
                  When you click on an external link to an official government portal (e.g., bpsc.bih.nic.in or serviceonline.bihar.gov.in), you are directed to an external domain. Please consult that official domain’s privacy notice.
                </p>
              </div>
            </div>
          )}

          {/* 3. TERMS OF SERVICE */}
          {activeSubTab === 'terms' && (
            <div className="space-y-5">
              <div className="bg-slate-100 border border-slate-300 p-5 rounded-2xl text-slate-900 space-y-2">
                <div className="flex items-center space-x-2 font-black text-sm text-slate-900">
                  <FileText className="w-5 h-5 text-slate-800 shrink-0" />
                  <span>TERMS OF SERVICE & USAGE AGREEMENT</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  By accessing or using the BharatSeva Web Application, you acknowledge and agree to these Terms of Service.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-extrabold text-sm text-slate-900">1. Individual & Educational Use</h3>
                <p>
                  BharatSeva provides tools (Exam Preparation Hub, Current Affairs Quiz, Service Guides, Application Trackers) for personal educational and informational usage only.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-extrabold text-sm text-slate-900">2. No Guarantee or Warranty</h3>
                <p>
                  While every effort is made to maintain 100% accuracy, government schedules, vacancies, and RTPS guidelines are subject to change by official authorities without prior notice. BharatSeva assumes no liability for errors or official schedule changes.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-extrabold text-sm text-slate-900">3. Prohibited Conduct</h3>
                <p>
                  Users agree not to scrape, reverse engineer, attempt unauthorized access, or misuse the platform for fraudulent or deceptive purposes.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-extrabold text-sm text-slate-900">4. Intellectual Property & Attribution</h3>
                <p>
                  All curated study summaries and custom interface designs belong to BharatSeva. Government logos, seals, trademarks, and notification text belong to their respective government entities.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-500 font-medium text-[11px]">
            Updated for 2026 BharatSeva Individual Citizen Initiative
          </span>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-2xl transition cursor-pointer"
          >
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>
  );
};
