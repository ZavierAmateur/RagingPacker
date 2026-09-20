import {
  _decorator, BlockInputEvents, Camera, Canvas, Color, Component, Graphics,
  HorizontalTextAlignment, Label, Layers, Node, ResolutionPolicy, tween,
  UITransform, Vec3, VerticalTextAlignment, view, profiler,
} from 'cc';
import {
  BoxId, evaluatePackage, getBoxCapacity, ItemId, ITEMS, itemById,
  LabelId, LEVELS, LevelDefinition, Order, ordersForLevel, usedCapacity, WrapId,
} from './GameModel';

const { ccclass } = _decorator;
const W = 750;
const H = 1334;
const C = {
  bg: new Color(246, 241, 224), ink: new Color(42, 48, 54), muted: new Color(117, 124, 125),
  orange: new Color(255, 145, 64), orangeDark: new Color(206, 87, 39), yellow: new Color(255, 207, 69),
  cream: new Color(255, 251, 235), belt: new Color(75, 86, 91), belt2: new Color(105, 117, 119),
  green: new Color(67, 174, 117), red: new Color(231, 83, 83), blue: new Color(72, 133, 220),
  white: new Color(255, 255, 255), line: new Color(208, 197, 169), dark: new Color(31, 37, 42),
};

interface BeltItem { node: Node; id: ItemId; speed: number; }

@ccclass('GameRoot')
export class GameRoot extends Component {
  private canvas!: Node;
  private belt!: Node;
  private boxArea!: Node;
  private beltItems: BeltItem[] = [];
  private contents: Partial<Record<ItemId, number>> = {};
  private selectedBox: BoxId = 'small';
  private selectedWrap: WrapId = 'none';
  private selectedLabel: LabelId = 'none';
  private orderIndex = 0;
  private order!: Order;
  private secondsLeft = 0;
  private coins = 0;
  private combo = 0;
  private complaints = 0;
  private completed = 0;
  private successful = 0;
  private currentLevel: LevelDefinition = LEVELS[0];
  private eventMode: 'none' | 'blackout' | 'malfunction' = 'none';
  private eventSeconds = 0;
  private eventBanner: Node | null = null;
  private boxLabel!: Label;
  private orderLabel!: Label;
  private timerLabel!: Label;
  private hudLabel!: Label;
  private capacityLabel!: Label;
  private hintLabel!: Label;
  private optionButtons: Record<string, Node> = {};
  private resultOverlay: Node | null = null;
  private spawnClock = 0;
  private gameOver = false;

  protected onLoad(): void {
    view.setDesignResolutionSize(W, H, ResolutionPolicy.FIXED_WIDTH);
    profiler.hideStats();
    this.createCanvas();
    this.build();
    this.showLevelSelect();
    this.showTutorial();
  }

  protected update(dt: number): void {
    if (this.gameOver || this.resultOverlay) return;
    if (this.eventSeconds > 0) {
      this.eventSeconds -= dt;
      if (this.eventSeconds <= 0) this.endEvent();
    }
    this.secondsLeft -= dt;
    this.timerLabel.string = `${Math.max(0, Math.ceil(this.secondsLeft))}s`;
    if (this.secondsLeft <= 0) {
      this.finishOrder(true);
      return;
    }
    const slow = this.combo >= 5 ? 0.72 : 1;
    const eventSpeed = this.eventMode === 'malfunction' ? 1.9 : 1;
    this.spawnClock -= dt;
    if (this.spawnClock <= 0) {
      this.spawnBeltItem();
      this.spawnClock = 1.15 / (slow * this.currentLevel.beltSpeed * eventSpeed);
    }
    for (let i = this.beltItems.length - 1; i >= 0; i--) {
      const entry = this.beltItems[i];
      entry.node.setPosition(entry.node.position.x - entry.speed * dt * slow * this.currentLevel.beltSpeed * eventSpeed, 0);
      if (entry.node.position.x < -430) {
        entry.node.destroy();
        this.beltItems.splice(i, 1);
      }
    }
  }

