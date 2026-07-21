import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { COLORS, SCENES } from "./theme";
import { SceneTransition } from "./components/primitives";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
import { Scene6Codex } from "./scenes/Scene6Codex";
import { Scene7Close } from "./scenes/Scene7Close";

// Full ~3:00 pitch. Each Sequence resets useCurrentFrame to 0 at its start, so
// every scene animates on its own local timeline. The scene's Amanda VO
// (public/audio/sceneN.mp3) rides the same Sequence — voice drives picture.
// SceneTransition fades each scene in/out; the gap between `from`s (see theme)
// leaves bare background between scenes so the voice is not seamless.
const SCENE_COMPONENT = {
  s1: Scene1,
  s2: Scene2,
  s3: Scene3,
  s4: Scene4,
  s5: Scene5,
  s6: Scene6Codex,
  s7: Scene7Close,
} as const;

export const ErrorArchaeologistVideo: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.bg }}>
    {(Object.keys(SCENE_COMPONENT) as (keyof typeof SCENE_COMPONENT)[]).map((key, i) => {
      const { from, dur } = SCENES[key];
      const Scene = SCENE_COMPONENT[key];
      return (
        <Sequence key={key} from={from} durationInFrames={dur}>
          <Audio src={staticFile(`audio/scene${i + 1}.mp3`)} />
          <SceneTransition dur={dur}>
            <Scene />
          </SceneTransition>
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
