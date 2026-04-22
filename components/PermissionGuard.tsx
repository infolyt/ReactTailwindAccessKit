'use client';

import { ReactNode } from 'react';
import { usePermission } from '@/hooks/use-permission';

interface PermissionGuardProps {
  children: ReactNode;
  permission: string;
  requireAll?: boolean;
  permissions?: string[];
  fallback?: ReactNode;
}

export function PermissionGuard({ 
  children, 
  permission, 
  requireAll = false,
  permissions,
  fallback = null 
}: PermissionGuardProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission();
  
  let hasAccess = false;
  
  if (permission) {
    hasAccess = hasPermission(permission);
  } else if (permissions) {
    hasAccess = requireAll 
      ? hasAllPermissions(permissions) 
      : hasAnyPermission(permissions);
  }
  
  if (!hasAccess) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
}