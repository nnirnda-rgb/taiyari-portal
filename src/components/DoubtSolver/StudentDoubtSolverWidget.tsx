'use client';

import React, { useState } from 'react';
import { 
  HelpCircle, 
  Sparkles, 
  X, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  BookOpen, 
  ShieldCheck, 
  RotateCw,
  Award,
  ChevronRight,
  MessageSquare,
  Bot
} from 'lucide-react';
import { 
  resolveStudentGeneralDoubt, 
  submitQuestionDispute, 
  ReportedQuestion 
} from '@/services/doubtSolverService';

export default function StudentDoubtSolverWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'doubt' | 'report'>('doubt');

  // Doubt Solver State
  const [doubtInput, setDoubtInput] = useState('');
  const [isSolving, setIsSolving] = useState(false);
  const [solvedDoubt, setSolvedDoubt] = useState<{
    doubt: string;
    stepByStepExplanation: string[];
    keySummary: string;
    authoritativeReference: string;
    relatedSubject: string;
  } | null>(null);

  // Dispute Report State
  const [reportQuestionId, setReportQuestionId] = useState('');
  const [studentReportedOption, setStudentReportedOption] = useState('');
  const [studentRemark, setStudentRemark] = useState('');
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [submittedReport, setSubmittedReport] = useState<ReportedQuestion | null>(null);

  // Suggested Quick Chips
  const QUICK_DOUBTS = [
    'नवीनतम 41 जिले व 7 संभाग की स्थिति',
    'धौलपुर vs दूदू: सबसे छोटा जिला कौन सा है?',
    '5वां विकल्प (Option E) न भरने पर नेगेटिव मार्किंग',
    'चंबल नदी पर राजस्थान में स्थित बांध',
    'हल्दीघाटी युद्ध की प्रामाणिक तिथि व तथ्य',
  ];

  // Handle Doubt Submission
  const handleSolveDoubt = async (queryText?: string) => {
    const textToSolve = (queryText || doubtInput).trim();
    if (!textToSolve) return;

    setIsSolving(true);
    setSolvedDoubt(null);

    try {
      const result = await resolveStudentGeneralDoubt(textToSolve);
      setSolvedDoubt(result);
    } catch (err) {
      console.error('Doubt resolution error:', err);
    } finally {
      setIsSolving(false);
    }
  };

  // Handle Question Dispute Submission
  const handleSubmitDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportQuestionId.trim() || !studentRemark.trim()) return;

    setIsSubmittingReport(true);
    setSubmittedReport(null);

    try {
      const result = await submitQuestionDispute({
        questionId: reportQuestionId.trim(),
        studentRemark: studentRemark.trim(),
        studentReportedOption: studentReportedOption.trim(),
      });
      setSubmittedReport(result);
    } catch (err) {
      console.error('Question dispute submission error:', err);
    } finally {
      setIsSubmittingReport(false);
    }
  };

  return (
    <>
      {/* 1. Floating Launcher Button (Bottom Right) */}
      <aside 
        aria-label="संशय निवारक मित्र"
        className="fixed bottom-5 right-4 sm:right-6 z-40 flex items-center"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2 bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-900 hover:from-violet-600 hover:to-indigo-800 text-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-2xl border-2 border-amber-400 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300"
          title="संशय निवारक मित्र — 24x7 तत्काल समाधान एवं त्रुटि रिपोर्ट"
          aria-label="संशय निवारक मित्र चैट विजेट खोलें"
        >
          {/* Pulse ping ring */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-white" />
          </span>

          <div className="p-1 rounded-full bg-white/20">
            <Bot className="w-5 h-5 text-amber-300" />
          </div>

          <div className="text-left hidden sm:block">
            <div className="text-xs font-black tracking-tight leading-none text-white flex items-center gap-1">
              <span>संदेह / समाधान</span>
              <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                एजेंट 7
              </span>
            </div>
            <div className="text-[10px] text-purple-200 font-semibold leading-tight mt-0.5">
              संशय निवारक मित्र (AI 24x7)
            </div>
          </div>

          <span className="sm:hidden text-xs font-bold">
            संदेह निवारक
          </span>
        </button>
      </aside>

      {/* 2. Interactive Modal Window */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="doubt-solver-title"
        >
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[92vh] shadow-2xl border border-slate-300 flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-violet-950 via-purple-900 to-indigo-950 p-4 sm:p-5 text-white flex items-center justify-between border-b-2 border-amber-400 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 flex-shrink-0">
                  <Bot className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.2 rounded-full uppercase tracking-wider">
                      एजेंट 7: संशय निवारक मित्र
                    </span>
                    <span className="text-[10px] text-purple-200 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      सक्रिय 24x7
                    </span>
                  </div>
                  <h3 id="doubt-solver-title" className="text-base sm:text-lg font-black text-white mt-0.5">
                    संदेह निवारण एवं उत्तर समीक्षा प्रकोष्ठ
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="विजेट बंद करें"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-Header Mission Bar */}
            <div className="bg-purple-50 px-4 py-2 border-b border-purple-100 flex items-center justify-between text-[11px] text-purple-900 font-semibold">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                ॥ निःशुल्क जन-शिक्षा संकल्प — समर्पित ग्रामीण युवा शक्ति को ॥
              </span>
              <span className="text-emerald-700 font-bold hidden sm:inline">100% निःशुल्क</span>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 p-1.5 gap-1 flex-shrink-0">
              <button
                onClick={() => setActiveTab('doubt')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'doubt'
                    ? 'bg-purple-900 text-white shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>त्वरित संशय समाधान</span>
              </button>

              <button
                onClick={() => setActiveTab('report')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'report'
                    ? 'bg-rose-900 text-white shadow-sm font-black'
                    : 'text-slate-600 hover:text-rose-900 hover:bg-rose-50'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
                <span>उत्तर में त्रुटि है? (आपत्ति)</span>
              </button>
            </div>

            {/* Modal Body: Scrollable */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 text-slate-800 text-xs sm:text-sm">
              
              {/* TAB 1: Instant Doubt Resolution */}
              {activeTab === 'doubt' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      अपना संशय या प्रश्न दर्ज करें (Ask Any Rajasthan Exam Doubt):
                    </label>
                    <div className="relative">
                      <textarea
                        rows={2}
                        value={doubtInput}
                        onChange={(e) => setDoubtInput(e.target.value)}
                        placeholder="जैसे: राजस्थान में 41 जिले व 7 संभाग के अनुसार सबसे छोटा जिला कौन सा है?..."
                        className="w-full p-3 pr-10 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white text-slate-900 placeholder-slate-400"
                      />
                      <button
                        onClick={() => handleSolveDoubt()}
                        disabled={isSolving || !doubtInput.trim()}
                        className="absolute right-2 bottom-3 p-2 bg-purple-900 hover:bg-purple-800 disabled:opacity-40 text-white rounded-xl shadow-sm transition-all"
                        title="समाधान प्राप्त करें"
                      >
                        {isSolving ? (
                          <RotateCw className="w-4 h-4 animate-spin text-amber-300" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Quick Chips */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 mb-2 block">
                      अक्सर पूछे जाने वाले संशय (Quick Suggestion Chips):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_DOUBTS.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setDoubtInput(chip);
                            handleSolveDoubt(chip);
                          }}
                          className="text-[11px] bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-900 border border-slate-200 hover:border-purple-300 px-2.5 py-1 rounded-lg transition-colors font-medium text-left"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Solving Indicator */}
                  {isSolving && (
                    <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-center space-y-2">
                      <RotateCw className="w-6 h-6 animate-spin text-purple-700 mx-auto" />
                      <p className="text-xs font-bold text-purple-900">
                        एजेंट 7 द्वारा मानक पाठ्यपुस्तकों (RBSE व हिन्दी ग्रंथ अकादमी) से मिलान किया जा रहा है...
                      </p>
                    </div>
                  )}

                  {/* Solved Doubt Result */}
                  {solvedDoubt && !isSolving && (
                    <div className="p-4 bg-white rounded-2xl border-2 border-purple-200 shadow-sm space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="flex items-center justify-between border-b pb-2 border-slate-100">
                        <span className="text-[10px] font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full">
                          {solvedDoubt.relatedSubject}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          प्रमाणित समाधान
                        </span>
                      </div>

                      {/* Step by step */}
                      <div className="space-y-1.5">
                        <div className="font-bold text-xs text-slate-900">
                          चरणबद्ध प्रामाणिक विश्लेषण:
                        </div>
                        {solvedDoubt.stepByStepExplanation.map((step, sIdx) => (
                          <div key={sIdx} className="text-xs text-slate-700 leading-relaxed flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0 mt-1.5" />
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>

                      {/* Key summary */}
                      <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-950">
                        🎯 निष्कर्ष: {solvedDoubt.keySummary}
                      </div>

                      {/* Authoritative citation */}
                      <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-1.5 pt-1 border-t border-slate-100">
                        <BookOpen className="w-3.5 h-3.5 text-blue-800 flex-shrink-0" />
                        <span>अधिकृत संदर्भ: <strong className="text-slate-800">{solvedDoubt.authoritativeReference}</strong></span>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 2: One-Click Question Error Reporting */}
              {activeTab === 'report' && (
                <form onSubmit={handleSubmitDispute} className="space-y-3.5">
                  <div className="bg-rose-50 p-3 rounded-2xl border border-rose-200 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-rose-950 text-xs">
                      <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      <span>प्रश्नोत्तरी उत्तर समीक्षा तंत्र (QA Auditor Dispute)</span>
                    </div>
                    <p className="text-[11px] text-rose-800 leading-relaxed">
                      यदि आपको किसी प्रश्न के उत्तर, व्याख्या अथवा विकल्प में विसंगति प्रतीत होती है, तो यहाँ दर्ज करें। एजेंट 6 (QA Auditor) एवं एजेंट 7 (संशय निवारक) तत्काल प्रामाणिक संदर्भों से पुनः परीक्षण करेंगे।
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      प्रश्न ID अथवा संदर्भ (Question ID):
                    </label>
                    <input
                      type="text"
                      value={reportQuestionId}
                      onChange={(e) => setReportQuestionId(e.target.value)}
                      placeholder="जैसे: pq-5, cbt-3, अथवा प्रश्न का शीर्षक"
                      className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      आपके अनुसार सही उत्तर क्या होना चाहिए? (Your Suggested Option):
                    </label>
                    <input
                      type="text"
                      value={studentReportedOption}
                      onChange={(e) => setStudentReportedOption(e.target.value)}
                      placeholder="जैसे: विकल्प A (धौलपुर), अथवा विकल्प C"
                      className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      आपत्ति का विवरण / संशय का कारण (Remark & Details):
                    </label>
                    <textarea
                      rows={3}
                      value={studentRemark}
                      onChange={(e) => setStudentRemark(e.target.value)}
                      placeholder="विस्तार से बताएं कि प्रश्न में क्या त्रुटि है एवं इसका प्रामाणिक संदर्भ क्या है..."
                      className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingReport || !reportQuestionId || !studentRemark}
                    className="w-full py-2.5 px-4 bg-rose-700 hover:bg-rose-800 disabled:opacity-50 text-white rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    {isSubmittingReport ? (
                      <>
                        <RotateCw className="w-4 h-4 animate-spin text-amber-300" />
                        <span>आपत्ति दर्ज एवं परीक्षण हो रहा है...</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-amber-300" />
                        <span>आपत्ति दर्ज करें (One-Click Error Report)</span>
                      </>
                    )}
                  </button>

                  {/* Submitted Report Result */}
                  {submittedReport && (
                    <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-2 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>आपत्ति पंजीकृत व तत्काल पुनर्मूल्यांकित! (ID: {submittedReport.id})</span>
                      </div>

                      <p className="text-xs text-emerald-950 leading-relaxed">
                        {submittedReport.resolutionExplanationHindi}
                      </p>

                      <div className="text-[10px] text-emerald-800 font-semibold border-t border-emerald-200 pt-1.5">
                        📖 अधिकृत संदर्भ: <strong>{submittedReport.authoritativeReferenceCitation}</strong>
                      </div>
                    </div>
                  )}

                </form>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 flex-shrink-0">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>निःशुल्क जन-शिक्षा संबल • रूपसिंह फनात</span>
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 bg-white border border-slate-300 rounded-lg font-bold text-slate-700 hover:bg-slate-50"
              >
                बंद करें
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
