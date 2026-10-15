import { NextRequest, NextResponse } from 'next/server';
import { PREVIOUS_PAPERS_DATA, PORTAL_NOTIFICATIONS } from '@/data/portalData';

export const dynamic = 'force-dynamic';

/**
 * GENUINE MULTI-SOURCE PYQ & CIRCULAR DISPATCHER
 * 
 * STRICT COMPLIANCE:
 * - Client-side synthetic 10-question dummy PDF generation has been permanently purged.
 * - Dispatches students directly to authentic, complete 100-150 question master papers
 *   and official answer keys from state portals (rpsc.rajasthan.gov.in, rssb.rajasthan.gov.in, police.rajasthan.gov.in)
 *   and trusted open educational mirrors (archive.org).
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const circularId = searchParams.get('circularId');
    const paperId = searchParams.get('id');
    const type = searchParams.get('type'); // 'paper' | 'key' | 'mirror' | 'mirror-key' | 'circular'

    // =========================================================================
    // 1. CIRCULAR / RECRUITMENT NOTIFICATION DISPATCH
    // =========================================================================
    if (circularId || type === 'circular') {
      const targetId = circularId || searchParams.get('notifId');
      const circular = PORTAL_NOTIFICATIONS.find((n) => n.id === targetId) || PORTAL_NOTIFICATIONS[0];

      const redirectUrl = type === 'mirror'
        ? (circular.mirrorUrl || circular.downloadUrl || 'https://rssb.rajasthan.gov.in')
        : (circular.downloadUrl || circular.mirrorUrl || 'https://rssb.rajasthan.gov.in');

      return NextResponse.redirect(redirectUrl, {
        status: 302,
        headers: {
          'Cache-Control': 'public, max-age=3600',
          'X-Document-Type': 'Official_Recruitment_Circular',
          'X-Source-Portal': circular.officialSourcePortal || 'State_Recruitment_Portal'
        }
      });
    }

    // =========================================================================
    // 2. MASTER QUESTION PAPER & FINAL ANSWER KEY DISPATCH
    // =========================================================================
    const paper = PREVIOUS_PAPERS_DATA.find((p) => p.id === paperId) || PREVIOUS_PAPERS_DATA[0];

    let targetUrl: string;

    if (type === 'key' || type === 'answerkey') {
      // Official Answer Key
      targetUrl = paper.answerKeyUrl || paper.mirrorAnswerKeyUrl;
    } else if (type === 'mirror-key') {
      // Mirror Answer Key
      targetUrl = paper.mirrorAnswerKeyUrl || paper.answerKeyUrl;
    } else if (type === 'mirror' || type === 'mirror-paper') {
      // Mirror Master Paper
      targetUrl = paper.mirrorPaperUrl || paper.masterPaperUrl;
    } else {
      // Master Question Paper (Default - Full 100-150 Questions)
      targetUrl = paper.masterPaperUrl || paper.mirrorPaperUrl;
    }

    if (!targetUrl || targetUrl.startsWith('#')) {
      targetUrl = paper.masterPaperUrl || paper.officialSourcePortal || 'https://rssb.rajasthan.gov.in';
    }

    return NextResponse.redirect(targetUrl, {
      status: 302,
      headers: {
        'Cache-Control': 'public, max-age=86400',
        'X-Document-Type': 'Authentic_Master_Question_Paper',
        'X-Board-Source': paper.officialSourcePortal,
        'X-Exam-Title': encodeURIComponent(paper.examTitle)
      }
    });

  } catch (error) {
    console.error('PYQ Dispatch Error:', error);
    return NextResponse.redirect('https://rssb.rajasthan.gov.in', 302);
  }
}
