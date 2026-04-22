import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { dbStatements } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

function hasPermission(userPermissions: string[], requiredPermission: string): boolean {
  return userPermissions.includes(requiredPermission);
}

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userWithRole = dbStatements.getUserWithRole.get(user.userId) as any;
    if (!userWithRole || !userWithRole.permissions) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const permissions = JSON.parse(userWithRole.permissions);
    if (!hasPermission(permissions, 'users.view')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const users = dbStatements.getAllUsersWithRoles.all().map((user: any) => ({
      ...user,
      permissions: user.permissions ? JSON.parse(user.permissions) : null,
    }));

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userWithRole = dbStatements.getUserWithRole.get(user.userId) as any;
    if (!userWithRole || !userWithRole.permissions) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const permissions = JSON.parse(userWithRole.permissions);
    if (!hasPermission(permissions, 'users.create')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { name, email, password, roleId } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = dbStatements.getUserByEmail.get(email);
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const result = dbStatements.createUser.run(name, email, passwordHash);
    const userId = result.lastInsertRowid as number;

    // Assign role if provided
    if (roleId) {
      dbStatements.updateUserRole.run(roleId, userId);
    } else {
      // Assign default role (Viewer)
      const viewerRole = dbStatements.getRoleByName.get('Viewer') as { id: number } | undefined;
      if (viewerRole) {
        dbStatements.updateUserRole.run(viewerRole.id, userId);
      }
    }

    // Get the created user with role
    const createdUser = dbStatements.getUserWithRole.get(userId) as any;

    return NextResponse.json({
      user: {
        ...createdUser,
        permissions: createdUser.permissions ? JSON.parse(createdUser.permissions) : null,
      },
    });
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}