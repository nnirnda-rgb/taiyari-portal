'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Castle, 
  Mountain, 
  FlaskConical, 
  Scale, 
  Languages, 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Bookmark, 
  BookmarkCheck, 
  Lightbulb, 
  Sparkles, 
  HelpCircle,
  Award,
  Layers,
  GraduationCap
} from 'lucide-react';
import { 
  PRACTICE_EXAMS, 
  PRACTICE_SUBJECTS, 
  PRACTICE_QUESTIONS, 
  PracticeQuestion 
} from '@/data/practiceQuestionsData';
import { RecruitmentBoard } from '@/data/rajasthanExams';

interface TaiyariPracticeModeProps {
  initialExamId?: string;
}

export default function TaiyariPracticeMode({ initialExamId = 'all' }: TaiyariPracticeModeProps) {
  const [selectedExamId, setSelectedExamId] = useState<string>(initialExamId);
  const [selectedBoardFilter, setSelectedBoardFilter] = useState<RecruitmentBoard | 'all'>('all');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<{ [qId: string]: boolean }>({});
  const [isEnglish, setIsEnglish] = useState<boolean>(false);

  // Filter questions based on selected Exam & Subject
  const filteredQuestions = PRACTICE_QUESTIONS.filter((q) => {
    const examMatch = selectedExamId === 'all' || q.examIds.includes(selectedExamId) || q.examIds.includes('all');
    const subjectMatch = selectedSubjectId === 'all' || q.subjectId === selectedSubjectId;
    return examMatch && subjectMatch;
  });

  // Ensure current index is within bounds of filtered list
  const safeIndex = Math.min(currentQuestionIndex, Math.max(0, filteredQuestions.length - 1));
  const currentQuestion: PracticeQuestion | undefined = filteredQuestions[safeIndex];

  // Subject icon mapper
  const renderSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Castle': return <Castle className="w-4 h-4 text-amber-600" />;
      case 'Mountain': return <Mountain className="w-4 h-4 text-emerald-600" />;
      case 'FlaskConical': return <FlaskConical className="w-4 h-4 text-cyan-600" />;
      case 'Scale': return <Scale className="w-4 h-4 text-blue-600" />;
      case 'Languages': return <Languages className="w-4 h-4 text-indigo-600" />;
      default: return <BookOpen className="w-4 h-4 text-blue-600" />;
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    if (!currentQuestion) return;
    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: optionIndex
    });
  };

  const handleResetCurrentQuestion = () => {
    if (!currentQuestion) return;
    const updated = { ...userAnswers };
    delete updated[currentQuestion.id];
    setUserAnswers(updated);
  };

  const toggleBookmark = () => {
    if (!currentQuestion) return;
    setBookmarkedQuestions({
      ...bookmarkedQuestions,
      [currentQuestion.id]: !bookmarkedQuestions[currentQuestion.id]
    });
  };

  // Stats calculation
  const totalInFilter = filteredQuestions.length;
  const answeredCount = filteredQuestions.filter(q => userAnswers[q.id] !== undefined).length;
  const correctCount = filteredQuestions.filter(q => userAnswers[q.id] === q.correctOptionIndex).length;
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden text-slate-800">
      
      {/* 1. Practice Mode Top Control Header */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 p-4 sm:p-5 text-white border-b-2 border-amber-400">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                अभ्यास मोड • Practice Mode
              </span>
              <span className="text-xs text-blue-200 font-semibold hidden sm:inline">
                बिना किसी टाइमर के शांत व गहन अध्ययन
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide flex items-center gap-2">
              <span>प्रतियोगी परीक्षा अभ्यास संबल</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </h3>
          </div>

          {/* Quick Metrics & Language Switcher */}
          <div className="flex items-center gap-3 flex-wrap">
            
            {/* Live Progress Pill */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-xl text-xs flex items-center gap-3">
              <div>
                <span className="text-blue-200 text-[10px] block">हल किए प्रश्न</span>
                <strong className="text-white font-mono">{answeredCount} / {totalInFilter}</strong>
              </div>
              <div className="w-px h-6 bg-white/20"></div>
              <div>
                <span className="text-blue-200 text-[10px] block">सटीकता (Accuracy)</span>
                <strong className="text-amber-300 font-mono">{accuracy}%</strong>
              </div>
            </div>

            {/* Language Toggle */}
            <button
              onClick={() => setIsEnglish(!isEnglish)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl shadow-md transition-all active:scale-95"
              title="प्रश्न की भाषा बदलें (Toggle Hindi/English)"
            >
              <Languages className="w-4 h-4 text-slate-900" />
              <span>{isEnglish ? 'हिंदी में पढ़ें' : 'Read in English'}</span>
            </button>

          </div>

        </div>
      </div>

      {/* 2. Interactive Selection Bars: Exam & Subject */}
      <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 space-y-4">
        
        {/* Exam Selection: Board Filter + Dropdown + Pills */}
        <div className="space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-blue-700" />
              1. परीक्षा का चयन करें (Select Target Exam):
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-blue-800 font-bold bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">
                {PRACTICE_EXAMS.find(e => e.id === selectedExamId)?.nameHindi || 'सभी परीक्षाएं'}
              </span>
            </div>
          </div>

          {/* Quick Board Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-bold text-slate-500 uppercase flex-shrink-0">बोर्ड:</span>
            {[
              { id: 'all', label: 'सभी बोर्ड (All)' },
              { id: 'RPSC', label: 'RPSC' },
              { id: 'RSSB', label: 'RSSB' },
              { id: 'Police', label: 'पुलिस संवर्ग' },
              { id: 'High Court', label: 'हाईकोर्ट' },
              { id: 'Health/Energy', label: 'स्वास्थ्य/ऊर्जा' },
            ].map(b => (
              <button
                key={b.id}
                onClick={() => {
                  setSelectedBoardFilter(b.id as any);
                  if (b.id !== 'all') {
                    const firstInBoard = PRACTICE_EXAMS.find(e => (e as any).board === b.id);
                    if (firstInBoard) setSelectedExamId(firstInBoard.id);
                  }
                }}
                className={`text-[10px] px-2.5 py-1 rounded-lg font-bold transition-all flex-shrink-0 border ${
                  selectedBoardFilter === b.id
                    ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Comprehensive 45+ Exams Dropdown */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative w-full flex-1">
              <select
                value={selectedExamId}
                onChange={(e) => {
                  setSelectedExamId(e.target.value);
                  setCurrentQuestionIndex(0);
                }}
                className="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-xs"
              >
                <option value="all">🔍 सभी राजस्थान परीक्षाएं (All 45+ Exams Combined)</option>
                
                <optgroup label="📋 RPSC (राजस्थान लोक सेवा आयोग, अजमेर)">
                  {PRACTICE_EXAMS.filter(e => (e as any).board === 'RPSC').map(e => (
                    <option key={e.id} value={e.id}>
                      RPSC: {e.nameHindi}
                    </option>
                  ))}
                </optgroup>

                <optgroup label="📋 RSSB (राजस्थान कर्मचारी चयन बोर्ड, जयपुर)">
                  {PRACTICE_EXAMS.filter(e => (e as any).board === 'RSSB').map(e => (
                    <option key={e.id} value={e.id}>
                      RSSB: {e.nameHindi}
                    </option>
                  ))}
                </optgroup>

                <optgroup label="📋 राजस्थान पुलिस एवं होमगार्ड संवर्ग">
                  {PRACTICE_EXAMS.filter(e => (e as any).board === 'Police').map(e => (
                    <option key={e.id} value={e.id}>
                      पुलिस: {e.nameHindi}
                    </option>
                  ))}
                </optgroup>

                <optgroup label="📋 राजस्थान उच्च न्यायालय (High Court Jodhpur)">
                  {PRACTICE_EXAMS.filter(e => (e as any).board === 'High Court').map(e => (
                    <option key={e.id} value={e.id}>
                      हाईकोर्ट: {e.nameHindi}
                    </option>
                  ))}
                </optgroup>

                <optgroup label="📋 चिकित्सा, स्वास्थ्य एवं विद्युत/ऊर्जा निगम">
                  {PRACTICE_EXAMS.filter(e => (e as any).board === 'Health/Energy').map(e => (
                    <option key={e.id} value={e.id}>
                      स्वास्थ्य/ऊर्जा: {e.nameHindi}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Quick Featured Exam Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {PRACTICE_EXAMS
              .filter(e => selectedBoardFilter === 'all' || (e as any).board === selectedBoardFilter || e.id === 'all')
              .slice(0, 12)
              .map((exam) => {
                const isSelected = selectedExamId === exam.id;
                return (
                  <button
                    key={exam.id}
                    onClick={() => {
                      setSelectedExamId(exam.id);
                      setCurrentQuestionIndex(0);
                    }}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-blue-900 text-white border-blue-900 shadow-md ring-2 ring-blue-500/20'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{isEnglish ? exam.nameEnglish : exam.nameHindi}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-black ${
                      isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {exam.badge}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>

        {/* Subject Selection Chips */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5 uppercase tracking-wider">
              <Layers className="w-4 h-4 text-amber-600" />
              2. विषय का चयन करें (Select Subject):
            </span>
            <span className="text-[11px] text-amber-900 font-semibold bg-amber-100/70 px-2 py-0.5 rounded">
              {PRACTICE_SUBJECTS.find(s => s.id === selectedSubjectId)?.nameHindi}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {PRACTICE_SUBJECTS.map((sub) => {
              const isSelected = selectedSubjectId === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubjectId(sub.id);
                    setCurrentQuestionIndex(0);
                  }}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="p-0.5 rounded bg-slate-50 border border-slate-200">
                    {renderSubjectIcon(sub.icon)}
                  </span>
                  <span>{isEnglish ? sub.nameEnglish : sub.nameHindi}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 3. Question Area Displayed One-by-One (No Timer) */}
      {filteredQuestions.length > 0 && currentQuestion ? (
        <div className="p-5 sm:p-8 space-y-6">
          
          {/* Question Top Meta Bar */}
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <span className="bg-blue-900 text-white font-black text-xs px-3 py-1.5 rounded-lg shadow-sm">
                प्रश्न संख्या: {safeIndex + 1} / {totalInFilter}
              </span>

              <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200">
                {currentQuestion.topic}
              </span>

              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                currentQuestion.difficulty === 'सरल' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : currentQuestion.difficulty === 'मध्यम'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {currentQuestion.difficulty}
              </span>
            </div>

            {/* Source Reference & Bookmark */}
            <div className="flex items-center gap-2">
              {currentQuestion.sourceExamRef && (
                <span className="text-[11px] text-blue-900 font-semibold bg-blue-50 px-2.5 py-1 rounded border border-blue-200 hidden sm:inline-block">
                  🏛️ {currentQuestion.sourceExamRef}
                </span>
              )}

              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-lg border transition-colors flex items-center gap-1 text-xs font-semibold ${
                  bookmarkedQuestions[currentQuestion.id]
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                }`}
                title={bookmarkedQuestions[currentQuestion.id] ? 'बुकमार्क हटाया गया' : 'महत्वपूर्ण प्रश्न मार्क करें'}
              >
                {bookmarkedQuestions[currentQuestion.id] ? (
                  <BookmarkCheck className="w-4 h-4 text-amber-600 fill-amber-600" />
                ) : (
                  <Bookmark className="w-4 h-4 text-slate-500" />
                )}
                <span className="hidden sm:inline">
                  {bookmarkedQuestions[currentQuestion.id] ? 'सेव्ड' : 'बुकमार्क'}
                </span>
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h4 className="text-base sm:text-xl font-bold text-slate-900 leading-relaxed">
              {isEnglish ? currentQuestion.questionEnglish : currentQuestion.questionHindi}
            </h4>
            
            {/* Bilingual hint subtitle */}
            <p className="text-xs text-slate-500 mt-1 italic">
              {isEnglish 
                ? `(हिन्दी: ${currentQuestion.questionHindi})` 
                : `(English: ${currentQuestion.questionEnglish})`}
            </p>
          </div>

          {/* Options (A, B, C, D) with Instant Answer Reveal */}
          <div className="space-y-3">
            {(isEnglish ? currentQuestion.optionsEnglish : currentQuestion.optionsHindi).map((optText, optIdx) => {
              const selectedOpt = userAnswers[currentQuestion.id];
              const isSelectedByUser = selectedOpt === optIdx;
              const hasAnswered = selectedOpt !== undefined;
              const isCorrectOption = optIdx === currentQuestion.correctOptionIndex;
              const optLetter = String.fromCharCode(65 + optIdx); // A, B, C, D

              let buttonStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
              let badgeStyle = 'bg-slate-200 text-slate-800';

              if (hasAnswered) {
                if (isCorrectOption) {
                  // The correct answer is always highlighted in green once answered
                  buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/30';
                  badgeStyle = 'bg-emerald-600 text-white';
                } else if (isSelectedByUser && !isCorrectOption) {
                  // User chose an incorrect answer
                  buttonStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold ring-2 ring-rose-400/30';
                  badgeStyle = 'bg-rose-600 text-white';
                } else {
                  // Other unselected incorrect options
                  buttonStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  badgeStyle = 'bg-slate-200 text-slate-500';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={hasAnswered}
                  className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base transition-all flex items-center justify-between group shadow-2xs ${buttonStyle}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 transition-colors ${badgeStyle}`}>
                      {optLetter}
                    </span>
                    <span className="leading-snug">{optText}</span>
                  </div>

                  {/* Instant Icon indicator */}
                  {hasAnswered && (
                    <div className="flex-shrink-0 ml-2">
                      {isCorrectOption ? (
                        <div className="flex items-center gap-1 text-xs text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>सही उत्तर</span>
                        </div>
                      ) : isSelectedByUser ? (
                        <div className="flex items-center gap-1 text-xs text-rose-700 font-bold bg-rose-100 px-2 py-0.5 rounded-full">
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>आपका उत्तर</span>
                        </div>
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* 4. Detailed Explanation Box (Appears Instantly When an Option is Selected) */}
          {userAnswers[currentQuestion.id] !== undefined && (
            <div className="mt-6 p-5 sm:p-6 bg-gradient-to-r from-blue-50 via-indigo-50/50 to-slate-50 border-2 border-blue-200 rounded-2xl shadow-sm animate-in fade-in slide-in-from-top-2 duration-300 space-y-3.5">
              
              {/* Explanation Title Header */}
              <div className="flex items-center justify-between flex-wrap gap-2 pb-2.5 border-b border-blue-200">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-900 text-white">
                    <Lightbulb className="w-4 h-4 text-amber-300" />
                  </div>
                  <h5 className="font-extrabold text-blue-950 text-sm sm:text-base">
                    {isEnglish ? 'Detailed Authentic Explanation & Concept' : 'प्रामाणिक उत्तर व्याख्या एवं मुख्य अवधारणा'}
                  </h5>
                </div>

                <div className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    सही उत्तर: विकल्प {String.fromCharCode(65 + currentQuestion.correctOptionIndex)}
                  </span>
                </div>
              </div>

              {/* Detailed Explanation Text */}
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal whitespace-pre-line text-justify">
                {isEnglish ? currentQuestion.explanationEnglish : currentQuestion.explanationHindi}
              </p>

              {/* Memory Trick / Important Key Fact Callout */}
              {currentQuestion.importantFactHindi && (
                <div className="mt-2 p-3 bg-amber-50/90 border border-amber-300 rounded-xl text-xs text-amber-950 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black text-amber-900">परीक्षा उपयोगी ट्रिक / मुख्य तथ्य: </span>
                    <span className="font-medium">{currentQuestion.importantFactHindi}</span>
                  </div>
                </div>
              )}

              {/* Retry / Reset Button for retention practice */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleResetCurrentQuestion}
                  className="flex items-center gap-1.5 text-xs text-blue-900 hover:text-blue-700 bg-white hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 font-bold transition-colors shadow-2xs"
                  title="इस प्रश्न का उत्तर पुनः दें"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
                  <span>पुनः हल करें (Try Again)</span>
                </button>
              </div>

            </div>
          )}

          {/* 5. Navigation Controls: Next / Previous & Question Carousel */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Prev Question */}
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, safeIndex - 1))}
              disabled={safeIndex === 0}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>पिछला प्रश्न</span>
            </button>

            {/* Quick Question Jump Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full scrollbar-none">
              {filteredQuestions.map((q, idx) => {
                const isCurrent = safeIndex === idx;
                const isAnswered = userAnswers[q.id] !== undefined;
                const isCorrect = userAnswers[q.id] === q.correctOptionIndex;

                let dotColor = 'bg-slate-100 text-slate-700 border-slate-200';
                if (isCurrent) {
                  dotColor = 'bg-blue-900 text-white border-blue-900 ring-2 ring-amber-400 font-black';
                } else if (isAnswered) {
                  dotColor = isCorrect 
                    ? 'bg-emerald-500 text-white border-emerald-600 font-bold' 
                    : 'bg-rose-500 text-white border-rose-600 font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all flex items-center justify-center flex-shrink-0 ${dotColor}`}
                    title={`प्रश्न ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Next Question */}
            <button
              onClick={() => setCurrentQuestionIndex(Math.min(totalInFilter - 1, safeIndex + 1))}
              disabled={safeIndex === totalInFilter - 1}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
            >
              <span>अगला प्रश्न</span>
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>

        </div>
      ) : (
        /* Empty state when no questions match filter */
        <div className="text-center py-16 px-6 bg-slate-50">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-800">
            चयनित परीक्षा एवं विषय के लिए प्रश्न संकलित किए जा रहे हैं
          </h4>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            कृपया &lsquo;सभी परीक्षाएं&rsquo; या &lsquo;सभी विषय&rsquo; का चयन करें ताकि आप उपलब्ध सभी अभ्यास प्रश्नों को हल कर सकें।
          </p>
          <button
            onClick={() => {
              setSelectedExamId('all');
              setSelectedSubjectId('all');
              setCurrentQuestionIndex(0);
            }}
            className="mt-4 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-sm"
          >
            सभी प्रश्न देखें
          </button>
        </div>
      )}

    </div>
  );
}
