"""Analysis orchestration and verification policy."""

from backend.app.domain.models import AnalysisEnvelope, AnalysisResult, EvidenceUpdate
from backend.app.domain.verifier import match_response, verify_probe
from backend.app.fixtures import Sample
from backend.app.integrations.openai import ModelAdapter, ModelAdapterError
from backend.app.repository import AnalysisRepository


class ModelUnavailableError(RuntimeError):
    pass


class AnalysisNotFoundError(LookupError):
    pass


class AnalysisService:
    def __init__(self, adapter: ModelAdapter, repository: AnalysisRepository):
        self.adapter = adapter
        self.repository = repository

    def analyze(self, sample: Sample) -> AnalysisEnvelope:
        last_error: ModelAdapterError | None = None
        for _attempt in range(2):
            try:
                result = self.adapter.analyze(sample)
            except ModelAdapterError as error:
                last_error = error
                continue
            if verify_probe(result):
                analysis_id = self.repository.save(sample.id, result)
                return AnalysisEnvelope(
                    id=analysis_id,
                    sample_id=sample.id,
                    result=result,
                )

        if last_error is not None:
            raise ModelUnavailableError(str(last_error)) from last_error
        result = AnalysisResult(
            status="abstained",
            abstain_reason="Could not verify a discriminating probe.",
        )
        analysis_id = self.repository.save(sample.id, result)
        return AnalysisEnvelope(id=analysis_id, sample_id=sample.id, result=result)

    def respond(self, analysis_id: str, response: str) -> EvidenceUpdate:
        result = self.repository.get(analysis_id)
        if result is None:
            raise AnalysisNotFoundError(analysis_id)
        return match_response(result, response)
