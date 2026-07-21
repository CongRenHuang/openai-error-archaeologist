import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell, SceneTitle, fadeUp } from "../components/primitives";
import { COLORS, FONT } from "../theme";

const chain = ["Intervention teacher", "Reviewed evidence", "Tutoring-program buyer"];

// 2:10–2:35 — Feasible wedge & business. Who uses, who pays.
export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneShell>
      <SceneTitle kicker="The Business" title="Start with intervention teams. Not every teacher." />
      <div style={{ ...fadeUp(frame, fps, 20), display: "flex", alignItems: "center", gap: 20, marginTop: 32 }}>
        {chain.map((c, i) => (
          <React.Fragment key={c}>
            <div
              style={{
                padding: "22px 26px",
                borderRadius: 12,
                border: `2px solid ${COLORS.teal}`,
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              {c}
            </div>
            {i < chain.length - 1 ? <div style={{ fontSize: 34, color: COLORS.textLo }}>→</div> : null}
          </React.Fragment>
        ))}
      </div>
      <div
        style={{
          ...fadeUp(frame, fps, 70),
          marginTop: 48,
          background: COLORS.bgSoft,
          border: `2px solid ${COLORS.line}`,
          borderRadius: 12,
          padding: 28,
          maxWidth: 1200,
        }}
      >
        <div style={{ fontFamily: FONT.mono, fontSize: 20, color: COLORS.amber }}>
          UNIT ECONOMICS · SIMULATED
        </div>
        <div style={{ fontSize: 26, marginTop: 10, color: COLORS.textHi }}>
          Provider pays annual platform fee + usage — diagnosis competes with educator time. Next:
          embedded curriculum APIs, then districts after privacy & outcome evidence.
        </div>
      </div>
    </SceneShell>
  );
};
