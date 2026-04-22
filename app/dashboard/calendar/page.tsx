'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  User,
  MoreHorizontal,
} from 'lucide-react';

const events = [
  { id: 1, title: 'Team Meeting', time: '9:00 AM', date: 15, type: 'meeting', color: 'violet' },
  { id: 2, title: 'Report Review', time: '11:00 AM', date: 15, type: 'review', color: 'blue' },
  { id: 3, title: 'Client Call', time: '2:00 PM', date: 17, type: 'call', color: 'amber' },
  { id: 4, title: 'Project Deadline', time: '5:00 PM', date: 18, type: 'deadline', color: 'rose' },
  { id: 5, title: 'Sprint Planning', time: '10:00 AM', date: 20, type: 'meeting', color: 'violet' },
  { id: 6, title: 'Q4 Review', time: '3:00 PM', date: 22, type: 'review', color: 'blue' },
];

const colorMap: Record<string, string> = {
  violet: 'bg-violet-500',
  blue: 'bg-blue-500',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500',
  emerald: 'bg-emerald-500',
};

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const today = new Date();
  const isToday = (day: number) => {
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const getEventsForDay = (day: number) => {
    return events.filter(e => e.date === day);
  };

  const renderCalendarDays = () => {
    const daysArray = [];
    
    // Empty cells for days before first of month
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(
        <div key={`empty-${i}`} className="h-24 p-2 border border-slate-100 dark:border-slate-800" />
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      daysArray.push(
        <div
          key={day}
          onClick={() => setSelectedDate(day)}
          className={`h-24 p-2 border border-border cursor-pointer hover:bg-muted/50 transition-colors ${
            selectedDate === day ? 'bg-primary/10' : ''
          }`}
        >
          <div className={`text-sm font-medium mb-1 ${
            isToday(day)
              ? 'w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center'
              : 'text-foreground'
          }`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className={`text-xs px-1.5 py-0.5 rounded text-white truncate ${colorMap[event.color]}`}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-slate-500">+{dayEvents.length - 3} more</div>
            )}
          </div>
        </div>
      );
    }

    return daysArray;
  };

  const upcomingEvents = events
    .filter(e => e.date >= today.getDate() || (month > today.getMonth()))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Calendar</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Schedule and manage your events
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Today
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <CardTitle className="text-xl">
                {months[month]} {year}
              </CardTitle>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Input type="search" placeholder="Search events..." className="w-48" />
            </div>
          </CardHeader>
          <CardContent>
            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {days.map((day) => (
                <div key={day} className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7">
              {renderCalendarDays()}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming events */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Your scheduled events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <div className={`w-1 h-full min-h-[40px] rounded-full ${colorMap[event.color]}`} />
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 dark:text-white">{event.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                      <span className="text-xs text-slate-500">
                        {months[month]} {event.date}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Event types legend */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Event Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { type: 'Meeting', color: 'violet' },
                { type: 'Review', color: 'blue' },
                { type: 'Call', color: 'amber' },
                { type: 'Deadline', color: 'rose' },
              ].map((item) => (
                <div key={item.type} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${colorMap[item.color]}`} />
                  <span className="text-sm text-slate-600 dark:text-slate-400">{item.type}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}