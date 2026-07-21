# Error Archaeologist (錯誤考古學家)

> AI doesn't guess what's in a student's head. It proposes candidate root causes, points to the evidence step, and generates a differentiating experiment with a verifiable prediction to converge on the diagnosis.

## About the project

We're building for the **Education** track. Error Archaeologist is an AI diagnostic layer for math homework: a teacher uploads a photo of a student's handwritten work, and instead of just marking it right or wrong, GPT-5.6 proposes falsifiable candidate misconceptions anchored to the exact step where they show up, then generates a follow-up question designed so each hypothesis predicts a different answer — converging on a diagnosis a teacher can confirm in ten seconds instead of guessing.

## Inspiration

Teachers grading math homework see *that* an answer is wrong, not *why*. The same wrong answer can hide multiple different root causes — for example `-3(x - 2) = -3x - 6` could come from a distribution misconception, a sign-rule error, carelessness, or a transcription slip — and each needs a completely different response. Scale-up tools already exist for screening ("who's behind") and remediation ("who gets a tutor"), but nothing scales the diagnosis layer in between. High-dosage tutoring, the main human solution, costs $1,200–$2,000/student/year and reaches only ~1–2% of eligible students even in its stronger programs (CALDER, MDRC). Meanwhile NAEP 2024 shows 39% of 8th graders below Basic in math. That gap — real diagnostic need, no scalable tool — is what pulled us toward this project.

We also didn't want to build "just another grader." Handwriting-grading tools already optimize for administrative efficiency (scores, error tags, worksheets). We wanted to optimize for teaching decision quality instead: not a verdict, but a falsifiable hypothesis a teacher can check in ten seconds.

## What it does

1. A teacher uploads a photo of a student's handwritten work.
2. The model reads the full handwritten derivation (not an OCR pipeline bolted onto a grader) and checks step-by-step mathematical validity *before* looking at the final answer — so answer-correct-but-process-wrong cases ("Correct Answer Trap") still get diagnosed instead of waved through.
3. It returns a fixed structured output: the observed error, evidence anchored to a specific step, an `error_disposition` (`likely_slip` / `candidate_mal_rule` / `ambiguous` / `insufficient_input`), and — when more than one misconception is plausible — two or more candidate hypotheses, each with the step where it shows up and a *predicted answer pattern* for a follow-up question.
4. It then generates a **differentiating experiment**: a new problem chosen so that each candidate hypothesis predicts a different answer. If two candidates would predict the same answer, it regenerates rather than showing a useless test.
5. The student answers the follow-up question; the response is matched against the predictions to support one hypothesis and rule out the other (or route to `abstain` if nothing matches).
6. The teacher confirms or rejects the diagnosis with one click — nothing enters the class heatmap or triggers remediation until a human signs off.
7. Confirmed diagnoses roll up into a class-level heatmap ("40% of the class shares this misconception — teach this for 10 minutes next period") and the differentiating question can be reused as a formative check.

When the model isn't confident — blurry image, ambiguous symbols (2 vs z, × vs x), missing steps — it abstains and says exactly what's missing, instead of guessing and risking a false diagnosis.

## How we built it

- **Model**: GPT-5.6 (official competition model), used for multimodal handwriting understanding, abductive reasoning (working backward from a wrong result to candidate rules), structured-output generation, and generating differentiating experiments with self-checked predictions.
- **Pipeline**: a domain-agnostic core — artifact → candidate hypotheses → evidence localization → differentiating experiment → teacher confirmation → aggregation — with three pluggable pieces: the reasoning engine (model ID is a config value, not hardcoded), the misconception taxonomy (a JSON file per curriculum/state standard), and the input/output adapter (photo upload for MVP).
- **Taxonomy**: 8–12 misconception nodes for a single unit (linear equations + the distributive property), built from published algebra-misconception literature (DAAS, cognitive diagnosis model research), not invented from scratch.
- **Structured output contract**: every response is validated against a fixed schema (`observed_error`, `final_answer_correct`, `diagnosis_status`, `error_disposition`, `candidate_misconceptions[]`, `verification_experiment`, `abstain_reason`) so outputs are aggregable and evaluable, not free text.
- **Eval harness**: a 30–36 sample blind test set (misconception cases including "same wrong answer, different cause" pairs, correct cases, ambiguous-input cases, slip cases, and Correct Answer Trap cases), independently annotated and sealed before prompt tuning, with a holdout portion blind-scored by an external math teacher.
- **Frontend**: a public demo site (teacher upload flow → candidate hypotheses with evidence highlighted → differentiating question → confirm/reject → class heatmap → next-lesson action).
- Built with Codex as an agentic collaborator across the pipeline, eval harness, and UI, with session logs kept for the "AI-assisted development" judging criterion.

