# Error Archaeologist Logo Design

## Goal

Create a compact logo for the Error Archaeologist demo and make its colors the source of truth for the existing interface palette. The mark must remain recognizable in the header and as a browser favicon while fitting the app's evidence-led, editorial visual style.

## Visual Concept

Use a flat circular excavation seal. Horizontal geological strata reveal part of an algebraic `x`, combining mathematical error analysis with archaeology without relying on a literal character or tool illustration.

The mark uses a clear silhouette, generous internal spacing, and limited detail so it remains legible at 32 pixels. It contains no wordmark because the interface already renders “Error Archaeologist” as accessible HTML text.

## Palette

- Deep teal: primary structure and interface ink.
- Oxide: exposed mathematical fragment and interface accent.
- Warm paper: negative space and page surface.

Generated logo colors become the canonical CSS custom properties. Existing hard-coded teal, oxide, paper, and related interaction colors should be expressed through those variables where practical. Contrast must remain sufficient for text, controls, and focus indicators.

## Asset Requirements

- Transparent PNG source for header and README use.
- Square composition with no text, gradients, mockup framing, shadow, or watermark.
- Favicon derived from the same mark, not a separate visual concept.
- Project assets stored under `frontend/public/` and referenced by repository-relative paths.

## Integration

- Replace the current `EA` placeholder circle in `frontend/src/App.tsx` with the generated mark.
- Preserve the existing home-link accessible name and adjacent text wordmark.
- Add favicon reference through the Vite HTML entry point.
- Add the logo near the README title without changing product copy.
- Update `frontend/src/styles.css` so the header asset scales cleanly and the app palette aligns with the mark.

## Verification

- Inspect transparency, edge quality, and legibility at header and favicon sizes.
- Run the frontend production build.
- Run existing frontend workflow tests.
- Run `git diff --check`.

## Out of Scope

- New typography, layout redesign, animation, or product-name changes.
- SVG tracing or a broader brand-guideline system.
