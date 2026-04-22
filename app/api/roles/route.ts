import { NextRequest, NextResponse } from 'next/server';
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

    // Get user with role
    const userWithRole = dbStatements.getUserWithRole.get(user.userId) as any;
    if (!userWithRole || !userWithRole.permissions) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const permissions = JSON.parse(userWithRole.permissions);
    if (!hasPermission(permissions, 'roles.view')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const roles = dbStatements.getAllRoles.all().map((role: any) => ({
      ...role,
      permissions: JSON.parse(role.permissions || '[]'),
    }));

    return NextResponse.json({ roles });
  } catch (error) {
    console.error('Get roles error:', error);
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
    if (!hasPermission(permissions, 'roles.create')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { name, description, permissions: rolePermissions } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'Role name is required' }, { status: 400 });
    }

    // Check if role already exists
    const existingRole = dbStatements.getRoleByName.get(name);
    if (existingRole) {
      return NextResponse.json({ error: 'Role with this name already exists' }, { status: 409 });
    }

    const result = dbStatements.createRole.run(
      name,
      description || '',
      JSON.stringify(rolePermissions || [])
    );

    const roleId = result.lastInsertRowid as number;
    const newRole = dbStatements.getRoleById.get(roleId) as any;

    return NextResponse.json({
      role: {
        ...newRole,
        permissions: JSON.parse(newRole.permissions || '[]'),
      },
    });
  } catch (error) {
    console.error('Create role error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}