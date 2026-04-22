'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from 'lucide-react';

const overviewStats = [
  { title: 'Total Views', value: '24.5K', change: '+12.5%', trend: 'up', icon: BarChart3, color: 'violet' },
  { title: 'Unique Visitors', value: '8.2K', change: '+8.2%', trend: 'up', icon: Users, color: 'blue' },
  { title: 'Avg. Time', value: '4m 32s', change: '-2.1%', trend: 'down', icon: Clock, color: 'amber' },
  { title: 'Bounce Rate', value: '42.3%', change: '-5.4%', trend: 'up', icon: TrendingDown, color: 'emerald' },
];

const trafficData = [
  { source: 'Direct', visitors: 8450, percentage: 34 },
  { source: 'Organic Search', visitors: 6230, percentage: 25 },
  { source: 'Referral', visitors: 4120, percentage: 17 },
  { source: 'Social', visitors: 3890, percentage: 16 },
  { source: 'Email', visitors: 2010, percentage: 8 },
];

const topPages = [
  { page: '/dashboard', views: 4523, change: '+12%' },
  { page: '/reports', views: 3241, change: '+8%' },
  { page: '/analytics', views: 2890, change: '+15%' },
  { page: '/settings', views: 1892, change: '+3%' },
  { page: '/team', views: 1567, change: '+22%' },
];

const weeklyData = [
  { day: 'Mon', value: 45 },
  { day: 'Tue', value: 62 },
  { day: 'Wed', value: 55 },
  { day: 'Thu', value: 78 },
  { day: 'Fri', value: 65 },
  { day: 'Sat', value: 42 },
  { day: 'Sun', value: 38 },
];

const colorMap: Record<string, string> = {
  violet: 'bg-violet-500',
  blue: 'bg-blue-500',
  amber: 'bg-amber-500',
  emerald: 'bg-emerald-500',
};

const colorTextMap: Record<string, string> = {
  violet: 'text-violet-500',
  blue: 'text-blue-500',
  amber: 'text-amber-500',
  emerald: 'text-emerald-500',
};

export default function AnalyticsPage() {
  const maxValue = Math.max(...weeklyData.map(d => d.value));

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track your performance and insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Last 7 days</Button>
          <Button size="sm">Download Report</Button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-${stat.color}-500/10`}>
                <stat.icon className={`w-5 h-5 ${colorTextMap[stat.color]}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className={`w-4 h-4 ${stat.color === 'emerald' ? 'text-emerald-500' : 'text-emerald-500'}`} />
                ) : (
                  <ArrowDownRight className={`w-4 h-4 ${stat.color === 'emerald' ? 'text-rose-500' : 'text-rose-500'}`} />
                )}
                <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground">from last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly visitors chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Weekly Visitors</CardTitle>
              <CardDescription>Visitor trends over the week</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-around gap-2">
              {weeklyData.map((data, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-violet-600 to-violet-400 rounded-t-md transition-all hover:from-violet-500 hover:to-violet-300"
                    style={{ height: `${(data.value / maxValue) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{data.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic sources */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors come from</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {trafficData.map((source, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-24 text-sm text-muted-foreground">{source.source}</div>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-500 rounded-full"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
                <div className="w-16 text-right">
                  <span className="text-sm font-medium text-foreground">{source.visitors.toLocaleString()}</span>
                </div>
                <div className="w-12 text-right">
                  <span className="text-xs text-muted-foreground">{source.percentage}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Top pages */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most visited pages in your application</CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPages.map((page, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground">#{i + 1}</span>
                  <span className="text-sm font-medium text-foreground">{page.page}</span>
                  <span className="text-sm text-muted-foreground">{page.views.toLocaleString()} views</span>
                  <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/10">
                    {page.change}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}