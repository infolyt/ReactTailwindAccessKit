'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Settings } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { themes } from '@/lib/themes';
import type { Theme } from '@/lib/themes';

export function ThemeSwitcher() {
  const { theme, mode, setTheme, setMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const handleModeChange = (newMode: 'light' | 'dark') => {
    setMode(newMode);
  };

  return (
    <div className="fixed top-4 right-4 z-50" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-md"
        title="Theme settings"
      >
        <Settings className="w-5 h-5 text-slate-600 dark:text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 space-y-4">
          {/* Mode Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Mode
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => handleModeChange('light')}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  mode === 'light'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span className="text-sm font-medium">Light</span>
              </button>
              <button
                onClick={() => handleModeChange('dark')}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  mode === 'dark'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span className="text-sm font-medium">Dark</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-200 dark:bg-slate-700" />

          {/* Theme Colors */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Theme
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(Object.keys(themes) as Theme[]).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    handleThemeChange(t);
                    setIsOpen(false);
                  }}
                  className={`relative w-full aspect-square rounded-lg transition-all duration-200 ${themes[t].color} ${
                    theme === t
                      ? 'ring-2 ring-offset-2 ring-slate-900 dark:ring-offset-slate-900'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  title={themes[t].name}
                >
                  {theme === t && (
                    <span className="absolute inset-0 flex items-center justify-center text-white font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
