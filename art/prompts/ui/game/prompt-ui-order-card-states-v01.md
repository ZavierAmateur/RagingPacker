# 主游戏订单卡四状态稿 v01

## 状态

- 当前状态：`interaction_logic_approved_visual_rework_required`
- 确认记录：开发者认可订单切换与多单队列逻辑；2026-09-22 指出评审稿脱离已确认的完整游戏界面，缺少底部选择区和“封箱发货”等主界面结构，因此仅保留交互逻辑，不再作为视觉母版。
- 日期：2026-09-22
- AI 原始输出：`art/ai-raw/ui/game/ui_order_card_states_raw_v001.png`
- 交互评审稿：`art/concepts/ui/game/ui_order_card_states_v001.png`
- HUD 统一母版：`art/concepts/ui/game/ui_hud_three_board_unified_v001.png`
- 页面结构参考：`art/concepts/ui/game/ui_game_a_upgrade_v006.png`

## 四个状态

1. `新订单`：订单 01 激活，未来票据保持锁定；显示“新订单到达”。
2. `多单排队`：01/02/03 三张紧凑票据同时存在，只展开当前订单 02。
3. `紧急提醒`：当前仍为订单 02，等待中的订单 03 使用短红色时间条和描边，并提示“订单 03 即将超时”。
4. `切换订单`：订单 03 激活，展开内容同步切换为冰鲜鱼、剩余 8 秒、中号箱、冰袋和冷藏要求。

## 信息规则

- 票据队列最多显示三单；每张票据只保留订单号、代表商品和细时间条。
- 同一时刻只能展开一张详情卡，禁止同时铺开多张完整订单。
- 激活票据使用橙色；等待票据使用奶油色；紧急等待票据只将时间条和外框变为珊瑚红。
- 当前订单详情必须写明“订单商品／剩余时间”，商品使用短中文名与数量，三项要求直接显示箱型、包装和标签名称。
- 单个订单允许 1～4 种商品；商品区使用 `one / two / three / four` 四种布局状态，卡片外框尺寸不得随商品数量变化。
- 1 种商品使用居中大格；2 种使用双列；3 种使用上二下一且底部居中；4 种使用等尺寸 2×2 网格。
- 商品数量徽标固定在商品格右下角；商品短中文名必须始终可见。纸箱、包装、标签属于独立要求行，禁止混入商品网格。
- 切换票据时，角色表情、商品、时间和三项要求必须同步切换，不能只改变顶部高亮。
- 票据左右顺序与订单编号保持一致，完成或取消后才允许其余票据向左补位。

## FairyGUI 拆分建议

- `OrderQueue`：最多三个 `OrderTicket`，包含订单号、代表商品、时间条、锁定与紧急状态。
- `OrderTicket` Controller：`locked / waiting / active / urgent / completed`。
- `OrderDetail`：独立角色头像、商品列表、倒计时和三项要求。
- `OrderDetail` 只绑定当前 `orderId`；切换时一次性刷新全部子数据，再播放 0.15～0.25 秒淡入/位移。
- 警告气泡使用独立覆盖层，不能挡住当前商品和剩余时间。

## 当前边界

- 本图是订单卡交互评审稿，不是可直接导入 FairyGUI/Cocos 的正式资源。
- 中文与数字必须由 FairyGUI 文本实时渲染，不从 AI 图片中切图使用。
- 四种商品密度对照稿以 `art/concepts/ui/game/ui_order_item_density_v002.png` 为当前候选；旧版 v001 已因视觉漂移停用。
- 多订单的正式玩法规则仍需在程序实现前确认订单是否独立倒计时、箱内内容是否按订单分别保存，以及提交后自动切换规则。

## 生成方式

- 模式：内置 ImageGen，多参考图生成。
- 用例：`ui-mockup`。

## 完整提示词摘要

```text
Use the approved unified HUD/game-scene master and full gameplay order-card structure. Create exactly four equal portrait gameplay panels: 新订单, 多单排队, 紧急提醒, 切换订单. Preserve the compact 01/02/03 ticket queue, one expanded current order, independent packer portrait, item grid, timer and written box/wrap/label requirements. Show clear active/waiting/urgent states and exact Chinese labels. Never expand more than one order card or revert to unlabeled icons.
```
