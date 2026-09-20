# 主角四方向概念板提示词 v01

- 批次：0
- 状态：方向已批准，作为后续角色设定参考
- 生成方式：OpenAI `imagegen` 内置模式
- 生成文件：`art/concepts/character/packer/char_packer_direction_board_v001.png`
- 用途：只用于选择主角造型方向，不作为正式运行资源

## 最终提示词

```text
Use case: stylized-concept

Asset type: 2D mobile game character concept direction board, Batch 0 preview only, not a final runtime asset.

Primary request:
Create one clean landscape 2-by-2 comparison sheet showing FOUR clearly distinct but closely related visual-design directions for the SAME protagonist from a Chinese casual mobile game called “Raging Packer”. Each panel contains one full-body neutral standing view of the same young warehouse packer. All four must preserve the exact identity lock below. Vary only silhouette rhythm, shape language, and comedic expressiveness:
- top-left: compact, rounded, approachable
- top-right: slightly angular and energetic, stronger workwear feeling
- bottom-left: expressive physical comedy, slightly oversized hands
- bottom-right: polished, balanced commercial casual-mobile-game design
Do not place any letters, labels, captions, UI, or text in the image.

Character identity lock shared by all four:
- young adult, about 20–25, gender-neutral appearance
- stylized 2.5-head-tall chibi proportions, full body fully visible
- tired but nimble warehouse worker; frazzled and irritable in a funny, sympathetic way, never violent or threatening
- short-sleeve orange warehouse uniform, main orange #F58A3A with darker orange-red #C9572C accents
- dark gray work pants #46545B
- orange cap tilted distinctly to one side, small highlight #FFAA58
- exactly one obvious tuft of dark brown hair #49362E sticking up from under the cap
- thick expressive red-brown eyebrows #9E3F32
- subtle tired lower-eye marks, healthy face, not sickly
- chest badge shaped like a tiny parcel/package, absolutely no writing on it
- bright yellow tape roll #FFD34E attached at the waist
- dark anti-slip work shoes #2F383D
- skin #F2B58E with shadow #D98D69

Visual style lock:
- warm warehouse comedy flat-cartoon style
- bold clean warm dark-brown outlines #453A35, never pure black
- simple readable geometric forms, strong silhouette, production-friendly
- flat 2D illustration, one main color plus one shadow shape and only tiny highlights
- fixed soft top-left light at roughly 45 degrees
- high-brightness warm palette, playful polished casual mobile-game art
- crisp edges, no painterly texture, no gradients, no excessive micro-detail
- consistent apparent scale across all four figures

Composition:
- landscape canvas, precise 2-by-2 grid with generous equal spacing
- plain light warm cream background, no environment or props other than the waist tape roll
- each character centered in its own quadrant with equal visual size
- subtle flat contact shadow only if needed
- all feet, cap, and hands fully inside frame

Constraints / negative:
no text, no panel labels, no typography, no logo, no watermark, no real brand, no UI, no scenery, no extra character, no duplicate limbs, no cropped body, no 3D render, no photorealism, no anime, no painterly rendering, no black outlines, no complex lighting, no weapons, no aggressive pose, no childish crayon look.
```

## 方向索引

- 左上：A，圆润亲和
- 右上：B，利落工装
- 左下：C，夸张喜剧
- 右下：D，商业均衡

## 开发者审批

- 批准结论：以 B（右上）的基础造型为准，吸收 C（左下）的夸张表情和动作表现。
- B 冻结内容：身形比例、帽型、工装轮廓、裤装结构、鞋型和整体利落感。
- C 仅提供表现参考：眉眼幅度、嘴型、手势和肢体张力；不得把 C 的夸张姿势固化为标准站姿。
- 后续标准视图、表情表和动作稿不得改成 A/D 体型，也不得混用四个方向的服装结构。

## 本轮检查

- 四个方向为同一角色，身份锁要素基本齐全。
- 四肢、帽子和鞋均完整入画，无文字、标志或水印。
- 本稿背景和接触阴影仅服务于概念评审，正式角色资源需重新生成透明底标准视图。
- 方向冻结前不进入正式拆件、动作帧或 FairyGUI 接入。
