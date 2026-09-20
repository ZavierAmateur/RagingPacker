# 主角六视图模型表修订提示词 v02

- 批次：0
- 状态：开发者已批准，作为八表情候选稿的角色参考母版
- 生成方式：OpenAI `imagegen` 内置编辑模式
- 参考文件：方向概念板 v001、六视图 v001
- 生成文件：`art/concepts/character/packer/char_packer_model_sheet_v002.png`
- 修订目标：将黄色胶带统一恢复到 B 方案中的角色右腰，其他内容保持不变

## 最终提示词

```text
Use case: image-edit / character-model-sheet correction

Input images:
- Image 1 is the approved four-direction concept board. The TOP-RIGHT character is the approved B base and proves that the yellow tape roll belongs on the character's anatomical RIGHT waist.
- Image 2 is the current six-view model sheet to correct.

Primary request:
Edit Image 2 while preserving its canvas, six-view 3-by-2 layout, exact character design, poses, proportions, face, clothing, cap, hair, badge, colors, line art, lighting, spacing, and warm-cream background. Make only this structural correction:
Move the yellow tape roll to the character's anatomical RIGHT waist in every one of the six views, matching the approved top-right B concept in Image 1.

Position logic that must be followed:
- straight front: tape roll appears on the VIEWER'S LEFT
- straight back: tape roll appears on the VIEWER'S RIGHT
- profiles and three-quarter views: rotate the same physical right-waist attachment correctly around the body; it may be partly hidden when on the far side, but must never jump to the left waist
- preserve the parcel badge on the character's anatomical LEFT chest; do not move or mirror the badge

Keep exactly six full-body views and no text. Do not redesign anything else. No new props, labels, arrows, logos, watermark, shadow, extra character, duplicate limb, or crop.
```

## 本轮检查

- 正面胶带位于画面左侧，背面胶带位于画面右侧，符合角色右腰的空间关系。
- 对侧侧面允许胶带被身体遮挡，没有为了“每张都展示”而跳换佩戴侧。
- 包裹工牌仍固定在角色左胸。
- 六个视角、人物比例、服装结构、色板和画面布局未发生明显重设计。
- 本稿仍为候选；开发者批准后才能成为后续八表情的角色参考母版。

## 开发者审批

- 审批结果：通过。
- 后续使用边界：八表情只允许改变眉、眼、嘴、眼下疲态和少量头部张力，不得改变脸型、帽型、发型、服装结构与配色。
