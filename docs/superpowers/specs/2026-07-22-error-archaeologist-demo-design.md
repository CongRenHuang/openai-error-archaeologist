# Error Archaeologist Hackathon Demo Design

**Status:** Revised design, not yet implemented

**Date:** 2026-07-22

**Target:** Runnable submission before 2026-07-22 08:00 GMT+8

## Deadline and Product Goal

Official submission closes July 21, 2026 at 5:00 PM PDT, equal to July 22 at 08:00 GMT+8. At 03:46 GMT+8, about 4 hours 14 minutes remained. Phase 1 therefore optimizes for one coherent, working story rather than production architecture.

User selects curated handwritten algebra work. System shows evidence-linked candidate misconceptions, independently verifies a differentiating probe with SymPy, accepts one response, then updates candidate support or abstains. Demo proves diagnosis is a testable hypothesis, not an LLM verdict.

## Phase 1: Submission-Critical Demo

### Required experience

1. Choose one of three curated samples: negative distribution error, first-term-only distribution error, or ambiguous handwriting.
2. Request analysis from GPT-5.6 through OpenAI Responses API Structured Outputs.
3. Display normalized steps, first invalid transition, two candidate hypotheses, evidence, and one follow-up probe.
4. SymPy verifies supported algebra and confirms candidate predictions differ.
5. Enter a probe response. System strengthens one candidate, weakens both, or abstains.
6. Ambiguous input, invalid math, or non-discriminating probe returns an explicit abstention state.

### Explicit cuts

No upload, PII confirmation, user accounts, teacher review, aggregate, Cloud SQL, Alembic, idempotency keys, session deletion, separate readiness endpoint, queues, object storage, batch workflow, LMS, or real student data.

## Minimal Architecture

Use one deployable modular monolith. React + Vite compiles into static files served by FastAPI. One Docker image runs locally and on Cloud Run.

```text
Browser: React + Vite
  |-- curated sample picker
  |-- evidence and candidate cards
  |-- verified probe response
  `-- abstention/error states
             |
             | three HTTPS endpoints
             v
Cloud Run / local Docker: FastAPI
  |-- OpenAI Responses API adapter
  |-- Pydantic structured-output contract
  |-- versioned misconception taxonomy
  |-- SymPy verifier and response matcher
  |-- curated fixtures
  `-- disposable SQLite state
```

SQLite uses SQLAlchemy `create_all`; no migrations. It supports same-process demo continuity only. Cloud Run filesystem is ephemeral, so restarts may reset analyses. Configure maximum one instance for demo and make reset visible and harmless. No durability claim appears in README or video.

### Why keep SQLite

It preserves analysis-to-probe flow without Cloud SQL provisioning. Repository boundary remains SQLAlchemy-based, allowing PostgreSQL replacement later. If SQLite causes deployment trouble, replace stored state with a signed analysis token or keep complete flow inside one request; do not add Cloud SQL before submission.

## Components

### Frontend

Single page with four states: sample selection, analyzing, diagnosis/probe, and evidence update. No router, authentication, dashboard, aggregate, or settings. Frontend never receives API key.

### FastAPI

FastAPI validates sample IDs, orchestrates model and SymPy calls, stores disposable analysis state, serves compiled frontend, and returns stable error codes. Analysis remains synchronous with a 45-second timeout.

### Model adapter

Responses API receives repository-owned sample image and returns a strict Pydantic structure. `OPENAI_MODEL` defaults to `gpt-5.6`. Structured Outputs enforce schema, not truth. Refusal, incomplete response, or contract failure gets one retry, then controlled failure.

### Deterministic verifier

SymPy validates supported expressions, identifies first invalid transition, verifies predicted probe answers are distinct, and normalizes user response. Failed probe validation permits one regenerated proposal; second failure abstains.

## Three API Endpoints

```text
GET  /api/v1/samples
POST /api/v1/analyses
POST /api/v1/probe-response
```

