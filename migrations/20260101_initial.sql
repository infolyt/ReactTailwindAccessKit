-- Cloudflare D1 Migration for OneReport

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role_id INTEGER REFERENCES roles(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  permissions TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
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
);

-- Create project_members table
CREATE TABLE IF NOT EXISTS project_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  role TEXT DEFAULT 'viewer',
  added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(project_id, user_id)
);

-- Seed roles
INSERT OR IGNORE INTO roles (name, description, permissions) VALUES 
  ('Admin', 'Full system access', '["users.view", "users.create", "users.update", "users.delete", "roles.view", "roles.create", "roles.update", "roles.delete", "projects.view", "projects.create", "projects.update", "projects.delete", "projects.manage_members"]'),
  ('Editor', 'Can create and edit content', '["projects.view", "projects.create", "projects.update"]'),
  ('Viewer', 'Read-only access', '["projects.view"]');

-- Create admin user (password: k3@MnpR1)
INSERT OR IGNORE INTO users (name, email, password_hash, role_id)
SELECT 'Admin', 'admin@example.com', '$2a$12$xMsQRJTzlNAWxcGIMz2p4uZGEIpjau.vyDbVhgo6qsc/nbikeKrNi', id FROM roles WHERE name = 'Admin';