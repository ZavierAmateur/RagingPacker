# 主角八表情表重制提示词 v03

- 批次：0
- 状态：开发者已批准，作为后续表情拆分与动作设计参考
- 生成方式：OpenAI `imagegen` 内置模式；初次整套重制后对专注格进行一次定点修订
- 唯一图像参考：`art/concepts/character/packer/char_packer_model_sheet_v002.png`
- 生成文件：`art/concepts/character/packer/char_packer_expression_sheet_v003.png`
- 资料记录：`art/prompts/character/research-char-expression-v01.md`
- 说明：未把检索到的外部作品输入生成工具，只将抽象设计原则转化为项目提示词

## 整套重制提示词

```text
Use case: stylized-concept

Asset type: complete redesign of an eight-expression character sheet for a 2D casual mobile game.

Input image:
Image 1 is the ONLY visual reference and the approved character model sheet. Use the top-middle three-quarter view and top-left front view to preserve identity. Do not reference or reproduce any earlier expression sheet.

Primary request:
Design exactly EIGHT clearly differentiated head-and-upper-torso expressions for the approved warehouse packer. Arrange them in a clean landscape 4-column by 2-row grid. This is a fresh expression-design pass, not an edit of previous faces.

Expression-design principles:
- Every expression must coordinate the entire eye mask (eyebrows + eyelids + pupils/gaze), mouth shape, cheek tension, and a small head/shoulder attitude.
- Use clear graphic mouth and eye shapes, controlled asymmetry, and animation-style exaggeration.
- Each emotion must remain instantly readable when the sheet is viewed as a small mobile-game thumbnail.
- Preserve the character's facial construction and identity; exaggerate performance, not anatomy.
- Build a clear intensity arc across the set. Do not create eight variations of the same side-eye face.
- Small head tilts and shoulder angles are encouraged when they reinforce meaning, but keep each portrait at comparable scale and crop.

Grid mapping, top row left to right:

1. CALM / NEUTRAL:
Relaxed nearly level brows, open centered pupils, tiny neutral mouth with a hint of patience, upright head and even shoulders. A useful reset expression. No side-eye.

2. TIRED:
Head slightly drooped, eyelids heavy and uneven, inner brows softly raised, pupils low, small loose exhale mouth, clearly visible but healthy under-eye fatigue. A tiny sigh puff is allowed. No anger.

3. FOCUSED / WORKING:
Head leans slightly forward, both pupils look distinctly downward at an imagined order sheet, upper eyelids narrow with concentration, brows controlled and drawn inward only at the center, lips pressed into a firm short horizontal line. Competent, absorbed, calm. Absolutely no sideways glare, no anger V, no anger symbol.

4. SUSPICIOUS / QUESTIONING:
Head tilted slightly, one brow dramatically high and curved while the other presses low, unequal eyelids, both pupils make a strong sideways inspection, crooked skeptical mouth pulled to one side. Add exactly the visible text "???" above and slightly to the free side of the cap in large dark-brown rounded comic punctuation. The three question marks must be legible and separate. Expression reads “this package makes no sense.”

Bottom row left to right:

5. MILDLY IRRITATED:
Head angled slightly forward, both brows clearly lowered in a shallow V, half-lidded direct glare, cheeks lightly puffed, tight zigzag or compressed mouth, one small red-brown anger tick near the temple. Annoyed and impatient but still contained. Not focused, not suspicious.

6. EXTREME COMEDIC RAGE / LOSING PATIENCE:
Strong forward squash and facial compression, huge steep inward V brows, narrow furious eyes with tiny locked pupils, flushed cheeks, large angular open shout with ordinary squared teeth, strong jaw tension, prominent red-brown anger-vein symbol and two warm-gray steam puffs. No sweat drops, no round frightened eyes, no raised fear brows. Reads “I am completely done with this package,” funny and explosive but never violent or scary.

7. SUCCESSFUL / SMUG:
Chin lifted, one eyebrow confidently raised, half-lidded pleased eyes looking forward, asymmetric broad side grin, cheek lifted, shoulders open. Add one small golden sparkle near the cap. Proud and playful, not suspicious.

8. FAILED / DEVASTATED:
Head and shoulders visibly slumped, cap brim slightly shadowing the eyes without changing cap design, inner brows lifted and pinched, eyelids collapsed, tiny pupils or eyes squeezed shut, large trembling wavy frown, vertical blue-gray gloom lines and one small pale “soul leaving” curl. Comic defeat, not physical pain, no realistic tears.

Identity lock in every portrait:
- same approved B-based young adult, age 20–25, gender-neutral and youthful
- same face width, jaw, nose, ear placement, neck, and shoulder construction
- same orange cap tilted to the character's left, #F58A3A with #FFAA58 highlight
- exactly one main upward dark-brown hair tuft, hair #49362E
- same thick red-brown eyebrows #9E3F32, varied only by expression
- skin #F2B58E with shadow #D98D69
- same orange warehouse polo, dark undershirt/collar and parcel-shaped chest badge
- warm warehouse comedy flat-cartoon style
- bold smooth warm dark-brown outline #453A35, never pure black
- crisp flat 2D shapes, main color plus one clean shadow layer and tiny highlights, fixed soft top-left light

Composition and text:
- exact 4-by-2 grid with generous equal spacing, no dividers
- all cap tops, hair tufts, ears, chins and shoulders fully inside frame
- plain solid warm-cream background #F6F1E0
- the ONLY text or typography anywhere is exactly three question marks: "???" in the suspicious cell
- no expression labels or numbers

Avoid:
reusing near-identical eyes or mouths across multiple cells, same head tilt in all cells, identity drift, face-shape drift, cap/hair changes, costume changes, hands, props, tape roll, full body, extra characters, duplicate facial features, random symbols, illegible punctuation, logo, watermark, photorealism, anime, 3D rendering, painterly texture, gradients, horror, bloodshot eyes, sharp teeth, violence, or realistic crying.
```

