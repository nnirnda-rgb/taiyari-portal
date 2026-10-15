'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Layers, 
  GraduationCap, 
  Shield, 
  Scale, 
  Zap, 
  Search, 
  Filter, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink,
  Users,
  Calendar,
  Clock,
  Play,
  Check,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Stethoscope,
  Terminal,
  Award,
  Download
} from 'lucide-react';
import { 
  RAJASTHAN_EXAMS_DIRECTORY, 
  BOARD_CATEGORIES, 
  QUALIFICATION_FILTER_OPTIONS,
  CET_FILTER_OPTIONS,
  RajasthanExam, 
  RecruitmentBoard,
  QualificationLevel,
  CETStatus
} from '@/data/rajasthanExams';
import RajasthanExamDetailModal from './RajasthanExamDetailModal';
import { subscribeToSyllabi } from '@/services/firestoreService';
import { downloadWithFallback } from '@/lib/downloadEngine';

interface RajasthanExamHubsProps {
  onStartQuiz: (examId?: string) => void;
  onStartPractice: (examId?: string) => void;
  initialBoard?: RecruitmentBoard | 'all';
  searchFilter?: string;
}

export default function RajasthanExamHubs({
  onStartQuiz,
  onStartPractice,
  initialBoard = 'all',
  searchFilter = ''
}: RajasthanExamHubsProps) {
  const [allExams, setAllExams] = useState<RajasthanExam[]>(RAJASTHAN_EXAMS_DIRECTORY);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedBoard, setSelectedBoard] = useState<RecruitmentBoard | 'all'>(initialBoard);
  const [selectedQual, setSelectedQual] = useState<QualificationLevel | 'all'>('all');
  const [selectedCet, setSelectedCet] = useState<CETStatus | 'all'>('all');
  const [localSearch, setLocalSearch] = useState<string>(searchFilter);
  const [selectedExam, setSelectedExam] = useState<RajasthanExam | null>(null);

  // Real-time Firestore Syllabus & Exams Listener with Skeleton Loader
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToSyllabi(
      (realtimeExams) => {
        if (realtimeExams && realtimeExams.length > 0) {
          setAllExams(realtimeExams);
        }
        setIsLoading(false);
      },
      (error) => {
        console.warn('Realtime syllabi listener fallback to local directory:', error);
        setIsLoading(false);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  // Filtered Exam List
  const filteredExams = useMemo(() => {
    return allExams.filter((exam) => {
      // 1. Board filter
      if (selectedBoard !== 'all' && exam.board !== selectedBoard) {
        return false;
      }

      // 2. Qualification level filter
      if (selectedQual !== 'all' && exam.qualificationLevel !== selectedQual) {
        return false;
      }

      // 3. CET filter
      if (selectedCet !== 'all' && exam.cetStatus !== selectedCet) {
        return false;
      }

      // 4. Search query filter
      const query = (localSearch || searchFilter).trim().toLowerCase();
      if (query) {
        const matchesName = exam.name.toLowerCase().includes(query);
        const matchesNameEng = exam.nameEnglish.toLowerCase().includes(query);
        const matchesDept = exam.department.toLowerCase().includes(query);
        const matchesBoard = exam.board.toLowerCase().includes(query);
        const matchesQual = exam.minQualification.toLowerCase().includes(query);
        const matchesCet = exam.cetStatus.toLowerCase().includes(query);
        if (!matchesName && !matchesNameEng && !matchesDept && !matchesBoard && !matchesQual && !matchesCet) {
          return false;
        }
      }

      return true;
    });
  }, [allExams, selectedBoard, selectedQual, selectedCet, localSearch, searchFilter]);

  // Board Icon Helper
  const renderBoardIcon = (board: RecruitmentBoard | 'all') => {
    switch (board) {
      case 'RPSC': return <GraduationCap className="w-4 h-4" />;
      case 'RSSB': return <Layers className="w-4 h-4" />;
      case 'Police': return <Shield className="w-4 h-4" />;
      case 'High Court': return <Scale className="w-4 h-4" />;
      case 'Health/Energy': return <Zap className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4 text-amber-300" />;
    }
  };

  // Helper for Board Badges
  const getBoardBadgeClass = (board: RecruitmentBoard) => {
    switch (board) {
      case 'RPSC': return 'bg-indigo-100 text-indigo-900 border-indigo-200';
      case 'RSSB': return 'bg-emerald-100 text-emerald-900 border-emerald-200';
      case 'Police': return 'bg-rose-100 text-rose-900 border-rose-200';
      case 'High Court': return 'bg-amber-100 text-amber-950 border-amber-300';
      case 'Health/Energy': return 'bg-cyan-100 text-cyan-950 border-cyan-300';
      default: return 'bg-blue-100 text-blue-900 border-blue-200';
    }
  };

  // Helper for CET Badges
  const renderCetBadge = (status: CETStatus) => {
    switch (status) {
      case 'Non-CET':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
            <ShieldCheck className="w-3 h-3" />
            बिना CET सीधी भर्ती
          </span>
        );
      case 'Direct':
        return (
          <span className="inline-flex items-center gap-1 bg-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
            <CheckCircle2 className="w-3 h-3" />
            सीधी भर्ती (No CET)
          </span>
        );
      case 'CET-Graduation':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-700 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
            <Shield className="w-3 h-3 text-amber-300" />
            CET स्नातक लागू
          </span>
        );
      case 'CET-12th':
        return (
          <span className="inline-flex items-center gap-1 bg-purple-700 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
            <Shield className="w-3 h-3 text-purple-200" />
            CET 12वीं स्तर लागू
          </span>
        );
    }
  };

  // Helper for Qualification Badges
  const renderQualificationBadge = (level: QualificationLevel, qualificationText: string) => {
    let color = 'bg-slate-100 text-slate-800 border-slate-200';
    let label = 'स्नातक';

    if (level === '10th') {
      color = 'bg-amber-50 text-amber-900 border-amber-300 font-bold';
      label = '10वीं पास';
    } else if (level === '12th') {
      color = 'bg-blue-50 text-blue-900 border-blue-300 font-bold';
      label = '12वीं पास';
    } else if (level === 'graduate') {
      color = 'bg-indigo-50 text-indigo-900 border-indigo-300 font-bold';
      label = 'स्नातक (Graduate)';
    } else if (level === 'technical') {
      color = 'bg-cyan-50 text-cyan-900 border-cyan-300 font-bold';
      label = 'इंजीनियरिंग / ITI / डिप्लोमा';
    } else if (level === 'law') {
      color = 'bg-rose-50 text-rose-900 border-rose-300 font-bold';
      label = 'विधि स्नातक (LL.B.)';
    } else if (level === 'medical') {
      color = 'bg-teal-50 text-teal-900 border-teal-300 font-bold';
      label = 'मेडिकल / नर्सिंग / फार्मेसी';
    } else if (level === 'teaching') {
      color = 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold';
      label = 'B.Ed / D.El.Ed (शिक्षक)';
    }

    return (
      <span className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full border ${color}`} title={qualificationText}>
        <GraduationCap className="w-3 h-3" />
        {label}
      </span>
    );
  };

  return (
    <section 
      id="rajasthan-exams-hub" 
      className="py-12 px-4 sm:px-6 bg-slate-50 border-b border-slate-200 scroll-mt-14"
      aria-label="राजस्थान भर्ती महा-संग्रह"
    >
      {/* Invisible anchor points for backward compatibility with old links */}
      <div id="rsmssb-hub" className="sr-only" aria-hidden="true" />
      <div id="rpsc-hub" className="sr-only" aria-hidden="true" />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                राजस्थान भर्ती महा-संग्रह (Recruitment Directory)
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                सभी 5 प्रमुख बोर्ड्स • 45+ आधिकारिक भर्ती परीक्षाएं
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              राजस्थान भर्ती महा-संग्रह — प्रामाणिक परीक्षा हब्स
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              RPSC, RSSB, राजस्थान पुलिस, उच्च न्यायालय (जोधपुर), एवं स्वास्थ्य/विद्युत निगम की समस्त भर्तियों का 
              नवीनतम पाठ्यक्रम, पद संख्या, शैक्षणिक योग्यता एवं CET स्थिति का सम्पूर्ण विवरण।
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex-shrink-0">
            <div className="text-center px-2">
              <div className="text-xl font-black text-blue-900 font-mono">45+</div>
              <div className="text-[10px] text-slate-500 font-bold">कुल परीक्षाएं</div>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="text-center px-2">
              <div className="text-xl font-black text-emerald-600 font-mono">5</div>
              <div className="text-[10px] text-slate-500 font-bold">भर्ती बोर्ड</div>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="text-center px-2">
              <div className="text-xl font-black text-amber-600 font-mono">100%</div>
              <div className="text-[10px] text-slate-500 font-bold">निःशुल्क पोर्टल</div>
            </div>
          </div>
        </div>

        {/* 1. Primary Board Filter Tabs */}
        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-blue-700" />
            <span>1. भर्ती बोर्ड का चयन करें (Select Recruitment Board):</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {BOARD_CATEGORIES.map((cat) => {
              const isSelected = selectedBoard === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedBoard(cat.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'bg-blue-950 text-white border-blue-950 shadow-md ring-2 ring-blue-500/20'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/10 text-amber-300' : 'bg-slate-100 text-slate-600'}`}>
                      {renderBoardIcon(cat.id)}
                    </span>
                    <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {cat.count}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs font-black leading-tight">
                      {cat.labelHindi}
                    </div>
                    <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>
                      {cat.labelEnglish}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Interactive Search & Secondary Quick Filters */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          
          {/* Search Bar + Quick Clear */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="परीक्षा का नाम, विभाग, योग्यता (10वीं/12वीं/स्नातक) या CET स्थिति खोजें..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-10 pr-24 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-800 placeholder-slate-400 transition-all shadow-inner"
              />
              {localSearch && (
                <button
                  onClick={() => setLocalSearch('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-700 bg-slate-200 px-2 py-0.5 rounded"
                >
                  हटाएं (Clear)
                </button>
              )}
            </div>

            {/* Results Counter */}
            <div className="flex-shrink-0 text-xs font-semibold text-slate-600 bg-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-200">
              प्रदर्शित परीक्षाएं: <strong className="text-blue-900 font-mono font-bold text-sm">{filteredExams.length}</strong> / {RAJASTHAN_EXAMS_DIRECTORY.length}
            </div>
          </div>

          {/* Secondary Quick Filter Pills: Qualification & CET */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-3 border-t border-slate-100">
            
            {/* Qualification Filter Row */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-wrap">
              <span className="text-[11px] font-bold text-slate-500 mr-1 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
                योग्यता:
              </span>
              {QUALIFICATION_FILTER_OPTIONS.map((q) => {
                const isSelected = selectedQual === q.id;
                return (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQual(q.id)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg font-bold transition-all border ${
                      isSelected
                        ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {q.labelHindi}
                  </button>
                );
              })}
            </div>

            {/* CET Status Filter Row */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-wrap">
              <span className="text-[11px] font-bold text-slate-500 mr-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                CET:
              </span>
              {CET_FILTER_OPTIONS.map((c) => {
                const isSelected = selectedCet === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCet(c.id)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg font-bold transition-all border ${
                      isSelected
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {c.labelHindi}
                  </button>
                );
              })}
            </div>

          </div>

        </div>

        {/* 3. Empty State Fallback */}
        {filteredExams.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              कोई परीक्षा नहीं मिली (No Exams Found)
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              आपके द्वारा चुने गए फ़िल्टर या खोज शब्द के लिए कोई परीक्षा नहीं मिली। कृपया फ़िल्टर रीसेट करें।
            </p>
            <button
              onClick={() => {
                setSelectedBoard('all');
                setSelectedQual('all');
                setSelectedCet('all');
                setLocalSearch('');
              }}
              className="bg-blue-900 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-blue-800 transition-colors"
            >
              सभी फ़िल्टर रीसेट करें (Show All 45 Exams)
            </button>
          </div>
        )}

        {/* 4. Exams Directory Cards Grid & Skeleton Loader */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 animate-pulse">
                <div className="flex justify-between">
                  <div className="h-5 w-20 bg-slate-200 rounded" />
                  <div className="h-5 w-24 bg-slate-200 rounded" />
                </div>
                <div className="h-6 w-3/4 bg-slate-200 rounded" />
                <div className="h-4 w-1/2 bg-slate-100 rounded" />
                <div className="h-14 w-full bg-slate-100 rounded-xl" />
                <div className="h-9 w-full bg-slate-200 rounded-xl pt-2" />
              </div>
            ))}
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-gov-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Top Details */}
              <div className="p-5">
                
                {/* Board + CET Badge Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-md border uppercase tracking-wider ${getBoardBadgeClass(exam.board)}`}>
                    {exam.board}
                  </span>
                  <div>
                    {renderCetBadge(exam.cetStatus)}
                  </div>
                </div>

                {/* Exam Title */}
                <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                  {exam.name}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 mb-3 line-clamp-1">
                  {exam.nameEnglish}
                </p>

                {/* Qualification Badge */}
                <div className="mb-3 flex flex-wrap gap-1.5 items-center">
                  {renderQualificationBadge(exam.qualificationLevel, exam.minQualification)}
                  <span className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {exam.status}
                  </span>
                </div>

                {/* Description Excerpt */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {exam.description}
                </p>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span className="truncate">{exam.totalPosts || 'विज्ञप्ति अनुसार'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{exam.totalMarks} कुल अंक</span>
                  </div>
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="p-3 bg-slate-50/80 border-t border-slate-200 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedExam(exam)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-blue-900 hover:text-white bg-white hover:bg-blue-900 border border-slate-300 hover:border-blue-900 py-2 px-2.5 rounded-xl transition-all shadow-2xs group/btn"
                  title="विस्तृत पाठ्यक्रम व परीक्षा पैटर्न देखें"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-800 group-hover/btn:text-amber-300" />
                  <span>विवरण व पाठ्यक्रम</span>
                </button>

                <button
                  onClick={() => onStartPractice(exam.id)}
                  className="inline-flex items-center justify-center gap-1 text-xs font-bold text-slate-700 hover:text-blue-900 bg-white hover:bg-slate-100 border border-slate-200 py-2 px-2.5 rounded-xl transition-colors shadow-2xs"
                  title="इस परीक्षा के अभ्यास प्रश्न हल करें"
                >
                  <span>अभ्यास</span>
                  <ArrowRight className="w-3 h-3 text-blue-600" />
                </button>

                <button
                  onClick={() => onStartQuiz(exam.id)}
                  className="inline-flex items-center justify-center gap-1 text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 py-2 px-3 rounded-xl shadow-xs transition-all active:scale-95"
                  title="ऑनलाइन प्रोक्टर्ड CBT मॉक टेस्ट प्रारंभ करें"
                >
                  <Play className="w-3 h-3 fill-slate-950" />
                  <span>मॉक टेस्ट</span>
                </button>
              </div>

            </div>
          ))}
        </div>
        )}

        {/* Bottom Educational Guidance Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white rounded-2xl p-5 sm:p-6 shadow-lg border-2 border-amber-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-400/30">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>समान पात्रता परीक्षा (CET) गाइडेंस डेस्क</span>
            </div>
            <h4 className="text-lg font-black text-white">
              कौनसी भर्ती बिना CET की है और कौनसी CET के अंतर्गत?
            </h4>
            <p className="text-xs text-blue-100 leading-relaxed max-w-2xl">
              पशु परिचर (5,934 पद), आरएसी/एमबीसी बटालियन, हाईकोर्ट क्लर्क, REET एवं तकनीकी भर्तियां <strong>पूर्णतः बिना CET सीधी भर्ती</strong> हैं। 
              पटवारी, पुलिस कांस्टेबल व कनिष्ठ सहायक हेतु CET पात्रता नियम लागू हैं।
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => {
                setSelectedCet('Direct');
                setSelectedQual('all');
                setSelectedBoard('all');
              }}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
            >
              बिना CET सीधी भर्तियां देखें ({RAJASTHAN_EXAMS_DIRECTORY.filter(e => e.cetStatus === 'Direct' || e.cetStatus === 'Non-CET').length})
            </button>
          </div>
        </div>

      </div>

      {/* Complete Exam Detail & Syllabus Modal */}
      <RajasthanExamDetailModal
        exam={selectedExam}
        isOpen={Boolean(selectedExam)}
        onClose={() => setSelectedExam(null)}
        onStartPractice={(examId) => onStartPractice(examId)}
        onStartQuiz={(examId) => onStartQuiz(examId)}
      />
    </section>
  );
}