  private createCanvas(): void {
    const scene = this.node.scene!;
    this.canvas = new Node('Canvas');
    this.canvas.layer = Layers.Enum.UI_2D;
    scene.addChild(this.canvas);
    this.canvas.addComponent(UITransform).setContentSize(W, H);
    const cameraNode = new Node('UICamera');
    cameraNode.layer = Layers.Enum.UI_2D;
    cameraNode.setPosition(0, 0, 1000);
    this.canvas.addChild(cameraNode);
    const camera = cameraNode.addComponent(Camera);
    camera.projection = Camera.ProjectionType.ORTHO;
    camera.orthoHeight = H / 2;
    camera.visibility = Layers.Enum.UI_2D;
    camera.clearColor = C.bg;
    const canvas = this.canvas.addComponent(Canvas);
    canvas.cameraComponent = camera;
    canvas.alignCanvasWithScreen = true;
  }

  private build(): void {
    this.rect(this.canvas, 'Background', 0, 0, W, H, C.bg);
    this.rect(this.canvas, 'Header', 0, 622, W, 90, C.orange);
    this.label(this.canvas, '暴躁打包员', 38, 50, 310, 622, C.white, true, HorizontalTextAlignment.CENTER, -205);
    this.hudLabel = this.label(this.canvas, '', 21, 34, 370, 622, C.white, true, HorizontalTextAlignment.CENTER, 170);

    const orderCard = this.panel(this.canvas, 'OrderCard', 0, 475, 700, 190, C.cream, 22, C.line);
    this.label(orderCard, '今日订单', 19, 30, 130, 69, C.orangeDark, true, HorizontalTextAlignment.CENTER, -255);
    this.orderLabel = this.label(orderCard, '', 25, 35, 510, 5, C.ink, true, HorizontalTextAlignment.LEFT);
    const timer = this.panel(orderCard, 'Timer', 270, 62, 110, 50, C.dark, 18);
    this.timerLabel = this.label(timer, '30s', 25, 36, 90, 0, C.yellow, true);

    const beltFrame = this.panel(this.canvas, 'BeltFrame', 0, 279, 750, 168, C.belt, 0);
    this.belt = new Node('MovingItems');
    this.belt.layer = Layers.Enum.UI_2D;
    this.belt.addComponent(UITransform).setContentSize(750, 160);
    beltFrame.addChild(this.belt);
    for (let x = -340; x <= 340; x += 85) this.rect(beltFrame, 'Roller', x, -65, 48, 13, C.belt2, 6);
    this.label(beltFrame, '← 点击商品装箱 · 传送带 ←', 18, 28, 420, 64, new Color(225, 231, 228), true);

    this.boxArea = this.panel(this.canvas, 'Box', 0, 35, 700, 270, new Color(222, 172, 91), 24, new Color(170, 117, 54));
    this.label(this.boxArea, '当前纸箱', 20, 30, 140, 106, new Color(99, 63, 27), true, HorizontalTextAlignment.CENTER, -250);
    this.capacityLabel = this.label(this.boxArea, '', 18, 28, 180, 106, new Color(99, 63, 27), true, HorizontalTextAlignment.CENTER, 245);
    this.boxLabel = this.label(this.boxArea, '点击传送带商品装入这里', 23, 34, 620, 20, new Color(108, 73, 36), true);
    this.hintLabel = this.label(this.boxArea, '选错了？点击箱内商品即可取出', 17, 25, 500, -98, new Color(119, 78, 38));

    this.makeOptions();
    this.button(this.canvas, 'Ship', 0, -590, 680, 82, '📦  封箱发货', C.orange, () => this.finishOrder(false));
  }

