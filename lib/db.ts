import path from 'path';
import fs from 'fs';

let dbInstance: any = null;

export function getDb() {
  if (typeof window !== 'undefined') return null;
  
  if (dbInstance) return dbInstance;

  try {
    const Database = require('better-sqlite3');
    const DB_DIR = path.join(process.cwd(), 'data');
    const DB_PATH = path.join(DB_DIR, 'onereport.db');

    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    dbInstance = new Database(DB_PATH);
    dbInstance.pragma('journal_mode = WAL');

    initializeTables(dbInstance);
    seedRoles(dbInstance);

    return dbInstance;
  } catch (e) {
    console.error('Failed to initialize database:', e);
    return null;
  }
}

function initializeTables(db: any) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role_id INTEGER REFERENCES roles(id),
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
}

function seedRoles(db: any) {
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
}

let db: any = null;
try {
  db = getDb();
} catch (e) {
  db = null;
}

export const dbStatements = db ? {
  createUser: db.prepare(`INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)`),
  getUserByEmail: db.prepare(`SELECT id, name, email, password_hash, created_at, updated_at FROM users WHERE email = ?`),
  getUserById: db.prepare(`SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?`),
  getUserByEmailWithRole: db.prepare(`SELECT u.id, u.name, u.email, u.password_hash, u.created_at, u.updated_at, r.id as role_id, r.name as role_name, r.permissions FROM users u LEFT JOIN roles r ON u.role_id = r.id WHERE u.email = ?`),
  createSession: db.prepare(`INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)`),
  getSession: db.prepare(`SELECT user_id, expires_at FROM sessions WHERE id = ? AND expires_at > datetime('now')`),
  deleteSession: db.prepare(`DELETE FROM sessions WHERE id = ?`),
  cleanupExpiredSessions: db.prepare(`DELETE FROM sessions WHERE expires_at <= datetime('now')`),
  createRole: db.prepare(`INSERT INTO roles (name, description, permissions) VALUES (?, ?, ?)`),
  getRoleById: db.prepare(`SELECT id, name, description, permissions, created_at FROM roles WHERE id = ?`),
  getRoleByName: db.prepare(`SELECT id, name, description, permissions, created_at FROM roles WHERE name = ?`),
  getAllRoles: db.prepare(`SELECT id, name, description, permissions, created_at FROM roles ORDER BY name`),
  updateRole: db.prepare(`UPDATE roles SET name = ?, description = ?, permissions = ? WHERE id = ?`),
  deleteRole: db.prepare(`DELETE FROM roles WHERE id = ?`),
  updateUserRole: db.prepare(`UPDATE users SET role_id = ? WHERE id = ?`),
  getUserWithRole: db.prepare(`SELECT u.id, u.name, u.email, u.created_at, u.updated_at, r.id as role_id, r.name as role_name, r.permissions FROM users u LEFT JOIN roles r ON u.role_id = r.id WHERE u.id = ?`),
  getAllUsersWithRoles: db.prepare(`SELECT u.id, u.name, u.email, u.created_at, u.updated_at, r.id as role_id, r.name as role_name, r.permissions FROM users u LEFT JOIN roles r ON u.role_id = r.id ORDER BY u.created_at DESC`),
  updateUser: db.prepare(`UPDATE users SET name = ?, email = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`),
  updateUserPassword: db.prepare(`UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`),
  createProject: db.prepare(`INSERT INTO projects (name, description, status, progress, due_date, created_by) VALUES (?, ?, ?, ?, ?, ?)`),
  getProjectById: db.prepare(`SELECT id, name, description, status, progress, due_date, created_by, created_at, updated_at FROM projects WHERE id = ?`),
  getAllProjects: db.prepare(`SELECT id, name, description, status, progress, due_date, created_by, created_at, updated_at FROM projects ORDER BY created_at DESC`),
  updateProject: db.prepare(`UPDATE projects SET name = ?, description = ?, status = ?, progress = ?, due_date = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`),
  deleteProject: db.prepare(`DELETE FROM projects WHERE id = ?`),
  addProjectMember: db.prepare(`INSERT INTO project_members (project_id, user_id, role) VALUES (?, ?, ?)`),
  getProjectMembers: db.prepare(`SELECT pm.id, pm.project_id, pm.user_id, pm.role, pm.added_at, u.name, u.email FROM project_members pm JOIN users u ON pm.user_id = u.id WHERE pm.project_id = ? ORDER BY pm.added_at`),
  getUserProjects: db.prepare(`SELECT p.id, p.name, p.description, p.status, p.progress, p.due_date, p.created_at, pm.role as user_role FROM projects p JOIN project_members pm ON p.id = pm.project_id WHERE pm.user_id = ? ORDER BY p.created_at DESC`),
  updateProjectMemberRole: db.prepare(`UPDATE project_members SET role = ? WHERE project_id = ? AND user_id = ?`),
  removeProjectMember: db.prepare(`DELETE FROM project_members WHERE project_id = ? AND user_id = ?`),
  checkProjectAccess: db.prepare(`SELECT pm.role FROM project_members pm WHERE pm.project_id = ? AND pm.user_id = ?`),
} : {};

export default db;