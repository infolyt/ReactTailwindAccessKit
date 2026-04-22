'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { 
  Shield, 
  Search, 
  Plus, 
  MoreHorizontal, 
  Loader2,
  AlertCircle,
  Pencil,
  Trash2,
  Users,
  Key,
} from 'lucide-react';
import { fetchRoles, createRole, updateRole, deleteRole } from '@/hooks/use-roles';
import { PermissionGuard } from '@/components/PermissionGuard';
import { usePermission } from '@/hooks/use-permission';

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  created_at: string;
}

const AVAILABLE_PERMISSIONS = [
  { category: 'Users', permissions: ['users.view', 'users.create', 'users.update', 'users.delete'] },
  { category: 'Roles', permissions: ['roles.view', 'roles.create', 'roles.update', 'roles.delete'] },
  { category: 'Projects', permissions: ['projects.view', 'projects.create', 'projects.update', 'projects.delete', 'projects.manage_members'] },
  { category: 'Reports', permissions: ['reports.view', 'reports.create', 'reports.update', 'reports.delete'] },
  { category: 'Invoices', permissions: ['invoices.view', 'invoices.create', 'invoices.update', 'invoices.delete'] },
  { category: 'Team', permissions: ['team.view', 'team.manage'] },
  { category: 'Analytics', permissions: ['analytics.view'] },
  { category: 'Settings', permissions: ['settings.view', 'settings.update'] },
];

const SYSTEM_ROLES = ['Admin', 'Editor', 'Viewer'];

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { hasPermission } = usePermission();

  const canViewRoles = hasPermission('roles.view');
  const canCreateRoles = hasPermission('roles.create');
  const canUpdateRoles = hasPermission('roles.update');
  const canDeleteRoles = hasPermission('roles.delete');

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const rolesData = await fetchRoles();
      setRoles(rolesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load roles');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (canViewRoles) {
      loadData();
    }
  }, [loadData, canViewRoles]);

  const handleOpenSheet = (role?: Role) => {
    if (role) {
      setEditingRole(role);
      setFormData({
        name: role.name,
        description: role.description,
        permissions: role.permissions,
      });
    } else {
      setEditingRole(null);
      setFormData({ name: '', description: '', permissions: [] });
    }
    setIsSheetOpen(true);
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev.permissions, permission]
        : prev.permissions.filter(p => p !== permission),
    }));
  };

  const handleSelectAll = (category: string, checked: boolean) => {
    const categoryPerms = AVAILABLE_PERMISSIONS.find(c => c.category === category)?.permissions || [];
    setFormData(prev => {
      if (checked) {
        const newPerms = [...new Set([...prev.permissions, ...categoryPerms])];
        return { ...prev, permissions: newPerms };
      } else {
        return { ...prev, permissions: prev.permissions.filter(p => !categoryPerms.includes(p)) };
      }
    });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (editingRole) {
        await updateRole(editingRole.id, {
          name: formData.name,
          description: formData.description,
          permissions: formData.permissions,
        });
      } else {
        await createRole({
          name: formData.name,
          description: formData.description,
          permissions: formData.permissions,
        });
      }

      await loadData();
      setIsSheetOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save role');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete the "${name}" role?`)) return;
    
    try {
      setIsSubmitting(true);
      setError(null);
      await deleteRole(id);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete role');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!canViewRoles) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Access Denied</h2>
          <p className="text-slate-500 mt-2">You don't have permission to view roles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Roles</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage roles and their permissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-48"
            />
          </div>
          <PermissionGuard permission="roles.create">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button size="sm" onClick={() => handleOpenSheet()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Role
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>{editingRole ? 'Edit Role' : 'Create New Role'}</SheetTitle>
                  <SheetDescription>
                    {editingRole ? 'Update role information and permissions below.' : 'Define a new role and its permissions.'}
                  </SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Role Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Manager"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Manage team and projects"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label>Permissions</Label>
                    {AVAILABLE_PERMISSIONS.map((category) => (
                      <div key={category.category} className="border rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{category.category}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs"
                            onClick={(e) => {
                              const allSelected = category.permissions.every(p => formData.permissions.includes(p));
                              handleSelectAll(category.category, !allSelected);
                            }}
                          >
                            {category.permissions.every(p => formData.permissions.includes(p)) ? 'Deselect All' : 'Select All'}
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {category.permissions.map((permission) => (
                            <div key={permission} className="flex items-center gap-2">
                              <Checkbox
                                id={permission}
                                checked={formData.permissions.includes(permission)}
                                onCheckedChange={(checked) => handlePermissionChange(permission, checked as boolean)}
                              />
                              <Label htmlFor={permission} className="text-sm cursor-pointer">
                                {permission.split('.')[1]}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {error && (
                    <div className="text-red-500 text-sm flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {error}
                    </div>
                  )}
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </SheetClose>
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingRole ? 'Save Changes' : 'Create Role'}
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </PermissionGuard>
        </div>
      </div>

      {error && !isSheetOpen && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-2 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoles.map((role) => (
            <Card key={role.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-violet-500/10">
                      <Shield className="w-5 h-5 text-violet-500" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{role.name}</CardTitle>
                      {role.description && (
                        <CardDescription className="mt-1">{role.description}</CardDescription>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <PermissionGuard permission="roles.update">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => handleOpenSheet(role)}
                        disabled={SYSTEM_ROLES.includes(role.name)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </PermissionGuard>
                    <PermissionGuard permission="roles.delete">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600" 
                        onClick={() => handleDelete(role.id, role.name)}
                        disabled={SYSTEM_ROLES.includes(role.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </PermissionGuard>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Key className="w-4 h-4" />
                    <span>{role.permissions.length} permissions</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.slice(0, 6).map((permission) => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        {permission.split('.')[1]}
                      </Badge>
                    ))}
                    {role.permissions.length > 6 && (
                      <Badge variant="outline" className="text-xs">
                        +{role.permissions.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredRoles.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Shield className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-500">No roles found</p>
        </div>
      )}
    </div>
  );
}