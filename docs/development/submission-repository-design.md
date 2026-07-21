# Submission Repository Design

**Date:** 2026-07-22  
**Status:** Approved for planning  
**Goal:** Make the public repository immediately understandable to judges while preserving credible research evidence and Codex development trace.

## Decision Summary

Current live demo already proves the core product idea: GPT-5.6 Luna produces evidence-linked hypotheses, SymPy verifies a differentiating probe, student response changes hypothesis support, and ambiguous input can abstain. No new backend, upload, authentication, teacher dashboard, aggregate, or managed database work belongs before submission.

One small interaction improvement remains: each hypothesis card gets a **Use this response** button. It fills the probe input with that hypothesis's predicted answer without submitting automatically. Judge still clicks **Update evidence**, making the evidence change explicit while removing algebra-typing friction.

## Public Repository Structure

Target structure:

```text
README.md
LICENSE
AGENTS.md
Dockerfile
docker-compose.yml
pyproject.toml
uv.lock
backend/
frontend/
pitch-video/
docs/
  development/
    demo-design.md
    implementation-plan.md
    submission-repository-design.md
  research/
    evidence-base.md
  submission/
    checklist.md
```

Keep runnable application, deployment files, video source, MIT license, repository guidance, three approved development-trace documents, curated research evidence, and submission checklist.

Delete from `main`:

- `CLAUDE.md`, superseded by current `AGENTS.md`;
- `docs/briefing/`, whose planning-only claims conflict with built status and whose video role is replaced by `pitch-video/`;
- all proposal files except `docs/proposals/01-error-archaeologist.en.md`;
- `docs/res/`, containing raw generated notes, copied HTML, intermediate audits, and overlapping research drafts;
- obsolete documentation-fix plan.

Git history remains audit trail for deleted drafts and raw research. No archive directory remains on `main`.

## Source-of-Truth Hierarchy

1. `README.md` describes current product, live status, setup, tests, deployment, and limitations.
2. `docs/research/evidence-base.md` supports research claims with primary-source links and separates verified facts from hypotheses.
3. `docs/development/` records approved architecture decisions and Codex implementation trace.
4. Git history preserves deleted raw notes and earlier drafts.

Move `docs/proposals/01-error-archaeologist.en.md` to `docs/research/evidence-base.md`. Preserve government statistics, primary-source citations, target-user research, market reasoning, privacy constraints, and feasibility analysis. Remove or rewrite stale planning-only status, unbuilt capability descriptions presented as current behavior, and submission claims contradicted by deployed code. Add last-reviewed date and explicit evidence limits: public sources establish problem scale and constraints, not product demand, diagnostic accuracy, learning impact, or willingness to pay.

## README Contract

README leads with outcome, not setup:

1. Product claim, Education track, live demo URL, and current status: built, deployed, technically verified.
2. Sixty-second judge path through live analysis, competing hypotheses, verified probe, response update, and abstention.
3. Target user and problem context, with concise NAEP framing linked to evidence base and no efficacy or demand overclaim.
4. Current architecture: React/Vite, FastAPI, OpenAI Responses API with `gpt-5.6-luna` and medium reasoning, SymPy verification, disposable SQLite, and three endpoints.
5. Codex collaboration: dated implementation commits, concrete Codex contributions, human decisions, and links to development trace.
6. Docker quick start, native development, automated checks, and Cloud Run deployment.
7. Honest boundaries and post-demo roadmap.

Add public YouTube URL only after user supplies verified public link. No placeholder or unpublished-video claim.

## UI Interaction

Each diagnosed candidate card renders a button labeled **Use this response** near its predicted answer. Clicking calls existing `setProbeResponse(candidate.predicted_answer)`. Button appears only while probe response form is active; after evidence update, candidate cards remain read-only. Existing server API and verifier remain unchanged.

Frontend test verifies candidate selection places predicted answer into probe-response input or, if test remains state-machine-only, extract a small pure selection helper and test exact returned value. Production build must remain green.

## Safety and Concurrent Work

- Never modify, stage, delete, or overwrite any `pitch-video/**` path during this work; the entire subtree is active concurrent user work.
- Delete only tracked documentation paths listed in this design after confirming exact targets.
- Keep `.env`, API keys, generated frontend output, Python environment, and `node_modules` ignored.
- Do not remove `feat/demo` worktree while its ignored `.env` contains local secret material.
- Stage commits by explicit path; never use `git add -A` during concurrent video work.

## Verification

Before completion:

- live demo and public repository return HTTP 200;
- all retained README links resolve locally or publicly;
- `uv run pytest -q` reports 15 or more passing backend tests;
- `node --test frontend/src/workflow.test.ts` passes;
- `npm --prefix frontend run build` succeeds;
- deleted paths no longer appear in `rg --files`;
- `git diff --check` passes;
- Git status shows only known active video edits outside this work.

## Success Criteria

A judge opening the repository can find live demo, understand core idea, reproduce judge flow, identify model/verifier boundary, inspect research basis, review Codex development trace, run tests, and see limitations without navigating stale or contradictory documents.
