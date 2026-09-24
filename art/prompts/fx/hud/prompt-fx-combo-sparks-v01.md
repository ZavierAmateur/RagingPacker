# 完美连单 HUD 火星层 v01

## 状态

- 当前状态：`rejected_visual_drift`
- 否决原因：该火星层依赖已否决的大型 U 形火焰结构；禁止导入。
- 日期：2026-09-22
- AI 原始输出：`art/ai-raw/fx/hud/fx_combo_sparks_raw_v001.png`
- 透明候选稿：`art/concepts/fx/hud/fx_combo_sparks_v001.png`
- 底层资源：`art/final/fx/hud/fx_combo_flame_base.png`
- 交互参考：`art/concepts/ui/game/ui_combo_interaction_states_v001.png`

## 视觉与用途

- 该资源是高连单状态的独立火星覆盖层，不包含底火、光圈、文字或胶囊。
- 左右各三枚粒子，中央完全留空，保证 `×N` 数字不受遮挡。
- 普通连单不显示；较高连单可低透明度叠加，最高状态可通过一次缩放和淡出强化。
- 固定粒子数量，禁止随连单数字无限增加，避免 HUD 越来越乱。

## 技术检查

- 原生输出：1254 × 1254 RGBA PNG。
- 正式资源：`art/final/fx/hud/fx_combo_sparks.png`，1024 × 512 RGBA PNG，与底火共享画布尺寸、中心和锚点。
- 清理 Alpha 低于 16 的离散杂点后按主体裁切并保留安全边；Alpha 包围盒为 `(32, 56)–(992, 455)`，四角与画布四边透明。
- 已完成“底火＋火星＋×8”叠加预览，中央数值未被遮挡。
- 当前尚未完成 FairyGUI/Cocos 运行检查。

## 生成方式

- 模式：内置 ImageGen，多参考图生成。
- 用例：`stylized-concept`。
- ImageGen 直接返回 RGBA 透明图，因此没有执行色键移除脚本。

## 完整提示词

```text
Create exactly one reusable wide spark overlay containing exactly six separated friendly celebration particles for high combo states. Arrange two four-point golden sparkles, two rounded coral-orange impact rays and two small golden teardrop embers around the left and right sides of a wide central empty area. Keep the central 55% width and 45% height transparent so “×8” remains unobstructed. Match the approved combo flame, rounded casual-game HUD style, dark chocolate outlines and warm gold/orange/red palette. Do not include the flame base, glow ring, smoke, explosion, text, numbers, panel, coin, five-point star icon, logo or watermark.
```
