import React from 'react';
import {
  X,
  Building2,
  MapPin,
  Award,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Users,
  Calendar,
  Globe,
  Bell,
  ShieldCheck,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { University } from '../types';

interface UniversityDetailPageProps {
  university: University;
  onClose: () => void;
}

export const UniversityDetailPage: React.FC<UniversityDetailPageProps> = ({
  university,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 text-slate-100 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 p-5 sm:p-6 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-white rounded-2xl p-2 border border-slate-700 shadow-md shrink-0 flex items-center justify-center overflow-hidden">
                <Building2 className="w-10 h-10 text-indigo-600" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {university.type} University
                  </span>
                  {university.ugcRecognized && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      UGC Approved
                    </span>
                  )}
                  {university.nirfRank && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      NIRF Rank #{university.nirfRank}
                    </span>
                  )}
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {university.name} ({university.shortName})
                </h1>

                <p className="text-xs sm:text-sm text-slate-400 mt-1 flex items-center gap-2 flex-wrap">
                  <span className="flex items-center text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400 mr-1" />
                    {university.location}
                  </span>
                  <span>•</span>
                  <span>Estd. {university.establishedYear}</span>
                  {university.campusSizeAcres && (
                    <>
                      <span>•</span>
                      <span className="text-indigo-300">{university.campusSizeAcres} Acres Campus</span>
                    </>
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 rounded-xl transition cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Overview Section */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-black text-indigo-400 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-400" />
              About University
            </h3>
            <p className="text-slate-300 leading-relaxed font-medium">
              {university.overview}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Leadership</span>
                <span className="text-xs font-bold text-white truncate block">{university.chancellorOrVc}</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Affiliated Colleges</span>
                <span className="text-sm font-black text-indigo-400">{university.affiliatedCollegesCount}+ Colleges</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">NAAC Grade</span>
                <span className="text-sm font-black text-emerald-400">{university.naacGrade || 'Accredited'}</span>
              </div>
            </div>
          </div>

          {/* Key Faculties & Schools */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-black text-indigo-400 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              Key Faculties & Schools
            </h3>
            <div className="flex flex-wrap gap-2">
              {university.keyFaculties.map((fac, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  {fac}
                </span>
              ))}
            </div>
          </div>

          {/* Popular Courses & Entrance Exams */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-2">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider text-slate-300">Popular Degree Programs</h4>
              <div className="flex flex-wrap gap-1.5">
                {university.popularCourses.map((c, i) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-900 text-amber-300 font-bold text-xs rounded-lg border border-slate-800">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-2">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider text-slate-300">Accepted Entrance Examinations</h4>
              <div className="flex flex-wrap gap-1.5">
                {university.entranceExams.map((ex, i) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-900 text-indigo-300 font-bold text-xs rounded-lg border border-slate-800">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Latest Admission Notice */}
          <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-5 space-y-2">
            <h3 className="text-sm font-black text-indigo-300 flex items-center gap-2">
              <Bell className="w-4 h-4 text-indigo-400" />
              Latest Admission Notice 2026
            </h3>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {university.admissionNotice}
            </p>
          </div>

          {/* Source Verification Badge */}
          <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950/40 p-3 rounded-xl border border-slate-800">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified Source: <strong className="text-slate-200">{university.verifiedSource}</strong>
            </span>
            <span>Verified: {university.lastVerifiedDate}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-900 border-t border-slate-800 p-4 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
          >
            Close
          </button>
          <a
            href={university.officialWebsiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center gap-1.5"
          >
            <span>Visit Official University Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
