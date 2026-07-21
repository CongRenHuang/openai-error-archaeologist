# Error Archaeologist — Narration Transcript

Voiceover script for the ≤3-minute demo video. Timecodes match `src/theme.ts` (30fps).
Total runtime **2:58**. Pace target ≈ 135 wpm (≈2.25 words/sec) — leaves room for pauses.

> **Submission requirement met here:** Scene 6 narration explicitly explains how **Codex** and
> **GPT-5.6** were used (maps to judging criteria ① and ④). Do not cut Scene 6.

> **Honesty gate (from `docs/briefing`):** before recording, replace any planned-state claim with
> actual status. Every math figure (e.g. NAEP 39%) and every "built" claim must be true at record
> time. Samples shown are synthetic and labeled onscreen. Do not narrate validation or a live URL
> that does not yet exist.

Math is spelled phonetically in brackets for the voice actor / TTS.

---

## Scene 1 — Hook · 0:00–0:22 (22s)

Two students. Same wrong answer. Negative-three times x-minus-two becomes
[negative-three-x minus six]. But one mishandled the negative sign — the other distributed only to
the first term. Same answer, different misunderstanding. Give them the same reteach, and you waste
one student's time.

## Scene 2 — Wedge · 0:22–0:40 (18s)

Screening shows who's behind; tutoring supplies the fix. The diagnosis in between has no scalable
tool. We solve one expensive decision: what evidence explains this student's error — and what should
the teacher test next?

## Scene 3 — Evidence Loop (WOW) · 0:40–1:26 (46s)

Here's how. The model reads the handwriting and localizes the step that matters. A deterministic
algebra checker — not the model — confirms the first invalid transition. Then the taxonomy proposes
two plausible explanations that both fit the evidence. This is the key move: instead of guessing,
the system generates one follow-up probe — expand [negative-four times b-minus-three] — and a
symbolic solver verifies the two hypotheses predict different answers: [negative-four-b minus twelve],
or [negative-four-b minus three]. The student answers [negative-four-b minus twelve]. One hypothesis
gains support; the other falls away. The evidence moves. Model proposes, mathematics verifies, and
the teacher decides whether to act.

## Scene 4 — Failure Is Product Behavior · 1:26–1:56 (30s)

Failure is a designed behavior, not an accident. Ambiguous handwriting? It abstains and says what's
unclear. An isolated slip stays out of the misconception count. A correct final answer never hides a
broken step. And an unmatched response never forces a label. We report how the system behaves at
every abstention level — not a single headline accuracy number from thirty-odd synthetic samples.

## Scene 5 — Feasible Wedge & Business · 1:56–2:16 (20s)

Who pays? We start with intervention teams, not every teacher. The tutoring provider pays an annual
platform fee plus usage, because diagnosis competes directly with scarce educator time. Next come
embedded curriculum APIs, then districts — after privacy review and outcome evidence.

## Scene 6 — Built with Codex + GPT-5.6 (REQUIRED) · 2:16–2:40 (24s)

Built with Codex and GPT-5.6. Codex audited our sources, flagged overclaims, critiqued the
architecture, and scaffolded this pipeline and video. We made the calls that matter — diagnosis as a
hypothesis, never a verdict. GPT-5.6 is the reasoning engine; deterministic math verifies it. Before
this period: planning docs, zero code. Every line written during the period, with Codex — on a dated
commit history.

## Scene 7 — Why This Team / Close · 2:40–2:58 (18s)

Designed in Taiwan from traceable U.S. public evidence. Here's the principle: A.I. should not
declare why a student is wrong. It should show the evidence — and ask a question capable of changing
its mind.

---

## Word budget check

| Scene | Dur | Words | wps |
|---|---|---|---|
| 1 | 22s | ~52 | 2.4 |
| 2 | 18s | ~37 | 2.1 |
| 3 | 46s | ~105 | 2.3 |
| 4 | 30s | ~65 | 2.2 |
| 5 | 20s | ~44 | 2.2 |
| 6 | 24s | ~57 | 2.4 |
| 7 | 18s | ~40 | 2.2 |
| **Total** | **2:58** | **~400** | **2.25** |

## Recording notes

- Read Scene 3 slightly slower — it carries the payoff; let the "evidence moves" beat land.
- Add ~0.4s breath between scenes; the 2s total margin under 3:00 absorbs it.
- If a scene runs long against picture, trim the least-load sentence rather than rushing.
- Other submission items live outside this file: track selection, text description, repo license,
  README Codex-collaboration section, Codex Session ID via `/feedback`, and testing access kept
  open until 8/5.
