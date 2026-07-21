# Error Archaeologist

Error Archaeologist turns one handwritten algebra mistake into two evidence-linked hypotheses and a mathematically verified follow-up question. Student response changes hypothesis support; ambiguous evidence can make the system abstain. It never claims to read a student's mind.

- **Track:** OpenAI Build Week 2026 · Education
- **Status:** built, publicly deployed, and technically verified on curated synthetic samples.
- **Live demo:** <https://error-archaeologist-hs2orfr2la-de.a.run.app>

## Judge It in 60 Seconds

1. Open the live demo and select **Negative distribution**.
2. Click **Examine this mistake**; live GPT-5.6 Luna analysis usually takes 20–45 seconds.
3. Inspect one observed transition, two hypotheses, and the **Verified with symbolic algebra** probe.
4. Click **Use this response** under either hypothesis, then **Update evidence**.
5. Confirm the selected response changes hypothesis support. Try **Ambiguous handwriting** to see abstention.

## Why This Product

The same wrong answer can reflect a reproducible misconception, a slip, transcription noise, or ambiguous handwriting. Error Archaeologist treats diagnosis as hypothesis testing: model proposes explanations, mathematics verifies whether the next question can distinguish them, and new evidence can change support.

Initial user is a Grade 7–9 intervention teacher or tutor. NAEP 2024 reports 39% of US eighth graders below Basic in mathematics. That establishes problem scale, not demand for this product or proof of learning impact. See [research evidence and limits](docs/research/evidence-base.md).

## Current Product Loop

1. Choose one of three repository-owned synthetic handwriting artifacts.
2. OpenAI Responses API returns structured steps, evidence, and two candidate explanations.
3. SymPy independently rejects a probe when candidate predictions collide or equal the correct answer.
4. Student response updates candidate support without proving mental state.
5. Ambiguous evidence, invalid probe math, or unmatched response can abstain.

Only synthetic samples are supported. No upload endpoint exists; demo never accepts real student data.

## Architecture

```text
React/Vite browser
    -> FastAPI: three JSON endpoints
        -> OpenAI Responses API + Structured Outputs
           gpt-5.6-luna · medium reasoning
        -> SymPy restricted-grammar verification
        -> disposable SQLite analysis state
```

One multi-stage Docker image serves compiled frontend and API:

- `GET /api/v1/samples`
- `POST /api/v1/analyses`
- `POST /api/v1/probe-response`

See [demo design](docs/development/demo-design.md), [implementation plan](docs/development/implementation-plan.md), and [submission repository design](docs/development/submission-repository-design.md).

## Codex Collaboration

Codex supported evidence auditing, scope reduction, architecture, test-first backend implementation, symbolic-verifier safeguards, React UI construction, Docker packaging, debugging, and Cloud Run deployment. Human decisions selected intervention teachers as initial users, rejected verdict language, kept SymPy independent from model output, cut managed infrastructure, chose GPT-5.6 Luna with medium reasoning, and approved submission-critical scope.

| Evidence | Dated commit |
| --- | --- |
| Demo scaffold | `82e02e0` |
| Verified algebra fixtures | `ee56224` |
| Diagnosis API and persistence | `a0e7123` |
| Complete React demo flow | `e912ad3` |
| Luna medium-reasoning integration | `10afffc` |
| Feature integration into `main` | `3d214db` |

Repository existed before the submission period as planning/research documents only. Runnable application code began during the submission period; dated history separates prior research from implementation. Devpost submission separately includes the required `/feedback` Session ID from the core build thread.

## Run Locally

Requirements: Docker Desktop with Compose.

```bash
docker compose up --build
```

Open <http://localhost:8000>. Default fixture mode is deterministic and visibly labeled for reproducible testing.

For live analysis:

```bash
cp .env.example .env
# Add OPENAI_API_KEY locally. Never commit .env.
docker compose --env-file .env up --build
```

Live mode fails explicitly when key/model access is unavailable; no silent fallback exists.

## Native Development and Tests

Requires Python 3.13, uv, Node 24, and npm.

```bash
uv sync --python 3.13
npm --prefix frontend install
MODEL_ADAPTER=fake uv run pytest -q
node --test frontend/src/workflow.test.ts
npm --prefix frontend run build
```

Automated tests use fake adapter and no API budget. Live integration requires explicit API key and usage approval.

## Cloud Run

Current service runs one instance with ephemeral SQLite:

```bash
gcloud run deploy error-archaeologist \
  --source . \
  --project openai-error-archaeologist \
  --region asia-east1 \
  --allow-unauthenticated \
  --max-instances 1 \
  --set-env-vars OPENAI_MODEL=gpt-5.6-luna,OPENAI_REASONING_EFFORT=medium,MODEL_ADAPTER=openai,DATABASE_URL=sqlite:////tmp/demo.db \
  --set-secrets OPENAI_API_KEY=openai-api-key:latest
```

API key lives in Secret Manager. SQLite state can reset on revision restart; this is demo continuity, not production durability.

## Evidence and Boundaries

- Three curated synthetic artifacts are not representative classroom data.
- Technical tests do not establish diagnostic accuracy or learning impact.
- Public research establishes problem scale and constraints, not product demand or willingness to pay.
- No upload, authentication, teacher review, aggregate, Cloud SQL, or field validation exists yet.
- OpenAI API inputs/outputs are not used for training by default; abuse-monitoring retention and production privacy controls require separate review.

Post-demo roadmap: controlled de-identified upload, teacher accept/revise/reject, reviewed aggregates, durable authenticated storage, external holdout evaluation, educator workflow study, and pilot economics.

Submission checklist: [docs/submission/checklist.md](docs/submission/checklist.md).
