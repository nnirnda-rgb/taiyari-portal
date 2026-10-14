'use client';

import React, { useState } from 'react';
import { 
  Layers, 
  Calendar, 
  Users, 
  ArrowRight, 
  BookOpen, 
  CheckCircle, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { RSMSSB_EXAMS, ExamInfo } from '@/data/portalData';
import ExamModal from './ExamModal';

interface RsmssbSectionProps {
  onStartQuiz: () => void;
  onViewPyq: () => void;
  searchFilter?: string;
}

export default function RsmssbSection({ onStartQuiz, onViewPyq, searchFilter = '' }: RsmssbSectionProps) {
  const [selectedExam, setSelectedExam] = useState<ExamInfo | null>(null);

  const filteredExams = RSMSSB_EXAMS.filter((exam) => {
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
      id="rsmssb-hub" 
      className="py-12 px-4 sm:px-6 bg-slate-50 border-b border-slate-200"
      aria-label="राजस्थान कर्मचारी चयन बोर्ड हब"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <Layers className="w-3.5 h-3.5" />
                RSMSSB विशेष प्रकोष्ठ
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                राजस्थान कर्मचारी चयन बोर्ड, जयपुर
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              RSMSSB हब — पटवार, CET एवं अधीनस्थ सेवाएं
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              राजस्थान कर्मचारी चयन बोर्ड द्वारा आयोजित सभी प्रमुख प्रतियोगी परीक्षाओं का पाठ्यक्रम, पैटर्न व निःशुल्क मॉडल टेस्ट।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://rsmssb.rajasthan.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 bg-white hover:bg-blue-50 px-3.5 py-2 rounded-lg border border-slate-300 shadow-sm transition-colors"
            >
              <span>RSMSSB आधिकारिक वेबसाइट</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>

        {/* Exam Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <div 
              key={exam.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-gov-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-blue-400"
            >
              {/* Card Header Top */}
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="bg-blue-50 text-blue-900 text-[11px] font-bold px-2.5 py-1 rounded-md border border-blue-200">
                    {exam.category}
                  </span>
                  
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    exam.status === 'परीक्षा तिथि घोषित'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : exam.status === 'उत्तर कुंजी जारी'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {exam.status}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                  {exam.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                  {exam.description}
                </p>

                {/* Quick Meta Items */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  {exam.totalPosts && (
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Users className="w-3.5 h-3.5 text-blue-600" /> संभावित पद:
                      </span>
                      <strong className="text-slate-900">{exam.totalPosts}</strong>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" /> परीक्षा माह/तिथि:
                    </span>
                    <strong className="text-slate-900">{exam.examDate}</strong>
                  </div>

                  <div className="flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600" /> कुल अंक:
                    </span>
                    <span className="text-slate-800 font-semibold">{exam.totalMarks} अंक (1/3rd नेगेटिव)</span>
                  </div>
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedExam(exam)}
                  className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1 py-1.5"
                >
                  <span>विस्तृत सिलेबस देखें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onStartQuiz}
                  className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors shadow-sm flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>मॉक टेस्ट दें</span>
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
