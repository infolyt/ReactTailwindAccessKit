# ReactTailwindAccessKit

A full-featured report/project management dashboard with Role-Based Access Control (RBAC), built on modern web technologies.

## Features

- **Authentication System**
  - JWT-based token authentication
  - User registration and login
  - Secure password hashing with bcrypt

- **Role-Based Access Control (RBAC)**
  - Three default roles: Admin, Editor, Viewer
  - Permission-based access management
  - Role assignment to users

- **Dashboard Modules**
  - Analytics - Overview with charts and statistics
  - Reports - Report management and tracking
  - Projects - Project management with progress tracking
  - Team - User and role management
  - Calendar - Event scheduling calendar
  - Invoices - Invoice tracking and management
  - Messages - Internal messaging system
  - Settings - Application configuration

- **Theme System**
  - 6 Color Themes: Slate, Blue, Emerald, Rose, Amber, Purple
  - Dark/Light mode support
  - System preference detection
  - Persistent theme preferences

- **Modern UI Components**
  - shadcn/ui-style components
  - Responsive design
  - Accessible components (Radix UI)

## Tech Stack

| Technology | Version |
|------------|---------|
| Next.js | 15.x |
| React | 19.x |
| TypeScript | 5.x |
| Tailwind CSS | 3.4.x |
| SQLite | (better-sqlite3) |
| Vitest | 2.x |

## Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
cd ReactTailwindAccessKit

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Create admin user
npm run db:create-admin

# Start development server
npm run dev
```

### Access the Application

- **Local**: http://localhost:3000
- **Login**: Use credentials created with `db:create-admin`

## Project Structure

```
ReactTailwindAccessKit/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── dashboard/          # Dashboard pages
│   ├── login/             # Login page
│   ├── register/           # Registration page
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Landing page
├── components/             # React components
│   ├── ui/               # shadcn/ui primitives
│   ├── ThemeProvider.tsx  # Theme context
│   ├── ThemeSwitcher.tsx   # Theme switcher
│   ├── AuthProvider.tsx    # Auth context
│   ├── PermissionGuard.tsx # RBAC guard
│   └── RoleBadge.tsx      # Role badge
├── lib/                   # Utilities
│   ├── auth.ts            # JWT utilities
│   ├── db.ts             # Database connection
│   ├── cn.ts             # classnames utility
│   └── themes.ts         # Theme configuration
├── hooks/                  # Custom React hooks
│   ├── use-permission.ts  # Permission hook
│   ├── use-roles.ts     # Roles hook
│   └── use-users.ts     # Users hook
├── public/                 # Static assets
├── docs/                   # Documentation
├── scripts/                # Utility scripts
├── Dockerfile             # Docker build
├── docker-compose.yml     # Docker Compose
├── package.json           # Dependencies
├── tailwind.config.js    # Tailwind config
└── tsconfig.json        # TypeScript config
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |
| `npm run test:ui` | Run tests with UI |
| `npm run db:create-admin` | Create admin user |

## Database Schema

### Tables

- **users** - User accounts
- **sessions** - JWT session tokens
- **roles** - RBAC roles
- **projects** - Project data
- **project_members** - Project access control

### Default Roles

| Role | Permissions |
|------|------------|
| Admin | Full system access |
| Editor | Create/edit projects |
| Viewer | View only |

## Theme Customization

### Supported Themes

- Slate (default)
- Blue
- Emerald
- Rose
- Amber
- Purple

### Adding Custom Themes

1. Add colors to `tailwind.config.js`
2. Add theme entry to `lib/themes.ts`

## Docker Deployment

### Development

```bash
docker-compose up --build
```

### Production

```bash
docker-compose -f docker-compose.yml up -f docker-compose.prod.yml up --build
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | List all users |
| POST | `/api/users` | Create user |
| GET | `/api/users/[id]` | Get user |
| PUT | `/api/users/[id]` | Update user |
| DELETE | `/api/users/[id]` | Delete user |

### Roles

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/roles` | List all roles |
| POST | `/api/roles` | Create role |
| PUT | `/api/roles/[id]` | Update role |
| DELETE | `/api/roles/[id]` | Delete role |

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `NODE_ENV` | Environment (development/production) | No |

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues and feature requests, please open an issue on GitHub.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - UI component inspiration
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Next.js](https://nextjs.org/) - React framework