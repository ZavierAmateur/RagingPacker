# C 方向易碎标签 v01

## 状态

- 当前状态：`rejected_style`（开发者反馈“不够生动”，由 v002 替代）
- 日期：2026-09-22
- AI 原始输出：`art/ai-raw/packaging/label/label_fragile_raw_v001.png`
- 透明候选稿：`art/concepts/packaging/label/label_fragile_v001.png`
- 方向参考：`art/concepts/packaging/packaging_core_direction_board_v001.png` 的 C 方向
- 同族参考：`art/final/packaging/box/box_small_closed.png`、`art/final/packaging/wrap/wrap_bubble_roll.png`

## 视觉与用途

- 用于主游戏标签选择器和纸箱贴标反馈。
- 奶油色圆角贴纸配粗深棕边框；左侧破裂酒杯是主要识别符号，右侧五条粗竖线只表达物流标签感，不是可扫描条码。
- 右上角使用一个小型橙红警告三角形补充危险语义，但不得抢过破裂酒杯。
- 图片不写“易碎”；中文说明由 FairyGUI 独立文字组件显示。

## 技术检查

- 原生输出：1254 × 1254 RGBA PNG。
- 四角完全透明，Alpha 16 以上的主体未触碰画布边缘。
- 检出少量低透明边缘散点；视觉批准后在 `cleanup` 阶段清除并导出 1024 × 1024 正式母图。
- 当前尚未进入 `art/final/`，未导入 FairyGUI/Cocos，也未验证 90/128/256 px 实际显示效果。

## 生成方式

- 模式：内置 ImageGen，多参考图生成。
- 用例：`stylized-concept`。
- ImageGen 直接返回 RGBA 透明图，因此没有执行色键移除脚本。

## 完整提示词

```text
Use case: stylized-concept
Asset type: single mobile-game sprite candidate for the fragile shipping-label selector and package sticker
Input images: Image 1 is the approved packaging direction board; use ONLY direction C's label as the locked shape reference: a chunky horizontal rounded-rectangle sticker with a cream face and thick dark-brown border. Image 2 and Image 3 are the approved C-direction box and bubble-wrap assets; match their rounded proportions, outline weight, flat shading, and polish. Image 4 is the locked Item Style Master V1 and defines small-size readability.
Primary request: Create exactly one FRAGILE SHIPPING LABEL sprite, no variants and no additional objects.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background for background removal. The background must be one uniform color with no shadows, gradients, texture, reflections, floor plane, or lighting variation.
Subject: a horizontal cream adhesive shipping label with softly rounded corners and a thick dark-brown outline. On the left, place one very large dark broken wine-glass pictogram with a clearly visible zigzag crack through the bowl. On the right, place exactly five thick abstract vertical barcode-like bars of varied heights, deliberately non-scannable. Add one small restrained orange-red warning triangle in the upper-right corner, with no symbol or text inside it. The broken-glass pictogram must remain the dominant feature and be instantly recognizable at 90 px.
Style/medium: polished 2D casual mobile-game sprite, warm warehouse comedy flat cartoon, bold clean outline, simple geometry, minimal two-step shading, slight top-left cream highlight, consistent with approved C-direction assets.
Composition/framing: exactly one label centered on a square canvas, straight-on front view with no perspective tilt, generous even padding, entire sticker visible, no crop. Label fills about 72% of canvas width and about 48% of canvas height.
Color palette: warm cream label face, dark charcoal-brown border and pictograms, one small orange-red accent. Do not use #00ff00 anywhere in the subject.
Materials/textures: clean slightly thick paper sticker with one subtle inner cream highlight; no realistic paper grain, folds, tears, peel corner, adhesive backing, cast shadow, or surface behind it.
Text: no letters, no words, no numbers, no Chinese, no English.
Constraints: exactly one label; crisp separated silhouette suitable for chroma-key removal; broken wine-glass silhouette must be unambiguous; exactly five non-scannable bars; no cast shadow, no contact shadow, no reflection, no text, no logo, no watermark, no box, no bubble wrap, no hands, no UI panel, no floor.
Avoid: intact wine glass, drinking icon, trophy, goblet, readable barcode, QR code, extra stickers, realistic courier label, address fields, fake writing, brand marks, thin outline, glossy 3D, photorealism, green spill, perspective distortion, curled or damaged label.
```
