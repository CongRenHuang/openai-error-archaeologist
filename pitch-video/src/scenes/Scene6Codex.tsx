import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell, SceneTitle, fadeUp } from "../components/primitives";
import { COLORS, FONT } from "../theme";

// The stack — GPT-5.6 proposes, deterministic math disposes.
const theStack = [
  "GPT-5.6 · multimodal parse + abductive hypotheses",
  "Deterministic verifier · re-derives the algebra",
  "Probe generator · symbolic discriminability check",
];
// How Codex was used (REQUIRED narration coverage).
const codexDid = [
  "Audited sources, flagged overclaims",
  "Enforced the model-proposes / math-proves boundary",
  "Scaffolded the pipeline + this video",
];
// Future value.
const roadmap = [
  "Beyond algebra → fractions, geometry",
  "Adaptive probe sequencing · a multi-step interview",
  "Teacher dashboard · misconception trends",
];

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
        <div key={t} style={{ display: "flex", gap: 12, marginBottom: 14, fontSize: 23, color: COLORS.textHi }}>
          <span style={{ color: accent }}>▸</span>
          <span>{t}</span>
        </div>
      ))}
    </div>
  );
};

// 2:14–2:44 — Built with Codex + GPT-5.6. REQUIRED: narration must explain how
// Codex and GPT-5.6 were used. Shows the stack, Codex's role, and the roadmap —
// all work done during Build Week. Delays span the ~30s VO (re-time if length shifts).
export const Scene6Codex: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneShell>
      <SceneTitle kicker="How We Built It" title="Built with Codex + GPT-5.6." />
      <div style={{ display: "flex", gap: 64, marginTop: 8 }}>
        <Col heading="THE STACK" items={theStack} accent={COLORS.teal} delay={90} />
        <Col heading="CODEX BUILT IT WITH US" items={codexDid} accent={COLORS.violet} delay={420} />
      </div>

      {/* Roadmap strip — future value */}
      <div style={{ ...fadeUp(frame, fps, 660), marginTop: 36 }}>
        <div style={{ fontFamily: FONT.mono, fontSize: 20, color: COLORS.amber, fontWeight: 700, marginBottom: 14 }}>
          WHAT&apos;S NEXT
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {roadmap.map((r) => (
            <div
              key={r}
              style={{
                flex: 1,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 10,
                padding: "16px 18px",
                fontSize: 20,
                color: COLORS.textHi,
              }}
            >
              {r}
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...fadeUp(frame, fps, 820), marginTop: 32, fontSize: 30, fontWeight: 700 }}>
        AI proposes · mathematics verifies ·{" "}
        <span style={{ color: COLORS.teal }}>teachers decide — at scale.</span>
      </div>
    </SceneShell>
  );
};
