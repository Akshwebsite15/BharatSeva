import React, { useState } from 'react';
import {
  Hourglass,
  Calendar,
  Bell,
  CheckCircle2,
  ExternalLink,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { DeadlineItem } from '../types';

interface DeadlinesTabProps {
  deadlines: DeadlineItem[];
  onSetReminder: (title: string, days: number) => void;
}

export const DeadlinesTab: React.FC<DeadlinesTabProps> = ({
  deadlines,
  onSetReminder,
}) => {
  const [reminderSelected, setReminderSelected] = useState<{ [key: string]: string }>({});

  const handleReminderChange = (title: string, daysStr: string) => {
    if (!daysStr) return;
    const days = parseInt(daysStr, 10);
    setReminderSelected((prev) => ({ ...prev, [title]: daysStr }));
    onSetReminder(title, days);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-teal-600 font-extrabold uppercase tracking-wider text-xs">
          TIMELINE MONITOR
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Application & Exam Deadline Tracker
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Never miss a key application window or exam admit card release. Configure personalized reminders for major government milestones.
        </p>
      </div>

      <div className="space-y-4">
        {deadlines.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start space-x-4">
              <div
                className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-extrabold shrink-0 ${
                  item.urgency === 'Urgent' || item.urgency === 'Critical'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                <span className="text-lg leading-none">{item.daysLeft}d</span>
                <span className="text-[9px] uppercase font-bold tracking-wider mt-0.5">Left</span>
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-50 text-teal-800 border border-teal-100 uppercase tracking-wide">
                    {item.type}
                  </span>
                  {item.urgency === 'Urgent' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 flex items-center">
                      <AlertTriangle className="w-3 h-3 mr-1" /> Closing Soon
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg mt-1.5">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 mt-1 flex items-center font-medium">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" /> Deadline Date:{' '}
                  <strong className="text-slate-800 ml-1">{item.date}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <select
                value={reminderSelected[item.title] || ''}
                onChange={(e) => handleReminderChange(item.title, e.target.value)}
                className="bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-teal-500 focus:outline-hidden cursor-pointer"
              >
                <option value="">Configure Alert...</option>
                <option value="7">7 Days Before Deadline</option>
                <option value="3">3 Days Before Deadline</option>
                <option value="1">1 Day Before Deadline</option>
              </select>

              {item.targetUrl && (
                <a
                  href={item.targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-blue-50 text-blue-900 hover:bg-blue-900 hover:text-white rounded-xl transition font-bold text-xs"
                  title="Open Official Link"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
