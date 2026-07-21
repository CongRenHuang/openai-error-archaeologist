"""FastAPI application exposing only submission-critical endpoints."""

from pathlib import Path
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from backend.app.config import Settings
from backend.app.domain.models import AnalysisEnvelope, EvidenceUpdate
from backend.app.fixtures import SAMPLE_CATALOG, SAMPLES_BY_ID, SAMPLES_DIR
from backend.app.integrations.openai import FakeModelAdapter, OpenAIModelAdapter
from backend.app.repository import AnalysisRepository
from backend.app.service import (
    AnalysisNotFoundError,
    AnalysisService,
    ModelUnavailableError,
)


class AnalysisRequest(BaseModel):
    sample_id: str


class ProbeResponseRequest(BaseModel):
    analysis_id: str
    response: str = Field(min_length=1, max_length=100)


def create_app(settings: Settings | None = None) -> FastAPI:
    active_settings = settings or Settings()
    repository = AnalysisRepository(active_settings.database_url)
    if active_settings.model_adapter == "fake":
        adapter = FakeModelAdapter()
    else:
        secret = active_settings.openai_api_key
        adapter = OpenAIModelAdapter(
            api_key=secret.get_secret_value() if secret else None,
            model=active_settings.openai_model,
        )
    service = AnalysisService(adapter=adapter, repository=repository)
    app = FastAPI(title="Error Archaeologist", version="0.1.0")

    @app.get("/api/v1/samples")
    def list_samples() -> list[dict[str, str]]:
        return [
            {
                "id": sample.id,
                "title": sample.title,
                "skill": sample.skill,
                "description": sample.description,
                "image_url": sample.image_url,
            }
            for sample in SAMPLE_CATALOG
        ]

    @app.post("/api/v1/analyses", response_model=AnalysisEnvelope)
    def analyze(request: AnalysisRequest) -> AnalysisEnvelope:
        sample = SAMPLES_BY_ID.get(request.sample_id)
        if sample is None:
            raise HTTPException(
                status_code=400,
                detail={"code": "UNKNOWN_SAMPLE", "message": "Choose a listed sample."},
            )
        try:
            return service.analyze(sample)
        except ModelUnavailableError as error:
            correlation_id = str(uuid4())
            raise HTTPException(
                status_code=503,
                detail={
                    "code": "MODEL_UNAVAILABLE",
                    "message": str(error),
                    "correlation_id": correlation_id,
                },
            ) from error

    @app.post("/api/v1/probe-response", response_model=EvidenceUpdate)
    def respond(request: ProbeResponseRequest) -> EvidenceUpdate:
        try:
            return service.respond(request.analysis_id, request.response)
        except AnalysisNotFoundError as error:
            raise HTTPException(
                status_code=400,
                detail={
                    "code": "RESET_REQUIRED",
                    "message": "Analysis expired; restart with a sample.",
                },
            ) from error

    app.mount("/samples", StaticFiles(directory=SAMPLES_DIR), name="samples")
    frontend_dist = Path(__file__).resolve().parents[2] / "frontend" / "dist"
    if (frontend_dist / "index.html").exists():
        app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="frontend")
    return app


app = create_app()
