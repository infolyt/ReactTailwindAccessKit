'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { usePermission } from '@/hooks/use-permission';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/components/ThemeProvider';
import { themes } from '@/lib/themes';
import type { Theme } from '@/lib/themes';

// Theme-aware logo component
const ThemeLogo = ({ className = "w-8 h-8" }: { className?: string }) => {
  const { theme } = useTheme();

  const themeToLogo: Record<Theme, string> = {
    slate: '/greylogo.svg',
    blue: '/bluelogo.svg',
    emerald: '/greenlogo.svg',
    rose: '/redlogo.svg',
    amber: '/orangelogo.svg',
    purple: '/purplelogo.svg',
  };

  return (
    <img
      src={themeToLogo[theme]}
      alt="OneReport Logo"
      className={className}
    />
  );
};

// Theme-aware app name component
const ThemeAppName = ({ className = "font-bold text-xl" }: { className?: string }) => {
  const { theme, mode } = useTheme();

  // Get theme color for "One"
  const getOneColor = () => {
    const themeColors: Record<Theme, string> = {
      slate: 'text-slate-600',
      blue: 'text-blue-600',
      emerald: 'text-emerald-600',
      rose: 'text-rose-600',
      amber: 'text-amber-600',
      purple: 'text-purple-600',
    };
    return themeColors[theme];
  };

  // Get color for "Report" based on mode
  const getReportColor = () => {
    return mode === 'dark' ? 'text-white' : 'text-black';
  };

  return (
    <span className={className}>
      <span className={getOneColor()}>One</span>
      <span className={getReportColor()}>Report</span>
    </span>
  );
};
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Home,
  FileText,
  BarChart3,
  Settings,
  Bell,
  Search,
  LogOut,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Moon,
  Sun,
  LayoutDashboard,
  Users,
  Calendar,
  Mail,
  MessageSquare,
  Folder,
  CreditCard,
  PieChart,
  TrendingUp,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Shield,
} from 'lucide-react';

interface NavItem {
  title: string;
  href?: string;
  icon?: React.ElementType;
  badge?: string;
  permission?: string;
  children?: NavItem[];
}

