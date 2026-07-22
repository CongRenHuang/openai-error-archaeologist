# Error Archaeologist — Pitch Video (Remotion)

Programmable 3-minute pitch video for the OpenAI Build Week Education-track submission.
All 7 illustrated scenes are timed to the recorded Amanda voiceover and ready to render.

## Structure

```
src/
  theme.ts                 palette, fonts, scene timing table (single source of truth)
  Root.tsx                 registers the "ErrorArchaeologist" composition (1920x1080, 30fps, 5359f)
  Video.tsx                stitches the 7 scenes as <Sequence>s, each with its Amanda VO <Audio>
public/audio/              retained sceneN.mp3 render assets loaded through staticFile()
  components/
    primitives.tsx         SceneShell, SceneTitle, ArtifactCard, CandidateCard, EvidenceBar, SyntheticTag
    PipelineRail.tsx       the §5 architecture spine, animated as a progress rail
  scenes/
    Scene1.tsx       0:00 Same answer, different reason (hook)
    Scene2.tsx       0:20 Diagnosis gap, not another tutor (wedge)
    Scene3.tsx       0:35 Evidence Loop  ← WOW moment
    Scene4.tsx       1:27 Failure is product behavior (safety)
    Scene5.tsx       1:53 Feasible wedge & business
    Scene6Codex.tsx  2:13 Built with Codex + GPT-5.6 (REQUIRED narration)
    Scene7Close.tsx  2:45 Why this team / close
NARRATION.md         full voiceover transcript (the recorded Amanda VO)
```

## Timing (30fps, 5374 frames = 2:59.1, under the 3:00 cap)

Durations are **locked to the recorded Amanda voiceover** in `public/audio/`, rounded to
frames + 16f tail; 12f gap between scenes.
Picture follows voice, not the reverse.

| Scene | Start | Dur | Frames | VO |
|---|---|---|---|---|
| 1 | 0:00 | 593 | 0–593 | 19.23s |
| 2 | 0:20 | 445 | 605–1050 | 14.29s |
| 3 | 0:35 | 1491 | 1062–2553 | 49.16s |
| 4 | 1:25 | 779 | 2565–3344 | 25.42s |
| 5 | 1:52 | 584 | 3356–3940 | 18.91s |
| 6 | 2:12 | 991 | 3952–4943 | 32.47s |
| 7 | 2:45 | 419 | 4955–5374 | 13.40s |

Edit all timings in `src/theme.ts` (`SCENES`).

## Submission requirements coverage

The video satisfies the Build Week video rules; the rest are repo/form items:

- **≤3 min, audio narration explaining Codex + GPT-5.6** → runtime 2:59.7; Scene 6 (the stack,
  Codex's role, roadmap) + `NARRATION.md`.
- **New/existing-project clause** → repo/form item, stated in the Codex-collaboration section
  below. Intentionally **not** shown in-video (Scene 6 now leads with tech + future value; all
  work done during Build Week).
- **English submission** → all narration/onscreen text is English.
- **README explains Codex collaboration** → see next section.
- **Live demo** → Scene 7 shows a scannable QR (`public/qr.png`) to the Cloud Run URL.

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
