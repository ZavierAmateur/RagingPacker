# C 方向小号封闭纸箱 v01

## 状态

- 当前状态：`ready_for_import`（开发者于 2026-09-22 确认进入下一步）
- 日期：2026-09-22
- AI 原始输出：`art/ai-raw/packaging/box/box_small_closed_raw_v001.png`
- 透明候选稿：`art/concepts/packaging/box/box_small_closed_v001.png`
- 方向参考：`art/concepts/packaging/packaging_core_direction_board_v001.png` 的 C 方向

## 视觉与用途

- 用于主游戏纸箱选择器和装箱区域的小号封闭纸箱。
- 延续 C 方向的圆润矩形比例、粗深棕轮廓和暖色牛皮纸配色。
- 保留顶面、正面和右侧面的清晰分面，缩小时仍能识别为封闭纸箱。
- 胶带居中从顶面延伸至正面，禁止文字、条码、品牌与额外标签。

## 技术检查

- 原生输出：1254 × 1254 RGBA PNG。
- 四角完全透明，主体高不透明区域未接触画布边缘。
- 已清除低于 Alpha 16 的边缘散点，并导出为 `art/final/packaging/box/box_small_closed.png`。
- 正式母图为 1024 × 1024 RGBA；Alpha 包围盒未触边，四角透明，画布边缘无非透明像素。
- 当前尚未导入 FairyGUI/Cocos，也未验证运行时缩放、Auto Trim 和图集压缩。

## 生成方式

- 模式：内置 ImageGen，多参考图生成。
- 用例：`stylized-concept`。
- ImageGen 直接返回 RGBA 透明图，因此没有执行色键移除脚本。

## 完整提示词

```text
Use case: stylized-concept
Asset type: single production-ready mobile-game sprite candidate for the small cardboard box selector and in-game packing area
Input images: Image 1 is the approved packaging direction board; use ONLY direction C's small cardboard box as the locked shape reference. Preserve its rounded chunky proportions, kraft palette, tape placement, three-quarter front view, and friendly readable silhouette. Image 2 is the locked Item Style Master V1; match its outline weight, clean flat-cartoon rendering, restrained shading, and top-left lighting.
Primary request: Create exactly one closed SMALL CARDBOARD BOX sprite, no variants and no additional objects.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background for background removal. The background must be one uniform color with no shadows, gradients, texture, reflections, floor plane, or lighting variation.
Subject: compact closed corrugated kraft box with softly rounded corners, slightly wider than tall, one centered brown packing-tape strip running from back to front over the top and down the upper front face, clear top/front/right planes, and one restrained top-left highlight. It should feel cute and solid, not inflated.
Style/medium: polished 2D casual mobile-game sprite, warm warehouse comedy flat cartoon, bold clean dark-brown outline, simple geometry, two-step flat shading, consistent with the approved item sprites.
Composition/framing: one object centered on a square canvas, three-quarter front view, generous even padding, whole object visible, no crop. Object fills about 68–74% of the canvas.
Color palette: warm kraft tan, medium caramel tape, darker brown right-side shade, dark charcoal-brown outline. Do not use #00ff00 anywhere in the subject.
Materials/textures: simplified cardboard with at most two tiny subtle scuff/fiber marks; no printed text or symbols; tape has a clean slightly uneven cut edge only at its front endpoint.
Constraints: exactly one box; crisp separated silhouette suitable for chroma-key removal; no cast shadow, no contact shadow, no reflection, no text, no logo, no watermark, no barcode, no shipping label, no handle hole, no open flaps, no contents, no dents, no hands, no UI, no floor.
Avoid: multiple boxes, open box, realistic photo, glossy 3D, isometric scene, thin outline, excessive texture, orange-red tape, green spill, fake writing, brand marks, damaged carton, facial features, arms, stickers.
```
