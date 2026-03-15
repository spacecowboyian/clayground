# LAN-to-Cloud Bridge Plan for Print Queue

## Goal
Define an implementation-ready story set so a future coding agent can build a LAN-based Bambu ingestion path that syncs printer/task data to cloud storage for Print Queue consumption.

## Why This Epic Exists
The existing cloud-token import path is no longer reliable for many users. This epic moves ingestion to an edge service on the printer LAN, with synchronized cloud data read by the web app.

## Recommended Build Order
1. `04-001-edge-agent-bootstrap.md`
2. `04-002-printer-onboarding-and-auth.md`
3. `04-003-lan-telemetry-state-sync.md`
4. `04-004-job-history-sync.md`
5. `04-005-cloud-ingest-api.md`
6. `04-006-print-queue-lan-integration-ui.md`
7. `04-007-reliability-observability-security.md`
8. `04-008-agent-execution-runbook.md`

## Definition of Done for Epic
- LAN ingestion works without Bambu cloud token dependency.
- Printer state and job history are available from cloud tables/APIs.
- Print Queue can import recent jobs from synced data.
- Operational safeguards exist (auth, retries, audit logs, health checks).