  private makeOptions(): void {
    this.label(this.canvas, '纸箱', 18, 26, 72, -132, C.muted, true, HorizontalTextAlignment.CENTER, -325);
    this.option('box-small', -190, -132, 115, '小号', () => { this.selectedBox = 'small'; this.refreshOptions(); });
    this.option('box-medium', -55, -132, 115, '中号', () => { this.selectedBox = 'medium'; this.refreshOptions(); });
    this.option('box-large', 80, -132, 115, '大号', () => { this.selectedBox = 'large'; this.refreshOptions(); });

    this.label(this.canvas, '包装', 18, 26, 72, -215, C.muted, true, HorizontalTextAlignment.CENTER, -325);
    this.option('wrap-none', -180, -215, 100, '无', () => { this.selectedWrap = 'none'; this.refreshOptions(); });
    this.option('wrap-bubble', -65, -215, 105, '气泡膜', () => { this.selectedWrap = 'bubble'; this.refreshOptions(); });
    this.option('wrap-ice', 55, -215, 105, '冰袋', () => { this.selectedWrap = 'ice'; this.refreshOptions(); });
    this.option('wrap-waterproof', 180, -215, 125, '防水袋', () => { this.selectedWrap = 'waterproof'; this.refreshOptions(); });

    this.label(this.canvas, '标签', 18, 26, 72, -298, C.muted, true, HorizontalTextAlignment.CENTER, -325);
    this.option('label-none', -180, -298, 100, '无', () => { this.selectedLabel = 'none'; this.refreshOptions(); });
    this.option('label-fragile', -65, -298, 105, '易碎', () => { this.selectedLabel = 'fragile'; this.refreshOptions(); });
    this.option('label-cold', 55, -298, 105, '冷藏', () => { this.selectedLabel = 'cold'; this.refreshOptions(); });
    this.option('label-waterproof', 180, -298, 125, '防水', () => { this.selectedLabel = 'waterproof'; this.refreshOptions(); });

    const tip = this.panel(this.canvas, 'Tip', 0, -392, 680, 86, new Color(233, 226, 201), 18);
    this.label(tip, '💡 大箱也能装，但会少赚金币；包装与标签必须完全正确', 19, 30, 630, 0, C.muted, true);
  }

  private startDay(): void {
    this.coins = this.combo = this.complaints = this.completed = this.successful = this.orderIndex = 0;
    this.gameOver = false;
    this.eventMode = 'none';
    this.eventSeconds = 0;
    this.nextOrder();
  }

  private nextOrder(): void {
    this.clearBelt();
    this.contents = {};
    this.selectedBox = 'small';
    this.selectedWrap = 'none';
    this.selectedLabel = 'none';
    const pool = ordersForLevel(this.currentLevel.id);
    this.order = pool[this.orderIndex % pool.length];
    this.secondsLeft = this.order.seconds * this.currentLevel.timeScale;
    const itemText = Object.entries(this.order.items).map(([id, n]) => `${itemById(id as ItemId).name} ×${n}`).join('  +  ');
    const boxText = { small: '小号箱', medium: '中号箱', large: '大号箱' }[this.order.box];
    const wrapText = { none: '无需包装', bubble: '气泡膜', ice: '冰袋', waterproof: '防水袋' }[this.order.wrap];
    const labelText = { none: '无标签', fragile: '易碎标签', cold: '冷藏标签', waterproof: '防水标签' }[this.order.label];
    this.orderLabel.string = `${this.order.customer}：${itemText}\n要求：${boxText} · ${wrapText} · ${labelText}　+${this.order.reward}金币`;
    this.spawnClock = 0;
    this.refreshAll();
    if (this.completed > 0 && this.completed % 2 === 0) this.maybeStartEvent();
  }

  private spawnBeltItem(): void {
    const wanted = Object.keys(this.order.items) as ItemId[];
    const chooseWanted = Math.random() < this.currentLevel.wantedChance;
    const pool = chooseWanted ? wanted : ITEMS.map((i) => i.id);
    const id = pool[Math.floor(Math.random() * pool.length)];
    const def = itemById(id);
    const blackout = this.eventMode === 'blackout';
    const itemColor = blackout ? new Color(48, 54, 57) : this.hex(def.color);
    const item = this.panel(this.belt, `Belt-${id}`, 430, 0, 104, 110, itemColor, 18, blackout ? new Color(95, 101, 103) : C.white);
    this.label(item, blackout ? '？' : def.glyph, 36, 44, 70, 18, id === 'charger' && !blackout ? C.ink : C.white, true);
    this.label(item, blackout ? '神秘轮廓' : def.name, 15, 23, 96, -34, id === 'charger' && !blackout ? C.ink : C.white, true);
    const entry: BeltItem = { node: item, id, speed: 125 + Math.random() * 25 };
    item.on(Node.EventType.TOUCH_END, () => this.pickItem(entry), this);
    this.beltItems.push(entry);
  }

