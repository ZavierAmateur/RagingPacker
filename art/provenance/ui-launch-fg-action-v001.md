# 启动图角色动作透明前景层 v001 审批记录

## 结论

- 状态：`style_approved`
- 审批日期：2026-09-21
- 审批人：项目开发者
- 审批内容：透明角色动作层及其与纯背景层的合成效果。

## 文件链路

- 原始 RGBA 输出：`art/ai-raw/ui/launch/ui_launch_fg_action_raw_v001.png`
- alpha 归一化原生层：`art/concepts/ui/launch/ui_launch_fg_action_native_v001.png`
- 1500 × 2668 透明候选：`art/concepts/ui/launch/ui_launch_fg_action_1500x2668_v001.png`
- 750 × 1334 前景预览：`art/previews/ui/launch/v002/ui_launch_fg_action_750x1334_v001.png`
- 1500 × 2668 合成 QA：`art/previews/ui/launch/v002/ui_launch_layer_composite_1500x2668_v001.png`
- 750 × 1334 合成预览：`art/previews/ui/launch/v002/ui_launch_layer_composite_750x1334_v001.png`

## 已批准范围

- 前景层只包含角色、黄色胶带、中央包裹、白色冒气符号、右上倾斜包裹和橙色警示符号。
- 与纯背景层合成后构图、遮挡和安全区符合已批准的启动图方向。
- 主体颜色与项目角色设定、暖色仓库色板一致。

## 技术说明

- ImageGen 实际返回 941 × 1672 RGBA 图；未执行绿色色键移除。
- 原始 alpha 经阈值归一化，清除极低残留并使主体内部完全不透明，同时保留边缘抗锯齿。
- 1500 × 2668 文件为规格重采样版本，不标记为 ImageGen 原生尺寸。

## 边界

- 本次批准前景层与背景合成，不代表完整启动页可导入。
- Logo、加载提示/进度、隐私入口和版本号应由独立资源或运行时 UI 管理。
