'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Castle, 
  Mountain, 
  Scale, 
  Sparkles, 
  Calculator, 
  Download, 
  ArrowRight,
  FileCheck2,
  CheckCircle2,
  Trophy,
  Layers,
  GraduationCap
} from 'lucide-react';
import { TAIYARI_MODULES, StudyModule } from '@/data/portalData';
import SubjectNotesModal from './SubjectNotesModal';
import TaiyariPracticeMode from './TaiyariPracticeMode';
import NotesReadingRoom from './NotesReadingRoom';

interface TaiyariSectionProps {
  onStartQuiz: () => void;
  searchFilter?: string;
  selectedExamId?: string;
  initialMode?: 'practice' | 'notes';
}

export default function TaiyariSection({ 
  onStartQuiz, 
  searchFilter = '', 
  selectedExamId = 'all',
  initialMode = 'practice'
}: TaiyariSectionProps) {
  const [selectedModule, setSelectedModule] = useState<StudyModule | null>(null);
  const [activeTabMode, setActiveTabMode] = useState<'practice' | 'notes'>(initialMode);

  // Dynamic icon map
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Castle': return <Castle className="w-5 h-5 text-amber-600" />;
      case 'Mountain': return <Mountain className="w-5 h-5 text-emerald-600" />;
      case 'Scale': return <Scale className="w-5 h-5 text-blue-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-rose-600" />;
      case 'Calculator': return <Calculator className="w-5 h-5 text-indigo-600" />;
      default: return <BookOpen className="w-5 h-5 text-blue-600" />;
    }
  };

  const filteredModules = TAIYARI_MODULES.filter((mod) => {
    if (!searchFilter) return true;
    const term = searchFilter.toLowerCase();
    return (
      mod.hindiTitle.toLowerCase().includes(term) ||
      mod.subject.toLowerCase().includes(term) ||
      mod.summary.toLowerCase().includes(term)
    );
  });

  return (
    <section 
      id="taiyari-section"
      className="py-12 px-4 sm:px-6 bg-slate-50 border-b border-slate-200"
      aria-label="तैयारी एवं अभ्यास अनुभाग"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <BookOpen className="w-3.5 h-3.5" />
                तैयारी प्रकोष्ठ • Practice & Learning Hub
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                बिना समय सीमा (No Timer) गहन अभ्यास एवं नोट्स
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              तैयारी हब — अभ्यास मोड (Practice Mode) एवं ई-बुक्स
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              CET, पटवारी, प्रयोगशाला सहायक, RAS हेतु विषय-वार अभ्यास प्रश्न (तत्काल उत्तर व व्याख्या सहित) एवं प्रामाणिक नोट्स।
            </p>
          </div>

          {/* Sub-Mode Switcher: Practice Mode vs Notes */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-300 shadow-sm">
            <button
              onClick={() => setActiveTabMode('practice')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTabMode === 'practice'
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>अभ्यास मोड (Practice Mode)</span>
              <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.2 rounded font-black">
                लाइव
              </span>
            </button>

            <button
              onClick={() => setActiveTabMode('notes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTabMode === 'notes'
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>अध्ययन सामग्री व नोट्स</span>
              <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded font-bold">
                PDF
              </span>
            </button>
          </div>
        </div>

        {/* Dynamic Display based on activeTabMode */}
        {activeTabMode === 'practice' ? (
          /* 1. Untimed Interactive Practice Mode Component */
          <div className="space-y-6">
            <TaiyariPracticeMode initialExamId={selectedExamId} />
          </div>
        ) : (
          /* 2. Authentic Notes Reading Room Component */
          <div className="space-y-6">
            <NotesReadingRoom searchFilter={searchFilter} />
          </div>
        )}

      </div>

      {/* Subject Notes Details Modal */}
      <SubjectNotesModal
        module={selectedModule}
        isOpen={!!selectedModule}
        onClose={() => setSelectedModule(null)}
        onTakeTest={onStartQuiz}
      />
    </section>
  );
}
