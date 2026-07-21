import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell, SceneTitle, fadeUp } from "../components/primitives";
import { COLORS, FONT } from "../theme";

const cards = [
  { title: "Ambiguous symbol", behavior: "abstains — states what is unclear", tag: "insufficient_evidence" },
  { title: "Isolated slip", behavior: "stays out of misconception aggregate", tag: "likely_slip" },
  { title: "Correct Answer Trap", behavior: "diagnoses broken steps anyway", tag: "process ≠ answer" },
  { title: "Unmatched response", behavior: "does not force a label", tag: "abstain / re-probe" },
];

// 1:35–2:10 — Failure is product behavior. Safety as a visible feature.
export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneShell>
      <SceneTitle kicker="Safety by Design" title="Failure is product behavior." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginTop: 24 }}>
        {cards.map((c, i) => (
          <div
            key={c.title}
            style={{
              ...fadeUp(frame, fps, 20 + i * 25),
              background: COLORS.bgSoft,
              border: `2px solid ${COLORS.line}`,
              borderLeft: `6px solid ${COLORS.red}`,
              borderRadius: 12,
              padding: 28,
            }}
          >
            <div style={{ fontSize: 30, fontWeight: 800 }}>{c.title}</div>
            <div style={{ fontSize: 24, color: COLORS.textHi, margin: "10px 0" }}>{c.behavior}</div>
            <div style={{ fontFamily: FONT.mono, fontSize: 18, color: COLORS.red }}>{c.tag}</div>
          </div>
        ))}
      </div>
      <div style={{ ...fadeUp(frame, fps, 140), marginTop: 40, fontSize: 24, color: COLORS.textLo }}>
        We report behavior at each abstention level — not a headline accuracy number from 30–36
        synthetic samples.
      </div>
    </SceneShell>
  );
};
