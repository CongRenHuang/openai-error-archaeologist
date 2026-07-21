# Error Archaeologist Logo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate a compact Error Archaeologist logo and integrate its palette across the demo header, favicon, and README.

**Architecture:** Generate one square chroma-keyed raster mark with the built-in image tool, remove its background locally, and derive a small favicon from the same transparent master. Consume the master as a static Vite asset while centralizing its exact deep-teal, oxide, and paper colors in CSS custom properties.

**Tech Stack:** OpenAI built-in image generation, Python 3.13, Pillow 11, React 19, TypeScript, Vite 7, CSS.

## Global Constraints

- Use a flat circular excavation seal with horizontal geological strata revealing part of an algebraic `x`.
- Use deep teal `#183238`, oxide `#af4d34`, and warm paper `#f4f0e6`.
- Keep the mark recognizable at 32 pixels.
- Include no wordmark, gradients, mockup framing, shadow, or watermark.
- Preserve the existing “Error Archaeologist” HTML wordmark and accessible home-link name.
- Store project assets under `frontend/public/`.
- Do not redesign typography, layout, animation, or product copy.

---

### Task 1: Generate and Validate Logo Assets

**Files:**
- Create: `frontend/public/error-archaeologist-logo.png`
- Create: `frontend/public/favicon.png`

**Interfaces:**
- Consumes: approved visual concept and exact palette from global constraints.
- Produces: `/error-archaeologist-logo.png` transparent 1024×1024 master and `/favicon.png` transparent 64×64 derivative.

- [ ] **Step 1: Generate keyed source with built-in image tool**

Invoke built-in image generation once with this exact prompt:

```text
Use case: logo-brand
Asset type: demo application logo and favicon source
Primary request: Create an original flat circular excavation seal for “Error Archaeologist.” Horizontal geological strata reveal part of a bold algebraic x, combining mathematical evidence analysis with archaeology. The x must remain recognizable when the mark is reduced to 32 pixels.
Style/medium: vector-friendly logo mark rendered as a crisp flat raster image
Composition/framing: one centered square mark, circular outer silhouette, balanced negative space, generous padding
Color palette: exact deep teal #183238, exact oxide #af4d34, and exact warm paper #f4f0e6 only
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background for removal
Constraints: no text, no letters other than the algebraic x symbol, no gradients, no mockup, no 3D, no shadow, no texture, no watermark; background must be one uniform #00ff00 with no lighting variation; keep mark fully separated from background with crisp edges; never use #00ff00 inside mark
```

Copy returned image from its generated-images path to `tmp/imagegen/error-archaeologist-logo-keyed.png`.

- [ ] **Step 2: Remove chroma-key background**

Run:

```bash
mkdir -p tmp/imagegen frontend/public
uv run python "${CODEX_HOME:-$HOME/.codex}/skills/.system/imagegen/scripts/remove_chroma_key.py" \
  --input tmp/imagegen/error-archaeologist-logo-keyed.png \
  --out frontend/public/error-archaeologist-logo.png \
  --auto-key border \
  --soft-matte \
  --transparent-threshold 12 \
  --opaque-threshold 220 \
  --despill
```

Expected: command exits 0 and writes a transparent PNG.

- [ ] **Step 3: Derive favicon from transparent master**

Run:

```bash
uv run python - <<'PY'
from pathlib import Path
from PIL import Image

source = Path("frontend/public/error-archaeologist-logo.png")
target = Path("frontend/public/favicon.png")
with Image.open(source) as image:
    image.convert("RGBA").resize((64, 64), Image.Resampling.LANCZOS).save(target)
PY
```

Expected: command exits 0 and writes a 64×64 RGBA PNG.

- [ ] **Step 4: Validate transparency, dimensions, and coverage**

Run:

```bash
uv run python - <<'PY'
from pathlib import Path
from PIL import Image

for path, expected_size in (
    (Path("frontend/public/error-archaeologist-logo.png"), (1024, 1024)),
    (Path("frontend/public/favicon.png"), (64, 64)),
):
    with Image.open(path) as image:
        assert image.mode == "RGBA", (path, image.mode)
        assert image.size == expected_size, (path, image.size)
        alpha = image.getchannel("A")
        assert alpha.getpixel((0, 0)) == 0, (path, "corner is not transparent")
        bounds = alpha.getbbox()
        assert bounds is not None, (path, "empty image")
        coverage = sum(value > 0 for value in alpha.getdata()) / (image.width * image.height)
        assert 0.15 <= coverage <= 0.80, (path, coverage)
        print(path, image.size, f"coverage={coverage:.3f}")
PY
```

Expected: both asset paths print with coverage between 0.150 and 0.800.

- [ ] **Step 5: Visually inspect both assets**

Open `frontend/public/error-archaeologist-logo.png` and `frontend/public/favicon.png`. Confirm circular silhouette, visible strata, readable `x`, transparent background, crisp edges, and no green fringe. If fringe exists, rerun Step 2 once with `--edge-contract 1`, then repeat Steps 3–5.

