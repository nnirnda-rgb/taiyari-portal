'use client';

import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  HelpCircle, 
  Trophy, 
  ChevronLeft, 
  ChevronRight, 
  Flag,
  Sparkles,
  BookOpen,
  Cloud
} from 'lucide-react';
import { SAMPLE_MOCK_QUESTIONS, QuizQuestion } from '@/data/portalData';
import { saveStudentTestHistory, getOrCreateStudentId } from '@/services/firestoreService';

export default function QuizEngine() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<{ [key: number]: boolean }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [showEnglish, setShowEnglish] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  const currentQ: QuizQuestion = SAMPLE_MOCK_QUESTIONS[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQ.id]: optIdx
    });
  };

  const handleToggleFlag = () => {
    setFlaggedQuestions({
      ...flaggedQuestions,
      [currentQ.id]: !flaggedQuestions[currentQ.id]
    });
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setIsSubmitted(false);
    setTimeLeft(600);
    setCurrentIdx(0);
  };

  // Score Calculation
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  SAMPLE_MOCK_QUESTIONS.forEach((q) => {
    const ans = selectedAnswers[q.id];
    if (ans === undefined || ans === 4) {
      // 4 is Option E (अनुत्तरित प्रश्न)
      unattemptedCount++;
    } else if (ans === q.correctOptionIndex) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  // 2 marks per question, 1/3 negative marking (0.66 marks deducted)
  const totalMarks = (correctCount * 2) - (incorrectCount * 0.66);
  const maxPossibleMarks = SAMPLE_MOCK_QUESTIONS.length * 2;
  const accuracy = (correctCount + incorrectCount > 0) 
    ? Math.round((correctCount / (correctCount + incorrectCount)) * 100) 
    : 0;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Firebase Cloud & 4G Cache Persistence
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle');
  const [cloudSynced, setCloudSynced] = useState<boolean>(false);

  useEffect(() => {
    if (isSubmitted && saveStatus === 'idle') {
      setSaveStatus('saving');
      const studentId = getOrCreateStudentId();

      const subjectMap: Record<string, { total: number; correct: number; incorrect: number; unattempted: number }> = {};
      SAMPLE_MOCK_QUESTIONS.forEach((q) => {
        const subj = q.subject || 'सामान्य ज्ञान';
        if (!subjectMap[subj]) {
          subjectMap[subj] = { total: 0, correct: 0, incorrect: 0, unattempted: 0 };
        }
        subjectMap[subj].total++;
        const ans = selectedAnswers[q.id];
        if (ans === undefined || ans === 4) {
          subjectMap[subj].unattempted++;
        } else if (ans === q.correctOptionIndex) {
          subjectMap[subj].correct++;
        } else {
          subjectMap[subj].incorrect++;
        }
      });

      const subjectStrengths = Object.entries(subjectMap).map(([subject, data]) => {
        const attempted = data.correct + data.incorrect;
        const subjAcc = attempted > 0 ? Math.round((data.correct / attempted) * 100) : 0;
        let status: 'Strong' | 'Average' | 'Needs Improvement' = 'Average';
        if (subjAcc >= 75) status = 'Strong';
        else if (subjAcc < 50) status = 'Needs Improvement';
        return {
          subject,
          ...data,
          accuracy: subjAcc,
          status,
        };
      });

      const fifthOptionCount = Object.values(selectedAnswers).filter(a => a === 4).length;

      saveStudentTestHistory({
        attemptId: `quick_quiz_${Date.now()}`,
        studentId,
        studentName: 'परीक्षार्थी (अभ्यर्थी)',
        testId: 'rsmssb-cet-sample-01',
        testTitle: 'अभ्यास परीक्षा संबल टेस्ट - 5वां विकल्प पैटर्न (8 प्रश्न)',
        examBoard: 'RSMSSB / RPSC',
        score: Number(totalMarks.toFixed(2)),
        totalMarks: maxPossibleMarks,
        percentage: Number(((totalMarks / maxPossibleMarks) * 100).toFixed(1)),
        totalAttempted: SAMPLE_MOCK_QUESTIONS.length - unattemptedCount,
        correctCount,
        incorrectCount,
        negativeMarksDeducted: Number((incorrectCount * 0.66).toFixed(2)),
        unattemptedCount,
        fifthOptionCount,
        accuracy,
        timeTakenSeconds: 600 - timeLeft,
        submittedAt: new Date().toISOString(),
        subjectStrengths,
        answers: selectedAnswers,
      }).then((res) => {
        setSaveStatus('saved');
        setCloudSynced(res.cloudSynced);
      }).catch((err) => {
        console.warn('Failed to save attempt:', err);
        setSaveStatus('failed');
      });
    }
  }, [isSubmitted, saveStatus, selectedAnswers, correctCount, incorrectCount, unattemptedCount, totalMarks, maxPossibleMarks, accuracy, timeLeft]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden text-slate-800">
      
      {/* Test Engine Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-4 sm:p-5 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
              RPSC / RSMSSB 5-विकल्प पैटर्न
            </span>
            <span className="text-xs text-blue-200 font-semibold hidden sm:inline">
              सामान्य ज्ञान एवं राजस्थान विशेष
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <span>अभ्यास परीक्षा संबल टेस्ट</span>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-400/30 font-semibold">
              लाइव
            </span>
          </h3>
        </div>

        {/* Right Header Stats & Timer */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setShowEnglish(!showEnglish)}
            className="text-xs bg-white/10 hover:bg-white/20 text-blue-100 px-2.5 py-1.5 rounded-lg border border-white/20 transition-colors font-semibold"
          >
            {showEnglish ? 'हिंदी में देखें' : 'View in English'}
          </button>

          {/* Countdown Clock */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono font-bold text-sm shadow-inner ${
            timeLeft < 120 
              ? 'bg-rose-600 text-white animate-pulse' 
              : 'bg-blue-950 text-amber-300 border border-blue-700'
          }`}>
            <Clock className="w-4 h-4" />
            <span>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>

          {!isSubmitted && (
            <button
              onClick={() => {
                if (confirm('क्या आप निश्चित रूप से टेस्ट सबमिट करना चाहते हैं?')) {
                  setIsSubmitted(true);
                }
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-lg shadow transition-colors"
            >
              सबमिट करें
            </button>
          )}
        </div>
      </div>

      {/* Main Test Area (Question and Options OR Results) */}
      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          
          {/* Left Column: Active Question & Options (8 cols) */}
          <div className="lg:col-span-8 p-6 flex flex-col justify-between space-y-6">
            
            <div>
              {/* Question Meta Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    प्रश्न संख्या {currentIdx + 1} / {SAMPLE_MOCK_QUESTIONS.length}
                  </span>
                  <span className="text-slate-500 font-medium hidden sm:inline">
                    विषय: <strong>{currentQ.subject}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleFlag}
                    className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded border transition-colors ${
                      flaggedQuestions[currentQ.id]
                        ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                        : 'text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>{flaggedQuestions[currentQ.id] ? 'समीक्षा हेतु चिह्नित' : 'मार्क करें'}</span>
                  </button>
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                    +2.0 अंक
                  </span>
                  <span className="text-[11px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-bold">
                    -0.66 अंक
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <div className="mt-4">
                <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {showEnglish && currentQ.questionEnglish ? currentQ.questionEnglish : currentQ.questionHindi}
                </h4>
                {showEnglish && currentQ.questionEnglish && (
                  <p className="text-xs text-slate-500 mt-1 italic">
                    (हिंदी: {currentQ.questionHindi})
                  </p>
                )}
              </div>

              {/* Options (A, B, C, D, E) */}
              <div className="mt-6 space-y-2.5">
                {currentQ.options.map((opt, optIndex) => {
                  const isSelected = selectedAnswers[currentQ.id] === optIndex;
                  const optLetter = String.fromCharCode(65 + optIndex); // A, B, C, D, E
                  const isOptionE = optIndex === 4;

                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleSelectOption(optIndex)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between group ${
                        isSelected
                          ? isOptionE 
                            ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold shadow-sm'
                            : 'bg-blue-50 border-blue-600 text-blue-950 font-bold shadow-sm'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                          isSelected
                            ? isOptionE
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-blue-700 text-white'
                            : 'bg-slate-200 text-slate-700 group-hover:bg-slate-300'
                        }`}>
                          {optLetter}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isSelected && (
                        <CheckCircle className={`w-4 h-4 flex-shrink-0 ${isOptionE ? 'text-amber-600' : 'text-blue-700'}`} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* 5th Option Explanatory Tip */}
              <div className="mt-4 p-2.5 bg-amber-50/80 border border-amber-200 rounded-lg text-[11px] text-amber-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>
                  <strong>RPSC / RSMSSB 5वां विकल्प नियम:</strong> यदि आप प्रश्न हल नहीं करना चाहते हैं, तो विकल्प &lsquo;E&rsquo; (अनुत्तरित प्रश्न) चुनना अनिवार्य है।
                </span>
              </div>
            </div>

            {/* Bottom Nav Controls */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                disabled={currentIdx === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>पिछला प्रश्न</span>
              </button>

              <button
                onClick={() => setCurrentIdx(Math.min(SAMPLE_MOCK_QUESTIONS.length - 1, currentIdx + 1))}
                disabled={currentIdx === SAMPLE_MOCK_QUESTIONS.length - 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-blue-900 hover:bg-blue-800 text-white disabled:opacity-40"
              >
                <span>अगला प्रश्न</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Question Palette & Instructions (4 cols) */}
          <div className="lg:col-span-4 p-6 bg-slate-50 flex flex-col justify-between space-y-6">
            <div>
              <h5 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider mb-3">
                प्रश्न पैलेट (Question Palette)
              </h5>

              {/* Grid of question buttons */}
              <div className="grid grid-cols-4 gap-2">
                {SAMPLE_MOCK_QUESTIONS.map((q, idx) => {
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  const isFlagged = flaggedQuestions[q.id];
                  const isCurrent = currentIdx === idx;

                  let btnStyle = 'bg-white border-slate-300 text-slate-700';
                  if (isCurrent) {
                    btnStyle = 'ring-2 ring-blue-600 font-black border-blue-600';
                  }
                  if (isAnswered) {
                    btnStyle += ' bg-emerald-500 text-white border-emerald-600 font-bold';
                  } else if (isFlagged) {
                    btnStyle += ' bg-amber-400 text-slate-950 border-amber-500 font-bold';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(idx)}
                      className={`h-10 rounded-lg text-xs font-bold flex items-center justify-center border shadow-xs transition-transform active:scale-95 ${btnStyle}`}
                      title={`प्रश्न ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-4 border-t border-slate-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="w-3.5 h-3.5 rounded bg-emerald-500"></span>
                  <span>उत्तर दिया हुआ ({Object.keys(selectedAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="w-3.5 h-3.5 rounded bg-amber-400"></span>
                  <span>रिव्यू हेतु मार्क ({Object.values(flaggedQuestions).filter(Boolean).length})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="w-3.5 h-3.5 rounded bg-white border border-slate-300"></span>
                  <span>शेष प्रश्न ({SAMPLE_MOCK_QUESTIONS.length - Object.keys(selectedAnswers).length})</span>
                </div>
              </div>

            </div>

            {/* Quick Submit Block */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-center space-y-2">
              <span className="text-[11px] text-slate-500 block font-medium">
                कुल समय सीमा: 10 मिनट
              </span>
              <button
                onClick={() => {
                  if (confirm('क्या आप टेस्ट समाप्त कर अपना परिणाम देखना चाहते हैं?')) {
                    setIsSubmitted(true);
                  }
                }}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-lg shadow-sm transition-all"
              >
                टेस्ट समाप्त एवं परिणाम देखें
              </button>
            </div>

          </div>

        </div>
      ) : (
        /* Results and Answer Explanations View */
        <div className="p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
          
          {/* Score Header Card */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 p-6 rounded-2xl text-white shadow-lg text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Trophy className="w-40 h-40 text-amber-400" />
            </div>

            <div className="flex items-center justify-center gap-2 flex-wrap mb-2">
              <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                आपका टेस्ट परिणाम पत्रक (Scorecard)
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-white/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-white/20">
                <Cloud className="w-3 h-3 text-emerald-300" />
                {saveStatus === 'saving' && 'सुरक्षित हो रहा है...'}
                {saveStatus === 'saved' && (cloudSynced ? 'Firebase क्लाउड पर सुरक्षित' : '4G ऑफलाइन स्टोरेज में सुरक्षित')}
                {saveStatus === 'failed' && 'स्थानीय 4G कैश में सुरक्षित'}
                {saveStatus === 'idle' && 'डेटाबेस सुरक्षित'}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white">
              प्राप्तांक: {totalMarks.toFixed(2)} / {maxPossibleMarks} अंक
            </h3>

            <p className="text-xs sm:text-sm text-blue-200 mt-1">
              शुद्धता (Accuracy): <strong>{accuracy}%</strong> • कुल हल प्रश्न: {SAMPLE_MOCK_QUESTIONS.length - unattemptedCount} / {SAMPLE_MOCK_QUESTIONS.length}
            </p>

            {/* Scorecard Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/15">
                <div className="text-[11px] text-blue-200">सही उत्तर:</div>
                <div className="text-xl font-black text-emerald-400 mt-0.5">{correctCount}</div>
                <div className="text-[10px] text-emerald-300">+{correctCount * 2} अंक</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/15">
                <div className="text-[11px] text-blue-200">गलत उत्तर:</div>
                <div className="text-xl font-black text-rose-400 mt-0.5">{incorrectCount}</div>
                <div className="text-[10px] text-rose-300">-{(incorrectCount * 0.66).toFixed(2)} अंक</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/15">
                <div className="text-[11px] text-blue-200">अनुत्तरित (Opt E):</div>
                <div className="text-xl font-black text-amber-400 mt-0.5">{unattemptedCount}</div>
                <div className="text-[10px] text-slate-300">0 कटौती</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/15">
                <div className="text-[11px] text-blue-200">शेष समय:</div>
                <div className="text-xl font-black text-white mt-0.5">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-slate-300">10 मिनट में से</div>
              </div>
            </div>

            {/* Retake test button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleResetQuiz}
                className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>पुनः टेस्ट दें (Retake Test)</span>
              </button>
            </div>
          </div>

          {/* Detailed Question Review & Solutions */}
          <div>
            <h4 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-700" />
              विस्तृत प्रामाणिक व्याख्या एवं हल (Detailed Solutions):
            </h4>

            <div className="space-y-4">
              {SAMPLE_MOCK_QUESTIONS.map((q, qIndex) => {
                const userAns = selectedAnswers[q.id];
                const isCorrect = userAns === q.correctOptionIndex;
                const isUnattempted = userAns === undefined || userAns === 4;

                return (
                  <div 
                    key={q.id}
                    className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-bold text-sm sm:text-base text-slate-900">
                        <span className="text-blue-900 mr-2">प्रश्न {qIndex + 1}.</span>
                        {q.questionHindi}
                      </div>

                      <div className="flex-shrink-0">
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> सही (+2)
                          </span>
                        ) : isUnattempted ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md">
                            <HelpCircle className="w-3.5 h-3.5 text-amber-600" /> अनुत्तरित (0)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-800 bg-rose-100 px-2.5 py-1 rounded-md">
                            <XCircle className="w-3.5 h-3.5 text-rose-600" /> गलत (-0.66)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Options status */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, optI) => {
                        const isCorrectOpt = optI === q.correctOptionIndex;
                        const isUserChoice = userAns === optI;

                        let style = 'bg-white border-slate-200 text-slate-700';
                        if (isCorrectOpt) {
                          style = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                        } else if (isUserChoice && !isCorrectOpt) {
                          style = 'bg-rose-50 border-rose-300 text-rose-950 font-bold line-through';
                        }

                        return (
                          <div key={optI} className={`p-2 rounded-lg border flex items-center justify-between ${style}`}>
                            <span>{String.fromCharCode(65 + optI)}. {opt}</span>
                            {isCorrectOpt && <span className="text-[10px] text-emerald-700 font-bold">सही उत्तर</span>}
                            {isUserChoice && !isCorrectOpt && <span className="text-[10px] text-rose-700 font-bold">आपका चयन</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-lg text-xs text-blue-950">
                      <strong className="text-blue-900 block mb-0.5">प्रामाणिक व्याख्या:</strong>
                      {q.explanationHindi}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
