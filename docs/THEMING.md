# Theming Guide

Customizing the theme system in ReactTailwindAccessKit.

## Overview

The theme system supports:
- 6 built-in color themes
- Dark/Light mode
- Persistent preferences
- System preference detection

## Supported Themes

| Theme | Description | Use Case |
|-------|------------|---------|
| Slate | Professional gray-blue | Default, enterprise apps |
| Blue | Cool blue | Tech, SaaS applications |
| Emerald | Fresh green | Nature, health apps |
| Rose | Warm pink | Lifestyle, e-commerce |
| Amber | Bright orange | Finance, alerts |
| Purple | Creative purple | Media, creative tools |

## Changing Themes Programmatically

### Using useTheme Hook

```tsx
import { useTheme } from '@/components/ThemeProvider';

function MyComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme('blue')}>
      Switch to Blue
    </button>
  );
}
```

### Using ThemeSwitcher Component

```tsx
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

function Navbar() {
  return <ThemeSwitcher />;
}
```

## Adding Custom Themes

### Step 1: Add Colors to Tailwind Config

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        yourtheme: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
      },
    },
  },
};
```

### Step 2: Add Theme Entry

Edit `lib/themes.ts`:

```typescript
export type Theme = 'slate' | 'blue' | 'emerald' | 'rose' | 'amber' | 'purple' | 'yourtheme';

export const themes: Record<Theme, { name: string; color: string }> = {
  yourtheme: { name: 'Your Theme', color: 'bg-yourtheme-500' },
};
```

### Step 3: Use in Components

```tsx
<div className="bg-yourtheme-500 text-white">
  Your themed content
</div>
```

## CSS Variables

The theme colors are also available as CSS variables:

```css
:root {
  --color-background: #ffffff;
  --color-foreground: #0f172a;
  /* etc. */
}

.dark {
  --color-background: #0f172a;
  --color-foreground: #f8fafc;
}
```

## Dark Mode

### How It Works

1. ThemeProvider checks system preference on first load
2. Applies `dark` class to `<html>` element
3. Tailwind's `dark:` prefix activates dark styles

### Manual Toggle

```tsx
const { mode, setMode } = useTheme();

// Light mode
setMode('light');

// Dark mode
setMode('dark');

// System preference
setMode('system');
```

## Theme Persistence

Themes are stored in localStorage:

- `theme` - Selected color theme
- `mode` - Light/dark/system

## Customizing Components

### Button Variants

```tsx
<Button variant="default" className="bg-primary">
  Default
</Button>

<Button variant="destructive" className="bg-red-500">
  Destructive
</Button>

<Button variant="outline">
  Outline
</Button>

<Button variant="ghost">
  Ghost
</Button>

<Button variant="link">
  Link
</Button>
```

### Card Shadows

Edit in `tailwind.config.js`:

```javascript
boxShadow: {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
},
```

## Animation

### Transitions

Theme transitions are set in `app/globals.css`:

```css
* {
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}
```

### Tailwind Transitions

```tsx
<div className="transition-colors duration-300">
  Animated content
</div>
```

## Font Customization

### Changing Fonts

1. Import font in `app/layout.tsx`:

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
```

2. Apply to body:

```tsx
<body className={inter.className}>
  {children}
</body>
```

## Gradient Themes

### Background Gradients

```tsx
<div className="bg-gradient-to-r from-blue-500 to-purple-500">
  Gradient background
</div>
```

### Text Gradients

```tsx
<h1 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
  Gradient Text
</h1>
```

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|-------|---------|--------|------|
| CSS Variables | 49+ | 31+ | 9.1+ | 79+ |
| dark mode | 76+ | 67+ | 12.1+ | 79+ |

## Troubleshooting

### Theme Not Applying

1. Check `<html>` has `dark` class in dark mode
2. Verify `tailwind.config.js` has `darkMode: 'class'`
3. Check localStorage values

### Colors Not Changing

1. Verify theme is in localStorage
2. Check Tailwind config theme colors
3. Clear browser cache

### Flash of Wrong Theme

1. ThemeProvider applies theme before render
2. Works correctly in production build

## Examples

### Custom Dashboard Card

```tsx
function DashboardCard({ title, value, color }) {
  return (
    <Card className={`border-l-4 border-${color}-500`}>
      <CardHeader>
        <CardTitle className="text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold text-${color}-600 dark:text-${color}-400`}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
}
```

### Custom Alert

```tsx
<Alert className="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950">
  <AlertCircle className="h-4 w-4 text-amber-600" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>
    Your action could not be completed.
  </AlertDescription>
</Alert>
```

## Further Reading

- [Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors)
- [Tailwind Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [shadcn/ui Themes](https://ui.shadcn.com/docs/theming)