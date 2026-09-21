# 启动图角色动作透明前景层生成记录 v01

## 目标

从已批准的启动图合并视觉中提取可独立叠加的角色/动作组，与纯背景、Logo 和运行时加载 UI 分层组合。

## 包含元素

1. 主角角色。
2. 黄色胶带卷与短胶带条。
3. 角色手下的中央包裹。
4. 白色冒气符号及尾部短线。
5. 右上倾斜包裹。
6. 倾斜包裹上方的橙色警示符号。

## 状态与边界

- 状态：`style_approved`（开发者于 2026-09-21 明确确认）。
- ImageGen 实际直接返回 941 × 1672 RGBA PNG，四角 alpha=0；未执行色键移除。
- 原始输出的主体内部大部分 alpha 为 224～254，因此执行一次 alpha 归一化：`<=12 → 0`、`>=220 → 255`、中间区间线性映射，用于清理极低残留并保持边缘抗锯齿。
- 归一化后原生透明层 alpha 范围为 0～255；1500 × 2668 版本四角均为透明，主体内部为不透明，边缘保留少量半透明抗锯齿像素。
- 1500 × 2668 与 750 × 1334 文件为按计划规格重采样版本。
- 当前未进入 `art/final/`；背景与前景合成已验收，但尚未与 Logo、加载 UI 完成最终组合验收。

## 文件

- 原始 RGBA 输出：`art/ai-raw/ui/launch/ui_launch_fg_action_raw_v001.png`
- alpha 归一化原生层：`art/concepts/ui/launch/ui_launch_fg_action_native_v001.png`
- 1500 × 2668 透明层候选：`art/concepts/ui/launch/ui_launch_fg_action_1500x2668_v001.png`
- 750 × 1334 透明层预览：`art/previews/ui/launch/v002/ui_launch_fg_action_750x1334_v001.png`
- 1500 × 2668 合成 QA 图：`art/previews/ui/launch/v002/ui_launch_layer_composite_1500x2668_v001.png`
- 750 × 1334 合成预览：`art/previews/ui/launch/v002/ui_launch_layer_composite_750x1334_v001.png`

## 生成方式

- 模式：内置 ImageGen，多参考图背景提取。
- 用例：`background-extraction`。
- 日期：2026-09-21。
- 后处理：Codex 工作区内置 Python/Pillow，仅进行 alpha 归一化与背景/前景合成 QA；未重绘 RGB 内容。

## 完整提示词

Use case: background-extraction

Asset type: full-canvas character-and-action foreground layer for the approved vertical launch screen

Input images:
- Image 1 is the approved composite reference and defines the exact foreground design and placement.
- Image 2 is the approved clean background layer and defines everything that must be excluded from this foreground output.

Primary request: recreate only the foreground action elements that are present in Image 1 but absent from Image 2, on a perfectly flat solid #00ff00 chroma-key background. Include exactly:
1) the established worker character, from cap and hair through torso, arms and hands;
2) the yellow tape roll held in the worker's left-side hand and the short visible tape strip;
3) the central taped cardboard parcel under the worker's hands;
4) the white steam-puff comic symbol with its two small trailing marks;
5) the single tilted/falling cardboard parcel at upper-right;
6) the three orange warning rays above that tilted parcel.

Placement and scale: preserve the same full 941×1672 portrait canvas and match Image 1's relative positions, scale and orientation. Keep the top 24% empty except for green background. The worker/central parcel group stays in the middle-lower portion exactly as in Image 1. The tilted parcel remains at upper-right below the logo safe zone. Do not crop any included foreground element.

Identity and style: preserve the exact approved character identity, irritated sideways glance, orange crooked cap, dark brown hair, orange polo, thick dark outlines, simplified flat-cartoon geometry, warm palette and restrained two-step shading from Image 1.

Chroma background requirement: the background must be one perfectly uniform #00ff00 color with no gradient, texture, lighting variation, floor, wall, shelf, plant, table, cast shadow, contact shadow or reflection. Do not use #00ff00 anywhere inside the foreground subjects. Keep crisp opaque silhouettes and generous clean separation from the green background.

Text: none.

Constraints: include only the six specified foreground elements; no environment; no logo; no loading UI; no extra parcels; no extra symbols; no new pose; no redesigned hands; no watermark.

Avoid: retained background fragments, green spill inside subjects, soft shadow on green, halo, transparency simulation, checkerboard background, new props, character identity drift, photorealism, 3D rendering.
