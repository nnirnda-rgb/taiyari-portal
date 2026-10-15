'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  ShieldAlert, 
  Camera, 
  CameraOff, 
  Maximize2, 
  Minimize2, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Award, 
  TrendingUp, 
  TrendingDown, 
  Check, 
  X, 
  FileText, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles,
  BarChart3,
  Languages,
  Eye,
  AlertOctagon,
  UserCheck,
  Cloud
} from 'lucide-react';
import { 
  CBTQuestion, 
  CBTSection, 
  CBT_SECTIONS, 
  FULL_100_CBT_QUESTIONS 
} from '@/data/cbtExamData';
import { 
  saveStudentTestHistory, 
  getOrCreateStudentId 
} from '@/services/firestoreService';
import { RAJASTHAN_EXAMS_DIRECTORY, RajasthanExam } from '@/data/rajasthanExams';

type QuestionStatus = 'not_visited' | 'not_answered' | 'answered' | 'marked_for_review' | 'answered_and_marked';

interface ProctoredCBTInterfaceProps {
  initialExamId?: string;
}

export default function ProctoredCBTInterface({ initialExamId = 'rssb-patwari' }: ProctoredCBTInterfaceProps) {
  // Target Exam Selection
  const [targetExamId, setTargetExamId] = useState<string>(initialExamId);
  const selectedTargetExam = RAJASTHAN_EXAMS_DIRECTORY.find(e => e.id === targetExamId) || RAJASTHAN_EXAMS_DIRECTORY[0];

  // Test State
  const [isTestStarted, setIsTestStarted] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [currentSectionId, setCurrentSectionId] = useState<string>('sec-raj-gk');
  const [isEnglish, setIsEnglish] = useState<boolean>(false);

  // Responses & Statuses for all 100 questions
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [questionStatuses, setQuestionStatuses] = useState<{ [qId: number]: QuestionStatus }>({});

  // Timer: 120 minutes = 7200 seconds (or standard 60 mins for quick simulation)
  const [timeLeft, setTimeLeft] = useState<number>(7200);

  // Anti-Cheat & Fullscreen Monitoring
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [warningCount, setWarningCount] = useState<number>(0);
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [autoSubmittedDueToCheating, setAutoSubmittedDueToCheating] = useState<boolean>(false);

  // Live Camera Proctoring Feed
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Confirmation Modal
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState<boolean>(false);

  // Initialize first question status
  useEffect(() => {
    if (isTestStarted && questionStatuses[1] === undefined) {
      setQuestionStatuses(prev => ({ ...prev, 1: 'not_answered' }));
    }
  }, [isTestStarted, questionStatuses]);

  // Request Webcam Stream
  const initCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: { ideal: 320 }, height: { ideal: 320 } } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
        setCameraError(null);
      } else {
        setCameraError('कैमरा डिवाइस उपलब्ध नहीं है।');
      }
    } catch (err: any) {
      console.warn('Camera access denied or error:', err);
      setCameraActive(false);
      setCameraError('कैमरा अनुमति अस्वीकृत या अनुपलब्ध है। प्रॉक्टरिंग सिमुलेशन सक्रिय है।');
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // Trigger Anti-Cheat Strike
  const triggerViolation = (reason: string) => {
    if (!isTestStarted || isSubmitted) return;

    setWarningCount(prev => {
      const newCount = prev + 1;
      setWarningMessage(`चेतावनी #${newCount} / 3: ${reason}। परीक्षा नियमों के अनुसार टैब बदलना, मिनिमाइज करना अथवा फुलस्क्रीन छोड़ना पूर्णतः वर्जित है।`);
      setShowWarningModal(true);

      if (newCount >= 3) {
        // Disqualify and Auto Submit
        setAutoSubmittedDueToCheating(true);
        setIsSubmitted(true);
        stopCamera();
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
      }
      return newCount;
    });
  };

  // Fullscreen and Tab Visibility Listeners
  useEffect(() => {
    if (!isTestStarted || isSubmitted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerViolation('टैब बदलना (Tab Switching) या ब्राउज़र मिनिमाइज करना संज्ञान में आया');
      }
    };

    const handleWindowBlur = () => {
      triggerViolation('परीक्षा विंडो से बाहर क्लिक (Window Blur) किया गया');
    };

    const handleFullscreenChange = () => {
      const isFull = !!document.fullscreenElement;
      setIsFullscreen(isFull);
      if (!isFull && isTestStarted && !isSubmitted) {
        triggerViolation('फुलस्क्रीन मोड से बाहर निकलना संज्ञान में आया');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isTestStarted, isSubmitted]);

  // Countdown Timer
  useEffect(() => {
    if (!isTestStarted || isSubmitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          stopCamera();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestStarted, isSubmitted, timeLeft]);

  // Start Exam Handler
  const handleStartExam = async () => {
    // 1. Force Fullscreen
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch (e) {
      console.warn('Fullscreen request failed:', e);
    }

    // 2. Request Camera
    await initCamera();

    // 3. Mark Test Active
    setIsTestStarted(true);
    setCurrentQIndex(0);
  };

  const currentQ: CBTQuestion = FULL_100_CBT_QUESTIONS[currentQIndex];

  // Update Section when Question Changes
  const handleJumpToQuestion = (index: number) => {
    setCurrentQIndex(index);
    const q = FULL_100_CBT_QUESTIONS[index];
    if (q) {
      setCurrentSectionId(q.sectionId);
      // If it was not visited, mark as not answered
      if (!questionStatuses[q.id]) {
        setQuestionStatuses(prev => ({ ...prev, [q.id]: 'not_answered' }));
      }
    }
  };

  // Button Actions
  const handleSaveAndNext = () => {
    const qId = currentQ.id;
    const isAnswered = selectedAnswers[qId] !== undefined;

    setQuestionStatuses(prev => ({
      ...prev,
      [qId]: isAnswered ? 'answered' : 'not_answered'
    }));

    if (currentQIndex < FULL_100_CBT_QUESTIONS.length - 1) {
      handleJumpToQuestion(currentQIndex + 1);
    }
  };

  const handleClearResponse = () => {
    const qId = currentQ.id;
    const newAnswers = { ...selectedAnswers };
    delete newAnswers[qId];
    setSelectedAnswers(newAnswers);

    setQuestionStatuses(prev => ({
      ...prev,
      [qId]: 'not_answered'
    }));
  };

  const handleMarkForReviewAndNext = () => {
    const qId = currentQ.id;
    const isAnswered = selectedAnswers[qId] !== undefined;

    setQuestionStatuses(prev => ({
      ...prev,
      [qId]: isAnswered ? 'answered_and_marked' : 'marked_for_review'
    }));

    if (currentQIndex < FULL_100_CBT_QUESTIONS.length - 1) {
      handleJumpToQuestion(currentQIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQIndex > 0) {
      handleJumpToQuestion(currentQIndex - 1);
    }
  };

  // Result Calculations
  const calculateResults = () => {
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    const subjectStats: { [secId: string]: { total: number; correct: number; incorrect: number; unattempted: number } } = {
      'sec-raj-gk': { total: 0, correct: 0, incorrect: 0, unattempted: 0 },
      'sec-science': { total: 0, correct: 0, incorrect: 0, unattempted: 0 },
      'sec-polity': { total: 0, correct: 0, incorrect: 0, unattempted: 0 },
      'sec-hindi': { total: 0, correct: 0, incorrect: 0, unattempted: 0 },
      'sec-maths': { total: 0, correct: 0, incorrect: 0, unattempted: 0 },
    };

    FULL_100_CBT_QUESTIONS.forEach(q => {
      const userChoice = selectedAnswers[q.id];
      subjectStats[q.sectionId].total++;

      if (userChoice === undefined || userChoice === 4) {
        // Option E or left blank
        unattemptedCount++;
        subjectStats[q.sectionId].unattempted++;
      } else if (userChoice === q.correctOptionIndex) {
        correctCount++;
        subjectStats[q.sectionId].correct++;
      } else {
        incorrectCount++;
        subjectStats[q.sectionId].incorrect++;
      }
    });

    const marksPerQuestion = 2.0;
    const negativePerQuestion = 0.66;
    const grossScore = correctCount * marksPerQuestion;
    const totalNegativeDeduction = incorrectCount * negativePerQuestion;
    const netScore = Math.max(0, grossScore - totalNegativeDeduction);
    const totalMarks = FULL_100_CBT_QUESTIONS.length * marksPerQuestion;
    const totalAttempted = correctCount + incorrectCount;
    const accuracy = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;

    return {
      correctCount,
      incorrectCount,
      unattemptedCount,
      netScore,
      totalMarks,
      totalNegativeDeduction,
      accuracy,
      totalAttempted,
      subjectStats
    };
  };

  const results = calculateResults();

  // Automatic Firebase / 4G Cache Persistence upon test completion
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle');
  const [cloudSynced, setCloudSynced] = useState<boolean>(false);

  useEffect(() => {
    if (isSubmitted && saveStatus === 'idle') {
      setSaveStatus('saving');
      const studentId = getOrCreateStudentId();

      const subjectStrengths = CBT_SECTIONS.map(sec => {
        const stats = results.subjectStats[sec.id] || { total: 0, correct: 0, incorrect: 0, unattempted: 0 };
        const attempted = stats.correct + stats.incorrect;
        const acc = attempted > 0 ? Math.round((stats.correct / attempted) * 100) : 0;
        let status: 'Strong' | 'Average' | 'Needs Improvement' = 'Average';
        if (acc >= 75) status = 'Strong';
        else if (acc < 50) status = 'Needs Improvement';
        return {
          subject: sec.nameHindi,
          ...stats,
          accuracy: acc,
          status,
        };
      });

      const fifthOptionCount = Object.values(selectedAnswers).filter(a => a === 4).length;

      saveStudentTestHistory({
        attemptId: `cbt_100_${Date.now()}`,
        studentId,
        studentName: 'परीक्षार्थी (अभ्यर्थी)',
        testId: `cbt-${selectedTargetExam.id}`,
        testTitle: `${selectedTargetExam.name} - अधिकृत 100 प्रश्न मॉडल CBT`,
        examBoard: selectedTargetExam.board,
        score: Number(results.netScore.toFixed(2)),
        totalMarks: results.totalMarks,
        percentage: Number(((results.netScore / results.totalMarks) * 100).toFixed(1)),
        totalAttempted: results.totalAttempted,
        correctCount: results.correctCount,
        incorrectCount: results.incorrectCount,
        negativeMarksDeducted: Number(results.totalNegativeDeduction.toFixed(2)),
        unattemptedCount: results.unattemptedCount,
        fifthOptionCount,
        accuracy: results.accuracy,
        timeTakenSeconds: 7200 - timeLeft,
        submittedAt: new Date().toISOString(),
        subjectStrengths,
        answers: selectedAnswers,
      }).then(res => {
        setSaveStatus('saved');
        setCloudSynced(res.cloudSynced);
      }).catch(err => {
        console.warn('CBT history save error:', err);
        setSaveStatus('failed');
      });
    }
  }, [isSubmitted, saveStatus, results, selectedAnswers, timeLeft]);

  // Status Counts for Right Palette
  const answeredCount = Object.values(questionStatuses).filter(s => s === 'answered').length;
  const notAnsweredCount = Object.values(questionStatuses).filter(s => s === 'not_answered').length;
  const markedReviewCount = Object.values(questionStatuses).filter(s => s === 'marked_for_review').length;
  const answeredMarkedCount = Object.values(questionStatuses).filter(s => s === 'answered_and_marked').length;
  const notVisitedCount = 100 - (answeredCount + notAnsweredCount + markedReviewCount + answeredMarkedCount);

  // Time format
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  // RENDER 1: INSTRUCTIONS & CAMERA TEST SCREEN (BEFORE STARTING)
  if (!isTestStarted) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-10 max-w-5xl mx-auto my-6 text-slate-800">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="bg-blue-900 text-white font-bold text-xs px-3 py-1 rounded-md uppercase tracking-wider">
                {selectedTargetExam.board} अधिकृत मॉडल CBT
              </span>
              <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-2.5 py-0.5 rounded border border-emerald-200">
                {selectedTargetExam.cetStatus}
              </span>
              <span className="bg-rose-100 text-rose-900 text-xs font-bold px-2.5 py-0.5 rounded border border-rose-200 animate-pulse">
                AI प्रॉक्टरिंग एवं फुलस्क्रीन अनिवार्य
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {selectedTargetExam.name} — ऑनलाइन CBT परीक्षा (100 प्रश्न)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              विभाग: <strong className="text-slate-800">{selectedTargetExam.department}</strong> • योग्यता: <strong className="text-slate-800">{selectedTargetExam.minQualification}</strong>
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 font-black">
              RJ
            </div>
            <div className="text-xs">
              <span className="text-slate-500 block">अभ्यर्थी कोड:</span>
              <strong className="text-slate-900 font-mono">RJ-2024-CBT-8849</strong>
            </div>
          </div>
        </div>

        {/* Target Exam Selector Box */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-2xl mb-6 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
              <span>🎯 अपनी लक्ष्य परीक्षा चुनें (Choose Target Exam for CBT):</span>
            </label>
            <span className="text-[11px] font-semibold text-blue-800 bg-white px-2.5 py-0.5 rounded-full border border-blue-200 shadow-2xs">
              45+ आधिकारिक राजस्थान परीक्षाएं उपलब्ध
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <select
              value={targetExamId}
              onChange={(e) => setTargetExamId(e.target.value)}
              className="w-full bg-white border border-blue-300 rounded-xl py-2.5 px-3 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
            >
              <optgroup label="📋 RPSC (राजस्थान लोक सेवा आयोग, अजमेर)">
                {RAJASTHAN_EXAMS_DIRECTORY.filter(e => e.board === 'RPSC').map(e => (
                  <option key={e.id} value={e.id}>
                    RPSC: {e.name} ({e.cetStatus})
                  </option>
                ))}
              </optgroup>
              <optgroup label="📋 RSSB (राजस्थान कर्मचारी चयन बोर्ड, जयपुर)">
                {RAJASTHAN_EXAMS_DIRECTORY.filter(e => e.board === 'RSSB').map(e => (
                  <option key={e.id} value={e.id}>
                    RSSB: {e.name} ({e.cetStatus})
                  </option>
                ))}
              </optgroup>
              <optgroup label="📋 राजस्थान पुलिस एवं होमगार्ड संवर्ग">
                {RAJASTHAN_EXAMS_DIRECTORY.filter(e => e.board === 'Police').map(e => (
                  <option key={e.id} value={e.id}>
                    पुलिस: {e.name} ({e.cetStatus})
                  </option>
                ))}
              </optgroup>
              <optgroup label="📋 राजस्थान उच्च न्यायालय (High Court Jodhpur)">
                {RAJASTHAN_EXAMS_DIRECTORY.filter(e => e.board === 'High Court').map(e => (
                  <option key={e.id} value={e.id}>
                    हाईकोर्ट: {e.name} ({e.cetStatus})
                  </option>
                ))}
              </optgroup>
              <optgroup label="📋 चिकित्सा, स्वास्थ्य एवं विद्युत/ऊर्जा निगम">
                {RAJASTHAN_EXAMS_DIRECTORY.filter(e => e.board === 'Health/Energy').map(e => (
                  <option key={e.id} value={e.id}>
                    स्वास्थ्य/ऊर्जा: {e.name} ({e.cetStatus})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Exam Specifications Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
            <span className="text-xs text-blue-800 font-semibold block">कुल प्रश्न (Questions)</span>
            <strong className="text-2xl font-black text-blue-950">100 प्रश्न</strong>
            <span className="text-[11px] text-slate-500 block mt-0.5">5 महत्वपूर्ण अनुभाग</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
            <span className="text-xs text-amber-800 font-semibold block">कुल पूर्णांक (Max Marks)</span>
            <strong className="text-2xl font-black text-amber-950">200.00 अंक</strong>
            <span className="text-[11px] text-slate-500 block mt-0.5">+2 अंक प्रति सही उत्तर</span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
            <span className="text-xs text-rose-800 font-semibold block">नकारात्मक अंकन (Negative)</span>
            <strong className="text-2xl font-black text-rose-950">-0.66 अंक</strong>
            <span className="text-[11px] text-rose-700 block mt-0.5">1/3rd निगेटिव (गलत पर)</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-xs text-emerald-800 font-semibold block">समय सीमा (Duration)</span>
            <strong className="text-2xl font-black text-emerald-950">120 मिनट</strong>
            <span className="text-[11px] text-slate-500 block mt-0.5">उल्टी गिनती टाइमर</span>
          </div>
        </div>

        {/* Critical Instructions Checklist */}
        <div className="space-y-4 mb-8">
          <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            प्रॉक्टरिंग एवं परीक्षा नियम (Mandatory Proctored Guidelines):
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
            
            <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <Maximize2 className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block mb-0.5">फुलस्क्रीन अनिवार्य (Forced Fullscreen):</strong>
                टेस्ट प्रारंभ होते ही ब्राउज़र फुलस्क्रीन मोड में लॉक हो जाएगा।
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <AlertOctagon className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block mb-0.5">टैब-स्विचिंग निषेध (Tab Switch Lock):</strong>
                परीक्षा के दौरान नया टैब खोलना या विंडो बदलना वर्जित है (अधिकतम 2 चेतावनियां, 3 पर स्वतः निरस्त)।
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <Camera className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block mb-0.5">लाइव कैमरा प्रॉक्टरिंग (Webcam Surveillance):</strong>
                परीक्षा के दौरान शीर्ष कोने में आपका लाइव कैमरा पूर्वावलोकन सक्रिय रहेगा।
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block mb-0.5">अनिवार्य 5वां विकल्प नियम (Option E):</strong>
                यदि आप प्रश्न हल नहीं करना चाहते, तो विकल्प &lsquo;E&rsquo; (अनुत्तरित प्रश्न) चुनना अनिवार्य है।
              </div>
            </div>

          </div>
        </div>

        {/* Start Button */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
            बटन दबाने पर कैमरा व फुलस्क्रीन अनुमति मांगी जाएगी।
          </div>

          <button
            onClick={handleStartExam}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white font-black text-sm rounded-xl shadow-xl shadow-blue-950/20 hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
          >
            <ShieldAlert className="w-4 h-4 text-amber-300" />
            <span>नियम स्वीकारें एवं CBT परीक्षा शुरू करें</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    );
  }

  // RENDER 2: RESULT DASHBOARD (WHEN SUBMITTED)
  if (isSubmitted) {
    return (
      <div className="bg-slate-50 min-h-screen py-8 px-4 sm:px-6 text-slate-800 max-w-6xl mx-auto">
        
        {/* Anti-Cheat Disqualification Banner if Cheated */}
        {autoSubmittedDueToCheating && (
          <div className="mb-6 p-4 bg-rose-600 text-white rounded-2xl shadow-lg border-2 border-rose-300 flex items-center gap-3 animate-bounce">
            <AlertOctagon className="w-8 h-8 text-white flex-shrink-0" />
            <div>
              <h4 className="font-black text-base">परीक्षा स्वतः निरस्त (Auto-Submitted Due to Policy Violation)</h4>
              <p className="text-xs text-rose-100">
                टैब-स्विचिंग अथवा फुलस्क्रीन उल्लंघन सीमा (3 चेतावनियां) पार होने के कारण आपकी परीक्षा स्वतः सबमिट कर दी गई है।
              </p>
            </div>
          </div>
        )}

        {/* Result Header Card */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden mb-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  आधिकारिक CBT परीक्षा परिणाम पत्रक
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-white/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-white/20">
                  <Cloud className="w-3 h-3 text-emerald-300" />
                  {saveStatus === 'saving' && 'सुरक्षित हो रहा है...'}
                  {saveStatus === 'saved' && (cloudSynced ? 'Firebase क्लाउड पर सुरक्षित' : '4G ऑफलाइन स्टोरेज में सुरक्षित')}
                  {saveStatus === 'failed' && 'स्थानीय 4G कैश में सुरक्षित'}
                  {saveStatus === 'idle' && 'डेटाबेस सुरक्षित'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                प्राप्तांक: {results.netScore.toFixed(2)} / {results.totalMarks.toFixed(2)} अंक
              </h2>
              <p className="text-xs sm:text-sm text-blue-200 mt-1">
                कुल प्रश्न: 100 • हल किए गए प्रश्न: {results.totalAttempted} • अनुत्तरित (Option E): {results.unattemptedCount}
              </p>
            </div>

            {/* Quick Score Badges */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
                <span className="text-[11px] text-blue-200 block">शुद्धता (Accuracy)</span>
                <strong className="text-2xl font-black text-amber-300">{results.accuracy}%</strong>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
                <span className="text-[11px] text-blue-200 block">ऋणात्मक कटौती</span>
                <strong className="text-2xl font-black text-rose-400">-{results.totalNegativeDeduction.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          {/* Detailed Metric Cards Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/15 text-xs">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-blue-200 block">सही उत्तर:</span>
              <strong className="text-lg font-black text-emerald-400">+{results.correctCount * 2} अंक ({results.correctCount})</strong>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-blue-200 block">गलत उत्तर:</span>
              <strong className="text-lg font-black text-rose-400">-{results.totalNegativeDeduction.toFixed(2)} अंक ({results.incorrectCount})</strong>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-blue-200 block">प्रॉक्टरिंग उल्लंघन:</span>
              <strong className={`text-lg font-black ${warningCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {warningCount} स्ट्राइक
              </strong>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-blue-200 block">स्थिति / रैंक अनुमान:</span>
              <strong className="text-lg font-black text-white">मेरिट सूची योग्य</strong>
            </div>
          </div>
        </div>

        {/* Subject-Wise Strength & Weakness Analysis */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-900" />
              <h3 className="text-lg font-bold text-slate-900">
                विषय-वार दक्षता एवं प्रदर्शन विश्लेषण (Subject-Wise Strength Analysis)
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-semibold">5 प्रमुख विषय क्षेत्र</span>
          </div>

          <div className="space-y-4">
            {CBT_SECTIONS.map((sec) => {
              const stat = results.subjectStats[sec.id];
              const secAttempted = stat.correct + stat.incorrect;
              const secAccuracy = secAttempted > 0 ? Math.round((stat.correct / secAttempted) * 100) : 0;
              const isStrong = secAccuracy >= 70;
              const isAverage = secAccuracy >= 40 && secAccuracy < 70;

              return (
                <div key={sec.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {sec.nameHindi}
                      </h4>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {sec.nameEnglish} • कुल प्रश्न: {sec.totalQuestions}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        isStrong 
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : isAverage
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : 'bg-rose-100 text-rose-800 border-rose-300'
                      }`}>
                        {isStrong ? '✓ मजबूत पक्ष (Strong)' : isAverage ? '⚡ मध्यम (Average)' : '⚠️ सुधार आवश्यक (Needs Focus)'}
                      </span>

                      <div className="text-right text-xs">
                        <span className="text-slate-500">सटीकता:</span>
                        <strong className="text-slate-900 ml-1 font-mono">{secAccuracy}%</strong>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
                    <div 
                      className="bg-emerald-500 h-full transition-all duration-500" 
                      style={{ width: `${(stat.correct / sec.totalQuestions) * 100}%` }}
                      title={`सही: ${stat.correct}`}
                    />
                    <div 
                      className="bg-rose-500 h-full transition-all duration-500" 
                      style={{ width: `${(stat.incorrect / sec.totalQuestions) * 100}%` }}
                      title={`गलत: ${stat.incorrect}`}
                    />
                    <div 
                      className="bg-amber-400 h-full transition-all duration-500" 
                      style={{ width: `${(stat.unattempted / sec.totalQuestions) * 100}%` }}
                      title={`अनुत्तरित: ${stat.unattempted}`}
                    />
                  </div>

                  {/* Summary counts */}
                  <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
                    <span>सही: <strong className="text-emerald-700">{stat.correct}</strong></span>
                    <span>गलत: <strong className="text-rose-700">{stat.incorrect}</strong></span>
                    <span>अनुत्तरित: <strong className="text-amber-700">{stat.unattempted}</strong></span>
                    <span>प्राप्तांक: <strong className="text-blue-900">{(stat.correct * 2 - stat.incorrect * 0.66).toFixed(2)}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Retake & Actions Bar */}
        <div className="flex items-center justify-center gap-4 py-4">
          <button
            onClick={() => {
              setIsSubmitted(false);
              setIsTestStarted(false);
              setSelectedAnswers({});
              setQuestionStatuses({});
              setWarningCount(0);
              setTimeLeft(7200);
              setAutoSubmittedDueToCheating(false);
            }}
            className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>पुनः CBT परीक्षा दें (Retake Test)</span>
          </button>
        </div>

      </div>
    );
  }

  // RENDER 3: FULL GOVERNMENT PROCTORED CBT INTERFACE (ACTIVE EXAM)
  return (
    <div className="fixed inset-0 z-50 bg-slate-100 flex flex-col overflow-hidden select-none font-sans">
      
      {/* Anti-Cheat Strike Warning Modal Overlay */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border-2 border-rose-500 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <h4 className="text-xl font-black text-rose-600">
              सुरक्षा चेतावनी (Security Violation)
            </h4>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {warningMessage}
            </p>

            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 font-bold">
              चेतावनी संख्या: {warningCount} / 3 | (3 चेतावनियों पर परीक्षा स्वतः बंद हो जाएगी)
            </div>

            <button
              onClick={() => {
                setShowWarningModal(false);
                // Try requesting fullscreen again
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen().catch(() => {});
                }
              }}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              समझ गया, परीक्षा पर लौटें
            </button>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4 text-slate-800">
            <h4 className="text-lg font-black text-slate-900 pb-2 border-b border-slate-100">
              CBT परीक्षा सबमिट सारांश (Exam Submission Summary)
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                <span className="text-slate-500 block">उत्तर दिया:</span>
                <strong className="text-lg font-black text-emerald-700">{answeredCount}</strong>
              </div>
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl">
                <span className="text-slate-500 block">अनुत्तरित:</span>
                <strong className="text-lg font-black text-rose-700">{notAnsweredCount}</strong>
              </div>
              <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-xl">
                <span className="text-slate-500 block">रिव्यू मार्क:</span>
                <strong className="text-lg font-black text-purple-700">{markedReviewCount + answeredMarkedCount}</strong>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-slate-500 block">नहीं देखा:</span>
                <strong className="text-lg font-black text-slate-700">{notVisitedCount}</strong>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-amber-50 p-3 rounded-xl border border-amber-200">
              <strong>नोट:</strong> सबमिट करने के पश्चात आप अपने उत्तरों में कोई परिवर्तन नहीं कर सकेंगे। आपका अंतिम स्कोरकार्ड एवं विषय-वार दक्षता रिपोर्ट तुरंत प्रदर्शित की जाएगी।
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSubmitConfirmModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                परीक्षा जारी रखें
              </button>
              <button
                onClick={() => {
                  setShowSubmitConfirmModal(false);
                  setIsSubmitted(true);
                  stopCamera();
                  if (document.fullscreenElement) {
                    document.exitFullscreen().catch(() => {});
                  }
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-md"
              >
                हाँ, परीक्षा सबमिट करें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. TOP HEADER (Standard TCS iON / Gov CBT Exam Bar) */}
      <header className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between border-b-2 border-amber-400 flex-shrink-0">
        
        {/* Exam Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center font-black text-white text-xs border border-amber-400">
            CBT
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-black text-white tracking-wide">
              राजस्थान संयुक्त प्रतियोगी CBT परीक्षा 2024-25
            </h1>
            <span className="text-[10px] text-amber-300 font-medium">
              नई सोच, नई पहल • प्रोक्टर्ड परीक्षा कक्ष
            </span>
          </div>
        </div>

        {/* Center: Live Countdown Timer */}
        <div className={`flex items-center gap-2 px-4 py-1 rounded-xl font-mono text-sm sm:text-base font-black shadow-inner border ${
          timeLeft < 300 
            ? 'bg-rose-600 text-white animate-pulse border-rose-400' 
            : 'bg-slate-800 text-amber-300 border-slate-700'
        }`}>
          <Clock className="w-4 h-4 text-amber-400" />
          <span>
            {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>

        {/* Right: Candidate Details & Live Circular Proctoring Camera */}
        <div className="flex items-center gap-4">
          
          {/* Language Toggle */}
          <button
            onClick={() => setIsEnglish(!isEnglish)}
            className="hidden md:flex items-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-blue-200 px-2.5 py-1 rounded-lg border border-slate-700"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{isEnglish ? 'हिंदी' : 'English'}</span>
          </button>

          {/* Candidate Card */}
          <div className="hidden lg:flex items-center gap-2 text-right text-xs">
            <div>
              <strong className="block text-slate-100 text-[11px]">अभ्यर्थी: परीक्षार्थी</strong>
              <span className="text-slate-400 text-[10px] font-mono">RJ-2024-CBT-8849</span>
            </div>
          </div>

          {/* Live Circular Proctoring Camera Preview in Top Corner */}
          <div className="relative flex-shrink-0 group">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-emerald-400 bg-black shadow-lg relative">
              {cameraActive ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover scale-x-[-1]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-400 text-[9px] p-1 text-center">
                  <CameraOff className="w-4 h-4 text-amber-400 mb-0.5" />
                  <span>प्रॉक्टरिंग</span>
                </div>
              )}
            </div>

            {/* Live Green Pulsing Indicator */}
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900 animate-ping"></span>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900"></span>

            {/* Hover Tooltip */}
            <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-slate-950 text-white text-[10px] py-1 px-2 rounded shadow-md whitespace-nowrap z-50">
              {cameraActive ? '✓ AI लाइव प्रॉक्टरिंग सक्रिय' : 'कैमरा मॉनिटरिंग सक्रिय'}
            </div>
          </div>

        </div>

      </header>

      {/* 2. SECTION TABS BAR */}
      <div className="bg-white border-b border-slate-300 px-4 py-1.5 flex items-center justify-between gap-2 overflow-x-auto flex-shrink-0 scrollbar-none">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-500 mr-2 uppercase tracking-wider hidden sm:inline">
            अनुभाग (Sections):
          </span>
          {CBT_SECTIONS.map((sec) => {
            const isSecActive = currentSectionId === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  setCurrentSectionId(sec.id);
                  handleJumpToQuestion(sec.questionRange[0] - 1);
                }}
                className={`flex-shrink-0 px-3 py-1 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                  isSecActive
                    ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{isEnglish ? sec.nameEnglish : sec.nameHindi}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSecActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                }`}>
                  {sec.totalQuestions}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Mode Fullscreen indicator */}
        <div className="flex items-center gap-2 text-xs text-slate-500 flex-shrink-0">
          <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            पूर्ण सुरक्षा मोड सक्रिय
          </span>
        </div>
      </div>

      {/* 3. MAIN WORKSPACE (Split Left Question Area, Right Palette) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT COLUMN: Question Display & Navigation Bar (70% - 75%) */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto bg-white border-r border-slate-300 p-5 sm:p-8">
          
          <div className="space-y-6 max-w-4xl">
            
            {/* Question Header Line */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs">
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-blue-950 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                  Question No. {currentQ.id}
                </span>
                <span className="text-slate-600 font-bold hidden sm:inline">
                  {isEnglish ? currentQ.sectionNameEnglish : currentQ.sectionNameHindi}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  +{currentQ.marks.toFixed(2)} Marks
                </span>
                <span className="text-[11px] text-rose-700 font-bold bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
                  -{currentQ.negativeMarks.toFixed(2)} Marks
                </span>
              </div>
            </div>

            {/* Question Text */}
            <div className="py-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                {isEnglish ? currentQ.questionEnglish : currentQ.questionHindi}
              </h3>
            </div>

            {/* Options List (A, B, C, D, E) */}
            <div className="space-y-3">
              {(isEnglish ? currentQ.optionsEnglish : currentQ.optionsHindi).map((optText, optIdx) => {
                const isSelected = selectedAnswers[currentQ.id] === optIdx;
                const optLetter = String.fromCharCode(65 + optIdx); // A, B, C, D, E
                const isOptionE = optIdx === 4;

                return (
                  <button
                    key={optIdx}
                    onClick={() => {
                      setSelectedAnswers({
                        ...selectedAnswers,
                        [currentQ.id]: optIdx
                      });
                    }}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between group ${
                      isSelected
                        ? isOptionE 
                          ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold shadow-sm ring-2 ring-amber-400/40'
                          : 'bg-blue-50 border-blue-600 text-blue-950 font-bold shadow-sm ring-2 ring-blue-500/40'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                        isSelected
                          ? isOptionE ? 'bg-amber-500 text-slate-950' : 'bg-blue-700 text-white'
                          : 'bg-slate-200 text-slate-700 group-hover:bg-slate-300'
                      }`}>
                        {optLetter}
                      </span>
                      <span>{optText}</span>
                    </div>

                    {isSelected && (
                      <Check className={`w-4 h-4 flex-shrink-0 ${isOptionE ? 'text-amber-600' : 'text-blue-700'}`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* 5th Option Notice Callout */}
            <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>
                <strong>5वां विकल्प (Option E) नियम:</strong> यदि प्रश्न हल नहीं करना चाहते, तो विकल्प &lsquo;E&rsquo; अवश्य चुनें अन्यथा नेगेटिव अंकन लागू होगा।
              </span>
            </div>

          </div>

          {/* Bottom Government CBT Action Bar */}
          <div className="pt-6 mt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            
            <div className="flex items-center gap-2 flex-wrap">
              {/* Mark for Review & Next */}
              <button
                onClick={handleMarkForReviewAndNext}
                className="px-4 py-2.5 bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 rounded-xl text-xs font-bold transition-colors shadow-2xs"
              >
                Mark for Review & Next
              </button>

              {/* Clear Response */}
              <button
                onClick={handleClearResponse}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-colors shadow-2xs"
              >
                Clear Response
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Previous */}
              <button
                onClick={handlePrevious}
                disabled={currentQIndex === 0}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold disabled:opacity-40 transition-colors"
              >
                Previous
              </button>

              {/* Save & Next */}
              <button
                onClick={handleSaveAndNext}
                className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors shadow-md flex items-center gap-1.5"
              >
                <span>Save & Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: 1-100 Question Palette Panel (25% - 30%) */}
        <aside className="w-72 sm:w-80 lg:w-96 bg-slate-50 flex flex-col justify-between overflow-y-auto p-4 border-l border-slate-200">
          
          <div className="space-y-4">
            
            {/* Candidate Box */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center text-xs">
                RJ
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-800 block">अभ्यर्थी: ऑनलाइन परीक्षार्थी</span>
                <span className="text-slate-500 text-[10px]">रोल नं: RJ-2024-CBT-8849</span>
              </div>
            </div>

            {/* Palette Legend Box */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block border-b border-slate-100 pb-1">
                प्रतीक एवं रंग संकेत (Legend):
              </span>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-emerald-500 text-white font-bold text-[9px] flex items-center justify-center">
                    {answeredCount}
                  </span>
                  <span className="text-slate-700">Answered</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center">
                    {notAnsweredCount}
                  </span>
                  <span className="text-slate-700">Not Answered</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-purple-600 text-white font-bold text-[9px] flex items-center justify-center">
                    {markedReviewCount}
                  </span>
                  <span className="text-slate-700">Marked Review</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-slate-200 text-slate-700 font-bold text-[9px] flex items-center justify-center">
                    {notVisitedCount}
                  </span>
                  <span className="text-slate-700">Not Visited</span>
                </div>
              </div>
            </div>

            {/* 1-100 Question Palette Grid */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="font-bold text-slate-800 text-xs">
                  प्रश्न पैलेट (1 - 100)
                </span>
                <span className="text-[10px] text-blue-900 font-semibold">
                  प्रश्न पर सीधे जाएं
                </span>
              </div>

              {/* 100-Question Button Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-7 gap-1.5 max-h-72 overflow-y-auto pr-1">
                {FULL_100_CBT_QUESTIONS.map((q, idx) => {
                  const status = questionStatuses[q.id] || 'not_visited';
                  const isCurrent = currentQIndex === idx;

                  let colorClass = 'bg-slate-100 text-slate-700 border-slate-200';
                  if (status === 'answered') {
                    colorClass = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                  } else if (status === 'not_answered') {
                    colorClass = 'bg-rose-500 text-white border-rose-600 font-bold';
                  } else if (status === 'marked_for_review') {
                    colorClass = 'bg-purple-600 text-white border-purple-700 font-bold';
                  } else if (status === 'answered_and_marked') {
                    colorClass = 'bg-purple-600 text-white border-purple-700 font-bold ring-2 ring-emerald-400';
                  }

                  if (isCurrent) {
                    colorClass += ' ring-2 ring-amber-400 font-black scale-105';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleJumpToQuestion(idx)}
                      className={`h-7 rounded-lg text-xs font-semibold border flex items-center justify-center transition-all ${colorClass}`}
                      title={`प्रश्न ${q.id}`}
                    >
                      {q.id}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Submit Exam Button */}
          <div className="pt-4 mt-4 border-t border-slate-200">
            <button
              onClick={() => setShowSubmitConfirmModal(true)}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>CBT परीक्षा समाप्त एवं सबमिट करें</span>
            </button>
          </div>

        </aside>

      </div>

    </div>
  );
}
