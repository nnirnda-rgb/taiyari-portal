import { NextRequest, NextResponse } from 'next/server';
import { 
  resolveStudentGeneralDoubt, 
  submitQuestionDispute, 
  processPendingReportedQuestions 
} from '@/services/doubtSolverService';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const result = await processPendingReportedQuestions();
    return NextResponse.json({
      success: true,
      agent: 'Agent 7: संशय निवारक मित्र (AI Student Helper & Dispute Reconciler)',
      initiative: '॥ निःशुल्क जन-शिक्षा संकल्प — समर्पित ग्रामीण युवा शक्ति को ॥',
      ...result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process doubts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { action } = body;

    // Action 1: Instant Doubt Resolution
    if (action === 'solve_doubt') {
      const doubtText = body.doubtText?.trim();
      if (!doubtText) {
        return NextResponse.json(
          { success: false, error: 'कृपया अपना संशय अथवा प्रश्न दर्ज करें।' },
          { status: 400 }
        );
      }

      const resolution = await resolveStudentGeneralDoubt(doubtText, body.topic);
      return NextResponse.json({
        success: true,
        action: 'solve_doubt',
        agent: 'संशय निवारक मित्र (AI Student Helper)',
        initiative: '॥ निःशुल्क जन-शिक्षा संकल्प — समर्पित ग्रामीण युवा शक्ति को ॥',
        resolution,
      });
    }

    // Action 2: One-Click Question Error Dispute Submission
    if (action === 'report_error') {
      const questionId = body.questionId?.trim();
      const studentRemark = body.studentRemark?.trim();

      if (!questionId || !studentRemark) {
        return NextResponse.json(
          { success: false, error: 'प्रश्न ID एवं आपत्ति का विवरण दर्ज करना अनिवार्य है।' },
          { status: 400 }
        );
      }

      const disputeResult = await submitQuestionDispute({
        questionId,
        examId: body.examId,
        studentRemark,
        studentReportedOption: body.studentReportedOption,
        questionTextHindi: body.questionTextHindi,
      });

      return NextResponse.json({
        success: true,
        action: 'report_error',
        agent: 'संशय निवारक एवं QA Auditor Bot (Agent 6 & 7)',
        message: 'आपकी आपत्ति सफलतापूर्वक दर्ज कर ली गई है और मानक पाठ्यपुस्तकों के आधार पर तत्काल पुनर्मूल्यांकन कर लिया गया है।',
        dispute: disputeResult,
      });
    }

    return NextResponse.json(
      { success: false, error: 'अमान्य कार्रवाई (Invalid action)' },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Doubt solver error' },
      { status: 500 }
    );
  }
}
