# 主游戏包装与标签核对四状态稿 v01

## 状态

- 当前状态：`visual_approved_behavior_revision_required`
- 确认记录：开发者于 2026-09-22 确认包装衬层、未选择、勾选和核对表现；随后代码核对确认主按钮不能因选错或漏选而被永久禁用，否则无法触发核心失败判定。v001 保留视觉表现，按钮启用规则废止。
- 日期：2026-09-22
- AI 原始输出：`art/ai-raw/ui/game/ui_packaging_label_verify_states_raw_v001.png`
- 交互评审稿：`art/concepts/ui/game/ui_packaging_label_verify_states_v001.png`
- 选择器母版：`art/concepts/ui/game/ui_selector_states_locked_base_v002.png`
- 纸箱与按钮状态参考：`art/concepts/ui/game/ui_box_ship_button_states_v001.png`

## 四个状态

1. `商品装齐`：商品已达到 4/4，小号箱已确认；包装和标签显示“未选择”，按钮禁用并提示“请先选择包装”。
2. `包装完成`：气泡膜作为箱内衬层出现，小号箱和气泡膜显示绿色勾选；标签仍未选择，提示“请选择标签”。
3. `标签完成`：易碎标签选择正确，三项要求均显示绿色勾选；系统短暂显示“正在核对…”，按钮仍保持禁用。
4. `核对完成`：商品、纸箱、包装和标签全部通过，显示绿色核对反馈；橙色按钮不再以此作为唯一启用条件。

## 交互与显示规则

- `箱内 4/4` 只代表商品数量齐全，不等于订单可发货。
- 主按钮在非提交动画期间保持可点击；包装/标签选择是否正确只在提交后判定，避免 UI 直接泄露正确答案或阻止失败玩法。
- 未选择状态必须同时使用问号占位和“未选择”文字，不能只显示空白格。
- 已确认选项使用绿色勾选，橙色继续保留给主操作和当前选中，不混用语义。
- 气泡膜在纸箱中表现为浅蓝半透明衬层，位于商品后方或周边，不能遮挡商品识别。
- 标签选择阶段只显示选择确认或幽灵位置预览；正式标签在纸箱封闭后再贴到包裹表面。
- 提交后的核对过程使用 0.2～0.5 秒短状态并临时锁定按钮，随后进入成功或具体错误反馈。

## FairyGUI／Cocos 实现建议

- `RequirementCheck` Controller：`missing / selected / checking / valid / invalid`。
- `ShipButton` 由统一的订单有效性结果控制，禁止各选择器直接单独启用按钮。
- 按钮推荐条件：`!isSubmitting && !isGameOver`；正确性由提交时的 `evaluatePackage` 统一判定。
- 气泡膜衬层属于纸箱内部表现层，位于箱内商品后方、纸箱内壁前方；不使用单个卷筒图标代替实际保护效果。
- 核对结果、提示文字和勾选标记由 FGUI 状态控制；箱内衬层与封箱动画由 Cocos 动画层控制。

## 完整提示词摘要

```text
Directly derive from the approved full gameplay UI. Show 商品装齐, 包装完成, 标签完成, 核对完成. Keep products at 4/4 throughout. The ship button remains disabled until small box, bubble-wrap lining and fragile label are all confirmed, then becomes bright orange. Bubble wrap is an inner lining and must not hide products; the label is selected before sealing but physically applied after the box closes.
```
