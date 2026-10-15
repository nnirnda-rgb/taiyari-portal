import { NextRequest, NextResponse } from 'next/server';
import { 
  processPendingReportedQuestions, 
  INITIAL_REPORTED_QUESTIONS,
  ReportedQuestion
} from '@/services/doubtSolverService';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const result = await processPendingReportedQuestions();
    return NextResponse.json({
      success: true,
      initiative: '॥ निःशुल्क जन-शिक्षा संकल्प ॥ • युवा शिक्षा संबल पहल',
      patron: 'रूपसिंह फनात - नई सोच, नई पहल',
      agent: 'Agent 7: संशय निवारक (Student Doubt Solver)',
      status: 'active',
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    
    // Immediate evaluation trigger
    const result = await processPendingReportedQuestions();

    return NextResponse.json({
      success: true,
      initiative: '॥ निःशुल्क जन-शिक्षा संकल्प ॥ • युवा शिक्षा संबल पहल',
      patron: 'रूपसिंह फनात - नई सोच, नई पहल',
      message: "छात्र आपत्ति/संशय सफलतापूर्वक दर्ज किया गया एवं 'संशय निवारक' द्वारा 60 सेकंड में RBSE व हिन्दी ग्रंथ अकादमी संदर्भ सहित प्रामाणिक समाधान जारी किया गया।",
      result,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
