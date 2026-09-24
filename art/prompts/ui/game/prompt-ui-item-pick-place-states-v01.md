# 主游戏商品选取与放入纸箱四状态稿 v01

## 状态

- 当前状态：`developer_visual_approved`
- 确认记录：开发者于 2026-09-22 确认进入下一步；商品等待、选中、合法放入和非订单商品退回四状态通过。
- 日期：2026-09-22
- AI 原始输出：`art/ai-raw/ui/game/ui_item_pick_place_states_raw_v001.png`
- 交互评审稿：`art/concepts/ui/game/ui_item_pick_place_states_v001.png`
- 主界面母版：`art/concepts/ui/game/ui_selector_states_locked_base_v002.png`
- 纸箱与按钮状态参考：`art/concepts/ui/game/ui_box_ship_button_states_v001.png`

## 四个状态

1. `等待选择`：传送带商品保持可点击，空箱显示 0/4，提示“请选择商品”。
2. `商品选中`：蓝色手机上抬、放大并使用橙色描边，同时显示名称“蓝色手机”；纸箱内部出现克制的放置目标和“放入纸箱”。
3. `放入成功`：蓝色手机进入纸箱内部层，容量变为 1/4；订单对应商品显示绿色勾选和“已装 1/1”，箱体附近显示“已装入”。
4. `订单不需要`：冰鲜鱼保留在传送带并弹回，使用红色描边、红叉和“订单不需要”；箱内仍为 0/4，投诉保持 0/3。

## 交互规则

- 首发采用“点击商品 → 商品选中 → 点击纸箱或自动落入”的移动端友好操作；不强制玩家进行高精度拖拽。
- 选中状态必须同时使用上抬、橙色描边和中文名称，不能只靠颜色表达。
- 合法放入时，箱内商品、容量文字、容量圆点和订单商品完成状态必须在同一次反馈中更新。
- 不属于当前订单的商品不得进入纸箱，不增加容量、不计投诉，只做轻量弹回和明确文字提醒。
- 简单误触不直接惩罚玩家；只有正式封箱提交后发现错装、漏装或包装错误，才进入投诉/失败判定。
- 商品节点继续位于纸箱内部/后层与前层之间，不能覆盖纸箱正面的容量计数。
- 订单未完成时，“封箱发货”保持禁用态。

## FairyGUI／Cocos 实现建议

- `ConveyorItem` Controller：`idle / selected / rejected / moving / unavailable`。
- `BoxDropTarget` Controller：`hidden / available / hover / accepted / rejected`。
- 点击已选商品可取消选择；选择新商品时自动取消上一个商品。
- 移动轨迹由 Cocos Tween 或路径动画控制，FGUI 负责选中框、名称气泡、提示文字和订单勾选状态。
- 放入成功后更新数据，再播放表现；动画被打断时必须从数据恢复正确的箱内数量和订单状态。

## 完整提示词摘要

```text
Directly derive from the approved full gameplay interface. Show four states: 等待选择, 商品选中, 放入成功, 订单不需要. Use mobile-friendly tap/select/place; valid placement updates box contents, 1/4 capacity and the matching order cell, while an unneeded fish stays on the conveyor, shows a small red rejection message, and does not change capacity or complaint count.
```
