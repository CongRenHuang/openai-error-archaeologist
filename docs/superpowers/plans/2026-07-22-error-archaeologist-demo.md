# Error Archaeologist Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship one curated-sample algebra diagnosis demo with GPT-5.6 structured vision output, independent SymPy probe verification, abstention, and a Docker/Cloud Run path.

**Architecture:** React/Vite builds into one FastAPI container. FastAPI exposes three endpoints, delegates vision parsing to an OpenAI adapter, validates probe math with SymPy, and stores disposable analysis JSON in SQLite. Fake adapter powers deterministic tests; live adapter requires explicit key and opt-in.

**Tech Stack:** Python 3.13, uv, FastAPI, Pydantic, OpenAI Python SDK, SymPy, SQLAlchemy, pytest, React 19, TypeScript, Vite, Docker Compose, Cloud Run.

## Global Constraints

- Phase 1 uses three curated PNG samples; no upload or real student data.
- API surface is exactly `GET /api/v1/samples`, `POST /api/v1/analyses`, and `POST /api/v1/probe-response`.
- `OPENAI_API_KEY` stays server-side and absent from Git, logs, frontend, and Docker layers.
- Model defaults to `gpt-5.6`; no silent fallback.
- SymPy must reject colliding candidate predictions; uncertain or invalid results abstain.
- SQLite is disposable; public copy makes no durability claim.
- Preserve unrelated deletions under `docs/proposals/` and untracked `docs/res/web/competitor-landscape-math-diagnosis.md`; never stage them.
- Docker deployment gets 20 minutes maximum before local-Docker fallback.

---

## File Map

```text
.env.example                         documented local configuration
.gitignore                           secret, build, cache, DB exclusions
pyproject.toml                       Python dependencies and pytest config
backend/app/config.py                environment settings
backend/app/domain/models.py         stable API/model contracts
backend/app/domain/verifier.py       SymPy verification and evidence matching
backend/app/fixtures.py              curated sample catalog
backend/app/integrations/openai.py   fake/live model adapter boundary
backend/app/repository.py            disposable SQLite analysis repository
backend/app/service.py               orchestration, retries, abstention
backend/app/main.py                  three endpoints and static frontend
backend/scripts/generate_samples.py  deterministic PNG fixture generator
backend/tests/                       backend red/green tests
frontend/src/App.tsx                 complete four-state demo UI
frontend/src/styles.css              responsive visual treatment
frontend/src/types.ts                API contracts
frontend/package.json                frontend scripts and dependencies
frontend/vite.config.ts              local proxy and production build
Dockerfile                           multi-stage frontend/backend image
docker-compose.yml                   one-service local demo
README.md                            judge setup, architecture, Codex record
```

### Task 1: Environment and reproducible scaffold

**Files:**
- Create: `.gitignore`, `.env.example`, `pyproject.toml`, `frontend/package.json`, `frontend/tsconfig.json`, `frontend/vite.config.ts`
- Create: package markers under `backend/app/`, `backend/app/domain/`, and `backend/app/integrations/`

**Interfaces:**
- Produces: `uv run pytest`, `npm run build`, `Settings`, and ignored local `.env`/SQLite files.

- [x] **Step 1: Add secret-safe environment files**

```gitignore
.env
.venv/
.pytest_cache/
__pycache__/
*.py[cod]
*.db
demo-data/
frontend/node_modules/
frontend/dist/
```

```env
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.6
MODEL_ADAPTER=openai
DATABASE_URL=sqlite:///./demo.db
```

- [x] **Step 2: Add Python project with exact runtime dependencies**