## 专注格定点修订提示词

```text
Use case: precise-object-edit

Asset type: targeted correction to a redesigned eight-expression character sheet.

Input image:
Image 1 is the edit target. It contains exactly eight portraits in a 4-column by 2-row grid.

Primary request:
Preserve the complete image and seven portraits exactly as they are. Edit ONLY TOP ROW, COLUMN 3, the focused/working portrait.

Focused-cell correction:
- keep the existing downward head angle, downward-centered pupils, closed mouth, crop, costume, hair, cap and face identity
- replace the current angry V-shaped eyebrows with two controlled, nearly horizontal eyebrows
- each eyebrow may lower slightly and draw inward by a tiny amount, but neither eyebrow may slope steeply downward toward the nose
- relax the cheek tension and forehead furrow
- keep eyelids evenly narrowed in calm concentration
- expression must read “quietly checking small order details with full attention,” not anger, irritation, suspicion, sadness, or fear
- no anger symbol, no sweat, no punctuation, no smile

Absolute invariants:
Do not modify any other cell, including the exact "???" above the suspicious portrait. Preserve the exact 4-by-2 layout, cream background, colors, line style, all symbols, character identity, sizes and spacing. Keep exactly eight portraits. No new text, labels, numbers, logos, watermark, props, hands or characters.
```

## 位置映射与自检

| 位置 | 表情 | 主要识别组合 |
|---|---|---|
| 上一 | 平静 | 正视、平眉、小幅微笑、平肩 |
| 上二 | 疲惫 | 垂头、重眼睑、内眉抬起、叹气 |
| 上三 | 专注 | 下视、近水平眉、收口、前倾 |
| 上四 | 怀疑 | 高低眉、同向侧视、歪嘴、`???` |
| 下一 | 轻度暴躁 | 浅 V 眉、直视、鼓腮、小怒气符号 |
| 下二 | 极度抓狂 | 强 V 眉、窄眼、怒吼、爆筋、蒸汽 |
| 下三 | 成功得意 | 抬下巴、半眯眼、侧笑、金色闪光 |
| 下四 | 失败崩溃 | 垂头塌肩、闭眼、波浪嘴、阴沉线 |

- 八格的眼罩、视线、嘴型、头部角度和附加符号均有明显差异。
- 怀疑格包含三个清晰、独立的 `???`，画面中无其他文字。
- 专注格在二次修订后使用近水平眉和下视，与轻度暴躁的直视、压眉和怒气符号区分。
- 角色身份锚点、色板和服装结构保持一致。

## 开发者审批

- 审批日期：2026-09-21
- 审批结果：通过。
- 冻结内容：八种情绪的语义、强弱梯度、眉眼嘴组合、头部姿态和漫画符号方案。
- 非冻结内容：当前奶油背景和整页排版不属于运行资源；后续仍需按单格透明底、统一锚点和目标显示尺寸进行清理拆分。
