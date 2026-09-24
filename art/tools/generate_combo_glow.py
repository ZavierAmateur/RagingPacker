#!/usr/bin/env python3
"""Generate the deterministic high-combo HUD glow ring."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter


WIDTH = 1024
HEIGHT = 512
GOLD = (255, 185, 45)


def generate(output: Path) -> None:
    outer_mask = Image.new("L", (WIDTH, HEIGHT), 0)
    outer_draw = ImageDraw.Draw(outer_mask)
    outer_draw.ellipse((116, 72, 908, 452), fill=118)
    outer_draw.ellipse((220, 132, 804, 392), fill=0)
    outer_mask = outer_mask.filter(ImageFilter.GaussianBlur(30))

    inner_mask = Image.new("L", (WIDTH, HEIGHT), 0)
    inner_draw = ImageDraw.Draw(inner_mask)
    inner_draw.ellipse((184, 112, 840, 416), outline=156, width=10)
    inner_mask = inner_mask.filter(ImageFilter.GaussianBlur(7))

    highlight_mask = Image.new("L", (WIDTH, HEIGHT), 0)
    highlight_draw = ImageDraw.Draw(highlight_mask)
    highlight_draw.arc((206, 126, 818, 398), 202, 337, fill=105, width=8)
    highlight_mask = highlight_mask.filter(ImageFilter.GaussianBlur(5))

    alpha = ImageChops.lighter(outer_mask, inner_mask)
    alpha = ImageChops.lighter(alpha, highlight_mask)

    result = Image.new("RGBA", (WIDTH, HEIGHT), GOLD + (0,))
    result.putalpha(alpha)
    output.parent.mkdir(parents=True, exist_ok=True)
    result.save(output, optimize=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    generate(args.output)


if __name__ == "__main__":
    main()
