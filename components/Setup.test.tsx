import { describe, it, expect } from 'vitest';

/**
 * Basic Setup Verification
 * Tests that the test environment is properly configured
 */
describe('Test Environment', () => {
  it('runs a simple test', () => {
    expect(true).toBe(true);
  });

  it('does basic math', () => {
    expect(1 + 1).toBe(2);
  });

  it('has access to document', () => {
    expect(document).toBeDefined();
  });

  it('has access to window', () => {
    expect(window).toBeDefined();
  });

  it('has documentElement', () => {
    expect(document.documentElement).toBeDefined();
  });

  it('can manipulate DOM classes', () => {
    document.documentElement.classList.add('test-class');
    expect(document.documentElement.classList.contains('test-class')).toBe(true);
    document.documentElement.classList.remove('test-class');
  });

  it('localStorage works', () => {
    localStorage.setItem('key', 'value');
    expect(localStorage.getItem('key')).toBe('value');
    localStorage.removeItem('key');
    expect(localStorage.getItem('key')).toBeNull();
  });
});

