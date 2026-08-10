import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  ShieldCheck,
  Bookmark,
  ExternalLink,
  ArrowRight,
  IndianRupee,
  Users,
  Award,
} from 'lucide-react';
import { GovJob, JurisdictionState } from '../types';

interface JobsTabProps {
  jobs: GovJob[];
  selectedJurisdiction: JurisdictionState;
  onViewJob: (job: GovJob) => void;
  onSaveJob: (title: string, type: 'Job') => void;
}

export const JobsTab: React.FC<JobsTabProps> = ({
  jobs,
  selectedJurisdiction,
  onViewJob,
  onSaveJob,
}) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [qualFilter, setQualFilter] = useState<string>('All');

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const matchSearch =
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.organization.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === 'All' || j.type === typeFilter;
      const matchQual = qualFilter === 'All' || j.qualification.includes(qualFilter);
      return matchSearch && matchType && matchQual;
    });
  }, [jobs, search, typeFilter, qualFilter]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-teal-600 font-extrabold uppercase tracking-wider text-xs">
          CAREERS & VACANCIES
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Government Job Recruitment Portal
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Browse verified Central and Bihar state government vacancies filtered by qualification, age limit, pay scale, and exam pattern.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-xs border border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Search Jobs</label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Police, Teacher, BPSC, RRB..."
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Jurisdiction</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Recruitment (Bihar & Central)</option>
            <option value="Bihar">Bihar State Govt Jobs</option>
            <option value="Central">Central Govt Jobs (SSC/RRB/ISRO)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Qualification</label>
          <select
            value={qualFilter}
            onChange={(e) => setQualFilter(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Qualifications</option>
            <option value="10th">10th Pass</option>
            <option value="12th">12th Pass / Intermediate</option>
            <option value="Graduate">Graduate (BA/BSc/BCom)</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => {
              setSearch('');
              setTypeFilter('All');
              setQualFilter('All');
            }}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-teal-500 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-100">
                  {job.type} Job
                </span>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {job.qualification}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 leading-snug">
                {job.title}
              </h3>
              <p className="text-xs text-slate-500 mb-4 font-semibold">{job.organization}</p>

              <div className="space-y-2 text-xs text-slate-600 mb-6 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 flex items-center">
                    <Users className="w-3.5 h-3.5 mr-1 text-blue-600" /> Total Vacancies:
                  </span>
                  <strong className="text-slate-900 font-extrabold">{job.vacancy}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 flex items-center">
                    <Award className="w-3.5 h-3.5 mr-1 text-purple-600" /> Age Limit:
                  </span>
                  <strong className="text-slate-900 font-bold">{job.age}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 flex items-center">
                    <IndianRupee className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Pay Scale:
                  </span>
                  <strong className="text-emerald-700 font-bold">{job.salary}</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => onViewJob(job)}
                className="flex-grow bg-slate-100 hover:bg-blue-900 hover:text-white text-slate-800 font-bold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Job Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onSaveJob(job.title, 'Job')}
                aria-label="Bookmark Job"
                title="Bookmark Job"
                className="p-3 bg-slate-100 hover:bg-teal-50 text-slate-600 hover:text-teal-700 rounded-xl transition cursor-pointer shrink-0"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
