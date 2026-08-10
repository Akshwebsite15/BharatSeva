import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, Loader2, Zap, Gift } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  aiCredits?: number;
  setAiCredits?: React.Dispatch<React.SetStateAction<number>>;
  unlimitedPassUntil?: number | null;
  onOpenDailyRewards?: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  aiCredits = 5,
  setAiCredits,
  unlimitedPassUntil,
  onOpenDailyRewards,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'assistant',
      text: 'Namaste! 🙏 I am your BharatSeva Government AI Assistant. Ask me about BPSC exams, Bihar Police recruitment, RTPS caste/income certificates, scholarships, or welfare schemes in English, Hindi, or Hinglish.',
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const isUnlimitedActive = unlimitedPassUntil && unlimitedPassUntil > Date.now();

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const sendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    if (!isUnlimitedActive && aiCredits <= 0) {
      const lockMsg: ChatMessage = {
        id: `lock-${Date.now()}`,
        sender: 'assistant',
        text: `🔒 You have 0 AI Assistant credits remaining for today.\n\nClaim your free Daily Check-in Reward or solve today's GK Quiz to get instant AI credits!`,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, lockMsg]);
      return;
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    if (!isUnlimitedActive && setAiCredits) {
      setAiCredits((prev) => Math.max(0, prev - 1));
    }

    try {
      const conversationHistory = messages.map((m) => ({
        role: m.sender,
        content: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory,
        }),
      });

      const data = await res.json();
      const assistantReply =
        data.reply ||
        'I am currently experiencing a temporary connection issue. Please check the portal directory for verified guidelines.';

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: assistantReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error querying AI Assistant:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'Sorry, I encountered an issue connecting to the BharatSeva server. You can also refer to the verified portal tabs directly for step-by-step guides.',
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'BPSC 71st eligibility criteria',
    'Bihar Police Constable vacancy details',
    'Caste certificate online steps',
    'Post Matric scholarship criteria',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full h-[85vh] sm:h-[80vh] flex flex-col shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-teal-900 text-white p-4 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center text-teal-300 text-xl border border-white/10">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg flex items-center space-x-2">
                <span>BharatSeva AI Government Assistant</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </h3>
              <p className="text-[11px] sm:text-xs text-teal-200 font-medium">
                Powered by Gemini 3.6 Flash • Answers in English, Hindi & Hinglish
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {onOpenDailyRewards && (
              <button
                onClick={() => {
                  onClose();
                  onOpenDailyRewards();
                }}
                className="px-2.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition cursor-pointer flex items-center space-x-1 shadow-xs"
                title="Claim Free Daily Rewards"
              >
                <Gift className="w-3.5 h-3.5 text-slate-950" />
                <span className="hidden sm:inline">Daily Rewards</span>
              </button>
            )}

            <button
              onClick={onClose}
              aria-label="Close AI Assistant"
              className="text-white hover:text-teal-200 p-2 rounded-xl hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* AI Credit Balance Sub-Header */}
        <div className="bg-teal-950 text-teal-100 px-4 py-2 text-xs flex items-center justify-between border-b border-teal-800 shrink-0">
          <div className="flex items-center space-x-1.5 font-bold">
            <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>
              {isUnlimitedActive
                ? '🏆 24-Hour Unlimited AI Pass Unlocked'
                : `⚡ Balance: ${aiCredits} AI Query Credits Remaining`}
            </span>
          </div>

          {!isUnlimitedActive && onOpenDailyRewards && (
            <button
              onClick={() => {
                onClose();
                onOpenDailyRewards();
              }}
              className="text-amber-300 hover:underline font-black text-[11px] cursor-pointer"
            >
              Get Free Credits →
            </button>
          )}
        </div>

        {/* Messages Body */}
        <div className="flex-grow p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center font-extrabold text-xs shrink-0 shadow-xs mt-1">
                  AI
                </div>
              )}

              <div
                className={`p-4 rounded-2xl shadow-2xs text-xs sm:text-sm max-w-[85%] sm:max-w-[80%] leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-900 text-white font-medium rounded-br-xs'
                    : msg.text.startsWith('🔒')
                    ? 'bg-amber-50 border-2 border-amber-300 text-amber-950 rounded-bl-xs space-y-2'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {msg.text.startsWith('🔒') && onOpenDailyRewards && (
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenDailyRewards();
                      }}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-2 px-3 rounded-xl text-xs transition cursor-pointer flex items-center justify-center space-x-1.5 shadow-xs"
                    >
                      <Gift className="w-4 h-4 text-slate-950" />
                      <span>Claim Free Daily Rewards Now</span>
                    </button>
                  </div>
                )}
                <div
                  className={`text-[9px] mt-1.5 font-sans ${
                    msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                AI
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs text-slate-500 flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                <span>Searching official government guidelines...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Quick Prompts Chips */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-100/80 border-t border-slate-200 flex items-center space-x-2 overflow-x-auto scrollbar-none shrink-0">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
            Suggested:
          </span>
          {quickPrompts.map((p) => (
            <button
              key={p}
              onClick={() => sendMessage(p)}
              disabled={isLoading}
              className="text-xs bg-white hover:bg-slate-200 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg whitespace-nowrap shadow-2xs transition cursor-pointer disabled:opacity-50"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center space-x-2 shrink-0">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
            placeholder="Type your query (e.g. How to apply for BPSC 71st?)..."
            className="flex-grow px-4 py-3 bg-slate-100 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
          />
          <button
            onClick={() => sendMessage()}
            disabled={isLoading || !inputValue.trim()}
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-xl font-bold text-sm shadow transition shrink-0 cursor-pointer disabled:opacity-50 flex items-center space-x-1"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
