# 主角运行头像 v001 来源记录

- 上游批准母表：`art/concepts/character/packer/char_packer_expression_sheet_v003.png`
- 处理提示词：`art/prompts/character/prompt-char-packer-runtime-sprites-v01.md`
- 内置编辑原始结果：`art/ai-raw/character/packer/char_packer_expression_runtime_chroma_raw_v001.png`
- 正式目录：`art/final/character/packer/`
- 评审总览：`art/previews/character/packer/char_packer_runtime_sprites_v001.png`
- FairyGUI 目录：`fairygui/assets/ui-game/images/character/`

本批不重新设计角色或表情，只为运行时拆分提供干净透明底。八张头像保持统一 `384×512` 画布和固定锚点，不做自动裁边。FairyGUI 通过 `CharacterPortrait.expression` 控制器切换八种状态；是否用于具体玩法事件由后续 Cocos 逻辑绑定决定。
