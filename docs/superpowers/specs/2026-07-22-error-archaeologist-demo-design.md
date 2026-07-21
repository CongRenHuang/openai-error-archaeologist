# Error Archaeologist Sample Demo Architecture

**Status:** Approved design, not yet implemented

**Date:** 2026-07-22

**Target:** One public, judge-ready demo deployable to Google Cloud Run

## Goal and Success Criteria

Build one reliable Grade 7–9 algebra workflow: user selects a curated handwritten sample or uploads a synthetic/de-identified image, reviews evidence-linked diagnostic hypotheses, answers a verified differentiating probe, then accepts, revises, or rejects the result.

Success requires:

- `docker compose up --build` starts the full local stack.
- One container deploys React and FastAPI to Cloud Run.
- Cloud SQL PostgreSQL persists analysis, probe, and review events.
- Curated sample flow works without raw-image persistence.
- Ambiguous input and unverifiable probes produce abstention, not forced diagnosis.
- Fake-model tests run without secrets; live tests require explicit human opt-in.

## Scope

Included: curated samples, optional PNG/JPEG upload, one algebra taxonomy, multimodal parsing, deterministic SymPy checks, structured results, one follow-up probe, anonymous session, teacher review, and reviewed-result aggregate.

Excluded: accounts, real student data, grading, batch scanning, LMS integration, object storage, queues, Redis, billing, multi-subject support, and learning-effect claims.

## Architecture Decision

Use a **single deployable modular monolith**. React + Vite compiles into static assets copied into the FastAPI image. FastAPI serves both those assets and `/api/v1/*`. One Cloud Run service connects to managed Cloud SQL PostgreSQL.

