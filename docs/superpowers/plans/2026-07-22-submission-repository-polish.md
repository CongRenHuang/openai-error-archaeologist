# Submission Repository Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the public repository judge-ready by reducing demo friction, removing contradictory documentation, preserving a curated evidence base and Codex trace, and rewriting README around current deployed behavior.

**Architecture:** Keep backend and deployment behavior unchanged. Add one pure frontend helper and one button per hypothesis, reorganize retained documentation into explicit research/development/submission roles, then replace README with a live-demo-first project guide. Execute from an isolated `feat/submission-polish` worktree because `pitch-video/**` contains concurrent user work.

**Tech Stack:** React 19, TypeScript 7, Node test runner, Vite 8, FastAPI, Python 3.13, pytest, OpenAI Responses API, GPT-5.6 Luna, SymPy, Docker, Google Cloud Run, Markdown.

## Global Constraints

- Never modify, stage, delete, copy, or deploy any uncommitted `pitch-video/**` path from the main worktree.
- Create an isolated worktree with `superpowers:using-git-worktrees` before Task 1; branch name: `feat/submission-polish`.
- Keep backend API, SQLite schema, verifier, model configuration, and Cloud Run service shape unchanged.
- Keep `OPENAI_MODEL=gpt-5.6-luna` and `OPENAI_REASONING_EFFORT=medium`.
- Never expose `.env`, `OPENAI_API_KEY`, image bytes, prompts, or model output in Git/logs.
- Stage only explicit paths. Never run `git add -A` or `git add .`.
- Public claims must separate technical verification from diagnostic accuracy, learning impact, demand, and willingness to pay.
- Do not add a video link until user supplies a public YouTube URL.
- Git history preserves deleted raw notes; do not create `docs/archive/`.

---

### Task 1: Click-to-use hypothesis response

**Files:**
- Modify: `frontend/src/workflow.test.ts`
- Modify: `frontend/src/workflow.ts`
- Modify: `frontend/src/App.tsx`
- Modify: `frontend/src/styles.css`

**Interfaces:**
- Consumes: `Candidate.predicted_answer: string` from `frontend/src/types.ts`.
- Produces: `responseForCandidate(candidate: Pick<Candidate, "predicted_answer">): string`; diagnosed candidate cards call it to populate existing `probeResponse` state.
- Leaves `POST /api/v1/probe-response` request and response contracts unchanged.

- [ ] **Step 1: Write failing helper test**

Update imports and append this test in `frontend/src/workflow.test.ts`:

```ts
import { phaseForAnalysis, phaseForUpdate, responseForCandidate } from "./workflow.ts";

test("candidate prediction becomes probe response", () => {
  assert.equal(
    responseForCandidate({ predicted_answer: "-4*x-12" }),
    "-4*x-12",
  );
});
```

- [ ] **Step 2: Run test and verify RED**

Run:

```bash
node --test frontend/src/workflow.test.ts
```

Expected: FAIL because `responseForCandidate` is not exported.

- [ ] **Step 3: Implement minimal pure helper**

In `frontend/src/workflow.ts`, extend type import and add:

```ts
import type { AnalysisStatus, Candidate, UpdateStatus } from "./types";

export function responseForCandidate(
  candidate: Pick<Candidate, "predicted_answer">,
): string {
  return candidate.predicted_answer;
}
```

- [ ] **Step 4: Run helper test and verify GREEN**

Run:

```bash
node --test frontend/src/workflow.test.ts
```

Expected: 4 tests pass.

- [ ] **Step 5: Wire explicit candidate buttons**

In `frontend/src/App.tsx`, import helper:

```ts
import {
  phaseForAnalysis,
  phaseForUpdate,
  responseForCandidate,
  type Phase,
} from "./workflow";
```

Replace candidate prediction paragraph with:

```tsx
<p>Would predict <code>{candidate.predicted_answer}</code></p>
{phase === "diagnosis" && (
  <button
    className="candidate-response"
    type="button"
    onClick={() => setProbeResponse(responseForCandidate(candidate))}
    aria-label={`Use response predicted by hypothesis ${String.fromCharCode(65 + index)}`}
  >
    Use this response
  </button>
)}
```

