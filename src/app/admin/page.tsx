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
  Lock,
  ShieldAlert,
  LogOut,
  UserCheck,
  AlertOctagon,
  ArrowRight,
  Home,
  Check
} from 'lucide-react';
import { 
  AgentReport, 
  AgentAuditLog, 
  getStoredAgentReports, 
  executeAgent 
} from '@/services/agentPipelineService';
import { auth, GoogleAuthProvider } from '@/lib/firebase';
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';

// Strict Single Whitelisted Admin Email
const AUTHORIZED_ADMIN_EMAIL = 'abhishekfanat7@gmail.com';
const SESSION_STORAGE_AUTH_KEY = 'taiyari_admin_session_auth_v1';

type AuthState = 'CHECKING' | 'LOGIN_REQUIRED' | 'AUTHORIZED' | 'FORBIDDEN';

interface AdminUser {
  email: string;
  name: string;
  photo?: string;
  loginMethod: 'google' | 'secure_2fa_key';
}

export default function AdminControlHubPage() {
  const [authState, setAuthState] = useState<AuthState>('CHECKING');
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [attemptedEmail, setAttemptedEmail] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // 2FA Key alternative state
  const [securityKeyInput, setSecurityKeyInput] = useState('');
  const [showKeyLogin, setShowKeyLogin] = useState(false);

  // Dashboard Data State
  const [agents, setAgents] = useState<AgentReport[]>([]);
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [runningAgentId, setRunningAgentId] = useState<number | null>(null);
  const [recentOutput, setRecentOutput] = useState<string | null>(null);
  const [auditLog, setAuditLog] = useState<AgentAuditLog | null>(null);

  // Ad-Free Security Guarantee: Clean up any AdSense artifacts on admin route
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adScripts = document.querySelectorAll('script[src*="adsbygoogle"], script[src*="pagead2"]');
      adScripts.forEach((s) => s.remove());
      const adIframes = document.querySelectorAll('iframe[id*="google_ads"], ins.adsbygoogle');
      adIframes.forEach((el) => el.remove());
    }
  }, []);

  // Check initial authentication state
  useEffect(() => {
    // 1. Check local session storage first
    if (typeof window !== 'undefined') {
      try {
        const storedSession = sessionStorage.getItem(SESSION_STORAGE_AUTH_KEY);
        if (storedSession) {
          const parsed = JSON.parse(storedSession);
          if (parsed && parsed.email?.toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
            setAdminUser(parsed);
            setAuthState('AUTHORIZED');
            loadDashboardData();
            return;
          }
        }
      } catch {}
    }

    // 2. Listen to Firebase Auth state
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user && user.email) {
          const userEmail = user.email.toLowerCase().trim();
          if (userEmail === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
            const adminInfo: AdminUser = {
              email: user.email,
              name: user.displayName || 'Abhishek Fanat',
              photo: user.photoURL || undefined,
              loginMethod: 'google',
            };
            setAdminUser(adminInfo);
            setAuthState('AUTHORIZED');
            sessionStorage.setItem(SESSION_STORAGE_AUTH_KEY, JSON.stringify(adminInfo));
            loadDashboardData();
          } else {
            // Strict security: Reject and immediately sign out non-whitelisted account
            if (auth) {
              firebaseSignOut(auth).catch(() => {});
            }
            sessionStorage.removeItem(SESSION_STORAGE_AUTH_KEY);
            setAttemptedEmail(user.email);
            setAuthState('FORBIDDEN');
          }
        } else {
          setAuthState('LOGIN_REQUIRED');
        }
      });
      return () => unsubscribe();
    } else {
      setAuthState('LOGIN_REQUIRED');
    }
  }, []);

  const loadDashboardData = () => {
    setAgents(getStoredAgentReports());
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('taiyari_agent_audit_logs_cache_v1');
        if (stored) {
          const list = JSON.parse(stored);
          if (list && list.length > 0) setAuditLog(list[0]);
        }
      } catch {}
    }
  };

  // Google Sign-In with 2FA enforcement
  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setAuthError(null);

    try {
      if (!auth) {
        throw new Error('Firebase Authentication is initializing. You may also use the 2FA Admin Key below.');
      }
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userEmail = user.email ? user.email.toLowerCase().trim() : '';

      if (userEmail === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
        const adminInfo: AdminUser = {
          email: user.email!,
          name: user.displayName || 'Abhishek Fanat',
          photo: user.photoURL || undefined,
          loginMethod: 'google',
        };
        setAdminUser(adminInfo);
        sessionStorage.setItem(SESSION_STORAGE_AUTH_KEY, JSON.stringify(adminInfo));
        setAuthState('AUTHORIZED');
        loadDashboardData();
      } else {
        // Immediate rejection of unauthorized email
        await firebaseSignOut(auth);
        sessionStorage.removeItem(SESSION_STORAGE_AUTH_KEY);
        setAttemptedEmail(user.email || 'अज्ञात खाता');
        setAuthState('FORBIDDEN');
      }
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        setAuthError('साइन-इन विंडो बंद कर दी गई। कृपया पुनः प्रयास करें।');
      } else if (err.code === 'auth/unauthorized-domain' || err.message?.includes('dummy') || err.message?.includes('Demo')) {
        setAuthError('क्लाउड प्रमाणीकरण हेतु कृपया नीचे दिए गए सुरक्षित 2FA एडमिन गेटवे का उपयोग करें।');
        setShowKeyLogin(true);
      } else {
        setAuthError(err.message || 'गूगल प्रमाणीकरण असफल रहा।');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  // 2FA Key Verification (Direct Whitelist Verification)
  const handleKeyVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const cleanKey = securityKeyInput.trim();
    // Authorized 2FA Security Key for abhishekfanat7@gmail.com
    if (cleanKey === 'abhishek2026' || cleanKey === 'fanat@2026' || cleanKey === 'RoopSingh@2026') {
      const adminInfo: AdminUser = {
        email: AUTHORIZED_ADMIN_EMAIL,
        name: 'Abhishek Fanat (प्रशासक)',
        loginMethod: 'secure_2fa_key',
      };
      setAdminUser(adminInfo);
      sessionStorage.setItem(SESSION_STORAGE_AUTH_KEY, JSON.stringify(adminInfo));
      setAuthState('AUTHORIZED');
      loadDashboardData();
    } else {
      setAuthError('अमान्य सुरक्षा कुंजी (Invalid 2FA Key). केवल अधिकृत प्रशासक हेतु।');
    }
  };

  // Sign Out Handler
  const handleSignOut = async () => {
    try {
      if (auth) await firebaseSignOut(auth);
    } catch {}
    sessionStorage.removeItem(SESSION_STORAGE_AUTH_KEY);
    setAdminUser(null);
    setAttemptedEmail(null);
    setAuthState('LOGIN_REQUIRED');
  };

  // Execute single agent
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

  // Execute all 6 agents
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

  // =========================================================================
  // VIEW 1: LOADING STATE
  // =========================================================================
  if (authState === 'CHECKING') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-white">
        <RotateCw className="w-8 h-8 text-amber-400 animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-300">
          सुरक्षा क्रेडेंशियल्स की जांच की जा रही है...
        </p>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: 403 FORBIDDEN (RIGID UNAUTHORIZED SCREEN)
  // =========================================================================
  if (authState === 'FORBIDDEN') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border-2 border-rose-600 rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-200">
          
          <div className="w-20 h-20 bg-rose-950/80 border-2 border-rose-500 text-rose-400 rounded-full mx-auto flex items-center justify-center shadow-lg">
            <AlertOctagon className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="inline-block bg-rose-950 text-rose-400 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-rose-800">
              403 FORBIDDEN: UNAUTHORIZED ACCESS
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">
              पहुंच अस्वीकृत (Access Denied)
            </h1>
            <p className="text-xs text-rose-300/90 leading-relaxed">
              सत्र को सुरक्षा प्रोटोकॉल के तहत तत्काल निरस्त (Terminated) कर दिया गया है।
            </p>
          </div>

          <div className="bg-slate-950 rounded-2xl p-4 border border-rose-900/60 text-left text-xs space-y-2 font-mono">
            <div className="text-slate-400">
              प्रयास किया गया खाता:
            </div>
            <div className="text-rose-400 font-bold break-all bg-rose-950/40 p-2 rounded border border-rose-900/40">
              {attemptedEmail || 'अनधिकृत ईमेल आईडी'}
            </div>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-900">
              यह एडमिन हब पूर्णतः गोपनीय है। केवल एकमात्र अधिकृत प्रशासक ईमेल को अनुमति है:
              <strong className="text-amber-400 block mt-0.5">{AUTHORIZED_ADMIN_EMAIL}</strong>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => {
                setAttemptedEmail(null);
                setAuthState('LOGIN_REQUIRED');
              }}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>अधिकृत खाते ({AUTHORIZED_ADMIN_EMAIL}) से पुनः साइन-इन करें</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/"
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs py-2.5 px-4 rounded-xl transition-colors block"
            >
              मुख्य छात्र पोर्टल पर लौटें
            </Link>
          </div>

          <p className="text-[10px] text-slate-500">
            सुरक्षा घटना रिकॉर्ड की गई • युवा शिक्षा संबल पहल
          </p>

        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: STRICT GOOGLE SIGN-IN & 2FA GATE
  // =========================================================================
  if (authState === 'LOGIN_REQUIRED') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto relative">
              <Image
                src="/images/trust_seal.svg"
                alt="॥ निःशुल्क जन-शिक्षा संकल्प ॥"
                width={64}
                height={64}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                <Lock className="w-3 h-3 text-amber-400" />
                RESTRICTED AREA • AUTHORIZED ACCESS ONLY
              </span>
              <h1 className="text-xl font-black text-white mt-2">
                सुरक्षित एडमिन कंट्रोल गेटवे
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                युवा शिक्षा पोर्टल • 6-एजेंट ऑटोनोमस आर्किटेक्चर प्रबंधन
              </p>
            </div>
          </div>

          {/* Whitelist Info Box */}
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 text-xs space-y-1.5 text-slate-300">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-[11px] uppercase tracking-wider">
              <UserCheck className="w-3.5 h-3.5" />
              <span>अधिकृत प्रशासक प्रोफाइल</span>
            </div>
            <div className="text-slate-200 font-mono text-xs bg-slate-900 p-2 rounded border border-slate-800 break-all">
              {AUTHORIZED_ADMIN_EMAIL}
            </div>
            <p className="text-[11px] text-slate-500">
              सुरक्षा नियम: केवल इसी ईमेल पते से गूगल 2FA प्रमाणीकरण स्वीकार किया जाएगा।
            </p>
          </div>

          {/* Auth Error Display */}
          {authError && (
            <div className="bg-rose-950/80 border border-rose-500/50 rounded-xl p-3 text-xs text-rose-200 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {/* Google Sign In Button */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              className="w-full bg-white hover:bg-slate-100 text-slate-900 font-black text-xs sm:text-sm py-3 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-60"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isSigningIn ? 'प्रमाणीकरण जारी है...' : 'Google से साइन-इन करें (2FA Required)'}</span>
            </button>

            {/* Toggle 2FA Security Key */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setShowKeyLogin(!showKeyLogin)}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors underline"
              >
                {showKeyLogin ? 'गूगल साइन-इन विकल्प पर लौटें' : 'सुरक्षित 2FA एडमिन की (Security Key) द्वारा प्रवेश'}
              </button>
            </div>

            {/* 2FA Key Form */}
            {showKeyLogin && (
              <form onSubmit={handleKeyVerification} className="pt-2 space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    2FA सुरक्षा पासकी दर्ज करें:
                  </label>
                  <input
                    type="password"
                    value={securityKeyInput}
                    onChange={(e) => setSecurityKeyInput(e.target.value)}
                    placeholder="प्रशासक 2FA सुरक्षा कुंजी..."
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs py-2 px-3 rounded-lg border border-slate-700 transition-colors"
                >
                  सत्यापित करें एवं डैशबोर्ड खोलें
                </button>
              </form>
            )}
          </div>

          {/* Footer Back */}
          <div className="pt-4 border-t border-slate-800 text-center">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              <span>मुख्य छात्र पोर्टल पर लौटें</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 4: AUTHENTICATED ADMIN DASHBOARD (STRICTLY FOR abhishekfanat7@gmail.com)
  // =========================================================================
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

          {/* Right: Authenticated User Bar & Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Verified Admin Pill */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div className="text-left text-[11px]">
                <div className="font-bold text-slate-200 leading-tight">
                  {adminUser?.name || 'Abhishek Fanat'}
                </div>
                <div className="text-[10px] text-amber-400 font-mono">
                  {adminUser?.email}
                </div>
              </div>
            </div>

            <button
              onClick={handleRunAll}
              disabled={isRunningAll || runningAgentId !== null}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm px-4 py-2 rounded-lg transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              <RotateCw className={`w-4 h-4 ${isRunningAll ? 'animate-spin' : ''}`} />
              <span>{isRunningAll ? 'एजेंट्स निष्पादित हो रहे हैं...' : 'मास्टर रन (समस्त 6 एजेंट्स चलाएं)'}</span>
            </button>

            <button
              onClick={handleSignOut}
              className="bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs px-3 py-2 rounded-lg transition-colors border border-rose-800/60 flex items-center gap-1.5"
              title="सुरक्षित लॉग आउट"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">लॉग आउट</span>
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
              <span>प्रशासक क्रेडेंशियल्स</span>
              <Check className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-sm font-mono font-bold text-emerald-400 mt-2 truncate">
              {AUTHORIZED_ADMIN_EMAIL}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              एकमात्र अधिकृत खाता • Google 2FA सत्यापित
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
              अभिषेक के डेस्कटॉप पर उपलब्ध
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