```text
Browser: React + Vite
  |-- curated sample picker / optional upload
  |-- analysis evidence and abstention states
  |-- differentiating probe
  `-- teacher review
             |
             | HTTPS /api/v1/*
             v
Cloud Run: FastAPI + compiled React
  |-- API and orchestration
  |-- OpenAI Responses API adapter
  |-- Pydantic structured-output contract
  |-- algebra taxonomy matcher
  |-- SymPy transition and probe verifier
  `-- evidence updater
             |
             v
Cloud SQL PostgreSQL
  |-- demo_sessions
  |-- analyses
  |-- probe_responses
  `-- reviews
```

This choice minimizes deployment and CORS work while preserving internal module boundaries. Separate frontend/backend services become worthwhile only when release cadence, ownership, or scaling differs.

## Components and Boundaries

### Frontend

React presents a single guided flow: select input, analyze, inspect evidence, answer probe, review suggestion, view aggregate. It never receives an OpenAI key or calls OpenAI directly. It displays explicit progress, abstention, retry, and API-unavailable states.

### API and Orchestrator

FastAPI validates input, owns anonymous sessions, calls domain services, persists events, and maps failures to stable error codes. Analysis remains synchronous with a 45-second timeout; Cloud Run background work is not required.

### Model Adapter

The OpenAI adapter sends images through the Responses API and parses output into Pydantic models. `OPENAI_MODEL` controls model selection; initial configuration is `gpt-5.6`. Structured Outputs enforce shape, not mathematical truth. Safety refusal and incomplete/invalid results receive explicit handling.

### Deterministic Domain Layer

SymPy checks supported algebraic transitions, identifies the first invalid step, normalizes probe responses, and verifies candidate predictions differ. Taxonomy rules live in versioned YAML. Model proposes parses and hypotheses; deterministic code verifies supported mathematics.

### Persistence

PostgreSQL stores structured events, not uploaded images. Curated samples and taxonomy stay in Git. JSONB retains versioned model results without prematurely normalizing an evolving contract.

## Request Flow

1. User chooses `sample_id` or image, never both.
2. Upload path requires `pii_confirmed=true`; backend validates MIME and size.
3. API creates pending analysis under anonymous signed session.
4. Model adapter returns normalized steps, uncertainty, candidates, evidence, and probe proposal.
5. SymPy validates steps and probe discriminability.
6. Failed probe validation permits one regeneration. Second failure returns abstention.
7. API persists structured result and usage metadata; in-memory image bytes are released.
8. Student response is normalized and matched against verified predictions.
9. Teacher accepts, revises, or rejects. Only accepted/revised events enter aggregate.

## API Contract

```text
GET    /healthz
GET    /readyz
GET    /api/v1/samples
POST   /api/v1/analyses
GET    /api/v1/analyses/{id}
POST   /api/v1/analyses/{id}/probe-response
POST   /api/v1/analyses/{id}/review
GET    /api/v1/aggregate
DELETE /api/v1/session
```

`POST /analyses` accepts multipart `sample_id?`, `image?`, and `pii_confirmed?`. Client supplies `Idempotency-Key`; database enforces session-scoped uniqueness. Domain abstention returns a successful analysis resource, not an HTTP error.

## Data Model

- `demo_sessions`: UUID, signed-cookie identifier, creation and expiry times.
- `analyses`: session, idempotency key, source type, sample ID, status, result JSONB, contract version, model, token usage, latency, error code, timestamps.
- `probe_responses`: analysis, raw response, normalized expression, matched candidate, evidence update JSONB, timestamp.
- `reviews`: analysis, `accepted | revised | rejected`, selected candidate, timestamp. Free-text notes stay out of demo to reduce PII risk.

No student name, email, school, account, or raw image column exists.

## Secrets and Human Gates

| Value | Classification | Handling |
| --- | --- | --- |
| `OPENAI_API_KEY` | Secret | Local ignored `.env`; production Secret Manager |
| `DB_PASSWORD` | Secret | Local Compose value; production Secret Manager |
| `SESSION_SECRET` | Secret | Generated once; production Secret Manager |
| `OPENAI_MODEL` | Configuration | Environment variable |
| GCP project, region, Cloud SQL instance | Configuration | Environment/deploy arguments |

Secrets never enter React build variables, Docker layers, source control, logs, or responses. Cloud Run uses its service account; no service-account key file is uploaded.

Human-stop sequence:

```text
Automated implementation
  -> H1: provide OPENAI_API_KEY
  -> local live-API smoke test
  -> automated tests and image build
  -> H2: confirm GCP project, billing, and region
  -> provision Cloud SQL, service identity, and Secret Manager
  -> H3: create/approve production secret values
  -> deploy
  -> H4: review public workflow and approve submission
```

Runtime human gates: upload confirmation blocks possible PII; ambiguity blocks diagnosis; teacher review blocks aggregation. API or model-access failure stops with an actionable message. No silent fallback model.

## Local and Cloud Deployment

Local `docker-compose.yml` runs `app` and `postgres`. Multi-stage Docker build compiles Vite, installs Python dependencies, copies built assets, then starts Uvicorn on Cloud Run's `PORT`. Local startup may apply idempotent Alembic migrations; production deployment runs migrations once as an explicit pre-deploy step, avoiding concurrent startup migration races.

Production uses Artifact Registry, one Cloud Run service, one Cloud SQL PostgreSQL instance, and Secret Manager. Service identity receives only Cloud SQL Client and secret-access permissions needed by this app. Initial public demo permits unauthenticated Cloud Run invocation but owns no privileged API routes.

Proposed repository layout:

```text
frontend/src/
backend/app/api/
backend/app/domain/
backend/app/integrations/openai/
backend/app/persistence/
backend/app/fixtures/samples/
backend/app/taxonomy/algebra-v1.yaml
backend/tests/
e2e/
Dockerfile
docker-compose.yml
```

## Failure and Privacy Behavior

- Invalid MIME or request: `400`; oversize upload: `413`.
- Database unavailable: `503`; never report fake success.
- OpenAI rate limit, timeout, or `5xx`: one jittered retry, then `503` with correlation ID.
- Invalid structured result: one retry, then controlled failure.
- Unclear handwriting, unsupported algebra, or failed probe verification: stored abstention.
- Logs contain IDs, stage, duration, status, and token usage; never image bytes, student content, keys, cookies, or database URLs.
- Process image in memory only. Add a regression test proving persistence adapters never receive image bytes.

## Verification Plan

- **Backend unit tests:** SymPy equivalence, first-invalid-transition, taxonomy matching, response normalization, evidence updates, abstention rules.
- **Backend API tests:** Pydantic contracts, idempotency, retry limits, error mapping, upload limits, no-image persistence, review-before-aggregate.
- **Frontend tests:** curated selection, upload confirmation, progress, abstention, probe, review, reset.
- **End-to-end:** Playwright completes curated flow against Docker stack using fake OpenAI adapter.
- **Live smoke test:** opt-in only with `RUN_OPENAI_INTEGRATION=1` and API key.
- **Deployment check:** `/readyz`, curated workflow, one abstention sample, review persistence, and secret/log inspection.

## Growth Triggers

Revisit architecture when evidence warrants it:

- Add job queue when analysis must survive disconnects or batch intake begins.
- Split frontend when independent release/scaling needs appear.
- Add object storage only with explicit retention/deletion policy.
- Normalize JSONB candidates when cross-analysis querying becomes stable and frequent.
- Add authentication and tenant isolation before any real educator pilot.
- Add private networking, stronger audit controls, and approved data terms before real student data.

## References

- [OpenAI Images and vision](https://developers.openai.com/api/docs/guides/images-vision)
- [OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs)
- [OpenAI data controls](https://developers.openai.com/api/docs/guides/your-data)
- [Google Cloud Run container deployment](https://docs.cloud.google.com/run/docs/deploying)
- [Connect Cloud Run to Cloud SQL for PostgreSQL](https://docs.cloud.google.com/sql/docs/postgres/connect-run)
- [Configure Cloud Run secrets](https://docs.cloud.google.com/run/docs/configuring/services/secrets)
