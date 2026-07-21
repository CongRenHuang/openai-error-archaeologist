"""Repository-owned synthetic sample catalog."""

from dataclasses import dataclass
from pathlib import Path

STATIC_DIR = Path(__file__).parent / "static"
SAMPLES_DIR = STATIC_DIR / "samples"


@dataclass(frozen=True)
class Sample:
    id: str
    title: str
    skill: str
    description: str
    image_url: str
    path: Path


def _sample(sample_id: str, title: str, description: str) -> Sample:
    return Sample(
        id=sample_id,
        title=title,
        skill="Distributive property",
        description=description,
        image_url=f"/samples/{sample_id}.png",
        path=SAMPLES_DIR / f"{sample_id}.png",
    )


SAMPLE_CATALOG = [
    _sample(
        "negative-distribution",
        "Negative distribution",
        "A sign error creates multiple plausible explanations.",
    ),
    _sample(
        "first-term-only",
        "First term only",
        "A coefficient appears to affect only one term.",
    ),
    _sample(
        "ambiguous-input",
        "Ambiguous handwriting",
        "Unreadable symbols should force abstention.",
    ),
]

SAMPLES_BY_ID = {sample.id: sample for sample in SAMPLE_CATALOG}
