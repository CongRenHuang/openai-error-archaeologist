import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import {
  ArtifactCard,
  CandidateCard,
  EvidenceBar,
  SceneShell,
  SceneTitle,
} from "../components/primitives";
import { PipelineRail } from "../components/PipelineRail";
import { COLORS, FONT, SCENES } from "../theme";

// 0:45–1:35 — Evidence Loop. THE WOW: the probe splits two identical wrong
// answers apart and the evidence physically moves.
//
// Local-frame timeline (1500 total):
//   0    parse + highlight step 2
//   150  algebra verifier stamps first invalid transition
//   300  two candidate cards appear (both fit — tension)
//   540  probe question generated
//   760  predictions diverge on the two cards  <- the fork
//   980  student writes -4b-12; card A lights, B dims; evidence bar shifts
//   1180 teacher review + key line
export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const stage =
    frame < 150 ? 0 : frame < 300 ? 1 : frame < 540 ? 2 : frame < 760 ? 3 : frame < 980 ? 4 : 5;

  const showVerifier = frame >= 150;
  const showCandidates = frame >= 300;
  const showProbe = frame >= 540;
  const showPredictions = frame >= 760;
  const resolved = frame >= 980;

  // Evidence bar: 50/50 until resolution, then swings to candidate A (violet).
  const leftPct = interpolate(frame, [980, 1080], [50, 88], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneShell>
      <SceneTitle kicker="The Evidence Loop" title="The AI designs an experiment to change its own mind." />
      <div style={{ display: "flex", gap: 56 }}>
        {/* Left: pipeline spine */}
        <PipelineRail activeStage={stage} style={{ marginTop: 12, minWidth: 340 }} />

        {/* Right: the working surface */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
            <ArtifactCard
              lines={[{ text: "-3(x - 2)" }, { text: "= -3x - 6", highlight: true }]}
              style={{ minWidth: 380, fontSize: 34 }}
            />
            {showVerifier ? (
              <div
                style={{
                  fontFamily: FONT.mono,
                  color: COLORS.teal,
                  border: `2px solid ${COLORS.teal}`,
                  borderRadius: 8,
                  padding: "12px 16px",
                  fontSize: 20,
                  marginTop: 20,
                }}
              >
                ✓ deterministic checker:
                <br />
                first invalid transition = step 2
              </div>
            ) : null}
          </div>

          {showCandidates ? (
            <div style={{ display: "flex", gap: 32 }}>
              <CandidateCard
                id="NEG_DIST"
                label="Negative sign not distributed to 2nd term"
                evidence="step 2"
                accent={COLORS.violet}
                prediction={showPredictions ? "-4b - 12" : undefined}
                state={resolved ? "lit" : "neutral"}
              />
              <CandidateCard
                id="DIST_FIRST_ONLY"
                label="Distributes to first term only"
                evidence="step 2"
                accent={COLORS.amber}
                prediction={showPredictions ? "-4b - 3" : undefined}
                state={resolved ? "dim" : "neutral"}
              />
            </div>
          ) : null}

          {showProbe ? (
            <div style={{ fontFamily: FONT.mono, fontSize: 30, color: COLORS.textHi }}>
              verified probe → <b>Expand -4(b - 3)</b>
              {resolved ? (
                <span style={{ color: COLORS.violet }}>
                  {"   "}student wrote: -4b - 12
                </span>
              ) : null}
            </div>
          ) : null}

          {resolved ? (
            <div style={{ marginTop: 8 }}>
              <EvidenceBar leftPct={leftPct} leftColor={COLORS.violet} rightColor={COLORS.amber} />
            </div>
          ) : null}
        </div>
      </div>

      {frame >= 1180 ? (
        <div style={{ marginTop: 40, fontSize: 34, fontWeight: 700 }}>
          Model proposes · mathematics verifies · <span style={{ color: COLORS.teal }}>teacher decides</span>
        </div>
      ) : null}
    </SceneShell>
  );
};

// exported for potential standalone preview
export const SCENE3_DUR = SCENES.s3.dur;
