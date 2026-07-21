import "./index.css";
import { Composition } from "remotion";
import { ErrorArchaeologistVideo } from "./Video";
import { FPS, HEIGHT, TOTAL_FRAMES, WIDTH } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ErrorArchaeologist"
      component={ErrorArchaeologistVideo}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
