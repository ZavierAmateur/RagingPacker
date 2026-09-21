# 启动图三方向生成记录 v01

## 目标

比较《暴躁打包员》启动图的三种竖版构图。方向确定后，再按 1500 × 2668 母版和 750 × 1334 基准预览单独生成并拆分交付。

## 候选

- A：清晨开工。角色在打包台后封箱，空间整洁，顶部和底部安全区最清楚。
- B：包裹爆仓。角色被包裹堆包围并接住倾斜纸箱，喜剧压力最强。
- C：传送带冲刺。角色追赶传送带上的包裹，动作线和纵深最强。

## 状态与边界

- 状态：`direction_selected`（开发者于 2026-09-21 确认“以 A 为基础，少量吸收 B 的喜感”）。
- 后续方向：保留 A 的清晰安全区和稳定打包台构图，只吸收 B 的单个倾斜包裹与克制喜剧反应。
- 方向板为 1536 × 1024 RGB PNG，仅用于三方向比较。
- 三个候选内部均不包含 Logo、加载文字、进度条、隐私按钮或版本号。
- 顶部约 20%～25% 为后续独立 Logo 层预留空间；底部保留运行时加载 UI 的叠加意图。
- 方向选定后必须重新生成 1500 × 2668 单图，不得从方向板裁切放大冒充母版。

## 文件

- 原始输出：`art/ai-raw/ui/launch/ui_launch_direction_board_raw_v001.png`
- 评审稿：`art/concepts/ui/launch/ui_launch_direction_board_v001.png`
- 角色参考：`art/concepts/character/packer/char_packer_model_sheet_v002.png`
- 场景参考：`art/concepts/scene/community/scene_community_day_master_1500x2668_v001.png`
- Logo 系统参考：`art/concepts/logo/logo_variant_system_board_v001.png`

## 生成方式

- 模式：内置 ImageGen，多参考图生成。
- 用例：`stylized-concept`。
- 日期：2026-09-21。

## 完整提示词

Use case: stylized-concept

Asset type: three-direction portrait launch-screen concept board for the Chinese casual game “暴躁打包员”

Input images:
- Image 1: locked character identity reference. Preserve the orange crooked cap, dark brown hair tuft, thick eyebrows, half-lidded mildly irritated eyes, orange work polo, dark cargo trousers and sturdy work boots.
- Image 2: approved community parcel-station environment and lighting reference. Preserve the warm warehouse-comedy atmosphere, side-window daylight, small amount of greenery, packing tables, shelves and parcels.
- Image 3: approved logo-system style reference. Match its thick dark outline, simplified flat-cartoon rendering and warm orange/yellow/cream/industrial-gray palette. Do not bake the logo artwork into the launch-background concepts.

Primary request: create one clean landscape presentation board containing exactly three tall portrait launch-screen concepts arranged left to right. Each portrait must approximate the 750:1334 ratio and be identified only by a small plain Latin letter A, B or C outside the image panel. The artwork inside each panel contains no text. Reserve a clean, uncluttered top area of roughly 20%–25% for the separately layered game logo.

Direction A — “morning shift begins”: stable hero composition. The worker stands behind a packing table in the lower-middle, one hand pressing a box and the other holding the tape roll, mildly annoyed but ready to work. Warm side-window morning light, organized shelves, a small plant, inviting community parcel station. Calmest and clearest direction.

Direction B — “parcel pile crisis”: comedic vertical pressure. The worker is in the lower-middle with a tape roll, surrounded by a rising but readable pile of parcels on both sides; one parcel tilts overhead and the worker looks irritated. Keep a clean top logo zone despite the parcel stack. Busy but controlled, funny rather than dangerous.

Direction C — “conveyor sprint”: dynamic diagonal composition. A conveyor rises diagonally from the lower foreground toward the middle with one parcel moving away; the worker leans forward trying to catch or tape it, creating a strong upward motion path. Background shelves and window remain simple; strongest arcade energy.

Scene/backdrop: community parcel station interior only, no exterior street. Warm daylight with cream walls, orange-brown boxes, industrial-gray conveyor/shelves and a few green plant accents.

Style/medium: original 2D exaggerated flat-cartoon game illustration, thick consistent dark outlines, simplified geometric forms, bright warm colors, restrained two-step shading, humorous and cute.

Composition/framing: each panel is a complete portrait composition with top logo safe zone, main character and action in the middle/lower area, and a quiet bottom strip where runtime loading UI could later overlay. Respect mobile safe zones; critical face and hands must not touch edges.

Layering intent: background, character/action group, separately overlaid logo, and runtime loading UI must remain conceptually separable.

Text: none inside panels.

Constraints: exactly three portrait candidates; one established worker per panel; no baked game logo; no loading text; no progress bar; no privacy button; no version number; no phone frame; no platform UI; no watermark; no real brands.

Avoid: character identity drift, generic child, different uniform, extra people, dense tiny parcels, photorealism, 3D render, anime, watercolor, glossy effects, dark horror mood, cash-reward imagery.
