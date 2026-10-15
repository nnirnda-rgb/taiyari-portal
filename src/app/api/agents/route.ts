import { NextRequest, NextResponse } from 'next/server';
import { executeAgent, getStoredAgentReports } from '@/services/agentPipelineService';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const reports = getStoredAgentReports();
    return NextResponse.json({
      success: true,
      initiative: '॥ निःशुल्क जन-शिक्षा संकल्प ॥ • युवा शिक्षा संबल पहल',
      patron: 'रूपसिंह फनात - नई सोच, नई पहल',
      portalStatus: '100% Free & Hands-Free Autonomous',
      activeAgentsCount: reports.length,
      agents: reports,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to retrieve agent status' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const agentId = body.agentId ?? 'all'; // Default to running all agents

    const executionResult = await executeAgent(agentId);

    return NextResponse.json({
      initiative: '॥ निःशुल्क जन-शिक्षा संकल्प ॥ • युवा शिक्षा संबल पहल',
      patron: 'रूपसिंह फनात - नई सोच, नई पहल',
      message: `एजेंट ${agentId === 'all' ? '1 से 7 (समस्त स्वायत्त कार्यकर्ता)' : agentId} का निष्पादन एवं डायरेक्ट ऑटो-पब्लिश ('published') सफलतापूर्वक पूर्ण हुआ।`,
      ...executionResult,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Agent execution failed' },
      { status: 500 }
    );
  }
}
