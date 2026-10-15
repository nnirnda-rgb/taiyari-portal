'use client';

import React, { useState, useEffect } from 'react';
import { Eye, Type, Volume2, Calendar, Sparkles, Globe } from 'lucide-react';

export default function TopAccessibilityBar() {
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      setCurrentTime(now.toLocaleString('hi-IN', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleFontSize = (delta: number) => {
    const newLevel = Math.max(-1, Math.min(2, fontSizeLevel + delta));
    setFontSizeLevel(newLevel);
    const root = document.documentElement;
    if (newLevel === -1) root.style.fontSize = '90%';
    else if (newLevel === 0) root.style.fontSize = '100%';
    else if (newLevel === 1) root.style.fontSize = '108%';
    else if (newLevel === 2) root.style.fontSize = '116%';
  };

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
    if (!isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  };

  return (
    <div className="w-full">
      {/* Tricolor National Strip */}
      <div className="tricolor-strip w-full" aria-hidden="true" />

      {/* Accessibility Bar */}
      <header className="bg-slate-900 text-slate-200 text-xs border-b border-slate-800 py-1.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Left: Trust Initiative & Date */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="font-semibold text-amber-400 flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              ॥ निःशुल्क जन-शिक्षा संकल्प ॥ | युवा शिक्षा संबल पहल • रूपसिंह फनात
            </span>
            <span className="hidden md:inline-block text-slate-400">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentTime || 'बुधवार, 14 अक्टूबर 2024'}</span>
            </span>
          </div>

          {/* Right: Accessibility Controls */}
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            {/* Clean Dedication Tag */}
            <div className="hidden lg:flex items-center gap-1.5 text-amber-300 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700/80 font-bold text-[11px] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>॥ निःशुल्क जन-शिक्षा संकल्प — समर्पित ग्रामीण युवा शक्ति को ॥</span>
            </div>

            {/* Screen Reader skip */}
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:bg-amber-400 focus:text-slate-900 px-2 py-0.5 rounded font-bold"
            >
              मुख्य विषयवस्तु पर जाएं (Skip to content)
            </a>

            {/* Font Resizing Controls */}
            <div className="flex items-center bg-slate-800 rounded px-1.5 py-0.5 border border-slate-700 gap-1" title="फॉन्ट आकार बदलें">
              <span className="text-[10px] text-slate-400 mr-1 hidden sm:inline">आकार:</span>
              <button 
                onClick={() => handleFontSize(-1)}
                className={`px-1 rounded hover:bg-slate-700 ${fontSizeLevel === -1 ? 'text-amber-400 font-bold' : 'text-slate-300'}`}
                title="छोटा आकार (A-)"
              >
                A-
              </button>
              <button 
                onClick={() => handleFontSize(0)}
                className={`px-1 rounded hover:bg-slate-700 ${fontSizeLevel === 0 ? 'text-amber-400 font-bold' : 'text-slate-300'}`}
                title="सामान्य आकार (A)"
              >
                A
              </button>
              <button 
                onClick={() => handleFontSize(1)}
                className={`px-1 rounded hover:bg-slate-700 ${fontSizeLevel >= 1 ? 'text-amber-400 font-bold' : 'text-slate-300'}`}
                title="बड़ा आकार (A+)"
              >
                A+
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              onClick={toggleHighContrast}
              className={`flex items-center gap-1 px-2 py-0.5 rounded border transition-colors ${
                isHighContrast 
                  ? 'bg-amber-400 text-slate-900 border-amber-300 font-bold' 
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
              }`}
              title="उच्च कंट्रास्ट मोड"
            >
              <Eye className="w-3 h-3" />
              <span className="text-[11px] hidden sm:inline">{isHighContrast ? 'सामान्य' : 'उच्च कंट्रास्ट'}</span>
            </button>

            {/* Language Switcher Badge */}
            <div className="flex items-center gap-1 text-[11px] bg-blue-900/60 text-blue-200 px-2 py-0.5 rounded border border-blue-700">
              <Globe className="w-3 h-3 text-blue-300" />
              <span className="font-semibold text-white">हिन्दी</span>
              <span className="text-slate-400">/ Eng</span>
            </div>
          </div>

        </div>
      </header>
    </div>
  );
}
