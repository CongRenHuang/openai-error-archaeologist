"""Model adapter boundary for deterministic tests and GPT-5.6 vision."""

import base64
from typing import Protocol

from openai import OpenAI

from backend.app.domain.models import (
    AnalysisResult,
    Candidate,
    Prediction,
    Probe,
)
from backend.app.fixtures import Sample

ANALYSIS_PROMPT = """You analyze one synthetic middle-school algebra artifact.
Return evidence-linked hypotheses, not a verdict. Normalize written steps. Locate
the first invalid transition. For diagnosed work, give exactly two plausible
candidate misconceptions and one short differentiating probe. Each candidate
must predict a distinct wrong response to that probe. Use explicit * for
multiplication in all answer expressions. If any symbol is ambiguous or evidence
is insufficient, set status to abstained, explain why, and return no candidates
or probe. Never infer identity, ability, intent, disability, or emotion.
"""


class ModelAdapterError(RuntimeError):
    """Raised when model output cannot be obtained or parsed."""


class ModelAdapter(Protocol):
    def analyze(self, sample: Sample) -> AnalysisResult: ...


def _negative_distribution() -> AnalysisResult:
    return AnalysisResult(
        status="diagnosed",
        observed_error="Expanded -3(x - 2) as -3x - 6.",
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
    )


def _first_term_only() -> AnalysisResult:
    return AnalysisResult(
        status="diagnosed",
        observed_error="Expanded -4(b - 3) as -4b - 3.",
        normalized_steps=["-4*(b-3)", "-4*b-3"],
        first_invalid_transition=1,
        candidates=[
            Candidate(
                id="FIRST_TERM_ONLY",
                label="Coefficient applied only to the first term",
                evidence_step="-4*(b-3) -> -4*b-3",
                predicted_answer="5*a+2",
            ),
            Candidate(
                id="SIGN_COPY",
                label="Inside sign copied without multiplying the term",
                evidence_step="-4*(b-3) -> -4*b-3",
                predicted_answer="5*a-2",
            ),
        ],
        probe=Probe(
            question="Expand 5(a + 2)",
            correct_answer="5*a+10",
            predictions=[
                Prediction(candidate_id="FIRST_TERM_ONLY", answer="5*a+2"),
                Prediction(candidate_id="SIGN_COPY", answer="5*a-2"),
            ],
        ),
    )


class FakeModelAdapter:
    def analyze(self, sample: Sample) -> AnalysisResult:
        if sample.id == "ambiguous-input":
            return AnalysisResult(
                status="abstained",
                normalized_steps=["-2*(x-?)", "-2*x+?"],
                abstain_reason="Unreadable symbols change the mathematical meaning.",
            )
        if sample.id == "first-term-only":
            return _first_term_only()
        return _negative_distribution()


class OpenAIModelAdapter:
    def __init__(self, api_key: str | None, model: str):
        self.api_key = api_key
        self.model = model

    def analyze(self, sample: Sample) -> AnalysisResult:
        if not self.api_key:
            raise ModelAdapterError("OPENAI_API_KEY is not configured")
        encoded = base64.b64encode(sample.path.read_bytes()).decode("ascii")
        try:
            response = OpenAI(api_key=self.api_key).responses.parse(
                model=self.model,
                input=[
                    {
                        "role": "user",
                        "content": [
                            {"type": "input_text", "text": ANALYSIS_PROMPT},
                            {
                                "type": "input_image",
                                "image_url": f"data:image/png;base64,{encoded}",
                                "detail": "high",
                            },
                        ],
                    }
                ],
                text_format=AnalysisResult,
            )
        except Exception as error:
            raise ModelAdapterError("OpenAI analysis request failed") from error

        parsed = getattr(response, "output_parsed", None)
        if isinstance(parsed, AnalysisResult):
            return parsed
        for output in response.output:
            if getattr(output, "type", None) != "message":
                continue
            for item in output.content:
                if getattr(item, "type", None) == "refusal":
                    raise ModelAdapterError("Model refused the analysis request")
                item_parsed = getattr(item, "parsed", None)
                if isinstance(item_parsed, AnalysisResult):
                    return item_parsed
        raise ModelAdapterError("Model returned no structured analysis")
