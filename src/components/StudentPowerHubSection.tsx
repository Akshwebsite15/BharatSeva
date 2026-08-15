import React, { useState } from 'react';
import {
  Zap,
  Calculator,
  Scissors,
  Clock,
  Send,
  MessageCircle,
  Sparkles,
  Trophy,
  Flame,
  Coins,
  ArrowRight,
  CheckCircle2,
  Share2,
  FileText,
  Download,
  BookOpen,
} from 'lucide-react';

interface StudentPowerHubSectionProps {
  onOpenSpeedQuiz: () => void;
  onOpenAgeCalculator: () => void;
  onOpenPhotoTool: () => void;
  onOpenStudyPlanner: () => void;
  coins?: number;
  streakDays?: number;
}

export const StudentPowerHubSection: React.FC<StudentPowerHubSectionProps> = ({
  onOpenSpeedQuiz,
  onOpenAgeCalculator,
  onOpenPhotoTool,
  onOpenStudyPlanner,
  coins = 100,
  streakDays = 3,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareWhatsAppCommunity = () => {
    const text = `🔥 Join BharatSeva Official Sarkari Jobs, Admit Card & Daily GK Alerts WhatsApp Group free: https://bharatseva.in`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleJoinTelegram = () => {
    window.open('https://t.me/bharatsevaportal', '_blank');
  };

  return (
    <section className="space-y-4 my-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
              <Zap className="w-3 h-3 fill-white" /> Daily Student & Aspirant Tools
            </span>
            <span className="text-xs text-slate-500 font-bold hidden sm:inline">
              Used by 15,000+ aspirants daily
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Student Power Tools & Daily Challenges
          </h2>
        </div>

        {/* Live Coins & Streak Header Pill */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl flex items-center space-x-1.5 text-xs font-black text-amber-900 shadow-2xs">
            <Coins className="w-3.5 h-3.5 text-amber-600" />
            <span>{coins} Coins</span>
          </div>
          <div className="bg-orange-50 border border-orange-200 px-3 py-1 rounded-xl flex items-center space-x-1.5 text-xs font-black text-orange-900 shadow-2xs">
            <Flame className="w-3.5 h-3.5 text-orange-600 fill-orange-600" />
            <span>{streakDays} Day Streak</span>
          </div>
        </div>
      </div>

      {/* Main 4 Hero Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: Daily Speed GK Quiz */}
        <div
          onClick={onOpenSpeedQuiz}
          className="group relative bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 text-white p-5 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden"
        >
          {/* Background Decorative Rings */}
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xs pointer-events-none group-hover:scale-125 transition"></div>

          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black shadow-inner">
                <Trophy className="w-6 h-6 text-amber-200" />
              </div>
              <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-amber-100 border border-white/20">
                +50 COINS
              </span>
            </div>

            <div>
              <h3 className="text-lg font-black leading-tight text-white group-hover:text-amber-100 transition">
                Daily Sarkari Speed GK Quiz
              </h3>
              <p className="text-xs text-amber-100/90 leading-relaxed mt-1 font-medium">
                5 high-yield questions for UPSC, SSC, BPSC & Railway with 30s timer & bilingual facts.
              </p>
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-white/20 flex items-center justify-between text-xs font-black relative z-10">
            <span className="text-amber-200 group-hover:underline">Play Daily Quiz Now</span>
            <div className="w-7 h-7 rounded-full bg-white text-slate-900 flex items-center justify-center group-hover:translate-x-1 transition">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* CARD 2: Age & Eligibility Calculator */}
        <div
          onClick={onOpenAgeCalculator}
          className="group relative bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white p-5 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-indigo-500/10 rounded-full blur-xs pointer-events-none group-hover:scale-125 transition"></div>

          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-indigo-800/60 backdrop-blur-md flex items-center justify-center font-black border border-indigo-700">
                <Calculator className="w-6 h-6 text-blue-300" />
              </div>
              <span className="bg-indigo-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-blue-200 border border-indigo-400/30">
                35+ EXAMS
              </span>
            </div>

            <div>
              <h3 className="text-lg font-black leading-tight text-white group-hover:text-blue-200 transition">
                Age & Eligibility Calculator
              </h3>
              <p className="text-xs text-indigo-200/80 leading-relaxed mt-1 font-medium">
                Exact age on cutoff date with OBC, SC/ST, PwD & Bihar Female relaxations matrix.
              </p>
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-indigo-800 flex items-center justify-between text-xs font-black relative z-10">
            <span className="text-blue-300 group-hover:underline">Check Your Eligibility</span>
            <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center group-hover:translate-x-1 transition">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* CARD 3: Photo & Signature Resizer */}
        <div
          onClick={onOpenPhotoTool}
          className="group relative bg-white border border-slate-200 p-5 rounded-3xl shadow-2xs hover:shadow-xl hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-black">
                <Scissors className="w-6 h-6" />
              </div>
              <span className="bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                100% PRIVATE
              </span>
            </div>

            <div>
              <h3 className="text-lg font-black leading-tight text-slate-900 group-hover:text-indigo-900 transition">
                Photo & Sign Resizer / Compressor
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1 font-medium">
                Crop & compress photos to exact 20-50 KB limits for SSC, UPSC, BPSC & NTA portals.
              </p>
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-indigo-900">
            <span className="group-hover:underline">Resize & Compress Free</span>
            <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-900 flex items-center justify-center group-hover:bg-indigo-900 group-hover:text-white transition">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* CARD 4: Study Target & Pomodoro Timer */}
        <div
          onClick={onOpenStudyPlanner}
          className="group relative bg-white border border-slate-200 p-5 rounded-3xl shadow-2xs hover:shadow-xl hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-black">
                <Clock className="w-6 h-6" />
              </div>
              <span className="bg-purple-50 text-purple-800 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-purple-200">
                POMODORO
              </span>
            </div>

            <div>
              <h3 className="text-lg font-black leading-tight text-slate-900 group-hover:text-purple-900 transition">
                Daily Study Planner & Focus Timer
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1 font-medium">
                Track daily GS, Reasoning & Math targets with 25-minute Pomodoro focus sprints.
              </p>
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-purple-900">
            <span className="group-hover:underline">Open Study Dashboard</span>
            <div className="w-7 h-7 rounded-full bg-purple-50 text-purple-900 flex items-center justify-center group-hover:bg-purple-900 group-hover:text-white transition">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Community Alert & Broadcast Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {/* WhatsApp Channel */}
        <div
          onClick={handleShareWhatsAppCommunity}
          className="bg-emerald-950 text-white p-4 rounded-2xl border border-emerald-800 flex items-center justify-between cursor-pointer hover:bg-emerald-900 transition shadow-2xs group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-emerald-300 transition">
                Join Official WhatsApp Alert Channel
              </h4>
              <p className="text-[11px] text-emerald-300 font-medium">
                Instant flash updates on admit cards, answer keys & result declarations.
              </p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shrink-0 group-hover:scale-105 transition">
            Join Group
          </span>
        </div>

        {/* Telegram Channel */}
        <div
          onClick={handleJoinTelegram}
          className="bg-blue-950 text-white p-4 rounded-2xl border border-blue-800 flex items-center justify-between cursor-pointer hover:bg-blue-900 transition shadow-2xs group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Send className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-blue-300 transition">
                Join Telegram Sarkari PDF Channel
              </h4>
              <p className="text-[11px] text-blue-300 font-medium">
                Free daily Current Affairs PDFs, PYQ Question Papers & syllabi.
              </p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-extrabold text-xs shrink-0 group-hover:scale-105 transition">
            Join Telegram
          </span>
        </div>
      </div>
    </section>
  );
};
