import { NextRequest, NextResponse } from 'next/server';
import { dbStatements } from '@/lib/db';
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
    if (!hasPermission(permissions, 'roles.update')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const roleId = parseInt(id);
    if (isNaN(roleId)) {
      return NextResponse.json({ error: 'Invalid role ID' }, { status: 400 });
    }

    const { name, description, permissions: rolePermissions } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'Role name is required' }, { status: 400 });
    }

    // Check if another role with this name exists
    const existingRole = dbStatements.getRoleByName.get(name) as any;
    if (existingRole && existingRole.id !== roleId) {
      return NextResponse.json({ error: 'Role with this name already exists' }, { status: 409 });
    }

    dbStatements.updateRole.run(
      name,
      description || '',
      JSON.stringify(rolePermissions || []),
      roleId
    );

    const updatedRole = dbStatements.getRoleById.get(roleId) as any;
    if (!updatedRole) {
      return NextResponse.json({ error: 'Role not found after update' }, { status: 404 });
    }

    return NextResponse.json({
      role: {
        ...updatedRole,
        permissions: JSON.parse(updatedRole.permissions || '[]'),
      },
    });
  } catch (error) {
    console.error('Update role error:', error);
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
    if (!hasPermission(permissions, 'roles.delete')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const roleId = parseInt(id);
    if (isNaN(roleId)) {
      return NextResponse.json({ error: 'Invalid role ID' }, { status: 400 });
    }

    // Check if role exists
    const role = dbStatements.getRoleById.get(roleId) as any;
    if (!role) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 });
    }

    // Prevent deleting system roles
    const systemRoles = ['Admin', 'Editor', 'Viewer'];
    if (systemRoles.includes(role.name)) {
      return NextResponse.json({ error: 'Cannot delete system roles' }, { status: 400 });
    }

    dbStatements.deleteRole.run(roleId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete role error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}