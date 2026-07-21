from fastapi.testclient import TestClient


def make_client(tmp_path):
    from backend.app.config import Settings
    from backend.app.main import create_app

    settings = Settings(
        model_adapter="fake",
        database_url=f"sqlite:///{tmp_path / 'test.db'}",
    )
    return TestClient(create_app(settings=settings))


def test_complete_demo_flow(tmp_path):
    client = make_client(tmp_path)

    samples_response = client.get("/api/v1/samples")
    assert samples_response.status_code == 200
    samples = samples_response.json()
    assert len(samples) == 3
    assert "path" not in samples[0]

    analysis_response = client.post(
        "/api/v1/analyses",
        json={"sample_id": "negative-distribution"},
    )
    assert analysis_response.status_code == 200
    analysis = analysis_response.json()
    assert analysis["result"]["status"] == "diagnosed"
    assert analysis["result"]["probe"]["question"] == "Expand -4(b - 3)"

    update_response = client.post(
        "/api/v1/probe-response",
        json={"analysis_id": analysis["id"], "response": "-4b-12"},
    )
    assert update_response.status_code == 200
    assert update_response.json()["status"] == "candidate_supported"
    assert update_response.json()["supported_candidate_id"] == "NEG_DIST"


def test_ambiguous_sample_abstains(tmp_path):
    client = make_client(tmp_path)

    response = client.post(
        "/api/v1/analyses",
        json={"sample_id": "ambiguous-input"},
    )

    assert response.status_code == 200
    assert response.json()["result"]["status"] == "abstained"
    assert response.json()["result"]["probe"] is None


def test_unknown_sample_is_bad_request(tmp_path):
    client = make_client(tmp_path)

    response = client.post(
        "/api/v1/analyses",
        json={"sample_id": "not-a-sample"},
    )

    assert response.status_code == 400
    assert response.json()["detail"]["code"] == "UNKNOWN_SAMPLE"


def test_missing_analysis_requests_reset(tmp_path):
    client = make_client(tmp_path)

    response = client.post(
        "/api/v1/probe-response",
        json={"analysis_id": "missing", "response": "2x"},
    )

    assert response.status_code == 400
    assert response.json()["detail"]["code"] == "RESET_REQUIRED"
