# Deployment Guide

This guide covers deploying ReactTailwindAccessKit to various environments.

## Prerequisites

- Node.js 18+
- Docker (for containerized deployment)
- SQLite database file

## Local Development

### Quick Start

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Create admin user
npm run db:create-admin

# Start development server
npm run dev
```

The application will be available at http://localhost:3000

## Docker Deployment

### Development Mode

```bash
# Build and start containers
docker-compose up --build

# Or use Makefile
make docker-up
```

### Production Mode

```bash
# Build production image
docker-compose -f docker-compose.yml build app-production

# Run production container
docker-compose -f docker-compose.yml up app-production
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `NODE_ENV` | Environment (development/production) | No |

### Volume Mounts

The Docker compose configuration mounts `./data` to `/app/data` for SQLite database persistence.

## Production Deployment

### Manual Build

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm run start
```

### Using PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start npm --name "react-tailwind-access-kit" -- start

# Or use ecosystem file
pm2 start ecosystem.config.js
```

### Nginx Reverse Proxy

Example nginx configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Database

### SQLite Location

The database is stored in `data/onereport.db`. Ensure this directory is persisted in production.

### Backup

```bash
# Create database backup
cp data/onereport.db data/onereport-backup-$(date +%Y%m%d).db
```

### Migration

The database is automatically created on first run with all required tables.

## Security Considerations

1. **JWT_SECRET**: Use a strong, random secret in production
2. **HTTPS**: Enable HTTPS in production
3. **Firewall**: Restrict access to port 3000
4. **Database**: Secure the database file with appropriate permissions

## Monitoring

### Health Check

The application exposes a health check endpoint at `/api/health` (if configured).

### Logs

```bash
# View container logs
docker-compose logs -f

# View application logs
docker-compose logs -f app
```

## Troubleshooting

### Container Won't Start

1. Check environment variables are set
2. Verify database directory permissions
3. Check logs for errors: `docker-compose logs`

### Database Errors

1. Ensure `./data` directory exists
2. Check file permissions
3. Verify SQLite can write to the directory

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill <PID>
```

## Scaling Considerations

For horizontal scaling:

1. Use a shared database (PostgreSQL)
2. Use session storage (Redis)
3. Configure load balancer
4. Use stateless authentication

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - run: docker-compose up -d
```

## Support

For deployment issues, please open an issue on GitHub.