'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Award, Quote, ChevronRight, Sparkles, BookCheck } from 'lucide-react';
import { DIGNITARY_DATA } from '@/data/portalData';
import RoopSinghVisionModal from '@/components/Modals/RoopSinghVisionModal';

export default function DignitaryBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section 
        className="w-full bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white border-b-2 border-amber-400/80 shadow-md relative overflow-hidden"
        aria-label="मुख्य मार्गदर्शक सम्मान पटल"
      >
        {/* Subtle Decorative Background Accents */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* Subtle royal glow */}
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Left: Dignitary Photo Frame & Identity */}
            <div className="flex items-center gap-3.5 sm:gap-4 w-full md:w-auto">
              
              {/* Photo Frame with Royal Gold Border */}
              <div className="relative group flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-lg shadow-blue-950/50">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-blue-900 bg-slate-900 relative">
                    <Image
                      src="/images/roopsingh-fanat.png"
                      alt="रूपसिंह फनात - प्रेरक एवं मुख्य मार्गदर्शक"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-300"
                      priority
                    />
                  </div>
                </div>

                {/* Verified Patron Emblem Badge */}
                <div 
                  className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 p-1 rounded-full shadow-md border border-amber-200" 
                  title="मुख्य मार्गदर्शक (Patron)"
                >
                  <Award className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Dignitary Name & Titles */}
              <div className="text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-amber-400/20 text-amber-300 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded border border-amber-400/40 tracking-wider uppercase">
                    {DIGNITARY_DATA.hindiTitle}
                  </span>
                  <span className="hidden sm:inline-block text-[11px] text-blue-200 font-medium">
                    {DIGNITARY_DATA.title}
                  </span>
                </div>

                <h1 className="text-lg sm:text-2xl font-black text-white tracking-wide mt-0.5 drop-shadow-sm flex items-center gap-1.5">
                  <span>{DIGNITARY_DATA.hindiName}</span>
                </h1>
                
                <p className="text-[11px] sm:text-xs text-blue-200 font-medium">
                  {DIGNITARY_DATA.name}
                </p>
              </div>

            </div>

            {/* Center: Dedication Quote & Slogan */}
            <div className="flex-1 text-center md:px-6 w-full md:w-auto border-t md:border-t-0 md:border-l md:border-r border-blue-800/80 pt-2.5 md:pt-0">
              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 px-3.5 py-1 rounded-full border border-amber-400/50 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span className="text-xs sm:text-sm font-extrabold text-amber-300 tracking-wider">
                  {DIGNITARY_DATA.initiativeName}
                </span>
                <span className="text-amber-200/60 hidden sm:inline">•</span>
                <span className="text-xs text-amber-200 hidden sm:inline">
                  {DIGNITARY_DATA.tagline}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              </div>

              <p className="text-xs sm:text-[13px] text-white font-semibold leading-relaxed">
                &ldquo;{DIGNITARY_DATA.visionQuote}&rdquo;
              </p>
            </div>

            {/* Right: Vision Action Button & Badge */}
            <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group flex-1 md:flex-initial justify-center"
                title="मार्गदर्शक का संदेश एवं संकल्प पढ़ें"
              >
                <Quote className="w-3.5 h-3.5 text-slate-900 group-hover:rotate-12 transition-transform" />
                <span>मार्गदर्शक का संदेश</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-900 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <div className="hidden xl:flex flex-col text-right text-[11px] text-blue-200 pl-2">
                <span className="font-bold text-white flex items-center gap-1 justify-end">
                  <BookCheck className="w-3 h-3 text-emerald-400" />
                  100% निःशुल्क
                </span>
                <span className="text-[10px] text-blue-300">ग्रामीण-शहरी युवा सशक्तिकरण</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Patron Vision Modal */}
      <RoopSinghVisionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
