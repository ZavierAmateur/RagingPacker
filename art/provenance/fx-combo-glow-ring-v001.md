# 完美连单 HUD 柔光环 v001 来源记录

- 资产 ID：`fx_combo_glow_ring`
- 状态：`rejected_visual_drift`，禁止导入
- 生成与批准日期：2026-09-22
- 确定性候选：`art/concepts/fx/hud/fx_combo_glow_ring_v001.png`
- 正式资源：`art/final/fx/hud/fx_combo_glow_ring.png`
- 组合预览：`art/previews/fx/hud/fx_combo_full_stack_preview_v001.png`
- 规格文档：`art/prompts/fx/hud/spec-fx-combo-glow-ring-v01.md`
- 生成脚本：`art/tools/generate_combo_glow.py`
- 生成方式：Pillow 确定性图形生成，不使用 AI 模型
- SHA-256：`b498c318797d0599870ca4e98bca62b7f5f570b9d334ffdb4acf0e2606effaac`

正式资源由项目内脚本生成并清理极低 Alpha 模糊边缘。已验证 1024 × 512 RGBA、透明四角、画布四边无非透明像素，并完成与底火、火星和 `×8` 的完整叠加预览；尚未导入 FairyGUI/Cocos，因此不填写 `ui://`，也不宣称运行时验证通过。
