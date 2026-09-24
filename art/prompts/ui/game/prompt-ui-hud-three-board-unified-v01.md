# 主游戏 HUD 三基准统一状态稿 v01

## 状态

- 当前状态：`developer_visual_approved`
- 确认记录：开发者于 2026-09-22 确认该稿正确统一了投诉、金币目标和完美连单三张锁定基准。
- 日期：2026-09-22
- AI 原始输出：`art/ai-raw/ui/game/ui_hud_three_board_unified_raw_v001.png`
- 中文评审稿：`art/concepts/ui/game/ui_hud_three_board_unified_v001.png`
- 中文补充脚本：`art/tools/add_unified_hud_labels.py`
- 联合锁定基准：`art/reports/ui-hud-three-board-locked-reference-v001.md`

## 四个状态

1. `默认状态`：紧凑顶部条显示目标 `3/6`、金币 `1,240`、投诉 `0/3`，不显示连单。
2. `金币与目标`：操作区显示“金币 +128”，三枚金币飞入，总额更新为 `1,368`，目标更新为 `4/6` 并显示“今日进度 +1”。
3. `投诉警告`：投诉更新为 `2/3` 并显示“再来一次就失败”，角色同步紧张。
4. `完美连单`：常驻 HUD 不变，额外出现紧凑奶油色胶囊“完美连单 ×3”，小火焰贴在数字右侧，`+1` 向胶囊飞入。

## 中文可读性

- 四个状态均补充“箱内 0/4／纸箱／包装／标签／封箱发货”。
- 常驻操作文字使用确定性叠加，避免 AI 伪字；正式运行时全部由 FairyGUI 文本组件渲染。
- 订单区仍需沿用 `ui_game_a_upgrade_v006` 的“订单商品／剩余时间／具体商品短名称与包装要求”规则；本稿重点只评审 HUD 状态与整体同族感。

## 视觉约束

- 后续 HUD、弹字和动效必须同时参考投诉、金币目标和完美连单三张锁定基准。
- 禁止宽大办公仪表盘、脱离游戏场景的纯规范图、大型 U 形火焰和常驻第四连单格。
- 顶部条高度、图标比例、角色大小、气泡轮廓、颜色和粒子密度以本稿及三张锁定基准为准。

## 生成方式

- 主体：内置 ImageGen，多参考图生成；用例 `ui-mockup`。
- 补字：首次 ImageGen 精确补字编辑因网络请求失败且未产生文件；随后使用 Pillow 对四屏容量、分类入口和发货按钮进行确定性叠字，不切换需要 API Key 的 CLI 备用模型。
- 当前是概念评审稿，尚未拆分九宫格、弹字底板、动画粒子或导入 FairyGUI/Cocos。

## 主体提示词摘要

```text
Use Images 1–3 as equally authoritative locked visual references, preserving their actual in-game warehouse scene, compact cream HUD strip, orange-capped packer, dark conveyor, cardboard parcel, numeric hierarchy, speech bubbles and controlled particles. Create exactly four equal portrait gameplay panels: 默认状态, 金币与目标, 投诉警告, 完美连单. Persistent HUD contains only goal, coin and complaint. Combo is a small temporary cream capsule reading 完美连单 ×3 with one compact flame tucked behind or to the right of the number. Never use the rejected wide dashboard or giant U-shaped fire bed.
```
