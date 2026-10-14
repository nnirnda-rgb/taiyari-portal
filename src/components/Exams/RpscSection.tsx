'use client';

import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Users, 
  ArrowRight, 
  Award, 
  Sparkles,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { RPSC_EXAMS, ExamInfo } from '@/data/portalData';
import ExamModal from './ExamModal';

interface RpscSectionProps {
  onStartQuiz: () => void;
  onViewPyq: () => void;
  searchFilter?: string;
}

export default function RpscSection({ onStartQuiz, onViewPyq, searchFilter = '' }: RpscSectionProps) {
  const [selectedExam, setSelectedExam] = useState<ExamInfo | null>(null);

  const filteredExams = RPSC_EXAMS.filter((exam) => {
    if (!searchFilter) return true;
    const term = searchFilter.toLowerCase();
    return (
      exam.title.toLowerCase().includes(term) ||
      exam.category.toLowerCase().includes(term) ||
      exam.description.toLowerCase().includes(term)
    );
  });

  return (
    <section 
      id="rpsc-hub" 
      className="py-12 px-4 sm:px-6 bg-white border-b border-slate-200"
      aria-label="राजस्थान लोक सेवा आयोग हब"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-indigo-700 text-white text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <GraduationCap className="w-3.5 h-3.5" />
                RPSC विशेष प्रकोष्ठ
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                राजस्थान लोक सेवा आयोग, अजमेर
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              RPSC हब — RAS, प्राध्यापक, वरिष्ठ शिक्षक एवं पुलिस SI
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              राजस्थान की सर्वोच्च प्रशासनिक एवं राजपत्रित सेवाओं की तैयारी हेतु प्रमाणिक पाठ्यक्रम विश्लेषण, रणनीति व पूर्व पेपर्स।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://rpsc.rajasthan.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-900 bg-slate-50 hover:bg-indigo-50 px-3.5 py-2 rounded-lg border border-slate-300 shadow-sm transition-colors"
            >
              <span>RPSC अजमेर आधिकारिक वेबसाइट</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>

        {/* Exam Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredExams.map((exam) => (
            <div 
              key={exam.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 shadow-sm hover:shadow-gov-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-indigo-400"
            >
              <div className="p-6">
                
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bg-indigo-100 text-indigo-900 text-xs font-bold px-3 py-1 rounded-md border border-indigo-200">
                    {exam.category}
                  </span>
                  
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                    {exam.status}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-900 transition-colors">
                  {exam.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {exam.description}
                </p>

                {/* Exam Stages Tag List */}
                <div className="mt-4">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    परीक्षा के चरण (Stages):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {exam.stages.map((stage, idx) => (
                      <span 
                        key={idx} 
                        className="text-[11px] bg-white text-slate-800 font-semibold px-2.5 py-1 rounded-md border border-slate-200 flex items-center gap-1 shadow-2xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                        {stage}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Meta */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">अनुमानित पद:</span>
                    <strong className="text-slate-900">{exam.totalPosts || 'विज्ञप्ति अनुसार'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">अंकन योजना:</span>
                    <strong className="text-slate-900">{exam.totalMarks} अंक ({exam.negativeMarking})</strong>
                  </div>
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="bg-white px-6 py-3.5 border-t border-slate-200 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedExam(exam)}
                  className="text-xs font-bold text-indigo-900 hover:text-indigo-700 flex items-center gap-1"
                >
                  <span>विस्तृत पाठ्यक्रम व अंक विभाजन</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onStartQuiz}
                  className="px-3.5 py-1.5 bg-indigo-900 hover:bg-indigo-800 text-white rounded-lg text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>मॉक टेस्ट हल करें</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Selected Exam Modal */}
      <ExamModal
        exam={selectedExam}
        isOpen={!!selectedExam}
        onClose={() => setSelectedExam(null)}
        onStartQuiz={onStartQuiz}
        onViewPyq={onViewPyq}
      />
    </section>
  );
}