Add to `frontend/src/styles.css` after `.candidate p`:

```css
.candidate-response {
  margin-top: 18px;
  padding: 8px 0;
  color: var(--teal);
  background: transparent;
  border: 0;
  border-bottom: 1px solid currentColor;
  font: inherit;
  font-size: .78rem;
  font-weight: 800;
}
.candidate-response:hover,
.candidate-response:focus-visible { color: var(--oxide); }
```

- [ ] **Step 6: Verify frontend behavior**

Run:

```bash
node --test frontend/src/workflow.test.ts
npm --prefix frontend run build
```

Expected: 4 tests pass; Vite production build exits 0.

- [ ] **Step 7: Commit UI improvement**

```bash
git add frontend/src/workflow.test.ts frontend/src/workflow.ts frontend/src/App.tsx frontend/src/styles.css
git commit -m "feat(ui): add one-click probe responses"
```

---

### Task 2: Curate evidence and remove documentation noise

**Files:**
- Move: `docs/proposals/01-error-archaeologist.en.md` → `docs/research/evidence-base.md`
- Move: `docs/superpowers/specs/2026-07-22-error-archaeologist-demo-design.md` → `docs/development/demo-design.md`
- Move: `docs/superpowers/plans/2026-07-22-error-archaeologist-demo.md` → `docs/development/implementation-plan.md`
- Move: `docs/superpowers/specs/2026-07-22-submission-repository-design.md` → `docs/development/submission-repository-design.md`
- Move: `docs/h0-submission-draft-checklist.md` → `docs/submission/checklist.md`
- Delete: `CLAUDE.md`
- Delete: `docs/briefing/Precision_Math_Diagnosis.pdf`
- Delete: `docs/briefing/error-archaeologist-briefing.md`
- Delete: `docs/proposals/00-strategy.md`
- Delete: `docs/proposals/01-error-archaeologist.md`
- Delete: `docs/proposals/README-error-archaeologist.md`
- Delete: entire tracked `docs/res/` subtree
- Delete: `docs/superpowers/plans/2026-07-22-error-archaeologist-docs-fix.md`
- Delete after execution: this plan file, preserved in Git history

**Interfaces:**
- Produces stable documentation links: `docs/research/evidence-base.md`, `docs/development/demo-design.md`, `docs/development/implementation-plan.md`, `docs/development/submission-repository-design.md`, and `docs/submission/checklist.md`.
- README and AGENTS in Task 3 consume these paths.

- [ ] **Step 1: Confirm deletion targets and video isolation**

Run:

```bash
git status --short
rg --files docs/briefing docs/proposals docs/res docs/superpowers | sort
```

Expected: isolated worktree has no uncommitted `pitch-video/**` paths; every deletion target is listed exactly.

- [ ] **Step 2: Create target directories and move retained documents**

Run:

```bash
mkdir -p docs/development docs/research docs/submission
git mv docs/proposals/01-error-archaeologist.en.md docs/research/evidence-base.md
git mv docs/superpowers/specs/2026-07-22-error-archaeologist-demo-design.md docs/development/demo-design.md
git mv docs/superpowers/plans/2026-07-22-error-archaeologist-demo.md docs/development/implementation-plan.md
git mv docs/superpowers/specs/2026-07-22-submission-repository-design.md docs/development/submission-repository-design.md
git mv docs/h0-submission-draft-checklist.md docs/submission/checklist.md
```

Expected: five retained documents exist at target paths.

- [ ] **Step 3: Remove approved noise by exact tracked paths**

Run `git rm` only for these approved targets:

```bash
git rm CLAUDE.md
git rm docs/briefing/Precision_Math_Diagnosis.pdf docs/briefing/error-archaeologist-briefing.md
git rm docs/proposals/00-strategy.md docs/proposals/01-error-archaeologist.md docs/proposals/README-error-archaeologist.md
git rm -r docs/res
git rm docs/superpowers/plans/2026-07-22-error-archaeologist-docs-fix.md
```

