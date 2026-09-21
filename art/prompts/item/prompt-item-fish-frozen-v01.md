# 冰鲜鱼单品候选 V1

## 状态

- 当前状态：候选，等待开发者视觉验收
- 生成方式：OpenAI ImageGen，内置模式
- 风格依据：`art/concepts/item/item_style_sample_board_v001.png`（Item Style Master V1）
- 原始生成图：`art/ai-raw/item/item_fish_frozen_raw_v001.png`
- 透明母图：`art/concepts/item/individual/item_fish_frozen_v001.png`
- 尺寸预览：
  - `art/previews/item/item_fish_frozen/item_fish_frozen_256.png`
  - `art/previews/item/item_fish_frozen/item_fish_frozen_128.png`
  - `art/previews/item/item_fish_frozen/item_fish_frozen_96.png`
  - `art/previews/item/item_fish_frozen/item_fish_frozen_90.png`

## 生成说明

ImageGen 直接输出了带透明通道的 RGBA 图像，因此没有执行绿幕抠图，也没有对主体轮廓进行二次绘制。1024 像素母图由原始结果等比缩放得到。

## 最终提示词

```text
Use case: stylized-concept

Asset type: individual 1024 × 1024 game-item master candidate for Item Style Master V1.

Input image:
Image 1 is the approved five-item style board.
Use ONLY the FIFTH object, the frozen fish, as the exact design and style reference. Ignore the other four items. Preserve its chunky left-facing fish silhouette, cool blue-gray back, warm pale belly, closed eye, three brown diagonal body marks, large graphic ice crystals, bold dark outline and humorous casual-game simplification.

Primary request:
Create one single original FROZEN FISH item sprite candidate:
- whole intact fish shown in a left-facing side view with a slight three-quarter/top-down angle
- head on the left, forked tail on the right, body tilted gently upward toward the tail
- chunky compact body with an oversized rounded head and clear tail silhouette
- cool desaturated blue-gray #7895A3 upper body
- warm pale cream #E9D9AF lower belly
- one hard-edged darker blue-gray shadow plane along the lower-left/head and fins
- one small hard-edged pale-blue highlight on the upper back
- exactly one closed curved eye and one simple downturned mouth, giving a harmless sleepy/deadpan expression
- exactly three broad warm-brown diagonal marks across the middle body
- one dorsal fin, one lower fin and one clear forked tail, all readable and attached naturally
- four or five large pale icy-blue diamond-shaped ice crystals distributed across the body; use only large graphic crystals, no tiny snow speckles
- bold smooth cool dark-gray outline #34424A, equivalent to 10–14 px at 1024
- no blood, no gore, no exposed flesh, no hook, no plate, no packaging, no water splash, no writing, no number, no logo, no brand

Composition:
- square 1024-style canvas
- fish occupies 80%–86% of the canvas width and 52%–62% of the canvas height
- at least 8% safe padding on every side
- centered by visual mass, fully visible, no crop
- no floor plane, cast shadow or contact shadow

Transparent-output workflow:
Create the fish on a perfectly flat solid #00FF00 chroma-key background for background removal.
The entire background must be exactly one uniform green color with no shadows, gradients, texture, reflections, floor plane, halo or lighting variation.
Do not use #00FF00 or any similar bright green anywhere in the fish.
Keep crisp antialiased object edges and generous padding.

Style lock:
- warm warehouse comedy flat cartoon
- clean 2D game sprite, not a realistic seafood illustration
- thick outline, chunky friendly shape
- flat main colors + one hard-edged shadow block + one tiny highlight
- fixed upper-left 45-degree light
- no smooth gradient, glossy reflection, photorealism, realistic scales, wet slime, 3D render, anime, painterly texture or noise
- must remain readable at 90 × 90.
```

## 候选检查

- 1024 × 1024，RGBA，具有透明通道
- 主体完整，没有裁切，四周保留安全边距
- 头朝左、尾朝右，闭眼和嘴型清楚
- 三条棕色斜纹与五枚大冰晶数量明确，在 90 × 90 下仍可辨认
- 无血腥、鱼钩、餐盘、包装、文字、品牌、Logo 或水印
- 当前仅为概念候选；通过视觉验收后，才标记为正式冻结版本
