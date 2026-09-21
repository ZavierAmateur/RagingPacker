# 游戏图标 B 方向母版生成记录 v01

## 目标

基于已批准的 B 方向重新生成独立正方形图标，不使用方向板的低分辨率裁图放大冒充母版。

## 状态与验收边界

- 状态：`ready_for_import`（开发者于 2026-09-21 确认进入下一步）。
- 成功生成的原生修订稿为 1254 × 1254 RGB PNG；通过 `sips` 重采样得到 2048 × 2048 候选母版。
- 2048 文件是尺寸交付候选，不伪称 ImageGen 原生 2048 输出。
- 已导出 256/128/64/48 像素预览；48 像素下人物脸、黄色胶带和纸箱仍可区分。
- 正式源资产：`art/final/icon/icon_app.png`。
- 已通过源文件技术 QA；尚未导入 FairyGUI/Cocos，也未进行平台提交测试。

## 文件

- 首次原始生成：`art/ai-raw/icon/icon_app_b_master_raw_v001.png`
- 完整方形底图修订稿：`art/ai-raw/icon/icon_app_b_master_fullbleed_raw_v002.png`
- 2048 候选母版：`art/concepts/icon/icon_app_b_master_2048_v001.png`
- 多尺寸预览：`art/previews/icon/master_v001/`
- 已批准方向：`art/previews/icon/direction_v001/icon_direction_b_256.png`

## 生成方式

- 模式：内置 ImageGen，多参考图生成后进行一次局部背景修订。
- 用例：`logo-brand`，修订步骤为 `precise-object-edit`。
- 日期：2026-09-21。
- 运行备注：前两次请求在参考图发送阶段发生网络错误；缩小角色参考图并减少非必要参考后成功，未切换模型或降级生成路径。

## 成功生成提示词

Use case: logo-brand

Asset type: standalone high-resolution 1:1 game-app-icon master concept for “暴躁打包员”

Input images:
- Image 1: approved B icon composition. Lock the action and layout: three-quarter worker close-up, raised bright-yellow tape roll, one sweeping diagonal tape ribbon, one foreground parcel.
- Image 2: locked character identity. Preserve orange crooked cap, dark-brown hair tuft, thick eyebrows, half-lidded mildly irritated eyes, face proportions and orange work polo.

Primary request: newly render one polished square icon at high resolution; do not enlarge or copy the small reference crop. Exactly one worker, one tape roll and one parcel. The raised hand holds the tape roll near upper-left/center; the other hand pulls a single broad yellow tape ribbon to the right and across the parcel. Mildly annoyed, focused expression.

Backdrop: full-bleed orange warehouse graphic with very simplified shelf silhouettes and a soft radial burst, always secondary.

Style: original vector-friendly 2D flat cartoon, thick consistent dark outline, crisp shapes, restrained two-step shading, warm warehouse comedy.

Composition: exact square, sharp canvas corners, subject fills about 75%, at least 8% safety margin around face and hands. The four dominant readable shapes are face, tape roll, yellow ribbon and parcel. Designed to remain clear at 48×48.

Palette: #F58A3A, #C9572C, yellow #FFD34E, cardboard #D6A257, cream #F6F1E0, gray #697577, outline #2F383D, tiny accent #E75353.

Text: none.

Constraints: preserve B composition and character identity; no extra parcels/tools/tape ribbons; no title, letters, numbers, platform mark, notification badge, watermark, device mockup, external frame or baked rounded-corner mask.

Avoid: hand clutter, thin lines, dense shelves, generic child, identity drift, different clothes, photorealism, 3D bevel, gloss, anime, watercolor, trademarks.

## 完整方形底图修订提示词

Use case: precise-object-edit

Asset type: square game-app-icon master cleanup

Input image: Image 1 is the edit target.

Primary request: change only the outer background edges and corners. Extend the existing orange warehouse background and soft radial burst cleanly to all four canvas edges and all four square corners, producing a complete full-bleed rectangular background with no transparent pixels, black gaps, ragged halo, colored noise or unfinished border.

Locked invariants: keep the worker identity, face, expression, cap, hair, clothing, pose, both hands, yellow tape roll, single tape ribbon, cardboard parcel, white motion marks, linework, colors, proportions, cropping and exact composition unchanged. Do not redraw, reposition, add or remove any foreground element.

Canvas: preserve exact 1:1 square format and sharp square corners. Do not add a rounded-corner mask or external frame.

Text: none.

Constraints: no new objects, no extra parcels, no extra tools, no watermark, no platform badge, no notification dot.
