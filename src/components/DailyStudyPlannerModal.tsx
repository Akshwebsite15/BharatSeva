import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Sparkles,
  Flame,
  Share2,
  Volume2,
  VolumeX,
  BookOpen,
  Award,
  Zap,
} from 'lucide-react';

interface StudyTask {
  id: string;
  subject: string;
  task: string;
  completed: boolean;
}

const DEFAULT_TASKS: StudyTask[] = [
  { id: '1', subject: 'Current Affairs', task: 'Read BharatSeva Daily 10-Point GK Capsule', completed: true },
  { id: '2', subject: 'General Studies', task: 'Revise Indian Polity Articles 1 to 51A (Fundamental Rights)', completed: false },
  { id: '3', subject: 'Reasoning', task: 'Solve 25 Syllogism & Seating Arrangement Questions', completed: false },
  { id: '4', subject: 'Quantitative Aptitude', task: 'Practice 20 Time & Work / Percentage Problems', completed: false },
  { id: '5', subject: 'Mock Test', task: 'Attempt BharatSeva Daily Speed Quiz & analyze wrong answers', completed: false },
];

const MOTIVATIONAL_QUOTES = [
  { hi: '“सफलता का कोई शॉर्टकट नहीं होता, यह लगातार अभ्यास और लगन की देन है।”', en: '“Success has no shortcut; it comes from relentless daily consistency.”' },
  { hi: '“हर दिन एक कदम आगे बढ़ाओ, तुम्हारी मेहनत कभी खाली नहीं जाएगी।”', en: '“Take one step forward every single day. Your hard work never goes in vain.”' },
  { hi: '“जो पानी से नहाता है वो लिबास बदलता है, जो पसीने से नहाता है वो इतिहास बदलता है!”', en: '“Those who study consistently write history!”' },
];

interface DailyStudyPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakDays: number;
  showToast?: (msg: string) => void;
}

