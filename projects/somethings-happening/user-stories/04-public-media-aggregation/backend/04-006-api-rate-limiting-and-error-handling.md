# API Rate Limiting and Error Handling

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Completed

## User Story
As a **backend developer**,
I want **comprehensive rate limiting and error handling for all API endpoints**,
So that **the system is protected from abuse and provides clear feedback when issues occur**.

## Acceptance Criteria
- [ ] Rate limiting implemented for public API endpoints
- [ ] Rate limits configurable per endpoint (e.g., 100 req/min for reads, 10 req/min for writes)
- [ ] Rate limit headers included in responses (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset)
- [ ] 429 Too Many Requests response when rate limit exceeded
- [ ] Global error handler catches all unhandled exceptions
- [ ] Error responses follow consistent format with error code, message, and details
- [ ] 400 Bad Request for malformed requests with validation details
- [ ] 404 Not Found for missing resources
- [ ] 500 Internal Server Error for unexpected failures
- [ ] Errors logged with appropriate severity levels (error, warn, info)
- [ ] Sensitive information excluded from error responses (no stack traces in production)
- [ ] Request correlation IDs for tracing errors across logs
- [ ] Health check endpoint bypasses rate limiting: GET /api/health

## Technical Notes
### Rate Limiting Implementation
- Use Redis for distributed rate limiting state
- Implement sliding window algorithm for accurate rate limiting
- Consider using existing middleware (express-rate-limit, upstash-ratelimit)
- Different rate limits for authenticated vs anonymous users (future)
- Whitelist internal services from rate limiting

### Error Response Format
```typescript
interface ErrorResponse {
  error: {
    code: string;           // e.g., "VALIDATION_ERROR", "NOT_FOUND"
    message: string;        // Human-readable message
    details?: any;          // Additional context (validation errors, etc.)
    requestId: string;      // Correlation ID for support
    timestamp: string;      // ISO 8601 timestamp
  }
}
```

### Rate Limit Configuration
```typescript
const rateLimits = {
  'GET /api/events/:id': { limit: 100, window: '1m' },
  'GET /api/events/:id/media': { limit: 100, window: '1m' },
  'POST /api/events': { limit: 10, window: '1m' },
  'POST /api/media/upload': { limit: 20, window: '1m' },
};
```

### Error Logging
- Use structured logging (Winston, Pino, or similar)
- Include request context in logs (method, path, user ID, IP)
- Send critical errors to monitoring service (Sentry, Datadog, etc.)
- Create alerts for high error rates

## Dependencies
- Redis for rate limiting state
- Logging library (Winston, Pino)
- Optional: Error monitoring service (Sentry)
- Epic 4 story 04-002: Event Data Model and API (applies to these endpoints)

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
- Test rate limiting enforcement with rapid requests
- Test rate limit reset after time window
- Test different rate limits per endpoint
- Test error response format consistency
- Test validation error details
- Test correlation ID propagation through logs
- Test error handling in database connection failures
- Test error handling in external API failures
- Verify no sensitive data in production error responses
- Load test to ensure rate limiting doesn't degrade performance
