'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';

export function DemoComponents() {
  const { theme } = useTheme();

  const getThemeColor = (theme: string) => {
    const colorMap: Record<string, { primary: string; light: string; border: string; focusRing: string }> = {
      slate: { primary: 'from-slate-600 to-slate-700', light: 'bg-slate-50 dark:bg-slate-900', border: 'border-slate-200 dark:border-slate-700', focusRing: 'focus:ring-slate-500' },
      blue: { primary: 'from-blue-600 to-blue-700', light: 'bg-blue-50 dark:bg-blue-950', border: 'border-blue-200 dark:border-blue-800', focusRing: 'focus:ring-blue-500' },
      emerald: { primary: 'from-emerald-600 to-emerald-700', light: 'bg-emerald-50 dark:bg-emerald-950', border: 'border-emerald-200 dark:border-emerald-800', focusRing: 'focus:ring-emerald-500' },
      rose: { primary: 'from-rose-600 to-rose-700', light: 'bg-rose-50 dark:bg-rose-950', border: 'border-rose-200 dark:border-rose-800', focusRing: 'focus:ring-rose-500' },
      amber: { primary: 'from-amber-600 to-amber-700', light: 'bg-amber-50 dark:bg-amber-950', border: 'border-amber-200 dark:border-amber-800', focusRing: 'focus:ring-amber-500' },
      purple: { primary: 'from-purple-600 to-purple-700', light: 'bg-purple-50 dark:bg-purple-950', border: 'border-purple-200 dark:border-purple-800', focusRing: 'focus:ring-purple-500' },
    };
    return colorMap[theme] || colorMap.slate;
  };

  const colors = getThemeColor(theme);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className={`bg-gradient-to-br ${colors.primary} text-white rounded-2xl p-16 shadow-2xl relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-6 leading-tight">Beautiful Component Library</h1>
          <p className="text-xl opacity-95 mb-8 max-w-2xl leading-relaxed">
            Create stunning interfaces with our carefully crafted shadcn/ui components. Built with accessibility, performance, and beautiful design at its core.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Buttons Section */}
      <section id="components">
        <h2 className="text-3xl font-bold mb-2">Buttons</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Versatile button styles for every use case.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className={`bg-gradient-to-br ${colors.primary} text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all`}>
            Primary
          </button>
          <button className={`border-2 border-slate-300 dark:border-slate-600 px-6 py-3 rounded-lg font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all`}>
            Secondary
          </button>
          <button className={`${colors.light} px-6 py-3 rounded-lg font-semibold text-slate-900 dark:text-white hover:shadow-md transition-all`}>
            Outline
          </button>
          <button className="px-6 py-3 rounded-lg font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            Ghost
          </button>
        </div>
      </section>

      {/* Cards Section */}
      <section>
        <h2 className="text-3xl font-bold mb-2">Features</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Explore the powerful features built into our component library.</p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className={`${colors.light} border ${colors.border} rounded-xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
            <div className={`w-14 h-14 bg-gradient-to-br ${colors.primary} rounded-lg mb-6 flex items-center justify-center text-2xl shadow-lg`}>
              ⚡
            </div>
            <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Optimized for performance with minimal bundle size and maximum rendering efficiency.
            </p>
          </div>
          <div className={`${colors.light} border ${colors.border} rounded-xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
            <div className={`w-14 h-14 bg-gradient-to-br ${colors.primary} rounded-lg mb-6 flex items-center justify-center text-2xl shadow-lg`}>
              🎨
            </div>
            <h3 className="text-xl font-semibold mb-3">Customizable</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Fully themeable components with multiple color schemes and dark mode support built-in.
            </p>
          </div>
          <div className={`${colors.light} border ${colors.border} rounded-xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
            <div className={`w-14 h-14 bg-gradient-to-br ${colors.primary} rounded-lg mb-6 flex items-center justify-center text-2xl shadow-lg`}>
              ♿
            </div>
            <h3 className="text-xl font-semibold mb-3">Accessible</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Built with accessibility in mind following WAI-ARIA standards and best practices.
            </p>
          </div>
        </div>
      </section>

      {/* Form Elements Section */}
      <section>
        <h2 className="text-3xl font-bold mb-2">Form Elements</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Beautiful and functional form components.</p>
        <div className="max-w-md space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-900 dark:text-white">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className={`w-full px-4 py-3 border ${colors.border} rounded-lg focus:outline-none focus:ring-2 ${colors.focusRing} focus:ring-offset-2 dark:focus:ring-offset-slate-950 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all`}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-900 dark:text-white">
              Message
            </label>
            <textarea
              placeholder="Tell us what you think..."
              className={`w-full px-4 py-3 border ${colors.border} rounded-lg focus:outline-none focus:ring-2 ${colors.focusRing} focus:ring-offset-2 dark:focus:ring-offset-slate-950 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all`}
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-900 dark:text-white">
              Category
            </label>
            <select className={`w-full px-4 py-3 border ${colors.border} rounded-lg focus:outline-none focus:ring-2 ${colors.focusRing} focus:ring-offset-2 dark:focus:ring-offset-slate-950 bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-all`}>
              <option>Select a category</option>
              <option>General Inquiry</option>
              <option>Support Request</option>
              <option>Bug Report</option>
              <option>Feature Request</option>
            </select>
          </div>
        </div>
      </section>

      {/* Badge Section */}
      <section>
        <h2 className="text-3xl font-bold mb-2">Badges & Labels</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Highlight important information with badges.</p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'New', icon: '✨' },
            { label: 'Featured', icon: '⭐' },
            { label: 'Popular', icon: '🔥' },
            { label: 'Beta', icon: '🧪' },
            { label: 'Coming Soon', icon: '🚀' }
          ].map((badge) => (
            <span
              key={badge.label}
              className={`bg-gradient-to-r ${colors.primary} text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all`}
            >
              <span>{badge.icon}</span>
              {badge.label}
            </span>
          ))}
        </div>
      </section>

      {/* Alert Section */}
      <section>
        <h2 className="text-3xl font-bold mb-2">Alerts</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Important messages and notifications.</p>
        <div className="space-y-4 max-w-2xl">
          <div className={`${colors.light} border-l-4 border-blue-500 rounded-lg p-6`}>
            <h3 className="font-semibold mb-2 text-slate-900 dark:text-white flex items-center gap-2">
              <span>ℹ️</span> Information
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              This is an informational message. Use it to share helpful context with users.
            </p>
          </div>
          <div className={`bg-green-50 dark:bg-green-950 border-l-4 border-green-500 rounded-lg p-6`}>
            <h3 className="font-semibold mb-2 text-slate-900 dark:text-white flex items-center gap-2">
              <span>✅</span> Success
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Operation completed successfully!
            </p>
          </div>
          <div className={`bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-500 rounded-lg p-6`}>
            <h3 className="font-semibold mb-2 text-slate-900 dark:text-white flex items-center gap-2">
              <span>⚠️</span> Warning
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Please review this important warning before proceeding.
            </p>
          </div>
        </div>
      </section>

      {/* Spacing Section */}
      <section>
        <h2 className="text-3xl font-bold mb-2">Gradient Showcase</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Beautiful gradients for your design.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {['slate', 'blue', 'emerald', 'rose', 'amber', 'purple'].map((t) => {
            const themeColors = getThemeColor(t);
            return (
              <div key={t} className={`bg-gradient-to-br ${themeColors.primary} h-32 rounded-xl shadow-lg flex items-center justify-center text-white font-semibold text-lg capitalize`}>
                {t}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
