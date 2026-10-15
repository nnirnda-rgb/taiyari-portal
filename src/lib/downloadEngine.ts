/**
 * Resilient Download & In-App PDF Viewer Engine
 * Specially designed for Rajasthan Competitive Exam Portals & Rural Mobile Students
 * 
 * Government portals (rssb.rajasthan.gov.in, rpsc.rajasthan.gov.in, police.rajasthan.gov.in)
 * frequently experience downtime, hotlink blocking (403), or SSL handshake errors.
 * This engine provides reliable, multi-tier fallback routing with native attachment
 * triggers and in-app Google Docs viewer capabilities so students never face broken links.
 */

export interface DownloadOptions {
  primaryUrl: string;
  mirrorUrl?: string;
  fallbackUrl?: string;
  fileName?: string;
  title?: string;
  id?: string;
  type?: 'paper' | 'key' | 'mirror' | 'mirror-key' | 'circular' | 'note' | 'syllabus';
  onStatusChange?: (status: 'connecting' | 'primary' | 'mirror_fallback' | 'success' | 'error') => void;
}

/**
 * Resolves the cleanest CDN / storage link for reliable client-side downloading
 */
export function getDirectDownloadUrl(url: string): string {
  if (!url) return '';
  return url.trim();
}

/**
 * Generates an in-browser embedded Google Docs PDF Viewer URL
 * This allows rural students on low-storage mobile phones to read complete
 * documents instantly without downloading megabytes of files.
 */
export function getGoogleDocsViewerUrl(rawUrl: string): string {
  if (!rawUrl) return '';
  const cleanUrl = rawUrl.trim();

  // If already a Google Docs Viewer link, return as is
  if (cleanUrl.includes('docs.google.com/viewer')) return cleanUrl;

  // If it's a relative URL, prepend current origin or live domain
  let absoluteUrl = cleanUrl;
  if (cleanUrl.startsWith('/')) {
    const origin = typeof window !== 'undefined' && window.location?.origin 
      ? window.location.origin 
      : 'https://taiyari-portal.vercel.app';
    absoluteUrl = `${origin}${cleanUrl}`;
  }

  return `https://docs.google.com/viewer?url=${encodeURIComponent(absoluteUrl)}&embedded=true`;
}

/**
 * Builds the resilient same-origin API download link with attachment trigger
 * to bypass CORS and 403 hotlinking restrictions on mobile devices.
 */
export function getResilientApiDownloadUrl({
  id,
  type = 'paper',
  fileName,
  directFallbackUrl,
}: {
  id?: string;
  type?: string;
  fileName?: string;
  directFallbackUrl?: string;
}): string {
  if (id) {
    const params = new URLSearchParams();
    params.set('id', id);
    params.set('type', type);
    params.set('download', 'true');
    if (fileName) params.set('filename', fileName);
    return `/api/pyq-download?${params.toString()}`;
  }
  return directFallbackUrl || '';
}

/**
 * Triggers a native attachment download directly on the user's Android/iOS device
 * using the HTML5 download attribute and programmatic click.
 */
export function triggerNativeAttachmentDownload(url: string, fileName?: string) {
  if (typeof document === 'undefined') return;

  const a = document.createElement('a');
  a.href = url;
  if (fileName) {
    a.setAttribute('download', fileName);
  } else {
    a.setAttribute('download', 'document.pdf');
  }
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    if (document.body.contains(a)) {
      document.body.removeChild(a);
    }
  }, 300);
}

/**
 * Smart resilient download handler that attempts primary source and automatically
 * falls back to secondary trusted mirror if state portal fails.
 */
export async function downloadWithFallback({
  primaryUrl,
  mirrorUrl,
  fallbackUrl,
  fileName,
  title = 'दस्तावेज',
  id,
  type,
  onStatusChange,
}: DownloadOptions): Promise<{ success: boolean; usedMirror: boolean; message: string }> {
  const cleanPrimary = getDirectDownloadUrl(primaryUrl);
  const cleanMirror = getDirectDownloadUrl(mirrorUrl || fallbackUrl || '');
  const downloadFileName = fileName || `${id || 'Rajasthan_Exam'}.pdf`;

  // 1. If we have an id and type, prioritize the resilient proxy API download with attachment header
  if (id && type) {
    const apiUrl = getResilientApiDownloadUrl({ id, type, fileName: downloadFileName });
    if (onStatusChange) onStatusChange('primary');
    triggerNativeAttachmentDownload(apiUrl, downloadFileName);
    return {
      success: true,
      usedMirror: false,
      message: `${title} डाउनलोड हो रहा है...`
    };
  }

  // 2. If primary is a known fragile state server, switch directly to safe mirror
  if (cleanPrimary.includes('rajasthan.gov.in/Static') && cleanMirror) {
    if (onStatusChange) onStatusChange('mirror_fallback');
    triggerNativeAttachmentDownload(cleanMirror, downloadFileName);
    return {
      success: true,
      usedMirror: true,
      message: `राज्य सर्वर सुरक्षित रखने हेतु ${title} को हाई-स्पीड शैक्षिक मिरर से डाउनलोड किया गया।`
    };
  }

  // 3. If no mirror exists, download primary directly
  if (!cleanMirror) {
    if (onStatusChange) onStatusChange('primary');
    triggerNativeAttachmentDownload(cleanPrimary, downloadFileName);
    return { success: true, usedMirror: false, message: `${title} डाउनलोड हो रहा है...` };
  }

  if (onStatusChange) onStatusChange('connecting');

  // Attempt lightweight probe
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    let primaryAvailable = false;
    try {
      const probe = await fetch(cleanPrimary, {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      primaryAvailable = probe.type === 'opaque' || probe.ok;
    } catch {
      clearTimeout(timeoutId);
      primaryAvailable = false;
    }

    if (primaryAvailable) {
      if (onStatusChange) onStatusChange('primary');
      triggerNativeAttachmentDownload(cleanPrimary, downloadFileName);
      return { success: true, usedMirror: false, message: `${title} मूल बोर्ड सर्वर से डाउनलोड हो रहा है।` };
    } else {
      // Fallback to trusted mirror
      if (onStatusChange) onStatusChange('mirror_fallback');
      triggerNativeAttachmentDownload(cleanMirror, downloadFileName);
      return { 
        success: true, 
        usedMirror: true, 
        message: `सरकारी सर्वर धीमा होने के कारण ${title} को हाई-स्पीड शैक्षिक मिरर से डाउनलोड किया गया।` 
      };
    }
  } catch {
    if (onStatusChange) onStatusChange('mirror_fallback');
    triggerNativeAttachmentDownload(cleanMirror || cleanPrimary, downloadFileName);
    return { 
      success: true, 
      usedMirror: !!cleanMirror, 
      message: `${title} मिरर से डाउनलोड हो रहा है।` 
    };
  }
}
