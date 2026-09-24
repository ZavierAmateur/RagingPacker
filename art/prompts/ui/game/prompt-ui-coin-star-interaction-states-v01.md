# 金币与星星目标交互状态稿 v01

## 状态

- 当前状态：`developer_visual_approved`
- 确认记录：开发者于 2026-09-22 确认该金币与星星目标交互方向，并要求后续主游戏核心区域保留必要中文说明。
- 日期：2026-09-22
- AI 原始输出：`art/ai-raw/ui/game/ui_coin_star_interaction_states_raw_v001.png`
- 交互评审稿：`art/concepts/ui/game/ui_coin_star_interaction_states_v001.png`
- 正式金币图标：`art/final/icon/hud/icon_coin.png`
- 同族交互参考：`art/concepts/ui/game/ui_combo_interaction_states_v001.png`
- 同族交互参考：`art/concepts/ui/game/ui_complaint_interaction_states_v001.png`

## 含义冻结

- 金币是首发唯一游戏货币，用于升级、开局道具和外观消费。
- 星星不是第二种货币，也不是可消费资源；星星 HUD 表示本工作日成功订单目标进度。
- 星星数值必须显示为 `当前成功订单 / 当日目标`，例如 `4/6`，不再只显示容易误解的单个等级数字。

## 交互顺序

1. 正确发货后，包裹附近显示“金币 +N”，并出现少量金币。
2. 金币沿单一曲线飞入 HUD，金币总额滚动到新值并进行一次数值 punch。
3. 金币入账完成后，星星目标从旧进度填充到新进度，并显示“今日进度 +1”。
4. 达到目标时显示“今日目标完成！”，星星弹跳并短暂发光，然后进入结算转场。

## FairyGUI 拆分建议

- `CoinHud`：正式金币图标、总额文本、入账光圈。
- `CoinRewardPopup`：`金币`、`+N` 和三枚飞行金币；实际金额由文本动态显示。
- `DayGoalHud`：星星图标、当前值、目标值、进度条、完成光圈。
- `DayGoalPopup`：`progress / completed` 两种状态。
- 动效顺序建议：奖励弹字 0.25 秒出现 → 金币飞入 0.35～0.55 秒 → 总额滚动 0.25～0.4 秒 → 星星进度填充 0.25～0.45 秒。
- 金币飞行数量固定为 3 枚视觉粒子，不与真实奖励数值一一对应，避免高奖励时满屏金币。
- 当日目标完成动效不得立即被结算页盖住，至少留出 0.6～0.9 秒完成反馈。

## 当前边界

- 本图是交互状态评审稿，不是可直接导入 FairyGUI/Cocos 的正式资源。
- 金币继续使用现有正式资源；星星图标、目标条和光圈尚未拆分为正式资产。
- 中文、金币值和目标分数必须由 FGUI 文本实时渲染，不从 AI 图片中切图使用。

## 生成方式

- 模式：内置 ImageGen，多参考图生成。
- 用例：`ui-mockup`。

## 完整提示词

```text
Create one polished four-panel landscape interaction board showing how one successful packing order awards coins and advances the current workday goal. Show “金币奖励” with “金币 +128” beside the package and HUD total 1,240; “金币入账” with exactly three coins flying into the HUD and the total rolling to 1,368; “目标推进” with the star target moving to 4/6 and “今日进度 +1”; and “目标完成” with 6/6 and “今日目标完成！”. The star represents successful-orders progress toward the workday target and is not a second currency. Match the approved warm warehouse gameplay UI, formal coin icon, orange-capped packer, cream panels and dark rounded outlines. Keep reward particles controlled. No coin shower, chest, gem, flame, English, fake text, logos or watermark.
```
