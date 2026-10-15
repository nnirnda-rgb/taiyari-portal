'use client';

import React from 'react';
import Image from 'next/image';
import { 
  ArrowUp, 
  ExternalLink, 
  ShieldCheck, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Award,
  Heart
} from 'lucide-react';
import { DIGNITARY_DATA } from '@/data/portalData';

export default function GovFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-slate-900 text-slate-300 text-xs border-t-4 border-amber-500">
      
      {/* Top Banner with Dignitary Dedication */}
      <div className="bg-slate-950/80 border-b border-slate-800 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full border-2 border-amber-500/80 overflow-hidden flex-shrink-0 bg-blue-950 shadow-md">
              <Image 
                src="/images/roopsingh-fanat.png" 
                alt="रूपसिंह फनात - प्रेरक एवं मुख्य मार्गदर्शक"
                width={48} 
                height={48}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                प्रेरक एवं मुख्य मार्गदर्शक
              </span>
              <div className="text-base font-bold text-white">
                {DIGNITARY_DATA.hindiName} ({DIGNITARY_DATA.name})
              </div>
              <div className="text-xs text-slate-400">
                &lsquo;{DIGNITARY_DATA.initiativeName}&rsquo; — {DIGNITARY_DATA.tagline}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-white font-bold block text-xs">सम्पर्क एवं मार्गदर्शन प्रकोष्ठ</span>
              <span className="text-slate-400 text-[11px]">राजस्थान के सभी 50 जिलों के युवाओं हेतु</span>
            </div>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white border border-blue-700 shadow-sm transition-colors flex items-center gap-1.5 font-bold"
              title="शीर्ष पर जाएं (Back to Top)"
            >
              <ArrowUp className="w-4 h-4 text-amber-300" />
              <span>शीर्ष पर जाएं</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links Columns */}
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: About Portal */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 flex-shrink-0">
                <Image
                  src="/images/trust_seal.svg"
                  alt="॥ निःशुल्क जन-शिक्षा संकल्प ॥"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain drop-shadow"
                />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  युवा शिक्षा पोर्टल
                </h4>
                <p className="text-[11px] text-amber-400 font-semibold">
                  नई सोच, नई पहल • आइए मिलकर कल को और बेहतर बनाते हैं
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed text-justify">
              रूपसिंह फनात की प्रेरणा से संचालित एक 100% निःशुल्क, जन-सहयोग आधारित छात्र संबल मंच, 
              जहां राजस्थान के प्रत्येक प्रतियोगी छात्र को गुणवत्तापूर्ण डिजिटल अध्ययन सामग्री, विगत प्रश्न-पत्र तथा मॉक टेस्ट पूर्णतः निःशुल्क उपलब्ध कराए जाते हैं।
            </p>

            <div className="flex items-center gap-2 pt-1 text-slate-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% निःशुल्क जन-शिक्षा संकल्प</span>
            </div>
          </div>

          {/* Col 2: Useful Official Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
              महत्वपूर्ण सरकारी पोर्टल
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://rsmssb.rajasthan.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 flex items-center justify-between text-slate-300 transition-colors"
                >
                  <span>RSMSSB जयपुर (कर्मचारी चयन बोर्ड)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://rpsc.rajasthan.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 flex items-center justify-between text-slate-300 transition-colors"
                >
                  <span>RPSC अजमेर (लोक सेवा आयोग)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://sso.rajasthan.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 flex items-center justify-between text-slate-300 transition-colors"
                >
                  <span>राजस्थान सिंगल साइन ऑन (SSO Portal)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://jansoochna.rajasthan.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 flex items-center justify-between text-slate-300 transition-colors"
                >
                  <span>जन सूचना पोर्टल राजस्थान</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://rajasthan.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 flex items-center justify-between text-slate-300 transition-colors"
                >
                  <span>राजस्थान राज्य वेब डायरेक्टरी (rajasthan.gov.in)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Sections */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
              पोर्टल मुख्य अनुभाग
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              <li><a href="#rajasthan-exams-hub" className="hover:text-white">✓ राजस्थान भर्ती महा-संग्रह (5 बोर्ड डायरेक्टरी)</a></li>
              <li><a href="#taiyari-section" className="hover:text-white">✓ तैयारी (राजस्थान इतिहास, 50 जिले भूगोल, राजव्यवस्था)</a></li>
              <li><a href="#self-assessment-section" className="hover:text-white">✓ स्वयं की जांच (ऑनलाइन CBT मॉक टेस्ट एवं 5वां विकल्प)</a></li>
              <li><a href="#previous-papers-section" className="hover:text-white">✓ पुराने पेपर (वाटरमार्क युक्त प्रश्न-पत्र एवं उत्तर कुंजी)</a></li>
              <li><a href="#notifications-section" className="hover:text-white">✓ सूचनाएं एवं आगामी भर्ती कैलेंडर</a></li>
            </ul>
          </div>

          {/* Col 4: Helpline & Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
              छात्र संबल एवं मार्गदर्शन प्रकोष्ठ
            </h4>
            <div className="space-y-2.5 text-slate-300 text-xs">
              <div className="flex items-start gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-white">छात्र संबल हेल्पलाइन:</span>
                  <span>1800-180-6127 (टोल फ्री)</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-white">ई-मेल सहायता:</span>
                  <span>contact@taiyari-portal.in</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-white">संबल केंद्र:</span>
                  <span>रूपसिंह फनात जन-शिक्षा संबल केंद्र, राजस्थान</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-10 pt-6 border-t border-slate-800 text-[11px] text-slate-400 text-center space-y-2">
          <p>
            यह पोर्टल <strong>रूपसिंह फनात</strong> की ओर से युवाओं को समर्पित एक 100% निःशुल्क एवं स्वतंत्र जन-शिक्षा संबल पहल है — जिसका उद्देश्य राजस्थान के प्रत्येक प्रतियोगी छात्र को समान अवसर और उच्च गुणवत्ता वाली अध्ययन सामग्री उपलब्ध कराना है। प्रेरणादायी संकल्प: <strong>&lsquo;नई सोच, नई पहल&rsquo;</strong> — आइए मिलकर कल को और बेहतर बनाते हैं।
          </p>
          <p className="text-slate-500">
            © 2024-2026 युवा शिक्षा पोर्टल | ॥ निःशुल्क जन-शिक्षा संकल्प ॥ • रूपसिंह फनात। सर्वाधिकार सुरक्षित।
          </p>
        </div>

      </div>
    </footer>
  );
}
