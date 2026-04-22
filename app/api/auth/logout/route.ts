import { NextRequest, NextResponse } from 'next/server';
import { dbStatements } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (sessionId) {
      // Delete the session from database
      dbStatements.deleteSession.run(sessionId);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}