  private pickItem(entry: BeltItem): void {
    const next = { ...this.contents, [entry.id]: (this.contents[entry.id] ?? 0) + 1 };
    if (usedCapacity(next) > getBoxCapacity(this.selectedBox)) {
      this.toast('箱子塞不下了！换大箱或取出商品', C.red);
      this.bump(this.boxArea);
      return;
    }
    this.contents = next;
    const index = this.beltItems.indexOf(entry);
    if (index >= 0) this.beltItems.splice(index, 1);
    tween(entry.node).to(0.12, { position: new Vec3(0, -245), scale: new Vec3(0.3, 0.3, 1) }).call(() => entry.node.destroy()).start();
    this.refreshBox();
  }

  private removeItem(id: ItemId): void {
    const count = this.contents[id] ?? 0;
    if (count <= 1) delete this.contents[id]; else this.contents[id] = count - 1;
    this.refreshBox();
  }

  private finishOrder(timeout: boolean): void {
    if (this.resultOverlay || this.gameOver) return;
    const result = timeout
      ? { perfect: false, complaint: false, reason: '顾客取消订单', review: '等到花都谢了，这单我先取消啦。', coins: 0 }
      : evaluatePackage(this.order, this.contents, this.selectedBox, this.selectedWrap, this.selectedLabel, this.secondsLeft);
    if (result.perfect) {
      this.coins += result.coins;
      this.combo++;
      this.successful++;
    } else {
      if (result.complaint) this.complaints++;
      this.combo = 0;
    }
    this.completed++;
    this.showResult(result.reason, result.review, result.coins, result.perfect, result.complaint);
  }

  private showResult(reason: string, review: string, reward: number, success: boolean, complaint: boolean): void {
    const overlay = this.overlay('ResultOverlay');
    this.resultOverlay = overlay;
    const card = this.panel(overlay, 'ResultCard', 0, 25, 650, 570, C.cream, 36, C.line);
    this.label(card, success ? '✓' : '!', 64, 80, 100, 200, success ? C.green : C.red, true);
    this.label(card, reason, 40, 54, 560, 120, success ? C.green : C.red, true);
    this.label(card, success ? `获得 ${reward} 金币 · 连击 ${this.combo}` : complaint ? `投诉 +1 · 当前 ${this.complaints}/3` : '订单作废 · 连击清零', 24, 38, 560, 55, C.ink, true);
    const reviewBox = this.panel(card, 'Review', 0, -65, 560, 130, new Color(238, 231, 207), 22);
    this.label(reviewBox, `“${review}”`, 23, 35, 500, 0, C.ink, true);
    this.label(card, '买家评价', 18, 26, 140, 10, C.muted, true);
    const done = this.complaints >= 3 || this.successful >= this.currentLevel.target;
    this.button(card, 'Continue', 0, -220, 540, 76, done ? '查看今日结算' : '下一单', C.orange, () => {
      overlay.destroy();
      this.resultOverlay = null;
      if (done) this.showDayEnd();
      else { this.orderIndex++; this.nextOrder(); }
    });
    this.refreshHud();
  }