`POST /analyses` accepts `{ "sample_id": "negative-distribution" }` and returns analysis ID plus structured diagnosis. `POST /probe-response` accepts analysis ID and response text, then returns evidence update. Unknown/expired analysis returns reset guidance.

Domain abstention is HTTP `200` with `status="abstained"`. Invalid requests return `400`; unavailable model returns `503` with correlation ID. Logs never include image bytes, prompts containing student work, secret values, or full model output.

## Secrets and Human Stops

Only `OPENAI_API_KEY` is required. Store it in ignored local `.env`; for Cloud Run, add it through Secret Manager. `OPENAI_MODEL` and deployment identifiers are non-secret configuration. Never place key in React variables, Docker layers, Git, logs, or shell history.

```text
H0: Human confirms Devpost registration/draft, YouTube upload access,
    repository visibility, and required /feedback Session ID path.
H1: Human supplies OPENAI_API_KEY.
Automated core implementation and fake-model verification.
H2: Human approves live OpenAI smoke test and resulting API usage.
H3: Human confirms GCP project/billing or chooses local-only fallback.
Automated Docker/Cloud Run deployment attempt, capped at 20 minutes.
H4: Human records video, completes Devpost fields, and submits by 07:15.
```

API/model failure has no silent fallback. Fake adapter is visibly labeled and used only for tests or optional UI-development mode, never represented as live GPT-5.6 output.

## Hard Timeline and Fallback

| GMT+8 checkpoint | Required outcome |
| --- | --- |
| 03:50 | H0/H1 complete; Devpost draft exists |
| 03:50–05:30 | End-to-end curated flow implemented |
| 05:30–06:00 | Tests, copy, abstention case, Docker verification |
| 06:00–06:30 | Cloud Run attempt; abandon after 20 blocked minutes |
| 06:30–07:15 | Record/upload sub-3-minute video; finish README and Devpost |
| 07:15 | Submit; retain 45-minute deadline buffer |

Fallback order:

1. Public Cloud Run URL with SQLite.
2. Local `docker compose up --build`, screen-recorded working demo, repository instructions.
3. Fake adapter only for automated tests; not submission demo.

Infrastructure never consumes recording/submission buffer.

## Essential Verification

- `pytest`: SymPy equivalence, distinct predictions, response matching, abstention, and three endpoint contracts with fake adapter.
- `npm run build`: frontend production build.
- `docker compose up --build`: complete curated workflow.
- One opt-in live GPT-5.6 smoke test after H2.
- Manual demo rehearsal: normal case, competing-hypothesis response, and abstention.
- Secret scan and `git diff --check` before public push.

No Playwright, coverage target, broad frontend unit suite, load test, or managed-database test blocks Phase 1.

## Submission Deliverables

- Working public or local-Docker demo matching video.
- Public/shareable repository with install and test commands.
- English README describing product, constraints, and Codex collaboration.
- Public YouTube demonstration under three minutes with audio.
- Devpost category, description, testing instructions, repository URL, and `/feedback` Session ID.
- Dated commits showing work occurred during submission period.

## Phase 2: Expansion After Submission-Critical Demo

Only start after Phase 1 code, Docker flow, video path, and Devpost draft are secure:

1. Curated plus controlled image upload and PII confirmation.
2. Teacher accept/revise/reject workflow.
3. Reviewed-result aggregate.
4. Cloud SQL PostgreSQL and Alembic migrations.
5. Idempotency, authenticated tenants, durable audit events.
6. Broader test pyramid, observability, retention controls, and batch workflow.

## References

- [OpenAI Build Week official rules](https://openai.devpost.com/rules)
- [OpenAI Images and vision](https://developers.openai.com/api/docs/guides/images-vision)
- [OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs)
- [Google Cloud Run container deployment](https://docs.cloud.google.com/run/docs/deploying)
- [Configure Cloud Run secrets](https://docs.cloud.google.com/run/docs/configuring/services/secrets)
