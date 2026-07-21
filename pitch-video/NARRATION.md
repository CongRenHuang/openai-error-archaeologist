# Error Archaeologist — Narration Transcript

Voiceover script for the ≤3-minute demo video. Timecodes match the **recorded Amanda VO**
(`audio/trim/sceneN.mp3`) and `src/theme.ts` (30fps). Total runtime **2:59.4**.

> **Submission requirement met here:** Scene 6 narration explicitly explains how **Codex** and
> **GPT-5.6** were used (maps to judging criteria ① and ④). Do not cut Scene 6.

> **Honesty gate (from `docs/briefing`):** before recording, replace any planned-state claim with
> actual status. Every math figure (e.g. NAEP 39%) and every "built" claim must be true at record
> time. Samples shown are synthetic and labeled onscreen. Do not narrate validation or a live URL
> that does not yet exist.

Math is spelled phonetically in brackets for the voice actor / TTS.

---

## Scene 1 — Hook · 0:00–0:20 (20.2s)

Two students. Same wrong answer. Negative-three times x-minus-two becomes negative-three-x minus six. But one has a systematic sign misconception — the other just slipped once. Same answer, different cause. Give them the same reteach, and you waste one student's time.

## Scene 2 — Wedge · 0:20–0:35 (15.0s)

Screening shows who's behind; tutoring supplies the fix. The diagnosis in between has no scalable tool. We solve one expensive decision: what evidence explains this student's error — and what should the teacher test next?

## Scene 3 — Evidence Loop (WOW) · 0:35–1:27 (51.6s)

Here's how. The model reads the handwriting and localizes the step that matters. A deterministic algebra checker — not the model — confirms the first invalid transition. Then the taxonomy proposes two causes that both explain the same mistake: a systematic sign misconception, or a one-off slip. This is the key move: instead of guessing, the system generates one follow-up probe — expand [negative-four times b-minus-three] — and a symbolic solver verifies the two causes predict different answers: [negative-four-b minus twelve] if the error is systematic, or [negative-four-b plus twelve] if it was only a slip. The student answers [negative-four-b minus twelve]. The systematic misconception gains support; the slip falls away. The evidence moves. Model proposes, mathematics verifies, and the teacher decides whether to act.

## Scene 4 — Failure Is Product Behavior · 1:27–1:53 (26.7s)

Failure is a designed behavior, not an accident. Ambiguous handwriting? It abstains and says what's unclear. An isolated slip stays out of the misconception count. A correct final answer never hides a broken step. And an unmatched response never forces a label. We report how the system behaves at every abstention level — not a single headline accuracy number from thirty-odd synthetic samples.

## Scene 5 — Feasible Wedge & Business · 1:53–2:13 (19.9s)

Who pays? We start with intervention teams, not every teacher. The tutoring provider pays an annual platform fee plus usage, because diagnosis competes directly with scarce educator time. Next come embedded curriculum APIs, then districts — after privacy review and outcome evidence.

## Scene 6 — Built with Codex + GPT-5.6 (REQUIRED) · 2:14–2:44 (~30s)

Under the hood: GPT-5.6 reads the student's work and proposes why they erred — but it never has the last word. A deterministic engine re-derives the algebra and builds a probe that can falsify that guess. Codex built this pipeline with us — auditing sources, flagging overclaims, and enforcing the line between what the model proposes and what mathematics proves. Next, we extend the taxonomy beyond algebra, sequence probes into an adaptive interview, and surface misconception trends for teachers. AI proposes, mathematics verifies, teachers decide — at scale.

## Scene 7 — Why This Team / Close · 2:45–2:58.6 (14.1s)

Designed in Taiwan from traceable U.S. public evidence. Here's the principle: A.I. should not declare why a student is wrong. It should show the evidence — and ask a question capable of changing its mind.

---

## Word budget check

Durations below are the **recorded** Amanda VO (edge-silence trimmed), not the plan.

| Scene | Dur | Words | wps |
|---|---|---|---|
| 1 | 17.0s | ~55 | 3.2 |
| 2 | 14.2s | ~37 | 2.6 |
| 3 | 51.8s | ~120 | 2.3 |
| 4 | 25.4s | ~65 | 2.6 |
| 5 | 18.9s | ~44 | 2.3 |
| 6 | 32.4s | ~57 | 1.8 |
| 7 | 13.4s | ~40 | 3.0 |
| **Total VO** | **2:53.1** | **~418** | **2.4** |

Video runtime with 12f inter-scene gaps + tails = **5381 frames = 2:59.4** (< 3:00 cap).

## Recording notes

- VO is recorded; scene durations in `theme.ts` are locked to these files, so picture
  follows voice. To re-time, re-trim the mp3 and update the matching `SCENES.sN.dur`.
- Total is 1.4s under the 3:00 cap — no room to lengthen without trimming elsewhere.
- Other submission items live outside this file: track selection, text description, repo license,
  README Codex-collaboration section, Codex Session ID via `/feedback`, and testing access kept
  open until 8/5.