  private showDayEnd(): void {
    this.gameOver = true;
    const overlay = this.overlay('DayEnd');
    const card = this.panel(overlay, 'Card', 0, 0, 660, 720, C.cream, 40, C.line);
    const correct = this.successful;
    const passed = correct >= this.currentLevel.target;
    const title = passed ? (this.currentLevel.id >= 9 ? '人形分拣机器' : this.currentLevel.id >= 5 ? '金牌快递员' : '熟练打包员') : '临时工';
    this.label(card, passed ? '关卡完成！' : '营业提前结束', 44, 58, 590, 275, passed ? C.green : C.red, true);
    this.label(card, title, 31, 44, 500, 205, C.orangeDark, true);
    this.label(card, `目标订单　${correct}/${this.currentLevel.target}\n处理订单　${this.completed}\n投诉次数　${this.complaints}/3\n关卡收入　${this.coins} 金币`, 28, 54, 500, 35, C.ink, true);
    this.label(card, passed ? '老板：干得漂亮，下一关更乱！' : '老板：先从分清手机和咸鱼开始吧。', 21, 34, 540, -155, C.muted, true);
    this.button(card, 'Restart', 0, -245, 540, 72, passed && this.currentLevel.id < 10 ? '挑战下一关' : '重试本关', C.orange, () => {
      overlay.destroy();
      if (passed && this.currentLevel.id < 10) this.currentLevel = LEVELS[this.currentLevel.id];
      this.startDay();
    });
    this.button(card, 'Menu', 0, -330, 540, 60, '返回选关', C.dark, () => { overlay.destroy(); this.showLevelSelect(); });
  }

  private showTutorial(): void {
    const overlay = this.overlay('Tutorial');
    this.resultOverlay = overlay;
    const card = this.panel(overlay, 'TutorialCard', 0, 0, 650, 760, C.cream, 38, C.line);
    this.label(card, '三步完成一单', 42, 56, 560, 300, C.ink, true);

    const step1 = this.panel(card, 'Step1', 0, 175, 560, 120, new Color(238, 231, 207), 22);
    this.label(step1, '1', 34, 46, 55, 0, C.orangeDark, true, HorizontalTextAlignment.CENTER, -235);
    this.label(step1, '看上方订单\n点击传送带上的正确商品', 23, 35, 430, 0, C.ink, true, HorizontalTextAlignment.LEFT, 45);

    const step2 = this.panel(card, 'Step2', 0, 25, 560, 120, new Color(238, 231, 207), 22);
    this.label(step2, '2', 34, 46, 55, 0, C.orangeDark, true, HorizontalTextAlignment.CENTER, -235);
    this.label(step2, '核对数量和容量\n选择纸箱、包装与标签', 23, 35, 430, 0, C.ink, true, HorizontalTextAlignment.LEFT, 45);

    const step3 = this.panel(card, 'Step3', 0, -125, 560, 120, new Color(238, 231, 207), 22);
    this.label(step3, '3', 34, 46, 55, 0, C.orangeDark, true, HorizontalTextAlignment.CENTER, -235);
    this.label(step3, '点击“封箱发货”完成判定\n箱内商品可点击取出', 23, 35, 430, 0, C.ink, true, HorizontalTextAlignment.LEFT, 45);

    this.label(card, '装错三单，当天就会提前下班！', 21, 32, 520, -225, C.red, true);
    this.button(card, 'GotIt', 0, -315, 520, 78, '开始营业', C.orange, () => {
      overlay.destroy();
      this.resultOverlay = null;
    });
  }

  private showLevelSelect(): void {
    this.gameOver = true;
    const overlay = this.overlay('LevelSelect');
    const card = this.panel(overlay, 'LevelCard', 0, 0, 680, 1120, C.cream, 38, C.line);
    this.label(card, '仓库工作日', 44, 58, 580, 490, C.ink, true);
    this.label(card, '这个包裹到底能不能发？', 23, 34, 580, 445, C.orangeDark, true);
    this.label(card, '10 个关卡 · 20 种商品 · 越来越混乱', 18, 28, 580, 410, C.muted, true);
    LEVELS.forEach((level, index) => {
      const row = Math.floor(index / 2);
      const col = index % 2;
      const x = col === 0 ? -165 : 165;
      const y = 330 - row * 160;
      const node = this.panel(card, `Level-${level.id}`, x, y, 300, 132, index === 0 ? new Color(255, 239, 204) : C.white, 22, index === 0 ? C.orange : C.line);
      this.label(node, `${level.id}`, 31, 42, 52, 24, C.orangeDark, true, HorizontalTextAlignment.CENTER, -112);
      this.label(node, level.name, 23, 32, 195, 27, C.ink, true, HorizontalTextAlignment.LEFT, 38);
      this.label(node, `${level.subtitle}\n目标：${level.target} 单`, 16, 24, 195, -25, C.muted, false, HorizontalTextAlignment.LEFT, 38);
      node.on(Node.EventType.TOUCH_END, () => {
        this.currentLevel = level;
        overlay.destroy();
        this.startDay();
      }, this);
    });
    this.label(card, '首版 MVP：全部关卡均可直接体验', 18, 28, 520, -495, C.muted, true);
  }

