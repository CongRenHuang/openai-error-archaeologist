# Error Archaeologist — Three-Minute Briefing

> Source: `docs/proposals/01-error-archaeologist.en.md`. Current repository status: research and design only. Replace planned visuals with captured product evidence only after implementation and benchmark gates pass.

## Core Position

**Error Archaeologist does not claim to read a student's mind.** It proposes evidence-linked explanations for a math error, asks a mathematically verified follow-up question, and uses the response to change which explanation deserves teacher attention.

Target user: Grade 7–9 intervention teacher or tutor managing a small algebra cohort. Initial buyer hypothesis: tutoring or intervention-program operator. US middle-school algebra is beachhead; global and cross-domain reuse remain roadmap.

## Three-Minute Storyboard

### Slide 1 — Same Answer, Different Reason (0:00–0:25)

- **Purpose:** establish memorable problem through one concrete contrast.
- **Visual:** two synthetic handwritten solutions with same wrong answer but different error rules; optional Correct Answer Trap example.
- **Narration:** “Same answer does not mean same misunderstanding. One student mishandled a negative sign; another distributed only to first term. Same remediation wastes one student's time.”
- **Evidence requirement:** samples must have sealed author-intended causes and visible synthetic-data label.

### Slide 2 — Diagnosis Gap, Not Another Tutor (0:25–0:45)

- **Purpose:** define narrow product wedge.
- **Visual:** Screening -> **Diagnosis gap** -> Intervention.
- **Narration:** “NAEP reports 39% of US eighth graders below Basic in mathematics. That establishes scale, not demand for our product. We focus on one expensive decision inside intervention: what evidence explains this student's error, and what should teacher test next?”
- **Avoid:** “Nothing else diagnoses,” “scientifically validated,” or treating NAEP Proficient as grade level.

### Slide 3 — Evidence Loop (0:45–1:35)

- **Purpose:** show product's distinctive interaction.
- **Visual:** artifact with highlighted step, two candidate cards, verified probe, student response, teacher review.
- **Narration sequence:**
  1. Multimodal parse localizes relevant step.
  2. Deterministic algebra checker identifies invalid transition.
  3. Taxonomy engine proposes two plausible explanations.
  4. Constrained generator creates follow-up probe.
  5. Symbolic solver verifies predictions differ.
  6. Student response supports one candidate, supports neither, or triggers another probe.
  7. Teacher accepts, revises, or rejects before aggregation.
- **Key line:** “Model proposes; mathematics verifier checks; teacher decides whether to act.”

### Slide 4 — Failure Is Product Behavior (1:35–2:10)

- **Purpose:** convert hallucination objection into visible safety design.
- **Visual:** four benchmark cards: ambiguous symbol, slip, Correct Answer Trap, unsupported response.
- **Narration:** “Ambiguous input abstains. Isolated slips stay out of misconception aggregate. Correct final answers do not hide broken steps. Unmatched follow-up responses do not force a label.”
- **Evidence:** report transcription accuracy, first-invalid-step accuracy, top-two hypothesis recall, verified-probe rate, and error at each abstention level. Show failures; never headline unstable macro-F1 from 30–36 synthetic artifacts.

### Slide 5 — Feasible Wedge and Business (2:10–2:35)

- **Purpose:** answer who uses, who pays, and why architecture can scale.
- **Visual:** intervention teacher -> reviewed evidence -> tutoring-program buyer; small unit-economics card.
- **Narration:** “We start with intervention teams, not every teacher. Provider pays annual platform fee plus usage because diagnosis competes with educator time. Next channels are embedded curriculum APIs, then districts after privacy and outcome evidence.”
- **Metrics:** cost per completed analysis, review time, accept/revise/reject rate, four-week retention, paid conversion, delayed transfer signal.
- **Moat claim:** outcome-linked artifact/probe/response/review data may become defensible with lawful data rights; model and taxonomy file are not moat.

### Slide 6 — Why This Team / Close (2:35–2:55)

- **Purpose:** close with research rigor and direct test invitation.
- **Visual:** source ledger -> architecture decision -> benchmark evidence -> live URL/QR code.
- **Narration:** “Designed in Taiwan from traceable US government statistics, released assessment items, and official privacy guidance. Remote educator research supplies workflow evidence public data cannot. Distance forced explicit boundaries: what public data establishes, what interviews must establish, and what only product results can establish.”
- **Close:** “AI should not declare why a student is wrong. It should show evidence and ask a question capable of changing its mind.”
- **Condition:** describe completed remote validation only after interviews occur; show live URL only after deployment is tested.

## Timing and Submission Guardrails

Total planned narration: **2:55**. Remaining five seconds absorb transitions. No untimed surrounding slides; official submission video limit applies to entire video.

Before recording:

- Replace every planned-state statement with actual status.
- Label synthetic data and simulated aggregates onscreen.
- Insert real benchmark numbers; remove empty charts and placeholders.
- Demonstrate one abstention or rejected suggestion.
- Explain specific Codex contributions with dated implementation evidence.
- Confirm setup and public deployment work from clean environment.
