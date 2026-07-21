import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell, SceneTitle, fadeUp } from "../components/primitives";
import { COLORS, FONT } from "../theme";

const Node: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => (
  <div
    style={{
      flex: 1,
      textAlign: "center",
      padding: "28px 16px",
      borderRadius: 12,
      border: `2px solid ${active ? COLORS.amber : COLORS.line}`,
      background: active ? "rgba(245,166,35,0.12)" : "transparent",
      color: active ? COLORS.textHi : COLORS.textLo,
      fontSize: 30,
      fontWeight: active ? 800 : 500,
      boxShadow: active ? `0 0 40px ${COLORS.amber}44` : "none",
    }}
  >
    {label}
    {active ? (
      <div style={{ fontFamily: FONT.mono, fontSize: 18, color: COLORS.amber, marginTop: 8 }}>
        no scalable tool
      </div>
    ) : null}
  </div>
);

// 0:25–0:45 — the wedge. Screening -> [gap] -> Intervention.
export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneShell>
      <SceneTitle kicker="The Wedge" title="A diagnosis gap — not another tutor." />
      <div style={{ ...fadeUp(frame, fps, 20), display: "flex", alignItems: "center", gap: 24, marginTop: 40 }}>
        <Node label="Screening" />
        <div style={{ fontSize: 40, color: COLORS.textLo }}>→</div>
        <Node label="Diagnosis gap" active />
        <div style={{ fontSize: 40, color: COLORS.textLo }}>→</div>
        <Node label="Intervention" />
      </div>
      <div style={{ ...fadeUp(frame, fps, 60), marginTop: 56, fontSize: 28, maxWidth: 1250, color: COLORS.textHi }}>
        NAEP: 39% of US eighth graders below Basic in math — that is scale, not demand. We focus on
        one expensive decision inside intervention: <b>what evidence explains this error, and what
        should the teacher test next?</b>
      </div>
    </SceneShell>
  );
};
