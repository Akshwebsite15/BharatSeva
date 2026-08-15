import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Trophy,
  Flame,
  Coins,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Share2,
  RotateCw,
  Clock,
  Award,
  ChevronRight,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { dailyQuizQuestions, QuizQuestion } from '../data/dailyQuizData';

interface DailySpeedQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  streakDays: number;
  setStreakDays: React.Dispatch<React.SetStateAction<number>>;
  showToast?: (msg: string) => void;
}

export const DailySpeedQuizModal: React.FC<DailySpeedQuizModalProps> = ({
  isOpen,
  onClose,
  coins,
  setCoins,
  streakDays,
  setStreakDays,
  showToast,
}) => {
  const [lang, setLang] = useState<'hi' | 'en'>('hi');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  const currentQ: QuizQuestion = dailyQuizQuestions[currentIndex] || dailyQuizQuestions[0];

  // Timer effect
  useEffect(() => {
    if (!isOpen || isAnswered || quizFinished) return;

    if (timeLeft <= 0) {
      // Time up: auto submit as wrong
      setIsAnswered(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isAnswered, quizFinished, timeLeft]);

  if (!isOpen) return null;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < dailyQuizQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(30);
    } else {
      // Finish Quiz & Award Rewards
      setQuizFinished(true);
      if (!rewardClaimed) {
        const earnedCoins = 50 + (score === 4 ? 20 : score === 5 ? 50 : 0);
        setCoins((prev) => prev + earnedCoins);
        setStreakDays((prev) => Math.max(prev, prev + 1));
        setRewardClaimed(true);
        if (showToast) {
          showToast(`🎯 Quiz Complete! You earned +${earnedCoins} Coins & boosted your daily streak!`);
        }
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setTimeLeft(30);
  };

  const handleShareWhatsApp = () => {
    const text = `🔥 I just scored ${score}/5 in BharatSeva Daily Sarkari GK Speed Quiz 2026! Can you beat my score? Attempt today's free quiz here: ${window.location.origin}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 relative overflow-hidden flex flex-col max-h-[92vh]">
        {/* Decorative Top Gradient */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-black shadow-sm">
              <Zap className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Daily Sarkari Speed Quiz
                </h3>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <Coins className="w-3 h-3 text-amber-600" /> +50 Coins
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                High-Yield 5 Questions for UPSC, SSC, BPSC & Railway Aspirants
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Bilingual Switch */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-black">
              <button
                onClick={() => setLang('hi')}
                className={`px-2 py-0.5 rounded-lg transition ${
                  lang === 'hi' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded-lg transition ${
                  lang === 'en' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* QUIZ BODY */}
        {!quizFinished ? (
          <div className="py-4 space-y-4 overflow-y-auto">
            {/* Progress & Timer Bar */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <div className="flex items-center space-x-2">
                <span className="bg-indigo-50 text-indigo-900 px-2.5 py-1 rounded-xl border border-indigo-100 font-black">
                  Q {currentIndex + 1} of {dailyQuizQuestions.length}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {currentQ.category}
                </span>
              </div>

              <div
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl font-black transition ${
                  timeLeft <= 10
                    ? 'bg-rose-100 text-rose-700 animate-pulse'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{timeLeft}s</span>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-4 sm:p-5 rounded-2xl shadow-md space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded">
                Target: {currentQ.relevantExams.join(', ')}
              </span>
              <h4 className="text-sm sm:text-base font-bold leading-relaxed">
                {lang === 'hi' ? currentQ.questionHi : currentQ.questionEn}
              </h4>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {(lang === 'hi' ? currentQ.optionsHi : currentQ.optionsEn).map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctAnswer;

                let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300';
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-400';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 font-black ring-2 ring-rose-300';
                  } else {
                    btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3.5 rounded-2xl border text-left font-bold text-xs sm:text-sm flex items-center justify-between transition cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 rounded-lg bg-white/80 border border-slate-200 text-slate-700 flex items-center justify-center text-xs font-black shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bilingual Explanation Box */}
            {isAnswered && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs space-y-1 animate-in fade-in duration-200">
                <div className="flex items-center space-x-1.5 font-black text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{lang === 'hi' ? 'परीक्षा व्याख्या व तथ्य:' : 'Key Exam Fact & Explanation:'}</span>
                </div>
                <p className="text-amber-950 font-medium leading-relaxed">
                  {lang === 'hi' ? currentQ.explanationHi : currentQ.explanationEn}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* SCORE CARD SCREEN */
          <div className="py-6 text-center space-y-5 overflow-y-auto">
            <div className="relative inline-block">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center mx-auto shadow-xl">
                <Trophy className="w-10 h-10" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1 border-2 border-white">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {score >= 4 ? '🎉 Outstanding Performance!' : score >= 3 ? '👏 Good Effort, Aspirant!' : '💪 Keep Practicing Daily!'}
              </h3>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                You solved {score} out of {dailyQuizQuestions.length} questions correctly.
              </p>
            </div>

            {/* Score & Rewards Box */}
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-center">
                <span className="text-[10px] font-black uppercase text-amber-800">COINS EARNED</span>
                <div className="text-xl font-black text-amber-950 flex items-center justify-center gap-1 mt-0.5">
                  <Coins className="w-4 h-4 text-amber-600" />
                  +{50 + (score >= 4 ? 20 : 0)}
                </div>
              </div>

              <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200 text-center">
                <span className="text-[10px] font-black uppercase text-indigo-800">STREAK BOOST</span>
                <div className="text-xl font-black text-indigo-950 flex items-center justify-center gap-1 mt-0.5">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                  {streakDays} Days
                </div>
              </div>
            </div>

            {/* WhatsApp Share Challenge */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                Challenge your friends & study group on WhatsApp:
              </span>
              <button
                onClick={handleShareWhatsApp}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center space-x-2 transition cursor-pointer shadow-sm active:scale-95"
              >
                <Share2 className="w-4 h-4" />
                <span>Share My Score Card on WhatsApp</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          {!quizFinished ? (
            <>
              <div className="text-xs text-slate-500 font-bold">
                Score: <span className="text-indigo-900 font-extrabold">{score}</span> / {currentIndex + 1}
              </div>

              {isAnswered && (
                <button
                  onClick={handleNextQuestion}
                  className="py-2.5 px-5 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white font-extrabold text-xs rounded-xl flex items-center space-x-1.5 transition shadow-sm cursor-pointer active:scale-95"
                >
                  <span>{currentIndex + 1 === dailyQuizQuestions.length ? 'View Result' : 'Next Question'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <div className="flex items-center justify-between w-full gap-3">
              <button
                onClick={handleRestart}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-xl flex items-center space-x-1.5 transition cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>

              <button
                onClick={onClose}
                className="py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
