#!/usr/bin/env python3
"""Add deterministic lower-control labels to the unified HUD reference board."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


FONT_PATH = "/System/Library/Fonts/STHeiti Medium.ttc"
PANEL_LEFTS = (24, 438, 852, 1266)


def centered(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str,
             text_font: ImageFont.FreeTypeFont, fill: tuple[int, int, int, int]) -> None:
    left, top, right, bottom = box
    bounds = draw.textbbox((0, 0), text, font=text_font)
    width = bounds[2] - bounds[0]
    height = bounds[3] - bounds[1]
    draw.text(((left + right - width) // 2, (top + bottom - height) // 2 - bounds[1]),
              text, font=text_font, fill=fill)


def label_board(source: Path, output: Path) -> None:
    image = Image.open(source).convert("RGBA")
    draw = ImageDraw.Draw(image)
    ink = (77, 46, 28, 255)
    cream = (255, 248, 230, 245)
    pale_orange = (240, 183, 103, 255)
    button_orange = (255, 103, 29, 255)
    button_dark = (123, 48, 20, 255)
    white = (255, 255, 255, 255)
    small_font = ImageFont.truetype(FONT_PATH, 18)
    capacity_font = ImageFont.truetype(FONT_PATH, 19)
    button_font = ImageFont.truetype(FONT_PATH, 27)

    for left in PANEL_LEFTS:
        # Capacity wording: preserve the capacity circles and add the missing semantic label.
        draw.rounded_rectangle((left + 145, 670, left + 230, 704), radius=10,
                               fill=cream, outline=pale_orange, width=2)
        centered(draw, (left + 145, 670, left + 230, 704), "箱内 0/4", capacity_font, ink)

        # Compact header strips for the three lower selectors.
        tiles = (
            (left + 14, left + 131, "纸箱"),
            (left + 135, left + 258, "包装"),
            (left + 262, left + 380, "标签"),
        )
        for tile_left, tile_right, text in tiles:
            draw.rounded_rectangle((tile_left + 8, 723, tile_right - 8, 748), radius=8,
                                   fill=cream, outline=pale_orange, width=2)
            centered(draw, (tile_left + 8, 723, tile_right - 8, 748), text, small_font, ink)

        # Redraw the action button interior so its icon and text fit as one control.
        draw.rounded_rectangle((left + 18, 820, left + 369, 897), radius=30,
                               fill=button_orange, outline=button_dark, width=5)
        icon_x = left + 93
        icon_y = 858
        draw.line((icon_x - 34, icon_y - 10, icon_x - 10, icon_y - 10), fill=white, width=6)
        draw.line((icon_x - 27, icon_y, icon_x - 10, icon_y), fill=white, width=6)
        draw.polygon(((icon_x, icon_y - 18), (icon_x + 22, icon_y - 7),
                      (icon_x + 22, icon_y + 19), (icon_x, icon_y + 30),
                      (icon_x - 22, icon_y + 19), (icon_x - 22, icon_y - 7)),
                     outline=white, fill=None)
        draw.line((icon_x, icon_y - 18, icon_x, icon_y + 30), fill=white, width=4)
        draw.line((icon_x - 22, icon_y - 7, icon_x, icon_y + 4, icon_x + 22, icon_y - 7),
                  fill=white, width=4)
        centered(draw, (left + 142, 826, left + 350, 891), "封箱发货", button_font, white)

    output.parent.mkdir(parents=True, exist_ok=True)
    image.convert("RGB").save(output, quality=95)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    label_board(args.source, args.output)


if __name__ == "__main__":
    main()
