# 首批包装三件套方向板 v01

## 目标

为首批竖切片统一“小号纸箱、气泡膜、易碎标签”的造型语言。方向确定后，分别制作透明背景正式资源；本方向板本身禁止导入 FairyGUI 或 Cocos。

## 状态与文件

- 状态：`style_approved`（开发者于 2026-09-21 选择 C：圆润且易识别）
- 日期：2026-09-21
- AI 原始输出：`art/ai-raw/packaging/packaging_core_direction_board_raw_v001.png`
- 中文评审稿：`art/concepts/packaging/packaging_core_direction_board_v001.png`
- 风格参考：`art/previews/item/item_style_master_v1_acceptance_board_v001.png`
- UI 场景参考：`art/concepts/ui/game/ui_game_a_upgrade_v006.png`

## 三个方向

- A：结构最干净、几何最简单，优先保证 90 px 下的辨识度。
- B：在清晰度不变的前提下增加少量纸箱折面、气泡和卷芯层次。
- C：轮廓更圆、更饱满，加入少量喜剧夸张，但不使用贴纸式杂乱装饰。

最终选择：**C**。后续小号纸箱、气泡膜和易碎标签均以 C 的圆润比例和粗轮廓为造型基准。

三列都固定包含同一套小号纸箱、气泡膜卷和易碎标签。本轮只比较造型语言，不比较功能或数量。

## 生成方式

- 模式：内置 ImageGen，多参考图生成。
- 用例：`stylized-concept`。
- 输出：1536 × 1024 RGB PNG。
- 当前没有透明通道，不是正式运行资源；选定方向后需分别生成平色键背景、移除背景并完成透明边缘 QA。

## 完整提示词

```text
Use case: stylized-concept
Asset type: production direction board for three cohesive parcel-packing game asset families
Input images: Image 1 is the locked Item Style Master V1 and must define outline weight, flat cartoon rendering, top-left lighting, scale readability, and clean silhouettes. Image 2 is the approved main gameplay UI and provides the exact warm kraft/orange/cream visual context and the currently depicted small box, bubble wrap, and fragile label.
Primary request: Create one clean landscape presentation board comparing exactly three coherent design directions A, B, and C for the same three gameplay assets: SMALL CARDBOARD BOX, BUBBLE WRAP ROLL, and FRAGILE SHIPPING LABEL. Each direction is one vertical column and contains exactly those three objects, each shown as a large isolated game sprite candidate. A should be clean and practical with simple geometry. B should have slightly more dimensional folded-cardboard and bubble detail while remaining clear. C should have a little more playful comedy and chunky exaggeration without becoming cluttered. The three objects inside each column must clearly belong to one matching family.
Scene/backdrop: warm off-white neutral review-board background with three separated column cards; no gameplay scene.
Style/medium: polished 2D casual mobile-game asset concept, warm warehouse comedy flat cartoon, bold dark charcoal-brown outlines, simple geometric construction, restrained two-step shading, gentle top-left highlight. Match the reference assets, not photorealism or 3D.
Composition/framing: wide landscape board, three equal columns labeled only A, B, C at the top. Within each column arrange small box on top, bubble-wrap roll in middle, fragile label on bottom. Objects centered with generous padding and no overlap. All three object types shown at comparable visual scale. Straight-on three-quarter front view for boxes and rolls; label near-front view.
Color palette: kraft brown and warm tan for box; light cyan/sky blue for bubble wrap; cream/white label with dark pictogram and one restrained orange-red warning accent. Do not use green.
Materials/textures: box has readable folded flaps and tape seam but no text; bubble wrap is clearly a rolled sheet with a visible hollow core and a limited number of large circular bubbles; fragile label uses a simple broken-glass/wine-glass pictogram plus minimal barcode-like bars, but no words.
Text: only the column letters “A”, “B”, and “C” are allowed and must be clearly readable outside the assets.
Constraints: exactly 3 columns and exactly 9 object candidates total; each column has one small box, one bubble-wrap roll, one fragile label; no people, hands, products inside boxes, real brands, logos, watermark, fake writing, captions, UI buttons, scenery, shadows connecting assets, cropped objects, or transparent checkerboard. Preserve strong recognition at 90 px and thick clean edges suitable for later isolated transparent sprites.
Avoid: photorealism, glossy 3D render, isometric scene, realistic packaging brands, dense tiny bubbles, thin outlines, painterly texture, excessive gradients, torn or damaged boxes, open parcels full of goods, multiple labels per candidate, tape guns, scissors, stickers, extra icons, Chinese text, English words.
```
