#!/usr/bin/env python3
"""Compose the deterministic top-HUD information layout review board."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[2]
FONT_PATH = Path("/System/Library/Fonts/STHeiti Medium.ttc")


def font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_PATH), size)


def paste_contain(canvas: Image.Image, path: Path, box: tuple[int, int, int, int]) -> None:
    icon = Image.open(path).convert("RGBA")
    max_width = box[2] - box[0]
    max_height = box[3] - box[1]
    icon.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
    x = box[0] + (max_width - icon.width) // 2
    y = box[1] + (max_height - icon.height) // 2
    canvas.alpha_composite(icon, (x, y))


def draw_centered(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str,
                  text_font: ImageFont.FreeTypeFont, fill: tuple[int, int, int, int]) -> None:
    left, top, right, bottom = box
    bounds = draw.textbbox((0, 0), text, font=text_font)
    width = bounds[2] - bounds[0]
    height = bounds[3] - bounds[1]
    draw.text(((left + right - width) // 2, (top + bottom - height) // 2 - bounds[1]),
              text, font=text_font, fill=fill)


def compose(output: Path) -> None:
    canvas = Image.new("RGBA", (1500, 680), (250, 244, 229, 255))
    draw = ImageDraw.Draw(canvas)
    ink = (69, 42, 28, 255)
    muted = (117, 124, 125, 255)
    brown = (112, 58, 28, 255)
    cream = (255, 251, 239, 255)
    divider = (224, 201, 157, 255)
    orange = (245, 138, 58, 255)
    gold = (255, 211, 78, 255)
    red = (231, 83, 83, 255)

    draw_centered(draw, (0, 24, 1500, 92), "顶部 HUD 信息布局", font(44), ink)
    draw_centered(draw, (0, 86, 1500, 126), "常驻信息使用图标＋短中文＋准确数值", font(24), muted)

    hud_box = (60, 145, 1440, 315)
    draw.rounded_rectangle(hud_box, radius=42, fill=cream, outline=brown, width=8)
    draw.line((590, 164, 590, 296), fill=divider, width=5)
    draw.line((1008, 164, 1008, 296), fill=divider, width=5)

    # Current-workday goal.
    paste_contain(canvas, ROOT / "art/final/icon/hud/icon_day_goal_star.png", (84, 166, 224, 294))
    draw.text((240, 174), "今日目标", font=font(28), fill=muted)
    draw.text((438, 163), "3/6", font=font(50), fill=ink)
    draw.rounded_rectangle((240, 237, 535, 274), radius=18, fill=(91, 55, 37, 255))
    draw.rounded_rectangle((246, 243, 388, 268), radius=12, fill=gold)

    # Coins.
    paste_contain(canvas, ROOT / "art/final/icon/hud/icon_coin.png", (615, 170, 745, 290))
    draw.text((755, 178), "金币", font=font(28), fill=muted)
    draw.text((752, 222), "1,240", font=font(48), fill=ink)

    # Complaints.
    paste_contain(canvas, ROOT / "art/final/icon/hud/icon_complaint.png", (1033, 170, 1163, 290))
    draw.text((1172, 178), "投诉", font=font(28), fill=muted)
    draw.text((1168, 222), "0/3", font=font(48), fill=red)

    draw_centered(draw, (70, 324, 980, 370), "默认常驻：今日目标／金币／投诉", font(25), muted)

    # Temporary combo component.
    combo_area = (990, 335, 1430, 610)
    draw.rounded_rectangle(combo_area, radius=34, fill=(255, 251, 239, 190), outline=(229, 179, 98, 255), width=4)
    draw_centered(draw, (990, 342, 1430, 382), "连续完美后临时出现", font(22), muted)

    glow = Image.open(ROOT / "art/final/fx/hud/fx_combo_glow_ring.png").convert("RGBA")
    flame = Image.open(ROOT / "art/final/fx/hud/fx_combo_flame_base.png").convert("RGBA")
    glow.thumbnail((390, 195), Image.Resampling.LANCZOS)
    flame.thumbnail((390, 195), Image.Resampling.LANCZOS)
    gx = 1210 - glow.width // 2
    gy = 392
    canvas.alpha_composite(glow, (gx, gy))
    canvas.alpha_composite(flame, (1210 - flame.width // 2, 396))

    draw_centered(draw, (1030, 404, 1390, 449), "完美连单", font(28), ink)
    draw_centered(draw, (1030, 445, 1390, 535), "×3", font(64), (156, 45, 25, 255))
    # Layout rule note.
    draw.rounded_rectangle((60, 405, 950, 610), radius=30, fill=(255, 255, 255, 150), outline=divider, width=3)
    draw.text((92, 430), "信息规则", font=font(30), fill=orange)
    draw.text((92, 483), "• 星星显示当日成功订单进度，不是货币", font=font(25), fill=ink)
    draw.text((92, 526), "• 金币显示总额；奖励变化时播放飞入动效", font=font(25), fill=ink)
    draw.text((92, 569), "• 投诉始终显示当前值／3，第二次进入红色警告", font=font(25), fill=ink)

    output.parent.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(output, quality=95)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    compose(args.output)


if __name__ == "__main__":
    main()
