# RagingPacker FairyGUI 工程

本目录是《暴躁打包员》UI 组件、页面、Transition 和包配置的唯一编辑来源。实际工程入口为 `ui.fairy`，项目类型为 Cocos Creator，设计分辨率为 750×1334。

当前已建立首批三个包及根组件：

- `ui-common/CommonRoot`：公共组件预览页；已包含 `PanelCard`、`ButtonPrimary`、`HudStatItem`、`TopHudBar`、`TypographySpec`。
- `ui-game/GamePage`：主玩法页面入口；已建立 `OrderBoard`、`ConveyorBelt`、`BoxWorkArea`、`SelectorPanel` 第一版结构。
- `ui-game/CharacterPortrait`：订单角色头像；`expression` 控制器提供 `calm`、`tired`、`focused`、`suspicious`、`irritated`、`rage`、`success`、`failed` 八种状态。
- `ui-result/ResultPage`：订单与关卡结算页面入口。

`ui-result` 当前仍是空白骨架。`ui-common` 的基础组件与字体均已通过 FairyGUI 编辑器 F5 预览。`ui-game` 已导入社区快递站背景、四件商品、小号箱/气泡膜/易碎标签及八种透明角色头像，并完成首版主玩法页面组装及 FairyGUI F5 分段整页预览验收；四件商品、箱内 `0/4`、三类选择器与发货按钮未发生遮挡。角色头像已替换原结构占位，待完成八状态逐一预览及 Cocos 运行时事件绑定。所有内容尚未完成 Cocos 运行验证。

## 角色反馈运行契约

事件映射的唯一代码来源为 `assets/scripts/CharacterFeedback.ts`。Cocos/FairyGUI 接入不得自行发明第二套页名或优先级。

| 游戏事件 | `expression` 页 | 轻量动效 | 返回状态 |
|---|---|---|---|
| 新订单/空闲 | `calm` | settle | 保持 |
| 拿取正确商品 | `focused` | nod | `calm` |
| 拿错商品/包装不匹配 | `suspicious` | questionPop | `calm` |
| 箱子塞满 | `irritated` | shakeSmall | `calm` |
| 剩余时间进入警戒线 | `tired` | droop | 保持至其他反馈覆盖 |
| 完美完成订单 | `success` | bounce | `calm` |
| 投诉/第二次投诉警告 | `rage` | shakeStrong | `calm` / `irritated` |
| 超时/第三次投诉失败 | `failed` | sink | `tired` / 保持 |

结果反馈不可被拿取商品等低优先级反馈打断。运行时适配器只负责设置 `CharacterPortrait.expression.selectedPage` 并播放对应 Tween，不负责重新判断业务结果。

## 基本规则

- 只导入 `../art/final/` 中已达到 `ready_for_import` 的资源。
- 文字、数值、订单、价格和页签使用 FGUI 文字组件，不烘焙进图片；Logo 除外。
- 通用按钮提供 `normal/pressed/disabled/selected` 四状态。
- 可拉伸面板使用九宫格，记录四边切片值和最小尺寸。
- 发布产物不得手工修改；变更必须回到本工程再重新发布。
- Cocos 运行时包统一发布到 `../assets/resources/packages/<包名>/`，代码使用相对 `resources` 的 `packages/<包名>/<包名>` 路径加载；旧的 `assets/packages/` 目录不再作为运行时来源。
- `ui://` 只能从实际已创建和发布的资源记录，不得预测。
- FGUI 编辑器预览通过只能标记 `fgui_preview_passed`，不等于 Cocos 运行或真机验收。

## 字体层级

| 角色 | 字体 | 基准字号 | 用途 |
|---|---|---:|---|
| 展示标题 | Smiley Sans Oblique | 48～56 | 页面主标题、阶段性庆祝标题；不得用于正文和密集信息 |
| 页面标题 | Source Han Sans SC Heavy | 36～40 | 面板标题、订单标题 |
| 按钮文字 | Source Han Sans SC Heavy | 32～36 | 主按钮、重要操作 |
| HUD 数值 | Source Han Sans SC Heavy | 28～32 | 金币、目标、投诉、连单数字 |
| 正文 | Source Han Sans SC Regular | 22～26 | 订单说明、功能文字 |
| 辅助文字 | Source Han Sans SC Regular | 18～20 | 次要状态和提示；18 为当前设计稿最小字号 |

字体资源均位于 `ui-common/fonts/`，对应命名 URL：

- `ui://rpgcm001ft001`：Source Han Sans SC Regular
- `ui://rpgcm001ft002`：Source Han Sans SC Heavy
- `ui://rpgcm001ft003`：Smiley Sans Oblique

不得依赖设备系统字体。新增正文默认使用 Regular，按钮、标题和关键数字使用 Heavy；Smiley Sans 只作为少量展示标题使用。

## 包划分

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

前三个包已经建立，其余包按实际开发批次创建。以 FairyGUI 编辑器保存后的项目结构为准，不在编辑器外随意移动内部文件。
