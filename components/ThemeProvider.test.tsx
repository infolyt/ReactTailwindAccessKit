import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { ThemeProvider, useTheme } from './ThemeProvider';

/**
 * Simple ThemeProvider Test
 * Tests the core functionality of theme switching
 */

function TestComponent() {
  const { theme, mode, setTheme, setMode } = useTheme();
  return (
    <div>
      <div data-testid="theme">{theme}</div>
      <div data-testid="mode">{mode}</div>
      <button onClick={() => setTheme('blue')} data-testid="btn-blue">
        Blue
      </button>
      <button onClick={() => setMode('dark')} data-testid="btn-dark">
        Dark
      </button>
      <button onClick={() => setMode('light')} data-testid="btn-light">
        Light
      </button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('data-mode');
    // Clear localStorage properly for jsdom
    try {
      for (const key of Object.keys(localStorage)) {
        localStorage.removeItem(key);
      }
    } catch (e) {
      // Ignore
    }
  });

  it('should render children', () => {
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should provide initial values', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('slate');
    expect(screen.getByTestId('mode')).toHaveTextContent('light');
  });

  it('should update theme on click', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('btn-blue'));

    await waitFor(
      () => {
        expect(screen.getByTestId('theme')).toHaveTextContent('blue');
      },
      { timeout: 2000 }
    );
  });

  it('should update mode on click', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('btn-dark'));

    await waitFor(
      () => {
        expect(screen.getByTestId('mode')).toHaveTextContent('dark');
      },
      { timeout: 2000 }
    );
  });

  it('should add dark class when mode is dark', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('btn-dark'));

    await waitFor(
      () => {
        expect(document.documentElement.classList.contains('dark')).toBe(true);
      },
      { timeout: 2000 }
    );
  });

  it('should remove dark class when mode is light', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Set to dark
    fireEvent.click(screen.getByTestId('btn-dark'));
    await waitFor(
      () => {
        expect(document.documentElement.classList.contains('dark')).toBe(true);
      },
      { timeout: 2000 }
    );

    // Set to light
    fireEvent.click(screen.getByTestId('btn-light'));
    await waitFor(
      () => {
        expect(document.documentElement.classList.contains('dark')).toBe(false);
      },
      { timeout: 2000 }
    );
  });

  it('should set data-theme attribute', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('btn-blue'));

    await waitFor(
      () => {
        expect(document.documentElement.getAttribute('data-theme')).toBe('blue');
      },
      { timeout: 2000 }
    );
  });

  it('should set data-mode attribute', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('btn-dark'));

    await waitFor(
      () => {
        expect(document.documentElement.getAttribute('data-mode')).toBe('dark');
      },
      { timeout: 2000 }
    );
  });
});
