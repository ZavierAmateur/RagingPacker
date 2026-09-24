# HUD 连击数字与四档火焰状态 v03

## 状态

- 当前状态：`rejected_by_interaction_system`
- 否决原因：火焰被拆成四个等权档位后，玩家需要通过造型猜测等级；正式方向改为“准确数字为主体，火焰仅作为数字周围的动态强化反馈”。
- 替代方案：`art/concepts/ui/game/ui_combo_interaction_states_v001.png`
- 日期：2026-09-22
- AI 原始输出：`art/ai-raw/icon/hud/icon_combo_flame_states_raw_v003.png`
- 状态评审稿：`art/concepts/icon/hud/icon_combo_flame_states_v003.png`
- 火焰造型参考：`art/concepts/icon/hud/icon_combo_v001.png`
- 被替代链环：`art/concepts/icon/hud/icon_combo_chain_v002.png`

## 最终信息规则

- 此状态表示“连续完美完成的订单数”，不是暴躁值、危险值或普通完成订单数。
- HUD 始终由 FairyGUI 文字显示准确数值：`连击 ×N`；数字是主要信息，火焰只表现连击热度。
- 每完美完成一单，`N + 1`；非完美完成、错装或超时会中断连击，数值归零且火焰隐藏。
- `N = 0`：不显示火焰，也不常驻 `连击 ×0`，避免无效信息占用 HUD。
- `N = 1～2`：状态 1，小火苗，无外部火星。
- `N = 3～4`：状态 2，小火，一枚火星。
- `N = 5～9`：状态 3，中等旺火，两枚火星。
- `N ≥ 10`：状态 4，强火、四枚火星和克制的暖色光圈。

## FairyGUI 实现约束

- 文字 `连击`、乘号和数值必须使用独立文本组件，禁止烘焙进火焰图片。
- 建议 Controller 状态：`hidden/small/medium/hot/blazing`。
- 状态切换使用 0.15～0.3 秒缩放、亮度和轻微上弹 Tween；不要常驻播放高帧率序列帧。
- 火焰不得覆盖金币、投诉、平台胶囊安全区或其他 HUD 数值。
- 四档正式资源必须共享相同画布、底部基线和锚点，状态切换时不能跳位。

## 当前边界

- 本稿只确认四档视觉递进，不是透明正式资源，禁止直接导入 FairyGUI/Cocos。
- 评审稿为 1942 × 809 RGB PNG。
- 视觉批准后需分别生成/拆分四张 512 × 512 RGBA 正式母图，并完成 48/64/90 px 对照 QA。

## 生成方式

- 模式：内置 ImageGen，多参考图生成。
- 用例：`stylized-concept`。

## 完整提示词

```text
Use case: stylized-concept
Asset type: four-stage mobile-game HUD combo-flame progression reference board
Input images: Image 1 is the previously generated flame and serves only as the visual reference for the strongest flame family: warm red/orange/yellow layers, dark chocolate-brown outline, rounded tips, top-left cream highlight. Images 2 and 3 are approved HUD icons and lock outline weight, two-step shading, small-size readability, and playful energy.
Primary request: Create one clean landscape review board showing exactly four progressive flame states for a consecutive-perfect-order combo system. The exact combo number will be separate FairyGUI text; these flames only show increasing heat and excitement.
Scene/backdrop: warm off-white neutral review-board background with exactly four equal rounded cards arranged left to right. No gameplay scene and no transparency checkerboard.
State 1: a very small single rounded ember flame, one red-orange outer teardrop and one tiny yellow center, no external sparks.
State 2: a small flame with two rounded outer tips, orange middle and yellow inner flame, one tiny spark.
State 3: a medium lively flame with three rounded outer tips, red-orange outer flame, bright orange middle, yellow inner flame, exactly two sparks.
State 4: a large strong but friendly flame with four rounded outer tips, deeper red outer rim, vivid orange middle, bright yellow inner core, exactly four small sparks and one subtle warm glow ring directly behind the flame. No smoke.
Progression rule: all four states are clearly the same icon family and share the same baseline, central axis, dark outline thickness, color palette, highlight direction, and square safe area. Each state must visibly grow in height, width, number of tips, color intensity, and sparks from left to right. Keep stage 4 compatible with the reference but not identical.
Style/medium: polished 2D casual mobile-game HUD sprites, warm warehouse comedy flat cartoon, bold clean rounded dark-brown outlines, simple geometry, restrained two-step shading, high contrast at 48–90 px.
Composition/framing: four equal columns/cards; one flame centered in each card; all flames fully visible and uncropped with generous padding; left-to-right progression is unmistakable. Label the cards only with the simple digits “1”, “2”, “3”, and “4” above them. No other text.
Color palette: coral red, vivid orange, golden yellow, cream highlights, dark chocolate-brown outline. Warm off-white review background.
Constraints: exactly four cards and exactly four flame states; no combo numbers inside the flame art, no multiplication signs, no Chinese, no words, no chain links, faces, hands, torches, candles, explosions, extra icons, logos, brands, watermark, smoke, realistic fire, or cropped sparks.
Avoid: four unrelated flame styles, identical-size flames, chaotic inferno, thin wispy flames, scary dangerous mood, photorealism, glossy 3D, blue/green/purple fire, dense particles, fake writing, clutter.
```
