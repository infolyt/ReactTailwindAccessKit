'use client';

import { Badge } from '@/components/ui/badge';

interface RoleBadgeProps {
  role: string;
}

const roleColors: Record<string, string> = {
  Admin: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
  Editor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  Viewer: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
};

export function RoleBadge({ role }: RoleBadgeProps) {
  const colorClass = roleColors[role] || 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
  
  return (
    <Badge className={colorClass} variant="outline">
      {role}
    </Badge>
  );
}