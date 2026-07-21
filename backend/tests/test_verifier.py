def test_probe_predictions_must_differ(analysis_result):
    from backend.app.domain.verifier import verify_probe

    analysis_result.probe.predictions[1].answer = (
        analysis_result.probe.predictions[0].answer
    )

    assert verify_probe(analysis_result) is False


def test_valid_probe_passes_verification(analysis_result):
    from backend.app.domain.verifier import verify_probe

    assert verify_probe(analysis_result) is True


def test_response_supports_matching_candidate_without_explicit_multiplication(
    analysis_result,
):
    from backend.app.domain.verifier import match_response

    update = match_response(analysis_result, "-4b - 12")

    assert update.status == "candidate_supported"
    assert update.supported_candidate_id == "NEG_DIST"


def test_correct_response_weakens_both_candidates(analysis_result):
    from backend.app.domain.verifier import match_response

    update = match_response(analysis_result, "-4b + 12")

    assert update.status == "candidates_weakened"
    assert update.supported_candidate_id is None


def test_unmatched_response_abstains(analysis_result):
    from backend.app.domain.verifier import match_response

    update = match_response(analysis_result, "banana")

    assert update.status == "abstained"
    assert update.supported_candidate_id is None


def test_expression_grammar_rejects_function_calls():
    from backend.app.domain.verifier import equivalent

    assert equivalent("sin(0)", "0") is False