Expected: removed files remain recoverable through Git history; `pitch-video/**` is untouched.

- [ ] **Step 4: Rewrite evidence-base header and status**

Replace lines 1–9 of `docs/research/evidence-base.md` with:

```markdown
# Error Archaeologist Research Evidence Base

> Last reviewed: 2026-07-22  
> Product status: **BUILT and publicly deployed as a constrained technical demo.**  
> Evidence status: external problem and policy claims are **RESEARCHED**; automated tests and live smoke tests establish technical behavior only. Diagnostic accuracy, classroom efficacy, educator demand, and willingness to pay remain unvalidated.

This document preserves traceable sources and product reasoning behind Error Archaeologist. Public data establishes problem scale, market structure, and privacy constraints. It cannot establish daily educator workflow, product demand, diagnostic accuracy, learning impact, or willingness to pay.

---
```

Delete obsolete Day-1 model-access paragraph. Replace category comparison wording with current boundary:

```markdown
| Student-facing solve-it apps | Photo-to-solution apps | Steps and answers | Current demo uses curated synthetic artifacts and supports teacher-facing hypothesis testing, not answer copying |
```

Label expanded upload/review/aggregate flow as target workflow:

```markdown
**Current demo boundary:** curated sample selection, multimodal structured analysis, evidence-linked candidates, SymPy-verified probe, response evidence update, and abstention are built. Upload, teacher accept/revise/reject, durable aggregate, authentication, and classroom validation are not built.

**Target workflow after validation:**
```

- [ ] **Step 5: Replace feasibility table with current evidence**

Replace Section 8 introduction/table with:

```markdown
## 8. Feasibility Boundary: Current / Target / Acceptance (Principle 06)

| Component | Current evidence | Next target | Acceptance evidence still required |
| --- | --- | --- | --- |
| Curated multimodal analysis | BUILT: three synthetic handwriting samples use GPT-5.6 Luna Structured Outputs | External sealed artifacts | Transcription and evidence-localization benchmark |
| Deterministic algebra verification | BUILT and unit-tested for restricted one-variable expressions | Broader expression grammar | Independent known-valid/invalid transition suite |
| Candidate hypotheses | BUILT: two evidence-linked candidates | Versioned taxonomy and external holdout | Expected hypothesis in top two; unsupported-hypothesis rate |
| Differentiating probe | BUILT: SymPy rejects colliding or correct-answer predictions | Larger probe template set | Verified-probe rate and published failures |
| Response evidence update | BUILT and API-tested | Repeated probe policy | Match accuracy and abstention behavior |
| Ambiguity abstention | BUILT for curated ambiguous sample | Natural handwriting ambiguity | Selective-risk results across abstention thresholds |
| Teacher review and aggregate | NOT BUILT | Accept/revise/reject audit flow | Rejected events excluded; review-time study |
| Upload, identity, durable storage | NOT BUILT | Privacy-reviewed pilot architecture | DPA, access controls, retention/deletion tests |

Current scope remains one middle-school algebra behavior. Technical verification does not establish classroom diagnostic accuracy or learning impact.
```

- [ ] **Step 6: Replace stale demo/compliance claims**

Use these exact current statements:

```markdown
**Compliance statement:** public demo exposes only repository-owned synthetic samples and has no upload endpoint. It stores structured analysis in disposable SQLite state; it does not accept real student data. Production use still requires access controls, retention/deletion policy, district agreements, subprocessor review, and security assessment.
```

Replace Section 11 introduction and numbered path with:

```markdown
## 11. Current Demo and Submission Visibility (Principle 09)

The public Cloud Run demo implements one constrained, testable loop:

1. Select a repository-owned synthetic handwriting sample.
2. GPT-5.6 Luna returns normalized steps, an observed transition, and two evidence-linked hypotheses.
3. SymPy verifies that the generated probe has distinct candidate predictions and that neither equals the correct answer.
4. A selected response changes which hypothesis gains support.
5. Ambiguous input can abstain instead of forcing a label.

The demo does not implement upload, teacher review, class aggregation, authentication, or field validation. Submission copy must not imply otherwise.
```

