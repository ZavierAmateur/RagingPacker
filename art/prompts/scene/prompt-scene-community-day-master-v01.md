# 社区快递站白天版竖屏母稿提示词 v01

- 批次：0
- 状态：开发者已批准，作为社区快递站白天版拆层参考母稿
- 生成方式：OpenAI `imagegen` 内置模式
- 方向参考：`art/concepts/scene/community/scene_community_day_direction_board_v001.png`
- 原始输出：`art/concepts/scene/community/scene_community_day_master_native_v001.png`（941 × 1672）
- 规格预览：`art/concepts/scene/community/scene_community_day_master_1500x2668_v001.png`
- 尺寸处理：原始比例与 1500:2668 相差约 0.1%，使用系统高质量重采样生成精确规格版；无裁切、无补画
- 用途：冻结空间构图、色彩、装饰密度和交互留白，不是已拆层的正式运行背景

## 最终提示词

```text
Use case: stylized-concept

Asset type: approved-direction portrait environment master candidate for a 2D casual mobile game.

Input image:
Image 1 is the approved four-direction environment board.
- Use the SECOND portrait frame (B: cheerful community service counter) as the primary spatial and design reference.
- Borrow ONLY the left-side window daylight and a small amount of edge greenery from the FIRST portrait frame (A).
- Ignore the third and fourth portrait frames.
- Do not reproduce the four-panel board; output one single complete portrait scene.

Primary request:
Create one single tall portrait 9:16 daytime master composition for the beginner area “community parcel station.” It must feel like B's cheerful neighborhood service counter enriched with A's warm side-window sunlight and restrained plants. This is a clean environment-only gameplay backdrop/master reference, not a UI mockup.

Exact vertical gameplay composition:
- Canvas target ratio: 9:16 portrait, planned source master 1500 × 2668.
- Top 0–12%: calm pale warm wall/ceiling with minimal detail, reserved for device safe area and HUD overlay. No hanging object in the central top region.
- Upper 12–30%: community-service wall. A narrow window on the far left shows bright blue sky, soft clouds, green tree shapes and distant simple neighborhood roofs. Soft sunlight enters from upper-left. A rounded corkboard or service-board frame may sit near the right edge with only blank geometric paper shapes and colored pins, no writing.
- Upper-center 15–31%: preserve a broad, low-detail warm-yellow/cream wall zone for a future order-card overlay. Shelves and plants must remain at the far edges.
- Middle 30–43%: one continuous dark industrial-gray conveyor belt spanning the scene width. Front-facing, horizontal, clearly readable, with rounded end rollers and a clean empty belt surface for future item sprites. Same functional belt height as the approved board.
- Middle-lower 43–65%: one large sturdy warm wooden/cardboard-brown packing table. Its top surface must be broad, clean and mostly empty for a future open-box interaction layer. Add only subtle wood grain shapes; no objects on the work surface.
- Lower 65–78%: visible table supports and a small amount of tidy under-table storage boxes pushed to the left and right edges, leaving the center visually calm.
- Bottom 78–100%: simple warm neutral floor with very low detail and a subtle soft orange floor mat near the lower edge. Preserve a large uncluttered central area for future packaging options and ship-button UI.
- Camera: straight-on 2D view with only mild depth cues, no isometric perspective, no dramatic vanishing point.

Approved direction details:
- Primary B traits: pale warm-yellow community-service wall, rounded service-board shapes, compact edge cubbies, one small orange storage bin, organized welcoming mood.
- Borrowed A traits: a far-left side window with soft upper-left sun rays, one small potted plant on a high edge shelf and at most one tiny floor plant in a bottom corner.
- Plants must remain sparse and never overlap the order-card zone, conveyor, table workspace or bottom UI zone.
- The station is bright and friendly, clearly a small neighborhood parcel service point, not a home kitchen, office, futuristic kiosk, factory or garage.
- No main character, customer, pet, item, parcel, loose package, open box or UI in this environment master.

Project style lock:
- “warm warehouse comedy flat cartoon”
- crisp flat 2D vector-like illustration with rounded geometric forms
- bold smooth warm dark-brown outlines #453A35 for warm materials
- cool metal outlines #34424A
- fixed soft upper-left 45-degree daylight
- main color plus one clean shadow layer and tiny highlights only
- palette: #F58A3A orange, #C9572C deep orange, #F6F1E0 cream, #FFFBEF warm white, #D6A257 cardboard brown, #9C6531 deep cardboard brown, #697577 industrial gray, #2F383D deep gray, restrained #43AE75 green and #4885DC blue
- bright, clean, humorous and welcoming
- background may have slightly more detail than UI but cannot compete with interactive content
- shapes should support later modular separation into bg_far, bg_mid, props_back, belt, table, props_front, light and event_overlay

Composition safety:
- keep all key construction at least 8% away from the left and right canvas edges so the image can be center-cropped to an exact 9:16 production canvas if needed
- keep the full top and bottom composition visible
- no embedded frame or border around the scene

Text:
No text of any kind.

Avoid:
letters, numbers, labels, logos, brands, watermark, UI panels, HUD, order cards, buttons, item sprites, characters, customers, pets, packages on the belt, objects on the table, foreground clutter, large central plants, excessive shelves, strong perspective, isometric view, photorealism, 3D render, anime, painterly texture, dirty surfaces, dark mood, industrial pipes, dense machinery, neon, gradients, dramatic shadows, and anything covering the interaction zones.
```

## 构图检查

- 左侧窗光和边缘绿植来自 A，社区服务板、暖黄色墙面和紧凑收纳来自 B。
- 顶部安全区、订单卡覆盖区、传送带表面、打包台表面和底部操作区均未画入文字或游戏 UI。
- 传送带与桌面保持完整水平基准，方便后续三个场景共用核心操作布局。
- 场景没有角色、顾客、宠物、商品、箱内物品、Logo、品牌或水印。
- 当前整图只能作为视觉母稿；通过后仍需按 `bg_far/bg_mid/props_back/belt/table/props_front/light/event_overlay` 重建或拆层，不能整张直接塞入运行工程。

## 开发者审批

- 审批日期：2026-09-21
- 审批结果：通过。
- 冻结构图：左侧窗光、边缘绿植、右侧服务板/收纳、中央传送带、木质打包台与底部低干扰操作区。
- 后续边界：本稿只冻结视觉与空间关系；正式资源必须分层重建并通过 UI 覆盖预览，不得把整张概念图直接导入 Cocos。
