'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, ExternalLink, ShieldCheck, HelpCircle } from 'lucide-react';

interface GovHeaderProps {
  onSearch?: (query: string) => void;
}

export default function GovHeader({ onSearch }: GovHeaderProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
    // Also scroll smoothly to search results if user searched
    const el = document.getElementById('search-anchor') || document.getElementById('rsmssb-hub');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Official State Emblem & Portal Branding */}
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          {/* Official Emblem */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 relative">
            <Image
              src="/images/rajasthan_seal.svg"
              alt="राजस्थान सरकार प्रतीक चिह्न"
              width={64}
              height={64}
              className="w-full h-full object-contain"
              priority
            />
          </div>

          {/* Typography */}
          <div className="border-l-2 border-slate-200 pl-3.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-widest text-blue-900 uppercase">
                राजस्थान सरकार • GOVT. OF RAJASTHAN
              </span>
              <span className="bg-blue-100 text-blue-900 text-[10px] font-bold px-1.5 py-0.2 rounded border border-blue-200">
                प्रामाणिक पोर्टल
              </span>
            </div>

            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>नई सोच, नई पहल</span>
              <span className="text-xs sm:text-sm font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200 hidden sm:inline-block">
                तैयारी पोर्टल
              </span>
            </div>

            <p className="text-xs text-slate-600 font-medium hidden sm:block">
              राजस्थान कर्मचारी चयन बोर्ड (RSMSSB) एवं लोक सेवा आयोग (RPSC) विशेष परीक्षा संबल
            </p>
          </div>
        </div>

        {/* Right: Quick Search & SSO Direct Link */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
          
          {/* Search Box */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="relative flex-1 sm:w-72 md:w-80"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (onSearch) onSearch(e.target.value);
              }}
              placeholder="परीक्षा, विषय या PYQ खोजें..."
              className="w-full pl-9 pr-20 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-800 placeholder-slate-400 transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bg-blue-900 hover:bg-blue-800 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors shadow-sm"
            >
              खोजें
            </button>
          </form>

          {/* Official SSO Link */}
          <a
            href="https://sso.rajasthan.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition-colors shadow-sm"
            title="राजस्थान सिंगल साइन-ऑन (SSO) आधिकारिक पोर्टल"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            <span>SSO राजस्थान</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>

          {/* Help / Guidance */}
          <a
            href="#footer"
            className="p-2 text-slate-600 hover:text-blue-900 hover:bg-slate-100 rounded-lg transition-colors hidden sm:inline-flex"
            title="सहायता एवं अक्सर पूछे जाने वाले प्रश्न"
          >
            <HelpCircle className="w-5 h-5" />
          </a>

        </div>

      </div>
    </div>
  );
}
