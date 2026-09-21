# 游戏图标 v001 溯源记录

## 资产

- 资产 ID：`icon_app`
- 正式源文件：`art/final/icon/icon_app.png`
- 版本：`v001`
- 状态：`ready_for_import`
- SHA-256：`13f5dcc702dc791122b85f1145132c64f9b83f540e3ee001ee93823acfd48428`

## 来源链路

1. 三方向候选：`art/concepts/icon/icon_direction_board_v001.png`。
2. 开发者选择 B 方向：人物拉动黄色胶带缠绕包裹。
3. 独立原始生成：`art/ai-raw/icon/icon_app_b_master_raw_v001.png`，1254 × 1254 RGBA。
4. 完整方形背景修订：`art/ai-raw/icon/icon_app_b_master_fullbleed_raw_v002.png`，1254 × 1254 RGB。
5. 使用 `sips` 重采样为 2048 × 2048 候选母版，经开发者确认后复制为稳定命名的正式源文件。

## 审批与 QA

- 方向审批：2026-09-21，开发者选择 B。
- 母版审批：2026-09-21，开发者确认进入下一步。
- 技术检查：尺寸、格式、RGB、无透明通道、无烘焙圆角、无文字/徽标/通知点、48 像素辨识度通过。
- 授权记录：`art/licenses/openai/2026-09-21/`。

## 边界

- 2048 文件为 1254 原生修订稿的重采样交付，不标记为 ImageGen 原生 2048。
- 尚未导入 FairyGUI/Cocos，未验证最终平台自动圆角裁切和商店后台提交结果。
- 正式平台图标若要求特定色彩配置或尺寸，由平台导出流程从此母版派生，不覆盖母版。
