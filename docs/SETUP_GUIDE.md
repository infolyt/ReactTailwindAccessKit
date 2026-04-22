# Setup Guide

Complete setup instructions for ReactTailwindAccessKit.

## Prerequisites

- Node.js 18 or higher
- npm or pnpm package manager
- Git (for version control)

## Quick Start

### 1. Clone and Install

```bash
# Navigate to project directory
cd ReactTailwindAccessKit

# Install dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env
```

Edit `.env` and set a secure JWT_SECRET:

```env
JWT_SECRET=your-secure-random-secret-key
NODE_ENV=development
```

### 3. Create Admin User

```bash
# Create default admin user
npm run db:create-admin
```

This creates an admin user with:
- Email: admin@example.com
- Password: admin123

**Important**: Change the default admin credentials in production!

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at http://localhost:3000

## Project Structure

```
ReactTailwindAccessKit/
├── app/                 # Next.js pages
│   ├── api/            # API routes
│   ├── dashboard/      # Protected dashboard
│   ├── login/          # Login page
│   └── register/       # Registration
├── components/         # React components
│   ├── ui/            # UI primitives
│   ├── ThemeProvider.tsx
│   ├── AuthProvider.tsx
│   └── PermissionGuard.tsx
├── lib/                # Utilities
│   ├── auth.ts        # JWT authentication
│   ├── db.ts          # Database
│   ├── cn.ts          # classnames
│   └── themes.ts      # Theme config
├── hooks/              # Custom hooks
├── public/             # Static assets
├── docs/               # Documentation
└── scripts/            # Utility scripts
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run all tests |
| `npm run test:ui` | Run tests with UI |
| `npm run db:create-admin` | Create admin user |

## Database

### Location

The SQLite database is stored at `data/onereport.db`.

### Schema

Tables are automatically created on first run:

- `users` - User accounts
- `sessions` - JWT sessions
- `roles` - RBAC roles
- `projects` - Project data
- `project_members` - Project access

### Creating Users

1. Use the registration page at http://localhost:3000/register
2. Or use the admin script: `npm run db:create-admin`

## Authentication

### Login

Navigate to http://localhost:3000/login and use:
- Admin: admin@example.com / admin123

### Protected Routes

Dashboard routes (`/dashboard/*`) require authentication. Unauthenticated users are redirected to `/login`.

### Role-Based Access

- **Admin**: Full access to all features
- **Editor**: Can create/edit projects
- **Viewer**: Read-only access

## Theme Customization

### Supported Themes

- Slate (default)
- Blue
- Emerald
- Rose
- Amber
- Purple

### Switching Themes

Click the theme buttons in the navbar to switch between themes. Your preference is saved to localStorage.

### Dark Mode

Click the sun/moon icon to toggle dark/light mode.

## Development

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# With coverage
npm test -- --coverage
```

### Building

```bash
# Development build
npm run build

# Production build
npm run build && npm start
```

### Linting

```bash
npm run lint
```

## Docker Development

### Quick Start

```bash
# Build and run with Docker
docker-compose up --build
```

### Access

- Development: http://localhost:3000
- The database is persisted in the `data/` directory

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill <PID>
```

### Database Errors

Ensure the `data/` directory exists and is writable:

```bash
mkdir data
chmod 755 data
```

### Node Version Issues

Check your Node.js version:

```bash
node --version
```

If below 18, upgrade using nvm:

```bash
nvm install 18
nvm use 18
```

### Clean Install

If experiencing issues, try a clean install:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

After setup:

1. **Change default admin password** in production
2. **Configure secure JWT_SECRET** in production
3. **Set up HTTPS** for production
4. **Review RBAC permissions** and customize as needed

## Additional Resources

- [README.md](../README.md) - Project overview
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [THEMING.md](THEMING.md) - Theme customization
- [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment

## Support

For setup issues, please open an issue on GitHub.