export const DailyStudyPlannerModal: React.FC<DailyStudyPlannerModalProps> = ({
  isOpen,
  onClose,
  streakDays,
  showToast,
}) => {
  const [tasks, setTasks] = useState<StudyTask[]>(() => {
    const saved = localStorage.getItem('bharatseva_study_tasks_2026');
    return saved ? JSON.parse(saved) : DEFAULT_TASKS;
  });

  const [newTaskSubject, setNewTaskSubject] = useState('General Studies');
  const [newTaskText, setNewTaskText] = useState('');

  // Pomodoro State
  const [mode, setMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(2);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Motivational quote index
  const [quoteIdx] = useState(() => Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length));

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('bharatseva_study_tasks_2026', JSON.stringify(tasks));
  }, [tasks]);

  // Pomodoro Timer Effect
  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === 'work') {
        setPomodoroCount((prev) => prev + 1);
        setMode('shortBreak');
        setTimeLeft(5 * 60);
        if (showToast) showToast('🔔 Focus Session Complete! Time for a 5-minute break.');
      } else {
        setMode('work');
        setTimeLeft(25 * 60);
        if (showToast) showToast('🚀 Break is over! Let’s focus on the next study sprint.');
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode, showToast]);

  if (!isOpen) return null;

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask: StudyTask = {
      id: Date.now().toString(),
      subject: newTaskSubject,
      task: newTaskText.trim(),
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setNewTaskText('');
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleModeChange = (newMode: 'work' | 'shortBreak' | 'longBreak') => {
    setMode(newMode);
    setIsRunning(false);
    if (newMode === 'work') setTimeLeft(25 * 60);
    if (newMode === 'shortBreak') setTimeLeft(5 * 60);
    if (newMode === 'longBreak') setTimeLeft(15 * 60);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / (tasks.length || 1)) * 100);

  const handleShareStudySummary = () => {
    const text = `🎯 My Daily Sarkari Study Progress on BharatSeva (${new Date().toLocaleDateString('en-IN')}):\n\n` +
      `✅ Targets Completed: ${completedCount}/${tasks.length} (${progressPercent}%)\n` +
      `⏱️ Pomodoro Focus Sprints: ${pomodoroCount} Sessions (~${pomodoroCount * 25} mins)\n` +
      `🔥 Current Study Streak: ${streakDays} Days\n\n` +
      `Track your study schedule for free on BharatSeva 👉 ${window.location.origin}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 relative overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center font-black shadow-sm">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Daily Aspirant Study Planner & Pomodoro
                </h3>
                <span className="bg-orange-100 text-orange-900 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <Flame className="w-3 h-3 text-orange-600 fill-orange-600" /> {streakDays} Day Streak
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Set daily syllabus targets, track focus sessions, and beat procrastination
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-4 space-y-4 overflow-y-auto">
          {/* Motivational Quote Banner */}
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-3.5 rounded-2xl shadow-xs text-xs space-y-1">
            <p className="font-bold italic text-amber-300">
              {MOTIVATIONAL_QUOTES[quoteIdx].hi}
            </p>
            <p className="text-[11px] text-slate-300">
              {MOTIVATIONAL_QUOTES[quoteIdx].en}
            </p>
          </div>

          {/* Pomodoro Focus Timer Card */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-md space-y-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => handleModeChange('work')}
                className={`px-3 py-1 rounded-xl text-xs font-black transition ${
                  mode === 'work' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Focus (25m)
              </button>
              <button
                onClick={() => handleModeChange('shortBreak')}
                className={`px-3 py-1 rounded-xl text-xs font-black transition ${
                  mode === 'shortBreak' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Short Break (5m)
              </button>
              <button
                onClick={() => handleModeChange('longBreak')}
                className={`px-3 py-1 rounded-xl text-xs font-black transition ${
                  mode === 'longBreak' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Long Break (15m)
              </button>
            </div>

            {/* Big Timer Display */}
            <div className="text-5xl sm:text-6xl font-black tracking-tight text-white font-mono">
              {formatTime(timeLeft)}
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center space-x-1.5 transition cursor-pointer shadow-md ${
                  isRunning
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{isRunning ? 'Pause Timer' : 'Start Focus Sprint'}</span>
              </button>

              <button
                onClick={() => handleModeChange(mode)}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition cursor-pointer"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[11px] text-slate-400 font-semibold flex items-center justify-center gap-2">
              <span>Completed Sprints Today: <strong className="text-white">{pomodoroCount}</strong></span>
              <span>•</span>
              <span>Total Focus Time: <strong className="text-emerald-400">{pomodoroCount * 25} mins</strong></span>
            </div>
          </div>

          {/* Daily Checklist Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  <span>Today's Study Checklist ({completedCount}/{tasks.length} Done)</span>
                </h4>
                <div className="w-36 sm:w-48 bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-purple-600 h-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={handleShareStudySummary}
                className="text-xs font-extrabold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 flex items-center gap-1 cursor-pointer transition"
              >
                <Share2 className="w-3.5 h-3.5" /> Share on WhatsApp
              </button>
            </div>

            {/* Task List */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-2.5 ${
                    task.completed
                      ? 'bg-slate-50 border-slate-200 text-slate-400 line-through'
                      : 'bg-white border-slate-200 hover:border-purple-300 text-slate-800 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    {task.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                    )}
                    <div>
                      <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded mr-1.5">
                        {task.subject}
                      </span>
                      <span className="text-xs font-bold">{task.task}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTask(task.id);
                    }}
                    className="text-slate-300 hover:text-rose-500 p-1 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Task Form */}
            <form onSubmit={addTask} className="flex gap-2 pt-1">
              <select
                value={newTaskSubject}
                onChange={(e) => setNewTaskSubject(e.target.value)}
                className="p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden"
              >
                <option value="Current Affairs">Current Affairs</option>
                <option value="General Studies">General Studies</option>
                <option value="Reasoning">Reasoning</option>
                <option value="Math">Math</option>
                <option value="English">English</option>
                <option value="Mock Test">Mock Test</option>
              </select>

              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Add customized study target..."
                className="flex-1 p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden"
              />

              <button
                type="submit"
                className="p-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-semibold">
            🎯 Build consistency: 25 minutes of 100% focus daily changes your score!
          </span>
          <button
            onClick={onClose}
            className="py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
