import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { ArtifactCard, SceneShell, SceneTitle, fadeUp } from "../components/primitives";
import { COLORS } from "../theme";

// 0:00–0:20 — Same answer, different reason. The hook. (VO 19.6s)
// Beat map (frames @30fps): cards land as the answer is read; each caption lands
// on the spoken distinction; punchline on "waste one student's time".
export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneShell>
      <SceneTitle kicker="The Hook" title="Same answer. Different reason." />
      <div style={{ display: "flex", gap: 48, marginTop: 24 }}>
        <div>
          <div style={{ ...fadeUp(frame, fps, 30) }}>
            <ArtifactCard
              label="Student A"
              lines={[
                { text: "-3(x - 2)" },
                { text: "= -3x - 6", highlight: true },
              ]}
            />
          </div>
          <div style={{ ...fadeUp(frame, fps, 240), marginTop: 16, fontSize: 22, color: COLORS.textLo }}>
            a systematic sign misconception
          </div>
        </div>
        <div>
          <div style={{ ...fadeUp(frame, fps, 90) }}>
            <ArtifactCard
              label="Student B"
              lines={[
                { text: "-3(x - 2)" },
                { text: "= -3x - 6", highlight: true },
              ]}
            />
          </div>
          <div style={{ ...fadeUp(frame, fps, 340), marginTop: 16, fontSize: 22, color: COLORS.textLo }}>
            a one-off slip — not systematic
          </div>
        </div>
      </div>
      <div style={{ ...fadeUp(frame, fps, 470), marginTop: 48, fontSize: 30, maxWidth: 1200 }}>
        Same wrong answer does <b>not</b> mean the same misunderstanding. Same remediation wastes
        one student's time.
      </div>
    </SceneShell>
  );
};
