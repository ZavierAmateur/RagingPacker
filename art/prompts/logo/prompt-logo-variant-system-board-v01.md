# Logo 变体系统板生成记录 v01

## 目标

基于已批准的 Logo v002，验证同一视觉身份在以下五类交付中的可行性：

1. 横版。
2. 叠放版。
3. 方形版。
4. 纯图形符号。
5. 深色与浅色单色版。

## 状态与边界

- 状态：`style_approved`（开发者于 2026-09-21 确认“OK的，这次好很多了”）。
- 本图用于版式、比例与信息层级评审，不是可直接导入的运行资源。
- 中文字形仍需人工逐字校对并以矢量方式重建。
- 单色版最终必须使用真实单色路径重建，不得把彩色位图简单灰度化。

## 文件

- 原始输出：`art/ai-raw/logo/logo_variant_system_board_raw_v001.png`
- 评审稿：`art/concepts/logo/logo_variant_system_board_v001.png`
- 已批准母版：`art/concepts/logo/logo_c_base_b_character_v002.png`
- 角色身份参考：`art/concepts/character/packer/char_packer_model_sheet_v002.png`

## 生成方式

- 模式：ImageGen，多参考图生成。
- 用例：`logo-brand`。
- 日期：2026-09-21。

## 完整提示词

Use case: logo-brand

Asset type: visual-system concept board for the approved “暴躁打包员” game logo

Input images:
- Image 1 is the approved master composition. Treat its C-based conveyor-belt wordmark and B-based character-over-logo pose as locked visual identity.
- Image 2 is the locked character identity reference. Preserve the same cap, hair, eyebrows, face, orange uniform and mildly irritated personality. Do not redesign the worker.

Primary request: build one clean professional logo-variant presentation board that demonstrates exactly five coordinated applications of the approved identity:
1. Primary horizontal version: the full approved title, worker leaning over it, parcels and conveyor underline.
2. Compact stacked version: title arranged in two balanced rows, character and compact conveyor retained, suitable for narrower spaces.
3. Square version: a compact near-square lockup suitable for store tiles and launch-screen placement; readable title remains dominant.
4. Pure graphic symbol: no words; combine the established worker head and hands with one parcel and a short conveyor/tape motif, preserving a strong square silhouette.
5. Monochrome proof: show the horizontal logo twice as simplified solid-color silhouettes, one dark ink version on a light swatch and one warm-white version on a dark swatch; preserve readable forms without gradients.

Scene/backdrop: warm cream design-board background, generous margins, neat two-row grid, each variant isolated with consistent spacing. No environmental scene.

Style/medium: vector-friendly 2D flat-cartoon identity system, thick consistent dark outline, simplified geometry, crisp edges, restrained shading, warm warehouse comedy.

Color palette for full-color versions: orange #F58A3A, deep orange #C9572C, yellow #FFD34E, cardboard brown #D6A257, industrial gray #697577, dark #2F383D, complaint red #E75353, warm white #FFFBEF.

Text (verbatim): “暴躁打包员”

Typography: whenever the title is present, render exactly the five Chinese characters “暴躁打包员” once and in this exact order. Keep chunky rounded custom forms, slight forward motion, red-orange “暴躁”, yellow-orange “打包”, warm-white “员”, consistent dark outline.

Composition constraints: all five variants must feel like the same logo family; keep the conveyor-speed foundation; character supports rather than dominates the wordmark; the pure symbol contains absolutely no letters or words; the monochrome proof uses no grayscale shading.

Constraints: original design only; presentation board only; no extra wording, no English, no captions, no numbered labels, no subtitle, no platform mockups, no watermark. Maintain strong silhouettes that could later be manually rebuilt as vector artwork.

Avoid: new mascot design, generic child, character identity drift, repeated faces, unrelated icons, thin detail, tiny text, invented Chinese characters, photorealism, 3D bevel, glossy rendering, anime styling, watercolor, excessive effects.
