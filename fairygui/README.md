# RagingPacker FairyGUI 工程

本目录是《暴躁打包员》UI 组件、页面、Transition 和包配置的唯一编辑来源。当前只建立边界说明，尚未创建实际 FGUI 项目或包。

## 基本规则

- 只导入 `../art/final/` 中已达到 `ready_for_import` 的资源。
- 文字、数值、订单、价格和页签使用 FGUI 文字组件，不烘焙进图片；Logo 除外。
- 通用按钮提供 `normal/pressed/disabled/selected` 四状态。
- 可拉伸面板使用九宫格，记录四边切片值和最小尺寸。
- 发布产物不得手工修改；变更必须回到本工程再重新发布。
- `ui://` 只能从实际已创建和发布的资源记录，不得预测。
- FGUI 编辑器预览通过只能标记 `fgui_preview_passed`，不等于 Cocos 运行或真机验收。

## 预计包划分

```text
ui-common
ui-avatar
ui-home
ui-level
ui-game
ui-result
ui-shop
ui-collection
ui-settings
```

创建真实工程后，以 FairyGUI 编辑器生成的项目结构为准，不在编辑器外随意移动内部文件。
