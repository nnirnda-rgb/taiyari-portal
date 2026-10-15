import { NextRequest, NextResponse } from 'next/server';
import { executeAgent } from '@/services/agentPipelineService';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Vercel Cron or GitHub Actions webhook
    const result = await executeAgent('all');

    return NextResponse.json({
      mode: 'scheduled_cron',
      initiative: '॥ निःशुल्क जन-शिक्षा संकल्प ॥ • युवा शिक्षा संबल पहल',
      patron: 'रूपसिंह फनात - नई सोच, नई पहल',
      message: 'ऑटो-पब्लिश 6-एजेंट पाइपलाइन का आवधिक क्रॉन जॉब सफलतापूर्वक संपन्न हुआ।',
      ...result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
