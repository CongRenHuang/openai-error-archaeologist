# Repository Guidelines

## Project Structure & Module Organization

This repository contains planning research plus a runnable Error Archaeologist demo.

- `backend/app/` contains FastAPI routes, model adapters, SQLite repository, and deterministic SymPy domain logic. Tests live in `backend/tests/`.
- `frontend/src/` contains React UI and workflow types. Vite builds into `frontend/dist/`.
- `backend/app/static/samples/` contains synthetic PNG fixtures; regenerate them with `backend/scripts/generate_samples.py`.
- `docs/proposals/` contains strategy and product evidence. `docs/superpowers/` records approved design and implementation plan.
- `docs/briefing/` contains briefing notes and rendered reference material.

Keep new documents in the closest existing directory. Use descriptive, kebab-case filenames, optionally prefixed for ordered proposals, such as `05-new-concept.md`.

## Build, Test, and Development Commands

```sh
uv sync --python 3.13                    # install Python dependencies
npm --prefix frontend install            # install frontend dependencies
MODEL_ADAPTER=fake uv run pytest          # run backend tests without secrets
node --test frontend/src/workflow.test.ts # run workflow-state tests
npm --prefix frontend run build           # type-check and build UI
docker compose up --build                 # run full demo at localhost:8000
```

## Coding Style & Naming Conventions

Use Python 3.13, four-space indentation, type hints, Pydantic contracts, and focused modules. Python files/functions use `snake_case`; classes use `PascalCase`. React uses TypeScript, two-space indentation, `PascalCase` components, and `camelCase` functions. Keep API fields `snake_case` to match Pydantic. Never bypass `domain/verifier.py` for probe decisions.

## Testing Guidelines

Follow red-green-refactor for behavior changes. Name Python tests `test_*.py`; keep pure frontend workflow tests as `*.test.ts`. Use fake adapter in automated tests. Live GPT-5.6 calls require explicit approval and must never run in default test command. Before commit, run focused tests, then full commands above and `git diff --check`.

## Commit & Pull Request Guidelines

Recent history uses short, imperative, sentence-case subjects, for example `Add reference search plan and validation results`. Keep each commit focused; add a body when explaining source changes or non-obvious decisions.

Pull requests should summarize purpose, verification output, affected routes, and privacy impact. Include screenshots for UI changes and failure/abstention behavior. Never commit `.env`, API keys, real student data, generated SQLite files, or unpublished personal information.

## Security & Configuration

Copy `.env.example` to ignored `.env`. Secrets belong only in local environment or Secret Manager. Demo accepts curated synthetic samples only. SQLite is disposable and not production storage. Preserve visible fixture/live source labels.
