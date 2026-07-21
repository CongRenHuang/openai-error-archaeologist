import pytest


@pytest.fixture
def analysis_result():
    from backend.app.domain.models import (
        AnalysisResult,
        Candidate,
        Prediction,
        Probe,
    )

    return AnalysisResult(
        status="diagnosed",
        observed_error="Distributed the negative coefficient incorrectly.",
        normalized_steps=["-3*(x-2)", "-3*x-6"],
        first_invalid_transition=1,
        candidates=[
            Candidate(
                id="NEG_DIST",
                label="Negative sign not distributed to the second term",
                evidence_step="-3*(x-2) -> -3*x-6",
                predicted_answer="-4*b-12",
            ),
            Candidate(
                id="DIST_FIRST_ONLY",
                label="Coefficient applied only to the first term",
                evidence_step="-3*(x-2) -> -3*x-6",
                predicted_answer="-4*b-3",
            ),
        ],
        probe=Probe(
            question="Expand -4(b - 3)",
            correct_answer="-4*b+12",
            predictions=[
                Prediction(candidate_id="NEG_DIST", answer="-4*b-12"),
                Prediction(candidate_id="DIST_FIRST_ONLY", answer="-4*b-3"),
            ],
        ),
        abstain_reason=None,
    )
