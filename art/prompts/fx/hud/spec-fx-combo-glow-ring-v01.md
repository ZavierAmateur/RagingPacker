# 完美连单 HUD 柔光环 v01

## 状态

- 当前状态：`rejected_visual_drift`
- 否决原因：该柔光层依赖已否决的大型 U 形火焰结构；禁止导入。
- 日期：2026-09-22
- 透明候选：`art/concepts/fx/hud/fx_combo_glow_ring_v001.png`
- 正式资源：`art/final/fx/hud/fx_combo_glow_ring.png`
- 组合预览：`art/previews/fx/hud/fx_combo_full_stack_preview_v001.png`
- 生成脚本：`art/tools/generate_combo_glow.py`
- 底火：`art/final/fx/hud/fx_combo_flame_base.png`
- 火星：`art/final/fx/hud/fx_combo_sparks.png`

## 视觉与用途

- 柔光环放在底火之后，仅在高连单或数值提升瞬间显示。
- 使用暖金色空心椭圆光晕，中央低透明，避免降低 `×N` 的文字对比度。
- 推荐通过透明度和 0.94～1.08 倍缩放制作一次呼吸脉冲，不常驻快速闪烁。
- 底火、柔光、火星、中文和数值保持独立层级，允许 FairyGUI 分别控制。

## 生成与技术约束

- 方式：项目内 Pillow 确定性脚本，不使用 AI 生成。
- 输出画布：1024 × 512 RGBA，与底火和火星共享画布、中心和锚点。
- 颜色：金色 `RGB(255, 185, 45)`，最大 Alpha 受脚本约束，边缘使用高斯模糊自然淡出。
- 正式资源为 1024 × 512 RGBA；清理 Alpha 低于 4 的模糊边缘后，四角与画布四边透明，最大 Alpha 为 108，避免常驻光效过亮。
- 已完成与底火、火星和 `×8` 的完整叠加预览并登记资源清单。
- 当前尚未导入 FairyGUI/Cocos。

## 建议状态

- `active`：柔光隐藏或 Alpha 不高于 0.2。
- `hot`：柔光 Alpha 0.35～0.5，数值提升时播放一次 0.3～0.5 秒脉冲。
- `breaking`：0.2～0.35 秒缩小并淡出，不残留常亮光圈。
