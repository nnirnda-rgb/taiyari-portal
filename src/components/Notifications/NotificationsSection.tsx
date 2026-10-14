'use client';

import React, { useState } from 'react';
import { 
  Bell, 
  Calendar, 
  ExternalLink, 
  FileText, 
  AlertCircle, 
  Download, 
  Sparkles,
  Clock,
  ArrowRight,
  Search,
  Filter,
  CheckCircle2,
  Building2,
  Bookmark,
  Share2,
  Eye,
  X,
  FileCheck,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { PORTAL_NOTIFICATIONS, PortalNotification, NotificationTag } from '@/data/portalData';
import AdSenseBanner from '@/components/Ads/AdSenseBanner';

export default function NotificationsSection() {
  const [boardFilter, setBoardFilter] = useState<'ALL' | 'RSMSSB' | 'RPSC'>('ALL');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCircular, setSelectedCircular] = useState<PortalNotification | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Available tag filters specifically highlighting the user-requested tags: 'नई भर्ती', 'परीक्षा तिथि', and 'सिलेबस'
  const filterTags: { id: string; label: string; icon: any; color: string }[] = [
    { id: 'ALL', label: 'सभी परिपत्र', icon: Bell, color: 'text-slate-700 bg-slate-100 hover:bg-slate-200' },
    { id: 'नई भर्ती', label: 'नई भर्ती', icon: Sparkles, color: 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200' },
    { id: 'परीक्षा तिथि', label: 'परीक्षा तिथि', icon: Calendar, color: 'text-amber-700 bg-amber-50 hover:bg-amber-100 border-amber-200' },
    { id: 'सिलेबस', label: 'सिलेबस', icon: FileText, color: 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border-indigo-200' },
  ];

  const filteredNotifs = PORTAL_NOTIFICATIONS.filter((notif) => {
    // Board filter
    if (boardFilter !== 'ALL' && notif.board !== boardFilter) return false;
    
    // Tag filter
    if (selectedTag !== 'ALL' && notif.tag !== selectedTag) return false;

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = notif.title.toLowerCase().includes(q);
      const matchNo = notif.circularNo.toLowerCase().includes(q);
      const matchDept = notif.department.toLowerCase().includes(q);
      const matchSummary = notif.summary.toLowerCase().includes(q);
      return matchTitle || matchNo || matchDept || matchSummary;
    }

    return true;
  });

  const handleDownloadCircular = async (circular: PortalNotification) => {
    try {
      setDownloadingId(circular.id);
      const url = `/api/pyq-download?circularId=${encodeURIComponent(circular.id)}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${circular.board}_Circular_${circular.id}_Stamped.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('Download error:', err);
      alert(`'${circular.title}' की प्रतिलिपि डाउनलोड करने में असमर्थ। कृपया पुनः प्रयास करें।`);
    } finally {
      setDownloadingId(null);
    }
  };

  const upcomingCalendar = [
    { exam: 'पशु परिचर सीधी भर्ती परीक्षा 2023', date: '15, 16, 17 व 18 दिसंबर 2024', board: 'RSMSSB', status: 'निश्चित' },
    { exam: 'CET (सीनियर सेकंडरी स्तर 2024) प्राथमिक परिणाम', date: 'नवंबर 2024 चतुर्थ सप्ताह', board: 'RSMSSB', status: 'संभावित' },
    { exam: 'सहायक अभियोजन अधिकारी (APO) संयुक्त परीक्षा', date: '19 जनवरी 2025', board: 'RPSC', status: 'घोषित' },
    { exam: 'पटवार सीधी भर्ती 2024-25 ऑनलाइन आवेदन', date: 'दिसंबर 2024 प्रथम पखवाड़ा', board: 'RSMSSB', status: 'संभावित' },
    { exam: 'RAS/RTS संयुक्त प्रतियोगी (प्रारंभिक) परीक्षा 2025', date: 'फरवरी - मार्च 2025', board: 'RPSC', status: 'प्रस्तावित' },
    { exam: 'स्कूल प्राध्यापक (School Lecturer - 1st Grade)', date: 'अप्रैल - मई 2025', board: 'RPSC', status: 'कैलेंडर जारी' },
  ];

  return (
    <section 
      id="notifications-section"
      className="py-12 px-4 sm:px-6 bg-slate-50 border-b border-slate-200"
      aria-label="सूचनाएं एवं आधिकारिक परिपत्र अनुभाग"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <Bell className="w-3.5 h-3.5" />
                आधिकारिक सूचना एवं परिपत्र पटल (Official Circulars Board)
              </span>
              <span className="text-xs text-blue-900 bg-blue-50 border border-blue-200 font-bold px-2 py-0.5 rounded-full">
                दैनिक अद्यतन बुलेटिन
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              सूचनाएं — राजस्थान सरकारी विज्ञप्तियां, परीक्षा तिथि एवं सिलेबस
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              राजस्थान कर्मचारी चयन बोर्ड (RSMSSB) एवं राजस्थान लोक सेवा आयोग (RPSC) द्वारा जारी सभी अधिकृत परिपत्र व आदेश।
            </p>
          </div>

          {/* Quick Counter */}
          <div className="flex items-center gap-2">
            <div className="text-xs text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs">
              सक्रिय परिपत्र: <strong className="text-blue-900">{filteredNotifs.length} परिपत्र उपलब्ध</strong>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-6 space-y-4">
          
          {/* Top Row: Board Filter Tabs & Search Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Board Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start">
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
                RSMSSB जयपुर (कर्मचारी चयन बोर्ड)
              </button>
              <button
                onClick={() => setBoardFilter('RPSC')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  boardFilter === 'RPSC'
                    ? 'bg-indigo-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                RPSC अजमेर (लोक सेवा आयोग)
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="पत्रांक, पद, विभाग या विषय खोजें..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Bottom Row: Tag Filter Pills (Explicitly highlighting: नई भर्ती, परीक्षा तिथि, सिलेबस) */}
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              श्रेणी टैग:
            </span>
            {filterTags.map((t) => {
              const Icon = t.icon;
              const isSelected = selectedTag === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTag(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                      : t.color
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Content Layout: Left = Categorized Circular Cards Grid (8 cols), Right = Exam Calendar 2024-25 (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Categorized Circular Cards (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-700" />
                आधिकारिक परिपत्र एवं विज्ञप्ति पटल
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {filteredNotifs.length} परिपत्र प्रदर्शित
              </span>
            </div>

            {filteredNotifs.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-700">कोई परिपत्र नहीं मिला</h4>
                <p className="text-xs text-slate-500 mt-1">
                  कृपया खोज शब्द बदलें या अन्य फ़िल्टर चुनें।
                </p>
                <button
                  onClick={() => { setBoardFilter('ALL'); setSelectedTag('ALL'); setSearchQuery(''); }}
                  className="mt-4 px-4 py-1.5 text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  सभी फ़िल्टर रीसेट करें
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotifs.map((circular) => {
                  const isRsmssb = circular.board === 'RSMSSB';
                  
                  // Color accents according to required tags
                  const tagStyles: Record<NotificationTag, { bg: string; text: string; border: string }> = {
                    'नई भर्ती': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
                    'परीक्षा तिथि': { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
                    'सिलेबस': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
                    'प्रवेश पत्र': { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
                    'परिणाम': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
                  };

                  const currentTagStyle = tagStyles[circular.tag] || { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' };

                  return (
                    <article 
                      key={circular.id}
                      className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group relative overflow-hidden"
                    >
                      {/* Left accent strip */}
                      <div 
                        className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                          isRsmssb ? 'bg-emerald-600' : 'bg-indigo-700'
                        }`} 
                      />

                      {/* Header row: Board badge + Tag pill + Urgent/New badge + Date */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 pl-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Board Badge */}
                          <span 
                            className={`text-[11px] font-black px-2.5 py-0.5 rounded-md ${
                              isRsmssb 
                                ? 'bg-emerald-700 text-white' 
                                : 'bg-blue-900 text-white'
                            }`}
                          >
                            {circular.board}
                          </span>

                          {/* Tag Badge: नई भर्ती, परीक्षा तिथि, सिलेबस */}
                          <span 
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${currentTagStyle.bg} ${currentTagStyle.text} ${currentTagStyle.border} flex items-center gap-1`}
                          >
                            {circular.tag === 'नई भर्ती' && <Sparkles className="w-3 h-3" />}
                            {circular.tag === 'परीक्षा तिथि' && <Calendar className="w-3 h-3" />}
                            {circular.tag === 'सिलेबस' && <FileText className="w-3 h-3" />}
                            {circular.tag}
                          </span>

                          {/* Urgent / New Pill */}
                          {circular.isUrgent && (
                            <span className="text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded-md font-bold animate-pulse flex items-center gap-1">
                              अति महत्वपूर्ण
                            </span>
                          )}
                          {circular.isNew && !circular.isUrgent && (
                            <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded-md font-bold">
                              नवीन
                            </span>
                          )}
                        </div>

                        {/* Dispatch date */}
                        <div className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{circular.date}</span>
                        </div>
                      </div>

                      {/* Circular Dispatch Reference */}
                      <div className="text-[11px] text-slate-500 font-mono mb-2 pl-1 flex items-center gap-1">
                        <FileCheck className="w-3 h-3 text-slate-400" />
                        <span>पत्रांक: {circular.circularNo}</span>
                      </div>

                      {/* Circular Title */}
                      <h4 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-blue-900 transition-colors leading-snug pl-1">
                        {circular.title}
                      </h4>

                      {/* Department Label */}
                      <div className="mt-1 text-xs text-slate-600 flex items-center gap-1 pl-1">
                        <Building2 className="w-3.5 h-3.5 text-blue-700 flex-shrink-0" />
                        <span className="font-semibold">{circular.department}</span>
                      </div>

                      {/* Official Summary */}
                      <p className="mt-2 text-xs text-slate-600 leading-relaxed pl-1 line-clamp-2">
                        {circular.summary}
                      </p>

                      {/* Key Highlights Micro-Table */}
                      {circular.keyDetails && circular.keyDetails.length > 0 && (
                        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px]">
                          {circular.keyDetails.map((kd, idx) => (
                            <div key={idx} className="bg-white p-2 rounded-lg border border-slate-200/60 shadow-2xs">
                              <span className="block text-[10px] font-bold text-slate-500 uppercase">
                                {kd.label}
                              </span>
                              <span className="font-black text-slate-800 line-clamp-1 mt-0.5">
                                {kd.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Footer Actions */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pl-1">
                        <div className="text-[11px] text-slate-500 flex items-center gap-2">
                          <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                            {circular.fileSize}
                          </span>
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> अधिकृत अभिलेख
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* View Full Order Details Button */}
                          <button
                            onClick={() => setSelectedCircular(circular)}
                            className="flex-1 sm:flex-none text-xs font-bold text-slate-700 hover:text-blue-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>विस्तृत आदेश</span>
                          </button>

                          {/* Download Stamped PDF Button */}
                          <button
                            onClick={() => handleDownloadCircular(circular)}
                            disabled={downloadingId === circular.id}
                            className="flex-1 sm:flex-none text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 px-4 py-1.5 rounded-xl transition-all shadow-xs hover:shadow flex items-center justify-center gap-1.5 disabled:opacity-50"
                          >
                            {downloadingId === circular.id ? (
                              <>
                                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>तैयार हो रहा है...</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5" />
                                <span>विज्ञप्ति PDF</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                    </article>
                  );
                })}
              </div>
            )}

          </div>

          {/* Right Column: Upcoming Exam Calendar & Official Portals (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Calendar Box */}
            <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 rounded-2xl p-5 text-white shadow-xl border border-blue-800">
              
              <div className="flex items-center justify-between pb-3 border-b border-blue-800">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-base text-white">
                    परीक्षा कैलेंडर 2024-25
                  </h3>
                </div>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded shadow-2xs">
                  आधिकारिक
                </span>
              </div>

              <p className="text-xs text-blue-200 mt-2">
                RSMSSB एवं RPSC द्वारा प्रस्तावित आगामी प्रतियोगी परीक्षाओं की तिथियां:
              </p>

              {/* Calendar Timeline list */}
              <div className="mt-4 space-y-2.5">
                {upcomingCalendar.map((event, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:border-amber-400/50 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className={`font-black px-1.5 py-0.2 rounded ${
                        event.board === 'RSMSSB' ? 'bg-emerald-500/30 text-emerald-300' : 'bg-indigo-400/30 text-indigo-200'
                      }`}>
                        {event.board}
                      </span>
                      <span className="text-amber-300 font-semibold">
                        {event.status}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white leading-snug">
                      {event.exam}
                    </div>
                    <div className="text-[11px] text-blue-200 flex items-center gap-1 mt-1 font-mono">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{event.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom official warning disclaimer */}
              <div className="mt-5 pt-3 border-t border-blue-800 text-[11px] text-blue-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>
                  अभ्यर्थी परीक्षा तिथि एवं समय के आधिकारिक सत्यापन हेतु नियमित रूप से अधिकृत बोर्ड वेबसाइट का ही अवलोकन करें।
                </span>
              </div>

            </div>

            {/* Official Portals Direct Quick Links */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-blue-800" />
                राजस्थान सरकार आधिकारिक पोर्टल लिंक
              </h4>

              <div className="space-y-2 text-xs">
                <a 
                  href="https://rsmssb.rajasthan.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 transition-colors font-medium text-slate-700 group"
                >
                  <span>RSMSSB आधिकारिक पोर्टल</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a 
                  href="https://rpsc.rajasthan.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-800 border border-slate-200 transition-colors font-medium text-slate-700 group"
                >
                  <span>RPSC आधिकारिक पोर्टल</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a 
                  href="https://sso.rajasthan.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-800 border border-slate-200 transition-colors font-medium text-slate-700 group"
                >
                  <span>SSO Rajasthan (OTR व एडमिट कार्ड)</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Initiative Assurance Box */}
            <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200/80 text-xs">
              <div className="flex items-center gap-2 font-bold text-amber-900 mb-1">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>'नई सोच, नई पहल' संबल प्रकोष्ठ</span>
              </div>
              <p className="text-amber-800 leading-relaxed text-[11px]">
                रूपसिंह फनात के मार्गदर्शन में युवाओं को समय पर निष्पक्ष, निःशुल्क एवं शत-प्रतिशत प्रामाणिक सूचना उपलब्ध कराना हमारा संकल्प है। आइए मिलकर कल को और बेहतर बनाते हैं।
              </p>
            </div>

            {/* Non-intrusive Sidebar Ad Slot (Google AdSense Placeholder) */}
            <AdSenseBanner placement="sidebar" adSlot="8923471029" />
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* FULL CIRCULAR ORDER VIEWER MODAL */}
      {/* ========================================================================= */}
      {selectedCircular && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedCircular(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCircular(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Government Letterhead Header */}
            <div className="text-center pb-4 border-b border-slate-200">
              <div className="inline-block bg-blue-900 text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider mb-2">
                राजस्थान सरकार (GOVERNMENT OF RAJASTHAN)
              </div>
              <h3 className="text-lg font-black text-slate-900">
                {selectedCircular.board === 'RSMSSB'
                  ? 'राजस्थान कर्मचारी चयन बोर्ड, जयपुर'
                  : 'राजस्थान लोक सेवा आयोग, अजमेर'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {selectedCircular.department}
              </p>
            </div>

            {/* Reference & Date strip */}
            <div className="my-4 p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-600 gap-2">
              <div>
                <strong>पत्रांक:</strong> {selectedCircular.circularNo}
              </div>
              <div>
                <strong>दिनांक:</strong> {selectedCircular.date}
              </div>
            </div>

            {/* Tag & Category badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-900">
                श्रेणी: {selectedCircular.tag}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900">
                स्थिति: आधिकारिक प्रतिलिपि
              </span>
            </div>

            {/* Subject */}
            <div className="mb-4">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                विषय:
              </h4>
              <p className="text-base font-black text-slate-900 mt-0.5 leading-snug">
                {selectedCircular.title}
              </p>
            </div>

            {/* Summary & Directives */}
            <div className="mb-6 space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                विस्तृत विवरण एवं विभागीय आदेश:
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-blue-50/40 p-4 rounded-xl border border-blue-100">
                {selectedCircular.summary}
              </p>
            </div>

            {/* Key Specifications Grid */}
            {selectedCircular.keyDetails && selectedCircular.keyDetails.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                  प्रमुख विनिर्देश तालिका:
                </h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  {selectedCircular.keyDetails.map((kd, idx) => (
                    <div 
                      key={idx} 
                      className={`grid grid-cols-1 sm:grid-cols-3 p-2.5 ${
                        idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                      } border-b border-slate-200 last:border-b-0`}
                    >
                      <span className="font-bold text-slate-600 sm:col-span-1">
                        {kd.label}
                      </span>
                      <span className="font-black text-slate-900 sm:col-span-2">
                        {kd.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mandatory Candidate Instructions */}
            <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                <span>महत्वपूर्ण दिशा-निर्देश एवं 5वां विकल्प नियम:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-800">
                <li>OMR उत्तर पत्रक में 5वें विकल्प (Option E) को भरना अनिवार्य है; अनुत्तरित छोड़ने पर 1/3 अंक काटा जाएगा।</li>
                <li>10% से अधिक प्रश्नों में 5वां विकल्प नहीं भरने वाले अभ्यर्थियों को परीक्षा हेतु अयोग्य घोषित किया जाएगा।</li>
                <li>परीक्षा केंद्र पर 2 घंटे पूर्व रिपोर्ट करना अनिवार्य है।</li>
              </ul>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-slate-500">
                वाटरमार्क: <strong className="text-blue-900">&lsquo;नई सोच, नई पहल | रूपसिंह फनात&rsquo;</strong>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedCircular(null)}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  बंद करें
                </button>

                <button
                  onClick={() => handleDownloadCircular(selectedCircular)}
                  disabled={downloadingId === selectedCircular.id}
                  className="flex-1 sm:flex-none px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-900 hover:bg-blue-950 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  {downloadingId === selectedCircular.id ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>डाउनलोड हो रहा है...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>विज्ञप्ति PDF डाउनलोड करें</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
