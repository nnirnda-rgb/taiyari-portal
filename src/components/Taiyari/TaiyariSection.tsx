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

interface TaiyariSectionProps {
  onStartQuiz: () => void;
  searchFilter?: string;
}

export default function TaiyariSection({ onStartQuiz, searchFilter = '' }: TaiyariSectionProps) {
  const [selectedModule, setSelectedModule] = useState<StudyModule | null>(null);
  const [activeTabMode, setActiveTabMode] = useState<'practice' | 'notes'>('practice');

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
            <TaiyariPracticeMode />
          </div>
        ) : (
          /* 2. Handwritten Notes and E-Books Grid */
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-600">
                विषय-वार विस्तृत पाठ्यक्रम एवं हस्तलिखित नोट्स ({filteredModules.length} विषय)
              </span>
              <button
                onClick={() => {
                  alert("सभी 6 विषयों के संयुक्त हस्तलिखित नोट्स बंडल (PDF) का संकलन प्रारंभ हो रहा है...");
                }}
                className="inline-flex items-center gap-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-sm transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" />
                <span>सम्पूर्ण बंडल (All-in-One PDF)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map((mod) => (
                <div 
                  key={mod.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-gov-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-amber-400"
                >
                  <div className="p-6">
                    
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 group-hover:bg-amber-50 transition-colors">
                        {renderIcon(mod.iconName)}
                      </div>

                      <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-200">
                        {mod.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-900 transition-colors">
                      {mod.hindiTitle}
                    </h3>
                    <div className="text-[11px] text-slate-400 font-medium">
                      {mod.subject}
                    </div>

                    <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                      {mod.summary}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        प्रमुख बिंदु:
                      </div>
                      {mod.keyTopics.slice(0, 3).map((topic, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{topic}</span>
                        </div>
                      ))}
                    </div>

                  </div>

                  <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedModule(mod)}
                      className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1"
                    >
                      <span>नोट्स पढ़ें व डाउनलोड करें</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                      <FileCheck2 className="w-3.5 h-3.5 text-blue-700" />
                      <span>{mod.pdfNotesCount} नोट्स</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
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
