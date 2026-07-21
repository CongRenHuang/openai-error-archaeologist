from pathlib import Path

from PIL import Image


def test_catalog_contains_three_stable_samples():
    from backend.app.fixtures import SAMPLE_CATALOG

    assert [sample.id for sample in SAMPLE_CATALOG] == [
        "negative-distribution",
        "first-term-only",
        "ambiguous-input",
    ]


def test_each_sample_has_readable_png():
    from backend.app.fixtures import SAMPLE_CATALOG

    for sample in SAMPLE_CATALOG:
        assert Path(sample.path).exists()
        with Image.open(sample.path) as image:
            assert image.format == "PNG"
            assert image.size == (1200, 800)
