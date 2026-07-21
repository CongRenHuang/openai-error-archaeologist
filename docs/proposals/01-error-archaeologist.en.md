# Proposal A (Lead Pick): Error Archaeologist — A Diagnostic-Hypothesis Engine for Math Mistakes

> One-liner: **The AI doesn't guess what's in a student's head. It proposes candidate root causes, points to the exact step where the evidence is, then generates a differentiating experiment with a verifiable prediction to converge on a diagnosis.**
>
> Version 7 (2026-07-14, English translation): Revised per the literature-audit report (`docs/res/codex/reference-revision-report.md`). P0: 66% → corrected to NCES 46%; ESSER/CALDER/Hanushek split into independent sources; Russell +0.13 SD precisely qualified (pretest-controlled, misconception outcome not significant); "no state returned to 2019" claim removed; "scale-driven decay" reworded as a descriptive comparison; API retention section adds the 30-day abuse-log boundary. P1: named-competitor claims downgraded to category-level generalizations; reference list rebuilt as 13 clickable entries; Tennessee/Texas policy examples demoted to an appendix; new Evidence-limits column added. The v6 educational-measurement framing (slip vs. mal-rule, `error_disposition`, Correct Answer Trap, four reviewer Q&As) is preserved.

---

## Part 1: Is This Problem Worth Solving

## 1. The Problem

