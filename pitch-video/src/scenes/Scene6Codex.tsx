import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell, SceneTitle, fadeUp } from "../components/primitives";
import { COLORS, FONT } from "../theme";

const codexDid = [
  "Audited 15 external sources, flagged 8 overclaims",
  "Critiqued the architecture, forced explicit boundaries",
  "Scaffolded the pipeline + this video",
];
const weDecided = [
  "Diagnosis is a hypothesis, never a verdict",
  "Abstain over forced label; teacher holds veto",
  "Taxonomy scope + the honesty gates",
];

// 2:16–2:40 — Built with Codex + GPT-5.6. REQUIRED: narration must explain
// how Codex and GPT-5.6 were used. Also carries the new/existing-project clause.
const Col: React.FC<{ heading: string; items: string[]; accent: string; delay: number }> = ({
  heading,
  items,
  accent,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ ...fadeUp(frame, fps, delay), flex: 1 }}>
      <div style={{ fontFamily: FONT.mono, fontSize: 22, color: accent, fontWeight: 700, marginBottom: 16 }}>
        {heading}
      </div>
      {items.map((t) => (
        <div key={t} style={{ display: "flex", gap: 12, marginBottom: 14, fontSize: 24, color: COLORS.textHi }}>
          <span style={{ color: accent }}>▸</span>
          <span>{t}</span>
        </div>
      ))}
    </div>
  );
};

export const Scene6Codex: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneShell>
      <SceneTitle kicker="How We Built It" title="Built with Codex + GPT-5.6." />
      <div style={{ display: "flex", gap: 64, marginTop: 8 }}>
        <Col heading="CODEX ACCELERATED" items={codexDid} accent={COLORS.teal} delay={20} />
        <Col heading="WE DECIDED" items={weDecided} accent={COLORS.amber} delay={45} />
      </div>

      <div style={{ ...fadeUp(frame, fps, 80), marginTop: 32, fontSize: 24, color: COLORS.textLo, maxWidth: 1300 }}>
        GPT-5.6 is the reasoning engine — multimodal parse and abductive hypotheses. Deterministic
        math verifies every claim it makes.
      </div>

      {/* new/existing-project clause as a timeline strip */}
      <div style={{ ...fadeUp(frame, fps, 110), display: "flex", alignItems: "stretch", gap: 16, marginTop: 36 }}>
        <div style={{ flex: 1, border: `1px solid ${COLORS.line}`, borderRadius: 10, padding: 18 }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 18, color: COLORS.textLo }}>BEFORE 7/13</div>
          <div style={{ fontSize: 24, marginTop: 6 }}>planning docs only — 0 lines of code</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 30, color: COLORS.textLo }}>→</div>
        <div style={{ flex: 1, border: `2px solid ${COLORS.teal}`, borderRadius: 10, padding: 18 }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 18, color: COLORS.teal }}>DURING THE PERIOD</div>
          <div style={{ fontSize: 24, marginTop: 6 }}>all code, Codex-built, dated commit history</div>
        </div>
      </div>
    </SceneShell>
  );
};
