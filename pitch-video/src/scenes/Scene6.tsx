import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell, fadeUp } from "../components/primitives";
import { COLORS, FONT } from "../theme";

const ledger = [
  "Traceable US government statistics",
  "Released assessment items",
  "Official privacy guidance",
  "Remote US educator research",
];

// 2:35–2:55 — Why this team / close. Rigor + CTA.
// liveUrl is a swappable prop: placeholder until deployment is tested.
export const Scene6: React.FC<{ liveUrl?: string }> = ({ liveUrl = "deploy pending — URL after tested" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneShell>
      <div style={{ ...fadeUp(frame, fps, 0), fontSize: 26, letterSpacing: 6, textTransform: "uppercase", color: COLORS.amber, fontWeight: 700 }}>
        Why This Team
      </div>
      <div style={{ ...fadeUp(frame, fps, 15), fontSize: 52, fontWeight: 800, marginTop: 16, maxWidth: 1300 }}>
        Designed in Taiwan from traceable US public evidence.
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 36 }}>
        {ledger.map((l, i) => (
          <div
            key={l}
            style={{
              ...fadeUp(frame, fps, 40 + i * 18),
              fontFamily: FONT.mono,
              fontSize: 20,
              color: COLORS.textHi,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 8,
              padding: "12px 16px",
            }}
          >
            {l}
          </div>
        ))}
      </div>
      <div style={{ ...fadeUp(frame, fps, 130), marginTop: 56, fontSize: 40, fontWeight: 700, maxWidth: 1300, lineHeight: 1.25 }}>
        AI should not declare <i>why</i> a student is wrong. It should show evidence and ask a
        question capable of <span style={{ color: COLORS.teal }}>changing its mind.</span>
      </div>
      <div style={{ ...fadeUp(frame, fps, 175), marginTop: 40, fontFamily: FONT.mono, fontSize: 24, color: COLORS.amber }}>
        ▶ {liveUrl}
      </div>
    </SceneShell>
  );
};
