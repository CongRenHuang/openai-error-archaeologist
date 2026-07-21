"""Generate deterministic synthetic handwriting fixtures."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

WIDTH = 1200
HEIGHT = 800
OUTPUT_DIR = Path(__file__).parents[1] / "app" / "static" / "samples"
FONT_CANDIDATES = [
    Path("/System/Library/Fonts/Noteworthy.ttc"),
    Path("/System/Library/Fonts/Bradley Hand Bold.ttf"),
    Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
]
SAMPLES = {
    "negative-distribution": [
        "Expand and simplify:",
        "-3(x - 2)",
        "= -3x - 6",
    ],
    "first-term-only": [
        "Expand and simplify:",
        "-4(b - 3)",
        "= -4b - 3",
    ],
    "ambiguous-input": [
        "Expand and simplify:",
        "-2(x - ?)",
        "= -2x + ?",
    ],
}


def _font(size: int):
    for path in FONT_CANDIDATES:
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default(size=size)


def generate() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    title_font = _font(44)
    work_font = _font(76)
    for sample_id, lines in SAMPLES.items():
        image = Image.new("RGB", (WIDTH, HEIGHT), "#f7f1e5")
        draw = ImageDraw.Draw(image)
        for y in range(120, HEIGHT, 80):
            draw.line((80, y, WIDTH - 80, y), fill="#d8e2df", width=2)
        draw.text((120, 105), lines[0], font=title_font, fill="#263238")
        draw.text((160, 270), lines[1], font=work_font, fill="#16232a")
        draw.text((210, 445), lines[2], font=work_font, fill="#16232a")
        image.save(OUTPUT_DIR / f"{sample_id}.png", format="PNG")


if __name__ == "__main__":
    generate()
