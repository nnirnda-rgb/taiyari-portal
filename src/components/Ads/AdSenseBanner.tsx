'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Info, X, ExternalLink, ShieldCheck } from 'lucide-react';

interface AdSenseBannerProps {
  placement: 'sidebar' | 'footer' | 'inline';
  className?: string;
  adSlot?: string;
  adClient?: string;
}

export default function AdSenseBanner({
  placement,
  className = '',
  adSlot = '8923471029',
  adClient = 'ca-pub-4361999133480039'
}: AdSenseBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && !isDismissed) {
        ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle = 
          (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.debug('AdSense request status:', err);
    }
  }, [isDismissed]);

  if (isDismissed) return null;

  if (placement === 'sidebar') {
    return (
      <aside 
        aria-label="प्रायोजित सूचना एवं विज्ञापन"
        className={`bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-2xl border border-slate-200 p-3.5 relative overflow-hidden transition-all ${className}`}
      >
        {/* Ad Tag Header */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold mb-2 pb-1.5 border-b border-slate-200/60">
          <span className="flex items-center gap-1 uppercase tracking-wider">
            <Info className="w-3 h-3 text-slate-400" />
            प्रायोजित विज्ञापन (Google AdSense)
          </span>
          <button 
            onClick={() => setIsDismissed(true)}
            className="hover:text-slate-600 transition-colors p-0.5 rounded"
            title="विज्ञापन छिपाएं"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Ad Container Placeholder (Google AdSense Standard 300x250 Medium Rectangle) */}
        <div className="w-full min-h-[160px] bg-white rounded-xl border border-dashed border-slate-300 p-3 flex flex-col justify-between items-center text-center relative group">
          
          {/* Official Mock AdSense markup */}
          <ins 
            className="adsbygoogle"
            style={{ display: 'block', width: '100%' }}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format="rectangle"
            data-full-width-responsive="true"
          />

          <div className="my-auto space-y-1.5">
            <span className="inline-block bg-blue-100 text-blue-900 text-[10px] font-black px-2 py-0.5 rounded-full">
              शैक्षणिक संबल
            </span>
            <h5 className="text-xs font-black text-slate-800 leading-snug">
              राजस्थान प्रतियोगी परीक्षा प्रामाणिक संदर्भ पुस्तकें एवं अध्ययन किट
            </h5>
            <p className="text-[11px] text-slate-500 line-clamp-2">
              आरपीएससी एवं कर्मचारी चयन बोर्ड परीक्षाओं हेतु प्रामाणिक संदर्भ ग्रंथ सूची।
            </p>
          </div>

          <div className="w-full pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> सुरक्षित विज्ञापन
            </span>
            <span className="text-blue-900 font-bold flex items-center gap-0.5">
              विवरण <ExternalLink className="w-2.5 h-2.5" />
            </span>
          </div>

        </div>

        <div className="text-[9px] text-center text-slate-400 mt-1.5 font-medium">
          विज्ञापन राजस्व का उपयोग ग्रामीण विद्यार्थियों के निःशुल्क संबल हेतु किया जाता है
        </div>
      </aside>
    );
  }

  // Footer Placement (Leaderboard 728x90 / Responsive 320x50 on mobile)
  return (
    <div 
      aria-label="प्रायोजित सूचना एवं विज्ञापन"
      className={`w-full max-w-7xl mx-auto my-6 px-4 sm:px-6 ${className}`}
    >
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-3 sm:p-4 relative overflow-hidden shadow-2xs">
        
        {/* Top Mini Header */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold mb-2 pb-1 border-b border-slate-200/60">
          <span className="flex items-center gap-1 uppercase tracking-wider">
            <Info className="w-3 h-3 text-slate-400" />
            प्रायोजित विज्ञापन (Google AdSense • Responsive Leaderboard)
          </span>
          <button 
            onClick={() => setIsDismissed(true)}
            className="hover:text-slate-600 transition-colors p-0.5 rounded"
            title="विज्ञापन छिपाएं"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* AdSense Slot (Standard 728x90 / 970x90 Banner) */}
        <div className="w-full min-h-[70px] sm:min-h-[90px] bg-white rounded-xl border border-dashed border-slate-300 p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          
          <ins 
            className="adsbygoogle"
            style={{ display: 'block', width: '100%' }}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-900 font-black text-sm">
              <Sparkles className="w-5 h-5 text-blue-800" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.2 rounded">
                  प्रायोजित
                </span>
                <span className="text-xs font-black text-slate-800">
                  राजस्थान युवा कौशल एवं डिजिटल लाइब्रेरी अभियान
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 hidden sm:block">
                राजकीय प्रतियोगी परीक्षाओं हेतु जिला एवं तहसील स्तर पर डिजिटल वाचनालय एवं निःशुल्क ई-संसाधन केंद्र।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[10px] text-slate-400 hidden md:inline">AdSlot: {adSlot}</span>
            <button className="px-3 py-1.5 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1 shadow-2xs">
              <span>जानकारी प्राप्त करें</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
