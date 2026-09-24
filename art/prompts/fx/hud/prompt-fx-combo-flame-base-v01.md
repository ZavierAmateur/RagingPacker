# 完美连单 HUD 火焰底层 v01

## 状态

- 当前状态：`rejected_visual_drift`
- 否决原因：大型 U 形火焰与已批准交互稿中的紧凑奶油色连单胶囊不一致；禁止导入。
- 日期：2026-09-22
- AI 原始输出：`art/ai-raw/fx/hud/fx_combo_flame_base_raw_v001.png`
- 透明候选稿：`art/concepts/fx/hud/fx_combo_flame_base_v001.png`
- 交互参考：`art/concepts/ui/game/ui_combo_interaction_states_v001.png`
- 造型参考：`art/concepts/icon/hud/icon_combo_v001.png`

## 视觉与用途

- 该资源放在 `完美连单 ×N` 数字背后，只负责强化连单热度，不作为独立图标传达次数。
- 横向 U 形火焰从底部和两侧托住数字，中央上方留空，保证 `×N` 始终清晰。
- 正式实现可通过缩放、亮度和透明度表现普通/高连单；外部火星与光圈另做独立图层。
- 不使用旧方案中的四枚独立火焰图标，也不通过火焰造型要求玩家猜数值。

## 技术检查

- 原生输出：1254 × 1254 RGBA PNG。
- 正式资源：`art/final/fx/hud/fx_combo_flame_base.png`，1024 × 512 RGBA PNG。
- 清理 Alpha 低于 16 的离散杂点后按主体裁切并留出 32 px 安全边；Alpha 包围盒为 `(32, 32)–(992, 480)`，四角与画布四边透明。
- 已完成 `×8` 居中叠字预览，中央留空足以保证数值清晰；实际字体、数值和层级仍由 FairyGUI 组合。
- 当前尚未导入 FairyGUI/Cocos。

## 生成方式

- 模式：内置 ImageGen，多参考图生成。
- 用例：`stylized-concept`。
- ImageGen 直接返回 RGBA 透明图，因此没有执行色键移除脚本。

## 完整提示词

```text
Create exactly one reusable wide low U-shaped flame aura for placement behind the numeric “完美连单 ×N” text. It must frame a large number without covering it and must not look like a standalone flame icon. Use a shallow orange-red crescent flame bed with two taller rounded side tips and three shorter tips along the lower back edge. Keep the central upper area open and visually quiet for dynamic text. Match the approved warm red-orange-yellow flame family, dark chocolate outline, restrained two-step shading and friendly casual-game HUD style. No external sparks, text, numbers, multiplication sign, UI pill, panel, face, chain, smoke, explosion, logo or watermark.
```