  private maybeStartEvent(): void {
    const kind = this.currentLevel.event;
    if (kind === 'none') return;
    const mode: 'blackout' | 'malfunction' = kind === 'both' ? (Math.random() < 0.5 ? 'blackout' : 'malfunction') : kind;
    this.eventMode = mode;
    this.eventSeconds = 5;
    this.eventBanner?.destroy();
    const color = mode === 'blackout' ? new Color(42, 48, 54) : C.red;
    this.eventBanner = this.panel(this.canvas, 'EventBanner', 0, 370, 650, 72, color, 22, C.white);
    this.label(this.eventBanner, mode === 'blackout' ? '⚡ 停电！新商品只剩轮廓 · 5秒' : '⚠ 传送带故障！速度暴增 · 5秒', 23, 36, 610, 0, C.white, true);
    this.bump(this.eventBanner);
  }

  private endEvent(): void {
    if (this.eventMode === 'none') return;
    this.eventMode = 'none';
    this.eventBanner?.destroy();
    this.eventBanner = null;
    this.toast('仓库恢复正常', C.green);
  }

  private refreshAll(): void { this.refreshHud(); this.refreshBox(); this.refreshOptions(); }

  private refreshHud(): void {
    this.hudLabel.string = `${this.currentLevel.id}关 ${this.successful}/${this.currentLevel.target}　金币${this.coins}\n连击${this.combo}　投诉${this.complaints}/3`;
  }

  private refreshBox(): void {
    const used = usedCapacity(this.contents);
    this.capacityLabel.string = `容量 ${used}/${getBoxCapacity(this.selectedBox)}`;
    const existing = this.boxArea.getChildByName('Contents');
    existing?.destroy();
    const holder = new Node('Contents');
    holder.layer = Layers.Enum.UI_2D;
    holder.addComponent(UITransform).setContentSize(620, 120);
    holder.setPosition(0, 3);
    this.boxArea.addChild(holder);
    const entries = Object.entries(this.contents) as [ItemId, number][];
    this.boxLabel.node.active = entries.length === 0;
    entries.forEach(([id, count], i) => {
      const x = (i % 3) * 190 - 190;
      const y = i < 3 ? 30 : -34;
      const chip = this.panel(holder, `Packed-${id}`, x, y, 174, 52, this.hex(itemById(id).color), 16);
      this.label(chip, `${itemById(id).name} ×${count}　×`, 17, 26, 162, 0, id === 'charger' ? C.ink : C.white, true);
      chip.on(Node.EventType.TOUCH_END, () => this.removeItem(id), this);
    });
  }

  private refreshOptions(): void {
    Object.entries(this.optionButtons).forEach(([key, node]) => {
      const selected = key === `box-${this.selectedBox}` || key === `wrap-${this.selectedWrap}` || key === `label-${this.selectedLabel}`;
      const g = node.getComponent(Graphics)!;
      const t = node.getComponent(UITransform)!;
      g.clear(); g.fillColor = selected ? C.orange : C.white; g.roundRect(-t.width / 2, -t.height / 2, t.width, t.height, 16); g.fill();
      g.strokeColor = selected ? C.orangeDark : C.line; g.lineWidth = selected ? 4 : 2; g.roundRect(-t.width / 2 + 1, -t.height / 2 + 1, t.width - 2, t.height - 2, 16); g.stroke();
      node.getChildByName('Text')!.getComponent(Label)!.color = selected ? C.white : C.ink;
    });
    this.refreshBox();
  }

