import React from 'react';
import {
  Zap,
  Calculator,
  Scissors,
  Clock,
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
  return (
    <section className="space-y-6 sm:space-y-8 my-6 sm:my-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-2">
          <div className="flex items-center space-x-2.5">
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-xs">
              <Zap className="w-3.5 h-3.5 fill-white" /> Daily Student & Aspirant Tools
            </span>
            <span className="text-xs text-slate-500 font-bold hidden sm:inline">
              Used by 15,000+ aspirants daily
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Student Power Tools & Daily Challenges
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Interactive utility calculators, quick GK quizzes, image resizers, and focus study planners.
          </p>
        </div>

        {/* Live Coins & Streak Header Pill */}
        <div className="flex items-center space-x-3 shrink-0 self-start sm:self-auto">
          <div className="bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-xl flex items-center space-x-2 text-xs font-black text-amber-900 shadow-2xs">
            <Coins className="w-4 h-4 text-amber-600" />
            <span>{coins} Coins</span>
          </div>
          <div className="bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-xl flex items-center space-x-2 text-xs font-black text-orange-900 shadow-2xs">
            <Flame className="w-4 h-4 text-orange-600 fill-orange-600" />
            <span>{streakDays} Day Streak</span>
          </div>
        </div>
      </div>

      {/* Main 4 Hero Action Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {/* CARD 1: Daily Speed GK Quiz */}
        <div
          onClick={onOpenSpeedQuiz}
          className="group relative bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 text-white p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden min-h-[220px]"
        >
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xs pointer-events-none group-hover:scale-125 transition"></div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black shadow-inner">
                <Trophy className="w-6 h-6 text-amber-200" />
              </div>
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-amber-100 border border-white/20">
                +50 COINS
              </span>
            </div>

            <div>
              <h3 className="text-lg font-black leading-tight text-white group-hover:text-amber-100 transition">
                Daily Sarkari Speed GK Quiz
              </h3>
              <p className="text-xs text-amber-100/90 leading-relaxed mt-2 font-medium">
                5 high-yield questions for UPSC, SSC, BPSC & Railway with 30s timer & bilingual facts.
              </p>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-white/20 flex items-center justify-between text-xs font-black relative z-10">
            <span className="text-amber-200 group-hover:underline">Play Daily Quiz Now</span>
            <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center group-hover:translate-x-1 transition shadow-xs">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* CARD 2: Age & Eligibility Calculator */}
        <div
          onClick={onOpenAgeCalculator}
          className="group relative bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden min-h-[220px]"
        >
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-xs pointer-events-none group-hover:scale-125 transition"></div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-indigo-800/60 backdrop-blur-md flex items-center justify-center font-black border border-indigo-700 shadow-inner">
                <Calculator className="w-6 h-6 text-blue-300" />
              </div>
              <span className="bg-indigo-500/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-blue-200 border border-indigo-400/30">
                35+ EXAMS
              </span>
            </div>

            <div>
              <h3 className="text-lg font-black leading-tight text-white group-hover:text-blue-200 transition">
                Age & Eligibility Calculator
              </h3>
              <p className="text-xs text-indigo-200/80 leading-relaxed mt-2 font-medium">
                Exact age on cutoff date with OBC, SC/ST, PwD & Bihar Female relaxations matrix.
              </p>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-indigo-800 flex items-center justify-between text-xs font-black relative z-10">
            <span className="text-blue-300 group-hover:underline">Check Your Eligibility</span>
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center group-hover:translate-x-1 transition shadow-xs">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* CARD 3: Photo & Signature Resizer */}
        <div
          onClick={onOpenPhotoTool}
          className="group relative bg-white border border-slate-200 p-6 rounded-3xl shadow-2xs hover:shadow-xl hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden min-h-[220px]"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-black">
                <Scissors className="w-6 h-6" />
              </div>
              <span className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                100% PRIVATE
              </span>
            </div>

            <div>
              <h3 className="text-lg font-black leading-tight text-slate-900 group-hover:text-indigo-900 transition">
                Photo & Sign Resizer / Compressor
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-2 font-medium">
                Crop & compress photos to exact 20-50 KB limits for SSC, UPSC, BPSC & NTA portals.
              </p>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-indigo-900">
            <span className="group-hover:underline">Resize & Compress Free</span>
            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-900 flex items-center justify-center group-hover:bg-indigo-900 group-hover:text-white transition shadow-xs">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* CARD 4: Study Target & Pomodoro Timer */}
        <div
          onClick={onOpenStudyPlanner}
          className="group relative bg-white border border-slate-200 p-6 rounded-3xl shadow-2xs hover:shadow-xl hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden min-h-[220px]"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-black">
                <Clock className="w-6 h-6" />
              </div>
              <span className="bg-purple-50 text-purple-800 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-purple-200">
                POMODORO
              </span>
            </div>

            <div>
              <h3 className="text-lg font-black leading-tight text-slate-900 group-hover:text-purple-900 transition">
                Daily Study Planner & Focus Timer
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-2 font-medium">
                Track daily GS, Reasoning & Math targets with 25-minute Pomodoro focus sprints.
              </p>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-purple-900">
            <span className="group-hover:underline">Open Study Dashboard</span>
            <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-900 flex items-center justify-center group-hover:bg-purple-900 group-hover:text-white transition shadow-xs">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
