# Error Archaeologist

<img src="frontend/public/error-archaeologist-logo.png" alt="Error Archaeologist logo" width="120" />

Error Archaeologist turns one handwritten algebra mistake into two evidence-linked hypotheses and a mathematically verified follow-up question. Student response changes hypothesis support; system can abstain. It never claims to read a student's mind.

Built for OpenAI Build Week 2026, Education track.

## Run Demo

Requirements: Docker Desktop with Compose.

```bash
docker compose up --build
```

Open <http://localhost:8000>. Default `fixture` mode is deterministic and visibly labeled in UI; it exists for reproducible testing and interface review.

For live GPT-5.6 vision analysis:

```bash
cp .env.example .env
# Add OPENAI_API_KEY locally. Never commit .env.
docker compose --env-file .env up --build
```

`.env.example` already sets `MODEL_ADAPTER=openai`. Live mode fails explicitly when key or model access is unavailable; no silent model fallback exists.

## Demo Flow

1. Select one of three repository-owned synthetic handwriting samples.
2. GPT-5.6 returns structured steps, evidence, and candidate misconceptions.
3. SymPy independently rejects probes whose predicted answers collide or match correct answer.
4. Enter student response to update evidence.
5. Ambiguous handwriting, invalid math, or unmatched response produces abstention.

Only synthetic samples are supported. Demo stores structured analysis in disposable SQLite state and never stores real student data.

## Architecture

```text
React/Vite browser
    -> FastAPI: three JSON endpoints
        -> OpenAI Responses API + Structured Outputs
        -> SymPy verification and response matching
        -> disposable SQLite analysis state
```

One multi-stage Docker image serves compiled frontend and API. API surface:

- `GET /api/v1/samples`
- `POST /api/v1/analyses`
- `POST /api/v1/probe-response`

See [hackathon demo design](docs/superpowers/specs/2026-07-22-error-archaeologist-demo-design.md) for boundaries and [implementation plan](docs/superpowers/plans/2026-07-22-error-archaeologist-demo.md) for recorded execution.

## Native Development

Python 3.13, uv, Node 24, and npm are required.

```bash
uv sync --python 3.13
npm --prefix frontend install
npm --prefix frontend run build
MODEL_ADAPTER=fake uv run uvicorn backend.app.main:app --reload
```

Run checks:

```bash
MODEL_ADAPTER=fake uv run pytest backend/tests -v
node --test frontend/src/workflow.test.ts
npm --prefix frontend run build
docker compose config
git diff --check
```

Fake adapter requires no secret. Live integration requires explicit `OPENAI_API_KEY` and API usage approval.

## Cloud Run

SQLite on Cloud Run is ephemeral. This command deploys demo with one instance; it does not create production durability.

```bash
gcloud run deploy error-archaeologist \
  --source . \
  --allow-unauthenticated \
  --max-instances 1 \
  --set-env-vars OPENAI_MODEL=gpt-5.6-luna,OPENAI_REASONING_EFFORT=medium,MODEL_ADAPTER=openai,DATABASE_URL=sqlite:////tmp/demo.db \
  --set-secrets OPENAI_API_KEY=openai-api-key:latest
```

Create `openai-api-key` in Secret Manager first. Stop Cloud Run troubleshooting after 20 minutes; local Docker remains supported judging path.

## Safety Boundaries

- Synthetic artifacts only; no upload endpoint.
- Hypotheses always show exact evidence step.
- SymPy accepts only restricted algebra grammar with single-letter variables.
- Unclear input and non-discriminating probes abstain.
- API key stays server-side and outside images, logs, Git, and frontend bundles.
- Fake output is labeled `Fixture mode — deterministic test output`.

## Codex Collaboration

Codex supported evidence auditing, scope reduction, architecture, test-first backend implementation, symbolic-verifier safeguards, UI construction, and container packaging. Human decisions set target user, rejected verdict language, kept SymPy as independent boundary, cut managed infrastructure, and approved submission-critical scope. Dated commits distinguish research/design from runnable code. Devpost submission must include `/feedback` Session ID for this core build thread.

## Current Limitations

Curated samples are not representative classroom data. SQLite state can reset. Technical tests do not establish diagnostic accuracy or learning impact. Teacher review, uploads, aggregates, Cloud SQL, authentication, and field validation remain post-demo work.
