# Pitch Video Illustration System Design

## Goal

Create seven coherent editorial illustrations that support the existing Error Archaeologist Remotion scenes without replacing their evidence, algebra, narration, timing, or calls to action.

## Visual System

Use flat editorial paper-cut diagrams. Opaque layered shapes combine classroom figures, archaeological strata, algebra artifacts, evidence paths, and verification machinery. The treatment should feel rigorous and human rather than playful or photorealistic.

Use the current video palette:

- Navy `#0B1020` and soft navy `#141A2E` for structure.
- Parchment `#EDE6D6` for artifacts and human figures.
- Amber `#F5A623` for evidence.
- Teal `#3DD6C4` for mathematical verification.
- Red `#E5484D` for error and abstention.
- Violet `#8B7FF5` for supported hypotheses.

Each illustration uses a transparent background, strong silhouette, limited internal detail, and no rendered words, numbers, equations, logos, shadows, gradients, or watermarks. Exact copy and mathematics remain native Remotion elements.

## Asset Contract

- Seven 1024×1024 transparent PNGs.
- Store under `pitch-video/public/illustrations/`.
- Stable names `scene-01-hook.png` through `scene-07-close.png`.
- Generate each asset separately with the built-in image tool on a uniform magenta chroma-key background, then remove the key locally.
- Preserve generous outer padding so animation never clips the subject.
- Confirm alpha channel, transparent corners, plausible subject coverage, clean edges, and legibility at rendered scene size.

## Scene Concepts

### Scene 1 — Hook

Two mirrored student silhouettes hold identical answer artifacts. Beneath them, excavated layers diverge: one repeated sign-pattern stratum, one isolated displaced fragment. Composition communicates same visible result and different buried cause.

### Scene 2 — Wedge

Screening and intervention appear as two stable platforms separated by a broken span. A glowing diagnostic evidence piece completes the bridge. Composition leaves room for the existing three-node explanation.

### Scene 3 — Evidence Loop

A handwriting artifact enters a compact evidence machine. One model-proposal path branches into two hypothesis layers; a verified probe passes through a teal mathematical gate and collapses support toward one branch. This is the most detailed illustration but remains subordinate to the exact on-screen algebra.

### Scene 4 — Failure Behavior

Four guarded pathways represent ambiguity, isolated slip, broken intermediate step, and unmatched response. Red gates stop unsupported conclusions; teal routes continue only when evidence is sufficient. No failure state is visually treated as a crash.

### Scene 5 — Business Wedge

An educator-time hourglass feeds an intervention-team workflow, then a measured three-step expansion ladder. Present scarcity and sequencing without currency symbols or unsupported revenue claims.

### Scene 6 — Codex and GPT-5.6

Two coordinated rails show model proposals and deterministic mathematics. A scaffold surrounding both represents Codex building, auditing, and enforcing their boundary. Forward branches suggest broader taxonomy, adaptive probes, and teacher trends without adding product screenshots.

### Scene 7 — Close

A stylized Taiwan origin point connects through traceable evidence threads to an open inquiry symbol. An open evidence frame replaces a verdict stamp, reinforcing the principle that the system asks a question capable of changing its mind.

## Remotion Integration

Add one reusable `SceneIllustration` component that loads a static PNG, controls absolute placement and size, applies existing `fadeUp` timing, and adds subtle frame-driven parallax. Component remains decorative with an empty alt value.

Integrate one asset into each scene. Position illustrations behind or beside current content with restrained opacity. Adjust local layout spacing only when needed to prevent overlap. Preserve current scene durations, voiceover synchronization, QR code, live URL, evidence cards, and mathematical expressions.

## Error Handling

- If generated text or malformed symbols appear, regenerate that scene with a single correction prompt.
- If chroma removal leaves magenta fringe, retry once with one-pixel edge contraction.
- If an illustration obscures required content, resize or reposition it; do not remove or rewrite required content.
- If a generated concept implies unsupported accuracy, outcomes, or revenue, reject and regenerate it.

## Verification

- Validate all PNG dimensions and transparency with Pillow.
- Inspect every full-size asset and a contact sheet.
- Type-check and lint the Remotion project.
- Render representative frames from all seven scenes and inspect layout, readability, clipping, and visual continuity.
- Render full video only after representative frames pass.
- Run `git diff --check` and preserve all pre-existing user changes.

## Out of Scope

- Narration, timing, audio, logo, QR code, or business-copy changes.
- Photorealistic people, character continuity across scenes, or new product claims.
- Replacing native text, equations, evidence cards, or deterministic-verification UI with raster content.
