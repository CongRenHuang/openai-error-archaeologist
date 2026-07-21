# Error Archaeologist (錯誤考古學家)

> AI proposes candidate explanations, shows evidence, and asks a verified follow-up question. Student response changes the evidence; teacher retains judgment.

## Current Status

**Design and research only as of 2026-07-22.** This repository does not yet contain a runnable application, public deployment, completed benchmark, or user-validation results. Architecture and acceptance criteria below are planned. A capability becomes **built** only when runnable code exists and **validated** only when recorded results satisfy its declared test.

## About the Project

Error Archaeologist is designed for the OpenAI Build Week **Education** track. It addresses a narrow gap in math support: screening tools show who is struggling, while tutoring supplies remediation, but educators still spend scarce time determining why a student made a specific error.

The same wrong answer can reflect a reproducible misconception, a careless slip, a transcription error, or ambiguous handwriting. Product stance: never claim mind-reading. Generate plausible, evidence-linked hypotheses and one follow-up probe whose candidate predictions are mathematically distinct.

NAEP 2024 reports 28% of US eighth graders at or above Proficient and 61% at or above Basic, leaving 39% below Basic. NAEP Proficient is not equivalent to grade-level proficiency. This establishes problem context, not product demand or efficacy. See [detailed proposal](01-error-archaeologist.en.md#2-verifiability-scale-and-severity-of-the-pain-point-principle-01).

## Initial User and Buyer

- **User:** Grade 7–9 intervention teacher or tutor handling a small algebra cohort.
- **Champion:** math curriculum or intervention lead.
- **Initial buyer:** tutoring or intervention-program operator seeking more diagnostic coverage per educator-hour.
- **Later buyer:** district, after privacy review, integration, and outcome evidence.
- **Student benefit:** a targeted probe and teaching response based on reviewed evidence.

Initial workflow must save time for intervention teams. It does not assume every classroom teacher will manually photograph every assignment.

## Planned Workflow

1. User selects or uploads synthetic/de-identified handwritten algebra work.
2. Multimodal model returns normalized steps, bounding boxes, and alternative parses.
3. Deterministic algebra verifier checks step equivalence and identifies first invalid transition.
4. Taxonomy engine proposes candidate misconceptions with source-linked evidence.
5. Template-constrained probe generator creates a follow-up question.
6. Symbolic solver verifies that candidate hypotheses predict distinct answers; otherwise system abstains.
7. Student response changes candidate support but does not prove mental state.
8. Teacher accepts, revises, or rejects suggestion. Only reviewed events enter class aggregate.

## Planned Architecture

```text
PII warning/redaction
  -> multimodal parse
  -> deterministic algebra verification
  -> taxonomy candidates
  -> constrained probe generation
  -> symbolic discriminability check
  -> response evidence update
  -> teacher review
  -> de-identified aggregation
```

GPT-5.6 is planned for multimodal parsing and candidate generation. Model ID and reasoning effort remain configuration. Model cannot certify its own mathematics; deterministic verification provides an independent boundary. Model quality, latency, retries, and cost must be benchmarked across available tiers.

## Validation Plan

Seed benchmark: 30–36 synthetic artifacts covering misconceptions, correct work, slips, ambiguous input, and Correct Answer Traps. This can demonstrate technical behavior, not classroom efficacy.

Report separately:

- transcription and evidence-localization accuracy;
- first-invalid-transition accuracy;
- expected hypothesis appearing in top two;
- unsupported-hypothesis rate;
- symbolically verified probe discriminability;
- error rate at each abstention-coverage level;
- educator review time and accept/revise/reject behavior;
- complete failure cases.

Learning impact requires later field evidence: whether reviewed diagnosis changes intervention and improves delayed transfer performance.

## Commercial Model

Recommended sequence:

1. Intervention/tutoring providers: annual platform fee plus usage-based analysis.
2. Curriculum or assessment vendors: embedded API platform fee plus usage.
3. Districts: annual per-school or per-student license after evidence and integration.

No pricing claim exists yet. Pilot must measure cost per completed analysis, educator-support cost, gross margin, activation, four-week retention, paid conversion, and expansion. Public education budgets show payer capacity only; they do not prove eligibility or willingness to buy.

## Defensibility

Model and taxonomy file alone are not moat. Potential defensibility comes from privacy-permitted sequences linking artifact, candidate set, verified probe, student response, teacher revision, and later transfer outcome. Accept/reject clicks alone are noisy and vulnerable to automation bias.

## Privacy Boundary

Public demo must allow only synthetic or de-identified samples and visibly warn against student PII. Application-level deletion must be tested before being claimed. OpenAI API inputs/outputs are not used for training by default, but abuse-monitoring logs may be retained for up to 30 days; Zero Data Retention requires approval and eligible endpoints. Production use requires district agreements, access controls, retention/deletion policy, subprocessor review, and security assessment.

## Evidence-Led Development from Taiwan

US public sources can establish problem scale, market structure, curriculum context, funding context, and privacy constraints. They cannot establish daily workflow or willingness to pay. Credible reviewer narrative—after interviews occur—is: **designed in Taiwan from traceable US public evidence, then validated remotely with US educators.**

## Codex Collaboration

Codex has supported evidence auditing, architecture critique, documentation structure, and explicit acceptance gates. When implementation starts, this section must identify dated code contributions, human product decisions, benchmark artifacts, session records, and setup commands. Planning assistance must not be described as working functionality.