const navSections = (): { title: string; items: NavItem[] }[] => [
  {
    title: 'Home',
    items: [
      { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Apps',
    items: [
      { title: 'Reports', href: '/dashboard/reports', icon: FileText, badge: '12', permission: 'projects.view' },
      { title: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, permission: 'analytics.view' },
      { title: 'Team', href: '/dashboard/team', icon: Users, badge: '5', permission: 'users.view' },
      { title: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
      { title: 'Messages', href: '/dashboard/messages', icon: MessageSquare, badge: '3' },
      { title: 'Projects', href: '/dashboard/projects', icon: Folder, permission: 'projects.view' },
      { title: 'Invoices', href: '/dashboard/invoices', icon: CreditCard, permission: 'invoices.view' },
      { title: 'Roles', href: '/dashboard/roles', icon: Shield, permission: 'roles.view' },
    ],
  },
  {
    title: 'Pages',
    items: [
      { title: 'Profile', href: '/dashboard/profile', icon: User },
      { title: 'Settings', href: '/dashboard/settings', icon: Settings },
    ],
  },
];

const searchResults = {
  recent: [
    { title: 'Q4 Financial Report', type: 'Report', icon: FileText },
    { title: 'Marketing Analysis', type: 'Report', icon: FileText },
  ],
  products: [
    { title: 'MacBook Pro 13"', type: 'Product', icon: Star },
  ],
  members: [
    { title: 'Carry Anna', type: 'Member', icon: User, email: 'anna@company.com', avatar: 'CA' },
    { title: 'John Smith', type: 'Member', icon: User, email: 'smith@company.com', avatar: 'JS' },
  ],
};

const notifications = [
  {
    id: 1,
    user: 'Jessie Samson',
    avatar: 'JS',
    action: 'mentioned you in a comment',
    time: '10m',
    icon: '💬',
  },
  {
    id: 2,
    user: 'Jane Foster',
    avatar: 'JF',
    action: 'created an event',
    time: '20m',
    icon: '📅',
  },
  {
    id: 3,
    user: 'Jessie Samson',
    avatar: 'JS',
    action: 'liked your comment',
    time: '1h',
    icon: '👍',
  },
  {
    id: 4,
    user: 'Kiera Anderson',
    avatar: 'KA',
    action: 'mentioned you in a comment',
    time: '2h',
    icon: '💬',
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();
  const { hasPermission } = usePermission();
  const { theme, mode, setTheme, setMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['Home', 'Apps', 'Pages']);
  const [darkMode, setDarkMode] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    setDarkMode(mode === 'dark');
  }, [mode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setMode(darkMode ? 'light' : 'dark');
  };

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const renderNavItem = (item: NavItem, level = 0) => {
    const isActive = pathname === item.href;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.title}>
        {item.href ? (
          <Link
            href={item.href}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon && <item.icon className="w-5 h-5" />}
              {!sidebarCollapsed && <span>{item.title}</span>}
            </div>
            {!sidebarCollapsed && item.badge && (
              <Badge variant="secondary" className="text-xs">
                {item.badge}
              </Badge>
            )}
          </Link>
        ) : (
          <button
            onClick={() => !sidebarCollapsed && toggleSection(item.title)}
            className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-accent ${
              sidebarCollapsed ? 'pointer-events-none' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon && <item.icon className="w-5 h-5" />}
              {!sidebarCollapsed && <span>{item.title}</span>}
            </div>
            {!sidebarCollapsed && (hasChildren || item.children) && (
              <ChevronRight className={`w-4 h-4 transition-transform ${expandedSections.includes(item.title) ? 'rotate-90' : ''}`} />
            )}
          </button>
        )}
        {hasChildren && expandedSections.includes(item.title) && !sidebarCollapsed && (
          <div className="ml-6 mt-1 space-y-1">
            {item.children!.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-3">
          <ThemeLogo />
          {!sidebarCollapsed && (
            <ThemeAppName />
          )}
        </Link>
        <button onClick={() => setSidebarOpen(false)} className="md:hidden text-muted-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
        {navSections().filter(s => s.items.length > 0).map((section) => (
          <div key={section.title}>
            {!sidebarCollapsed && (
              <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.filter(item => !item.permission || hasPermission(item.permission)).map((item) => renderNavItem(item))}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-border">
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden md:flex items-center justify-center w-full py-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent"
        >
          <ChevronRight className={`w-5 h-5 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-card flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${sidebarCollapsed ? 'md:w-16' : 'md:w-64'}`}
      >
        <SidebarContent />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-accent rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search */}
            <div ref={searchRef} className="relative">
              <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 w-64">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchOpen(true)}
                  className="bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none flex-1"
                />
                <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>

              {/* Search dropdown */}
              {searchOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-popover rounded-lg shadow-lg border border-border overflow-hidden z-50">
                  <div className="p-3 border-b border-border">
                    <p className="text-xs font-medium text-muted-foreground">Recent Searches</p>
                  </div>
                  {searchResults.recent.map((result, i) => (
                    <Link
                      key={i}
                      href="#"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-accent"
                    >
                      <result.icon className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-foreground">{result.title}</p>
                        <p className="text-xs text-muted-foreground">{result.type}</p>
                      </div>
                    </Link>
                  ))}
                  <div className="p-3 border-t border-border">
                    <p className="text-xs font-medium text-muted-foreground">Members</p>
                  </div>
                  {searchResults.members.map((member, i) => (
                    <Link
                      key={i}
                      href="#"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-accent"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-foreground">{member.title}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-accent text-muted-foreground"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Color theme selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-accent text-muted-foreground">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: theme === 'slate' ? '#475569' : theme === 'blue' ? '#2563eb' : theme === 'emerald' ? '#059669' : theme === 'rose' ? '#e11d48' : theme === 'amber' ? '#d97706' : '#9333ea' }}
                  />
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Theme Color</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(Object.keys(themes) as Theme[]).map((t) => (
                  <DropdownMenuItem
                    key={t}
                    onClick={() => setTheme(t)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: t === 'slate' ? '#475569' : t === 'blue' ? '#2563eb' : t === 'emerald' ? '#059669' : t === 'rose' ? '#e11d48' : t === 'amber' ? '#d97706' : '#9333ea' }}
                    />
                    <span>{themes[t].name}</span>
                    {theme === t && <span className="ml-auto">✓</span>}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative p-2 rounded-lg hover:bg-accent text-muted-foreground">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: 'hsl(var(--primary))' }} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  <Button variant="ghost" size="sm" className="text-xs h-auto p-0 text-slate-500">
                    Mark all as read
                  </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notif) => (
                  <DropdownMenuItem key={notif.id} className="flex items-start gap-3 py-3 cursor-pointer">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">{notif.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{notif.user}</span>{' '}
                        <span className="text-muted-foreground">{notif.action}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-center text-sm text-muted-foreground">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Quick links */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground">
                  <LayoutDashboard className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Quick Links</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <FileText className="w-4 h-4 mr-2" />
                  New Report
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="w-4 h-4 mr-2" />
                  Add Team Member
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Event
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-accent">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                      {user?.avatar || user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-rose-600 dark:text-rose-400"
                  onClick={() => {
                    logout();
                    router.push('/login');
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
