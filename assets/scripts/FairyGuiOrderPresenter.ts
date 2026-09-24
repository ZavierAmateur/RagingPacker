import { itemById, ordersForLevel } from './GameModel.ts';
import type { BoxId, ItemId, LabelId, Order, WrapId } from './GameModel.ts';

export interface FairyGuiOrderItemView {
  id: ItemId;
  name: string;
  count: number;
  resourceName: string | null;
}

export type FairyGuiTimerUrgency = 'normal' | 'warning' | 'urgent';

export interface FairyGuiOrderTimerView {
  ratio: number;
  seconds: number;
  urgency: FairyGuiTimerUrgency;
}

export const FAIRYGUI_ORDER_ITEM_SLOTS = [
  'itemPhone',
  'itemCharger',
  'itemGlass',
  'itemFish',
] as const;

export const FAIRYGUI_ITEM_RESOURCE_NAMES: Partial<Record<ItemId, string>> = {
  bluePhone: 'item_phone_blue',
  charger: 'item_charger_white',
  glass: 'item_glass_empty',
  saltFish: 'item_fish_frozen',
};

const BOX_NAMES: Record<BoxId, string> = {
  small: '小号箱',
  medium: '中号箱',
  large: '大号箱',
};

const WRAP_NAMES: Record<WrapId, string> = {
  none: '无需包装',
  bubble: '气泡膜',
  ice: '冰袋',
  waterproof: '防水袋',
};

const LABEL_NAMES: Record<LabelId, string> = {
  none: '无标签',
  fragile: '易碎',
  cold: '冷藏',
  waterproof: '防水',
};

const BOX_OPTIONS: readonly BoxId[] = ['small', 'medium', 'large'];
const WRAP_OPTIONS: readonly WrapId[] = ['none', 'bubble', 'ice', 'waterproof'];
const LABEL_OPTIONS: readonly LabelId[] = ['none', 'fragile', 'cold', 'waterproof'];

function nextOption<T>(options: readonly T[], current: T): T {
  const index = options.indexOf(current);
  return options[(index + 1) % options.length];
}

export function nextFairyGuiBox(current: BoxId): BoxId {
  return nextOption(BOX_OPTIONS, current);
}

export function nextFairyGuiWrap(current: WrapId): WrapId {
  return nextOption(WRAP_OPTIONS, current);
}

export function nextFairyGuiLabel(current: LabelId): LabelId {
  return nextOption(LABEL_OPTIONS, current);
}

export function fairyGuiSelectionNames(
  box: BoxId,
  wrap: WrapId,
  label: LabelId,
): { box: string; wrap: string; label: string } {
  return {
    box: BOX_NAMES[box],
    wrap: WRAP_NAMES[wrap],
    label: LABEL_NAMES[label],
  };
}

export function fairyGuiOrderQueue(levelId: number, count = 3): Order[] {
  return ordersForLevel(levelId).slice(0, count);
}

export function fairyGuiConveyorPool(orders: readonly Order[]): ItemId[] {
  const seen = new Set<ItemId>();
  const pool: ItemId[] = [];
  for (const order of orders) {
    for (const id of Object.keys(order.items) as ItemId[]) {
      if (seen.has(id)) continue;
      seen.add(id);
      pool.push(id);
    }
  }
  return pool;
}

export function fairyGuiConveyorWindow(
  pool: readonly ItemId[],
  cursor: number,
  size = 4,
): ItemId[] {
  if (pool.length === 0 || size <= 0) return [];
  const start = ((cursor % pool.length) + pool.length) % pool.length;
  return Array.from({ length: Math.min(size, pool.length) }, (_, index) => (
    pool[(start + index) % pool.length]
  ));
}

export function fairyGuiOrderTimer(
  secondsLeft: number,
  totalSeconds: number,
): FairyGuiOrderTimerView {
  const ratio = totalSeconds > 0
    ? Math.max(0, Math.min(1, secondsLeft / totalSeconds))
    : 0;
  return {
    ratio,
    seconds: Math.max(0, Math.ceil(secondsLeft)),
    urgency: ratio <= 0.25 ? 'urgent' : ratio <= 0.5 ? 'warning' : 'normal',
  };
}

export function fairyGuiFirstExpiredOrderIndex(secondsByOrder: readonly number[]): number {
  return secondsByOrder.findIndex((seconds) => seconds <= 0);
}

export function fairyGuiOrderItems(order: Order): FairyGuiOrderItemView[] {
  return Object.entries(order.items).map(([id, count]) => {
    const itemId = id as ItemId;
    return {
      id: itemId,
      name: itemById(itemId).name,
      count: count ?? 0,
      resourceName: FAIRYGUI_ITEM_RESOURCE_NAMES[itemId] ?? null,
    };
  });
}

export function fairyGuiOrderRequirements(order: Order): {
  box: string;
  wrap: string;
  label: string;
} {
  return fairyGuiSelectionNames(order.box, order.wrap, order.label);
}
