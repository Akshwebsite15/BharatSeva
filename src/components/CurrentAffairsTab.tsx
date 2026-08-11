import React, { useState, useMemo } from 'react';
import {
  Newspaper,
  HelpCircle,
  Bookmark,
  Share2,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Search,
  BookOpen,
  Award,
  RefreshCw,
  Copy,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Volume2,
} from 'lucide-react';
import {
  CurrentAffairsArticle,
  CurrentAffairsCategory,
  CurrentAffairsQuiz,
} from '../types';
import { initialCurrentAffairsArticles, initialCurrentAffairsQuiz } from '../data/currentAffairsData';
import { LiveSyncBanner } from './LiveSyncBanner';

interface CurrentAffairsTabProps {
  onSaveItem: (title: string, type: 'Service' | 'Scholarship' | 'Scheme' | 'Job' | 'Exam') => void;
  onNavigateToIntentPage?: (slug: string) => void;
  articles?: CurrentAffairsArticle[];
  onFetchLiveUpdates?: () => void;
  isSyncingLive?: boolean;
  lastSyncedTime?: string | null;
}

export const CurrentAffairsTab: React.FC<CurrentAffairsTabProps> = ({
  onSaveItem,
  onNavigateToIntentPage,
  articles,
  onFetchLiveUpdates,
  isSyncingLive = false,
  lastSyncedTime,
}) => {
  const articlesList = articles || initialCurrentAffairsArticles;
  const [activeSubView, setActiveSubView] = useState<'read' | 'quiz' | 'saved'>('read');
  const [selectedCategory, setSelectedCategory] = useState<CurrentAffairsCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>([]);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // Quiz State
  const [quiz] = useState<CurrentAffairsQuiz>(initialCurrentAffairsQuiz);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: number }>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizStartTime] = useState<number>(Date.now());

  const categories: (CurrentAffairsCategory | 'All')[] = [
    'All',
    'National',
    'International',
    'Economy',
    'Science & Technology',
    'Defence',
    'Government Schemes',
    'Bihar',
    'Sports',
    'Awards',
    'Important Appointments',
  ];

  // Articles Filtering
  const filteredArticles = useMemo(() => {
    return articlesList.filter((art) => {
      const matchCat = selectedCategory === 'All' || art.category === selectedCategory;
      const matchQuery =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [articlesList, selectedCategory, searchQuery]);

  // Saved Articles
  const savedArticles = useMemo(() => {
    return articlesList.filter((art) => savedArticleIds.includes(art.id));
  }, [articlesList, savedArticleIds]);

  const toggleSaveArticle = (article: CurrentAffairsArticle) => {
    if (savedArticleIds.includes(article.id)) {
      setSavedArticleIds(savedArticleIds.filter((id) => id !== article.id));
    } else {
      setSavedArticleIds([...savedArticleIds, article.id]);
      onSaveItem(article.title, 'Exam');
    }
  };

  const handleShareArticle = (article: CurrentAffairsArticle) => {
    const textToShare = `🇮🇳 Daily Current Affairs 2026: ${article.title}\n\nCategory: ${article.category}\nSource: ${article.source}\n\nRead full daily updates on BharatSeva App!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToShare);
      setShareToast(`Copied "${article.title.substring(0, 30)}..." to clipboard!`);
      setTimeout(() => setShareToast(null), 3000);
    }
  };

  // Quiz Logic
  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isQuizSubmitted) return;
    setUserAnswers({ ...userAnswers, [questionId]: optionIndex });
  };

  const quizScore = useMemo(() => {
    let score = 0;
    quiz.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswerIndex) {
        score += 1;
      }
    });
    return score;
  }, [quiz, userAnswers]);

  const handleResetQuiz = () => {
    setUserAnswers({});
    setIsQuizSubmitted(false);
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-2 border border-teal-500 animate-in fade-in slide-in-from-bottom-4">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span className="text-xs font-bold">{shareToast}</span>
        </div>
      )}

      {/* Dynamic Live Sync Banner */}
      {onFetchLiveUpdates && (
        <LiveSyncBanner
          onFetchLiveUpdates={onFetchLiveUpdates}
          isSyncingLive={isSyncingLive}
          lastSyncedTime={lastSyncedTime}
        />
      )}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-500/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-teal-500/20 text-teal-300 border border-teal-400/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIVE DAILY UPDATES • AUGUST 10, 2026</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              🇮🇳 Today's Current Affairs & Daily Quiz
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Verified daily news summaries, examination impact analysis, and interactive daily practice quizzes for BPSC, SSC CGL, UPSC, Railway, and State Board candidates.
            </p>
          </div>

          {/* Interactive Flow Indicator Badges */}
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex items-center space-x-2 shrink-0">
            <span className="text-xs font-black text-teal-300 uppercase tracking-wider">Flow:</span>
            <span className="px-2.5 py-1 bg-teal-400 text-slate-950 rounded-xl text-[11px] font-black">1. Read</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="px-2.5 py-1 bg-blue-400 text-slate-950 rounded-xl text-[11px] font-black">2. Quiz</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="px-2.5 py-1 bg-amber-400 text-slate-950 rounded-xl text-[11px] font-black">3. Save</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="px-2.5 py-1 bg-emerald-400 text-slate-950 rounded-xl text-[11px] font-black">4. Share</span>
          </div>
        </div>
      </div>

      {/* Main Sub-Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubView('read')}
          className={`px-5 py-2.5 rounded-2xl font-black text-xs transition flex items-center space-x-2 cursor-pointer ${
            activeSubView === 'read'
              ? 'bg-blue-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>Read Daily News ({filteredArticles.length})</span>
        </button>

        <button
          onClick={() => setActiveSubView('quiz')}
          className={`px-5 py-2.5 rounded-2xl font-black text-xs transition flex items-center space-x-2 cursor-pointer ${
            activeSubView === 'quiz'
              ? 'bg-teal-700 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Interactive Daily Quiz (5 Qs)</span>
          <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-full font-black">
            DAILY
          </span>
        </button>

        <button
          onClick={() => setActiveSubView('saved')}
          className={`px-5 py-2.5 rounded-2xl font-black text-xs transition flex items-center space-x-2 cursor-pointer ${
            activeSubView === 'saved'
              ? 'bg-amber-700 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Articles ({savedArticleIds.length})</span>
        </button>
      </div>

      {/* SUBVIEW 1: READ ARTICLES */}
      {activeSubView === 'read' && (
        <div className="space-y-6">
          {/* Search & Category Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search current affairs by topic, ISRO, RBI, BPSC, Budget..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider shrink-0 mr-1">
                Categories:
              </span>
              {categories.map((cat) => {
                const isSel = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                      isSel
                        ? 'bg-teal-800 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Articles Feed List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => {
              const isSaved = savedArticleIds.includes(article.id);

              return (
                <div
                  key={article.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    {/* Header Badges */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black bg-teal-50 text-teal-800 border border-teal-200 uppercase tracking-wide">
                        {article.category}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1 text-slate-400" /> {article.date} • {article.readTimeMinutes} min read
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2 leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                      {article.summary}
                    </p>

                    {/* Key Highlights Bullet Points */}
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 mb-4 space-y-1.5">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                        📌 Key Examination Highlights:
                      </span>
                      {article.keyPoints.map((pt, idx) => (
                        <div key={idx} className="flex items-start text-xs text-slate-700">
                          <span className="text-teal-600 mr-1.5 font-bold">•</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                    {/* Exam Impact Note */}
                    <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/60 mb-4 text-xs text-amber-900 flex items-start space-x-2">
                      <TrendingUp className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">Exam Impact: </strong>
                        <span>{article.impactAnalysis}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <span className="text-[11px] font-bold text-slate-400">
                      Source: {article.source}
                    </span>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleSaveArticle(article)}
                        aria-label="Bookmark Article"
                        className={`p-2 rounded-xl transition cursor-pointer ${
                          isSaved
                            ? 'bg-amber-100 text-amber-800 font-bold'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title={isSaved ? 'Saved' : 'Save Article'}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleShareArticle(article)}
                        aria-label="Share Article"
                        className="p-2 bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-700 rounded-xl transition cursor-pointer"
                        title="Share Article"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBVIEW 2: INTERACTIVE QUIZ */}
      {activeSubView === 'quiz' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-teal-600 font-extrabold uppercase tracking-wider text-xs">
                  DAILY PRACTICE TEST
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  {quiz.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Answer all 5 questions based on today's current affairs. Earn instant score & detailed explanations.
                </p>
              </div>

              {isQuizSubmitted && (
                <div className="bg-teal-50 border border-teal-200 px-4 py-2.5 rounded-2xl flex items-center space-x-3 shrink-0">
                  <Award className="w-6 h-6 text-teal-600" />
                  <div>
                    <span className="text-[10px] font-black uppercase text-teal-800 tracking-wider block">
                      YOUR SCORE
                    </span>
                    <strong className="text-lg font-black text-teal-900">
                      {quizScore} / {quiz.totalQuestions}
                    </strong>
                  </div>
                </div>
              )}
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {quiz.questions.map((q, idx) => {
                const selectedOpt = userAnswers[q.id];
                const isAnswered = selectedOpt !== undefined;

                return (
                  <div
                    key={q.id}
                    className="p-5 sm:p-6 bg-slate-50/70 rounded-3xl border border-slate-200 space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">
                          {q.category}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {q.question}
                    </h4>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedOpt === optIdx;
                        const isCorrect = optIdx === q.correctAnswerIndex;

                        let buttonStyle = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100';

                        if (isQuizSubmitted) {
                          if (isCorrect) {
                            buttonStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                          } else if (isSelected && !isCorrect) {
                            buttonStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                          }
                        } else if (isSelected) {
                          buttonStyle = 'bg-teal-900 text-white border-teal-900 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isQuizSubmitted}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`p-3.5 rounded-2xl border text-xs text-left transition flex items-center justify-between cursor-pointer ${buttonStyle}`}
                          >
                            <span>
                              <strong className="mr-2 font-black">{String.fromCharCode(65 + optIdx)}.</strong>
                              {opt}
                            </span>
                            {isQuizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                            {isQuizSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation box after submit */}
                    {isQuizSubmitted && (
                      <div className="p-4 bg-teal-50/80 rounded-2xl border border-teal-200/80 text-xs text-teal-950 space-y-1">
                        <strong className="font-extrabold text-teal-900 block">💡 Explanation:</strong>
                        <p>{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Submit Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                onClick={handleResetQuiz}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center space-x-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Answers</span>
              </button>

              {!isQuizSubmitted ? (
                <button
                  onClick={() => setIsQuizSubmitted(true)}
                  disabled={Object.keys(userAnswers).length === 0}
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-extrabold text-xs rounded-2xl shadow-md transition cursor-pointer"
                >
                  Submit Quiz & View Detailed Answers
                </button>
              ) : (
                <button
                  onClick={handleResetQuiz}
                  className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-xs rounded-2xl shadow-md transition cursor-pointer"
                >
                  Retake Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 3: SAVED ARTICLES */}
      {activeSubView === 'saved' && (
        <div className="space-y-6">
          {savedArticles.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
              <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Saved Current Affairs Articles</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click the bookmark icon on any current affairs article to save it here for fast offline revision.
              </p>
              <button
                onClick={() => setActiveSubView('read')}
                className="px-4 py-2 bg-teal-600 text-white text-xs font-bold rounded-xl transition cursor-pointer inline-block"
              >
                Browse Daily News
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-50 text-amber-900 border border-amber-200">
                      {article.category}
                    </span>
                    <button
                      onClick={() => toggleSaveArticle(article)}
                      className="text-xs text-rose-600 font-bold hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-2">{article.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-3 mb-3">{article.summary}</p>
                  <span className="text-[10px] text-slate-400 font-bold">Saved for offline revision</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
