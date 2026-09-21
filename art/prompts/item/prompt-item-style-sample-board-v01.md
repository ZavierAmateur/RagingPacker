# 五商品统一风格板提示词 v01

- 批次：0
- 状态：开发者已批准，冻结为 `Item Style Master V1`
- 生成方式：OpenAI `imagegen` 内置模式
- 风格参考：主角八表情 v003、社区快递站白天版母稿 v001
- 生成文件：`art/concepts/item/item_style_sample_board_v001.png`
- 用途：同时验证电子产品、浅色物体、透明材质和不规则轮廓，并作为 `Item Style Master V1` 候选
- 说明：此前分别生成的五张产品感过强，已整批废弃且未归档；本稿改为同页生成以锁定一致的描边、视角和简化程度

## 最终提示词

```text
Use case: stylized-concept

Asset type: unified five-item style board for a 2D casual mobile game. This replaces all previous item samples.

Input images:
- Image 1 is the approved protagonist expression sheet. Match its genuinely flat 2D drawing language: thick warm outlines, simple graphic eyes/shapes, hard-edged color blocks, humorous exaggeration and limited shading.
- Image 2 is the approved community parcel-station scene. Match its palette, warm daylight and friendly casual-game finish.
Use both only as project style references. Do not include the character or environment.

Primary request:
Draw EXACTLY FIVE separate game-item illustrations together on ONE clean landscape comparison board, arranged left to right in one evenly spaced row:
1. blue smartphone
2. black smartphone
3. wall charger
4. empty clear drinking glass
5. salted dried fish

This must look like one artist drew a cohesive 2D sprite set, not five product renders. Every object must use the same line weight, same camera angle logic, same hard-edged shadow style and same level of simplification.

Global style:
- “warm warehouse comedy flat cartoon”
- hand-drawn-looking but clean vector-like 2D sprite illustration
- chunky, slightly squat and playfully exaggerated forms; commercial casual mobile-game art
- bold smooth outline approximately 12 px relative to a 1024 source object; warm dark brown #453A35 for warm objects, cool dark gray #34424A for cool/metal/glass objects
- each material uses a flat main color, one single hard-edged shadow block and one tiny hard-edged highlight only
- at most 4 flat color shapes per object excluding outline
- fixed upper-left 45-degree light
- no smooth gradients anywhere, no airbrush, no glossy coating, no bevel rendering, no realistic reflections, no painterly brush texture, no scale texture
- use deliberately simplified shapes that remain readable at 90 × 90

Composition:
- one flat solid cream background #F6F1E0
- exactly five invisible equal-width cells in one horizontal row, no visible cell borders
- each object centered in its cell, similar visual weight, fully visible, generous padding
- unified left-front three-quarter view with a slight top-down angle; phones stand upright, charger tilts naturally, glass stands upright, fish lies diagonally
- no text, names, labels, numbers, logos, brands, UI, packages, hands, faces, extra props, cast shadows or watermark

Object construction:

1. BLUE SMARTPHONE:
- back view; compact squat rounded rectangle, not tall and luxurious
- flat #4885DC blue body with one darker blue side plane
- vertical dark pill camera island with exactly two large circular lenses stacked vertically and one tiny yellow flash
- thick simple outline and one small rectangular side button
- no screen, no UI, no full-surface shine

2. BLACK SMARTPHONE:
- back view at the same apparent scale
- slightly wider, squarer silhouette than the blue phone
- flat #2F383D body with one #34424A side plane
- rounded-square camera island with exactly three lenses in a triangle and one pale flash
- no screen, no UI, no full-surface shine
- lens layout and squarer silhouette must distinguish it from the blue phone in grayscale

3. WALL CHARGER:
- cute chunky rounded warm-white charging block, slightly compressed proportions
- two flat metal prongs and one large orange-lined charging port
- dark cool outline so it remains readable on cream
- no cable, no writing, no indicator unless a single tiny blue dot
- simplified icon, not a realistic electronic product rendering

4. EMPTY GLASS:
- short sturdy empty tumbler, slightly wider at the rim
- visible back rim, thick base, pale blue transparent fill shapes, two white highlight strips and dark cool outline
- use graphic transparency symbols, not realistic refraction
- no water, ice, straw, garnish or reflection
- must not disappear against the cream background

5. SALTED DRIED FISH:
- flattened, slightly curved food-item silhouette with a broad body and forked tail
- muted blue-gray main fill, one dark underside shadow, one pale belly patch
- exactly three large diagonal drying cuts and exactly four diamond-shaped salt crystals
- one closed-eye line only; no smile, no cute character personality
- fins simplified into broad flat shapes
- clearly dried/salted food, not a living mascot, not realistic seafood

Critical negative constraints:
No 3D render, no product visualization, no photorealism, no anime, no glossy gradients, no glass realism, no painterly fish, no tiny salt granules, no realistic fish scales, no cute fish face, no rounded drop shadows, no black/transparent background, no extra sixth object, no object touching another, and no cropped edges.
```

## 位置映射

- 第一件：蓝色手机——双摄竖向胶囊模组、圆润轮廓。
- 第二件：黑色手机——三摄三角模组、较方轮廓。
- 第三件：充电器——暖白方块、双扁脚、橙色接口。
- 第四件：玻璃杯——蓝色透明色块、清晰前后杯沿与厚杯底。
- 第五件：咸鱼——三道风干切口、四个盐晶、无角色化笑脸。

## 本轮检查

- 五件商品使用同一画面生成，描边、视角、光源和简化程度明显一致。
- 蓝/黑手机除颜色外，还通过圆角幅度、双摄胶囊与三摄方岛区分。
- 暖白充电器在奶油底上仍有深轮廓；玻璃杯在浅底仍有完整轮廓与杯底结构。
- 咸鱼为扁平食品图标，没有前一轮的写实鳞片、盐粒噪声和厚涂质感。
- 通过视觉确认后，才基于本板逐件制作 1024 × 1024 透明底清理母版和 256/128/96 运行预览。

## 开发者审批

- 审批日期：2026-09-21
- 审批结果：通过。
- 冻结内容：统一左前三分之四视角、粗描边、扁平色块、简化层级、五件商品的轮廓与主要区分结构。
- 后续边界：风格板只用于造型参考；独立商品必须重新生成透明底 1024 母版，并完成 256/128/96/90 缩略图检查后才能进入正式资产目录。
