# 完美连单交互状态稿 v01

## 状态

- 当前状态：`developer_visual_approved`
- 确认记录：开发者于 2026-09-22 确认数字为主体、火焰为动态强化的完美连单交互方向。
- 日期：2026-09-22
- AI 原始输出：`art/ai-raw/ui/game/ui_combo_interaction_states_raw_v001.png`
- 交互评审稿：`art/concepts/ui/game/ui_combo_interaction_states_v001.png`
- 替代旧稿：`art/concepts/icon/hud/icon_combo_flame_states_v003.png`

## 已确认方向

- 系统名称使用“完美连单”，避免战斗语义的“连击”。
- 数字 `×N` 永远是第一信息层级，火焰只作为数字周围的动态强化效果。
- 首次完美只显示瞬时反馈“完美！”，从第二次连续完美开始显示常驻连单数。
- 每次完美完成后，操作区显示 `+1`，并向 HUD 连单胶囊飞入。
- 连单越高，增加的是火焰亮度、覆盖范围、光圈和少量火星，不再切换四枚独立火焰图标。
- 任意非完美完成、错装或超时会中断连单；显示“连单中断”，火焰熄灭，数值与胶囊淡出，不常驻 `×0`。

## FairyGUI 拆分建议

- `ComboHud`：常驻胶囊，由 `title`、`times`、`value`、`flame`、`glow`、`sparks` 组成。
- `ComboResultPopup`：操作区瞬时反馈，状态包括 `perfect`、`increment`、`broken`。
- Controller：`hidden / active / hot / breaking`。
- `value` 必须使用独立文本组件，不允许把 `×3`、`×8` 烘焙进位图。
- 火焰、光圈和火星使用独立图层；高连单只改变缩放、亮度、透明度和火星数量。
- 动效建议：结果弹字 0.45～0.7 秒；`+1` 飞入 0.35～0.5 秒；数值 punch 0.15～0.25 秒；中断淡出 0.35～0.6 秒。

## 当前边界

- 本图是交互状态评审稿，不是可直接导入 FairyGUI/Cocos 的正式资源。
- 视觉确认后，需单独制作 HUD 胶囊九宫格底板、火焰、光圈、火星及三类结果弹字资源，并在 FGUI 中组合。
- 中文与数值应由 Source Han Sans SC 或项目确认字体实时渲染，不从 AI 图片中切图使用。

## 生成方式

- 模式：内置 ImageGen，多参考图生成。
- 用例：`ui-mockup`。

## 完整提示词

```text
Create one polished landscape review board for a portrait casual mobile packing game. Show exactly four equal panels: “首次完美” with a “完美！” popup over a shipped box; “连单累积” with a compact top-right HUD pill “完美连单 ×3” and a “+1” flying toward it; “高连单” with “完美连单 ×8”, a brighter flame glow and only a few controlled sparks; and “连单中断” with a fading badge and extinguishing embers. The exact numeric streak must always be the primary information; flame is only an accent behind or around the number. Match the warm orange warehouse UI, rounded cream panels, dark chocolate outlines and polished 2D casual-game style of the existing gameplay concept. Do not create a four-level flame icon chart, standalone giant flame, chain-link icon, English, fake text, extra counters, logos or watermark.
```
