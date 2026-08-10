import React, { useState, useEffect } from 'react';
import {
  Gift,
  X,
  Sparkles,
  Flame,
  CheckCircle2,
  Coins,
  Bot,
  Award,
  HelpCircle,
  Share2,
  Check,
  Zap,
  Lock,
  Unlock,
  RotateCw,
  Trophy,
  ArrowRight,
} from 'lucide-react';

interface DailyRewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  aiCredits: number;
  setAiCredits: React.Dispatch<React.SetStateAction<number>>;
  streakDays: number;
  setStreakDays: React.Dispatch<React.SetStateAction<number>>;
  hasClaimedToday: boolean;
  setHasClaimedToday: React.Dispatch<React.SetStateAction<boolean>>;
  unlimitedPassUntil: number | null;
  setUnlimitedPassUntil: React.Dispatch<React.SetStateAction<number | null>>;
  onOpenAiModal?: () => void;
  showToast?: (msg: string) => void;
}

export const DailyRewardsModal: React.FC<DailyRewardsModalProps> = ({
  isOpen,
  onClose,
  coins,
  setCoins,
  aiCredits,
  setAiCredits,
  streakDays,
  setStreakDays,
  hasClaimedToday,
  setHasClaimedToday,
  unlimitedPassUntil,
  setUnlimitedPassUntil,
  onOpenAiModal,
  showToast,
}) => {
  // Quiz mini-task state
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Spin wheel state
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<number | null>(null);

  // Completed tasks state
  const [completedTasks, setCompletedTasks] = useState<{ [key: string]: boolean }>({});

  if (!isOpen) return null;

  const daysList = [
    { day: 1, coins: 20, credits: 2, label: 'Day 1' },
    { day: 2, coins: 30, credits: 3, label: 'Day 2' },
    { day: 3, coins: 50, credits: 5, label: 'Day 3' },
    { day: 4, coins: 70, credits: 5, label: 'Day 4' },
    { day: 5, coins: 100, credits: 10, label: 'Day 5' },
    { day: 6, coins: 150, credits: 10, label: 'Day 6' },
    { day: 7, coins: 300, credits: 25, label: 'Day 7 Super Pass' },
  ];

  const currentStreakDay = ((streakDays - 1) % 7) + 1;

  const handleClaimDailyCheckIn = () => {
    if (hasClaimedToday) return;

    const reward = daysList.find((d) => d.day === currentStreakDay) || daysList[0];

    setCoins((prev) => prev + reward.coins);
    setAiCredits((prev) => prev + reward.credits);
    setHasClaimedToday(true);

    if (reward.day === 7) {
      // 24 Hour Unlimited Pass
      const passEndTime = Date.now() + 24 * 60 * 60 * 1000;
      setUnlimitedPassUntil(passEndTime);
      if (showToast) {
        showToast(
          `🎉 Day 7 Super Reward claimed! +300 Coins & 24-HOUR UNLIMITED AI ASSISTANT PASS unlocked!`
        );
      }
    } else {
      if (showToast) {
        showToast(
          `🎁 Daily Check-in Claimed! Received +${reward.coins} BharatCoins & +${reward.credits} AI Assistant Credits!`
        );
      }
    }
  };

  const handleBuyUnlimitedPass = () => {
    if (coins < 100) {
      if (showToast) showToast('⚠️ You need at least 100 BharatCoins to unlock 24h Unlimited AI Pass.');
      return;
    }

    setCoins((prev) => prev - 100);
    const passEndTime = Date.now() + 24 * 60 * 60 * 1000;
    setUnlimitedPassUntil(passEndTime);
    if (showToast) {
      showToast('🏆 24-Hour Unlimited AI Assistant Pass Unlocked successfully using 100 Coins!');
    }
  };

  const handleBuyAiCredits = (cost: number, creditsToAdd: number) => {
    if (coins < cost) {
      if (showToast) showToast(`⚠️ You need ${cost} BharatCoins for this credit pack.`);
      return;
    }

    setCoins((prev) => prev - cost);
    setAiCredits((prev) => prev + creditsToAdd);
    if (showToast) {
      showToast(`⚡ Added +${creditsToAdd} AI Assistant Credits to your balance!`);
    }
  };

  // Daily Quiz Handler
  const handleQuizSubmit = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setQuizAnswered(true);

    if (optionIndex === 1) {
      // Correct answer: Patna
      setQuizCompleted(true);
      setCoins((prev) => prev + 25);
      setAiCredits((prev) => prev + 2);
      setCompletedTasks((prev) => ({ ...prev, quiz: true }));
      if (showToast) {
        showToast('🎯 Correct Answer! Earned +25 BharatCoins & +2 AI Assistant Credits!');
      }
    } else {
      if (showToast) {
        showToast('❌ Incorrect answer! Try again or review Today\'s Current Affairs.');
      }
    }
  };

  // Spin Wheel Handler
  const handleSpinWheel = () => {
    if (isSpinning || completedTasks.spin) return;
    setIsSpinning(true);

    setTimeout(() => {
      const rewards = [20, 30, 50, 75, 100, 150];
      const win = rewards[Math.floor(Math.random() * rewards.length)];
      setSpinResult(win);
      setCoins((prev) => prev + win);
      setAiCredits((prev) => prev + 3);
      setIsSpinning(false);
      setCompletedTasks((prev) => ({ ...prev, spin: true }));
      if (showToast) {
        showToast(`🎰 Lucky Wheel Win! You won +${win} BharatCoins and +3 AI Credits!`);
      }
    }, 2000);
  };

  const handleSharePortal = () => {
    if (completedTasks.share) return;
    setCoins((prev) => prev + 30);
    setCompletedTasks((prev) => ({ ...prev, share: true }));
    if (showToast) {
      showToast('📲 Thanks for sharing! Received +30 BharatCoins.');
    }
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(
        'Check out BharatSeva Govt Job & Scheme Portal for latest BPSC, Police, SSC vacancies & instant AI Assistant guides: https://ai.studio'
      )}`,
      '_blank'
    );
  };

  const isUnlimitedActive = unlimitedPassUntil && unlimitedPassUntil > Date.now();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Gift className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-950 text-[10px] font-black rounded-full uppercase tracking-wider flex items-center space-x-1">
                  <Flame className="w-3 h-3 text-amber-600 fill-amber-500" />
                  <span>{streakDays} DAY STREAK</span>
                </span>
                <span className="text-[10px] text-slate-400 font-bold">100% Free Daily Rewards</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Daily Rewards & AI Feature Unlocks
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto py-4 space-y-6 pr-1">
          {/* User Balance Overview Banner */}
          <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 rounded-2xl p-4 shadow-md flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-xs flex items-center space-x-2">
                <Coins className="w-6 h-6 text-amber-100" />
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-amber-950 block">
                    BharatCoins Balance
                  </span>
                  <strong className="text-xl font-black">{coins} Coins</strong>
                </div>
              </div>

              <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-xs flex items-center space-x-2">
                <Zap className="w-6 h-6 text-amber-200 fill-amber-200" />
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-amber-950 block">
                    AI Assistant Credits
                  </span>
                  <strong className="text-xl font-black">
                    {isUnlimitedActive ? '∞ Unlimited' : `${aiCredits} Credits`}
                  </strong>
                </div>
              </div>
            </div>

            {onOpenAiModal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenAiModal();
                }}
                className="bg-slate-950 hover:bg-slate-900 text-white px-4 py-2.5 rounded-xl font-black text-xs transition cursor-pointer flex items-center space-x-2 shadow-xs"
              >
                <Bot className="w-4 h-4 text-amber-400" />
                <span>Launch AI Assistant</span>
              </button>
            )}
          </div>

          {/* Section 1: 7-Day Streak Check-In Calendar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center space-x-1.5">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>1. Daily Login Streak Rewards (7 Days)</span>
              </h3>
              <span className="text-[11px] font-extrabold text-amber-800">
                {hasClaimedToday ? '✅ Today\'s Reward Claimed' : '🎁 Claim Today\'s Reward Below'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {daysList.map((item) => {
                const isPast = item.day < currentStreakDay || (item.day === currentStreakDay && hasClaimedToday);
                const isCurrent = item.day === currentStreakDay && !hasClaimedToday;

                return (
                  <div
                    key={item.day}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col justify-between space-y-2 ${
                      isPast
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : isCurrent
                        ? 'bg-amber-50 border-amber-400 text-amber-950 ring-2 ring-amber-400 shadow-md animate-pulse'
                        : 'bg-slate-50 border-slate-200 text-slate-500 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-black uppercase">
                      <span>Day {item.day}</span>
                      {isPast ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Coins className="w-3.5 h-3.5 text-amber-500" />
                      )}
                    </div>

                    <div className="py-1">
                      <div className="text-sm font-black">+{item.coins} Coins</div>
                      <div className="text-[10px] font-bold text-slate-600">
                        +{item.credits} AI Credits
                      </div>
                    </div>

                    {isCurrent ? (
                      <button
                        onClick={handleClaimDailyCheckIn}
                        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-1.5 px-1 rounded-xl text-[10px] transition cursor-pointer shadow-2xs"
                      >
                        Claim Now!
                      </button>
                    ) : isPast ? (
                      <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 py-0.5 rounded-lg">
                        Claimed
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold text-slate-400 bg-slate-100 py-0.5 rounded-lg">
                        Locked
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Use Coins to Unlock AI Assistant & Premium Features */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-xs font-black uppercase text-teal-900 tracking-wider flex items-center space-x-1.5">
              <Bot className="w-4 h-4 text-teal-600" />
              <span>2. Unlock AI Assistant & Feature Passes</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* 24h Unlimited AI Pass */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-900 flex items-center space-x-1">
                      <Trophy className="w-3.5 h-3.5 text-amber-500" />
                      <span>24-Hour Unlimited AI Pass</span>
                    </span>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-black text-[10px] rounded-full">
                      100 Coins
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Ask unlimited queries to AI Assistant for exam strategies, BPSC syllabi, and application guides for 24 hours.
                  </p>
                </div>

                <button
                  onClick={handleBuyUnlimitedPass}
                  disabled={isUnlimitedActive}
                  className={`w-full py-2 px-3 rounded-xl font-extrabold text-xs transition cursor-pointer flex items-center justify-center space-x-1.5 ${
                    isUnlimitedActive
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-teal-700 hover:bg-teal-800 text-white shadow-2xs'
                  }`}
                >
                  {isUnlimitedActive ? (
                    <>
                      <Unlock className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Unlimited Pass Active</span>
                    </>
                  ) : (
                    <>
                      <Coins className="w-3.5 h-3.5 text-amber-300" />
                      <span>Unlock Pass (100 Coins)</span>
                    </>
                  )}
                </button>
              </div>

              {/* 10 AI Assistant Queries Pack */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-900 flex items-center space-x-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>10 AI Credits Boost</span>
                    </span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-800 font-black text-[10px] rounded-full">
                      40 Coins
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Instantly add 10 AI Assistant query credits to your balance for quick eligibility checks.
                  </p>
                </div>

                <button
                  onClick={() => handleBuyAiCredits(40, 10)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-2 px-3 rounded-xl text-xs transition cursor-pointer flex items-center justify-center space-x-1.5 shadow-2xs"
                >
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  <span>Get 10 Credits (40 Coins)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: Earn Extra Coins (Quests, Daily Quiz, Spin Wheel) */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase text-purple-900 tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>3. Earn Extra Free Coins & AI Credits Today</span>
            </h3>

            <div className="space-y-2.5">
              {/* Daily Quiz Quest */}
              <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="w-4 h-4 text-purple-700" />
                    <span className="font-extrabold text-xs text-purple-950">
                      Daily Current Affairs & GK Quiz
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black rounded-full">
                    +25 Coins & +2 AI Credits
                  </span>
                </div>

                <p className="text-xs font-extrabold text-slate-800">
                  Q: What is the capital of Bihar and home town of BPSC Headquarters?
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Gaya', 'Patna', 'Muzaffarpur', 'Bhagalpur'].map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleQuizSubmit(idx)}
                        disabled={quizCompleted}
                        className={`p-2.5 rounded-xl border text-left font-bold transition cursor-pointer ${
                          isSelected && idx === 1
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                            : isSelected && idx !== 1
                            ? 'bg-rose-100 border-rose-300 text-rose-950'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizCompleted && (
                  <div className="flex items-center space-x-1.5 text-xs text-emerald-800 font-extrabold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Reward claimed for today's GK Quiz!</span>
                  </div>
                )}
              </div>

              {/* Spin Wheel Quest */}
              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <RotateCw className="w-4 h-4 text-amber-700" />
                    <span className="font-extrabold text-xs text-amber-950">
                      Daily Lucky Spinner Wheel
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Spin once every 24 hours to win up to 150 BharatCoins + 3 AI Credits!
                  </p>
                </div>

                <button
                  onClick={handleSpinWheel}
                  disabled={isSpinning || completedTasks.spin}
                  className={`px-4 py-2.5 rounded-xl font-black text-xs transition cursor-pointer flex items-center space-x-2 shrink-0 ${
                    completedTasks.spin
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
                  }`}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
                  <span>
                    {completedTasks.spin
                      ? `Won +${spinResult} Coins!`
                      : isSpinning
                      ? 'Spinning...'
                      : 'Spin Free Wheel'}
                  </span>
                </button>
              </div>

              {/* WhatsApp Share Quest */}
              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <Share2 className="w-4 h-4 text-emerald-700" />
                    <span className="font-extrabold text-xs text-emerald-950">
                      Share Portal with Friends on WhatsApp
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Help fellow aspirants discover official job alerts & earn +30 Coins instantly.
                  </p>
                </div>

                <button
                  onClick={handleSharePortal}
                  disabled={completedTasks.share}
                  className={`px-4 py-2.5 rounded-xl font-black text-xs transition cursor-pointer flex items-center space-x-2 shrink-0 ${
                    completedTasks.share
                      ? 'bg-slate-200 text-slate-600'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md'
                  }`}
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>{completedTasks.share ? 'Completed (+30 Coins)' : 'Share (+30 Coins)'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
