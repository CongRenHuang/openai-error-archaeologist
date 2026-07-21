# Error Archaeologist Research Evidence Base

> Last reviewed: 2026-07-22
> Product status: **BUILT and publicly deployed as a constrained technical demo.**
> Evidence status: external problem and policy claims are **RESEARCHED**; automated tests and live smoke tests establish technical behavior only. Diagnostic accuracy, classroom efficacy, educator demand, and willingness to pay remain unvalidated.

This document preserves traceable sources and product reasoning behind Error Archaeologist. Public data establishes problem scale, market structure, and privacy constraints. It cannot establish daily educator workflow, product demand, diagnostic accuracy, learning impact, or willingness to pay.

---

## Part 1: Is This Problem Worth Solving

## 1. The Problem

When teachers grade math homework, they see *that* an answer is wrong, not *why*. The same wrong answer can hide multiple different root causes — for example `-3(x - 2) = -3x - 6` could come from a distribution misconception, a sign-rule error, carelessness, or a transcription slip — and each needs a completely different response. Both the screening layer (who's falling behind) and the remediation layer (tutoring/course placement) already have scalable tools; the diagnosis layer in between does not have an equally scalable tool (limitations of existing approaches are covered in the comparison table in §3).

**Honest premise**: a single piece of homework **cannot uniquely identify** the root cause — the same error can come from a misconception (mal-rule), carelessness (slip), a transcription error, a misread question, or input/transcription noise. So this product does not make an "AI verdict." It proposes candidate hypotheses with evidence and a differentiating probe with predictions. The student's next answer changes the evidence ranking. The teacher determines whether the result is useful enough to act on.

**Measurement boundaries (basic educational-diagnosis hygiene)**:

| Phenomenon | Meaning | What the product should do |
| --- | --- | --- |
| Reproducible error rule (mal-rule) | Systemic misconception | Candidate hypotheses + differentiating probe |
| Isolated missed step / overload (slip) | Not a misconception | Prioritize `likely_slip`; don't trigger remediation labels |
| Transcription / image ambiguity | Measurement error, not cognitive | `insufficient_evidence`, abstain |
| Final answer correct but process wrong | Correct Answer Trap | Diagnose steps first; can still surface candidates (see §4) |

This isn't a retreat — it's a more scientifically honest and more trustworthy product stance than "AI mind-reading."

## 2. Verifiability: Scale and Severity of the Pain Point (Principle 01)

**Scale**

- NAEP 2024 (the US official "Nation's Report Card"): 8th-grade math — **28% at or above Proficient, 61% at or above Basic, so 39% below Basic** [1]. Note: NAEP Proficient is a high bar and **is not equivalent to "on grade level"** — this proposal **does not** use the misleading framing "72-73% not proficient"; the roughly 40% below Basic is the actual target population for remediation policy.
- National 8th-grade math average showed **no significant change** from 2022 to 2024, but is **still below 2019**; the flat national average masks a **K-shaped divergence** — higher-percentile scores recovering, lower-percentile scores declining, the gap widening [1][2]. The product serves the diagnosis layer ("why is this specific student stuck") not the national-average narrative.
- Economic cost: Hanushek and Strauss estimate pandemic learning loss could cost the US roughly **$31T in present-value GDP** over the 21st century — this is a **model estimate derived from the relationship between skills and long-run growth, not money already spent** [11]. Recommendation: cut this number from the demo — it's huge, far from a teacher's actual workflow, and mainly invites questions about the model's assumptions (§11).

**Severity — governments have funded recovery, but this does not prove demand for this product**

- The US Congress appropriated **$189.5B** across three rounds of ESSER for K-12 pandemic response and recovery [9].
- NCES School Pulse Panel: **46%** of public schools offered high-dosage tutoring (HDT) in the 2023-24 school year [10].
- HDT programs cost roughly **$1,200-$2,000/student/year**; MDRC's eight-site randomized study estimates a pooled tutoring effect of **0.06-0.09 SD** [4]; CALDER's eight-district study found that even some of the stronger tutoring programs reach only about **1-2%** of eligible students [3].
- That pooled effect is **lower than** the 0.18-0.40 SD found in two large Chicago RCTs by Guryan et al. [5] — different settings, samples, years, and designs — this is a **descriptive comparison only**; we do not claim "scale" is the sole causal driver.

**Educational-measurement evidence — stated with its actual boundaries**

- Russell, O'Dwyer & Miranda (2009): a four-arm cluster-randomized pilot with 905 students and 44 teachers. **Controlling for pretest**, the full intervention group (diagnostic report + targeted materials) scored **0.13 SD higher** (p<.05) on algebra ability than the group that received **only** an ability report; the group difference on the **misconception outcome was not statistically significant**; the authors themselves frame the overall result as preliminary evidence [6][12].
- **What this study supports**: preliminary evidence that "integrating diagnostic information with targeted materials may improve learning." **What it does not support**: that LLM-based handwriting diagnosis works; nor can it isolate the effect of the diagnostic report on its own. This proposal cites it as support for the **intervention hypothesis**. The planned acceptance benchmark in §10 can test technical behavior, not learning effectiveness; effectiveness requires outcome-linked field validation.

**Evidence limits table** — external research validates the direction, not this product's performance:

| Column | Content | Source |
| --- | --- | --- |
| Problem evidence | NAEP pressure at lower percentiles; tutoring cost and coverage bottlenecks | [1][2][3][4][9][10] |
| Intervention precedent | Preliminary positive evidence for "diagnosis + targeted materials" | [5][6] |
| Current product evaluation | Three curated synthetic samples plus automated technical tests; no blind test, sealed holdout, classroom study, or published benchmark artifact yet | Repository fixtures and tests |
| Planned acceptance evidence | External sealed artifacts, including ambiguity, slips, and correct-answer/process-wrong cases; case-level failures published after evaluation | §10 target design |

## 3. Demand-Driven: The World Before LLMs (Principle 04)

| Generation | Existing US solution | Limitation |
| --- | --- | --- |
| Human labor | High-dosage tutoring (1-on-1 to 1-on-2, diagnosis happens in the tutor's head) | $1,200-2,000/student/year; even effective programs reach only about 1-2% of eligible students [3][4] |
| Rule/item-bank based | Diagnostic assessments: DAAS (10-12 multiple-choice testlets) [6]; commercial adaptive assessment (i-Ready, NWEA MAP) | DAAS-type tools rely on pre-written items, misconception distractors, and repeated-pattern responses; some commercial adaptive-assessment products mainly report skill/domain-level results (item design and output details for named products **have not been individually verified against official technical documentation**); comparative handling and cost for open-ended handwriting have not been measured |
| Traditional ML | Cognitive diagnosis models (CDM/DINA) [7], ITS (Cognitive Tutor / ASSISTments) | Depend on a pre-designed Q-matrix and closed item formats; ITS only diagnoses within its own system — it never sees a student's everyday paper homework |

**What LLMs add**:

1. **Potentially handle free-form handwritten derivations** — the current demo shows structured analysis of three curated synthetic samples. Comparative capability, natural-handwriting reliability, and affordability versus existing solutions still require measurement.
2. **Potentially reduce pre-authored distractor work** — on-the-fly candidates may reduce expert answer-choice design, but the current evaluation has not measured expert time, quality-adjusted cost, or marginal cost against an item-bank workflow.
3. **Evidence localization** — anchoring candidate root causes to "the exact step the student wrote," which requires semantic understanding of the derivation process.
4. **On-the-fly differentiating-probe generation** — generate a question whose predicted answers differ for the candidate pair in an instance. Whether this outperforms a pre-authored item-bank workflow remains an evaluation hypothesis.

**Market positioning: not another grading tool** (extension of Principle 04)

| Category | Representative examples (type) | Optimizes for | How we differ |
| --- | --- | --- | --- |
| Assessment/grading-oriented | Handwritten-math grading and partial-credit tools (IntelGrader, Ed.ai, GradingPal, etc.) | Administrative efficiency: scores, error tags, worksheets | Current demo does not assign grades; target workflow evaluates whether an evidence-linked hypothesis + differentiating probe improves teaching decisions |
| Student-facing solve-it apps | Photo-to-solution apps | Steps and answers | Current demo uses curated synthetic artifacts and supports teacher-facing hypothesis testing, not answer copying |
| Diagnosis/tutoring platforms | Eedi, Glimmer, etc. | Misconceptions + intervention, some with RCTs/knowledge graphs | Target differentiation is **everyday paper-based, open-ended handwritten derivation** + **a differentiating probe with verified predictions**; the current demo uses curated samples and has no RCT-validated efficacy |

Honesty: Eedi and similar products have a longer validation track record. Named products in the table are **category examples only** — capability descriptions are **category-level generalizations, and individual product capabilities have not been individually verified against official technical documentation**. If public copy keeps named comparisons, official documentation must be added first; otherwise switch to anonymous category language. The current demo does not establish a benchmark or human-review loop; copy will **not** say "scientifically validated."

## 4. The Solution: Hypothesis → Evidence → Differentiating Probe → Teacher Review

**Current demo boundary and safeguards:** curated sample selection, Structured Outputs analysis, SymPy verification, response evidence update, and abstention are built. Current evaluation is limited to three curated synthetic samples plus automated technical tests. Upload, teacher accept/revise/reject, durable aggregate, authentication, classroom validation, and benchmark publication are not built or completed.

**Target workflow after validation:**

1. A teacher uploads a photo of synthetic/de-identified handwritten homework after privacy and reliability acceptance gates pass.
2. A **Correct Answer Trap guard** checks step-to-step mathematical validity/logical coherence before comparing the final answer. The planned acceptance set includes answer-correct-but-process-wrong cases; the current three curated samples do not establish this behavior.
3. The model returns a target fixed structured output for the handwritten derivation:

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
  "differentiating_probe": {
    "question": "Expand -4(b - 3)",
    "correct_answer": "-4b + 12",
    "predictions": [
      { "candidate_id": "NEG_DIST", "predicted_answer": "-4b - 12" },
      { "candidate_id": "DIST_FIRST_ONLY", "predicted_answer": "-4b - 3" }
    ],
    "evidence_update_rule": "Answer matches a candidate prediction -> that candidate gains support; matches correct_answer -> both candidates lose support, leaning toward slip; matches neither -> abstain or ask another probe, then route to teacher review"
  },
  "abstain_reason": null
}
```

**Target `error_disposition` heuristic** (explicitly a heuristic, not a calibrated threshold; to be evaluated in the planned acceptance benchmark):

| Value | Trigger condition (summary) | Downstream |
| --- | --- | --- |
| `likely_slip` | Only 1 step wrong and surrounding steps are self-consistent; or the error pattern matches no taxonomy mal-rule | Does not enter the "misconception" bucket of the aggregate; recommend teacher review, may offer a low-cost redo |
| `candidate_mal_rule` | Error maps to the taxonomy; or the same rule is reproducible across steps | Surfaces candidates + differentiating probe |
| `ambiguous` | Both slip and mal-rule are plausible | Must run differentiating probe; if no discriminating question can be generated -> abstain |
| `insufficient_input` | Image is blurry, symbol ambiguity would change the math (2/z, x/multiplication sign), or steps are missing to the point reasoning is impossible | `diagnosis_status=insufficient_evidence`, forced abstain |

**Input-uncertainty rule**: if the model cannot parse, with reasonable confidence, a symbol whose reading would change the mathematical meaning, it must set `input_uncertainty` describing what's missing — it is **forbidden** to force out a misconception label (avoids hallucinated diagnoses).

4. **Differentiating probe** (this product's core innovation — not "generate one more problem," but "ask a question with independently verified candidate predictions"):
   - Before generating, predicted answers are derived for every candidate pair; **if two candidates predict the same answer, regenerate the question; if no discriminating question can be generated, abstain.**
   - After the student answers, candidate support is updated per the evidence rule. The new observation can support, weaken, or fail to distinguish candidates.
5. Teacher accepts/rejects the suggested classification with one click. Acceptance means "useful enough for this workflow," not ground-truth proof of a student's mental state. Only accepted results enter a class aggregate.
6. **Post-review teacher action (closes the loop even with zero generation)**: the UI can surface (a) a class-level aggregate, "N% have evidence consistent with this misconception; review before reteaching"; (b) the differentiating question as a formative check; and (c) optional template practice. Free-form microlesson generation is outside the required path.
7. Targeted practice (roadmap): a supported and teacher-accepted hypothesis may trigger **template-based** practice. Free-form item correctness and curriculum alignment require separate validation.

**Three-value diagnosis status** (replaces v4's per-candidate confidence bands — per-candidate grading was self-contradictory with the "no competing explanation" definition, and self-reported LLM confidence is uncalibrated):

- `single_supported_hypothesis`: only one candidate has supporting evidence
- `multiple_plausible_hypotheses`: multiple plausible candidates -> triggers the differentiating probe
- `insufficient_evidence`: image/derivation insufficient or `input_uncertainty` set -> abstain, state what's missing
- No numeric confidence is ever displayed; numeric calibration stays on the roadmap (requires a calibration set).

**Current built depth of Codex + GPT-5.6 usage** (Build Week judging criterion ①): three curated samples exercise Structured Outputs analysis; the application then applies SymPy verification, response evidence update, and abstention. Upload, teacher review, aggregation, a sealed benchmark, and classroom evidence remain target work. Claims beyond the current boundary require dated code, runnable setup, and completed acceptance artifacts.

## 5. Technical Architecture and Verification Boundaries (Principles 02 and 06)

**Target architecture after validation (not the current demo):**

```text
Photo intake + client-side PII warning/redaction
  -> multimodal parse (normalized steps, bounding boxes, alternative parses)
  -> deterministic algebra verifier (equivalence + first invalid transition)
  -> taxonomy retrieval + candidate hypothesis generation
  -> template-constrained differentiating-probe generator
  -> symbolic solver verifies distinct candidate predictions
  -> student-response matcher updates evidence state
  -> teacher review
  -> de-identified event store + class aggregation
```

In the current demo, Structured Outputs analysis proposes hypotheses and a probe for a curated sample; SymPy verifies the probe, the response endpoint updates evidence, and ambiguous input can abstain. The target architecture extends that separation to upload, teacher review, and aggregation. The model must not certify its own mathematics.

Target pluggable boundaries are limited and explicit:

- **Reasoning engine:** model identifier and reasoning effort are configuration; model tiers must be benchmarked for quality, latency, and cost.
- **Taxonomy:** versioned curriculum-specific misconception rules with source provenance. Changing standards requires taxonomy review and regression tests, not merely replacing one JSON file.
- **Input adapter:** privacy-reviewed photo upload after acceptance gates; batch scanning and LMS ingestion are separate products.
- **Output contract:** versioned structured result intended for a review UI, evaluation harness, and aggregate store.

Cross-domain reuse remains an architectural hypothesis. Coding, language transfer, and clinical reasoning require different evidence models, validators, risks, and buyers.

## 6. Target User and Workflow (Principles 03 and 05)

The beachhead is **Grade 7–9 intervention teachers and tutor coordinators managing small algebra cohorts**, not every classroom teacher.

| Role | Initial definition | Job to be done |
| --- | --- | --- |
| **User** | Intervention teacher or tutor | Triage incorrect work before the next support session |
| **Champion** | Math curriculum or intervention lead | Standardize diagnosis and review patterns across staff |
| **Buyer** | Tutoring/intervention-program operator | Increase useful diagnostic coverage per educator-hour |
| **Beneficiary** | Student | Receive a probe and intervention matched to observed evidence |

Target pilot workflow: select or batch-upload incorrect work -> review candidate hypotheses and evidence -> assign one verified probe -> inspect response -> accept, revise, or reject suggested classification -> use aggregate only after review. This workflow is not implemented in the current demo, and its efficiency must be tested.

Remote interviews validate workflow assumptions, not demand by themselves: at least two Grade 7–9 math educators, one tutor coordinator, and one buyer. Measure current diagnosis time, acceptable review latency, false-positive tolerance, whether the probe changes the next teaching action, purchasing authority, and pilot evidence requirements.

## 7. Commercial Model and Evidence-Led US Entry (Principle 05)

Recommended market sequence:

1. **Intervention and tutoring providers:** annual platform fee plus usage-based analysis. Closest labor-cost comparison and shortest path to a bounded pilot.
2. **Embedded diagnosis API:** platform fee plus usage for curriculum, tutoring, or assessment vendors after the output contract stabilizes.
3. **District license:** annual per-school or per-student contract after privacy review, integrations, and outcome evidence.
4. **State procurement:** long-term channel, not initial payer assumption.

No price is claimed before interviews and cost measurement. Pilot economics must report analyses per active student, model and retry cost per completed analysis, educator-support cost, gross margin, activation, four-week retention, paid conversion, and expansion behavior. Title I-A and other public budgets show funding context only; they do not establish eligibility, procurement, or willingness to pay.

Building outside the US is not a product limitation if evidence provenance is visible. Public sources establish system facts: NAEP for problem scale, NCES for schools/students/district structure, public tutoring data for channel adjacency, official privacy guidance for data controls, and released assessment items for test inputs. Those sources cannot establish daily workflow or willingness to pay; remote US educator interviews, public RFP/contract review, and pilot behavior must complete the evidence chain. After those interviews occur, suggested reviewer framing is: **"Designed in Taiwan from traceable US public evidence, then validated remotely with US educators."**

NCES reports 49.4 million public-school students across 99,297 schools and 19,186 operating districts in 2023–24 [14]. This supports market structure and procurement-fragmentation analysis, not a claim that every student is addressable. UNESCO reports that around 40% of children reach minimum mathematics proficiency at expected primary-completion age [15]. That supports global problem context, not product portability; language, notation, curriculum, workflow, and privacy still require local validation.

---

## Part 2: Why Us

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

## 9. Failure Cost and Risk Design (Principle 07)

Consequences of misdiagnosis include wasted teaching time, student mislabeling, and **alert fatigue** from treating a slip as a misconception. This is a medium-risk domain.

**Current safeguards, evidenced only by three curated synthetic samples and automated technical tests:**

- Curated sample selection avoids accepting real student data.
- Structured Outputs analysis constrains the model response.
- SymPy verification rejects probes with colliding candidate predictions or a prediction equal to the correct answer.
- Response evidence update supports, weakens, or fails to distinguish candidates.
- Abstention avoids forcing a result for the curated ambiguous case or an unverifiable probe.

**Target controls and acceptance evidence, not current behavior:**

- **Teacher-in-the-loop:** accept, revise, or reject before an event enters an aggregate or triggers practice; acceptance measures workflow usefulness, not psychological ground truth.
- **Evidence review:** require evidence-linked candidates that an educator can inspect quickly, then measure localization quality and review time.
- **Correct Answer Trap:** include answer-correct-but-process-wrong cases in the planned sealed acceptance set (§10).
- **Slip vs. mal-rule:** validate the target `error_disposition` heuristic and exclude unreviewed events from any future aggregate.
- **Automation-bias control:** blind reviewers periodically, record revisions separately from accepts, and audit acceptance behavior.
- **Published acceptance evidence:** version and publish case-level benchmark results and failures only after the planned evaluation is executed.

## 10. Data Availability and Validity Verification (Principle 08)

**Data sources**

| Need | Source | Access path |
| --- | --- | --- |
| Problems | NAEP publicly released items (public domain) + self-authored | Already public, zero cost [1] |
| Handwritten error samples | Three current repository-owned synthetic fixtures; additional team-produced samples are planned for the acceptance benchmark below | Current fixtures are available without real student data and are not representative of classroom prevalence |
| Taxonomy | Published algebra-misconception literature (DAAS, three concepts [6]; error-analysis research) | Public literature, cited in README |
| Real student data | Not used or accepted by the current demo | Target production stage requires district agreement + de-identification |

**Compliance statement:** public demo exposes only repository-owned synthetic samples and has no upload endpoint. It stores structured analysis in disposable SQLite state; it does not accept real student data. Production use still requires access controls, retention/deletion policy, district agreements, subprocessor review, and security assessment.

**Platform-layer boundary** [13]: OpenAI API inputs/outputs are by default not used for model training, but the platform may by default retain abuse-monitoring logs for **up to 30 days**; Zero Data Retention applies only to approved organizations and eligible endpoints. Application-layer "delete after processing" is **not** the same as end-to-end zero retention — copy will **not** claim zero retention.

**Planned technical acceptance benchmark seed set (30-36 samples; not yet collected or run)**:

| Category | Count |
| --- | --- |
| Error cases (covering 8-10 misconception types, incl. "same wrong answer, different cause" pairs) | 16-20 |
| Correct cases (no error) | 4 |
| Insufficient-information cases (blurry image / missing steps / ambiguous symbols) | 4 |
| Careless/transcription cases (slip) | 4 |
| **Correct Answer Trap** (final answer correct, process wrong) | 2-4 |
| **Total** | **30-36** |

- If completed, this seed set will demonstrate technical behavior only. Team-produced samples will not represent classroom prevalence or natural handwriting noise, and 16-20 error cases cannot support a stable 8-10-class macro-F1 claim.
- Two annotators will independently label expected parse, first invalid transition, plausible hypothesis set, and disposition. They will report agreement and adjudicate disagreements before sealing a holdout. An outside math educator should label the full holdout without seeing model output.
- Each model configuration should run multiple times with model snapshot, prompt/taxonomy version, reasoning configuration, latency, token/image usage, retries, and cost recorded.

**Planned evaluation layers and decision metrics:**

| Layer | Primary metric | What it establishes |
| --- | --- | --- |
| Perception | Symbol/step transcription accuracy; evidence localization | Whether image understanding preserves relevant mathematics |
| Math validation | First-invalid-transition accuracy | Whether deterministic checking finds the right break |
| Hypothesis generation | Expected hypothesis in top two; unsupported-hypothesis rate | Whether candidates are useful without implying unique ground truth |
| Probe construction | Symbolically verified distinct predictions | Whether the next question can discriminate candidates |
| Safety | Error rate at each abstention-coverage level | Whether abstention reduces harmful suggestions |
| Workflow | Median teacher review time; accept/revise/reject rates | Whether product saves work and supports decisions |
| Learning signal | Delayed transfer-item performance | Whether product may improve learning; requires field study |

After the evaluation is completed, publish case-level failures. Do not headline one aggregate “accuracy” number from this seed set.

## 11. Current Demo and Submission Visibility (Principle 09)

The public Cloud Run demo implements one constrained, testable loop:

1. Select a repository-owned synthetic handwriting sample.
2. GPT-5.6 Luna returns normalized steps, an observed transition, and two evidence-linked hypotheses.
3. SymPy verifies that the generated probe has distinct candidate predictions and that neither equals the correct answer.
4. A selected response changes which hypothesis gains support.
5. Ambiguous input can abstain instead of forcing a label.

The demo does not implement upload, teacher review, class aggregation, authentication, or field validation. Submission copy must not imply otherwise.

Current submission evidence supports only the constrained technical loop and its creative use of testable hypotheses. The three curated samples and automated technical tests do not establish a complete teacher decision flow, diagnostic accuracy, classroom impact, or workflow-time savings.

Future design and impact claims require the target teacher-review flow, completed educator interviews, benchmark results, and measured review time. Any future upload path also requires privacy and reliability acceptance gates. Keep the $31T model estimate out of the pitch.

## 12. Defensibility Strategy (Principle 10)

Honest premise: current repository has no built-in moat. What follows is a defensibility strategy, not an existing asset:

1. **Outcome-linked evidence sequence:** artifact + candidates + verified probe + student response + teacher revision + later transfer result. Accept/reject clicks alone are noisy labels and can reflect automation bias.
2. **Executable, source-provenanced taxonomy:** misconception rules, counterexamples, probe templates, and regression cases—not a JSON list alone.
3. **Calibration and safety benchmark:** natural handwriting, ambiguity, slips, correct-answer traps, selective-risk curves, and model-version history.
4. **Workflow integration:** reviewed events positioned between screening and intervention. Integration becomes defensible only after repeated use and renewal.
5. **Data rights:** contracts must permit privacy-preserving improvement; otherwise customer data cannot be assumed to become a proprietary asset.

**Not built and not written up as an existing moat**: full-subject Graph-RAG, multi-model ensembles, and fine-tuning. These remain optional future techniques, not substitutes for validation.

## 13. Reviewer Pressure Q&A (rapid-fire)

Four categories of pointed questions drawn from an external deep-review pass; the pitch deck and Devpost FAQ use the same set of answers.

**Q1: How do you avoid hallucinated diagnoses given ambiguous handwriting / symbol misreads (2 vs. z, x vs. multiplication sign)?**

A: The current demo limits input to three curated synthetic samples. Structured Outputs analysis, SymPy verification, response evidence update, and abstention are built and covered by automated technical tests. Natural-handwriting reliability and live upload remain target capabilities gated on a completed ambiguity and abstention benchmark.

**Q2: How do you distinguish carelessness (slip) from a systemic misconception (mal-rule)?**

A: The current demo updates candidate support from a differentiating-probe response but does not validate a slip-versus-mal-rule threshold. The planned acceptance benchmark will include slip samples, and target teacher review will control downstream action without claiming psychological ground truth.

**Q3: FERPA/COPPA and whether data is used for training?**

A: The public demo exposes only repository-owned synthetic artifacts and has no upload endpoint. OpenAI API inputs/outputs are not used for training by default, but abuse-monitoring logs may be retained for up to 30 days; ZDR is limited to approved organizations and eligible endpoints [13]. Production district deployment requires a separate DPA, access controls, deletion policy, subprocessor review, and security assessment.

**Q4: What about the quality and curriculum alignment of the post-diagnosis remediation content?**

A: The current demo stops after response evidence update and does not implement teacher review, next-action selection, or remediation. The target design uses teacher review and template-based practice; freely generated item correctness and standards alignment require a separate validation program.

---

## References

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
14. NCES. _Number of operating public elementary and secondary schools and districts, student membership, teachers, and pupil/teacher ratio, 2023–24_. <https://nces.ed.gov/ccd/tables/202324_summary_2.asp> (49,404,386 students; 99,297 schools; 19,186 districts)
15. UNESCO Institute for Statistics. _2026 Education Data Refresh_. <https://www.uis.unesco.org/en/news/2026-education-data-refresh> (global learning-proficiency context; not evidence of product demand or portability)

Policy-background appendix (not part of the core reference list): Moon, T. (2026). _How Districts Can Fund High-Quality Tutoring Now That ESSER Money Is Gone_. The 74 — a secondhand policy summary; Tennessee's $500/student figure is for 4th-grade **literacy** tutoring, not math.
