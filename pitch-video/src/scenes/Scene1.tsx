import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { ArtifactCard, SceneShell, SceneTitle, fadeUp } from "../components/primitives";
import { COLORS } from "../theme";

// 0:00–0:25 — Same answer, different reason. The hook.
export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneShell>
      <SceneTitle kicker="The Hook" title="Same answer. Different reason." />
      <div style={{ display: "flex", gap: 48, marginTop: 24 }}>
        <div style={{ ...fadeUp(frame, fps, 20) }}>
          <ArtifactCard
            label="Student A"
            lines={[
              { text: "-3(x - 2)" },
              { text: "= -3x - 6", highlight: true },
            ]}
          />
          <div style={{ marginTop: 16, fontSize: 22, color: COLORS.textLo }}>
            mishandled the negative sign
          </div>
        </div>
        <div style={{ ...fadeUp(frame, fps, 45) }}>
          <ArtifactCard
            label="Student B"
            lines={[
              { text: "-3(x - 2)" },
              { text: "= -3x - 6", highlight: true },
            ]}
          />
          <div style={{ marginTop: 16, fontSize: 22, color: COLORS.textLo }}>
            distributed to the first term only
          </div>
        </div>
      </div>
      <div style={{ ...fadeUp(frame, fps, 75), marginTop: 48, fontSize: 30, maxWidth: 1200 }}>
        Same wrong answer does <b>not</b> mean the same misunderstanding. Same remediation wastes
        one student's time.
      </div>
    </SceneShell>
  );
};
