'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import TopAccessibilityBar from '@/components/Header/TopAccessibilityBar';
import DignitaryBanner from '@/components/Header/DignitaryBanner';
import GovHeader from '@/components/Header/GovHeader';
import Navbar from '@/components/Header/Navbar';
import NewsTicker from '@/components/Header/NewsTicker';
import HeroBanner from '@/components/Home/HeroBanner';
import StatsRibbon from '@/components/Home/StatsRibbon';
import RajasthanExamHubs from '@/components/Exams/RajasthanExamHubs';
import TaiyariSection from '@/components/Taiyari/TaiyariSection';
import GovFooter from '@/components/Footer/GovFooter';
import AdSenseBanner from '@/components/Ads/AdSenseBanner';

// Low-Bandwidth 4G Mobile Optimization: Dynamic Lazy Loading for Below-the-Fold Heavy Interactive Modules
const SelfAssessmentSection = dynamic(
  () => import('@/components/SelfAssessment/SelfAssessmentSection'),
  {
    loading: () => (
      <div className="py-16 max-w-7xl mx-auto px-4 text-center">
        <div className="w-8 h-8 border-4 border-blue-900/20 border-t-blue-900 rounded-full animate-spin mx-auto mb-2" />
        <p className="text-xs text-slate-500 font-bold">स्वयं की जांच (CBT मॉक टेस्ट) लोड हो रही है...</p>
      </div>
    ),
    ssr: true,
  }
);

const PreviousPapersSection = dynamic(
  () => import('@/components/PreviousPapers/PreviousPapersSection'),
  {
    loading: () => (
      <div className="py-16 max-w-7xl mx-auto px-4 text-center">
        <div className="w-8 h-8 border-4 border-blue-900/20 border-t-blue-900 rounded-full animate-spin mx-auto mb-2" />
        <p className="text-xs text-slate-500 font-bold">पुराने प्रश्न पत्र (PYQ बैंक) लोड हो रहे हैं...</p>
      </div>
    ),
    ssr: true,
  }
);

const NotificationsSection = dynamic(
  () => import('@/components/Notifications/NotificationsSection'),
  {
    loading: () => (
      <div className="py-16 max-w-7xl mx-auto px-4 text-center">
        <div className="w-8 h-8 border-4 border-blue-900/20 border-t-blue-900 rounded-full animate-spin mx-auto mb-2" />
        <p className="text-xs text-slate-500 font-bold">नवीनतम सूचनाएं एवं परिपत्र पटल लोड हो रहे हैं...</p>
      </div>
    ),
    ssr: true,
  }
);

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedExamId, setSelectedExamId] = useState<string>('all');

  const handleNavigate = (sectionId: string) => {
    // Map section IDs to tab IDs
    if (sectionId === 'rajasthan-exams-hub' || sectionId === 'rsmssb-hub' || sectionId === 'rpsc-hub') {
      setActiveTab('exams-hub');
    } else if (sectionId === 'taiyari-section') {
      setActiveTab('taiyari');
    } else if (sectionId === 'self-assessment-section') {
      setActiveTab('self-assessment');
    } else if (sectionId === 'previous-papers-section') {
      setActiveTab('pyq');
    } else if (sectionId === 'notifications-section') {
      setActiveTab('notifications');
    } else {
      setActiveTab('home');
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartPractice = (examId?: string) => {
    if (examId) setSelectedExamId(examId);
    setActiveTab('taiyari');
    const el = document.getElementById('taiyari-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartQuiz = (examId?: string) => {
    if (examId) setSelectedExamId(examId);
    setActiveTab('self-assessment');
    const el = document.getElementById('self-assessment-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewPyq = () => {
    setActiveTab('pyq');
    const el = document.getElementById('previous-papers-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      
      {/* 1. Official National & Accessibility Bar */}
      <TopAccessibilityBar />

      {/* 2. Patron Dedication Banner: Roopsingh Fanat */}
      <DignitaryBanner />

      {/* 3. Official Departmental Branding Header */}
      <GovHeader />

      {/* 4. Primary Government Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* 5. Live Updates & Breaking News Ticker */}
      <NewsTicker />

      {/* Main Content Area */}
      <main className="flex-1">

        {/* Hero Section */}
        <HeroBanner onNavigate={handleNavigate} />

        {/* Key Metrics / Stats Ribbon */}
        <StatsRibbon />

        {/* Section 1: Modern Filterable Rajasthan Recruitment Directory (45+ Exams Across 5 Boards) */}
        <RajasthanExamHubs
          onStartQuiz={handleStartQuiz}
          onStartPractice={handleStartPractice}
          searchFilter={searchQuery}
        />

        {/* Section 2: Taiyari (Preparation Hub - Practice Mode & Notes) */}
        <TaiyariSection 
          onStartQuiz={handleStartQuiz} 
          searchFilter={searchQuery}
          selectedExamId={selectedExamId}
        />

        {/* Section 3: Self Assessment (Interactive Mock Test Engine) - Strictly AD-FREE */}
        <SelfAssessmentSection selectedExamId={selectedExamId} />

        {/* Section 5: Previous Papers (PYQ Bank & Answer Keys) */}
        <PreviousPapersSection searchFilter={searchQuery} />

        {/* Section 6: Notifications & Exam Calendar */}
        <NotificationsSection />

        {/* Non-intrusive Footer Banner Ad Slot (Google AdSense Responsive Leaderboard) */}
        <AdSenseBanner placement="footer" adSlot="7812903456" />

      </main>

      {/* 7. Official Government Footer */}
      <GovFooter />

    </div>
  );
}
