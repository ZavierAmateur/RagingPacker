# HUD 投诉图标 v01

## 状态

- 当前状态：`ready_for_import`（开发者于 2026-09-22 确认进入下一步）
- 日期：2026-09-22
- AI 原始输出：`art/ai-raw/icon/hud/icon_complaint_raw_v001.png`
- 透明候选稿：`art/concepts/icon/hud/icon_complaint_v001.png`
- UI 参考：`art/concepts/ui/game/ui_game_a_upgrade_v006.png`
- 同族图标参考：`art/final/icon/hud/icon_coin.png`

## 视觉与用途

- 用于主游戏顶部 HUD 投诉数量显示，不在图片内写数值。
- 红色圆形愤怒顾客脸与右下对话气泡尾巴组合，避免只像普通情绪表情。
- 斜眉、下弯嘴和两枚怒气线在 48～90 px 下表达“投诉/不满”，但不使用恐怖、暴力或哭泣表现。

## 技术检查

- 原生输出：1254 × 1254 RGBA PNG。
- 四角完全透明，Alpha 16 以上的主体、气泡尾巴和怒气线均未触碰画布边缘。
- 已清除低透明边缘散点，并导出为 `art/final/icon/hud/icon_complaint.png`。
- 正式母图为 512 × 512 RGBA；Alpha 包围盒未触边，四角透明，画布边缘无非透明像素。
- 当前尚未导入 FairyGUI/Cocos，也未验证运行时 48/64/90 px 缩放与图集压缩。

## 生成方式

- 模式：内置 ImageGen，多参考图生成。
- 用例：`stylized-concept`。
- ImageGen 直接返回 RGBA 透明图，因此没有执行色键移除脚本。

## 完整提示词

```text
Use case: stylized-concept
Asset type: single mobile-game HUD complaint-status icon for the complaint counter
Input images: Image 1 is the approved gameplay UI; use its top-right red unhappy-face complaint indicator as the functional and palette reference. Image 2 is the approved HUD coin icon and locks the chunky outline weight, icon scale, two-step shading, and playful energy. Image 3 is the approved packer expression sheet and is only an expression-language reference for clear angry eyebrows and frown; do not reproduce the character identity, cap, hair, or clothing.
Primary request: Create exactly one lively COMPLAINT HUD ICON, no variants and no additional objects. It must read as an angry customer complaint rather than health, damage, or a generic sad emoji at 48–90 px.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background for background removal. The background must be one uniform color with no shadow, gradient, texture, reflection, or floor. Do not use #00ff00 in the subject.
Subject: one chunky coral-red circular speech bubble with a small rounded tail at the lower-right. Inside is one simple angry customer face: two thick dark inward-slanting eyebrows, two small oval eyes, a deeply downturned mouth, and two tiny darker-red cheek marks. Add exactly two short dark-red steam/anger ticks just outside the upper-left rim. Tilt the bubble about 5 degrees counterclockwise for energy.
Style/medium: polished 2D casual mobile-game HUD icon, warm warehouse comedy flat cartoon, bold clean dark-brown rounded outline, simple geometry, restrained two-step shading, humorous frustration rather than aggression or fear.
Composition/framing: exactly one centered icon on a square canvas with generous even padding; entire speech-bubble tail and two anger ticks fully visible, no crop. Main bubble fills about 66–72% of the canvas.
Color palette: coral red and warm salmon face, darker red secondary shading, dark chocolate-brown outline and facial features, one small cream top-left highlight. No green in the subject.
Constraints: exactly one speech-bubble face; exactly two eyebrows; exactly two eyes; exactly one frown; exactly two cheek marks; exactly two anger ticks; no cast shadow, contact shadow, reflection, text, letters, numbers, punctuation, logo, watermark, character hair, hat, body, hands, broken object, heart, medical cross, warning triangle, UI panel, or floor; crisp separated silhouette suitable for transparent sprite cleanup.
Avoid: happy smile, crying tears, panic face, skull, monster, rage flames, violent expression, realistic human face, yellow emoji, social-media chat app logo, multiple bubbles, multiple faces, thin outline, glossy 3D, photorealism, fake writing, brand marks, green spill, excessive details, cropped tail.
```
