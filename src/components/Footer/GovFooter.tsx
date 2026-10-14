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
            <div className="w-12 h-12 rounded-full border-2 border-amber-400 overflow-hidden flex-shrink-0 bg-blue-950">
              <Image 
                src={DIGNITARY_DATA.photoUrl} 
                alt={DIGNITARY_DATA.hindiName}
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
                  src="/images/rajasthan_seal.svg"
                  alt="राजस्थान सरकार प्रतीक"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  नई सोच, नई पहल
                </h4>
                <p className="text-[11px] text-amber-400 font-semibold">
                  राजस्थान प्रतियोगी परीक्षा संबल पोर्टल
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed text-justify">
              राजस्थान सरकार द्वारा संचालित एवं अनुमोदित प्रतियोगी परीक्षा तैयारी हेतु एक आदर्श निःशुल्क मंच, 
              जहां ग्रामीण और शहरी क्षेत्रों के युवाओं को गुणवत्तापूर्ण डिजिटल अध्ययन सामग्री, पूर्व प्रश्न-पत्र तथा मॉक टेस्ट उपलब्ध कराए जाते हैं।
            </p>

            <div className="flex items-center gap-2 pt-1 text-slate-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% निःशुल्क एवं प्रामाणिक</span>
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
                  <span>राजस्थान सरकार आधिकारिक पोर्टल</span>
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
              <li><a href="#rsmssb-hub" className="hover:text-white">✓ RSMSSB हब (पटवार, CET, पशु परिचर, VDO)</a></li>
              <li><a href="#rpsc-hub" className="hover:text-white">✓ RPSC हब (RAS Pre/Mains, 1st & 2nd Grade)</a></li>
              <li><a href="#taiyari-section" className="hover:text-white">✓ तैयारी (राजस्थान इतिहास, 50 जिले भूगोल, राजव्यवस्था)</a></li>
              <li><a href="#self-assessment-section" className="hover:text-white">✓ स्वयं की जांच (ऑनलाइन मॉक टेस्ट एवं 5वां विकल्प)</a></li>
              <li><a href="#previous-papers-section" className="hover:text-white">✓ पुराने पेपर (2021-2024 प्रश्न-पत्र एवं उत्तर कुंजी)</a></li>
              <li><a href="#notifications-section" className="hover:text-white">✓ सूचनाएं एवं आगामी परीक्षा कैलेंडर</a></li>
            </ul>
          </div>

          {/* Col 4: Helpline & Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
              सहायता एवं मार्गदर्शन प्रकोष्ठ
            </h4>
            <div className="space-y-2.5 text-slate-300 text-xs">
              <div className="flex items-start gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-white">हेल्पलाइन नंबर:</span>
                  <span>181 (टोल फ्री) / 0141-2227181</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-white">ई-मेल सहायता:</span>
                  <span>helpdesk.nayisoch@rajasthan.gov.in</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-white">पता:</span>
                  <span>शासन सचिवालय परिसर, जयपुर, राजस्थान - 302005</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-10 pt-6 border-t border-slate-800 text-[11px] text-slate-400 text-center space-y-2">
          <p>
            यह पोर्टल राजस्थान के युवाओं के प्रतियोगी परीक्षा मार्गदर्शन एवं शैक्षिक संबल हेतु <strong>&lsquo;श्रीमान रूप सिंह फणात&rsquo;</strong> की प्रेरणादायी पहल <strong>&lsquo;नई सोच, नई पहल&rsquo;</strong> के अंतर्गत पूर्णतः समर्पित है।
          </p>
          <p className="text-slate-500">
            © 2024-2025 नई सोच, नई पहल - राजस्थान प्रतियोगी परीक्षा पोर्टल। भारत सरकार की राष्ट्रीय सूचना सुरक्षा नीतियों एवं वेब दिशा-निर्देशों (GIGW) के अनुरूप।
          </p>
        </div>

      </div>
    </footer>
  );
}
