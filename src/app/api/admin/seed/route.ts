import { NextRequest, NextResponse } from 'next/server';
import { seedInitialDataToFirestore } from '@/services/firestoreService';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const result = await seedInitialDataToFirestore();
    return NextResponse.json({
      portal: 'युवा शिक्षा संबल पहल • रूपसिंह फनात',
      slogan: 'नई सोच, नई पहल',
      ...result,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Seeding failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const result = await seedInitialDataToFirestore();
    return NextResponse.json({
      portal: 'युवा शिक्षा संबल पहल • रूपसिंह फनात',
      slogan: 'नई सोच, नई पहल',
      ...result,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Seeding failed' },
      { status: 500 }
    );
  }
}
