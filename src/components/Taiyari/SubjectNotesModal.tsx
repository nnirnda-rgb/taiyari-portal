'use client';

import React from 'react';
import { 
  X, 
  Download, 
  BookOpen, 
  CheckCircle2, 
  Bookmark, 
  Sparkles,
  FileText
} from 'lucide-react';
import { StudyModule } from '@/data/portalData';

interface SubjectNotesModalProps {
  module: StudyModule | null;
  isOpen: boolean;
  onClose: () => void;
  onTakeTest: () => void;
}

export default function SubjectNotesModal({ module, isOpen, onClose, onTakeTest }: SubjectNotesModalProps) {
  if (!isOpen || !module) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-blue-200 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notes-modal-title"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-5 text-white flex items-start justify-between">
          <div>
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider inline-block mb-1">
              {module.badge}
            </span>
            <h3 id="notes-modal-title" className="text-xl font-black text-white">
              {module.hindiTitle}
            </h3>
            <p className="text-xs text-blue-200 font-medium">
              {module.subject} • {module.topicsCount} महत्वपूर्ण अध्याय
            </p>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-300 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
            aria-label="बंद करें"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-800 text-sm">
          
          {/* Summary Box */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
            <h4 className="font-bold text-blue-950 text-sm flex items-center gap-1.5 mb-1.5">
              <BookOpen className="w-4 h-4 text-blue-700" />
              विषय सारगर्भित परिचय (Subject Summary):
            </h4>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              {module.summary}
            </p>
          </div>

          {/* Key Topics Covered */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2.5 flex items-center gap-1.5">
              <Bookmark className="w-4 h-4 text-amber-600" />
              शीर्ष परीक्षा-उपयोगी अध्याय (Key Examination Topics):
            </h4>
            <div className="space-y-2">
              {module.keyTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 hover:bg-blue-50/50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">{topic}</span>
                  </div>
                  <span className="text-[11px] font-bold text-blue-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                    PDF उपलब्ध
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tips / Revision Box */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-700">
                <span className="font-bold text-amber-950">सफलता मंत्र: </span>
                इस विषय के प्रत्येक अध्याय को पढ़ने के बाद &lsquo;स्वयं की जांच&rsquo; अनुभाग से संबंधित क्विज अनिवार्य रूप से हल करें। 
                विगत 5 वर्षों के प्रश्नों का विश्लेषण करने पर 65% से अधिक प्रश्न इन्हीं मुख्य अध्यायों से पूछे गए हैं।
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <a
            href="#self-assessment-section"
            onClick={() => {
              onClose();
              onTakeTest();
            }}
            className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors shadow flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>इस विषय का मॉक टेस्ट दें</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                alert(`'${module.hindiTitle}' के हस्तलिखित नोट्स व ई-बुक सफलतापूर्वक निःशुल्क डाउनलोड की जा रही है।`);
              }}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>सम्पूर्ण ई-बुक डाउनलोड करें (PDF)</span>
            </button>
            
            <button 
              onClick={onClose}
              className="px-3.5 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold"
            >
              बंद करें
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
