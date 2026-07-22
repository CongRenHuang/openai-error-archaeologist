# Post-Submission Cleanup and Logo Deployment Design

## Context

`main` already contains the approved Error Archaeologist logo, favicon, palette, header integration, and README mark. The live Cloud Run revision predates that merge. The repository also contains three redundant voice-production trees under `pitch-video/audio/`; Remotion reads only `pitch-video/public/audio/`.

## Goals

- Reduce repository noise without weakening judge reproducibility or development trace.
- Deploy the existing approved logo to the public frontend.
- Preserve application behavior, API configuration, research evidence, and submission documentation.
- Leave no secrets or generated bundles in Git.

## Repository Cleanup

Delete tracked `pitch-video/audio/` in full, including raw Amanda/Sarah recordings, edge-trimmed files, and `final/` copies. Keep `pitch-video/public/audio/scene1.mp3` through `scene7.mp3`, because `Video.tsx` loads those files through Remotion `staticFile()`.

Update `pitch-video/README.md`, `pitch-video/NARRATION.md`, and timing comments in `pitch-video/src/theme.ts` so documentation names `public/audio/` as the retained render source. Remove stale “skeleton” and “no illustration polish” wording. Do not change narration, scene timing, animations, or runtime behavior.

Keep all files under `docs/development/`, `docs/research/`, `docs/submission/`, and `docs/superpowers/specs/`. They document evidence boundaries, implementation decisions, and Codex-assisted development. Keep video source, QR code, package lockfiles, synthetic samples, logo master, and favicon.

Delete local generated `pitch-video/build/`; it remains ignored by Git. After merge, remove only clean, merged `logo-branding` and `submission-polish` worktrees and their local branches. Prune stale worktree metadata. Preserve `.worktrees/demo` and `feat/demo` because its ignored `.env` must not be destroyed.

## Frontend Logo Deployment

No new logo generation or UI redesign is required. Retain:

- `frontend/public/error-archaeologist-logo.png`
- `frontend/public/favicon.png`
- header image reference in `frontend/src/App.tsx`
- favicon and theme-color metadata in `frontend/index.html`
- logo-derived CSS variables in `frontend/src/styles.css`

Deploy the cleaned `main` revision to Cloud Run service `error-archaeologist` in project `openai-error-archaeologist`, region `asia-east1`. Preserve existing model environment variables and Secret Manager binding. Do not print, copy, rotate, or replace the OpenAI API key. Do not invoke a live model analysis during smoke testing.

## Verification

Before merge and deployment:

- Backend fake-adapter suite passes: `MODEL_ADAPTER=fake uv run pytest -q`.
- Frontend workflow tests pass: `node --test frontend/src/workflow.test.ts`.
- Frontend production build passes: `npm --prefix frontend run build`.
- Remotion lint/typecheck and bundle pass; existing non-pure-animation warning may remain.
- `rg` confirms no source or docs reference deleted `pitch-video/audio/` paths.
- Git contains no generated `pitch-video/build/` files.

After deployment:

- Cloud Run routes 100% traffic to the new ready revision.
- Public page and `/api/v1/samples` return HTTP 200.
- Public `/error-archaeologist-logo.png` returns HTTP 200 and matches the repository asset checksum.
- Deployed HTML references `/favicon.png`; deployed JavaScript contains the logo asset path.

## Failure and Rollback

If tests fail, stop before merge. If Cloud Run deployment fails, keep the previous ready revision serving traffic and report the failing build or permission gate. If the new revision is unhealthy, route traffic back to the prior revision. Deleted tracked audio remains recoverable from Git history; removed worktrees are removed only after their commits are verified reachable from `main`.

## Success Criteria

Repository retains only runtime voice files, source, evidence, and development trace; all automated checks pass; existing logo appears on the live frontend; no API secret is exposed or changed; and `main` is pushed with a clean worktree.
