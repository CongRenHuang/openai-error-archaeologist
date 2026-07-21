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
    Scene1.tsx  0:00 Same answer, different reason (hook)
    Scene2.tsx  0:25 Diagnosis gap, not another tutor (wedge)
    Scene3.tsx  0:45 Evidence Loop  ← WOW moment
    Scene4.tsx  1:35 Failure is product behavior (safety)
    Scene5.tsx  2:10 Feasible wedge & business
    Scene6.tsx  2:35 Why this team / close
```

## Timing (30fps, 5250 frames = 2:55)

| Scene | Start | Dur | Frames |
|---|---|---|---|
| 1 | 0:00 | 25s | 0–750 |
| 2 | 0:25 | 20s | 750–1350 |
| 3 | 0:45 | 50s | 1350–2850 |
| 4 | 1:35 | 35s | 2850–3900 |
| 5 | 2:10 | 25s | 3900–4650 |
| 6 | 2:35 | 20s | 4650–5250 |

Edit all timings in `src/theme.ts` (`SCENES`).

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

## Honesty gates (from docs/briefing) — do NOT ship without

- Every algebra sample carries an onscreen `SYNTHETIC SAMPLE` tag (`SyntheticTag`).
- Scene 5 aggregate labeled `SIMULATED`.
- Scene 4 shows *behavior* (abstain / slip / CAT), never a headline accuracy number.
- Scene 6 live URL is a swappable prop — placeholder until deployment is tested.
- Replace planned visuals with captured product evidence only after implementation + benchmark gates.
