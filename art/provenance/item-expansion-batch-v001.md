# 十五商品扩展批次来源与处理记录 V1

## 基本信息

- 批次：Item Style Master V1 扩展商品。
- 生成日期：2026-09-22。
- 生成服务：OpenAI ImageGen，Codex 内置模式。
- 风格参考：`art/concepts/item/item_style_sample_board_v001.png`。
- 提示词记录：`art/prompts/item/prompt-item-expansion-batch-v01.md`。
- 当前状态：`ready_for_import`，尚未实际导入 FairyGUI/Cocos。
- 授权状态：`terms_checked`，官方条款快照见 `art/licenses/openai/2026-09-21/`。

## 生成与审批

- 先生成九件数码/办公商品与六件食品/日用品对照板，开发者确认整体方向。
- 开发者要求存储卡补充 `G`，最终固定为 `32G/128G`。
- 开发者要求普通可乐使用“可”字，最终与无糖可乐的 `0` 形成区分。
- 十五件透明单品随后逐件生成，开发者逐件确认并进入下一步。

## 自动处理

- 原始输出均为 `1254 × 1254` RGBA 透明图，原图保持不变。
- 自动处理包括：等比缩放到 `1024 × 1024`、生成 `256/128/96/90` 预览、核对 Alpha 与边缘安全留白。
- 相机、无糖可乐和狗粮仅做等比缩小及透明居中，以消除过窄留白或 Alpha=1 的边缘噪点；没有重绘、调色或改字。

## 发布边界

- 静态 QA 通过表示文件可进入导入阶段，不表示已经通过 FairyGUI、Cocos、图集或真机验收。
- 正式运行文件继续放在 `art/final/item/`，不得直接把 AI 原始图放进 `assets/`。
