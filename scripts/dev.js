#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read PORT from .env.local or use default
let port = 3001;
const envLocalPath = path.join(__dirname, '..', '.env.local');
const envPath = path.join(__dirname, '..', '.env');

for (const envFile of [envLocalPath, envPath]) {
  if (fs.existsSync(envFile)) {
    const content = fs.readFileSync(envFile, 'utf-8');
    const portMatch = content.match(/^PORT=(\d+)/m);
    if (portMatch) {
      port = portMatch[1];
      break;
    }
  }
}

// Use PORT from environment if set
if (process.env.PORT) {
  port = process.env.PORT;
}

console.log(`Starting Next.js dev server on port ${port}...`);
execSync(`next dev -p ${port}`, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
