# Architecture

This document describes the system architecture of ReactTailwindAccessKit.

## Overview

ReactTailwindAccessKit is a full-stack Next.js application with:
- Client-side rendering for interactive dashboards
- Server-side API routes for backend logic
- SQLite database for persistence
- JWT-based authentication

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript |
| Styling | Tailwind CSS 3.4 |
| Backend | Next.js API Routes |
| Database | SQLite (better-sqlite3) |
| Authentication | JWT (jose) |
| Testing | Vitest |

## Project Structure

### App Router (`app/`)

Next.js App Router with the following structure:

```
app/
├── api/              # API routes
│   ├── auth/        # Authentication endpoints
│   ├── users/       # User management
│   └── roles/       # Role management
├── dashboard/       # Protected dashboard pages
├── login/          # Login page
├── register/       # Registration page
├── layout.tsx     # Root layout
└── page.tsx       # Landing page
```

### Components (`components/`)

```
components/
├── ui/              # shadcn/ui primitives
├── ThemeProvider.tsx # Theme context
├── ThemeSwitcher.tsx # Theme switcher UI
├── AuthProvider.tsx  # Authentication context
├── PermissionGuard.tsx # RBAC guard
└── RoleBadge.tsx     # Role display
```

### Library (`lib/`)

```
lib/
├── auth.ts          # JWT utilities
├── db.ts           # Database connection & queries
├── cn.ts           # classnames utility
└── themes.ts      # Theme configuration
```

### Hooks (`hooks/`)

Custom React hooks for data fetching and state management.

## Authentication Flow

### Registration

1. User submits registration form
2. Server validates input
3. Password hashed with bcrypt
4. User record created in database
5. JWT token generated and returned

### Login

1. User submits credentials
2. Server validates email exists
3. Password verified against hash
4. JWT token generated with user payload
5. Token returned to client

### Protected Routes

1. Client includes JWT in Authorization header
2. Server verifies token signature
3. User payload extracted
4. Access granted or denied

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role_id INTEGER REFERENCES roles(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Sessions Table

```sql
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Roles Table

```sql
CREATE TABLE roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  permissions TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Projects Table

```sql
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  progress INTEGER DEFAULT 0,
  due_date DATETIME,
  created_by INTEGER REFERENCES users(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Project Members Table

```sql
CREATE TABLE project_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  role TEXT DEFAULT 'viewer',
  added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(project_id, user_id)
);
```

## Role-Based Access Control

### Default Roles

| Role | Permissions |
|------|------------|
| Admin | All permissions |
| Editor | projects.view, projects.create, projects.update |
| Viewer | projects.view |

### Permission Check Flow

1. User visits protected page
2. AuthProvider loads user context
3. PermissionGuard checks user role
4. Matches required permission
5. Renders content or shows error

## Theme System

### Implementation

1. ThemeProvider wraps application
2. Theme state stored in localStorage
3. CSS classes applied to `<html>` element
4. Tailwind `dark:` prefixes active in dark mode

### Theme Colors (Tailwind)

Each theme has full color palette (50-950) configured in `tailwind.config.js`.

## Security Considerations

### Password Security

- bcrypt for password hashing
- Salt rounds: 10

### Token Security

- JWT with HS256 algorithm
- Token expiry: 24 hours
- Secure secret required in production

### API Security

- Input validation on all endpoints
- SQL injection prevention via prepared statements
- CORS configuration

## Performance Optimizations

### Database

- WAL mode enabled for SQLite
- Prepared statements for query reuse
- Indexes on frequently queried columns

### Next.js

- Static generation for landing page
- API routes for dynamic content
- Image optimization

## Testing Strategy

### Unit Tests

- Component rendering
- Hook behavior
- Utility functions

### Integration Tests

- API endpoints
- Authentication flow
- Database operations

### Test Commands

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

## Future Enhancements

- PostgreSQL support for production
- Redis for session storage
- Real-time updates with WebSockets
- File upload handling
- Email notifications

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for development guidelines.