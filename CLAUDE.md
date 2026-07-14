# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo state

Pre-code planning repo for OpenAI Build Week 2026 (July 13–21, submissions; judging through Aug 9; winners Aug 12). No app scaffold, no build/lint/test tooling exists yet — this repo is currently pure strategy/research docs. Once implementation starts, update this section with real build/test/lint commands.

## Structure

- `docs/proposals/00-strategy.md` — single merged source of truth: official hackathon facts (§0, fact-checked 2026-07-14 against openai.devpost.com + Official Rules — dates, tracks, prizes, judges, submission requirements) plus overall strategy (team is 2 people at ~half-time, ~80–100 person-hours total, targeting the now-confirmed **Education** track). Formerly split across a root `index.md` (fact-check) and this file (strategy); merged 2026-07-14 so there's one file to keep in sync. `❌ 更正` markers note corrections to earlier drafts — trust the corrected values over any cached knowledge about "Build Week."
- `docs/proposals/01-04-*.md` — four competing project proposals, ranked in `00-strategy.md`. **Proposal A, "錯誤考古學家" (Error Archaeologist)** — a GPT-5.6-based system diagnosing *why* a student made a math mistake, not just marking it wrong — is the recommended lead pick; proposal B (Protégé Effect Tutor) is a fallback that can merge in as a bonus module if time allows.
- `docs/res/codex/`, `docs/res/gemini/`, `docs/res/grok/` — deep-research outputs and reference validation reports from different AI tools used to fact-check hackathon claims and evaluate proposal A.
- `docs/res/web/` — reference material on competing/prior hackathon projects (e.g. GitLab Duo Agent Platform) used for competitive analysis.

## Working in this repo

- All docs mixing Chinese (analysis/strategy) and English (proposal titles, technical terms) — match the existing language per file rather than translating.
- Tracks are confirmed (Apps for Your Life / Work and Productivity / Developer Tools / Education) — `00-strategy.md` §5 records the resolved decision: proposal A targets **Education**, no more decision-tree guessing needed.
- Feature freeze is planned for the night of 7/19; after that, only demo/docs/polish work per the strategy doc.
