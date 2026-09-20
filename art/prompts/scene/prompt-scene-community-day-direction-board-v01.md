# 社区快递站白天版四方向概念板提示词 v01

- 批次：0
- 状态：开发者已批准，作为社区快递站白天版母稿方向参考
- 生成方式：OpenAI `imagegen` 内置模式
- 风格参考：已批准主角六视图 v002，仅参考描边、配色、光影和形状语言
- 生成文件：`art/concepts/scene/community/scene_community_day_direction_board_v001.png`
- 用途：选择社区快递站的空间方向，不作为正式背景或运行资源

## 原型布局依据

- 设计分辨率：750 × 1334 竖屏。
- 当前原型从上至下为安全区/HUD、订单卡、传送带、打包台/纸箱、包装与标签选项、封箱按钮。
- 四个方向统一传送带高度、打包台基准线和核心操作留白，只改变背景空间与装饰气质。

## 最终提示词

```text
Use case: stylized-concept

Asset type: Batch 0 environment direction board for a portrait 2D casual mobile game.

Input image:
Image 1 is the approved protagonist model sheet. Use it ONLY as the style, outline, palette, lighting and shape-language reference. Do not include the character or copy any pose into the scene.

Primary request:
Create one clean landscape comparison board containing FOUR distinct visual directions for the same beginner gameplay environment: a bright daytime neighborhood parcel-packing station. Each direction must be shown as a separate complete miniature PORTRAIT 9:16 game-stage frame, arranged left to right with equal size and spacing. The four frames must share exactly the same functional gameplay geometry but vary in background personality and decoration.

Shared functional layout in every portrait frame:
- top 10–12%: calm uncluttered wall/ceiling area reserved for platform safe area and HUD overlay
- upper-middle: readable warm wall backdrop with one broad quiet zone reserved for an order card; background details stay around the edges
- exact middle: one dark industrial-gray horizontal conveyor belt spanning almost the full width, clearly separated from the background; belt surface kept empty for future item sprites
- lower-middle: one large warm wooden/cardboard-colored packing table and open-box workspace, surface mostly empty for future interactive box and packaging layers
- bottom 22–25%: calm low-detail foreground area reserved for packaging options and a large ship button overlay
- straight-on 2D game view with only mild depth cues, shared conveyor height and shared table baseline in all four frames
- no UI panels, no buttons, no character, no item sprites and no text painted into the environment

Four art directions, left to right:
1. COZY NEIGHBORHOOD STOREFRONT:
Cream plaster wall, one sunlit side window, a tiny potted plant and two restrained parcel shelves at the edges; friendly, warm, simplest newcomer area.

2. CHEERFUL COMMUNITY SERVICE COUNTER:
Pale warm-yellow wall, rounded corkboard shapes with blank paper silhouettes, compact cubby shelves, one hanging lamp and subtle orange/teal accents; lively but organized.

3. CLEAN MODERN PARCEL STATION:
Warm off-white modular wall panels, rounded storage niches, clean orange safety trim, compact scanner dock shapes with no screens or text; polished commercial casual-game feel.

4. PLAYFUL CONVERTED GARAGE:
Light cream rolling-door structure, small overhead beams, a few neatly stacked background boxes, amusing crooked shelf geometry and brighter orange accents; energetic warehouse comedy, still not industrial or cluttered.

Style lock:
- project style “warm warehouse comedy flat cartoon”
- 2D flat vector-like illustration, clean geometric shapes, playful rounded construction
- warm dark-brown outlines #453A35 for warm objects and cool dark-gray outlines #34424A for metal
- fixed soft upper-left 45-degree daylight
- main color plus one clean shadow layer and tiny highlights
- palette anchored by #F58A3A orange, #C9572C deep orange, #F6F1E0 cream, #FFFBEF warm white, #D6A257 cardboard brown, #697577 industrial gray, #2F383D deep gray, with restrained #43AE75 green and #4885DC blue accents
- bright, humorous, clean and welcoming; more environmental detail than a UI panel but never competing with gameplay
- production-friendly modular layers: background wall, midground props, rear props, conveyor, table, front props and light should be visually separable

Composition:
- four tall portrait frames fully visible, consistent scale and camera
- generous neutral cream spacing between frames
- no labels beneath or above the frames; direction order is documented outside the image
- show complete frames without cropping any top, sides or bottom

Avoid:
text, numbers, logos, brands, watermarks, UI, order cards, HUD, buttons, characters, customers, pets, item icons, packages on the conveyor, foreground clutter, strong perspective, isometric view, photorealism, 3D render, anime, painterly texture, dirty warehouse, dark mood, excessive pipes, dense machinery, dramatic shadows, neon, gradients, or any element that blocks the conveyor/table interaction zones.
```

## 方向索引

- A（第一格）：温馨社区门店——窗光、绿植、最亲和。
- B（第二格）：社区服务柜台——空间语义最明确、秩序感最好。
- C（第三格）：现代智能驿站——最干净、最商业化，但略偏未来。
- D（第四格）：改造车库——仓库喜剧感强，但装饰密度较高。

## 初步建议

- 以 B 的服务柜台结构作为基础。
- 吸收 A 的侧窗自然光与少量绿植。
- 不使用 C 的未来设备感，也不采用 D 的高装饰密度。
- 方向批准后再生成 1500 × 2668 白天版竖屏母稿，并按 `bg_far/bg_mid/props_back/belt/table/props_front/light/event_overlay` 规划拆层。

## 开发者审批

- 审批日期：2026-09-21
- 审批结果：通过。
- 冻结方向：以 B 的社区服务柜台结构为基础，吸收 A 的侧窗自然采光和少量绿植。
- 保留内容：暖黄色服务空间、圆角公告板、紧凑边缘收纳、中央传送带、木质打包台和低干扰核心操作区。
- 调整内容：增加侧窗形成左上 45° 日光；绿植仅放在边缘，不遮挡订单卡、传送带、商品、纸箱和底部操作区。
- 排除内容：不采用 C 的未来设备感，不采用 D 的高装饰密度和车库工业感。
