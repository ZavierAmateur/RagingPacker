# 主游戏封箱与发货动作四状态稿 v01

## 状态

- 当前状态：`developer_visual_approved`
- 确认记录：开发者于 2026-09-22 确认进入下一步；收拢箱盖、贴胶带、贴标签和发货完成四个动作关键帧通过。
- 日期：2026-09-22
- AI 原始输出：`art/ai-raw/ui/game/ui_seal_ship_sequence_raw_v001.png`
- 交互评审稿：`art/concepts/ui/game/ui_seal_ship_sequence_v001.png`
- 包装核对参考：`art/concepts/ui/game/ui_packaging_label_verify_states_v001.png`
- 纸箱与按钮状态参考：`art/concepts/ui/game/ui_box_ship_button_states_v001.png`

## 四个动作关键帧

1. `收拢箱盖`：四片箱盖向内折叠，商品逐渐被遮住，气泡膜衬层短暂可见；状态显示“正在封箱”。
2. `贴上胶带`：纸箱完全闭合，牛皮胶带沿中央接缝拉出并贴合；状态显示“贴上胶带”。
3. `贴好标签`：胶带已固定，易碎标签贴在箱盖/正面右上安全区，不遮挡胶带和轮廓；状态显示“贴好标签”。
4. `发货完成`：完成包裹进入传送带向右移动；下方工作区恢复空箱 0/4，状态显示“发货完成”。

## 动画与交互规则

- 封箱动作顺序固定为：箱盖合拢 → 胶带封口 → 标签贴附 → 包裹移交传送带。
- 胶带和标签不得提前出现在开放纸箱上；易碎标签不得遮挡中央胶带接缝。
- 动作期间主按钮不可重复点击，依次显示“封箱中…”与“发货中…”，完成瞬间显示“已发货”。
- 四个动作阶段保持 HUD、订单区和选择器位置稳定；只更新包裹、短状态文字和角色轻量反馈。
- 发货完成后工作区重置为 0/4 和四个空容量圆点，不能保留上一单的 4/4。
- 本序列不播放金币、星星、完美连单或投诉反馈；发货动作结束后再进入对应结算反馈链。
- 胶带只使用两三条克制运动线；标签贴附使用一次短按压/punch，不使用巨大工具或手掌遮挡包裹。

## FairyGUI／Cocos 实现建议

- `SealSequence`：`folding / taping / labeling / transferring / done`。
- 纸箱拆层：内层、商品、前层、四片箱盖、胶带、标签、阴影；动作节点按固定锚点播放。
- 箱盖合拢、胶带拉伸和包裹移动由 Cocos 动画/Tween 控制；状态文字、按钮状态和选择器勾选由 FairyGUI 控制。
- 动画开始即锁定输入；服务层结算结果准备好后再决定进入成功奖励或失败反馈，避免视觉完成但数据未提交。
- 动画被打断或切后台时，根据提交状态恢复到开放箱、封箱中或已发货，不重复发奖。

## 完整提示词摘要

```text
Directly derive from the approved full gameplay UI. Show four keyframes: 收拢箱盖, 贴上胶带, 贴好标签, 发货完成. Fold flaps, seal the center seam with kraft tape, apply one fragile label after closure, then move the completed parcel onto the conveyor. Keep the action button disabled during the sequence, reset the work-area box to 0/4 after shipping, and leave coin/star/combo feedback to the separate result flow.
```
