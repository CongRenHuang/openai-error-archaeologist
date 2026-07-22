// Design tokens for the Error Archaeologist pitch video.
// "Deterministic = the brand": archaeology navy base, parchment artifacts,
// amber evidence, teal = math-verified, red = error/abstain.

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// Aligned to the frontend brand (frontend/src/styles.css): archaeology deep-teal
// base, paper artifacts, oxide accents, warm evidence, teal-soft = verified.
export const COLORS = {
  bg: "#0E3238", // frontend --brand-deep
  bgSoft: "#123A40",
  parchment: "#F6F0E4", // frontend --brand-paper
  ink: "#17272B", // frontend --ink (text on paper)
  amber: "#E7A76D", // frontend --warm : evidence highlight
  teal: "#9AD0C6", // frontend --teal-soft : verified / math-checked
  red: "#BA3B1F", // frontend --brand-oxide : error / abstain
  violet: "#BA3B1F", // frontend --brand-oxide : candidate A accent
  textHi: "#F6F0E4",
  textLo: "#9FB0AC",
  line: "#23484D",
} as const;

export const FONT = {
  sans: '"Inter", system-ui, -apple-system, sans-serif',
  mono: '"SF Mono", "JetBrains Mono", ui-monospace, monospace',
} as const;

// Scene timing in frames @30fps. Locked to the FINAL Amanda VO (audio/final/,
// trimmed + atempo 1.05). Each scene: audio frames + 16f tail hold, then a 12f
// gap of bare background before the next scene (voice not seamless), and a 14f
// fade in/out via <SceneTransition>. Sums to 5381 = 2:59.4 (< 3:00 cap).
//   dur = ceil(audio*30) + 16 ;  next.from = from + dur + 12
export const SCENES = {
  s1: { from: 0, dur: 525 }, // 0:00 Same Answer, Different Reason  (VO 16.96s, airtight)
  s2: { from: 537, dur: 444 }, // 0:18 Diagnosis Gap                 (VO 14.25s)
  s3: { from: 993, dur: 1572 }, // 0:33 Evidence Loop (WOW)          (VO 51.85s, airtight)
  s4: { from: 2577, dur: 778 }, // 1:26 Failure Is Product Behavior  (VO 25.37s)
  s5: { from: 3367, dur: 583 }, // 1:52 Feasible Wedge & Business    (VO 18.88s)
  s6: { from: 3962, dur: 990 }, // 2:12 Built with Codex + GPT-5.6   (VO 32.44s)
  s7: { from: 4964, dur: 417 }, // 2:45 Why This Team / Close        (VO 13.36s)
} as const;

export const TOTAL_FRAMES = 5381;
