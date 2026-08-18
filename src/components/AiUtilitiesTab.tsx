import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  Loader2,
  Copy,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  BookOpen,
  Briefcase,
  GraduationCap,
  Landmark,
  Lightbulb,
  FileText,
  Mic,
  Calendar,
} from 'lucide-react';
import { AI_UTILITIES_DATA, AiUtility } from '../data/bharatSevaToolsData';

interface AiUtilitiesTabProps {
  initialUtilityId?: string;
  onOpenDailyRewards?: () => void;
  coins?: number;
}

export const AiUtilitiesTab: React.FC<AiUtilitiesTabProps> = ({
  initialUtilityId = 'ai-career-advisor',
  onOpenDailyRewards,
  coins = 120,
}) => {
  const [activeUtilityId, setActiveUtilityId] = useState<string>(initialUtilityId);
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseMarkdown, setResponseMarkdown] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const activeUtility = AI_UTILITIES_DATA.find((u) => u.id === activeUtilityId) || AI_UTILITIES_DATA[0];

  const handleSelectUtility = (utility: AiUtility) => {
    setActiveUtilityId(utility.id);
    setUserPrompt(utility.samplePrompt);
    setResponseMarkdown(null);
    setErrorMsg(null);
  };

  const handleRunAi = async () => {
    const promptToSend = userPrompt.trim() || activeUtility.samplePrompt;
    if (!promptToSend) return;

    setIsLoading(true);
    setErrorMsg(null);
    setResponseMarkdown(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `${activeUtility.name} Query: ${promptToSend}`,
          conversationHistory: [],
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate AI analysis. Please check your network.');
      }

      const data = await res.json();
      if (data.reply) {
        setResponseMarkdown(data.reply);
      } else {
        setResponseMarkdown('No response received from AI engine.');
      }
    } catch (err: any) {
      console.error('AI Generation Error:', err);
      setErrorMsg(err.message || 'An error occurred while connecting to AI Studio engine.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!responseMarkdown) return;
    navigator.clipboard.writeText(responseMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full text-xs font-bold">
              <Bot className="w-3.5 h-3.5" />
              <span>Powered by Gemini 3.6 Flash • AI Utilities Suite</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              BharatSeva AI Utilities Hub
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Specialized Indian citizen and student AI tools for instant career planning, ATS resume bullets, mock interview rounds, scheme eligibility matching, and study roadmaps.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white/10 rounded-2xl border border-white/20 text-white text-xs font-bold flex items-center gap-2">
              <span>🪙 Balance:</span>
              <span className="text-amber-400 font-extrabold">{coins} Coins</span>
            </div>
            {onOpenDailyRewards && (
              <button
                onClick={onOpenDailyRewards}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold rounded-2xl transition cursor-pointer shadow-sm"
              >
                + Free Rewards
              </button>
            )}
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 8 AI Tool Selectors */}
          <div className="lg:col-span-4 space-y-2 bg-white p-4 rounded-3xl border border-slate-200 shadow-xs">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 px-2 mb-3">
              Select AI Utility Tool
            </h3>
            <div className="space-y-2">
              {AI_UTILITIES_DATA.map((utility) => {
                const isSelected = activeUtilityId === utility.id;
                return (
                  <button
                    key={utility.id}
                    onClick={() => handleSelectUtility(utility)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-900 to-indigo-900 text-white border-blue-900 shadow-md'
                        : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-900'
                      }`}
                    >
                      {utility.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`font-bold text-xs sm:text-sm truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {utility.name}
                        </span>
                        {utility.badge && (
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold shrink-0 ${
                              isSelected ? 'bg-amber-400 text-slate-950' : 'bg-teal-100 text-teal-900'
                            }`}
                          >
                            {utility.badge}
                          </span>
                        )}
                      </div>
                      <p className={`text-[11px] line-clamp-2 mt-0.5 ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                        {utility.shortDescription}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: AI Interactive Prompt & Generator Workspace */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            {/* Active Tool Header */}
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-900 text-white flex items-center justify-center text-2xl shadow-sm">
                    {activeUtility.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">{activeUtility.name}</h2>
                    <p className="text-xs text-slate-500">{activeUtility.fullDescription}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prompt Input Box */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  Your Query / Candidate Profile Input
                </label>
                <button
                  onClick={() => setUserPrompt(activeUtility.samplePrompt)}
                  className="text-xs text-indigo-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Insert Sample Prompt</span>
                </button>
              </div>

              <textarea
                rows={4}
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder={activeUtility.samplePrompt}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 focus:border-indigo-900 leading-relaxed"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400">
                  ⚡ Powered by server-side Gemini 3.6 Flash
                </span>
                <button
                  onClick={handleRunAi}
                  disabled={isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-900 to-indigo-950 hover:from-blue-950 hover:to-slate-950 text-white font-extrabold rounded-2xl shadow-md flex items-center gap-2 text-xs sm:text-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating Analysis...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Generate AI Response</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Generated AI Results Box */}
            {responseMarkdown && (
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-indigo-950">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>AI Generated Solution</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="text-xs text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl cursor-pointer shadow-2xs"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans space-y-2">
                  {responseMarkdown}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
