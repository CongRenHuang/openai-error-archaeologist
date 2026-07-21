# Error Archaeologist — Pitch Video (Remotion)

Programmable 3-minute pitch video for the OpenAI Build Week Education-track submission.
**Skeleton stage**: all 6 scenes laid out with correct timing, text, and basic motion. No
illustration polish yet.

## Structure

```
src/
  theme.ts                 palette, fonts, scene timing table (single source of truth)
  Root.tsx                 registers the "ErrorArchaeologist" composition (1920x1080, 30fps, 5250f)
  Video.tsx                stitches the 6 scenes as <Sequence>s
  components/
    primitives.tsx         SceneShell, SceneTitle, ArtifactCard, CandidateCard, EvidenceBar, SyntheticTag
    PipelineRail.tsx       the §5 architecture spine, animated as a progress rail
  scenes/
    Scene1.tsx       0:00 Same answer, different reason (hook)
    Scene2.tsx       0:22 Diagnosis gap, not another tutor (wedge)
    Scene3.tsx       0:40 Evidence Loop  ← WOW moment
    Scene4.tsx       1:26 Failure is product behavior (safety)
    Scene5.tsx       1:56 Feasible wedge & business
    Scene6Codex.tsx  2:16 Built with Codex + GPT-5.6 (REQUIRED narration)
    Scene7Close.tsx  2:40 Why this team / close
NARRATION.md         full voiceover transcript, timed to the table below
```

## Timing (30fps, 5340 frames = 2:58, under the 3:00 cap)

| Scene | Start | Dur | Frames |
|---|---|---|---|
| 1 | 0:00 | 22s | 0–660 |
| 2 | 0:22 | 18s | 660–1200 |
| 3 | 0:40 | 46s | 1200–2580 |
| 4 | 1:26 | 30s | 2580–3480 |
| 5 | 1:56 | 20s | 3480–4080 |
| 6 | 2:16 | 24s | 4080–4800 |
| 7 | 2:40 | 18s | 4800–5340 |

Edit all timings in `src/theme.ts` (`SCENES`).

## Submission requirements coverage

The video satisfies the Build Week video rules; the rest are repo/form items:

- **≤3 min, audio narration explaining Codex + GPT-5.6** → runtime 2:58; Scene 6 + `NARRATION.md`.
- **New/existing-project clause** → Scene 6 timeline strip ("before 7/13: planning docs, 0 code;
  during period: all code, Codex-built") + the note below.
- **English submission** → all narration/onscreen text is English.
- **README explains Codex collaboration** → see next section.

> Not in the video (submission form / main repo README): track selection, project text description,
> repo license, Codex Session ID via `/feedback`, and free unrestricted testing access kept open
> until 8/5.

## The WOW moment (Scene 3)

The probe splits two identical wrong answers apart. Local-frame beats: parse → verifier stamp →
two candidate cards (both fit) → probe generated → predictions diverge → student answer lights
one card, dims the other, evidence bar swings. The visual *is* the argument: you watch uncertainty
resolve.

## Commands

```bash
npm i                                  # install deps
npm run dev                            # Remotion Studio preview
npx remotion still ErrorArchaeologist out.png --frame=2430   # single frame
npx remotion render ErrorArchaeologist out.mp4               # full render
```

## Codex collaboration (this video project)

Where Codex accelerated the workflow, and what the humans decided — fill dated specifics before
submitting; the frame is accurate for this session:

- **Codex accelerated:** scaffolded the Remotion project, built the 7-scene timing system and
  reusable components (ArtifactCard, CandidateCard, EvidenceBar, PipelineRail), wrote the narration
  transcript, and verified renders (`tsc` + still frames).
- **Humans decided:** the storyboard framework and the wow moment (the probe that splits two
  identical wrong answers), the honesty gates, scene budget under 3:00, and every claim's wording.
- **Influence on outcome:** the "AI proposes / math verifies / teacher decides" framing and the
  abstain-over-verdict stance were held firm by the humans; Codex executed the animation and copy.

> Before this period the repository held only planning documents — zero code. All code was written
> during the Submission Period with Codex, evidenced by the dated commit history.

## Honesty gates (from docs/briefing) — do NOT ship without

- Every algebra sample carries an onscreen `SYNTHETIC SAMPLE` tag (`SyntheticTag`).
- Scene 5 aggregate labeled `SIMULATED`.
- Scene 4 shows *behavior* (abstain / slip / CAT), never a headline accuracy number.
- Scene 6 live URL is a swappable prop — placeholder until deployment is tested.
- Replace planned visuals with captured product evidence only after implementation + benchmark gates.
