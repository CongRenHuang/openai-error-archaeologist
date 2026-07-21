"""Stable contracts shared by model, verifier, API, and UI."""

from typing import Literal

from pydantic import BaseModel, Field


class Prediction(BaseModel):
    candidate_id: str
    answer: str


class Candidate(BaseModel):
    id: str
    label: str
    evidence_step: str
    predicted_answer: str


class Probe(BaseModel):
    question: str
    correct_answer: str
    predictions: list[Prediction]


class AnalysisResult(BaseModel):
    status: Literal["diagnosed", "abstained"]
    observed_error: str | None = None
    normalized_steps: list[str] = Field(default_factory=list)
    first_invalid_transition: int | None = None
    candidates: list[Candidate] = Field(default_factory=list)
    probe: Probe | None = None
    abstain_reason: str | None = None


class EvidenceUpdate(BaseModel):
    status: Literal[
        "candidate_supported",
        "candidates_weakened",
        "abstained",
    ]
    supported_candidate_id: str | None = None
    explanation: str


class AnalysisEnvelope(BaseModel):
    id: str
    sample_id: str
    result: AnalysisResult
