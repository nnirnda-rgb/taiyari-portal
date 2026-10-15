'use client';

import React from 'react';
import { Users, FileCheck2, Award, BookOpen, MapPin } from 'lucide-react';

export default function StatsRibbon() {
  const stats = [
    {
      icon: <Users className="w-5 h-5 text-blue-600" />,
      number: "50,000+",
      label: "सक्रिय विद्यार्थी",
      detail: "राजस्थान के 41 जिलों से जुड़े"
    },
    {
      icon: <FileCheck2 className="w-5 h-5 text-emerald-600" />,
      number: "120+",
      label: "निःशुल्क मॉक टेस्ट",
      detail: "नवीनतम 5-विकल्प पैटर्न पर"
    },
    {
      icon: <BookOpen className="w-5 h-5 text-amber-600" />,
      number: "500+ नोट्स",
      label: "डिजिटल अध्ययन सामग्री",
      detail: "RPSC व RSMSSB सिलेबस केंद्रित"
    },
    {
      icon: <MapPin className="w-5 h-5 text-indigo-600" />,
      number: "41 जिले",
      label: "नवीनतम 41 जिले व 7 संभाग",
      detail: "पुनर्गठित राजस्थान भूगोल"
    },
    {
      icon: <Award className="w-5 h-5 text-rose-600" />,
      number: "100%",
      label: "निःशुल्क सेवा",
      detail: "रूपसिंह फनात की प्रेरणा"
    }
  ];

  return (
    <section className="bg-white border-b border-slate-200 py-6 px-4 sm:px-6 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
            >
              <div className="p-2.5 rounded-lg bg-white shadow-sm border border-slate-200 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div>
                <div className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-none">
                  {stat.number}
                </div>
                <div className="text-xs font-bold text-blue-900 mt-1">
                  {stat.label}
                </div>
                <div className="text-[10px] text-slate-500 font-medium leading-tight">
                  {stat.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
