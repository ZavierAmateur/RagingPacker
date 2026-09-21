# 空玻璃杯单品候选 V1

## 状态

- 当前状态：`ready_for_import`，尚未实际导入 FairyGUI/Cocos
- 生成方式：OpenAI ImageGen，内置模式
- 风格依据：`art/concepts/item/item_style_sample_board_v001.png`（Item Style Master V1）
- 原始生成图：`art/ai-raw/item/item_glass_empty_raw_v001.png`
- 透明母图：`art/concepts/item/individual/item_glass_empty_v001.png`
- 尺寸预览：
  - `art/previews/item/item_glass_empty/item_glass_empty_256.png`
  - `art/previews/item/item_glass_empty/item_glass_empty_128.png`
  - `art/previews/item/item_glass_empty/item_glass_empty_96.png`
  - `art/previews/item/item_glass_empty/item_glass_empty_90.png`

## 生成说明

ImageGen 直接输出了带透明通道和半透明杯体的 RGBA 图像，因此没有执行绿幕抠图，也没有对主体轮廓进行二次绘制。1024 像素母图由原始结果等比缩放得到。

## 最终提示词

```text
Use case: stylized-concept

Asset type: individual 1024 × 1024 game-item master candidate for Item Style Master V1.

Input image:
Image 1 is the approved five-item style board.
Use ONLY the FOURTH object, the empty transparent drinking glass, as the exact design and style reference. Ignore the other four items. Preserve its short wide cylindrical tumbler silhouette, elliptical rim, thick base, pale blue transparent material, bold blue-gray contour and casual-game simplification.

Primary request:
Create one single original EMPTY TRANSPARENT DRINKING GLASS item sprite candidate:
- short wide straight-sided tumbler, slightly wider at the top, not a wine glass and no stem
- upright front three-quarter view with a slight top-down angle so the inner opening is visible
- perfectly empty: no water, no ice, no straw, no garnish
- large clean elliptical top rim with a clearly visible inner ellipse
- thick rounded glass wall and one thick oval base ring
- pale icy-blue transparent body with restrained semi-transparent fill
- bold cool blue-gray outer contour #405866, equivalent to 10–14 px at 1024
- one hard-edged pale-blue vertical shadow band on the right
- two narrow hard-edged white highlight strips on the upper-left/front wall
- a darker blue-gray ellipse at the bottom to define the base, but no cast shadow
- the open center and body must remain visibly translucent rather than filled with solid blue or white
- no handle, no label, no writing, no logo, no brand, no cracks, no reflection of other objects

Composition:
- square 1024-style canvas
- subject occupies 66%–74% of the canvas
- at least 12% safe padding on every side
- centered by visual mass, fully visible, no crop
- no floor plane, cast shadow or contact shadow

Transparent-output workflow:
Create the glass isolated on a transparent background if the built-in generator can provide alpha directly. If a backdrop must be used, use a perfectly flat solid #FF00FF chroma-key background, one uniform color with no shadows, gradients, texture, reflections, floor plane, halo or lighting variation.
Do not use #FF00FF or similar magenta anywhere in the glass.
Keep crisp antialiased outer edges and preserve controlled semi-transparency inside the glass silhouette.

Style lock:
- warm warehouse comedy flat cartoon
- clean 2D game sprite, not a product rendering
- thick outline, chunky friendly shape
- simple hard-edged color blocks and graphic transparency cues
- fixed upper-left 45-degree light
- no photorealistic refraction, realistic caustics, smooth airbrush gradients, glossy 3D rendering, anime, painterly texture or noise
- must remain readable at 90 × 90.
```

## 候选检查

- 1024 × 1024，RGBA，具有透明通道
- 四角完全透明，杯体内部保留受控半透明像素；中心采样 Alpha 为 214
- 主体完整，没有裁切，四周保留安全边距
- 杯口内外椭圆、透明杯壁、竖向高光与厚杯底在 90 × 90 下仍可辨认
- 无液体、冰块、吸管、文字、品牌、Logo 或水印
- 开发者视觉验收、统一技术 QA 与官方条款核验已通过；运行预览仍待导入后完成
