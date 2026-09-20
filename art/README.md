# 《暴躁打包员》美术源资产

本目录保存 AI 生成、人工清理、授权与评审记录，不直接参与 Cocos 构建。唯一完整规则见 `计划/02-美术开发计划.md`。

## 目录规划

```text
art/
├─ ai-raw/        AI 原始输出，不得直接进入运行资源
├─ references/    风格母版和来源明确的参考图
├─ concepts/      待选概念稿
├─ final/         清理后、可导入 FGUI/Cocos 的正式美术源资产
├─ prompts/       提示词、任务包和修订记录
├─ licenses/      AI 服务、字体、参考图和第三方素材授权
├─ provenance/    生成、人工修改、审批和发布记录
├─ previews/      缩放、灰度、混排和风格对照板
├─ reports/       自动 QA 与冻结批次报告
└─ asset-manifest.csv
```

目录在首次产生对应内容时创建，不为了空骨架提前加入大量 `.gitkeep`。

## 不可越过的边界

- `ai-raw/` 和 `concepts/` 不导入 FairyGUI 或 Cocos。
- 只有 `final/` 中达到 `ready_for_import` 的资源可进入运行工程。
- FGUI 发布产物不在本目录编辑。
- 身份证、签字、手机号、账号凭证、API Key、AppSecret 和 COS 密钥不得进入本目录或 Git。
- `asset-manifest.csv` 中为 `unverified` 的资源不得用于正式版本、宣传和软著截图。

## 命名

使用 `char_`、`item_`、`ui_`、`icon_`、`scene_`、`box_`、`wrap_`、`label_`、`fx_`、`logo_`、`promo_` 短前缀，全小写英文与下划线。源文件可使用 `v001`版本；运行文件使用稳定名，不加 `final/new/latest`。

## 工作流

```text
planned → generating → candidate → style_approved → cleanup
→ ready_for_import → technical_qa_passed
→ fgui_preview_passed/runtime_preview_passed
→ content_frozen → release_verified
```

`content_frozen` 是常规开发完成线；`release_verified` 在项目后期平台和真机 QA 集中完成。
