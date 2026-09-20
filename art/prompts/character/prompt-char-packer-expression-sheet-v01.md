# 主角八表情表提示词 v01

- 批次：0
- 状态：开发者退回，已被 v02 替代
- 生成方式：OpenAI `imagegen` 内置模式，使用已批准六视图 v002 作为图像参考
- 参考文件：`art/concepts/character/packer/char_packer_model_sheet_v002.png`
- 生成文件：`art/concepts/character/packer/char_packer_expression_sheet_v001.png`
- 用途：冻结主角八种标准表情，不作为可直接导入运行工程的透明底资源

## 最终提示词

```text
Use case: stylized-concept

Asset type: Batch 0 facial-expression model sheet for a 2D casual mobile game character.

Input image:
Image 1 is the approved six-view character model sheet. Use the TOP-MIDDLE front three-quarter head as the exact identity and angle reference. The top-left straight-front view may support symmetry and costume details. Do not merge or average different body variants: all views in Image 1 are the same approved character.

Primary request:
Create exactly EIGHT head-and-upper-chest portraits of the same approved young warehouse packer, arranged as a precise landscape 4-column by 2-row expression sheet. All eight portraits must use the same front three-quarter head angle, same crop, same apparent scale, same cap tilt, same face shape, same ears, same hair silhouette, same neck/shoulders, and same uniform collar. Only eyebrows, eyes, eyelids, pupils, mouth, cheek tension, and very small comic accent marks may change.

Expression mapping by grid position:
Top row, left to right:
1. calm neutral — closed relaxed mouth, mildly alert
2. tired — heavy eyelids, subtle under-eye fatigue, tiny restrained sigh, healthy not sick
3. focused — narrowed attentive eyes, firm closed mouth, competent concentration
4. suspicious — one eyebrow raised, side-eye, slightly pursed mouth

Bottom row, left to right:
5. mildly irritable — brows lowered, small tense mouth, annoyed but still sympathetic
6. extremely frantic — wide asymmetric eyes, high dramatic brows, open comic shout, maximum C-direction comedic facial intensity, never scary
7. successful smug — confident half-smile, lifted brow, pleased with the result
8. failed and devastated — collapsed eyelids and brows, trembling downturned mouth, comic despair, not crying realistically and not injured

Identity and style invariants:
- exactly the approved B-based protagonist from Image 1
- young adult 20–25, gender-neutral with youthful energy
- orange cap tilted to the character's left, orange #F58A3A and highlight #FFAA58
- exactly one main upward dark-brown hair tuft, hair #49362E
- thick red-brown eyebrows #9E3F32
- skin #F2B58E with shadow #D98D69
- orange warehouse polo and dark collar/cuff details visible consistently at the bottom of every portrait
- parcel badge may appear only if naturally inside the identical crop; never turn into text
- warm warehouse comedy flat-cartoon style
- bold smooth warm dark-brown outlines #453A35, no pure black
- crisp flat 2D vector-like shapes, one clean shadow layer and tiny highlight, soft top-left 45-degree light
- expressions borrow the BOTTOM-LEFT concept's comedic intensity only for cells 6 and 8; do not borrow its different pose, hand size, or body design

Composition:
- exact 4-by-2 grid, equal generous spacing
- every portrait fully includes the cap, hair tuft, ears, chin, neck, and upper shoulders
- plain solid warm-cream background #F6F1E0
- no dividing lines and no text; the position mapping will be documented outside the image

Constraints / avoid:
no labels, numbers, captions, typography, logo, watermark, hands, arms crossing the face, props, tape roll, full body, different camera angles, random head rotation, costume changes, hairstyle changes, cap changes, age changes, gender changes, duplicate facial features, photorealism, anime, 3D render, painterly texture, gradients, horror, bloodshot eyes, sharp teeth, violence, realistic tears, cropped cap, or extra characters.
```

## 位置映射

| 位置 | 表情 | 使用场景 |
|---|---|---|
| 上一 | 平静 | 常规待机、说明 |
| 上二 | 疲惫 | 长时间工作、低能量 |
| 上三 | 专注 | 打包、核对订单 |
| 上四 | 怀疑 | 发现异常商品或订单 |
| 下一 | 轻度暴躁 | 小失误、催促 |
| 下二 | 极度抓狂 | 连续错误、超时高压 |
| 下三 | 成功得意 | 正确发货、连击 |
| 下四 | 失败崩溃 | 错装、投诉、结算失败 |

## 本轮检查

- 数量为 8，位置顺序与计划中的八种表情一致。
- 帽型、发型、脸型、耳朵、服装领口和包裹工牌保持一致。
- 强表情通过眉眼嘴和少量漫画符号实现，没有恐怖化或攻击性表现。
- 无文字、标签、Logo、水印、额外角色和遮脸手势。
- 本稿通过开发者视觉确认后，只冻结表情设计；透明底拆分和运行资源清理另行制作。

## 退回原因

- “专注”和“轻度暴躁”的眉眼语义过于接近。
- “怀疑”缺少明确的高低眉、审视侧目和歪嘴关系。
- “极度抓狂”使用睁大眼睛和汗滴，更像慌张而不是失去耐心。
- 修订稿见 `prompt-char-packer-expression-sheet-v02.md` 与 `char_packer_expression_sheet_v002.png`。
