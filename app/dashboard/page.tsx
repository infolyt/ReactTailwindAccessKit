'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  Clock,
  CheckCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Calendar,
  MessageSquare,
  Star,
  MoreHorizontal,
  Plus,
  Filter,
  Download,
} from 'lucide-react';

const stats = [
  {
    title: 'Total Reports',
    value: '1,284',
    change: '+12%',
    trend: 'up',
    icon: FileText,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    title: 'Pending Review',
    value: '48',
    change: '-8%',
    trend: 'down',
    icon: Clock,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    title: 'Completed Today',
    value: '127',
    change: '+24%',
    trend: 'up',
    icon: CheckCircle,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    title: 'Avg. Response Time',
    value: '2.4h',
    change: '-15%',
    trend: 'down',
    icon: TrendingUp,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
];

const recentActivity = [
  { id: 1, title: 'Q4 Financial Report', status: 'completed', user: 'Sarah Chen', time: '2 min ago', avatar: 'SC' },
  { id: 2, title: 'Marketing Campaign Analysis', status: 'pending', user: 'Mike Ross', time: '15 min ago', avatar: 'MR' },
  { id: 3, title: 'Sales Pipeline Report', status: 'in-progress', user: 'Jessica Pearson', time: '1 hour ago', avatar: 'JP' },
  { id: 4, title: 'Customer Satisfaction Survey', status: 'completed', user: 'Harvey Specter', time: '2 hours ago', avatar: 'HS' },
  { id: 5, title: 'Product Launch Metrics', status: 'pending', user: 'Louis Litt', time: '3 hours ago', avatar: 'LL' },
];

const statusColors: Record<string, string> = {
  completed: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  'in-progress': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
};

const chartData = [
  { month: 'Jan', value: 65 },
  { month: 'Feb', value: 45 },
  { month: 'Mar', value: 80 },
  { month: 'Apr', value: 55 },
  { month: 'May', value: 90 },
  { month: 'Jun', value: 70 },
  { month: 'Jul', value: 85 },
];

const topMembers = [
  { name: 'Sarah Chen', avatar: 'SC', reports: 45, completed: 42 },
  { name: 'Mike Ross', avatar: 'MR', reports: 38, completed: 35 },
  { name: 'Jessica Pearson', avatar: 'JP', reports: 32, completed: 30 },
  { name: 'Harvey Specter', avatar: 'HS', reports: 28, completed: 27 },
];

export default function DashboardPage() {
  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Welcome back! Here&apos;s what&apos;s happening today.
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

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-rose-500" />
                )}
                <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports chart */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Reports Overview</CardTitle>
              <CardDescription>Monthly report submissions</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-around gap-2">
              {chartData.map((data, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-violet-600 to-violet-400 rounded-t-md transition-all hover:from-violet-500 hover:to-violet-300"
                    style={{ height: `${(data.value / maxValue) * 100}%` }}
                  />
                  <span className="text-xs text-slate-500 dark:text-slate-400">{data.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top members */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Contributors</CardTitle>
              <CardDescription>This month</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {topMembers.map((member, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">{member.avatar}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.completed}/{member.reports} reports</p>
                </div>
                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(member.completed / member.reports) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Status breakdown */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>Current report statuses</CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Donut chart */}
            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground">1,284</div>
                    <div className="text-sm text-muted-foreground">Total</div>
                  </div>
                </div>
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="12"
                    strokeDasharray="125.6 125.6" strokeDashoffset="0" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="12"
                    strokeDasharray="62.8 188.4" strokeDashoffset="-125.6" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="12"
                    strokeDasharray="62.8 251.2" strokeDashoffset="-188.4" />
                </svg>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-emerald-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Completed</p>
                  <p className="text-xs text-muted-foreground">770 reports (60%)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-amber-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Pending</p>
                  <p className="text-xs text-muted-foreground">257 reports (20%)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">In Progress</p>
                  <p className="text-xs text-muted-foreground">257 reports (20%)</p>
                </div>
              </div>
            </div>

            {/* Summary stats */}
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Avg/day</p>
                    <p className="text-lg font-semibold text-foreground">42</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Completion rate</p>
                    <p className="text-lg font-semibold text-foreground">92%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent activity */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest report submissions and updates</CardDescription>
            </div>
            <Badge variant="outline" className="text-muted-foreground cursor-pointer">View all</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium">Report</TableHead>
                <TableHead className="text-muted-foreground font-medium">Status</TableHead>
                <TableHead className="text-muted-foreground font-medium">User</TableHead>
                <TableHead className="text-muted-foreground font-medium">Time</TableHead>
                <TableHead className="text-muted-foreground font-medium"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium text-foreground">
                    {item.title}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[item.status]} variant="outline">
                      {item.status === 'in-progress' ? 'In Progress' : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.user}</TableCell>
                  <TableCell className="text-muted-foreground">{item.time}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
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