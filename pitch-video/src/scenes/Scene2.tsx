import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell, SceneTitle, fadeUp } from "../components/primitives";
import { COLORS, FONT } from "../theme";

const Node: React.FC<{ label: string; active?: boolean; delay: number }> = ({
  label,
  active,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        ...fadeUp(frame, fps, delay),
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
};

// 0:20–0:35 — the wedge. Screening -> [gap] -> Intervention. (VO 14.6s)
// Beats: Screening + Intervention as "screening / tutoring" is named; the gap
// node lights on "the diagnosis in between"; paragraph on "we focus on...".
export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneShell>
      <SceneTitle kicker="The Wedge" title="A diagnosis gap — not another tutor." />
      <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 40 }}>
        <Node label="Screening" delay={30} />
        <div style={{ ...fadeUp(frame, fps, 90), fontSize: 40, color: COLORS.textLo }}>→</div>
        <Node label="Diagnosis gap" active delay={210} />
        <div style={{ ...fadeUp(frame, fps, 90), fontSize: 40, color: COLORS.textLo }}>→</div>
        <Node label="Intervention" delay={120} />
      </div>
      <div style={{ ...fadeUp(frame, fps, 300), marginTop: 56, fontSize: 28, maxWidth: 1250, color: COLORS.textHi }}>
        NAEP: 39% of US eighth graders below Basic in math — that is scale, not demand. We focus on
        one expensive decision inside intervention: <b>what evidence explains this error, and what
        should the teacher test next?</b>
      </div>
    </SceneShell>
  );
};
