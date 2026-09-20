# 主角八表情表修订提示词 v02

- 批次：0
- 状态：开发者退回，已被重新设计的 v003 替代
- 生成方式：OpenAI `imagegen` 内置编辑模式
- 编辑目标：`art/concepts/character/packer/char_packer_expression_sheet_v001.png`
- 生成文件：`art/concepts/character/packer/char_packer_expression_sheet_v002.png`
- 修订范围：只调整专注、怀疑、极度抓狂三格；其余五格保持设计不变

## 最终提示词

```text
Use case: precise-object-edit

Asset type: revision of a 2D game-character eight-expression sheet.

Input image:
Image 1 is the edit target: an existing 4-column by 2-row expression sheet.

Primary request:
Preserve the entire image, layout, character identity, crop, scale, colors, line art, lighting, background, and FIVE approved cells. Change ONLY these three cells:
- TOP ROW, COLUMN 3: focused
- TOP ROW, COLUMN 4: suspicious
- BOTTOM ROW, COLUMN 2: extremely frantic/furious

The five cells that must remain visually unchanged are:
top-row columns 1 and 2; bottom-row columns 1, 3, and 4.

Exact corrections:

1. TOP ROW COLUMN 3 — FOCUSED, clearly not irritated:
- both eyebrows controlled and nearly level, only slightly drawn inward; do not use the steep angry V shape
- pupils centered and looking slightly downward toward an imagined packing task
- attentive narrowed eyelids, calm concentration, no side-eye
- firm small closed mouth, relaxed cheeks
- expression reads “carefully checking the order,” competent and absorbed
- no anger marks, no pout, no comic symbol

2. TOP ROW COLUMN 4 — SUSPICIOUS, unmistakably questioning:
- one eyebrow lifted very high and arched, the other eyebrow lowered
- both pupils make a strong sideways glance toward the same off-screen point
- one eye slightly more narrowed than the other
- crooked skeptical mouth pulled to one side, not a kiss/pout mouth
- subtle cheek tension and two tiny curved scrutiny lines beside the narrowed eye are allowed
- expression reads “something about this package is definitely wrong”
- no question-mark text and no hand gesture

3. BOTTOM ROW COLUMN 2 — EXTREME COMEDIC RAGE / LOSING PATIENCE, not panic:
- remove all blue sweat drops completely
- no wide round frightened eyes, no raised fear brows
- eyebrows press sharply down and inward in a strong V
- eyes narrow into a furious glare with small focused pupils
- mouth is a large angry comic shout with squared ordinary teeth, not sharp teeth
- add a small stylized red-brown anger-vein symbol on the temple and two small warm-gray steam puffs at the sides if useful
- flushed warm cheeks and compressed facial tension
- reads “I have completely lost patience with this package,” humorous and sympathetic, never violent or scary

Invariants for all eight cells:
same approved B-based protagonist; identical orange tilted cap, one main upward dark-brown hair tuft, face shape, ears, hair silhouette, uniform collar, parcel badge, head angle, portrait crop and apparent scale. Keep warm flat-cartoon style, warm dark-brown outlines, cream background, exactly eight portraits, no text, labels, numbers, logo, watermark, hands, props, new characters, photorealism, anime, 3D, horror, bloodshot eyes, sharp teeth, injury, or realistic tears.

This is a targeted correction. Do not redesign the sheet or modify approved cells.
```

## 修订检查

- 专注：视线明确向下核对，眉毛接近平直，和轻度暴躁的侧目压眉拉开语义。
- 怀疑：高低眉、同向侧视与歪嘴形成明确的审视感，不再只是噘嘴。
- 极度抓狂：去除汗滴和惊恐圆眼，改为强 V 眉、怒视、怒吼、爆筋和蒸汽。
- 数量、位置映射、角色身份、服装、色板和其他五种表情保持不变。

## 退回原因

- 开发者认为整套八表情的情绪设计仍不理想，不再继续局部修补。
- 怀疑表情需要加入明确的 `???` 漫画符号。
- v003 重新查阅卡通表情设计资料，并从已批准角色母版重新生成整套表情。
