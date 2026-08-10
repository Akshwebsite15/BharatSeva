import React from 'react';
import { X, ShieldCheck, ExternalLink, CheckCircle2, AlertCircle, FileText, Calendar, Building, Award } from 'lucide-react';
import { CitizenService, GovJob } from '../types';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: CitizenService | null;
  job?: GovJob | null;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  service,
  job,
}) => {
  if (!isOpen || (!service && !job)) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-700 font-bold transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {service && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2.5 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-100">
                  {service.category}
                </span>
                <span className="text-xs font-semibold text-teal-700 flex items-center bg-teal-50 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified {service.lastVerifiedDate}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
                {service.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {service.overview}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-semibold block mb-0.5">Processing SLA:</span>
                <strong className="text-slate-900 text-sm font-bold">{service.processingTime}</strong>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-semibold block mb-0.5">Official Fee:</span>
                <strong className="text-emerald-700 text-sm font-bold">{service.fees}</strong>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-teal-700">
                Eligibility Criteria
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {service.eligibility}
              </p>
            </div>

            {service.documents && service.documents.length > 0 && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-teal-700">
                  Required Documents Checklist
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {service.documents.map((doc, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 mr-2 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.process && service.process.length > 0 && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-teal-700">
                  Step-By-Step Application Steps
                </h4>
                <ol className="space-y-2 text-xs text-slate-700">
                  {service.process.map((step, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-5 h-5 bg-teal-100 text-teal-900 font-bold rounded-full flex items-center justify-center text-[10px] shrink-0 mr-2 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {service.warnings && (
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start text-xs text-amber-900 space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Important Notice:</strong> {service.warnings}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-200 gap-3">
              <a
                href={service.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800 text-white font-extrabold px-6 py-3.5 rounded-xl text-xs transition shadow flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Access Official Portal ({service.officialUrl.replace('https://', '')})</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3.5 rounded-xl text-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {job && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2.5 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-100">
                  {job.type} Government Job
                </span>
                <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">
                  {job.verificationStatus}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">
                {job.title}
              </h2>
              <p className="text-xs text-slate-500 font-bold">{job.organization}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-semibold block mb-0.5">Total Vacancies:</span>
                <strong className="text-slate-900 text-sm font-extrabold">{job.vacancy}</strong>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-semibold block mb-0.5">Qualification:</span>
                <strong className="text-blue-700 text-sm font-bold">{job.qualification}</strong>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 col-span-2 sm:col-span-1">
                <span className="text-slate-500 font-semibold block mb-0.5">Pay Scale:</span>
                <strong className="text-emerald-700 text-xs font-bold">{job.salary}</strong>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-700">
              <div><strong>Age Criteria:</strong> {job.age}</div>
              <div><strong>Key Dates:</strong> {job.dates}</div>
              <div><strong>Application Fees:</strong> {job.fee}</div>
              <div><strong>Selection Process:</strong> {job.selection}</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-teal-700">
                Required Documents Checklist
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {job.documents.map((doc, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mr-2 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-200 gap-3">
              <a
                href={job.appLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800 text-white font-extrabold px-6 py-3.5 rounded-xl text-xs transition shadow flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Apply on Official Portal ({job.notification})</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3.5 rounded-xl text-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
