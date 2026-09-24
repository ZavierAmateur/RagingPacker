# 主游戏顶部 HUD 信息布局 v01

## 状态

- 当前状态：`rejected_visual_drift`
- 否决原因：该稿将三张已批准的游戏内交互稿误改为脱离场景的宽大信息规范图，常驻文字、模块比例和大型连单火焰均偏离锁定视觉基准。
- 替代基准：`art/reports/ui-hud-three-board-locked-reference-v001.md`
- 日期：2026-09-22
- 评审稿：`art/concepts/ui/game/ui_hud_information_layout_v001.png`
- 生成脚本：`art/tools/generate_hud_information_layout.py`
- 主游戏参考：`art/concepts/ui/game/ui_game_a_upgrade_v006.png`

## 信息结构

- 常驻顶部 HUD 只保留“今日目标／金币／投诉”三组，均使用图标、短中文和准确数值。
- 今日目标显示 `当前成功订单/当日目标` 和一条进度条；星星不是货币。
- 金币显示账户总额；单次奖励先在操作区出现，再飞入并更新总额。
- 投诉显示 `当前值/3`；第二次投诉进入红色警告，第三次进入失败流程。
- 完美连单不占常驻第四格；从 `×2` 开始在顶部下方临时出现，中断后缩小淡出。

## FairyGUI 拆分建议

- `TopHud`：三段九宫格底板或一张可拉伸总底板，内部包含 `DayGoalHud`、`CoinHud`、`ComplaintHud`。
- `ComboHud`：独立浮动组件，包含标题、乘号、数值、底火、柔光和火星层。
- 三组 HUD 文字与数值均使用独立文本组件，禁止烘焙进底板。
- `ComboHud` 使用 `hidden / active / hot / breaking` Controller，不影响常驻 HUD 布局宽度。
- 顶部整体需预留平台胶囊安全区；本稿只确认信息层级，不作为最终屏幕坐标。

## 生成方式

- 方式：Pillow 确定性合成，不使用 AI 生成。
- 图标与特效引用项目正式透明资源；概念中文字使用系统黑体，运行时继续使用项目字体方案。
- 当前尚未拆出九宫格底板、导入 FairyGUI/Cocos 或进行真机验证。