Delete obsolete Section 13 implementation schedule/gates; development trace now lives in `docs/development/implementation-plan.md`. Update reviewer Q3 answer to:

```markdown
A: The public demo exposes only repository-owned synthetic artifacts and has no upload endpoint. OpenAI API inputs/outputs are not used for training by default, but abuse-monitoring logs may be retained for up to 30 days; ZDR is limited to approved organizations and eligible endpoints [13]. Production district deployment requires a separate DPA, access controls, deletion policy, subprocessor review, and security assessment.
```

- [ ] **Step 7: Scan evidence base for contradictions and broken internal paths**

Run:

```bash
rg -n "documents only|not a working application|Until deployed|planned public demo|original eight-day schedule|docs/res/|docs/proposals/|docs/superpowers/" docs/research/evidence-base.md
```

Expected: no matches. Preserve all 15 numbered primary-source references.

- [ ] **Step 8: Verify target documentation inventory**

Run:

```bash
rg --files docs | sort
```

Expected retained paths only:

```text
docs/development/demo-design.md
docs/development/implementation-plan.md
docs/development/submission-repository-design.md
docs/research/evidence-base.md
docs/submission/checklist.md
docs/superpowers/plans/2026-07-22-submission-repository-polish.md
```

- [ ] **Step 9: Commit research and repository structure**

Stage only moved/edited/deleted documentation paths shown by `git status --short`, never `pitch-video/**`:

```bash
git add -u CLAUDE.md docs
git add docs/development docs/research docs/submission
git commit -m "docs: curate submission evidence and trace"
```

---

### Task 3: Rewrite README and repository guidance

**Files:**
- Replace: `README.md`
- Modify: `AGENTS.md`

**Interfaces:**
- README links to live Cloud Run, `docs/research/evidence-base.md`, three `docs/development/` trace files, and `docs/submission/checklist.md`.
- AGENTS defines retained repository structure and current commands for future contributors.

- [ ] **Step 1: Replace README with current-state copy**

Replace `README.md` with this content:

````markdown
# Error Archaeologist

Error Archaeologist turns one handwritten algebra mistake into two evidence-linked hypotheses and a mathematically verified follow-up question. Student response changes hypothesis support; ambiguous evidence can make the system abstain. It never claims to read a student's mind.

**OpenAI Build Week 2026 · Education**  
**Status:** built, publicly deployed, and technically verified on curated synthetic samples.  
**Live demo:** <https://error-archaeologist-hs2orfr2la-de.a.run.app>

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
````

- [ ] **Step 2: Update AGENTS documentation map**

Replace lines describing repository documents with:

```markdown
- `docs/research/evidence-base.md` contains curated claims, primary-source links, and explicit evidence limits.
- `docs/development/` contains approved architecture and Codex implementation trace.
- `docs/submission/checklist.md` contains human submission gates.
- `pitch-video/` contains demo-video source; treat active media work as user-owned and never stage it incidentally.

Keep new product evidence in `docs/research/evidence-base.md`; keep implementation decisions in `docs/development/`. Avoid raw model research dumps and generated web captures on `main`.
```

- [ ] **Step 3: Verify README facts and links**

Run:

```bash
rg -n "research/design only|not a working|docs/proposals|docs/res|docs/superpowers|docs/briefing" README.md AGENTS.md
test -f docs/research/evidence-base.md
test -f docs/development/demo-design.md
test -f docs/development/implementation-plan.md
test -f docs/development/submission-repository-design.md
test -f docs/submission/checklist.md
```

Expected: no stale-path/status matches; every `test -f` exits 0.

- [ ] **Step 4: Commit README and repository guidance**

```bash
git add README.md AGENTS.md
git commit -m "docs: align README with live demo"
```

---

