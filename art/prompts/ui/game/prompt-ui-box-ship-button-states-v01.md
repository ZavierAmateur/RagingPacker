# 主游戏纸箱容量与封箱发货按钮四状态稿 v01

## 状态

- 当前状态：`visual_approved_behavior_revision_required`
- 确认记录：开发者于 2026-09-22 确认该稿的纸箱容量、装箱层级和按钮按下表现；随后代码核对确认现有玩法允许漏装或错误配置后提交判定，因此 v001 的“未完成即禁用按钮”仅作视觉状态参考，不再作为正式交互规则。
- 日期：2026-09-22
- AI 原始输出：`art/ai-raw/ui/game/ui_box_ship_button_states_raw_v001.png`
- 交互评审稿：`art/concepts/ui/game/ui_box_ship_button_states_v001.png`
- 布局母版：`art/concepts/ui/game/ui_selector_states_locked_base_v002.png`
- 四商品订单参考：`art/concepts/ui/game/ui_order_four_items_locked_base_v003.png`

## 四个状态

1. `空箱待装`：箱内 0/4，四个容量圆点为空；容量表现有效，按钮禁用语义已被代码核对推翻。
2. `装入中`：箱内 2/4，前两个容量圆点填充；容量表现有效，按钮禁用语义已被代码核对推翻。
3. `可以发货`：箱内 4/4，四个容量圆点填充；商品与包装核对完成，按钮恢复高对比橙色。
4. `按下封箱`：容量保持 4/4，箱盖开始内折；按钮颜色加深并向下位移，文字显示“封箱中…”。

## 交互与显示规则

- `箱内 当前/上限` 是主要信息，容量圆点只作辅助；两者必须同步变化。
- 商品节点必须位于纸箱内部/后层与纸箱前层之间，禁止浮在纸箱前面或覆盖容量信息。
- 非提交动画期间主按钮保持可点击；玩家可以在漏装、错装、包装或标签错误时主动封箱，由 `evaluatePackage` 在提交后给出明确失败原因并增加投诉。
- `disabled/loading` 仅用于封箱动画、发货请求或防止重复提交，不用于提前阻止错误选择。
- `pressed` 状态保持外部尺寸不变，只允许按钮面下移约 3～5 px、橙色加深并减少底部阴影。
- 按下后先播放箱盖合拢，再进入胶带/标签/发货反馈；本稿只表现合拢起始帧，不提前显示完成结果。
- 容量计数组继续固定在纸箱正面安全区，不能与开口边缘、商品、下方选择器重叠。

## FairyGUI 拆分建议

- `BoxWorkArea` Controller：`empty / filling / ready / sealing / completed`。
- `ShipButton` Controller：`disabled / normal / pressed / loading`。
- 四个容量圆点使用独立状态节点，不把 `0/4` 和圆点烘焙进同一图片。
- 箱内商品使用固定四槽或约束布局；商品数量不足时隐藏空槽内容，不动态改变纸箱外形。
- 禁用原因、容量数值和按钮文字均由 FairyGUI 文本组件渲染。

## 完整提示词摘要

```text
Directly derive from the approved full gameplay screen. Create four states: 空箱待装, 装入中, 可以发货, 按下封箱. Preserve every main UI section. Progress capacity from 0/4 to 2/4 to 4/4, place product sprites inside the box layers, show disabled/normal/pressed button states without changing external dimensions, and begin folding the box flaps only in the pressed state.
```
