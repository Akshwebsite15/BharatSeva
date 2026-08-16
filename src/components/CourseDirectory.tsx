import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  GraduationCap,
  BookOpen,
  DollarSign,
  Award,
  Layers,
  Clock,
  Briefcase,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Building2,
  TrendingUp,
  MapPin,
  Check,
} from 'lucide-react';
import { CourseDirectoryItem, College } from '../types';
import { initialCoursesData } from '../data/coursesData';
import { initialCollegesData } from '../data/collegesUniversitiesData';
import { CourseDetailPage } from './CourseDetailPage';
import { CollegeCourseDetailPage } from './CollegeCourseDetailPage';

interface CourseDirectoryProps {
  courses?: CourseDirectoryItem[];
  colleges?: College[];
  onSelectCollege?: (college: College) => void;
}

export const CourseDirectory: React.FC<CourseDirectoryProps> = ({
  courses = initialCoursesData,
  colleges = initialCollegesData,
  onSelectCollege,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDegree, setSelectedDegree] = useState<string>('All');
  const [selectedStream, setSelectedStream] = useState<string>('All');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('All');
  const [selectedDuration, setSelectedDuration] = useState<string>('All');
  const [selectedFeeCategory, setSelectedFeeCategory] = useState<string>('All');
  const [selectedExam, setSelectedExam] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');

  // Modal State for Course Detail
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<CourseDirectoryItem | null>(null);

  // Modal State for College + Course Page
  const [collegeCourseContext, setCollegeCourseContext] = useState<{
    college: College;
    courseName: string;
  } | null>(null);

  const degreeOptions = [
    'All',
    'B.Tech',
    'BCA',
    'BBA',
    'B.Sc',
    'B.Com',
    'BA',
    'MBA',
    'MCA',
    'M.Tech',
    'Diploma/Polytechnic',
    'MBBS',
    'LLB',
    'B.Pharm',
  ];

  const streamOptions = [
    'All',
    'Engineering & Tech',
    'Computer Applications',
    'Management',
    'Science',
    'Commerce',
    'Arts & Humanities',
    'Medical',
    'Law',
    'Pharmacy',
  ];

  const durationOptions = ['All', '3 Years', '4 Years', '2 Years', '5 Years', '5.5 Years'];
  const feeCategoryOptions = ['All', 'Under ₹30k/yr', '₹30k - ₹1L/yr', '₹1L - ₹2.5L/yr', 'Above ₹2.5L/yr'];
  const examOptions = ['All', 'JEE Advanced', 'JEE Main', 'CUET UG', 'CUET PG', 'CAT', 'NIMCET', 'NEET UG', 'CLAT', 'BCECE'];
  const stateOptions = ['All', 'Bihar', 'All India', 'Delhi', 'Uttar Pradesh'];

  // Extract all specializations from courses
  const specializationOptions = useMemo(() => {
    const specsSet = new Set<string>();
    courses.forEach((c) => {
      c.specializations?.forEach((s) => specsSet.add(s));
    });
    return ['All', ...Array.from(specsSet)];
  }, [courses]);

  // Filter Logic
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      // Search filter
      const matchesSearch =
        searchTerm === '' ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.overview.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.specializations.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

      // Degree filter
      const matchesDegree = selectedDegree === 'All' || c.degree === selectedDegree;

      // Stream filter
      const matchesStream = selectedStream === 'All' || c.stream === selectedStream;

      // Specialization filter
      const matchesSpecialization =
        selectedSpecialization === 'All' ||
        c.specializations.some((s) => s.toLowerCase().includes(selectedSpecialization.toLowerCase()));

      // Duration filter
      const matchesDuration =
        selectedDuration === 'All' || c.durationText.includes(selectedDuration);

      // Fee category filter
      const matchesFeeCategory = selectedFeeCategory === 'All' || c.feeCategory === selectedFeeCategory;

      // Exam filter
      const matchesExam =
        selectedExam === 'All' ||
        c.entranceExams.some((ex) => ex.toLowerCase().includes(selectedExam.toLowerCase()));

      // State filter
      const matchesState =
        selectedState === 'All' ||
        c.stateAvailability.some((st) => st.toLowerCase().includes(selectedState.toLowerCase()));

      return (
        matchesSearch &&
        matchesDegree &&
        matchesStream &&
        matchesSpecialization &&
        matchesDuration &&
        matchesFeeCategory &&
        matchesExam &&
        matchesState
      );
    });
  }, [
    courses,
    searchTerm,
    selectedDegree,
    selectedStream,
    selectedSpecialization,
    selectedDuration,
    selectedFeeCategory,
    selectedExam,
    selectedState,
  ]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDegree('All');
    setSelectedStream('All');
    setSelectedSpecialization('All');
    setSelectedDuration('All');
    setSelectedFeeCategory('All');
    setSelectedExam('All');
    setSelectedState('All');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Directory Hero Banner */}
      <section className="bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-indigo-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="bg-amber-400 text-amber-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Comprehensive Course Directory ⭐⭐⭐⭐⭐
            </span>
            <span className="text-xs text-slate-300 font-medium">
              Verified Course Syllabus, Fees, Cutoffs & Placement Guides
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
            Explore Major Academic Courses & Degrees
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed mb-6">
            Compare B.Tech, BCA, BBA, B.Sc, B.Com, BA, MBA, MCA, M.Tech, Diploma, MBBS, LLB & B.Pharm with verified eligibility, semester syllabus, career CTC estimates, top colleges, and state scholarships.
          </p>

          {/* Search Field */}
          <div className="relative max-w-3xl">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search course (e.g., B.Tech CSE, BCA, MBA Finance, Civil Engineering, MBBS)..."
              className="w-full bg-white text-slate-900 placeholder-slate-400 font-medium text-sm sm:text-base pl-12 pr-4 py-3.5 rounded-2xl shadow-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </section>

      {/* Degree Quick Filter Chips */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            Degree:
          </span>
          {degreeOptions.map((deg) => (
            <button
              key={deg}
              onClick={() => setSelectedDegree(deg)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedDegree === deg
                  ? 'bg-indigo-600 text-white shadow-xs scale-102'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {deg}
            </button>
          ))}
        </div>
      </div>

      {/* Main Filter Toolbar & Results */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Filters Grid */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs mb-8">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Filter className="w-4 h-4 text-indigo-600" />
              <span>Multi-Criteria Filters</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-xs">
            {/* Stream */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Stream / Field</label>
              <select
                value={selectedStream}
                onChange={(e) => setSelectedStream(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {streamOptions.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Specialization */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Specialization</label>
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {specializationOptions.slice(0, 15).map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Duration</label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {durationOptions.map((dur) => (
                  <option key={dur} value={dur}>
                    {dur}
                  </option>
                ))}
              </select>
            </div>

            {/* Fees Category */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Fees Range</label>
              <select
                value={selectedFeeCategory}
                onChange={(e) => setSelectedFeeCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {feeCategoryOptions.map((fee) => (
                  <option key={fee} value={fee}>
                    {fee}
                  </option>
                ))}
              </select>
            </div>

            {/* Entrance Exam */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Entrance Exam</label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {examOptions.map((ex) => (
                  <option key={ex} value={ex}>
                    {ex}
                  </option>
                ))}
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">State / Jurisdiction</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {stateOptions.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm font-bold text-slate-800">
            Showing <span className="text-indigo-600">{filteredCourses.length}</span> Courses & Degree Programs
          </div>
          {filteredCourses.length === 0 && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-indigo-600 underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Tags */}
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  <span className="bg-amber-100 text-amber-900 border border-amber-200 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full">
                    {c.degree}
                  </span>
                  <span className="bg-slate-100 text-slate-700 font-semibold text-[11px] px-2.5 py-0.5 rounded-full">
                    {c.stream}
                  </span>
                  <span className="bg-blue-50 text-blue-800 font-semibold text-[11px] px-2 py-0.5 rounded flex items-center gap-1 ml-auto">
                    <Clock className="w-3 h-3" />
                    {c.durationText}
                  </span>
                </div>

                {/* Course Title */}
                <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug mb-2">
                  {c.name}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {c.overview}
                </p>

                {/* Key Metric Pills */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Govt Fee Range</span>
                    <strong className="text-slate-900 font-bold">{c.avgAnnualFeeGovt}</strong>
                  </div>
                  <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-emerald-700 text-[10px] uppercase font-bold block">Avg Starting CTC</span>
                    <strong className="text-emerald-950 font-bold">{c.avgStartingSalaryLpa}</strong>
                  </div>
                </div>

                {/* Entrance Exam Badges */}
                <div className="mb-4">
                  <div className="text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Accepted Exams:</div>
                  <div className="flex flex-wrap gap-1">
                    {c.entranceExams.slice(0, 3).map((ex, i) => (
                      <span key={i} className="bg-indigo-50 text-indigo-800 border border-indigo-100 text-[11px] font-bold px-2 py-0.5 rounded">
                        {ex}
                      </span>
                    ))}
                    {c.entranceExams.length > 3 && (
                      <span className="text-[10px] text-slate-500 font-bold self-center">
                        +{c.entranceExams.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => setSelectedCourseForDetail(c)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  View Full Course Guide ⭐ <ChevronRight className="w-4 h-4" />
                </button>

                {c.topCollegesList?.[0] && (
                  <button
                    onClick={() => {
                      const matchCol = colleges.find(
                        (col) =>
                          col.id === c.topCollegesList[0].collegeId ||
                          col.name.toLowerCase().includes(c.topCollegesList[0].collegeName.toLowerCase())
                      ) || colleges[0];
                      if (matchCol) {
                        setCollegeCourseContext({ college: matchCol, courseName: c.name });
                      }
                    }}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2 px-3 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                    College + Course Page ({c.topCollegesList[0].collegeName})
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Individual Course Page Modal ⭐⭐⭐⭐⭐ */}
      {selectedCourseForDetail && (
        <CourseDetailPage
          course={selectedCourseForDetail}
          onClose={() => setSelectedCourseForDetail(null)}
          collegesList={colleges}
          onOpenCollegeCoursePage={(col, crsName) => {
            setSelectedCourseForDetail(null);
            setCollegeCourseContext({ college: col, courseName: crsName });
          }}
          onSelectCollege={onSelectCollege}
        />
      )}

      {/* College + Course Page Modal ⭐⭐⭐⭐⭐ */}
      {collegeCourseContext && (
        <CollegeCourseDetailPage
          college={collegeCourseContext.college}
          courseName={collegeCourseContext.courseName}
          onClose={() => setCollegeCourseContext(null)}
          onSelectCollege={onSelectCollege}
        />
      )}
    </div>
  );
};
