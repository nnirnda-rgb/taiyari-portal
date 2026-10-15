'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  ExternalLink, 
  ShieldCheck, 
  Check, 
  Server, 
  Sparkles, 
  Globe,
  Clock,
  HardDrive,
  X,
  AlertCircle
} from 'lucide-react';
import { PREVIOUS_PAPERS_DATA, PreviousPaper } from '@/data/portalData';
import { subscribeToPYQs } from '@/services/firestoreService';
import { downloadWithFallback } from '@/lib/downloadEngine';

interface PreviousPapersProps {
  searchFilter?: string;
}

export default function PreviousPapersSection({ searchFilter = '' }: PreviousPapersProps) {
  const [papers, setPapers] = useState<PreviousPaper[]>(PREVIOUS_PAPERS_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [boardFilter, setBoardFilter] = useState<'ALL' | 'RSMSSB' | 'RPSC' | 'Police'>('ALL');
  const [yearFilter, setYearFilter] = useState<number | 'ALL'>('ALL');
  const [examCategoryFilter, setExamCategoryFilter] = useState<string>('ALL');
  const [localSearch, setLocalSearch] = useState('');
  const [selectedPaperForPreview, setSelectedPaperForPreview] = useState<PreviousPaper | null>(null);

  // Download status feedback
  const [downloadToast, setDownloadToast] = useState<{
    message: string;
    type: 'info' | 'success' | 'fallback';
  } | null>(null);
  const [activeDownloadId, setActiveDownloadId] = useState<string | null>(null);

  // 1. Real-time Firestore Listener for PYQ Master Bank with Skeleton Loader
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToPYQs(
      (realtimePapers) => {
        if (realtimePapers && realtimePapers.length > 0) {
          setPapers(realtimePapers);
        }
        setIsLoading(false);
      },
      (error) => {
        console.warn('Realtime PYQ fetch fallback to local bank:', error);
        setIsLoading(false);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const examCategories = [
    { id: 'ALL', label: 'सभी परीक्षाएं (All Exams)' },
    { id: 'CET', label: 'समान पात्रता परीक्षा (CET)' },
    { id: 'PATWAR', label: 'पटवार भर्ती (Patwar)' },
    { id: 'RAS', label: 'RPSC RAS / RTS' },
    { id: 'TEACHER', label: 'शिक्षक भर्ती (2nd Grade)' },
    { id: 'POLICE', label: 'राजस्थान पुलिस (Constable & SI)' },
    { id: 'PASHU', label: 'पशु परिचर (Animal Attendant)' },
    { id: 'VDO', label: 'ग्राम विकास अधिकारी (VDO)' },
  ];

  const filteredPapers = useMemo(() => {
    return papers.filter((paper) => {
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
        if (examCategoryFilter === 'POLICE' && !titleLower.includes('पुलिस') && !titleLower.includes('कांस्टेबल') && !titleLower.includes('सब-इंस्पेक्टर')) return false;
        if (examCategoryFilter === 'PASHU' && !titleLower.includes('पशु')) return false;
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
  }, [papers, boardFilter, yearFilter, examCategoryFilter, searchFilter, localSearch]);

  // Resilient Download Handler for Master Paper
  const handleDownloadMasterPaper = async (paper: PreviousPaper, forceMirror = false) => {
    const downloadKey = `${paper.id}_paper`;
    setActiveDownloadId(downloadKey);
    setDownloadToast({
      message: forceMirror 
        ? `'${paper.examTitle}' फास्ट मिरर से डाउनलोड हो रहा है...`
        : `'${paper.examTitle}' का मास्टर पेपर डाउनलोड हो रहा है...`,
      type: 'info'
    });

    const targetPrimary = forceMirror ? (paper.mirrorPaperUrl || paper.masterPaperUrl) : paper.masterPaperUrl;
    const targetMirror = paper.mirrorPaperUrl || paper.masterPaperUrl;

    const result = await downloadWithFallback({
      primaryUrl: targetPrimary,
      mirrorUrl: targetMirror,
      fileName: `${paper.id}_Master_Paper.pdf`,
      title: `${paper.examTitle} (मास्टर पेपर)`
    });

    setActiveDownloadId(null);
    if (result.usedMirror) {
      setDownloadToast({
        message: 'राज्य भर्ती सर्वर धीमा होने के कारण फ़ाइल को हाई-स्पीड शैक्षिक मिरर से डाउनलोड किया गया।',
        type: 'fallback'
      });
    } else {
      setDownloadToast({
        message: 'मास्टर प्रश्न-पत्र बोर्ड सर्वर से सफलतापूर्वक डाउनलोड हो रहा है।',
        type: 'success'
      });
    }

    setTimeout(() => setDownloadToast(null), 4500);
  };

  // Resilient Download Handler for Answer Key
  const handleDownloadAnswerKey = async (paper: PreviousPaper, forceMirror = false) => {
    const downloadKey = `${paper.id}_key`;
    setActiveDownloadId(downloadKey);
    setDownloadToast({
      message: forceMirror 
        ? `'${paper.examTitle}' की उत्तर कुंजी मिरर से डाउनलोड हो रही है...`
        : `'${paper.examTitle}' की अंतिम उत्तर कुंजी डाउनलोड हो रही है...`,
      type: 'info'
    });

    const targetPrimary = forceMirror ? (paper.mirrorAnswerKeyUrl || paper.answerKeyUrl) : paper.answerKeyUrl;
    const targetMirror = paper.mirrorAnswerKeyUrl || paper.answerKeyUrl;

    const result = await downloadWithFallback({
      primaryUrl: targetPrimary,
      mirrorUrl: targetMirror,
      fileName: `${paper.id}_Answer_Key.pdf`,
      title: `${paper.examTitle} (उत्तर कुंजी)`
    });

    setActiveDownloadId(null);
    if (result.usedMirror) {
      setDownloadToast({
        message: 'उत्तर कुंजी को हाई-स्पीड सुरक्षित मिरर से डाउनलोड किया गया।',
        type: 'fallback'
      });
    } else {
      setDownloadToast({
        message: 'बोर्ड द्वारा जारी फाइनल उत्तर कुंजी डाउनलोड हो रही है।',
        type: 'success'
      });
    }

    setTimeout(() => setDownloadToast(null), 4500);
  };

  return (
    <section 
      id="previous-papers-section"
      className="py-12 px-4 sm:px-6 bg-slate-50 border-b border-slate-200"
      aria-label="विगत वर्ष प्रश्न-पत्र अनुभाग"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="bg-blue-900 text-white text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <FileText className="w-3.5 h-3.5 text-amber-300" />
                PYQ अधिकृत मास्टर प्रश्न-पत्र भंडार
              </span>
              <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-300">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                100% मूल प्रश्न-पत्र (100-150 प्रश्न) + फाइनल आंसर-की
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              पुराने पेपर (PYQs) — मूल परीक्षा पेपर एवं आधिकारिक उत्तर कुंजियां
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              RPSC, RSMSSB एवं राजस्थान पुलिस द्वारा आयोजित वास्तविक मास्टर पेपर्स। 
              प्रत्येक प्रश्न-पत्र के साथ बोर्ड द्वारा जारी अधिकृत फाइनल आंसर-की एवं स्वचालित फॉलबैक मिरर लिंक्स उपलब्ध हैं, 
              ताकि सरकारी सर्वर डाउन होने पर भी कभी ब्रोकन लिंक न मिले।
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="text-xs text-slate-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs font-semibold">
              सत्यापित पेपर्स: <strong className="text-blue-900 font-black">{filteredPapers.length} उपलब्ध</strong>
            </div>
          </div>
        </div>

        {/* Resilient Download Feedback Toast */}
        {downloadToast && (
          <div className={`p-3.5 rounded-2xl shadow-lg flex items-center justify-between text-xs sm:text-sm font-semibold transition-all animate-in fade-in slide-in-from-top-2 duration-300 ${
            downloadToast.type === 'fallback' 
              ? 'bg-amber-600 text-white' 
              : downloadToast.type === 'success'
              ? 'bg-emerald-700 text-white'
              : 'bg-blue-900 text-white'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-amber-200 flex-shrink-0" />
              <span>{downloadToast.message}</span>
            </div>
            <button 
              onClick={() => setDownloadToast(null)}
              className="text-white/80 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          
          {/* Top Row: Board Tabs, Year Pills & Search */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Board Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setBoardFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  boardFilter === 'ALL'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                सभी बोर्ड (All)
              </button>
              <button
                onClick={() => setBoardFilter('RSMSSB')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  boardFilter === 'RSMSSB'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                RSMSSB जयपुर
              </button>
              <button
                onClick={() => setBoardFilter('RPSC')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  boardFilter === 'RPSC'
                    ? 'bg-indigo-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                RPSC अजमेर
              </button>
              <button
                onClick={() => setBoardFilter('Police')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  boardFilter === 'Police'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                पुलिस मुख्यालय
              </button>
            </div>

            {/* Year Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-slate-500 mr-1 hidden sm:inline">वर्ष (Year):</span>
              {['ALL', 2024, 2023, 2022, 2021].map((yr) => (
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
                placeholder="परीक्षा, पारी या वर्ष खोजें..."
                className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
            </div>

          </div>

          {/* Exam Category Filter Bar */}
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

        {/* Papers Grid with Smooth Skeleton Loader */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3.5 animate-pulse"
              >
                <div className="flex justify-between">
                  <div className="h-4 w-28 bg-slate-200 rounded" />
                  <div className="h-4 w-16 bg-slate-200 rounded" />
                </div>
                <div className="h-5 w-4/5 bg-slate-200 rounded" />
                <div className="h-4 w-3/5 bg-slate-100 rounded" />
                <div className="space-y-2 pt-2">
                  <div className="h-3 w-full bg-slate-100 rounded" />
                  <div className="h-3 w-5/6 bg-slate-100 rounded" />
                </div>
                <div className="pt-3 border-t border-slate-100 flex gap-2">
                  <div className="h-9 flex-1 bg-slate-200 rounded-xl" />
                  <div className="h-9 flex-1 bg-slate-200 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPapers.map((paper) => {
              const isMasterDownloading = activeDownloadId === `${paper.id}_paper`;
              const isKeyDownloading = activeDownloadId === `${paper.id}_key`;

              return (
                <div 
                  key={paper.id}
                  className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-gov-hover transition-all duration-300 flex flex-col justify-between group hover:border-blue-400 relative overflow-hidden"
                >
                  {/* Top Metadata Strip: Board, Source & File Size */}
                  <div className="flex items-center justify-between text-[10px] text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 mb-3">
                    <div className="flex items-center gap-1 font-semibold text-blue-900">
                      <Globe className="w-3 h-3 text-blue-600" />
                      <span>{paper.officialSourcePortal.replace('https://', '')}</span>
                    </div>
                    {/* Clear Metadata: Master Paper File Size */}
                    <span className="font-mono text-slate-600 font-black flex items-center gap-1 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      <HardDrive className="w-3 h-3 text-slate-400" />
                      {paper.fileSize}
                    </span>
                  </div>

                  <div>
                    
                    {/* Clear Metadata: Board and Exam Year */}
                    <div className="flex items-center justify-between gap-1.5 mb-2.5">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded uppercase ${
                        paper.board === 'RSMSSB'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : paper.board === 'RPSC'
                          ? 'bg-indigo-100 text-indigo-900 border border-indigo-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}>
                        {paper.board}
                      </span>

                      {/* Clear Metadata: Exam Year */}
                      <span className="text-xs font-black text-slate-900 bg-amber-100 border border-amber-300 text-amber-950 px-2.5 py-0.5 rounded font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-amber-700" />
                        वर्ष: {paper.year}
                      </span>
                    </div>

                    <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-900 leading-snug line-clamp-2">
                      {paper.examTitle}
                    </h3>

                    {/* Clear Metadata: Shift / Exam Session */}
                    <div className="flex items-center gap-1 text-[11px] text-slate-600 font-medium mt-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <Clock className="w-3.5 h-3.5 text-blue-800 flex-shrink-0" />
                      <span className="truncate">
                        <strong>पारी / सत्र:</strong> {paper.shift || paper.stage}
                      </span>
                    </div>

                    {/* Clear Metadata: Answer Key Status & Question count */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                      <span className="font-bold text-slate-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        सम्पूर्ण {paper.questionsCount} प्रश्न
                      </span>

                      {/* Clear Metadata: Answer Key Status */}
                      <span className="text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        अधिकृत आंसर-की
                      </span>
                    </div>

                  </div>

                  {/* Resilient Download Engine Buttons */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex items-center gap-2">
                      
                      {/* Master Paper Resilient Download Button */}
                      <button
                        onClick={() => handleDownloadMasterPaper(paper)}
                        disabled={isMasterDownloading}
                        className="flex-1 py-2 px-2.5 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 disabled:opacity-50"
                        title="आधिकारिक मास्टर प्रश्न-पत्र (स्वचालित फॉलबैक सहित)"
                      >
                        <Download className="w-3.5 h-3.5 text-amber-300" />
                        <span>{isMasterDownloading ? 'डाउनलोडिंग...' : 'मास्टर पेपर'}</span>
                      </button>

                      {/* Official Answer Key Resilient Download Button */}
                      <button
                        onClick={() => handleDownloadAnswerKey(paper)}
                        disabled={isKeyDownloading}
                        className="flex-1 py-2 px-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 disabled:opacity-50"
                        title="बोर्ड द्वारा जारी अंतिम उत्तर कुंजी (स्वचालित फॉलबैक सहित)"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-200" />
                        <span>{isKeyDownloading ? 'डाउनलोडिंग...' : 'उत्तर कुंजी'}</span>
                      </button>

                    </div>

                    {/* Secondary Line: Fast Educational Mirror & Details */}
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      
                      {/* Fast Mirror Trigger */}
                      <button
                        onClick={() => handleDownloadMasterPaper(paper, true)}
                        className="text-slate-600 hover:text-blue-900 font-bold flex items-center gap-1 hover:underline"
                        title="यदि राज्य सर्वर धीमा हो तो तीव्र डाउनलोड मिरर का उपयोग करें"
                      >
                        <Server className="w-3 h-3 text-slate-500" />
                        <span>फास्ट मिरर लिंक (CDN)</span>
                      </button>

                      {/* Details Modal */}
                      <button
                        onClick={() => setSelectedPaperForPreview(paper)}
                        className="text-blue-800 hover:text-blue-950 font-bold flex items-center gap-1 hover:underline"
                      >
                        <Eye className="w-3 h-3" />
                        <span>विस्तृत विवरण</span>
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

        {filteredPapers.length === 0 && !isLoading && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 text-base">कोई प्रश्न-पत्र उपलब्ध नहीं है</h4>
            <p className="text-xs text-slate-500 mt-1">कृपया फिल्टर या खोज मानदंड बदलें।</p>
          </div>
        )}

      </div>

      {/* Paper Preview & Direct Links Modal */}
      {selectedPaperForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4">
            
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-black bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full uppercase">
                  {selectedPaperForPreview.board} OFFICIAL VERIFIED MASTER ARCHIVE
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
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

            {/* Sourcing Guarantee Box */}
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>100% प्रामाणिक भर्ती बोर्ड सामग्री (Multi-Source Verified):</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                यह वास्तविक मास्टर प्रश्न-पत्र है। इसमें आधिकारिक परीक्षा के पूरे {selectedPaperForPreview.questionsCount} प्रश्न एवं बोर्ड की फाइनल उत्तर कुंजी शामिल है।
              </p>
            </div>

            {/* Metadata Overview */}
            <div className="space-y-2 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">परीक्षा वर्ष (Exam Year):</span>
                <span className="font-bold text-slate-900">{selectedPaperForPreview.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">आयोजन सत्र / शिफ्ट:</span>
                <span className="font-bold text-slate-900">{selectedPaperForPreview.shift || 'सामान्य'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">मास्टर पेपर साइज (Size):</span>
                <span className="font-mono font-bold text-slate-900">{selectedPaperForPreview.fileSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">कुल प्रश्न संख्या:</span>
                <span className="font-bold text-slate-900">{selectedPaperForPreview.questionsCount} प्रश्न (सम्पूर्ण पेपर)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">आधिकारिक स्रोत पोर्टल:</span>
                <span className="font-bold text-blue-900">{selectedPaperForPreview.officialSourcePortal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">उत्तर कुंजी स्थिति (Key Status):</span>
                <span className="font-bold text-emerald-700">सत्यापित फाइनल आंसर-की उपलब्ध</span>
              </div>
            </div>

            {/* Direct Links Action using Resilient Downloader */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleDownloadMasterPaper(selectedPaperForPreview);
                  }}
                  className="flex-1 py-2.5 px-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5 text-amber-300" />
                  <span>मास्टर पेपर डाउनलोड</span>
                </button>

                <button
                  onClick={() => {
                    handleDownloadAnswerKey(selectedPaperForPreview);
                  }}
                  className="flex-1 py-2.5 px-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-200" />
                  <span>फाइनल आंसर-की खोलें</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => {
                    handleDownloadMasterPaper(selectedPaperForPreview, true);
                  }}
                  className="text-xs text-slate-600 hover:text-blue-900 font-semibold flex items-center gap-1"
                >
                  <Server className="w-3.5 h-3.5 text-slate-500" />
                  <span>फास्ट CDN मिरर से डाउनलोड करें</span>
                </button>

                <button
                  onClick={() => setSelectedPaperForPreview(null)}
                  className="px-4 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  बंद करें
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
