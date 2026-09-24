# HUD 连击火焰图标 v01

## 状态

- 当前状态：`reference_reactivated`（单独使用时语义不明确；现仅作为“连击数字 + 四档火焰”系统的造型参考）
- 日期：2026-09-22
- AI 原始输出：`art/ai-raw/icon/hud/icon_combo_raw_v001.png`
- 透明候选稿：`art/concepts/icon/hud/icon_combo_v001.png`
- UI 参考：`art/concepts/ui/game/ui_game_a_upgrade_v006.png`
- 同族图标参考：`art/final/icon/hud/icon_coin.png`、`art/final/icon/hud/icon_complaint.png`

## 视觉与用途

- 用于主游戏顶部 HUD 连击倍率显示，图片内不写 `x3` 等数值。
- 三尖橙红外焰、橙色中焰和金黄内焰组成清晰火焰轮廓，整体略向右上扬。
- 右上角两枚小火花与金币、投诉图标的动态标记形成统一语言。

## 技术检查

- 原生输出：1254 × 1254 RGBA PNG。
- 四角完全透明，Alpha 16 以上的主体和两枚火花均未触碰画布边缘。
- 检出少量低透明边缘散点；视觉批准后在 `cleanup` 阶段清除并导出 512 × 512 正式母图。
- 当前尚未进入 `art/final/`，未导入 FairyGUI/Cocos，也未验证 48/64/90 px 实际显示效果。

## 生成方式

- 模式：内置 ImageGen，多参考图生成。
- 用例：`stylized-concept`。
- ImageGen 直接返回 RGBA 透明图，因此没有执行色键移除脚本。

## 完整提示词

```text
Use case: stylized-concept
Asset type: single mobile-game HUD combo-streak icon for the combo counter
Input images: Image 1 is the approved gameplay UI; use its top-HUD orange-red flame as the locked functional symbol for combo. Images 2 and 3 are the approved HUD coin and complaint icons and lock the chunky rounded outline, icon scale, two-step shading, top-left highlight, and playful two-tick energy motif.
Primary request: Create exactly one lively COMBO STREAK FLAME HUD ICON, no variants and no additional objects. It must read as a hot rising streak at 48–90 px. Combo multiplier text and numbers will be separate UI text and must not appear in the image.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background for background removal. The background must be one uniform color with no shadow, gradient, texture, reflection, or floor. Do not use #00ff00 in the subject.
Subject: one chunky upright flame leaning slightly to the right, with a bold dark chocolate-brown outer outline, a coral-red/orange outer flame, a bright orange middle flame, and one simple golden-yellow inner flame shaped like an upward teardrop. Give the outer flame exactly three large rounded tips: one tall central tip, one shorter left tip, and one medium right tip. Add one small cream highlight on the upper-left orange surface and exactly two tiny golden-orange spark ticks outside the upper-right edge.
Style/medium: polished 2D casual mobile-game HUD icon, warm warehouse comedy flat cartoon, bold clean rounded outline, simple geometry, restrained two-step shading, energetic and friendly rather than dangerous or realistic.
Composition/framing: exactly one centered flame icon on a square canvas with generous even padding; entire flame and both spark ticks fully visible, no crop. Main flame fills about 62–70% of the canvas height.
Color palette: coral red, vivid orange, golden yellow, cream highlight, dark chocolate-brown outline. No green in the subject.
Constraints: exactly one flame; exactly three outer tips; exactly one middle flame region; exactly one inner yellow flame; exactly one cream highlight; exactly two spark ticks; no cast shadow, contact shadow, smoke, text, letters, numbers, multiplication sign, logo, watermark, face, eyes, mouth, hands, torch, candle, explosion, UI panel, or floor; crisp separated silhouette suitable for transparent sprite cleanup.
Avoid: realistic fire, thin wispy flames, aggressive inferno, fireball, campfire, multiple flames, heart-shaped flame, mascot face, blue or green fire, excessive gradients, glossy 3D, photorealism, fake writing, brand marks, green spill, cropped sparks.
```
