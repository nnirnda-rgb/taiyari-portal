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
  AlertTriangle,
  Play
} from 'lucide-react';
import { ExamInfo } from '@/data/portalData';

interface ExamModalProps {
  exam: ExamInfo | null;
  isOpen: boolean;
  onClose: () => void;
  onStartQuiz: () => void;
  onViewPyq: () => void;
}

export default function ExamModal({ exam, isOpen, onClose, onStartQuiz, onViewPyq }: ExamModalProps) {
  if (!isOpen || !exam) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-blue-200 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exam-modal-title"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-5 text-white flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                {exam.board}
              </span>
              <span className="bg-white/10 text-blue-200 text-xs px-2 py-0.5 rounded">
                {exam.category}
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-0.5 rounded border border-emerald-400/30">
                {exam.status}
              </span>
            </div>
            
            <h3 id="exam-modal-title" className="text-xl font-black text-white">
              {exam.title}
            </h3>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-300 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
            aria-label="बंद करें"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-800 text-sm">
          
          {/* Key Quick Facts Grid */}
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
                <Calendar className="w-3.5 h-3.5 text-amber-600" /> परीक्षा तिथि:
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                {exam.examDate}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" /> कुल अंक:
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                {exam.totalMarks} अंक ({exam.paperCount} पेपर)
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" /> आयु सीमा:
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                {exam.ageLimit}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">
              विवरण एवं परिचय:
            </h4>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed bg-blue-50/60 p-3 rounded-xl border border-blue-100">
              {exam.description}
            </p>
          </div>

          {/* Eligibility */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-700" />
              शैक्षणिक योग्यता (Eligibility Criteria):
            </h4>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 font-medium">
              {exam.eligibility}
            </div>
          </div>

          {/* Syllabus Topics */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-600" />
              पाठ्यक्रम एवं विषय विभाजन (Syllabus Breakdown):
            </h4>
            <ul className="space-y-2">
              {exam.syllabusTopics.map((topic, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Negative Marking Rule Notice */}
          <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">नकारात्मक अंकन एवं 5वां विकल्प नियम: </span>
              {exam.negativeMarking}। यदि परीक्षार्थी किसी प्रश्न का उत्तर नहीं देना चाहता है, तो उसे 5वां विकल्प &lsquo;अनुत्तरित प्रश्न&rsquo; गोला अनिवार्य रूप से गहरा करना होगा।
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onViewPyq();
            }}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold transition-colors"
          >
            विगत वर्ष प्रश्न-पत्र (PYQs)
          </button>

          <div className="flex items-center gap-2">
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold"
            >
              बंद करें
            </button>
            <button
              onClick={() => {
                onClose();
                onStartQuiz();
              }}
              className="px-5 py-2 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>अभ्यास टेस्ट शुरू करें</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