  private clearBelt(): void { this.beltItems.forEach((e) => e.node.destroy()); this.beltItems = []; }

  private toast(text: string, color: Color): void {
    const toast = this.panel(this.canvas, 'Toast', 0, 370, 560, 62, color, 22);
    this.label(toast, text, 21, 32, 520, 0, C.white, true);
    toast.setScale(0.8, 0.8, 1);
    tween(toast).to(0.12, { scale: Vec3.ONE }).delay(1).to(0.15, { scale: new Vec3(0.8, 0.8, 1) }).call(() => toast.destroy()).start();
  }

  private bump(node: Node): void { tween(node).to(0.06, { scale: new Vec3(1.03, 1.03, 1) }).to(0.08, { scale: Vec3.ONE }).start(); }

  private option(key: string, x: number, y: number, width: number, text: string, action: () => void): void {
    const node = this.panel(this.canvas, key, x, y, width, 54, C.white, 16, C.line);
    const label = this.label(node, text, 18, 28, width - 8, 0, C.ink, true);
    label.node.name = 'Text';
    node.on(Node.EventType.TOUCH_END, action, this);
    this.optionButtons[key] = node;
  }

  private button(parent: Node, name: string, x: number, y: number, width: number, height: number, text: string, color: Color, action: () => void): Node {
    const node = this.panel(parent, name, x, y, width, height, color, 22, C.orangeDark);
    this.label(node, text, 28, 42, width - 30, 2, C.white, true);
    node.on(Node.EventType.TOUCH_END, action, this);
    return node;
  }

  private overlay(name: string): Node {
    const node = new Node(name);
    node.layer = Layers.Enum.UI_2D;
    node.addComponent(UITransform).setContentSize(W, H);
    node.addComponent(BlockInputEvents);
    this.canvas.addChild(node);
    const g = node.addComponent(Graphics);
    g.fillColor = new Color(20, 25, 27, 210); g.rect(-W / 2, -H / 2, W, H); g.fill();
    return node;
  }

  private rect(parent: Node, name: string, x: number, y: number, width: number, height: number, color: Color, radius = 0): Node {
    const node = new Node(name); node.layer = Layers.Enum.UI_2D; node.addComponent(UITransform).setContentSize(width, height); node.setPosition(x, y); parent.addChild(node);
    const g = node.addComponent(Graphics); g.fillColor = color; radius ? g.roundRect(-width / 2, -height / 2, width, height, radius) : g.rect(-width / 2, -height / 2, width, height); g.fill(); return node;
  }

  private panel(parent: Node, name: string, x: number, y: number, width: number, height: number, color: Color, radius: number, border?: Color): Node {
    const node = this.rect(parent, name, x, y, width, height, color, radius);
    if (border) { const g = node.getComponent(Graphics)!; g.strokeColor = border; g.lineWidth = 3; g.roundRect(-width / 2 + 2, -height / 2 + 2, width - 4, height - 4, radius); g.stroke(); }
    return node;
  }

  private label(parent: Node, text: string, size: number, lineHeight: number, width: number, y: number, color: Color, bold = false, align = HorizontalTextAlignment.CENTER, x = 0): Label {
    const node = new Node('Label'); node.layer = Layers.Enum.UI_2D; node.addComponent(UITransform).setContentSize(width, Math.max(lineHeight, lineHeight * (text.split('\n').length + 0.3))); node.setPosition(x, y); parent.addChild(node);
    const label = node.addComponent(Label); label.string = text; label.fontSize = size; label.lineHeight = lineHeight; label.color = color; label.isBold = bold; label.horizontalAlign = align; label.verticalAlign = VerticalTextAlignment.CENTER; label.overflow = Label.Overflow.SHRINK; label.enableWrapText = true; return label;
  }

  private hex(value: string): Color { const c = new Color(); Color.fromHEX(c, value); return c; }
}
