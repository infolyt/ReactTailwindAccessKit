'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Folder,
  Plus,
  Search,
  MoreHorizontal,
  Calendar,
  Users,
  CheckCircle,
  Clock,
} from 'lucide-react';

const projects = [
  { id: 1, name: 'Website Redesign', client: 'Acme Corp', status: 'in-progress', progress: 65, dueDate: '2024-02-15', team: ['SC', 'MR', 'JP'] },
  { id: 2, name: 'Mobile App Development', client: 'TechStart', status: 'in-progress', progress: 40, dueDate: '2024-03-01', team: ['HS', 'LL'] },
  { id: 3, name: 'Brand Identity', client: 'FreshFoods', status: 'completed', progress: 100, dueDate: '2024-01-20', team: ['DP', 'RZ'] },
  { id: 4, name: 'E-commerce Platform', client: 'ShopNow', status: 'in-progress', progress: 80, dueDate: '2024-02-28', team: ['SC', 'MR'] },
  { id: 5, name: 'Marketing Campaign', client: 'GreenEnergy', status: 'pending', progress: 0, dueDate: '2024-03-15', team: ['JP'] },
  { id: 6, name: 'Data Analytics Dashboard', client: 'FinCorp', status: 'in-progress', progress: 55, dueDate: '2024-02-10', team: ['HS', 'LL', 'DP'] },
];

const statusColors: Record<string, string> = {
  completed: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  'in-progress': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
};

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Projects</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage your ongoing projects
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/50">
                  <Folder className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <CardTitle className="text-base">{project.name}</CardTitle>
                  <CardDescription className="text-xs">{project.client}</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={statusColors[project.status]} variant="outline">
                    {project.status === 'in-progress' ? 'In Progress' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {project.dueDate}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">Progress</span>
                    <span className="text-xs font-medium text-slate-900 dark:text-white">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-500 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, i) => (
                      <Avatar key={i} className="h-7 w-7 border-2 border-white dark:border-slate-800">
                        <AvatarFallback className="bg-slate-600 text-white text-xs">{member}</AvatarFallback>
                      </Avatar>
                    ))}
                    {project.team.length > 3 && (
                      <div className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center">
                        <span className="text-xs text-slate-600 dark:text-slate-300">+{project.team.length - 3}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {project.team.length} members
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}