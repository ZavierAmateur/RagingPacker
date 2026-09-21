# 黑色手机单品候选 V1

## 状态

- 当前状态：候选，等待开发者视觉验收
- 生成方式：OpenAI ImageGen，内置模式
- 风格依据：`art/concepts/item/item_style_sample_board_v001.png`（Item Style Master V1）
- 原始生成图：`art/ai-raw/item/item_phone_black_raw_v001.png`
- 透明母图：`art/concepts/item/individual/item_phone_black_v001.png`
- 尺寸预览：
  - `art/previews/item/item_phone_black/item_phone_black_256.png`
  - `art/previews/item/item_phone_black/item_phone_black_128.png`
  - `art/previews/item/item_phone_black/item_phone_black_96.png`
  - `art/previews/item/item_phone_black/item_phone_black_90.png`

## 生成说明

ImageGen 直接输出了带透明通道的 RGBA 图像，因此没有执行绿幕抠图，也没有对主体轮廓进行二次绘制。1024 像素母图由原始结果等比缩放得到。

## 最终提示词

```text
Use case: stylized-concept

Asset type: individual 1024 × 1024 game-item master candidate for Item Style Master V1.

Input image:
Image 1 is the approved five-item style board.
Use ONLY the SECOND object, the black smartphone, as the exact design and style reference. Ignore the other four items. Preserve the second phone's thick compact rounded-rectangle silhouette, back-facing left-front three-quarter view, large rounded-square camera island, outline weight, dark charcoal palette and casual-game simplification. Remove the meaningless pale square on the upper-right of its back; the phone back must otherwise remain clean.

Primary request:
Create one single original BLACK SMARTPHONE item sprite candidate:
- back-facing, upright, left-front three-quarter view with a slight top-down angle
- compact thick rounded-rectangle body, slightly squarer and heavier than the blue phone
- charcoal-black #343B43 main back face, clearly lighter than the outer outline
- one hard-edged darker side/shadow plane along the right and lower edge
- one small hard-edged cool-gray highlight along the upper-left rim only
- large rounded-square dark camera island at the upper-left
- exactly three large circular lenses arranged as two on the left and one on the lower-right
- exactly one small warm-yellow flash circle at the upper-right of the camera island
- one small rectangular side button
- bold smooth cool near-black outline #25313A, equivalent to 10–14 px at 1024
- no screen, no UI, no writing, no number, no logo, no brand, no decorative square, no extra camera, no extra flash, no extra button

Composition:
- square 1024-style canvas
- subject occupies 74%–80% of the canvas
- at least 10% safe padding on every side
- centered by visual mass, fully visible, no crop
- no cast shadow or contact shadow

Transparent-output workflow:
Create the phone on a perfectly flat solid #00FF00 chroma-key background for background removal.
The entire background must be exactly one uniform green color with no shadows, gradients, texture, reflections, floor plane, halo or lighting variation.
Do not use #00FF00 or any similar bright green anywhere in the phone.
Keep crisp antialiased object edges and generous padding.

Style lock:
- warm warehouse comedy flat cartoon
- clean 2D sprite, not a product rendering
- thick outline, chunky friendly shape
- flat main color + exactly one hard-edged shadow block + one tiny highlight
- fixed upper-left 45-degree light
- no smooth gradient, glossy reflection, bevel rendering, airbrush, photorealism, 3D render, anime, painterly texture or noise
- must remain readable at 90 × 90.
```

## 候选检查

- 1024 × 1024，RGBA，具有透明通道
- 主体完整，没有裁切，四周保留安全边距
- 无文字、品牌、Logo、水印或多余装饰方块
- 三镜头方形相机岛、黄色闪光灯和深色机身在 90 × 90 下仍可辨认
- 当前仅为概念候选；通过视觉验收后，才标记为正式冻结版本
