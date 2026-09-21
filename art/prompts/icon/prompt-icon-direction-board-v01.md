# 游戏图标三方向生成记录 v01

## 目标

基于已批准的 Logo 纯图形标与角色设定，比较三种无文字游戏图标构图。选定方向后再制作 2048 × 2048 可编辑母版。

## 候选

- A：人物正面压住包裹，短传送带托底；稳定、直接、与 Logo 纯图形标最一致。
- B：人物拉动黄色胶带缠绕包裹；动作集中、道具辨识强。
- C：人物追赶失控包裹；戏剧性和速度感最强。

## 状态与边界

- 状态：`style_approved`（开发者于 2026-09-21 选择 B 方向）。
- 主方向：B“人物拉动黄色胶带缠绕包裹”。
- A/C 仅保留为未采用候选，不再继续细化。
- 图标内部无文字、数字、通知红点、平台徽标和烘焙圆角。
- 方向板用于构图选择，不是 2048 × 2048 正式母版。
- 已从方向板原像素区域先裁切，再生成 256 × 256 与 48 × 48 预览；不得把整张方向板直接缩小当作图标验收。

## 文件

- 原始输出：`art/ai-raw/icon/icon_direction_board_raw_v001.png`
- 评审稿：`art/concepts/icon/icon_direction_board_v001.png`
- 256/48 预览：`art/previews/icon/direction_v001/`
- Logo 系统参考：`art/concepts/logo/logo_variant_system_board_v001.png`
- 角色身份参考：`art/concepts/character/packer/char_packer_model_sheet_v002.png`

## 生成方式

- 模式：ImageGen，多参考图生成。
- 用例：`logo-brand`。
- 日期：2026-09-21。
- 原始画布：2020 × 778 PNG，RGBA。

## 完整提示词

Use case: logo-brand

Asset type: three-direction game-app-icon concept board for “暴躁打包员”

Input images:
- Image 1 is the approved logo variant system. Use its pure graphic symbol, character-over-parcel relationship, conveyor motif, thick outline and orange warehouse-comedy identity as the primary visual-system reference.
- Image 2 is the locked character model sheet. Preserve the same orange crooked cap, dark brown hair tuft, thick eyebrows, half-lidded mildly irritated eyes, orange work polo and established face proportions. Do not redesign the character.

Primary request: create one landscape presentation board with exactly three clearly separated square game-icon candidates, arranged left to right and identified only by small plain Latin letters A, B and C outside the icon squares. The icon artwork itself must contain absolutely no text, letters, numbers, badges or platform marks.

Candidate A — “pressing the parcel”: evolve the approved pure graphic symbol. Front-facing worker bust behind one central taped cardboard parcel, both hands pressing/gripping its top corners, a short conveyor belt at the bottom, one steam puff and one red anger-vein accent. Calmly irritated and highly readable.

Candidate B — “runaway packing tape”: closer three-quarter worker bust pulling a bright yellow packing-tape ribbon diagonally around one parcel; tape makes one bold sweeping curve, eyebrows annoyed, small motion burst. Strong action silhouette without clutter.

Candidate C — “out-of-control parcel”: dynamic comedy. Worker reaches toward one tilted parcel sliding or bouncing to the right above a short conveyor, with two bold speed streaks and one orange warning burst; the face remains recognizable but the flying parcel is equally important.

Scene/backdrop: each candidate uses a full-bleed square orange/cream graphic background with simple sunburst or geometric warehouse stripes. Keep the three square frames sharp-cornered on the board to avoid baking in platform rounded corners.

Style/medium: polished original 2D flat-cartoon mobile-game icon concept, vector-friendly, thick consistent dark outline, simplified shapes, crisp edges, restrained shading, warm and humorous rather than aggressive.

Composition/framing: one dominant subject cluster per square; visual mass fills 70%–80% of each square; generous safety margin; face, hands and parcel must remain recognizable at 48 × 48; no thin details.

Color palette: orange #F58A3A, deep orange #C9572C, yellow #FFD34E, cardboard brown #D6A257, warm cream #F6F1E0, industrial gray #697577, dark outline #2F383D, complaint red #E75353.

Constraints: exactly three candidates; consistent worker identity and rendering across all three; one worker and one main parcel in each candidate; no words inside icons; no title logo; no baked rounded-corner mask; no notification dot; no platform badge; no watermark; no mock phone or store page.

Avoid: generic child mascot, identity drift, different clothing, extra characters, multiple faces, tiny props, dense background, photorealism, 3D bevel, glossy rendering, anime styling, watercolor, realistic brand marks.
