# 启动图纯背景层生成记录 v01

## 目标

从已批准的启动图合并视觉稿中移除角色/动作组，补全被遮挡的环境，得到可承载独立角色、Logo 和运行时加载 UI 的纯背景层。

## 状态与边界

- 状态：`style_approved`（开发者于 2026-09-21 确认进入下一步）。
- 已移除角色、胶带、中央动作包裹、冒气符号、右上倾斜包裹和警示符号。
- 保留窗光、墙面、公告板、货架、绿植、静态背景包裹、操作台、前景侧边包裹和底部橙色地毯。
- ImageGen 原生稿为 941 × 1672 RGB PNG。
- 1500 × 2668 候选母版和 750 × 1334 预览为按计划规格重采样版本。
- 当前仍在 `art/concepts/`；角色/动作层已形成候选，但完整启动图尚未组合验收，不得标记为 `ready_for_import`。

## 文件

- 原始输出：`art/ai-raw/ui/launch/ui_launch_bg_empty_raw_v001.png`
- 原生尺寸候选：`art/concepts/ui/launch/ui_launch_bg_empty_native_v001.png`
- 1500 × 2668 候选母版：`art/concepts/ui/launch/ui_launch_bg_empty_1500x2668_v001.png`
- 750 × 1334 评审预览：`art/previews/ui/launch/v002/ui_launch_bg_empty_750x1334_v001.png`
- 编辑目标：`art/concepts/ui/launch/ui_launch_a_base_b_comedy_native_v002.png`

## 生成方式

- 模式：内置 ImageGen，单图精确编辑。
- 用例：`precise-object-edit`。
- 日期：2026-09-21。

## 完整提示词

Use case: precise-object-edit

Asset type: background-only layer for the approved vertical launch screen

Input image:
- Image 1 is the approved launch-screen composite and the edit target.

Primary request: remove the entire foreground action group so the result is a clean empty parcel-station background layer. Remove only:
1) the worker character, including cap, hair, face, body, arms and hands;
2) the yellow tape roll and any tape attached to it;
3) the central parcel directly under the worker's hands;
4) the white steam-puff comic symbol near the worker;
5) the single tilted/falling parcel at upper-right and its orange warning rays.

Reconstruct every newly exposed area naturally and seamlessly: continue the cream wall and sunbeam behind the character, complete the notice board if exposed, continue the back counter/conveyor, restore the full clean wooden packing-table surface where the central parcel and hands were, and restore the right shelf behind the removed tilted parcel.

Locked invariants: preserve the exact 941×1672 portrait framing, camera angle, top empty logo-safe area, bottom quiet floor/loading-safe area, left window and outdoor view, all plants, shelves, notice board, stationary background boxes, orange storage bin, pen cup, foreground side boxes, wooden table, orange floor mat, lighting, palette, line thickness and flat-cartoon style. Do not move, redesign, recolor, crop or add decoration to any retained element.

Layer intent: this image must contain environment only and serve as the full-bleed background beneath separately composited character/action, logo and runtime loading UI layers.

Text: none.

Constraints: no person, no body parts, no tape roll, no central action parcel, no falling parcel, no comic symbols, no logo, no loading text, no progress bar, no privacy button, no version number, no watermark.

Avoid: new props, empty black/transparent holes, blurred inpainting, mismatched perspective, different shelf geometry, identity remnants, extra boxes, photorealism, 3D rendering.
