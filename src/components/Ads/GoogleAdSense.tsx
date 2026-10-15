'use client';

import React from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

/**
 * Google AdSense Loader Component
 * Strictly scoped to the public student portal.
 * Guaranteed never to render or execute on the private /admin route or /api.
 */
export default function GoogleAdSense() {
  const pathname = usePathname();

  // Strict isolation: Never load ads or tracking on the private admin hub
  if (pathname && (pathname.startsWith('/admin') || pathname.startsWith('/api'))) {
    return null;
  }

  return (
    <Script
      id="google-adsense-script"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4361999133480039"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
