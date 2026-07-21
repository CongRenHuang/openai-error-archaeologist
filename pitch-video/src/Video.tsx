import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { COLORS, SCENES } from "./theme";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
import { Scene6 } from "./scenes/Scene6";

// Full 2:55 pitch. Each Sequence resets useCurrentFrame to 0 at its start,
// so every scene animates on its own local timeline.
export const ErrorArchaeologistVideo: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.bg }}>
    <Sequence from={SCENES.s1.from} durationInFrames={SCENES.s1.dur}>
      <Scene1 />
    </Sequence>
    <Sequence from={SCENES.s2.from} durationInFrames={SCENES.s2.dur}>
      <Scene2 />
    </Sequence>
    <Sequence from={SCENES.s3.from} durationInFrames={SCENES.s3.dur}>
      <Scene3 />
    </Sequence>
    <Sequence from={SCENES.s4.from} durationInFrames={SCENES.s4.dur}>
      <Scene4 />
    </Sequence>
    <Sequence from={SCENES.s5.from} durationInFrames={SCENES.s5.dur}>
      <Scene5 />
    </Sequence>
    <Sequence from={SCENES.s6.from} durationInFrames={SCENES.s6.dur}>
      <Scene6 />
    </Sequence>
  </AbsoluteFill>
);
