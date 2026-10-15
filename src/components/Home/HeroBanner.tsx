'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  BookOpen, 
  FileText, 
  Trophy, 
  ShieldCheck, 
  Award,
  Users
} from 'lucide-react';
import { DIGNITARY_DATA } from '@/data/portalData';

interface HeroBannerProps {
  onNavigate: (sectionId: string) => void;
}

export default function HeroBanner({ onNavigate }: HeroBannerProps) {
  return (
    <section 
      id="home-section"
      className="relative bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden py-10 sm:py-14"
      aria-label="मुख्य बैनर"
    >
      {/* Decorative Traditional Rajasthani Jali and Geometric Watermarks */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Decorative Glow */}
      <div className="absolute -top-40 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Vision, Call to Action */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Patron Guidance Pill */}
            <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-400/20 via-amber-300/20 to-transparent px-3 py-1 rounded-full border border-amber-400/40 text-amber-300 text-xs font-semibold backdrop-blur-sm shadow-sm">
              <div className="w-6 h-6 rounded-full border border-amber-400 overflow-hidden flex-shrink-0 bg-blue-950">
                <Image 
                  src="/images/roopsingh-fanat.png" 
                  alt="रूपसिंह फनात - प्रेरक एवं मुख्य मार्गदर्शक"
                  width={24}
                  height={24}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span>प्रेरक सानिध्य: <strong>{DIGNITARY_DATA.hindiName}</strong></span>
              <span className="hidden sm:inline bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.2 rounded font-bold">
                मार्गदर्शक
              </span>
            </div>

            {/* Main Title */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                युवा शिक्षा पोर्टल
              </h2>
              <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400 mt-1">
                &lsquo;{DIGNITARY_DATA.initiativeName}&rsquo; — {DIGNITARY_DATA.tagline}
              </div>
            </div>

            {/* Subtitle / Objective */}
            <p className="text-sm sm:text-base text-blue-100 font-normal leading-relaxed">
              राजस्थान कर्मचारी चयन बोर्ड (RSMSSB) एवं राजस्थान लोक सेवा आयोग (RPSC) की परीक्षाओं 
              (पटवार, CET, RAS, व्याख्याता, पशु परिचर, VDO) हेतु प्रामाणिक अध्ययन सामग्री, 
              5वें विकल्प वाले मॉक टेस्ट एवं विगत वर्षों के हल प्रश्न-पत्र पूर्णतः निःशुल्क।
            </p>

            {/* Feature Highlights Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-200 pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>RPSC & RSMSSB 5-ऑप्शन टेस्ट इंजन</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>नवीनतम 41 जिले व 7 संभाग (पुनर्गठित राजस्थान भूगोल)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>2021-2024 के 50+ विगत प्रश्न-पत्र (PYQs)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>100% निःशुल्क — कोई पंजीकरण शुल्क नहीं</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('self-assessment-section')}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm px-5 py-3 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <Trophy className="w-4 h-4 text-slate-950" />
                <span>स्वयं की जांच करें (मॉक टेस्ट)</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={() => onNavigate('taiyari-section')}
                className="flex items-center gap-2 bg-blue-950/80 hover:bg-blue-950 text-white font-bold text-sm px-5 py-3 rounded-xl border border-blue-400/40 hover:border-amber-400 shadow transition-all duration-200"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>अध्ययन सामग्री व नोट्स</span>
              </button>

              <button
                onClick={() => onNavigate('previous-papers-section')}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-slate-100 font-semibold text-sm px-4 py-3 rounded-xl border border-white/20 transition-all duration-200"
              >
                <FileText className="w-4 h-4 text-blue-300" />
                <span>पुराने पेपर (PYQs)</span>
              </button>
            </div>

          </div>

          {/* Right Column: Quick Portal Navigation Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-2xl border border-blue-100 text-slate-800">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                  <h3 className="font-bold text-base text-blue-950">
                    त्वरित परीक्षा संबल डेस्क
                  </h3>
                </div>
                <span className="text-[11px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  लाइव हब
                </span>
              </div>

              {/* Quick Hub Grid */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                
                {/* Card 1: All Rajasthan Exams Directory */}
                <div 
                  onClick={() => onNavigate('rajasthan-exams-hub')}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50/80 hover:border-blue-400 cursor-pointer transition-all group"
                >
                  <div className="text-xs font-bold text-blue-900 group-hover:text-blue-700 flex items-center justify-between">
                    <span>भर्ती महा-संग्रह</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    RPSC, RSSB, पुलिस, हाईकोर्ट, ऊर्जा
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold mt-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    45+ आधिकारिक परीक्षाएं
                  </div>
                </div>

                {/* Card 2: Non-CET & Direct Recruitments */}
                <div 
                  onClick={() => onNavigate('rajasthan-exams-hub')}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50/80 hover:border-emerald-400 cursor-pointer transition-all group"
                >
                  <div className="text-xs font-bold text-emerald-950 group-hover:text-emerald-800 flex items-center justify-between">
                    <span>बिना CET सीधी भर्तियां</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    पशु परिचर, RAC, हाईकोर्ट, REET
                  </div>
                  <div className="text-[10px] text-teal-700 font-semibold mt-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                    10वीं/12वीं सीधी भर्तियां
                  </div>
                </div>

                {/* Card 3: Free Notes */}
                <div 
                  onClick={() => onNavigate('taiyari-section')}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50/80 hover:border-amber-400 cursor-pointer transition-all group"
                >
                  <div className="text-xs font-bold text-amber-900 flex items-center justify-between">
                    <span>तैयारी / नोट्स</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    राजस्थान इतिहास, भूगोल, राजव्यवस्था
                  </div>
                  <div className="text-[10px] text-amber-700 font-semibold mt-2">
                    100+ PDF नोट्स
                  </div>
                </div>

                {/* Card 4: Previous Papers */}
                <div 
                  onClick={() => onNavigate('previous-papers-section')}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50/80 hover:border-emerald-400 cursor-pointer transition-all group"
                >
                  <div className="text-xs font-bold text-emerald-900 flex items-center justify-between">
                    <span>पुराने पेपर (PYQs)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    2021 से 2024 तक हल सहित
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold mt-2">
                    50+ मास्टर पेपर्स
                  </div>
                </div>

              </div>

              {/* Bottom Patron Card & Vision Quote */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-3.5 bg-gradient-to-r from-blue-50/90 via-amber-50/40 to-blue-50/90 p-3 rounded-xl border border-blue-100 shadow-sm">
                <div className="w-12 h-12 rounded-full border-2 border-amber-500/80 p-0.5 shadow-md flex-shrink-0 bg-blue-950 overflow-hidden">
                  <Image 
                    src="/images/roopsingh-fanat.png" 
                    alt="रूपसिंह फनात - प्रेरक एवं मुख्य मार्गदर्शक"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover object-top rounded-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-blue-950 font-bold leading-tight line-clamp-2">
                    &ldquo;{DIGNITARY_DATA.visionQuote}&rdquo;
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-blue-900 font-extrabold">
                      — {DIGNITARY_DATA.hindiName}
                    </span>
                    <span className="text-[9px] bg-amber-400/20 text-amber-900 font-bold px-1.5 py-0.2 rounded border border-amber-400/40">
                      {DIGNITARY_DATA.hindiTitle}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
