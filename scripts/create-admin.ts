#!/usr/bin/env node

import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = path.join(DATA_DIR, 'onereport.db');

interface Args {
  email?: string;
  password?: string;
  name?: string;
}

function parseArgs(): Args {
  const args: Args = {};
  const argv = process.argv.slice(2);

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--email' || arg === '-e') {
      args.email = argv[++i];
    } else if (arg === '--password' || arg === '-p') {
      args.password = argv[++i];
    } else if (arg === '--name' || arg === '-n') {
      args.name = argv[++i];
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }
  }

  return args;
}

function printHelp() {
  console.log(`
OneReport CLI - Create Admin User

Usage: npm run db:create-admin -- [options]

Options:
  -e, --email <email>    Admin email (default: admin@example.com)
  -p, --password <pass> Admin password (default: k3@MnpR1)
  -n, --name <name>     Admin name (default: Admin)
  -h, --help            Show this help message

Example:
  npm run db:create-admin -- --email superuser@company.com --password secretpass
  `);
}

function main() {
  const args = parseArgs();
  const email = args.email || 'admin@example.com';
  const password = args.password || 'k3@MnpR1';
  const name = args.name || 'Admin';

  console.log('\n🔧 OneReport CLI - Creating Admin User\n');
  console.log(`Email: ${email}`);
  console.log(`Name: ${name}`);

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    const db = new Database(DB_PATH);

    // Initialize database schema if needed
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        expires_at DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        description TEXT,
        permissions TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    try {
      db.exec(`ALTER TABLE users ADD COLUMN role_id INTEGER REFERENCES roles(id)`);
    } catch {
      // Column might already exist
    }

    db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'pending',
        progress INTEGER DEFAULT 0,
        due_date DATETIME,
        created_by INTEGER REFERENCES users(id),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.exec(`
      CREATE TABLE IF NOT EXISTS project_members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        role TEXT DEFAULT 'viewer',
        added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE(project_id, user_id)
      )
    `);

    // Seed default roles
    const adminRole = db.prepare('SELECT id FROM roles WHERE name = ?').get('Admin');
    if (!adminRole) {
      db.prepare('INSERT INTO roles (name, description, permissions) VALUES (?, ?, ?)').run(
        'Admin',
        'Full system access',
        JSON.stringify(['users.view', 'users.create', 'users.update', 'users.delete', 'roles.view', 'roles.create', 'roles.update', 'roles.delete', 'projects.view', 'projects.create', 'projects.update', 'projects.delete', 'projects.manage_members'])
      );
    }

    const editorRole = db.prepare('SELECT id FROM roles WHERE name = ?').get('Editor');
    if (!editorRole) {
      db.prepare('INSERT INTO roles (name, description, permissions) VALUES (?, ?, ?)').run(
        'Editor',
        'Can create and edit content',
        JSON.stringify(['projects.view', 'projects.create', 'projects.update'])
      );
    }

    const viewerRole = db.prepare('SELECT id FROM roles WHERE name = ?').get('Viewer');
    if (!viewerRole) {
      db.prepare('INSERT INTO roles (name, description, permissions) VALUES (?, ?, ?)').run(
        'Viewer',
        'Read-only access',
        JSON.stringify(['projects.view'])
      );
    }

    // Check if user exists
    const existingUser = db.prepare('SELECT id, name, email FROM users WHERE email = ?').get(email) as any;

    if (existingUser) {
      console.log(`\n⚠️  User already exists: ${existingUser.name} (${existingUser.email})`);

      // Get Admin role
      const adminRole = db.prepare('SELECT id, name FROM roles WHERE name = ?').get('Admin') as any;

      if (adminRole) {
        db.prepare('UPDATE users SET role_id = ?, name = ? WHERE id = ?').run(adminRole.id, name, existingUser.id);
        console.log(`✅ User promoted to Admin role (role_id: ${adminRole.id})`);
      }
    } else {
      // Hash password
      const passwordHash = bcrypt.hashSync(password, 12);

      // Create user
      const result = db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)').run(
        name,
        email,
        passwordHash
      );

      const userId = result.lastInsertRowid as number;

      // Get Admin role
      const adminRole = db.prepare('SELECT id, name FROM roles WHERE name = ?').get('Admin') as any;

      if (adminRole) {
        db.prepare('UPDATE users SET role_id = ? WHERE id = ?').run(adminRole.id, userId);
        console.log(`\n✅ Admin user created with ID: ${userId}, Role: ${adminRole.name}`);
      }
    }

    db.close();

    console.log('\n📝 Login with:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}\n`);

  } catch (error) {
    console.error('\n❌ Error:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

main();