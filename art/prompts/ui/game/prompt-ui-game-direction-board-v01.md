# 主游戏 UI 三方向生成记录 v01

## 目标

比较《暴躁打包员》主游戏界面的三种视觉组织方式。方向确定后，再按 750 × 1334 基准单独重建高保真稿，并拆分订单卡、HUD、传送带覆盖、纸箱区、选项组件和封箱按钮。

## 候选

- A：订单夹板。奶油纸张面板、橙色标签和最大化操作区，层级最稳、阅读最轻松。
- B：工业传送带。深灰框架、模块化 HUD 和更强对比，操作反馈最直接。
- C：喜剧贴纸。保留暖色布局，增加贴纸轮廓、漫画强调符号和更活跃的角色反馈。

## 状态与边界

- 状态：`reference_reactivated`。首轮三个方向当时均未直接采用；后续开发者认为其游戏感优于过度扁平的重构稿，因此重新启用 A 的暖色角色订单卡、传送带、立体纸箱和大按钮作为 v005 基础。
- 方向板为 1536 × 1024 RGB PNG，只用于方向比较。
- 三版共同包含顶部 HUD、订单卡、倒计时、传送带、开箱区、三类选择入口和主操作按钮。
- 当前底部只用三个大卡片表达“纸箱/包装/标签”的类别关系；正式单屏稿必须展开真实选项、选中态、容量反馈和滚动/分页规则。
- 方向选定后必须重新制作 750 × 1334 单屏稿，不得从方向板裁切放大作为正式页面。
- 当前不是 FGUI 页面，不填写或猜测 `ui://`，也不得导入 Cocos。

## 文件

- 原始输出：`art/ai-raw/ui/game/ui_game_direction_board_raw_v001.png`
- 评审稿：`art/concepts/ui/game/ui_game_direction_board_v001.png`
- 场景参考：`art/concepts/scene/community/scene_community_day_master_1500x2668_v001.png`
- 角色参考：`art/concepts/character/packer/char_packer_model_sheet_v002.png`
- 商品参考：`art/previews/item/item_style_master_v1_acceptance_board_v001.png`

## 生成方式

- 模式：内置 ImageGen，多参考图生成。
- 用例：`ui-mockup`。
- 日期：2026-09-21。
- 首次调用因图像服务网络错误未产生文件；同规格重试成功。

## 完整提示词

Use case: ui-mockup. Create a polished landscape direction board with three complete, equally sized 9:16 portrait mobile-game screens side by side, labeled only A, B, C. They show the same parcel-packing gameplay and information hierarchy: compact top HUD for level/coin/combo/complaint; large readable order card with customer portrait, 2-3 item thumbnails, quantity badges, requirement icons and circular countdown; conveyor with 3-4 tappable items; central open cardboard-box work area with capacity feedback; bottom selectors for box size, protective wrap and shipping label; one large orange seal-and-ship button. Direction A uses clipboard paper panels and the clearest generous workspace. Direction B uses a stronger dark industrial conveyor frame, compact modular HUD and highest scanning contrast. Direction C uses playful sticker/comic accents and a small expressive packer portrait without clutter. Match the supplied references: warm community parcel-station backdrop, approved orange-capped packer identity, approved bold clean item silhouettes. 2D casual mobile game UI, warm warehouse comedy flat cartoon, bold dark-brown outlines, orange/warm yellow/kraft brown/cream/charcoal palette, minimal gradients, soft top-left light. Neutral presentation board, no perspective tilt. Only A/B/C are readable text; inside screens use icons, numerals and abstract bars, never fake Chinese. Controls remain large and separated. Avoid logos, watermarks, brands, photorealism, 3D, cyberpunk, tiny controls, overlaps, clutter, or more than one full character per screen.
