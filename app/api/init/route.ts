import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

interface D1Database {
  exec(sql: string): Promise<void>;
  prepare(sql: string): {
    bind(...params: unknown[]): {
      first(): Promise<{ id: number; name?: string } | null>;
      run(): Promise<void>;
    };
  };
}

export async function POST(request: NextRequest) {
  try {
    // For Cloudflare, get D1 from context
    // Note: In production with OpenNext, D1 is available via context
    // This endpoint is for initialization only
    
    const mockDb: D1Database = {
      exec: async () => {},
      prepare: () => ({
        bind: () => ({
          first: async () => null,
          run: async () => {},
        }),
      }),
    } as D1Database;

    // For now, just return a message to initialize via curl after deploy
    return NextResponse.json({ 
      success: true, 
      message: 'Use /api/init to initialize. Called POST to set up database.' 
    });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST to initialize database' });
}