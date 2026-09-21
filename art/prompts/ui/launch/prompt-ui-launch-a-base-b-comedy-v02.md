# 启动图 A+B 合并稿生成记录 v02

## 已选方向

- 以 A“清晨开工”为基础。
- 少量吸收 B“包裹爆仓”的喜感。
- 具体控制为：只增加一个倾斜包裹、一个警示符号和角色克制的侧目/冒气反应，不形成包裹雪崩。

## 状态与边界

- 状态：`style_approved`（开发者于 2026-09-21 明确确认）。
- ImageGen 原生稿为 941 × 1672 RGB PNG。
- 1500 × 2668 候选母版和 750 × 1334 基准预览由原生稿按目标规格重采样生成，不伪称原生尺寸。
- 图中未烘焙 Logo、加载文字、进度条、隐私按钮或版本号。
- 当前为已批准的合并视觉基准；正式交付仍需拆分背景、角色/动作、Logo 与运行时加载 UI 的职责。

## 文件

- 原始输出：`art/ai-raw/ui/launch/ui_launch_a_base_b_comedy_raw_v002.png`
- 原生尺寸概念稿：`art/concepts/ui/launch/ui_launch_a_base_b_comedy_native_v002.png`
- 1500 × 2668 候选母版：`art/concepts/ui/launch/ui_launch_a_base_b_comedy_1500x2668_v002.png`
- 750 × 1334 基准预览：`art/previews/ui/launch/v002/ui_launch_a_base_b_comedy_750x1334_v002.png`
- 上游方向板：`art/concepts/ui/launch/ui_launch_direction_board_v001.png`

## 生成方式

- 模式：内置 ImageGen，多参考图生成。
- 用例：`stylized-concept`。
- 日期：2026-09-21。

## 完整提示词

Use case: stylized-concept

Asset type: standalone portrait launch-screen master concept for “暴躁打包员”

Input images:
- Image 1 is the direction board. Use direction A as the locked composition foundation: stable packing-table scene, warm side-window daylight, organized community parcel station, small plants, generous clean top logo zone and quiet bottom loading-UI zone. Borrow only a small amount of direction B's comedy.
- Image 2 is the locked character identity reference. Preserve the exact orange crooked cap, dark brown hair tuft, thick eyebrows, half-lidded mildly irritated eyes, orange work polo, dark cargo trousers and sturdy boots.

Primary request: create one polished standalone vertical launch illustration based primarily on A. The worker stands behind the packing table in the middle-lower area, one hand pressing a central parcel and the other holding a yellow tape roll. Add only two controlled comic beats from B: one extra parcel is slightly tilted or just beginning to fall from a shelf at upper-right below the logo safe zone, and the worker glances toward it with restrained irritation while one small steam puff or warning burst appears nearby. The scene should feel amusing, not chaotic.

Scene/backdrop: warm community parcel station interior with left side window daylight, cream wall, simple shelves, a notice board, a few organized parcels and a small amount of greenery. Keep the environment cleaner and less crowded than direction B.

Style/medium: original 2D exaggerated flat-cartoon game illustration, thick consistent dark outline, simplified geometry, bright warm colors, restrained two-step shading, humorous and cute.

Composition/framing: exact tall portrait composition intended for 1500×2668 delivery. Reserve the top 24% as a clean low-detail area for a separately layered logo. Place the character's face around the middle of the canvas and the packing table below it. Reserve the bottom 12% as a quiet low-detail floor/gradient strip where runtime loading UI can overlay. Critical face, hands, tape roll and parcels remain inside mobile safe margins.

Color palette: orange #F58A3A, deep orange #C9572C, yellow #FFD34E, cardboard #D6A257, cream #F6F1E0, warm white #FFFBEF, industrial gray #697577, dark outline #2F383D, small green plant accents and tiny complaint-red accent #E75353.

Layering intent: background environment, character/action group, separately overlaid logo and runtime loading UI must remain conceptually separable.

Text: none.

Constraints: one worker only; one central parcel on the table; no more than four additional background parcels; only one tilted/falling parcel; A remains visually dominant and B contributes only mild comedy; no baked logo; no loading text; no progress bar; no privacy button; no version number; no phone frame; no platform UI; no watermark; no real brands.

Avoid: parcel avalanche, panic expression, extra people, crowded bottom strip, objects inside the top logo zone, character identity drift, generic child, different uniform, photorealism, 3D render, anime, watercolor, glossy effects, dark mood, cash-reward imagery.
