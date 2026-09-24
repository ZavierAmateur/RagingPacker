# C 方向易碎标签 v02

## 状态

- 当前状态：`ready_for_import`（开发者于 2026-09-22 确认进入下一步）
- 日期：2026-09-22
- 被替代版本：`art/concepts/packaging/label/label_fragile_v001.png`
- AI 原始输出：`art/ai-raw/packaging/label/label_fragile_raw_v002.png`
- 透明候选稿：`art/concepts/packaging/label/label_fragile_v002.png`
- 修改原因：v001 信息明确但过于对称、规整和静态，缺少项目需要的仓库喜剧感。

## 本轮修订

- 整张贴纸轻微顺时针倾斜，打破过度端正的物流标识感。
- 破裂酒杯改为歪斜的“刚刚碎裂”瞬间，并加入两块飞散碎片。
- 三条橙红爆裂线强化撞击感，右上角改为带叹号的圆润爆炸形警告角标。
- 五条抽象条码缩小并移到右下方，成为次要信息。
- 右下角增加小幅翘边，令贴纸更像真实贴上去的游戏道具。
- 仍不写死“易碎”中文；中文由 FairyGUI 独立文字组件显示。

## 技术检查

- 原生输出：1254 × 1254 RGBA PNG。
- 四角完全透明；Alpha 16 以上的完整主体未触边，倾斜、碎片、角标和翘边均未裁切。
- 已清除低透明边缘散点，并导出为 `art/final/packaging/label/label_fragile.png`。
- 正式母图为 1024 × 1024 RGBA；Alpha 包围盒未触边，四角透明，画布边缘无非透明像素。
- 当前尚未导入 FairyGUI/Cocos，也未验证运行时缩放、Auto Trim 和图集压缩。

## 生成方式

- 模式：内置 ImageGen，多参考图定向修改。
- 用例：`precise-object-edit`。
- ImageGen 直接返回 RGBA 透明图，因此没有执行色键移除脚本。

## 完整提示词

```text
Use case: precise-object-edit
Asset type: lively mobile-game sprite candidate for the fragile shipping-label selector and package sticker
Input images: Image 1 is the EDIT TARGET. Image 2 is the approved C packaging direction. Images 3 and 4 are approved same-family box and bubble-wrap assets that lock outline weight, rounded style, shading, and polish.
Primary request: Redesign Image 1 to feel much more lively, playful, and comedic while staying immediately readable as a FRAGILE shipping label. The current version is too symmetrical, formal, and static.
Change only these aspects: rotate the whole rounded sticker about 5–7 degrees clockwise inside the square canvas; make the broken wine glass lean dynamically as if it has just cracked; enlarge the zigzag crack; add exactly two small dark glass-shard shapes flying just above the cracked bowl; add three short orange-red comic impact rays behind the crack; reduce the barcode area to five short rounded dark bars in the lower-right so it is clearly secondary; replace the rigid warning triangle with one small orange-red rounded starburst badge in the upper-right containing a simple cream exclamation mark. Give one corner of the sticker a tiny playful upward curl, but keep the outer silhouette simple.
Preserve: one cream horizontal rounded-rectangle sticker, thick dark-brown outer border, dominant dark broken-wine-glass pictogram, warm cream/orange/brown palette, bold casual-game rendering, clean large shapes, and strong 90 px recognition. Keep the same C-family identity as Images 2–4.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background for background removal, uniform with no shadow, gradient, texture, reflection, or floor. Do not use #00ff00 in the subject.
Style/medium: polished 2D casual mobile-game sprite, warm warehouse comedy flat cartoon, chunky rounded proportions, bold clean outline, minimal two-step shading, expressive comic timing without sticker clutter.
Composition/framing: exactly one sticker centered on a square canvas with generous padding; entire rotated sticker, shards, rays, badge, and curled corner must remain fully visible and uncropped. The broken glass must remain much larger than all secondary symbols.
Text: no words, no letters, no numbers, no Chinese, no English. The exclamation mark is the only allowed punctuation symbol.
Constraints: exactly one label; exactly one broken wine glass; exactly two flying shards; exactly three orange-red impact rays; exactly five non-scannable rounded bars; exactly one small starburst badge; crisp separated silhouette; no cast shadow, contact shadow, reflection, watermark, logo, box, bubble wrap, hands, UI panel, or floor.
Avoid: formal corporate logistics look, perfect symmetry, intact wine glass, realistic barcode, QR code, address fields, dense decoration, multiple stickers, sharp aggressive hazard design, thin outline, glossy 3D, photorealism, perspective distortion, fake writing, brand marks, green spill, cropped edges.
```
