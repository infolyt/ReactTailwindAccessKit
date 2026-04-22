import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key-change-in-production');

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    try {
      const { dbStatements } = await import('@/lib/db');
      
      if (!dbStatements.getUserByEmailWithRole) {
        return NextResponse.json(
          { error: 'Database not configured. Please set up D1 database.' },
          { status: 503 }
        );
      }

      const user = dbStatements.getUserByEmailWithRole.get(email) as {
        id: number;
        name: string;
        email: string;
        password_hash: string;
        created_at: string;
        updated_at: string;
        role_id: number | null;
        role_name: string | null;
        permissions: string | null;
      } | undefined;

      if (!user) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      const token = await new SignJWT({
        userId: user.id,
        email: user.email,
        name: user.name,
        roleId: user.role_id || undefined,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(JWT_SECRET);

      const sessionId = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      dbStatements.createSession.run(sessionId, user.id, expiresAt.toISOString());

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          roleId: user.role_id,
          roleName: user.role_name || undefined,
          permissions: user.permissions ? JSON.parse(user.permissions) : [],
          role: user.role_name ? {
            id: user.role_id,
            name: user.role_name,
            permissions: user.permissions ? JSON.parse(user.permissions) : [],
          } : null,
        },
        token,
        sessionId,
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Database not available. Please configure D1.' },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}