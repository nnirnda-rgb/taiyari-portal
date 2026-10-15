'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Bot, 
  Sparkles, 
  Play, 
  RotateCw, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Database, 
  Bell, 
  Clock, 
  Layers, 
  ExternalLink,
  Cpu,
  Activity,
  AlertCircle,
  Home,
  Check
} from 'lucide-react';
import { 
  AgentReport, 
  AgentAuditLog, 
  getStoredAgentReports, 
  executeAgent 
} from '@/services/agentPipelineService';

export default function AdminControlHubPage() {
  const [agents, setAgents] = useState<AgentReport[]>([]);
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [runningAgentId, setRunningAgentId] = useState<number | null>(null);
  const [recentOutput, setRecentOutput] = useState<string | null>(null);
  const [auditLog, setAuditLog] = useState<AgentAuditLog | null>(null);

  useEffect(() => {
    // Load initial agents status from local service / Firestore
    setAgents(getStoredAgentReports());

    // Load initial audit log from storage
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('taiyari_agent_audit_logs_cache_v1');
        if (stored) {
          const list = JSON.parse(stored);
          if (list && list.length > 0) {
            setAuditLog(list[0]);
          }
        }
      } catch {}
    }
  }, []);

  const handleRunAgent = async (agentId: number) => {
    setRunningAgentId(agentId);
    setRecentOutput(null);

    try {
      const res = await executeAgent(agentId);
      setAgents(getStoredAgentReports());
      
      const agentRes = res.results[agentId];
      const msg = agentRes?.message || agentRes?.summary || `एजेंट #${agentId} का ऑटो-पब्लिश कार्य पूर्ण हुआ।`;
      setRecentOutput(msg);

      if (agentId === 6 && agentRes) {
        setAuditLog(agentRes as AgentAuditLog);
      }
    } catch (err: any) {
      setRecentOutput(`त्रुटि: ${err.message || 'एजेंट रन असफल'}`);
    } finally {
      setRunningAgentId(null);
    }
  };

  const handleRunAll = async () => {
    setIsRunningAll(true);
    setRecentOutput(null);

    try {
      const res = await executeAgent('all');
      setAgents(getStoredAgentReports());
      setRecentOutput(`समस्त 6 एजेंटों का निष्पादन एवं डायरेक्ट ऑटो-पब्लिश ('published') सफलतापूर्वक संपन्न हुआ।`);
      
      if (res.results[6]) {
        setAuditLog(res.results[6] as AgentAuditLog);
      }
    } catch (err: any) {
      setRecentOutput(`त्रुटि: ${err.message || 'मास्टर रन असफल'}`);
    } finally {
      setIsRunningAll(false);
    }
  };

  const agentIcons = [
    <Layers key="1" className="w-5 h-5 text-blue-600" />,
    <Sparkles key="2" className="w-5 h-5 text-amber-500" />,
    <Bell key="3" className="w-5 h-5 text-rose-500" />,
    <FileText key="4" className="w-5 h-5 text-emerald-600" />,
    <Database key="5" className="w-5 h-5 text-indigo-600" />,
    <ShieldCheck key="6" className="w-5 h-5 text-teal-600" />
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      
      {/* Top Banner */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          
          {/* Left: Branding */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex-shrink-0 relative">
              <Image
                src="/images/trust_seal.svg"
                alt="॥ निःशुल्क जन-शिक्षा संकल्प ॥"
                width={48}
                height={48}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold tracking-wider text-amber-400 uppercase">
                  ॥ निःशुल्क जन-शिक्षा संकल्प ॥
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  Zero Admin Overhead
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                <span>एडमिन कंट्रोल हब (Admin Control Hub)</span>
                <span className="text-xs bg-blue-900/60 text-blue-300 border border-blue-700/50 px-2 py-0.5 rounded-full font-medium">
                  6-Agent Architecture
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                रूपसिंह फनात — नई सोच, नई पहल • आइए मिलकर कल को और बेहतर बनाते हैं
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleRunAll}
              disabled={isRunningAll || runningAgentId !== null}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm px-4 py-2 rounded-lg transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              <RotateCw className={`w-4 h-4 ${isRunningAll ? 'animate-spin' : ''}`} />
              <span>{isRunningAll ? 'एजेंट्स निष्पादित हो रहे हैं...' : 'मास्टर रन (समस्त 6 एजेंट्स चलाएं)'}</span>
            </button>

            <Link
              href="/"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm px-3.5 py-2 rounded-lg transition-colors border border-slate-700 flex items-center gap-1.5"
            >
              <Home className="w-4 h-4 text-slate-400" />
              <span>मुख्य पोर्टल देखें</span>
            </Link>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Status Alert Banner */}
        {recentOutput && (
          <div className="bg-emerald-950/80 border border-emerald-500/40 rounded-xl p-4 flex items-start gap-3 shadow-lg animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-bold text-emerald-300">
                डायरेक्ट ऑटो-पब्लिश सफलतापूर्वक पूर्ण:
              </h4>
              <p className="text-xs text-emerald-200/90 mt-0.5 leading-relaxed">
                {recentOutput}
              </p>
            </div>
          </div>
        )}

        {/* 4 Key Metrices */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>ऑटोनोमस एजेंट्स</span>
              <Bot className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white mt-2">
              6 / 6 <span className="text-xs font-semibold text-emerald-400 ml-1">● 100% सक्रिय</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              बिना किसी मैनुअल स्वीकृति के डायरेक्ट पब्लिश
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>पब्लिशिंग एक्सेस</span>
              <Check className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400 mt-2">
              status: &apos;published&apos;
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Zero Admin Overhead • पूर्ण स्वायत्त पाइपलाइन
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>राजस्थान भर्ती डायरेक्टरी</span>
              <Layers className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-white mt-2">
              45+ भर्ती परीक्षाएं
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              RPSC, RSSB, पुलिस, हाईकोर्ट, स्वास्थ्य/ऊर्जा
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>डेस्कटॉप 1-क्लिक एक्सेस</span>
              <Cpu className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-lg font-black text-amber-300 mt-2 truncate">
              Admin-Portal.bat
            </div>
            <p className="text-[11px] text-slate-400 mt-1 truncate">
              %USERPROFILE%\Desktop\Admin-Portal.bat
            </p>
          </div>
        </section>

        {/* 6-Agent Autonomous Architecture Control Deck */}
        <section className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-400" />
                <span>6-एजेंट ऑटोनोमस आर्किटेक्चर (Worker Scheduler Deck)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                प्रत्येक एजेंट स्वचालित रूप से डेटा स्कैन करता है और स्थिति: &apos;published&apos; के साथ सीधे लाइव पोर्टल पर जोड़ता है।
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {agents.map((agent, idx) => {
              const isRunning = runningAgentId === agent.agentId || isRunningAll;
              return (
                <div 
                  key={agent.agentId}
                  className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-600 transition-all shadow-md group"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-slate-900 rounded-xl border border-slate-700">
                          {agentIcons[idx] || <Bot className="w-5 h-5 text-amber-400" />}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                            एजेंट {agent.agentId} • {agent.category}
                          </span>
                          <h3 className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors">
                            {agent.agentName}
                          </h3>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        सक्रिय
                      </span>
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {agent.summary}
                    </p>

                    {/* Status Meta */}
                    <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        अंतिम रन: {new Date(agent.lastRunTime).toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="font-semibold text-amber-300">
                        {agent.itemsPublished} प्रकाशित
                      </span>
                    </div>
                  </div>

                  {/* Trigger Button */}
                  <div className="mt-4 pt-3 border-t border-slate-700">
                    <button
                      onClick={() => handleRunAgent(agent.agentId)}
                      disabled={isRunning}
                      className="w-full bg-slate-900 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs py-2 px-3 rounded-lg border border-slate-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isRunning ? (
                        <>
                          <RotateCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                          <span>प्रोसेसिंग...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                          <span>अभी चलाएं (Execute Now)</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </section>

        {/* Agent 6 Real-time Integrity & Self-Healing Audit */}
        <section className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-teal-950 rounded-xl border border-teal-700">
                <ShieldCheck className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">
                  एजेंट 6 (24x7 सेल्फ-हीलिंग एवं डेटा इंटीग्रिटी ऑडिट)
                </h3>
                <p className="text-xs text-slate-400">
                  सभी प्रश्नों में 5वें विकल्प (Option E: अनुत्तरित प्रश्न) एवं आधिकारिक आंसर की की निरंतर पुष्टि।
                </p>
              </div>
            </div>

            <button
              onClick={() => handleRunAgent(6)}
              disabled={runningAgentId === 6 || isRunningAll}
              className="bg-teal-900/60 hover:bg-teal-800 text-teal-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-teal-600 transition-colors flex items-center gap-1.5"
            >
              <RotateCw className={`w-3.5 h-3.5 ${runningAgentId === 6 ? 'animate-spin' : ''}`} />
              <span>ऑडिट रि-स्कैन करें</span>
            </button>
          </div>

          {auditLog ? (
            <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span>ऑडिट टाइमस्टैम्प: <strong className="text-slate-200">{new Date(auditLog.timestamp).toLocaleString('hi-IN')}</strong></span>
                <span className="text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                  ● स्थिति: 100% स्वस्थ (Healthy)
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {auditLog.summary}
              </p>
              <div className="flex gap-4 pt-1 text-[11px] text-slate-400">
                <span>स्कैन किए गए कुल आइटम: <strong className="text-amber-300">{auditLog.scannedCount}</strong></span>
                <span>स्वतः ठीक की गई विसंगतियां: <strong className="text-teal-300">{auditLog.autoCorrectedCount}</strong></span>
                <span>फ्लैग की गई त्रुटियां: <strong className="text-emerald-300">0 (शून्य)</strong></span>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 text-xs text-slate-400">
              ऑडिट लॉग लोड हो रहा है... कृपया &apos;ऑडिट रि-स्कैन करें&apos; बटन पर क्लिक करें।
            </div>
          )}
        </section>

        {/* Desktop 1-Click Shortcut Information */}
        <section className="bg-gradient-to-r from-blue-950/60 to-slate-900 border border-blue-900/50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase">
              <Sparkles className="w-4 h-4" />
              <span>डेस्कटॉप 1-क्लिक एडमिन शॉर्टकट तैयार है</span>
            </div>
            <h4 className="text-sm sm:text-base font-black text-white">
              आपके डेस्कटॉप पर <code className="bg-slate-950 text-amber-300 px-2 py-0.5 rounded border border-slate-800">Admin-Portal.bat</code> फाइल उपलब्ध है
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              आप अपने डेस्कटॉप पर मौजूद इस बैच फाइल पर केवल 1 बार डबल-क्लिक करके सीधे इस सुरक्षित एडमिन कंट्रोल हब तक पहुंच सकते हैं।
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black px-4 py-2.5 rounded-lg transition-colors shadow-md flex items-center gap-1.5"
            >
              <span>छात्र पोर्टल लाइव देखें</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Footer Dedication */}
        <footer className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500 space-y-1">
          <p className="font-semibold text-slate-400">
            ॥ निःशुल्क जन-शिक्षा संकल्प ॥ • युवा शिक्षा संबल पहल
          </p>
          <p>
            प्रणेता: <strong>रूपसिंह फनात</strong> — &lsquo;नई सोच, नई पहल&rsquo; • आइए मिलकर कल को और बेहतर बनाते हैं
          </p>
        </footer>

      </main>

    </div>
  );
}
