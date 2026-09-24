import {
  _decorator, BlockInputEvents, Camera, Canvas, Color, Component, error, Graphics,
  HorizontalTextAlignment, Label, Layers, Node, ResolutionPolicy, tween,
  UITransform, Vec3, VerticalTextAlignment, view, profiler, log,
} from 'cc';
import * as fgui from 'fairygui-cc';
import {
  BoxId, evaluatePackage, getBoxCapacity, ItemId, ITEMS, itemById,
  LabelId, LEVELS, LevelDefinition, Order, ordersForLevel, usedCapacity, WrapId,
} from './GameModel';
import {
  FAIRYGUI_ITEM_RESOURCE_NAMES,
  FAIRYGUI_ORDER_ITEM_SLOTS,
  fairyGuiConveyorPool,
  fairyGuiConveyorWindow,
  fairyGuiFirstExpiredOrderIndex,
  fairyGuiOrderItems,
  fairyGuiOrderQueue,
  fairyGuiOrderRequirements,
  fairyGuiOrderTimer,
  fairyGuiSelectionNames,
  nextFairyGuiBox,
  nextFairyGuiLabel,
  nextFairyGuiWrap,
} from './FairyGuiOrderPresenter';

const { ccclass } = _decorator;
const W = 750;
const H = 1334;
const FGUI_PACKAGES = [
  'packages/ui-common/ui-common',
  'packages/ui-game/ui-game',
  'packages/ui-result/ui-result',
] as const;
const C = {
  bg: new Color(246, 241, 224), ink: new Color(42, 48, 54), muted: new Color(117, 124, 125),
  orange: new Color(255, 145, 64), orangeDark: new Color(206, 87, 39), yellow: new Color(255, 207, 69),
  cream: new Color(255, 251, 235), belt: new Color(75, 86, 91), belt2: new Color(105, 117, 119),
  green: new Color(67, 174, 117), red: new Color(231, 83, 83), blue: new Color(72, 133, 220),
  white: new Color(255, 255, 255), line: new Color(208, 197, 169), dark: new Color(31, 37, 42),
};

interface BeltItem { node: Node; id: ItemId; speed: number; }

function colorFromHex(hex: string): Color {
  const value = Number.parseInt(hex.replace('#', ''), 16);
  return new Color((value >> 16) & 255, (value >> 8) & 255, value & 255);
}

