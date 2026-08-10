import React, { useState, useEffect, useMemo } from 'react';
import {
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  Sliders,
  RotateCcw,
  ExternalLink,
  Bookmark,
  ShieldCheck,
  Building,
  GraduationCap,
  Calendar,
  Ruler,
  ChevronDown,
  Info,
} from 'lucide-react';
import { GovJob, UserProfile, JobEligibilityResult, MatchStatus } from '../types';
import { evaluateJobEligibility, calculateAge } from '../utils/eligibilityEngine';

interface JobsForYouSectionProps {
  jobs: GovJob[];
  onViewJob: (job: GovJob) => void;
  onSaveJob: (title: string) => void;
}

export const defaultUserProfile: UserProfile = {
  dob: '2005-04-12', // 21 years old in 2026
  gender: 'Male',
  state: 'Bihar',
  category: 'General',
  tenthPercentage: 84,
  twelfthPercentage: 80,
  graduationPercentage: 75,
  highestQualification: 'B.Tech',
  degreeBranch: 'CSE',
  passingYear: 2027,
  postGraduation: 'None',
  diplomaIti: 'None',
  experienceYears: 0,
  heightCm: 172,
  chestCm: 82,
  isPhysicalFit: true,
};

export const JobsForYouSection: React.FC<JobsForYouSectionProps> = ({
  jobs,
  onViewJob,
  onSaveJob,
}) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('bharatseva_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return defaultUserProfile;
  });

  const [statusFilter, setStatusFilter] = useState<'All' | MatchStatus>('All');
  const [isEditingProfile, setIsEditingProfile] = useState(true);

  useEffect(() => {
    localStorage.setItem('bharatseva_user_profile', JSON.stringify(profile));
  }, [profile]);

  const currentAge = useMemo(() => calculateAge(profile.dob), [profile.dob]);

  // Evaluate all jobs
  const evaluatedResults: JobEligibilityResult[] = useMemo(() => {
    return jobs.map((job) => evaluateJobEligibility(job, profile));
  }, [jobs, profile]);

  const counts = useMemo(() => {
    const eligible = evaluatedResults.filter((r) => r.status === 'Eligible').length;
    const possible = evaluatedResults.filter((r) => r.status === 'Possibly Eligible').length;
    const notEligible = evaluatedResults.filter((r) => r.status === 'Not Eligible').length;
    return { eligible, possible, notEligible, total: evaluatedResults.length };
  }, [evaluatedResults]);

  const filteredResults = useMemo(() => {
    if (statusFilter === 'All') return evaluatedResults;
    return evaluatedResults.filter((r) => r.status === statusFilter);
  }, [evaluatedResults, statusFilter]);

  // Presets
  const applyPreset = (presetType: 'btech' | 'police' | 'ba' | 'iti') => {
    if (presetType === 'btech') {
      setProfile({
        dob: '2005-04-12',
        gender: 'Male',
        state: 'Bihar',
        category: 'General',
        tenthPercentage: 85,
        twelfthPercentage: 82,
        graduationPercentage: 78,
        highestQualification: 'B.Tech',
        degreeBranch: 'CSE',
        passingYear: 2027,
        postGraduation: 'None',
        diplomaIti: 'None',
        experienceYears: 0,
        heightCm: 172,
        chestCm: 82,
        isPhysicalFit: true,
      });
    } else if (presetType === 'police') {
      setProfile({
        dob: '2006-02-18', // 20 yrs
        gender: 'Male',
        state: 'Bihar',
        category: 'EBC',
        tenthPercentage: 72,
        twelfthPercentage: 70,
        graduationPercentage: 0,
        highestQualification: '12th',
        degreeBranch: 'Arts',
        passingYear: 2024,
        postGraduation: 'None',
        diplomaIti: 'None',
        experienceYears: 0,
        heightCm: 168,
        chestCm: 81,
        isPhysicalFit: true,
      });
    } else if (presetType === 'ba') {
      setProfile({
        dob: '2002-08-25', // 24 yrs
        gender: 'Female',
        state: 'Bihar',
        category: 'OBC',
        tenthPercentage: 78,
        twelfthPercentage: 75,
        graduationPercentage: 68,
        highestQualification: 'Graduate',
        degreeBranch: 'B.A. Political Science',
        passingYear: 2024,
        postGraduation: 'None',
        diplomaIti: 'None',
        experienceYears: 1,
        heightCm: 158,
        chestCm: 0,
        isPhysicalFit: true,
      });
    } else if (presetType === 'iti') {
      setProfile({
        dob: '2004-11-10', // 21 yrs
        gender: 'Male',
        state: 'Bihar',
        category: 'SC',
        tenthPercentage: 65,
        twelfthPercentage: 60,
        graduationPercentage: 0,
        highestQualification: 'ITI',
        degreeBranch: 'Fitter Trade',
        passingYear: 2023,
        postGraduation: 'None',
        diplomaIti: 'ITI Fitter Trade',
        experienceYears: 0,
        heightCm: 166,
        chestCm: 80,
        isPhysicalFit: true,
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-teal-400/20 text-teal-300 border border-teal-400/30 uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-300 animate-pulse" />
              BharatSeva Smart Match Engine
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Personalised "Jobs For You"
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              Enter your exact qualifications, DOB, category, and physical standards. Our government rules engine automatically matches you against recruitment age limits, stream criteria, and reservation relaxations.
            </p>
          </div>

          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="self-start md:self-auto bg-teal-500 hover:bg-teal-400 text-slate-950 font-black px-5 py-3 rounded-2xl text-xs sm:text-sm shadow-lg transition flex items-center space-x-2 shrink-0 cursor-pointer"
          >
            <Sliders className="w-4 h-4" />
            <span>{isEditingProfile ? 'Hide Profile Form' : 'Edit My Profile'}</span>
          </button>
        </div>
      </div>

      {/* Profile Form Card */}
      {isEditingProfile && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center">
                <UserCheck className="w-5 h-5 text-teal-600 mr-2" />
                Configure Your Personal Candidate Profile
              </h2>
              <p className="text-xs text-slate-500">
                Calculated Age: <strong className="text-slate-900 font-extrabold">{currentAge} Years Old</strong> (as of 2026)
              </p>
            </div>

            {/* Quick Preset Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                Presets:
              </span>
              <button
                onClick={() => applyPreset('btech')}
                className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold border border-blue-200 cursor-pointer"
              >
                B.Tech CSE (Age 21)
              </button>
              <button
                onClick={() => applyPreset('police')}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200 cursor-pointer"
              >
                12th Police Aspirant
              </button>
              <button
                onClick={() => applyPreset('ba')}
                className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold border border-purple-200 cursor-pointer"
              >
                B.A. Female (OBC)
              </button>
              <button
                onClick={() => applyPreset('iti')}
                className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 cursor-pointer"
              >
                ITI Fitter (SC)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* DOB */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">Date of Birth</label>
              <input
                type="date"
                value={profile.dob}
                onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">Gender</label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value as any })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-teal-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Domicile State */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">State Domicile</label>
              <select
                value={profile.state}
                onChange={(e) => setProfile({ ...profile, state: e.target.value as any })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-teal-500"
              >
                <option value="Bihar">Bihar</option>
                <option value="All India">All India / Other</option>
                <option value="Delhi">Delhi</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">Category / Quota</label>
              <select
                value={profile.category}
                onChange={(e) => setProfile({ ...profile, category: e.target.value as any })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-teal-500"
              >
                <option value="General">General / Unreserved</option>
                <option value="EWS">EWS (10% Quota)</option>
                <option value="EBC">EBC (Bihar Extremely Backward)</option>
                <option value="BC">BC (Bihar Backward Class)</option>
                <option value="OBC">OBC (Central OBC Non-Creamy)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
              </select>
            </div>

            {/* Highest Qualification */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">Highest Qualification</label>
              <select
                value={profile.highestQualification}
                onChange={(e) =>
                  setProfile({ ...profile, highestQualification: e.target.value as any })
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-teal-500"
              >
                <option value="10th">10th Matric Pass</option>
                <option value="12th">12th Intermediate Pass</option>
                <option value="Diploma">Polytechnic Diploma</option>
                <option value="ITI">ITI Certified</option>
                <option value="Graduate">Bachelor Degree (BA/BSc/BCom/BBA/BCA)</option>
                <option value="B.Tech">B.Tech / B.E. Engineering</option>
                <option value="Post Graduate">Post Graduate (MA/MSc/MTech/MBA)</option>
              </select>
            </div>

            {/* Degree / Branch */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">Degree / Specialization Stream</label>
              <input
                type="text"
                placeholder="e.g. CSE, Civil, Mechanical, B.A. History, Fitter"
                value={profile.degreeBranch}
                onChange={(e) => setProfile({ ...profile, degreeBranch: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Passing / Graduation Year */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">Passing / Expected Year</label>
              <input
                type="number"
                value={profile.passingYear}
                onChange={(e) =>
                  setProfile({ ...profile, passingYear: parseInt(e.target.value, 10) || 2026 })
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Post-Graduation / ITI details */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">Diploma / ITI / PG (if any)</label>
              <input
                type="text"
                placeholder="e.g. M.Tech, ITI Fitter, None"
                value={profile.postGraduation !== 'None' ? profile.postGraduation : profile.diplomaIti}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    postGraduation: e.target.value || 'None',
                    diplomaIti: e.target.value || 'None',
                  })
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* 10th % */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">10th Percentage (%)</label>
              <input
                type="number"
                value={profile.tenthPercentage}
                onChange={(e) =>
                  setProfile({ ...profile, tenthPercentage: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* 12th % */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">12th Percentage (%)</label>
              <input
                type="number"
                value={profile.twelfthPercentage}
                onChange={(e) =>
                  setProfile({ ...profile, twelfthPercentage: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Graduation % */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">Graduation Percentage (%)</label>
              <input
                type="number"
                value={profile.graduationPercentage}
                onChange={(e) =>
                  setProfile({ ...profile, graduationPercentage: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Height cm */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">Height (in cm)</label>
              <input
                type="number"
                placeholder="e.g. 170"
                value={profile.heightCm}
                onChange={(e) =>
                  setProfile({ ...profile, heightCm: parseFloat(e.target.value) || 165 })
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="physFit"
                checked={profile.isPhysicalFit}
                onChange={(e) => setProfile({ ...profile, isPhysicalFit: e.target.checked })}
                className="w-4 h-4 text-teal-600 rounded cursor-pointer focus:ring-teal-500"
              />
              <label htmlFor="physFit" className="text-xs font-bold text-slate-700 cursor-pointer">
                I am physically fit for running & physical tests (Police / Defense)
              </label>
            </div>

            <button
              onClick={() => {
                setProfile(defaultUserProfile);
              }}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center space-x-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>
      )}

      {/* Summary Profile Pill */}
      <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-700">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] bg-white px-2.5 py-1 rounded-lg border border-slate-200">
            Active Evaluation Profile
          </span>
          <span className="bg-blue-50 text-blue-900 font-bold px-2.5 py-1 rounded-lg border border-blue-100">
            {profile.highestQualification} ({profile.degreeBranch || 'General'})
          </span>
          <span className="bg-purple-50 text-purple-900 font-bold px-2.5 py-1 rounded-lg border border-purple-100">
            Age: {currentAge} yrs ({profile.category})
          </span>
          <span className="bg-teal-50 text-teal-900 font-bold px-2.5 py-1 rounded-lg border border-teal-100">
            {profile.state} Domicile
          </span>
          {profile.heightCm > 0 && (
            <span className="bg-amber-50 text-amber-900 font-bold px-2.5 py-1 rounded-lg border border-amber-100">
              Height: {profile.heightCm} cm
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2 font-bold text-slate-900">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span>Matches Computed for {counts.total} Active Vacancies</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setStatusFilter('All')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center space-x-2 ${
            statusFilter === 'All'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          <span>All Vacancies</span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">
            {counts.total}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter('Eligible')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center space-x-2 ${
            statusFilter === 'Eligible'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>🟢 Eligible</span>
          <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full text-[10px]">
            {counts.eligible}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter('Possibly Eligible')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center space-x-2 ${
            statusFilter === 'Possibly Eligible'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>🟡 Possibly Eligible</span>
          <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full text-[10px]">
            {counts.possible}
          </span>
        </button>

        <button
          onClick={() => setStatusFilter('Not Eligible')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center space-x-2 ${
            statusFilter === 'Not Eligible'
              ? 'bg-rose-700 text-white shadow-xs'
              : 'bg-white text-rose-800 border border-rose-200 hover:bg-rose-50'
          }`}
        >
          <XCircle className="w-4 h-4 text-rose-400" />
          <span>🔴 Not Eligible</span>
          <span className="bg-rose-100 text-rose-900 px-2 py-0.5 rounded-full text-[10px]">
            {counts.notEligible}
          </span>
        </button>
      </div>

      {/* Matched Job Cards */}
      <div className="space-y-4">
        {filteredResults.map(({ job, status, score, reasons, warnings }) => (
          <div
            key={job.id}
            className={`bg-white rounded-3xl p-6 border shadow-xs transition-all flex flex-col lg:flex-row lg:items-start justify-between gap-6 ${
              status === 'Eligible'
                ? 'border-emerald-300 hover:border-emerald-500 bg-emerald-50/10'
                : status === 'Possibly Eligible'
                ? 'border-amber-300 hover:border-amber-500 bg-amber-50/10'
                : 'border-slate-200 hover:border-rose-300 opacity-90'
            }`}
          >
            <div className="space-y-3 flex-grow">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Status Pill */}
                {status === 'Eligible' && (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>🟢 100% Eligible</span>
                  </span>
                )}
                {status === 'Possibly Eligible' && (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300 flex items-center space-x-1">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>🟡 Possibly Eligible — Check Notification</span>
                  </span>
                )}
                {status === 'Not Eligible' && (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-900 border border-rose-300 flex items-center space-x-1">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>🔴 Not Eligible</span>
                  </span>
                )}

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {job.type} Govt
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-100">
                  {job.qualification}
                </span>
              </div>

              {/* Title & Org */}
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                  {job.title}
                </h3>
                <p className="text-xs text-slate-500 font-bold mt-0.5">{job.organization}</p>
              </div>

              {/* Key Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-slate-400 font-semibold block">Total Vacancy</span>
                  <strong className="text-slate-900 font-bold">{job.vacancy}</strong>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Age Limit</span>
                  <strong className="text-slate-900 font-bold">{job.age}</strong>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Salary / Grade</span>
                  <strong className="text-emerald-700 font-bold">{job.salary}</strong>
                </div>
              </div>

              {/* Rules Evaluation Reasons */}
              <div className="space-y-1.5 pt-1 text-xs">
                <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px]">
                  Smart Rules Evaluation Breakdown:
                </h4>
                <ul className="space-y-1">
                  {reasons.map((r, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start ${
                        r.startsWith('Underage') || r.startsWith('Overage') || r.startsWith('Branch Mismatch') || r.startsWith('Educational') || r.startsWith('Physical Criteria')
                          ? 'text-rose-700 font-bold'
                          : 'text-slate-700 font-medium'
                      }`}
                    >
                      {r.startsWith('Underage') || r.startsWith('Overage') || r.startsWith('Branch Mismatch') || r.startsWith('Educational') || r.startsWith('Physical Criteria') ? (
                        <XCircle className="w-3.5 h-3.5 text-rose-600 mr-2 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                      )}
                      <span>{r}</span>
                    </li>
                  ))}

                  {warnings.map((w, idx) => (
                    <li key={`warn-${idx}`} className="flex items-start text-amber-800 font-bold">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 mr-2 shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions Sidebar */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch justify-center gap-2 shrink-0 lg:w-48 pt-2 lg:pt-0">
              <button
                onClick={() => onViewJob(job)}
                className="bg-blue-900 hover:bg-blue-800 text-white font-extrabold px-4 py-3 rounded-xl text-xs transition shadow-xs cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <span>Full Criteria</span>
                <Info className="w-3.5 h-3.5" />
              </button>

              <a
                href={job.appLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold px-4 py-3 rounded-xl text-xs transition shadow-xs cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <span>Apply Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => onSaveJob(job.title)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-xl text-xs transition cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Bookmark</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
