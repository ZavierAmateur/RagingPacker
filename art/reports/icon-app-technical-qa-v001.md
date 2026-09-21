# 游戏图标 v001 技术 QA

## 结论

- 结果：`technical_qa_passed`
- 日期：2026-09-21
- 正式源文件：`art/final/icon/icon_app.png`
- 当前完成线：`ready_for_import`

## 自动与静态检查

| 检查项 | 结果 | 证据 |
|---|---|---|
| 母版尺寸 | 通过 | 2048 × 2048 |
| 长宽比 | 通过 | 1:1 |
| 文件格式 | 通过 | PNG，8-bit RGB |
| 透明通道 | 通过 | `hasAlpha: no`，完整方形底色 |
| 平台圆角 | 通过 | 未烘焙圆角或外部设备框 |
| 禁止文字 | 通过 | 无标题、字母、数字和徽标 |
| 主体辨识 | 通过 | 人物、黄色胶带、纸箱在 48 × 48 预览中仍可区分 |
| 多尺寸导出 | 通过 | 256/128/64/48 均为正方形 RGB PNG |
| 文件一致性 | 通过 | `art/final/icon/icon_app.png` 与批准的 2048 候选 SHA-256 相同 |

## 多尺寸预览

- `art/previews/icon/final/icon_app/icon_app_256.png`
- `art/previews/icon/final/icon_app/icon_app_128.png`
- `art/previews/icon/final/icon_app/icon_app_64.png`
- `art/previews/icon/final/icon_app/icon_app_48.png`

## 尚未验证

- 尚未导入微信、抖音、Android 或 iOS 的平台后台。
- 尚未检查各平台最终自动圆角、安全区遮挡与色彩管理差异。
- 这些平台提交与真机检查按计划留到对应构建或 P5 QA 阶段，不影响当前 `ready_for_import` 结论。
