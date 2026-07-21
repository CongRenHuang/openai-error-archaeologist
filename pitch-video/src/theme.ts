// Design tokens for the Error Archaeologist pitch video.
// "Deterministic = the brand": archaeology navy base, parchment artifacts,
// amber evidence, teal = math-verified, red = error/abstain.

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const COLORS = {
  bg: "#0B1020",
  bgSoft: "#141A2E",
  parchment: "#EDE6D6",
  ink: "#1A1D2B",
  amber: "#F5A623", // evidence highlight
  teal: "#3DD6C4", // verified / math-checked
  red: "#E5484D", // error / abstain
  violet: "#8B7FF5", // candidate A accent
  textHi: "#F4F6FB",
  textLo: "#9AA3B8",
  line: "#2A3350",
} as const;

export const FONT = {
  sans: '"Inter", system-ui, -apple-system, sans-serif',
  mono: '"SF Mono", "JetBrains Mono", ui-monospace, monospace',
} as const;

// Scene timing in frames @30fps. Sums to 5250 = 2:55.
export const SCENES = {
  s1: { from: 0, dur: 750 }, // 0:00 Same Answer, Different Reason
  s2: { from: 750, dur: 600 }, // 0:25 Diagnosis Gap
  s3: { from: 1350, dur: 1500 }, // 0:45 Evidence Loop (WOW)
  s4: { from: 2850, dur: 1050 }, // 1:35 Failure Is Product Behavior
  s5: { from: 3900, dur: 750 }, // 2:10 Feasible Wedge & Business
  s6: { from: 4650, dur: 600 }, // 2:35 Why This Team / Close
} as const;

export const TOTAL_FRAMES = 5250;
