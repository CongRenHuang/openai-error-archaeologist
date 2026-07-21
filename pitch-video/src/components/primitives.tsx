import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";

// Fade+rise-in helper. delay in frames, relative to sequence start.
export const fadeUp = (frame: number, fps: number, delay = 0) => {
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return {
    opacity: interpolate(s, [0, 1], [0, 1]),
    transform: `translateY(${interpolate(s, [0, 1], [24, 0])}px)`,
  };
};

export const SceneShell: React.FC<{
  children: React.ReactNode;
  pad?: number;
}> = ({ children, pad = 120 }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: `radial-gradient(120% 120% at 20% 0%, ${COLORS.bgSoft} 0%, ${COLORS.bg} 60%)`,
      color: COLORS.textHi,
      fontFamily: FONT.sans,
      padding: pad,
      display: "flex",
      flexDirection: "column",
    }}
  >
    {children}
  </div>
);

// Small uppercase kicker + big title.
export const SceneTitle: React.FC<{ kicker: string; title: string; delay?: number }> = ({
  kicker,
  title,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ ...fadeUp(frame, fps, delay), marginBottom: 48 }}>
      <div
        style={{
          fontSize: 26,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: COLORS.amber,
          fontWeight: 700,
        }}
      >
        {kicker}
      </div>
      <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, marginTop: 12 }}>{title}</div>
    </div>
  );
};

// Required honesty label per briefing evidence gate.
export const SyntheticTag: React.FC<{ text?: string }> = ({ text = "SYNTHETIC SAMPLE" }) => (
  <div
    style={{
      position: "absolute",
      top: 16,
      right: 16,
      fontFamily: FONT.mono,
      fontSize: 18,
      letterSpacing: 2,
      color: COLORS.ink,
      background: COLORS.amber,
      padding: "4px 10px",
      borderRadius: 4,
      fontWeight: 700,
    }}
  >
    {text}
  </div>
);

// Parchment "artifact" surface holding handwritten-style algebra.
export const ArtifactCard: React.FC<{
  lines: { text: string; highlight?: boolean }[];
  label?: string;
  style?: React.CSSProperties;
}> = ({ lines, label, style }) => (
  <div
    style={{
      position: "relative",
      background: COLORS.parchment,
      color: COLORS.ink,
      borderRadius: 12,
      padding: "40px 36px",
      fontFamily: FONT.mono,
      fontSize: 40,
      lineHeight: 1.9,
      boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
      minWidth: 520,
      ...style,
    }}
  >
    <SyntheticTag />
    {label ? (
      <div style={{ fontSize: 20, color: "#6B6455", marginBottom: 8, fontFamily: FONT.sans }}>
        {label}
      </div>
    ) : null}
    {lines.map((l, i) => (
      <div
        key={i}
        style={{
          background: l.highlight ? "rgba(245,166,35,0.35)" : "transparent",
          borderRadius: 6,
          padding: l.highlight ? "0 8px" : 0,
        }}
      >
        {l.text}
      </div>
    ))}
  </div>
);

// Candidate hypothesis card. state: 'neutral' | 'lit' | 'dim'.
export const CandidateCard: React.FC<{
  id: string;
  label: string;
  evidence: string;
  prediction?: string;
  accent: string;
  state?: "neutral" | "lit" | "dim";
  style?: React.CSSProperties;
}> = ({ id, label, evidence, prediction, accent, state = "neutral", style }) => {
  const lit = state === "lit";
  const dim = state === "dim";
  return (
    <div
      style={{
        background: COLORS.bgSoft,
        border: `2px solid ${lit ? accent : COLORS.line}`,
        borderRadius: 12,
        padding: 24,
        width: 420,
        opacity: dim ? 0.35 : 1,
        boxShadow: lit ? `0 0 40px ${accent}66` : "none",
        transition: "all 0.2s",
        ...style,
      }}
    >
      <div style={{ fontFamily: FONT.mono, fontSize: 18, color: accent, fontWeight: 700 }}>{id}</div>
      <div style={{ fontSize: 26, fontWeight: 700, margin: "8px 0 12px" }}>{label}</div>
      <div style={{ fontSize: 18, color: COLORS.textLo }}>evidence: {evidence}</div>
      {prediction ? (
        <div style={{ fontFamily: FONT.mono, fontSize: 24, marginTop: 12, color: COLORS.textHi }}>
          predicts → {prediction}
        </div>
      ) : null}
    </div>
  );
};

// Horizontal support meter that shifts between two candidates.
export const EvidenceBar: React.FC<{ leftPct: number; leftColor: string; rightColor: string }> = ({
  leftPct,
  leftColor,
  rightColor,
}) => (
  <div
    style={{
      display: "flex",
      width: 880,
      height: 22,
      borderRadius: 11,
      overflow: "hidden",
      border: `1px solid ${COLORS.line}`,
    }}
  >
    <div style={{ width: `${leftPct}%`, background: leftColor }} />
    <div style={{ width: `${100 - leftPct}%`, background: rightColor }} />
  </div>
);
