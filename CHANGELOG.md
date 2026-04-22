# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-04-22

### Added

- **Authentication System**
  - JWT-based token authentication
  - User registration and login
  - Secure password hashing with bcrypt

- **Role-Based Access Control (RBAC)**
  - Three default roles: Admin, Editor, Viewer
  - Permission-based access management
  - Role assignment to users

- **Dashboard Modules**
  - Analytics dashboard with charts
  - Reports management
  - Projects tracking
  - Team/user management
  - Calendar, Invoices, Messages
  - Settings and Profile

- **Theme System**
  - 6 Color Themes: Slate, Blue, Emerald, Rose, Amber, Purple
  - Dark/Light mode support
  - Persistent preferences

- **Docker Support**
  - Multi-stage Dockerfile
  - docker-compose for dev/prod

- **Testing**
  - Vitest configuration
  - Component tests

### Tech Stack

- Next.js 15.x
- React 19.x
- TypeScript 5.x
- Tailwind CSS 3.4.x
- SQLite (better-sqlite3)
- Vitest 2.x

###迁移

- Initial open source release as ReactTailwindAccessKit