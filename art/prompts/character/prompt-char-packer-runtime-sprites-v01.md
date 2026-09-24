# 主角运行头像拆分记录 v01

- 来源母表：`art/concepts/character/packer/char_packer_expression_sheet_v003.png`
- 生成方式：OpenAI ImageGen 内置编辑模式，仅将母表外部奶油背景替换为纯绿色；不使用 CLI 或 API Key。
- 原始绿幕：`art/ai-raw/character/packer/char_packer_expression_runtime_chroma_raw_v001.png`
- 透明评审总览：`art/previews/character/packer/char_packer_runtime_sprites_v001.png`
- 正式运行资源：`art/final/character/packer/char_packer_*.png`

## 编辑约束

- 保留八个已批准头像的 4×2 排列、角色身份、表情、姿态、服装和漫画符号。
- 只把外部背景改为均匀纯绿色，禁止新增文字、角色、道具或投影。
- 使用内置图像生成结果后，按技能提供的本地去绿工具生成透明母图，再按固定单格画布拆分。
- 每格固定 `384×512`、透明 PNG；不做自动裁边，以保证八种状态锚点稳定。

## 状态映射

| 位置 | 运行名 | 中文语义 |
|---|---|---|
| 上一 | `calm` | 平静 |
| 上二 | `tired` | 疲惫 |
| 上三 | `focused` | 专注 |
| 上四 | `suspicious` | 怀疑 |
| 下一 | `irritated` | 轻度暴躁 |
| 下二 | `rage` | 极度抓狂 |
| 下三 | `success` | 成功得意 |
| 下四 | `failed` | 失败崩溃 |
