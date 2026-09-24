# C 方向气泡膜卷 v01

## 状态

- 当前状态：`ready_for_import`（开发者于 2026-09-22 确认进入下一步）
- 日期：2026-09-22
- AI 原始输出：`art/ai-raw/packaging/wrap/wrap_bubble_roll_raw_v001.png`
- 透明候选稿：`art/concepts/packaging/wrap/wrap_bubble_roll_v001.png`
- 方向参考：`art/concepts/packaging/packaging_core_direction_board_v001.png` 的 C 方向
- 同族参考：`art/final/packaging/box/box_small_closed.png`

## 视觉与用途

- 用于主游戏包装选择器和气泡膜包装反馈。
- 右侧保留清楚的卷芯，左前方展开一小段片材，90 px 下仍可识别为气泡膜卷。
- 使用有限数量的大气泡，不制作密集微小纹理。
- 为避免半透明材质在不同底色和压缩模式下发灰，本资源使用不透明卡通蓝材质；透明通道只用于外轮廓。

## 技术检查

- 原生输出：1254 × 1254 RGBA PNG。
- 四角完全透明，Alpha 16 以上的主体未触碰画布边缘。
- 已清除低透明边缘散点，并导出为 `art/final/packaging/wrap/wrap_bubble_roll.png`。
- 正式母图为 1024 × 1024 RGBA；Alpha 包围盒未触边，四角透明，画布边缘无非透明像素。
- 当前尚未导入 FairyGUI/Cocos，也未验证运行时缩放、Auto Trim 和图集压缩。

## 生成方式

- 模式：内置 ImageGen，多参考图生成。
- 用例：`stylized-concept`。
- ImageGen 直接返回 RGBA 透明图，因此没有执行色键移除脚本。

## 完整提示词

```text
Use case: stylized-concept
Asset type: single mobile-game sprite candidate for the bubble-wrap selector and packing gameplay
Input images: Image 1 is the approved packaging direction board; use ONLY direction C's bubble-wrap roll as the locked shape reference. Preserve its rounded chunky proportions, large readable bubbles, visible hollow core, loose sheet curling forward-left, and friendly silhouette. Image 2 is the locked Item Style Master V1 and defines clean sprite readability. Image 3 is the approved C-direction small box and defines the exact outline weight, warm casual-game finish, dimensional simplicity, and polish level that this asset must match.
Primary request: Create exactly one BUBBLE-WRAP ROLL sprite, no variants and no additional objects.
Scene/backdrop: perfectly flat solid #ff00ff chroma-key background for background removal. The background must be one uniform color with no shadows, gradients, texture, reflections, floor plane, or lighting variation.
Subject: a compact roll of protective bubble wrap in three-quarter front view, cylinder core on the right, one short loose sheet unrolling toward the front-left. Use a limited number of large circular bubbles that remain recognizable at 90 px. The roll must look soft and flexible but structurally clear.
Material rule: render the bubble wrap as an OPAQUE stylized sky-blue game material with pale blue and white highlights; do not attempt physically transparent or see-through plastic. Transparency is only outside the silhouette.
Style/medium: polished 2D casual mobile-game sprite, warm warehouse comedy flat cartoon, bold clean deep-blue outline compatible in weight with the approved brown box outline, simple geometry, restrained two-step shading, top-left highlight.
Composition/framing: exactly one centered object on a square canvas, generous even padding, entire roll and loose sheet visible, no crop. Object fills about 68–74% of the canvas. Roll axis runs diagonally left-front to right-back, with the circular core clearly visible on the right.
Color palette: sky blue, light cyan, pale blue-white highlights, deeper blue outline and core. Do not use #ff00ff anywhere in the subject.
Materials/textures: 16–24 large rounded bubble cells total, simplified and evenly spaced; core uses two or three concentric blue rings; no dense micro-bubbles.
Constraints: exactly one roll; crisp separated outer silhouette suitable for chroma-key removal; no cast shadow, no contact shadow, no reflection, no text, no logo, no watermark, no box, no tape, no label, no hands, no UI, no floor; no holes between individual bubble cells that would fragment the alpha silhouette.
Avoid: multiple rolls, flat sheet only, plastic food wrap, toilet paper, fabric, realistic transparent film, glassy refraction, dense tiny bubbles, thin outline, glossy 3D, photorealism, green or magenta spill, fake writing, brand marks, cropped sheet, torn material.
```
