'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  FileText,
  Search,
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

const reports = [
  { id: 1, title: 'Q4 Financial Report', category: 'Finance', status: 'completed', author: 'Sarah Chen', date: '2024-01-15', priority: 'high' },
  { id: 2, title: 'Marketing Campaign Analysis', category: 'Marketing', status: 'pending', author: 'Mike Ross', date: '2024-01-14', priority: 'medium' },
  { id: 3, title: 'Sales Pipeline Report', category: 'Sales', status: 'in-progress', author: 'Jessica Pearson', date: '2024-01-14', priority: 'high' },
  { id: 4, title: 'Customer Satisfaction Survey', category: 'Support', status: 'completed', author: 'Harvey Specter', date: '2024-01-13', priority: 'low' },
  { id: 5, title: 'Product Launch Metrics', category: 'Product', status: 'pending', author: 'Louis Litt', date: '2024-01-13', priority: 'medium' },
  { id: 6, title: 'Monthly Revenue Analysis', category: 'Finance', status: 'completed', author: 'Donna Paulsen', date: '2024-01-12', priority: 'high' },
  { id: 7, title: 'User Engagement Report', category: 'Analytics', status: 'in-progress', author: 'Rachel Zane', date: '2024-01-12', priority: 'low' },
  { id: 8, title: 'Competitor Analysis', category: 'Marketing', status: 'completed', author: 'Harvey Specter', date: '2024-01-11', priority: 'medium' },
];

const statusColors: Record<string, string> = {
  completed: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  'in-progress': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
};

const priorityColors: Record<string, string> = {
  high: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  low: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
};

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reports</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage and track all your reports
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Reports</CardTitle>
            <div className="p-2 rounded-lg bg-violet-500/10">
              <FileText className="w-5 h-5 text-violet-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">1,284</div>
            <p className="text-xs text-slate-500 mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Completed</CardTitle>
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">770</div>
            <p className="text-xs text-slate-500 mt-1">60% completion rate</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">In Progress</CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">257</div>
            <p className="text-xs text-slate-500 mt-1">20% of total</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Pending</CardTitle>
            <div className="p-2 rounded-lg bg-amber-500/10">
              <AlertCircle className="w-5 h-5 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">257</div>
            <p className="text-xs text-slate-500 mt-1">20% of total</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search reports..." className="pl-10" />
        </div>
      </div>

      {/* Reports table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-slate-500 font-medium">Report</TableHead>
                <TableHead className="text-slate-500 font-medium">Category</TableHead>
                <TableHead className="text-slate-500 font-medium">Status</TableHead>
                <TableHead className="text-slate-500 font-medium">Priority</TableHead>
                <TableHead className="text-slate-500 font-medium">Author</TableHead>
                <TableHead className="text-slate-500 font-medium">Date</TableHead>
                <TableHead className="text-slate-500 font-medium"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <TableCell className="font-medium text-slate-900 dark:text-white">
                    {report.title}
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400">{report.category}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[report.status]} variant="outline">
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={priorityColors[report.priority]} variant="outline">
                      {report.priority.charAt(0).toUpperCase() + report.priority.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400">{report.author}</TableCell>
                  <TableCell className="text-slate-500 dark:text-slate-400">{report.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-rose-500 hover:text-rose-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}