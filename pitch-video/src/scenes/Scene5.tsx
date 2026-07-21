import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell, SceneTitle, fadeUp } from "../components/primitives";
import { COLORS, FONT } from "../theme";

const chain = ["Intervention teacher", "Reviewed evidence", "Tutoring-program buyer"];

// Go-to-market ladder — maps to the narration: start with intervention teams,
// then embedded curriculum APIs, then districts after privacy + outcomes.
const tiers = [
  {
    when: "NOW",
    who: "Intervention teams",
    how: "Annual platform fee + usage",
    accent: COLORS.teal,
  },
  {
    when: "NEXT",
    who: "Embedded curriculum APIs",
    how: "Per-seat, via partners",
    accent: COLORS.amber,
  },
  {
    when: "LATER",
    who: "Districts",
    how: "After privacy review + outcome evidence",
    accent: COLORS.textLo,
  },
];

// 1:52–2:12 — Feasible wedge & business. Who uses, who pays, in what order. (VO 18.9s)
export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneShell>
      <SceneTitle kicker="The Business" title="Start with intervention teams. Not every teacher." />

      {/* who acts on the diagnosis, and who pays for it */}
      <div style={{ ...fadeUp(frame, fps, 40), display: "flex", alignItems: "center", gap: 20, marginTop: 12 }}>
        {chain.map((c, i) => (
          <React.Fragment key={c}>
            <div
              style={{
                padding: "18px 24px",
                borderRadius: 12,
                border: `2px solid ${COLORS.teal}`,
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {c}
            </div>
            {i < chain.length - 1 ? <div style={{ fontSize: 32, color: COLORS.textLo }}>→</div> : null}
          </React.Fragment>
        ))}
      </div>

      {/* why they pay */}
      <div
        style={{
          ...fadeUp(frame, fps, 200),
          marginTop: 28,
          background: COLORS.bgSoft,
          border: `2px solid ${COLORS.line}`,
          borderRadius: 12,
          padding: "20px 24px",
          maxWidth: 1300,
        }}
      >
        <div style={{ fontFamily: FONT.mono, fontSize: 18, color: COLORS.amber }}>
          WHY THEY PAY · SIMULATED
        </div>
        <div style={{ fontSize: 24, marginTop: 8, color: COLORS.textHi }}>
          Diagnosis competes directly with scarce educator time — the one thing an intervention
          program cannot buy more of.
        </div>
      </div>

      {/* the ladder: now -> next -> later */}
      <div style={{ ...fadeUp(frame, fps, 430), display: "flex", gap: 20, marginTop: 28 }}>
        {tiers.map((t) => (
          <div
            key={t.when}
            style={{
              flex: 1,
              border: `1px solid ${COLORS.line}`,
              borderTop: `4px solid ${t.accent}`,
              borderRadius: 12,
              padding: "18px 20px",
            }}
          >
            <div style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: 2, color: t.accent, fontWeight: 700 }}>
              {t.when}
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, margin: "8px 0 6px" }}>{t.who}</div>
            <div style={{ fontSize: 20, color: COLORS.textLo }}>{t.how}</div>
          </div>
        ))}
      </div>
    </SceneShell>
  );
};
