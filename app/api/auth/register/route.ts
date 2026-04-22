import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { dbStatements } from '@/lib/db';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key-change-in-production');

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, confirmPassword } = await request.json();

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = dbStatements.getUserByEmail.get(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const result = dbStatements.createUser.run(name, email, passwordHash);
    const userId = result.lastInsertRowid as number;

    // Assign default role (Viewer)
    const viewerRole = dbStatements.getRoleByName.get('Viewer') as { id: number } | undefined;
    if (viewerRole) {
      dbStatements.updateUserRole.run(viewerRole.id, userId);
    }

    // Generate JWT token
    const token = await new SignJWT({
      userId,
      email,
      name,
      roleId: viewerRole?.id,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d') // 7 days
      .sign(JWT_SECRET);

    // Create session for logout capability
    const sessionId = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    dbStatements.createSession.run(sessionId, userId, expiresAt.toISOString());

    // Return success with token
    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        name,
        email,
        roleId: viewerRole?.id,
        roleName: 'Viewer',
        permissions: ['projects.view'],
        role: viewerRole ? {
          id: viewerRole.id,
          name: 'Viewer',
          permissions: ['projects.view'],
        } : null,
      },
      token,
      sessionId,
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}