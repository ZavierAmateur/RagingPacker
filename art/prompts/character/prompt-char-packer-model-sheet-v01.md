# 主角六视图模型表提示词 v01

- 批次：0
- 状态：已被 v02 替代；保留用于追踪胶带佩戴侧修订
- 生成方式：OpenAI `imagegen` 内置模式，使用概念板作为图像参考
- 参考文件：`art/concepts/character/packer/char_packer_direction_board_v001.png`
- 生成文件：`art/concepts/character/packer/char_packer_model_sheet_v001.png`
- 冻结方向：以概念板 B（右上）为基础造型；C（左下）只提供后续表情和动作张力参考

## 最终提示词

```text
Use case: character-model-sheet

Input image: the attached four-direction concept board.
Reference interpretation:
- The TOP-RIGHT character is the ONLY approved base design. Preserve that character's body proportions, angular energetic silhouette, head shape, cap construction, hair shape, shirt and cargo-pants construction, belt, waist tape roll, work shoes, line weight, and palette.
- The BOTTOM-LEFT character is reference ONLY for future comedic facial and gesture intensity. Do not copy its open-mouth expression, giant hands, action pose, sweat drops, or wider body into this neutral turnaround.
- Ignore the top-left and bottom-right designs.

Primary request:
Create a professional 2D game-character turnaround/model sheet for the approved young warehouse packer. Show exactly SIX full-body neutral orthographic views of the SAME character:
1. straight front
2. front-left three-quarter
3. left profile
4. straight back
5. right profile
6. front-right three-quarter

Arrange the six figures in a clean landscape 3-column by 2-row grid, evenly spaced and all at exactly the same scale, with feet aligned within each row. Do not add text or labels. Every view must be fully visible from cap to shoes, with arms resting slightly away from the torso so costume seams and silhouette are readable. Neutral closed-mouth mildly tired expression in all views where the face is visible. No action pose.

Identity lock:
- young adult, 20–25, gender-neutral with slight youthful boyish energy
- exactly 2.5 heads tall, compact but nimble
- orange short-sleeve warehouse polo #F58A3A with dark orange-red #C9572C collar/cuff accents
- dark gray cargo work pants #46545B, same pocket placement in every view
- orange cap tilted to the character's left side, with small highlight #FFAA58; cap tilt and construction must stay consistent in front, side, three-quarter and back views
- one main obvious upward hair tuft from under cap; dark brown hair #49362E, consistent hair mass from every angle
- thick expressive red-brown eyebrows #9E3F32
- subtle healthy tired lower-eye marks
- small parcel-shaped chest badge with no writing; badge appears only when that chest side is visible
- bright yellow tape roll #FFD34E fixed on the character's right waist; its position must rotate correctly around the body and must not mirror randomly
- dark anti-slip work shoes #2F383D, identical construction
- skin #F2B58E, shadow #D98D69

Style lock:
- warm warehouse comedy flat-cartoon style
- crisp flat 2D vector-like illustration
- bold smooth warm dark-brown outline #453A35, never pure black
- simple geometric construction, strong readable silhouette
- main color plus one clean shadow shape and tiny highlight only
- fixed soft light from upper left at about 45 degrees
- production model sheet, consistent volume and anatomy across views
- no gradients, texture, painterly strokes, or 3D rendering

Canvas and constraints:
- plain solid warm-cream background #F6F1E0
- no environment, props, UI, measurements, arrows, text, captions, logos, watermark, contact shadows, perspective camera, facial-expression variations, action gestures, sweat drops, duplicate limbs, cropped figures, or extra characters
- the straight-back view must genuinely show the back of the head, cap, shirt, pants and shoes, with no face visible
- left and right profiles must be true opposite profiles, not duplicated three-quarter views
- maintain exact costume details and character identity in all six views.
```

## 本轮检查

- 已包含正面、背面、左右侧面和左右三分之四视角，共六个完整人物。
- 角色身份锁、服装轮廓、包裹工牌、歪帽和腰间胶带基本一致。
- 胶带固定在角色右腰，背面与侧面视角中的屏幕位置会随转身变化。
- 无文字、Logo、水印、场景和额外角色。
- 当前为概念模型表；通过视觉确认后才可作为后续表情表的角色母版，正式拆件仍需透明底清理稿。

## 修订说明

- 本稿将腰间胶带画在了角色左腰，与批准的 B 方案不一致。
- 已在 `prompt-char-packer-model-sheet-v02.md` 中定点修正；评审应使用 `char_packer_model_sheet_v002.png`。
