import React, { useState } from 'react';
import {
  UserCheck,
  Bookmark,
  ListCheck,
  Bell,
  Trash2,
  PlusCircle,
  ExternalLink,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileSpreadsheet,
  X,
} from 'lucide-react';
import { SavedItem, ApplicationStatus } from '../types';

interface DashboardTabProps {
  savedItems: SavedItem[];
  applications: ApplicationStatus[];
  onRemoveSavedItem: (title: string) => void;
  onAddApplication: (app: Omit<ApplicationStatus, 'id'>) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  savedItems,
  applications,
  onRemoveSavedItem,
  onAddApplication,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<ApplicationStatus['type']>('Certificate');
  const [newAppNo, setNewAppNo] = useState('');
  const [newStatus, setNewStatus] = useState<ApplicationStatus['status']>('Applied');
  const [newNote, setNewNote] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAppNo.trim()) return;

    onAddApplication({
      title: newTitle.trim(),
      type: newType,
      applicationNo: newAppNo.trim(),
      status: newStatus,
      dateApplied: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      lastNote: newNote.trim() || 'Tracked by citizen',
    });

    setNewTitle('');
    setNewAppNo('');
    setNewNote('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-teal-600 font-extrabold uppercase tracking-wider text-xs">
            CITIZEN PROFILE
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            My Personal Citizen Dashboard
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Manage saved services, active application tracking numbers, and custom alerts in one secure place.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="bg-teal-50 text-teal-800 border border-teal-200 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center">
            <ShieldCheck className="w-4 h-4 mr-1.5 text-teal-600" /> Bihar Resident Active
          </span>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm transition cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Track New Application</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold">Bookmarked Items</span>
            <h3 className="text-2xl font-extrabold text-slate-900">{savedItems.length}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0">
            <ListCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold">Tracked Applications</span>
            <h3 className="text-2xl font-extrabold text-slate-900">{applications.length}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold">Active Reminders</span>
            <h3 className="text-2xl font-extrabold text-slate-900">4</h3>
          </div>
        </div>
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Saved Items */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center">
            <Bookmark className="w-5 h-5 text-blue-600 mr-2" /> My Saved Services & Jobs
          </h3>

          {savedItems.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">
              No saved items yet. Click the bookmark icon on any service, job, or scholarship.
            </p>
          ) : (
            <div className="space-y-3">
              {savedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                      {item.type}
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm mt-1">
                      {item.title}
                    </h4>
                    {item.extraInfo && (
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.extraInfo}</p>
                    )}
                  </div>

                  <button
                    onClick={() => onRemoveSavedItem(item.title)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Application Tracker */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center">
              <ListCheck className="w-5 h-5 text-emerald-600 mr-2" /> My Tracked Applications
            </h3>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-xs font-bold text-teal-700 hover:text-teal-900 cursor-pointer flex items-center space-x-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Ref</span>
            </button>
          </div>

          <div className="space-y-3">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{app.title}</h4>
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-extrabold ${
                      app.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : app.status === 'Under Review' || app.status === 'Document Verified'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 pt-1">
                  <span>Ref No: <strong className="font-mono text-slate-900">{app.applicationNo}</strong></span>
                  <span className="text-[11px] text-slate-400">Date: {app.dateApplied}</span>
                </div>

                {app.lastNote && (
                  <p className="text-[11px] text-slate-500 bg-white p-2 rounded-xl border border-slate-200/60 font-medium">
                    Note: {app.lastNote}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for adding application */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-extrabold text-slate-900 mb-4">
              Track New Application
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Service / Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Caste Certificate, BPSC 71st"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as ApplicationStatus['type'])}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold"
                >
                  <option value="Certificate">Certificate / RTPS</option>
                  <option value="Job Application">Government Job Application</option>
                  <option value="Scholarship">Scholarship</option>
                  <option value="Scheme">Welfare Scheme</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Application Reference No.</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CCO/2026/9841205"
                  value={newAppNo}
                  onChange={(e) => setNewAppNo(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Current Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ApplicationStatus['status'])}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold"
                >
                  <option value="Applied">Applied</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Document Verified">Document Verified</option>
                  <option value="Approved">Approved</option>
                  <option value="Action Required">Action Required</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Custom Note (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Physical verification pending at local thana"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold"
                />
              </div>

              <div className="pt-3 flex space-x-2">
                <button
                  type="submit"
                  className="flex-grow bg-blue-900 hover:bg-blue-800 text-white font-extrabold py-3 rounded-xl shadow cursor-pointer text-xs"
                >
                  Save Application
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-3 rounded-xl cursor-pointer text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