```toml
[project]
name = "error-archaeologist"
version = "0.1.0"
requires-python = ">=3.13,<3.14"
dependencies = [
  "fastapi>=0.116,<1",
  "openai>=1.97,<2",
  "pydantic-settings>=2.10,<3",
  "sqlalchemy>=2.0,<3",
  "sympy>=1.14,<2",
  "uvicorn[standard]>=0.35,<1",
]

[dependency-groups]
dev = ["httpx>=0.28,<1", "pillow>=11,<12", "pytest>=8.4,<9"]

[tool.pytest.ini_options]
testpaths = ["backend/tests"]
pythonpath = ["."]
```

- [x] **Step 3: Add minimal Vite package and proxy configuration**

```json
{
  "scripts": {"dev": "vite", "build": "tsc -b && vite build"},
  "dependencies": {"react": "^19.2.8", "react-dom": "^19.2.8"},
  "devDependencies": {"@vitejs/plugin-react": "^6.0.3", "vite": "^8.1.5", "typescript": "^7.0.2", "@types/react": "^19.2.17", "@types/react-dom": "^19.2.3"}
}
```

`vite.config.ts` must use `plugins: [react()]`, proxy `/api` to `http://localhost:8000`, and output to `dist`.

- [x] **Step 4: Resolve environments and verify imports**

Run:

```bash
UV_CACHE_DIR=/private/tmp/open-ai-build-week-uv-cache uv sync --python 3.13
npm --prefix frontend install
UV_CACHE_DIR=/private/tmp/open-ai-build-week-uv-cache uv run python -c "import fastapi, openai, sqlalchemy, sympy"
```

Expected: all commands exit `0`; `uv.lock` and `frontend/package-lock.json` exist.

- [x] **Step 5: Commit scaffold only**

```bash
git add .gitignore .env.example pyproject.toml uv.lock frontend backend/app
git commit -m "build: scaffold demo application"
```

### Task 2: Curated fixtures and deterministic math core

**Files:**
- Create: `backend/app/domain/models.py`, `backend/app/domain/verifier.py`, `backend/app/fixtures.py`
- Create: `backend/scripts/generate_samples.py`, `backend/app/static/samples/*.png`
- Test: `backend/tests/test_verifier.py`, `backend/tests/test_fixtures.py`

**Interfaces:**
- Produces: `AnalysisResult`, `Probe`, `Candidate`, `EvidenceUpdate`, `verify_probe(result)`, and `match_response(result, response)`.

- [x] **Step 1: Write failing verifier tests**

```python
def test_probe_predictions_must_differ(analysis_result):
    analysis_result.probe.predictions[1].answer = analysis_result.probe.predictions[0].answer
    assert verify_probe(analysis_result) is False

def test_response_supports_matching_candidate(analysis_result):
    update = match_response(analysis_result, "-4*b - 12")
    assert update.status == "candidate_supported"
    assert update.supported_candidate_id == "NEG_DIST"

def test_unmatched_response_abstains(analysis_result):
    assert match_response(analysis_result, "banana").status == "abstained"
```

- [x] **Step 2: Run tests and confirm missing-module failure**

Run: `uv run pytest backend/tests/test_verifier.py -v`

Expected: FAIL because `backend.app.domain.verifier` does not exist.

- [x] **Step 3: Implement typed contracts and SymPy verification**

Use Pydantic literals for `status`; candidates contain `id`, `label`, `evidence_step`, and `predicted_answer`. `verify_probe` must sympify correct/predicted answers and require every prediction to differ from correct and each other. `match_response` uses symbolic equivalence and returns abstention for parse failure or no match.

```python
def equivalent(left: str, right: str) -> bool:
    try:
        transforms = standard_transformations + (implicit_multiplication_application,)
        left_expr = parse_expr(left, transformations=transforms)
        right_expr = parse_expr(right, transformations=transforms)
        return simplify(left_expr - right_expr) == 0
    except (SympifyError, TypeError, ValueError):
        return False
```

- [x] **Step 4: Generate three repository-owned PNG fixtures**

