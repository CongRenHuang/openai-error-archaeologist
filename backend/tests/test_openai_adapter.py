from types import SimpleNamespace

from backend.app.config import Settings
from backend.app.fixtures import SAMPLES_BY_ID
from backend.app.integrations import openai as openai_integration


def test_live_defaults_use_luna_with_medium_reasoning(monkeypatch):
    monkeypatch.delenv("OPENAI_MODEL", raising=False)
    monkeypatch.delenv("OPENAI_REASONING_EFFORT", raising=False)

    settings = Settings(_env_file=None)

    assert settings.openai_model == "gpt-5.6-luna"
    assert settings.openai_reasoning_effort == "medium"


def test_openai_adapter_sends_configured_reasoning_effort(
    monkeypatch, analysis_result
):
    request = {}

    class FakeResponses:
        def parse(self, **kwargs):
            request.update(kwargs)
            return SimpleNamespace(output_parsed=analysis_result)

    fake_client = SimpleNamespace(responses=FakeResponses())
    monkeypatch.setattr(
        openai_integration,
        "OpenAI",
        lambda api_key: fake_client,
    )
    adapter = openai_integration.OpenAIModelAdapter(
        api_key="test-key",
        model="gpt-5.6-luna",
        reasoning_effort="medium",
    )

    result = adapter.analyze(SAMPLES_BY_ID["negative-distribution"])

    assert result == analysis_result
    assert request["reasoning"] == {"effort": "medium"}
