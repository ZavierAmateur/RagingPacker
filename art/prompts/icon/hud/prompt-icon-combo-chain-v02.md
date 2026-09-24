# HUD 连击链环图标 v02

## 状态

- 当前状态：`superseded_by_numeric_flame_system`（开发者确认改用数字表示次数、火焰表示热度）
- 日期：2026-09-22
- 被替代版本：`art/concepts/icon/hud/icon_combo_v001.png`
- AI 原始输出：`art/ai-raw/icon/hud/icon_combo_chain_raw_v002.png`
- 透明候选稿：`art/concepts/icon/hud/icon_combo_chain_v002.png`
- 同族图标参考：`art/final/icon/hud/icon_coin.png`、`art/final/icon/hud/icon_complaint.png`

## 修改原因与用途

- 火焰无法让开发者第一眼理解为连击，并会与项目中的“暴躁值”产生语义冲突，因此停止采用。
- 新图使用一黄一橙两枚粗链环明确相扣，表达“连续连接/连续正确”。
- HUD 中必须在图标旁使用 FairyGUI 独立文字 `连击 ×3`；图标只辅助识别，不再独自承担完整含义。
- 右上角两枚动态标记与金币、投诉图标保持同族表现。

## 技术检查

- 原生输出：1254 × 1254 RGBA PNG。
- 四角完全透明，Alpha 16 以上的链环、内孔和两枚动态标记均未触碰画布边缘。
- 检出少量低透明边缘散点；视觉批准后在 `cleanup` 阶段清除并导出 512 × 512 正式母图。
- 当前尚未进入 `art/final/`，未导入 FairyGUI/Cocos，也未验证 48/64/90 px 实际显示效果。

## 生成方式

- 模式：内置 ImageGen，多参考图生成。
- 用例：`stylized-concept`。
- ImageGen 直接返回 RGBA 透明图，因此没有执行色键移除脚本。

## 完整提示词

```text
Use case: stylized-concept
Asset type: single mobile-game HUD combo-chain icon for the combo counter
Input images: Images 1 and 2 are the approved HUD coin and complaint icons and lock the chunky rounded outline, icon scale, two-step shading, top-left highlight, and two-tick energy motif. Image 3 is the approved gameplay UI and provides the warm cream/orange HUD context. Do not reuse its ambiguous flame symbol.
Primary request: Create exactly one lively COMBO CHAIN HUD ICON made from two clearly interlocking rounded chain links. It must express “continuous connection/streak” at 48–90 px. The separate FairyGUI text will read “连击 ×3”; do not include any text or multiplier in the image.
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background for background removal. The background must be one uniform color with no shadow, gradient, texture, reflection, or floor. Do not use #00ff00 in the subject.
Subject: two thick rounded rectangular chain links interlocked diagonally from lower-left to upper-right. The rear/lower-left link is vivid orange; the front/upper-right link is golden yellow. Both links have thick dark chocolate-brown outer outlines, clear inner holes, simple two-step shading, and one small cream top-left highlight each. The overlap must be visually explicit: one side of the yellow link passes in front of the orange link while the opposite side passes behind it. Add exactly two small golden-orange spark ticks just outside the upper-right of the linked pair.
Style/medium: polished 2D casual mobile-game HUD icon, warm warehouse comedy flat cartoon, chunky rounded geometry, bold clean outline, high contrast, friendly and energetic.
Composition/framing: exactly one combined chain icon centered on a square canvas with generous even padding; both full links, their holes, overlap, and spark ticks fully visible, no crop. Combined icon fills about 66–72% of the canvas.
Color palette: warm golden yellow, vivid orange, amber shadows, dark chocolate-brown outlines, small cream highlights. No green in the subject.
Constraints: exactly two interlocked links; exactly two clear inner holes; exactly two cream highlights; exactly two spark ticks; no flame, fire, smoke, text, letters, Chinese, English, numbers, multiplication sign, face, hands, rope, necklace, keychain, paper clip, infinity symbol, broken chain, logo, watermark, UI panel, floor, cast shadow, contact shadow, or reflection; crisp separated silhouette suitable for transparent sprite cleanup.
Avoid: ambiguous overlapping rings, separate unconnected links, three or more links, realistic metal, silver chain, jewelry, thin links, chain weapon, broken link, glossy 3D, photorealism, fake writing, brand marks, green spill, excessive gradients, cropped sparks.
```
