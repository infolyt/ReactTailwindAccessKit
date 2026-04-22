'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Theme, Mode } from '@/lib/themes';

interface ThemeContextType {
  theme: Theme;
  mode: Mode;
  setTheme: (theme: Theme) => void;
  setMode: (mode: Mode) => void;
}

const defaultValue: ThemeContextType = {
  theme: 'slate',
  mode: 'light',
  setTheme: () => {},
  setMode: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultValue);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('slate');
  const [mode, setModeState] = useState<Mode>('light');
  const [isMounted, setIsMounted] = useState(false);

  // Apply theme changes to DOM
  const applyTheme = useCallback((newTheme: Theme, newMode: Mode) => {
    const root = document.documentElement;

    // Set attributes for multi-theme support
    root.setAttribute('data-theme', newTheme);
    root.setAttribute('data-mode', newMode);

    // Apply dark class for Tailwind dark mode and shadcn compatibility
    if (newMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Update color-scheme for native browser elements
    root.style.colorScheme = newMode;

    // Update favicon based on theme
    const updateFavicon = () => {
      const themeToLogo: Record<Theme, string> = {
        slate: '/greylogo.svg',
        blue: '/bluelogo.svg',
        emerald: '/greenlogo.svg',
        rose: '/redlogo.svg',
        amber: '/orangelogo.svg',
        purple: '/purplelogo.svg',
      };

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        // Create or update favicon link
        let faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
        if (!faviconLink) {
          faviconLink = document.createElement('link');
          faviconLink.rel = 'icon';
          faviconLink.type = 'image/svg+xml';
          document.head.appendChild(faviconLink);
        }
        faviconLink.href = themeToLogo[newTheme];

        // Create or update apple touch icon
        let appleIconLink = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;
        if (!appleIconLink) {
          appleIconLink = document.createElement('link');
          appleIconLink.rel = 'apple-touch-icon';
          document.head.appendChild(appleIconLink);
        }
        appleIconLink.href = themeToLogo[newTheme];
      });
    };

    // Update favicon immediately if window is available
    if (typeof window !== 'undefined') {
      updateFavicon();
    }

    // Set ALL CSS custom properties directly for theme colors
    const themeColors: Record<Theme, Record<string, string>> = {
      slate: {
        '--primary': '222.2 47.4% 11.2%',
        '--primary-foreground': '210 40% 98%',
        '--ring': '215 20.2% 65.1%',
        '--secondary': '210 40% 96.1%',
        '--secondary-foreground': '222.2 47.4% 11.2%',
        '--accent': '210 40% 96.1%',
        '--accent-foreground': '222.2 47.4% 11.2%',
      },
      blue: {
        '--primary': '217 91% 60%',
        '--primary-foreground': '210 40% 98%',
        '--ring': '217 91% 60%',
        '--secondary': '217 91% 60%',
        '--secondary-foreground': '210 40% 98%',
        '--accent': '217 91% 60%',
        '--accent-foreground': '210 40% 98%',
      },
      emerald: {
        '--primary': '142 71% 45%',
        '--primary-foreground': '210 40% 98%',
        '--ring': '142 71% 45%',
        '--secondary': '142 71% 45%',
        '--secondary-foreground': '210 40% 98%',
        '--accent': '142 71% 45%',
        '--accent-foreground': '210 40% 98%',
      },
      rose: {
        '--primary': '346 84% 61%',
        '--primary-foreground': '210 40% 98%',
        '--ring': '346 84% 61%',
        '--secondary': '346 84% 61%',
        '--secondary-foreground': '210 40% 98%',
        '--accent': '346 84% 61%',
        '--accent-foreground': '210 40% 98%',
      },
      amber: {
        '--primary': '38 92% 50%',
        '--primary-foreground': '210 40% 98%',
        '--ring': '38 92% 50%',
        '--secondary': '38 92% 50%',
        '--secondary-foreground': '210 40% 98%',
        '--accent': '38 92% 50%',
        '--accent-foreground': '210 40% 98%',
      },
      purple: {
        '--primary': '271 76% 53%',
        '--primary-foreground': '210 40% 98%',
        '--ring': '271 76% 53%',
        '--secondary': '271 76% 53%',
        '--secondary-foreground': '210 40% 98%',
        '--accent': '271 76% 53%',
        '--accent-foreground': '210 40% 98%',
      },
    };

    const colors = themeColors[newTheme];
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, []);

  // Initialize favicon on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme | null || 'slate';
      const themeToLogo: Record<Theme, string> = {
        slate: '/greylogo.svg',
        blue: '/bluelogo.svg',
        emerald: '/greenlogo.svg',
        rose: '/redlogo.svg',
        amber: '/orangelogo.svg',
        purple: '/purplelogo.svg',
      };

      // Create or update favicon link immediately
      let faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (!faviconLink) {
        faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        faviconLink.type = 'image/svg+xml';
        document.head.appendChild(faviconLink);
      }
      faviconLink.href = themeToLogo[savedTheme as Theme];

      // Create or update apple touch icon
      let appleIconLink = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;
      if (!appleIconLink) {
        appleIconLink = document.createElement('link');
        appleIconLink.rel = 'apple-touch-icon';
        document.head.appendChild(appleIconLink);
      }
      appleIconLink.href = themeToLogo[savedTheme as Theme];
    }
  }, []);

  // Load saved preferences from localStorage and system
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const savedMode = localStorage.getItem('mode') as Mode | null;

    let initialTheme: Theme = savedTheme || 'slate';
    let initialMode: Mode = savedMode || 'light';

    // If no saved mode, check system preference
    if (!savedMode && typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      initialMode = prefersDark ? 'dark' : 'light';
    }

    setThemeState(initialTheme);
    setModeState(initialMode);
    applyTheme(initialTheme, initialMode);
    setIsMounted(true);
  }, [applyTheme]);

  // Save to localStorage when theme or mode changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('theme', theme);
      localStorage.setItem('mode', mode);
      applyTheme(theme, mode);
    }
  }, [theme, mode, isMounted, applyTheme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const setMode = useCallback((newMode: Mode) => {
    setModeState(newMode);
  }, []);

  const value: ThemeContextType = {
    theme,
    mode,
    setTheme,
    setMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

