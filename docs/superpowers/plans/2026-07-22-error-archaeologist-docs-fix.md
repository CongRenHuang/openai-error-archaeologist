# Error Archaeologist Documentation Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make four Error Archaeologist documents truthful, evidence-bounded, technically credible, commercially coherent, and usable in a three-minute reviewer pitch.

**Architecture:** Keep `01-error-archaeologist.en.md` as detailed product source, derive concise submission copy in `README-error-archaeologist.md`, derive timed pitch copy in `error-archaeologist-briefing.md`, and keep competition choices in `00-strategy.md`. Separate researched, designed, built, and validated claims throughout.

**Tech Stack:** Markdown, Mermaid, Git, `rg`, `git diff --check`

## Global Constraints

- Modify only four named product documents plus this plan.
- Do not claim unimplemented components exist.
- Use “supports” or “changes hypothesis ranking,” never “proves a root cause.”
- Treat public statistics as problem and market context, not product demand or efficacy evidence.
- Keep US middle-school algebra as beachhead; global reuse remains roadmap.
- Keep synthetic/de-identified data and OpenAI API retention boundaries explicit.

---

### Task 1: Establish source-of-truth product architecture

**Files:**
- Modify: `docs/proposals/01-error-archaeologist.en.md`

- [x] **Step 1:** Add status legend separating `RESEARCHED`, `DESIGNED`, `BUILT`, and `VALIDATED`; state current repository evidence.
- [x] **Step 2:** Replace model-only pipeline with multimodal parse, deterministic algebra verification, taxonomy candidates, template-constrained probe generation, symbolic discriminability verification, response matching, teacher review, and de-identified aggregation.
- [x] **Step 3:** Narrow initial user to Grade 7–9 intervention teachers and tutor coordinators; name champion, buyer, beneficiary, and workflow.
- [x] **Step 4:** Add beachhead business sequence: intervention-provider platform fee plus usage, embedded API, then district licensing; define cost and validation metrics without inventing prices.
- [x] **Step 5:** Replace small-sample macro-F1 emphasis with perception, math validation, hypothesis recall, probe validity, selective-risk, teacher-time, and transfer-signal layers.

### Task 2: Make submission README truthful and investable

**Files:**
- Modify: `docs/proposals/README-error-archaeologist.md`

- [x] **Step 1:** Add prominent current-status section and remove unsupported past-tense build claims.
- [x] **Step 2:** Rewrite workflow language so a follow-up response supplies evidence rather than proving diagnosis.
- [x] **Step 3:** Add concise target-user, planned architecture, validation, business-model, and defensibility sections derived from proposal.
- [x] **Step 4:** Keep verified public statistics with explicit limits; retain privacy boundary.

### Task 3: Rebuild three-minute reviewer briefing

**Files:**
- Modify: `docs/briefing/error-archaeologist-briefing.md`

- [x] **Step 1:** Replace eleven-slide plan with six timed slides totaling 2:55: hook, problem, workflow, safety/validation, architecture/business, close.
- [x] **Step 2:** Remove untimed surrounding-slide assumption and all “proves/decides” language.
- [x] **Step 3:** Add “built in Taiwan using traceable US public evidence, validated remotely with US educators” as research-method proof, not apology.

### Task 4: Correct competition strategy confidence

**Files:**
- Modify: `docs/proposals/00-strategy.md`

- [x] **Step 1:** Mark participant and category-density observations as dated snapshots or hypotheses.
- [x] **Step 2:** Lower feasibility confidence until working evidence exists; add product truth, architecture, validation, and commercial gates.
- [x] **Step 3:** Mark historical schedule as audit record after submission deadline instead of active plan.

### Task 5: Verify documentation

**Files:**
- Verify: all four modified documents

- [x] **Step 1:** Run `rg -n '(proves which|student.*decides|How we built it|we built|built in from day one)'` and expect no unsupported matches.
- [x] **Step 2:** Run `git diff --check` and expect no output.
- [x] **Step 3:** Inspect `git diff --stat`, headings, status labels, architecture flow, business sequence, and six-slide timing.
- [x] **Step 4:** Commit documentation fixes separately from baseline commit.
