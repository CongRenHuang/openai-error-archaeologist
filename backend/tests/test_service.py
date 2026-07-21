from copy import deepcopy


class AlwaysInvalidAdapter:
    source = "fixture"

    def __init__(self, result):
        self.result = result
        self.calls = 0

    def analyze(self, sample):
        self.calls += 1
        result = deepcopy(self.result)
        result.probe.predictions[1].answer = result.probe.predictions[0].answer
        return result


def test_invalid_model_probe_retries_then_abstains(tmp_path, analysis_result):
    from backend.app.fixtures import SAMPLE_CATALOG
    from backend.app.repository import AnalysisRepository
    from backend.app.service import AnalysisService

    adapter = AlwaysInvalidAdapter(analysis_result)
    repository = AnalysisRepository(f"sqlite:///{tmp_path / 'service.db'}")
    service = AnalysisService(adapter=adapter, repository=repository)

    envelope = service.analyze(SAMPLE_CATALOG[0])

    assert adapter.calls == 2
    assert envelope.result.status == "abstained"
    assert envelope.result.abstain_reason == "Could not verify a discriminating probe."
    assert repository.get(envelope.id) == envelope.result
