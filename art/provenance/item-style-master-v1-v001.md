# Item Style Master V1 来源与处理记录 V1

## 基本信息

- 批次：首批五商品样张
- 生成日期：2026-09-21
- 生成服务：OpenAI ImageGen，Codex 内置模式
- 风格参考：`art/concepts/item/item_style_sample_board_v001.png`
- 最终状态：`ready_for_import`，尚未实际导入 FairyGUI/Cocos
- 授权状态：`terms_checked`，官方条款核验快照见 `art/licenses/openai/2026-09-21/`

## 资产映射

| 资产 ID | 原始输出 | 已批准概念母图 | 提示词记录 | 清理后文件 |
| --- | --- | --- | --- | --- |
| `item_phone_blue` | `art/ai-raw/item/item_phone_blue_raw_v001.png` | `art/concepts/item/individual/item_phone_blue_v001.png` | `art/prompts/item/prompt-item-phone-blue-v01.md` | `art/final/item/item_phone_blue.png` |
| `item_phone_black` | `art/ai-raw/item/item_phone_black_raw_v001.png` | `art/concepts/item/individual/item_phone_black_v001.png` | `art/prompts/item/prompt-item-phone-black-v01.md` | `art/final/item/item_phone_black.png` |
| `item_charger_white` | `art/ai-raw/item/item_charger_white_raw_v001.png` | `art/concepts/item/individual/item_charger_white_v001.png` | `art/prompts/item/prompt-item-charger-white-v01.md` | `art/final/item/item_charger_white.png` |
| `item_glass_empty` | `art/ai-raw/item/item_glass_empty_raw_v001.png` | `art/concepts/item/individual/item_glass_empty_v001.png` | `art/prompts/item/prompt-item-glass-empty-v01.md` | `art/final/item/item_glass_empty.png` |
| `item_fish_frozen` | `art/ai-raw/item/item_fish_frozen_raw_v001.png` | `art/concepts/item/individual/item_fish_frozen_v001.png` | `art/prompts/item/prompt-item-fish-frozen-v01.md` | `art/final/item/item_fish_frozen.png` |

## 候选与选择

- 每种商品本轮保留一个进入开发者验收的正式候选。
- 开发者在对话中逐件批准蓝色手机、黑色手机、白色充电头、空玻璃杯和冰鲜鱼。
- 选择依据为：符合已批准五商品风格母版、轮廓清楚、无品牌与水印、90 像素下可辨认。

## 人工与自动处理

- 未进行人工描线、局部重绘、调色或添加文字。
- 自动处理仅包括：等比缩放到 1024 母图、生成多尺寸预览、清除 Alpha 1～7 的不可见噪点、按可见包围盒居中。
- `item_fish_frozen` 额外执行等比缩小，使可见宽度符合母版安全留白；没有修改鱼身造型、色彩、斜纹、冰晶或表情。
- 全部处理均从已批准概念母图派生，原始生成图和概念母图保持不变。

## 发布边界

这些文件已完成视觉验收、技术 QA 和官方条款核验，可以进入 `ready_for_import`。实际导入后仍需完成 FairyGUI/Cocos 运行预览，才能继续进入 `content_frozen`；对外宣传和发布前还需按项目约定完成平台与真机集中 QA。账户的数据控制开关仍为 `unverified`，不得因此上传私密输入。
