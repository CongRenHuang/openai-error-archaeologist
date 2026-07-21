import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell, fadeUp } from "../components/primitives";
import { COLORS, FONT } from "../theme";

const ledger = [
  "Traceable US government statistics",
  "Released assessment items",
  "Official privacy guidance",
  "Remote US educator research",
];

const LIVE_URL = "https://error-archaeologist-hs2orfr2la-de.a.run.app/";

// 2:45–2:58 — Why this team / close. Rigor + live CTA with scannable QR.
export const Scene7Close: React.FC<{ liveUrl?: string }> = ({ liveUrl = LIVE_URL }) => {
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
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 32 }}>
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
      <div style={{ ...fadeUp(frame, fps, 150), marginTop: 44, fontSize: 38, fontWeight: 700, maxWidth: 1300, lineHeight: 1.25 }}>
        AI should not declare <i>why</i> a student is wrong. It should show evidence and ask a
        question capable of <span style={{ color: COLORS.teal }}>changing its mind.</span>
      </div>

      {/* Live CTA: scannable QR + URL */}
      <div style={{ ...fadeUp(frame, fps, 300), display: "flex", alignItems: "center", gap: 28, marginTop: 40 }}>
        <Img
          src={staticFile("qr.png")}
          style={{ width: 260, height: 260, borderRadius: 12, background: COLORS.parchment, padding: 8 }}
        />
        <div>
          <div style={{ fontFamily: FONT.mono, fontSize: 24, letterSpacing: 3, color: COLORS.amber, fontWeight: 700 }}>
            ▶ TRY IT LIVE
          </div>
          <div style={{ fontFamily: FONT.mono, fontSize: 26, color: COLORS.textHi, marginTop: 10 }}>
            {liveUrl}
          </div>
          <div style={{ fontSize: 20, color: COLORS.textLo, marginTop: 8 }}>
            scan to open the demo
          </div>
        </div>
      </div>
    </SceneShell>
  );
};