@ccclass('GameRoot')
export class GameRoot extends Component {
  private fairyGuiView: fgui.GComponent | null = null;
  private fairyGuiTopHud: fgui.GComponent | null = null;
  private fairyGuiOrderBoard: fgui.GComponent | null = null;
  private fairyGuiSelectorPanel: fgui.GComponent | null = null;
  private fairyGuiConveyor: fgui.GComponent | null = null;
  private fairyGuiBoxArea: fgui.GComponent | null = null;
  private fairyGuiResultOverlay: fgui.GComponent | null = null;
  private fairyGuiOrderPool: Order[] = [];
  private fairyGuiOrders: Order[] = [];
  private fairyGuiContentsByOrder: Array<Partial<Record<ItemId, number>>> = [];
  private fairyGuiSecondsByOrder: number[] = [];
  private fairyGuiNextOrderCursor = 0;
  private fairyGuiSelectedOrderIndex = 0;
  private fairyGuiItemLoaders: fgui.GLoader[] = [];
  private fairyGuiItemFallbackBackgrounds: fgui.GGraph[] = [];
  private fairyGuiItemFallbackLabels: fgui.GTextField[] = [];
  private fairyGuiTicketLoaders: fgui.GLoader[] = [];
  private fairyGuiTicketFallbackBackgrounds: fgui.GGraph[] = [];
  private fairyGuiTicketFallbackLabels: fgui.GTextField[] = [];
  private fairyGuiTicketTimeLabels: fgui.GTextField[] = [];
  private fairyGuiConveyorItemPool: ItemId[] = [];
  private fairyGuiConveyorVisibleItems: ItemId[] = [];
  private fairyGuiConveyorCursor = 0;
  private fairyGuiConveyorRefreshSeconds = 0;
  private fairyGuiConveyorLoaders: fgui.GLoader[] = [];
  private fairyGuiConveyorFallbackBackgrounds: fgui.GGraph[] = [];
  private fairyGuiConveyorFallbackLabels: fgui.GTextField[] = [];
  private fairyGuiConveyorNameBackgrounds: fgui.GGraph[] = [];
  private fairyGuiConveyorNameLabels: fgui.GTextField[] = [];
  private fairyGuiBoxLoaders: fgui.GLoader[] = [];
  private fairyGuiBoxFallbackBackgrounds: fgui.GGraph[] = [];
  private fairyGuiBoxFallbackLabels: fgui.GTextField[] = [];
  private fairyGuiBoxCountBackgrounds: fgui.GGraph[] = [];
  private fairyGuiBoxCountLabels: fgui.GTextField[] = [];
  private legacyPrototypeActive = false;
  private destroyed = false;
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
    void this.startFairyGui();
  }

  protected onDestroy(): void {
    this.destroyed = true;
    this.fairyGuiResultOverlay?.dispose();
    this.fairyGuiResultOverlay = null;
    this.fairyGuiView?.dispose();
    this.fairyGuiView = null;
  }

  private async startFairyGui(): Promise<void> {
    try {
      fgui.GRoot.create();
      for (const packagePath of FGUI_PACKAGES) await this.loadFairyGuiPackage(packagePath);
      if (this.destroyed) return;

      const gamePage = fgui.UIPackage.createObject('ui-game', 'GamePage').asCom;
      if (!gamePage) throw new Error('ui-game/GamePage 创建失败');
      gamePage.makeFullScreen();
      fgui.GRoot.inst.addChild(gamePage);
      this.fairyGuiView = gamePage;
      this.bindFairyGuiGamePage(gamePage);
      log('[RagingPacker] FairyGUI ui-game/GamePage 已加载');
    } catch (reason) {
      if (this.destroyed) return;
      this.fairyGuiView?.dispose();
      this.fairyGuiView = null;
      error('[RagingPacker] FairyGUI 加载失败，回退到旧原型：', reason);
      this.startLegacyPrototype();
    }
  }

  private loadFairyGuiPackage(packagePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fgui.UIPackage.loadPackage(packagePath, (loadError) => {
        if (loadError) reject(loadError);
        else resolve();
      });
    });
  }

  private bindFairyGuiGamePage(gamePage: fgui.GComponent): void {
    this.currentLevel = LEVELS[0];
    this.coins = 0;
    this.complaints = 0;
    this.successful = 0;
    this.completed = 0;
    this.combo = 0;
    this.fairyGuiOrderPool = ordersForLevel(this.currentLevel.id);
    this.fairyGuiOrders = fairyGuiOrderQueue(this.currentLevel.id);
    this.fairyGuiContentsByOrder = this.fairyGuiOrders.map(() => ({}));
    this.fairyGuiSecondsByOrder = this.fairyGuiOrders.map(
      (order) => order.seconds * this.currentLevel.timeScale,
    );
    this.fairyGuiNextOrderCursor = this.fairyGuiOrders.length;
    this.fairyGuiSelectedOrderIndex = 0;

    this.fairyGuiTopHud = gamePage.getChild('topHud').asCom;
    this.fairyGuiOrderBoard = gamePage.getChild('orderBoard').asCom;
    this.fairyGuiSelectorPanel = gamePage.getChild('selectorPanel').asCom;
    this.fairyGuiConveyor = gamePage.getChild('conveyor').asCom;
    this.fairyGuiBoxArea = gamePage.getChild('boxArea').asCom;
    this.createFairyGuiRuntimeIcons(this.fairyGuiOrderBoard);
    this.bindFairyGuiOrderTabs(this.fairyGuiOrderBoard);
    this.bindFairyGuiSelectors(this.fairyGuiSelectorPanel);
    this.bindFairyGuiConveyor(this.fairyGuiConveyor);
    this.createFairyGuiBoxSlots(this.fairyGuiBoxArea);
    gamePage.getChild('shipButton').onClick(() => this.finishFairyGuiOrder(), this);
    this.refreshFairyGuiHud();
    this.selectFairyGuiOrder(0);
    this.refreshFairyGuiSelectors();
  }

  private createFairyGuiRuntimeIcons(orderBoard: fgui.GComponent): void {
    const itemIconPositions = [
      [254, 96],
      [480, 96],
      [254, 208],
      [480, 208],
    ] as const;
    const ticketIconPositions = [
      [73, 25],
      [303, 25],
      [533, 25],
    ] as const;
    const ticketTimerPositions = [126, 356, 586] as const;

    FAIRYGUI_ORDER_ITEM_SLOTS.forEach((slotName, index) => {
      orderBoard.getChild(slotName).visible = false;
      const fallbackBackground = new fgui.GGraph();
      fallbackBackground.name = `runtimeItemFallbackBg${index + 1}`;
      fallbackBackground.setPosition(itemIconPositions[index][0] + 8, itemIconPositions[index][1] + 8);
      fallbackBackground.setSize(66, 66);
      fallbackBackground.drawRect(2, C.white, C.muted, [17]);
      fallbackBackground.visible = false;
      orderBoard.addChild(fallbackBackground);
      this.fairyGuiItemFallbackBackgrounds.push(fallbackBackground);

      const fallbackLabel = this.addFairyGuiText(
        orderBoard,
        `runtimeItemFallback${index + 1}`,
        '',
        itemIconPositions[index][0] + 8,
        itemIconPositions[index][1] + 8,
        66,
        66,
        28,
        C.white,
        true,
      );
      fallbackLabel.visible = false;
      this.fairyGuiItemFallbackLabels.push(fallbackLabel);

      const loader = new fgui.GLoader();
      loader.name = `runtimeItemIcon${index + 1}`;
      loader.setPosition(itemIconPositions[index][0], itemIconPositions[index][1]);
      loader.setSize(82, 82);
      loader.fill = fgui.LoaderFillType.Scale;
      loader.shrinkOnly = true;
      orderBoard.addChild(loader);
      this.fairyGuiItemLoaders.push(loader);
    });

    ticketIconPositions.forEach(([x, y], index) => {
      orderBoard.getChild(`ticket0${index + 1}Icon`).visible = false;
      const fallbackBackground = new fgui.GGraph();
      fallbackBackground.name = `runtimeTicketFallbackBg${index + 1}`;
      fallbackBackground.setPosition(x + 3, y + 3);
      fallbackBackground.setSize(36, 36);
      fallbackBackground.drawEllipse(1, C.white, C.muted);
      fallbackBackground.visible = false;
      orderBoard.addChild(fallbackBackground);
      this.fairyGuiTicketFallbackBackgrounds.push(fallbackBackground);

      const fallbackLabel = this.addFairyGuiText(
        orderBoard,
        `runtimeTicketFallback${index + 1}`,
        '',
        x + 3,
        y + 3,
        36,
        36,
        15,
        C.white,
        true,
      );
      fallbackLabel.visible = false;
      this.fairyGuiTicketFallbackLabels.push(fallbackLabel);

      const loader = new fgui.GLoader();
      loader.name = `runtimeTicketIcon${index + 1}`;
      loader.setPosition(x, y);
      loader.setSize(42, 42);
      loader.fill = fgui.LoaderFillType.Scale;
      loader.shrinkOnly = true;
      orderBoard.addChild(loader);
      this.fairyGuiTicketLoaders.push(loader);

      const timeLabel = new fgui.GTextField();
      timeLabel.name = `runtimeTicketTime${index + 1}`;
      timeLabel.setPosition(ticketTimerPositions[index], 17);
      timeLabel.setSize(82, 22);
      timeLabel.font = 'ui://rpgcm001ft002';
      timeLabel.fontSize = 15;
      timeLabel.color = new Color(90, 48, 28);
      timeLabel.align = HorizontalTextAlignment.CENTER;
      timeLabel.verticalAlign = VerticalTextAlignment.CENTER;
      timeLabel.singleLine = true;
      orderBoard.addChild(timeLabel);
      this.fairyGuiTicketTimeLabels.push(timeLabel);
    });
  }

  private bindFairyGuiOrderTabs(orderBoard: fgui.GComponent): void {
    const positions = [16, 246, 476] as const;
    positions.forEach((x, index) => {
      const hitArea = new fgui.GGraph();
      hitArea.name = `runtimeTicketHit${index + 1}`;
      hitArea.setPosition(x, 20);
      hitArea.setSize(210, 54);
      hitArea.drawRect(0, new Color(0, 0, 0, 0), new Color(255, 255, 255, 0), [13]);
      hitArea.onClick(() => this.selectFairyGuiOrder(index), this);
      orderBoard.addChild(hitArea);
    });
  }

  private bindFairyGuiSelectors(selectorPanel: fgui.GComponent): void {
    const selectors = [
      { name: 'box', x: 8, action: () => { this.selectedBox = nextFairyGuiBox(this.selectedBox); } },
      { name: 'wrap', x: 240, action: () => { this.selectedWrap = nextFairyGuiWrap(this.selectedWrap); } },
      { name: 'label', x: 472, action: () => { this.selectedLabel = nextFairyGuiLabel(this.selectedLabel); } },
    ] as const;

    selectors.forEach(({ name, x, action }) => {
      const hitArea = new fgui.GGraph();
      hitArea.name = `runtime${name[0].toUpperCase()}${name.slice(1)}Hit`;
      hitArea.setPosition(x, 8);
      hitArea.setSize(222, 188);
      hitArea.drawRect(0, new Color(0, 0, 0, 0), new Color(255, 255, 255, 0), [16]);
      hitArea.onClick(() => {
        action();
        this.refreshFairyGuiSelectors();
      }, this);
      selectorPanel.addChild(hitArea);
    });
  }

  private bindFairyGuiConveyor(conveyor: fgui.GComponent): void {
    for (const name of ['phoneItem', 'chargerItem', 'glassItem', 'fishItem']) {
      conveyor.getChild(name).visible = false;
    }
    const positions = [20, 201, 382, 563] as const;
    positions.forEach((x, index) => {
      const fallbackBackground = new fgui.GGraph();
      fallbackBackground.name = `runtimeConveyorFallbackBg${index + 1}`;
      fallbackBackground.setPosition(x + 28, 8);
      fallbackBackground.setSize(80, 80);
      fallbackBackground.drawRect(3, C.white, C.muted, [22]);
      conveyor.addChild(fallbackBackground);
      this.fairyGuiConveyorFallbackBackgrounds.push(fallbackBackground);

      const fallbackLabel = this.addFairyGuiText(
        conveyor,
        `runtimeConveyorFallback${index + 1}`,
        '',
        x + 28,
        8,
        80,
        80,
        30,
        C.white,
        true,
      );
      this.fairyGuiConveyorFallbackLabels.push(fallbackLabel);

      const loader = new fgui.GLoader();
      loader.name = `runtimeConveyorItem${index + 1}`;
      loader.setPosition(x, -3);
      loader.setSize(136, 136);
      loader.fill = fgui.LoaderFillType.Scale;
      loader.shrinkOnly = true;
      conveyor.addChild(loader);
      this.fairyGuiConveyorLoaders.push(loader);

      const nameBackground = new fgui.GGraph();
      nameBackground.name = `runtimeConveyorNameBg${index + 1}`;
      nameBackground.setPosition(x + 7, 91);
      nameBackground.setSize(122, 25);
      nameBackground.drawRect(0, new Color(0, 0, 0, 0), new Color(31, 37, 42, 220), [10]);
      conveyor.addChild(nameBackground);
      this.fairyGuiConveyorNameBackgrounds.push(nameBackground);

      const nameLabel = this.addFairyGuiText(
        conveyor,
        `runtimeConveyorName${index + 1}`,
        '',
        x + 9,
        91,
        118,
        25,
        15,
        C.white,
        true,
      );
      nameLabel.autoSize = fgui.AutoSizeType.Shrink;
      nameLabel.singleLine = true;
      this.fairyGuiConveyorNameLabels.push(nameLabel);

      const hitArea = new fgui.GGraph();
      hitArea.name = `runtimeConveyorHit${index + 1}`;
      hitArea.setPosition(x, 0);
      hitArea.setSize(136, 120);
      hitArea.drawRect(0, new Color(0, 0, 0, 0), new Color(255, 255, 255, 0), [12]);
      hitArea.onClick(() => {
        const id = this.fairyGuiConveyorVisibleItems[index];
        if (id) this.addFairyGuiItem(id);
      }, this);
      conveyor.addChild(hitArea);
    });
    this.refreshFairyGuiConveyorPool(true);
  }

  private refreshFairyGuiConveyorPool(resetCursor = false): void {
    const nextPool = fairyGuiConveyorPool(this.fairyGuiOrders);
    const changed = nextPool.join(',') !== this.fairyGuiConveyorItemPool.join(',');
    this.fairyGuiConveyorItemPool = nextPool;
    if (changed || resetCursor) this.fairyGuiConveyorCursor = 0;
    this.rotateFairyGuiConveyor();
  }

  private rotateFairyGuiConveyor(): void {
    this.fairyGuiConveyorVisibleItems = fairyGuiConveyorWindow(
      this.fairyGuiConveyorItemPool,
      this.fairyGuiConveyorCursor,
    );
    if (this.fairyGuiConveyorItemPool.length > 0) {
      this.fairyGuiConveyorCursor =
        (this.fairyGuiConveyorCursor + 1) % this.fairyGuiConveyorItemPool.length;
    }
    this.fairyGuiConveyorRefreshSeconds = 2.4;
    this.fairyGuiConveyorLoaders.forEach((loader, index) => {
      const id = this.fairyGuiConveyorVisibleItems[index];
      const item = id ? itemById(id) : null;
      const resourceName = id ? FAIRYGUI_ITEM_RESOURCE_NAMES[id] : null;
      loader.url = resourceName ? fgui.UIPackage.getItemURL('ui-game', resourceName) : null;
      loader.visible = Boolean(resourceName);
      this.fairyGuiConveyorFallbackBackgrounds[index].visible = Boolean(item && !resourceName);
      this.fairyGuiConveyorFallbackLabels[index].visible = Boolean(item && !resourceName);
      this.fairyGuiConveyorNameBackgrounds[index].visible = Boolean(item);
      this.fairyGuiConveyorNameLabels[index].visible = Boolean(item);
      if (item) {
        this.fairyGuiConveyorFallbackBackgrounds[index].color = colorFromHex(item.color);
        this.fairyGuiConveyorFallbackLabels[index].text = item.glyph;
        this.fairyGuiConveyorNameLabels[index].text = item.name;
      }
    });
  }

  private createFairyGuiBoxSlots(boxArea: fgui.GComponent): void {
    const slotPositions = [145, 250, 355, 460] as const;
    slotPositions.forEach((x, index) => {
      const fallbackBackground = new fgui.GGraph();
      fallbackBackground.name = `runtimeBoxFallbackBg${index + 1}`;
      fallbackBackground.setPosition(x + 18, 84);
      fallbackBackground.setSize(58, 58);
      fallbackBackground.drawRect(2, C.white, C.muted, [15]);
      fallbackBackground.visible = false;
      boxArea.addChild(fallbackBackground);
      this.fairyGuiBoxFallbackBackgrounds.push(fallbackBackground);

      const fallbackLabel = this.addFairyGuiText(
        boxArea,
        `runtimeBoxFallback${index + 1}`,
        '',
        x + 18,
        84,
        58,
        58,
        23,
        C.white,
        true,
      );
      fallbackLabel.visible = false;
      this.fairyGuiBoxFallbackLabels.push(fallbackLabel);

      const loader = new fgui.GLoader();
      loader.name = `runtimeBoxItem${index + 1}`;
      loader.setPosition(x + 9, 79);
      loader.setSize(76, 70);
      loader.fill = fgui.LoaderFillType.Scale;
      loader.shrinkOnly = true;
      boxArea.addChild(loader);
      this.fairyGuiBoxLoaders.push(loader);

      const countBackground = new fgui.GGraph();
      countBackground.name = `runtimeBoxCountBg${index + 1}`;
      countBackground.setPosition(x + 58, 122);
      countBackground.setSize(32, 26);
      countBackground.drawEllipse(0, new Color(0, 0, 0, 0), new Color(255, 90, 53));
      boxArea.addChild(countBackground);
      this.fairyGuiBoxCountBackgrounds.push(countBackground);

      const countLabel = new fgui.GTextField();
      countLabel.name = `runtimeBoxCount${index + 1}`;
      countLabel.setPosition(x + 58, 121);
      countLabel.setSize(32, 28);
      countLabel.fontSize = 17;
      countLabel.color = C.white;
      countLabel.align = HorizontalTextAlignment.CENTER;
      countLabel.verticalAlign = VerticalTextAlignment.CENTER;
      countLabel.singleLine = true;
      boxArea.addChild(countLabel);
      this.fairyGuiBoxCountLabels.push(countLabel);

      const hitArea = new fgui.GGraph();
      hitArea.name = `runtimeBoxSlotHit${index + 1}`;
      hitArea.setPosition(x, 77);
      hitArea.setSize(94, 76);
      hitArea.drawRect(0, new Color(0, 0, 0, 0), new Color(255, 255, 255, 0), [8]);
      hitArea.onClick(() => this.removeFairyGuiItemAt(index), this);
      boxArea.addChild(hitArea);
    });
  }

  private addFairyGuiItem(id: ItemId): void {
    const next = { ...this.contents, [id]: (this.contents[id] ?? 0) + 1 };
    if (usedCapacity(next) > getBoxCapacity(this.selectedBox)) {
      const selection = fairyGuiSelectionNames(
        this.selectedBox,
        this.selectedWrap,
        this.selectedLabel,
      );
      this.refreshFairyGuiActionHint(`${selection.box}容量不足，请换大箱或取出商品`);
      return;
    }
    this.contents = next;
    this.fairyGuiContentsByOrder[this.fairyGuiSelectedOrderIndex] = next;
    this.refreshFairyGuiBoxContents();
    this.refreshFairyGuiActionHint(`已放入 ${itemById(id).name} ×${next[id]}`);
  }

  private removeFairyGuiItemAt(index: number): void {
    const entry = (Object.entries(this.contents) as [ItemId, number][])[index];
    if (!entry) return;
    const [id, count] = entry;
    const next = { ...this.contents };
    if (count <= 1) delete next[id];
    else next[id] = count - 1;
    this.contents = next;
    this.fairyGuiContentsByOrder[this.fairyGuiSelectedOrderIndex] = next;
    this.refreshFairyGuiBoxContents();
    this.refreshFairyGuiActionHint(`已取出 ${itemById(id).name}`);
  }

  private finishFairyGuiOrder(): void {
    if (this.fairyGuiResultOverlay) return;
    this.secondsLeft = this.fairyGuiSecondsByOrder[this.fairyGuiSelectedOrderIndex] ?? 0;
    const result = evaluatePackage(
      this.order,
      this.contents,
      this.selectedBox,
      this.selectedWrap,
      this.selectedLabel,
      this.secondsLeft,
    );
    this.completeFairyGuiOrder(result);
  }

  private completeFairyGuiOrder(result: {
    perfect: boolean;
    complaint: boolean;
    reason: string;
    review: string;
    coins: number;
  }): void {
    if (result.perfect) {
      this.coins += result.coins;
      this.combo++;
      this.successful++;
      this.setFairyGuiExpression('success');
    } else {
      if (result.complaint) this.complaints++;
      this.combo = 0;
      this.setFairyGuiExpression(result.complaint ? 'rage' : 'failed');
    }
    this.completed++;
    this.refreshFairyGuiHud();
    this.showFairyGuiResult(result);
  }

  private timeoutFairyGuiOrder(index: number): void {
    if (this.fairyGuiResultOverlay || index < 0 || index >= this.fairyGuiOrders.length) return;
    this.selectFairyGuiOrder(index);
    this.completeFairyGuiOrder({
      perfect: false,
      complaint: true,
      reason: '订单超时，已自动取消',
      review: '等太久了，这个包裹今天还能发出来吗？',
      coins: 0,
    });
  }

  private showFairyGuiResult(result: {
    perfect: boolean;
    complaint: boolean;
    reason: string;
    review: string;
    coins: number;
  }): void {
    const overlay = new fgui.GComponent();
    overlay.name = 'runtimeResultOverlay';
    overlay.setSize(W, H);
    const blocker = new fgui.GGraph();
    blocker.name = 'blocker';
    blocker.setSize(W, H);
    blocker.drawRect(0, new Color(0, 0, 0, 0), new Color(28, 22, 18, 178));
    overlay.addChild(blocker);

    const card = new fgui.GGraph();
    card.name = 'card';
    card.setPosition(55, 294);
    card.setSize(640, 650);
    card.drawRect(5, new Color(185, 106, 49), new Color(255, 250, 240), [34]);
    overlay.addChild(card);

    const titleColor = result.perfect ? new Color(52, 155, 91) : new Color(207, 67, 55);
    this.addFairyGuiText(
      overlay,
      'title',
      result.perfect ? '发货成功！' : '收到投诉！',
      95,
      340,
      560,
      72,
      44,
      titleColor,
      true,
    );
    this.addFairyGuiText(
      overlay,
      'reason',
      result.reason,
      95,
      426,
      560,
      56,
      30,
      new Color(78, 46, 30),
      true,
    );
    this.addFairyGuiText(
      overlay,
      'stat',
      result.perfect
        ? `金币 +${result.coins}　完美连单 ×${this.combo}`
        : `投诉 +${result.complaint ? 1 : 0}　当前 ${this.complaints}/3`,
      95,
      490,
      560,
      48,
      24,
      result.perfect ? new Color(184, 117, 28) : new Color(156, 41, 41),
      true,
    );

    const reviewCard = new fgui.GGraph();
    reviewCard.name = 'reviewCard';
    reviewCard.setPosition(100, 566);
    reviewCard.setSize(550, 184);
    reviewCard.drawRect(2, new Color(231, 197, 156), new Color(255, 244, 223), [22]);
    overlay.addChild(reviewCard);
    this.addFairyGuiText(
      overlay,
      'reviewTitle',
      '买家评价',
      125,
      578,
      500,
      40,
      20,
      new Color(112, 70, 45),
      true,
    );
    this.addFairyGuiText(
      overlay,
      'review',
      `“${result.review}”`,
      130,
      622,
      490,
      105,
      25,
      new Color(78, 46, 30),
      false,
    );

    const done = this.complaints >= 3 || this.successful >= this.currentLevel.target;
    const actionButton = fgui.UIPackage.createObject('ui-common', 'ButtonPrimary') as fgui.GButton;
    actionButton.name = 'actionButton';
    actionButton.setPosition(92, 810);
    actionButton.setSize(566, 84);
    actionButton.title = done ? '查看今日结算' : '下一单';
    actionButton.onClick(() => this.continueAfterFairyGuiResult(done), this);
    overlay.addChild(actionButton);

    fgui.GRoot.inst.addChild(overlay);
    this.fairyGuiResultOverlay = overlay;
  }

  private addFairyGuiText(
    parent: fgui.GComponent,
    name: string,
    text: string,
    x: number,
    y: number,
    width: number,
    height: number,
    fontSize: number,
    color: Color,
    heavy: boolean,
  ): fgui.GTextField {
    const field = new fgui.GTextField();
    field.name = name;
    field.setPosition(x, y);
    field.setSize(width, height);
    field.text = text;
    field.font = heavy ? 'ui://rpgcm001ft002' : 'ui://rpgcm001ft001';
    field.fontSize = fontSize;
    field.color = color;
    field.align = HorizontalTextAlignment.CENTER;
    field.verticalAlign = VerticalTextAlignment.CENTER;
    field.singleLine = false;
    parent.addChild(field);
    return field;
  }

  private continueAfterFairyGuiResult(done: boolean): void {
    this.fairyGuiResultOverlay?.dispose();
    this.fairyGuiResultOverlay = null;
    if (done) {
      this.showFairyGuiDaySummary();
      return;
    }

    const finishedIndex = this.fairyGuiSelectedOrderIndex;
    this.fairyGuiOrders[finishedIndex] =
      this.fairyGuiOrderPool[this.fairyGuiNextOrderCursor % this.fairyGuiOrderPool.length];
    this.fairyGuiNextOrderCursor++;
    this.fairyGuiContentsByOrder[finishedIndex] = {};
    this.fairyGuiSecondsByOrder[finishedIndex] =
      this.fairyGuiOrders[finishedIndex].seconds * this.currentLevel.timeScale;
    this.refreshFairyGuiConveyorPool();
    this.selectedBox = 'small';
    this.selectedWrap = 'none';
    this.selectedLabel = 'none';
    this.setFairyGuiExpression('focused');
    this.selectFairyGuiOrder((finishedIndex + 1) % this.fairyGuiOrders.length);
    this.refreshFairyGuiSelectors();
  }

  private showFairyGuiDaySummary(): void {
    const passed = this.successful >= this.currentLevel.target;
    const summary = {
      perfect: passed,
      complaint: !passed,
      reason: passed ? '今日目标完成！' : '投诉过多，提前下班',
      review: `完成 ${this.successful}/${this.currentLevel.target} 单 · 收入 ${this.coins} 金币`,
      coins: 0,
    };
    this.showFairyGuiResult(summary);
    const button = this.fairyGuiResultOverlay?.getChild('actionButton') as fgui.GButton | undefined;
    if (button) {
      button.clearClick();
      button.title = '重新开始';
      button.onClick(() => this.restartFairyGuiDay(), this);
    }
  }

  private restartFairyGuiDay(): void {
    this.fairyGuiResultOverlay?.dispose();
    this.fairyGuiResultOverlay = null;
    this.coins = 0;
    this.complaints = 0;
    this.successful = 0;
    this.completed = 0;
    this.combo = 0;
    this.fairyGuiOrderPool = ordersForLevel(this.currentLevel.id);
    this.fairyGuiOrders = fairyGuiOrderQueue(this.currentLevel.id);
    this.fairyGuiContentsByOrder = this.fairyGuiOrders.map(() => ({}));
    this.fairyGuiSecondsByOrder = this.fairyGuiOrders.map(
      (order) => order.seconds * this.currentLevel.timeScale,
    );
    this.fairyGuiNextOrderCursor = this.fairyGuiOrders.length;
    this.selectedBox = 'small';
    this.selectedWrap = 'none';
    this.selectedLabel = 'none';
    this.refreshFairyGuiHud();
    this.refreshFairyGuiConveyorPool(true);
    this.setFairyGuiExpression('calm');
    this.selectFairyGuiOrder(0);
    this.refreshFairyGuiSelectors();
  }

  private setFairyGuiExpression(page: string): void {
    const portrait = this.fairyGuiOrderBoard?.getChild('characterPortrait').asCom;
    if (!portrait) return;
    portrait.getController('expression').selectedPage = page;
  }

  private selectFairyGuiOrder(index: number): void {
    if (!this.fairyGuiOrderBoard || index < 0 || index >= this.fairyGuiOrders.length) return;
    this.fairyGuiSelectedOrderIndex = index;
    this.order = this.fairyGuiOrders[index];
    this.contents = this.fairyGuiContentsByOrder[index] ?? {};
    this.secondsLeft = this.fairyGuiSecondsByOrder[index] ?? 0;
    this.refreshFairyGuiOrderTabs();
    this.refreshFairyGuiCurrentOrder();
    this.refreshFairyGuiBoxContents();
  }

  private refreshFairyGuiHud(): void {
    if (!this.fairyGuiTopHud) return;
    this.fairyGuiTopHud.getChild('goalValue').text = `${this.successful}/${this.currentLevel.target}`;
    this.fairyGuiTopHud.getChild('coinValue').text = this.coins.toLocaleString('zh-CN');
    this.fairyGuiTopHud.getChild('complaintValue').text = `${this.complaints}/3`;
  }

  private refreshFairyGuiOrderTabs(): void {
    if (!this.fairyGuiOrderBoard) return;
    this.fairyGuiOrders.forEach((order, index) => {
      const prefix = `ticket0${index + 1}`;
      const selected = index === this.fairyGuiSelectedOrderIndex;
      (this.fairyGuiOrderBoard!.getChild(prefix) as fgui.GGraph).color = selected
        ? new Color(255, 139, 50)
        : new Color(255, 253, 247);
      const number = this.fairyGuiOrderBoard!.getChild(`${prefix}No`) as fgui.GTextField;
      number.text = `${index + 1}`.padStart(2, '0');
      number.color = selected ? C.white : new Color(90, 48, 28);

      const firstItem = fairyGuiOrderItems(order)[0];
      const ticketLoader = this.fairyGuiTicketLoaders[index];
      ticketLoader.url = firstItem.resourceName
        ? fgui.UIPackage.getItemURL('ui-game', firstItem.resourceName)
        : null;
      ticketLoader.visible = Boolean(firstItem.resourceName);
      const ticketFallbackBackground = this.fairyGuiTicketFallbackBackgrounds[index];
      const ticketFallbackLabel = this.fairyGuiTicketFallbackLabels[index];
      const showTicketFallback = !firstItem.resourceName;
      ticketFallbackBackground.visible = showTicketFallback;
      ticketFallbackLabel.visible = showTicketFallback;
      if (showTicketFallback) {
        const item = itemById(firstItem.id);
        ticketFallbackBackground.color = colorFromHex(item.color);
        ticketFallbackLabel.text = item.glyph;
      }

    });
    this.refreshFairyGuiOrderTimers();
  }

  private refreshFairyGuiOrderTimers(): void {
    if (!this.fairyGuiOrderBoard) return;
    this.fairyGuiOrders.forEach((order, index) => {
      const prefix = `ticket0${index + 1}`;
      const selected = index === this.fairyGuiSelectedOrderIndex;
      const timeFill = this.fairyGuiOrderBoard!.getChild(`${prefix}TimeFill`);
      const timer = fairyGuiOrderTimer(
        this.fairyGuiSecondsByOrder[index] ?? 0,
        order.seconds * this.currentLevel.timeScale,
      );
      timeFill.width = Math.round(78 * timer.ratio);
      const timerColor = timer.urgency === 'urgent'
        ? new Color(231, 83, 83)
        : timer.urgency === 'warning'
          ? new Color(255, 190, 55)
          : new Color(113, 178, 91);
      (timeFill as fgui.GGraph).color = timerColor;
      const timeLabel = this.fairyGuiTicketTimeLabels[index];
      timeLabel.text = `${timer.seconds}s`;
      timeLabel.color = timer.urgency === 'urgent'
        ? new Color(196, 48, 48)
        : selected ? C.white : new Color(90, 48, 28);
    });
  }

  private refreshFairyGuiCurrentOrder(): void {
    if (!this.fairyGuiView || !this.fairyGuiOrderBoard) return;
    const items = fairyGuiOrderItems(this.order);
    FAIRYGUI_ORDER_ITEM_SLOTS.forEach((slotName, index) => {
      const item = items[index];
      const prefix = slotName;
      const background = this.fairyGuiOrderBoard!.getChild(`${prefix}Bg`);
      const name = this.fairyGuiOrderBoard!.getChild(`${prefix}Name`);
      const countBackground = this.fairyGuiOrderBoard!.getChild(`${prefix}CountBg`);
      const count = this.fairyGuiOrderBoard!.getChild(`${prefix}Count`);
      const loader = this.fairyGuiItemLoaders[index];
      const visible = Boolean(item);
      background.visible = visible;
      name.visible = visible;
      countBackground.visible = visible;
      count.visible = visible;
      loader.visible = visible && Boolean(item?.resourceName);
      loader.url = item?.resourceName
        ? fgui.UIPackage.getItemURL('ui-game', item.resourceName)
        : null;
      if (item) {
        name.text = item.name;
        count.text = `×${item.count}`;
      }
      const fallbackBackground = this.fairyGuiItemFallbackBackgrounds[index];
      const fallbackLabel = this.fairyGuiItemFallbackLabels[index];
      const showFallback = visible && !item?.resourceName;
      fallbackBackground.visible = showFallback;
      fallbackLabel.visible = showFallback;
      if (item && showFallback) {
        const definition = itemById(item.id);
        fallbackBackground.color = colorFromHex(definition.color);
        fallbackLabel.text = definition.glyph;
      }
    });

    const requirements = fairyGuiOrderRequirements(this.order);
    this.fairyGuiOrderBoard.getChild('requiredBoxIcon').visible = this.order.box === 'small';
    this.fairyGuiOrderBoard.getChild('requiredWrapIcon').visible = this.order.wrap === 'bubble';
    this.fairyGuiOrderBoard.getChild('requiredLabelIcon').visible = this.order.label === 'fragile';
    this.fairyGuiOrderBoard.getChild('requiredBoxText').text = requirements.box;
    this.fairyGuiOrderBoard.getChild('requiredWrapText').text = requirements.wrap;
    this.fairyGuiOrderBoard.getChild('requiredLabelText').text = requirements.label;
    this.refreshFairyGuiActionHint();
  }

  private refreshFairyGuiSelectors(): void {
    if (!this.fairyGuiSelectorPanel) return;
    const selection = fairyGuiSelectionNames(
      this.selectedBox,
      this.selectedWrap,
      this.selectedLabel,
    );
    this.fairyGuiSelectorPanel.getChild('boxName').text = `${selection.box}  ▼`;
    this.fairyGuiSelectorPanel.getChild('wrapName').text = `${selection.wrap}  ▼`;
    this.fairyGuiSelectorPanel.getChild('labelName').text = `${selection.label}  ▼`;
    this.fairyGuiSelectorPanel.getChild('boxIcon').visible = this.selectedBox === 'small';
    this.fairyGuiSelectorPanel.getChild('wrapIcon').visible = this.selectedWrap === 'bubble';
    this.fairyGuiSelectorPanel.getChild('labelIcon').visible = this.selectedLabel === 'fragile';
    if (this.fairyGuiBoxArea) {
      this.fairyGuiBoxArea.getChild('counterIcon').visible = this.selectedBox === 'small';
    }
    const used = usedCapacity(this.contents);
    const capacity = getBoxCapacity(this.selectedBox);
    this.refreshFairyGuiActionHint(
      used > capacity ? `当前商品容量 ${used}/${capacity}，请换大箱或取出商品` : undefined,
    );
  }

  private refreshFairyGuiBoxContents(): void {
    if (!this.fairyGuiBoxArea) return;
    const entries = (Object.entries(this.contents) as [ItemId, number][]).slice(0, 4);
    this.fairyGuiBoxArea.getChild('counterLabel').text = `箱内 ${entries.length}/4`;
    this.fairyGuiBoxLoaders.forEach((loader, index) => {
      const entry = entries[index];
      const resourceName = entry ? FAIRYGUI_ITEM_RESOURCE_NAMES[entry[0]] : null;
      loader.url = resourceName ? fgui.UIPackage.getItemURL('ui-game', resourceName) : null;
      loader.visible = Boolean(resourceName);
      const fallbackBackground = this.fairyGuiBoxFallbackBackgrounds[index];
      const fallbackLabel = this.fairyGuiBoxFallbackLabels[index];
      const showFallback = Boolean(entry && !resourceName);
      fallbackBackground.visible = showFallback;
      fallbackLabel.visible = showFallback;
      if (entry && showFallback) {
        const item = itemById(entry[0]);
        fallbackBackground.color = colorFromHex(item.color);
        fallbackLabel.text = item.glyph;
      }
      this.fairyGuiBoxCountBackgrounds[index].visible = Boolean(entry);
      this.fairyGuiBoxCountLabels[index].visible = Boolean(entry);
      this.fairyGuiBoxCountLabels[index].text = entry ? `×${entry[1]}` : '';
      (this.fairyGuiBoxArea!.getChild(`dot0${index + 1}`) as fgui.GGraph).color = entry
        ? new Color(255, 139, 50)
        : new Color(255, 244, 223);
    });
  }

  private refreshFairyGuiActionHint(message?: string): void {
    if (!this.fairyGuiView || !this.order) return;
    if (message) {
      this.fairyGuiView.getChild('actionHint').text =
        `订单 ${`${this.fairyGuiSelectedOrderIndex + 1}`.padStart(2, '0')} · ${message}`;
      return;
    }
    const selection = fairyGuiSelectionNames(
      this.selectedBox,
      this.selectedWrap,
      this.selectedLabel,
    );
    this.fairyGuiView.getChild('actionHint').text =
      `订单 ${`${this.fairyGuiSelectedOrderIndex + 1}`.padStart(2, '0')} · ${this.order.customer}　已选：${selection.box} / ${selection.wrap} / ${selection.label}`;
  }

  private startLegacyPrototype(): void {
    this.legacyPrototypeActive = true;
    this.build();
    this.showLevelSelect();
    this.showTutorial();
  }

  protected update(dt: number): void {
    if (this.fairyGuiView && !this.legacyPrototypeActive) {
      this.updateFairyGuiOrders(dt);
      return;
    }
    if (!this.legacyPrototypeActive) return;
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

  private updateFairyGuiOrders(dt: number): void {
    if (this.fairyGuiResultOverlay || this.fairyGuiOrders.length === 0) return;
    this.fairyGuiConveyorRefreshSeconds -= dt;
    if (this.fairyGuiConveyorRefreshSeconds <= 0) this.rotateFairyGuiConveyor();
    this.fairyGuiSecondsByOrder = this.fairyGuiSecondsByOrder.map(
      (seconds) => Math.max(0, seconds - dt),
    );
    const timedOutIndex = fairyGuiFirstExpiredOrderIndex(this.fairyGuiSecondsByOrder);
    this.secondsLeft = this.fairyGuiSecondsByOrder[this.fairyGuiSelectedOrderIndex] ?? 0;
    this.refreshFairyGuiOrderTimers();
    if (timedOutIndex >= 0) this.timeoutFairyGuiOrder(timedOutIndex);
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
