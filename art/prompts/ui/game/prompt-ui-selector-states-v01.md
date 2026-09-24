# 主游戏纸箱／包装／标签选择器四状态稿 v01

## 状态

- 当前状态：`developer_visual_approved`
- 确认记录：开发者于 2026-09-22 确认 v002；纸箱容量计数组已下移至纸箱正面安全区，其余选择器结构保持通过。
- 日期：2026-09-22
- 当前 AI 原始输出：`art/ai-raw/ui/game/ui_selector_states_locked_base_raw_v002.png`
- 当前交互评审稿：`art/concepts/ui/game/ui_selector_states_locked_base_v002.png`
- v001 问题记录：`箱内 0/4` 与四个容量圆点离纸箱开口过近，视觉上被上沿遮挡；v002 已将完整计数组下移至纸箱正面并增加上下留白。
- 视觉母版：`art/concepts/ui/game/ui_hud_three_board_unified_v001.png`
- 四商品订单参考：`art/concepts/ui/game/ui_order_four_items_locked_base_v003.png`

## 四个状态

1. `默认收起`：底部同时显示纸箱、包装、标签三个入口；每个入口必须显示类别名、当前值、图标和展开箭头。
2. `选择纸箱`：纸箱页签激活，显示小号箱、中号箱、大号箱；小号箱为当前选中。
3. `选择包装`：包装页签激活，显示气泡膜、冰袋、防水袋；气泡膜为当前选中。
4. `选择标签`：标签页签激活，显示易碎、冷藏、防水；易碎为当前选中。

## 交互与显示规则

- 三个类别始终可发现，但同一时刻只能展开一个类别。
- 展开选择器只占用原底部控制区域，不覆盖订单要求、传送带、纸箱、箱内计数和“封箱发货”按钮。
- 激活页签使用橙色；当前选项使用橙色描边和勾选标记；未选项使用奶油色。
- 所有选项同时显示图标和中文名称，禁止仅靠图标或颜色表达。
- 玩家选择时必须继续看见当前订单的“小号箱／气泡膜／易碎”要求，以便即时对照。
- 四商品订单仍使用原订单区域内的 2×2，商品名称和数量角标不得因选择器展开而隐藏。
- “封箱发货”始终固定在屏幕底部，选择器展开不得遮挡、挤压或替代主按钮。
- `箱内 0/4`、纸箱图标和四个容量圆点必须作为完整一组放在纸箱正面安全区内，上下均保留间距，不得接触开口边缘、箱体底边或下方选择器。

## FairyGUI 拆分建议

- `PackingSelectors` Controller：`collapsed / box / wrap / label`。
- `SelectorTabs`：固定三个页签 `纸箱 / 包装 / 标签`，仅在展开状态显示紧凑页签行。
- `SelectorOption`：`normal / selected / locked`，包含图标、名称、选中描边和勾选标记。
- 每个类别首屏显示三个选项；更多选项后续使用横向分页或滑动，不缩小现有点击区域。
- 选择后立即更新收起态当前值；再次点击激活页签、点击空白处或完成选择均可收起。

## 完整提示词摘要

```text
Directly derive from the four locked gameplay interfaces. Create four full-screen states: 默认收起, 选择纸箱, 选择包装, 选择标签. Preserve HUD, order queue, character, four-product grid, requirement row, conveyor, box, capacity and fixed 封箱发货 button. Expanded selectors occupy only the existing bottom-control area and show three labeled options with one selected state.
```
