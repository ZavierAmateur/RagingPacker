# 订单商品 1～4 种密度对照稿 v01

## 状态

- 当前状态：`developer_visual_approved`
- 确认记录：开发者于 2026-09-22 确认 v003；该版本直接从四张已确认界面派生，四商品使用原订单商品区内的 2×2 网格。
- 修正记录：开发者于 2026-09-22 再次强调必须直接以四张已确认界面为基准，而不是参考其风格重新设计。v001、v002 均改记为 `rejected_visual_drift`，不得作为视觉或构图母版。
- 保留结论：1～4 种商品的排布逻辑继续有效，其中四种商品采用固定 2×2 网格。
- 日期：2026-09-22
- 当前 AI 原始输出：`art/ai-raw/ui/game/ui_order_four_items_locked_base_raw_v003.png`
- 当前交互评审稿：`art/concepts/ui/game/ui_order_four_items_locked_base_v003.png`
- 停用稿：`art/concepts/ui/game/ui_order_item_density_v001.png`、`art/concepts/ui/game/ui_order_item_density_v002.png`（均为 `rejected_visual_drift`）
- 订单状态参考：`art/concepts/ui/game/ui_order_card_states_v001.png`
- HUD 统一母版：`art/concepts/ui/game/ui_hud_three_board_unified_v001.png`

## 强制视觉母版

- `art/concepts/ui/game/ui_hud_three_board_unified_v001.png`：完整默认界面、金币与目标、投诉警告、完美连单。
- `art/concepts/ui/game/ui_complaint_interaction_states_v001.png`：投诉状态演出。
- `art/concepts/ui/game/ui_coin_star_interaction_states_v001.png`：金币与星星反馈。
- `art/concepts/ui/game/ui_combo_interaction_states_v001.png`：完美连单反馈。
- 后续订单相关稿必须保留完整竖屏主界面：顶部 HUD、订单票据与详情、人物、传送带、纸箱、箱内计数、纸箱/包装/标签选择区以及“封箱发货”按钮。禁止为展示单一规则而删除主操作区或改造成独立说明卡。
- “以四张界面为基准”是直接派生约束，不是风格参考：默认、金币目标、投诉警告、完美连单四个面板的标题、构图、人物位置、状态演出和操作区必须原样保留，只允许替换订单商品格内容。

## 已验证的显示规则

1. 订单详情卡外框、人物区、倒计时区和底部要求行在 1～4 种商品时保持同一尺寸与位置。
2. 1 种商品：单个大格居中。
3. 2 种商品：两个等宽商品格横向排列。
4. 3 种商品：上方两格、下方一格居中，避免出现意义不明的空白第四格。
5. 4 种商品：四个等尺寸商品格按 2×2 排列，保证手机竖屏下仍可识别图标、中文名和数量。
6. 商品格始终显示短中文名；红色数量徽标固定在图标或格子的右下角。
7. 标题显示 `订单商品 · N种`，使商品种类数可直接读取。
8. 纸箱、包装和标签要求固定为底部独立行，不占用商品网格。
9. 顶部订单票据仍只显示代表商品，不在票据内重复展开全部商品。
10. 商品数量变化只能影响订单卡内部商品格；不得改变主界面其他区域的层级、比例与视觉语言。

## FairyGUI 实现建议

- `OrderItems` 使用 Controller：`one / two / three / four`。
- 四个商品格预先命名为 `item0`～`item3`；切换状态时只改变位置、尺寸和可见性，不动态创建节点。
- 单格和双格状态允许图标放大；三格、四格状态统一使用移动端可读的最小字号与图标尺寸。
- 商品名称、数量、种类数和倒计时全部使用 FairyGUI 文本；本对照稿只用于布局验收，不能直接作为生产界面整图导入。

## 完整提示词摘要

```text
Create exactly four equal portrait gameplay panels titled 1种商品, 2种商品, 3种商品, 4种商品. Keep the same order-card dimensions, character, timer, ticket queue and separate requirement row. Only change the product grid: centered one item, two columns, two plus centered one, and fixed 2x2 four-item grid. Every product has an exact Chinese name and a lower-right quantity badge. Never mix packaging requirements into the product grid.
```
