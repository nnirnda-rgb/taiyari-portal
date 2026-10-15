'use client';

import React from 'react';
import { 
  X, 
  Calendar, 
  Users, 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Download,
  AlertTriangle,
  Play,
  ExternalLink,
  ShieldCheck,
  Building,
  Award,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { RajasthanExam } from '@/data/rajasthanExams';

interface RajasthanExamDetailModalProps {
  exam: RajasthanExam | null;
  isOpen: boolean;
  onClose: () => void;
  onStartPractice: (examId: string) => void;
  onStartQuiz: (examId: string) => void;
}

export default function RajasthanExamDetailModal({ 
  exam, 
  isOpen, 
  onClose, 
  onStartPractice, 
  onStartQuiz 
}: RajasthanExamDetailModalProps) {
  if (!isOpen || !exam) return null;

  const getBoardBadgeClass = (board: string) => {
    switch (board) {
      case 'RPSC': return 'bg-indigo-600 text-white';
      case 'RSSB': return 'bg-emerald-600 text-white';
      case 'Police': return 'bg-rose-600 text-white';
      case 'High Court': return 'bg-amber-600 text-white';
      case 'Health/Energy': return 'bg-cyan-700 text-white';
      default: return 'bg-blue-900 text-white';
    }
  };

  const getCetBadge = (status: string) => {
    switch (status) {
      case 'Non-CET':
        return {
          label: 'बिना CET (Non-CET)',
          classes: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
        };
      case 'Direct':
        return {
          label: 'सीधी भर्ती (No CET)',
          classes: 'bg-teal-500/20 text-teal-300 border-teal-400/40'
        };
      case 'CET-Graduation':
        return {
          label: 'CET स्नातक स्तर लागू',
          classes: 'bg-blue-500/20 text-blue-300 border-blue-400/40'
        };
      case 'CET-12th':
        return {
          label: 'CET 12वीं स्तर लागू',
          classes: 'bg-purple-500/20 text-purple-300 border-purple-400/40'
        };
      default:
        return {
          label: status,
          classes: 'bg-slate-500/20 text-slate-300 border-slate-400/40'
        };
    }
  };

  const cetBadge = getCetBadge(exam.cetStatus);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-blue-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exam-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 p-5 text-white flex items-start justify-between border-b-2 border-amber-400">
          <div className="pr-4">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider ${getBoardBadgeClass(exam.board)}`}>
                {exam.board}
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${cetBadge.classes}`}>
                {cetBadge.label}
              </span>
              <span className="bg-amber-400/20 text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded border border-amber-400/30">
                {exam.status}
              </span>
            </div>
            
            <h3 id="exam-modal-title" className="text-xl sm:text-2xl font-black text-white leading-tight">
              {exam.name}
            </h3>
            <p className="text-xs text-blue-200 font-medium mt-1">
              {exam.nameEnglish} • {exam.department}
            </p>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-300 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors flex-shrink-0"
            aria-label="बंद करें"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-800 text-sm">
          
          {/* Key Facts Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-blue-600" /> पद संख्या:
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                {exam.totalPosts || 'विज्ञप्ति अनुसार'}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" /> कुल अंक:
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                {exam.totalMarks} अंक
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600" /> आयु सीमा:
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                {exam.ageLimit}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" /> CET स्थिति:
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1 truncate" title={exam.cetStatus}>
                {exam.cetStatus}
              </div>
            </div>
          </div>

          {/* CET Status Deep Dive Callout */}
          <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/70 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <div className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                <span>समान पात्रता परीक्षा (CET) स्थिति:</span>
                <span className="text-blue-700">{exam.cetStatus}</span>
              </div>
              <p className="text-xs text-blue-900 mt-0.5 leading-relaxed">
                {exam.cetDetailHindi}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-blue-600" /> परीक्षा परिचय एवं कार्य क्षेत्र:
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
              {exam.description}
            </p>
          </div>

          {/* Minimum Qualification & Eligibility */}
          <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200">
            <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider mb-1 flex items-center gap-1">
              <GraduationCap className="w-4 h-4 text-amber-700" /> न्यूनतम शैक्षणिक योग्यता (Minimum Qualification):
            </h4>
            <p className="text-xs sm:text-sm font-bold text-slate-900">
              {exam.minQualification}
            </p>
            <p className="text-[11px] text-amber-800 font-medium mt-1">
              विभाग: <strong className="text-slate-900">{exam.department}</strong>
            </p>
          </div>

          {/* Syllabus Topics */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" /> मुख्य पाठ्यक्रम एवं विषय संरचना (Syllabus Highlights):
            </h4>
            <ul className="space-y-2">
              {exam.syllabusHighlights.map((topic, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{topic}</span>
                </li>
              ))}
            </ul>

            {/* Official Syllabus PDF Direct Access */}
            <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50/60 rounded-xl border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-900 text-white flex items-center justify-center flex-shrink-0">
                  <FileText className="w-3.5 h-3.5 text-amber-300" />
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-950">आधिकारिक विस्तृत पाठ्यक्रम (Official Syllabus PDF)</div>
                  <div className="text-[10px] text-blue-700">विभाग एवं चयन बोर्ड द्वारा जारी मूल पीडीएफ डाउनलोड करें</div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {exam.officialSyllabusUrl ? (
                  <a
                    href={exam.officialSyllabusUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-blue-900 hover:bg-blue-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-xs transition-colors"
                  >
                    <Download className="w-3 h-3 text-amber-300" />
                    <span>मूल पीडीएफ (बोर्ड सर्वर)</span>
                  </a>
                ) : (
                  <a
                    href={exam.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-slate-700 hover:text-blue-900 bg-white border border-slate-300 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>पोर्टल पर देखें</span>
                  </a>
                )}

                {exam.mirrorSyllabusUrl && (
                  <a
                    href={exam.mirrorSyllabusUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-white hover:bg-blue-50 text-blue-950 border border-blue-300 text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    <Download className="w-3 h-3 text-emerald-600" />
                    <span>फास्ट मिरर</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Selection Stages */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-indigo-600" /> चयन प्रक्रिया के चरण (Selection Stages):
            </h4>
            <div className="flex flex-wrap gap-2">
              {exam.stages.map((stage, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 text-indigo-900 px-3 py-1.5 rounded-lg text-xs font-semibold">
                  <span className="w-5 h-5 rounded-full bg-indigo-900 text-white text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span>{stage}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5th Option & Negative Marking Rule */}
          <div className="p-3.5 bg-rose-50/80 rounded-xl border border-rose-200 text-xs text-rose-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-rose-900">
              <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>नकारात्मक अंकन एवं 5वां विकल्प (Option E) नियम:</span>
            </div>
            <p className="text-[11px] text-rose-800 leading-relaxed">
              <strong>{exam.negativeMarking}</strong> — राजस्थान लोक सेवा आयोग एवं कर्मचारी चयन बोर्ड द्वारा लागू नवीन नियम के अनुसार, यदि अभ्यर्थी किसी प्रश्न का उत्तर नहीं देना चाहता है तो 5वां गोला (अनुत्तरित प्रश्न) भरना अनिवार्य है। 10% से अधिक प्रश्न खाली छोड़ने पर अभ्यर्थी को अयोग्य घोषित किया जाता है।
            </p>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <a
            href={exam.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-700 bg-white px-3 py-2 rounded-lg border border-slate-300 shadow-2xs transition-colors"
          >
            <span>{exam.board} आधिकारिक पोर्टल</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                onClose();
                onStartPractice(exam.id);
              }}
              className="flex items-center gap-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>अभ्यास करें (Practice)</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onStartQuiz(exam.id);
              }}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-black px-4 py-2 rounded-lg shadow-md transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>मॉक टेस्ट दें (CBT)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
