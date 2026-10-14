'use client';

import React, { useState } from 'react';
import { Megaphone, Play, Pause, ChevronRight } from 'lucide-react';
import { BREAKING_TICKER } from '@/data/portalData';

export default function NewsTicker() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="bg-amber-50 border-b border-amber-200 py-1.5 px-3 sm:px-6 overflow-hidden flex items-center justify-between text-xs text-amber-950">
      <div className="max-w-7xl mx-auto w-full flex items-center gap-2">
        
        {/* Ticker Label Badge */}
        <div className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold px-2.5 py-1 rounded shadow-sm flex-shrink-0 text-[11px] uppercase tracking-wide">
          <Megaphone className="w-3.5 h-3.5 animate-bounce" />
          <span>नवीनतम अपडेट</span>
        </div>

        {/* Moving Ticker Content */}
        <div 
          className="flex-1 overflow-hidden relative cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className={`whitespace-nowrap flex items-center gap-8 text-xs font-semibold text-slate-800 ${
              isPaused ? '' : 'animate-ticker'
            }`}
          >
            {BREAKING_TICKER.map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-2 hover:text-blue-900 transition-colors">
                <span>{item}</span>
                <span className="text-amber-500 font-bold">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 flex-shrink-0 text-slate-500">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 hover:text-slate-900 hover:bg-amber-100 rounded transition-colors"
            title={isPaused ? 'चलाएं (Play)' : 'रोकें (Pause)'}
            aria-label={isPaused ? 'चलाएं' : 'रोकें'}
          >
            {isPaused ? <Play className="w-3 h-3 text-emerald-600" /> : <Pause className="w-3 h-3 text-amber-700" />}
          </button>
          
          <a
            href="#notifications-section"
            className="hidden sm:flex items-center text-[11px] font-bold text-blue-900 hover:underline ml-1"
          >
            <span>सभी देखें</span>
            <ChevronRight className="w-3 h-3" />
          </a>
        </div>

      </div>
    </div>
  );
}