`generate_samples.py` uses Pillow with a bundled/system handwritten-style font when present and a default font fallback. It writes fixed 1200x800 white PNGs containing only algebra work. `fixtures.py` returns stable IDs `negative-distribution`, `first-term-only`, and `ambiguous-input` with public `/samples/<id>.png` URLs.

Run: `uv run python backend/scripts/generate_samples.py`

Expected: three PNG files exist and Pillow can reopen each.

- [x] **Step 5: Run focused tests and commit**

Run: `uv run pytest backend/tests/test_verifier.py backend/tests/test_fixtures.py -v`

Expected: all tests PASS.

```bash
git add backend/app/domain backend/app/fixtures.py backend/app/static/samples backend/scripts backend/tests
git commit -m "feat: add verified algebra fixtures"
```

### Task 3: Analysis service, SQLite, and three endpoints

**Files:**
- Create: `backend/app/config.py`, `backend/app/integrations/openai.py`, `backend/app/repository.py`, `backend/app/service.py`, `backend/app/main.py`
- Test: `backend/tests/test_api.py`, `backend/tests/test_service.py`

**Interfaces:**
- Consumes: contracts/verifier from Task 2.
- Produces: three HTTP endpoints and `ModelAdapter.analyze(sample_path) -> AnalysisResult`.

- [x] **Step 1: Write failing API tests with fake adapter**

```python
def test_complete_demo_flow(client):
    samples = client.get("/api/v1/samples").json()
    analysis = client.post("/api/v1/analyses", json={"sample_id": samples[0]["id"]})
    assert analysis.status_code == 200
    result = analysis.json()
    update = client.post("/api/v1/probe-response", json={"analysis_id": result["id"], "response": "-4*b-12"})
    assert update.status_code == 200
    assert update.json()["status"] == "candidate_supported"

def test_ambiguous_sample_abstains(client):
    response = client.post("/api/v1/analyses", json={"sample_id": "ambiguous-input"})
    assert response.json()["result"]["status"] == "abstained"
```

- [x] **Step 2: Run tests and confirm app-import failure**

Run: `uv run pytest backend/tests/test_api.py backend/tests/test_service.py -v`

Expected: FAIL because `backend.app.main` does not exist.

- [x] **Step 3: Implement adapters and orchestration**

`FakeModelAdapter` returns fixed valid results and abstains for `ambiguous-input`. `OpenAIModelAdapter` base64-encodes PNG and calls:

```python
response = client.responses.parse(
    model=settings.openai_model,
    input=[{
        "role": "user",
        "content": [
            {"type": "input_text", "text": ANALYSIS_PROMPT},
            {"type": "input_image", "image_url": f"data:image/png;base64,{encoded}", "detail": "high"},
        ],
    }],
    text_format=AnalysisResult,
)
```

It detects refusals/missing parsed output and never logs content. `AnalysisService` makes at most two attempts; it saves valid or abstained results and converts repeated verification failure to abstention.

- [x] **Step 4: Implement disposable repository and endpoints**

SQLAlchemy table stores UUID, sample ID, and serialized `AnalysisResult`. `create_all` runs at startup. Unknown sample returns `400`; missing analysis returns `400` with `RESET_REQUIRED`; adapter failure returns `503` with correlation ID. Mount sample images at `/samples`; mount React `dist` only when directory exists.

- [x] **Step 5: Run backend suite and commit**

Run: `MODEL_ADAPTER=fake uv run pytest backend/tests -v`

Expected: all tests PASS; test database stays under pytest temporary directory.

```bash
git add backend/app backend/tests
git commit -m "feat(api): add diagnosis workflow"
```

### Task 4: Judge-facing single-page frontend

**Files:**
- Create: `frontend/index.html`, `frontend/src/main.tsx`, `frontend/src/types.ts`, `frontend/src/App.tsx`, `frontend/src/styles.css`

**Interfaces:**
- Consumes: three Task 3 endpoints.
- Produces: selection → analysis → probe → evidence-update UI.

- [x] **Step 1: Define exact TypeScript API contracts**

