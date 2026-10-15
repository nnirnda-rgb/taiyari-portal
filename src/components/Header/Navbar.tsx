'use client';

import React, { useState } from 'react';
import { 
  Home, 
  Layers, 
  GraduationCap, 
  BookOpen, 
  CheckSquare, 
  FileText, 
  Bell, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface NavItem {
  id: string;
  label: string;
  englishLabel: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  targetId: string;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'होम',
      englishLabel: 'Home',
      icon: <Home className="w-4 h-4" />,
      targetId: 'home-section'
    },
    {
      id: 'exams-hub',
      label: 'भर्ती महा-संग्रह',
      englishLabel: 'Exam Directory',
      icon: <Layers className="w-4 h-4" />,
      badge: '45+ हब्स',
      badgeColor: 'bg-emerald-600 text-white font-bold',
      targetId: 'rajasthan-exams-hub'
    },
    {
      id: 'taiyari',
      label: 'तैयारी',
      englishLabel: 'Preparation',
      icon: <BookOpen className="w-4 h-4" />,
      badge: 'नोट्स',
      badgeColor: 'bg-amber-400 text-slate-950 font-bold',
      targetId: 'taiyari-section'
    },
    {
      id: 'self-assessment',
      label: 'स्वयं की जांच',
      englishLabel: 'Self Assessment',
      icon: <CheckSquare className="w-4 h-4" />,
      badge: 'लाइव टेस्ट',
      badgeColor: 'bg-rose-500 text-white animate-pulse',
      targetId: 'self-assessment-section'
    },
    {
      id: 'pyq',
      label: 'पुराने पेपर',
      englishLabel: 'Previous Papers',
      icon: <FileText className="w-4 h-4" />,
      targetId: 'previous-papers-section'
    },
    {
      id: 'notifications',
      label: 'सूचनाएं',
      englishLabel: 'Notices',
      icon: <Bell className="w-4 h-4" />,
      badge: '5 नई',
      badgeColor: 'bg-amber-400 text-slate-900 font-bold',
      targetId: 'notifications-section'
    }
  ];

  const handleNavClick = (item: NavItem) => {
    setActiveTab(item.id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(item.targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-md border-t border-b border-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-13 sm:h-14">
          
          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1 w-full justify-between">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 text-xs xl:text-sm font-semibold rounded-md transition-all relative ${
                    isActive
                      ? 'bg-blue-950 text-amber-300 shadow-inner border-b-2 border-amber-400'
                      : 'text-slate-100 hover:bg-blue-800 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={isActive ? 'text-amber-400' : 'text-blue-300'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>

                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1 ${item.badgeColor || 'bg-blue-700'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Header Bar & Hamburger Button */}
          <div className="flex items-center justify-between w-full lg:hidden py-2">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-white tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                युवा शिक्षा पोर्टल
              </span>
              <span className="text-[11px] bg-blue-950 px-2 py-0.5 rounded text-amber-300 border border-blue-700 font-medium">
                {navItems.find((n) => n.id === activeTab)?.label || 'पोर्टल'}
              </span>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-blue-950 text-slate-100 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="नेविगेशन मेन्यू खोलें / बंद करें"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-amber-400" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-blue-950 border-t border-blue-800 px-4 pt-2 pb-5 space-y-1 shadow-2xl animate-in slide-in-from-top-3 duration-200">
          <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider px-3 py-1">
            नेविगेशन अनुभाग
          </div>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-800 text-amber-300 border-l-4 border-amber-400'
                    : 'text-slate-200 hover:bg-blue-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-amber-400' : 'text-blue-300'}>
                    {item.icon}
                  </span>
                  <div className="text-left">
                    <div>{item.label}</div>
                    <div className="text-[10px] text-blue-300 font-normal">
                      {item.englishLabel}
                    </div>
                  </div>
                </div>

                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${item.badgeColor || 'bg-blue-700'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
