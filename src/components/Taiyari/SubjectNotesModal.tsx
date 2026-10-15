'use client';

import React, { useState } from 'react';
import { 
  X, 
  Download, 
  BookOpen, 
  CheckCircle2, 
  Bookmark, 
  Sparkles, 
  FileText,
  Lightbulb,
  ExternalLink,
  HelpCircle,
  Eye,
  Award
} from 'lucide-react';
import { StudyModule } from '@/data/portalData';
import { RAJASTHAN_REVISION_NOTES, RevisionNote } from '@/data/rajasthanNotesData';

interface SubjectNotesModalProps {
  module: StudyModule | null;
  isOpen: boolean;
  onClose: () => void;
  onTakeTest: () => void;
}

export default function SubjectNotesModal({ module, isOpen, onClose, onTakeTest }: SubjectNotesModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'readOnline' | 'examTips'>('overview');
  const [selectedNoteIndex, setSelectedNoteIndex] = useState<number>(0);

  if (!isOpen || !module) return null;

  // Map module to corresponding detailed Hindi revision notes
  const matchingNotes: RevisionNote[] = RAJASTHAN_REVISION_NOTES.filter(note => {
    if (module.id === 'mod-raj-geo') return note.subjectId === 'rajasthan-geography';
    if (module.id === 'mod-raj-gk') return note.subjectId === 'rajasthan-history-culture';
    if (module.id === 'mod-raj-polity') return note.subjectId === 'rajasthan-polity';
    if (module.id === 'mod-gen-hindi') return note.subjectId === 'general-hindi';
    return note.subjectId === 'general-science' || note.subjectId === 'rajasthan-history-culture';
  });

  const currentNote: RevisionNote = matchingNotes[selectedNoteIndex] || RAJASTHAN_REVISION_NOTES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-blue-200 overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notes-modal-title"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 p-5 text-white flex items-start justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {module.badge}
              </span>
              <span className="text-xs text-emerald-300 font-semibold bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-400/30">
                100% प्रामाणिक हिन्दी कैप्सूल
              </span>
            </div>
            <h3 id="notes-modal-title" className="text-lg sm:text-xl font-black text-white">
              {module.hindiTitle}
            </h3>
            <p className="text-xs text-blue-200 font-medium mt-0.5">
              {currentNote.title}
            </p>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-300 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
            aria-label="बंद करें"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-2 bg-slate-50 border-b border-slate-200 flex-shrink-0 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'overview'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            अध्याय सारगर्भित बिंदु
          </button>

          <button
            onClick={() => setActiveTab('readOnline')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
              activeTab === 'readOnline'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>ऑनलाइन पढ़ें (Read Online)</span>
          </button>

          <button
            onClick={() => setActiveTab('examTips')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
              activeTab === 'examTips'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>परीक्षा टिप्स व ट्रिक्स</span>
          </button>
        </div>

        {/* Multi-Note Selector if multiple notes exist for subject */}
        {matchingNotes.length > 1 && (
          <div className="px-6 py-2 bg-blue-50/60 border-b border-blue-100 flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="font-bold text-blue-950 flex-shrink-0">विषय कैप्सूल:</span>
            {matchingNotes.map((n, idx) => (
              <button
                key={n.id}
                onClick={() => setSelectedNoteIndex(idx)}
                className={`px-2.5 py-1 rounded-lg font-bold truncate transition-all ${
                  selectedNoteIndex === idx
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-blue-100 border border-slate-200'
                }`}
              >
                भाग {idx + 1}: {n.topic.split('(')[0]}
              </button>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-800 text-sm">
          
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Summary Box */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
                <h4 className="font-bold text-blue-950 text-xs sm:text-sm flex items-center gap-1.5 mb-1.5">
                  <BookOpen className="w-4 h-4 text-blue-700" />
                  विषय परिचय एवं सारगर्भित निष्कर्ष:
                </h4>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  {currentNote.summary}
                </p>
              </div>

              {/* High-Yield Bullet Points */}
              <div>
                <h4 className="font-black text-slate-900 text-xs sm:text-sm mb-2.5 flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4 text-amber-600" />
                  परीक्षा में बार-बार पूछे जाने वाले प्रमुख बिंदु ({currentNote.bulletPoints.length} फैक्ट्स):
                </h4>
                <div className="space-y-2">
                  {currentNote.bulletPoints.map((point, index) => (
                    <div 
                      key={index} 
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-blue-50/40 transition-colors flex items-start gap-2.5 text-xs sm:text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed text-slate-800">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'readOnline' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-xs font-black text-blue-900 uppercase tracking-wider mb-2">
                  {currentNote.topic}
                </div>
                <div 
                  className="prose prose-sm max-w-none text-slate-800 leading-relaxed space-y-3"
                  dangerouslySetInnerHTML={{ __html: currentNote.readOnlineHtml }}
                />
              </div>

              {/* Quick Formulae / Memory Tricks in Read Online mode */}
              <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-2">
                <h5 className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  शॉर्टकट ट्रिक्स एवं याद रखने के सूत्र (Mnemonics):
                </h5>
                <ul className="list-disc pl-5 space-y-1 text-xs text-amber-900 font-medium">
                  {currentNote.keyFormulaeAndMnemonics.map((trick, i) => (
                    <li key={i}>{trick}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'examTips' && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-700" />
                  <h4 className="font-black text-amber-950 text-sm">
                    परीक्षा-हॉल रणनीति एवं भ्रामक प्रश्नों से बचाव (Exam Hall Strategy):
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                  {currentNote.examTips}
                </p>
              </div>

              {/* Key Formulae and Mnemonics */}
              <div>
                <h4 className="font-black text-slate-900 text-xs sm:text-sm mb-2 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-blue-700" />
                  याद रखने के गोल्डन सूत्र (Golden Mnemonics):
                </h4>
                <div className="space-y-2">
                  {currentNote.keyFormulaeAndMnemonics.map((m, idx) => (
                    <div key={idx} className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 text-xs sm:text-sm text-blue-950 font-bold flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-900 text-white text-[10px] flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer with 1-Click Unbroken Download */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <a
            href="#self-assessment-section"
            onClick={() => {
              onClose();
              onTakeTest();
            }}
            className="px-3.5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>संबंधित क्विज हल करें</span>
          </a>

          <div className="flex items-center gap-2">
            <a
              href={currentNote.downloadRecord?.directUrl || currentNote.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
              title="100% स्थायी सर्वर से संपूर्ण हस्तलिखित नोट्स डाउनलोड करें"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>नोट्स डाउनलोड करें ({currentNote.downloadRecord?.fileSize || 'PDF'})</span>
            </a>
            
            <button 
              onClick={onClose}
              className="px-3.5 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-semibold"
            >
              बंद करें
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
