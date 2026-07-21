# Repository Guidelines

## Project Structure & Module Organization

This repository is currently a planning and research workspace for OpenAI Build Week 2026; it does not contain an application scaffold yet.

- `docs/proposals/` contains strategy and project proposals. Treat `00-strategy.md` as the main source of truth and `README-error-archaeologist.md` as the submission-oriented overview.
- `docs/briefing/` contains briefing notes and rendered reference material.
- `docs/res/` stores research grouped by source (`codex/`, `gemini/`, `grok/`, and `web/`). Preserve source attribution when updating these files.
- `CLAUDE.md` records repository-specific context for coding agents.

Keep new documents in the closest existing directory. Use descriptive, kebab-case filenames, optionally prefixed for ordered proposals, such as `05-new-concept.md`.

## Build, Test, and Development Commands

No build system, package manager, development server, or automated test suite is configured. Useful repository checks are:

```sh
rg --files docs                 # inventory tracked document paths
git diff --check               # detect whitespace and conflict-marker errors
git status --short             # review intended changes before committing
```

When application code is added, document its install, run, lint, and test commands here and in `CLAUDE.md`.

## Coding Style & Naming Conventions

Write concise Markdown with ATX headings (`#`, `##`), short paragraphs, and fenced code blocks with language tags. Match each file's existing language: strategy analysis is primarily Traditional Chinese, while product names and technical terms may remain English. Keep heading levels sequential and relative links valid. Do not silently replace corrected hackathon facts or remove `❌ 更正` markers without rechecking primary sources.

## Testing Guidelines

Validation is currently editorial. Before submitting changes, render affected Markdown, verify links and citations, compare factual claims against primary sources, and run `git diff --check`. For HTML or PDF changes, inspect rendered output visually. Future code should add colocated or dedicated tests and define framework-specific naming rules with the scaffold.

## Commit & Pull Request Guidelines

Recent history uses short, imperative, sentence-case subjects, for example `Add reference search plan and validation results`. Keep each commit focused; add a body when explaining source changes or non-obvious decisions.

Pull requests should summarize purpose, list affected documents, link related issues or primary sources, and call out corrected facts. Include screenshots for visual HTML/PDF changes. Never commit API keys, student data, or unpublished personal information.
