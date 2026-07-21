"""Disposable SQLite-backed analysis state."""

from uuid import uuid4

from sqlalchemy import String, Text, create_engine, select
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column

from backend.app.domain.models import AnalysisResult


class Base(DeclarativeBase):
    pass


class AnalysisRow(Base):
    __tablename__ = "analyses"

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    sample_id: Mapped[str] = mapped_column(String(80))
    result_json: Mapped[str] = mapped_column(Text)


class AnalysisRepository:
    def __init__(self, database_url: str):
        connect_args = {"check_same_thread": False} if database_url.startswith("sqlite") else {}
        self.engine = create_engine(database_url, connect_args=connect_args)
        Base.metadata.create_all(self.engine)

    def save(self, sample_id: str, result: AnalysisResult) -> str:
        analysis_id = str(uuid4())
        with Session(self.engine) as session:
            session.add(
                AnalysisRow(
                    id=analysis_id,
                    sample_id=sample_id,
                    result_json=result.model_dump_json(),
                )
            )
            session.commit()
        return analysis_id

    def get(self, analysis_id: str) -> AnalysisResult | None:
        with Session(self.engine) as session:
            row = session.scalar(
                select(AnalysisRow).where(AnalysisRow.id == analysis_id)
            )
        if row is None:
            return None
        return AnalysisResult.model_validate_json(row.result_json)
