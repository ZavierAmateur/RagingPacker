# 主游戏 UI 第一版 A 升级稿 v05

## 结论

- 状态：`superseded_by_v006`
- 日期：2026-09-21
- 基础方向：恢复第一版 A 的暖色游戏感，保留角色订单卡、社区快递站、传送带、立体开箱和橙色主按钮。
- 本轮只修正多订单入口、订单阅读层级和纸箱/包装/标签的可发现性。

## 文件

- AI 原始输出：`art/ai-raw/ui/game/ui_game_a_upgrade_raw_v005.png`
- 中文评审稿：`art/concepts/ui/game/ui_game_a_upgrade_v005.png`
- 初版方向板：`art/concepts/ui/game/ui_game_direction_board_v001.png`
- 角色表情参考：`art/concepts/character/packer/char_packer_expression_sheet_v003.png`
- 商品参考：`art/previews/item/item_style_master_v1_acceptance_board_v001.png`

## 页面规则

- 顶部 HUD 延续第一版的关卡、金币、连击和投诉结构。
- 订单卡顶部增加 `01/02/03` 票据队列，当前订单为橙色，紧急订单只使用红色时间条。
- 当前订单只展开一张详情：左侧独立角色头像，中部商品与数量，右侧倒计时，下层为纸箱、包装和标签要求。
- 传送带固定显示大尺寸可点击商品；中央纸箱继续作为最大的操作目标。
- 底部三个入口明确标为“纸箱／包装／标签”，同时显示当前选择与向下箭头。
- 主按钮明确标为“封箱发货”。

## 角色动态规则

当前图片只是静态概念，但角色头像必须在 FGUI 中作为独立组件实现，禁止与订单卡底板烘焙为一张图。

建议 Controller 状态：

| 状态 | 触发 | 表现 |
|---|---|---|
| `normal` | 默认等待 | 轻微呼吸、3～6 秒随机眨眼 |
| `focus` | 新订单或拿取正确商品 | 视线转向订单/传送带，眉毛收紧 |
| `doubt` | 拿取非订单商品或包装不匹配 | 怀疑表情，短暂出现“？？？” |
| `impatient` | 剩余时间低于 40% | 皱眉、轻敲边框或冒一小口气 |
| `success` | 正确发货或连击提升 | 点头、满意笑或竖拇指 |
| `angry` | 错装、包装错误或投诉 | 爆筋、冒气、头像轻震 |
| `panic` | 即将超时或超时 | 抱头/抓狂，不使用单纯慌张脸 |

动画以头像切换、眼眉嘴分层和 0.1～0.4 秒 Tween 为主，不制作常驻高帧率序列帧。头像动效不得遮挡订单商品、数量、倒计时和票据切换热区。

## 中文处理

- ImageGen 原图只保留空白标题条与按钮空间。
- 评审稿使用系统黑体确定性叠加“纸箱／包装／标签／封箱发货”，避免 AI 伪字。
- 系统字体只用于概念评审；运行时继续使用项目字体方案。

## 生成方式

- 模式：内置 ImageGen，多参考图编辑。
- 用例：`precise-object-edit`。
- 原生输出：941 × 1672 RGB PNG。
- 当前未创建真实 FairyGUI 页面，不填写或猜测 `ui://`，也未进行 Cocos 运行验证。

## 完整提示词

Use case: precise-object-edit

Asset type: standalone 750 x 1334 portrait mobile-game main gameplay UI concept

Input images: Image 1 is the EDIT TARGET and visual base. Preserve the overall look and composition of panel A only: warm community parcel-station background, cream clipboard order card, compact cream HUD, dark conveyor, large dimensional open cardboard box, three warm selection tiles and large orange dispatch button. Do not use the heavy industrial panel B or sticker-heavy panel C. Image 2 is the approved packer expression reference; preserve this exact character identity. Image 3 is the approved item-icon reference.

Primary request: Rebuild panel A as one complete standalone portrait screen, keeping its charming game feel and animated-character presence, while making the order and three selection controls much clearer.

Order area: keep the character portrait on the left as a visibly independent square portrait component, showing the mildly impatient neutral expression. Leave a clean border around it so the portrait can later swap expressions and tween independently. At the top edge of the clipboard add a compact three-ticket queue: 01, 02, 03. Each ticket shows one tiny product icon and a thin time bar; 02 is active orange, 03 has a short red urgency bar. Only order 02 details are expanded. In the center show exactly two large requested item icons with bold quantity badges. On the right keep the familiar circular timer, but smaller than the original and secondary to the item icons. Under the items add one clear requirement strip with exactly three aligned cells: box icon, bubble-wrap icon, fragile-label icon. No extra symbols.

Gameplay area: preserve the simple dark conveyor with exactly four large tappable item icons. Preserve the large open box and its dimensional warm-cardboard look; keep a clear capacity indicator on the box front.

Selection area: preserve the original three large side-by-side tiles directly below the box, but redesign them for discoverability. Each tile must have a distinct small caption header area, a large current-selection icon, and a visible downward arrow. Left is BOX, middle is WRAP, right is LABEL. Keep clean blank caption strips for later exact Chinese labels. Selected values are small box, bubble wrap and fragile label. Do not expand a drawer in this view.

Bottom action: preserve the large orange rounded button, leave wide central space for exact Chinese label and retain a white parcel/dispatch icon.

Character animation intent: this is a static concept, but portrait must be clearly separable for later expression swaps: neutral, suspicious with question marks, impatient, satisfied, angry and panicked. Do not bake the face into the clipboard texture.

Style: match panel A exactly: warm 2D casual mobile game, bold dark-brown outlines, cream/kraft/orange palette, clean flat-cartoon rendering, gentle depth, playful but not sticker-heavy.

Text: only 01, 02, 03, quantities and timer numerals must be readable. Do not generate Chinese or fake text; leave blank caption strips for deterministic Chinese overlay later.

Constraints: one full portrait screen only, straight-on, no phone frame, large tap targets, no overlaps, character identity consistent, order understandable at a glance.

Avoid: three-screen board, industrial metal frame, comic sticker clutter, large portrait covering products, hidden category controls, dense text, extra characters, fake Chinese, logos, watermark, brands, 3D, photorealism.
