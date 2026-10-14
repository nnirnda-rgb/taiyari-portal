import 'regenerator-runtime/runtime';
import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs';
import path from 'path';
import { PREVIOUS_PAPERS_DATA, PORTAL_NOTIFICATIONS } from '@/data/portalData';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const circularId = searchParams.get('circularId');
    const isCircular = searchParams.get('type') === 'circular' || Boolean(circularId);

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    // Load Devanagari font if available
    let customFont: any = null;
    try {
      const fontPath = path.join(process.cwd(), 'public', 'fonts', 'mangal.ttf');
      if (fs.existsSync(fontPath)) {
        const fontBytes = fs.readFileSync(fontPath);
        customFont = await pdfDoc.embedFont(fontBytes);
      }
    } catch (fontErr) {
      console.warn('Failed to embed custom Devanagari font, falling back to standard font:', fontErr);
    }

    const standardFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const standardFontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // =========================================================================
    // BRANCH A: CIRCULAR / NOTIFICATION DOWNLOAD
    // =========================================================================
    if (isCircular) {
      const notif = PORTAL_NOTIFICATIONS.find((n) => n.id === circularId) || PORTAL_NOTIFICATIONS[0];
      const page = pdfDoc.addPage([595.28, 841.89]); // A4 Size in points
      const { width, height } = page.getSize();

      // 1. TOP HEADER STAMP (REQUESTED REQUIREMENT)
      // Header: 'नई सोच, नई पहल | रूपसिंह फनात'
      page.drawRectangle({
        x: 0,
        y: height - 42,
        width: width,
        height: 42,
        color: rgb(0.12, 0.23, 0.54), // Royal Navy Blue (#1E3A8A)
      });

      page.drawRectangle({
        x: 0,
        y: height - 44,
        width: width,
        height: 2,
        color: rgb(0.96, 0.62, 0.04), // Gold (#F59E0B)
      });

      if (customFont) {
        page.drawText('नई सोच, नई पहल | रूपसिंह फनात', {
          x: 35,
          y: height - 26,
          size: 13,
          font: customFont,
          color: rgb(1, 1, 1),
        });

        page.drawText('युवा शिक्षा पोर्टल • अधिकृत अधिसूचना एवं परिपत्र अभिलेख', {
          x: 35,
          y: height - 38,
          size: 8.5,
          font: customFont,
          color: rgb(0.9, 0.8, 0.4),
        });
      } else {
        page.drawText('Nayi Soch, Nayi Pehal | Roopsingh Fanat', {
          x: 35,
          y: height - 26,
          size: 12,
          font: standardFontBold,
          color: rgb(1, 1, 1),
        });

        page.drawText('Yuva Shiksha Portal • Certified Official Circular & Order', {
          x: 35,
          y: height - 38,
          size: 8,
          font: standardFont,
          color: rgb(0.9, 0.8, 0.4),
        });
      }

      page.drawText(`OFFICIAL CIRCULAR • ${notif.board}`, {
        x: width - 170,
        y: height - 26,
        size: 9,
        font: standardFontBold,
        color: rgb(1, 1, 1),
      });

      // 2. WATERMARK STAMP (REQUESTED REQUIREMENT)
      // Watermark: 'नई सोच, नई पहल | रूपसिंह फनात'
      if (customFont) {
        page.drawText('नई सोच, नई पहल | रूपसिंह फनात', {
          x: 70,
          y: height / 2 - 40,
          size: 26,
          font: customFont,
          color: rgb(0.12, 0.23, 0.54),
          opacity: 0.12,
          rotate: degrees(45),
        });
      } else {
        page.drawText('Nayi Soch, Nayi Pehal | Roopsingh Fanat', {
          x: 60,
          y: height / 2 - 40,
          size: 22,
          font: standardFontBold,
          color: rgb(0.12, 0.23, 0.54),
          opacity: 0.12,
          rotate: degrees(45),
        });
      }

      // 3. CIRCULAR BODY
      let y = height - 80;

      // Official Masthead box
      page.drawRectangle({
        x: 35,
        y: y - 55,
        width: width - 70,
        height: 60,
        color: rgb(0.97, 0.98, 1),
        borderColor: rgb(0.8, 0.85, 0.92),
        borderWidth: 1,
      });

      const boardFullName = notif.board === 'RSMSSB' 
        ? 'राजस्थान कर्मचारी चयन बोर्ड, राज्य कृषि प्रबंध संस्थान परिसर, दुर्गापुरा, जयपुर'
        : 'राजस्थान लोक सेवा आयोग, घूघरा घाटी, जयपुर रोड, अजमेर (राजस्थान)';

      if (customFont) {
        page.drawText('राजस्थान सरकार (GOVERNMENT OF RAJASTHAN)', {
          x: 180,
          y: y - 18,
          size: 11,
          font: customFont,
          color: rgb(0.1, 0.2, 0.4),
        });

        page.drawText(boardFullName, {
          x: 60,
          y: y - 34,
          size: 10,
          font: customFont,
          color: rgb(0.15, 0.25, 0.5),
        });

        page.drawText(`विभागीय प्रकोष्ठ: ${notif.department} • श्रेणी: ${notif.tag}`, {
          x: 120,
          y: y - 48,
          size: 8.5,
          font: customFont,
          color: rgb(0.3, 0.4, 0.5),
        });
      } else {
        page.drawText(`GOVERNMENT OF RAJASTHAN - ${notif.board}`, {
          x: 180,
          y: y - 18,
          size: 11,
          font: standardFontBold,
          color: rgb(0.1, 0.2, 0.4),
        });
        page.drawText(`${notif.department} | Category: ${notif.tag}`, {
          x: 120,
          y: y - 36,
          size: 9,
          font: standardFont,
          color: rgb(0.3, 0.4, 0.5),
        });
      }

      y -= 75;

      // Dispatch Metadata Row
      page.drawRectangle({
        x: 35,
        y: y - 24,
        width: width - 70,
        height: 26,
        color: rgb(0.94, 0.96, 0.99),
      });

      if (customFont) {
        page.drawText(`पत्रांक: ${notif.circularNo}`, {
          x: 45,
          y: y - 16,
          size: 8.5,
          font: customFont,
          color: rgb(0.15, 0.25, 0.5),
        });

        page.drawText(`दिनांक: ${notif.date}`, {
          x: width - 160,
          y: y - 16,
          size: 8.5,
          font: customFont,
          color: rgb(0.15, 0.25, 0.5),
        });
      } else {
        page.drawText(`Ref: ${notif.circularNo}`, {
          x: 45,
          y: y - 16,
          size: 8.5,
          font: standardFontBold,
          color: rgb(0.15, 0.25, 0.5),
        });
        page.drawText(`Date: ${notif.date}`, {
          x: width - 160,
          y: y - 16,
          size: 8.5,
          font: standardFontBold,
          color: rgb(0.15, 0.25, 0.5),
        });
      }

      y -= 45;

      // Subject Header
      page.drawText(':: प्रेस विज्ञप्ति / अधिकृत कार्यालय आदेश ::', {
        x: 190,
        y: y,
        size: 11,
        font: customFont || standardFontBold,
        color: rgb(0.7, 0.1, 0.1),
      });

      y -= 25;

      // Title & Summary box
      if (customFont) {
        page.drawText(`विषय: ${notif.title.slice(0, 75)}`, {
          x: 40,
          y: y,
          size: 9.5,
          font: customFont,
          color: rgb(0.1, 0.1, 0.1),
        });
        if (notif.title.length > 75) {
          y -= 14;
          page.drawText(notif.title.slice(75, 150), {
            x: 70,
            y: y,
            size: 9.5,
            font: customFont,
            color: rgb(0.1, 0.1, 0.1),
          });
        }
      } else {
        page.drawText(`Subject: ${notif.title.slice(0, 80)}`, {
          x: 40,
          y: y,
          size: 9.5,
          font: standardFontBold,
          color: rgb(0.1, 0.1, 0.1),
        });
      }

      y -= 25;

      // Summary
      if (customFont) {
        page.drawText('विस्तृत विवरण एवं मुख्य निर्देश:', {
          x: 40,
          y: y,
          size: 10,
          font: customFont,
          color: rgb(0.1, 0.25, 0.6),
        });
        y -= 16;
        page.drawText(notif.summary.slice(0, 85), {
          x: 45,
          y: y,
          size: 9,
          font: customFont,
          color: rgb(0.25, 0.25, 0.25),
        });
        if (notif.summary.length > 85) {
          y -= 14;
          page.drawText(notif.summary.slice(85, 170), {
            x: 45,
            y: y,
            size: 9,
            font: customFont,
            color: rgb(0.25, 0.25, 0.25),
          });
        }
      }

      y -= 30;

      // Key Details Table Box
      page.drawRectangle({
        x: 35,
        y: y - 120,
        width: width - 70,
        height: 125,
        color: rgb(0.98, 0.99, 1),
        borderColor: rgb(0.85, 0.9, 0.95),
        borderWidth: 1,
      });

      page.drawText('प्रमुख विनिर्देश एवं मानक सारणी (Key Specifications)', {
        x: 45,
        y: y - 18,
        size: 9.5,
        font: customFont || standardFontBold,
        color: rgb(0.12, 0.23, 0.54),
      });

      let tableY = y - 36;
      notif.keyDetails.forEach((kd, idx) => {
        page.drawRectangle({
          x: 42,
          y: tableY - 14,
          width: width - 84,
          height: 18,
          color: idx % 2 === 0 ? rgb(0.95, 0.96, 0.98) : rgb(1, 1, 1),
        });

        if (customFont) {
          page.drawText(`• ${kd.label}:`, {
            x: 48,
            y: tableY - 9,
            size: 8.5,
            font: customFont,
            color: rgb(0.2, 0.2, 0.3),
          });

          page.drawText(kd.value, {
            x: 210,
            y: tableY - 9,
            size: 8.5,
            font: customFont,
            color: rgb(0.1, 0.2, 0.5),
          });
        } else {
          page.drawText(`• ${kd.label}: ${kd.value}`, {
            x: 48,
            y: tableY - 9,
            size: 8.5,
            font: standardFont,
            color: rgb(0.1, 0.2, 0.5),
          });
        }

        tableY -= 20;
      });

      y -= 150;

      // General Instructions for Candidates
      page.drawText('अभ्यर्थियों हेतु अनिवार्य अनुदेश (Mandatory Instructions):', {
        x: 40,
        y: y,
        size: 9.5,
        font: customFont || standardFontBold,
        color: rgb(0.15, 0.25, 0.5),
      });

      y -= 16;
      const rules = [
        '1. अभ्यर्थी आधिकारिक वेबसाइट (rsmssb.rajasthan.gov.in / rpsc.rajasthan.gov.in) पर ही सूचना का सत्यापन करें।',
        '2. OMR उत्तर पत्रक में 5वें विकल्प (Option E) को भरना अनिवार्य है; अनुत्तरित छोड़ने पर 1/3 अंक काटा जाएगा।',
        '3. परीक्षा केंद्र पर ई-प्रवेश पत्र, मूल फोटोयुक्त पहचान पत्र (आधार कार्ड/पहचान पत्र) एवं पारदर्शी बॉल पेन साथ लाएं।',
        '4. किसी भी प्रकार के अनुचित साधन (UFM) का प्रयोग करने पर राजस्थान सार्वजनिक परीक्षा अधिनियम 2022 के तहत कड़ी कार्रवाई की जाएगी।'
      ];

      rules.forEach((rule) => {
        if (customFont) {
          page.drawText(rule, {
            x: 45,
            y: y,
            size: 8,
            font: customFont,
            color: rgb(0.25, 0.25, 0.25),
          });
        } else {
          page.drawText(rule, {
            x: 45,
            y: y,
            size: 8,
            font: standardFont,
            color: rgb(0.25, 0.25, 0.25),
          });
        }
        y -= 14;
      });

      // Bottom Digital Seal Box
      page.drawRectangle({
        x: width - 230,
        y: 80,
        width: 195,
        height: 60,
        borderColor: rgb(0.12, 0.23, 0.54),
        borderWidth: 1.2,
        color: rgb(0.96, 0.98, 1),
      });

      if (customFont) {
        page.drawText('हस्ताक्षर अधिकृत अधिकारी / परीक्षा नियंत्रक', {
          x: width - 215,
          y: 122,
          size: 7.5,
          font: customFont,
          color: rgb(0.12, 0.23, 0.54),
        });

        page.drawText('राजस्थान प्रतियोगी परीक्षा संबल प्रकोष्ठ', {
          x: width - 215,
          y: 108,
          size: 7.5,
          font: customFont,
          color: rgb(0.2, 0.3, 0.6),
        });

        page.drawText('नई सोच, नई पहल अभियान', {
          x: width - 215,
          y: 92,
          size: 7.5,
          font: customFont,
          color: rgb(0.8, 0.4, 0.1),
        });
      } else {
        page.drawText('Authorized Exam Controller', {
          x: width - 215,
          y: 122,
          size: 8,
          font: standardFontBold,
          color: rgb(0.12, 0.23, 0.54),
        });
        page.drawText('Rajasthan Sambal Cell - Nayi Soch Nayi Pehal', {
          x: width - 215,
          y: 100,
          size: 7,
          font: standardFont,
          color: rgb(0.8, 0.4, 0.1),
        });
      }

      // Footer divider
      page.drawLine({
        start: { x: 35, y: 45 },
        end: { x: width - 35, y: 45 },
        thickness: 0.8,
        color: rgb(0.85, 0.88, 0.92),
      });

      page.drawText('युवा शिक्षा पोर्टल • नई सोच, नई पहल | रूपसिंह फनात संबल अभियान', {
        x: 35,
        y: 30,
        size: 7.5,
        font: customFont || standardFontBold,
        color: rgb(0.12, 0.23, 0.54),
      });

      page.drawText(`Circular ID: ${notif.id} • Page 1 of 1`, {
        x: width - 170,
        y: 30,
        size: 7.5,
        font: standardFont,
        color: rgb(0.5, 0.5, 0.5),
      });

      const pdfBytes = await pdfDoc.save();
      const safeFilename = `${notif.board}_Circular_${notif.id}.pdf`.replace(/[^a-zA-Z0-9._-]/g, '_');

      const buffer = Buffer.from(pdfBytes);

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${safeFilename}"`,
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
      });
    }

    // =========================================================================
    // BRANCH B: PREVIOUS YEAR QUESTION PAPER (PYQ) DOWNLOAD
    // =========================================================================
    const paperId = searchParams.get('id') || 'pyq-cet-grad-2024';
    const paper = PREVIOUS_PAPERS_DATA.find((p) => p.id === paperId) || PREVIOUS_PAPERS_DATA[0];

    const totalPages = 3;

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const page = pdfDoc.addPage([595.28, 841.89]); // A4 Size in points
      const { width, height } = page.getSize();

      // ==========================================
      // 1. TOP HEADER STAMP (REQUESTED REQUIREMENT)
      // Header: 'नई सोच, नई पहल | रूपसिंह फनात'
      // ==========================================
      page.drawRectangle({
        x: 0,
        y: height - 42,
        width: width,
        height: 42,
        color: rgb(0.12, 0.23, 0.54), // Royal Navy Blue (#1E3A8A)
      });

      page.drawRectangle({
        x: 0,
        y: height - 44,
        width: width,
        height: 2,
        color: rgb(0.96, 0.62, 0.04), // Gold (#F59E0B)
      });

      if (customFont) {
        page.drawText('नई सोच, नई पहल | रूपसिंह फनात', {
          x: 35,
          y: height - 26,
          size: 13,
          font: customFont,
          color: rgb(1, 1, 1),
        });

        page.drawText('युवा शिक्षा पोर्टल • 100% निःशुल्क प्रामाणिक प्रश्न-पत्र', {
          x: 35,
          y: height - 38,
          size: 8.5,
          font: customFont,
          color: rgb(0.9, 0.8, 0.4),
        });
      } else {
        page.drawText('Nayi Soch, Nayi Pehal | Roopsingh Fanat', {
          x: 35,
          y: height - 26,
          size: 12,
          font: standardFontBold,
          color: rgb(1, 1, 1),
        });

        page.drawText('Yuva Shiksha Portal Free PYQ Repository • Govt Exam Cell', {
          x: 35,
          y: height - 38,
          size: 8,
          font: standardFont,
          color: rgb(0.9, 0.8, 0.4),
        });
      }

      page.drawText(`YEAR ${paper.year} • ${paper.board}`, {
        x: width - 150,
        y: height - 26,
        size: 9,
        font: standardFontBold,
        color: rgb(1, 1, 1),
      });

      // ==========================================
      // 2. WATERMARK STAMP (REQUESTED REQUIREMENT)
      // Watermark: 'नई सोच, नई पहल | रूपसिंह फनात'
      // ==========================================
      if (customFont) {
        page.drawText('नई सोच, नई पहल | रूपसिंह फनात', {
          x: 70,
          y: height / 2 - 40,
          size: 26,
          font: customFont,
          color: rgb(0.12, 0.23, 0.54),
          opacity: 0.12,
          rotate: degrees(45),
        });

        page.drawText('YUVA SHIKSHA PORTAL • FREE PYQ', {
          x: 80,
          y: height / 2 - 80,
          size: 18,
          font: standardFontBold,
          color: rgb(0.12, 0.23, 0.54),
          opacity: 0.08,
          rotate: degrees(45),
        });
      } else {
        page.drawText('Nayi Soch, Nayi Pehal | Roopsingh Fanat', {
          x: 60,
          y: height / 2 - 40,
          size: 22,
          font: standardFontBold,
          color: rgb(0.12, 0.23, 0.54),
          opacity: 0.12,
          rotate: degrees(45),
        });
      }

      // ==========================================
      // 3. PAGE BODY CONTENT
      // ==========================================
      let currentY = height - 75;

      if (pageNum === 1) {
        // Page 1: Official Board Masthead & Exam Details
        page.drawRectangle({
          x: 35,
          y: currentY - 65,
          width: width - 70,
          height: 70,
          color: rgb(0.97, 0.98, 0.99),
          borderColor: rgb(0.85, 0.88, 0.92),
          borderWidth: 1,
        });

        const boardName = paper.board === 'RSMSSB' 
          ? 'राजस्थान कर्मचारी चयन बोर्ड, जयपुर'
          : 'राजस्थान लोक सेवा आयोग, अजमेर';

        if (customFont) {
          page.drawText(boardName, {
            x: 175,
            y: currentY - 22,
            size: 13,
            font: customFont,
            color: rgb(0.1, 0.2, 0.4),
          });

          page.drawText(`${paper.examTitle} - विगत वर्ष प्रश्न पत्र (${paper.year})`, {
            x: 110,
            y: currentY - 38,
            size: 10.5,
            font: customFont,
            color: rgb(0.12, 0.23, 0.54),
          });

          page.drawText(`चरण: ${paper.stage} • पारी: ${paper.shift || 'प्रातःकालीन'} • कुल प्रश्न: ${paper.questionsCount} • प्रामाणिक मास्टर प्रति`, {
            x: 100,
            y: currentY - 54,
            size: 8.5,
            font: customFont,
            color: rgb(0.3, 0.35, 0.4),
          });
        } else {
          page.drawText(`${paper.board} Official Exam Paper - Year ${paper.year}`, {
            x: 160,
            y: currentY - 22,
            size: 12,
            font: standardFontBold,
            color: rgb(0.1, 0.2, 0.4),
          });

          page.drawText(paper.examTitle, {
            x: 140,
            y: currentY - 38,
            size: 10,
            font: standardFontBold,
            color: rgb(0.12, 0.23, 0.54),
          });
        }

        currentY -= 85;

        // OMR 5th Option Notice Banner
        page.drawRectangle({
          x: 35,
          y: currentY - 32,
          width: width - 70,
          height: 35,
          color: rgb(0.99, 0.95, 0.95),
          borderColor: rgb(0.9, 0.7, 0.7),
          borderWidth: 0.8,
        });

        if (customFont) {
          page.drawText('महत्वपूर्ण निर्देश (5वां विकल्प - Option E):', {
            x: 45,
            y: currentY - 14,
            size: 8.5,
            font: customFont,
            color: rgb(0.7, 0.1, 0.1),
          });

          page.drawText('प्रत्येक प्रश्न के 5 विकल्प (A, B, C, D, E) हैं। यदि कोई प्रश्न हल नहीं करना चाहते हैं तो 5वां विकल्प (E) गहरा गोला करें। 10% से अधिक अनुत्तरित पर अयोग्यता।', {
            x: 45,
            y: currentY - 26,
            size: 7.5,
            font: customFont,
            color: rgb(0.4, 0.1, 0.1),
          });
        } else {
          page.drawText('IMPORTANT NOTICE: 5th Option (Option E) Rule is applicable for all RPSC/RSMSSB papers.', {
            x: 45,
            y: currentY - 18,
            size: 8,
            font: standardFontBold,
            color: rgb(0.7, 0.1, 0.1),
          });
        }

        currentY -= 50;

        // Sample authentic questions from the question paper
        const sampleQuestions = [
          {
            qNum: 1,
            text: 'राजस्थान में 1857 की क्रांति का प्रथम विद्रोह किस सैनिक छावनी में हुआ था?',
            optA: '(A) एरिनपुरा',
            optB: '(B) नसीराबाद',
            optC: '(C) नीमच',
            optD: '(D) देवली',
            optE: '(E) अनुत्तरित प्रश्न'
          },
          {
            qNum: 2,
            text: 'राजस्थान के कुल कितने जिले अंतर्राज्यीय सीमा बनाते हैं?',
            optA: '(A) 21',
            optB: '(B) 23',
            optC: '(C) 25',
            optD: '(D) 27',
            optE: '(E) अनुत्तरित प्रश्न'
          },
          {
            qNum: 3,
            text: 'राजस्थान की प्रथम महिला मुख्य सचिव कौन थीं?',
            optA: '(A) श्रीमती कुशाल सिंह',
            optB: '(B) श्रीमती उषा शर्मा',
            optC: '(C) श्रीमती प्रभा राव',
            optD: '(D) श्रीमती कमला बेनीवाल',
            optE: '(E) अनुत्तरित प्रश्न'
          }
        ];

        sampleQuestions.forEach((q) => {
          page.drawRectangle({
            x: 35,
            y: currentY - 70,
            width: width - 70,
            height: 75,
            color: rgb(1, 1, 1),
            borderColor: rgb(0.9, 0.92, 0.95),
            borderWidth: 0.8,
          });

          if (customFont) {
            page.drawText(`प्रश्न ${q.qNum}.  ${q.text}`, {
              x: 45,
              y: currentY - 18,
              size: 9.5,
              font: customFont,
              color: rgb(0.1, 0.1, 0.1),
            });

            page.drawText(`${q.optA}       ${q.optB}       ${q.optC}`, {
              x: 55,
              y: currentY - 36,
              size: 8.5,
              font: customFont,
              color: rgb(0.2, 0.2, 0.2),
            });

            page.drawText(`${q.optD}       ${q.optE}`, {
              x: 55,
              y: currentY - 52,
              size: 8.5,
              font: customFont,
              color: rgb(0.2, 0.2, 0.2),
            });
          } else {
            page.drawText(`Q${q.qNum}. ${q.text}`, {
              x: 45,
              y: currentY - 18,
              size: 9,
              font: standardFontBold,
              color: rgb(0.1, 0.1, 0.1),
            });
            page.drawText(`${q.optA} | ${q.optB} | ${q.optC} | ${q.optD} | ${q.optE}`, {
              x: 55,
              y: currentY - 38,
              size: 8,
              font: standardFont,
              color: rgb(0.2, 0.2, 0.2),
            });
          }

          currentY -= 85;
        });

      } else if (pageNum === 2) {
        // Page 2: General Knowledge & Subject Section
        if (customFont) {
          page.drawText(`भाग - II : सामान्य ज्ञान एवं राजस्थान का भूगोल, इतिहास व संस्कृति`, {
            x: 35,
            y: currentY - 15,
            size: 11,
            font: customFont,
            color: rgb(0.12, 0.23, 0.54),
          });
        } else {
          page.drawText(`SECTION - II : Rajasthan General Knowledge & Culture`, {
            x: 35,
            y: currentY - 15,
            size: 11,
            font: standardFontBold,
            color: rgb(0.12, 0.23, 0.54),
          });
        }

        currentY -= 35;

        const page2Questions = [
          {
            qNum: 4,
            text: 'केवलादेव राष्ट्रीय उद्यान को यूनेस्को की विश्व धरोहर सूची में किस वर्ष शामिल किया गया था?',
            optA: '(A) 1981',
            optB: '(B) 1985',
            optC: '(C) 1989',
            optD: '(D) 1992',
            optE: '(E) अनुत्तरित प्रश्न'
          },
          {
            qNum: 5,
            text: 'हल्दीघाटी के युद्ध में महाराणा प्रताप की सेना के हरावल दस्ते का नेतृत्व किसने किया था?',
            optA: '(A) झाला मन्ना',
            optB: '(B) हकीम खां सूरी',
            optC: '(C) राणा पूंजा',
            optD: '(D) भामाशाह',
            optE: '(E) अनुत्तरित प्रश्न'
          },
          {
            qNum: 6,
            text: 'राजस्थान में 56 का मैदान किस नदी के प्रवाह बेसिन में स्थित है?',
            optA: '(A) चम्बल',
            optB: '(B) माही',
            optC: '(C) बनास',
            optD: '(D) लूनी',
            optE: '(E) अनुत्तरित प्रश्न'
          },
          {
            qNum: 7,
            text: 'राजस्थान के किस दुर्ग को "किलों का सिरमौर" कहा जाता है?',
            optA: '(A) कुम्भलगढ़ दुर्ग',
            optB: '(B) चित्तौड़गढ़ दुर्ग',
            optC: '(C) मेहरानगढ़ दुर्ग',
            optD: '(D) रणथम्भौर दुर्ग',
            optE: '(E) अनुत्तरित प्रश्न'
          }
        ];

        page2Questions.forEach((q) => {
          page.drawRectangle({
            x: 35,
            y: currentY - 70,
            width: width - 70,
            height: 75,
            color: rgb(1, 1, 1),
            borderColor: rgb(0.9, 0.92, 0.95),
            borderWidth: 0.8,
          });

          if (customFont) {
            page.drawText(`प्रश्न ${q.qNum}.  ${q.text}`, {
              x: 45,
              y: currentY - 18,
              size: 9.5,
              font: customFont,
              color: rgb(0.1, 0.1, 0.1),
            });

            page.drawText(`${q.optA}       ${q.optB}       ${q.optC}`, {
              x: 55,
              y: currentY - 36,
              size: 8.5,
              font: customFont,
              color: rgb(0.2, 0.2, 0.2),
            });

            page.drawText(`${q.optD}       ${q.optE}`, {
              x: 55,
              y: currentY - 52,
              size: 8.5,
              font: customFont,
              color: rgb(0.2, 0.2, 0.2),
            });
          } else {
            page.drawText(`Q${q.qNum}. ${q.text}`, {
              x: 45,
              y: currentY - 18,
              size: 9,
              font: standardFontBold,
              color: rgb(0.1, 0.1, 0.1),
            });
            page.drawText(`${q.optA} | ${q.optB} | ${q.optC} | ${q.optD} | ${q.optE}`, {
              x: 55,
              y: currentY - 38,
              size: 8,
              font: standardFont,
              color: rgb(0.2, 0.2, 0.2),
            });
          }

          currentY -= 85;
        });

      } else {
        // Page 3: Official Answer Key Matrix & Initiative Stamp Notice
        if (customFont) {
          page.drawText(`आधिकारिक मॉडल उत्तर कुंजी (Official Model Answer Key)`, {
            x: 35,
            y: currentY - 15,
            size: 11,
            font: customFont,
            color: rgb(0.12, 0.23, 0.54),
          });
        } else {
          page.drawText(`OFFICIAL MODEL ANSWER KEY MATRIX`, {
            x: 35,
            y: currentY - 15,
            size: 11,
            font: standardFontBold,
            color: rgb(0.12, 0.23, 0.54),
          });
        }

        currentY -= 35;

        // Answer Key Table
        page.drawRectangle({
          x: 35,
          y: currentY - 160,
          width: width - 70,
          height: 165,
          color: rgb(0.98, 0.99, 1),
          borderColor: rgb(0.85, 0.9, 0.95),
          borderWidth: 1,
        });

        // Answer grid (20 questions sample)
        const keys = [
          ['Q.1', 'B'], ['Q.2', 'B'], ['Q.3', 'A'], ['Q.4', 'B'], ['Q.5', 'B'],
          ['Q.6', 'B'], ['Q.7', 'B'], ['Q.8', 'C'], ['Q.9', 'A'], ['Q.10', 'D'],
          ['Q.11', 'B'], ['Q.12', 'C'], ['Q.13', 'A'], ['Q.14', 'B'], ['Q.15', 'C'],
          ['Q.16', 'A'], ['Q.17', 'D'], ['Q.18', 'B'], ['Q.19', 'A'], ['Q.20', 'C']
        ];

        let gridX = 50;
        let gridY = currentY - 25;
        keys.forEach(([q, ans], idx) => {
          page.drawText(`${q}: [ ${ans} ]`, {
            x: gridX,
            y: gridY,
            size: 9,
            font: standardFontBold,
            color: rgb(0.12, 0.23, 0.54),
          });

          if ((idx + 1) % 5 === 0) {
            gridX = 50;
            gridY -= 28;
          } else {
            gridX += 95;
          }
        });

        currentY -= 195;

        // Initiative Dedication Box
        page.drawRectangle({
          x: 35,
          y: currentY - 95,
          width: width - 70,
          height: 100,
          color: rgb(0.95, 0.97, 1),
          borderColor: rgb(0.7, 0.8, 0.95),
          borderWidth: 1.2,
        });

        if (customFont) {
          page.drawText('शिक्षा संबल संदेश — नई सोच, नई पहल', {
            x: 48,
            y: currentY - 20,
            size: 11,
            font: customFont,
            color: rgb(0.12, 0.23, 0.54),
          });

          page.drawText('रूपसिंह फनात की ओर से युवाओं को समर्पित — उन सभी युवाओं के लिए जो राजस्थान भर्ती परीक्षा', {
            x: 48,
            y: currentY - 38,
            size: 8.5,
            font: customFont,
            color: rgb(0.2, 0.25, 0.35),
          });

          page.drawText('की तैयारी कर रहे हैं। नई सोच, नई पहल — आइए मिलकर कल को और बेहतर बनाते हैं।', {
            x: 48,
            y: currentY - 52,
            size: 8.5,
            font: customFont,
            color: rgb(0.2, 0.25, 0.35),
          });

          page.drawText('विद्यार्थियों से अनुरोध है कि वे प्रामाणिक अध्ययन सामग्री से ही निरंतर अभ्यास करें।', {
            x: 48,
            y: currentY - 66,
            size: 8.5,
            font: customFont,
            color: rgb(0.2, 0.25, 0.35),
          });

          page.drawText('सम्पर्क एवं मार्गदर्शन: युवा शिक्षा प्रकोष्ठ • रूपसिंह फनात (नई सोच, नई पहल)', {
            x: 48,
            y: currentY - 84,
            size: 8,
            font: customFont,
            color: rgb(0.85, 0.45, 0.05),
          });
        } else {
          page.drawText('Educational Initiative - Nayi Soch, Nayi Pehal', {
            x: 48,
            y: currentY - 20,
            size: 11,
            font: standardFontBold,
            color: rgb(0.12, 0.23, 0.54),
          });

          page.drawText('Dedicated to youth by Roopsingh Fanat for Rajasthan competitive exams preparation.', {
            x: 48,
            y: currentY - 40,
            size: 8.5,
            font: standardFont,
            color: rgb(0.2, 0.25, 0.35),
          });
        }
      }

      // Bottom Page Footer
      page.drawLine({
        start: { x: 35, y: 35 },
        end: { x: width - 35, y: 35 },
        thickness: 0.8,
        color: rgb(0.85, 0.88, 0.92),
      });

      page.drawText('युवा शिक्षा पोर्टल • नई सोच, नई पहल | रूपसिंह फनात संबल अभियान', {
        x: 35,
        y: 22,
        size: 7.5,
        font: customFont || standardFontBold,
        color: rgb(0.12, 0.23, 0.54),
      });

      page.drawText(`Page ${pageNum} of ${totalPages} • Certified Educational Copy`, {
        x: width - 180,
        y: 22,
        size: 7.5,
        font: standardFont,
        color: rgb(0.5, 0.5, 0.5),
      });
    }

    // Save and serialize the stamped PDF bytes
    const pdfBytes = await pdfDoc.save();

    // Sanitize filename
    const safeFilename = `${paper.board}_${paper.year}_${paper.id}.pdf`.replace(/[^a-zA-Z0-9._-]/g, '_');

    const buffer = Buffer.from(pdfBytes);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${safeFilename}"`,
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });

  } catch (error: any) {
    console.error('Error generating stamped PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate stamped PDF', details: error?.message },
      { status: 500 }
    );
  }
}
