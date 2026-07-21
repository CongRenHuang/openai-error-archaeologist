import type { AnalysisStatus, Candidate, UpdateStatus } from "./types";

export type Phase =
  | "selection"
  | "analyzing"
  | "diagnosis"
  | "abstention"
  | "updated"
  | "error";

export function phaseForAnalysis(status: AnalysisStatus): Phase {
  return status === "diagnosed" ? "diagnosis" : "abstention";
}

export function phaseForUpdate(_status: UpdateStatus): Phase {
  return "updated";
}

export function responseForCandidate(
  candidate: Pick<Candidate, "predicted_answer">,
): string {
  return candidate.predicted_answer;
}
