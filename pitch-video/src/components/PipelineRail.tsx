import React from "react";
import { COLORS, FONT } from "../theme";

// The §5 architecture spine, animated as a progress rail.
// activeStage lights the current stage so the viewer never loses place.
const STAGES = [
  "multimodal parse",
  "algebra verifier",
  "taxonomy candidates",
  "probe generator",
  "symbolic check",
  "teacher review",
];

export const PipelineRail: React.FC<{ activeStage: number; style?: React.CSSProperties }> = ({
  activeStage,
  style,
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14, ...style }}>
    {STAGES.map((s, i) => {
      const active = i === activeStage;
      const done = i < activeStage;
      const color = active ? COLORS.teal : done ? COLORS.textLo : COLORS.line;
      return (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: active ? COLORS.teal : done ? COLORS.textLo : "transparent",
              border: `2px solid ${color}`,
              boxShadow: active ? `0 0 16px ${COLORS.teal}` : "none",
            }}
          />
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 22,
              color: active ? COLORS.textHi : done ? COLORS.textLo : COLORS.line,
              fontWeight: active ? 700 : 400,
            }}
          >
            {s}
          </div>
        </div>
      );
    })}
  </div>
);
