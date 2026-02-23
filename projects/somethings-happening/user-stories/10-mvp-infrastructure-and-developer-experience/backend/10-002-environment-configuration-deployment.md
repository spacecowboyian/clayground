# Environment Configuration and Deployment Setup

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a **developer or DevOps engineer**,
I want **clear environment configuration and deployment processes**,
So that **the application can be deployed to development, staging, and production environments reliably**.

## Acceptance Criteria
- [ ] Environment variables documented in .env.example file
- [ ] Separate environment configs for development, staging, production
- [ ] Sensitive credentials stored securely (not in git)
- [ ] Database connection strings configurable via environment
- [ ] External API keys configurable via environment
- [ ] CDN/storage endpoints configurable via environment
- [ ] Redis connection configurable for job queue and rate limiting
- [ ] Deployment scripts/commands documented
- [ ] Health check endpoints for monitoring (GET /api/health)
- [ ] Logging configuration per environment
- [ ] Error reporting configured for production (Sentry or similar)
- [ ] Graceful shutdown handling for background workers
- [ ] Zero-downtime deployment strategy documented

## Technical Notes
### Required Environment Variables
```bash
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Redis (for jobs and rate limiting)
REDIS_URL=redis://host:port

# Storage/CDN
STORAGE_PROVIDER=s3|r2|local
STORAGE_BUCKET=bucket-name
STORAGE_ACCESS_KEY=xxx
STORAGE_SECRET_KEY=xxx
STORAGE_REGION=us-east-1
CDN_URL=https://cdn.example.com

# External APIs (for scraping)
TWITTER_API_KEY=xxx
TWITTER_API_SECRET=xxx
INSTAGRAM_API_KEY=xxx
TIKTOK_API_KEY=xxx

# Application
NODE_ENV=development|staging|production
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_WS_URL=wss://ws.example.com

# Monitoring (optional)
SENTRY_DSN=xxx
LOG_LEVEL=debug|info|warn|error

# Security
JWT_SECRET=xxx (if implementing auth)
RATE_LIMIT_REDIS_URL=redis://host:port
```

### Deployment Platforms
**Option 1: Vercel (Recommended for MVP)**
- Automatic deployments from GitHub
- Environment variables via dashboard
- Preview deployments per PR
- Edge functions for API routes
- Built-in CDN

**Option 2: Self-hosted (Docker)**
- Docker Compose for local development
- Dockerfile for Next.js app
- Separate containers for workers
- Kubernetes manifests for production

**Option 3: Traditional Platform (Railway, Render)**
- Simple deployment from GitHub
- Managed database and Redis
- Environment variable management

### Configuration Loading
```typescript
// lib/config.ts
export const config = {
  database: {
    url: process.env.DATABASE_URL!,
  },
  redis: {
    url: process.env.REDIS_URL!,
  },
  storage: {
    provider: process.env.STORAGE_PROVIDER!,
    bucket: process.env.STORAGE_BUCKET!,
    accessKey: process.env.STORAGE_ACCESS_KEY!,
    secretKey: process.env.STORAGE_SECRET_KEY!,
    region: process.env.STORAGE_REGION!,
    cdnUrl: process.env.CDN_URL!,
  },
  apis: {
    twitter: {
      key: process.env.TWITTER_API_KEY,
      secret: process.env.TWITTER_API_SECRET,
    },
  },
  app: {
    env: process.env.NODE_ENV as 'development' | 'staging' | 'production',
    apiUrl: process.env.NEXT_PUBLIC_API_URL!,
    wsUrl: process.env.NEXT_PUBLIC_WS_URL!,
  },
  monitoring: {
    sentryDsn: process.env.SENTRY_DSN,
    logLevel: process.env.LOG_LEVEL || 'info',
  },
};

// Validate required vars on startup
function validateConfig() {
  const required = ['DATABASE_URL', 'REDIS_URL', 'STORAGE_BUCKET'];
  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
```

### Deployment Checklist
- [ ] Run database migrations
- [ ] Test API endpoints
- [ ] Verify external service connectivity
- [ ] Check logs for errors
- [ ] Test WebSocket connections
- [ ] Verify background jobs running
- [ ] Monitor resource usage (CPU, memory, database connections)

## Dependencies
- Epic 4 story 04-004: Backend Database Setup (database config)
- Epic 4 story 04-003: Media Storage (storage config)
- Epic 4 story 04-005: Scraping Service (Redis and worker config)
- Epic 10 story 10-001: CI/CD Pipeline (deployment automation)

## Priority
- [x] Critical (MVP)
- [ ] High
- [ ] Medium
- [ ] Low

## Estimated Complexity
- [x] Small (1-2 days)
- [ ] Medium (3-5 days)
- [ ] Large (1-2 weeks)
- [ ] X-Large (2+ weeks)

## Implementation Details
To be filled during implementation

## Testing Notes
- Test app startup with missing environment variables
- Test app startup with invalid database URL
- Test environment variable loading in different NODE_ENV values
- Test deployment to staging environment
- Test health check endpoints return correct status
- Test graceful shutdown with active connections
- Verify sensitive variables not logged or exposed
- Test configuration validation on startup
