'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { useTheme } from '@/components/ThemeProvider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import type { Theme } from '@/lib/themes';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { theme, mode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  // Theme-aware logo component
  const ThemeLogo = ({ className = "w-12 h-12" }: { className?: string }) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const success = await login(formData.email, formData.password);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="space-y-1 text-center pb-2">
          <div className="flex flex-col items-center mb-4">
            <ThemeLogo className="w-9 h-9 mb-2" />
            <ThemeAppName />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.remember}
                  onCheckedChange={(checked: boolean) => setFormData({ ...formData, remember: !!checked })}
                />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                  Remember me
                </Label>
              </div>
              <a href="#" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                Forgot password?
              </a>
            </div>
            {error && (
              <div className="text-sm text-red-600 dark:text-red-400 text-center">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full h-11 font-semibold" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="pt-4">
          <div className="w-full text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{' '}
              <a href="/register" className="text-slate-900 hover:text-slate-700 dark:text-slate-100 dark:hover:text-slate-300 font-medium">
                Sign up
              </a>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}