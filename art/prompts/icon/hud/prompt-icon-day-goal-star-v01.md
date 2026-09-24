# HUD 今日目标星星图标 v01

## 状态

- 当前状态：`ready_for_import`（开发者于 2026-09-22 确认进入下一步）
- 日期：2026-09-22
- AI 原始输出：`art/ai-raw/icon/hud/icon_day_goal_star_raw_v001.png`
- 透明候选稿：`art/concepts/icon/hud/icon_day_goal_star_v001.png`
- HUD 交互参考：`art/concepts/ui/game/ui_coin_star_interaction_states_v001.png`
- 同族图标参考：`art/final/icon/hud/icon_coin.png`、`art/final/icon/hud/icon_complaint.png`

## 视觉与用途

- 表示本工作日成功订单目标进度，不是货币、关卡评分或付费资源。
- 独立五角星轮廓与金币币面区分，避免玩家把它误认成第二种货币。
- 圆润五角星、深棕描边、橙金内边和黄色主体与现有 HUD 图标保持同族。
- 右上两枚动态标记用于进度增加和目标完成时的弹跳反馈。

## 技术检查

- 原生输出：1254 × 1254 RGBA PNG。
- 正式母图：`art/final/icon/hud/icon_day_goal_star.png`，512 × 512 RGBA PNG。
- Alpha 包围盒为 `(42, 70)–(478, 482)`；四角透明，画布四边最大 Alpha 为 0，主体与两枚动态标记均未触边。
- 48/64/90 px 缩放预览中五角星轮廓、高光、内边与两枚动态标记仍可辨认。
- 当前尚未导入 FairyGUI/Cocos。

## 生成方式

- 模式：内置 ImageGen，多参考图生成。
- 用例：`stylized-concept`。
- ImageGen 直接返回 RGBA 透明图，因此没有执行色键移除脚本。

## 完整提示词

```text
Use case: stylized-concept
Asset type: single mobile-game HUD icon for current-workday successful-order target progress
Input images: the approved formal coin icon locks the chunky dark-brown outline, warm two-step shading, cream highlight and small-size clarity; the approved coin-and-star interaction board supplies the intended goal-progress function; the approved complaint icon locks the shared HUD family scale and two-tick energy motif.
Primary request: Create exactly one friendly golden five-point star HUD icon representing the current workday order goal. It is a progress marker, not a spendable currency, premium gem, reward token, rating row, badge or coin.
Subject: one chunky symmetrical five-point star with generously rounded tips and shallow inner notches, tilted about 3 degrees clockwise. Use a thick dark chocolate-brown outer outline, narrow orange-gold inner border, bright golden-yellow face, restrained lighter-yellow facet, one small cream upper-left highlight and exactly two tiny orange-gold celebration ticks outside the upper-right tip. Keep the center plain.
Style: polished 2D casual mobile-game HUD sprite, warm warehouse comedy flat cartoon, simple geometry, bold clean rounded outline, restrained two-step shading, high contrast at 48–90 px.
Constraints: exactly one five-point star, exactly one highlight and exactly two energy ticks; no text, number, coin circle, ring, ribbon, shield, crown, gem, face, wings, progress bar, extra stars, logo or watermark.
```
