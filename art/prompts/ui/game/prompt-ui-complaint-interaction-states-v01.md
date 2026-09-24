# 投诉交互状态稿 v01

## 状态

- 当前状态：`developer_visual_approved`
- 确认记录：开发者于 2026-09-22 确认该投诉交互方向。
- 日期：2026-09-22
- AI 原始输出：`art/ai-raw/ui/game/ui_complaint_interaction_states_raw_v001.png`
- 交互评审稿：`art/concepts/ui/game/ui_complaint_interaction_states_v001.png`
- 正式图标：`art/final/icon/hud/icon_complaint.png`
- 同族交互参考：`art/concepts/ui/game/ui_combo_interaction_states_v001.png`

## 玩法规则

- 投诉 HUD 使用明确分数：`1/3`、`2/3`、`3/3`，数字为第一信息层级。
- 第一次投诉显示“收到投诉！”，HUD 数字 punch，并产生一次克制的红色冲击圈。
- 第二次投诉显示“再来一次就失败”，HUD 使用珊瑚红脉冲和轻微抖动提醒风险。
- 第三次投诉显示“投诉过多”，进入关卡失败流程。
- 防错印章或激励视频抵消投诉时显示“投诉已抵消”，HUD 明确表现旧数值淡出、新数值落定。
- 正式 HUD 沿用现有 `icon_complaint.png`；本稿只新增状态、弹字、光圈和动效，不替换正式图标。

## FairyGUI 拆分建议

- `ComplaintHud`：投诉图标、当前值、上限、胶囊底板、危险光圈和提示标记。
- `ComplaintResultPopup`：`received / warning / failed / offset` 四种状态。
- Controller：`normal / warning / failed / recovering`。
- 当前值与 `/3` 使用独立文本组件，禁止把 `1/3`、`2/3`、`3/3` 烘焙进图片。
- 第一次：数值 0.18～0.25 秒 punch，红圈 0.35～0.5 秒扩散淡出。
- 第二次：胶囊轻震 0.2～0.35 秒，随后保持低频脉冲；禁止持续高频闪红。
- 第三次：数值落定后触发失败转场，不能在计数尚未可读时立刻遮盖全屏。
- 抵消：旧数值缩小淡出，新数值回弹落定；金色保护环 0.4～0.7 秒后消失。

## 当前边界

- 本图是交互状态评审稿，不是可直接导入 FairyGUI/Cocos 的正式资源。
- 中文和数值必须由 FGUI 文本实时渲染，不从 AI 图片中切图使用。
- 视觉确认后再制作 HUD 胶囊九宫格、警告光圈、保护环和结果弹字底板。

## 生成方式

- 模式：内置 ImageGen，多参考图生成。
- 用例：`ui-mockup`。

## 完整提示词

```text
Create one polished four-panel landscape interaction board for the complaint counter in a portrait casual mobile packing game. Show “首次投诉” with “收到投诉！” and HUD 1/3; “严重警告” with HUD 2/3 and “再来一次就失败”; “三次失败” with HUD 3/3 and “投诉过多”; and “投诉抵消” with “投诉已抵消” and a clear 2/3 to 1/3 recovery animation. Numeric fractions must be the strongest HUD information. Keep the approved small coral-red angry customer speech-bubble icon, warm warehouse UI, orange-capped packer, cream/orange panels and dark rounded outlines. Do not use flames, health hearts, giant emoji faces, English, fake text, logos or watermark.
```
