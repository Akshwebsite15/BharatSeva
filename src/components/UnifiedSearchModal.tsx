import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Filter,
  GraduationCap,
  Building2,
  BookOpen,
  Calendar,
  PenSquare,
  Sparkles,
  ChevronRight,
  RotateCcw,
  Star,
  MapPin,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { College, University, CourseDirectoryItem, AdmissionItem, GovExam } from '../types';

interface UnifiedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  colleges: College[];
  universities: University[];
  courses: CourseDirectoryItem[];
  admissions: AdmissionItem[];
  exams: GovExam[];
  onSelectCollege?: (college: College) => void;
  onSelectUniversity?: (university: University) => void;
  onSelectCourse?: (course: CourseDirectoryItem) => void;
  onSelectAdmission?: (admission: AdmissionItem) => void;
  onSelectExam?: (exam: GovExam) => void;
}

export const UnifiedSearchModal: React.FC<UnifiedSearchModalProps> = ({
  isOpen,
  onClose,
  colleges = [],
  universities = [],
  courses = [],
  admissions = [],
  exams = [],
  onSelectCollege,
  onSelectUniversity,
  onSelectCourse,
  onSelectAdmission,
  onSelectExam,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [resultCategory, setResultCategory] = useState<'all' | 'colleges' | 'universities' | 'courses' | 'admissions' | 'exams'>('all');

  // Filter States
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStream, setSelectedStream] = useState<string>('All');
  const [selectedFee, setSelectedFee] = useState<string>('All');

  if (!isOpen) return null;

  // Search Results Calculation
  const filteredColleges = useMemo(() => {
    return colleges.filter((c) => {
      const matchSearch =
        searchTerm === '' ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.coursesOffered.some((co) => co.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchState = selectedState === 'All' || c.state === selectedState;
      const matchType = selectedType === 'All' || c.type === selectedType;
      const matchFee = selectedFee === 'All' || c.feeRangeCategory === selectedFee;
      return matchSearch && matchState && matchType && matchFee;
    });
  }, [colleges, searchTerm, selectedState, selectedType, selectedFee]);

  const filteredUniversities = useMemo(() => {
    return universities.filter((u) => {
      const matchSearch =
        searchTerm === '' ||
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchState = selectedState === 'All' || u.state === selectedState;
      const matchType = selectedType === 'All' || u.type === selectedType;
      return matchSearch && matchState && matchType;
    });
  }, [universities, searchTerm, selectedState, selectedType]);

  const filteredCourses = useMemo(() => {
    return courses.filter((cr) => {
      const matchSearch =
        searchTerm === '' ||
        cr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cr.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cr.specializations.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchStream = selectedStream === 'All' || cr.stream === selectedStream;
      return matchSearch && matchStream;
    });
  }, [courses, searchTerm, selectedStream]);

  const filteredAdmissions = useMemo(() => {
    return admissions.filter((adm) => {
      const matchSearch =
        searchTerm === '' ||
        adm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adm.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adm.courseName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchState = selectedState === 'All' || adm.state === selectedState;
      return matchSearch && matchState;
    });
  }, [admissions, searchTerm, selectedState]);

  const filteredExams = useMemo(() => {
    return exams.filter((ex) => {
      return (
        searchTerm === '' ||
        ex.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [exams, searchTerm]);

  const totalResultsCount =
    filteredColleges.length +
    filteredUniversities.length +
    filteredCourses.length +
    filteredAdmissions.length +
    filteredExams.length;

  const handleReset = () => {
    setSearchTerm('');
    setSelectedState('All');
    setSelectedType('All');
    setSelectedStream('All');
    setSelectedFee('All');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md overflow-y-auto flex justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-auto flex flex-col max-h-[92vh]">
        
        {/* Search Header */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-950 text-white p-6 sm:p-8 shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors cursor-pointer"
            title="Close Search"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-400 text-amber-950 text-xs font-black px-3 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Universal Search Engine ⭐⭐⭐⭐⭐
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-4">
            Search College, University, Course, Exam & Admissions
          </h2>

          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search college, university, course, exam (e.g. IIT Patna, BCA, B.Tech CSE, JEE Main, AIIMS)..."
              className="w-full bg-white text-slate-900 placeholder-slate-400 font-medium text-sm sm:text-base pl-12 pr-4 py-3.5 rounded-2xl shadow-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 px-6 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-indigo-600" />
              Synced Multi-Criteria Filters
            </span>
            <button onClick={handleReset} className="text-xs text-indigo-600 font-bold underline cursor-pointer">
              Reset Filters
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl p-2 font-medium text-slate-800"
            >
              <option value="All">State: All</option>
              <option value="Bihar">Bihar</option>
              <option value="All India">All India</option>
              <option value="Delhi">Delhi</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl p-2 font-medium text-slate-800"
            >
              <option value="All">Type: All</option>
              <option value="Government">Government</option>
              <option value="Private">Private</option>
              <option value="Central">Central</option>
              <option value="Autonomous">Autonomous</option>
            </select>

            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl p-2 font-medium text-slate-800"
            >
              <option value="All">Stream: All</option>
              <option value="Engineering & Tech">Engineering</option>
              <option value="Computer Applications">BCA / MCA</option>
              <option value="Management">Management</option>
              <option value="Medical">Medical</option>
            </select>

            <select
              value={selectedFee}
              onChange={(e) => setSelectedFee(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl p-2 font-medium text-slate-800"
            >
              <option value="All">Fee: All Ranges</option>
              <option value="Under ₹50k/yr">Under ₹50k/yr</option>
              <option value="₹50k - ₹1.5L/yr">₹50k - ₹1.5L/yr</option>
              <option value="Above ₹3L/yr">Above ₹3L/yr</option>
            </select>
          </div>
        </div>

        {/* Category Result Tabs */}
        <div className="flex border-b border-slate-200 bg-white px-4 sm:px-6 overflow-x-auto shrink-0 scrollbar-none">
          {[
            { id: 'all', label: 'All Results', count: totalResultsCount, icon: Search },
            { id: 'colleges', label: 'Colleges', count: filteredColleges.length, icon: GraduationCap },
            { id: 'universities', label: 'Universities', count: filteredUniversities.length, icon: Building2 },
            { id: 'courses', label: 'Courses', count: filteredCourses.length, icon: BookOpen },
            { id: 'admissions', label: 'Admissions', count: filteredAdmissions.length, icon: Calendar },
            { id: 'exams', label: 'Exams', count: filteredExams.length, icon: PenSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = resultCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setResultCategory(tab.id as any)}
                className={`py-3 px-3 font-semibold text-xs flex items-center gap-1.5 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-800'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results Body */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* Colleges Results */}
          {(resultCategory === 'all' || resultCategory === 'colleges') && filteredColleges.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                Colleges ({filteredColleges.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredColleges.map((col) => (
                  <div
                    key={col.id}
                    onClick={() => {
                      onClose();
                      onSelectCollege?.(col);
                    }}
                    className="bg-white border border-slate-200 hover:border-indigo-400 p-4 rounded-xl shadow-2xs hover:shadow-md transition-all cursor-pointer flex justify-between items-start"
                  >
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{col.name}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        {col.city}, {col.state} • <span className="text-indigo-700 font-semibold">{col.type}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Universities Results */}
          {(resultCategory === 'all' || resultCategory === 'universities') && filteredUniversities.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-indigo-600" />
                Universities ({filteredUniversities.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredUniversities.map((uni) => (
                  <div
                    key={uni.id}
                    onClick={() => {
                      onClose();
                      onSelectUniversity?.(uni);
                    }}
                    className="bg-white border border-slate-200 hover:border-indigo-400 p-4 rounded-xl shadow-2xs hover:shadow-md transition-all cursor-pointer flex justify-between items-start"
                  >
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{uni.name}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        {uni.city}, {uni.state} • <span className="text-indigo-700 font-semibold">{uni.type}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Courses Results */}
          {(resultCategory === 'all' || resultCategory === 'courses') && filteredCourses.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                Courses & Degrees ({filteredCourses.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredCourses.map((crs) => (
                  <div
                    key={crs.id}
                    onClick={() => {
                      onClose();
                      onSelectCourse?.(crs);
                    }}
                    className="bg-white border border-slate-200 hover:border-indigo-400 p-4 rounded-xl shadow-2xs hover:shadow-md transition-all cursor-pointer flex justify-between items-start"
                  >
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{crs.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Degree: <strong className="text-indigo-700">{crs.degree}</strong> • Avg CTC: <strong className="text-emerald-700">{crs.avgStartingSalaryLpa}</strong>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Admissions Results */}
          {(resultCategory === 'all' || resultCategory === 'admissions') && filteredAdmissions.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-600" />
                Admission Drives ({filteredAdmissions.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredAdmissions.map((adm) => (
                  <div
                    key={adm.id}
                    onClick={() => {
                      onClose();
                      onSelectAdmission?.(adm);
                    }}
                    className="bg-white border border-slate-200 hover:border-indigo-400 p-4 rounded-xl shadow-2xs hover:shadow-md transition-all cursor-pointer flex justify-between items-start"
                  >
                    <div>
                      <div className="font-bold text-slate-900 text-sm line-clamp-1">{adm.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        College: {adm.collegeName} • Exam: <strong className="text-indigo-700">{adm.entranceExam}</strong>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exams Results */}
          {(resultCategory === 'all' || resultCategory === 'exams') && filteredExams.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                <PenSquare className="w-4 h-4 text-indigo-600" />
                Entrance & Recruitment Exams ({filteredExams.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredExams.map((ex) => (
                  <div
                    key={ex.id}
                    onClick={() => {
                      onClose();
                      onSelectExam?.(ex);
                    }}
                    className="bg-white border border-slate-200 hover:border-indigo-400 p-4 rounded-xl shadow-2xs hover:shadow-md transition-all cursor-pointer flex justify-between items-start"
                  >
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{ex.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Category: {ex.category} • Status: <strong className="text-emerald-700">{ex.status}</strong>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {totalResultsCount === 0 && (
            <div className="text-center py-12 text-slate-500 text-sm">
              No matching records found for "{searchTerm}". Try resetting filters or changing terms.
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex justify-between items-center shrink-0">
          <span className="text-xs text-slate-500 font-medium">
            Found {totalResultsCount} total records across search index
          </span>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
          >
            Close Search
          </button>
        </div>

      </div>
    </div>
  );
};
