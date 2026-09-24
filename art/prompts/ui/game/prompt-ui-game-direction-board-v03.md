# 主游戏 UI 多订单与选择器状态记录 v03

## 目标

在清晰单订单结构上补齐多订单队列和纸箱、包装、标签的明确选择入口。本稿不再比较装饰风格，而是比较同一 UI 系统的三个真实交互状态。

## 三个状态

- A：单订单默认态。队列只有 `01`，当前订单详情完整展开，三个选择器收起。
- B：三订单队列态。`01/02/03` 只作为紧凑标签，`02` 为当前订单，`03` 用细红边表示即将超时；屏幕只展开 `02` 的详情。
- C：纸箱选择器展开态。背景与当前订单保留但降亮，底部抽屉显示小/中/大三种纸箱。

## 已明确的交互规则

- 多订单不同时铺开多张详情卡，最多显示 3 个队列标签，永远只展开当前订单。
- 队列标签只承载订单号、代表商品和剩余时间环；当前项使用橙色，紧急项只增加细红边。
- 底部固定三个带中文名称的入口：`纸箱`、`包装`、`标签`。每个入口同时显示当前值图标和展开箭头。
- 点击入口后使用底部抽屉展示大尺寸选项；不使用密集小图标网格。
- 当前代码仍是逐单处理；并行订单队列是本次新增的产品预留，正式开发前需补充状态、切换和超时规则。

## 状态与边界

- 状态：`superseded_after_research`。开发者仍不满意，要求参考成熟休闲游戏后重构；后续候选见 `art/concepts/ui/game/ui_game_research_layout_v004.png`。
- AI 原图不含可靠中文；评审稿由本地字体确定性补上“纸箱／包装／标签”和“选择纸箱”。
- 本稿只验证信息架构，不是可导入 UI，不填写或猜测 `ui://`。
- 选定后需单独制作 750 × 1334 高保真页面与选择器展开状态，不得裁切方向板作为正式资源。

## 文件

- AI 原始输出：`art/ai-raw/ui/game/ui_game_direction_board_raw_v003.png`
- 中文评审稿：`art/concepts/ui/game/ui_game_direction_board_v003.png`
- 场景参考：`art/concepts/scene/community/scene_community_day_master_1500x2668_v001.png`
- 角色参考：`art/concepts/character/packer/char_packer_model_sheet_v002.png`
- 商品参考：`art/previews/item/item_style_master_v1_acceptance_board_v001.png`

## 生成方式

- 模式：内置 ImageGen，多参考图生成；中文标签使用系统黑体确定性叠加，仅用于评审。
- 用例：`ui-mockup`。
- 日期：2026-09-21。

## 完整提示词

Use case: ui-mockup

Asset type: clarity-first mobile-game main-play UI interaction-state board, 750 x 1334 portrait reference

Primary request: Create one clean landscape presentation board with exactly three complete portrait gameplay screens side by side, labeled only A, B and C outside the screens. This is NOT three art styles. It is one consistent clean UI system shown in three functional states: A single active order, B three-order queue with one active order, C packaging selector drawer open.

Input images: Image 1 supplies only the quiet warm parcel-station backdrop; reduce its contrast and detail behind UI. Image 2 supplies a tiny packer avatar identity only. Image 3 supplies the approved item silhouettes.

Global visual system: warm cream dominant, kraft brown box, restrained orange for active/primary state, charcoal outlines, generous whitespace, aligned grid, minimal gradients, no decoration. Maximum five major containers per screen. No nested decorative frames.

Persistent top HUD: a single slim horizontal strip with four evenly spaced icon-number groups for level progress, coins, combo and complaints.

Order system: directly below HUD is one order module. Its top edge contains an ORDER QUEUE TAB ROW. Each compact tab contains only an order number such as 01/02/03, a tiny item thumbnail, and a small remaining-time ring. The active tab is orange and visually connected to the detail card. Waiting tabs are cream. An urgent waiting tab may have one red edge, never a large warning. Only the active order detail is expanded; never display multiple full order cards at once.

Active order detail: strongest focal point. Exactly two or three very large requested item thumbnails with bold quantity badges. Below them, one separate requirement strip with exactly three equal cells: box-size pictogram, protective-wrap pictogram and shipping-label pictogram. A large isolated countdown circle stays at the far right. Tiny customer avatar is optional and subordinate.

Gameplay workspace: one simple conveyor band with exactly four large tappable items; one large open cardboard box drop zone below, with a simple capacity meter. Plenty of empty space.

Bottom interaction system: always show exactly THREE explicit selector buttons in one row. Each button has a small category-caption strip reserved for a real text label, a large current-selection icon, and a clear downward chevron. Left selector is BOX, middle is WRAP, right is LABEL. Their category captions must be visibly distinct from the chosen value. Below them is one full-width orange seal-and-ship button.

Panel A: single-order default state. Queue row shows only active tab 01. All three selectors collapsed.

Panel B: multi-order state. Queue row shows tabs 01, 02, 03; tab 02 active; tab 03 mildly urgent. Only order 02 details are expanded. All three selectors collapsed.

Panel C: multi-order state with the BOX selector opened as a clean bottom sheet. Keep the active order visible but slightly dim the workspace. The bottom sheet has a top category-tab row for BOX / WRAP / LABEL, with BOX active, and beneath it three large box-size choices shown by clearly different small/medium/large silhouettes. The other two categories remain accessible from tabs. No tiny option grid.

Style/medium: polished 2D casual mobile-game UI concept, editorial information clarity, bold clean item silhouettes, flat warm cartoon rendering consistent with references.

Composition/framing: three equal 9:16 screens fully visible, straight-on, wide gaps, no phone bezels, neutral off-white board.

Text: Only A, B, C and simple numerals 01, 02, 03, 1, 2, 28 must be readable. Inside the three selector caption strips and the drawer category tabs, leave clean blank cream spaces for later exact Chinese overlay; do not invent words or fake Chinese.

Constraints: order understandable in one second; selection location understandable without tutorial; exact same game data across panels where applicable; tap targets large; no overlap; high contrast; background secondary.

Avoid: decorative stickers, comic bursts, hazard stripes, screws, thick industrial frames, large character portraits, plants overlapping UI, full multiple order cards, tiny tabs, dense text, fake Chinese, logos, watermarks, brands, 3D, photorealism.