### Task 4: Final verification, integration, and deployment

**Files:**
- Delete: `docs/superpowers/plans/2026-07-22-submission-repository-polish.md` after all steps are copied into completed Git history
- No application source changes expected

**Interfaces:**
- Produces merged/pushed `main`, updated public Cloud Run static UI, public GitHub repository, and clean retained document inventory.
- Preserves all concurrent user `pitch-video/**` working-tree changes.

- [ ] **Step 1: Run complete verification in isolated worktree**

```bash
UV_CACHE_DIR=/private/tmp/error-archaeologist-uv-cache uv run pytest -q
node --test frontend/src/workflow.test.ts
npm --prefix frontend run build
git diff --check
git status --short
```

Expected: at least 15 backend tests pass, 4 frontend tests pass, Vite build exits 0, no whitespace errors, and worktree contains no uncommitted changes except this plan's final checkbox edits.

- [ ] **Step 2: Verify documentation inventory and prohibited stale claims**

```bash
rg --files docs | sort
rg -n "research and design only|documents only|not a working application|docs/proposals/|docs/res/|docs/briefing/" README.md AGENTS.md docs/research docs/development docs/submission
```

Expected: first command lists only approved retained docs plus this execution plan; second command returns no matches except historical wording quoted inside approved design documents.

- [ ] **Step 3: Remove transient cleanup plan and commit final plan state**

After all earlier tasks are committed, remove only this plan:

```bash
git rm docs/superpowers/plans/2026-07-22-submission-repository-polish.md
git commit -m "docs: finalize public repository structure"
```

The plan remains recoverable in preceding commits. Do not delete `docs/development/implementation-plan.md`.

- [ ] **Step 4: Integrate without touching active video work**

From main worktree, first run `git status --short`. Confirm every dirty path begins with `pitch-video/`. Then:

```bash
git merge --no-ff feat/submission-polish -m "merge: polish submission repository"
```

Expected: merge succeeds without modifying/staging active `pitch-video/**` changes. If main advanced during implementation, merge main into feature worktree first, resolve only non-video conflicts, rerun verification, then retry.

- [ ] **Step 5: Push merged main**

```bash
git push origin main
git rev-parse HEAD
git rev-parse origin/main
```

Expected: hashes match.

- [ ] **Step 6: Deploy updated static UI from clean isolated worktree**

Deploy from isolated worktree so uncommitted video audio/public assets never enter build source:

```bash
gcloud run deploy error-archaeologist \
  --source . \
  --project openai-error-archaeologist \
  --region asia-east1 \
  --allow-unauthenticated \
  --max-instances 1 \
  --set-env-vars OPENAI_MODEL=gpt-5.6-luna,OPENAI_REASONING_EFFORT=medium,MODEL_ADAPTER=openai,DATABASE_URL=sqlite:////tmp/demo.db \
  --set-secrets OPENAI_API_KEY=openai-api-key:latest \
  --quiet
```

Expected: new ready revision serves 100% traffic. Rollback target remains previous healthy revision if deployment or static UI fails.

- [ ] **Step 7: Run budget-safe production smoke tests**

Do not call `POST /api/v1/analyses`; live Luna behavior already passed and extra calls consume budget. Run:

```bash
curl --max-time 30 -fsS -o /dev/null -w '%{http_code}\n' https://error-archaeologist-hs2orfr2la-de.a.run.app/
curl --max-time 30 -fsS https://error-archaeologist-hs2orfr2la-de.a.run.app/api/v1/samples
curl --max-time 30 -fsS -o /dev/null -w '%{http_code}\n' https://github.com/CongRenHuang/openai-error-archaeologist
```

Expected: UI returns 200, samples return three items, repository returns 200.

- [ ] **Step 8: Report remaining human gates**

Report public demo URL, GitHub commit, test counts, deleted-doc policy, retained evidence/trace links, and unchanged video working paths. Remaining human actions: finish public YouTube upload, add video URL to README/Devpost, obtain `/feedback` Session ID, and submit.