When teachers grade math homework, they see *that* an answer is wrong, not *why*. The same wrong answer can hide multiple different root causes — for example `-3(x - 2) = -3x - 6` could come from a distribution misconception, a sign-rule error, carelessness, or a transcription slip — and each needs a completely different response. Both the screening layer (who's falling behind) and the remediation layer (tutoring/course placement) already have scalable tools; the diagnosis layer in between does not have an equally scalable tool (limitations of existing approaches are covered in the comparison table in §3).

**Honest premise**: a single piece of homework **cannot uniquely identify** the root cause — the same error can come from a misconception (mal-rule), carelessness (slip), a transcription error, a misread question, or input/transcription noise. So this product does not make an "AI verdict." It makes "AI proposes candidate hypotheses + evidence for each hypothesis + one differentiating experiment with a prediction," and the teacher confirms while the student's next answer helps converge.

**Measurement boundaries (basic educational-diagnosis hygiene)**:

| Phenomenon | Meaning | What the product should do |
| --- | --- | --- |
| Reproducible error rule (mal-rule) | Systemic misconception | Candidate hypotheses + differentiating experiment |
| Isolated missed step / overload (slip) | Not a misconception | Prioritize `likely_slip`; don't trigger remediation labels |
| Transcription / image ambiguity | Measurement error, not cognitive | `insufficient_evidence`, abstain |
| Final answer correct but process wrong | Correct Answer Trap | Diagnose steps first; can still surface candidates (see §4) |

This isn't a retreat — it's a more scientifically honest and more trustworthy product stance than "AI mind-reading."

## 2. Verifiability: Scale and Severity of the Pain Point (Principle 01)

**Scale**

- NAEP 2024 (the US official "Nation's Report Card"): 8th-grade math — **28% at or above Proficient, 61% at or above Basic, so 39% below Basic** [1]. Note: NAEP Proficient is a high bar and **is not equivalent to "on grade level"** — this proposal **does not** use the misleading framing "72-73% not proficient"; the roughly 40% below Basic is the actual target population for remediation policy.
- National 8th-grade math average showed **no significant change** from 2022 to 2024, but is **still below 2019**; the flat national average masks a **K-shaped divergence** — higher-percentile scores recovering, lower-percentile scores declining, the gap widening [1][2]. The product serves the diagnosis layer ("why is this specific student stuck") not the national-average narrative.
- Economic cost: Hanushek and Strauss estimate pandemic learning loss could cost the US roughly **$31T in present-value GDP** over the 21st century — this is a **model estimate derived from the relationship between skills and long-run growth, not money already spent** [11]. Recommendation: cut this number from the demo — it's huge, far from a teacher's actual workflow, and mainly invites questions about the model's assumptions (§11).

**Severity — governments have already shown willingness to pay, but the main intervention doesn't scale**

- The US Congress appropriated **$189.5B** across three rounds of ESSER for K-12 pandemic response and recovery [9].
- NCES School Pulse Panel: **46%** of public schools offered high-dosage tutoring (HDT) in the 2023-24 school year [10].
- HDT programs cost roughly **$1,200-$2,000/student/year**; MDRC's eight-site randomized study estimates a pooled tutoring effect of **0.06-0.09 SD** [4]; CALDER's eight-district study found that even some of the stronger tutoring programs reach only about **1-2%** of eligible students [3].
- That pooled effect is **lower than** the 0.18-0.40 SD found in two large Chicago RCTs by Guryan et al. [5] — different settings, samples, years, and designs — this is a **descriptive comparison only**; we do not claim "scale" is the sole causal driver.

**Educational-measurement evidence — stated with its actual boundaries**

- Russell, O'Dwyer & Miranda (2009): a four-arm cluster-randomized pilot with 905 students and 44 teachers. **Controlling for pretest**, the full intervention group (diagnostic report + targeted materials) scored **0.13 SD higher** (p<.05) on algebra ability than the group that received **only** an ability report; the group difference on the **misconception outcome was not statistically significant**; the authors themselves frame the overall result as preliminary evidence [6][12].
- **What this study supports**: preliminary evidence that "integrating diagnostic information with targeted materials may improve learning." **What it does not support**: that LLM-based handwriting diagnosis works; nor can it isolate the effect of the diagnostic report on its own. This proposal cites it as support for the **intervention hypothesis**, not as a claim of replicating its effect. Our own evidence of effectiveness comes from the blind evaluation in §10.

**Evidence limits table** — external research validates the direction, not this product's performance:

| Column | Content | Source |
| --- | --- | --- |
| Problem evidence | NAEP pressure at lower percentiles; tutoring cost and coverage bottlenecks | [1][2][3][4][9][10] |
| Intervention precedent | Preliminary positive evidence for "diagnosis + targeted materials" | [5][6] |
| Our eval | This product's diagnostic capability: §10 blind test + holdout, demo publicly includes failure cases | Self-produced |

## 3. Demand-Driven: The World Before LLMs (Principle 04)

| Generation | Existing US solution | Limitation |
| --- | --- | --- |
| Human labor | High-dosage tutoring (1-on-1 to 1-on-2, diagnosis happens in the tutor's head) | $1,200-2,000/student/year; even effective programs reach only about 1-2% of eligible students [3][4] |
| Rule/item-bank based | Diagnostic assessments: DAAS (10-12 multiple-choice testlets) [6]; commercial adaptive assessment (i-Ready, NWEA MAP) | DAAS-type tools rely on pre-written items, misconception distractors, and repeated-pattern responses; some commercial adaptive-assessment products mainly report skill/domain-level results (item design and output details for named products **have not been individually verified against official technical documentation**); both struggle to affordably handle a student's open-ended handwritten derivation |
| Traditional ML | Cognitive diagnosis models (CDM/DINA) [7], ITS (Cognitive Tutor / ASSISTments) | Depend on a pre-designed Q-matrix and closed item formats; ITS only diagnoses within its own system — it never sees a student's everyday paper homework |

**What LLMs add**:

1. **Handle free-form handwritten derivations** — an input format existing solutions can't affordably process.
2. **No pre-authored distractor bank needed** — a new unit doesn't require expert design cycles for answer choices; marginal cost is significantly lower than the item-bank model (exact cost comparison to be validated in production).
3. **Evidence localization** — anchoring candidate root causes to "the exact step the student wrote," which requires semantic understanding of the derivation process.
4. **On-the-fly differentiating-experiment generation** — for whatever pair of candidate hypotheses shows up in this instance, generate a question whose predicted answers differ. An item bank can't pre-anticipate which candidate pair will occur.

**Day-1 gate**: GPT-5.6 is the competition-required model. First thing on Day 1: get the officially announced model ID and API access, and put it in config — do not assume the string `gpt-5.6` exists. The pipeline has no coupling to a specific model version (§5).

**Market positioning: not another grading tool** (extension of Principle 04)

| Category | Representative examples (type) | Optimizes for | How we differ |
| --- | --- | --- | --- |
| Assessment/grading-oriented | Handwritten-math grading and partial-credit tools (IntelGrader, Ed.ai, GradingPal, etc.) | Administrative efficiency: scores, error tags, worksheets | We **don't assign grades**; output is a falsifiable hypothesis + differentiating experiment, optimizing **teaching decision quality** |
| Student-facing solve-it apps | Photo-to-solution apps | Steps and answers | We're built for teacher decisions; the demo does not present "copy the answer" as its main path |
| Diagnosis/tutoring platforms | Eedi, Glimmer, etc. | Misconceptions + intervention, some with RCTs/knowledge graphs | We focus on **everyday paper-based, open-ended handwritten derivation** + **a differentiating experiment with a verifiable prediction**; we do not claim RCT-validated efficacy in 8 days |

Honesty: Eedi and similar products have a longer validation track record. Named products in the table are **category examples only** — capability descriptions are **category-level generalizations, and individual product capabilities have not been individually verified against official technical documentation**. If Devpost keeps named comparisons, official documentation must be added first; otherwise switch to anonymous category language. What 8 days can deliver = blind test + human-in-the-loop + a demoable closed loop; copy will **not** say "scientifically validated."

## 4. The Solution: Hypothesis → Evidence → Differentiating Experiment → Confirmation

1. Teacher uploads a photo of a student's handwritten homework (demo main path uses pre-validated samples + live upload as a bonus).
2. **Reasoning pipeline (Correct Answer Trap guard)**: first checks step-to-step mathematical validity/logical coherence, then compares against the final answer — it does **not** skip process-checking just because the final answer is correct. An answer-correct-but-process-wrong case can still surface candidate mal-rules (included in demo and blind test).
3. The model visually understands the handwritten derivation and returns a **fixed structured output**:

```json
{
  "observed_error": "Expanded -3(x-2) as -3x-6",
  "final_answer_correct": false,
  "input_uncertainty": null,
  "diagnosis_status": "multiple_plausible_hypotheses",
  "error_disposition": "candidate_mal_rule",
  "candidate_misconceptions": [
    {
      "id": "NEG_DIST",
      "label": "Negative sign not distributed to the second term",
      "evidence_steps": ["step_2"],
      "predicted_response_pattern": "Would answer -4b-12 for -4(b-3)"
    },
    {
      "id": "DIST_FIRST_ONLY",
      "label": "Only distributes to the first term inside the parentheses",
      "evidence_steps": ["step_2"],
      "predicted_response_pattern": "Would answer -4b-3 for -4(b-3)"
    }
  ],
  "alternative_explanation": "Could also be a transcription slip (only this one step is wrong, all other steps correct)",
  "verification_experiment": {
    "question": "Expand -4(b - 3)",
    "correct_answer": "-4b + 12",
    "predictions": [
      { "candidate_id": "NEG_DIST", "predicted_answer": "-4b - 12" },
      { "candidate_id": "DIST_FIRST_ONLY", "predicted_answer": "-4b - 3" }
    ],
    "convergence_rule": "Answer matches a candidate's prediction -> that candidate is supported; matches correct_answer -> both candidates downweighted, leaning toward slip; matches neither -> abstain, route to teacher for verbal confirmation"
  },
  "abstain_reason": null
}
```

**`error_disposition` heuristic** (explicitly a heuristic, not a calibrated threshold; evaluable within 8 days):

| Value | Trigger condition (summary) | Downstream |
| --- | --- | --- |
| `likely_slip` | Only 1 step wrong and surrounding steps are self-consistent; or the error pattern matches no taxonomy mal-rule | Does not enter the "misconception" bucket of the heatmap; recommend teacher verbal confirmation, may offer a low-cost redo |
| `candidate_mal_rule` | Error maps to the taxonomy; or the same rule is reproducible across steps | Surfaces candidates + differentiating experiment |
| `ambiguous` | Both slip and mal-rule are plausible | Must run differentiating experiment; if no discriminating question can be generated -> abstain |
| `insufficient_input` | Image is blurry, symbol ambiguity would change the math (2/z, x/multiplication sign), or steps are missing to the point reasoning is impossible | `diagnosis_status=insufficient_evidence`, forced abstain |

**Input-uncertainty rule**: if the model cannot parse, with reasonable confidence, a symbol whose reading would change the mathematical meaning, it must set `input_uncertainty` describing what's missing — it is **forbidden** to force out a misconception label (avoids hallucinated diagnoses).

4. **Differentiating experiment** (this product's core innovation — not "generate one more problem," but "generate an experiment with a verifiable prediction"):
   - Before generating, predicted answers are derived for every candidate pair; **if two candidates predict the same answer, regenerate the question; if no discriminating question can be generated, abstain.**
   - After the student answers, the diagnosis is updated per the convergence rule — this makes the AI's reasoning falsifiable by the next piece of data.
5. Teacher confirms/rejects with one click -> only after confirmation does it enter the class heatmap and downstream handling.
6. **Post-diagnosis teacher action (closes the loop even with zero generation)**: after confirmation, the UI surfaces an actionable next step — (a) class-level aggregate, "N% share this misconception, spend 10 minutes next period teaching X"; (b) reuse the differentiating question as a formative check; (c) optional P2 template practice. Free-form microlesson generation is **not** a required demo condition.
7. Targeted practice (P2): time permitting, a confirmed root cause triggers **template-based** practice; no promise of real-time free-form item generation (correctness and curriculum alignment of generated items are not proven within 8 days).

**Three-value diagnosis status** (replaces v4's per-candidate confidence bands — per-candidate grading was self-contradictory with the "no competing explanation" definition, and self-reported LLM confidence is uncalibrated):

- `single_supported_hypothesis`: only one candidate has supporting evidence
- `multiple_plausible_hypotheses`: multiple plausible candidates -> triggers the differentiating experiment
- `insufficient_evidence`: image/derivation insufficient or `input_uncertainty` set -> abstain, state what's missing
- No numeric confidence is ever displayed; numeric calibration stays on the roadmap (requires a calibration set).

**Depth of Codex + GPT-5.6 usage** (Build Week judging criterion ①, official language focuses on depth of Codex collaboration): multimodal handwriting understanding (not an OCR pipeline bolted on — it understands the derivation relationship between steps) x abductive reasoning (working backward from a wrong result to candidate rules) x structured output (fixed schema, aggregable, evaluable) x **differentiating-experiment generation** (with prediction derivation and self-checking) x abstain mechanism. "Hypothesis -> evidence -> experiment -> convergence" is a complete reasoning loop, not a single prompt call. On the build side: the whole pipeline, eval harness, and UI were built with Codex as an agentic workflow collaborator, with the README documenting the collaboration process (maps to judging criterion ①).

## 5. Reusability: Decoupling the Framework from the AI (Principle 02)

```
+-----------------------------------------------------------+
|  Error-Archaeology Pipeline (domain-agnostic core)         |
|  Artifact -> Candidate hypotheses -> Evidence localization  |
|  -> Differentiating experiment -> Teacher confirmation      |
|  -> Aggregation                                              |
+-----------------------------------------------------------+
       ^ pluggable            ^ pluggable         ^ pluggable
   AI reasoning engine    Taxonomy config      Input/output adapter
  (model ID is config)   (JSON, per domain)   (MVP: photo upload only)
```

**Pull the LLM out and the framework still holds**: "collect artifacts -> attribute candidate errors -> discriminate/verify -> aggregate into a teaching decision" can be executed by a human — it is, in fact, the standard error-analysis workflow in special education and tutoring. LLMs are what make this methodology scalable for the first time.

Cross-domain reuse (coding-bug misconceptions, first-language-transfer errors in language learning, clinical reasoning in medical education) is an **architectural inference + roadmap item** — not demoed, not claimed as proven, within the MVP.

## 6. Universality: Deployment Flexibility (Principle 03)

- Taxonomy = a JSON config file: switching state standards (Common Core <-> Texas TEKS) = swapping a file — but **swapping taxonomy is not the same as swapping customers**; a real customer migration also touches input format, privacy agreements, and SIS integration.
- Honest current state: the adapter and schema contract are **not yet defined**, and the amount of code change needed to onboard a new customer has **not been validated with any real customer**. What the MVP delivers is two decoupling facts — "taxonomy externalized as config" and "model ID externalized as config" — everything else (LMS export, LTI 1.3/OneRoster/Ed-Fi, Clever/ClassLink SSO) is roadmap.
- Positioned as a **diagnosis-layer add-on** to existing assessment systems (i-Ready, NWEA MAP), not a replacement: they screen "who's behind," we answer "why" — procurement-wise this is an add-on purchase, not a system swap.

## 7. Commercial Value: Three Roles in the Value Chain (Principle 05)

| Role | Who | Notes |
| --- | --- | --- |
| **User** | Teacher (daily use), student (receives differentiating questions and practice) | Users don't pay |
| **Payer** | School district / state government (hypothesis, to be validated via interviews) | Budget context: Title I-A is roughly $18.4B [8] — this **only shows payer budget exists; it does not show this product qualifies, is procurable, or is desired**. The procurement path is a hypothesis, to be strengthened via buyer interviews. State-level tutoring-fund examples (Tennessee/Texas) are secondhand policy summaries, and Tennessee's funding is actually for 4th-grade **literacy** tutoring, not math — demoted to a policy appendix, not part of the core argument |
| **Incumbent** | Tailwind: tutoring/coaching businesses, curriculum publishers (sell-the-shovel strategy). Headwind: diagnostic-assessment vendors (i-Ready/NWEA) — expect them to push back on validity/reliability grounds; the direct response is the blind test in §10 | |

**We don't prove market size in 8 days — we prove real demand.** Four structured interviews (20 min each), validating User and Payer separately:

- Validate **User**: 2 US Grade 7-9 math teachers (how long do they spend analyzing wrong answers each week? how do they group students? which step of the flow would they trust enough to confirm?) + 1 tutor coordinator (does a diagnostic report change how tutoring resources are allocated?).
- Validate **Payer**: 1 district administrator or tutoring-program buyer (what's the procurement decision process? what evidence gets something into a pilot?) — teacher interviews can only validate User; Payer must be asked separately.
- Output: quotable interview notes go into the Devpost submission (with permission for public citation); the demo can say "Reviewed by one US middle-school math educator and one mathematics-education researcher," and will **not** say "scientifically validated."

---

## Part 2: Why Us

## 8. Feasibility Boundary: Current / Target / Acceptance (Principle 06)

> Honest statement: as of 2026-07-14, the repo contains only proposal documents — **no component has been started.** The table below is a delivery contract, not a status report.

| Component | Current | Demo target (7/21) | Acceptance test (how to prove it's done) |
| --- | --- | --- | --- |
| Photo -> candidate hypotheses + evidence + disposition + abstain | Not started | Real, working: 12 algebra samples (incl. CAT) + live upload as a bonus | Repeatable eval harness: 100% schema-valid rate, evidence-step accuracy, disposition agreement rate, correct abstain/CAT triggering |
| Differentiating experiment (prediction + convergence) | Not started | Real, working | Every candidate pair has distinct predicted answers (otherwise abstain); 10 sets manually verified for prediction logic |
| Teacher confirm/reject flow | Not started | Real, working | End-to-end click flow, no mocked API; rejected diagnoses do not enter the heatmap |
| Class heatmap | Not started | Semi-real: synthetic class distribution, clearly labeled in demo | Chart driven by real diagnosis outputs + data explicitly marked synthetic |
| Image not persisted / auto-deleted | Not started | Real, working | Image deleted immediately after processing; storage check comes back empty |
| Targeted practice | Not started | P2: template-based, dropped if time runs short | — |
| Accounts / LMS integration / batch scanning / multi-subject | Not building | Listed on roadmap | — |

Scope: a single middle-school algebra unit (one-variable linear equations + the distributive property), taxonomy of 8-12 nodes. 2 people x half-time x 8 days; every demo claim will be stated as real or simulated, out loud.

## 9. Failure Cost and Risk Design (Principle 07)

Consequences of misdiagnosis: a teacher acts on a wrong diagnosis -> wasted teaching time, students mislabeled, **alert fatigue** (treating a slip as a misconception). This is a medium-risk domain; safeguards:

- **Hypothesis, not verdict**: output is always `candidate_misconceptions[]` + `alternative_explanation` + `error_disposition`; UI copy never uses an assertive sentence like "this student's root cause is."
- **Teacher-in-the-loop / educator co-pilot**: only after the teacher confirms/rejects does a result enter the heatmap or trigger practice for a student. The AI is staff, not a judge; the teacher retains veto power.
- **Abstain mechanism**: unclear image, ambiguous symbols, insufficient derivation, or a differentiating experiment that can't generate distinguishable predictions -> no forced diagnosis, show what's missing instead.
- **Mandatory evidence**: every candidate hypothesis must carry `evidence_steps` a teacher can verify in 10 seconds — a diagnosis that can be falsified is a responsible diagnosis.
- **Correct Answer Trap**: steps take priority over the final answer; the blind test includes "answer correct, process wrong" samples (§10).
- **Slip vs. mal-rule**: `error_disposition` heuristic + differentiating experiment; a single isolated error defaults to *not* entering the misconception heatmap unless the teacher confirms it.
- Technical risk: unstable handwriting recognition -> demo main path uses a pre-validated sample set; concerns about "just a prompt wrapper" -> externalized taxonomy + published blind-test data (§10).

## 10. Data Availability and Validity Verification (Principle 08)

**Data sources**

| Need | Source | Access path |
| --- | --- | --- |
| Problems | NAEP publicly released items (public domain) + self-authored | Already public, zero cost [1] |
| Handwritten error samples | **Team-produced realistic samples** (see blind test design below) | Achievable within 8 days; no real student data needed |
| Taxonomy | Published algebra-misconception literature (DAAS, three concepts [6]; error-analysis research) | Public literature, cited in README |
| Real student data | Not used in the MVP | Production stage: district agreement + de-identification, roadmap |

**Compliance statement**: we do not say "no FERPA/COPPA risk." Correct framing: **the demo only allows synthetic or de-identified samples; uploading real student data is explicitly forbidden; at the application layer, images are not persisted — deleted automatically after processing (listed as an acceptance item in §8; if it can't be implemented, the claim is cut).** If a reviewer uploads a real assignment with a name on it, the system shows a de-identification reminder.

**Platform-layer boundary** [13]: OpenAI API inputs/outputs are by default not used for model training, but the platform may by default retain abuse-monitoring logs for **up to 30 days**; Zero Data Retention applies only to approved organizations and eligible endpoints. Application-layer "delete after processing" is **not** the same as end-to-end zero retention — copy will **not** claim zero retention.

**Blind test set design (30-36 samples, category totals reconcile)**:

| Category | Count |
| --- | --- |
| Error cases (covering 8-10 misconception types, incl. "same wrong answer, different cause" pairs) | 16-20 |
| Correct cases (no error) | 4 |
| Insufficient-information cases (blurry image / missing steps / ambiguous symbols) | 4 |
| Careless/transcription cases (slip) | 4 |
| **Correct Answer Trap** (final answer correct, process wrong) | 2-4 |
| **Total** | **30-36** |

- Annotation independence: two team members independently label and seal the answer key first, before any prompt tuning; the **holdout (>=8 samples, completely untouched during tuning) is separately blind-labeled by an outside math teacher** — self-labeling and self-testing by the same team isn't independent enough.
- **Repeatable eval harness** (not called "deterministic" — model output isn't necessarily deterministic): records model snapshot, prompt version, and temperature/reasoning config, so the same version can be rerun and compared; reports include misconception-classification macro-F1, evidence-step accuracy, abstain accuracy, `error_disposition` agreement with annotations, CAT case recall, teacher confirmation time, and failure cases.
- Even at 75% accuracy, honestly showing errors and safety mechanisms is more credible than "every built-in sample passes."

## 11. Demo Visibility: How We'll Pitch It (Principle 09)

The output is an **interactive website** (public Vercel URL, judges can try it themselves). 3-minute main path:

1. **0:00** Hook: two pieces of handwritten homework side by side with the **same wrong answer, different reasoning** — "same wrong answer, completely different cause"; optionally a third card showing a **correct-answer-wrong-process** case (Correct Answer Trap).
2. **0:20** Upload a homework photo.
3. **0:50** Model proposes **two candidate root-cause hypotheses** + `error_disposition`, each with its evidence highlighted at the student's step 2.
4. **1:20** Generates a **differentiating experiment**: one question with each candidate's predicted answer shown side by side — "if he answers this way, it's cause one; that way, cause two."
5. **1:50** Student's answer -> matches one prediction -> that candidate is supported, the other ruled out.
6. **2:15** Teacher confirms with one click -> class heatmap + **next-period action**: "40% of the class shares this misconception, spend 10 minutes next period on it" + the differentiating question is reusable.
7. **2:40** Show **holdout blind-test, abstain, CAT, and slip** cases — including cases the model got wrong, presented honestly.

Impact narrative uses "teacher interviews + blind-test data + time saved," and downplays the $31T figure. 2 minutes of judge interaction: click through remaining samples, upload their own photo, look at the abstain column and the reject flow.

Maps to the four judging criteria: technical implementation (candidate hypotheses + evidence localization + structured output + differentiating experiment + abstain), design (complete teacher decision flow), impact (interviews + blind-test data + time saved), creativity (the AI doesn't hand down a verdict — it proposes a falsifiable hypothesis, then converges via an experiment with a prediction).

## 12. Defensibility Strategy (Principle 10)

Honest premise: **at the end of 8 days we have no built-in moat** — the blind test set is only 30-36 samples, not a strong moat. What follows is a defensibility **strategy** (how a moat could accumulate with usage), not existing assets:

1. **Confirmation-data flywheel (strategy)**: every teacher confirm/reject is one labeled data point; the blind test set is the seed of an evaluation asset that can grow into a private calibration/eval set as deployment expands.
2. **Domain know-how encoding (in progress)**: converting misconception literature into an **executable taxonomy** (8-12 nodes; optionally with `prerequisite_of` edges) + differentiating-experiment generation with a discriminability check — this is a cross-disciplinary skill (educational measurement x engineering) with a higher replication barrier than a prompt.
3. **Workflow lock-in (strategy)**: sitting in the gap between "screening (i-Ready) -> **diagnosis** -> remediation (tutoring/course placement)," with both ends acting as upstream/downstream data.
4. The model itself is not the moat — the model layer is swappable via config (§5); value accrues in the framework, the eval set, and confirmation data.

**Not built in 8 days, and not written up as an existing moat**: full-subject Graph-RAG, multi-model ensembles, QLoRA fine-tuning. If mentioned in copy at all, it's a single roadmap sentence: "in production, taxonomy prerequisite edges could be expanded into graph retrieval; a small classifier could be added for cross-checking" — this does **not** occupy demo compute or narrative.

## 13. Eight-Day Milestones (reordered P0 -> P2)

> Current state: the repo only has documents — already a day behind. **v7 is the literature revision; documentation work stops here. No more long-form writing — building starts today.**

| Priority | Deliverable | Date |
| --- | --- | --- |
| — | **Day-1 gate**: confirm GPT-5.6's official model ID + API access; Next.js scaffold | 7/14 |
| P0 | 12 algebra samples + fixed structured output (disposition/evidence_steps/abstain/CAT) + repeatable eval harness | 7/14-15 |
| P0 | Full teacher flow: pick sample/upload -> view candidate causes -> check evidence -> confirm/reject -> class aggregation + next-period action | 7/16-17 |
| P1 | Differentiating experiment: prediction derivation + discriminability check + post-answer convergence | 7/17-18 |
| P1 | Blind test set of 30-36 (incl. 2-4 CAT; independent sealed annotation + external teacher blind-labeled holdout) + 4 interviews (parallel, owned by PM) | 7/14-19 |
| P2 | Template-based targeted practice (only if time allows) | 7/19 |
| — | Feature freeze the night of 7/19; demo video + Devpost + README on 7/20; submit 7/21 12:00 PDT | 7/20-21 |

**Ongoing discipline**: daily commits + retained Codex session logs — this simultaneously satisfies both the in-window work evidence needed under the New & Existing Work clause (the repo existed before 7/13 but contained only planning docs) and the `/feedback` Codex Session ID submission requirement.

Resource allocation: 60% product and reliable demo, 20% blind test and eval, 10% interviews, 10% academic reviewer outreach and Devpost copy. Stop chasing an academic reviewer if there's no response within 24 hours — don't let a credential hunt delay the product.

## 14. Reviewer Pressure Q&A (rapid-fire)

Four categories of pointed questions drawn from an external deep-review pass; the pitch deck and Devpost FAQ use the same set of answers.

**Q1: How do you avoid hallucinated diagnoses given ambiguous handwriting / symbol misreads (2 vs. z, x vs. multiplication sign)?**

A: Multimodal understanding, not a standalone OCR pipeline; any ambiguity that would change the math triggers `input_uncertainty` + `insufficient_evidence` abstain, stating exactly which cell is unclear. Demo main path uses pre-validated samples; live upload demonstrates abstaining, which is worth more credit than guessing.

**Q2: How do you distinguish carelessness (slip) from a systemic misconception (mal-rule)?**

A: `error_disposition` heuristic (an isolated single-step error -> `likely_slip`; maps to taxonomy / reproducible -> `candidate_mal_rule`) + convergence via the differentiating experiment. The blind test includes 4 slip samples. We do not claim a perfect threshold exists; teacher confirmation is the final gate, which prevents alert fatigue.

**Q3: FERPA/COPPA and whether data is used for training?**

A: The demo uses **only** synthetic or de-identified samples; uploading real student PII is explicitly forbidden; at the application layer, images are not persisted after processing (§8 acceptance item). OpenAI API inputs/outputs are by default not used for model training, but the platform may by default retain abuse-monitoring logs for up to 30 days; ZDR is limited to approved organizations and eligible endpoints [13] — so we **do not claim** end-to-end zero retention. Production district deployments would go through a separate DPA/agreement process — that's roadmap, not something we pretend is already compliance-certified in 8 days.

**Q4: What about the quality and curriculum alignment of the post-diagnosis remediation content?**

A: The MVP closes the loop at the teacher-decision level (grouping, what to teach next period, reusing the differentiating question) — it does **not** depend on free-form item generation. P2 is template-based practice only. The correctness and TEKS/CCSS alignment of freely generated items is a production-quality concern; we neither promise nor demo it as a main-path capability within 8 days.

---

## References (US-converged)

1. NCES. _2024 NAEP Mathematics Assessment: Grade 8 National Trends_. <https://www.nationsreportcard.gov/reports/mathematics/2024/g4_8/national-trends/?grade=8> (28% at/above Proficient, 61% at/above Basic, 39% below Basic; national average still below 2019)
2. National Assessment Governing Board. _10 Takeaways from the 2024 NAEP Results_. <https://www.nagb.gov/powered-by-naep/the-2024-nations-report-card/10-takeaways-from-2024-naep-results.html> (national average not recovered; divergence between high and low percentiles)
3. Carbonari, M. V., et al. _Impacts of Academic Recovery Interventions on Student Achievement in 2022-23_. CALDER Working Paper No. 303-0724. <https://caldercenter.org/publications/impacts-academic-recovery-interventions-student-achievement-2022-23> (some effective tutoring programs reach only about 1-2% of eligible students)
4. Bhatt, M. P., et al. (2025). _Personalized Learning Initiative Interim Report: Findings from 2023-24_. MDRC. <https://www.mdrc.org/work/publications/personalized-learning-initiative-interim-report> (pooled tutoring effect 0.06-0.09 SD; roughly $1,200-$2,000/student)
5. Guryan, J., et al. (2023). "Not Too Late: Improving Academic Outcomes among Adolescents." _American Economic Review_, 113(3), 738-765. <https://doi.org/10.1257/aer.20210434> (two large Chicago RCTs: 0.18-0.40 SD)
6. Russell, M., O'Dwyer, L. M., & Miranda, H. (2009). "Diagnosing Students' Misconceptions in Algebra: Results From an Experimental Pilot Study." _Behavior Research Methods_, 41(2), 414-424. <https://doi.org/10.3758/BRM.41.2.414> (905 students, 44 teachers; controlling for pretest, full intervention vs. ability-report-only control +0.13 SD; misconception outcome not significant; cited as support for the intervention hypothesis, not a guarantee of effect)
7. Kuo, B.-C., Chen, C.-H., & de la Torre, J. (2018). "A Cognitive Diagnosis Model for Identifying Coexisting Skills and Misconceptions." _Applied Psychological Measurement_. <https://doi.org/10.1177/0146621617722791> (official publication year 2018; 2017 was the online-first/DOI year)
8. Skinner, R. R., & Angert, J. (2026). _FY2025 State Grants Under Title I-A of the Elementary and Secondary Education Act_. CRS R48953. <https://www.congress.gov/crs-product/R48953> (Title I-A roughly $18.4B; budget-existence context only, not proof of procurability)
9. U.S. Department of Education. _Education Stabilization Fund: ESSER_. <https://covidreliefdata.ed.gov/> (three rounds of ESSER totaling $189.5B)
10. NCES. _Forty-Six Percent of Public Schools Provided High-Dosage Tutoring During 2023-24_. School Pulse Panel. <https://nces.ed.gov/learn/press-release/about-one-quarter-public-schools-reported-lack-focus-or-inattention-students-had-severe-negative> (46% of public schools offered HDT in 2023-24)
11. Hanushek, E. A., & Strauss, B. (2024). "United States: The Size and Variation of the Pandemic Learning Losses." <https://link.springer.com/chapter/10.1007/978-3-031-69284-0_13> ($31T is a model estimate of 21st-century present-value GDP)
12. IES. _Bridging the Gap: Applying Algebra Cognition Research to Develop and Validate Diagnostic Classroom Algebra Testlet_. <https://ies.ed.gov/use-work/awards/bridging-gap-applying-algebra-cognition-research-develop-and-validate-diagnostic-classroom-algebra>
13. OpenAI. _Data Controls in the OpenAI Platform_. <https://platform.openai.com/docs/models/default-usage-policies-by-endpoint>; _Business Data Privacy_. <https://openai.com/business-data/> (inputs/outputs not used for training by default; abuse-monitoring logs retained up to 30 days; ZDR requires approval)

Policy-background appendix (not part of the core reference list): Moon, T. (2026). _How Districts Can Fund High-Quality Tutoring Now That ESSER Money Is Gone_. The 74 — a secondhand policy summary; Tennessee's $500/student figure is for 4th-grade **literacy** tutoring, not math.
