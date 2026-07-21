export type AnalysisStatus = "diagnosed" | "abstained";
export type UpdateStatus =
  | "candidate_supported"
  | "candidates_weakened"
  | "abstained";

export interface Sample {
  id: string;
  title: string;
  skill: string;
  description: string;
  image_url: string;
}

export interface Prediction {
  candidate_id: string;
  answer: string;
}

export interface Candidate {
  id: string;
  label: string;
  evidence_step: string;
  predicted_answer: string;
}

export interface Probe {
  question: string;
  correct_answer: string;
  predictions: Prediction[];
}

export interface AnalysisResult {
  status: AnalysisStatus;
  observed_error: string | null;
  normalized_steps: string[];
  first_invalid_transition: number | null;
  candidates: Candidate[];
  probe: Probe | null;
  abstain_reason: string | null;
}

export interface AnalysisEnvelope {
  id: string;
  sample_id: string;
  result: AnalysisResult;
}

export interface EvidenceUpdate {
  status: UpdateStatus;
  supported_candidate_id: string | null;
  explanation: string;
}

export interface ApiErrorBody {
  detail?: {
    message?: string;
    correlation_id?: string;
  };
}