## Challenges we ran into

- **Avoiding hallucinated diagnoses**: an LLM will confidently invent a misconception if you let it. We had to build an explicit `input_uncertainty` check — if a symbol is genuinely ambiguous in a way that changes the math, the model must abstain rather than pick a label.
- **Slip vs. misconception**: a single wrong step can be a systemic mal-rule or just a careless mistake. We didn't have ground truth for this, so we built a heuristic (`error_disposition`) instead of pretending we had a calibrated confidence score, and made the differentiating experiment the real arbiter.
- **Correct Answer Trap**: a student can get the right final answer through a broken process (or wrong process that self-corrects). Most grading tools stop at the final answer; we had to diagnose the process first and treat "right answer" as insufficient evidence of understanding.
- **Making the differentiating experiment actually differentiate**: it's not enough to generate one more problem — each candidate hypothesis has to predict a *different* answer to it, or the experiment proves nothing. We added a check that regenerates the question whenever two candidates' predicted answers collide.
- **Not overclaiming validity**: the closest prior research (Russell, O'Dwyer & Miranda 2009) found a modest, pretest-controlled effect on ability, but no significant effect on misconception outcomes specifically. We used that as intervention-hypothesis support, not as evidence our tool works — our actual evidence has to come from our own blind eval, including the failure cases.
- **Privacy boundaries**: being honest that "the app deletes the image after processing" is not the same claim as "zero data retention end-to-end," given platform-level abuse-monitoring log retention windows on the API side.

## Accomplishments that we're proud of

- A structured-output schema that forces the model to commit to falsifiable, evidence-anchored claims instead of vague prose — every candidate hypothesis carries the exact step it's grounded in and a testable prediction.
- The differentiating-experiment loop: instead of "AI says X," the system generates a follow-up question specifically designed so the student's *own next answer* can rule hypotheses in or out. The diagnosis is falsifiable by construction.
- Explicit abstain and Correct-Answer-Trap handling built in from day one, not bolted on after a failure — safety behavior is part of the core schema, not a patch.
- A blind eval design (independent annotation, sealed holdout, external teacher scoring) built for an 8-day hackathon timeline, so our accuracy claims are backed by something other than cherry-picked demo samples.

## What we learned

- Diagnosing *why* a student made a mistake is a fundamentally different (and harder) problem than grading whether they got it right — and existing tools (adaptive assessments, ITS, diagnostic testlets) mostly solve the "right/wrong" or closed-item version of this, not the open-ended handwritten-work version.
- Confidence needs a place to go when it isn't calibrated. Rather than showing a fake numeric confidence score, a three-value diagnosis status (`single_supported_hypothesis` / `multiple_plausible_hypotheses` / `insufficient_evidence`) plus a human-in-the-loop confirmation step is more honest and more useful to a teacher.
- Teacher trust depends on the AI showing its work, not just its conclusion — every hypothesis needing an `evidence_steps` pointer changed how we designed the whole schema, not just the UI.
- Big, dramatic economic numbers (like modeled multi-trillion-dollar learning-loss estimates) are a liability in a demo — they invite questions about assumptions instead of building confidence in the product.

## What's next for Error Archaeologist

- Expand the misconception taxonomy beyond one algebra unit, and validate how much adapter/schema work is actually needed to swap in a new curriculum standard (e.g., Common Core ↔ Texas TEKS) — currently an assumption, not a proven cost.
- Template-based (and eventually generative) practice problems triggered directly by a confirmed misconception, with curriculum alignment checked before any free-form question generation is trusted.
- Turn confirmed/rejected diagnoses into a growing private calibration and eval dataset — every teacher confirmation is a labeled data point that can sharpen the taxonomy and the model's evidence localization over time.
- Real integration points: LMS export, LTI 1.3/OneRoster/Ed-Fi, and Clever/ClassLink SSO, positioned as an add-on diagnostic layer to existing adaptive-assessment platforms (i-Ready, NWEA MAP) rather than a replacement for them.
- Extend the same hypothesis → evidence → differentiating-experiment → confirmation framework to other domains where the same shape of problem exists: code-review misconception diagnosis, second-language transfer errors, or clinical reasoning training — the LLM is a swappable engine, the framework is the reusable part.
