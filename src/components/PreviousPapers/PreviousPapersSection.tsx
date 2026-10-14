'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  CheckCircle, 
  Calendar, 
  Layers, 
  GraduationCap, 
  Eye,
  FileCheck2,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';
import { PREVIOUS_PAPERS_DATA, PreviousPaper } from '@/data/portalData';

interface PreviousPapersProps {
  searchFilter?: string;
}

export default function PreviousPapersSection({ searchFilter = '' }: PreviousPapersProps) {
  const [boardFilter, setBoardFilter] = useState<'ALL' | 'RSMSSB' | 'RPSC'>('ALL');
  const [yearFilter, setYearFilter] = useState<number | 'ALL'>('ALL');
  const [examCategoryFilter, setExamCategoryFilter] = useState<string>('ALL');
  const [localSearch, setLocalSearch] = useState('');
  const [selectedPaperForPreview, setSelectedPaperForPreview] = useState<PreviousPaper | null>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const examCategories = [
    { id: 'ALL', label: 'सभी परीक्षाएं (All Exams)' },
    { id: 'CET', label: 'समान पात्रता परीक्षा (CET)' },
    { id: 'PATWAR', label: 'पटवार भर्ती (Patwar)' },
    { id: 'RAS', label: 'RPSC RAS / RTS' },
    { id: 'TEACHER', label: 'शिक्षक भर्ती (1st & 2nd Grade)' },
    { id: 'SI', label: 'सब-इंस्पेक्टर (Police SI)' },
    { id: 'VDO', label: 'ग्राम विकास अधिकारी (VDO)' },
  ];

  const filteredPapers = PREVIOUS_PAPERS_DATA.filter((paper) => {
    // Board filter
    if (boardFilter !== 'ALL' && paper.board !== boardFilter) return false;
    // Year filter
    if (yearFilter !== 'ALL' && paper.year !== yearFilter) return false;
    // Exam category filter
    if (examCategoryFilter !== 'ALL') {
      const titleLower = paper.examTitle.toLowerCase();
      if (examCategoryFilter === 'CET' && !titleLower.includes('cet')) return false;
      if (examCategoryFilter === 'PATWAR' && !titleLower.includes('पटवार')) return false;
      if (examCategoryFilter === 'RAS' && !titleLower.includes('ras')) return false;
      if (examCategoryFilter === 'TEACHER' && !titleLower.includes('अध्यापक')) return false;
      if (examCategoryFilter === 'SI' && !titleLower.includes('इंस्पेक्टर')) return false;
      if (examCategoryFilter === 'VDO' && !titleLower.includes('vdo') && !titleLower.includes('ग्राम विकास')) return false;
    }
    // Search query
    const term = (searchFilter || localSearch).toLowerCase();
    if (!term) return true;
    return (
      paper.examTitle.toLowerCase().includes(term) ||
      paper.stage.toLowerCase().includes(term) ||
      (paper.shift && paper.shift.toLowerCase().includes(term))
    );
  });

  const handleDownloadStampedPDF = async (paper: PreviousPaper) => {
    try {
      setIsDownloading(paper.id);
      const url = `/api/pyq-download?id=${encodeURIComponent(paper.id)}`;
      
      // Fetch the stamped PDF blob from our backend pdf-lib endpoint
      const response = await fetch(url);
      if (!response.ok) throw new Error('PDF generation failed');

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${paper.board}_${paper.year}_${paper.id}_Stamped.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('Download error:', err);
      alert('प्रश्न-पत्र डाउनलोड करने में त्रुटि हुई। कृपया पुनः प्रयास करें।');
    } finally {
      setIsDownloading(null);
    }
  };

  return (
    <section 
      id="previous-papers-section"
      className="py-12 px-4 sm:px-6 bg-slate-50 border-b border-slate-200"
      aria-label="विगत वर्ष प्रश्न-पत्र अनुभाग"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-800 text-white text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <FileText className="w-3.5 h-3.5" />
                PYQ प्रश्न-पत्र भंडार (Archive)
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                pdf-lib द्वारा प्रामाणिक वॉटरमार्क एवं हेडर युक्त
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              पुराने प्रश्न पत्र (PYQs) — परीक्षा एवं वर्षवार अधिकृत बैंक
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              वर्ष 2021 से 2024 तक आयोजित सभी RPSC एवं RSMSSB मास्टर पेपर्स। 
              प्रत्येक डाउनलोड पर <strong className="text-blue-900">&lsquo;नई सोच, नई पहल | श्रीमान रूप सिंह फणात&rsquo;</strong> का आधिकारिक वॉटरमार्क स्वतः अंकित होता है।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-xs text-slate-600 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs">
              कुल प्रश्न-पत्र: <strong className="text-blue-900">{filteredPapers.length} उपलब्ध</strong>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm mb-6 space-y-4">
          
          {/* Top Row: Board Tabs & Year Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Board Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setBoardFilter('ALL')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  boardFilter === 'ALL'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                सभी बोर्ड (All)
              </button>
              <button
                onClick={() => setBoardFilter('RSMSSB')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  boardFilter === 'RSMSSB'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                RSMSSB जयपुर
              </button>
              <button
                onClick={() => setBoardFilter('RPSC')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  boardFilter === 'RPSC'
                    ? 'bg-indigo-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                RPSC अजमेर
              </button>
            </div>

            {/* Year Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-slate-500 mr-1 hidden sm:inline">वर्ष (Year):</span>
              {[ 'ALL', 2024, 2023, 2022, 2021 ].map((yr) => (
                <button
                  key={String(yr)}
                  onClick={() => setYearFilter(yr as any)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold border transition-colors ${
                    yearFilter === yr
                      ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-2xs font-black'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {yr === 'ALL' ? 'सभी वर्ष' : yr}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative flex-1 sm:max-w-xs">
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="परीक्षा का नाम, वर्ष या शिफ्ट..."
                className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
            </div>

          </div>

          {/* Exam Category Specific Filter Bar */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 mr-1 whitespace-nowrap flex-shrink-0">
              परीक्षा अनुसार:
            </span>
            {examCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setExamCategoryFilter(cat.id)}
                className={`flex-shrink-0 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                  examCategoryFilter === cat.id
                    ? 'bg-blue-100 text-blue-900 border-blue-300 font-bold'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPapers.map((paper) => {
            const isCurrentlyDownloading = isDownloading === paper.id;
            return (
              <div 
                key={paper.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-gov-hover transition-all duration-300 flex flex-col justify-between group hover:border-blue-400 relative overflow-hidden"
              >
                {/* Subtle header stamp indicator on card */}
                <div className="text-[9px] text-blue-700 bg-blue-50/80 px-2 py-0.5 rounded border border-blue-100 font-semibold mb-2 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-blue-600" />
                  <span>नई सोच, नई पहल • अधिकृत वॉटरमार्क</span>
                </div>

                <div>
                  
                  {/* Board and Year Badge */}
                  <div className="flex items-center justify-between gap-1.5 mb-2.5">
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded uppercase ${
                      paper.board === 'RSMSSB'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-indigo-100 text-indigo-900 border border-indigo-300'
                    }`}>
                      {paper.board}
                    </span>

                    <span className="text-xs font-black text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded font-mono">
                      {paper.year}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-900 leading-snug line-clamp-2">
                    {paper.examTitle}
                  </h3>

                  <p className="text-[11px] text-slate-500 mt-1.5">
                    {paper.stage} {paper.shift ? `• ${paper.shift}` : ''}
                  </p>

                  {/* Details line */}
                  <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                    <span className="font-semibold">{paper.questionsCount} प्रश्न</span>
                    <span className="font-semibold text-slate-700">{paper.fileSize}</span>
                  </div>

                  {paper.hasAnswerKey && (
                    <div className="mt-2 text-[10px] text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50/60 p-1 rounded border border-emerald-100">
                      <CheckCircle className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>मॉडल उत्तर कुंजी (Answer Key) संलग्न</span>
                    </div>
                  )}

                </div>

                {/* Action Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPaperForPreview(paper)}
                    className="flex-1 py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                    title="पेपर का विवरण देखें"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-600" />
                    <span>विवरण</span>
                  </button>

                  <button
                    onClick={() => handleDownloadStampedPDF(paper)}
                    disabled={isCurrentlyDownloading}
                    className="flex-1 py-2 px-2 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1 transition-all shadow-sm active:scale-95 disabled:opacity-50"
                    title="pdf-lib द्वारा वॉटरमार्क युक्त PDF डाउनलोड करें"
                  >
                    <Download className={`w-3.5 h-3.5 text-amber-300 ${isCurrentlyDownloading ? 'animate-bounce' : ''}`} />
                    <span>{isCurrentlyDownloading ? 'स्टैम्पिंग...' : 'PDF डाउनलोड'}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {filteredPapers.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 text-base">कोई प्रश्न-पत्र उपलब्ध नहीं है</h4>
            <p className="text-xs text-slate-500 mt-1">कृपया फिल्टर या खोज मानदंड बदलें।</p>
          </div>
        )}

      </div>

      {/* Paper Preview Modal */}
      {selectedPaperForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-black bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full uppercase">
                  {selectedPaperForPreview.board} OFFICIAL ARCHIVE
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  {selectedPaperForPreview.examTitle}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedPaperForPreview(null)}
                className="text-slate-400 hover:text-slate-700 p-1 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Stamp Feature Notice */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-blue-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>स्वचालित वॉटरमार्क एवं हेडर स्टैम्पिंग (pdf-lib):</span>
              </div>
              <p className="text-[11px] text-slate-600">
                इस प्रश्न-पत्र के प्रत्येक पृष्ठ पर <strong className="text-slate-800">&lsquo;नई सोच, नई पहल | श्रीमान रूप सिंह फणात&rsquo;</strong> का आधिकारिक हेडर और वॉटरमार्क स्वचालित रूप से एम्बेड होगा।
              </p>
            </div>

            <div className="space-y-2 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">परीक्षा वर्ष:</span>
                <span className="font-bold text-slate-900">{selectedPaperForPreview.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">आयोजन सत्र / शिफ्ट:</span>
                <span className="font-bold text-slate-900">{selectedPaperForPreview.shift || 'सामान्य'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">कुल प्रश्न:</span>
                <span className="font-bold text-slate-900">{selectedPaperForPreview.questionsCount} प्रश्न</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">उत्तर कुंजी स्थिति:</span>
                <span className="font-bold text-emerald-700">100% सत्यापित मॉडल उत्तर कुंजी संलग्न</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedPaperForPreview(null)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                बंद करें
              </button>
              <button
                onClick={() => {
                  handleDownloadStampedPDF(selectedPaperForPreview);
                  setSelectedPaperForPreview(null);
                }}
                className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" />
                <span>स्टैम्प्ड PDF डाउनलोड करें</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
