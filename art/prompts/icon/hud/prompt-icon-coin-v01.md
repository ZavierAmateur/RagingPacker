# HUD 金币图标 v01

## 状态

- 当前状态：`ready_for_import`（开发者于 2026-09-22 确认进入下一步）
- 日期：2026-09-22
- AI 原始输出：`art/ai-raw/icon/hud/icon_coin_raw_v001.png`
- 透明候选稿：`art/concepts/icon/hud/icon_coin_v001.png`
- UI 参考：`art/concepts/ui/game/ui_game_a_upgrade_v006.png`
- 同族表现参考：`art/final/packaging/label/label_fragile.png`

## 视觉与用途

- 用于主游戏顶部 HUD 金币数量显示，不在图片内写数值。
- 正面金币配轻微倾斜和中央五角星，保留厚轮廓、亮黄色币面和橙金侧缘。
- 右上角两枚小闪光增加活力，但不得抢过金币轮廓或影响 48～90 px 识别。

## 技术检查

- 原生输出：1254 × 1254 RGBA PNG。
- 四角完全透明，Alpha 16 以上的主体和闪光均未触碰画布边缘。
- 已清除低透明边缘散点，并导出为 `art/final/icon/hud/icon_coin.png`。
- 正式母图为 512 × 512 RGBA；Alpha 包围盒未触边，四角透明，画布边缘无非透明像素。
- 当前尚未导入 FairyGUI/Cocos，也未验证运行时 48/64/90 px 缩放与图集压缩。

## 生成方式

- 模式：内置 ImageGen，多参考图生成。
- 用例：`stylized-concept`。
- ImageGen 直接返回 RGBA 透明图，因此没有执行色键移除脚本。

## 完整提示词

```text
Use case: stylized-concept
Asset type: single mobile-game HUD currency icon for the coin counter
Input images: Image 1 is the approved gameplay UI; use its top-HUD gold coin with a central star as the functional and palette reference. Image 2 is the approved lively C-direction fragile label and defines the current rounded, expressive, bold-outline finish. Image 3 is the locked Item Style Master V1 and defines small-size clarity.
Primary request: Create exactly one lively GOLD COIN HUD ICON, no variants and no additional objects. It must instantly read as currency at 48–90 px and fit the approved warm UI.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background for background removal. The background must be one uniform color with no shadow, gradient, texture, reflection, or floor. Do not use #00ff00 in the subject.
Subject: one chunky round gold coin seen mostly front-on with a very slight 8-degree tilt, thick dark warm-brown outer outline, orange-gold rim, bright yellow inner face, and one large embossed five-point star centered on the coin. Add one small top-left cream shine and two tiny orange speed/spark ticks outside the upper-right rim to give playful energy. The star remains part of the coin, not a separate object.
Style/medium: polished 2D casual mobile-game HUD icon, warm warehouse comedy flat cartoon, bold clean rounded outline, simple geometry, two-step shading, high contrast, friendly and energetic rather than realistic.
Composition/framing: one icon centered on a square canvas with generous even padding, whole coin and two tiny spark ticks fully visible, no crop. Coin fills about 68–74% of the canvas.
Color palette: bright warm yellow, orange-gold, amber shadow, dark chocolate-brown outline, small cream highlight. No green in the subject.
Constraints: exactly one coin; exactly one centered five-point star; exactly one shine; exactly two small spark ticks; no cast shadow, contact shadow, reflection, text, letters, numbers, currency symbols, logo, watermark, hands, coin stack, bag, UI panel, or floor; crisp separated silhouette suitable for transparent sprite cleanup.
Avoid: multiple coins, realistic metal, photorealism, 3D render, thin rim, detailed engraving, facial features, crown, gem, dollar sign, fake writing, brand marks, green spill, excessive gradients, oversized sparks, cropped outline.
```
