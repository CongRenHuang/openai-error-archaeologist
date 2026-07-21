import assert from "node:assert/strict";
import test from "node:test";

import { phaseForAnalysis, phaseForUpdate } from "./workflow.ts";

test("diagnosed analysis advances to probe", () => {
  assert.equal(phaseForAnalysis("diagnosed"), "diagnosis");
});

test("abstained analysis advances to abstention", () => {
  assert.equal(phaseForAnalysis("abstained"), "abstention");
});

test("probe evidence advances to update", () => {
  assert.equal(phaseForUpdate("candidate_supported"), "updated");
  assert.equal(phaseForUpdate("candidates_weakened"), "updated");
  assert.equal(phaseForUpdate("abstained"), "updated");
});
