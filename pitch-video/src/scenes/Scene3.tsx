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
// Thresholds locked to the 50s VO beats (frames @30fps):
//   0     parse + highlight step 2 ("the model reads the handwriting")
//   210   algebra verifier stamps first invalid transition ("deterministic checker")
//   600   two candidate cards appear ("taxonomy proposes two explanations")
//   780   probe question generated ("generates one follow-up probe")
//   990   predictions diverge on the two cards ("predict different answers") <- the fork
//   1230  student writes -4b-12; card A lights, B dims ("the student answers")
//   1230+ evidence bar swings ("the evidence moves")
//   1440  teacher review + key line ("the teacher decides")
export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const stage =
    frame < 221 ? 0 : frame < 633 ? 1 : frame < 823 ? 2 : frame < 1044 ? 3 : frame < 1297 ? 4 : 5;

  const showVerifier = frame >= 221;
  const showCandidates = frame >= 633;
  const showProbe = frame >= 823;
  const showPredictions = frame >= 1044;
  const resolved = frame >= 1297;

  // Evidence bar: 50/50 until resolution, then swings to candidate A (violet).
  const leftPct = interpolate(frame, [1297, 1456], [50, 88], {
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
                id="SIGN_MISCONCEPTION"
                label="Systematic sign error (−×− read as −)"
                evidence="step 2 · -3·-2 → -6"
                accent={COLORS.violet}
                prediction={showPredictions ? "-4b - 12" : undefined}
                state={resolved ? "lit" : "neutral"}
              />
              <CandidateCard
                id="ONE_OFF_SLIP"
                label="A one-off slip — not systematic"
                evidence="step 2 · would self-correct"
                accent={COLORS.amber}
                prediction={showPredictions ? "-4b + 12" : undefined}
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

      {frame >= 1476 ? (
        <div style={{ marginTop: 40, fontSize: 34, fontWeight: 700 }}>
          Model proposes · mathematics verifies · <span style={{ color: COLORS.teal }}>teacher decides</span>
        </div>
      ) : null}
    </SceneShell>
  );
};

// exported for potential standalone preview
export const SCENE3_DUR = SCENES.s3.dur;
