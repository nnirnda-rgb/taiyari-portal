'use client';

import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Trophy, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles,
  Camera,
  Maximize2,
  Clock,
  Layers,
  ArrowRight,
  ShieldAlert,
  History,
  Cloud,
  CheckCircle2,
  X,
  Calendar,
  Award,
  RefreshCw
} from 'lucide-react';
import ProctoredCBTInterface from './ProctoredCBTInterface';
import QuizEngine from './QuizEngine';
import { 
  fetchStudentHistories, 
  StudentTestHistory, 
  seedInitialDataToFirestore 
} from '@/services/firestoreService';
import { isFirebaseConfigured } from '@/lib/firebase';

export default function SelfAssessmentSection() {
  const [activeMode, setActiveMode] = useState<'proctored_cbt' | 'quick_practice'>('proctored_cbt');
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [histories, setHistories] = useState<StudentTestHistory[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const loadHistories = async () => {
    setIsLoadingHistory(true);
    try {
      const data = await fetchStudentHistories();
      setHistories(data);
    } catch (err) {
      console.warn('Error loading histories:', err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (showHistoryModal) {
      loadHistories();
    }
  }, [showHistoryModal]);

  const handleSeedCloudData = async () => {
    setSyncStatus('सिंक हो रहा है...');
    try {
      const res = await seedInitialDataToFirestore();
      setSyncStatus(res.message);
      setTimeout(() => setSyncStatus(null), 4000);
    } catch (err: any) {
      setSyncStatus('सिंक असफल: ' + err?.message);
    }
  };

  return (
    <section 
      id="self-assessment-section"
      className="py-12 px-4 sm:px-6 bg-white border-b border-slate-200"
      aria-label="स्वयं की जांच अनुभाग"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-rose-600 text-white text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm animate-pulse">
                <ShieldAlert className="w-3.5 h-3.5" />
                स्वयं की जांच • प्रोक्टर्ड CBT ऑनलाइन परीक्षा
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                RPSC एवं RSMSSB की वास्तविक परीक्षा प्रणाली
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              स्वयं की जांच — प्रोक्टर्ड CBT मॉक टेस्ट (100 प्रश्न)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              फुलस्क्रीन मोड, एंटी-चीटिंग टैब-स्विचिंग डिटेक्शन, लाइव कैमरा प्रॉक्टरिंग, 1-100 प्रश्न पैलेट एवं Firebase क्लाउड पर सुरक्षित टेस्ट इतिहास।
            </p>
          </div>

          {/* Right Action Controls: History + Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* View History Button */}
            <button
              onClick={() => setShowHistoryModal(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-300 transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <History className="w-3.5 h-3.5 text-blue-700" />
              <span>विगत टेस्ट इतिहास</span>
            </button>

            {/* Mode Switcher Buttons */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-300 shadow-xs">
              <button
                onClick={() => setActiveMode('proctored_cbt')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeMode === 'proctored_cbt'
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Camera className="w-3.5 h-3.5 text-amber-300" />
                <span>प्रोक्टर्ड CBT टेस्ट (100 प्रश्न)</span>
                <span className="bg-rose-500 text-white text-[9px] px-1.5 py-0.2 rounded font-black">
                  CBT
                </span>
              </button>

              <button
                onClick={() => setActiveMode('quick_practice')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeMode === 'quick_practice'
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>त्वरित क्विज (Quick Quiz)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Display based on activeMode (Strictly keeping mock test screens AD-FREE) */}
        {activeMode === 'proctored_cbt' ? (
          <ProctoredCBTInterface />
        ) : (
          <div className="space-y-6">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>
                <strong>त्वरित अभ्यास क्विज:</strong> त्वरित गति से 8 चयनित प्रश्नों को हल करें। पूर्ण प्रोक्टर्ड अनुभव हेतु ऊपर &lsquo;प्रोक्टर्ड CBT टेस्ट&rsquo; का चयन करें।
              </span>
            </div>
            <QuizEngine />
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* STUDENT TEST HISTORY MODAL (FIREBASE + 4G CACHE) */}
      {/* ========================================================================= */}
      {showHistoryModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowHistoryModal(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowHistoryModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-900">
                <History className="w-5 h-5 text-blue-800" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  विगत टेस्ट इतिहास एवं प्रदर्शन (Test History)
                </h3>
                <p className="text-xs text-slate-500">
                  Firebase Cloud Database एवं 4G ऑफलाइन कैश पर स्वतः सुरक्षित रिकॉर्ड
                </p>
              </div>
            </div>

            {/* Cloud Sync Status Strip */}
            <div className="my-4 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <Cloud className="w-4 h-4 text-blue-700" />
                <span>
                  {isFirebaseConfigured() 
                    ? 'Firebase क्लाउड डेटाबेस सक्रिय' 
                    : 'लोकल 4G ऑफलाइन स्टोरेज सक्रिय (Cloud Sync Ready)'}
                </span>
              </div>
              <button
                onClick={handleSeedCloudData}
                className="text-[11px] font-bold text-blue-900 hover:text-blue-950 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs"
              >
                <RefreshCw className="w-3 h-3" />
                <span>डेटाबेस सिंक</span>
              </button>
            </div>

            {syncStatus && (
              <div className="mb-4 p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 font-medium animate-in fade-in">
                {syncStatus}
              </div>
            )}

            {/* Content: Attempts List */}
            {isLoadingHistory ? (
              <div className="py-12 text-center text-slate-500 text-xs">
                <div className="w-6 h-6 border-2 border-blue-900/30 border-t-blue-900 rounded-full animate-spin mx-auto mb-2" />
                <span>परीक्षार्थी इतिहास लोड हो रहा है...</span>
              </div>
            ) : histories.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <Trophy className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="text-sm font-bold text-slate-700">अभी तक कोई टेस्ट इतिहास दर्ज नहीं है</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  जैसे ही आप कोई मॉक टेस्ट या त्वरित क्विज पूर्ण करेंगे, आपका स्कोरकार्ड एवं विश्लेषण यहाँ स्वतः सुरक्षित हो जाएगा।
                </p>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-950 transition-colors"
                >
                  पहला मॉक टेस्ट दें
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {histories.map((hist, idx) => (
                  <div 
                    key={hist.attemptId || idx}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-blue-50/40 transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">
                          {hist.testTitle}
                        </span>
                        <span className="text-[10px] bg-blue-100 text-blue-900 px-2 py-0.2 rounded font-bold">
                          {hist.examBoard}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {new Date(hist.submittedAt).toLocaleDateString('hi-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-200/60 text-center text-[11px]">
                      <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                        <span className="block text-[10px] text-slate-500">प्राप्तांक</span>
                        <strong className="text-blue-900 font-black">{hist.score} / {hist.totalMarks}</strong>
                      </div>
                      <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                        <span className="block text-[10px] text-slate-500">शुद्धता</span>
                        <strong className="text-emerald-700 font-black">{hist.accuracy}%</strong>
                      </div>
                      <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                        <span className="block text-[10px] text-slate-500">सही / गलत</span>
                        <strong className="text-slate-800 font-black">{hist.correctCount} / {hist.incorrectCount}</strong>
                      </div>
                      <div className="bg-white p-1.5 rounded-lg border border-slate-200">
                        <span className="block text-[10px] text-slate-500">क्लाउड स्थिति</span>
                        <span className="text-[10px] font-bold text-emerald-600 flex items-center justify-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> सुरक्षित
                        </span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* Modal Bottom Close */}
            <div className="pt-4 mt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowHistoryModal(false)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                बंद करें
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