Mirror Pydantic fields for `Sample`, `Candidate`, `Probe`, `AnalysisResult`, and `EvidenceUpdate`. Use discriminated `status` unions so abstention and error states render explicitly.

- [x] **Step 2: Implement one-component flow**

`App.tsx` loads samples on mount, posts selected sample, renders evidence/candidate cards and verified badge, posts probe response, and offers Reset. Buttons disable while requests run. Errors show correlation ID when present. No router, dashboard, settings, upload, review, or aggregate.

- [x] **Step 3: Add responsive visual system**

Use warm paper background, dark ink text, restrained rust accent, serif display face with system sans body, visible focus states, and mobile single-column layout. Include copy: “Hypothesis, not verdict”, “Verified with symbolic algebra”, and “System abstained” only in matching states.

- [x] **Step 4: Build and inspect served HTTP flow**

Run: `npm --prefix frontend run build`

Expected: TypeScript exits `0`; `frontend/dist/index.html` exists. Browser automation was unavailable in this environment, so human visual inspection remains part of H4 rehearsal.

- [x] **Step 5: Commit frontend**

```bash
git add frontend
git commit -m "feat(ui): add diagnostic demo flow"
```

### Task 5: Container, live gate, and submission handoff

**Files:**
- Create: `Dockerfile`, `docker-compose.yml`
- Modify: `README.md`, `AGENTS.md`

**Interfaces:**
- Produces: one local command, one Cloud Run image, judge testing instructions.

- [x] **Step 1: Add multi-stage container**

Node stage runs `npm ci` and `npm run build`. Python stage uses `python:3.13-slim`, copies uv binary from `ghcr.io/astral-sh/uv:0.11.15`, runs `uv sync --frozen --no-dev`, copies backend and frontend dist, then starts:

```dockerfile
CMD ["sh", "-c", "uv run uvicorn backend.app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
```

Compose exposes `8000`, mounts `demo-data:/data`, and sets defaults through `${NAME:-default}` interpolation so fake mode needs no `.env`. Live mode uses `docker compose --env-file .env up`; SQLite URL is `sqlite:////data/demo.db`.

- [x] **Step 2: Verify fake-mode container before any live call**

Run: `MODEL_ADAPTER=fake docker compose up --build`

Expected: `GET http://localhost:8000/api/v1/samples` returns three samples; full browser flow completes.

- [ ] **Step 3: Stop for H1/H2 and run one live smoke test**

Human creates `.env` locally with `OPENAI_API_KEY` and confirms API usage. Run one curated analysis only. Expected: structured diagnosis or explicit actionable failure; never expose key/output in command logs.

- [x] **Step 4: Update judge documentation**

README must include product story, video-link insertion during H4, `docker compose up --build`, fake-test command, live-key requirement, three-endpoint architecture, synthetic-data limitation, SQLite reset behavior, Codex collaboration, dated commit history, and Devpost testing steps. AGENTS commands must match actual scaffold.

- [x] **Step 5: Run final local gate**

```bash
uv run pytest backend/tests -v
npm --prefix frontend run build
docker compose config
git diff --check
git status --short
```

Expected: tests/build/config succeed; status contains only intended demo files plus preserved user changes.

- [ ] **Step 6: Commit and attempt Cloud Run for at most 20 minutes**

```bash
git add Dockerfile docker-compose.yml README.md AGENTS.md
git commit -m "build: package submission demo"
```

Human confirms GCP project. Deploy one public service with maximum one instance, `/tmp/demo.db`, `OPENAI_MODEL=gpt-5.6`, and Secret Manager-backed `OPENAI_API_KEY`. If blocked for 20 minutes, stop and record local Docker demo.

- [ ] **Step 7: H4 submission handoff**

Human records and uploads video, inserts public URL, obtains `/feedback` Session ID, checks repository access, completes Devpost fields, and submits by 07:15 GMT+8.
