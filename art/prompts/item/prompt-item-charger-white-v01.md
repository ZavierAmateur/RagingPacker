# 白色充电头单品候选 V1

## 状态

- 当前状态：候选，等待开发者视觉验收
- 生成方式：OpenAI ImageGen，内置模式
- 风格依据：`art/concepts/item/item_style_sample_board_v001.png`（Item Style Master V1）
- 原始生成图：`art/ai-raw/item/item_charger_white_raw_v001.png`
- 透明母图：`art/concepts/item/individual/item_charger_white_v001.png`
- 尺寸预览：
  - `art/previews/item/item_charger_white/item_charger_white_256.png`
  - `art/previews/item/item_charger_white/item_charger_white_128.png`
  - `art/previews/item/item_charger_white/item_charger_white_96.png`
  - `art/previews/item/item_charger_white/item_charger_white_90.png`

## 生成说明

ImageGen 直接输出了带透明通道的 RGBA 图像，因此没有执行绿幕抠图，也没有对主体轮廓进行二次绘制。1024 像素母图由原始结果等比缩放得到。

## 最终提示词

```text
Use case: stylized-concept

Asset type: individual 1024 × 1024 game-item master candidate for Item Style Master V1.

Input image:
Image 1 is the approved five-item style board.
Use ONLY the THIRD object, the white wall charger, as the exact design and style reference. Ignore the other four items. Preserve its compact chunky rounded-square body, front-facing three-quarter view, two metal prongs, orange USB port, blue indicator, bold outline, warm off-white palette and casual-game simplification.

Primary request:
Create one single original WHITE WALL CHARGER item sprite candidate:
- compact squat rounded-square charger body, visibly thick and friendly, not tall or slim
- front face aimed toward the viewer in a left-front three-quarter view with a slight top-down angle
- exactly two parallel flat metal plug prongs emerging upward from the back/top, both fully visible and separated
- warm off-white #F4F0E7 main front face
- one hard-edged light-gray side/shadow plane on the right and bottom
- one small hard-edged pure-white highlight on the upper-left bevel only
- exactly one horizontal rectangular USB-A port centered in the lower half of the front face
- USB port has a dark charcoal rim and a vivid orange #F47A20 interior
- exactly one small circular blue indicator above the USB port
- bold smooth cool dark-gray outline #34424A, equivalent to 10–14 px at 1024
- no cable, no phone, no socket, no wall, no writing, no number, no logo, no brand, no extra port, no extra indicator, no extra prong

Composition:
- square 1024-style canvas
- subject occupies 68%–76% of the canvas, including the prongs
- at least 10% safe padding on every side
- centered by visual mass, fully visible, no crop
- no cast shadow or contact shadow

Transparent-output workflow:
Create the charger on a perfectly flat solid #00FF00 chroma-key background for background removal.
The entire background must be exactly one uniform green color with no shadows, gradients, texture, reflections, floor plane, halo or lighting variation.
Do not use #00FF00 or any similar bright green anywhere in the charger.
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
- 主体与两根插脚完整，没有裁切，四周保留安全边距
- 无文字、品牌、Logo、水印、电线或多余接口
- 双插脚、蓝色指示灯和橙色 USB-A 口在 90 × 90 下仍可辨认
- 当前仅为概念候选；通过视觉验收后，才标记为正式冻结版本
