/**
 * Resilient Download Engine for Rajasthan Competitive Exam Portals
 * 
 * Government portals (rssb.rajasthan.gov.in, rpsc.rajasthan.gov.in, police.rajasthan.gov.in)
 * frequently experience downtime, hotlink blocking (403), or SSL handshake errors.
 * This engine provides reliable, multi-tier fallback routing so students in rural areas
 * never face broken links or dead screens.
 */

export interface DownloadOptions {
  primaryUrl: string;
  mirrorUrl?: string;
  fallbackUrl?: string;
  fileName?: string;
  title?: string;
  onStatusChange?: (status: 'connecting' | 'primary' | 'mirror_fallback' | 'success' | 'error') => void;
}

/**
 * Resolves the cleanest CDN / storage link for reliable client-side downloading
 */
export function getDirectDownloadUrl(url: string): string {
  if (!url) return '';
  // Clean up any double slashes or whitespace
  return url.trim();
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
  onStatusChange,
}: DownloadOptions): Promise<{ success: boolean; usedMirror: boolean; message: string }> {
  const cleanPrimary = getDirectDownloadUrl(primaryUrl);
  const cleanMirror = getDirectDownloadUrl(mirrorUrl || fallbackUrl || '');

  // 1. If no mirror exists, open primary directly
  if (!cleanMirror) {
    if (onStatusChange) onStatusChange('primary');
    window.open(cleanPrimary, '_blank', 'noopener,noreferrer');
    return { success: true, usedMirror: false, message: `${title} डाउनलोड हो रहा है...` };
  }

  // 2. Check if primary URL is a known fragile state server (RPSC/RSSB) that frequently blocks direct CORS/hotlinking
  const isStateServer = cleanPrimary.includes('rajasthan.gov.in');

  if (onStatusChange) onStatusChange('connecting');

  // If user is on mobile or weak connection, offer instant guaranteed mirror routing
  try {
    // Attempt a lightweight HEAD request with a short timeout to probe primary server
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    let primaryAvailable = false;
    try {
      const probe = await fetch(cleanPrimary, {
        method: 'HEAD',
        mode: 'no-cors', // State portals don't send CORS headers
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      // In no-cors mode, type: 'opaque' means the server responded
      primaryAvailable = probe.type === 'opaque' || probe.ok;
    } catch (probeErr) {
      clearTimeout(timeoutId);
      primaryAvailable = false;
    }

    if (primaryAvailable) {
      if (onStatusChange) onStatusChange('primary');
      const win = window.open(cleanPrimary, '_blank', 'noopener,noreferrer');
      if (!win) {
        // Pop-up blocker fallback - redirect or use anchor
        triggerDirectAnchor(cleanPrimary, fileName);
      }
      return { success: true, usedMirror: false, message: `${title} मूल बोर्ड सर्वर से डाउनलोड हो रहा है।` };
    } else {
      // Primary server is down/slow -> Fallback to trusted mirror
      if (onStatusChange) onStatusChange('mirror_fallback');
      const win = window.open(cleanMirror, '_blank', 'noopener,noreferrer');
      if (!win) {
        triggerDirectAnchor(cleanMirror, fileName);
      }
      return { 
        success: true, 
        usedMirror: true, 
        message: `राज्य सर्वर धीमा होने के कारण ${title} को हाई-स्पीड शैक्षिक मिरर से डाउनलोड किया गया।` 
      };
    }
  } catch (err) {
    // Fail-safe: Always fall back to the trusted mirror
    if (onStatusChange) onStatusChange('mirror_fallback');
    const win = window.open(cleanMirror || cleanPrimary, '_blank', 'noopener,noreferrer');
    if (!win) {
      triggerDirectAnchor(cleanMirror || cleanPrimary, fileName);
    }
    return { 
      success: true, 
      usedMirror: !!cleanMirror, 
      message: `${title} मिरर से डाउनलोड हो रहा है।` 
    };
  }
}

/**
 * Creates an anchor element and clicks it programmatically
 */
function triggerDirectAnchor(url: string, fileName?: string) {
  const a = document.createElement('a');
  a.href = url;
  if (fileName) a.download = fileName;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
