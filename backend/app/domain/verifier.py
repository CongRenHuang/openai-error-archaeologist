"""Independent symbolic checks for model-proposed algebra probes."""

from itertools import combinations
import re

from sympy import simplify
from sympy.core.sympify import SympifyError
from sympy.parsing.sympy_parser import (
    convert_xor,
    implicit_multiplication_application,
    parse_expr,
    standard_transformations,
)

from backend.app.domain.models import AnalysisResult, EvidenceUpdate

TRANSFORMATIONS = standard_transformations + (
    implicit_multiplication_application,
    convert_xor,
)


def _expression(value: str):
    compact = re.sub(r"\s+", "", value)
    if not re.fullmatch(r"[0-9A-Za-z+\-*/^().]+", compact):
        raise ValueError("Unsupported expression characters")
    if re.search(r"[A-Za-z]{2,}", compact):
        raise ValueError("Only single-letter variables are supported")
    return parse_expr(compact, transformations=TRANSFORMATIONS)


def equivalent(left: str, right: str) -> bool:
    try:
        return simplify(_expression(left) - _expression(right)) == 0
    except (SympifyError, SyntaxError, TypeError, ValueError):
        return False


def verify_probe(result: AnalysisResult) -> bool:
    if result.status == "abstained":
        return result.probe is None and not result.candidates
    if result.probe is None or len(result.candidates) != 2:
        return False

    candidate_answers = {
        candidate.id: candidate.predicted_answer for candidate in result.candidates
    }
    predictions = result.probe.predictions
    if len(predictions) != 2 or {item.candidate_id for item in predictions} != set(
        candidate_answers
    ):
        return False
    if any(
        not equivalent(item.answer, candidate_answers[item.candidate_id])
        for item in predictions
    ):
        return False

    answers = [item.answer for item in predictions]
    if any(equivalent(answer, result.probe.correct_answer) for answer in answers):
        return False
    return all(not equivalent(left, right) for left, right in combinations(answers, 2))


def match_response(result: AnalysisResult, response: str) -> EvidenceUpdate:
    if result.status != "diagnosed" or result.probe is None:
        return EvidenceUpdate(
            status="abstained",
            explanation="No verified probe is available for this analysis.",
        )
    if equivalent(response, result.probe.correct_answer):
        return EvidenceUpdate(
            status="candidates_weakened",
            explanation="Correct response weakens both initial hypotheses.",
        )
    for prediction in result.probe.predictions:
        if equivalent(response, prediction.answer):
            return EvidenceUpdate(
                status="candidate_supported",
                supported_candidate_id=prediction.candidate_id,
                explanation="Response matches this hypothesis's distinct prediction.",
            )
    return EvidenceUpdate(
        status="abstained",
        explanation="Response matches neither verified prediction; teacher review is needed.",
    )
