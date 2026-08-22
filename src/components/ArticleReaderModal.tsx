import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  Calendar,
  User,
  Share2,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Calculator,
  HelpCircle,
  ListChecks,
  ExternalLink,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { FeaturedArticle } from '../data/bharatSevaToolsData';

interface ArticleReaderModalProps {
  article: FeaturedArticle | null;
  allArticles: FeaturedArticle[];
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: FeaturedArticle) => void;
  onOpenTool?: (toolId: string) => void;
  onSaveArticle?: (title: string) => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  allArticles,
  isOpen,
  onClose,
  onSelectArticle,
  onOpenTool,
  onSaveArticle,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<{ [key: number]: boolean }>({});

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        stopSpeech();
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Stop speech when article changes or closes
  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  useEffect(() => {
    stopSpeech();
    setIsSaved(false);
    setCompletedTasks({});
  }, [article?.id]);

  if (!isOpen || !article) return null;

  // Find index for prev/next
  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      stopSpeech();
    } else {
      const fullText = `${article.title}. Summary: ${article.summary}. ` +
        (article.sections ? article.sections.map(s => `${s.heading}. ${s.content} ${s.points ? s.points.join('. ') : ''}`).join('. ') : '');
      
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    const shareText = `📖 BharatSeva Guide: ${article.title}\n\n${article.summary}\n\nRead full article on BharatSeva Portal: ${shareUrl}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    if (onSaveArticle && !isSaved) {
      onSaveArticle(article.title);
    }
  };

  const toggleTask = (index: number) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const textClasses = {
    normal: 'text-sm sm:text-base leading-relaxed sm:leading-loose',
    large: 'text-base sm:text-lg leading-relaxed sm:leading-loose',
    xlarge: 'text-lg sm:text-xl leading-loose',
  }[fontSize];

  const headingClasses = {
    normal: 'text-lg sm:text-xl',
    large: 'text-xl sm:text-2xl',
    xlarge: 'text-2xl sm:text-3xl',
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] my-auto">
        
        {/* Top Control Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 border-b border-slate-200 flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className={`text-[11px] font-black px-2.5 py-1 rounded-full ${article.categoryColor}`}>
              {article.category}
            </span>
            <span className="hidden sm:inline-flex items-center text-xs text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
              {article.readTime}
            </span>
          </div>

          {/* Reader controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* Font size toggle */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded-lg transition ${fontSize === 'normal' ? 'bg-white text-blue-900 shadow-2xs' : 'hover:text-slate-900'}`}
                title="Default Font Size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded-lg transition ${fontSize === 'large' ? 'bg-white text-blue-900 shadow-2xs text-sm' : 'hover:text-slate-900'}`}
                title="Large Font Size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 rounded-lg transition ${fontSize === 'xlarge' ? 'bg-white text-blue-900 shadow-2xs text-base' : 'hover:text-slate-900'}`}
                title="Extra Large Font Size"
              >
                A++
              </button>
            </div>

            {/* Audio Listen */}
            <button
              onClick={handleToggleSpeech}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                isSpeaking
                  ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title={isSpeaking ? 'Stop Reading' : 'Listen to Article (Audio)'}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-slate-600" />}
              <span className="hidden md:inline">{isSpeaking ? 'Stop' : 'Listen'}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={handleSave}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center transition cursor-pointer ${
                isSaved
                  ? 'bg-amber-50 border-amber-300 text-amber-700'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title="Save / Bookmark Article"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : 'text-slate-600'}`} />
            </button>

            {/* Share / Copy */}
            <button
              onClick={handleShare}
              className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 transition cursor-pointer flex items-center gap-1 text-xs font-bold"
              title="Share Guide"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-slate-600" />}
              <span className="hidden md:inline">{isCopied ? 'Copied!' : 'Share'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                stopSpeech();
                onClose();
              }}
              className="p-2 bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 rounded-xl transition cursor-pointer ml-1"
              aria-label="Close Article Reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 divide-y divide-slate-100">
          
          {/* Article Header & Hero */}
          <div className="space-y-4 pt-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight sm:leading-tight">
              {article.title}
            </h1>

            {/* Metadata bar */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-500 font-medium pb-2">
              <span className="flex items-center text-slate-700 font-bold">
                <User className="w-3.5 h-3.5 mr-1.5 text-blue-900" />
                {article.author || 'BharatSeva Editorial Team'}
              </span>
              <span className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                {article.date}
              </span>
              <span className="flex items-center text-slate-600">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                {article.readTime}
              </span>
            </div>

            {/* Featured Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-md max-h-[340px] bg-slate-100">
              <img
                src={article.imageUrl}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center max-h-[340px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 right-4 text-white text-xs sm:text-sm font-medium drop-shadow-md">
                {article.summary}
              </div>
            </div>
          </div>

          {/* Key Highlights / Summary Box */}
          {article.keyHighlights && article.keyHighlights.length > 0 && (
            <div className="pt-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200/80 rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs">
                <div className="flex items-center space-x-2 text-blue-950 font-black text-sm sm:text-base">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Key Highlights & Important Takeaways</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {article.keyHighlights.map((point, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* In-depth Content Sections */}
          {article.sections && article.sections.length > 0 ? (
            <div className="pt-6 space-y-8">
              {article.sections.map((sec, idx) => (
                <div key={idx} className="space-y-3.5">
                  <h2 className={`font-black text-slate-900 tracking-tight flex items-center gap-2 ${headingClasses}`}>
                    <span className="w-2 h-5 bg-blue-900 rounded-full inline-block"></span>
                    {sec.heading}
                  </h2>

                  <p className={`text-slate-700 font-normal ${textClasses}`}>
                    {sec.content}
                  </p>

                  {/* Bullet points */}
                  {sec.points && sec.points.length > 0 && (
                    <ul className="space-y-2 pl-2 sm:pl-3 border-l-2 border-slate-200 my-2">
                      {sec.points.map((pt, pIdx) => (
                        <li key={pIdx} className={`text-slate-800 font-medium flex items-start space-x-2 ${textClasses}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-900 shrink-0 mt-2"></span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Callout box */}
                  {sec.callout && (
                    <div className="bg-amber-50/80 border-l-4 border-amber-500 p-3.5 rounded-r-xl text-xs sm:text-sm text-amber-950 font-semibold my-3">
                      💡 {sec.callout}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="pt-6 space-y-4">
              <p className={`text-slate-700 font-normal leading-relaxed ${textClasses}`}>
                {article.summary}
              </p>
            </div>
          )}

          {/* Action Checklist */}
          {article.actionChecklist && article.actionChecklist.length > 0 && (
            <div className="pt-6 space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center space-x-2 text-slate-900 font-black text-sm sm:text-base">
                  <ListChecks className="w-5 h-5 text-emerald-600" />
                  <span>Actionable Step-by-Step Checklist</span>
                </div>
                <p className="text-xs text-slate-500">
                  Tap to mark actions as you complete them in your financial / application journey:
                </p>

                <div className="space-y-2 pt-1">
                  {article.actionChecklist.map((task, idx) => {
                    const isDone = !!completedTasks[idx];
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleTask(idx)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-start space-x-3 cursor-pointer ${
                          isDone
                            ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 line-through opacity-80'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                          isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isDone && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium">{task}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Related Tools Launcher Widget */}
          {article.relatedToolId && onOpenTool && (
            <div className="pt-6">
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 flex items-center justify-center sm:justify-start gap-1">
                    <Calculator className="w-3.5 h-3.5" />
                    Interactive Financial Tool
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Calculate & Plan Instantly: {article.relatedToolName || 'Financial Calculator'}
                  </h3>
                  <p className="text-xs text-blue-200">
                    Use our built-in calculator with zero ads to compute your exact numbers.
                  </p>
                </div>

                <button
                  onClick={() => {
                    stopSpeech();
                    onClose();
                    onOpenTool(article.relatedToolId!);
                  }}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs sm:text-sm transition flex items-center gap-2 shadow-xs shrink-0 cursor-pointer"
                >
                  <span>Launch Tool</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Frequently Asked Questions */}
          {article.faqs && article.faqs.length > 0 && (
            <div className="pt-6 space-y-4">
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-900" />
                Frequently Asked Questions (FAQs)
              </h3>

              <div className="space-y-3">
                {article.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-1.5">
                    <h4 className="font-black text-xs sm:text-sm text-slate-900">
                      Q: {faq.question}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-1">Tags:</span>
              {article.tags.map((tag, idx) => (
                <span key={idx} className="text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-lg border border-slate-200">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Navigation: Prev / Next Article Switcher */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 z-30">
          {prevArticle ? (
            <button
              onClick={() => onSelectArticle(prevArticle)}
              className="flex items-center space-x-2 text-xs font-bold text-slate-700 hover:text-blue-900 transition p-1.5 rounded-xl hover:bg-white cursor-pointer max-w-[45%]"
            >
              <ArrowLeft className="w-4 h-4 shrink-0 text-blue-900" />
              <span className="truncate hidden sm:inline">{prevArticle.title}</span>
              <span className="sm:hidden">Previous</span>
            </button>
          ) : (
            <div />
          )}

          <div className="text-[11px] font-bold text-slate-400">
            {currentIndex + 1} of {allArticles.length} Articles
          </div>

          {nextArticle ? (
            <button
              onClick={() => onSelectArticle(nextArticle)}
              className="flex items-center space-x-2 text-xs font-bold text-slate-700 hover:text-blue-900 transition p-1.5 rounded-xl hover:bg-white cursor-pointer max-w-[45%]"
            >
              <span className="truncate hidden sm:inline">{nextArticle.title}</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="w-4 h-4 shrink-0 text-blue-900" />
            </button>
          ) : (
            <div />
          )}
        </div>

      </div>
    </div>
  );
};
