'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Download, 
  Eye, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  FileText, 
  X, 
  Bookmark, 
  Share2, 
  Maximize2, 
  Minimize2,
  ChevronRight,
  ShieldCheck,
  Award,
  Layers,
  ArrowRight,
  Printer,
  Check,
  AlertCircle
} from 'lucide-react';
import { 
  StudyNoteTopic, 
  NOTES_SUBJECT_CHIPS, 
  NotesSubjectFilter,
  AUTHENTIC_STUDY_NOTES 
} from '@/data/notesData';
import { subscribeToStudyNotes } from '@/services/firestoreService';
import { downloadWithFallback } from '@/lib/downloadEngine';
import InAppPdfViewerModal from '@/components/Modals/InAppPdfViewerModal';

interface NotesReadingRoomProps {
  searchFilter?: string;
}

export default function NotesReadingRoom({ searchFilter = '' }: NotesReadingRoomProps) {
  const [notes, setNotes] = useState<StudyNoteTopic[]>(AUTHENTIC_STUDY_NOTES);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedSubject, setSelectedSubject] = useState<NotesSubjectFilter>('सभी');
  const [localSearch, setLocalSearch] = useState<string>('');
  const [activeReadingNote, setActiveReadingNote] = useState<StudyNoteTopic | null>(null);

  // In-App PDF Viewer Modal State
  const [pdfModalData, setPdfModalData] = useState<{
    isOpen: boolean;
    title: string;
    subtitle?: string;
    badge?: string;
    pdfUrl: string;
    downloadUrl?: string;
    fileName?: string;
  } | null>(null);

  // Reader customization state
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [readingTheme, setReadingTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Real-time Firestore Listener with Smooth Skeleton Loading
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToStudyNotes(
      (realtimeNotes) => {
        if (realtimeNotes && realtimeNotes.length > 0) {
          setNotes(realtimeNotes);
        }
        setIsLoading(false);
      },
      (error) => {
        console.warn('Firestore study notes realtime error:', error);
        setIsLoading(false);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  // Filter notes based on subject chips and search query
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      // 1. Subject filter chip
      if (selectedSubject !== 'सभी' && note.subject !== selectedSubject) {
        return false;
      }

      // 2. Search query filter
      const term = (searchFilter || localSearch).trim().toLowerCase();
      if (!term) return true;

      const titleMatch = note.title.toLowerCase().includes(term);
      const subtitleMatch = note.subtitle.toLowerCase().includes(term);
      const subjectMatch = note.subject.toLowerCase().includes(term);
      const highlightsMatch = note.keyHighlights.some((h) => h.toLowerCase().includes(term));
      const introMatch = note.content.introduction.toLowerCase().includes(term);

      return titleMatch || subtitleMatch || subjectMatch || highlightsMatch || introMatch;
    });
  }, [notes, selectedSubject, searchFilter, localSearch]);

  // Handle PDF Download with resilient fallback & attachment headers
  const handlePdfDownload = async (note: StudyNoteTopic, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDownloadStatus(`'${note.title}' की प्रमाणित पीडीएफ डाउनलोड हो रही है...`);

    const result = await downloadWithFallback({
      primaryUrl: note.pdfDownloadUrl,
      mirrorUrl: note.mirrorPdfUrl,
      fileName: `${note.id}.pdf`,
      title: note.title,
      id: note.id,
      type: 'note',
    });

    if (result.usedMirror) {
      setDownloadStatus('हाई-स्पीड शैक्षिक मिरर से पीडीएफ प्राप्त की गई।');
    } else {
      setDownloadStatus('मूल सर्वर से पीडीएफ डाउनलोड हो रही है।');
    }

    setTimeout(() => {
      setDownloadStatus(null);
    }, 4500);
  };

  // Get color styles for subject chips
  const getSubjectBadgeStyle = (subject: string) => {
    switch (subject) {
      case 'नवीनतम 41 जिले व 7 संभाग (पुनर्गठित राजस्थान भूगोल)':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'कला एवं संस्कृति':
        return 'bg-amber-100 text-amber-950 border-amber-300';
      case 'इतिहास':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      case 'राजव्यवस्था':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'हिन्दी':
        return 'bg-indigo-100 text-indigo-900 border-indigo-300';
      case 'सामान्य विज्ञान':
        return 'bg-cyan-100 text-cyan-950 border-cyan-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Patron Dedication Banner for Rural Students */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 rounded-3xl p-5 sm:p-6 text-white border-2 border-amber-400/40 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3" />
                रूपसिंह फनात संकलन
              </span>
              <span className="text-xs text-blue-200 font-semibold">
                100% निःशुल्क ई-अध्ययन कक्ष (Digital Reading Room)
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
              तैयारी नोट्स — ग्रामीण एवं दूरस्थ ढाणियों के अभ्यर्थियों के लिए विशेष
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/90 max-w-3xl leading-relaxed">
              बिना भारी भरकम पीडीएफ डाउनलोड किए सीधे मोबाइल ब्राउज़र पर संपूर्ण प्रामाणिक नोट्स पढ़ें। 
              नवीनतम 41 जिले व 7 संभाग के प्रामाणिक आंकड़े, परीक्षा-उपयोगी स्मरण सूत्र एवं विषय-वार त्वरित पुनरावलोकन।
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-center flex-shrink-0 self-stretch sm:self-auto flex sm:flex-col justify-between sm:justify-center items-center gap-1">
            <div className="text-[11px] text-amber-300 font-bold uppercase">उपलब्ध अध्याय</div>
            <div className="text-xl sm:text-2xl font-black text-white">{notes.length} संकलित विषय</div>
            <div className="text-[10px] text-blue-200">100% सत्यापित पाठ्य सामग्री</div>
          </div>
        </div>
      </div>

      {/* 2. Controls & Subject Filter Chips Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        
        {/* Top Filter Controls: Subject Chips */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-900" />
              विषय चुनें (Subject Filter Chips):
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              दिखा रहे हैं: <strong className="text-blue-900 font-bold">{filteredNotes.length} नोट्स</strong>
            </span>
          </div>

          {/* Chips Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
            {NOTES_SUBJECT_CHIPS.map((chip) => {
              const isSelected = selectedSubject === chip;
              const count = chip === 'सभी' 
                ? notes.length 
                : notes.filter(n => n.subject === chip).length;

              return (
                <button
                  key={chip}
                  onClick={() => setSelectedSubject(chip)}
                  className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-900 text-white border-blue-950 shadow-sm scale-102 font-black'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-950'
                  }`}
                >
                  <span>{chip}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected 
                      ? 'bg-amber-400 text-slate-950' 
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Row */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="नोट्स शीर्षक, अध्याय या कीवर्ड (जैसे: 41 जिले, 7 संभाग, अरावली, बणी-ठणी, हल्दीघाटी)..."
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 sm:top-3" />
            {localSearch && (
              <button
                onClick={() => setLocalSearch('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl font-bold hidden md:flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>मोबाइल डेटा बचत मोड सक्रिय</span>
          </div>
        </div>

      </div>

      {/* Download Alert Toast */}
      {downloadStatus && (
        <div className="bg-emerald-700 text-white p-3 rounded-2xl shadow-lg flex items-center justify-between text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-200 flex-shrink-0" />
            <span>{downloadStatus}</span>
          </div>
          <button 
            onClick={() => setDownloadStatus(null)}
            className="text-emerald-200 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 3. Notes Grid / Skeleton Loader */}
      {isLoading ? (
        /* Smooth Skeleton Loader */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i} 
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="h-5 w-24 bg-slate-200 rounded-md" />
                <div className="h-4 w-16 bg-slate-200 rounded-md" />
              </div>
              <div className="h-6 w-3/4 bg-slate-200 rounded-md" />
              <div className="h-4 w-full bg-slate-100 rounded-md" />
              <div className="space-y-2 pt-2">
                <div className="h-3 w-5/6 bg-slate-100 rounded" />
                <div className="h-3 w-4/6 bg-slate-100 rounded" />
                <div className="h-3 w-3/6 bg-slate-100 rounded" />
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="h-8 w-28 bg-slate-200 rounded-xl" />
                <div className="h-8 w-24 bg-slate-200 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredNotes.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="font-bold text-slate-800 text-base">कोई अध्ययन नोट्स नहीं मिले</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            आपके द्वारा चुने गए फिल्टर &lsquo;{selectedSubject}&rsquo; में कोई परिणाम नहीं है। कृपया सभी विषय चिप्स पर क्लिक करें।
          </p>
          <button
            onClick={() => {
              setSelectedSubject('सभी');
              setLocalSearch('');
            }}
            className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-colors"
          >
            सभी विषय नोट्स देखें
          </button>
        </div>
      ) : (
        /* Actual Notes Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => {
            return (
              <div 
                key={note.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-gov-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-amber-400 relative"
              >
                {/* Card Top Content */}
                <div className="p-5 sm:p-6 space-y-3.5">
                  
                  {/* Badges & Meta */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getSubjectBadgeStyle(note.subject)}`}>
                      {note.subject}
                    </span>

                    <span className="bg-amber-100 text-amber-950 border border-amber-300 text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      {note.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h4 
                      onClick={() => setActiveReadingNote(note)}
                      className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-900 transition-colors cursor-pointer leading-snug"
                    >
                      {note.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {note.subtitle}
                    </p>
                  </div>

                  {/* Highlights Bullet Preview */}
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-2">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <Bookmark className="w-3 h-3 text-blue-900" />
                      प्रमुख परीक्षा बिंदु:
                    </div>
                    {note.keyHighlights.slice(0, 3).map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 leading-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Read time and metadata */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-700" />
                      {note.readTime}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      {note.pageCount} पृष्ठ • {note.fileSize}
                    </span>
                  </div>

                </div>

                {/* Card Bottom Actions */}
                <div className="bg-slate-50 px-4 py-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                  
                  {/* Read In-Browser (Modal / Expandable view for village mobile users) */}
                  <button
                    onClick={() => setActiveReadingNote(note)}
                    className="flex-1 min-w-[90px] py-2 px-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95"
                    title="बिना डाउनलोड किए सीधे मोबाइल पर पूरा अध्याय पढ़ें"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                    <span>ई-नोट्स पढ़ें</span>
                  </button>

                  {/* In-App Google Docs PDF Viewer Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const targetUrl = note.pdfDownloadUrl || note.mirrorPdfUrl;
                      setPdfModalData({
                        isOpen: true,
                        title: note.title,
                        subtitle: `${note.subject} • ${note.pageCount} पृष्ठ • ${note.fileSize}`,
                        badge: note.badge || 'तैयारी नोट्स',
                        pdfUrl: targetUrl,
                        downloadUrl: `/api/pyq-download?id=${encodeURIComponent(note.id)}&type=note&download=true`,
                        fileName: `${note.id}.pdf`
                      });
                    }}
                    className="py-2 px-2.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-2xs transition-colors"
                    title="गूगल क्लाउड व्यूअर में मूल PDF देखें (0 MB स्टोरेज खर्च)"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-700" />
                    <span>PDF देखें</span>
                  </button>

                  {/* Green PDF Download Button wired to CDN / Storage mirror */}
                  <button
                    onClick={(e) => handlePdfDownload(note, e)}
                    className="flex-1 min-w-[100px] py-2 px-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95 border border-emerald-700"
                    title="प्रमाणित नोट्स की संपूर्ण पीडीएफ फाइल सीधे मोबाइल में डाउनलोड करें"
                  >
                    <Download className="w-3.5 h-3.5 text-white" />
                    <span>PDF डाउनलोड</span>
                  </button>

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* 4. Complete In-Browser Distraction-Free Reading Modal */}
      {activeReadingNote && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reading-room-title"
        >
          <div className={`rounded-3xl max-w-4xl w-full shadow-2xl border flex flex-col max-h-[94vh] overflow-hidden transition-colors ${
            readingTheme === 'dark' 
              ? 'bg-slate-900 text-slate-100 border-slate-700' 
              : readingTheme === 'sepia'
              ? 'bg-[#fcf8ed] text-amber-950 border-amber-200'
              : 'bg-white text-slate-900 border-slate-300'
          }`}>
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 p-4 sm:p-5 text-white flex items-center justify-between border-b-2 border-amber-400 flex-shrink-0">
              <div className="pr-4">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {activeReadingNote.subject}
                  </span>
                  <span className="text-[11px] text-blue-200 font-semibold hidden sm:inline">
                    {activeReadingNote.subjectCategory}
                  </span>
                  <span className="text-[11px] text-amber-300 font-bold bg-white/10 px-2 py-0.5 rounded">
                    {activeReadingNote.readTime}
                  </span>
                </div>
                
                <h3 id="reading-room-title" className="text-base sm:text-xl font-black text-white leading-tight">
                  {activeReadingNote.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Close Button */}
                <button
                  onClick={() => setActiveReadingNote(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="अध्ययन कक्ष बंद करें"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Reading Customization Bar (Font size & Eye-friendly theme) */}
            <div className={`px-4 sm:px-6 py-2.5 border-b flex items-center justify-between text-xs flex-wrap gap-2 ${
              readingTheme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              
              {/* Font Size Selector */}
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-500 text-[11px]">अक्षर आकार:</span>
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-1 rounded text-xs font-bold ${fontSize === 'normal' ? 'bg-blue-900 text-white' : 'bg-white border text-slate-700'}`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-1 rounded text-sm font-bold ${fontSize === 'large' ? 'bg-blue-900 text-white' : 'bg-white border text-slate-700'}`}
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2 py-1 rounded text-base font-black ${fontSize === 'xlarge' ? 'bg-blue-900 text-white' : 'bg-white border text-slate-700'}`}
                >
                  A++
                </button>
              </div>

              {/* Theme Selector */}
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-500 text-[11px]">पठन मोड:</span>
                <button
                  onClick={() => setReadingTheme('light')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${readingTheme === 'light' ? 'bg-white shadow-xs border text-slate-900 font-bold' : 'text-slate-600'}`}
                >
                  सामान्य (दिन)
                </button>
                <button
                  onClick={() => setReadingTheme('sepia')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${readingTheme === 'sepia' ? 'bg-[#f5ebd7] text-amber-950 font-bold border border-amber-300' : 'text-slate-600'}`}
                >
                  नेत्र-सुलभ (सेपिया)
                </button>
                <button
                  onClick={() => setReadingTheme('dark')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${readingTheme === 'dark' ? 'bg-slate-950 text-white font-bold' : 'text-slate-600'}`}
                >
                  रात्रि (Dark)
                </button>
              </div>

              {/* Offline indicator */}
              <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>पूरा अध्याय ऑफलाइन सुरक्षित</span>
              </div>
            </div>

            {/* Modal Body: Scrollable Content with Rich Typography */}
            <div className={`p-5 sm:p-8 overflow-y-auto space-y-6 ${
              fontSize === 'xlarge' ? 'text-lg leading-loose' : fontSize === 'large' ? 'text-base leading-relaxed' : 'text-sm leading-relaxed'
            }`}>
              
              {/* Introduction Callout */}
              <div className={`p-4 rounded-2xl border ${
                readingTheme === 'dark' 
                  ? 'bg-blue-950/40 border-blue-800 text-blue-100' 
                  : readingTheme === 'sepia'
                  ? 'bg-amber-100/60 border-amber-300 text-amber-950'
                  : 'bg-blue-50 border-blue-200 text-blue-950'
              }`}>
                <div className="font-black text-sm flex items-center gap-1.5 mb-1.5">
                  <BookOpen className="w-4 h-4 text-blue-700" />
                  अध्याय सारगर्भित परिचय (Chapter Overview):
                </div>
                <p className="leading-relaxed">
                  {activeReadingNote.content.introduction}
                </p>
              </div>

              {/* Dynamic Note Sections */}
              {activeReadingNote.content.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-3.5 pt-2">
                  <h4 className="text-base sm:text-lg font-black text-blue-900 dark:text-blue-300 flex items-center gap-2 border-b pb-2 border-slate-200 dark:border-slate-700">
                    <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                    {section.heading}
                  </h4>

                  {section.subheading && (
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {section.subheading}
                    </div>
                  )}

                  {/* Bullet points if any */}
                  {section.bulletPoints && (
                    <ul className="space-y-2">
                      {section.bulletPoints.map((bp, bpIdx) => (
                        <li key={bpIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                          <span className="leading-relaxed">{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Formatted Table if any */}
                  {section.tableData && (
                    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs my-3">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className={`border-b ${
                          readingTheme === 'dark' 
                            ? 'bg-slate-800 text-slate-200 border-slate-700' 
                            : 'bg-blue-900 text-white'
                        }`}>
                          <tr>
                            {section.tableData.headers.map((h, hIdx) => (
                              <th key={hIdx} className="px-3.5 py-2.5 font-black uppercase text-[11px] tracking-wider">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                          {section.tableData.rows.map((row, rIdx) => (
                            <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-transparent' : 'bg-slate-50/50 dark:bg-slate-800/30'}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-3.5 py-2.5 font-medium">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Memory Trick Box */}
                  {section.examTrick && (
                    <div className="p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border border-amber-300 dark:border-amber-700 rounded-2xl flex items-start gap-3 my-2">
                      <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-black text-amber-900 dark:text-amber-300 uppercase tracking-wide">
                          परीक्षा स्मरण सूत्र (Memory Trick):
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-amber-100 mt-0.5 leading-relaxed">
                          {section.examTrick}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Special Note Box */}
                  {section.specialNote && (
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 italic border-l-4 border-blue-600">
                      {section.specialNote}
                    </div>
                  )}

                </div>
              ))}

              {/* Previous Examination Insights */}
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-2xl space-y-1.5">
                <div className="text-xs font-black text-emerald-950 dark:text-emerald-300 flex items-center gap-1.5 uppercase tracking-wide">
                  <Award className="w-4 h-4 text-emerald-600" />
                  विगत वर्षों की परीक्षा में पूछे गए प्रश्न (Previous Exam Trend):
                </div>
                <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed">
                  {activeReadingNote.content.previousExamInsights}
                </p>
              </div>

              {/* Quick Revision Summary */}
              <div className="p-5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  त्वरित पुनरावलोकन सूत्र (5 सेकंड क्विक रिवीजन):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeReadingNote.content.quickRevisionSummary.map((sum, sumIdx) => (
                    <div key={sumIdx} className="bg-white dark:bg-slate-700 p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 flex items-center gap-2 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                      <span>{sum}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className={`p-4 border-t flex flex-wrap items-center justify-between gap-3 ${
              readingTheme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              
              <div className="text-xs font-semibold text-slate-500">
                संकलन: <strong className="text-slate-900 dark:text-white">{activeReadingNote.authorPatron}</strong> • अद्यतन: {activeReadingNote.lastUpdated}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => {
                    const target = activeReadingNote;
                    const targetUrl = target.pdfDownloadUrl || target.mirrorPdfUrl;
                    setPdfModalData({
                      isOpen: true,
                      title: target.title,
                      subtitle: `${target.subject} • ${target.pageCount} पृष्ठ • ${target.fileSize}`,
                      badge: target.badge || 'तैयारी नोट्स',
                      pdfUrl: targetUrl,
                      downloadUrl: `/api/pyq-download?id=${encodeURIComponent(target.id)}&type=note&download=true`,
                      fileName: `${target.id}.pdf`
                    });
                  }}
                  className="px-3 py-2 bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-200 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-2xs hover:bg-blue-100 transition-colors"
                  title="गूगल क्लाउड व्यूअर में मूल PDF देखें"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-700 dark:text-blue-300" />
                  <span>PDF व्यूअर में खोलें</span>
                </button>

                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.print();
                    }
                  }}
                  className="px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl text-xs font-bold text-slate-700 dark:text-white hover:bg-slate-100 flex items-center gap-1.5 shadow-2xs"
                  title="प्रिंट या पीडीएफ के रूप में सहेजें"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>प्रिंट / सेव</span>
                </button>

                <button
                  onClick={() => handlePdfDownload(activeReadingNote)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
                >
                  <Download className="w-3.5 h-3.5 text-white" />
                  <span>मूल PDF डाउनलोड करें</span>
                </button>

                <button
                  onClick={() => setActiveReadingNote(null)}
                  className="px-3.5 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 rounded-xl text-xs font-bold"
                >
                  बंद करें
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* In-App Google Docs PDF Viewer Modal */}
      {pdfModalData && (
        <InAppPdfViewerModal
          isOpen={pdfModalData.isOpen}
          onClose={() => setPdfModalData(null)}
          title={pdfModalData.title}
          subtitle={pdfModalData.subtitle}
          badge={pdfModalData.badge}
          pdfUrl={pdfModalData.pdfUrl}
          downloadUrl={pdfModalData.downloadUrl}
          fileName={pdfModalData.fileName}
        />
      )}

    </div>
  );
}
