import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'नई सोच, नई पहल | राजस्थान प्रतियोगी परीक्षा पोर्टल - श्रीमान रूप सिंह फणात',
  description: 'राजस्थान सरकार प्रतियोगी परीक्षाएं (RSMSSB एवं RPSC) तैयारी पोर्टल। पटवार, CET, RAS, व्याख्याता, पशु परिचर हेतु 100% निःशुल्क नोट्स, 5-विकल्प मॉक टेस्ट व पुराने प्रश्न-पत्र।',
  keywords: 'नई सोच नई पहल, रूप सिंह फणात, Roop Singh Fanat, Rajasthan Exams, RSMSSB, RPSC, RAS, Patwar, CET Rajasthan, पशु परिचर भर्ती, Rajasthan GK, Mock Test',
  authors: [{ name: 'Shreeman Roop Singh Fanat Initiative' }],
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
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
