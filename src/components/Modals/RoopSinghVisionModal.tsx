'use client';

import React from 'react';
import Image from 'next/image';
import { X, Award, CheckCircle2, HeartHandshake, BookOpen, Sparkles } from 'lucide-react';
import { DIGNITARY_DATA } from '@/data/portalData';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RoopSinghVisionModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-blue-200 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header with Royal Blue Gradient */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-5 text-white flex items-start justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-amber-400 p-0.5 shadow-md flex-shrink-0 bg-blue-950 overflow-hidden">
              <Image 
                src={DIGNITARY_DATA.photoUrl} 
                alt={DIGNITARY_DATA.hindiName}
                width={48}
                height={48}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <span className="inline-block bg-amber-400/20 text-amber-300 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-amber-400/30 mb-0.5">
                {DIGNITARY_DATA.initiativeName}
              </span>
              <h3 id="modal-title" className="text-xl font-bold text-white tracking-wide">
                {DIGNITARY_DATA.hindiName}
              </h3>
              <p className="text-xs text-blue-200 font-medium">
                {DIGNITARY_DATA.hindiTitle} ({DIGNITARY_DATA.title})
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-300 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
            aria-label="बंद करें (Close)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-800 text-sm">
          
          {/* Tagline Card */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
            <div className="flex items-start gap-2">
              <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-amber-900 text-sm">
                  ध्येय वाक्य (Mission Tagline):
                </h4>
                <p className="text-slate-700 italic mt-0.5 text-xs sm:text-sm">
                  &ldquo;{DIGNITARY_DATA.tagline}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Inspirational Quote */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-center">
            <span className="text-2xl text-blue-400 block mb-1">“</span>
            <p className="text-blue-950 font-bold text-base leading-snug">
              {DIGNITARY_DATA.visionQuote}
            </p>
            <span className="text-xs text-blue-700 font-semibold mt-2 block">
              — {DIGNITARY_DATA.hindiName}
            </span>
          </div>

          {/* Patron Message */}
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-blue-700" />
              मार्गदर्शक का संदेश (Message to Rajasthan&apos;s Youth)
            </h4>
            <p className="text-slate-700 leading-relaxed text-justify">
              {DIGNITARY_DATA.message}
            </p>
          </div>

          {/* Key Vision Pillars */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2.5 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              &lsquo;नई सोच, नई पहल&rsquo; के चार मुख्य संकल्प:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {DIGNITARY_DATA.keyPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action note */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>
              यह समस्त अध्ययन सामग्री, अभ्यास प्रश्न-पत्र और मॉक टेस्ट सभी विद्यार्थियों के लिए <strong>100% निःशुल्क</strong> उपलब्ध हैं।
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            समझ गया / पृष्ठ पर लौटें
          </button>
        </div>

      </div>
    </div>
  );
}
