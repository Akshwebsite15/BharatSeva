import React, { useState } from 'react';
import {
  Bell,
  X,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Mail,
  Check,
  ShieldCheck,
  MapPin,
  Briefcase,
  PenSquare,
  Clock,
  Send,
} from 'lucide-react';

interface JobAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePreferences?: (msg: string) => void;
}

export const JobAlertModal: React.FC<JobAlertModalProps> = ({
  isOpen,
  onClose,
  onSavePreferences,
}) => {
  // Alert categories
  const [alertCategories, setAlertCategories] = useState<{ [key: string]: boolean }>({
    'New jobs': true,
    'Eligible jobs': true,
    'Closing deadlines': true,
    'Admit cards': true,
    'Results': true,
    'Answer keys': false,
  });

  // Specific Exams
  const [selectedExams, setSelectedExams] = useState<{ [key: string]: boolean }>({
    'BPSC (Bihar Public Service)': true,
    'BSSC (Bihar Staff Selection)': true,
    'Bihar Police (CSBC & BPSSC)': true,
    'SSC (CGL, CHSL, GD, MTS)': true,
    'Railway (RRB NTPC, JE, Group D)': true,
    'Banking (IBPS, SBI PO & Clerk)': false,
    'UPSC Civil Services': false,
    'Teaching (CTET & Bihar STET)': false,
  });

  // Specific States
  const [selectedStates, setSelectedStates] = useState<{ [key: string]: boolean }>({
    'Bihar': true,
    'All India (Central Govt)': true,
    'Uttar Pradesh': false,
    'Delhi': false,
    'Maharashtra': false,
  });

  // Delivery channels
  const [channels, setChannels] = useState<{ [key: string]: boolean }>({
    'Browser Push Notifications': true,
    'WhatsApp Instant Alerts': true,
    'Daily Morning Email Digest': true,
    'SMS Urgent Alerts': false,
  });

  // User contact
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const toggleCategory = (key: string) => {
    setAlertCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleExam = (key: string) => {
    setSelectedExams((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleState = (key: string) => {
    setSelectedStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleChannel = (key: string) => {
    setChannels((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);

    const activeEvents = Object.keys(alertCategories).filter((k) => alertCategories[k]);
    const activeExamsList = Object.keys(selectedExams).filter((k) => selectedExams[k]);

    const successMsg = `🔔 Alert preferences saved! You'll receive alerts for ${activeEvents.join(
      ', '
    )} across ${activeExamsList.length} exams.`;

    if (onSavePreferences) {
      onSavePreferences(successMsg);
    }

    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-600 text-white flex items-center justify-center font-black shadow-md">
              <Bell className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 bg-teal-100 text-teal-900 text-[10px] font-black rounded-full uppercase tracking-wide">
                  REAL-TIME NOTIFICATIONS
                </span>
                <span className="text-[10px] text-slate-400 font-bold">100% Free Service</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">
                🔔 Complete Government Job Alert System
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

        {/* Scrollable Form Body */}
        <form onSubmit={handleSave} className="overflow-y-auto py-5 space-y-6 pr-1">
          {/* Section 1: Alert Event Types */}
          <div className="space-y-2.5">
            <label className="block text-xs font-black uppercase tracking-wider text-teal-800 flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1.5" />
              1. Subscribe to Notification Events
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { name: 'New jobs', desc: 'Fresh vacancies' },
                { name: 'Eligible jobs', desc: 'Matching your degree' },
                { name: 'Closing deadlines', desc: '24hr & 48hr urgent' },
                { name: 'Admit cards', desc: 'Direct download link' },
                { name: 'Results', desc: 'Cutoff & merit lists' },
                { name: 'Answer keys', desc: 'Objection windows' },
              ].map((evt) => {
                const checked = alertCategories[evt.name];
                return (
                  <button
                    type="button"
                    key={evt.name}
                    onClick={() => toggleCategory(evt.name)}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between space-y-1 ${
                      checked
                        ? 'bg-teal-50 border-teal-400 text-teal-950 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs">{evt.name}</span>
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center border text-[10px] ${
                          checked
                            ? 'bg-teal-600 border-teal-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">{evt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Specific Exams Selection */}
          <div className="space-y-2.5">
            <label className="block text-xs font-black uppercase tracking-wider text-blue-900 flex items-center">
              <PenSquare className="w-3.5 h-3.5 mr-1.5" />
              2. Subscribe to Specific Exams
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.keys(selectedExams).map((ex) => {
                const checked = selectedExams[ex];
                return (
                  <button
                    type="button"
                    key={ex}
                    onClick={() => toggleExam(ex)}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center justify-between ${
                      checked
                        ? 'bg-blue-50 border-blue-400 text-blue-950 font-extrabold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 font-bold hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xs">{ex}</span>
                    <div
                      className={`w-4 h-4 rounded-md flex items-center justify-center border text-[10px] ${
                        checked
                          ? 'bg-blue-900 border-blue-900 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {checked && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Specific States Selection */}
          <div className="space-y-2.5">
            <label className="block text-xs font-black uppercase tracking-wider text-purple-900 flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1.5" />
              3. Subscribe to Specific States & Quotas
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(selectedStates).map((st) => {
                const checked = selectedStates[st];
                return (
                  <button
                    type="button"
                    key={st}
                    onClick={() => toggleState(st)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center space-x-1.5 ${
                      checked
                        ? 'bg-purple-900 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{st}</span>
                    {checked && <Check className="w-3.5 h-3.5 text-amber-300" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Delivery Channels & Contact Info */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-900 flex items-center">
              <Smartphone className="w-3.5 h-3.5 mr-1.5 text-teal-700" />
              4. Choose Delivery Channels & Contact Details
            </label>

            <div className="grid grid-cols-2 gap-2">
              {Object.keys(channels).map((ch) => {
                const checked = channels[ch];
                return (
                  <button
                    type="button"
                    key={ch}
                    onClick={() => toggleChannel(ch)}
                    className={`p-2.5 rounded-xl border text-xs font-extrabold text-left transition cursor-pointer flex items-center justify-between ${
                      checked
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                        : 'bg-white border-slate-200 text-slate-500'
                    }`}
                  >
                    <span>{ch}</span>
                    {checked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 border rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                  Email ID (For Morning Digest):
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="candidate@gmail.com"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                  />
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                  WhatsApp / SMS Number:
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                  />
                  <Smartphone className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaved}
              className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm text-slate-950 transition shadow-lg flex items-center justify-center space-x-2 cursor-pointer ${
                isSaved
                  ? 'bg-emerald-400 text-slate-950'
                  : 'bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300'
              }`}
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-slate-950" />
                  <span>Preferences Saved Successfully!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Save My Custom Job Alert Preferences</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
