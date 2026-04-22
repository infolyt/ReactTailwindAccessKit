# ReactTailwindAccessKit - Agent Instructions

## Available Commands

```bash
npm run dev            # Start dev server (http://localhost:3000)
npm run build          # Production build
npm run start          # Start production server
npm run lint           # ESLint
npm test               # Run all tests (vitest)
npm run test:ui        # Run tests with UI
npm run test -- <file> # Run specific test file
npm run db:create-admin # Create admin user
```

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS with `darkMode: 'class'`
- Vitest for testing

## Project Structure

- `app/` - Next.js pages (page.tsx, layout.tsx, globals.css)
- `components/` - React components (UI primitives in `ui/`, theme components at root)
- `components/ui/` - shadcn/ui components
- `lib/` - Utilities: `cn.ts` (classnames), `themes.ts` (theme config)
- `hooks/` - Custom React hooks
- `scripts/` - Utility scripts

## Path Aliases

`@/` maps to project root (configured in tsconfig.json and vitest.config.ts)

## Theme System

- 6 themes: Slate (default), Blue, Emerald, Rose, Amber, Purple
- Dark mode toggles via `dark` class on `<html>` element (NOT `<body>`)
- Theme/mode persisted in localStorage (`theme`, `mode` keys)
- Components use Tailwind's `dark:` prefix for dark mode styles

## Authentication

- JWT-based authentication
- Default admin: admin@example.com / k3@MnpR1
- Create new admin: `npm run db:create-admin`

## Testing

- Vitest with jsdom environment
- Tests co-located with components (`*.test.tsx`)
- Mocks for localStorage and matchMedia in `vitest.setup.ts`