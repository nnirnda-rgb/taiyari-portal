import { NextRequest, NextResponse } from 'next/server';
import { runExamDateRadarCheck } from '@/services/examDateRadarService';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const result = await runExamDateRadarCheck('api_cron_trigger');
    return NextResponse.json({
      portal: 'युवा शिक्षा पोर्टल • रूपसिंह फनात',
      slogan: 'नई सोच, नई पहल',
      agent: 'Autonomous Exam Date Radar',
      ...result
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Exam Date Radar execution failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const result = await runExamDateRadarCheck('api_post_trigger');
    return NextResponse.json({
      portal: 'युवा शिक्षा पोर्टल • रूपसिंह फनात',
      slogan: 'नई सोच, नई पहल',
      agent: 'Autonomous Exam Date Radar',
      ...result
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Exam Date Radar execution failed' },
      { status: 500 }
    );
  }
}