- [ ] **Step 6: Commit assets**

```bash
git add frontend/public/error-archaeologist-logo.png frontend/public/favicon.png
git commit -m "Add Error Archaeologist logo assets"
```

### Task 2: Integrate Logo and Canonical Palette

**Files:**
- Modify: `frontend/src/App.tsx:105-110`
- Modify: `frontend/src/styles.css:1-46`
- Modify: `frontend/index.html:4-6`
- Modify: `README.md:1-3`

**Interfaces:**
- Consumes: `/error-archaeologist-logo.png` and `/favicon.png` from Task 1.
- Produces: accessible header logo, browser favicon, README branding, and canonical CSS palette variables.

- [ ] **Step 1: Replace placeholder header initials with logo image**

Change masthead markup in `frontend/src/App.tsx` to:

```tsx
<header className="masthead">
  <a className="wordmark" href="#top" aria-label="Error Archaeologist home">
    <img
      className="wordmark-mark"
      src="/error-archaeologist-logo.png"
      alt=""
      width="40"
      height="40"
    />
    <span>Error Archaeologist</span>
  </a>
  <p className="track">OpenAI Build Week · Education</p>
</header>
```

- [ ] **Step 2: Make logo palette canonical in CSS**

Replace `:root` variable block in `frontend/src/styles.css` with:

```css
:root {
  color: #17272b;
  background: #d9d5c8;
  font-family: "Avenir Next", Avenir, "Segoe UI", sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  --brand-deep: #183238;
  --brand-oxide: #af4d34;
  --brand-paper: #f4f0e6;
  --ink: #17272b;
  --deep: var(--brand-deep);
  --paper: var(--brand-paper);
  --bone: #e8e1d2;
  --teal: #1f6e73;
  --oxide: var(--brand-oxide);
  --graphite: #657074;
  --focus: #d97852;
  --warm: #e7a76d;
  --warm-hover: #f1b77f;
  --teal-mid: #78aeb0;
  --teal-soft: #9ad0c6;
  --line: rgba(23, 39, 43, 0.2);
}
```

Replace `.wordmark-mark` with:

```css
.wordmark-mark {
  display: block;
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  object-fit: contain;
}
```

Replace repeated palette literals in remaining stylesheet:

```text
#d97852 → var(--focus)
#e7a76d → var(--warm)
#f1b77f → var(--warm-hover)
#78aeb0 → var(--teal-mid)
#9ad0c6 → var(--teal-soft)
```

- [ ] **Step 3: Register favicon and align browser chrome**

Add this line after viewport meta tag in `frontend/index.html`:

```html
<link rel="icon" type="image/png" href="/favicon.png" />
```

Keep existing theme color `#183238`, matching `--brand-deep`.

- [ ] **Step 4: Add logo to README**

Insert this immediately below `# Error Archaeologist`:

```markdown
<img src="frontend/public/error-archaeologist-logo.png" alt="Error Archaeologist logo" width="120" />
```

- [ ] **Step 5: Run focused checks**

Run:

```bash
node --test frontend/src/workflow.test.ts
npm --prefix frontend run build
git diff --check
```

Expected: workflow tests pass, Vite production build succeeds, and `git diff --check` prints nothing.

- [ ] **Step 6: Inspect production rendering**

Run:

```bash
MODEL_ADAPTER=fake uv run uvicorn backend.app.main:app --reload
```

Open `http://127.0.0.1:8000`. Confirm 40×40 logo aligns with wordmark, favicon loads, focus ring remains visible, and interface colors match logo. Stop server after inspection.

- [ ] **Step 7: Commit integration**

```bash
git add frontend/src/App.tsx frontend/src/styles.css frontend/index.html README.md
git commit -m "Integrate logo and align app palette"
```

### Task 3: Final Verification

**Files:**
- Verify: `frontend/public/error-archaeologist-logo.png`
- Verify: `frontend/public/favicon.png`
- Verify: `frontend/src/App.tsx`
- Verify: `frontend/src/styles.css`
- Verify: `frontend/index.html`
- Verify: `README.md`

**Interfaces:**
- Consumes: completed Tasks 1–2.
- Produces: verified project state ready for user review.

- [ ] **Step 1: Run complete relevant verification**

Run:

```bash
MODEL_ADAPTER=fake uv run pytest backend/tests -v
node --test frontend/src/workflow.test.ts
npm --prefix frontend run build
docker compose config
git diff --check
```

Expected: backend tests pass, frontend tests pass, Vite production build succeeds, Compose config renders, and `git diff --check` prints nothing.

- [ ] **Step 2: Review scoped diff and repository state**

Run:

```bash
git diff HEAD~2 -- README.md frontend/index.html frontend/src/App.tsx frontend/src/styles.css frontend/public/error-archaeologist-logo.png frontend/public/favicon.png
git status --short
```

Expected: scoped diff contains only approved branding work; unrelated pre-existing `pitch-video/` changes remain untouched.

