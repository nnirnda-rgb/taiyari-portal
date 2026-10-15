import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'युवा शिक्षा पोर्टल | नई सोच, नई पहल - रूपसिंह फनात',
  description: 'रूपसिंह फनात की ओर से युवाओं को समर्पित — उन सभी युवाओं के लिए जो राजस्थान भर्ती परीक्षा की तैयारी कर रहे हैं। नई सोच, नई पहल — आइए मिलकर कल को और बेहतर बनाते हैं।',
  keywords: 'युवा शिक्षा पोर्टल, नई सोच नई पहल, रूपसिंह फनात, Roopsingh Fanat, आइए मिलकर कल को और बेहतर बनाते हैं, Rajasthan Exams, RSMSSB, RPSC, RAS, Patwar, CET Rajasthan, पशु परिचर भर्ती, Rajasthan GK, Mock Test',
  authors: [{ name: 'रूपसिंह फनात (Roopsingh Fanat) - नई सोच, नई पहल' }],
  openGraph: {
    title: 'युवा शिक्षा पोर्टल | नई सोच, नई पहल - रूपसिंह फनात',
    description: 'रूपसिंह फनात की ओर से युवाओं को समर्पित — उन सभी युवाओं के लिए जो राजस्थान भर्ती परीक्षा की तैयारी कर रहे हैं। आइए मिलकर कल को और बेहतर बनाते हैं।',
    siteName: 'युवा शिक्षा पोर्टल',
    locale: 'hi_IN',
    type: 'website',
  },
  other: {
    'google-adsense-account': 'ca-pub-4361999133480039',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1E3A8A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        {/* Google AdSense Publisher Account Verification */}
        <meta name="google-adsense-account" content="ca-pub-4361999133480039" />
        {/* Official Google AdSense Code Snippet */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4361999133480039"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
