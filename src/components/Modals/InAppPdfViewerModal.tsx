'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Maximize2, 
  Minimize2, 
  ExternalLink, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  HardDrive,
  RefreshCw,
  Eye,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { getGoogleDocsViewerUrl, triggerNativeAttachmentDownload } from '@/lib/downloadEngine';

interface InAppPdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  badge?: string;
  pdfUrl: string;
  downloadUrl?: string;
  fileName?: string;
}

export default function InAppPdfViewerModal({
  isOpen,
  onClose,
  title,
  subtitle,
  badge = 'प्रमाणित दस्तावेज',
  pdfUrl,
  downloadUrl,
  fileName,
}: InAppPdfViewerModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  // Reset loading state when new PDF url opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setIframeKey((prev) => prev + 1);
    }
  }, [isOpen, pdfUrl]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !pdfUrl) return null;

  const viewerUrl = getGoogleDocsViewerUrl(pdfUrl);
  const cleanFileName = fileName || `${title.replace(/[^a-zA-Z0-9_\-\u0900-\u097F]/g, '_')}.pdf`;
  const effectiveDownloadUrl = downloadUrl || pdfUrl;

  const handleDownload = () => {
    triggerNativeAttachmentDownload(effectiveDownloadUrl, cleanFileName);
  };

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 transition-all duration-200"
      aria-modal="true"
      role="dialog"
      aria-labelledby="pdf-viewer-title"
    >
      <div 
        className={`bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 border border-slate-700/30 ${
          isFullscreen 
            ? 'w-full h-full rounded-none' 
            : 'w-full max-w-5xl h-[92vh] sm:h-[88vh]'
        }`}
      >
        {/* Top Header Bar */}
        <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between gap-3 border-b border-slate-800 flex-shrink-0">
          
          {/* Left Title and Badges */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                {badge}
              </span>
              <span className="hidden sm:inline-flex bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-500/30 items-center gap-1">
                <HardDrive className="w-3 h-3 text-blue-400" />
                गूगल क्लाउड व्यूअर (0 MB स्टोरेज खर्च)
              </span>
            </div>

            <h3 
              id="pdf-viewer-title"
              className="text-sm sm:text-base font-black text-white truncate"
              title={title}
            >
              {title}
            </h3>

            {subtitle && (
              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Reload Iframe */}
            <button
              onClick={handleReload}
              className="p-1.5 sm:p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="पुनः लोड करें (Refresh)"
              aria-label="पुनः लोड करें"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            {/* Direct Open in New Tab */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors hidden sm:block"
              title="ब्राउज़र के नए टैब में खोलें"
              aria-label="नई टैब में खोलें"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Toggle Fullscreen */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 sm:p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title={isFullscreen ? 'सामान्य आकार' : 'पूर्ण स्क्रीन (Fullscreen)'}
              aria-label={isFullscreen ? 'सामान्य आकार' : 'पूर्ण स्क्रीन'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {/* Direct Device Download */}
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-black px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl shadow transition-all active:scale-95"
              title="सीधे मोबाइल में डाउनलोड करें"
            >
              <Download className="w-3.5 h-3.5 text-emerald-200" />
              <span className="hidden xs:inline">डाउनलोड</span>
            </button>

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-white hover:bg-rose-600/80 rounded-lg transition-colors ml-1"
              title="बंद करें (Esc)"
              aria-label="बंद करें"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Viewer Main Body */}
        <div className="relative flex-1 bg-slate-100 overflow-hidden">
          
          {/* Skeleton Spinner Overlay */}
          {isLoading && (
            <div className="absolute inset-0 z-10 bg-slate-50 flex flex-col items-center justify-center p-6 text-center space-y-3">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-900 rounded-full animate-spin" />
                <FileText className="w-5 h-5 text-blue-900 absolute inset-0 m-auto" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-slate-900">
                  गूगल क्लाउड से दस्तावेज लोड हो रहा है...
                </p>
                <p className="text-xs text-slate-500 max-w-sm">
                  मोबाइल डेटा एवं डिवाइस स्टोरेज बचत मोड सक्रिय है। यह कुछ सेकंड ले सकता है।
                </p>
              </div>
            </div>
          )}

          {/* Google Docs PDF Viewer Iframe */}
          <iframe
            key={iframeKey}
            src={viewerUrl}
            title={title}
            className="w-full h-full border-0 bg-white"
            onLoad={() => setIsLoading(false)}
            allow="fullscreen"
          />

        </div>

        {/* Viewer Bottom Fallback Helper */}
        <div className="bg-slate-100 px-4 py-2 border-t border-slate-200 flex flex-col xs:flex-row items-center justify-between gap-2 text-[11px] text-slate-600 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700 flex-shrink-0" />
            <span>॥ निःशुल्क जन-शिक्षा संकल्प — समर्पित ग्रामीण युवा शक्ति को ॥</span>
          </div>

          <div className="flex items-center gap-3">
            <span>दस्तावेज लोड होने में समस्या आ रही है?</span>
            <button
              onClick={handleDownload}
              className="font-bold text-blue-900 hover:underline flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>सीधे डाउनलोड करें</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
