import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db, { dbStatements } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

function hasPermission(userPermissions: string[], requiredPermission: string): boolean {
  return userPermissions.includes(requiredPermission);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
    if (!hasPermission(permissions, 'users.update')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const targetUserId = parseInt(id);
    if (isNaN(targetUserId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const { name, email, password, roleId } = await request.json();

    // Check if user exists
    const existingUser = dbStatements.getUserWithRole.get(targetUserId) as any;
    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update user fields
    if (name || email) {
      dbStatements.updateUser.run(name || existingUser.name, email || existingUser.email, targetUserId);
    }

    // Update role if provided
    if (roleId !== undefined) {
      dbStatements.updateUserRole.run(roleId, targetUserId);
    }

    // Update password if provided
    if (password) {
      if (password.length < 6) {
        return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
      }
      const passwordHash = await bcrypt.hash(password, 12);
      dbStatements.updateUserPassword.run(passwordHash, targetUserId);
    }

    // Get updated user
    const updatedUser = dbStatements.getUserWithRole.get(targetUserId) as any;

    return NextResponse.json({
      user: {
        ...updatedUser,
        permissions: updatedUser.permissions ? JSON.parse(updatedUser.permissions) : null,
      },
    });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
    if (!hasPermission(permissions, 'users.delete')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const targetUserId = parseInt(id);
    if (isNaN(targetUserId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Check if user exists
    const existingUser = dbStatements.getUserWithRole.get(targetUserId) as any;
    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Prevent deleting self
    if (targetUserId === user.userId) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
    }

    // Delete user (this will cascade to sessions and project_members)
    db.prepare('DELETE FROM users WHERE id = ?').run(targetUserId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}